// Cổng nhận khách từ chatbot Fanpage (Retion, chatbot.ai.vn, n8n…) và danh sách cho Hộp thư AI Sales.
// Chatbot gửi:  POST /api/inbound?key=<INBOUND_KEY>   (hoặc header x-goldcool-key)
// Sales xem:    GET  /api/inbound            (cần đăng nhập)
// Sales cập nhật: POST /api/inbound?id=<id>  (cần đăng nhập) { claim, status, note, zotech }
// Nếu có ZOTECH_WEBHOOK_URL: mỗi khách mới được chuyển tiếp nguyên dữ liệu sang Zotech.
const crypto = require('crypto');
const L = require('./_lib.js');
const KEY = process.env.INBOUND_KEY || '';
const ZOTECH = process.env.ZOTECH_WEBHOOK_URL || '';
const STATUS = ['Mới', 'Sales đã nhận', 'Đã liên hệ', 'Đã báo giá', 'Đã chốt', 'Không nhu cầu'];
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
    // 1. Chatbot đẩy khách vào
    if (req.method === 'POST' && !q.id && given) {
      if (!KEY) return L.send(res, 503, { error: 'Chưa cài INBOUND_KEY trên Vercel' });
      if (!safeEq(given, KEY)) return L.send(res, 401, { error: 'Sai khóa kết nối' });
      const b = await L.body(req);
      const id = L.stamp(); const at = new Date().toISOString();
      const lead = { id, at, status: 'Mới', owner: '', history: [], ...normalize(b), raw: s(b, 8000) };
      await L.put(`inbound/${id}/${L.stamp()}.json`, lead);
      let forwarded = false;
      if (ZOTECH) { try { const r = await fetch(ZOTECH, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...b, goldcool_id: id }) }); forwarded = r.ok; } catch (e) { forwarded = false; } }
      if (forwarded) { lead.zotech = at; await L.put(`inbound/${id}/${L.stamp()}.json`, lead); }
      return L.send(res, 200, { ok: true, id, forwarded });
    }
    const me = L.session(req); if (!me) return L.send(res, 401, { error: 'Chưa đăng nhập' });
    // 2. Sales xem danh sách
    if (req.method === 'GET') return L.send(res, 200, { leads: (await all()).map(({ raw, ...x }) => x), statuses: STATUS, ready: !!KEY, zotech: !!ZOTECH });
    // 3. Sales nhận khách / cập nhật
    if (req.method === 'POST' && q.id) {
      const id = String(q.id).replace(/[^\w-]/g, '');
      const bs = await L.list(`inbound/${id}/`); if (!bs.length) return L.send(res, 404, { error: 'Không có khách này' });
      const cur = await L.read(L.latest(bs).url); const b = await L.body(req); const at = new Date().toISOString();
      if (b.claim) { if (cur.owner && cur.owner !== me.k) return L.send(res, 409, { error: 'Khách đã có ' + cur.ownerName + ' nhận' }); cur.owner = me.k; cur.ownerName = me.n; if (cur.status === 'Mới') cur.status = 'Sales đã nhận'; }
      if (b.status && STATUS.includes(b.status)) cur.status = b.status;
      if (b.zotech !== undefined) cur.zotech = b.zotech ? at : '';
      if (b.note !== undefined) cur.staffNote = s(b.note, 1000);
      cur.history = (cur.history || []).concat([{ by: me.n, at, status: cur.status, note: b.note ? s(b.note, 300) : '' }]).slice(-30);
      await L.put(`inbound/${id}/${L.stamp()}.json`, cur);
      await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: 'Khách Fanpage', text: `${cur.name}: ${b.claim ? 'nhận khách' : cur.status}${b.zotech ? ' · đã nhập Zotech' : ''}`, at });
      const old = (await L.list(`inbound/${id}/`)).sort((a, c) => a.pathname.localeCompare(c.pathname)).slice(0, -3); await L.del(old.map((x) => x.url));
      return L.send(res, 200, { ok: true, lead: (({ raw, ...x }) => x)(cur) });
    }
    return L.send(res, 400, { error: 'Thao tác không hợp lệ' });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
