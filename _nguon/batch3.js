// 27 màn hình còn lại trong danh sách 45 màn – cùng bộ nhận diện, dữ liệu theo DNA phiên bản 2
const { ic, side, top, page, lad, L } = require('./lib.js');
const fs = require('fs');
const S = {};
const ph = (f) => process.env.IMG_URL ? 'img/' + f + '.jpg' : 'data:image/jpeg;base64,' + fs.readFileSync(__dirname + '/img/web/' + f + '.jpg').toString('base64');
const img = (f, w, h, r = 8) => `<img src="${ph(f)}" style="width:${w}px;height:${h}px;object-fit:contain;background:#EEF2F6;border-radius:${r}px;display:block;flex:none">`;
const av = (t, s = 30, bg = '#E8F1F8', c = 'var(--navy)') => `<span class="av" style="width:${s}px;height:${s}px;font-size:${Math.round(s * .37)}px;background:${bg};color:${c}">${t}</span>`;
const HUY = ['Nguyễn Văn Huy', 'Giám đốc', 'NH'], HA = ['Đoàn Thị Hồng Hà', 'Sales · NVKD1', 'HH'], CHINH = ['Nguyễn Văn Chính', 'TP Sản xuất – Vận hành', 'NC'], NEW = ['Nhân viên mới', 'Sales NVKD4 · ngày 9/30', 'N4'], HUYEN = ['Chị Huyền', 'HCNS & Hệ thống', 'H'], LAN = ['Nguyễn Thị Lan', 'Marketing · Content', 'NL'];
const shell = (mod, sub, user, crumb, body, opt = {}) => page(`<div class="app">${side({ mod, sub, user, mode: mod === 'sales' })}<main class="main">${top(crumb, { user: user ? user[2] : 'HH', bell: opt.bell ?? 3 })}<div class="content">${body}</div></main></div>`);
const head = (t, s, right = '') => `<div class="row"><div><div class="h1">${t}</div><div class="sub1">${s}</div></div>${right ? `<div class="sp row" style="gap:8px">${right}</div>` : ''}</div>`;
const btn = (t, cls = '', i = '') => `<span class="btn ${cls}">${i ? ic(i, 15) : ''}${t}</span>`;
const stat = (c, i, t, n) => `<div class="card row" style="padding:14px 16px;gap:12px"><div class="${c}" style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;flex:none">${ic(i, 19)}</div><div style="min-width:0"><div class="xs muted" style="font-weight:600">${t}</div><b style="font-size:19px">${n}</b></div></div>`;
const grid = (n, items, gap = 14) => `<div style="display:grid;grid-template-columns:repeat(${n},minmax(0,1fr));gap:${gap}px">${items.join('')}</div>`;
const tbl = (cols, rows) => `<table class="tbl"><thead><tr>${cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((d) => `<td>${d}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const tabs = (arr, on = 0) => `<div class="tabs">${arr.map(([t, n], i) => `<a class="${i === on ? 'on' : ''}">${t}${n !== undefined ? ` <i>${n}</i>` : ''}</a>`).join('')}</div>`;
const PRINC = ['Bán bằng sự am hiểu', 'Tạo niềm tin bằng chất lượng', 'Giữ khách hàng bằng trách nhiệm', 'Niềm tin lâu dài hơn doanh số trước mắt', 'Sản phẩm phù hợp hơn sản phẩm giá cao', 'Làm đúng trước, nhanh sau', 'Minh bạch khi có vấn đề'];

const DEPTS = ['Ban giám đốc', 'Kinh doanh & Marketing', 'Sản xuất – Vận hành', 'Kế toán', 'Khách hàng & Hậu mãi'];
const USERS = [
  ['huy', 'Nguyễn Văn Huy', 'Giám đốc', 'Ban giám đốc', 'bang-so-lieu'], ['huyen', 'Chị Huyền', 'HCNS & Hệ thống', 'Ban giám đốc', 'nhan-vien'],
  ['ha', 'Đoàn Thị Hồng Hà', 'Sales · NVKD1', 'Kinh doanh & Marketing', 'trang-chu'], ['anh', 'Trần Thị Ánh', 'Sales · NVKD2', 'Kinh doanh & Marketing', 'trang-chu'], ['yen', 'Trịnh Hải Yến', 'Sales · NVKD3', 'Kinh doanh & Marketing', 'trang-chu'], ['nvkd4', 'Nhân viên mới', 'Sales NVKD4 · Học viện', 'Kinh doanh & Marketing', 'hom-nay-hoc-gi'],
  ['lan', 'Nguyễn Thị Lan', 'Content', 'Kinh doanh & Marketing', 'kho-tai-lieu'], ['nguyet', 'Bùi Minh Nguyệt', 'Content', 'Kinh doanh & Marketing', 'kho-tai-lieu'], ['kien', 'Kiên', 'Ads – Dữ liệu', 'Kinh doanh & Marketing', 'bao-cao-ai'], ['dat', 'Đạt', 'Website', 'Kinh doanh & Marketing', 'chat-website'],
  ['chinh', 'Nguyễn Văn Chính', 'Trưởng phòng Sản xuất – Vận hành', 'Sản xuất – Vận hành', 'danh-sach-san-pham'], ['hung', 'Nguyễn Mạnh Hùng', 'Kỹ thuật bảo hành', 'Sản xuất – Vận hành', 'so-loi'],
  ['phong', 'Sin Văn Phong', 'Công nhân', 'Sản xuất – Vận hành', 'bao-cao-tuan'], ['thiet', 'Thiên Văn Thiết', 'Công nhân', 'Sản xuất – Vận hành', 'bao-cao-tuan'], ['kinh', 'Vàng Văn Kinh', 'Công nhân', 'Sản xuất – Vận hành', 'bao-cao-tuan'], ['suong', 'Vàng Văn Sương', 'Công nhân', 'Sản xuất – Vận hành', 'bao-cao-tuan'], ['duong', 'Vàng Văn Dương', 'Công nhân', 'Sản xuất – Vận hành', 'bao-cao-tuan'], ['nam', 'Nguyễn Bảo Nam', 'Công nhân', 'Sản xuất – Vận hành', 'bao-cao-tuan'],
  ['ut', 'Nguyễn Thị Út', 'Kế toán tổng hợp', 'Kế toán', 'bang-gia'], ['thutrang', 'Trần Thị Thu Trang', 'Kế toán bán hàng kiêm thủ quỹ', 'Kế toán', 'bang-gia'], ['thanh', 'Đỗ Huyền Thanh', 'Thủ kho', 'Kế toán', 'thong-bao'],
  ['quan', 'Lương Văn Quân', 'Lái xe', 'Khách hàng & Hậu mãi', 'bao-cao-tuan'], ['hieu', 'Lương Văn Hiếu', 'Lái xe', 'Khách hàng & Hậu mãi', 'bao-cao-tuan'], ['thang', 'Nguyễn Đăng Đại Thắng', 'Lái xe', 'Khách hàng & Hậu mãi', 'bao-cao-tuan'], ['luong', 'Nguyễn Hữu Lương', 'Lái xe', 'Khách hàng & Hậu mãi', 'bao-cao-tuan'],
].map(([k, n, r, d, home]) => { const p = n.split(' '); return { k, n, r, d, home, a: p.length === 1 ? p[0][0] : (p[0][0] + p[p.length - 1][0]).toUpperCase() }; });
S.__USERS = USERS;
/* ===== A01 Đăng nhập ===== */
S['A01_Dang_nhap'] = page(`<div style="min-height:100vh;display:grid;grid-template-columns:1.1fr 1fr;width:100%;min-width:1100px">
 <div style="background:linear-gradient(160deg,#0F3D63,#0B2F4D);color:#fff;padding:56px 64px;display:flex;flex-direction:column;position:relative;overflow:hidden">
  <div class="row" style="gap:12px"><div style="width:44px;height:44px;border-radius:12px;background:var(--gold);display:grid;place-items:center">${ic('snow', 24, '#0F3D63', 2)}</div><b style="font-size:24px"><span style="color:#E6C35C">Gold</span><span style="color:#A9D0F0">Cool</span> OS</b></div>
  <div style="margin-top:auto"><div style="font-size:40px;font-weight:800;letter-spacing:-.02em;line-height:1.15">CHỌN ĐÚNG –<br>DÙNG LÂU</div><div style="font-size:16px;color:#B9CCDE;margin-top:14px;max-width:420px">Lạnh sâu – Bền lâu – Tiết kiệm điện. Phần mềm quản trị nội bộ GoldCool Việt Nam: AI Sales, Mục tiêu & KPI, Học viện.</div></div>
  <div class="xs" style="color:#8FA8C0;margin-top:40px">Kho CN05 KCN Nguyên Khê, Phúc Thịnh, Hà Nội · Hotline 0865 868 868 · goldcool.vn</div>
  <div style="position:absolute;right:-80px;top:120px;opacity:.07">${ic('snow', 420, '#fff', 1)}</div>
 </div>
 <div style="display:grid;place-items:center;padding:40px;background:var(--bg)">
  <div class="card" style="width:420px;padding:32px">
   <div class="h1">Đăng nhập</div><div class="sub1">Dùng email công ty để vào phần mềm.</div>
   <div class="lbl" style="margin-top:22px">Chọn tài khoản của bạn · ${USERS.length} người</div>
   <input class="field" id="lg-find" placeholder="Tìm tên hoặc phòng ban…" style="margin-bottom:8px">
   <div id="lg-roles" style="max-height:300px;overflow:auto;border:1px solid var(--line);border-radius:10px;padding:6px">
    ${DEPTS.map((d) => `<div class="lg-grp"><div class="xs muted" style="font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:8px 8px 4px">${d}</div>${USERS.filter((u) => u.d === d).map((u) => `<div class="row click lg-u" data-role="${u.k}" data-find="${(u.n + ' ' + u.r + ' ' + d).toLowerCase()}" style="gap:10px;cursor:pointer;padding:7px 8px;border-radius:8px;border:1px solid transparent;${u.k === 'ha' ? 'border-color:var(--navy);background:var(--ice)' : ''}">${av(u.a, 28)}<div style="min-width:0"><b class="sm">${u.n}</b><div class="xs muted">${u.r}</div></div></div>`).join('')}</div>`).join('')}
   </div>
   <div class="lbl" style="margin-top:14px">Mật khẩu</div><input class="field" id="lg-pass" type="password" placeholder="Nhập mật khẩu" autocomplete="current-password">
   <div id="lg-err" class="xs" style="color:var(--bad);margin-top:6px;min-height:16px"></div>
   <span class="btn pri" id="lg-go" style="width:100%;height:44px;margin-top:8px">Đăng nhập</span>
   <div class="row xs" style="margin-top:12px"><span class="muted" id="lg-mode">Lần đầu đăng nhập sẽ được yêu cầu đổi mật khẩu</span><a class="sp" style="color:var(--navy);font-weight:600;cursor:pointer">Quên mật khẩu?</a></div>
  </div>
 </div></div>`, 'body{background:var(--bg)}');

/* ===== A03 Thông báo ===== */
const notes = [
  ['bad', 'clock', 'Khách mới chờ quá 5 phút', 'Phạm Thu Trang · tủ đông 4 cánh · AI đã chuyển lúc 09:12', '2 phút trước', 'khach--pham-thu-trang', 1],
  ['warn', 'handoff', 'AI chuyển khách L2 – GoldWash', 'Hoàng Thị Nga · Hải Phòng · cần bản 1,8 m có Ozon', '6 phút trước', 'hop-thu', 1],
  ['warn', 'star', 'Chờ Giám đốc quyết: bảo hành GoldWash', 'Thẻ VD-1107 · 2 phương án · hạn 10/11', '1 giờ trước', 'the-van-de--vd-1107', 1],
  ['blue', 'box', 'Thủ kho trả lời tồn kho', 'Đỗ Huyền Thanh: tủ 4 cánh GoldCool quạt gió còn 2 chiếc tại kho Nguyên Khê', '2 giờ trước', 'khach--pham-thu-trang', 0],
  ['ok', 'award', 'Chị vừa được ghi nhận', 'Trần Thị Thu Trang · Giữ khách hàng bằng trách nhiệm', 'Hôm qua', 'ghi-nhan', 0],
  ['gray', 'file', 'Nhắc nộp báo cáo tuần 45', 'Hạn 12:00 thứ 7, 07/11', 'Hôm qua', 'bao-cao-tuan', 0],
];
S['A03_Thong_bao'] = shell('home', '', HA, '<b>Thông báo</b>', `${head('Thông báo', 'Việc khẩn nổi lên trên cùng. Bấm vào thông báo để mở đúng việc.', btn('Đánh dấu đã đọc hết', '', 'check'))}
 ${tabs([['Tất cả', 6], ['Chưa đọc', 3], ['Khẩn', 1]])}
 <div class="card" style="padding:0">${notes.map(([c, i, t, d, w, go, un]) => `<div class="row noti" data-go="${go}" style="padding:14px 18px;border-top:1px solid var(--line);gap:14px;cursor:pointer;${un ? 'background:#FAFCFE' : ''}"><div class="${c}" style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;flex:none">${ic(i, 17)}</div><div style="flex:1;min-width:0"><b class="sm">${t}</b><div class="xs muted" style="margin-top:2px">${d}</div></div><span class="xs muted">${w}</span>${un ? '<span class="dot" style="background:var(--bad)"></span>' : '<span style="width:8px"></span>'}</div>`).join('')}</div>
 <div class="src">${ic('info', 13)}Thông báo cũng gửi qua Zalo nhóm “Sales GoldCool” với việc khẩn</div>`);

/* ===== A04 Danh sách nhân viên (theo sơ đồ tổ chức) ===== */
const staff = [
  ['Nguyễn Văn Huy', 'Giám đốc', 'Ban giám đốc', 'Duyệt giá, kịch bản AI, việc khẩn', 'ok'],
  ['Chị Huyền', 'HCNS & Hệ thống', 'Ban giám đốc', 'Nhân sự, quy trình, báo cáo tuần', 'ok'],
  ['Đoàn Thị Hồng Hà', 'Sales · NVKD1', 'Kinh doanh & Marketing', 'Nhận khách từ AI', 'ok'],
  ['Trần Thị Ánh', 'Sales · NVKD2', 'Kinh doanh & Marketing', 'Nhận khách từ AI', 'ok'],
  ['Trịnh Hải Yến', 'Sales · NVKD3', 'Kinh doanh & Marketing', 'Nhận khách từ AI', 'ok'],
  ['Nguyễn Thị Lan', 'Content', 'Kinh doanh & Marketing', 'Thư viện bằng chứng (đề xuất)', 'ok'],
  ['Bùi Minh Nguyệt', 'Content', 'Kinh doanh & Marketing', 'Thư viện bằng chứng (đề xuất)', 'ok'],
  ['Kiên', 'Ads – Dữ liệu', 'Kinh doanh & Marketing', 'Quảng cáo, số liệu', 'ok'],
  ['Đạt', 'Website', 'Kinh doanh & Marketing', 'Website goldcool.vn', 'ok'],
  ['Nguyễn Văn Chính', 'Trưởng phòng', 'Sản xuất – Vận hành', 'Dữ liệu sản phẩm (đề xuất)', 'ok'],
  ['Nguyễn Mạnh Hùng', 'Kỹ thuật bảo hành', 'Sản xuất – Vận hành', 'Bảo hành, thông số kỹ thuật', 'ok'],
  ['Sin Văn Phong', 'Công nhân', 'Sản xuất – Vận hành', '', 'ok'],
  ['Thiên Văn Thiết', 'Công nhân', 'Sản xuất – Vận hành', '', 'ok'],
  ['Vàng Văn Kinh', 'Công nhân', 'Sản xuất – Vận hành', '', 'ok'],
  ['Vàng Văn Sương', 'Công nhân', 'Sản xuất – Vận hành', '', 'ok'],
  ['Vàng Văn Dương', 'Công nhân', 'Sản xuất – Vận hành', '', 'ok'],
  ['Nguyễn Bảo Nam', 'Công nhân', 'Sản xuất – Vận hành', '', 'ok'],
  ['Nguyễn Thị Út', 'Kế toán tổng hợp', 'Kế toán', '', 'ok'],
  ['Trần Thị Thu Trang', 'Kế toán bán hàng kiêm thủ quỹ', 'Kế toán', 'Xác nhận cọc / đơn L5', 'ok'],
  ['Đỗ Huyền Thanh', 'Thủ kho', 'Kế toán', 'Nhập – Xuất – Tồn – Serial/QR', 'ok'],
  ['Lương Văn Quân', 'Lái xe', 'Khách hàng & Hậu mãi', 'Giao hàng', 'ok'],
  ['Lương Văn Hiếu', 'Lái xe', 'Khách hàng & Hậu mãi', 'Giao hàng', 'ok'],
  ['Nguyễn Đăng Đại Thắng', 'Lái xe', 'Khách hàng & Hậu mãi', 'Giao hàng', 'ok'],
  ['Nguyễn Hữu Lương', 'Lái xe', 'Khách hàng & Hậu mãi', 'Giao hàng', 'ok'],
];
const ini = (n) => { const p = n.split(' '); return p.length === 1 ? p[0][0] : (p[0][0] + p[p.length - 1][0]).toUpperCase(); };
S['A04_Nhan_vien'] = shell('set', '', HUY, 'Cài đặt <span>/</span> <b>Nhân viên</b>', `${head('Nhân viên', 'Theo sơ đồ tổ chức hiện tại · 4 phòng ban và Ban giám đốc', btn('Thêm nhân viên', 'pri', 'plus'))}
 ${grid(4, [stat('blue', 'users', 'Đang làm việc', '24 người'), stat('warn', 'user', 'Vị trí đang tuyển', '5 vị trí'), stat('ok', 'shield', 'Có quyền duyệt giá', '1 người'), stat('gray', 'cal', 'Đang nghỉ phép', '0')])}
 <div class="row" style="gap:8px"><span class="chip" style="background:var(--navy);color:#fff;padding:5px 12px">Tất cả</span>${['Ban giám đốc', 'Kinh doanh & Marketing', 'Sản xuất – Vận hành', 'Kế toán', 'Khách hàng & Hậu mãi'].map((d) => `<span class="chip gray" style="padding:5px 12px">${d}</span>`).join('')}</div>
 <div class="card" style="padding:0">${tbl(['Nhân viên', 'Vị trí', 'Phòng ban', 'Vai trò trong phần mềm', 'Trạng thái', ''], staff.map(([n, r, d, v]) => [`<div class="row" style="gap:10px" data-go="nhan-vien--ho-so">${av(ini(n), 30)}<b class="sm">${n}</b></div>`, `<span class="sm">${r}</span>`, `<span class="sm muted">${d}</span>`, `<span class="sm">${v || '—'}</span>`, '<span class="chip ok" style="font-size:11px">Đang làm</span>', `<span class="btn sm" data-go="nhan-vien--ho-so">Xem</span>`]).concat([['<div class="row" style="gap:10px">' + av('?', 30, '#FDF1D8', '#8A6A05') + '<b class="sm muted">Đang tuyển</b></div>', '<span class="sm">Trưởng nhóm Kinh doanh · NVKD4–6 · Trưởng phòng Hậu mãi · 2 kỹ thuật viên bảo hành (chưa có tên)</span>', '', '', '<span class="chip warn" style="font-size:11px">Chờ bổ sung</span>', '']]))}</div>
 <div class="src">${ic('info', 13)}2 kỹ thuật viên bảo hành phòng Hậu mãi chưa có tên trong sơ đồ · vai trò có ghi “(đề xuất)” chờ Giám đốc chốt</div>`);

/* ===== A05 Hồ sơ nhân viên ===== */
S['A05_Ho_so_nhan_vien'] = shell('set', '', HUY, 'Cài đặt <span>/</span> Nhân viên <span>/</span> <b>Đoàn Thị Hồng Hà</b>', `<div class="card row" style="gap:18px;padding:20px">${av('HH', 64, '#2A5A85', '#fff')}<div style="flex:1"><div class="h1">Đoàn Thị Hồng Hà</div><div class="sub1">Sales · NVKD1 · Phòng Kinh doanh & Marketing · quản lý trực tiếp: Trưởng nhóm KD (đang tuyển, tạm: Nguyễn Văn Huy)</div><div class="row" style="gap:8px;margin-top:10px"><span class="chip ok">Đang làm</span><span class="chip blue">Nhận khách từ AI</span><span class="chip goldc">Kèm cặp NVKD4</span></div></div>${btn('Sửa hồ sơ', '', 'edit')}</div>
 ${tabs([['Thông tin'], ['Quyền'], ['Năng lực'], ['Mục tiêu']])}
 ${grid(2, [`<div class="card"><h3>Thông tin</h3><dl class="kv" style="margin-top:14px"><dt>Email</dt><dd>ha.dth@goldcool.vn</dd><dt>Điện thoại</dt><dd>09xx xxx xxx</dd><dt>Ngày vào làm</dt><dd class="muted">Chưa nhập</dd><dt>Kênh nhận khách</dt><dd>Zalo nhóm “Sales GoldCool” + app</dd><dt>Ca trực trưa</dt><dd class="muted">Chưa phân ca</dd></dl></div>`,
  `<div class="card"><h3>Quyền trong phần mềm</h3>${[['Xem và nhắn khách được giao', 1], ['Xem giá bán lẻ', 1], ['Xem giá đại lý', 0], ['Duyệt giá', 0], ['Sửa dữ liệu sản phẩm', 0], ['Chấm bài đóng vai của người được kèm', 1]].map(([t, on]) => `<div class="row sm" style="margin-top:12px">${t}<span class="sp" style="width:38px;height:22px;border-radius:99px;background:${on ? 'var(--ok)' : '#C4CCD7'};position:relative"><span style="position:absolute;${on ? 'right' : 'left'}:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff"></span></span></div>`).join('')}</div>`])}
 <div class="card"><h3>Chứng nhận tư vấn 5 nhóm</h3><div class="row" style="gap:8px;margin-top:12px;flex-wrap:wrap">${['Tủ đông 4 & 6 cánh', 'Tủ mát 2 & 3 cánh', 'Bàn chặt & salad', 'Tủ đông trưng bày'].map((t) => `<span class="chip ok">${ic('check', 12)}${t}</span>`).join('')}<span class="chip warn">${ic('clock', 12)}GoldWash · còn 1 buổi đóng vai</span></div></div>`);

/* ===== A06 Danh sách sản phẩm ===== */
const prods = [
  ['TD4C_GC_SP_01', 'Tủ đông 4 cánh GoldCool', 'Tủ đông 4 & 6 cánh', 'K.1', '16.100.000 / 23.920.000', 'Đang bán', 8],
  ['TD6C_GC_SP_01', 'Tủ đông 6 cánh GoldCool', 'Tủ đông 4 & 6 cánh', 'K.1', '21.620.000 / 35.880.000', 'Mã chờ chốt', 6],
  ['TM2C_GC_SP_01', 'Tủ mát 2 cánh GoldCool', 'Tủ mát 2 & 3 cánh', 'K.2', '16.100.000 – 23.800.000', 'Đang bán', 7],
  ['TM3C_GC_SP_03', 'Tủ mát 3 cánh GoldCool', 'Tủ mát 2 & 3 cánh', 'K.2', '23.920.000 – 33.930.000', 'Đang bán', 7],
  ['BC_GC_SP_01', 'Tủ bàn chặt đông / mát GoldCool', 'Tủ bàn chặt & salad', 'K.3', '9.660.000 – 18.400.000', 'Đang bán', 6],
  ['SALAD_GC_SP_01', 'Tủ salad GoldCool', 'Tủ bàn chặt & salad', 'K.3', 'AI không báo giá', 'Đang bán', 5],
  ['TDTB_GC_KINHCONG_SP_01', 'Tủ đông trưng bày kính cong', 'Tủ đông trưng bày', 'K.4', 'AI không báo giá · chưa có giá theo model', 'Đang bán', 4],
  ['TDTB_GC_KINHPHANG_SP_01', 'Tủ đông trưng bày kính phẳng', 'Tủ đông trưng bày', 'K.4', 'AI không báo giá', 'Đang bán', 4],
  ['TDTB_GC_XADA_SP_01', 'Tủ đông trưng bày bản xả đá', 'Tủ đông trưng bày', 'K.4', 'AI không báo giá', 'Đang bán', 4],
  ['GW_GC_SP_01', 'Máy rửa bát GoldWash', 'GoldWash', 'K.5', 'AI không báo giá', 'Bảo hành chờ chốt', 5],
];
S['A06_Danh_sach_san_pham'] = shell('data', 'Sản phẩm', CHINH, 'Dữ liệu <span>/</span> <b>Sản phẩm</b>', `${head('Sản phẩm', 'Nguồn thông tin sản phẩm duy nhất cho người và AI · 5 nhóm theo DNA', btn('Thêm sản phẩm', 'pri', 'plus'))}
 ${grid(4, [stat('blue', 'box', 'Sản phẩm GoldCool', '10 dòng'), stat('ok', 'image', 'Ảnh đã duyệt', '19 ảnh'), stat('warn', 'alert', 'Hồ sơ chưa đủ cho AI', '6 dòng'), stat('bad', 'layers', 'Thông tin mâu thuẫn', '2 việc')])}
 ${tabs([['Tất cả', 10], ['Tủ đông 4 & 6 cánh', 2], ['Tủ mát 2 & 3 cánh', 2], ['Bàn chặt & salad', 2], ['Tủ đông trưng bày', 3], ['GoldWash', 1]])}
 <div class="card" style="padding:0">${tbl(['Sản phẩm', 'Nhóm', 'Kịch bản', 'Giá bán lẻ (đã gồm VAT)', 'Hồ sơ cho AI', 'Trạng thái'], prods.map(([im, n, g, k, p, st, f]) => [`<div class="row" style="gap:12px" data-go="san-pham">${img(im, 44, 44, 6)}<b class="sm">${n}</b></div>`, `<span class="sm muted">${g}</span>`, `<span class="chip blue">${k}</span>`, `<span class="sm">${p}</span>`, `<div class="row xs" style="gap:8px"><div class="bar" style="width:70px;height:6px"><i style="width:${f * 10}%;background:var(--${f >= 7 ? 'ok' : 'gold'})"></i></div>${f}/10</div>`, `<span class="chip ${st === 'Đang bán' ? 'ok' : 'warn'}" style="font-size:11px">${st}</span>`]))}</div>
 <div class="src">${ic('info', 13)}Mẫu rẻ được lưu kèm từng dòng GoldCool để AI so sánh · bấm vào sản phẩm để xem chi tiết</div>`);

/* ===== A09 Bảng giá đại lý ===== */
S['A09_Bang_gia_dai_ly'] = shell('data', 'Bảng giá đại lý', HUY, 'Dữ liệu <span>/</span> <b>Bảng giá đại lý</b>', `${head('Bảng giá đại lý', 'Tách hẳn khỏi giá bán lẻ. Chỉ Giám đốc, Quản lý Sales và Kế toán được xem.', btn('Nhập bảng giá đại lý', 'pri', 'upload'))}
 <div class="card row" style="gap:16px;padding:18px 20px;border-color:#C9DCEC;background:var(--ice)">${ic('lock', 26, 'var(--navy)')}<div><b>Khu vực giới hạn quyền</b><div class="sm muted">AI Sales và Sales bán lẻ không thấy trang này. Khách hỏi giá đại lý → AI chuyển Sales ngay, không báo số.</div></div></div>
 ${grid(3, [`<div class="card"><h3>Ai được xem</h3>${[['Nguyễn Văn Huy', 'Giám đốc'], ['Trưởng nhóm Kinh doanh', 'đang tuyển'], ['Trần Thị Thu Trang', 'Kế toán bán hàng']].map(([n, r]) => `<div class="row sm" style="margin-top:12px;gap:10px">${av(ini(n), 26)}<span>${n}</span><span class="sp xs muted">${r}</span></div>`).join('')}</div>`,
  `<div class="card" style="grid-column:span 2;text-align:center;padding:34px;border-style:dashed;background:#FAFBFD"><div style="width:52px;height:52px;border-radius:14px;background:var(--goldsoft);display:grid;place-items:center;margin:0 auto">${ic('tag', 24, '#8A6A05')}</div><b style="display:block;margin-top:12px">Chưa có bảng giá đại lý</b><div class="sm muted" style="max-width:420px;margin:6px auto 0">DNA chưa có giá đại lý. Giám đốc nhập bảng giá (Excel) và duyệt; mỗi dòng có mã, ngày áp dụng và người duyệt như giá bán lẻ.</div><div class="row" style="justify-content:center;gap:8px;margin-top:14px">${btn('Tải mẫu Excel', '', 'file')}${btn('Nhập bảng giá', 'pri', 'upload')}</div></div>`], 18)}`);

/* ===== A10 Kho tài liệu ===== */
const docs = [
  ['DNA Doanh nghiệp GoldCool – Phiên bản 2', 'Bộ não công ty: giá trị, phễu L1–L6, giá bán lẻ, kịch bản, luật AI', 'Nguyễn Văn Huy', '31/10/2026', 'ok', 'Đang áp dụng'],
  ['K.1 Kịch bản AI – Tủ đông 4 & 6 cánh', 'Hỏi mô hình → 2 hình thức lạnh → GoldCool → mẫu rẻ → feedback → hỏi chọn', 'Nguyễn Văn Huy', '31/10/2026', 'ok', 'Đang áp dụng'],
  ['K.2 Kịch bản AI – Tủ mát 2 & 3 cánh', 'Báo giá theo dung tích, GoldCool trước, mẫu rẻ sau', 'Nguyễn Văn Huy', '31/10/2026', 'ok', 'Đang áp dụng'],
  ['K.3 Kịch bản AI – Bàn chặt & tủ salad', 'Bàn chặt: hỏi đông/mát, kích thước, báo đúng 2 giá · Salad: không báo giá', 'Nguyễn Văn Huy', '31/10/2026', 'ok', 'Đang áp dụng'],
  ['K.4 Kịch bản AI – Tủ đông trưng bày', 'Giải thích phiên bản, gửi ảnh, hỏi kích thước, không báo giá', 'Nguyễn Văn Huy', '31/10/2026', 'ok', 'Đang áp dụng'],
  ['K.5 Kịch bản AI – GoldWash', 'Giải thích phiên bản, không báo giá · bảo hành chờ chốt', 'Nguyễn Văn Huy', '31/10/2026', 'warn', 'Cần cập nhật'],
  ['S.1–S.7 Kịch bản Sales nhận khách từ AI', '7 nhóm · S.6 tủ 6 cánh là bản nháp dựa trên S.1', 'Nguyễn Văn Huy', '31/10/2026', 'warn', 'S.6 bản nháp'],
  ['Chuẩn phễu L1–L6', 'Định nghĩa từng cấp, điều kiện lên cấp, KPI liên hệ ≤ 5 phút', 'Chị Huyền', '31/10/2026', 'ok', 'Đang áp dụng'],
  ['Kịch bản chăm sóc khách im lặng', 'AI chỉ nhắc theo kịch bản đã duyệt', '—', '—', 'bad', 'Chưa có'],
];
S['A10_Kho_tai_lieu'] = shell('data', 'Kho tài liệu', HUY, 'Dữ liệu <span>/</span> <b>Kho tài liệu</b>', `${head('Kho tài liệu', 'Một nơi duy nhất chứa DNA, kịch bản và luật AI. AI Sales và Học viện đọc từ đây.', btn('Tải tài liệu lên', 'pri', 'upload'))}
 ${grid(3, [stat('ok', 'checkc', 'Đang áp dụng', '6 tài liệu'), stat('warn', 'edit', 'Cần cập nhật', '2 tài liệu'), stat('bad', 'alert', 'Còn thiếu', 'Kịch bản chăm sóc')])}
 <div class="card" style="padding:0">${tbl(['Tài liệu', 'Người duyệt', 'Cập nhật', 'Trạng thái', ''], docs.map(([t, d, w, at, c, s]) => [`<div class="row" style="gap:12px;align-items:flex-start">${ic('file', 20, 'var(--navy)')}<div><b class="sm">${t}</b><div class="xs muted">${d}</div></div></div>`, `<span class="sm">${w}</span>`, `<span class="sm muted">${at}</span>`, `<span class="chip ${c}" style="font-size:11px">${s}</span>`, btn('Mở', 'sm')]))}</div>
 <div class="note">${ic('info', 17, '#8A6A05')}<div><b>Điểm chưa nhất quán trong DNA cần chốt:</b> mã tủ 6 cánh trực tiếp (GCDT-1600 / GCTD-1800L) · bảo hành GoldWash · mã model mẫu rẻ · ngày áp dụng bảng giá · giá tủ đông trưng bày theo model · cách chia khách giữa 3 Sales.</div></div>`);

/* ===== A11 Nhật ký thay đổi ===== */
const logs = [
  ['31/10 16:40', 'Nguyễn Văn Huy', 'Cài đặt AI Sales', 'Thêm câu bị cấm “combo”, “giá đại lý”'],
  ['31/10 15:10', 'Chị Huyền', 'Kho tài liệu', 'Ban hành Chuẩn phễu L1–L6'],
  ['31/10 14:55', 'Nguyễn Văn Huy', 'Bảng giá bán lẻ', 'Xác nhận: giá bán lẻ đã gồm VAT, chưa gồm vận chuyển'],
  ['31/10 11:20', 'Nguyễn Văn Chính', 'Sản phẩm', 'Thêm 19 ảnh sản phẩm thật cho 5 nhóm'],
  ['30/10 17:05', 'Nguyễn Thị Lan', 'Thẻ vấn đề', 'Tạo thẻ VD-1107 “Thống nhất cách nói bảo hành GoldWash”'],
  ['26/10 08:00', 'Nguyễn Văn Huy', 'Cài đặt AI Sales', 'Chuyển chế độ: Tắt → AI soạn – người duyệt'],
];
S['A11_Nhat_ky_thay_doi'] = shell('set', '', HUY, 'Cài đặt <span>/</span> <b>Nhật ký thay đổi</b>', `${head('Nhật ký thay đổi', 'Ai sửa gì, lúc nào. Không ai xóa được nhật ký.', btn('Lọc', '', 'filter'))}
 <div class="card" style="padding:0">${tbl(['Thời gian', 'Người sửa', 'Khu vực', 'Thay đổi'], logs.map(([t, w, a, c]) => [`<span class="sm muted" style="white-space:nowrap">${t}</span>`, `<div class="row" style="gap:8px">${av(ini(w), 24)}<span class="sm">${w}</span></div>`, `<span class="chip gray" style="font-size:11px">${a}</span>`, `<span class="sm">${c}</span>`]))}</div>`);

/* ===== B04 Sổ lỗi dữ liệu ===== */
const errs = [
  ['Tủ đông 6 cánh trực tiếp mã nào, GCDT-1600 hay GCTD-1800L?', 'Mâu thuẫn', 6, 'Nguyễn Văn Chính', 'Chờ Giám đốc'],
  ['GoldWash bảo hành bao lâu?', 'Mâu thuẫn', 5, 'Nguyễn Văn Huy', 'Chờ Giám đốc'],
  ['Mẫu rẻ là hãng nào, mã gì?', 'Thiếu dữ liệu', 4, 'Nguyễn Văn Chính', 'Đang xử lý'],
  ['Tủ đông trưng bày kem 1,5 m giá bao nhiêu?', 'Ngoài quyền AI', 4, 'Nguyễn Văn Huy', 'Cần giá cho Sales'],
  ['Tủ mát bàn chặt chạy có ồn không?', 'Thiếu thông số', 3, 'Nguyễn Văn Chính', 'Mới'],
  ['Cần chừa khoảng trống tản nhiệt bao nhiêu?', 'Thiếu thông số', 3, 'Nguyễn Mạnh Hùng', 'Mới'],
  ['Ảnh tủ mát GoldCool là dung tích nào?', 'Thiếu dữ liệu', 2, 'Nguyễn Thị Lan', 'Mới'],
];
S['B04_So_loi_du_lieu'] = shell('sales', 'Lỗi dữ liệu', CHINH, 'AI Sales <span>/</span> <b>Sổ lỗi dữ liệu</b>', `${head('Sổ lỗi dữ liệu', 'Câu khách hỏi mà AI chưa trả lời được. Bổ sung xong, AI tự dùng thông tin mới.', btn('Xuất danh sách', '', 'upload'))}
 ${grid(4, [stat('bad', 'layers', 'Mâu thuẫn', '2'), stat('warn', 'alert', 'Thiếu thông số / dữ liệu', '4'), stat('gray', 'ban', 'Ngoài quyền AI', '1'), stat('ok', 'checkc', 'Đã xử lý tuần này', '3')])}
 <div class="card" style="padding:0">${tbl(['Câu khách hỏi', 'Loại', 'Số lần', 'Người xử lý', 'Trạng thái', ''], errs.map(([q, t, n, w, s]) => [`<b class="sm">${q}</b>`, `<span class="chip ${t === 'Mâu thuẫn' ? 'bad' : t === 'Ngoài quyền AI' ? 'gray' : 'warn'}" style="font-size:11px">${t}</span>`, `<b>${n}</b>`, `<span class="sm">${w}</span>`, `<span class="sm muted">${s}</span>`, btn('Bổ sung', 'sm')]))}</div>`);

/* ===== B05 Chấm chất lượng tư vấn tuần ===== */
S['B05_Cham_chat_luong'] = shell('sales', '', HUY, 'AI Sales <span>/</span> <b>Chấm chất lượng tư vấn</b>', `${head('Chấm chất lượng tư vấn · Tuần 44', 'Chấm 20 cuộc ngẫu nhiên. Lỗi lặp lại tự thành bài luyện trong Học viện.', btn('Lấy 20 cuộc mới', '', 'refresh'))}
 ${grid(4, [stat('blue', 'chat', 'Đã chấm', '12 / 20'), stat('ok', 'checkc', 'Đúng kịch bản', '10'), stat('bad', 'xc', 'Sai quyền hạn', '1'), stat('warn', 'alert', 'Thiếu bước', '1')])}
 <div class="card" style="padding:0">${tbl(['Cuộc trò chuyện', 'Kịch bản', 'Người trả lời', 'Hỏi nhu cầu', 'Báo giá đúng', 'Đúng quyền hạn', 'Bước tiếp theo', ''], [
   ['Phạm Thu Trang · tủ đông 4 cánh', 'K.1', 'AI → Hà', 1, 1, 1, 1],
   ['Đỗ Văn Long · bàn chặt 1,5 m', 'K.3', 'Hà', 1, 1, 1, 0],
   ['Mai Văn Đông · hỏi giá đại lý', 'Chuyển ngay', 'AI → Yến', 1, 1, 1, 1],
   ['Lý Minh Châu · tủ mát 3 cánh', 'K.2', 'AI', 1, 1, 1, 1],
   ['Khách Thái Bình · tủ 4 cánh', 'K.1', 'Sales', 1, 1, 0, 1],
 ].map(([c, k, w, ...v]) => [`<b class="sm">${c}</b>`, `<span class="chip blue">${k}</span>`, `<span class="sm">${w}</span>`, ...v.map((x) => x ? ic('checkc', 18, 'var(--ok)') : ic('xc', 18, 'var(--bad)')), btn('Xem', 'sm')]))}</div>
 <div class="note">${ic('cap', 17, '#8A6A05')}<div><b>Đã tạo bài luyện:</b> “Khách đòi bớt giá – giữ đúng quyền hạn” cho nhóm Sales, từ 1 cuộc sai quyền hạn tuần này.</div></div>`);

/* ===== B09 Khung chat website ===== */
S['B09_Khung_chat_website'] = page(`<div style="min-height:100vh;background:#fff;position:relative;min-width:1100px">
 <div style="height:70px;border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 48px;gap:28px"><b style="font-size:22px;color:var(--navy)"><span style="color:var(--gold)">Gold</span>Cool</b>${['Tủ đông', 'Tủ mát', 'Bàn chặt', 'Tủ trưng bày', 'GoldWash', 'Liên hệ'].map((t) => `<span class="sm" style="font-weight:600">${t}</span>`).join('')}<span class="sp chip goldc" style="padding:6px 12px">Hotline 0865 868 868</span></div>
 <div style="padding:60px 48px;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;max-width:1200px"><div><div style="font-size:44px;font-weight:800;color:var(--navy);line-height:1.1">Chọn đúng –<br>Dùng lâu</div><div class="sub1" style="font-size:17px;margin-top:14px">Thiết bị lạnh và bếp cho quán ăn, nhà hàng. Lạnh sâu – Bền lâu – Tiết kiệm điện.</div></div>${img('TD4C_GC_SP_01', 520, 340, 16)}</div>
 <div style="position:fixed;right:28px;bottom:28px;width:370px;background:#fff;border-radius:18px;box-shadow:0 20px 60px rgba(15,61,99,.25);overflow:hidden;border:1px solid var(--line)">
  <div style="background:var(--navy);color:#fff;padding:14px 16px" class="row">${av('GC', 34, 'var(--gold)', 'var(--navy)')}<div><b>Tư vấn GoldCool</b><div class="xs" style="color:#B9CCDE">Thường trả lời trong vài giây</div></div><span class="sp">${ic('x', 18, '#fff')}</span></div>
  <div id="web-body" style="padding:14px;display:flex;flex-direction:column;gap:10px;height:330px;overflow:auto;background:#F7F9FB">
   <div style="align-self:flex-start;background:var(--ice);border:1px solid #CFE0EE;border-radius:4px 14px 14px 14px;padding:9px 12px;max-width:85%" class="sm">Dạ em chào anh/chị. Anh/chị đang quan tâm tủ đông, tủ mát, bàn chặt, tủ salad, tủ đông trưng bày hay máy rửa bát GoldWash ạ?</div>
  </div>
  <div style="padding:10px;border-top:1px solid var(--line)"><div class="field" id="web-in">Nhập tin nhắn…</div></div>
  <div class="xs muted" style="text-align:center;padding:0 0 8px">Cùng luật 5 kịch bản như AI Sales trên Facebook</div>
 </div></div>`, 'body{background:#fff}');

/* ===== C03 Chi tiết mục tiêu ===== */
S['C03_Chi_tiet_muc_tieu'] = shell('kpi', 'Cây mục tiêu', HUY, 'Mục tiêu & KPI <span>/</span> Cây mục tiêu <span>/</span> <b>Liên hệ khách ≤ 5 phút</b>', `<div class="row" style="align-items:flex-start"><div><div class="row" style="gap:8px"><span class="chip warn">Cần chú ý</span><span class="chip gray">Kinh doanh & Marketing · Quý 4/2026</span></div><div class="h1" style="margin-top:8px">Sales liên hệ khách mới ≤ 5 phút, tối thiểu 3 lần với khách L1</div><div class="sub1">Nối lên mục tiêu công ty số 1 · người chịu trách nhiệm: Nguyễn Văn Huy (tạm, Trưởng nhóm KD đang tuyển)</div></div></div>
 ${grid(4, [stat('warn', 'target', 'Hiện tại', '89%'), stat('blue', 'flag' in {} ? 'target' : 'target', 'Mục tiêu (đề xuất)', '95%'), stat('gray', 'db', 'Nguồn số liệu', 'AI Sales · tự động'), stat('bad', 'clock', 'Khách lỡ nhiều nhất', '12:00 – 13:30')])}
 <div class="card"><h3>Diễn biến theo tuần</h3><div style="display:flex;align-items:flex-end;gap:18px;height:160px;margin-top:16px;padding-bottom:22px;border-bottom:1px solid var(--line);position:relative">${[['T40', 78], ['T41', 82], ['T42', 85], ['T43', 87], ['T44', 89]].map(([w, v]) => `<div class="col" style="align-items:center;flex:1;gap:6px"><b class="xs">${v}%</b><div style="width:100%;max-width:56px;height:${(v - 60) * 3.5}px;background:var(--l4);border-radius:6px 6px 0 0"></div><span class="xs muted" style="position:absolute;bottom:2px">${w}</span></div>`).join('')}<div style="position:absolute;left:0;right:0;bottom:${22 + 35 * 3.5}px;border-top:2px dashed var(--bad)"></div></div><div class="src">${ic('info', 13)}Vạch đỏ = 95% · số liệu mẫu</div></div>
 ${grid(2, [`<div class="card"><h3>Mục tiêu cá nhân nối vào</h3>${[['Đoàn Thị Hồng Hà', '92%', 'ok'], ['Trần Thị Ánh', '90%', 'warn'], ['Trịnh Hải Yến', '84%', 'warn']].map(([n, v, c]) => `<div class="row sm" style="margin-top:12px;gap:10px">${av(ini(n), 26)}${n}<span class="sp chip ${c}">${v}</span></div>`).join('')}</div>`, `<div class="card"><h3>Thẻ vấn đề liên quan</h3><div class="row" style="margin-top:12px;gap:10px;padding:10px 12px;border:1px solid #F0C3BC;border-radius:10px" data-go="the-van-de"><div style="flex:1"><b class="sm">Khách nhắn giờ nghỉ trưa chờ Sales quá 5 phút</b><div class="xs muted">Đoàn Thị Hồng Hà · quá hạn 01/11</div></div>${btn('Mở', 'sm')}</div></div>`])}`);

/* ===== C04 Đề xuất mục tiêu ===== */
S['C04_De_xuat_muc_tieu'] = shell('kpi', 'Cây mục tiêu', HA, 'Mục tiêu & KPI <span>/</span> <b>Đề xuất mục tiêu</b>', `${head('Đề xuất mục tiêu', 'Mục tiêu nào cũng phải đo được trước khi được duyệt.')}
 ${grid(2, [`<div class="card"><div class="lbl">Tên mục tiêu</div><input class="field" id="g-name" value="Thu 3 feedback khách L6 mỗi tuần">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px"><div><div class="lbl">Con số đo</div><input class="field" id="g-num" value="3 feedback / tuần"></div><div><div class="lbl">Hạn</div><input class="field" type="date" id="g-due" value="2026-12-31"></div></div>
  <div class="lbl" style="margin-top:14px">Nối lên mục tiêu</div><div class="field">Công ty 3 · 100% khách L6 được chăm sóc đúng mốc, mỗi Sales 3 feedback / tuần</div>
  <div class="lbl" style="margin-top:14px">Nguồn số liệu</div><div class="field">Thư viện feedback (Marketing duyệt)</div>
  <div class="lbl" style="margin-top:14px">Người duyệt</div><div class="field row" style="gap:8px">${av('NH', 22)}Nguyễn Văn Huy (tạm thay Trưởng nhóm KD)</div>
  <div class="row" style="margin-top:18px;gap:8px"><span class="sp"></span>${btn('Lưu nháp')}${btn('Gửi duyệt', 'pri', 'send')}</div></div>`,
  `<div class="card" style="border-color:#CFE0EE"><div class="row"><h3>Kiểm tra trước khi gửi</h3><span class="ai">${ic('spark', 10)}AI</span></div>${[['Có con số đo', 1], ['Có hạn', 1], ['Nối lên mục tiêu công ty', 1], ['Có nguồn số liệu tự động hoặc bằng chứng', 1], ['Không trùng mục tiêu đã có', 1]].map(([t]) => `<div class="row sm" style="margin-top:12px;gap:8px">${ic('checkc', 17, 'var(--ok)')}${t}</div>`).join('')}<div class="noteb" style="margin-top:16px">${ic('info', 16, 'var(--navy)')}<div>Mục tiêu đo bằng feedback đã xác thực, đúng chuẩn L6 trong DNA.</div></div></div>`], 18)}`);

/* ===== C06 Báo cáo tuần của đội ===== */
S['C06_Bao_cao_cua_doi'] = shell('kpi', 'Báo cáo tuần', HUY, 'Mục tiêu & KPI <span>/</span> <b>Báo cáo tuần của đội</b>', `${head('Báo cáo tuần 44 · Kinh doanh & Marketing', '7/7 người đã nộp · đọc nhanh và phản hồi', btn('Tuần 44', '', 'cal'))}
 <div class="card" style="padding:0">${[['Đoàn Thị Hồng Hà', 'Sales · NVKD1', '5 đơn Kế toán xác nhận · liên hệ ≤ 5 phút 33/34 khách', 'Chờ Kho xác nhận tồn tủ 4 cánh quạt gió', 'Đỗ Huyền Thanh'], ['Trần Thị Ánh', 'Sales · NVKD2', '4 đơn · 2 feedback L6', 'Khách GoldWash hỏi bảo hành, chưa có câu chốt', 'Nguyễn Thị Lan'], ['Trịnh Hải Yến', 'Sales · NVKD3', '3 đơn · trung bình liên hệ 6 phút', 'Khách đến giờ trưa không kịp nhận', '—'], ['Nguyễn Thị Lan', 'Content', 'Thêm 19 ảnh sản phẩm thật · 3 feedback xác thực', 'Thiếu feedback tủ đông 6 cánh', 'Sales gửi video tại quán'], ['Đạt', 'Website', 'Sửa trang tủ mát theo giá đã gồm VAT', 'Chờ chốt bảo hành GoldWash để sửa trang', 'Nguyễn Văn Huy']].map(([n, r, a, b, h]) => `<div class="row" style="padding:14px 18px;border-top:1px solid var(--line);gap:16px;align-items:flex-start">${av(ini(n), 34)}<div style="width:190px"><b class="sm">${n}</b><div class="xs muted">${r}</div><span class="chip ok" style="font-size:11px;margin-top:6px">Đã nộp</span></div><div style="flex:1" class="sm"><div><span class="muted">Kết quả:</span> ${a}</div><div style="margin-top:4px"><span class="muted">Vướng:</span> ${b}</div><div style="margin-top:4px"><span class="muted">Cần hỗ trợ:</span> ${h}</div></div>${btn('Phản hồi', 'sm', 'chat')}</div>`).join('')}</div>`);

/* ===== C08 Tạo thẻ vấn đề ===== */
S['C08_Tao_the_van_de'] = shell('kpi', 'Thẻ vấn đề', HA, 'Mục tiêu & KPI <span>/</span> Thẻ vấn đề <span>/</span> <b>Báo vấn đề mới</b>', `${head('Báo vấn đề mới', 'Minh bạch khi có vấn đề: báo kèm nguyên nhân và phương án, không chỉ báo khó khăn.')}
 <div class="card" style="max-width:860px">${[['1. Vấn đề', 'iss-1', 'Khách nhắn giờ nghỉ trưa (12:00–13:30) chờ Sales quá 5 phút'], ['2. Nguyên nhân', 'iss-2', '3 Sales nghỉ trưa cùng giờ, chưa có ca trực'], ['3. Phương án', 'iss-3', 'Chia ca trực trưa luân phiên giữa Hà, Ánh, Yến'], ['4. Kết quả cần đạt', 'iss-4', '95% khách mới được liên hệ ≤ 5 phút, kể cả giờ trưa']].map(([l, id, v]) => `<div class="lbl" style="margin-top:12px;color:var(--ink)">${l}</div><input class="field" id="${id}" value="${v}">`).join('')}
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:12px"><div><div class="lbl" style="color:var(--ink)">5. Người làm</div><div class="field row" style="gap:8px">${av('HH', 22)}Đoàn Thị Hồng Hà</div></div><div><div class="lbl" style="color:var(--ink)">6. Hạn</div><input class="field" type="date" id="iss-6" value="2026-11-09"></div><div><div class="lbl" style="color:var(--ink)">Nối mục tiêu</div><div class="field">Liên hệ ≤ 5 phút</div></div></div>
  <div class="lbl" style="margin-top:12px;color:var(--ink)">7. Bằng chứng hoàn thành</div><div class="field muted" style="border-style:dashed">Thêm khi đóng thẻ (ảnh lịch trực, báo cáo AI Sales tuần)</div>
  <div class="row" style="margin-top:18px;gap:8px"><span class="xs muted">Đủ 6/7 ô · ô 7 bắt buộc khi đóng thẻ</span><span class="sp"></span>${btn('Hủy')}${btn('Tạo thẻ', 'pri', 'plus')}</div></div>`);

/* ===== C09 Ghi nhận đồng nghiệp ===== */
const kudos = [['Trần Thị Thu Trang', 'Đoàn Thị Hồng Hà', 'Giữ khách hàng bằng trách nhiệm', 'Chị Hà gửi đủ xác nhận cọc và thông tin xuất hóa đơn cho 4 đơn, Kế toán không phải hỏi lại.'], ['Nguyễn Văn Huy', 'Nguyễn Thị Lan', 'Tạo niềm tin bằng chất lượng', 'Lan gom đủ 19 ảnh sản phẩm thật cho 5 nhóm trong 1 buổi.'], ['Đoàn Thị Hồng Hà', 'Đỗ Huyền Thanh', 'Minh bạch khi có vấn đề', 'Chị Thanh báo tồn kho chính xác trong 20 phút, em trả lời khách kịp.']];
S['C09_Ghi_nhan'] = shell('kpi', 'Ghi nhận', HA, 'Mục tiêu & KPI <span>/</span> <b>Ghi nhận</b>', `${head('Ghi nhận đồng nghiệp', 'Lan tỏa hành vi tốt theo DNA GoldCool.')}
 ${grid(2, [`<div class="card"><h3>Ghi nhận một đồng nghiệp</h3><div class="lbl" style="margin-top:14px">Người được ghi nhận</div><input class="field" id="kd-who" placeholder="Ví dụ: Đỗ Huyền Thanh"><div class="lbl" style="margin-top:12px">Theo giá trị</div><div class="row" id="kd-vals" style="gap:6px;flex-wrap:wrap">${PRINC.map((p, i) => `<span class="chip ${i === 2 ? 'goldc' : 'gray'} click" data-val="${p}" style="padding:4px 10px">${p}</span>`).join('')}</div><div class="lbl" style="margin-top:12px">Việc cụ thể</div><textarea class="field" id="kd-text" rows="3" placeholder="Viết rõ việc đồng nghiệp đã làm…"></textarea><div class="row" style="margin-top:12px"><span class="sp"></span>${btn('Gửi ghi nhận', 'pri', 'heart')}</div></div>`,
  `<div class="card" style="padding:0"><div style="padding:16px 18px 6px"><h3>Ghi nhận gần đây</h3></div><div id="kd-list">${kudos.map(([f, t, v, m]) => `<div style="padding:12px 18px;border-top:1px solid var(--line)"><div class="row sm" style="gap:8px">${av(ini(f), 24)}<b>${f}</b><span class="muted">→</span><b>${t}</b></div><span class="chip blue" style="font-size:11px;margin-top:6px">${v}</span><div class="sm muted" style="margin-top:6px">“${m}”</div></div>`).join('')}</div></div>`], 18)}`);

/* ===== C10 Đánh giá cách làm việc tháng ===== */
S['C10_Danh_gia_thang'] = shell('kpi', '', HA, 'Mục tiêu & KPI <span>/</span> <b>Đánh giá tháng 10</b>', `${head('Đánh giá cách làm việc · Tháng 10/2026', 'Đánh giá cả cách làm, không chỉ kết quả. Nhân viên tự chấm, quản lý chấm lại.')}
 <div class="card" style="padding:0">${tbl(['Theo DNA', 'Tự chấm', 'Quản lý chấm', 'Bằng chứng'], PRINC.map((p, i) => [`<b class="sm">${p}</b>`, `<div class="row" style="gap:4px">${[1, 2, 3, 4, 5].map((k) => `<span style="width:22px;height:22px;border-radius:6px;display:grid;place-items:center;font-size:11px;font-weight:700;${k <= [4, 4, 5, 4, 4, 4, 5][i] ? 'background:var(--navy);color:#fff' : 'background:var(--grays);color:var(--muted)'}">${k}</span>`).join('')}</div>`, '<span class="sm muted">Chờ quản lý</span>', `<span class="sm">${['Tư vấn tủ 4 cánh thay vì 6 cánh vì chỗ đặt 1,3 m', 'Gửi feedback đã xác thực, đúng sản phẩm', '4 đơn đủ hồ sơ cho Kế toán', 'Không tự giảm giá khi khách ép', 'Tư vấn mẫu rẻ khi khách ít dùng', 'Hỏi Kho trước khi hẹn ngày giao', 'Báo thẻ vấn đề giờ trưa'][i]}</span>`]))}</div>
 <div class="row"><span class="sp"></span>${btn('Gửi tự đánh giá', 'pri', 'send')}</div>`);

/* ===== C11 Thư viện quyết định ===== */
const decs = [['31/10', 'Giá bán lẻ đã gồm VAT, chưa gồm vận chuyển', 'Áp dụng cho AI, Sales, website', 'Nguyễn Văn Huy', 'Xem lại 30/11'], ['31/10', 'Ban hành chuẩn phễu L1–L6', 'AI chuyển Sales ở L3 (nhóm có giá) hoặc L2 (nhóm không giá)', 'Nguyễn Văn Huy', 'Xem lại 30/11'], ['31/10', 'Bỏ tài liệu mục tiêu kinh doanh khỏi DNA', 'Không dùng số mục tiêu cũ trong phần mềm', 'Nguyễn Văn Huy', '—'], ['26/10', 'AI Sales chạy chế độ “AI soạn – người duyệt”', 'Mở nấc tự động khi 2 bài kiểm tra đạt 100%', 'Nguyễn Văn Huy', 'Xem lại 26/11']];
S['C11_Thu_vien_quyet_dinh'] = shell('kpi', 'Thư viện quyết định', HUY, 'Mục tiêu & KPI <span>/</span> <b>Thư viện quyết định</b>', `${head('Thư viện quyết định', 'Lưu lại cách đã quyết để đội ngũ học và không lặp sai. Mỗi quyết định có lịch xem lại kết quả.')}
 <div class="card" style="padding:0">${tbl(['Ngày', 'Quyết định', 'Ảnh hưởng', 'Người quyết', 'Xem lại'], decs.map(([d, t, e, w, r]) => [`<span class="sm muted">${d}</span>`, `<b class="sm">${t}</b>`, `<span class="sm">${e}</span>`, `<span class="sm">${w}</span>`, `<span class="chip ${r === '—' ? 'gray' : 'blue'}" style="font-size:11px">${r}</span>`]))}</div>
 <div class="src">${ic('info', 13)}Quyết định từ thẻ vấn đề (ví dụ VD-1107 bảo hành GoldWash) tự thêm vào đây khi Giám đốc chọn phương án</div>`);

/* ===== C12 Bảng điểm quý ===== */
S['C12_Bang_diem_quy'] = shell('kpi', '', HUY, 'Mục tiêu & KPI <span>/</span> <b>Bảng điểm quý 4</b>', `${head('Bảng điểm quý 4/2026', 'Điểm dựa trên kết quả có bằng chứng và cách làm việc. Mức thưởng do Giám đốc chốt.', btn('Xuất bảng điểm', '', 'upload'))}
 <div class="card" style="padding:0">${tbl(['Nhân viên', 'Kết quả mục tiêu (60%)', 'Cách làm việc (30%)', 'Học viện (10%)', 'Tổng', 'Trạng thái'], [['Đoàn Thị Hồng Hà', 92, 86, 90], ['Trần Thị Ánh', 88, 84, 85], ['Trịnh Hải Yến', 81, 82, 80], ['Nguyễn Thị Lan', 90, 88, 75], ['Đỗ Huyền Thanh', 95, 90, 70]].map(([n, a, b, c]) => { const t = Math.round(a * .6 + b * .3 + c * .1); return [`<div class="row" style="gap:8px">${av(ini(n), 26)}<b class="sm">${n}</b></div>`, `${a}`, `${b}`, `${c}`, `<b style="font-size:16px">${t}</b>`, '<span class="chip warn" style="font-size:11px">Tạm tính</span>']; }))}</div>
 <div class="src">${ic('info', 13)}Điểm là dữ liệu mẫu · quý chưa kết thúc · không hiển thị lương, thưởng trong phần mềm</div>`);

/* ===== C13 Tóm tắt tuần của Trợ lý AI ===== */
S['C13_Tom_tat_AI'] = shell('kpi', '', HUY, 'Mục tiêu & KPI <span>/</span> <b>Tóm tắt tuần của Trợ lý AI</b>', `${head('Tóm tắt tuần 44', 'Trợ lý AI đọc 24 báo cáo tuần và chỉ ra điều cần chú ý. AI gợi ý, anh quyết định.')}
 ${grid(3, [`<div class="card" style="border-color:#F0C3BC"><h3 style="color:var(--bad)">${ic('alert', 17)}Cần chú ý</h3><ul class="sm" style="margin:10px 0 0 18px;display:flex;flex-direction:column;gap:6px"><li>3 người cùng vướng việc chờ chốt bảo hành GoldWash</li><li>Khách giờ trưa chờ quá 5 phút lặp lại 2 tuần</li><li>Thiếu feedback tủ đông 6 cánh cho AI</li></ul></div>`, `<div class="card" style="border-color:#9FD3B6"><h3 style="color:var(--ok)">${ic('checkc', 17)}Làm tốt</h3><ul class="sm" style="margin:10px 0 0 18px;display:flex;flex-direction:column;gap:6px"><li>Đủ 19 ảnh sản phẩm thật cho 5 nhóm</li><li>Kế toán xác nhận đơn L5 trong ngày</li><li>Không có lỗi nặng của AI</li></ul></div>`, `<div class="card"><h3>${ic('star', 17, '#8A6A05')}Đề xuất cho anh</h3><ul class="sm" style="margin:10px 0 0 18px;display:flex;flex-direction:column;gap:6px"><li>Chốt bảo hành GoldWash (thẻ VD-1107)</li><li>Duyệt ca trực trưa cho 3 Sales</li><li>Giao Sales gửi video tại quán tủ 6 cánh</li></ul></div>`])}
 <div class="src">${ic('info', 13)}Tóm tắt từ báo cáo tuần · luôn đối chiếu báo cáo gốc trước khi quyết</div>`);

/* ===== C14 Cài đặt KPI ===== */
S['C14_Cai_dat_KPI'] = shell('set', '', HUY, 'Cài đặt <span>/</span> <b>Cài đặt KPI</b>', `${head('Cài đặt KPI', 'Chỉnh nhịp vận hành mà không cần sửa phần mềm.')}
 ${grid(2, [`<div class="card"><h3>Nhịp báo cáo</h3><dl class="kv" style="margin-top:14px;grid-template-columns:200px 1fr"><dt>Hạn nộp báo cáo tuần</dt><dd><span class="field" style="padding:5px 10px">Thứ 7 · 12:00</span></dd><dt>Nhắc trước hạn</dt><dd><span class="field" style="padding:5px 10px">2 giờ</span></dd><dt>Người nhắc</dt><dd>Chị Huyền (HCNS & Hệ thống)</dd><dt>Ngày chốt mục tiêu quý</dt><dd><span class="field" style="padding:5px 10px">Ngày 5 tháng đầu quý</span></dd></dl></div>`,
  `<div class="card"><h3>Chuẩn theo DNA</h3><dl class="kv" style="margin-top:14px;grid-template-columns:200px 1fr"><dt>Liên hệ khách mới</dt><dd>≤ 5 phút · tối thiểu 3 lần</dd><dt>Điều kiện lên L4</dt><dd>Có ngày + hành động follow-up</dd><dt>Điều kiện lên L5</dt><dd>Kế toán xác nhận cọc / đơn</dd><dt>Chăm sóc L6</dt><dd>Sau giao · 7 ngày · 30 ngày</dd><dt>Feedback</dt><dd>3 / tuần / Sales</dd></dl></div>`, `<div class="card"><h3>Ngưỡng màu</h3>${[['Xanh', 'Đúng tiến độ', 'ok'], ['Vàng', 'Chậm dưới 15%', 'warn'], ['Đỏ', 'Chậm từ 15% hoặc quá hạn', 'bad']].map(([a, b, c]) => `<div class="row sm" style="margin-top:12px;gap:10px"><span class="chip ${c}">${a}</span>${b}</div>`).join('')}</div>`, `<div class="card"><h3>Trọng số bảng điểm quý</h3>${[['Kết quả mục tiêu', 60], ['Cách làm việc', 30], ['Học viện', 10]].map(([t, v]) => `<div style="margin-top:12px"><div class="row sm">${t}<b class="sp">${v}%</b></div><div class="bar" style="margin-top:6px"><i style="width:${v}%;background:var(--navy)"></i></div></div>`).join('')}</div>`], 18)}
 <div class="row"><span class="sp"></span>${btn('Lưu thay đổi', 'pri', 'save')}</div>`);

/* ===== D02 Thư viện bài học ===== */
const lessons = [['TD4C_GC_SP_01', 'Kịch bản tủ đông 4 & 6 cánh (K.1, S.1, S.6)', 'Tủ đông 4 & 6 cánh', '12 phút', 1], ['TM2C_GC_SP_01', 'Tủ mát 2 & 3 cánh: báo giá theo dung tích (K.2, S.2)', 'Tủ mát 2 & 3 cánh', '9 phút', 1], ['BC_GC_SP_01', 'Bàn chặt: hỏi đông / mát, kích thước (K.3, S.3)', 'Bàn chặt & salad', '8 phút', 1], ['SALAD_GC_SP_01', 'Tủ salad: không báo giá trước, hỏi số khay (S.4)', 'Bàn chặt & salad', '6 phút', 0], ['TDTB_GC_KINHCONG_SP_01', 'Tủ đông trưng bày: 3 phiên bản (K.4, S.5)', 'Tủ đông trưng bày', '6 phút', 0], ['GW_GC_SP_01', 'GoldWash: giải thích phiên bản (K.5, S.7)', 'GoldWash', '7 phút', 0], ['TD4C_MR_SP_01', 'GoldCool khác mẫu rẻ thế nào', 'Chung', '5 phút', 1], ['TD6C_GC_SP_01', 'Chuẩn phễu L1–L6 và việc của Sales', 'Chung', '10 phút', 1]];
S['D02_Thu_vien_bai_hoc'] = shell('hv', 'Thư viện bài học', NEW, 'Học viện <span>/</span> <b>Thư viện bài học</b>', `${head('Thư viện bài học', 'Bài ngắn theo vị trí và dòng sản phẩm · nội dung lấy từ DNA và kịch bản đã duyệt')}
 ${tabs([['Tất cả', 8], ['Tủ đông', 1], ['Tủ mát', 1], ['Bàn chặt & salad', 2], ['Trưng bày', 1], ['GoldWash', 1], ['Chung', 2]])}
 ${grid(4, lessons.map(([im, t, g, d, done]) => `<div class="card click" data-go="xem-bai-hoc" style="padding:0;overflow:hidden">${img(im, 999, 130, 0).replace('width:999px', 'width:100%')}<div style="padding:12px 14px"><span class="chip blue" style="font-size:11px">${g}</span><b class="sm" style="display:block;margin-top:8px">${t}</b><div class="row xs muted" style="margin-top:8px">${ic('clock', 12)} ${d}${done ? `<span class="sp chip ok" style="font-size:11px">${ic('check', 11)}Đã học</span>` : ''}</div></div></div>`))}`);

/* ===== D03 Xem bài học ===== */
S['D03_Xem_bai_hoc'] = shell('hv', 'Thư viện bài học', NEW, 'Học viện <span>/</span> Thư viện bài học <span>/</span> <b>Tủ đông trưng bày</b>', `<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:18px">
 <div class="card" style="padding:26px 30px"><span class="chip blue">Tủ đông trưng bày · K.4, S.5</span><div class="h1" style="margin-top:10px">Tủ đông trưng bày: giải thích phiên bản, hỏi kích thước</div><div class="sub1">6 phút · cập nhật 31/10/2026 theo DNA phiên bản 2</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px">${[['TDTB_GC_KINHCONG_SP_01', 'Kính cong'], ['TDTB_GC_KINHPHANG_SP_01', 'Kính phẳng'], ['TDTB_GC_XADA_SP_01', 'Bản xả đá']].map(([im, t]) => `<div>${img(im, 999, 150, 10).replace('width:999px', 'width:100%')}<b class="sm" style="display:block;margin-top:6px;text-align:center">${t}</b></div>`).join('')}</div>
  <h3 style="margin-top:22px">AI làm gì</h3><ul class="sm" style="margin:8px 0 0 18px;display:flex;flex-direction:column;gap:6px"><li>Giải thích 3 phiên bản, gửi ảnh đúng phiên bản khách hỏi.</li><li>Hỏi kích thước / phiên bản. <b>Không báo giá.</b></li><li>Khách trả lời → khách lên L2, chuyển Sales.</li></ul>
  <h3 style="margin-top:18px">Sales làm gì khi nhận khách L2</h3><ul class="sm" style="margin:8px 0 0 18px;display:flex;flex-direction:column;gap:6px"><li>Đọc bản bàn giao, không hỏi lại điều khách đã nói.</li><li>Hỏi mặt hàng trưng bày (kem, đồ đông lạnh…) và chỗ đặt.</li><li>Báo giá theo model khi có bảng giá; không hứa tồn kho, ngày giao khi Kho chưa xác nhận.</li></ul>
  <div class="note" style="margin-top:18px">${ic('alert', 16, '#8A6A05')}<div>Giá tủ đông trưng bày theo từng model đang chờ Giám đốc chốt.</div></div>
  <div class="row" style="margin-top:20px"><span class="sp"></span>${btn('Đánh dấu đã học', 'pri', 'check')}</div></div>
 <div class="col" style="gap:18px"><div class="card"><h3>Câu hỏi nhanh</h3><div class="sm" style="margin-top:10px">Khách hỏi “Tủ trưng bày kem 1,5 m bao nhiêu tiền?”. AI nên làm gì?</div>${['Báo giá ước lượng', 'Giải thích phiên bản, hỏi kích thước, chuyển Sales', 'Báo giá mẫu rẻ trước'].map((t, i) => `<div class="field click" data-quiz="${i === 1 ? 1 : 0}" style="margin-top:8px;cursor:pointer">${t}</div>`).join('')}</div>
 <div class="card"><h3>Bài tiếp theo</h3><div class="row" style="gap:10px;margin-top:10px" data-go="chon-tinh-huong">${img('TDTB_GC_KINHCONG_SP_01', 44, 44, 8)}<div><b class="sm">Luyện đóng vai: chủ quán kem</b><div class="xs muted">15 phút</div></div></div></div></div></div>`);

/* ===== D05 Kết quả bài thi ===== */
S['D05_Ket_qua_bai_thi'] = shell('hv', 'Bài thi', NEW, 'Học viện <span>/</span> Bài thi <span>/</span> <b>Kết quả</b>', `<div class="card row" style="gap:22px;padding:20px 22px;border-color:#9FD3B6"><div style="width:96px;height:96px;border-radius:50%;background:conic-gradient(var(--ok) 0 87%,#EEF1F5 87% 100%);display:grid;place-items:center;flex:none"><div style="width:76px;height:76px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center"><div><b style="font-size:22px">26/30</b><div class="xs muted">87%</div></div></div></div><div style="flex:1"><span class="chip ok" style="font-size:14px;padding:4px 14px">ĐẠT</span><div style="font-size:17px;font-weight:600;margin-top:8px">Bài thi chặng 1 · Sản phẩm, giá và kịch bản</div><div class="sm muted">Đạt khi đúng từ 80% · đã mở chặng 2: Kịch bản Sales theo 5 nhóm</div></div>${btn('Học tiếp chặng 2', 'pri', 'play')}</div>
 ${grid(3, [['5 nhóm sản phẩm, GoldCool và mẫu rẻ', 11, 12], ['Giá đã gồm VAT, bảo hành, đổi mới 30 ngày', 8, 8], ['Kịch bản AI, Sales và phễu L1–L6', 7, 10]].map(([t, a, b]) => `<div class="card"><b class="sm">${t}</b><div class="row" style="margin-top:10px"><b style="font-size:22px">${a}/${b}</b><span class="sp chip ${a / b >= .8 ? 'ok' : 'warn'}">${Math.round(a / b * 100)}%</span></div><div class="bar" style="margin-top:8px"><i style="width:${a / b * 100}%;background:var(--${a / b >= .8 ? 'ok' : 'gold'})"></i></div></div>`))}
 <div class="card"><h3>Câu sai cần xem lại</h3>${[['Câu 17', 'Khách hỏi giá đại lý → AI làm gì?', 'Chuyển Sales ngay, không báo số'], ['Câu 21', 'Lên L4 cần điều kiện gì?', 'Có ngày và hành động follow-up'], ['Câu 24', 'Nhóm nào AI không báo giá?', 'Tủ salad, tủ đông trưng bày, GoldWash']].map(([n, q, a]) => `<div class="row" style="margin-top:12px;gap:12px;align-items:flex-start"><span class="chip bad" style="font-size:11px">${n}</span><div><b class="sm">${q}</b><div class="xs" style="color:var(--ok);margin-top:2px">Đáp án đúng: ${a}</div></div></div>`).join('')}</div>`);

/* ===== D06 Chọn tình huống đóng vai ===== */
const cases = [['TD4C_GC_SP_01', 'Quán lẩu sắp mở hỏi tủ 4 cánh, chỗ đặt 1,3 m', 'Tủ đông 4 & 6 cánh', 'Vừa', 'Đạt'], ['BC_GC_SP_01', 'Quán cơm chê giá tủ mát bàn chặt 1,5 m', 'Bàn chặt & salad', 'Khó', 'Đang luyện'], ['TDTB_GC_KINHCONG_SP_01', 'Chủ quán kem hỏi tủ đông trưng bày', 'Tủ đông trưng bày', 'Vừa', 'Chưa luyện'], ['GW_GC_SP_01', 'Nhà hàng hỏi GoldWash và bảo hành', 'GoldWash', 'Khó', 'Chưa luyện'], ['TM3C_GC_SP_02', 'Siêu thị mini hỏi tủ mát 3 cánh', 'Tủ mát 2 & 3 cánh', 'Dễ', 'Đạt'], ['TD6C_GC_SP_01', 'Khách muốn tủ 6 cánh nhưng chỗ đặt hẹp', 'Tủ đông 4 & 6 cánh', 'Khó', 'Chưa luyện']];
S['D06_Chon_tinh_huong'] = shell('hv', 'Phòng đóng vai', NEW, 'Học viện <span>/</span> <b>Chọn tình huống đóng vai</b>', `${head('Chọn tình huống đóng vai', 'Tình huống lấy từ hội thoại thật, đã xóa thông tin khách · cần đạt cả 5 nhóm để qua chặng 2')}
 ${grid(3, cases.map(([im, t, g, d, s]) => `<div class="card click" data-go="dong-vai" style="padding:14px"><div class="row" style="gap:12px;align-items:flex-start">${img(im, 64, 64, 10)}<div style="flex:1"><b class="sm">${t}</b><div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap"><span class="chip blue" style="font-size:11px">${g}</span><span class="chip ${d === 'Khó' ? 'bad' : d === 'Vừa' ? 'warn' : 'gray'}" style="font-size:11px">${d}</span></div></div></div><div class="row xs" style="margin-top:12px"><span class="chip ${s === 'Đạt' ? 'ok' : s === 'Đang luyện' ? 'warn' : 'gray'}" style="font-size:11px">${s}</span><span class="sp btn sm">Vào luyện</span></div></div>`))}`);

/* ===== D09 Hồ sơ năng lực ===== */
S['D09_Ho_so_nang_luc'] = shell('hv', 'Hồ sơ năng lực', NEW, 'Học viện <span>/</span> <b>Hồ sơ năng lực</b>', `<div class="card row" style="gap:18px;padding:20px">${av('N4', 60, '#2A5A85', '#fff')}<div style="flex:1"><div class="h1">Nhân viên mới · NVKD4</div><div class="sub1">Sales mới · ngày 9/30 · người kèm: Đoàn Thị Hồng Hà</div></div><div class="col" style="align-items:flex-end"><div class="xs muted">Sát hạch cuối</div><b>sau 21 ngày</b></div></div>
 ${grid(3, [['Chặng 1 · Sản phẩm & giá', 'Đạt 26/30', 'ok', 100], ['Chặng 2 · Kịch bản 5 nhóm', '3/5 nhóm', 'warn', 60], ['Chặng 3 · Nhận khách thật', 'Chưa mở', 'gray', 0]].map(([t, v, c, p]) => `<div class="card"><b class="sm">${t}</b><div class="row" style="margin-top:8px"><span class="chip ${c}">${v}</span></div><div class="bar" style="margin-top:10px"><i style="width:${p}%;background:var(--${c === 'ok' ? 'ok' : 'gold'})"></i></div></div>`))}
 <div class="card"><h3>${ic('award', 18, '#8A6A05')}Chứng nhận tư vấn</h3><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:14px">${[['TD4C_GC_SP_01', 'Tủ đông 4 & 6 cánh', 1], ['TM2C_GC_SP_01', 'Tủ mát 2 & 3 cánh', 1], ['BC_GC_SP_01', 'Bàn chặt & salad', 1], ['TDTB_GC_KINHCONG_SP_01', 'Tủ đông trưng bày', 0], ['GW_GC_SP_01', 'GoldWash', 0]].map(([im, t, ok]) => `<div style="text-align:center;${ok ? '' : 'opacity:.5'}">${img(im, 999, 90, 10).replace('width:999px', 'width:100%')}<b class="xs" style="display:block;margin-top:6px">${t}</b><span class="chip ${ok ? 'ok' : 'gray'}" style="font-size:11px;margin-top:4px">${ok ? 'Đã chứng nhận' : 'Chưa đạt'}</span></div>`).join('')}</div><div class="sm muted" style="margin-top:12px">Có chứng nhận nhóm nào mới được nhận khách nhóm đó.</div></div>`);

/* ===== D10 Theo dõi đội học ===== */
S['D10_Theo_doi_doi_hoc'] = shell('hv', '', HUYEN, 'Học viện <span>/</span> <b>Theo dõi đội học</b>', `${head('Theo dõi đội học', 'Biết ai đang chậm để kèm kịp thời')}
 <div class="card" style="padding:0">${tbl(['Người học', 'Người kèm', 'Ngày', 'Chặng', 'Bài thi', 'Đóng vai', 'Tình trạng'], [['Nhân viên mới · NVKD4', 'Đoàn Thị Hồng Hà', '9/30', 'Chặng 2', '26/30 · Đạt', '3/5 nhóm', ['ok', 'Đúng tiến độ']], ['Đoàn Thị Hồng Hà', '—', 'Đã qua', 'Hoàn thành', '—', '4/5 · thiếu GoldWash', ['warn', 'Còn 1 chứng nhận']], ['Trần Thị Ánh', '—', 'Đã qua', 'Hoàn thành', '—', '5/5', ['ok', 'Đủ chứng nhận']], ['Trịnh Hải Yến', '—', 'Đã qua', 'Hoàn thành', '—', '3/5', ['warn', 'Thiếu trưng bày, GoldWash']]].map(([n, m, d, c, e, r, [k, s]]) => [`<div class="row" style="gap:8px">${av(ini(n), 26)}<b class="sm">${n}</b></div>`, `<span class="sm">${m}</span>`, `<span class="sm">${d}</span>`, `<span class="sm">${c}</span>`, `<span class="sm">${e}</span>`, `<span class="sm">${r}</span>`, `<span class="chip ${k}" style="font-size:11px">${s}</span>`]))}</div>
 <div class="src">${ic('info', 13)}Số liệu mẫu</div>`);

/* ===== D11 Quản lý nội dung Học viện ===== */
S['D11_Quan_ly_noi_dung'] = shell('hv', '', HUYEN, 'Học viện <span>/</span> <b>Quản lý nội dung</b>', `${head('Quản lý nội dung Học viện', 'Nội dung học luôn khớp sản phẩm và chính sách hiện hành', btn('Thêm bài học', 'pri', 'plus'))}
 <div class="card row" style="gap:14px;padding:14px 18px;border-color:#EFD98F;background:#FFFCF2">${ic('alert', 20, '#8A6A05')}<div style="flex:1"><b class="sm">2 bài cần cập nhật vì DNA vừa đổi</b><div class="xs muted">GoldWash (chờ chốt bảo hành) · Tủ đông 6 cánh (mã model chờ chốt)</div></div>${btn('Xem', 'sm')}</div>
 <div class="card" style="padding:0">${tbl(['Nội dung', 'Loại', 'Nguồn', 'Người phụ trách', 'Trạng thái'], [['Kịch bản tủ đông 4 & 6 cánh', 'Bài học', 'K.1, S.1, S.6', 'Chị Huyền', ['ok', 'Khớp DNA']], ['Tủ mát theo dung tích', 'Bài học', 'K.2, S.2', 'Chị Huyền', ['ok', 'Khớp DNA']], ['GoldWash: giải thích phiên bản', 'Bài học', 'K.5, S.7', 'Nguyễn Thị Lan', ['warn', 'Cần cập nhật']], ['Bộ 30 câu chặng 1', 'Bài thi', 'DNA phiên bản 2', 'Chị Huyền', ['ok', 'Khớp DNA']], ['6 tình huống đóng vai', 'Đóng vai', 'Hội thoại thật', 'Đoàn Thị Hồng Hà', ['ok', 'Đang dùng']], ['Tủ 6 cánh chỗ đặt hẹp', 'Đóng vai', 'S.6 bản nháp', 'Đoàn Thị Hồng Hà', ['warn', 'Cần cập nhật']]].map(([n, t, s, w, [k, st]]) => [`<b class="sm">${n}</b>`, `<span class="chip blue" style="font-size:11px">${t}</span>`, `<span class="sm muted">${s}</span>`, `<span class="sm">${w}</span>`, `<span class="chip ${k}" style="font-size:11px">${st}</span>`]))}</div>`);

module.exports = S;
