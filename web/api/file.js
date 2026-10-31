// Trả ảnh đã tải lên (kho riêng tư) cho trang công khai
const L = require('./_lib.js');
module.exports = async (req, res) => {
  try {
    const p = String((req.query || {}).p || '');
    if (!/^uploads\/\d{4}-\d{2}\/[\w-]+\.(jpg|png|webp)$/.test(p)) { res.statusCode = 404; return res.end('Không có ảnh'); }
    const bs = await L.list(p); const b = bs.find((x) => x.pathname === p); if (!b) { res.statusCode = 404; return res.end('Không có ảnh'); }
    const r = await fetch(b.url, { headers: { authorization: 'Bearer ' + process.env.BLOB_READ_WRITE_TOKEN } });
    if (!r.ok) { res.statusCode = 404; return res.end('Không có ảnh'); }
    res.setHeader('content-type', r.headers.get('content-type') || 'image/jpeg');
    res.setHeader('cache-control', 'public, max-age=31536000, immutable');
    res.end(Buffer.from(await r.arrayBuffer()));
  } catch (e) { res.statusCode = 500; res.end('Lỗi'); }
};
