// Đăng nhập, đăng xuất, đổi mật khẩu, đặt lại mật khẩu
const L = require('./_lib.js');
module.exports = async (req, res) => {
  try {
    const action = (req.query && req.query.a) || '';
    if (req.method === 'GET') { const u = L.session(req); return u ? L.send(res, 200, { user: L.pub(u) }) : L.send(res, 401, { error: 'Chưa đăng nhập' }); }
    const b = await L.body(req);
    if (action === 'login') {
      const u = L.USERS.find((x) => x.k === b.k); if (!u) return L.send(res, 400, { error: 'Không có tài khoản này' });
      const r = await L.checkPw(u.k, b.password || '');
      if (!r.ok) return L.send(res, 401, { error: 'Sai mật khẩu. Quên mật khẩu thì nhờ chị Huyền đặt lại.' });
      return L.send(res, 200, { user: L.pub(u), mustChange: r.mustChange }, L.makeCookie(u.k));
    }
    if (action === 'logout') return L.send(res, 200, { ok: true }, L.clearCookie);
    const me = L.session(req); if (!me) return L.send(res, 401, { error: 'Chưa đăng nhập' });
    if (action === 'password') {
      const np = String(b.newPassword || '');
      if (np.length < 8) return L.send(res, 400, { error: 'Mật khẩu mới cần ít nhất 8 ký tự' });
      if (np === 'goldcool2026') return L.send(res, 400, { error: 'Không dùng lại mật khẩu ban đầu' });
      const r = await L.checkPw(me.k, b.oldPassword || ''); if (!r.ok) return L.send(res, 401, { error: 'Mật khẩu hiện tại chưa đúng' });
      await L.setPw(me.k, np, me.k, false); return L.send(res, 200, { ok: true });
    }
    if (action === 'reset') {
      if (!L.ADMINS.includes(me.k)) return L.send(res, 403, { error: 'Chỉ Giám đốc hoặc HCNS được đặt lại mật khẩu' });
      const u = L.USERS.find((x) => x.k === b.k); if (!u) return L.send(res, 400, { error: 'Không có tài khoản này' });
      await L.put(`users/${u.k}/pw-${L.stamp()}.json`, { reset: true, by: me.k, at: new Date().toISOString() });
      await L.put(`audit/${L.stamp()}.json`, { user: me.k, area: 'Nhân viên', text: 'Đặt lại mật khẩu cho ' + u.n });
      return L.send(res, 200, { ok: true });
    }
    return L.send(res, 404, { error: 'Không rõ thao tác' });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
