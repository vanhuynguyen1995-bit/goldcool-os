// Dữ liệu dùng chung cả công ty: bản chụp theo từng mục + danh sách cộng dồn + nhật ký thay đổi
const L = require('./_lib.js');
const SNAP = ['inbox', 'trang', 'prices', 'banned', 'decision', 'aiProduct'];
const LOGS = ['kudos', 'comments', 'newIssues', 'reports', 'exams'];
const AREA = { inbox: 'Hộp thư', trang: 'Khách Phạm Thu Trang', prices: 'Bảng giá bán lẻ', banned: 'Cài đặt AI Sales', decision: 'Thẻ vấn đề VD-1107', aiProduct: 'Sản phẩm', kudos: 'Ghi nhận', comments: 'Thẻ vấn đề VD-1107', newIssues: 'Thẻ vấn đề', reports: 'Báo cáo tuần', exams: 'Bài thi Sales' };
module.exports = async (req, res) => {
  try {
    const me = L.session(req); if (!me) return L.send(res, 401, { error: 'Chưa đăng nhập' });
    if (req.method === 'GET') {
      const all = await L.list('state/');
      const snap = {}, logs = {}, toRead = [];
      for (const k of SNAP) { const b = L.latest(all.filter((x) => x.pathname.startsWith(`state/snap/${k}/`))); if (b) toRead.push(L.read(b.url).then((v) => { if (v) snap[k] = v.value; })); }
      for (const k of LOGS) { logs[k] = []; const bs = all.filter((x) => x.pathname.startsWith(`state/log/${k}/`)).sort((a, b) => a.pathname.localeCompare(b.pathname)).slice(-200); bs.forEach((b, i) => toRead.push(L.read(b.url).then((v) => { if (v) logs[k][i] = v; }))); }
      const au = (await L.list('audit/')).sort((a, b) => b.pathname.localeCompare(a.pathname)).slice(0, 30); const audit = []; au.forEach((b, i) => toRead.push(L.read(b.url).then((v) => { if (v) audit[i] = v; })));
      await Promise.all(toRead);
      for (const k of LOGS) logs[k] = logs[k].filter(Boolean);
      return L.send(res, 200, { snap, logs, audit: audit.filter(Boolean), me: L.pub(me) });
    }
    const b = await L.body(req);
    const at = new Date().toISOString();
    if (b.type === 'snap' && SNAP.includes(b.key)) {
      await L.put(`state/snap/${b.key}/${L.stamp()}.json`, { value: b.value, by: me.k, at });
      const old = (await L.list(`state/snap/${b.key}/`)).sort((a, c) => a.pathname.localeCompare(c.pathname)).slice(0, -3); await L.del(old.map((x) => x.url));
    } else if (b.type === 'log' && LOGS.includes(b.key)) {
      await L.put(`state/log/${b.key}/${L.stamp()}.json`, { ...b.item, by: me.k, byName: me.n, at });
    } else return L.send(res, 400, { error: 'Mục dữ liệu không hợp lệ' });
    if (b.note) await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: AREA[b.key] || b.key, text: String(b.note).slice(0, 200), at });
    return L.send(res, 200, { ok: true });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
