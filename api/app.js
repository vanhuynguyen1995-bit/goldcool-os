import { readDoc, writeDoc } from '../lib/store.js';
import { sign, verify, hashPin, newSalt, newId, todayVN } from '../lib/auth.js';
import { SCENARIOS } from '../lib/scenarios.js';
import { SCENARIOS2 } from '../lib/scenarios2.js';
import { CRITERIA, GROUPS, PERSONAS, docs } from '../lib/kb.js';
import { hasAI, setOidc, aiScoreChat, aiCustomer, aiPing } from '../lib/ai.js';
import { fallbackScore, total } from '../lib/score.js';
import { SEED_MEDIA } from '../lib/media.js';

const ADMIN_PIN = process.env.ADMIN_PIN || '123456';
const DEFAULT_QUOTA = 10;
// Chia 20 cuộc/ngày cho 6 nhóm
const SPLIT = { td: 4, tm: 4, bc: 3, sl: 3, tb: 3, gw: 3 };
const GKEYS = Object.keys(GROUPS);
const PKEYS = Object.keys(PERSONAS);
const KINDS = ['anh', 'video', 'feedback', 'maure'];

const users = () => readDoc('users', []);
const customSc = () => readDoc('scenarios', []);
const allSc = async () => SCENARIOS.concat(SCENARIOS2, await customSc());
const atts = (uid) => readDoc('att-' + uid, []);
const saveAtts = (uid, a) => writeDoc('att-' + uid, a);
const finalTotal = (a) => (a.final ? a.final.total : a.ai ? a.ai.total : 0);
const admin = (me) => { if (me.role !== 'admin') throw new Error('Chỉ quản lý được dùng chức năng này'); };
const strip = ({ kw, ...rest }) => rest;

function rng(seed) { let h = 2166136261; for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return () => (h = (Math.imul(h, 1103515245) + 12345) >>> 0) / 4294967296; }

// Kế hoạch trong ngày: mỗi cuộc = 1 nhóm + 1 tình huống + 1 kiểu khách, không trùng tổ hợp, xáo trộn thứ tự
// Biến thể khách: tên, khu vực, thử thách phụ – để cùng 1 tình huống mỗi lần chat vẫn khác nhau
const NAMES = ['anh Tuấn', 'chị Hoa', 'anh Hùng', 'chị Lan', 'anh Dũng', 'chị Mai', 'anh Phong', 'chị Thảo', 'anh Nam', 'chị Hằng', 'anh Quân', 'chị Ngọc', 'anh Long', 'chị Trang', 'anh Sơn', 'chị Yến'];
const AREAS = ['Cầu Giấy, Hà Nội', 'Long Biên, Hà Nội', 'Hà Đông, Hà Nội', 'Đông Anh, Hà Nội', 'Từ Sơn, Bắc Ninh', 'TP Bắc Ninh', 'Văn Lâm, Hưng Yên', 'TP Hải Dương', 'Lê Chân, Hải Phòng', 'TP Thái Nguyên', 'Phúc Yên, Vĩnh Phúc', 'TP Nam Định', 'TP Thanh Hóa', 'Phủ Lý, Hà Nam', 'Việt Trì, Phú Thọ', 'TP Lạng Sơn'];
const TWISTS = [
  'giữa chừng hỏi phí vận chuyển về chỗ bạn là bao nhiêu',
  'nói đã xem bên khác rẻ hơn 2–3 triệu',
  'hỏi nếu hỏng thì ai sửa, bảo hành thế nào',
  'hỏi tủ/máy có tốn điện không',
  'nói muốn lấy 2 cái và hỏi có bớt không',
  'nói để hỏi ý vợ/chồng hoặc người nhà đã',
  'hỏi có trả góp hoặc trả sau được không',
  'hỏi bao giờ giao được hàng',
  'nghi ngờ hàng Trung Quốc, hỏi xuất xứ',
  'trả lời rất cụt, chỉ "ừ", "ok", Sale phải tự dẫn dắt',
  'xin xem ảnh hoặc video thực tế đang dùng ở quán khác',
  'hỏi có xem hàng trực tiếp ở kho được không',
  'than đang hơi kẹt tiền, chưa chắc mua ngay',
  'hỏi có lắp đặt, hướng dẫn sử dụng không',
];
export function variant(v) {
  v = Math.abs(Number(v) || 0);
  return { v, name: NAMES[v % NAMES.length], area: AREAS[Math.floor(v / 7) % AREAS.length], twist: TWISTS[Math.floor(v / 3) % TWISTS.length] };
}

// Kế hoạch trong ngày: ưu tiên tình huống Sale chưa làm / lâu chưa gặp, ghép kiểu khách + biến thể, xáo trộn thứ tự
export function makePlan(list, uid, day, quota, history) {
  const r = rng(uid + '|' + day);
  const last = {}; const lastPair = new Set();
  for (const a of history) if (a.date < day && a.scenarioId) { if (!last[a.scenarioId] || last[a.scenarioId] < a.date) last[a.scenarioId] = a.date; lastPair.add(a.scenarioId + '|' + a.persona); }
  const counts = {}; let sum = 0;
  for (const g of GKEYS) { counts[g] = Math.round(SPLIT[g] * quota / 20); sum += counts[g]; }
  let i = 0; while (sum < quota) { counts[GKEYS[i++ % 6]]++; sum++; } i = 0; while (sum > quota) { const g = GKEYS[5 - (i++ % 6)]; if (counts[g] > 0) { counts[g]--; sum--; } }
  const tasks = [];
  for (const g of GKEYS) {
    const pool = list.filter(s => s.g === g).map(s => ({ s, key: last[s.id] || '', rnd: r() }))
      .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : a.rnd - b.rnd));
    if (!pool.length) continue;
    for (let k = 0; k < counts[g]; k++) {
      const sc = pool[k % pool.length].s;
      let persona = PKEYS[Math.floor(r() * PKEYS.length)];
      for (let t = 0; t < PKEYS.length && lastPair.has(sc.id + '|' + persona); t++) persona = PKEYS[(PKEYS.indexOf(persona) + 1) % PKEYS.length];
      tasks.push({ g, sid: sc.id, persona, v: Math.floor(r() * 100000) });
    }
  }
  for (let k = tasks.length - 1; k > 0; k--) { const j = Math.floor(r() * (k + 1)); [tasks[k], tasks[j]] = [tasks[j], tasks[k]]; }
  return tasks.map((t, n) => ({ ...t, n: n + 1 }));
}

async function planFor(uid, day) {
  const u = (await users()).find(x => x.id === uid);
  const quota = u?.quota ?? DEFAULT_QUOTA;
  const list = await allSc();
  const history = await atts(uid);
  return { quota, list, history, tasks: makePlan(list, uid, day, quota, history) };
}

function stats(list) {
  const by = {}; CRITERIA.forEach(c => (by[c.k] = { sum: 0, n: 0 }));
  const days = {}; const grp = {};
  for (const a of list) {
    const sc = a.final?.scores || a.ai?.scores;
    if (sc) CRITERIA.forEach(c => { by[c.k].sum += Number(sc[c.k]) || 0; by[c.k].n++; });
    (days[a.date] ||= []).push(finalTotal(a));
    (grp[a.g] ||= []).push(finalTotal(a));
  }
  const crit = CRITERIA.map(c => ({ k: c.k, name: c.name, max: c.max, pct: by[c.k].n ? Math.round(by[c.k].sum / by[c.k].n / c.max * 100) : null }));
  const weakest = crit.filter(c => c.pct !== null).sort((a, b) => a.pct - b.pct)[0] || null;
  const daily = Object.keys(days).sort().slice(-14).map(d => ({ date: d, avg: avg(days[d]), n: days[d].length }));
  const groups = GKEYS.map(g => ({ g, name: GROUPS[g], avg: grp[g] ? avg(grp[g].slice(-10)) : null, n: grp[g]?.length || 0 }));
  let streak = 0; const set = new Set(Object.keys(days));
  const d = new Date(todayVN() + 'T00:00:00Z');
  if (!set.has(todayVN())) d.setUTCDate(d.getUTCDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) { streak++; d.setUTCDate(d.getUTCDate() - 1); }
  return { count: list.length, avg: avg(list.slice(-20).map(finalTotal)), crit, weakest, daily, groups, streak };
}
const avg = (arr) => (arr.length ? Math.round(arr.reduce((x, y) => x + y, 0) / arr.length) : null);

async function scoreChat(g, persona, messages, sc) {
  let r, err;
  if (hasAI()) { try { r = await aiScoreChat(g, persona, messages, sc); } catch (e) { err = String(e.message || e); } }
  if (!r) { r = fallbackScore(sc, messages.filter(m => m.role === 'user').map(m => m.content).join('\n\n')); if (err) r.aiError = err; }
  r.total = total(r.scores);
  return r;
}

let HEALTH = null;
const handlers = {
  async health() {
    if (HEALTH && HEALTH.ai.ok && HEALTH.chat.ok && Date.now() - HEALTH.at < 600000) return HEALTH;
    const t = async (k) => { const t0 = Date.now(); try { return { ok: true, reply: await aiPing(k), ms: Date.now() - t0 }; } catch (e) { return { ok: false, error: String(e.message || e).slice(0, 500), ms: Date.now() - t0 }; } };
    const [ai, chat] = await Promise.all([t('score'), t('chat')]);
    HEALTH = { at: Date.now(), ai, chat };
    return HEALTH;
  },

  async login({ name, pin }) {
    name = String(name || '').trim(); pin = String(pin ?? '').trim();
    if (name.toLowerCase() === 'admin') {
      if (pin !== String(ADMIN_PIN).trim()) throw new Error('Sai mã PIN');
      const u = { id: 'admin', name: 'Quản lý', role: 'admin' };
      return { token: sign(u), user: u };
    }
    const u = (await users()).find(x => x.name.toLowerCase() === name.toLowerCase() && x.active !== false);
    if (!u || hashPin(pin, u.salt) !== u.pinHash) throw new Error('Sai tên hoặc mã PIN');
    const me = { id: u.id, name: u.name, role: u.role };
    return { token: sign(me), user: me };
  },

  async meta(_, me) {
    return { user: me, ai: hasAI(), criteria: CRITERIA, groups: GROUPS, personas: PERSONAS, today: todayVN() };
  },

  // ===== SALE: kế hoạch 20 cuộc hôm nay
  async plan(_, me) {
    const day = todayVN();
    const { quota, list, tasks, history: mine } = await planFor(me.id, day);
    const today = mine.filter(a => a.date === day && a.task);
    const out = tasks.map(t => {
      const sc = list.find(s => s.id === t.sid) || {};
      const done = today.filter(a => a.task === t.n).pop();
      const vv = variant(t.v);
      return { ...t, who: vv.name, area: vv.area, title: sc.title, stage: sc.stage, ctx: sc.ctx, done: done ? { id: done.id, total: finalTotal(done) } : null };
    });
    return { day, quota, tasks: out, doneCount: out.filter(t => t.done).length, todayAvg: avg(today.map(finalTotal)), stats: stats(mine) };
  },

  // mở cuộc: trả về tin nhắn đầu của khách (không tốn lượt AI)
  async startTask({ n, g, persona, sid }, me) {
    if (n) {
      const { list, tasks } = await planFor(me.id, todayVN());
      const t = tasks.find(x => x.n === n); if (!t) throw new Error('Không có cuộc này');
      const sc = list.find(s => s.id === t.sid);
      return { g: t.g, persona: t.persona, title: sc.title, stage: sc.stage, ctx: sc.ctx, first: sc.msg, tips: sc.tips, ...variant(t.v) };
    }
    // luyện thêm: theo tình huống chọn sẵn, hoặc ngẫu nhiên trong nhóm
    const all = await allSc();
    let sc = sid && all.find(s => s.id === sid);
    if (sc) g = sc.g;
    if (!GROUPS[g]) throw new Error('Chọn nhóm sản phẩm');
    if (!sc) { const pool = all.filter(s => s.g === g); sc = pool[Math.floor(Math.random() * pool.length)]; }
    return { g, persona: PERSONAS[persona] ? persona : PKEYS[Math.floor(Math.random() * PKEYS.length)], sid: sc.id, title: sc.title, stage: sc.stage, ctx: sc.ctx, first: sc.msg, tips: sc.tips, ...variant(Math.floor(Math.random() * 100000)) };
  },

  async chat({ n, sid, g, persona, messages, v }, me) {
    if (!hasAI()) throw new Error('AI chưa được bật – báo quản lý.');
    const sc = await findSc(me, n, sid, v);
    const reply = await aiCustomer(sc?.g || g, persona, clean(messages).slice(-30), sc);
    const end = /\[HẾT\]/i.test(reply);
    return { reply: reply.replace(/\[HẾT\]/gi, '').trim(), end };
  },

  async finishChat({ n, sid, g, persona, messages, v }, me) {
    if (!messages || messages.filter(m => m.role === 'user').length < 2) throw new Error('Cần tư vấn ít nhất 2 tin trước khi chấm');
    const sc = await findSc(me, n, sid, v);
    g = sc?.g || g;
    const ai = await scoreChat(g, persona, clean(messages), sc);
    const a = { id: newId(), type: 'chat', task: n || null, scenarioId: sc?.id || null, g, persona, title: sc?.title || ('Luyện thêm – ' + GROUPS[g]), stage: sc?.stage || '', date: todayVN(), at: Date.now(), messages, ai, status: 'ai' };
    const list = await atts(me.id); list.push(a); await saveAtts(me.id, list);
    return { attempt: a, sample: sc?.sample || '' };
  },

  async history(_, me) {
    const list = await atts(me.id);
    return { list: list.slice().reverse().slice(0, 80), stats: stats(list) };
  },

  async docs() {
    const list = await allSc();
    return { sections: docs(), samples: list.filter(s => s.sample).map(s => ({ g: s.g, title: s.title, stage: s.stage, msg: s.msg, sample: s.sample })) };
  },

  // ===== THƯ VIỆN ẢNH / VIDEO
  async media() {
    const hidden = new Set(await readDoc('mediaHidden', []));
    return { list: SEED_MEDIA.filter(m => !hidden.has(m.id)).concat(await readDoc('media', [])) };
  },

  // Sale tự lưu ảnh/video/feedback mới vào thư viện chung
  async saveMedia({ g, kind, label, url, type }, me) {
    if (!GROUPS[g] || !label || !url) throw new Error('Thiếu nhóm, mô tả hoặc tệp');
    const list = await readDoc('media', []);
    const item = { id: newId(), g, kind: KINDS.includes(kind) ? kind : 'anh', label: String(label).trim().slice(0, 160), url, type: type || 'image/jpeg', by: me.name, at: Date.now() };
    list.push(item); await writeDoc('media', list);
    return { ok: true, item };
  },

  async adminSaveMedia({ id, g, kind, label, url, type }, me) {
    admin(me);
    if (!GROUPS[g] || !label || !url) throw new Error('Thiếu nhóm, tên hoặc tệp');
    const list = await readDoc('media', []);
    const item = { id: id || newId(), g, kind: kind || 'anh', label: String(label).trim(), url, type: type || (/\.(mp4|mov|webm)(\?|$)/i.test(url) ? 'video/mp4' : /^https?:\/\/[^/]*(youtu|tiktok|facebook|fb\.watch|drive\.google)/i.test(url) ? 'link' : 'image/jpeg'), at: Date.now() };
    const i = list.findIndex(x => x.id === item.id);
    if (i >= 0) list[i] = item; else list.push(item);
    await writeDoc('media', list);
    return { ok: true, item };
  },

  async adminDelMedia({ id }, me) {
    admin(me);
    if (String(id).startsWith('seed-')) { const h = await readDoc('mediaHidden', []); if (!h.includes(id)) h.push(id); await writeDoc('mediaHidden', h); return { ok: true }; }
    const list = await readDoc('media', []);
    const it = list.find(x => x.id === id);
    if (it && /blob\.vercel-storage\.com/.test(it.url)) { try { const { del } = await import('@vercel/blob'); await del(it.url); } catch {} }
    await writeDoc('media', list.filter(x => x.id !== id));
    return { ok: true };
  },

  // ===== QUẢN LÝ
  async adminReport({ day }, me) {
    admin(me);
    day = day || todayVN();
    const us = (await users()).filter(u => u.active !== false && u.role !== 'admin');
    const rows = [];
    for (const u of us) {
      const list = await atts(u.id);
      const dl = list.filter(a => a.date === day);
      const g = {}; for (const a of dl) (g[a.g] ||= []).push(finalTotal(a));
      const flags = dl.reduce((x, a) => x + ((a.ai?.flags || []).filter(Boolean).length ? 1 : 0), 0);
      const st = stats(dl);
      rows.push({ id: u.id, name: u.name, quota: u.quota ?? DEFAULT_QUOTA, done: dl.filter(a => a.task).length, extra: dl.filter(a => !a.task).length, avg: avg(dl.map(finalTotal)),
        groups: Object.fromEntries(GKEYS.map(k => [k, g[k] ? avg(g[k]) : null])), flags, weakest: st.weakest, pending: dl.filter(a => a.status === 'ai').length, streak: stats(list).streak });
    }
    rows.sort((a, b) => (b.done - a.done) || ((b.avg ?? -1) - (a.avg ?? -1)));
    return { day, rows, ai: hasAI(), groups: GROUPS };
  },

  async adminAttempts({ userId, onlyPending, day }, me) {
    admin(me);
    const us = await users();
    const ids = userId ? [userId] : us.map(u => u.id);
    const out = [];
    for (const id of ids) {
      const u = us.find(x => x.id === id);
      for (const a of await atts(id)) if ((!onlyPending || a.status === 'ai') && (!day || a.date === day)) out.push({ ...a, userId: id, userName: u?.name || id });
    }
    out.sort((a, b) => b.at - a.at);
    return { list: out.slice(0, 100) };
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
    return { list: (await users()).map(({ pinHash, salt, ...u }) => ({ quota: DEFAULT_QUOTA, ...u })) };
  },

  async adminSaveUser({ id, name, pin, role, active, quota }, me) {
    admin(me);
    const list = await users();
    name = String(name || '').trim();
    if (!name) throw new Error('Thiếu tên');
    if (name.toLowerCase() === 'admin') throw new Error('Tên "admin" dành cho quản lý');
    let u = id && list.find(x => x.id === id);
    if (!u) {
      if (list.some(x => x.name.toLowerCase() === name.toLowerCase())) throw new Error('Tên đã tồn tại');
      if (!pin || String(pin).trim().length < 4) throw new Error('Mã PIN tối thiểu 4 số');
      u = { id: newId(), createdAt: Date.now() }; list.push(u);
    }
    u.name = name; u.role = role === 'admin' ? 'admin' : 'sale'; u.active = active !== false;
    if (quota !== undefined) u.quota = Math.max(1, Math.min(40, Number(quota) || DEFAULT_QUOTA));
    if (pin) { pin = String(pin).trim(); u.salt = newSalt(); u.pinHash = hashPin(pin, u.salt); }
    await writeDoc('users', list);
    return { ok: true };
  },

  async scenarios() { return { list: (await allSc()).map(strip) }; },

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

function clean(messages) {
  return (messages || []).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.content || '').slice(0, 4000) }))
    // gộp các tin liên tiếp cùng người gửi (Sale gửi chữ + ảnh + video liền nhau)
    .reduce((a, m) => { const l = a[a.length - 1]; if (l && l.role === m.role) l.content += '\n' + m.content; else a.push({ ...m }); return a; }, []);
}

async function findSc(me, n, sid, v) {
  if (n) { const { tasks, list } = await planFor(me.id, todayVN()); const t = tasks.find(x => x.n === n); const sc = t && list.find(s => s.id === t.sid); return sc ? { ...sc, variant: variant(t.v) } : null; }
  const sc = sid && (await allSc()).find(s => s.id === sid);
  return sc ? { ...sc, variant: variant(v) } : null;
}

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
