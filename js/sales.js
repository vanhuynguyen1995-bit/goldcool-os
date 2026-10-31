/* GoldCool OS · AI Sales — bản dùng thật: chỉ dữ liệu thật từ Fanpage / nhập tay.
   Trang: Hộp thư (việc cần làm ngay) · Khách (toàn bộ khách) · Báo cáo · Cài đặt. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
  const I = {
    inbox: svg('<path d="M3 13h5l2 3h4l2-3h5"/><path d="M5 5h14l2 8v6H3v-6z"/>'),
    users: svg('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.4 3.5 5.2"/>'),
    chart: svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    chat: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z"/>'),
    link: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
    back: svg('<path d="M15 18l-6-6 6-6"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    edit: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),
    flake: svg('<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2M4.2 10.6l3.4-.2-1.1-3.3M19.8 13.4l-3.4.2 1.1 3.3M4.2 13.4l3.4.2-1.1 3.3M19.8 10.6l-3.4-.2 1.1-3.3"/>', 'stroke-width="1.6"'),
  };
  const STC = { 'Mới': 's-moi', 'Đã liên hệ': 's-lienhe', 'Đã báo giá': 's-baogia', 'Đã chốt': 's-chot', 'Không nhu cầu': 's-khong' };
  const DONE = ['Đã chốt', 'Không nhu cầu'];
  const NAV = [['hop-thu', 'Hộp thư', 'inbox'], ['khach', 'Khách', 'users'], ['bao-cao', 'Báo cáo', 'chart'], ['cai-dat', 'Cài đặt', 'gear']];
  const S = { me: null, leads: [], statuses: Object.keys(STC), admin: false, ready: false, zotech: false, split: [], unassigned: 0, loaded: false, route: 'hop-thu', sel: '', f: { q: '', st: '', owner: '' }, period: '30', seen: null, dirty: false, timer: 0 };

  // ---------- Thời gian (giờ Việt Nam) ----------
  const VN = 7 * 3600e3;
  const dayKey = (t) => new Date((typeof t === 'number' ? t : Date.parse(t)) + VN).toISOString().slice(0, 10);
  const today = () => dayKey(Date.now());
  const hm = (iso) => new Date(Date.parse(iso) + VN).toISOString().slice(11, 16);
  const dm = (iso) => { const d = new Date(Date.parse(iso) + VN).toISOString(); return d.slice(8, 10) + '/' + d.slice(5, 7); };
  const when = (iso) => (dayKey(iso) === today() ? hm(iso) : hm(iso) + ' ' + dm(iso));
  const mins = (iso) => Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000));
  const ago = (iso) => { const m = mins(iso); if (m < 1) return 'vừa xong'; if (m < 60) return m + ' phút'; if (m < 24 * 60) return Math.floor(m / 60) + ' giờ'; return Math.floor(m / 1440) + ' ngày'; };
  const fu = (v) => (v ? v.replace('T', ' ').replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3/$2') : '');
  const due = (l) => l.followUp && !DONE.includes(l.status) && l.followUp.slice(0, 10) <= today();

  // ---------- Gọi máy chủ ----------
  async function api(path, opt = {}) {
    try {
      const r = await fetch(path, { credentials: 'same-origin', ...opt, headers: { 'content-type': 'application/json', ...(opt.headers || {}) } });
      let j = {}; try { j = await r.json(); } catch (e) { /* trống */ }
      return { ok: r.ok, status: r.status, j };
    } catch (e) { return { ok: false, status: 0, j: { error: 'Mất kết nối mạng, thử lại sau ít giây' } }; }
  }
  const post = (path, body) => api(path, { method: 'POST', body: JSON.stringify(body || {}) });

  function toast(msg, kind = '') { const d = document.createElement('div'); d.className = kind; d.textContent = msg; $('#toast').appendChild(d); setTimeout(() => d.remove(), 3200); }
  function modal(html, lock) {
    const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div class="box">${html}</div>`;
    m.addEventListener('click', (e) => { if ((e.target === m && !lock) || e.target.closest('[data-close]')) m.remove(); });
    document.body.appendChild(m); const f = m.querySelector('input,textarea,select'); if (f) setTimeout(() => f.focus(), 30); return m;
  }
  const busy = (btn, on) => { if (!btn) return; if (on) { btn.dataset.t = btn.innerHTML; btn.innerHTML = '<span class="spin"></span>'; btn.disabled = true; } else { btn.innerHTML = btn.dataset.t || btn.innerHTML; btn.disabled = false; } };

  // ---------- Đăng nhập ----------
  async function showLogin(err) {
    const r = await api('/api/auth?a=users'); const users = (r.j && r.j.users) || [];
    const groups = {}; users.forEach((u) => { (groups[u.d] = groups[u.d] || []).push(u); });
    let pick = (() => { try { return localStorage.getItem('gc_last') || ''; } catch (e) { return ''; } })();
    $('#root').innerHTML = `<div class="login">
      <div class="login-brand"><div class="brand"><span class="logo">${I.flake.replace('<svg', '<svg style="width:24px;height:24px;color:#0F3D63"')}</span><span><b>GoldCool</b> OS</span></div>
        <span class="flake" style="color:#fff">${I.flake}</span>
        <div><h1>CHỌN ĐÚNG –<br>DÙNG LÂU</h1><p>Hộp thư khách của đội Sales: khách từ Fanpage được AI tư vấn, chia theo tỉ lệ, Sales gọi và chốt.</p></div>
        <div class="addr">Kho CN05 KCN Nguyên Khê, Phúc Thịnh, Hà Nội · Hotline 0865 868 868 · goldcool.vn</div></div>
      <div class="login-form"><form class="login-card" id="lf" autocomplete="on">
        <h2>Đăng nhập</h2><p class="muted" style="margin:0 0 16px">Chọn tên của anh/chị rồi nhập mật khẩu.</p>
        <label class="f">Tài khoản</label>
        <div class="acc-list">${Object.keys(groups).map((g) => `<div class="acc-group">${esc(g)}</div>` + groups[g].map((u) => `<button type="button" class="acc${u.k === pick ? ' on' : ''}" data-k="${esc(u.k)}"><span class="av">${esc(u.a)}</span><span><b>${esc(u.n)}</b><small>${esc(u.r)}</small></span></button>`).join('')).join('')}</div>
        <label class="f" for="pw">Mật khẩu</label><input class="in" id="pw" type="password" autocomplete="current-password" placeholder="Nhập mật khẩu">
        <p class="err" id="lerr">${esc(err || '')}</p>
        <button class="btn pri big wide" id="lbtn">Đăng nhập</button>
        <p class="muted sm" style="margin:12px 0 0">Lần đầu đăng nhập sẽ được yêu cầu đổi mật khẩu. Quên mật khẩu: nhờ Kiên hoặc anh Huy đặt lại.</p>
      </form></div></div>`;
    $$('.acc').forEach((b) => b.onclick = () => { pick = b.dataset.k; $$('.acc').forEach((x) => x.classList.toggle('on', x === b)); $('#pw').focus(); });
    const on = $('.acc.on'); if (on) on.scrollIntoView({ block: 'nearest' });
    $('#lf').onsubmit = async (e) => {
      e.preventDefault(); const pw = $('#pw').value;
      if (!pick) return ($('#lerr').textContent = 'Anh/chị chọn tên của mình trước');
      if (!pw) return ($('#lerr').textContent = 'Nhập mật khẩu');
      busy($('#lbtn'), true); const r = await post('/api/auth?a=login', { k: pick, password: pw }); busy($('#lbtn'), false);
      if (!r.ok) return ($('#lerr').textContent = r.j.error || 'Không đăng nhập được');
      try { localStorage.setItem('gc_last', pick); } catch (e2) { /* bỏ qua */ }
      if (r.j.mustChange) return changePw(pw, true, () => boot(r.j.user));
      boot(r.j.user);
    };
  }
  function changePw(old, first, done) {
    const m = modal(`<h3>${first ? 'Đổi mật khẩu lần đầu' : 'Đổi mật khẩu'}</h3>
      ${first ? '<p class="muted" style="margin:-6px 0 14px">Mật khẩu ban đầu dùng chung nên cần đổi sang mật khẩu riêng.</p>' : `<div class="f-row"><label class="f">Mật khẩu hiện tại</label><input class="in" type="password" id="op" autocomplete="current-password"></div>`}
      <div class="f-row"><label class="f">Mật khẩu mới (ít nhất 8 ký tự)</label><input class="in" type="password" id="np" autocomplete="new-password"></div>
      <div class="f-row"><label class="f">Nhập lại mật khẩu mới</label><input class="in" type="password" id="np2" autocomplete="new-password"></div>
      <p class="err" id="perr"></p><div class="foot">${first ? '' : '<button class="btn" data-close>Hủy</button>'}<button class="btn pri" id="pbtn">Lưu mật khẩu</button></div>`, first);
    $('#pbtn', m).onclick = async () => {
      const np = $('#np', m).value, np2 = $('#np2', m).value, op = first ? old : $('#op', m).value;
      if (np.length < 8) return ($('#perr', m).textContent = 'Mật khẩu mới cần ít nhất 8 ký tự');
      if (np !== np2) return ($('#perr', m).textContent = 'Hai lần nhập chưa giống nhau');
      busy($('#pbtn', m), true); const r = await post('/api/auth?a=password', { oldPassword: op, newPassword: np }); busy($('#pbtn', m), false);
      if (!r.ok) return ($('#perr', m).textContent = r.j.error || 'Chưa đổi được');
      m.remove(); toast('Đã đổi mật khẩu', 'ok'); if (done) done();
    };
  }

  // ---------- Dữ liệu khách ----------
  async function load(quiet) {
    const r = await api('/api/inbound');
    if (r.status === 401) return showLogin('Phiên đăng nhập đã hết, anh/chị đăng nhập lại');
    if (!r.ok) { if (!quiet) toast(r.j.error || 'Chưa tải được danh sách khách', 'bad'); return; }
    Object.assign(S, { leads: r.j.leads || [], statuses: r.j.statuses || S.statuses, admin: !!r.j.admin, ready: !!r.j.ready, zotech: !!r.j.zotech, split: r.j.split || [], unassigned: r.j.unassigned || 0, loaded: true });
    const ids = new Set(S.leads.map((l) => l.id));
    if (S.seen) { const fresh = S.leads.filter((l) => !S.seen.has(l.id)); if (fresh.length) { toast(`Có ${fresh.length} khách mới`, 'ok'); try { navigator.vibrate && navigator.vibrate(200); } catch (e) { /* bỏ qua */ } } }
    S.seen = ids;
  }
  const lead = (id) => S.leads.find((l) => l.id === id);
  const inboxOf = () => {
    const act = S.leads.filter((l) => !DONE.includes(l.status));
    const urgent = act.filter((l) => l.urgent).sort((a, b) => a.at.localeCompare(b.at));
    const fresh = act.filter((l) => !l.urgent && l.status === 'Mới').sort((a, b) => a.at.localeCompare(b.at));
    const call = act.filter((l) => !l.urgent && l.status !== 'Mới' && due(l)).sort((a, b) => a.followUp.localeCompare(b.followUp));
    const none = S.admin ? S.leads.filter((l) => !l.owner && !DONE.includes(l.status)) : [];
    return { urgent, fresh, call, none, count: urgent.length + fresh.length + call.length };
  };

  // ---------- Khung app ----------
  function boot(me) { S.me = me; S.seen = null; shell(); route(); load().then(() => { paint(); }); clearInterval(S.timer); S.timer = setInterval(async () => { if (document.hidden || !S.me) return; await load(true); paintList(); badges(); if (S.sel && !S.dirty) paintPane(); if (S.route === 'bao-cao') paintReport(); }, 30000); }
  function shell() {
    const nav = (cls) => NAV.map(([k, t, ic]) => `<a href="#${k}" data-r="${k}" class="${cls}">${I[ic]}<span>${t}</span><span class="badge hide" data-b="${k}"></span></a>`).join('');
    $('#root').innerHTML = `<div class="app" id="app">
      <aside class="side"><div class="brand"><span class="logo">${I.flake.replace('<svg', '<svg style="width:20px;height:20px;color:#0F3D63"')}</span><span><b>GoldCool</b> OS</span></div>
        <nav class="nav">${nav('')}</nav>
        <div class="me"><span class="av">${esc(S.me.a)}</span><div><b>${esc(S.me.n)}</b><small>${esc(S.me.r)}</small></div></div></aside>
      <main class="main"><header class="top" id="top"></header><div class="body" id="body"></div>
        <nav class="tabbar">${nav('')}</nav></main></div>`;
  }
  function badges() {
    const n = inboxOf().count;
    $$('[data-b="hop-thu"]').forEach((b) => { b.textContent = n; b.classList.toggle('hide', !n); });
    document.title = (n ? `(${n}) ` : '') + 'GoldCool OS · AI Sales';
  }
  function route() {
    const [r, id] = (location.hash || '#hop-thu').slice(1).split('/');
    S.route = NAV.some((n) => n[0] === r) ? r : 'hop-thu'; S.sel = id ? decodeURIComponent(id) : ''; S.dirty = false;
    $$('[data-r]').forEach((a) => a.classList.toggle('on', a.dataset.r === S.route));
    $('#app').classList.toggle('has-sel', !!S.sel && (S.route === 'hop-thu' || S.route === 'khach'));
    paint();
  }
  window.addEventListener('hashchange', () => { if (S.me) route(); });
  function paint() {
    if (!S.me) return; badges();
    const top = $('#top'), body = $('#body');
    if (!S.loaded) { top.innerHTML = `<h1>${NAV.find((n) => n[0] === S.route)[1]}</h1>`; body.className = 'body'; body.innerHTML = '<div class="empty"><span class="spin"></span></div>'; return; }
    if (S.route === 'hop-thu' || S.route === 'khach') {
      const isIn = S.route === 'hop-thu';
      top.innerHTML = `<div><h1>${isIn ? 'Hộp thư' : S.admin ? 'Tất cả khách' : 'Khách của tôi'}</h1><div class="sub">${isIn ? 'Khách cần xử lý ngay: khẩn, khách mới, đến hẹn gọi lại' : 'Toàn bộ khách' + (S.admin ? ' của cả đội' : ' được chia cho anh/chị')}</div></div><span class="sp"></span><button class="btn" id="addb">${I.plus}<span>Thêm khách</span></button>`;
      $('#addb').onclick = addLead;
      body.className = 'body split'; body.innerHTML = '<div class="col list" id="list"></div><div class="col pane" id="pane"></div>';
      paintList(); paintPane();
    } else if (S.route === 'bao-cao') { top.innerHTML = `<div><h1>Báo cáo</h1><div class="sub">${S.admin ? 'Số liệu cả đội, đếm từ khách thật' : 'Số liệu khách của anh/chị'}</div></div>`; body.className = 'body'; paintReport(); }
    else { top.innerHTML = '<h1>Cài đặt</h1>'; body.className = 'body'; paintSettings(); }
  }

  // ---------- Danh sách ----------
  function row(l, opt = {}) {
    const wait = l.status === 'Mới' ? mins(l.at) : 0;
    const tags = [
      l.urgent && !DONE.includes(l.status) ? '<span class="tag bad">Khẩn</span>' : '',
      `<span class="tag ${STC[l.status] || ''}">${esc(l.status)}</span>`,
      wait > 15 ? `<span class="tag late">Chờ ${ago(l.at)}</span>` : '',
      l.level ? `<span class="tag lv">${esc(l.level)}</span>` : '',
      l.followUp && !DONE.includes(l.status) ? `<span class="tag${due(l) ? ' bad' : ''}">Hẹn ${esc(fu(l.followUp))}</span>` : '',
      l.product ? `<span class="tag">${esc(l.product.slice(0, 28))}</span>` : '',
      S.admin ? `<span class="tag">${esc(l.ownerName ? l.ownerName.split(' ').pop() : 'Chưa chia')}</span>` : '',
      !l.phone ? '<span class="tag">Chưa có SĐT</span>' : '',
    ].join('');
    return `<button class="row${l.id === S.sel ? ' on' : ''}" data-id="${esc(l.id)}"><div class="l1"><span class="nm">${esc(l.name)}</span><span class="tm">${esc(opt.time || when(l.at))}</span></div>
      <div class="msg">${esc(l.lastMessage || l.summary || l.product || l.source || '')}</div><div class="tags">${tags}</div></button>`;
  }
  function paintList() {
    const box = $('#list'); if (!box) return; let h = '';
    if (S.route === 'hop-thu') {
      const ib = inboxOf();
      const sec = (t, arr, empty) => (arr.length ? `<div class="grp"><span>${t}</span><span>${arr.length}</span></div>` + arr.map((l) => row(l)).join('') : empty || '');
      h = sec('Khẩn: bảo hành, khiếu nại', ib.urgent) + sec('Khách mới, cần gọi', ib.fresh) + sec('Đến hẹn gọi lại', ib.call) + (S.admin ? sec('Chưa chia cho Sales', ib.none) : '');
      if (!h) h = `<div class="empty"><b>Đã xử lý hết khách cần làm</b>${S.leads.length ? 'Khách mới từ Fanpage sẽ tự hiện ở đây.' : S.ready ? 'Chưa có khách nào. Khách từ Fanpage sẽ tự hiện ở đây.' : 'Chưa có khách nào vì Fanpage chưa được nối vào. ' + (S.admin ? 'Xem mục Cài đặt › Kết nối Fanpage.' : '')}<br><br>Có khách gọi hotline hoặc nhắn Zalo? Bấm <b style="display:inline">Thêm khách</b>.</div>`;
    } else {
      const q = S.f.q.trim().toLowerCase();
      const base = S.leads.filter((l) => (!S.f.owner || (S.f.owner === '-' ? !l.owner : l.owner === S.f.owner)) && (!q || [l.name, l.phone, l.product, l.address, l.lastMessage].join(' ').toLowerCase().includes(q)));
      const cnt = (st) => base.filter((l) => l.status === st).length;
      const list = base.filter((l) => !S.f.st || l.status === S.f.st).sort((a, b) => b.at.localeCompare(a.at));
      h = `<div class="filters"><input class="in" id="fq" placeholder="Tìm tên, SĐT, sản phẩm…" value="${esc(S.f.q)}" style="flex:1 1 100%">
        <button class="chip${!S.f.st ? ' on' : ''}" data-st="">Tất cả <i>${base.length}</i></button>${S.statuses.map((st) => `<button class="chip${S.f.st === st ? ' on' : ''}" data-st="${esc(st)}">${esc(st)} <i>${cnt(st)}</i></button>`).join('')}
        ${S.admin ? `<select class="in" id="fo" style="flex:1 1 100%"><option value="">Tất cả Sales</option>${S.split.map((u) => `<option value="${esc(u.k)}"${S.f.owner === u.k ? ' selected' : ''}>${esc(u.n)}</option>`).join('')}<option value="-"${S.f.owner === '-' ? ' selected' : ''}>Chưa chia</option></select>` : ''}</div>`
        + (list.length ? list.map((l) => row(l)).join('') : `<div class="empty"><b>Không có khách nào</b>${S.leads.length ? 'Thử bỏ bớt bộ lọc.' : 'Khách từ Fanpage hoặc khách anh/chị tự thêm sẽ hiện ở đây.'}</div>`);
    }
    const keep = document.activeElement && document.activeElement.id === 'fq' ? document.activeElement.selectionStart : null;
    box.innerHTML = h;
    $$('.row', box).forEach((b) => b.onclick = () => { location.hash = S.route + '/' + encodeURIComponent(b.dataset.id); });
    $$('.chip', box).forEach((b) => b.onclick = () => { S.f.st = b.dataset.st; paintList(); });
    const fq = $('#fq', box); if (fq) { fq.oninput = () => { S.f.q = fq.value; paintList(); }; if (keep !== null) { fq.focus(); fq.setSelectionRange(keep, keep); } }
    const fo = $('#fo', box); if (fo) fo.onchange = () => { S.f.owner = fo.value; paintList(); };
  }

  // ---------- Chi tiết khách ----------
  function paintPane() {
    const box = $('#pane'); if (!box) return;
    const l = lead(S.sel);
    if (!l) { box.innerHTML = `<div class="empty" style="padding-top:120px"><b>${S.sel ? 'Không tìm thấy khách này' : 'Chọn một khách ở danh sách bên trái'}</b>${S.sel ? 'Có thể khách đã được chuyển cho Sales khác.' : 'Thông tin bàn giao từ AI, hội thoại và nút gọi sẽ hiện ở đây.'}</div>`; return; }
    const tel = (l.phone || '').replace(/[^\d+]/g, ''); const zalo = tel.replace(/^\+?84/, '0');
    const kv = (rows) => `<dl class="kv">${rows.filter((r) => r[1]).map((r) => `<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join('')}</dl>`;
    const ai = [['Mô hình', l.model], ['Sản phẩm', l.product], ['Kích thước', l.size], ['Làm lạnh', l.cooling], ['Lựa chọn', l.choice], ['Giá đã gửi', l.quoted], ['Băn khoăn', l.concern], ['Việc tiếp theo', l.next]];
    const hasAi = l.summary || ai.some((r) => r[1]);
    const fuD = (l.followUp || '').slice(0, 10), fuT = (l.followUp || '').slice(11, 16);
    box.innerHTML = `<div class="detail">
      <div class="d-head"><button class="back" id="back" aria-label="Quay lại">${I.back}</button><div style="flex:1;min-width:0"><h2>${esc(l.name)}</h2>
        <div class="meta">${esc(l.source || 'Fanpage')} · ${when(l.at)} · ${l.ownerName ? 'Sales: ' + esc(l.ownerName) : 'Chưa chia Sales'}</div></div>
        <span class="tag ${STC[l.status]}">${esc(l.status)}</span></div>
      ${l.urgent && !DONE.includes(l.status) ? '<div class="notice"><b>Khẩn:</b> khách nhắc tới bảo hành, khiếu nại hoặc máy lỗi. Gọi lại sớm và báo bộ phận kỹ thuật, không hứa thời gian khi chưa xác nhận.</div>' : ''}
      ${!tel ? '<div class="notice">Khách chưa để lại số điện thoại. Mở hội thoại Fanpage để xin số, rồi bấm <b>Sửa</b> ở mục Thông tin khách để ghi vào.</div>' : ''}
      <div class="actions">
        <a class="btn pri big" ${tel ? `href="tel:${esc(tel)}"` : 'aria-disabled="true" style="opacity:.5;pointer-events:none"'}>${I.phone}<span>Gọi</span></a>
        <a class="btn big" ${zalo ? `href="https://zalo.me/${esc(zalo)}" target="_blank" rel="noopener"` : 'aria-disabled="true" style="opacity:.5;pointer-events:none"'}>${I.chat}<span>Zalo</span></a>
        <a class="btn big" ${l.link ? `href="${esc(l.link)}" target="_blank" rel="noopener"` : 'aria-disabled="true" style="opacity:.5;pointer-events:none"'}>${I.link}<span>Hội thoại</span></a>
      </div>
      <div class="card"><h3>Xử lý</h3>
        <div class="st-row">${S.statuses.map((st) => `<button class="st ${STC[st]}${l.status === st ? ' on' : ''}" data-st="${esc(st)}">${esc(st)}</button>`).join('')}</div>
        <div class="g2"><div><label class="f">Hẹn gọi lại</label><div style="display:flex;gap:6px"><input class="in" type="date" id="fud" value="${esc(fuD)}"><input class="in" type="time" id="fut" value="${esc(fuT)}" style="max-width:120px"></div></div>
          ${S.admin ? `<div><label class="f">Sales phụ trách</label><select class="in" id="own">${l.owner ? '' : '<option value="">Chưa chia</option>'}${S.split.map((u) => `<option value="${esc(u.k)}"${u.k === l.owner ? ' selected' : ''}>${esc(u.n)}</option>`).join('')}</select></div>` : '<div></div>'}</div>
        <div style="margin-top:12px"><label class="f">Ghi chú</label><textarea class="in" id="note" placeholder="Khách nói gì, đã gửi gì, cần làm gì tiếp…">${esc(l.staffNote || '')}</textarea></div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:12px;flex-wrap:wrap"><label class="chk"><input type="checkbox" id="zt"${l.zotech ? ' checked' : ''}> Đã nhập Zotech</label><span class="sp" style="flex:1"></span><button class="btn pri" id="save">Lưu</button></div>
      </div>
      ${hasAi ? `<div class="card"><h3>Bàn giao từ AI</h3>${l.summary ? `<div class="handover">${esc(l.summary)}</div>` : ''}${ai.some((r) => r[1]) ? `<div style="margin-top:${l.summary ? 12 : 0}px">${kv(ai)}</div>` : ''}</div>` : ''}
      <div class="card"><h3>Thông tin khách<span class="sp"></span><button class="btn ghost sm" id="edit">${I.edit}<span>Sửa</span></button></h3>
        ${kv([['Điện thoại', l.phone || 'Chưa có'], ['Địa chỉ', l.address], ['Nguồn', l.source], ['Cấp khách', l.level], ['Tin nhắn cuối', l.lastMessage], ['Người nhập', l.manual], ['Zotech', l.zotech ? 'Đã nhập ' + when(l.zotech) : '']])}</div>
      ${l.lines && l.lines.length ? `<div class="card"><h3>Hội thoại với AI <span class="muted sm" style="font-weight:500">${l.lines.length} tin gần nhất</span></h3><div class="chat">${l.lines.map((x) => { const m = String(x).match(/^\s*([^:]{1,20}):\s*([\s\S]*)$/); const who = m ? m[1] : ''; const isAi = /^(ai|bot|assistant|page|fanpage|goldcool|tư vấn|shop)$/i.test(who.trim()); return `<div class="bub${isAi ? ' ai' : ''}">${who ? `<small>${esc(isAi ? 'AI' : 'Khách')}</small>` : ''}${esc(m ? m[2] : x)}</div>`; }).join('')}</div></div>` : ''}
      <div class="card"><h3>Lịch sử</h3><ul class="hist">${(l.history || []).slice().reverse().map((h) => `<li><time>${when(h.at)}</time><div><b>${esc(h.by)}</b> · ${esc(h.status)}${h.note ? ' · ' + esc(h.note) : ''}</div></li>`).join('') || '<li class="muted">Chưa có</li>'}</ul></div>
    </div>`;
    $('#back', box).onclick = () => { location.hash = S.route; };
    ['#fud', '#fut', '#note', '#zt'].forEach((s) => { const e = $(s, box); if (e) e.addEventListener('input', () => { S.dirty = true; }); });
    $$('.st', box).forEach((b) => b.onclick = () => save(l, { status: b.dataset.st }, b));
    const own = $('#own', box); if (own) own.onchange = () => save(l, { assign: own.value }, null);
    $('#save', box).onclick = () => {
      const d = $('#fud', box).value, t = $('#fut', box).value;
      save(l, { note: $('#note', box).value, followUp: d ? d + (t ? 'T' + t : '') : '', zotech: $('#zt', box).checked }, $('#save', box));
    };
    $('#edit', box).onclick = () => editLead(l);
  }
  async function save(l, body, btn) {
    busy(btn, true); const r = await post('/api/inbound?id=' + encodeURIComponent(l.id), body); busy(btn, false);
    if (!r.ok) return toast(r.j.error || 'Chưa lưu được', 'bad');
    const i = S.leads.findIndex((x) => x.id === l.id); S.leads[i] = r.j.lead; S.dirty = false;
    toast(body.assign ? 'Đã chuyển cho ' + (r.j.lead.ownerName || '') : 'Đã lưu', 'ok');
    if (!S.admin && r.j.lead.owner !== S.me.k) { S.leads.splice(i, 1); location.hash = S.route; return; }
    paintList(); paintPane(); badges();
  }
  function editLead(l) {
    const m = modal(`<h3>Sửa thông tin khách</h3>
      <div class="f-row"><label class="f">Tên khách</label><input class="in" id="en" value="${esc(l.name)}"></div>
      <div class="f-row"><label class="f">Số điện thoại</label><input class="in" id="ep" inputmode="tel" value="${esc(l.phone || '')}"></div>
      <div class="f-row"><label class="f">Địa chỉ</label><input class="in" id="ea" value="${esc(l.address || '')}"></div>
      <div class="f-row"><label class="f">Sản phẩm quan tâm</label><input class="in" id="es" value="${esc(l.product || '')}"></div>
      <div class="foot"><button class="btn" data-close>Hủy</button><button class="btn pri" id="eb">Lưu</button></div>`);
    $('#eb', m).onclick = async () => { await save(l, { name: $('#en', m).value, phone: $('#ep', m).value, address: $('#ea', m).value, product: $('#es', m).value }, $('#eb', m)); m.remove(); };
  }
  function addLead() {
    const m = modal(`<h3>Thêm khách</h3><p class="muted" style="margin:-6px 0 14px">Khách gọi hotline, nhắn Zalo hoặc đến kho. ${S.admin ? 'Để trống Sales thì hệ thống chia theo tỉ lệ.' : 'Khách sẽ là khách của anh/chị.'}</p>
      <div class="f-row"><label class="f">Tên khách</label><input class="in" id="an" placeholder="Ví dụ: Anh Tuấn – quán lẩu Cầu Giấy"></div>
      <div class="f-row"><label class="f">Số điện thoại</label><input class="in" id="ap" inputmode="tel"></div>
      <div class="g2"><div class="f-row"><label class="f">Nguồn</label><select class="in" id="ao"><option>Hotline</option><option>Zalo</option><option>Đến kho</option><option>Giới thiệu</option><option>Website</option><option>Fanpage</option><option>Khác</option></select></div>
        <div class="f-row"><label class="f">Sản phẩm quan tâm</label><input class="in" id="as" placeholder="Tủ đông 4 cánh…"></div></div>
      <div class="f-row"><label class="f">Địa chỉ</label><input class="in" id="aa"></div>
      ${S.admin ? `<div class="f-row"><label class="f">Giao cho Sales</label><select class="in" id="aw"><option value="">Chia theo tỉ lệ</option>${S.split.map((u) => `<option value="${esc(u.k)}">${esc(u.n)}</option>`).join('')}</select></div>` : ''}
      <div class="f-row"><label class="f">Khách hỏi gì</label><textarea class="in" id="am"></textarea></div>
      <p class="err" id="aerr"></p><div class="foot"><button class="btn" data-close>Hủy</button><button class="btn pri" id="ab">Thêm khách</button></div>`);
    $('#ab', m).onclick = async () => {
      const body = { name: $('#an', m).value, phone: $('#ap', m).value, source: $('#ao', m).value, product: $('#as', m).value, address: $('#aa', m).value, note: $('#am', m).value, owner: S.admin ? $('#aw', m).value : '' };
      if (!body.name.trim() && !body.phone.trim()) return ($('#aerr', m).textContent = 'Cần tên hoặc số điện thoại khách');
      busy($('#ab', m), true); const r = await post('/api/inbound?a=add', body); busy($('#ab', m), false);
      if (!r.ok) return ($('#aerr', m).textContent = r.j.error || 'Chưa thêm được');
      m.remove(); S.leads.unshift(r.j.lead); if (S.seen) S.seen.add(r.j.lead.id);
      toast('Đã thêm khách' + (r.j.lead.ownerName ? ' · giao cho ' + r.j.lead.ownerName : ''), 'ok');
      location.hash = (S.route === 'khach' ? 'khach' : 'hop-thu') + '/' + encodeURIComponent(r.j.lead.id); paintList(); badges();
    };
  }

  // ---------- Báo cáo ----------
  function firstTouch(l) { const h = (l.history || []).find((x) => x.by !== 'Hệ thống' && !/^Nhập tay/.test(x.note || '')); return h ? Math.max(0, (Date.parse(h.at) - Date.parse(l.at)) / 60000) : null; }
  const median = (a) => { if (!a.length) return null; const s = a.slice().sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  const fmtMin = (v) => (v == null ? '—' : v < 60 ? Math.round(v) + ' phút' : (v / 60).toFixed(1).replace('.', ',') + ' giờ');
  const pct = (a, b) => (b ? Math.round((a / b) * 100) + '%' : '—');
  function stats(arr) {
    const n = arr.length, by = (st) => arr.filter((l) => l.status === st).length;
    const touched = arr.filter((l) => l.status !== 'Mới').length, quoted = by('Đã báo giá') + by('Đã chốt');
    return { n, moi: by('Mới'), lh: by('Đã liên hệ'), bg: by('Đã báo giá'), chot: by('Đã chốt'), khong: by('Không nhu cầu'), touched, quoted, ft: median(arr.map(firstTouch).filter((v) => v != null)), late: arr.filter(due).length };
  }
  // Phễu bán hàng: mỗi tầng đếm khách đã đi tới tầng đó trở lên
  const STAGES = [['Khách nhận', 'n'], ['Đã liên hệ', 'touched'], ['Đã báo giá', 'quoted'], ['Đã chốt', 'chot']];
  function funnel(s) {
    const v = STAGES.map(([name, k]) => ({ name, n: s[k] }));
    const top = Math.max(1, v[0].n), MIN = 34;
    const w = v.map((x) => MIN + (100 - MIN) * (x.n / top));
    const conv = v.slice(1).map((x, i) => (v[i].n ? x.n / v[i].n : null));
    let worst = -1; conv.forEach((c, i) => { if (c != null && v[i].n - v[i + 1].n > 0 && (worst < 0 || c < conv[worst])) worst = i; });
    return `<div class="fun">${v.map((x, i) => {
      const a = w[i], b = i < v.length - 1 ? w[i + 1] : w[i] * 0.86;
      const clip = `polygon(${(100 - a) / 2}% 0,${(100 + a) / 2}% 0,${(100 + b) / 2}% 100%,${(100 - b) / 2}% 100%)`;
      const link = i < v.length - 1 ? `<div class="fun-link${i === worst ? ' worst' : ''}"><span>${conv[i] == null ? '—' : Math.round(conv[i] * 100) + '%'} đi tiếp</span>${v[i].n - v[i + 1].n > 0 ? `<em>${v[i].n - v[i + 1].n} khách chưa đi tiếp${i === worst ? ' · tầng yếu nhất' : ''}</em>` : ''}</div>` : '';
      return `<div class="fun-st fs${i}"><div class="fun-shape" style="clip-path:${clip};-webkit-clip-path:${clip}"></div><div class="fun-txt"><b>${x.n}</b><span>${x.name}</span></div><div class="fun-pct">${i ? pct(x.n, v[0].n) : '100%'}<small>${i ? 'so với khách nhận' : ''}</small></div></div>${link}`;
    }).join('')}</div>`;
  }
  function paintReport() {
    const days = { 1: 1, 7: 7, 30: 30, all: 0 }[S.period];
    const from = days ? dayKey(Date.now() - (days - 1) * 864e5) : '';
    const arr = S.leads.filter((l) => !from || dayKey(l.at) >= from);
    const s = stats(arr);
    const span = Math.min(days || 14, 14), cols = [];
    for (let i = span - 1; i >= 0; i--) { const k = dayKey(Date.now() - i * 864e5); cols.push({ k, n: S.leads.filter((l) => dayKey(l.at) === k).length }); }
    const max = Math.max(1, ...cols.map((c) => c.n));
    const tally = (f) => { const m = {}; arr.forEach((l) => { const v = (f(l) || '').trim(); if (v) m[v] = (m[v] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 6); };
    const hb = (rows) => { const mx = Math.max(1, ...rows.map((r) => r[1])); return rows.length ? rows.map(([k, v]) => `<div class="hbar"><span title="${esc(k)}" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(k)}</span><i style="width:${(v / mx) * 100}%"></i><b>${v}</b></div>`).join('') : '<p class="muted sm">Chưa có dữ liệu</p>'; };
    const lv = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].map((k) => [k, arr.filter((l) => l.level === k).length]);
    const lvMax = Math.max(1, ...lv.map((x) => x[1])), noLv = arr.filter((l) => !l.level).length;
    const team = S.admin ? S.split.map((u) => ({ u, s: stats(arr.filter((l) => l.owner === u.k)) })).filter((x) => x.s.n || x.u.w) : [];
    const none = arr.filter((l) => !l.owner).length;
    const cell = (v, base, cls) => `<td><div class="cv${cls ? ' ' + cls : ''}"><i style="width:${base ? (v / base) * 100 : 0}%"></i><b>${v}</b><span>${base ? Math.round((v / base) * 100) + '%' : ''}</span></div></td>`;
    $('#body').innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px">
        <div class="seg">${[['1', 'Hôm nay'], ['7', '7 ngày'], ['30', '30 ngày'], ['all', 'Tất cả']].map(([k, t]) => `<button data-p="${k}" class="${S.period === k ? 'on' : ''}">${t}</button>`).join('')}</div>
        <span class="muted sm">Cập nhật ${hm(new Date().toISOString())} · tự làm mới mỗi 30 giây</span></div>
      ${!S.leads.length ? '<div class="notice">Chưa có khách thật nào nên phễu đang trống. Số liệu tự chạy khi Fanpage được nối hoặc Sales thêm khách.</div>' : ''}
      <div class="rep-top">
        <div class="card fun-card"><h3>Phễu bán hàng<span class="sp"></span><span class="muted sm" style="font-weight:500">${days === 1 ? 'Hôm nay' : days ? days + ' ngày qua' : 'Từ trước đến nay'}${S.admin ? ' · cả đội' : ''}</span></h3>${funnel(s)}</div>
        <div class="rep-side">
          <div class="kpi${s.moi ? ' warn' : ''}"><small>Chưa gọi</small><b>${s.moi}</b><span>khách đang ở trạng thái Mới</span></div>
          <div class="kpi${s.late ? ' warn' : ''}"><small>Đến hẹn gọi lại</small><b>${s.late}</b><span>hôm nay hoặc đã quá hẹn</span></div>
          <div class="kpi"><small>Gọi đầu (trung vị)</small><b>${fmtMin(s.ft)}</b><span>từ lúc khách vào đến lần xử lý đầu</span></div>
          <div class="kpi"><small>Không nhu cầu</small><b>${s.khong}</b><span>${pct(s.khong, s.n)} số khách nhận</span></div>
        </div></div>
      ${S.admin ? `<div class="card"><h3>Phễu theo từng Sales<span class="sp"></span><span class="muted sm" style="font-weight:500">% tính trên số khách mỗi người nhận</span></h3><div class="tscroll"><table class="t cvt"><thead><tr><th>Sales</th><th>Khách nhận</th><th>Đã liên hệ</th><th>Đã báo giá</th><th>Đã chốt</th><th>Chưa gọi</th><th>Gọi đầu</th></tr></thead><tbody>
        ${team.map(({ u, s: x }) => `<tr><td><b>${esc(u.n)}</b><div class="muted sm">chia ${u.w}%</div></td>${cell(x.n, Math.max(1, ...team.map((t) => t.s.n)), 'base')}${cell(x.touched, x.n)}${cell(x.quoted, x.n)}${cell(x.chot, x.n, 'gold')}<td${x.moi ? ' style="color:var(--bad);font-weight:700"' : ''}>${x.moi}</td><td>${fmtMin(x.ft)}</td></tr>`).join('') || '<tr><td colspan="7" class="muted">Chưa có Sales nào nhận khách</td></tr>'}
        ${none ? `<tr><td class="muted">Chưa chia</td><td>${none}</td><td colspan="5"></td></tr>` : ''}</tbody></table></div></div>` : ''}
      <div class="two"><div class="card"><h3>Cấp khách khi AI bàn giao</h3><div class="lvf">${lv.map(([k, n]) => `<div class="lv-row"><span>${k}</span><div><i style="width:${n ? 12 + 88 * (n / lvMax) : 0}%"></i></div><b>${n}</b></div>`).join('')}</div>${noLv ? `<p class="muted sm" style="margin:8px 0 0">${noLv} khách chưa có cấp (nhập tay hoặc chatbot chưa gửi).</p>` : ''}</div>
        <div class="card"><h3>Khách vào theo ngày <span class="muted sm" style="font-weight:500">${span} ngày gần nhất</span></h3><div class="bars">${cols.map((c) => `<div class="b"><em>${c.n || ''}</em><i style="height:${(c.n / max) * 100}%"></i><span>${c.k.slice(8, 10)}/${c.k.slice(5, 7)}</span></div>`).join('')}</div></div></div>
      <div class="two"><div class="card"><h3>Sản phẩm khách hỏi</h3>${hb(tally((l) => l.product))}</div><div class="card"><h3>Nguồn khách</h3>${hb(tally((l) => l.source))}</div></div>`;
    $$('[data-p]').forEach((b) => b.onclick = () => { S.period = b.dataset.p; paintReport(); });
  }

  // ---------- Cài đặt ----------
  async function paintSettings() {
    const body = $('#body');
    const host = location.origin;
    body.innerHTML = `<div class="set">
      <div class="card"><h3>Tài khoản</h3><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="av">${esc(S.me.a)}</span><div style="flex:1"><b>${esc(S.me.n)}</b><div class="muted sm">${esc(S.me.r)}</div></div>
        <button class="btn" id="cp">Đổi mật khẩu</button><button class="btn" id="lo">Đăng xuất</button></div></div>
      ${S.admin ? `
      <div class="card"><h3>Tỉ lệ chia khách</h3><p class="muted sm" style="margin:-4px 0 10px">Khách mới từ Fanpage tự giao cho Sales đang nhận ít nhất so với tỉ lệ của mình (tính trong tháng). Đặt 0% để tạm ngừng chia cho một người.</p>
        <div class="wrow muted sm" style="font-weight:600"><span>Sales</span><span>Tỉ lệ (%)</span><span style="text-align:right">Tháng này</span></div>
        ${S.split.map((u) => `<div class="wrow"><span><b>${esc(u.n)}</b><div class="muted sm">${esc(u.r)}</div></span><input class="in" type="number" min="0" max="100" data-w="${esc(u.k)}" value="${u.w}"><span style="text-align:right">${u.month} khách</span></div>`).join('')}
        <div style="display:flex;align-items:center;gap:10px;margin-top:12px"><span class="muted sm" id="wsum"></span><span style="flex:1"></span><button class="btn pri" id="ws">Lưu tỉ lệ</button></div></div>
      <div class="card"><h3>Kết nối Fanpage</h3>
        <dl class="kv"><dt>Cổng nhận khách</dt><dd><span class="dot ${S.ready ? 'ok' : 'bad'}"></span> ${S.ready ? 'Đã bật, sẵn sàng nhận khách' : 'Chưa bật: cần cài biến INBOUND_KEY trên Vercel'}</dd>
          <dt>Chuyển sang Zotech</dt><dd><span class="dot ${S.zotech ? 'ok' : ''}"></span> ${S.zotech ? 'Đang bật: mỗi khách mới được gửi sang Zotech' : 'Chưa bật (cần ZOTECH_WEBHOOK_URL)'}</dd>
          <dt>Khách đã nhận</dt><dd>${S.leads.length} khách${S.unassigned ? ` · ${S.unassigned} chưa chia` : ''}</dd></dl>
        <p class="sm" style="margin:14px 0 6px"><b>Gửi cho người cài chatbot (Kiên / Retion / chatbot.ai.vn):</b> chatbot gửi mỗi khách đủ điều kiện về địa chỉ dưới đây, phương thức POST, dữ liệu JSON.</p>
        <div class="code">POST ${esc(host)}/api/inbound?key=&lt;INBOUND_KEY&gt;</div>
        <p class="muted sm" style="margin:8px 0">Giá trị INBOUND_KEY xem trong Vercel › goldcool-os › Settings › Environment Variables. Không gửi khóa này qua nhóm chat chung.</p>
        <div class="code">{
  "name": "Phạm Thu Trang", "phone": "09xxxxxxxx", "address": "Hà Đông, Hà Nội",
  "product": "Tủ đông 4 cánh", "level": "L3", "choice": "GoldCool",
  "quoted": "GoldCool 16.100.000đ", "concern": "Thời gian giao",
  "summary": "Bản bàn giao Sales…", "last_message": "Giao về Hà Đông mất mấy ngày?",
  "link": "https://business.facebook.com/…", "conversation": [ {"from":"khach","text":"…"}, {"from":"ai","text":"…"} ]
}</div></div>
      <div class="card"><h3>Nhân viên</h3><div class="ulist" id="ul"><span class="spin"></span></div></div>
      <div class="card"><h3>Nhật ký thay đổi</h3><ul class="hist" id="au"><li><span class="spin"></span></li></ul></div>` : ''}
    </div>`;
    $('#cp').onclick = () => changePw('', false);
    $('#lo').onclick = async () => { await post('/api/auth?a=logout'); S.me = null; clearInterval(S.timer); location.hash = ''; showLogin(); };
    if (!S.admin) return;
    const sum = () => { const t = $$('[data-w]').reduce((a, i) => a + (+i.value || 0), 0); $('#wsum').textContent = 'Tổng ' + t + '%' + (t !== 100 ? ' (không bắt buộc đúng 100%, hệ thống chia theo tỉ lệ tương đối)' : ''); };
    $$('[data-w]').forEach((i) => i.oninput = sum); sum();
    $('#ws').onclick = async () => {
      const w = {}; $$('[data-w]').forEach((i) => { w[i.dataset.w] = +i.value || 0; });
      busy($('#ws'), true); const r = await post('/api/inbound?a=split', { w }); busy($('#ws'), false);
      if (!r.ok) return toast(r.j.error || 'Chưa lưu được', 'bad');
      S.split.forEach((u) => { u.w = r.j.w[u.k]; }); toast('Đã lưu tỉ lệ chia khách', 'ok');
    };
    const [ur, st] = await Promise.all([api('/api/auth?a=users'), api('/api/state')]);
    const ul = $('#ul'); if (ul) {
      ul.innerHTML = ((ur.j && ur.j.users) || []).map((u) => `<div class="u"><span class="av">${esc(u.a)}</span><div><b>${esc(u.n)}</b><small>${esc(u.r)} · ${esc(u.d)}</small></div>${u.k === S.me.k ? '<span class="muted sm">Anh/chị</span>' : `<button class="btn sm" data-reset="${esc(u.k)}" data-n="${esc(u.n)}">Đặt lại mật khẩu</button>`}</div>`).join('');
      $$('[data-reset]', ul).forEach((b) => b.onclick = () => {
        const m = modal(`<h3>Đặt lại mật khẩu</h3><p>Mật khẩu của <b>${esc(b.dataset.n)}</b> sẽ về mật khẩu ban đầu. Người đó đăng nhập bằng mật khẩu ban đầu và phải đổi mật khẩu mới ngay.</p><div class="foot"><button class="btn" data-close>Hủy</button><button class="btn pri" id="rb">Đặt lại</button></div>`);
        $('#rb', m).onclick = async () => { busy($('#rb', m), true); const r = await post('/api/auth?a=reset', { k: b.dataset.reset }); m.remove(); toast(r.ok ? 'Đã đặt lại mật khẩu cho ' + b.dataset.n : r.j.error || 'Chưa đặt lại được', r.ok ? 'ok' : 'bad'); };
      });
    }
    const au = $('#au'); if (au) { const list = (st.j && st.j.audit) || []; au.innerHTML = list.length ? list.map((a) => `<li><time>${a.at ? when(a.at) : ''}</time><div><b>${esc(a.name || a.user || '')}</b> · ${esc(a.area || '')}: ${esc(a.text || '')}</div></li>`).join('') : '<li class="muted">Chưa có thay đổi nào</li>'; }
  }

  // ---------- Khởi động ----------
  (async () => {
    const r = await api('/api/auth');
    if (r.ok && r.j.user) boot(r.j.user); else showLogin();
  })();
})();
