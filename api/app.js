import { readDoc, writeDoc } from '../lib/store.js';
import { sign, verify, hashPin, newSalt, newId, todayVN } from '../lib/auth.js';
import { SCENARIOS } from '../lib/scenarios.js';
import { CRITERIA, GROUPS, PERSONAS } from '../lib/kb.js';
import { hasAI, setOidc, aiScoreDrill, aiScoreChat, aiCustomer } from '../lib/ai.js';
import { fallbackScore, total } from '../lib/score.js';

const ADMIN_PIN = process.env.ADMIN_PIN || '123456';
const DAILY = 3;

const users = () => readDoc('users', []);
const customSc = () => readDoc('scenarios', []);
const allSc = async () => SCENARIOS.concat(await customSc());
const atts = (uid) => readDoc('att-' + uid, []);
const saveAtts = (uid, a) => writeDoc('att-' + uid, a);
const finalTotal = (a) => (a.final ? a.final.total : a.ai ? a.ai.total : 0);

function pickDaily(list, uid, day) {
  let h = 0; for (const ch of uid + day) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const out = []; const used = new Set();
  for (let i = 0; out.length < Math.min(DAILY, list.length) && i < 50; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    const idx = h % list.length;
    if (!used.has(idx)) { used.add(idx); out.push(list[idx]); }
  }
  return out;
}

function stats(list) {
  const by = {}; CRITERIA.forEach(c => (by[c.k] = { sum: 0, n: 0, max: c.max, name: c.name }));
  const days = {};
  for (const a of list) {
    const sc = a.final?.scores || a.ai?.scores;
    if (sc) CRITERIA.forEach(c => { by[c.k].sum += Number(sc[c.k]) || 0; by[c.k].n++; });
    (days[a.date] ||= []).push(finalTotal(a));
  }
  const crit = CRITERIA.map(c => ({ k: c.k, name: c.name, max: c.max, avg: by[c.k].n ? +(by[c.k].sum / by[c.k].n).toFixed(1) : null, pct: by[c.k].n ? Math.round((by[c.k].sum / by[c.k].n) / c.max * 100) : null }));
  const weakest = crit.filter(c => c.pct !== null).sort((a, b) => a.pct - b.pct)[0] || null;
  const daily = Object.keys(days).sort().slice(-14).map(d => ({ date: d, avg: Math.round(days[d].reduce((x, y) => x + y, 0) / days[d].length), n: days[d].length }));
  // chuỗi ngày luyện liên tục
  let streak = 0; const set = new Set(Object.keys(days));
  const d = new Date(todayVN() + 'T00:00:00Z');
  if (!set.has(todayVN())) d.setUTCDate(d.getUTCDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) { streak++; d.setUTCDate(d.getUTCDate() - 1); }
  const recent = list.slice(-20);
  return { count: list.length, avg: recent.length ? Math.round(recent.reduce((x, a) => x + finalTotal(a), 0) / recent.length) : null, crit, weakest, daily, streak };
}

async function score(kind, payload) {
  let r;
  if (hasAI()) {
    try { r = kind === 'drill' ? await aiScoreDrill(payload.sc, payload.answer) : await aiScoreChat(payload.g, payload.persona, payload.messages); }
    catch (e) { r = null; payload.err = String(e.message || e); }
  }
  if (!r) {
    const text = kind === 'drill' ? payload.answer : payload.messages.filter(m => m.role === 'user').map(m => m.content).join('\n\n');
    r = fallbackScore(payload.sc, text);
    if (payload.err) r.aiError = payload.err;
  }
  r.total = total(r.scores);
  return r;
}

let HEALTH = null;
const handlers = {
  async health() {
    if (HEALTH && Date.now() - HEALTH.at < 600000) return HEALTH;
    const { aiPing } = await import('../lib/ai.js');
    let ai; try { ai = { ok: true, reply: await aiPing() }; } catch (e) { ai = { ok: false, error: String(e.message || e).slice(0, 300) }; }
    HEALTH = { at: Date.now(), ai, oidc: !!process.env.VERCEL_OIDC_TOKEN };
    return HEALTH;
  },

  async login({ name, pin }) {
    name = String(name || '').trim();
    if (name.toLowerCase() === 'admin') {
      if (String(pin ?? '').trim() !== String(ADMIN_PIN).trim()) throw new Error('Sai mã PIN');
      const u = { id: 'admin', name: 'Quản lý', role: 'admin' };
      return { token: sign(u), user: u };
    }
    const u = (await users()).find(x => x.name.toLowerCase() === name.toLowerCase() && x.active !== false);
    if (!u || hashPin(String(pin ?? '').trim(), u.salt) !== u.pinHash) throw new Error('Sai tên hoặc mã PIN');
    const me = { id: u.id, name: u.name, role: u.role };
    return { token: sign(me), user: me };
  },

  async meta(_, me) {
    return { user: me, ai: hasAI(), criteria: CRITERIA, groups: GROUPS, personas: PERSONAS, today: todayVN() };
  },

  async daily(_, me) {
    const day = todayVN();
    const list = await allSc();
    const mine = await atts(me.id);
    const picks = pickDaily(list, me.id, day).map(s => {
      const done = mine.find(a => a.type === 'drill' && a.scenarioId === s.id && a.date === day);
      return { ...strip(s), done: done ? { total: finalTotal(done), id: done.id } : null };
    });
    return { day, picks, stats: stats(mine) };
  },

  async scenarios() { return { list: (await allSc()).map(strip) }; },

  async submitDrill({ scenarioId, answer }, me) {
    if (!answer || String(answer).trim().length < 10) throw new Error('Câu trả lời quá ngắn');
    const sc = (await allSc()).find(s => s.id === scenarioId);
    if (!sc) throw new Error('Không tìm thấy tình huống');
    const ai = await score('drill', { sc, answer });
    const a = { id: newId(), type: 'drill', scenarioId, g: sc.g, title: sc.title, date: todayVN(), at: Date.now(), answer, ai, status: 'ai' };
    const list = await atts(me.id); list.push(a); await saveAtts(me.id, list);
    return { attempt: a, sample: sc.sample };
  },

  async chat({ g, persona, messages }, me) {
    if (!hasAI()) throw new Error('Phòng luyện AI cần cài ANTHROPIC_API_KEY trên Vercel. Tạm thời hãy làm bài tình huống.');
    const reply = await aiCustomer(g, persona, (messages || []).slice(-30));
    return { reply };
  },

  async finishChat({ g, persona, messages }, me) {
    if (!messages || messages.filter(m => m.role === 'user').length < 2) throw new Error('Cần nhắn ít nhất 2 tin trước khi chấm');
    const ai = await score('chat', { g, persona, messages, sc: null });
    const a = { id: newId(), type: 'chat', g, persona, title: 'Luyện AI – ' + GROUPS[g], date: todayVN(), at: Date.now(), messages, ai, status: 'ai' };
    const list = await atts(me.id); list.push(a); await saveAtts(me.id, list);
    return { attempt: a };
  },

  async history(_, me) {
    const list = await atts(me.id);
    return { list: list.slice().reverse().slice(0, 60), stats: stats(list) };
  },

  async aiTest(_, me) {
    admin(me);
    const { aiCustomer } = await import('../lib/ai.js');
    try { return { ok: true, reply: await aiCustomer('td', 'de', []) }; } catch (e) { return { ok: false, error: String(e.message || e) }; }
  },

  // ===== QUẢN LÝ
  async adminOverview(_, me) {
    admin(me);
    const us = (await users()).filter(u => u.active !== false);
    const day = todayVN();
    const rows = [];
    for (const u of us) {
      const list = await atts(u.id);
      const st = stats(list);
      rows.push({ id: u.id, name: u.name, role: u.role, today: list.filter(a => a.date === day).length, avg: st.avg, streak: st.streak, weakest: st.weakest, count: st.count, pending: list.filter(a => a.status === 'ai').length, last: list.length ? list[list.length - 1].date : null, daily: st.daily });
    }
    rows.sort((a, b) => (b.avg ?? -1) - (a.avg ?? -1));
    return { rows, day, ai: hasAI() };
  },

  async adminAttempts({ userId, onlyPending }, me) {
    admin(me);
    const us = await users();
    const ids = userId ? [userId] : us.map(u => u.id);
    const out = [];
    for (const id of ids) {
      const u = us.find(x => x.id === id);
      for (const a of await atts(id)) if (!onlyPending || a.status === 'ai') out.push({ ...a, userId: id, userName: u?.name || id });
    }
    out.sort((a, b) => b.at - a.at);
    return { list: out.slice(0, 80) };
  },

  async adminReview({ userId, attemptId, scores, comment }, me) {
    admin(me);
    const list = await atts(userId);
    const a = list.find(x => x.id === attemptId);
    if (!a) throw new Error('Không tìm thấy bài');
    const sc = scores || a.ai.scores;
    a.final = { scores: sc, total: total(sc), comment: comment || '', by: me.name, at: Date.now() };
    a.status = 'reviewed';
    await saveAtts(userId, list);
    return { attempt: a };
  },

  async adminUsers(_, me) {
    admin(me);
    return { list: (await users()).map(({ pinHash, salt, ...u }) => u) };
  },

  async adminSaveUser({ id, name, pin, role, active }, me) {
    admin(me);
    const list = await users();
    name = String(name || '').trim();
    if (!name) throw new Error('Thiếu tên');
    if (name.toLowerCase() === 'admin') throw new Error('Tên "admin" dành cho quản lý');
    let u = id && list.find(x => x.id === id);
    if (!u) {
      if (list.some(x => x.name.toLowerCase() === name.toLowerCase())) throw new Error('Tên đã tồn tại');
      if (!pin || String(pin).length < 4) throw new Error('Mã PIN tối thiểu 4 số');
      u = { id: newId(), createdAt: Date.now() }; list.push(u);
    }
    u.name = name; u.role = role === 'admin' ? 'admin' : 'sale'; u.active = active !== false;
    if (pin) { pin = String(pin).trim(); u.salt = newSalt(); u.pinHash = hashPin(pin, u.salt); }
    await writeDoc('users', list);
    return { ok: true };
  },

  async adminSaveScenario(s, me) {
    admin(me);
    const list = await customSc();
    if (!s.g || !GROUPS[s.g] || !s.title || !s.msg) throw new Error('Thiếu nhóm, tên hoặc tin nhắn khách');
    const item = { id: s.id || 'c' + newId(), g: s.g, title: s.title, stage: s.stage || 'Tình huống', ctx: s.ctx || '', msg: s.msg,
      tips: String(s.tips || '').split('\n').map(x => x.trim()).filter(Boolean), sample: s.sample || '', kw: String(s.kw || '').split(',').map(x => x.trim()).filter(Boolean), custom: true };
    const i = list.findIndex(x => x.id === item.id);
    if (i >= 0) list[i] = item; else list.push(item);
    await writeDoc('scenarios', list);
    return { ok: true };
  },

  async adminDelScenario({ id }, me) {
    admin(me);
    await writeDoc('scenarios', (await customSc()).filter(x => x.id !== id));
    return { ok: true };
  },
};

function strip(s) { const { kw, ...rest } = s; return rest; }
function admin(me) { if (me.role !== 'admin') throw new Error('Chỉ quản lý được dùng chức năng này'); }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  setOidc(req.headers['x-vercel-oidc-token']);
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { action, ...args } = body;
    const fn = handlers[action];
    if (!fn) return res.status(400).json({ error: 'Không có chức năng ' + action });
    let me = null;
    if (action !== 'login' && action !== 'health') {
      me = verify((req.headers.authorization || '').replace(/^Bearer\s+/i, ''));
      if (!me) return res.status(401).json({ error: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại' });
    }
    res.status(200).json(await fn(args, me));
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
}
