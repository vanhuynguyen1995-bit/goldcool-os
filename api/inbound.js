// Cổng nhận khách từ chatbot Fanpage (Retion, chatbot.ai.vn, n8n…) và danh sách cho Hộp thư AI Sales.
// Chatbot gửi:  POST /api/inbound?key=<INBOUND_KEY>   (hoặc header x-goldcool-key)
// Xem:          GET  /api/inbound (Sales thấy khách được chia cho mình; Giám đốc/HCNS thấy tất cả)
// Cập nhật:     POST /api/inbound?id=<id> { status, note, zotech, assign (Giám đốc/HCNS) } · Tỉ lệ: POST /api/inbound?a=split { w: { ha: 40, … } }
// Nếu có ZOTECH_WEBHOOK_URL: mỗi khách mới được chuyển tiếp nguyên dữ liệu sang Zotech.
const crypto = require('crypto');
const L = require('./_lib.js');
const KEY = process.env.INBOUND_KEY || '';
const ZOTECH = process.env.ZOTECH_WEBHOOK_URL || '';
const STATUS = ['Mới', 'Đã liên hệ', 'Đã báo giá', 'Đã chốt', 'Không nhu cầu'];
const s = (v, n) => String(v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : v).replace(/[\u0000-\u0008\u000b-\u001f]/g, ' ').trim().slice(0, n);
const first = (o, keys) => { for (const k of keys) { const v = k.split('.').reduce((a, p) => (a && a[p] !== undefined ? a[p] : undefined), o); if (v !== undefined && v !== null && String(v).trim() !== '') return v; } return ''; };
const safeEq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

// Gom các tên trường hay gặp của các nền tảng chatbot về một dạng chung
function normalize(b) {
  const conv = first(b, ['conversation', 'transcript', 'messages', 'history', 'chat']);
  const lines = Array.isArray(conv) ? conv.slice(-40).map((m) => (typeof m === 'string' ? m : `${s(m.role || m.from || m.sender || m.who || '', 20)}: ${s(m.text || m.content || m.message || '', 500)}`)) : conv ? s(conv, 6000).split(/\n/).slice(-40) : [];
  const lv = s(first(b, ['level', 'funnel', 'cap', 'stage', 'lead_level']), 10).toUpperCase().replace(/^C3$/, 'L1');
  return {
    name: s(first(b, ['name', 'full_name', 'fullname', 'customer_name', 'customer.name', 'contact.name', 'user.name', 'ten']), 80) || 'Khách Fanpage',
    phone: s(first(b, ['phone', 'phone_number', 'sdt', 'customer.phone', 'contact.phone', 'mobile']), 20).replace(/[^\d+ ]/g, ''),
    address: s(first(b, ['address', 'dia_chi', 'city', 'province', 'location', 'customer.address']), 120),
    source: s(first(b, ['source', 'channel', 'page', 'page_name', 'platform']), 40) || 'Fanpage',
    psid: s(first(b, ['psid', 'sender_id', 'user_id', 'customer_id', 'contact.id', 'conversation_id']), 80),
    link: s(first(b, ['link', 'conversation_url', 'chat_url', 'url']), 300),
    model: s(first(b, ['business', 'business_model', 'mo_hinh', 'model']), 80),
    product: s(first(b, ['product', 'san_pham', 'interest', 'product_interest', 'nhom_san_pham']), 120),
    size: s(first(b, ['size', 'kich_thuoc', 'dung_tich', 'capacity']), 60),
    cooling: s(first(b, ['cooling', 'lam_lanh', 'hinh_thuc_lam_lanh']), 40),
    choice: s(first(b, ['choice', 'brand', 'goldcool_or_cheap', 'lua_chon']), 40),
    quoted: s(first(b, ['quoted', 'price_sent', 'gia_da_gui']), 200),
    concern: s(first(b, ['concern', 'objection', 'ban_khoan']), 300),
    lastMessage: s(first(b, ['last_message', 'lastMessage', 'message', 'text', 'tin_cuoi']), 500),
    summary: s(first(b, ['summary', 'handover', 'note', 'ban_giao', 'tom_tat']), 2000),
    next: s(first(b, ['next_action', 'next', 'viec_tiep_theo']), 300),
    level: /^L[1-6]$/.test(lv) ? lv : '',
    urgent: /khiếu nại|bảo hành|hỏng|hư |không lạnh|không chạy|lỗi|khẩn/i.test(JSON.stringify(b).slice(0, 4000)),
    lines,
  };
}
// Chia khách theo tỉ lệ: Sales nào đang nhận ít nhất so với tỉ lệ của mình (tính trong tháng) thì nhận khách tiếp theo
const SALES = L.USERS.filter((u) => /sales/i.test(u.r || ''));
const DEFAULT_SPLIT = { ha: 34, anh: 33, yen: 33, nvkd4: 0 };
const month = () => new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 7);
async function getSplit() { const b = L.latest(await L.list('config/split/')); const v = b ? await L.read(b.url) : null; return (v && v.w) || DEFAULT_SPLIT; }
function pick(split, leads) {
  const mk = month(); let best = null;
  SALES.forEach((u, idx) => {
    const w = +split[u.k] || 0; if (w <= 0) return;
    const n = leads.filter((l) => l.owner === u.k && String(l.at).slice(0, 7) === mk).length;
    const score = (n + 1) / w;
    if (!best || score < best.score - 1e-9 || (Math.abs(score - best.score) < 1e-9 && n < best.n)) best = { k: u.k, score, n, idx };
  });
  return best ? best.k : '';
}
async function all() {
  const bs = await L.list('inbound/'); const by = {};
  bs.forEach((x) => { const id = x.pathname.split('/')[1]; (by[id] = by[id] || []).push(x); });
  const ids = Object.keys(by).sort().reverse().slice(0, 300);
  const out = await Promise.all(ids.map((id) => L.read(L.latest(by[id]).url)));
  return out.filter(Boolean);
}
module.exports = async (req, res) => {
  try {
    const q = req.query || {};
    const given = q.key || req.headers['x-goldcool-key'] || '';
    // 1. Chatbot đẩy khách vào → tự chia cho Sales theo tỉ lệ
    if (req.method === 'POST' && !q.id && !q.a && given) {
      if (!KEY) return L.send(res, 503, { error: 'Chưa cài INBOUND_KEY trên Vercel' });
      if (!safeEq(given, KEY)) return L.send(res, 401, { error: 'Sai khóa kết nối' });
      const b = await L.body(req);
      const id = L.stamp(); const at = new Date().toISOString();
      const lead = { id, at, status: 'Mới', owner: '', history: [], ...normalize(b), raw: s(b, 8000) };
      const split = await getSplit(); const k = pick(split, await all());
      if (k) { const u = SALES.find((x) => x.k === k); lead.owner = k; lead.ownerName = u.n; lead.history.push({ by: 'Hệ thống', at, status: 'Mới', note: 'Chia tự động theo tỉ lệ cho ' + u.n }); }
      await L.put(`inbound/${id}/${L.stamp()}.json`, lead);
      let forwarded = false;
      if (ZOTECH) { try { const r = await fetch(ZOTECH, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...b, goldcool_id: id, sales: lead.ownerName || '' }) }); forwarded = r.ok; } catch (e) { forwarded = false; } }
      if (forwarded) { lead.zotech = at; await L.put(`inbound/${id}/${L.stamp()}.json`, lead); }
      return L.send(res, 200, { ok: true, id, sales: lead.ownerName || '', forwarded });
    }
    const me = L.session(req); if (!me) return L.send(res, 401, { error: 'Chưa đăng nhập' });
    const admin = L.ADMINS.includes(me.k);
    // 2. Xem danh sách: Sales chỉ thấy khách của mình, Giám đốc / HCNS thấy tất cả
    if (req.method === 'GET') {
      const leads = (await all()).map(({ raw, ...x }) => x);
      const out = { leads: admin ? leads : leads.filter((l) => l.owner === me.k), statuses: STATUS, ready: !!KEY, zotech: !!ZOTECH, admin };
      if (admin) { const split = await getSplit(); const mk = month(); out.split = SALES.map((u) => ({ k: u.k, n: u.n, r: u.r, w: split[u.k] || 0, month: leads.filter((l) => l.owner === u.k && String(l.at).slice(0, 7) === mk).length })); out.unassigned = leads.filter((l) => !l.owner).length; }
      return L.send(res, 200, out);
    }
    // 3. Giám đốc / HCNS đặt tỉ lệ chia
    if (req.method === 'POST' && q.a === 'split') {
      if (!admin) return L.send(res, 403, { error: 'Chỉ Giám đốc hoặc HCNS được đặt tỉ lệ' });
      const b = await L.body(req); const w = {};
      SALES.forEach((u) => { const v = Math.max(0, Math.min(100, Math.round(+((b.w || {})[u.k]) || 0))); w[u.k] = v; });
      if (!Object.values(w).some((v) => v > 0)) return L.send(res, 400, { error: 'Cần ít nhất 1 Sales có tỉ lệ lớn hơn 0' });
      await L.put(`config/split/${L.stamp()}.json`, { w, by: me.k, at: new Date().toISOString() });
      await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: 'Chia khách', text: 'Đặt tỉ lệ chia khách: ' + SALES.map((u) => `${u.n.split(' ').pop()} ${w[u.k]}`).join(' · '), at: new Date().toISOString() });
      return L.send(res, 200, { ok: true, w });
    }
    // 4. Cập nhật khách: Sales chỉ sửa khách của mình; Giám đốc / HCNS chuyển khách cho Sales khác
    if (req.method === 'POST' && q.id) {
      const id = String(q.id).replace(/[^\w-]/g, '');
      const bs = await L.list(`inbound/${id}/`); if (!bs.length) return L.send(res, 404, { error: 'Không có khách này' });
      const cur = await L.read(L.latest(bs).url); const b = await L.body(req); const at = new Date().toISOString();
      if (!admin && cur.owner !== me.k) return L.send(res, 403, { error: 'Khách này đã chia cho ' + (cur.ownerName || 'Sales khác') });
      let moved = '';
      if (b.assign !== undefined && admin) { const u = SALES.find((x) => x.k === b.assign); if (!u) return L.send(res, 400, { error: 'Không có Sales này' }); if (u.k !== cur.owner) { moved = u.n; cur.owner = u.k; cur.ownerName = u.n; } }
      if (b.status && STATUS.includes(b.status)) cur.status = b.status;
      if (b.zotech !== undefined) cur.zotech = b.zotech ? at : '';
      if (b.note !== undefined) cur.staffNote = s(b.note, 1000);
      cur.history = (cur.history || []).concat([{ by: me.n, at, status: cur.status, note: [moved ? 'Chuyển cho ' + moved : '', b.note ? s(b.note, 300) : ''].filter(Boolean).join(' · ') }]).slice(-30);
      await L.put(`inbound/${id}/${L.stamp()}.json`, cur);
      await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: 'Khách Fanpage', text: `${cur.name}: ${moved ? 'chuyển cho ' + moved + ' · ' : ''}${cur.status}${b.zotech ? ' · đã nhập Zotech' : ''}`, at });
      const old = (await L.list(`inbound/${id}/`)).sort((a, c) => a.pathname.localeCompare(c.pathname)).slice(0, -3); await L.del(old.map((x) => x.url));
      return L.send(res, 200, { ok: true, lead: (({ raw, ...x }) => x)(cur) });
    }
    return L.send(res, 400, { error: 'Thao tác không hợp lệ' });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
