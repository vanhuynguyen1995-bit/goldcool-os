/* GoldCool – trang quản trị website: khách để lại thông tin, bài viết, tài khoản */
(function () {
  'use strict';
  const app = document.getElementById('app');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dt = (v) => { if (!v) return ''; const d = new Date(v); return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }); };
  let tt; const toast = (m, k) => { const t = $('#toast'); t.textContent = m; t.className = 'on ' + (k || ''); clearTimeout(tt); tt = setTimeout(() => { t.className = ''; }, 3200); };
  const api = async (path, opt = {}) => { const r = await fetch(path, { credentials: 'same-origin', headers: { 'content-type': 'application/json' }, ...opt }); let j = {}; try { j = await r.json(); } catch (e) { j = {}; } return { ok: r.ok, status: r.status, j }; };
  const ST_CLS = { 'Mới': 'st-new', 'Đã liên hệ': 'st-call', 'Đã báo giá': 'st-quote', 'Đã chốt': 'st-win', 'Không nhu cầu': 'st-lost' };
  const IMGS = ['td4c-gc', 'td6c-gc', 'tm2c-gc', 'tm2c-gc-02', 'tm2c-gc-03', 'tm3c-gc', 'tm3c-gc-02', 'tm3c-gc-03', 'bc-gc', 'salad-gc', 'tdtb-gc-kinhcong', 'tdtb-gc-kinhphang', 'tdtb-gc-xada', 'gw-gc', 'td4c-mr', 'td6c-mr', 'tm2c-mr', 'tm3c-mr', 'bc-mr'];
  const imgUrl = (c) => !c ? '' : /^https?:/.test(c) ? c : /^img\//.test(c) ? '../' + c : '/api/file?p=' + encodeURIComponent(c);
  const md = (s) => (window.GC_MD ? window.GC_MD(s) : esc(s)).replace(/src="img\//g, 'src="../img/');
  let ME = null, VIEW = 'leads', LEADS = [], FILTER = '', Q = '', POSTS = []; let PRODS = [], CATS = { inox: [], combo: [] }, PG = 'inox';

  /* ===== Đăng nhập ===== */
  async function loginView() {
    const r = await api('/api/auth?a=accounts'); const accs = r.j.accounts || [];
    let pick = accs[0] && accs[0].k;
    app.innerHTML = `<div class="lg"><div class="l"><div class="logo"><span class="mk"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F3D63" stroke-width="2.2" stroke-linecap="round"><path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9"/></svg></span><span><span class="g">Gold</span><span class="c">Cool</span></span></div><h1>Quản trị<br>website</h1><p>Đăng bài viết, xem và xử lý khách để lại thông tin trên website.</p></div>
    <div class="r"><div class="box"><h2>Đăng nhập</h2><p class="muted" style="margin-top:4px">Chọn tài khoản của bạn</p>
     <div class="accs" style="margin-top:14px">${accs.map((a) => `<button class="acc${a.k === pick ? ' on' : ''}" data-k="${a.k}"><span class="av">${esc(a.a)}</span><span><b>${esc(a.n)}</b><small>${{ admin: 'Quản trị', editor: 'Biên tập', sales: 'Sales' }[a.role]}</small></span></button>`).join('')}</div>
     <label class="lbl" for="pw">Mật khẩu</label><input class="inp" id="pw" type="password" autocomplete="current-password">
     <div class="err" id="er"></div><button class="btn g w" id="go">Đăng nhập</button>
     <p class="xs muted" style="margin-top:12px">Lần đầu đăng nhập sẽ được yêu cầu đặt mật khẩu riêng. Quên mật khẩu: nhờ Giám đốc hoặc chị Huyền đặt lại.</p></div></div></div>`;
    $$('.acc').forEach((b) => b.onclick = () => { pick = b.dataset.k; $$('.acc').forEach((x) => x.classList.toggle('on', x === b)); $('#pw').focus(); });
    const go = async () => {
      const pw = $('#pw').value; if (!pw) { $('#er').textContent = 'Nhập mật khẩu'; return; }
      $('#go').textContent = 'Đang đăng nhập…';
      const x = await api('/api/auth?a=login', { method: 'POST', body: JSON.stringify({ k: pick, password: pw }) });
      $('#go').textContent = 'Đăng nhập';
      if (!x.ok) { $('#er').textContent = x.j.error || 'Không đăng nhập được'; return; }
      ME = x.j.user; VIEW = ME.role === 'editor' ? 'posts' : 'leads'; await shell();
      if (x.j.mustChange) pwForm(true, pw);
    };
    $('#go').onclick = go; $('#pw').onkeydown = (e) => { if (e.key === 'Enter') go(); };
  }
  function pwForm(force, old) {
    const ov = document.createElement('div'); ov.className = 'ov';
    ov.innerHTML = `<div class="box"><h2>${force ? 'Đặt mật khẩu của bạn' : 'Đổi mật khẩu'}</h2><p class="muted" style="margin-top:4px">${force ? 'Lần đầu đăng nhập hoặc vừa được đặt lại. ' : ''}Ít nhất 8 ký tự.</p>
     <label class="lbl">Mật khẩu hiện tại</label><input class="inp" id="o" type="password" value="${force ? esc(old) : ''}">
     <label class="lbl">Mật khẩu mới</label><input class="inp" id="n" type="password" autocomplete="new-password">
     <label class="lbl">Nhập lại</label><input class="inp" id="n2" type="password" autocomplete="new-password">
     <div class="err" id="e"></div><div style="display:flex;gap:8px">${force ? '' : '<button class="btn l" id="c">Hủy</button>'}<button class="btn g" id="s" style="margin-left:auto">Lưu mật khẩu</button></div></div>`;
    document.body.append(ov);
    if ($('#c', ov)) $('#c', ov).onclick = () => ov.remove();
    $('#s', ov).onclick = async () => {
      const n = $('#n', ov).value; if (n.length < 8) { $('#e', ov).textContent = 'Ít nhất 8 ký tự'; return; } if (n !== $('#n2', ov).value) { $('#e', ov).textContent = 'Hai lần nhập chưa khớp'; return; }
      const r = await api('/api/auth?a=password', { method: 'POST', body: JSON.stringify({ oldPassword: $('#o', ov).value, newPassword: n }) });
      if (!r.ok) { $('#e', ov).textContent = r.j.error || 'Chưa đổi được'; return; } ov.remove(); toast('Đã lưu mật khẩu mới', 'ok');
    };
  }

  /* ===== Khung chính ===== */
  async function shell() {
    const nav = [['leads', 'Khách để lại thông tin'], ...(ME.role !== 'sales' ? [['posts', 'Bài viết'], ['products', 'Đồ inox & combo']] : []), ...(ME.role === 'admin' ? [['users', 'Tài khoản']] : [])];
    app.innerHTML = `<div class="shell"><aside class="side"><div class="logo"><span><span class="g">Gold</span><span class="c">Cool</span><small>Quản trị website</small></span></div>
     ${nav.map(([k, t]) => `<button data-v="${k}" class="${VIEW === k ? 'on' : ''}">${t}${k === 'leads' ? '<span class="cnt" id="newcnt" hidden></span>' : ''}</button>`).join('')}
     <button data-open="1">Xem website ↗</button><button data-pw="1">Đổi mật khẩu</button><button data-out="1">Đăng xuất</button>
     <div class="me"><span class="av" style="background:#2A5A85;color:#fff">${esc(ME.a)}</span><div>${esc(ME.n)}<small>${{ admin: 'Quản trị', editor: 'Biên tập', sales: 'Sales' }[ME.role]}</small></div></div></aside><main class="main" id="main"></main></div>`;
    $$('.side [data-v]').forEach((b) => b.onclick = () => { VIEW = b.dataset.v; $$('.side [data-v]').forEach((x) => x.classList.toggle('on', x === b)); draw(); });
    $('[data-open]').onclick = () => window.open('../index.html', '_blank');
    $('[data-pw]').onclick = () => pwForm(false);
    $('[data-out]').onclick = async () => { await api('/api/auth?a=logout', { method: 'POST' }); ME = null; loginView(); };
    await draw();
  }
  async function draw() { if (VIEW === 'leads') return leadsView(); if (VIEW === 'posts') return postsView(); if (VIEW === 'users') return usersView(); if (VIEW === 'products') return productsView(); }

  /* ===== Khách để lại thông tin ===== */
  async function leadsView() {
    const m = $('#main'); m.innerHTML = '<div class="muted">Đang tải…</div>';
    const r = await api('/api/leads'); if (!r.ok) { m.innerHTML = `<div class="err">${esc(r.j.error)}</div>`; return; }
    LEADS = r.j.leads; const STS = r.j.statuses;
    const n = (s) => LEADS.filter((l) => l.status === s).length;
    const nc = $('#newcnt'); if (nc) { nc.hidden = !n('Mới'); nc.textContent = n('Mới'); }
    const rows = LEADS.filter((l) => (!FILTER || l.status === FILTER) && (!Q || (l.name + ' ' + l.phone + ' ' + l.city + ' ' + l.model).toLowerCase().includes(Q)));
    m.innerHTML = `<div class="top"><div><h1>Khách để lại thông tin</h1><p>Từ form “Nhận tư vấn” trên website · ${LEADS.length} khách</p></div><div class="r"><button class="btn l sm" id="rf">Tải lại</button><button class="btn n sm" id="csv">Xuất Excel (CSV)</button></div></div>
     <div class="stats">${STS.map((s) => `<button class="stat${FILTER === s ? ' on' : ''}" data-s="${s}"><small>${s}</small><b>${n(s)}</b></button>`).join('')}</div>
     <div class="card"><div class="tools"><input class="inp" id="q" placeholder="Tìm tên, số điện thoại, tỉnh…" value="${esc(Q)}">${FILTER ? `<button class="btn l sm" id="clr">Bỏ lọc “${esc(FILTER)}”</button>` : ''}</div>
     <div class="tw"><table><thead><tr><th>Thời gian</th><th>Khách</th><th>Mô hình · Tỉnh</th><th>Sản phẩm quan tâm</th><th>Khi nào cần</th><th>Trạng thái</th><th>Người xử lý</th></tr></thead><tbody>
     ${rows.map((l) => `<tr class="click" data-id="${l.id}"><td class="xs muted" style="white-space:nowrap">${dt(l.createdAt)}</td><td><b>${esc(l.name)}</b><div class="xs"><a href="tel:${esc(l.phone)}" style="color:var(--navy)">${esc(l.phone)}</a></div></td><td>${esc(l.model)}<div class="xs muted">${esc(l.city)}</div></td><td class="xs">${esc((l.products || []).join(', '))}${l.size ? `<div class="muted">Chỗ đặt: ${esc(l.size)}</div>` : ''}</td><td class="xs">${esc(l.when)}</td><td><span class="pill ${ST_CLS[l.status]}">${esc(l.status)}</span></td><td class="xs">${esc(l.updatedBy || '—')}</td></tr>`).join('') || '<tr><td colspan="7" class="muted" style="text-align:center;padding:40px">Chưa có khách nào' + (FILTER || Q ? ' khớp bộ lọc' : '. Khi khách gửi form trên website, thông tin sẽ hiện ở đây.') + '</td></tr>'}
     </tbody></table></div></div>`;
    $$('.stat').forEach((b) => b.onclick = () => { FILTER = FILTER === b.dataset.s ? '' : b.dataset.s; leadsView(); });
    const q = $('#q'); q.oninput = () => { Q = q.value.toLowerCase().trim(); clearTimeout(q._t); q._t = setTimeout(() => { leadsView().then(() => { const x = $('#q'); x.focus(); x.setSelectionRange(x.value.length, x.value.length); }); }, 250); };
    if ($('#clr')) $('#clr').onclick = () => { FILTER = ''; leadsView(); };
    $('#rf').onclick = leadsView;
    $('#csv').onclick = () => {
      const cols = [['createdAt', 'Thời gian'], ['name', 'Họ tên'], ['phone', 'Số điện thoại'], ['model', 'Mô hình'], ['city', 'Tỉnh/thành'], ['products', 'Sản phẩm'], ['size', 'Chỗ đặt'], ['when', 'Khi nào cần'], ['note', 'Ghi chú khách'], ['status', 'Trạng thái'], ['staffNote', 'Ghi chú xử lý'], ['updatedBy', 'Người xử lý']];
      const cell = (v) => '"' + String(Array.isArray(v) ? v.join('; ') : v == null ? '' : v).replace(/"/g, '""') + '"';
      const csv = '﻿' + [cols.map((c) => cell(c[1])).join(',')].concat(rows.map((l) => cols.map(([k]) => cell(k === 'createdAt' ? dt(l[k]) : l[k])).join(','))).join('\r\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = 'khach-goldcool-' + new Date().toISOString().slice(0, 10) + '.csv'; a.click();
    };
    $$('tr[data-id]').forEach((tr) => tr.onclick = () => leadDrawer(tr.dataset.id, STS));
  }
  function leadDrawer(id, STS) {
    const l = LEADS.find((x) => x.id === id); if (!l) return;
    const d = document.createElement('div'); d.className = 'drawer';
    d.innerHTML = `<div class="pn"><div style="display:flex;align-items:flex-start"><div><span class="pill ${ST_CLS[l.status]}">${esc(l.status)}</span><h2 style="font-size:24px;margin-top:8px">${esc(l.name)}</h2><a href="tel:${esc(l.phone)}" style="color:var(--navy);font-weight:700;font-size:17px">${esc(l.phone)}</a></div><button class="btn l sm" id="x" style="margin-left:auto">Đóng</button></div>
     <div style="display:flex;gap:8px;margin-top:14px"><a class="btn g sm" href="tel:${esc(l.phone)}">Gọi</a><a class="btn l sm" target="_blank" rel="noopener" href="https://zalo.me/${esc(l.phone.replace(/\D/g, '').replace(/^84/, '0'))}">Zalo</a></div>
     <dl class="kv"><dt>Gửi lúc</dt><dd>${dt(l.createdAt)}</dd><dt>Mô hình</dt><dd>${esc(l.model)}</dd><dt>Tỉnh / thành</dt><dd>${esc(l.city)}</dd><dt>Sản phẩm</dt><dd>${esc((l.products || []).join(', '))}</dd><dt>Chỗ đặt</dt><dd>${esc(l.size || '—')}</dd><dt>Khi nào cần</dt><dd>${esc(l.when || '—')}</dd><dt>Ghi chú của khách</dt><dd>${esc(l.note || '—')}</dd><dt>Gửi từ trang</dt><dd class="xs muted">${esc(l.page || '')}</dd></dl>
     <label class="lbl">Trạng thái</label><select class="inp" id="st">${STS.map((s) => `<option${s === l.status ? ' selected' : ''}>${s}</option>`).join('')}</select>
     <label class="lbl">Ghi chú xử lý</label><textarea class="inp" id="nt" rows="3" placeholder="Đã gọi lúc…, khách cần…">${esc(l.staffNote || '')}</textarea>
     <button class="btn n w" id="sv" style="margin-top:14px">Lưu</button>
     <h3 style="margin-top:24px;font-size:15px">Lịch sử xử lý</h3><div class="hist">${(l.history || []).slice().reverse().map((h) => `<div><b>${esc(h.by)}</b> · ${dt(h.at)} · ${esc(h.status)}${h.note ? `<div class="muted">${esc(h.note)}</div>` : ''}</div>`).join('') || '<div class="muted">Chưa có</div>'}</div></div>`;
    document.body.append(d);
    const close = () => d.remove(); $('#x', d).onclick = close; d.onclick = (e) => { if (e.target === d) close(); };
    $('#sv', d).onclick = async () => {
      $('#sv', d).textContent = 'Đang lưu…';
      const r = await api('/api/leads?id=' + encodeURIComponent(id), { method: 'POST', body: JSON.stringify({ status: $('#st', d).value, staffNote: $('#nt', d).value }) });
      if (!r.ok) { $('#sv', d).textContent = 'Lưu'; toast(r.j.error || 'Chưa lưu được', 'bad'); return; }
      toast('Đã lưu', 'ok'); close(); leadsView();
    };
  }

  /* ===== Bài viết ===== */
  async function postsView() {
    const m = $('#main'); m.innerHTML = '<div class="muted">Đang tải…</div>';
    const r = await api('/api/posts?all=1'); POSTS = r.j.posts || [];
    m.innerHTML = `<div class="top"><div><h1>Bài viết</h1><p>${POSTS.filter((p) => p.status === 'published').length} bài đã đăng · ${POSTS.filter((p) => p.status !== 'published').length} bản nháp</p></div><div class="r"><button class="btn g sm" id="nw">+ Viết bài mới</button></div></div>
     <div class="card"><div class="tw"><table><thead><tr><th></th><th>Tiêu đề</th><th>Chuyên mục</th><th>Trạng thái</th><th>Cập nhật</th><th></th></tr></thead><tbody>
     ${POSTS.map((p) => `<tr><td style="width:72px">${p.cover ? `<img src="${esc(imgUrl(p.cover))}" style="width:60px;height:44px;object-fit:cover;border-radius:8px">` : ''}</td><td><b>${esc(p.title)}</b><div class="xs muted">/${esc(p.slug)}</div></td><td class="xs">${esc(p.category)}</td><td><span class="pill ${p.status === 'published' ? 'st-win' : 'st-lost'}">${p.status === 'published' ? 'Đã đăng' : 'Nháp'}</span></td><td class="xs muted">${dt(p.at)}<div>${esc(p.updatedBy || p.author || '')}</div></td><td style="white-space:nowrap"><button class="btn l sm" data-e="${p.id}">Sửa</button> ${p.status === 'published' ? `<a class="btn l sm" target="_blank" href="../bai-viet.html?s=${encodeURIComponent(p.slug)}">Xem</a>` : ''}</td></tr>`).join('') || '<tr><td colspan="6" class="muted" style="text-align:center;padding:40px">Chưa có bài viết</td></tr>'}
     </tbody></table></div></div>`;
    $('#nw').onclick = () => editor(null);
    $$('[data-e]').forEach((b) => b.onclick = () => editor(POSTS.find((p) => p.id === b.dataset.e)));
  }
  function editor(p) {
    p = p || { title: '', slug: '', category: 'Kiến thức chọn tủ', excerpt: '', cover: 'img/td4c-gc.jpg', body: '## Tiêu đề mục\nViết nội dung ở đây…', status: 'draft' };
    const m = $('#main');
    m.innerHTML = `<div class="top"><div><button class="btn l sm" id="bk">← Danh sách bài</button><h1 style="margin-top:12px">${p.id ? 'Sửa bài viết' : 'Bài viết mới'}</h1></div><div class="r">${p.id ? '<button class="btn l sm" id="dl" style="color:var(--bad)">Xóa bài</button>' : ''}<button class="btn l sm" id="sd">Lưu nháp</button><button class="btn g sm" id="pb">${p.status === 'published' ? 'Cập nhật bài đã đăng' : 'Đăng bài'}</button></div></div>
     <div class="ed"><div class="card" style="padding:20px">
      <label class="lbl" style="margin-top:0">Tiêu đề *</label><input class="inp" id="t" value="${esc(p.title)}" maxlength="160">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div><label class="lbl">Đường dẫn (tự tạo nếu để trống)</label><input class="inp" id="sl" value="${esc(p.slug)}" placeholder="vi-du-duong-dan"></div><div><label class="lbl">Chuyên mục</label><input class="inp" id="ca" list="cats" value="${esc(p.category)}"><datalist id="cats">${['Kiến thức chọn tủ', 'Minh bạch', 'Tin GoldCool', 'Lắp đặt thực tế', 'Hướng dẫn sử dụng'].map((c) => `<option value="${c}">`).join('')}</datalist></div></div>
      <label class="lbl">Mô tả ngắn (hiện ở danh sách và Google)</label><textarea class="inp" id="ex" rows="2" maxlength="300">${esc(p.excerpt)}</textarea>
      <label class="lbl">Ảnh bìa</label><div class="covers" id="cv">${IMGS.map((i) => `<button data-c="img/${i}.jpg" class="${p.cover === 'img/' + i + '.jpg' ? 'on' : ''}"><img src="../img/${i}.jpg" alt=""></button>`).join('')}</div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px"><label class="btn l sm" style="cursor:pointer">Tải ảnh lên<input type="file" id="up" accept="image/*" hidden></label><span class="xs muted" id="cvn">${/^uploads\//.test(p.cover) ? 'Đang dùng ảnh đã tải lên' : ''}</span></div>
      <label class="lbl">Nội dung</label>
      <div class="tb"><button data-i="## ">Tiêu đề mục</button><button data-w="**">Đậm</button><button data-i="- ">Danh sách</button><button data-i="> ">Trích dẫn</button><label class="btn l sm" style="height:30px;padding:0 10px;font-size:13px;cursor:pointer">Chèn ảnh<input type="file" id="upi" accept="image/*" hidden></label></div>
      <textarea class="inp" id="bd" rows="22" style="font-family:ui-monospace,Menlo,monospace;font-size:14px">${esc(p.body)}</textarea>
      <p class="xs muted" style="margin-top:6px">## tiêu đề · **chữ đậm** · - danh sách · 1. danh sách số · &gt; trích dẫn · [chữ](liên kết). Không viết “tiết kiệm điện 50%”. Website không hiện giá bán – mời khách để lại thông tin để nhận báo giá.</p>
     </div><div><div class="xs muted" style="font-weight:700;margin-bottom:8px">XEM TRƯỚC</div><div class="pv" id="pv"></div></div></div>`;
    let cover = p.cover;
    const pv = () => { $('#pv').innerHTML = `${cover ? `<img src="${esc(imgUrl(cover))}" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:12px">` : ''}<div class="eyebrow" style="margin-top:16px">${esc($('#ca').value)}</div><h1 style="font-size:28px;letter-spacing:-.02em;margin-top:6px;line-height:1.2">${esc($('#t').value || 'Tiêu đề bài viết')}</h1><div class="prose">${md($('#bd').value)}</div>`; };
    ['t', 'ca', 'bd'].forEach((id) => $('#' + id).addEventListener('input', pv)); pv();
    $$('#cv button').forEach((b) => b.onclick = () => { cover = b.dataset.c; $$('#cv button').forEach((x) => x.classList.toggle('on', x === b)); $('#cvn').textContent = ''; pv(); });
    const ta = $('#bd');
    $$('.tb [data-i]').forEach((b) => b.onclick = () => { const s = ta.selectionStart; const ls = ta.value.lastIndexOf('\n', s - 1) + 1; ta.value = ta.value.slice(0, ls) + b.dataset.i + ta.value.slice(ls); ta.focus(); pv(); });
    $$('.tb [data-w]').forEach((b) => b.onclick = () => { const s = ta.selectionStart, e = ta.selectionEnd, w = b.dataset.w; const sel = ta.value.slice(s, e) || 'chữ đậm'; ta.value = ta.value.slice(0, s) + w + sel + w + ta.value.slice(e); ta.focus(); pv(); });
    const upload = async (file) => {
      const img = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = URL.createObjectURL(file); });
      const k = Math.min(1, 1600 / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      toast('Đang tải ảnh…');
      const r = await api('/api/upload', { method: 'POST', body: JSON.stringify({ data: c.toDataURL('image/jpeg', 0.82) }) });
      if (!r.ok) { toast(r.j.error || 'Chưa tải được ảnh', 'bad'); return null; } toast('Đã tải ảnh', 'ok'); return r.j.path;
    };
    $('#up').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; const pth = await upload(f); if (pth) { cover = pth; $$('#cv button').forEach((x) => x.classList.remove('on')); $('#cvn').textContent = 'Đang dùng ảnh đã tải lên'; pv(); } };
    $('#upi').onchange = async (e) => { const f = e.target.files[0]; if (!f) return; const pth = await upload(f); if (pth) { const s = ta.selectionStart; ta.value = ta.value.slice(0, s) + `\n![](${pth})\n` + ta.value.slice(s); pv(); } };
    const save = async (status) => {
      const body = { id: p.id, title: $('#t').value, slug: $('#sl').value, category: $('#ca').value, excerpt: $('#ex').value, cover, body: ta.value, status };
      if (/tiết kiệm (điện )?50 ?%/i.test(body.body + body.title + body.excerpt)) { toast('DNA không cho phép viết “tiết kiệm điện 50%”', 'bad'); return; }
      if (/\d{1,3}([.,]\d{3}){1,3}\s*(đ|đồng|vnđ|vnd|₫)|\d+([.,]\d+)?\s*(triệu|tr)\b/i.test(body.body + body.title + body.excerpt)) { toast('Website không hiện giá bán. Hãy bỏ con số giá trong bài.', 'bad'); return; }
      const r = await api('/api/posts', { method: 'POST', body: JSON.stringify(body) });
      if (!r.ok) { toast(r.j.error || 'Chưa lưu được', 'bad'); return; }
      toast(status === 'published' ? 'Đã đăng bài' : 'Đã lưu nháp', 'ok'); postsView();
    };
    $('#sd').onclick = () => save('draft'); $('#pb').onclick = () => save('published');
    $('#bk').onclick = postsView;
    if ($('#dl')) $('#dl').onclick = async () => { const b = $('#dl'); if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Bấm lần nữa để xóa'; return; } const r = await api('/api/posts?id=' + encodeURIComponent(p.id), { method: 'DELETE' }); if (r.ok) { toast('Đã xóa bài', 'ok'); postsView(); } else toast(r.j.error || 'Chưa xóa được', 'bad'); };
  }


  /* ===== Đồ bếp inox & combo ===== */
  const PRICE_RE = /\d{1,3}([.,]\d{3}){1,3}\s*(đ|đồng|vnđ|vnd|₫)|\d+([.,]\d+)?\s*(triệu|tr)\b|giá\s*(chỉ|từ|:)/i;
  async function productsView() {
    const m = $('#main'); m.innerHTML = '<div class="muted">Đang tải…</div>';
    const r = await api('/api/products?all=1'); PRODS = r.j.products || []; CATS = r.j.cats || CATS;
    const list = PRODS.filter((p) => p.group === PG);
    m.innerHTML = `<div class="top"><div><h1>Đồ bếp inox &amp; combo</h1><p>Hiện trên trang “Đồ bếp inox” và “Combo bếp”. Website không hiện giá bán.</p></div><div class="r"><button class="btn g sm" id="nw">+ Thêm ${PG === 'combo' ? 'combo' : 'sản phẩm inox'}</button></div></div>
     <div class="cats" style="margin:0 0 16px">${[['inox', 'Đồ bếp inox'], ['combo', 'Combo thiết bị bếp']].map(([k, t]) => `<button data-g="${k}" class="${PG === k ? 'on' : ''}">${t} (${PRODS.filter((p) => p.group === k).length})</button>`).join('')}</div>
     <div class="card"><div class="tw"><table><thead><tr><th></th><th>Tên</th><th>Nhóm</th><th>Trạng thái</th><th>Cập nhật</th><th></th></tr></thead><tbody>
     ${list.map((p) => `<tr><td style="width:72px">${p.image ? `<img src="${esc(imgUrl(p.image))}" style="width:60px;height:44px;object-fit:cover;border-radius:8px">` : '<div style="width:60px;height:44px;border-radius:8px;background:var(--ice)"></div>'}</td><td><b>${esc(p.name)}</b><div class="xs muted">${esc((p.items || []).length ? (p.items.length + ' dòng thông tin') : (p.summary || '').slice(0, 60))}</div></td><td class="xs">${esc(p.category)}</td><td><span class="pill ${p.status === 'published' ? 'st-win' : 'st-lost'}">${p.status === 'published' ? 'Đang hiện' : 'Ẩn'}</span></td><td class="xs muted">${dt(p.at)}<div>${esc(p.updatedBy || '')}</div></td><td style="white-space:nowrap"><button class="btn l sm" data-e="${p.id}">Sửa</button> ${p.status === 'published' ? `<a class="btn l sm" target="_blank" href="../chi-tiet.html?s=${encodeURIComponent(p.slug)}">Xem</a>` : ''}</td></tr>`).join('') || `<tr><td colspan="6" class="muted" style="text-align:center;padding:40px">${PG === 'inox' ? 'Chưa có sản phẩm inox. Bấm “+ Thêm sản phẩm inox” để đăng tên, ảnh thật và thông tin. Trang Đồ bếp inox vẫn hiện 8 nhóm sản phẩm.' : 'Chưa có combo.'}</td></tr>`}
     </tbody></table></div></div>`;
    $$('[data-g]').forEach((b) => b.onclick = () => { PG = b.dataset.g; productsView(); });
    $('#nw').onclick = () => productEditor(null);
    $$('[data-e]').forEach((b) => b.onclick = () => productEditor(PRODS.find((p) => p.id === b.dataset.e)));
  }
  function productEditor(p) {
    p = p || { group: PG, category: (CATS[PG] || [])[0] || '', name: '', image: '', summary: '', items: [], order: 50, status: 'published' };
    const combo = p.group === 'combo';
    const m = $('#main');
    m.innerHTML = `<div class="top"><div><button class="btn l sm" id="bk">← Danh sách</button><h1 style="margin-top:12px">${p.id ? 'Sửa' : 'Thêm'} ${combo ? 'combo' : 'sản phẩm inox'}</h1></div><div class="r">${p.id ? '<button class="btn l sm" id="dl" style="color:var(--bad)">Xóa</button>' : ''}<button class="btn l sm" id="sd">Lưu, chưa hiện</button><button class="btn g sm" id="pb">Lưu và hiện trên website</button></div></div>
     <div class="ed"><div class="card" style="padding:20px">
      <label class="lbl" style="margin-top:0">Tên ${combo ? 'combo' : 'sản phẩm'} *</label><input class="inp" id="nm" value="${esc(p.name)}" maxlength="120" placeholder="${combo ? 'Ví dụ: Combo bếp quán lẩu, nướng' : 'Ví dụ: Bàn inox 2 tầng'}">
      <div style="display:grid;grid-template-columns:1fr 120px;gap:12px"><div><label class="lbl">Nhóm</label><select class="inp" id="ca">${(CATS[p.group] || []).map((c) => `<option${c === p.category ? ' selected' : ''}>${esc(c)}</option>`).join('')}</select></div><div><label class="lbl">Thứ tự</label><input class="inp" id="od" type="number" min="0" max="999" value="${esc(p.order)}"></div></div>
      <label class="lbl">Mô tả ngắn</label><textarea class="inp" id="sm" rows="2" maxlength="400" placeholder="Dùng cho khu nào, hợp với quán nào">${esc(p.summary)}</textarea>
      <label class="lbl">${combo ? 'Combo gồm (mỗi dòng một thiết bị)' : 'Thông tin sản phẩm (mỗi dòng một ý: kích thước, chất liệu…)'}</label><textarea class="inp" id="it" rows="7" maxlength="4000">${esc((p.items || []).join('\n'))}</textarea>
      <label class="lbl">Ảnh</label><div class="covers" id="cv">${IMGS.map((i) => `<button data-c="img/${i}.jpg" class="${p.image === 'img/' + i + '.jpg' ? 'on' : ''}"><img src="../img/${i}.jpg" alt=""></button>`).join('')}</div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px"><label class="btn l sm" style="cursor:pointer">Tải ảnh thật lên<input type="file" id="up" accept="image/*" hidden></label><button class="btn l sm" id="noimg">Bỏ ảnh</button><span class="xs muted" id="cvn">${/^uploads\//.test(p.image) ? 'Đang dùng ảnh đã tải lên' : ''}</span></div>
      <p class="xs muted" style="margin-top:12px">Chỉ ghi thông số đã xác nhận. Không ghi giá bán, không viết “tiết kiệm điện 50%”. Khách bấm “Nhận báo giá” để để lại thông tin.</p>
     </div><div><div class="xs muted" style="font-weight:700;margin-bottom:8px">XEM TRƯỚC</div><div class="pv" id="pv"></div></div></div>`;
    let image = p.image;
    const pv = () => { $('#pv').innerHTML = `${image ? `<img src="${esc(imgUrl(image))}" style="width:100%;aspect-ratio:4/3;object-fit:contain;background:var(--ice);border-radius:12px">` : '<div style="aspect-ratio:4/3;background:var(--ice);border-radius:12px;display:grid;place-items:center;color:var(--muted)">Chưa có ảnh</div>'}<div class="eyebrow" style="margin-top:16px">${esc($('#ca').value)}</div><h2 style="font-size:24px;margin-top:6px">${esc($('#nm').value || 'Tên sản phẩm')}</h2><p class="muted" style="margin-top:6px">${esc($('#sm').value)}</p><ul class="chk" style="margin-top:12px">${$('#it').value.split('\n').filter((x) => x.trim()).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`; };
    ['nm', 'ca', 'sm', 'it'].forEach((id) => $('#' + id).addEventListener('input', pv)); pv();
    $$('#cv button').forEach((b) => b.onclick = () => { image = b.dataset.c; $$('#cv button').forEach((x) => x.classList.toggle('on', x === b)); $('#cvn').textContent = ''; pv(); });
    $('#noimg').onclick = () => { image = ''; $$('#cv button').forEach((x) => x.classList.remove('on')); $('#cvn').textContent = ''; pv(); };
    $('#up').onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      const img = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = URL.createObjectURL(f); });
      const k = Math.min(1, 1600 / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      toast('Đang tải ảnh…');
      const r = await api('/api/upload', { method: 'POST', body: JSON.stringify({ data: c.toDataURL('image/jpeg', 0.85) }) });
      if (!r.ok) { toast(r.j.error || 'Chưa tải được ảnh', 'bad'); return; }
      image = r.j.path; $$('#cv button').forEach((x) => x.classList.remove('on')); $('#cvn').textContent = 'Đang dùng ảnh đã tải lên'; toast('Đã tải ảnh', 'ok'); pv();
    };
    const save = async (status) => {
      const body = { id: p.id, group: p.group, name: $('#nm').value, category: $('#ca').value, order: $('#od').value, summary: $('#sm').value, items: $('#it').value, image, status, slug: p.slug };
      if (PRICE_RE.test(body.name + ' ' + body.summary + ' ' + body.items)) { toast('Website không hiện giá bán. Hãy bỏ con số giá.', 'bad'); return; }
      if (/tiết kiệm (điện )?50 ?%/i.test(body.name + body.summary + body.items)) { toast('DNA không cho phép viết “tiết kiệm điện 50%”', 'bad'); return; }
      const r = await api('/api/products', { method: 'POST', body: JSON.stringify(body) });
      if (!r.ok) { toast(r.j.error || 'Chưa lưu được', 'bad'); return; }
      toast(status === 'published' ? 'Đã lưu, đang hiện trên website' : 'Đã lưu (chưa hiện)', 'ok'); PG = p.group; productsView();
    };
    $('#sd').onclick = () => save('draft'); $('#pb').onclick = () => save('published'); $('#bk').onclick = productsView;
    if ($('#dl')) $('#dl').onclick = async () => { const b = $('#dl'); if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Bấm lần nữa để xóa'; return; } const r = await api('/api/products?id=' + encodeURIComponent(p.id), { method: 'DELETE' }); if (r.ok) { toast('Đã xóa', 'ok'); productsView(); } else toast(r.j.error || 'Chưa xóa được', 'bad'); };
  }
  /* ===== Tài khoản (Quản trị) ===== */
  async function usersView() {
    const r = await api('/api/auth?a=accounts'); const accs = r.j.accounts || [];
    $('#main').innerHTML = `<div class="top"><div><h1>Tài khoản</h1><p>Quản trị: toàn quyền · Biên tập: bài viết và xem khách · Sales: xử lý khách</p></div></div>
     <div class="card"><div class="tw"><table><thead><tr><th>Người dùng</th><th>Vai trò</th><th></th></tr></thead><tbody>${accs.map((a) => `<tr><td><div style="display:flex;gap:10px;align-items:center"><span class="av">${esc(a.a)}</span><div><b>${esc(a.n)}</b><div class="xs muted">${esc(a.r)}</div></div></div></td><td>${{ admin: 'Quản trị', editor: 'Biên tập', sales: 'Sales' }[a.role]}</td><td style="text-align:right">${a.k === ME.k ? '' : `<button class="btn l sm" data-r="${a.k}">Đặt lại mật khẩu</button>`}</td></tr>`).join('')}</tbody></table></div></div>
     <p class="xs muted" style="margin-top:12px">Đặt lại sẽ đưa mật khẩu về mật khẩu ban đầu; người đó phải đặt mật khẩu mới khi đăng nhập.</p>`;
    $$('[data-r]').forEach((b) => b.onclick = async () => { if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Bấm lần nữa để xác nhận'; b.style.color = 'var(--bad)'; return; } const x = await api('/api/auth?a=reset', { method: 'POST', body: JSON.stringify({ k: b.dataset.r }) }); if (x.ok) { b.textContent = '✓ Đã đặt lại'; b.disabled = true; toast('Đã đặt lại mật khẩu', 'ok'); } else toast(x.j.error || 'Chưa đặt lại được', 'bad'); });
  }

  (async () => { const r = await api('/api/auth'); if (r.ok) { ME = r.j.user; VIEW = ME.role === 'editor' ? 'posts' : 'leads'; shell(); } else loginView(); })();
})();
