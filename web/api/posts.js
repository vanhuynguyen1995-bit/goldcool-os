// Bài viết: đọc công khai (bài đã đăng), quản trị cần đăng nhập (editor, admin)
const L = require('./_lib.js');
const SEED = require('./_seed.js');
const slugify = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'bai-viet';
async function allPosts() {
  const bs = await L.list('posts/'); const by = {};
  bs.forEach((b) => { const id = b.pathname.split('/')[1]; (by[id] = by[id] || []).push(b); });
  const stored = (await Promise.all(Object.values(by).map((x) => L.read(L.latest(x).url)))).filter(Boolean);
  const ids = new Set(stored.map((p) => p.id));
  const posts = stored.concat(SEED.filter((p) => !ids.has(p.id))).filter((p) => !p.deleted);
  return posts.sort((a, b) => String(b.publishedAt || b.at).localeCompare(String(a.publishedAt || a.at)));
}
const lite = ({ body, ...p }) => p;
module.exports = async (req, res) => {
  try {
    const me = L.session(req);
    const q = req.query || {};
    if (req.method === 'GET') {
      const ps = await allPosts();
      if (q.slug) { const p = ps.find((x) => x.slug === q.slug && (x.status === 'published' || me)); return p ? L.send(res, 200, { post: p }) : L.send(res, 404, { error: 'Không có bài viết' }); }
      if (q.all && me) return L.send(res, 200, { posts: ps });
      res.setHeader('cache-control', 'public, s-maxage=30, stale-while-revalidate=300');
      return L.send(res, 200, { posts: ps.filter((p) => p.status === 'published').map(lite) });
    }
    if (!me) return L.send(res, 401, { error: 'Chưa đăng nhập' });
    if (me.role === 'sales') return L.send(res, 403, { error: 'Tài khoản Sales không sửa bài viết' });
    const b = await L.body(req);
    const ps = await allPosts();
    if (req.method === 'DELETE' || b.delete) {
      const id = String(q.id || b.id || '').replace(/[^\w-]/g, ''); if (!id) return L.send(res, 400, { error: 'Thiếu bài viết' });
      await L.put(`posts/${id}/${L.stamp()}.json`, { id, deleted: true, by: me.n, at: new Date().toISOString() });
      await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: 'Bài viết', text: 'Xóa bài ' + id, at: new Date().toISOString() });
      return L.send(res, 200, { ok: true });
    }
    const title = String(b.title || '').trim().slice(0, 160); if (title.length < 5) return L.send(res, 400, { error: 'Tiêu đề cần ít nhất 5 ký tự' });
    const id = b.id ? String(b.id).replace(/[^\w-]/g, '') : 'p' + Date.now().toString(36);
    const old = ps.find((p) => p.id === id);
    let slug = slugify(b.slug || title); if (ps.some((p) => p.slug === slug && p.id !== id)) slug += '-' + id.slice(-4);
    const status = b.status === 'published' ? 'published' : 'draft';
    const now = new Date().toISOString();
    const post = { id, title, slug, category: String(b.category || 'Kiến thức').slice(0, 40), excerpt: String(b.excerpt || '').slice(0, 300), cover: String(b.cover || '').slice(0, 300), body: String(b.body || '').slice(0, 60000), status, author: (old && old.author) || me.n, createdAt: (old && old.createdAt) || now, publishedAt: status === 'published' ? ((old && old.publishedAt) || now) : null, at: now, updatedBy: me.n };
    await L.put(`posts/${id}/${L.stamp()}.json`, post);
    await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: 'Bài viết', text: (old ? 'Sửa' : 'Tạo') + ' bài “' + title + '” (' + (status === 'published' ? 'đã đăng' : 'nháp') + ')', at: now });
    const vs = (await L.list(`posts/${id}/`)).sort((a, c) => a.pathname.localeCompare(c.pathname)).slice(0, -5); await L.del(vs.map((x) => x.url));
    return L.send(res, 200, { ok: true, post });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
