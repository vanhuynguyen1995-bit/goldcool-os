// Sản phẩm đồ bếp inox và combo: xem công khai, quản trị cần đăng nhập (editor, admin). Không có giá bán.
const L = require('./_lib.js');
const { INOX_CATS, COMBO_CATS, SEED } = require('./_catalog.js');
const PRICE = /\d{1,3}([.,]\d{3}){1,3}\s*(đ|đồng|vnđ|vnd|₫)|\d+([.,]\d+)?\s*(triệu|tr)\b|giá\s*(chỉ|từ|:)/i;
const slugify = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'san-pham';
async function all() {
  const bs = await L.list('products/'); const by = {};
  bs.forEach((b) => { const id = b.pathname.split('/')[1]; (by[id] = by[id] || []).push(b); });
  const stored = (await Promise.all(Object.values(by).map((x) => L.read(L.latest(x).url)))).filter(Boolean);
  const ids = new Set(stored.map((p) => p.id));
  return stored.concat(SEED.filter((p) => !ids.has(p.id))).filter((p) => !p.deleted)
    .sort((a, b) => (a.group || '').localeCompare(b.group || '') || (+a.order || 99) - (+b.order || 99) || String(b.at).localeCompare(String(a.at)));
}
module.exports = async (req, res) => {
  try {
    const me = L.session(req); const q = req.query || {};
    if (req.method === 'GET') {
      let ps = await all();
      if (!(q.all && me)) { ps = ps.filter((p) => p.status === 'published'); res.setHeader('cache-control', 'public, s-maxage=30, stale-while-revalidate=300'); }
      if (q.slug) { const p = ps.find((x) => x.slug === q.slug); return p ? L.send(res, 200, { product: p }) : L.send(res, 404, { error: 'Không có sản phẩm' }); }
      if (q.group) ps = ps.filter((p) => p.group === q.group);
      return L.send(res, 200, { products: ps, cats: { inox: INOX_CATS, combo: COMBO_CATS } });
    }
    if (!me) return L.send(res, 401, { error: 'Chưa đăng nhập' });
    if (me.role === 'sales') return L.send(res, 403, { error: 'Tài khoản Sales không sửa sản phẩm' });
    const b = await L.body(req);
    if (req.method === 'DELETE' || b.delete) {
      const id = String(q.id || b.id || '').replace(/[^\w-]/g, ''); if (!id) return L.send(res, 400, { error: 'Thiếu sản phẩm' });
      await L.put(`products/${id}/${L.stamp()}.json`, { id, deleted: true, by: me.n, at: new Date().toISOString() });
      await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: 'Sản phẩm', text: 'Xóa sản phẩm ' + id, at: new Date().toISOString() });
      return L.send(res, 200, { ok: true });
    }
    const items = (Array.isArray(b.items) ? b.items : String(b.items || '').split(/\r?\n/)).map((x) => String(x).trim()).filter(Boolean).slice(0, 30).map((x) => x.slice(0, 160));
    const text = [b.name, b.summary, items.join(' ')].join(' ');
    if (PRICE.test(text)) return L.send(res, 400, { error: 'Website không hiện giá bán. Hãy bỏ con số giá.' });
    if (/tiết kiệm (điện )?50 ?%/i.test(text)) return L.send(res, 400, { error: 'DNA không cho phép viết “tiết kiệm điện 50%”' });
    const name = String(b.name || '').trim().slice(0, 120); if (name.length < 3) return L.send(res, 400, { error: 'Tên sản phẩm cần ít nhất 3 ký tự' });
    const group = b.group === 'combo' ? 'combo' : 'inox';
    const ps = await all();
    const id = b.id ? String(b.id).replace(/[^\w-]/g, '') : 'sp' + Date.now().toString(36);
    const old = ps.find((p) => p.id === id);
    let slug = slugify(b.slug || name); if (ps.some((p) => p.slug === slug && p.id !== id)) slug += '-' + id.slice(-4);
    const now = new Date().toISOString();
    const p = { id, group, category: String(b.category || (group === 'combo' ? COMBO_CATS[0] : INOX_CATS[0])).slice(0, 40), name, slug, image: String(b.image || '').slice(0, 300), summary: String(b.summary || '').slice(0, 400), items, order: Math.max(0, Math.min(999, parseInt(b.order, 10) || 50)), status: b.status === 'published' ? 'published' : 'draft', createdAt: (old && old.createdAt) || now, at: now, updatedBy: me.n };
    await L.put(`products/${id}/${L.stamp()}.json`, p);
    await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: 'Sản phẩm', text: (old ? 'Sửa' : 'Thêm') + ' “' + name + '”', at: now });
    const vs = (await L.list(`products/${id}/`)).sort((a, c) => a.pathname.localeCompare(c.pathname)).slice(0, -5); await L.del(vs.map((x) => x.url));
    return L.send(res, 200, { ok: true, product: p });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
