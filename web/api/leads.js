// Khách để lại thông tin: gửi từ website (công khai), xem và xử lý (cần đăng nhập)
const L = require('./_lib.js');
const STATUS = ['Mới', 'Đã liên hệ', 'Đã báo giá', 'Đã chốt', 'Không nhu cầu'];
const clean = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
module.exports = async (req, res) => {
  try {
    if (req.method === 'POST' && !(req.query && req.query.id)) {
      const b = await L.body(req);
      if (b.website) return L.send(res, 200, { ok: true }); // bẫy chống spam
      const lead = { name: clean(b.name, 80), phone: clean(b.phone, 20).replace(/[^\d+ ]/g, ''), model: clean(b.model, 60), city: clean(b.city, 40), products: (Array.isArray(b.products) ? b.products : []).slice(0, 6).map((x) => clean(x, 40)), size: clean(b.size, 30), when: clean(b.when, 30), note: clean(b.note, 1000), page: clean(b.page, 100), ref: clean(b.ref, 200) };
      const digits = lead.phone.replace(/\D/g, '');
      if (lead.name.length < 2) return L.send(res, 400, { error: 'Thiếu họ tên' });
      if (digits.length < 9 || digits.length > 12) return L.send(res, 400, { error: 'Số điện thoại chưa đúng' });
      if (!lead.model || !lead.city || !lead.products.length) return L.send(res, 400, { error: 'Thiếu thông tin bắt buộc' });
      const id = L.stamp();
      await L.put(`leads/${id}/${L.stamp()}.json`, { ...lead, id, status: 'Mới', createdAt: new Date().toISOString(), ip: String(req.headers['x-forwarded-for'] || '').split(',')[0].slice(0, 45) });
      return L.send(res, 200, { ok: true });
    }
    const me = L.session(req); if (!me) return L.send(res, 401, { error: 'Chưa đăng nhập' });
    if (req.method === 'GET') {
      const all = await L.list('leads/'); const by = {};
      all.forEach((b) => { const id = b.pathname.split('/')[1]; (by[id] = by[id] || []).push(b); });
      const rows = await Promise.all(Object.values(by).map((bs) => L.read(L.latest(bs).url)));
      return L.send(res, 200, { leads: rows.filter(Boolean).sort((a, b) => b.id.localeCompare(a.id)), statuses: STATUS });
    }
    if (req.method === 'POST') { // cập nhật trạng thái / ghi chú xử lý
      const id = String(req.query.id).replace(/[^\w-]/g, '');
      const bs = await L.list(`leads/${id}/`); if (!bs.length) return L.send(res, 404, { error: 'Không thấy khách này' });
      const cur = await L.read(L.latest(bs).url); const b = await L.body(req);
      const next = { ...cur };
      if (b.status && STATUS.includes(b.status)) next.status = b.status;
      if (typeof b.staffNote === 'string') next.staffNote = clean(b.staffNote, 1000);
      if (b.assign !== undefined) next.assign = clean(b.assign, 40);
      next.history = (cur.history || []).concat({ at: new Date().toISOString(), by: me.n, status: next.status, note: b.staffNote ? clean(b.staffNote, 200) : undefined }).slice(-30);
      next.updatedAt = new Date().toISOString(); next.updatedBy = me.n;
      await L.put(`leads/${id}/${L.stamp()}.json`, next);
      const old = bs.sort((a, c) => a.pathname.localeCompare(c.pathname)).slice(1, -2); await L.del(old.map((x) => x.url));
      return L.send(res, 200, { ok: true, lead: next });
    }
    return L.send(res, 405, { error: 'Không hỗ trợ' });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
