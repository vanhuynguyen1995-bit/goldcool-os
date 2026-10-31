// Thư viện dùng chung: bộ nhận diện, biểu tượng, khung trang
const I = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  cap: '<path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5"/><path d="M22 9v6"/>',
  db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkc: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  xc: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15v4M17 17h4"/>',
  send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  clip: '<path d="m21.4 11-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  chevD: '<path d="m6 9 6 6 6-6"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  down: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  play: '<path d="M6 4l14 8-14 8z"/>',
  flask: '<path d="M9 3h6M10 3v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
  snow: '<path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2M4 9l2 3-2 3M20 9l-2 3 2 3"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  edit: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  handoff: '<path d="M17 3h4v4"/><path d="M21 3l-7 7"/><path d="M7 21H3v-4"/><path d="m3 21 7-7"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  thermo: '<path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  ruler: '<path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  msgx: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M14.5 7.5l-5 5M9.5 7.5l5 5"/>',
  dots: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.2 7 22l5-3 5 3-1.2-8.8"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="m5.7 5.7 12.6 12.6"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
};
const ic = (n, s = 18, c = 'currentColor', w = 1.8) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${I[n]}</svg>`;

const CSS = `
:root{--navy:#0F3D63;--navy2:#0B2F4D;--ice:#E8F1F8;--bg:#F4F7FA;--gold:#C9A227;--gold2:#B08A17;--goldsoft:#FBF4DE;--ink:#1A1F2B;--muted:#5B6575;--line:#E3E8EF;
--ok:#1E8E5A;--oks:#E5F4EC;--warn:#A86A0C;--warns:#FDF1D8;--bad:#C2402F;--bads:#FBE8E5;--gray:#7A8494;--grays:#EEF1F5;
--l1:#DCE8F3;--l2:#B5CFE7;--l3:#7EA8CF;--l4:#3F78AB;--l5:#1C4F80;--l6:#C9A227}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,"Noto Sans",sans-serif;font-feature-settings:"cv11","ss01","tnum";color:var(--ink);background:var(--bg);font-size:14px;line-height:1.45;-webkit-font-smoothing:antialiased}
.app{display:grid;grid-template-columns:252px 1fr;width:1440px;min-height:900px}
.side{background:var(--navy);color:#B9CCDE;padding:18px 14px 16px;display:flex;flex-direction:column}
.logo{display:flex;align-items:center;gap:10px;padding:4px 8px 18px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:14px}
.logo .mk{width:34px;height:34px;border-radius:9px;background:var(--gold);display:grid;place-items:center}
.logo b{font-size:19px;letter-spacing:-.02em;font-weight:800}.logo b .g{color:#E6C35C}.logo b .c{color:#A9D0F0}
.logo small{display:block;font-size:11px;color:#8FA8C0;font-weight:500;margin-top:-1px}
.nav{display:flex;flex-direction:column;gap:2px}
.nav a{display:flex;align-items:center;gap:11px;padding:9px 12px;border-radius:8px;font-weight:500;font-size:14px;color:#C3D4E4;position:relative}
.nav a.on{background:rgba(255,255,255,.09);color:#fff}
.nav a.on:before{content:"";position:absolute;left:-14px;top:8px;bottom:8px;width:3px;border-radius:0 3px 3px 0;background:var(--gold)}
.nav .sub{display:flex;flex-direction:column;gap:1px;margin:2px 0 6px}
.nav .sub a{padding:7px 12px 7px 41px;font-size:13px;color:#9FB6CC}
.nav .sub a.on{background:none;color:#fff;font-weight:600}.nav .sub a.on:before{display:none}
.nav .sub a.on:after{content:"";position:absolute;left:24px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:50%;background:var(--gold)}
.nav .cnt{margin-left:auto;font-size:11px;font-weight:600;background:rgba(255,255,255,.12);color:#fff;border-radius:99px;padding:1px 7px}
.nav .cnt.r{background:var(--bad)}
.sec{font-size:11px;font-weight:600;letter-spacing:.06em;color:#6F8CA8;text-transform:uppercase;padding:14px 12px 6px}
.sidefoot{margin-top:auto;display:flex;flex-direction:column;gap:10px}
.modebox{border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px 12px;font-size:12px;color:#B9CCDE}
.modebox b{display:flex;align-items:center;gap:7px;color:#fff;font-size:12.5px;margin-top:3px}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block;flex:none}
.me{display:flex;align-items:center;gap:10px;padding:8px 6px}
.av{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:13px;background:#DCE8F3;color:var(--navy);flex:none}
.me .av{background:#2A5A85;color:#fff}
.me b{color:#fff;font-size:13px;display:block}.me span{font-size:12px;color:#8FA8C0}
.main{display:flex;flex-direction:column;min-width:0}
.top{height:66px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 28px;gap:14px}
.crumb{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:6px}
.crumb b{color:var(--ink);font-weight:600}
.searchb{margin-left:auto;width:340px;height:38px;border:1px solid var(--line);border-radius:9px;display:flex;align-items:center;gap:9px;padding:0 12px;color:#8A94A3;font-size:13px;background:#FAFBFD}
.mock{font-size:11.5px;color:var(--muted);border:1px dashed #C4CCD7;border-radius:99px;padding:3px 10px;white-space:nowrap}
.bellw{position:relative;width:38px;height:38px;border-radius:9px;display:grid;place-items:center;color:var(--ink);border:1px solid var(--line)}
.bellw i{position:absolute;top:-5px;right:-5px;background:var(--bad);color:#fff;font-size:10.5px;font-style:normal;font-weight:700;border-radius:99px;padding:1px 6px;border:2px solid #fff}
.content{padding:24px 28px 28px;display:flex;flex-direction:column;gap:18px}
.card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:18px}
.card h3{font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px}
.chip{display:inline-flex;align-items:center;gap:5px;padding:2px 9px;border-radius:99px;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.6}
.ok{background:var(--oks);color:var(--ok)}.warn{background:var(--warns);color:var(--warn)}.bad{background:var(--bads);color:var(--bad)}.gray{background:var(--grays);color:var(--gray)}.blue{background:var(--ice);color:var(--navy)}.goldc{background:var(--goldsoft);color:#8A6A05}
.ai{display:inline-flex;align-items:center;gap:3px;background:var(--ice);color:var(--navy);font-size:10.5px;font-weight:700;border-radius:5px;padding:1px 6px;letter-spacing:.02em}
.btn{height:36px;padding:0 14px;border-radius:8px;font-weight:600;font-size:13.5px;display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid var(--line);background:#fff;color:var(--ink);white-space:nowrap}
.btn.pri{background:var(--gold);border-color:var(--gold);color:#1A1F2B}
.btn.nv{background:var(--navy);border-color:var(--navy);color:#fff}
.btn.sm{height:30px;padding:0 10px;font-size:12.5px}
.btn.dis{opacity:.45}
.h1{font-size:22px;font-weight:700;letter-spacing:-.015em}
.sub1{color:var(--muted);font-size:13.5px;margin-top:2px}
.muted{color:var(--muted)}.sm{font-size:12.5px}.xs{font-size:11.5px}
.src{font-size:11.5px;color:#7A8494;display:flex;gap:6px;align-items:center;margin-top:12px}
.row{display:flex;align-items:center;gap:10px}.col{display:flex;flex-direction:column}
.sp{margin-left:auto}
.tbl{width:100%;border-collapse:collapse}
.tbl th{font-size:12px;font-weight:600;color:var(--muted);text-align:left;padding:10px 12px;background:#F7F9FC;border-bottom:1px solid var(--line);white-space:nowrap}
.tbl td{padding:12px;border-bottom:1px solid var(--line);vertical-align:middle;font-size:13.5px}
.tbl tr:last-child td{border-bottom:0}
.bar{height:8px;background:#EDF1F6;border-radius:99px;position:relative}
.bar>i{display:block;height:100%;border-radius:99px}
.bar .mk{position:absolute;top:-4px;width:2px;height:16px;background:var(--navy);border-radius:2px}
.lad{display:flex;gap:3px}.lad span{flex:1;height:8px;border-radius:3px;background:#E6ECF2}
.tabs{display:flex;gap:4px;border-bottom:1px solid var(--line)}
.tabs a{padding:10px 14px;font-weight:600;font-size:13.5px;color:var(--muted);border-bottom:2px solid transparent;margin-bottom:-1px;display:flex;gap:7px;align-items:center}
.tabs a.on{color:var(--navy);border-color:var(--gold)}
.tabs a i{font-style:normal;font-size:11px;background:var(--grays);color:var(--muted);border-radius:99px;padding:0 7px}
.tabs a.on i{background:var(--goldsoft);color:#8A6A05}
.kv{display:grid;grid-template-columns:150px 1fr;gap:9px 14px;font-size:13.5px}
.kv dt{color:var(--muted)}.kv dd{font-weight:500}
.need{color:var(--warn);font-weight:600;display:inline-flex;gap:5px;align-items:center}
.field{border:1px solid var(--line);border-radius:8px;padding:9px 12px;font-size:13.5px;background:#fff}
.lbl{font-size:12.5px;font-weight:600;color:var(--muted);margin-bottom:6px}
.note{background:var(--goldsoft);border:1px solid #EFD98F;border-radius:10px;padding:10px 12px;font-size:13px;display:flex;gap:9px;align-items:flex-start}
.noteb{background:var(--ice);border:1px solid #C9DCEC;border-radius:10px;padding:10px 12px;font-size:13px;display:flex;gap:9px;align-items:flex-start;color:#173E5F}
`;

const SALES_NAV = [['Hộp thư', 31], ['Khách của tôi', 2], ['Báo cáo tuần'], ['Phòng thử AI'], ['Lỗi dữ liệu', 5], ['Cài đặt AI']];
const KPI_NAV = [['Bảng số liệu'], ['Cây mục tiêu'], ['Báo cáo tuần'], ['Thẻ vấn đề', 7], ['Ghi nhận'], ['Thư viện quyết định']];
const HV_NAV = [['Hôm nay học gì'], ['Thư viện bài học'], ['Bài thi'], ['Phòng đóng vai'], ['Hồ sơ năng lực']];
const DATA_NAV = [['Sản phẩm'], ['Bảng giá bán lẻ', 2], ['Bảng giá đại lý'], ['Kho tài liệu']];

function side({ mod = 'sales', sub = '', user = ['Đoàn Thị Hồng Hà', 'Sales · NVKD1', 'HH'], mode = true } = {}) {
  const subl = (arr) => `<div class="sub">${arr.map(([n, c]) => `<a class="${n === sub ? 'on' : ''}">${n}${c ? `<span class="cnt ${n === 'Khách của tôi' ? 'r' : ''}">${c}</span>` : ''}</a>`).join('')}</div>`;
  const it = (k, n, icon, cnt) => `<a class="${mod === k ? 'on' : ''}">${ic(icon, 19)}${n}${cnt ? `<span class="cnt">${cnt}</span>` : ''}</a>`;
  return `<aside class="side">
  <div class="logo"><div class="mk">${ic('snow', 20, '#0F3D63', 2)}</div><div><b><span class="g">Gold</span><span class="c">Cool</span> <span style="color:#fff;font-weight:600;font-size:13px">OS</span></b><small>Chọn đúng – Dùng lâu</small></div></div>
  <nav class="nav">
   ${it('home', 'Trang chủ', 'home')}
   ${it('sales', 'AI Sales', 'chat')}${mod === 'sales' ? subl(SALES_NAV) : ''}
   ${it('kpi', 'Mục tiêu & KPI', 'target')}${mod === 'kpi' ? subl(KPI_NAV) : ''}
   ${it('hv', 'Học viện', 'cap')}${mod === 'hv' ? subl(HV_NAV) : ''}
   ${it('data', 'Dữ liệu', 'db')}${mod === 'data' ? subl(DATA_NAV) : ''}
   ${it('set', 'Cài đặt', 'sliders')}
  </nav>
  <div class="sidefoot">
   ${mode ? `<div class="modebox">Chế độ AI Sales<b><span class="dot" style="background:#E6B93A"></span>AI soạn – người duyệt</b></div>` : ''}
   <div class="me"><div class="av">${user[2]}</div><div><b>${user[0]}</b><span>${user[1]}</span></div></div>
  </div></aside>`;
}
function top(crumb, { bell = 3, user = 'HH' } = {}) {
  return `<header class="top"><div class="crumb">${crumb}</div>
  <div class="searchb">${ic('search', 16)}Tìm khách, sản phẩm, mã giá…</div>
  <span class="mock">Bản thiết kế · dữ liệu mẫu</span>
  <div class="bellw">${ic('bell', 18)}${bell ? `<i>${bell}</i>` : ''}</div>
  <div class="av">${user}</div></header>`;
}
function page(body, extraCss = '') {
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><style>${CSS}${extraCss}</style></head><body>${body}</body></html>`;
}
const lad = (n) => `<div class="lad">${[1, 2, 3, 4, 5, 6].map(i => `<span style="${i <= n ? `background:var(--l${i})` : ''}"></span>`).join('')}</div>`;
const L = (n) => `<span class="chip" style="background:var(--l${n});color:${n >= 3 ? '#fff' : 'var(--navy)'}">L${n}</span>`;

// Hình minh họa tủ đông 4 cánh inox (vẽ đơn giản)
const fridge = (w = 120) => `<svg width="${w}" viewBox="0 0 120 190"><defs><linearGradient id="st" x1="0" x2="1"><stop offset="0" stop-color="#D9DEE4"/><stop offset=".5" stop-color="#F4F6F8"/><stop offset="1" stop-color="#C9CFD6"/></linearGradient></defs>
<rect x="6" y="6" width="108" height="170" rx="4" fill="url(#st)" stroke="#A9B2BC"/>
<rect x="6" y="6" width="108" height="16" rx="3" fill="#C2C9D1"/><rect x="12" y="10" width="22" height="7" rx="1.5" fill="#22303F"/><text x="23" y="16" font-size="5" fill="#7FD3FF" text-anchor="middle" font-family="Inter">-18°</text>
${[[10, 26], [62, 26], [10, 101], [62, 101]].map(([x, y]) => `<rect x="${x}" y="${y}" width="48" height="71" rx="2" fill="url(#st)" stroke="#AEB6BF"/><rect x="${x + (x < 60 ? 40 : 4)}" y="${y + 24}" width="3" height="22" rx="1.5" fill="#8C96A1"/>`).join('')}
<rect x="10" y="176" width="10" height="10" fill="#4A5561"/><rect x="100" y="176" width="10" height="10" fill="#4A5561"/></svg>`;

module.exports = { ic, I, CSS, side, top, page, lad, L, fridge };
