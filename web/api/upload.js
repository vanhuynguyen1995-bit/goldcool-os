// Tải ảnh lên cho bài viết (đã nén ở trình duyệt). Giới hạn 3 MB.
const L = require('./_lib.js');
module.exports = async (req, res) => {
  try {
    const me = L.session(req); if (!me || me.role === 'sales') return L.send(res, 401, { error: 'Không có quyền tải ảnh' });
    const b = await L.body(req);
    const m = String(b.data || '').match(/^data:(image\/(jpeg|png|webp));base64,(.+)$/); if (!m) return L.send(res, 400, { error: 'Chỉ nhận ảnh JPG, PNG, WEBP' });
    const buf = Buffer.from(m[3], 'base64'); if (buf.length > 3 * 1024 * 1024) return L.send(res, 400, { error: 'Ảnh lớn hơn 3 MB' });
    const p = `uploads/${new Date().toISOString().slice(0, 7)}/${L.stamp()}.${m[2] === 'jpeg' ? 'jpg' : m[2]}`;
    await L.putRaw(p, buf, m[1]);
    return L.send(res, 200, { ok: true, path: p });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
