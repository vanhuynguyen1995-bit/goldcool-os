/* GoldCool OS – bản web chạy 18 màn hình chính
   Giao diện lấy nguyên từ bản thiết kế đã duyệt (js/screens.js).
   File này thêm điều hướng, thao tác và lưu trạng thái trong trình duyệt. */
(function () {
  'use strict';
  const root = document.getElementById('root');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const T = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const now = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const fmtAt = (v) => { if (!v) return ''; if (/^\d{4}-\d{2}-\d{2}T/.test(v)) { const d = new Date(v); return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }); } return v; };
  const fmtDate = (v) => (v ? v.split('-').reverse().join('/') : '');
  const META = window.SCREEN_META;

  /* ---------- Trạng thái (lưu trong trình duyệt) ---------- */
  const KEY = 'goldcool-os-v1';
  const DEFAULT_BANNED = ['còn hàng', 'giao ngay', 'giao trong ngày', 'giảm giá', 'tặng', 'combo', 'giá đại lý', 'rẻ nhất', 'tiết kiệm điện 50%'];
  let S = {};
  try { S = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { S = {}; }
  let SERVER = false; // true khi chạy trên Vercel có API đăng nhập và dữ liệu dùng chung
  const SNAPK = ['inbox', 'trang', 'prices', 'banned', 'decision', 'aiProduct'];
  const LOGK = ['kudos', 'comments', 'newIssues'];
  const NOTE = { inbox: 'Tiếp nhận / nhắn khách Phạm Thu Trang', trang: 'Cập nhật kết quả liên hệ, cấp khách', prices: 'Duyệt bảng giá bán lẻ', banned: 'Sửa danh sách câu bị cấm của AI', decision: 'Quyết định phương án bảo hành GoldWash', aiProduct: 'Bật / tắt AI báo giá tủ đông 4 cánh', kudos: 'Gửi ghi nhận đồng nghiệp', comments: 'Trao đổi trên thẻ VD-1107', newIssues: 'Tạo thẻ vấn đề mới' };
  let synced = {};
  const api = async (path, opt = {}) => { const r = await fetch(path, { credentials: 'same-origin', headers: { 'content-type': 'application/json' }, ...opt }); let j = {}; try { j = await r.json(); } catch (e) { j = {}; } return { ok: r.ok, status: r.status, j }; };
  function pushChanges() {
    if (!SERVER || !S.loggedIn) return;
    SNAPK.forEach((k) => { const v = JSON.stringify(S[k] === undefined ? null : S[k]); if (synced[k] !== undefined && v !== synced[k]) { synced[k] = v; api('/api/state', { method: 'POST', body: JSON.stringify({ type: 'snap', key: k, value: S[k] === undefined ? null : S[k], note: NOTE[k] }) }).then((r) => { if (!r.ok) toast('Chưa lưu được lên máy chủ: ' + (r.j.error || r.status), 'bad'); }); } });
    LOGK.forEach((k) => (S[k] || []).forEach((it) => { if (it._new) { delete it._new; const item = { ...it }; api('/api/state', { method: 'POST', body: JSON.stringify({ type: 'log', key: k, item, note: NOTE[k] }) }).then((r) => { if (!r.ok) toast('Chưa lưu được lên máy chủ: ' + (r.j.error || r.status), 'bad'); }); } }));
  }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* bỏ qua */ } pushChanges(); };
  async function loadShared() {
    const r = await api('/api/state'); if (!r.ok) return false;
    const { snap, logs, audit } = r.j;
    SNAPK.forEach((k) => { if (snap[k] !== undefined && snap[k] !== null) S[k] = snap[k]; else delete S[k]; synced[k] = JSON.stringify(S[k] === undefined ? null : S[k]); });
    S.kudos = (logs.kudos || []).slice().reverse(); S.comments = logs.comments || []; S.newIssues = logs.newIssues || [];
    S._audit = audit || [];
    if (!S.inbox) S.inbox = { taken: false, msgs: [] }; if (!S.trang) S.trang = {};
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* bỏ qua */ }
    return true;
  }
  const banned = () => S.banned || DEFAULT_BANNED;

  let toastTimer;
  function toast(msg, kind) {
    const el = document.getElementById('toast');
    el.textContent = msg; el.className = 'on ' + (kind || '');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.className = ''; }, 3200);
  }

  /* ---------- Điều hướng ---------- */
  // Đường dẫn dạng #ten-man-hinh (chỉ chữ, số, gạch ngang) để chia sẻ link được ở mọi nơi
  const fold = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const SLUG = {}; const slugOf = (r) => { const k = r.split('/').map(fold).join('--'); SLUG[k] = r; return k; };
  let CUR = 'trang-chu';
  const go = (r) => { r = SLUG[r] || r; CUR = r; const h = '#' + slugOf(r); try { if (location.hash !== h) { history.pushState(null, '', h); } } catch (e) { /* bỏ qua */ } render(); };
  const NAV_TOP = { 'Trang chủ': 'trang-chu', 'AI Sales': 'hop-thu', 'Mục tiêu & KPI': 'bang-so-lieu', 'Học viện': 'hom-nay-hoc-gi', 'Dữ liệu': 'danh-sach-san-pham', 'Cài đặt': 'nhan-vien' };
  const NAV_SUB = {
    'AI Sales': { 'Hộp thư': 'hop-thu', 'Khách của tôi': 'khach-cua-toi', 'Báo cáo tuần': 'bao-cao-ai', 'Phòng thử AI': 'phong-thu-ai', 'Lỗi dữ liệu': 'so-loi', 'Cài đặt AI': 'cai-dat-ai' },
    'Mục tiêu & KPI': { 'Bảng số liệu': 'bang-so-lieu', 'Cây mục tiêu': 'cay-muc-tieu', 'Báo cáo tuần': 'bao-cao-tuan', 'Thẻ vấn đề': 'the-van-de', 'Ghi nhận': 'ghi-nhan', 'Thư viện quyết định': 'thu-vien-quyet-dinh' },
    'Học viện': { 'Hôm nay học gì': 'hom-nay-hoc-gi', 'Thư viện bài học': 'thu-vien-bai-hoc', 'Bài thi': 'bai-thi', 'Phòng đóng vai': 'dong-vai', 'Hồ sơ năng lực': 'ho-so-nang-luc' },
    'Dữ liệu': { 'Sản phẩm': 'danh-sach-san-pham', 'Bảng giá bán lẻ': 'bang-gia', 'Bảng giá đại lý': 'bang-gia-dai-ly', 'Kho tài liệu': 'kho-tai-lieu' },
  };
  const MOD_KEY = { 'AI Sales': 'sales', 'Mục tiêu & KPI': 'kpi', 'Học viện': 'hv', 'Dữ liệu': 'data' };
  const MOBILE_NAV = { 'Trang chủ': 'trang-chu', 'Khách': 'khach-cua-toi', 'Hộp thư': 'hop-thu', 'Học': 'hom-nay-hoc-gi', 'Báo cáo': 'bao-cao-tuan', 'Tôi': 'nhan-vien/ho-so' };
  const labelOf = (a) => { const c = a.cloneNode(true); $$('.cnt', c).forEach((x) => x.remove()); return T(c); };

  function currentRoute() { return CUR; }
  function fromHash() { const h = (location.hash || '').replace(/^#\/?/, ''); if (!h) return ONLY_SALES ? 'hop-thu' : 'trang-chu'; if (SLUG[h]) return SLUG[h]; const m = META.find((x) => slugOf(x.id) === h); if (m) return m.id; const p = h.split('--'); if (p[0] === 'chua-co' && p.length > 2) return 'chua-co/' + p[1] + '/' + p.slice(2).join(' ').replace(/-/g, ' '); return 'trang-chu'; }
  META.forEach((m) => slugOf(m.id));

  /* ---------- Bản chỉ dùng AI Sales: tắt Trang chủ, Mục tiêu & KPI, Học viện, Dữ liệu ---------- */
  const ONLY_SALES = true;
  const HOME = 'hop-thu';
  const TRAIN = { 'chon-tinh-huong': 'Luyện đóng vai', 'dong-vai': 'Luyện đóng vai', 'ket-qua-dong-vai': 'Luyện đóng vai', 'bai-thi': 'Bài thi', 'ket-qua-thi': 'Bài thi' };
  const ALLOW = new Set(META.filter((m) => m.mod === 'sales' || TRAIN[m.id] || ['dang-nhap', 'nhan-vien', 'nhat-ky'].includes(m.id)).map((m) => m.id));
  const SALES_SUB = [['Hộp thư', 'hop-thu'], ['Khách của tôi', 'khach-cua-toi'], ['Báo cáo tuần', 'bao-cao-ai'], ['Phòng thử AI', 'phong-thu-ai'], ['Lỗi dữ liệu', 'so-loi'], ['Cài đặt AI', 'cai-dat-ai']];
  const TRAIN_SUB = [['Luyện đóng vai', 'chon-tinh-huong'], ['Bài thi', 'bai-thi']];
  const KEEP_TOP = ['AI Sales', 'Cài đặt'];
  if (ONLY_SALES) {
    NAV_TOP['Trang chủ'] = HOME;
    Object.assign(MOBILE_NAV, { 'Trang chủ': HOME, 'Báo cáo': 'bao-cao-ai' });
    NAV_SUB['Cài đặt'] = { 'Nhân viên': 'nhan-vien', 'Nhật ký thay đổi': 'nhat-ky' };
    NAV_SUB['AI Sales']['Luyện đóng vai'] = 'chon-tinh-huong'; NAV_SUB['AI Sales']['Bài thi'] = 'bai-thi';
  }
  const allowed = (r) => !ONLY_SALES || ALLOW.has(r);
  function trimNav() {
    if (!ONLY_SALES) return;
    $$('.side .nav > a').forEach((a) => { if (!KEEP_TOP.includes(labelOf(a))) { const nx = a.nextElementSibling; if (nx && nx.classList.contains('sub')) nx.remove(); a.remove(); } });
    // AI Sales: thêm Luyện đóng vai, Bài thi (từ Học viện)
    const ai = $$('.side .nav > a').find((a) => labelOf(a) === 'AI Sales');
    if (ai) {
      let sub = ai.nextElementSibling;
      if (TRAIN[CUR]) { ai.classList.add('on'); if (!sub || !sub.classList.contains('sub')) { sub = document.createElement('div'); sub.className = 'sub'; ai.after(sub); sub.innerHTML = SALES_SUB.map(([t]) => `<a>${t}</a>`).join(''); } }
      if (sub && sub.classList.contains('sub')) { $$('a', sub).forEach((x) => { if (TRAIN[CUR]) x.classList.remove('on'); }); sub.insertAdjacentHTML('beforeend', '<div class="xs" style="color:#8FA8C0;font-weight:700;letter-spacing:.05em;padding:10px 0 4px 40px">LUYỆN TẬP</div>' + TRAIN_SUB.map(([t]) => `<a class="${TRAIN[CUR] === t ? 'on' : ''}">${t}</a>`).join('')); }
    }
    if (TRAIN[CUR]) { const cr = $('.top .crumb'); if (cr) cr.innerHTML = cr.innerHTML.replace('Học viện', 'AI Sales <span>/</span> Luyện tập').replace('Chặng 1 – Sản phẩm, giá và kịch bản', 'Bài thi Sales'); }
    // Cài đặt chỉ còn Nhân viên và Nhật ký
    $$('.side .nav > a').forEach((a) => { if (labelOf(a) === 'Cài đặt' && a.classList.contains('on')) { let sub = a.nextElementSibling; if (!sub || !sub.classList.contains('sub')) { sub = document.createElement('div'); sub.className = 'sub'; a.after(sub); } sub.innerHTML = Object.entries(NAV_SUB['Cài đặt']).map(([t, id]) => `<a class="${CUR === id ? 'on' : ''}">${t}</a>`).join(''); } });
    // Thanh dưới của màn hình điện thoại: bỏ mục Học
    $$('.phone nav > div.col').forEach((d) => { if (T(d) === 'Học') d.style.visibility = 'hidden'; });
    const mode = $('.modebox'); if (mode) mode.style.display = '';
  }

  function render() {
    let r = currentRoute();
    if (r !== 'dang-nhap' && (r.startsWith('chua-co/') || !allowed(r))) { if (ONLY_SALES && r !== 'trang-chu') toast('Bản hiện tại chỉ dùng phần AI Sales'); r = HOME; CUR = HOME; try { history.replaceState(null, '', '#' + slugOf(HOME)); } catch (e) { /* bỏ qua */ } }
    window.scrollTo(0, 0);
    if (r.startsWith('chua-co/')) {
      const [, mod, ...rest] = r.split('/');
      const title = rest.join('/');
      const modName = Object.keys(MOD_KEY).find((k) => MOD_KEY[k] === mod);
      root.innerHTML = (window.PLACEHOLDERS[mod] || window.PLACEHOLDERS.home)
        .replace('%%SUB%%', esc(title)).replace('%%TITLE%%', esc(title))
        .replace('%%CRUMB%%', modName ? `${esc(modName)} <span>/</span> <b>${esc(title)}</b>` : `<b>${esc(title)}</b>`)
        .replace('%%ICON%%', window.ICONS.layers);
      document.title = title + ' · GoldCool OS';
      menuMark(r); return;
    }
    const m = META.find((x) => x.id === r) || META[0];
    const html = window.SCREENS[m.id];
    if (m.full) { root.innerHTML = html; }
    else if (m.mobile) {
      root.innerHTML = `<div class="phone-wrap"><div class="phone-info"><div class="xs muted" style="font-weight:700;letter-spacing:.05em">MÀN ${m.no} · ĐIỆN THOẠI</div><h2>${esc(m.title.replace(' (điện thoại)', ''))}</h2><p class="sub1" style="margin-top:6px">Màn hình này dành cho nhân viên dùng trên điện thoại. Mở bằng điện thoại sẽ hiện toàn màn hình.</p><div class="col" style="gap:8px;margin-top:18px"><span class="btn" data-go="trang-chu">← Về Trang chủ</span><span class="btn" data-open-menu="1">Xem tất cả màn hình</span></div></div><div class="phone"><div>${html}</div></div></div>`;
    } else root.innerHTML = html;
    document.title = m.title + ' · GoldCool OS';
    $$('.card').forEach((c) => { if (CLICK_CARDS[m.id] && CLICK_CARDS[m.id](c)) c.classList.add('click'); });
    (APPLY[m.id] || (() => {}))();
    if (typeof personalize === 'function') personalize(m.id);
    trimNav();
    menuMark(m.id);
  }
  const syncHash = () => { CUR = fromHash(); render(); };
  window.addEventListener('hashchange', syncHash); window.addEventListener('popstate', syncHash);

  /* ---------- Menu 18 màn hình ---------- */
  const btn = document.createElement('div'); btn.className = 'scr-btn'; btn.innerHTML = '☰ ' + META.filter((m) => allowed(m.id)).length + ' màn hình';
  const menu = document.createElement('div'); menu.className = 'scr-menu';
  const GROUPS = { home: 'Trang chủ', sales: 'AI Sales', data: 'Dữ liệu', kpi: 'Mục tiêu & KPI', hv: 'Học viện', set: 'Cài đặt & hệ thống' };
  menu.innerHTML = Object.keys(GROUPS).map((g) => `<div class="g">${GROUPS[g]}</div>` + META.filter((m) => m.mod === g && allowed(m.id)).map((m) => `<a data-go="${m.id}" data-id="${m.id}"><b>${m.no}</b>${esc(m.title)}</a>`).join('')).join('') + '<div class="g">Dữ liệu thử</div><a data-reset="1"><b>↺</b>Đặt lại dữ liệu thử</a>';
  document.body.append(btn, menu);
  btn.onclick = () => menu.classList.toggle('on');
  function menuMark(id) { $$('a', menu).forEach((a) => a.classList.toggle('cur', a.dataset.id === id)); menu.classList.remove('on'); }

  /* ---------- Nhấn chuột chung ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('[data-reset]')) { S = {}; save(); toast('Đã đặt lại dữ liệu thử', 'ok'); render(); return; }
    const g = t.closest('[data-go]'); if (g) { go(g.dataset.go); return; }
    if (t.closest('[data-open-menu]')) { menu.classList.add('on'); return; }
    if (!t.closest('.scr-menu,.scr-btn')) menu.classList.remove('on');
    const a = t.closest('.nav a');
    if (a) {
      const lab = labelOf(a);
      const sub = a.parentElement.classList.contains('sub');
      if (!sub) { go(NAV_TOP[lab] || 'trang-chu'); return; }
      const mod = labelOf(a.parentElement.previousElementSibling);
      const r = (NAV_SUB[mod] || {})[lab];
      go(r || `chua-co/${MOD_KEY[mod] || 'home'}/${lab}`); return;
    }
    const mn = t.closest('nav > div.col');
    if (mn && t.closest('.phone')) { if (T(mn) === 'Tôi' && !allowed('nhan-vien/ho-so')) { openAccount(); return; } go(MOBILE_NAV[T(mn)] || HOME); return; }
    if (t.closest('.bellw')) { go(allowed('thong-bao') ? 'thong-bao' : HOME); return; }
    if (t.closest('.top > .av')) { if (allowed('nhan-vien/ho-so')) go('nhan-vien/ho-so'); else openAccount(); return; }
    if (t.closest('.me')) { openAccount(); return; }
    if (t.closest('.searchb')) { toast('Tìm kiếm sẽ hoạt động khi nối dữ liệu khách và sản phẩm thật'); return; }
    if (t.closest('.logo')) { go(allowed('trang-chu') ? 'trang-chu' : HOME); return; }
    const r = currentRoute();
    if (CLICK[r] && CLICK[r](t, e) !== false) return;
    if (CLICK2(r, t) !== false) return;
    const b = t.closest('.btn, .tabs a');
    if (b) toast(`“${T(b)}” sẽ hoạt động khi nối dữ liệu thật (Fanpage, Zotech, Zalo).`);
  });

  /* ---------- Tiện ích dựng giao diện ---------- */
  const salesBubble = (m, time) => `<div style="display:flex;flex-direction:column;align-items:flex-end;margin-left:auto;max-width:76%"><div style="background:#FFF8E6;border:1px solid #F0DFA6;border-radius:14px 4px 14px 14px;padding:9px 13px">${esc(m)}</div><div class="xs muted row" style="margin-top:3px;gap:6px"><b style="color:#8A6A05">Đoàn Thị Hồng Hà</b> ${time}</div></div>`;
  const kBubble = (m, time, ini = 'KH') => `<div style="display:flex;gap:9px;max-width:72%"><div class="av" style="width:30px;height:30px;font-size:11px">${ini}</div><div><div style="background:#fff;border:1px solid var(--line);border-radius:4px 14px 14px 14px;padding:9px 13px">${esc(m)}</div><div class="xs muted" style="margin-top:3px">${time}</div></div></div>`;
  const aiBubble = (html, time) => `<div style="display:flex;flex-direction:column;align-items:flex-end;margin-left:auto;max-width:76%"><div style="background:var(--ice);border:1px solid #CFE0EE;border-radius:14px 4px 14px 14px;padding:9px 13px">${html}</div><div class="xs muted row" style="margin-top:3px;gap:6px"><span class="ai">✦ AI</span> ${time}</div></div>`;
  const sysNote = (html) => `<div class="sysnote">${html}</div>`;
  function inputInto(field, placeholder, onSend) {
    field.classList.add('inrow');
    field.innerHTML = `<input placeholder="${esc(placeholder)}"><span class="btn sm nv" data-send="1">Gửi</span>`;
    const inp = $('input', field);
    const fire = () => { const v = inp.value.trim(); if (!v) return; if (onSend(v) !== false) inp.value = ''; inp.focus(); };
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') fire(); });
    $('[data-send]', field).addEventListener('click', (e) => { e.stopPropagation(); fire(); });
    return inp;
  }
  const bannedIn = (s) => banned().filter((w) => s.toLowerCase().includes(w));
  const setChip = (el, cls, text) => { if (!el) return; el.className = 'chip ' + cls; el.textContent = text; };
  const findText = (sel, text, scope) => $$(sel, scope).find((el) => T(el) === text);
  const findIncl = (sel, text, scope) => $$(sel, scope).find((el) => T(el).includes(text));

  const CLICK = {}, APPLY = {}, CLICK_CARDS = {};

  /* ===== 01 Trang chủ ===== */
  CLICK_CARDS['trang-chu'] = (c) => /Khách mới cần liên hệ|Follow-up khách L4|Bài học hôm nay|Chăm sóc sau bán L6/.test(T(c)) && T(c).length < 120;
  CLICK['trang-chu'] = (t) => {
    const c = t.closest('.card.click');
    if (c) { const s = T(c); go(s.includes('Bài học') ? 'hom-nay-hoc-gi' : 'khach-cua-toi'); return; }
    const b = t.closest('.btn'); if (!b) return false;
    const row = b.closest('.row'); const s = T(row);
    if (s.includes('Phạm Thu Trang')) return go('khach/pham-thu-trang');
    if (s.includes('Thẻ vấn đề')) return go('the-van-de');
    if (s.includes('Đỗ Văn Long')) { toast('Đang gọi anh Đỗ Văn Long – nhớ ghi kết quả lần liên hệ 2/3'); return; }
    if (s.includes('Nguyễn Quang Vinh')) { toast('Mở khách L4 Nguyễn Quang Vinh – hẹn gửi video Ozon hôm nay'); return; }
    if (s.includes('Lê Mai Anh')) { toast('Đang gọi chị Lê Mai Anh – mốc chăm sóc 7 ngày'); return; }
    return false;
  };

  /* ===== 02 Hộp thư ===== */
  S.inbox = S.inbox || { taken: false, msgs: [] };
  APPLY['hop-thu'] = () => {
    const secs = $$('.app section'); const chat = secs[1]; if (!chat) return;
    $$('div[style*="padding:12px 14px;border-top"]', secs[0]).forEach((it) => it.classList.add('click'));
    if (S.inbox.taken) {
      setChip(findText('.chip', 'Chờ Sales', chat.children[0]), 'ok', 'Hà đang trả lời');
      const tb = findText('.btn', 'Tiếp nhận', chat); if (tb) { tb.innerHTML = '✓ Đã tiếp nhận'; tb.classList.remove('pri'); tb.classList.add('is-off'); }
      const li = findIncl('div[style*="border-top"]', 'Phạm Thu Trang', secs[0]); if (li) setChip(findIncl('.chip', 'Chờ Sales', li), 'ok', 'Hà đang trả lời');
      const bodyEl = chat.children[1];
      S.inbox.msgs.forEach((m) => bodyEl.insertAdjacentHTML('beforeend', salesBubble(m.t, m.at)));
      inputInto($('.field', chat.children[2]), 'Nhắn cho chị Trang… (không hứa tồn kho, ngày giao khi Kho chưa xác nhận)', (v) => {
        const hit = bannedIn(v).filter((w) => /hàng|giao/.test(w));
        if (hit.length) { toast(`Chưa gửi: “${hit[0]}” – chưa có xác nhận của Kho thì không hứa tồn kho, ngày giao.`, 'bad'); return false; }
        const m = { t: v, at: now() }; S.inbox.msgs.push(m); save();
        bodyEl.insertAdjacentHTML('beforeend', salesBubble(m.t, m.at)); bodyEl.lastElementChild.scrollIntoView({ block: 'nearest' });
      });
    }
  };
  CLICK['hop-thu'] = (t) => {
    const b = t.closest('.btn');
    if (b && T(b) === 'Tiếp nhận') { S.inbox.taken = true; save(); render(); toast('Chị Hà đã tiếp nhận khách – AI ngừng trả lời cuộc này', 'ok'); return; }
    const secs = $$('.app section');
    const it = t.closest('div[style*="border-top"]');
    if (it && secs[0].contains(it)) { if (!T(it).includes('Phạm Thu Trang')) toast('Bản thử có đầy đủ cuộc trò chuyện của chị Phạm Thu Trang'); return; }
    if (t.closest('.field') && !S.inbox.taken) { toast('Bấm “Tiếp nhận” trước khi nhắn cho khách'); return; }
    return false;
  };

  /* ===== 03 Khách của tôi (điện thoại) ===== */
  CLICK['khach-cua-toi'] = (t) => {
    const b = t.closest('.btn'); const card = t.closest('.card');
    if (!b) { if (t.closest('.chip') && t.closest('[style*="background:var(--navy)"]')) { toast('Đang xem nhóm khách: ' + T(t.closest('.chip'))); return; } return false; }
    const lab = T(b); const who = card ? T($('b', card)) : '';
    if (lab === 'Gọi') { toast('Đang gọi ' + who + '…'); return; }
    if (lab === 'Nhắn') return go('hop-thu');
    if (/Kết quả|Ghi kết quả/.test(lab)) { if (who.includes('Phạm Thu Trang')) return go('khach/pham-thu-trang'); toast('Ghi kết quả cho ' + who + ' – bản thử có chi tiết khách Phạm Thu Trang'); return; }
    return false;
  };

  /* ===== 04 Chi tiết khách ===== */
  S.trang = S.trang || {};
  APPLY['khach/pham-thu-trang'] = () => {
    const form = findIncl('.card', 'Ghi kết quả liên hệ'); if (!form) return;
    const opts = $$('.btn.sm', $('.row', form).parentElement.children[1]);
    opts.forEach((o) => { o.removeAttribute('style'); o.innerHTML = T(o); if (T(o) === (S.trang.result || 'Đã liên hệ được')) o.classList.add('sel-opt'); });
    const note = $$('.field', form)[0]; note.contentEditable = 'true'; note.classList.remove('muted');
    if (S.trang.note) note.textContent = S.trang.note;
    const fDate = $$('.field', form)[1], fAct = $$('.field', form)[2];
    fDate.outerHTML = `<input type="date" class="field" id="fu-date" value="${S.trang.date || '2026-11-04'}">`;
    fAct.outerHTML = `<input class="field" id="fu-act" value="${esc(S.trang.action || T(fAct))}">`;
    if (S.trang.l4) {
      const head = $('.content > .row');
      const l3 = findText('.chip', 'L3', head); if (l3) { l3.textContent = 'L4'; l3.style.background = 'var(--l4)'; }
      const up = findIncl('.btn', 'Lên L4', head); if (up) up.innerHTML = 'Lên L5 ▾';
      const sv = findIncl('.btn', 'Lưu & lên L4', form); if (sv) { sv.innerHTML = '✓ Đã lên L4'; sv.classList.add('is-off'); }
      const tl = findIncl('.card', 'Hành trình của khách');
      const last = tl && $$('.row', tl).pop();
      if (last) last.innerHTML = `<div style="width:30px;display:flex;justify-content:center"><span class="chip" style="background:var(--l4);color:#fff;padding:2px 7px">L4</span></div><div><div class="sm"><b>Khách tiềm năng</b> – follow-up ${fmtDate(S.trang.l4.date)}</div><div class="xs muted">${esc(S.trang.l4.action)} · ghi lúc ${S.trang.l4.at}</div></div>`;
    }
  };
  CLICK['khach/pham-thu-trang'] = (t) => {
    const b = t.closest('.btn'); if (!b) return false;
    const lab = T(b); const form = findIncl('.card', 'Ghi kết quả liên hệ');
    if (b.classList.contains('sm') && form && form.contains(b) && !/Lưu/.test(lab)) { S.trang.result = lab; save(); $$('.btn.sm', b.parentElement).forEach((o) => o.classList.toggle('sel-opt', o === b)); return; }
    if (/Lưu & lên L4/.test(lab)) {
      const d = $('#fu-date').value, act = $('#fu-act').value.trim();
      S.trang.note = T($$('.field', form)[0]);
      if (!d || !act) { toast('Lên L4 phải có ngày và hành động follow-up', 'bad'); return; }
      S.trang.date = d; S.trang.action = act; S.trang.l4 = { date: d, action: act, at: now() }; save(); render();
      toast('Đã lên L4 · hẹn follow-up ' + fmtDate(d), 'ok'); return;
    }
    if (/Lên L4/.test(lab)) { form.scrollIntoView({ behavior: 'smooth', block: 'center' }); toast('Điền ngày và hành động follow-up để lên L4'); return; }
    if (/Lên L5/.test(lab)) { toast('Lên L5 cần Kế toán xác nhận cọc hoặc đơn hàng'); return; }
    if (lab === 'Gọi') { toast('Đang gọi chị Phạm Thu Trang – 0912 345 678'); return; }
    if (/Mở cuộc chat/.test(lab)) return go('hop-thu');
    return false;
  };

  /* ===== 05 Phòng thử AI – AI làm đúng 5 kịch bản ===== */
  const PRICE = {
    TD4C: { name: 'Tủ đông 4 cánh', gc: ['16.100.000đ', '23.920.000đ'], mr: ['12.500.000đ', '18.500.000đ'], img: ['TD4C_GC_SP_01', 'TD4C_MR_SP_01'] },
    TD6C: { name: 'Tủ đông 6 cánh', gc: ['21.620.000đ', '35.880.000đ'], mr: ['18.500.000đ', '25.000.000đ'], img: ['TD6C_GC_SP_01', 'TD6C_MR_SP_01'] },
    TM2C: { name: 'Tủ mát 2 cánh', caps: [['1050L', '16.100.000đ'], ['1150L', '17.480.000đ'], ['1200L cao cấp', '23.800.000đ']], mr: '14.500.000đ', img: ['TM2C_GC_SP_01', 'TM2C_MR_SP_01'] },
    TM3C: { name: 'Tủ mát 3 cánh', caps: [['1500L', '23.920.000đ'], ['1650L', '25.300.000đ'], ['1800L cao cấp', '33.930.000đ']], mr: '19.000.000đ', img: ['TM3C_GC_SP_01', 'TM3C_MR_SP_01'] },
    BC: { mát: { '1,2': ['9.660.000đ', '15.640.000đ', '8.000.000đ', '12.000.000đ'], '1,5': ['10.120.000đ', '16.560.000đ', '8.500.000đ', '12.500.000đ'], '1,8': ['10.580.000đ', '17.480.000đ', '9.000.000đ', '13.000.000đ'] }, đông: { '1,2': ['10.120.000đ', '16.560.000đ', '8.500.000đ', '12.500.000đ'], '1,5': ['10.580.000đ', '17.480.000đ', '9.000.000đ', '13.000.000đ'], '1,8': ['11.040.000đ', '18.400.000đ', '9.500.000đ', '13.500.000đ'] } },
  };
  const NOPRICE = {
    SALAD: { name: 'tủ salad', img: 'SALAD_GC_SP_01', text: 'Dạ tủ salad bên em có khay inox đặt trên mặt bàn để đựng topping, phía dưới là ngăn mát giữ nguyên liệu. Mình chọn theo chiều dài bàn và số khay cần dùng ạ.', ask: 'Anh/chị cần tủ salad dài khoảng bao nhiêu và dùng khoảng mấy khay ạ?' },
    TDTB: { name: 'tủ đông trưng bày', img: 'TDTB_GC_KINHCONG_SP_01', text: 'Dạ tủ đông trưng bày bên em có 3 phiên bản: kính cong, kính phẳng và bản xả đá. Kính cong trưng bày đẹp, dễ nhìn hàng; kính phẳng gọn và dễ xếp; bản xả đá phù hợp khi mở nắp nhiều.', ask: 'Anh/chị đang quan tâm phiên bản nào và cần dài khoảng bao nhiêu ạ?' },
    GW: { name: 'máy rửa bát GoldWash', img: 'GW_GC_SP_01', text: 'Dạ GoldWash là máy rửa bát dạng bồn inox cho bếp nhà hàng. Mình chọn theo chiều dài máy và phiên bản phù hợp với lượng bát đĩa mỗi ngày.', ask: 'Bếp mình mỗi ngày rửa khoảng bao nhiêu bát đĩa và chỗ đặt dài khoảng bao nhiêu ạ?' },
  };
  const DIFF = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:400px"><div><b>Mẫu rẻ</b><div class="sm">· Dàn lạnh nhôm<br>· Hoàn thiện cơ bản<br>· Bảo hành 12 tháng</div></div><div><b style="color:#8A6A05">GoldCool</b><div class="sm">· Dàn lạnh đồng<br>· Hoàn thiện chắc chắn hơn<br>· Bảo hành 24 tháng<br>· Đổi mới 30 ngày đầu nếu lỗi kỹ thuật</div></div></div>`;
  const pcard = (title, rows, gold, pic) => `<div style="margin-left:auto;display:flex;flex-direction:column;align-items:flex-end"><div style="background:#fff;border:1px solid ${gold ? '#E8D28A' : '#CFE0EE'};border-radius:14px 4px 14px 14px;padding:10px 12px;width:410px;display:flex;gap:12px"><img src="img/${pic}.jpg" style="width:64px;height:84px;object-fit:contain;background:#EEF2F6;border-radius:6px;flex:none"><div style="flex:1"><div class="row" style="gap:6px"><b class="sm">${title}</b><span class="sp chip ${gold ? 'goldc' : 'gray'}" style="font-size:10.5px">1 ảnh</span></div>${rows.map(([k, v]) => `<div class="row sm" style="justify-content:space-between;margin-top:5px"><span class="muted">${k}</span><b style="color:var(--navy)">${v}</b></div>`).join('')}<div class="xs muted" style="margin-top:5px">Giá đã gồm VAT · chưa gồm vận chuyển</div></div></div><div class="xs muted row" style="gap:6px;margin-top:3px"><span class="ai">✦ AI</span>${now()}</div></div>`;
  const TRANSFER = [[/giảm|bớt|chiết khấu|combo|đại lý|sỉ|lấy (2|3|4|5|nhiều) cái|mua (2|3|4|5|nhiều)/, 'đòi giảm giá / combo / giá đại lý'], [/giao|ship|vận chuyển|bao lâu|mấy ngày/, 'hỏi giao hàng'], [/thanh toán|chuyển khoản|cọc|trả góp/, 'hỏi thanh toán'], [/còn hàng|tồn kho|có sẵn/, 'hỏi tồn kho'], [/hỏng|bảo hành|lỗi|không lạnh|khiếu nại/, 'khiếu nại / bảo hành'], [/nhân viên|gặp người|gọi cho|tư vấn viên/, 'muốn gặp nhân viên'], [/đặt hàng|chốt|lấy luôn|mua luôn/, 'muốn đặt hàng']];
  function aiReply(m) {
    const c = S.cv; const L = m.toLowerCase(); const out = [];
    const note = (why, lv) => { c.done = true; out.push(sysNote(`<b>AI dừng tư vấn${lv ? ` · khách lên ${lv}` : ''} · chuyển Sales ngay.</b><div class="xs muted">Lý do: ${why} · AI không gửi tin báo chuyển cho khách · Sales nhận bản bàn giao</div>`)); };
    if (c.done) { out.push(sysNote('AI đã dừng ở cuộc này – Sales đang xử lý. Bấm “Cuộc mới” để thử lại.')); return out; }
    for (const [re, why] of TRANSFER) if (re.test(L)) { note(why); return out; }
    if (c.stage === 'choice') { note('khách trả lời câu hỏi chọn cuối', 'L3'); return out; }
    if (c.stage === 'version') { note('khách trả lời kích thước / phiên bản (nhóm không báo giá)', 'L2'); return out; }
    if (!c.group) {
      if (/rửa bát|goldwash/.test(L)) c.group = 'GW'; else if (/salad/.test(L)) c.group = 'SALAD'; else if (/trưng bày|kem/.test(L)) c.group = 'TDTB';
      else if (/bàn chặt|bàn mát|bàn đông/.test(L)) c.group = 'BC'; else if (/6 cánh/.test(L)) c.group = 'TD6C'; else if (/4 cánh/.test(L)) c.group = 'TD4C';
      else if (/3 cánh/.test(L)) c.group = 'TM3C'; else if (/2 cánh/.test(L)) c.group = 'TM2C';
    }
    if (!c.model && /quán|nhà hàng|bếp|lẩu|nướng|cơm|phở|bún|cafe|cà phê|trà sữa|siêu thị|tạp hóa|cửa hàng|bar|bánh|kem|khách sạn|căng tin|trường/.test(L)) c.model = true;
    if (c.group === 'BC') { const k = L.match(/\b(đông|mát)\b/); if (k) c.kind = k[1]; const z = L.match(/1\s*[m,\.]\s*(2|5|8)/); if (z) c.size = '1,' + z[1]; }
    if (!c.group) { if (/tủ|máy/.test(L)) note('hỏi sản phẩm ngoài 5 nhóm'); else out.push(aiBubble('Dạ anh/chị đang quan tâm tủ đông, tủ mát, tủ bàn chặt, tủ salad, tủ đông trưng bày hay máy rửa bát GoldWash ạ?', now())); return out; }
    const g = c.group;
    if (NOPRICE[g]) { const n = NOPRICE[g]; out.push(aiBubble(n.text, now()), aiBubble(`<img src="img/${n.img}.jpg" style="width:220px;border-radius:8px;display:block">`, now()), aiBubble(n.ask, now())); c.stage = 'version'; return out; }
    if (g === 'BC') {
      if (!c.kind) { out.push(aiBubble('Dạ anh/chị cần tủ bàn chặt <b>đông</b> hay <b>mát</b> ạ?', now())); return out; }
      if (!c.size) { out.push(aiBubble('Dạ chỗ đặt dài khoảng <b>1,2 m, 1,5 m hay 1,8 m</b> ạ?', now())); return out; }
      const p = PRICE.BC[c.kind][c.size]; const nm = `Tủ ${c.kind} bàn chặt ${c.size} m`;
      out.push(pcard(nm + ' GoldCool', [['Trực tiếp', p[0]], ['Quạt gió', p[1]]], true, 'BC_GC_SP_01'), pcard(nm + ' – mẫu rẻ', [['Trực tiếp', p[2]], ['Quạt gió', p[3]]], false, 'BC_MR_SP_01'), aiBubble(DIFF, now()), aiBubble('Anh/chị đang nghiêng về GoldCool hay mẫu rẻ, và mình ưu tiên lạnh trực tiếp hay quạt gió ạ?', now()));
      c.stage = 'choice'; return out;
    }
    if (!c.model) { out.push(aiBubble('Dạ anh/chị đang dùng tủ cho mô hình quán gì ạ?', now())); return out; }
    const P = PRICE[g];
    if (g === 'TD4C' || g === 'TD6C') {
      out.push(aiBubble(`Dạ, ${P.name.toLowerCase()} bên em có 2 hình thức làm lạnh:<br><b>1. Lạnh trực tiếp</b> – 2 ngăn riêng, dùng cả 2 ngăn đông hoặc 1 đông – 1 mát; đầu tư thấp hơn; cần xả đá định kỳ.<br><b>2. Lạnh quạt gió</b> – lạnh nhanh, nhiệt đều hơn; không cần xả đá thủ công; một ngăn chung một chế độ nhiệt; đầu tư cao hơn.`, now()));
      out.push(pcard(P.name + ' GoldCool', [['Lạnh trực tiếp', P.gc[0]], ['Lạnh quạt gió', P.gc[1]]], true, P.img[0]), pcard(P.name + ' – mẫu rẻ', [['Lạnh trực tiếp', P.mr[0]], ['Lạnh quạt gió', P.mr[1]]], false, P.img[1]));
      out.push(aiBubble(DIFF, now()), aiBubble('Bên em vẫn bán GoldCool là chính vì phù hợp hơn với quán cần sử dụng lâu dài và ưu tiên độ ổn định ạ.', now()), aiBubble('Anh/chị đang nghiêng về GoldCool hay mẫu rẻ, và mình ưu tiên lạnh trực tiếp hay quạt gió ạ?', now()));
    } else {
      out.push(pcard(P.name + ' GoldCool', P.caps, true, P.img[0]), pcard(P.name + ' – mẫu rẻ', [['Mẫu rẻ', P.mr]], false, P.img[1]));
      out.push(aiBubble(DIFF, now()), aiBubble('Bên em vẫn bán GoldCool là chính vì phù hợp hơn với quán cần sử dụng lâu dài và ưu tiên độ ổn định ạ.', now()), aiBubble('Anh/chị đang nghiêng về GoldCool hay mẫu rẻ, và cần dung tích khoảng bao nhiêu ạ?', now()));
    }
    c.stage = 'choice'; return out;
  }
  APPLY['phong-thu-ai'] = () => {
    const card = findIncl('.card', 'Chat thử như khách'); if (!card) return;
    const bodyEl = card.children[1];
    if (!S.cv) S.cv = { group: 'BC', kind: 'mát', size: '1,5', model: true, stage: 'choice', log: [] };
    if (S.cv.fresh) bodyEl.innerHTML = '<div class="xs muted" style="text-align:center">Cuộc mới · gõ như một khách hàng nhắn Fanpage</div>';
    (S.cv.log || []).forEach((h) => bodyEl.insertAdjacentHTML('beforeend', h));
    inputInto($('.field', card.children[2]), 'Gõ câu hỏi như một khách hàng… ví dụ: “Tủ đông 6 cánh giá sao em?”', (v) => {
      const add = [kBubble(v, now())].concat(aiReply(v));
      S.cv.log = (S.cv.log || []).concat(add); save();
      add.forEach((h) => bodyEl.insertAdjacentHTML('beforeend', h)); bodyEl.lastElementChild.scrollIntoView({ block: 'nearest' });
    });
  };
  CLICK['phong-thu-ai'] = (t) => {
    const b = t.closest('.btn'); if (!b) return false;
    if (/Cuộc mới/.test(T(b))) { S.cv = { fresh: true, log: [] }; save(); render(); return; }
    if (/Chạy lại/.test(T(b))) { toast('Đang chạy lại 70 câu kiểm tra… Kết quả: bài 1 đạt 30/30, bài 2 còn 2 câu sai (#17, #31)'); return; }
    return false;
  };

  /* ===== 06 Bảng giá bán lẻ ===== */
  APPLY['bang-gia'] = () => {
    const f = findIncl('.field', 'Chọn ngày');
    if (f) f.outerHTML = `<input type="date" class="field" id="price-date" style="padding:6px 10px" value="${(S.prices && S.prices.date) || ''}">`;
    if (S.prices && S.prices.done) {
      $$('.chip').filter((c) => T(c) === 'Chờ chốt').forEach((c) => setChip(c, 'ok', 'Đang áp dụng'));
      const ban = findIncl('.card', 'Giá đang chạy theo kịch bản AI');
      if (ban) { ban.style.background = 'var(--oks)'; ban.style.borderColor = '#B8DFC9'; $('b.sm', ban).textContent = `Đã duyệt bảng giá · áp dụng từ ${fmtDate(S.prices.date)}`; $('.xs', ban).textContent = `Người duyệt: Nguyễn Văn Huy · lúc ${S.prices.at}. Sửa giá nào sau này cũng phải duyệt lại.`; }
      const st = findIncl('.card', 'Chờ anh chốt'); if (st) { $('.xs', st).textContent = 'Đã duyệt'; $('b', st).textContent = '28 dòng giá'; }
      const ab = findIncl('.btn', 'Duyệt cả bảng'); if (ab) { ab.innerHTML = '✓ Đã duyệt'; ab.classList.add('is-off'); }
    }
  };
  CLICK['bang-gia'] = (t) => {
    const b = t.closest('.btn'); if (!b) return false;
    if (/Duyệt cả bảng/.test(T(b))) {
      const d = $('#price-date').value; if (!d) { toast('Chọn ngày áp dụng trước khi duyệt', 'bad'); $('#price-date').focus(); return; }
      S.prices = { date: d, done: true, at: now() }; save(); render(); toast('Đã duyệt 28 dòng giá · áp dụng từ ' + fmtDate(d), 'ok'); return;
    }
    if (/Nhật ký/.test(T(b))) { toast(S.prices && S.prices.done ? `Nhật ký: Nguyễn Văn Huy duyệt bảng giá lúc ${S.prices.at}` : 'Nhật ký: chưa có lần duyệt nào'); return; }
    if (/Giao việc/.test(T(b))) { toast('Đã tạo việc “Lập giá tủ đông trưng bày theo model” cho Kế toán', 'ok'); return; }
    return false;
  };

  /* ===== 08 Cài đặt AI ===== */
  APPLY['cai-dat-ai'] = () => {
    const card = findIncl('.card', 'Câu bị cấm'); if (!card) return;
    const box = $$('.row', card).find((r) => r.style.flexWrap === 'wrap');
    const list = S.bannedDraft || banned();
    box.innerHTML = list.map((w) => `<span class="chip bad click" data-ban="${esc(w)}" style="padding:4px 9px" title="Bấm để bỏ">⊘ ${esc(w)} ✕</span>`).join('') + '<span class="chip gray click" data-add-ban="1" style="padding:4px 10px">+ Thêm</span>';
  };
  CLICK['cai-dat-ai'] = (t) => {
    const x = t.closest('[data-ban]');
    if (x) { S.bannedDraft = (S.bannedDraft || banned().slice()).filter((w) => w !== x.dataset.ban); APPLY['cai-dat-ai'](); toast('Đã bỏ “' + x.dataset.ban + '” – bấm Lưu thay đổi để áp dụng'); return; }
    const ad = t.closest('[data-add-ban]');
    if (ad) { ad.outerHTML = '<input class="field" id="ban-in" placeholder="Nhập cụm từ rồi Enter" style="width:200px;padding:5px 10px">'; const i = $('#ban-in'); i.focus(); i.onkeydown = (e) => { if (e.key === 'Enter' && i.value.trim()) { S.bannedDraft = (S.bannedDraft || banned().slice()).concat(i.value.trim().toLowerCase()); APPLY['cai-dat-ai'](); } if (e.key === 'Escape') APPLY['cai-dat-ai'](); }; return; }
    const b = t.closest('.btn');
    if (b && /Lưu thay đổi/.test(T(b))) { if (S.bannedDraft) S.banned = S.bannedDraft; delete S.bannedDraft; save(); toast('Đã lưu cài đặt AI Sales · ghi vào Nhật ký thay đổi', 'ok'); return; }
    if (b && T(b) === 'Hủy') { delete S.bannedDraft; render(); toast('Đã hủy thay đổi'); return; }
    if (t.closest('[style*="border:2px solid #D5DCE5"]') || /Tự trả lời/.test(T(t.closest('.col') || t))) { toast('Nấc này đang khóa: cần 2 bài kiểm tra đạt 100% và chạy song song 1 tuần không có lỗi nặng'); return; }
    return false;
  };

  /* ===== 09 Chi tiết sản phẩm ===== */
  APPLY['san-pham'] = () => {
    const sw = $$('span[style*="width:38px;height:22px"]')[0]; if (!sw) return;
    sw.style.cursor = 'pointer'; sw.dataset.sw = '1';
    const on = S.aiProduct !== false; sw.style.background = on ? 'var(--ok)' : '#C4CCD7'; sw.firstElementChild.style.right = on ? '3px' : '19px';
  };
  CLICK['san-pham'] = (t) => {
    if (t.closest('[data-sw]')) { S.aiProduct = S.aiProduct === false; save(); APPLY['san-pham'](); toast(S.aiProduct ? 'AI được báo giá sản phẩm này' : 'Đã tắt: AI sẽ chuyển Sales thay vì báo giá sản phẩm này', S.aiProduct ? 'ok' : ''); return; }
    const b = t.closest('.btn');
    if (b && T(b) === 'Lưu') { toast('Đã lưu sản phẩm · Người phụ trách dữ liệu: Nguyễn Văn Chính', 'ok'); return; }
    if (b && /Xem như AI thấy/.test(T(b))) { toast('AI chỉ thấy: giá đã duyệt, thông số trong bảng, ảnh và feedback đã xác thực'); return; }
    return false;
  };

  /* ===== 10 Bảng số liệu ===== */
  CLICK['bang-so-lieu'] = (t) => {
    const b = t.closest('.btn'); if (!b) return false;
    const s = T(b.closest('.row'));
    if (/Mở cây mục tiêu/.test(T(b))) return go('cay-muc-tieu');
    if (/Xem và quyết/.test(T(b))) { if (s.includes('GoldWash')) return go('the-van-de/vd-1107'); if (s.includes('bảng giá')) return go('bang-gia'); toast('Bản thử có chi tiết thẻ “Thống nhất cách nói bảo hành GoldWash”'); return go('the-van-de'); }
    return false;
  };

  /* ===== 12 Báo cáo tuần (điện thoại) ===== */
  APPLY['bao-cao-tuan'] = () => {
    const card = findIncl('.card', 'Một việc chị đã làm đúng DNA');
    if (card) $$('.chip', card).forEach((c) => { c.classList.add('click'); if (S.value) { const on = T(c).replace('✓', '').trim() === S.value; c.className = 'chip click ' + (on ? 'goldc' : 'gray'); c.style.outline = on ? '1.5px solid var(--gold)' : ''; } });
    if (S.report) { const b = findIncl('.btn', 'Nộp báo cáo tuần 45'); if (b) { b.innerHTML = '✓ Đã nộp lúc ' + S.report; b.style.background = 'var(--ok)'; b.style.borderColor = 'var(--ok)'; b.style.color = '#fff'; b.classList.add('is-off'); } }
  };
  CLICK['bao-cao-tuan'] = (t) => {
    const c = t.closest('.chip.click'); if (c) { S.value = T(c).replace('✓', '').trim(); save(); APPLY['bao-cao-tuan'](); return; }
    const b = t.closest('.btn');
    if (b && /Nộp báo cáo/.test(T(b))) { S.report = now(); save(); APPLY['bao-cao-tuan'](); toast('Đã nộp báo cáo tuần 45 · chị Đỗ Huyền Thanh nhận yêu cầu hỗ trợ', 'ok'); return; }
    return false;
  };

  /* ===== 13–14 Thẻ vấn đề ===== */
  CLICK_CARDS['the-van-de'] = (c) => c.style.padding === '12px 14px';
  APPLY['the-van-de'] = () => {
    if (!S.decision) return;
    const c = $$('.card').find((x) => T(x).includes('bảo hành GoldWash')); if (!c) return;
    c.insertAdjacentHTML('beforeend', `<div class="row xs" style="margin-top:8px;gap:6px"><span class="chip ok" style="font-size:11px">✓ Đã quyết: phương án ${S.decision.k}</span><span class="muted">chờ bằng chứng để đóng thẻ</span></div>`);
  };
  CLICK['the-van-de'] = (t) => {
    const c = t.closest('.card.click');
    if (c) { if (T(c).includes('bảo hành GoldWash')) return go('the-van-de/vd-1107'); toast('Bản thử có chi tiết thẻ “Thống nhất cách nói bảo hành GoldWash”'); return; }
    return false;
  };
  APPLY['the-van-de/vd-1107'] = () => {
    if (!S.decision) return;
    const d = findIncl('.card', 'Cần anh quyết định'); if (!d) return;
    d.style.background = 'var(--oks)'; d.style.borderColor = '#9FD3B6';
    d.innerHTML = `<h3 style="color:var(--ok)">✓ Đã quyết định</h3><div class="sm" style="margin-top:8px"><b>Phương án ${S.decision.k}:</b> ${esc(S.decision.t)}</div><div class="xs muted" style="margin-top:6px">Nguyễn Văn Huy · ${S.decision.at} · đã ghi vào Thư viện quyết định</div><div class="sm" style="margin-top:12px">Việc tiếp theo: chị Lan sửa kịch bản K.5, S.7; anh Đạt sửa website; tải bằng chứng lên để đóng thẻ.</div><span class="btn sm" data-undo="1" style="margin-top:12px">Hoàn tác</span>`;
    const chip = findText('.chip', 'Chờ duyệt'); if (chip) setChip(chip, 'ok', 'Đã quyết – chờ bằng chứng');
  };
  CLICK['the-van-de/vd-1107'] = (t) => {
    if (t.closest('[data-undo]')) { delete S.decision; save(); render(); return; }
    const b = t.closest('.btn'); if (!b) return false;
    const m = T(b).match(/Phương án (A|B) – (.*)/);
    if (m) { S.decision = { k: m[1], t: m[2], at: now() }; save(); render(); toast('Đã chọn phương án ' + m[1] + ' · thông báo cho chị Lan, anh Hùng, anh Đạt', 'ok'); return; }
    if (/Yêu cầu thêm thông tin/.test(T(b))) { toast('Đã gửi yêu cầu bổ sung thông tin cho chị Nguyễn Thị Lan'); return; }
    return false;
  };
  const issueComment = () => {
    const f = findIncl('.field', 'Viết trao đổi'); if (!f) return;
    inputInto(f, 'Viết trao đổi…', (v) => {
      S.comments = (S.comments || []).concat({ t: v, at: now(), byName: (UMAP[S.role] || {}).n || 'Nguyễn Văn Huy', _new: true }); save(); render();
    });
    (S.comments || []).forEach((c) => f.insertAdjacentHTML('beforebegin', `<div class="row" style="gap:10px;align-items:flex-start;margin-top:12px"><span class="av" style="width:28px;height:28px;font-size:10.6px;background:#E8F1F8;color:var(--navy)">NH</span><div style="flex:1"><div class="xs"><b>${esc(c.byName || 'Nguyễn Văn Huy')}</b> <span class="muted">· ${fmtAt(c.at)}</span></div><div class="sm" style="margin-top:2px">${esc(c.t)}</div></div></div>`));
  };
  const _a14 = APPLY['the-van-de/vd-1107']; APPLY['the-van-de/vd-1107'] = () => { _a14(); issueComment(); };

  /* ===== 15 Hôm nay học gì ===== */
  CLICK_CARDS['hom-nay-hoc-gi'] = (c) => /Luyện đóng vai|Bài học/.test(T(c)) && T(c).length < 140;
  CLICK['hom-nay-hoc-gi'] = (t) => {
    const c = t.closest('.card.click');
    if (c) { if (T(c).includes('Luyện đóng vai')) return go('dong-vai'); if (T(c).includes('đã xong')) { toast('Bài này đã học xong'); return; } toast('Mở bài học: ' + T($('b', c))); return; }
    const b = t.closest('.btn'); if (b && /Học tiếp/.test(T(b))) { toast('Mở bài: Tủ đông trưng bày – giải thích phiên bản, hỏi kích thước (K.4, S.5)'); return; }
    if (b && /Nhắn/.test(T(b))) { toast('Mở tin nhắn với chị Đoàn Thị Hồng Hà'); return; }
    return false;
  };

  /* ===== 16 Bài thi ===== */
  APPLY['bai-thi'] = () => {
    const opts = $$('.card .col > .row').filter((r) => /^[ABCD]/.test(T(r)));
    const pick = S.exam || 'B';
    opts.forEach((r) => {
      r.classList.add('card', 'click'); r.style.padding = '15px 18px'; r.dataset.opt = T(r)[0];
      const on = r.dataset.opt === pick; r.style.border = on ? '2px solid var(--navy)' : '1.5px solid var(--line)'; r.style.background = on ? 'var(--ice)' : '#fff';
      const dot = r.firstElementChild; dot.style.background = on ? 'var(--navy)' : 'var(--grays)'; dot.style.color = on ? '#fff' : 'var(--muted)';
      const tag = $('.sp', r); if (tag) tag.remove(); if (on) r.insertAdjacentHTML('beforeend', '<span class="sp xs" style="color:var(--navy);font-weight:600">Đã chọn</span>');
    });
    if (S.examDone) { const res = S.exam === 'B'; const h = findIncl('.btn', 'Nộp bài'); if (h) h.insertAdjacentHTML('afterend', `<div class="card" style="padding:12px 14px;border-color:${res ? '#9FD3B6' : '#F0C3BC'}"><b class="sm" style="color:var(--${res ? 'ok' : 'bad'})">${res ? '✓ Câu 12 đúng' : '✕ Câu 12 sai – đáp án B'}</b><div class="xs muted" style="margin-top:4px">Khách đã nói mô hình nên không hỏi lại; bước tiếp theo trong K.1 là giải thích lạnh trực tiếp và quạt gió.</div></div>`); }
  };
  CLICK['bai-thi'] = (t) => {
    const o = t.closest('[data-opt]'); if (o) { S.exam = o.dataset.opt; delete S.examDone; save(); render(); return; }
    const b = t.closest('.btn'); if (!b) return false;
    if (/Nộp bài/.test(T(b))) { S.examDone = true; save(); render(); toast('Bản thử chấm câu 12 · bộ 30 câu đầy đủ sẽ lấy từ ngân hàng câu hỏi'); return; }
    if (/Câu sau|Câu trước/.test(T(b))) { toast('Bản thử có câu 12 · bộ 30 câu sẽ lấy từ ngân hàng câu hỏi theo DNA'); return; }
    return false;
  };

  /* ===== 17 Phòng đóng vai ===== */
  APPLY['dong-vai'] = () => {
    const card = findIncl('.card', 'Anh Tuấn (vai khách)'); if (!card) return;
    const bodyEl = card.children[2]; const wait = bodyEl.lastElementChild;
    const rp = S.rp || { log: [] };
    rp.log.forEach((h) => wait.insertAdjacentHTML('beforebegin', h));
    inputInto($('.field', card.children[3]), 'Nhập câu trả lời như đang nhắn với khách…', (v) => {
      const L = v.toLowerCase(); S.rp = S.rp || { log: [] };
      if (/bớt|giảm|tặng|chiết khấu|khuyến mãi/.test(L) && !/không (tự )?(bớt|giảm)|không giảm|không bớt/.test(L)) S.rp.discount = true;
      if (/mẫu rẻ|8\.?500|8 triệu 5/.test(L)) S.rp.cheap = true;
      if (/không (tự )?(bớt|giảm)|giá bán lẻ|đã gồm vat/.test(L)) S.rp.held = true;
      let reply = 'Anh vẫn thấy cao. Em xem có cách nào không?';
      if (S.rp.discount) reply = 'Ok, em bớt thế thì anh chốt luôn, em gửi anh số tài khoản nhé.';
      else if (S.rp.cheap && S.rp.held) reply = 'Ừ em nói rõ thế anh hiểu. Bếp chạy cả ngày thì anh lấy GoldCool trực tiếp, em xin địa chỉ đi.';
      else if (S.rp.cheap) reply = 'Mẫu rẻ thì bảo hành có 12 tháng à? Thế GoldCool có bớt được không?';
      const add = [`<div style="margin-left:auto;max-width:74%;background:var(--ice);border:1px solid #CFE0EE;border-radius:14px 4px 14px 14px;padding:9px 13px">${esc(v)}</div>`, `<div style="display:flex;gap:9px;max-width:74%"><span class="av" style="width:32px;height:32px;font-size:11px;background:#FDF1D8;color:#8A6A05">KH</span><div style="background:#fff;border:1px solid var(--line);border-radius:4px 14px 14px 14px;padding:9px 13px">${esc(reply)}</div></div>`];
      S.rp.log = S.rp.log.concat(add); save();
      add.forEach((h) => wait.insertAdjacentHTML('beforebegin', h)); wait.scrollIntoView({ block: 'nearest' });
      const lc = findIncl('.row', 'Lượt'); if (lc) { const n = 7 + S.rp.log.length / 2; const bb = $('b', lc); if (bb) bb.textContent = `${n} / 20`; }
    });
  };
  CLICK['dong-vai'] = (t) => {
    const b = t.closest('.btn'); if (b && /Kết thúc và chấm điểm/.test(T(b))) { S.rp = S.rp || { log: [] }; S.rp.ended = true; save(); return go('ket-qua-dong-vai'); }
    return false;
  };

  /* ===== 18 Kết quả đóng vai ===== */
  APPLY['ket-qua-dong-vai'] = () => {
    const rp = S.rp; if (!rp || !rp.log || !rp.log.length || rp.discount || !(rp.cheap || rp.held)) return;
    const head = findIncl('.card', 'CHƯA ĐẠT'); if (!head) return;
    head.style.borderColor = '#9FD3B6';
    head.firstElementChild.style.background = 'conic-gradient(var(--ok) 0 100%,#EEF1F5 0)';
    $('b', head.firstElementChild).textContent = '6/6';
    setChip(findText('.chip', 'CHƯA ĐẠT', head), 'ok', 'ĐẠT'); $('.chip.ok', head).style.cssText = 'font-size:14px;padding:4px 14px';
    const big = $$('div', head).find((d) => T(d).startsWith('Trượt tiêu chí')); if (big) big.textContent = 'Giữ đúng quyền hạn: không tự giảm giá, đưa mẫu rẻ để khách tự chọn.';
    const bad = $$('.card').find((c) => T(c).startsWith('Đúng quyền hạn')); if (bad) { bad.style.cssText = 'padding:14px 16px'; bad.innerHTML = `<div class="row" style="gap:8px"><b class="sm" style="color:var(--ok)">✓ Đúng quyền hạn</b><span class="sp chip ok" style="font-size:11px">Đạt</span></div><div class="xs muted" style="margin-top:10px;font-weight:600">BẠN ĐÃ NÓI</div><div class="sm" style="margin-top:3px;padding-left:10px;border-left:3px solid #CDE7D8;font-style:italic">“${esc(T($('div', document.createRange().createContextualFragment(rp.log.filter((_, i) => i % 2 === 0).slice(-1)[0] || '<div></div>'))))}”</div><div class="xs muted" style="margin-top:10px;font-weight:600">NHẬN XÉT</div><div class="sm" style="margin-top:3px">Không tự bớt giá, giữ niềm tin lâu dài hơn doanh số trước mắt.</div>`; }
  };
  const _kq = APPLY['ket-qua-dong-vai'];
  APPLY['ket-qua-dong-vai'] = () => {
    _kq();
    const rp = S.rp; if (!rp || !rp.log || !rp.log.length || rp.discount || !(rp.cheap || rp.held)) return;
    const ch = $$('.chip').find((c) => T(c).includes('tự giảm giá')); if (ch) setChip(ch, 'ok', 'Đạt · giữ đúng quyền hạn');
    const mt = findIncl('.card', 'Người kèm cặp'); const cm = mt && $$('.sm', mt).find((d) => T(d).length > 60);
    if (cm) cm.textContent = 'Lần này xử lý khách đòi bớt rất đúng: không tự giảm, đưa mẫu rẻ để khách tự chọn. Đủ điều kiện qua nhóm Tủ bàn chặt & salad.';
  };
  CLICK['ket-qua-dong-vai'] = (t) => {
    const b = t.closest('.btn'); if (!b) return false;
    if (/Luyện lại/.test(T(b))) { delete S.rp; save(); return go('dong-vai'); }
    if (/Xem lại cuộc chat/.test(T(b))) return go('dong-vai');
    return false;
  };

  /* ===== 07, 11 ===== */
  CLICK['bao-cao-ai'] = (t) => { const b = t.closest('.btn'); if (b && /Sổ lỗi/.test(T(b))) return go('so-loi'); return false; };

  /* ===== Các màn bổ sung ===== */
  const UMAP = {}; (window.USERS || []).forEach((u) => { UMAP[u.k] = u; });
  const me = () => UMAP[S.role] || UMAP.ha;
  function CLICK2(r, t) {
    const b = t.closest('.btn'); const lab = b ? T(b) : '';
    if (r === 'dang-nhap') {
      const ro = t.closest('[data-role]');
      if (ro) { S.role = ro.dataset.role; save(); $$('[data-role]').forEach((x) => { const on = x === ro; x.style.borderColor = on ? 'var(--navy)' : 'transparent'; x.style.background = on ? 'var(--ice)' : ''; }); return; }
      if (t.closest('#lg-go')) { doLogin(); return; }
      if (/Quên mật khẩu/.test(T(t))) { toast('Liên hệ chị Huyền (HCNS & Hệ thống) để cấp lại mật khẩu'); return; }
    }
    if (r === 'thong-bao' && /Đánh dấu đã đọc hết/.test(lab)) { $$('.noti .dot').forEach((d) => d.remove()); $$('.noti').forEach((n) => { n.style.background = ''; }); toast('Đã đánh dấu đã đọc', 'ok'); return; }
    if (r === 'bang-so-lieu') { const c = t.closest('.card'); if (c && /Nộp báo cáo tuần 44/.test(T(c))) return go('bao-cao-doi'); if (c && /Trợ lý AI gợi ý/.test(T(c))) return go('tom-tat-ai'); }
    if (r === 'cay-muc-tieu') { if (/Đề xuất mục tiêu/.test(lab)) return go('de-xuat-muc-tieu'); const c = t.closest('.card'); if (c && /liên hệ/i.test(T(c))) return go('muc-tieu/chi-tiet'); }
    if (r === 'the-van-de' && /Báo vấn đề/.test(lab)) return go('the-van-de/moi');
    if (r === 'the-van-de/moi') {
      if (lab === 'Tạo thẻ') { const v = (id) => ($('#' + id) || {}).value || ''; if (!v('iss-1') || !v('iss-2') || !v('iss-3')) { toast('Điền đủ Vấn đề, Nguyên nhân, Phương án', 'bad'); return; } S.newIssues = (S.newIssues || []).concat({ t: v('iss-1'), due: v('iss-6'), byName: me().n, _new: true }); save(); toast('Đã tạo thẻ vấn đề', 'ok'); return go('the-van-de'); }
      if (lab === 'Hủy') return go('the-van-de');
    }
    if (r === 'de-xuat-muc-tieu' && /Gửi duyệt/.test(lab)) { toast('Đã gửi đề xuất cho Nguyễn Văn Huy duyệt', 'ok'); return go('cay-muc-tieu'); }
    if (r === 'ghi-nhan') {
      const ch = t.closest('[data-val]'); if (ch) { $$('[data-val]').forEach((x) => { x.className = 'chip click ' + (x === ch ? 'goldc' : 'gray'); }); return; }
      if (/Gửi ghi nhận/.test(lab)) { const who = $('#kd-who').value.trim(), tx = $('#kd-text').value.trim(); const val = T($('[data-val].goldc') || $('[data-val]')); if (!who || !tx) { toast('Ghi rõ người được ghi nhận và việc cụ thể', 'bad'); return; } S.kudos = [{ who, tx, val, at: now(), byName: me().n, _new: true }].concat(S.kudos || []); save(); render(); toast('Đã gửi ghi nhận cho ' + who, 'ok'); return; }
    }
    if (r === 'xem-bai-hoc') {
      const q = t.closest('[data-quiz]'); if (q) { const ok = q.dataset.quiz === '1'; q.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)'; q.style.background = ok ? 'var(--oks)' : 'var(--bads)'; toast(ok ? 'Đúng: nhóm này AI không báo giá' : 'Chưa đúng: tủ đông trưng bày AI không báo giá', ok ? 'ok' : 'bad'); return; }
      if (/Đánh dấu đã học/.test(lab)) { toast('Đã hoàn thành bài học', 'ok'); return go('hom-nay-hoc-gi'); }
    }
    if (r === 'ket-qua-thi' && /Học tiếp/.test(lab)) return go('hom-nay-hoc-gi');
    if (r === 'bai-thi' && /Nộp bài/.test(lab)) return go('ket-qua-thi');
    if (r === 'hom-nay-hoc-gi') { const c = t.closest('.card'); if (c && T(c).includes('Bài học') && !T(c).includes('đã xong')) return go('xem-bai-hoc'); }
    if (r === 'trang-chu') { const c = t.closest('.card'); if (c && /Chứng nhận tư vấn/.test(T(c))) return go('ho-so-nang-luc'); }
    return false;
  }
  function personalize(id) {
    if (id === 'dang-nhap') {
      const f = $('#lg-find'); if (f) f.oninput = () => { const q = f.value.toLowerCase().trim(); $$('.lg-u').forEach((u) => { u.hidden = q && !u.dataset.find.includes(q); }); $$('.lg-grp').forEach((g) => { g.hidden = !$$('.lg-u', g).some((u) => !u.hidden); }); };
      const cur = $(`[data-role="${S.role || 'ha'}"]`); if (cur) cur.click();
      return;
    }
    if (!S.loggedIn || !S.role) return;
    const u = me();
    const box = $('.me'); if (box) { $('.av', box).textContent = u.a; $('b', box).textContent = u.n; $('span', box).textContent = u.r; }
    const ta = $('.top > .av'); if (ta) ta.textContent = u.a;
    if (id === 'trang-chu' && S.role !== 'ha') { const h = $('.h1'); if (h) h.textContent = 'Chào buổi sáng, ' + u.n.split(' ').pop(); }
  }
  APPLY['ghi-nhan'] = () => { const l = $('#kd-list'); if (l) (S.kudos || []).slice().reverse().forEach((k) => l.insertAdjacentHTML('afterbegin', `<div style="padding:12px 18px;border-top:1px solid var(--line);background:#FFFCF2"><div class="row sm" style="gap:8px"><b>${esc(k.byName || 'Đoàn Thị Hồng Hà')}</b><span class="muted">→</span><b>${esc(k.who)}</b><span class="sp xs muted">${fmtAt(k.at)}</span></div><span class="chip blue" style="font-size:11px;margin-top:6px">${esc(k.val)}</span><div class="sm muted" style="margin-top:6px">“${esc(k.tx)}”</div></div>`)); };
  const _tvd = APPLY['the-van-de'];
  APPLY['the-van-de'] = () => { if (_tvd) _tvd(); const col = $$('.content div').find((c) => c.style.background === 'rgb(238, 242, 246)' && T(c).startsWith('Mới')); if (!col) return; (S.newIssues || []).forEach((n) => col.firstElementChild.insertAdjacentHTML('afterend', `<div class="card" style="padding:12px 14px;border-color:#9FD3B6"><div class="row" style="gap:6px"><span class="chip gray" style="font-size:11px">KD & MKT</span><span class="chip ok" style="font-size:11px">Mới tạo</span></div><b class="sm" style="display:block;margin-top:8px">${esc(n.t)}</b><div class="row xs" style="margin-top:10px;gap:6px"><span>${esc(n.byName || 'Đoàn Thị Hồng Hà')}</span><span class="sp chip gray" style="font-size:11px">Hạn ${fmtDate(n.due)}</span></div></div>`)); };
  APPLY['chat-website'] = () => {
    const body = $('#web-body'); const f = $('#web-in'); if (!body || !f) return;
    const W = S.web || { cv: {}, log: [] };
    W.log.forEach((h) => body.insertAdjacentHTML('beforeend', h));
    inputInto(f, 'Nhập tin nhắn…', (v) => {
      const keep = S.cv; S.cv = W.cv;
      const add = [`<div style="align-self:flex-end;background:var(--navy);color:#fff;border-radius:14px 4px 14px 14px;padding:9px 12px;max-width:85%" class="sm">${esc(v)}</div>`].concat(aiReply(v).map((h) => `<div class="wl" style="zoom:.85">${h}</div>`));
      W.cv = S.cv; S.cv = keep; W.log = W.log.concat(add); S.web = W; save();
      add.forEach((h) => body.insertAdjacentHTML('beforeend', h)); body.scrollTop = body.scrollHeight;
    });
  };

  /* ===== Luyện tập: bài thi 30 câu từ DNA (ngân hàng js/exam_bank.js) ===== */
  const BANK = window.EXAM_BANK || [], PARTS = window.EXAM_PARTS || [];
  const PASS = Math.ceil(BANK.length * 0.8), MINUTES = 30;
  const exKey = () => 'ex_' + (S.role || 'ha');
  const EX = () => { const k = exKey(); if (!S[k] || S[k].v !== 1) S[k] = { v: 1, ans: {}, cur: 0, mark: {}, start: Date.now() }; return S[k]; };
  let exTimer;
  function exGrade(e) {
    const parts = PARTS.map(() => ({ ok: 0, n: 0 })); const wrong = [];
    BANK.forEach(([p, q, o, c, why], i) => { parts[p].n++; if (e.ans[i] === c) parts[p].ok++; else wrong.push({ i, q, right: o[c], picked: e.ans[i] === undefined ? 'Chưa trả lời' : o[e.ans[i]], why }); });
    const ok = parts.reduce((a, x) => a + x.ok, 0);
    return { ok, n: BANK.length, pass: ok >= PASS, parts, wrong, at: new Date().toISOString() };
  }
  APPLY['bai-thi'] = () => {
    const c = $('.content'); if (!c || !BANK.length) return;
    const e = EX(); if (e.done) { e.ans = {}; e.cur = 0; e.mark = {}; e.start = Date.now(); delete e.done; save(); }
    const i = Math.max(0, Math.min(BANK.length - 1, e.cur)); const [p, q, o] = BANK[i];
    const answered = Object.keys(e.ans).length;
    const L = 'ABCD';
    c.innerHTML = `<div class="card row" style="gap:20px;align-items:center;padding:16px 20px"><div><b style="font-size:17px">Bài thi Sales · Sản phẩm, chính sách và kịch bản</b><div class="xs muted">${BANK.length} câu · ${MINUTES} phút · đạt khi đúng từ 80% (${PASS}/${BANK.length}) · câu hỏi soạn từ DNA GoldCool</div></div>
      <div class="sp row" style="gap:22px;align-items:center"><div style="width:180px"><div class="row xs muted">Đã làm<b class="sp" style="color:var(--ink)">${answered}/${BANK.length}</b></div><div class="bar" style="margin-top:6px"><i style="width:${Math.round(answered / BANK.length * 100)}%"></i></div></div><div class="row" style="gap:6px;align-items:center"><b id="ex-time" style="font-size:20px;font-variant-numeric:tabular-nums">--:--</b></div></div></div>
      <div style="display:grid;grid-template-columns:1fr 320px;gap:20px;margin-top:20px;align-items:start">
       <div class="card" style="padding:24px">
        <div class="row" style="gap:8px"><span class="chip blue">Câu ${i + 1} / ${BANK.length}</span><span class="chip gray">${esc(PARTS[p])}</span><span class="sp btn sm" data-ex="mark">${e.mark[i] ? '★ Bỏ đánh dấu' : 'Đánh dấu xem lại'}</span></div>
        <div style="font-size:18px;font-weight:600;line-height:1.5;margin-top:18px">${esc(q)}</div>
        <div class="col" style="gap:10px;margin-top:18px">${o.map((t, k) => { const on = e.ans[i] === k; return `<div class="row click" data-ex-opt="${k}" style="gap:12px;align-items:center;padding:14px 16px;border-radius:12px;border:${on ? '2px solid var(--navy)' : '1.5px solid var(--line)'};background:${on ? 'var(--ice)' : '#fff'};cursor:pointer"><span style="width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-weight:700;flex:none;background:${on ? 'var(--navy)' : '#EEF1F5'};color:${on ? '#fff' : 'var(--muted)'}">${L[k]}</span><span class="sm">${esc(t)}</span>${on ? '<span class="sp xs" style="color:var(--navy);font-weight:600">Đã chọn</span>' : ''}</div>`; }).join('')}</div>
        <div class="row" style="margin-top:20px;gap:8px"><span class="btn${i === 0 ? ' is-off' : ''}" data-ex="prev">Câu trước</span><span class="sp xs muted">Đáp án và giải thích hiện sau khi nộp bài</span><span class="btn nv${i === BANK.length - 1 ? ' is-off' : ''}" data-ex="next">Câu sau</span></div>
       </div>
       <div class="col" style="gap:16px">
        <div class="card" style="padding:18px"><h3>Bảng câu hỏi</h3><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-top:12px">${BANK.map((_, k) => { const a = e.ans[k] !== undefined; return `<span data-ex-go="${k}" style="position:relative;height:34px;border-radius:8px;display:grid;place-items:center;font-size:13px;font-weight:700;cursor:pointer;${k === i ? 'outline:2px solid var(--gold);' : ''}background:${a ? 'var(--navy)' : '#EEF1F5'};color:${a ? '#fff' : 'var(--muted)'}">${k + 1}${e.mark[k] ? '<span style="position:absolute;top:3px;right:4px;width:6px;height:6px;border-radius:50%;background:var(--gold)"></span>' : ''}</span>`; }).join('')}</div>
         <div class="col xs muted" style="gap:4px;margin-top:12px"><div>Đã trả lời: ${answered}</div><div>Chưa trả lời: ${BANK.length - answered}</div><div>Đánh dấu xem lại: ${Object.values(e.mark).filter(Boolean).length}</div></div></div>
        <div class="card" style="padding:18px"><h3>Phần thi</h3>${PARTS.map((t, k) => `<div class="row sm" style="margin-top:10px;gap:8px">${esc(t)}<span class="sp muted">${BANK.filter((b) => b[0] === k).length} câu</span></div>`).join('')}</div>
        <span class="btn pri" data-ex="submit" style="justify-content:center">Nộp bài</span>
        <div class="xs muted" id="ex-note">${BANK.length - answered ? `Còn ${BANK.length - answered} câu chưa trả lời` : 'Đã trả lời hết, có thể nộp bài'}</div>
       </div></div>`;
    clearInterval(exTimer);
    const tick = () => { const el = $('#ex-time'); if (!el) { clearInterval(exTimer); return; } const left = Math.max(0, MINUTES * 60 - Math.floor((Date.now() - e.start) / 1000)); el.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); el.style.color = left < 300 ? 'var(--bad)' : ''; if (!left) { clearInterval(exTimer); exSubmit(true); } };
    tick(); exTimer = setInterval(tick, 1000);
  };
  function exSubmit(auto) {
    const e = EX(); e.result = exGrade(e); e.done = true;
    S.exHist = (S.exHist || []).concat([{ who: S.role, ok: e.result.ok, n: e.result.n, at: e.result.at }]).slice(-20);
    save(); clearInterval(exTimer);
    if (SERVER) api('/api/state', { method: 'POST', body: JSON.stringify({ type: 'log', key: 'exams', item: { who: S.role, name: me().n, ok: e.result.ok, n: e.result.n, pass: e.result.pass, at: e.result.at }, note: 'Nộp bài thi Sales: ' + e.result.ok + '/' + e.result.n + (e.result.pass ? ' · Đạt' : ' · Chưa đạt') }) }).catch(() => {});
    if (auto) toast('Hết giờ, đã tự nộp bài');
    go('ket-qua-thi');
  }
  CLICK['bai-thi'] = (t) => {
    const e = EX();
    const o = t.closest('[data-ex-opt]'); if (o) { e.ans[e.cur] = +o.dataset.exOpt; save(); render(); return; }
    const g = t.closest('[data-ex-go]'); if (g) { e.cur = +g.dataset.exGo; save(); render(); return; }
    const b = t.closest('[data-ex]'); if (!b) return false;
    const a = b.dataset.ex;
    if (a === 'prev' && e.cur > 0) { e.cur--; save(); render(); }
    else if (a === 'next' && e.cur < BANK.length - 1) { e.cur++; save(); render(); }
    else if (a === 'mark') { e.mark[e.cur] = !e.mark[e.cur]; save(); render(); }
    else if (a === 'submit') { const left = BANK.length - Object.keys(e.ans).length; if (left && b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = `Còn ${left} câu trống · bấm lần nữa để nộp`; b.style.background = 'var(--bad)'; return; } exSubmit(false); }
    return true;
  };
  APPLY['ket-qua-thi'] = () => {
    const c = $('.content'); if (!c) return;
    const e = S[exKey()]; const r = e && e.result;
    if (!r) { c.innerHTML = `<div class="card" style="padding:40px;text-align:center"><div class="h1">Chưa có kết quả</div><div class="sub1" style="margin-top:6px">Bạn chưa nộp bài thi nào trên máy này.</div><span class="btn pri" data-go="bai-thi" style="margin-top:18px">Làm bài thi</span></div>`; return; }
    const pct = Math.round(r.ok / r.n * 100);
    c.innerHTML = `<div class="card row" style="gap:24px;align-items:center;padding:24px;border-color:${r.pass ? '#9FD3B6' : '#F0C3BC'}"><div style="width:110px;height:110px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--${r.pass ? 'ok' : 'bad'}) 0 ${pct}%,#EEF1F5 0)"><div style="width:86px;height:86px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center"><div><b style="font-size:24px">${r.ok}/${r.n}</b><div class="xs muted">${pct}%</div></div></div></div>
      <div style="flex:1"><span class="chip ${r.pass ? 'ok' : 'bad'}" style="font-size:14px;padding:4px 14px">${r.pass ? 'ĐẠT' : 'CHƯA ĐẠT'}</span><div style="font-size:20px;font-weight:700;margin-top:8px">Bài thi Sales · Sản phẩm, chính sách và kịch bản</div><div class="sm muted">Đạt khi đúng từ 80% (${PASS}/${r.n}) · nộp lúc ${fmtAt(r.at)}${r.pass ? ' · sẵn sàng nhận khách theo kịch bản' : ' · xem lại câu sai rồi thi lại'}</div></div>
      <span class="btn pri" data-go="bai-thi">Làm lại bài thi</span><span class="btn" data-go="chon-tinh-huong">Luyện đóng vai</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:18px">${r.parts.map((x, k) => { const pp = Math.round(x.ok / x.n * 100); const cl = pp >= 80 ? 'ok' : pp >= 60 ? 'warn' : 'bad'; return `<div class="card" style="padding:18px"><b class="sm">${esc(PARTS[k])}</b><div class="row" style="margin-top:10px;align-items:center"><b style="font-size:22px">${x.ok}/${x.n}</b><span class="sp chip ${cl}">${pp}%</span></div><div class="bar" style="margin-top:10px"><i style="width:${pp}%;background:var(--${cl === 'warn' ? 'gold' : cl})"></i></div></div>`; }).join('')}</div>
      <div class="card" style="padding:20px;margin-top:18px"><h3>${r.wrong.length ? `Câu sai cần xem lại (${r.wrong.length})` : 'Đúng tất cả các câu'}</h3>${r.wrong.map((w) => `<div class="row" style="gap:12px;align-items:flex-start;padding:14px 0;border-top:1px solid var(--line)"><span class="chip bad" style="flex:none">Câu ${w.i + 1}</span><div><b class="sm">${esc(w.q)}</b><div class="xs" style="margin-top:4px;color:var(--bad)">Bạn chọn: ${esc(w.picked)}</div><div class="xs" style="margin-top:2px;color:var(--ok);font-weight:600">Đáp án đúng: ${esc(w.right)}</div><div class="xs muted" style="margin-top:4px">${esc(w.why)}</div></div></div>`).join('')}</div>`;
  };
  CLICK['ket-qua-thi'] = () => false;

  /* ===== Luyện đóng vai: chỉ mở tình huống đã có kịch bản ===== */
  APPLY['chon-tinh-huong'] = () => {
    const sub = $('.sub1'); if (sub) sub.textContent = 'Luyện trả lời khách theo kịch bản và Playbook trước khi nhận khách thật. Tình huống đầu tiên đã có kịch bản; các tình huống khác sẽ mở khi nối AI đóng vai.';
    $$('.content .card').forEach((card) => {
      const title = T($('b', card)); const ready = /bàn chặt/i.test(title);
      const chip = $$('.chip', card).slice(-1)[0]; const btn2 = $('.btn', card);
      if (ready) { const rp = S.rp; const st = rp && rp.ended ? (rp.discount || !(rp.cheap || rp.held) ? ['bad', 'Chưa đạt'] : ['ok', 'Đạt']) : rp && rp.log && rp.log.length ? ['warn', 'Đang luyện'] : ['gray', 'Chưa luyện']; setChip(chip, st[0], st[1]); card.style.borderColor = 'var(--navy)'; }
      else { card.removeAttribute('data-go'); card.dataset.soon = '1'; card.style.opacity = '.6'; setChip(chip, 'gray', 'Chưa có kịch bản'); if (btn2) btn2.textContent = 'Sắp có'; }
    });
  };
  CLICK['chon-tinh-huong'] = (t) => { if (t.closest('[data-soon]')) { toast('Tình huống này sẽ mở khi nối AI đóng vai thật'); return true; } return false; };

  /* ===== Đăng nhập thật, đổi mật khẩu, đặt lại mật khẩu ===== */
  const ov = document.createElement('div'); ov.id = 'acct'; ov.hidden = true; document.body.append(ov);
  const closeOv = () => { ov.hidden = true; ov.innerHTML = ''; };
  function pwForm(force) {
    ov.hidden = false;
    ov.innerHTML = `<div class="acct-box card"><div class="h1" style="font-size:20px">${force ? 'Đặt mật khẩu của bạn' : 'Đổi mật khẩu'}</div><div class="sub1">${force ? 'Đây là lần đầu đăng nhập hoặc mật khẩu vừa được đặt lại. Hãy đặt mật khẩu riêng, ít nhất 8 ký tự.' : 'Mật khẩu mới ít nhất 8 ký tự.'}</div>
      <div class="lbl" style="margin-top:16px">Mật khẩu hiện tại</div><input class="field" id="pw-old" type="password" autocomplete="current-password">
      <div class="lbl" style="margin-top:12px">Mật khẩu mới</div><input class="field" id="pw-new" type="password" autocomplete="new-password">
      <div class="lbl" style="margin-top:12px">Nhập lại mật khẩu mới</div><input class="field" id="pw-new2" type="password" autocomplete="new-password">
      <div id="pw-err" class="xs" style="color:var(--bad);margin-top:8px;min-height:16px"></div>
      <div class="row" style="gap:8px;margin-top:6px">${force ? '' : '<span class="btn" id="pw-cancel">Hủy</span>'}<span class="sp"></span><span class="btn pri" id="pw-save">Lưu mật khẩu</span></div></div>`;
    if (force && S._lastPw) $('#pw-old').value = S._lastPw;
    $('#pw-old').focus();
    const c = $('#pw-cancel'); if (c) c.onclick = closeOv;
    $('#pw-save').onclick = async () => {
      const o = $('#pw-old').value, n = $('#pw-new').value, n2 = $('#pw-new2').value, er = $('#pw-err');
      if (n.length < 8) { er.textContent = 'Mật khẩu mới cần ít nhất 8 ký tự'; return; }
      if (n !== n2) { er.textContent = 'Hai lần nhập mật khẩu mới chưa khớp'; return; }
      const r = await api('/api/auth?a=password', { method: 'POST', body: JSON.stringify({ oldPassword: o, newPassword: n }) });
      if (!r.ok) { er.textContent = r.j.error || 'Chưa đổi được mật khẩu'; return; }
      delete S._lastPw; closeOv(); toast('Đã lưu mật khẩu mới', 'ok');
    };
  }
  function openAccount() {
    const u = me();
    ov.hidden = false;
    ov.innerHTML = `<div class="acct-box card" style="width:340px"><div class="row" style="gap:12px"><span class="av" style="width:42px;height:42px;background:#2A5A85;color:#fff">${u.a}</span><div><b>${esc(u.n)}</b><div class="xs muted">${esc(u.r)} · ${esc(u.d || '')}</div></div></div>
      <div class="col" style="gap:8px;margin-top:16px">${SERVER ? '<span class="btn" id="ac-pw">Đổi mật khẩu</span>' : ''}<span class="btn" id="ac-out">Đăng xuất</span><span class="btn" id="ac-close">Đóng</span></div>
      ${SERVER ? '' : '<div class="xs muted" style="margin-top:10px">Bản xem thử: dữ liệu chỉ lưu trên trình duyệt này.</div>'}</div>`;
    const p = $('#ac-pw'); if (p) p.onclick = () => pwForm(false);
    $('#ac-close').onclick = closeOv;
    $('#ac-out').onclick = async () => { if (SERVER) await api('/api/auth?a=logout', { method: 'POST' }); S.loggedIn = false; save(); closeOv(); toast('Đã đăng xuất'); go('dang-nhap'); };
  }
  ov.addEventListener('click', (e) => { if (e.target === ov && !$('#pw-new', ov)) closeOv(); });
  async function doLogin() {
    const k = S.role || 'ha', pw = ($('#lg-pass') || {}).value || '', er = $('#lg-err');
    if (!SERVER) { S.loggedIn = true; save(); toast('Xin chào ' + me().n, 'ok'); go(allowed(me().home) ? me().home : HOME); return; }
    if (!pw) { er.textContent = 'Nhập mật khẩu'; $('#lg-pass').focus(); return; }
    const b = $('#lg-go'); b.classList.add('is-off'); b.textContent = 'Đang đăng nhập…';
    const r = await api('/api/auth?a=login', { method: 'POST', body: JSON.stringify({ k, password: pw }) });
    b.classList.remove('is-off'); b.textContent = 'Đăng nhập';
    if (!r.ok) { er.textContent = r.j.error || 'Không đăng nhập được'; return; }
    S.loggedIn = true; S.role = r.j.user.k; save();
    await loadShared();
    toast('Xin chào ' + r.j.user.n, 'ok'); go(allowed(r.j.user.home) ? r.j.user.home : HOME);
    if (r.j.mustChange) { S._lastPw = pw; pwForm(true); }
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target && e.target.id === 'lg-pass') doLogin(); });
  // Giám đốc và HCNS đặt lại mật khẩu nhân viên
  const _nv = APPLY['nhan-vien'];
  APPLY['nhan-vien'] = () => {
    if (_nv) _nv();
    if (ONLY_SALES) { const names = new Set(Object.values(UMAP).map((u) => u.n)); $$('.tbl tbody tr').forEach((tr) => { if (!names.has(T($('b', tr)))) tr.remove(); }); }
    if (!SERVER || !['huy', 'huyen'].includes(S.role)) return;
    const byName = {}; Object.values(UMAP).forEach((u) => { byName[u.n] = u.k; });
    $$('.tbl tbody tr').forEach((tr) => { const nm = T($('b', tr)); const k = byName[nm]; const cell = tr.lastElementChild; if (k && cell) cell.insertAdjacentHTML('beforeend', ` <span class="btn sm" data-resetpw="${k}" title="Đưa về mật khẩu ban đầu">Đặt lại MK</span>`); });
  };
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-resetpw]'); if (!b) return; e.stopPropagation();
    const u = UMAP[b.dataset.resetpw];
    if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Bấm lần nữa để đặt lại'; b.style.borderColor = 'var(--bad)'; b.style.color = 'var(--bad)'; return; }
    const r = await api('/api/auth?a=reset', { method: 'POST', body: JSON.stringify({ k: u.k }) });
    if (r.ok) { b.textContent = '✓ Đã đặt lại'; b.classList.add('is-off'); toast('Đã đưa mật khẩu của ' + u.n + ' về mật khẩu ban đầu', 'ok'); } else toast(r.j.error || 'Chưa đặt lại được', 'bad');
  }, true);
  // Nhật ký thay đổi thật
  APPLY['nhat-ky'] = () => {
    if (!SERVER || !(S._audit || []).length) return;
    const tb = $('.tbl tbody'); if (!tb) return;
    tb.insertAdjacentHTML('afterbegin', S._audit.map((a) => `<tr style="background:#FAFCFE"><td><span class="sm muted" style="white-space:nowrap">${fmtAt(a.at)}</span></td><td><span class="sm"><b>${esc(a.name || (UMAP[a.user] || {}).n || a.user)}</b></span></td><td><span class="chip blue" style="font-size:11px">${esc(a.area)}</span></td><td><span class="sm">${esc(a.text)}</span></td></tr>`).join(''));
  };

  (async () => {
    try {
      const r = await api('/api/auth');
      if (r.status === 200 || r.status === 401) SERVER = true;
      if (r.status === 200) { S.loggedIn = true; S.role = r.j.user.k; await loadShared(); }
      else if (r.status === 401) S.loggedIn = false;
    } catch (e) { SERVER = false; }
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* bỏ qua */ }
    CUR = (!S.loggedIn) ? 'dang-nhap' : fromHash();
    if (S.loggedIn && CUR === 'dang-nhap') CUR = allowed(me().home) ? me().home : HOME;
    render();
    const m = $('#lg-mode'); if (m && !SERVER) m.textContent = 'Bản xem thử: mật khẩu bất kỳ';
  })();
  // Trên máy chủ: chưa đăng nhập thì luôn về trang đăng nhập; lấy dữ liệu mới khi quay lại tab
  window.addEventListener('hashchange', () => { if (SERVER && !S.loggedIn && CUR !== 'dang-nhap') { CUR = 'dang-nhap'; render(); } });
  document.addEventListener('visibilitychange', async () => { if (SERVER && S.loggedIn && !document.hidden) { if (await loadShared()) render(); } });

})();
