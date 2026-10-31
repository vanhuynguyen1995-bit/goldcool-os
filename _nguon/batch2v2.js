const { ic, side, top, page, lad, L, fridge } = require('./lib.js');
const S = {};
const fs = require('fs');
const ph = (f) => process.env.IMG_URL ? 'img/' + f + '.jpg' : 'data:image/jpeg;base64,' + fs.readFileSync(__dirname + '/img/web/' + f + '.jpg').toString('base64');
const img = (f, w, h, r = 8) => `<img src="${ph(f)}" style="width:${w}px;height:${h}px;object-fit:contain;background:#EEF2F6;border-radius:${r}px;display:block;flex:none">`;
const HUY = ['Nguyễn Văn Huy', 'Giám đốc', 'NH'];
const NEW = ['Nhân viên mới', 'Sales NVKD4 · ngày 9/30', 'N4'];
const HA = ['Đoàn Thị Hồng Hà', 'Sales · NVKD1', 'HH'];
const PRINC = ['Niềm tin lâu dài hơn doanh số trước mắt', 'Sản phẩm phù hợp hơn sản phẩm giá cao', 'Làm đúng trước, nhanh sau', 'Minh bạch khi có vấn đề'];
const av = (t, bg = '#DCE8F3', c = 'var(--navy)', s = 26) => `<span class="av" style="width:${s}px;height:${s}px;font-size:${s * .38}px;background:${bg};color:${c}">${t}</span>`;
const dotc = (c) => `<span class="dot" style="background:var(--${{ x: 'ok', v: 'gold', d: 'bad' }[c]})"></span>`;
const DEPTS = ['Kinh doanh & Marketing', 'Sản xuất – Vận hành', 'Kế toán', 'Khách hàng & Hậu mãi'];
const mobNav = (on) => `<nav style="position:absolute;left:0;right:0;bottom:0;height:72px;background:#fff;border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(5,1fr);padding:8px 4px 14px">
  ${[['home', 'Trang chủ'], ['users', 'Khách'], ['file', 'Báo cáo'], ['cap', 'Học'], ['user', 'Tôi']].map(([i, t]) => `<div class="col" style="align-items:center;gap:3px;font-size:11px;font-weight:600;color:${t === on ? 'var(--navy)' : '#8A94A3'}">${ic(i, 22, t === on ? 'var(--navy)' : '#8A94A3')}${t}${t === on ? '<span style="width:18px;height:3px;border-radius:2px;background:var(--gold)"></span>' : ''}</div>`).join('')}
 </nav>`;

// ============ 10 · BẢNG SỐ LIỆU GIÁM ĐỐC ============
S['10_Bang_so_lieu_Giam_doc'] = page(`<div class="app">${side({ mod: 'kpi', sub: 'Bảng số liệu', user: HUY })}<main class="main">
${top('Mục tiêu & KPI <span>/</span> <b>Bảng số liệu Giám đốc</b>', { user: 'NH' })}
<div class="content">
 <div class="row"><div><div class="h1">Chào anh Huy · Thứ 2, 02/11/2026</div><div class="sub1">Tuần 44 vừa qua · 4 phòng ban · bấm vào số bất kỳ để xem chi tiết</div></div><div class="sp row" style="gap:8px"><span class="btn">${ic('cal', 15)}Tuần 44 ${ic('chevD', 13)}</span><span class="btn">${ic('upload', 15)}Xuất báo cáo</span></div></div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
  ${[['chat', 'Khách mới L1 (MQL) tuần 44', '612', '+4% so với tuần 43', 'ok', 'up', 'AI Sales'], ['target', 'Khách đã tư vấn / báo giá L3', '96', '+8 khách', 'ok', 'up', 'AI Sales'], ['clock', 'Sales liên hệ khách mới ≤ 5 phút', '89%', '84/94 khách · lỡ nhiều nhất giờ nghỉ trưa', 'warn', '', 'AI Sales'], ['star', 'Việc chờ anh quyết', '3', 'mã tủ 6 cánh · bảo hành GoldWash · bảng giá', 'bad', '', 'Thẻ vấn đề']].map(([i, t, n, d, c, a, src]) => `<div class="card" style="padding:16px 18px;${c === 'bad' ? 'border-color:#EFD98F' : ''}"><div class="row xs muted" style="font-weight:600;gap:7px">${ic(i, 15, 'var(--navy)')}${t}</div><div style="font-size:32px;font-weight:800;letter-spacing:-.02em;margin:6px 0 4px;${c === 'bad' ? 'color:#8A6A05' : ''}">${n}</div><div class="row xs" style="gap:4px;color:var(--${c === 'bad' ? 'muted' : c})">${a ? ic(a, 13) : ''}${d}</div><div class="xs" style="color:#8A94A3;margin-top:8px">Từ ${src} · 08:00 hôm nay</div></div>`).join('')}
 </div>
 <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">
  <div class="card">
   <div class="row"><h3>Phễu L1 – L6 tuần 44</h3><span class="sp xs muted">tuần 43 ở vạch xám</span></div>
   <div style="margin-top:14px;display:flex;flex-direction:column;gap:9px">
    ${[['L1', 'MQL', 612, 588], ['L2', 'Đã kết nối', 241, 226], ['L3', 'Đã báo giá', 96, 88], ['L4', 'Tiềm năng', 58, 51], ['L5', 'Chốt đơn', 21, 19], ['L6', 'Chăm sóc', 19, 17]].map(([l, d, n, p], i) => `<div style="display:grid;grid-template-columns:24px 74px 1fr 34px;gap:8px;align-items:center"><b class="xs" style="color:var(--navy)">${l}</b><span class="xs muted">${d}</span><div style="position:relative;height:16px"><div style="height:16px;width:${Math.max(n / 612 * 100, 2)}%;background:var(--l${i + 1});border-radius:4px"></div><span style="position:absolute;top:-2px;left:${p / 612 * 100}%;width:2px;height:20px;background:#9AA5B4"></span></div><b class="sm" style="text-align:right">${n}</b></div>`).join('')}
   </div>
   <div class="row" style="margin-top:14px;gap:8px;flex-wrap:wrap"><span class="chip blue">L1 → L3: 15,7%</span><span class="chip goldc">L3 → L5: 21,9%</span></div>
  </div>
  <div class="card">
   <div class="row"><h3>Mục tiêu theo phòng ban</h3></div>
   <div style="margin-top:14px;display:flex;flex-direction:column;gap:12px">
    ${[[DEPTS[0], 2, 1, 0, 'Trưởng nhóm KD: đang tuyển'], [DEPTS[1], 2, 1, 0, 'Nguyễn Văn Chính'], [DEPTS[2], 2, 0, 0, 'Nguyễn Thị Út'], [DEPTS[3], 0, 1, 1, 'Trưởng phòng: đang tuyển']].map(([d, x, v, r, h]) => { const t = x + v + r; return `<div><div class="row sm"><b style="font-weight:600">${d}</b><span class="sp xs muted">${t} mục tiêu</span></div><div class="xs muted">${h}</div><div style="display:flex;height:10px;border-radius:5px;overflow:hidden;margin-top:6px;gap:2px">${x ? `<span style="flex:${x};background:var(--ok)"></span>` : ''}${v ? `<span style="flex:${v};background:var(--gold)"></span>` : ''}${r ? `<span style="flex:${r};background:var(--bad)"></span>` : ''}</div></div>`; }).join('')}
   </div>
   <div class="row xs muted" style="gap:14px;margin-top:14px">${dotc('x')}Đúng tiến độ 6${dotc('v')}Cần chú ý 3${dotc('d')}Trễ 1</div>
  </div>
  <div class="card">
   <div class="row"><h3>Nộp báo cáo tuần 44</h3><span class="sp chip warn">92%</span></div>
   <table class="tbl" style="margin-top:6px"><tbody>
    ${[['Ban giám đốc & HCNS', '2/2', 100], ['Kinh doanh & Marketing', '7/7', 100], ['Sản xuất – Vận hành', '7/8', 88], ['Kế toán', '3/3', 100], ['Khách hàng & Hậu mãi', '5/6', 83]].map(([d, n, p]) => `<tr><td style="padding:7px 0" class="sm">${d}</td><td style="padding:7px 8px;width:38%"><div class="bar" style="height:6px"><i style="width:${p}%;background:var(--${p === 100 ? 'ok' : 'gold'})"></i></div></td><td style="padding:7px 0;text-align:right" class="sm"><b>${n}</b></td></tr>`).join('')}
   </tbody></table>
   <div class="xs muted" style="margin-top:8px">2 người chưa nộp · chị Huyền (HCNS & Hệ thống) đã nhắc lúc 12:00 thứ 7</div>
  </div>
 </div>
 <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:18px">
  <div class="card" style="padding:0">
   <div class="row" style="padding:16px 18px 10px"><h3>${ic('alert', 17, 'var(--bad)')}Mục tiêu cần chú ý</h3><span class="sp btn sm">Mở cây mục tiêu${ic('chevR', 13)}</span></div>
   <table class="tbl"><thead><tr><th>Mục tiêu</th><th>Người phụ trách</th><th>Tiến độ</th><th>Thẻ vấn đề</th></tr></thead><tbody>
    ${[['100% đơn có ảnh nghiệm thu & kích hoạt bảo hành QR', 'Khách hàng & Hậu mãi', 'Nguyễn Mạnh Hùng', '87% / 100%', 'bad', 'Có · đang xử lý'], ['Sales liên hệ khách mới ≤ 5 phút', 'Kinh doanh & Marketing', 'Nguyễn Văn Huy (tạm)', '89% / 95%', 'warn', 'Có · đang xử lý'], ['Dữ liệu sản phẩm đủ cho AI ở cả 5 nhóm', 'Sản xuất – Vận hành', 'Nguyễn Văn Chính', '3 / 5 nhóm', 'warn', 'Chưa có']].map(([t, d, p, v, c, k]) => `<tr><td><b class="sm">${t}</b><div class="xs muted">${d}</div></td><td class="sm">${p}</td><td><span class="chip ${c}">${v}</span></td><td class="sm">${k === 'Chưa có' ? '<span class="need">' + ic('alert', 13) + 'Chưa có thẻ</span>' : k}</td></tr>`).join('')}
   </tbody></table>
  </div>
  <div class="col" style="gap:18px">
   <div class="card">
    <div class="row"><h3>Chờ anh quyết</h3><span class="sp chip warn">3</span></div>
    ${[['Chốt mã tủ đông 6 cánh trực tiếp: GCDT-1600 hay GCTD-1800L', 'Sản xuất – Vận hành · Nguyễn Văn Chính · 6 khách đã hỏi'], ['Thống nhất cách nói bảo hành GoldWash', 'Marketing · Nguyễn Thị Lan · 2 phương án'], ['Duyệt bảng giá bán lẻ và ngày hiệu lực', 'Kế toán · Trần Thị Thu Trang · 28 dòng giá']].map(([t, d]) => `<div class="row" style="gap:12px;margin-top:10px;padding:10px 12px;border:1px solid var(--line);border-radius:10px"><div style="flex:1"><b class="sm">${t}</b><div class="xs muted">${d}</div></div><span class="btn sm pri">Xem và quyết</span></div>`).join('')}
   </div>
   <div class="card" style="border-color:#CFE0EE">
    <div class="row"><h3>Trợ lý AI gợi ý</h3><span class="ai">${ic('spark', 10)}AI</span><span class="sp xs muted">AI gợi ý – anh quyết định</span></div>
    <ul class="sm" style="margin:10px 0 0 18px;display:flex;flex-direction:column;gap:6px">
     <li>7/10 khách chờ quá 5 phút rơi vào 12:00–13:30 → cân nhắc chia ca trực trưa</li>
     <li>2 vị trí trưởng (Trưởng nhóm KD, Trưởng phòng Hậu mãi) đang tuyển → mục tiêu của 2 phòng đang do anh phụ trách tạm</li>
     <li>1 khách L4 chưa có ngày follow-up → nhắc Sales bổ sung</li>
    </ul>
   </div>
  </div>
 </div>
 <div class="card" style="border-style:dashed;background:#FAFBFD">
  <div class="row"><h3 style="color:var(--muted)">${ic('db', 17, 'var(--muted)')}Tiền và hàng (bản 2)</h3><span class="chip gray">Chờ kết nối Zotech</span><span class="sp xs muted">Doanh thu bán lẻ / đại lý · công nợ · Nhập – Xuất – Tồn của Thủ kho sẽ hiện ở đây</span></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px">${['Doanh thu tháng 10', 'Công nợ quá hạn', 'Tồn kho theo 5 nhóm'].map(t => `<div style="border:1px dashed #C9D2DD;border-radius:10px;padding:14px"><div class="xs muted" style="font-weight:600">${t}</div><div style="height:12px;width:55%;background:#E9EEF3;border-radius:4px;margin-top:10px"></div><div style="height:8px;width:80%;background:#EFF2F6;border-radius:4px;margin-top:8px"></div></div>`).join('')}</div>
 </div>
</div></main></div>`);

// ============ 11 · CÂY MỤC TIÊU ============
const gnode = (t, who, v, p, c, w = 300, par = '') => `<div class="card" style="padding:12px 14px;width:${w}px">${par ? `<div class="row xs" style="gap:5px;color:var(--navy);font-weight:600;margin-bottom:6px">${ic('up', 12)}Nối lên ${par}</div>` : ''}<div class="row" style="gap:8px;align-items:flex-start"><b class="sm" style="flex:1">${t}</b>${dotc(c)}</div><div class="row xs muted" style="margin-top:6px;gap:6px">${av(who.split(' ')[0][0] + who.split(' ').filter(x => !x.startsWith('(')).slice(-1)[0][0], '#E8F1F8', 'var(--navy)', 20)}${who}<span class="sp"><b style="color:var(--ink)">${v}</b></span></div><div class="bar" style="height:6px;margin-top:8px"><i style="width:${p}%;background:var(--${{ x: 'ok', v: 'gold', d: 'bad' }[c]})"></i></div></div>`;
const num = (n) => `<span class="chip" style="background:var(--navy);color:#fff;font-size:11px;margin-right:6px">${n}</span>`;
S['11_Cay_muc_tieu'] = page(`<div class="app">${side({ mod: 'kpi', sub: 'Cây mục tiêu', user: HUY })}<main class="main">
${top('Mục tiêu & KPI <span>/</span> <b>Cây mục tiêu</b>', { user: 'NH' })}
<div class="content">
 <div class="row"><div><div class="h1">Cây mục tiêu</div><div class="sub1">Mục tiêu cá nhân nối lên mục tiêu phòng ban và mục tiêu công ty. Mục tiêu do Giám đốc chốt.</div></div>
  <div class="sp row" style="gap:8px"><span class="btn">${ic('cal', 15)}Quý 4/2026 ${ic('chevD', 13)}</span><span class="btn">${ic('filter', 15)}4 phòng ban</span><span class="btn pri">${ic('plus', 15)}Đề xuất mục tiêu</span></div></div>
 <div class="card row" style="gap:16px;background:var(--navy);border-color:var(--navy);color:#fff;padding:16px 20px">
  <div style="width:42px;height:42px;border-radius:11px;background:var(--gold);display:grid;place-items:center">${ic('star', 21, '#1A1F2B')}</div>
  <div><div class="xs" style="color:#B9CCDE;font-weight:600;letter-spacing:.04em">DNA GOLDCOOL · chỉ đọc</div><b style="font-size:15.5px">CHỌN ĐÚNG – DÙNG LÂU · Lạnh sâu – Bền lâu – Tiết kiệm điện</b><div class="xs" style="color:#B9CCDE;margin-top:2px">Bán bằng sự am hiểu · Tạo niềm tin bằng chất lượng · Giữ khách hàng bằng trách nhiệm</div></div>
 </div>
 <div class="row xs muted" style="gap:16px">${dotc('x')}Đúng tiến độ${dotc('v')}Cần chú ý${dotc('d')}Trễ hoặc quá hạn<span class="row" style="gap:5px"><span style="width:14px;height:10px;border:1.5px dashed #9AA5B4;border-radius:3px"></span>Chờ có người / chờ duyệt</span></div>
 <div>
  <div class="lbl" style="margin:0">CÔNG TY · QUÝ 4/2026</div>
  <div class="row" style="gap:18px;margin-top:8px;align-items:stretch">
   ${gnode(num(1) + 'AI Sales chạy đúng 5 kịch bản, Sales liên hệ khách mới ≤ 5 phút', 'Nguyễn Văn Huy', '89% ≤ 5 phút', 89, 'v', 360)}
   ${gnode(num(2) + '100% đơn có ảnh nghiệm thu, serial / QR và kích hoạt bảo hành', 'Nguyễn Văn Huy', '87% / 100%', 87, 'd', 360)}
   ${gnode(num(3) + '100% khách L6 được chăm sóc đúng mốc, mỗi Sales 3 feedback / tuần', 'Nguyễn Văn Huy', '8 / 9 feedback', 89, 'x', 360)}
  </div>
  <div class="lbl" style="margin:22px 0 0">PHÒNG BAN · QUÝ 4/2026</div>
  <div style="display:grid;grid-template-columns:repeat(3,360px);gap:18px;margin-top:8px">
   <div class="col" style="gap:10px">
    ${gnode('KD & MKT: Sales liên hệ ≤ 5 phút, tối thiểu 3 lần với khách L1', 'Nguyễn Văn Huy (tạm)', '89% / 95%', 89, 'v', 360, 'mục tiêu 1')}
    ${gnode('SX – VH: dữ liệu sản phẩm đủ cho AI ở cả 5 nhóm', 'Nguyễn Văn Chính', '3 / 5 nhóm', 60, 'v', 360, 'mục tiêu 1')}
   </div>
   <div class="col" style="gap:10px">
    ${gnode('Hậu mãi: 100% đơn có ảnh nghiệm thu', 'Nguyễn Mạnh Hùng', '87% / 100%', 87, 'd', 360, 'mục tiêu 2')}
    ${gnode('Kho: 100% phiếu xuất có serial / QR', 'Đỗ Huyền Thanh', '100%', 100, 'x', 360, 'mục tiêu 2')}
   </div>
   <div class="col" style="gap:10px">
    ${gnode('Marketing: thư viện 2–3 feedback đã xác thực cho mỗi nhóm', 'Nguyễn Thị Lan', '4 / 5 nhóm', 80, 'x', 360, 'mục tiêu 3')}
    ${gnode('Kế toán: xác nhận cọc / đơn L5 trong ngày', 'Trần Thị Thu Trang', '21 / 21 đơn', 100, 'x', 360, 'mục tiêu 3')}
   </div>
  </div>
  <div class="lbl" style="margin:22px 0 0">CÁ NHÂN · mở rộng từ “KD & MKT: Sales liên hệ ≤ 5 phút”</div>
  <div class="row" style="gap:18px;margin-top:8px">
   ${gnode('Liên hệ khách mới ≤ 5 phút', 'Đoàn Thị Hồng Hà', '92%', 92, 'x', 272, 'KD & MKT')}
   ${gnode('Liên hệ khách mới ≤ 5 phút', 'Trần Thị Ánh', '90%', 90, 'v', 272, 'KD & MKT')}
   ${gnode('Liên hệ khách mới ≤ 5 phút', 'Trịnh Hải Yến', '84%', 84, 'v', 272, 'KD & MKT')}
   <div class="card" style="padding:12px 14px;width:272px;border:1.5px dashed #9AA5B4;background:#FAFBFD"><div class="row"><b class="sm" style="flex:1">NVKD4 – NVKD6</b><span class="chip gray" style="font-size:11px">Đang tuyển</span></div><div class="xs muted" style="margin-top:6px">Mục tiêu tự tạo khi có người và qua chặng 1 Học viện</div></div>
  </div>
 </div>
 <div class="src">${ic('info', 13)}Mục tiêu theo chuẩn L1–L6 và DNA phiên bản 2 · con số là dữ liệu mẫu · tự cập nhật từ AI Sales, Zotech, Học viện lúc 06:00</div>
</div></main></div>`);

// ============ 12 · BÁO CÁO TUẦN (ĐIỆN THOẠI) ============
const qcard = (n, t, body, ok = true) => `<div class="card" style="padding:14px"><div class="row" style="gap:9px"><span style="width:24px;height:24px;border-radius:50%;background:${ok ? 'var(--ok)' : '#E3E8EF'};color:#fff;display:grid;place-items:center;flex:none">${ok ? ic('check', 13, '#fff', 2.4) : `<b style="color:var(--muted);font-size:12px">${n}</b>`}</span><b style="font-size:14.5px">${t}</b></div><div style="margin-top:10px">${body}</div></div>`;
S['12_Bao_cao_tuan_dien_thoai'] = page(`<div style="width:390px;background:var(--bg);min-height:844px;position:relative;padding-bottom:150px">
 <div style="background:var(--navy);color:#fff;padding:14px 18px 18px">
  <div class="row xs" style="color:#B9CCDE;justify-content:space-between"><span>9:30</span><span class="mock" style="color:#B9CCDE;border-color:#41678C">Bản thiết kế · dữ liệu mẫu</span></div>
  <div class="row" style="margin-top:12px;gap:10px">${ic('chevL', 22, '#fff')}<div><div style="font-size:20px;font-weight:700">Báo cáo tuần 45</div><div class="xs" style="color:#B9CCDE">02/11 – 07/11/2026 · Đoàn Thị Hồng Hà</div></div></div>
  <div style="margin-top:14px;background:rgba(255,255,255,.1);border-radius:10px;padding:10px 12px" class="row">${ic('clock', 18, '#E6C35C')}<div><b style="font-size:14px">Hạn 12:00 hôm nay (thứ 7)</b><div class="xs" style="color:#B9CCDE">còn 2 giờ 30 phút</div></div><span class="sp chip" style="background:var(--gold);color:#1A1F2B">5/5 câu</span></div>
 </div>
 <div style="padding:14px;display:flex;flex-direction:column;gap:12px">
  <div class="card" style="padding:12px 14px;border-color:#CFE0EE"><div class="row xs muted" style="gap:6px"><span class="ai">${ic('spark', 10)}AI điền sẵn</span>số liệu từ AI Sales · chị kiểm tra lại</div>
   <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px;text-align:center">${[['34', 'khách nhận'], ['3 phút', 'liên hệ TB'], ['5', 'lên L5']].map(([n, t]) => `<div style="background:var(--ice);border-radius:8px;padding:8px 4px"><b style="font-size:16px;color:var(--navy)">${n}</b><div class="xs muted">${t}</div></div>`).join('')}</div></div>
  ${qcard(1, 'Tuần này đạt kết quả gì?', `<div class="sm">5 đơn được Kế toán xác nhận cọc (3 tủ đông 4 cánh, 2 tủ mát bàn chặt 1,5 m). Liên hệ 33/34 khách mới trong ≤ 5 phút. Thu 3 feedback L6.</div><div class="lbl" style="margin:10px 0 6px">Bằng chứng (bắt buộc khi có số)</div><div class="row" style="gap:8px;flex-wrap:wrap"><span class="chip blue" style="padding:5px 10px">${ic('check', 13)}Xác nhận của Kế toán · 5</span><span class="chip blue" style="padding:5px 10px">${ic('play', 13)}Feedback · 3</span><span class="chip gray" style="padding:5px 10px">${ic('plus', 13)}Thêm</span></div>`)}
  ${qcard(2, 'Tuần tới làm gì?', '<div class="sm">Follow-up 3 khách L4 đúng ngày hẹn; chăm sóc mốc 30 ngày cho 2 khách tháng 10; luyện đóng vai GoldWash để đủ chứng nhận.</div>')}
  ${qcard(3, 'Đang vướng gì?', '<div class="sm">Chị Trang (quán lẩu Hà Đông) hỏi ngày giao tủ 4 cánh quạt gió, chưa có xác nhận tồn kho nên chưa hẹn được.</div>')}
  ${qcard(4, 'Cần ai hỗ trợ?', `<div class="row" style="gap:8px;flex-wrap:wrap"><span class="chip blue" style="padding:4px 10px 4px 4px">${av('ĐT', '#fff', 'var(--navy)', 22)}Đỗ Huyền Thanh · Thủ kho</span><span class="chip gray" style="padding:4px 10px">${ic('plus', 12)}Chọn người</span></div><div class="xs muted" style="margin-top:6px">Chị Thanh nhận thông báo khi chị nộp báo cáo</div>`)}
  ${qcard(5, 'Một việc chị đã làm đúng DNA', `<div class="row" style="gap:6px;flex-wrap:wrap">${PRINC.map((v, i) => `<span class="chip ${i === 1 ? 'goldc' : 'gray'}" style="padding:4px 10px;${i === 1 ? 'outline:1.5px solid var(--gold)' : ''}">${i === 1 ? ic('check', 12) : ''}${v}</span>`).join('')}</div><div class="field sm" style="margin-top:10px">Khách quán nướng hỏi tủ đông 6 cánh nhưng chỗ đặt chỉ dài 1,3 m. Em tư vấn tủ 4 cánh vừa chỗ, khách dùng được và đầu tư thấp hơn.</div>`)}
 </div>
 <div style="position:absolute;left:0;right:0;bottom:72px;padding:12px 14px;background:linear-gradient(0deg,var(--bg) 70%,rgba(244,247,250,0))"><span class="btn pri" style="width:100%;height:50px;font-size:15px">${ic('send', 17)}Nộp báo cáo tuần 45</span></div>
 ${mobNav('Báo cáo')}
</div>`, 'body{width:390px}');

// ============ 13 · BẢNG THẺ VẤN ĐỀ ============
const kcard = (t, dept, who, ini, due, opt = {}) => `<div class="card" style="padding:12px 14px;${opt.red ? 'border-color:#F0C3BC;box-shadow:inset 3px 0 0 var(--bad)' : ''}">
 <div class="row" style="gap:6px;flex-wrap:wrap"><span class="chip gray" style="font-size:11px">${dept}</span>${opt.gd ? `<span class="chip goldc" style="font-size:11px">${ic('star', 11)}Cần Giám đốc quyết</span>` : ''}${opt.ev ? `<span class="chip ok" style="font-size:11px">${ic('check', 11)}Có bằng chứng</span>` : ''}</div>
 <b class="sm" style="display:block;margin-top:8px">${t}</b>
 ${opt.goal ? `<div class="xs muted row" style="gap:5px;margin-top:5px">${ic('target', 12)}${opt.goal}</div>` : ''}
 <div class="row" style="margin-top:10px;gap:6px;flex-wrap:wrap">${av(ini, '#E8F1F8', 'var(--navy)', 22)}<span class="xs" style="white-space:nowrap">${who}</span><span class="sp chip ${opt.red ? 'bad' : 'gray'}" style="font-size:11px">${ic(opt.red ? 'alert' : 'cal', 11)}${due}</span></div>
 ${opt.step ? `<div class="row xs muted" style="margin-top:8px;gap:6px">${[1, 2, 3, 4, 5, 6, 7].map(i => `<span style="width:16px;height:4px;border-radius:2px;background:${i <= opt.step ? 'var(--navy)' : '#E3E8EF'}"></span>`).join('')}<span class="sp">${opt.step}/7 ô</span></div>` : ''}
</div>`;
const kcol = (t, n, c, cards) => `<div style="background:#EEF2F6;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:10px"><div class="row"><span class="dot" style="background:${c}"></span><b class="sm">${t}</b><span class="chip gray" style="font-size:11px;background:#fff">${n}</span><span class="sp">${ic('plus', 16, 'var(--muted)')}</span></div>${cards.join('')}</div>`;
S['13_Bang_the_van_de'] = page(`<div class="app">${side({ mod: 'kpi', sub: 'Thẻ vấn đề', user: HUY })}<main class="main">
${top('Mục tiêu & KPI <span>/</span> <b>Thẻ vấn đề</b>', { user: 'NH' })}
<div class="content">
 <div class="row"><div><div class="h1">Thẻ vấn đề</div><div class="sub1">Minh bạch khi có vấn đề: báo kèm nguyên nhân và phương án. Thẻ chỉ đóng được khi có bằng chứng hoàn thành.</div></div><span class="sp btn pri">${ic('plus', 15)}Báo vấn đề</span></div>
 <div class="row" style="gap:8px;flex-wrap:wrap"><span class="chip" style="background:var(--navy);color:#fff;padding:5px 12px">Tất cả</span>${DEPTS.map(t => `<span class="chip gray" style="padding:5px 12px">${t}</span>`).join('')}<span class="chip bad" style="padding:5px 12px">${ic('alert', 12)}Quá hạn 1</span><span class="chip goldc" style="padding:5px 12px">${ic('star', 12)}Chờ Giám đốc 2</span></div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;align-items:start">
  ${kcol('Mới', 2, '#9AA5B4', [
    kcard('Mã tủ đông 6 cánh trực tiếp chưa thống nhất: GCDT-1600 / GCTD-1800L', 'SX – VH', 'Nguyễn Văn Chính', 'NC', 'Hạn 06/11', { step: 4, gd: 1, goal: 'Dữ liệu sản phẩm đủ cho AI' }),
    kcard('Website đại lý vẫn ghi bảo hành 12 tháng cho tủ GoldCool', 'KD & MKT', 'Đạt · Website', 'Đ', 'Hạn 08/11', { step: 3, goal: 'Thông tin chuẩn trên mọi kênh' }),
  ])}
  ${kcol('Đang xử lý', 3, 'var(--navy)', [
    kcard('Khách nhắn giờ nghỉ trưa chờ Sales quá 5 phút', 'KD & MKT', 'Đoàn Thị Hồng Hà', 'HH', 'Quá hạn 01/11', { red: 1, step: 6, goal: 'Sales liên hệ ≤ 5 phút' }),
    kcard('Thiếu ảnh và feedback đã xác thực cho tủ đông 6 cánh', 'KD & MKT', 'Nguyễn Thị Lan', 'NL', 'Hạn 05/11', { step: 6, goal: 'Thư viện feedback 5 nhóm' }),
    kcard('Bổ sung mã model mẫu rẻ vào bảng giá', 'SX – VH', 'Nguyễn Văn Chính', 'NC', 'Hạn 07/11', { step: 5, goal: 'Dữ liệu sản phẩm đủ cho AI' }),
  ])}
  ${kcol('Chờ duyệt', 2, 'var(--gold)', [
    kcard('Thống nhất cách nói bảo hành GoldWash', 'KD & MKT', 'Nguyễn Thị Lan', 'NL', 'Hạn 10/11', { gd: 1, step: 6, goal: 'Dữ liệu sản phẩm đủ cho AI' }),
    kcard('Duyệt bảng giá bán lẻ và ngày hiệu lực', 'Kế toán', 'Trần Thị Thu Trang', 'TT', 'Hạn 04/11', { gd: 1, step: 6, goal: 'AI Sales chạy đúng 5 kịch bản' }),
  ])}
  ${kcol('Đã đóng tuần này', 2, 'var(--ok)', [
    kcard('Xác nhận giá bán lẻ đã gồm VAT, chưa gồm vận chuyển', 'Ban giám đốc', 'Nguyễn Văn Huy', 'NH', 'Đóng 31/10', { ev: 1, step: 7 }),
    kcard('Ban hành chuẩn phễu L1–L6 cho AI và Sales', 'HCNS & Hệ thống', 'Chị Huyền', 'H', 'Đóng 31/10', { ev: 1, step: 7 }),
  ])}
 </div>
 <div class="note">${ic('info', 17, '#8A6A05')}<div><b>7 ô bắt buộc của một thẻ:</b> Vấn đề → Nguyên nhân → Phương án → Kết quả cần đạt → Người làm → Hạn → Bằng chứng hoàn thành. Thẻ quá hạn tự chuyển đỏ và hiện trên Bảng số liệu Giám đốc.</div></div>
</div></main></div>`);

// ============ 14 · CHI TIẾT THẺ VẤN ĐỀ 7 BƯỚC ============
const st7 = (n, t, body, done = true) => `<div class="row" style="align-items:flex-start;gap:14px;position:relative;padding-bottom:16px">
 <div class="col" style="align-items:center;align-self:stretch"><span style="width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:13px;flex:none;${done ? 'background:var(--navy);color:#fff' : 'background:#fff;border:2px dashed #C4CDD8;color:var(--muted)'}">${n}</span>${n < 7 ? '<span style="flex:1;width:2px;background:#E3E8EF;margin-top:4px"></span>' : ''}</div>
 <div style="flex:1"><div class="lbl" style="margin-bottom:5px;color:var(--ink);font-size:13px">${t}</div>${body}</div></div>`;
S['14_Chi_tiet_the_van_de_7_buoc'] = page(`<div class="app">${side({ mod: 'kpi', sub: 'Thẻ vấn đề', user: HUY })}<main class="main">
${top('Mục tiêu & KPI <span>/</span> Thẻ vấn đề <span>/</span> <b>VD-1107</b>', { user: 'NH' })}
<div class="content">
 <div class="row" style="align-items:flex-start"><div><div class="row" style="gap:8px"><span class="chip warn">Chờ duyệt</span><span class="chip goldc">${ic('star', 12)}Cần Giám đốc quyết</span><span class="chip gray">Kinh doanh & Marketing</span></div><div class="h1" style="margin-top:8px">Thống nhất cách nói bảo hành GoldWash</div><div class="sub1">Tạo bởi Nguyễn Thị Lan · 31/10/2026 · gắn với mục tiêu “SX – VH: dữ liệu sản phẩm đủ cho AI ở cả 5 nhóm”</div></div></div>
 <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:18px">
  <div class="card" style="padding:20px 22px">
   ${st7(1, 'Vấn đề', '<div class="field sm">Kịch bản AI GoldWash ghi “bảo hành 24 tháng”, còn kịch bản Sales GoldWash ghi “linh kiện 2 năm, inox 5 năm”. Tuần 44 có 5 khách hỏi bảo hành, AI phải chuyển Sales vì hai tài liệu không khớp.</div>')}
   ${st7(2, 'Nguyên nhân', '<div class="field sm">Hai tài liệu soạn ở hai thời điểm khác nhau, chưa có người chốt một cách nói chung cho AI, Sales, website và phiếu bảo hành.</div>')}
   ${st7(3, 'Phương án', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
     ${[['A', '“Bảo hành 24 tháng”', 'Ngắn gọn, khớp với tủ đông, tủ mát', 'Không nói được ưu điểm thân inox'], ['B', '“Linh kiện 2 năm, thân inox 5 năm”', 'Rõ phạm vi, nêu được độ bền inox', 'Phải sửa kịch bản AI, website, phiếu bảo hành']].map(([k, t, u, n]) => `<div style="border:1px solid var(--line);border-radius:10px;padding:12px"><span class="chip blue">Phương án ${k}</span><b class="sm" style="display:block;margin:8px 0 6px">${t}</b><div class="xs row" style="gap:5px;color:var(--ok)">${ic('check', 12)}${u}</div><div class="xs row" style="gap:5px;color:var(--warn);margin-top:3px">${ic('alert', 12)}${n}</div></div>`).join('')}</div>`)}
   ${st7(4, 'Kết quả cần đạt', '<div class="field sm">Một cách nói bảo hành GoldWash duy nhất trên kịch bản AI (K.5), kịch bản Sales (S.7), website và phiếu bảo hành.</div>')}
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 18px">
    ${st7(5, 'Người làm', `<div class="field sm row" style="gap:8px">${av('NL', '#E8F1F8', 'var(--navy)', 22)}Nguyễn Thị Lan · Content</div>`)}
    ${st7(6, 'Hạn', `<div class="field sm row" style="gap:8px">${ic('cal', 15, 'var(--muted)')}10/11/2026</div>`)}
   </div>
   ${st7(7, 'Bằng chứng hoàn thành', `<div class="field sm row muted" style="gap:8px;border-style:dashed">${ic('upload', 15)}Chưa có – bắt buộc khi đóng thẻ (ảnh chụp kịch bản K.5, S.7 và trang website đã sửa)</div>`, false)}
  </div>
  <div class="col" style="gap:18px">
   <div class="card" style="border:1.5px solid var(--gold);background:#FFFDF6">
    <h3>${ic('star', 17, '#8A6A05')}Cần anh quyết định</h3>
    <div class="sm" style="margin-top:8px">Chọn cách nói bảo hành GoldWash áp dụng cho mọi kênh?</div>
    <div class="col" style="gap:8px;margin-top:14px">
     <span class="btn pri" style="justify-content:flex-start">${ic('check', 15)}Phương án A – bảo hành 24 tháng</span>
     <span class="btn" style="justify-content:flex-start">${ic('check', 15)}Phương án B – linh kiện 2 năm, inox 5 năm</span>
     <span class="btn" style="justify-content:flex-start">${ic('chat', 15)}Yêu cầu thêm thông tin</span>
    </div>
    <div class="row sm" style="gap:8px;margin-top:14px"><span style="width:18px;height:18px;border-radius:5px;background:var(--navy);display:grid;place-items:center">${ic('check', 12, '#fff', 2.6)}</span>Ghi vào Thư viện quyết định và cập nhật DNA</div>
   </div>
   <div class="card">
    <h3>Trao đổi</h3>
    ${[['NL', 'Nguyễn Thị Lan', '31/10 15:20', 'Em cần một câu chốt để sửa kịch bản AI, ảnh feedback và bài đăng GoldWash.'], ['MH', 'Nguyễn Mạnh Hùng', '31/10 16:05', 'Kỹ thuật cần biết rõ phạm vi bảo hành inox để xử lý khi khách gọi bảo hành.'], ['Đ', 'Đạt · Website', '01/11 08:40', 'Anh chốt xong em sửa trang GoldWash trên website trong ngày.']].map(([a, n, t, m]) => `<div class="row" style="gap:10px;align-items:flex-start;margin-top:12px">${av(a, '#E8F1F8', 'var(--navy)', 28)}<div style="flex:1"><div class="xs"><b>${n}</b> <span class="muted">· ${t}</span></div><div class="sm" style="margin-top:2px">${m}</div></div></div>`).join('')}
    <div class="field xs muted" style="margin-top:14px">Viết trao đổi…</div>
   </div>
   <div class="card">
    <div class="row"><h3>Mục tiêu liên quan</h3>${dotc('v')}</div>
    <div class="sm" style="margin-top:8px"><b>SX – VH: dữ liệu sản phẩm đủ cho AI ở cả 5 nhóm</b></div>
    <div class="row xs muted" style="margin:6px 0 7px">3 / 5 nhóm · thiếu GoldWash, tủ đông 6 cánh<span class="sp chip warn" style="font-size:11px">Cần chú ý</span></div>
    <div class="bar"><i style="width:60%;background:var(--gold)"></i></div>
   </div>
  </div>
 </div>
</div></main></div>`);

// ============ 15 · HÔM NAY HỌC GÌ (ĐIỆN THOẠI) ============
S['15_Hom_nay_hoc_gi_dien_thoai'] = page(`<div style="width:390px;background:var(--bg);min-height:844px;position:relative;padding-bottom:84px">
 <div style="background:var(--navy);color:#fff;padding:14px 18px 20px">
  <div class="row xs" style="color:#B9CCDE;justify-content:space-between"><span>8:05</span><span class="mock" style="color:#B9CCDE;border-color:#41678C">Bản thiết kế · dữ liệu mẫu</span></div>
  <div style="margin-top:12px"><div class="xs" style="color:#E6C35C;font-weight:700;letter-spacing:.05em">HỌC VIỆN GOLDCOOL</div><div style="font-size:21px;font-weight:700;margin-top:2px">Chào bạn, ngày 9/30</div><div class="xs" style="color:#B9CCDE">Sales mới NVKD4 · Thứ 2, 02/11</div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1.6fr;gap:4px;margin-top:16px">${[['Chặng 1', 'Sản phẩm & giá', 'done'], ['Chặng 2', 'Kịch bản 5 nhóm', 'on'], ['Chặng 3', 'Nhận khách thật', 'lock']].map(([t, d, s]) => `<div><div style="height:6px;border-radius:3px;background:${s === 'done' ? 'var(--gold)' : s === 'on' ? 'linear-gradient(90deg,var(--gold) 60%,rgba(255,255,255,.2) 60%)' : 'rgba(255,255,255,.2)'}"></div><div class="xs" style="margin-top:6px;color:${s === 'lock' ? '#7F9BB6' : '#fff'};font-weight:600">${s === 'done' ? '✓ ' : ''}${t}</div><div class="xs" style="color:#8FA8C0">${d}</div></div>`).join('')}</div>
 </div>
 <div style="padding:14px;display:flex;flex-direction:column;gap:12px">
  <div class="card" style="padding:14px"><div class="xs muted" style="font-weight:600">CHẶNG 2 · KỊCH BẢN SALES THEO 5 NHÓM</div><b style="display:block;margin-top:4px">Điều kiện qua chặng: đóng vai đạt cả 5 nhóm sản phẩm</b>
   <div class="col" style="gap:7px;margin-top:10px">${[['Tủ đông 4 & 6 cánh', 1], ['Tủ mát 2 & 3 cánh', 1], ['Tủ bàn chặt & tủ salad', 1], ['Tủ đông trưng bày', 0], ['GoldWash', 0]].map(([t, d]) => `<div class="row sm" style="gap:8px">${d ? ic('checkc', 17, 'var(--ok)') : '<span style="width:17px;height:17px;border-radius:50%;border:2px solid #C4CDD8;flex:none"></span>'}<span style="${d ? '' : 'color:var(--muted)'}">${t}</span>${d ? '<span class="sp xs muted">Đạt</span>' : ''}</div>`).join('')}</div>
   <div class="bar" style="margin-top:12px"><i style="width:60%;background:var(--gold)"></i></div><div class="xs muted" style="margin-top:5px">3/5 nhóm</div></div>
  <div class="row" style="margin-top:2px"><b style="font-size:15px">Việc hôm nay</b><span class="sp xs muted">3 việc · khoảng 25 phút</span></div>
  ${[['play', 'Bài học', 'Nhận khách L3 từ AI: đọc bản bàn giao, không hỏi lại', '5 phút · nguồn: kịch bản Sales S.1', 1], ['play', 'Bài học', 'Tủ đông trưng bày: giải thích phiên bản, hỏi kích thước', '6 phút · nguồn: kịch bản K.4 và S.5', 0], ['chat', 'Luyện đóng vai', 'Chủ quán kem hỏi tủ đông trưng bày 1,5 m', 'Nhóm Tủ đông trưng bày · độ khó Vừa · 15 phút', 0]].map(([i, k, t, d, done]) => `<div class="card row" style="padding:12px 14px;gap:12px"><div style="width:44px;height:44px;border-radius:11px;flex:none;display:grid;place-items:center;${done ? 'background:var(--oks)' : k === 'Luyện đóng vai' ? 'background:var(--goldsoft)' : 'background:var(--ice)'}">${done ? ic('check', 20, 'var(--ok)', 2.2) : k === 'Luyện đóng vai' ? img('TDTB_GC_KINHCONG_SP_01', 44, 44, 11) : ic(i, 19, 'var(--navy)')}</div><div style="flex:1;min-width:0"><div class="xs muted" style="font-weight:600">${k}${done ? ' · đã xong' : ''}</div><b class="sm" style="${done ? 'color:var(--muted);text-decoration:line-through' : ''}">${t}</b><div class="xs muted">${d}</div></div>${done ? '' : ic('chevR', 18, 'var(--muted)')}</div>`).join('')}
  <span class="btn pri" style="height:48px;font-size:15px">${ic('play', 16)}Học tiếp: tủ đông trưng bày</span>
  <div class="card row" style="padding:12px 14px;gap:12px">${av('HH', '#2A5A85', '#fff', 38)}<div style="flex:1"><div class="xs muted">Người kèm cặp</div><b class="sm">Đoàn Thị Hồng Hà · NVKD1</b></div><span class="btn sm">${ic('chat', 14)}Nhắn</span></div>
 </div>
 ${mobNav('Học')}
</div>`, 'body{width:390px}');

// ============ 16 · LÀM BÀI THI ============
const answered = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
S['16_Lam_bai_thi'] = page(`<div class="app">${side({ mod: 'hv', sub: 'Bài thi', user: NEW, mode: false })}<main class="main">
${top('Học viện <span>/</span> Bài thi <span>/</span> <b>Chặng 1 – Sản phẩm, giá và kịch bản</b>', { user: 'N4', bell: 0 })}
<div class="content">
 <div class="card row" style="padding:14px 20px;gap:18px">
  <div><b style="font-size:16px">Bài thi chặng 1 · Sản phẩm, giá và kịch bản</b><div class="xs muted">30 câu · 30 phút · đạt khi đúng từ 80% (24/30) · trượt được thi lại sau 24 giờ</div></div>
  <div class="sp row" style="gap:12px"><div style="width:220px"><div class="row xs muted" style="margin-bottom:5px">Đã làm<b class="sp" style="color:var(--ink)">12/30</b></div><div class="bar"><i style="width:40%;background:var(--navy)"></i></div></div>
  <div class="row" style="gap:8px;background:var(--ice);border-radius:10px;padding:8px 14px">${ic('clock', 20, 'var(--navy)')}<b style="font-size:22px;color:var(--navy);font-variant-numeric:tabular-nums">18:42</b></div></div>
 </div>
 <div style="display:grid;grid-template-columns:1fr 320px;gap:18px">
  <div class="card" style="padding:26px 30px">
   <div class="row"><span class="chip blue">Câu 12 / 30</span><span class="chip gray">Kịch bản · Tủ đông 4 & 6 cánh (K.1)</span><span class="sp btn sm">${ic('star', 13)}Đánh dấu xem lại</span></div>
   <div class="row" style="gap:18px;margin-top:18px;align-items:flex-start">${img('TD4C_GC_SP_01', 110, 110, 10)}<div style="font-size:19px;font-weight:600;line-height:1.5;flex:1">Khách nhắn: “Quán nướng anh cần tủ đông 4 cánh, giá sao em?”. Khách đã nói mô hình. Theo kịch bản, bước tiếp theo đúng là gì?</div></div>
   <div class="col" style="gap:12px;margin-top:22px">
    ${[['A', 'Hỏi lại khách đang dùng tủ cho mô hình quán gì'], ['B', 'Giải thích 2 hình thức làm lạnh: trực tiếp và quạt gió'], ['C', 'Báo ngay mẫu rẻ 12.500.000đ để khách dễ chốt'], ['D', 'Chuyển Sales ngay vì khách đã hỏi giá']].map(([k, t]) => `<div class="row" style="gap:14px;padding:15px 18px;border-radius:12px;border:${k === 'B' ? '2px solid var(--navy);background:var(--ice)' : '1.5px solid var(--line);background:#fff'}"><span style="width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-weight:700;flex:none;${k === 'B' ? 'background:var(--navy);color:#fff' : 'background:var(--grays);color:var(--muted)'}">${k}</span><span style="font-size:15px;${k === 'B' ? 'font-weight:600' : ''}">${t}</span>${k === 'B' ? `<span class="sp xs" style="color:var(--navy);font-weight:600">Đã chọn</span>` : ''}</div>`).join('')}
   </div>
   <div class="row" style="margin-top:26px"><span class="btn">${ic('chevL', 15)}Câu trước</span><span class="sp xs muted">Đáp án và giải thích hiện sau khi nộp bài</span><span class="sp btn nv">Câu sau${ic('chevR', 15)}</span></div>
  </div>
  <div class="col" style="gap:18px">
   <div class="card">
    <h3>Bảng câu hỏi</h3>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin-top:14px">
     ${Array.from({ length: 30 }, (_, i) => i + 1).map(n => `<span style="height:36px;border-radius:8px;display:grid;place-items:center;font-size:13px;font-weight:600;position:relative;${n === 12 ? 'background:var(--navy);color:#fff' : answered.has(n) ? 'background:var(--ice);color:var(--navy)' : 'border:1.5px solid var(--line);color:var(--muted)'}">${n}${n === 7 ? '<span style="position:absolute;top:-4px;right:-4px;width:10px;height:10px;border-radius:50%;background:var(--gold);border:2px solid #fff"></span>' : ''}</span>`).join('')}
    </div>
    <div class="col xs muted" style="gap:6px;margin-top:14px">
     <div class="row" style="gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:var(--ice)"></span>Đã trả lời (11)</div>
     <div class="row" style="gap:7px"><span style="width:14px;height:14px;border-radius:4px;border:1.5px solid var(--line)"></span>Chưa trả lời (18)</div>
     <div class="row" style="gap:7px"><span class="dot" style="background:var(--gold)"></span>Đánh dấu xem lại (1)</div>
    </div>
   </div>
   <div class="card">
    <h3>Phần thi</h3>
    ${[['5 nhóm sản phẩm, GoldCool và mẫu rẻ', '12 câu'], ['Giá đã gồm VAT, bảo hành, đổi mới 30 ngày', '8 câu'], ['Kịch bản AI, Sales và phễu L1–L6', '10 câu']].map(([t, n]) => `<div class="row sm" style="margin-top:10px;gap:10px">${t}<span class="sp muted" style="white-space:nowrap">${n}</span></div>`).join('')}
   </div>
   <span class="btn pri" style="height:46px">${ic('send', 16)}Nộp bài</span>
   <div class="xs muted" style="text-align:center;margin-top:-8px">Còn 18 câu chưa trả lời – nộp sẽ cần xác nhận</div>
  </div>
 </div>
</div></main></div>`);

// ============ 17 · PHÒNG ĐÓNG VAI ============
const rb = (who, txt) => who === 'k'
  ? `<div style="display:flex;gap:9px;max-width:74%"><span class="av" style="width:32px;height:32px;font-size:11px;background:#FDF1D8;color:#8A6A05">KH</span><div style="background:#fff;border:1px solid var(--line);border-radius:4px 14px 14px 14px;padding:9px 13px">${txt}</div></div>`
  : `<div style="margin-left:auto;max-width:74%;background:var(--ice);border:1px solid #CFE0EE;border-radius:14px 4px 14px 14px;padding:9px 13px">${txt}</div>`;
S['17_Phong_dong_vai'] = page(`<div class="app">${side({ mod: 'hv', sub: 'Phòng đóng vai', user: NEW, mode: false })}<main class="main">
${top('Học viện <span>/</span> <b>Phòng đóng vai</b>', { user: 'N4', bell: 1 })}
<div class="content">
 <div class="card row" style="gap:16px;padding:14px 18px">
  <div style="width:44px;height:44px;border-radius:12px;background:var(--goldsoft);display:grid;place-items:center">${ic('chat', 21, '#8A6A05')}</div>
  <div><b style="font-size:15px">Nhận khách L3 từ AI: quán cơm cần tủ mát bàn chặt 1,5 m</b><div class="row xs muted" style="gap:8px;margin-top:3px"><span class="chip blue" style="font-size:11px">Nhóm: Tủ bàn chặt & salad</span><span class="chip blue" style="font-size:11px">Kịch bản S.3</span><span class="chip bad" style="font-size:11px">Độ khó: Khó</span><span class="chip gray" style="font-size:11px">Từ hội thoại thật · đã xóa thông tin khách</span></div></div>
  <div class="sp row" style="gap:14px"><div style="width:160px"><div class="row xs muted" style="margin-bottom:5px">Lượt<b class="sp" style="color:var(--ink)">7 / 20</b></div><div class="bar"><i style="width:35%;background:var(--navy)"></i></div></div><span class="btn nv">${ic('flask', 15)}Kết thúc và chấm điểm</span></div>
 </div>
 <div style="display:grid;grid-template-columns:1fr 390px;gap:18px">
  <div class="card" style="padding:0;display:flex;flex-direction:column">
   <div class="row" style="padding:12px 18px;border-bottom:1px solid var(--line)"><span class="av" style="width:34px;height:34px;font-size:12px;background:#FDF1D8;color:#8A6A05">KH</span><div><b class="sm">Anh Tuấn (vai khách)</b><div class="xs muted row" style="gap:5px"><span class="ai">${ic('spark', 10)}AI đóng vai</span>trả lời như khách thật, không gợi ý đáp án</div></div></div>
   <div style="padding:10px 18px;background:#FFFCF2;border-bottom:1px solid #F3E4B2" class="xs row">${ic('handoff', 14, '#8A6A05')}<span><b>Bản bàn giao AI:</b> quán cơm · tủ mát bàn chặt 1,5 m · AI đã gửi GoldCool 10.120.000 / 16.560.000 và mẫu rẻ 8.500.000 / 12.500.000 · khách trả lời “trực tiếp thôi, giá cao quá”</span></div>
   <div style="flex:1;padding:18px;display:flex;flex-direction:column;gap:12px;background:#F7F9FB">
    ${rb('h', 'Dạ em chào anh Tuấn, em là Sales của GoldCool. Em thấy anh chọn bản lạnh trực tiếp 1,5 m. Bếp mình để rau, thịt sơ chế hay đồ uống ạ?')}
    ${rb('k', 'Để thịt, rau sơ chế. Anh cũng thấy GoldCool hơi cao.')}
    ${rb('h', 'Dạ, bản GoldCool trực tiếp 1,5 m là 10.120.000đ, mẫu rẻ 8.500.000đ, giá đã gồm VAT ạ. Khác nhau chính là GoldCool dàn đồng, bảo hành 24 tháng, đổi mới 30 ngày đầu nếu lỗi kỹ thuật; mẫu rẻ dàn nhôm, bảo hành 12 tháng.')}
    ${rb('k', 'Bếp anh chạy cả ngày, cái cũ hỏng sau 2 năm.')}
    ${rb('h', 'Dạ với bếp chạy cả ngày thì độ ổn định quan trọng. Em gửi anh video tủ bàn chặt GoldCool chạy tại một quán cơm để anh xem thực tế nhé.')}
    ${rb('k', 'Ừ. Nhưng chỗ khác bán còn bớt. Em bớt anh 1 triệu thì anh lấy GoldCool luôn.')}
    <div class="row xs muted" style="gap:6px;justify-content:center">${ic('dots', 16)}Đến lượt bạn trả lời</div>
   </div>
   <div style="padding:12px 18px;border-top:1px solid var(--line)"><div class="field row" style="height:48px;color:#8A94A3">Nhập câu trả lời như đang nhắn với khách…<span class="sp btn sm nv">${ic('send', 13)}Gửi</span></div></div>
  </div>
  <div class="col" style="gap:14px">
   <div class="card">
    <div class="row"><h3>Hồ sơ khách</h3><span class="sp xs muted">đã khai thác 4/6 ý</span></div>
    <div class="col" style="gap:7px;margin-top:12px">${[['Mô hình: quán cơm', 1], ['Mặt hàng: thịt, rau sơ chế', 1], ['Kích thước: 1,5 m · tủ mát', 1], ['Băn khoăn: giá, tủ cũ hỏng sau 2 năm', 1], ['Thời điểm cần', 0], ['Địa chỉ giao', 0]].map(([t, d]) => `<div class="row sm" style="gap:8px">${d ? ic('checkc', 16, 'var(--ok)') : ic('lock', 16, '#9AA5B4')}<span style="${d ? '' : 'color:var(--muted)'}">${d ? t : t + ': chưa hỏi'}</span></div>`).join('')}</div>
   </div>
   <div class="card">
    <div class="row"><h3>${ic('book', 16, 'var(--navy)')}Tra cứu nhanh</h3><span class="sp xs muted">giá đã gồm VAT</span></div>
    <table class="tbl" style="margin-top:10px;border:1px solid var(--line)"><thead><tr><th>Tủ mát bàn chặt 1,5 m</th><th style="text-align:right">Trực tiếp</th><th style="text-align:right">Quạt gió</th></tr></thead><tbody>
     <tr><td style="padding:8px 12px"><div class="row" style="gap:8px">${img('BC_GC_SP_01', 34, 34, 5)}<span class="chip goldc" style="font-size:11px">GoldCool</span></div></td><td style="padding:8px 12px;text-align:right"><b class="sm">10.120.000</b></td><td style="padding:8px 12px;text-align:right"><b class="sm">16.560.000</b></td></tr>
     <tr><td style="padding:8px 12px"><div class="row" style="gap:8px">${img('BC_MR_SP_01', 34, 34, 5)}<span class="chip gray" style="font-size:11px">Mẫu rẻ</span></div></td><td style="padding:8px 12px;text-align:right"><b class="sm">8.500.000</b></td><td style="padding:8px 12px;text-align:right"><b class="sm">12.500.000</b></td></tr>
    </tbody></table>
    <div style="margin-top:10px;border:1px solid var(--line);border-radius:10px;padding:10px 12px"><div class="xs muted" style="font-weight:600">KỊCH BẢN S.3 · KHÁCH CHÊ GIÁ</div><div class="sm" style="margin-top:4px">Nói lại khác biệt (dàn đồng, bảo hành 24 tháng, đổi mới 30 ngày); để khách tự so với mẫu rẻ; nhấn sự phù hợp với bếp chạy cả ngày.</div></div>
    <div class="note" style="margin-top:10px;font-size:12.5px">${ic('alert', 16, '#8A6A05')}<div><b>Nhắc quyền hạn:</b> không tự giảm giá, tạo ưu đãi hay combo ngoài chính sách đã duyệt.</div></div>
   </div>
  </div>
 </div>
</div></main></div>`);

// ============ 18 · KẾT QUẢ BUỔI ĐÓNG VAI ============
const crit = [
  ['Hỏi nhu cầu', 1, 0, 'Bếp mình để rau, thịt sơ chế hay đồ uống ạ?', 'Tốt: không hỏi lại điều AI đã ghi, chỉ hỏi thêm mặt hàng.'],
  ['Giải thích phiên bản', 1, 0, 'GoldCool dàn đồng, bảo hành 24 tháng… mẫu rẻ dàn nhôm, bảo hành 12 tháng.', 'Tốt: nói đúng khác biệt theo kịch bản.'],
  ['Báo giá đúng kịch bản', 1, 1, 'Bản GoldCool trực tiếp 1,5 m là 10.120.000đ, mẫu rẻ 8.500.000đ, giá đã gồm VAT.', 'Đúng giá, đúng kích thước, GoldCool trước.'],
  ['Đúng quyền hạn', 0, 1, 'Dạ em bớt cho anh 1 triệu để anh chốt luôn nhé.', '“Dạ giá bên em là giá bán lẻ đã gồm VAT nên em không tự bớt được. Nếu anh cần tiết kiệm, mẫu rẻ 1,5 m là 8.500.000đ; còn bếp chạy cả ngày thì em vẫn khuyên GoldCool để dùng lâu ạ.”'],
  ['Bằng chứng & khác biệt', 1, 0, 'Em gửi anh video tủ bàn chặt GoldCool chạy tại một quán cơm.', 'Đúng nỗi lo “tủ cũ hỏng sau 2 năm” của khách.'],
  ['Bước tiếp theo', 1, 0, 'Anh cho em xin địa chỉ để Kế toán báo phí vận chuyển ạ.', 'Có bước tiếp theo rõ ràng, không hứa ngày giao.'],
];
S['18_Ket_qua_buoi_dong_vai'] = page(`<div class="app">${side({ mod: 'hv', sub: 'Phòng đóng vai', user: NEW, mode: false })}<main class="main">
${top('Học viện <span>/</span> Phòng đóng vai <span>/</span> <b>Kết quả</b>', { user: 'N4', bell: 1 })}
<div class="content">
 <div class="card row" style="gap:22px;padding:20px 22px;border-color:#F0C3BC">
  <div style="width:96px;height:96px;border-radius:50%;background:conic-gradient(var(--gold) 0 83%,#EEF1F5 83% 100%);display:grid;place-items:center;flex:none"><div style="width:76px;height:76px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center"><div><b style="font-size:24px">5/6</b><div class="xs muted">tiêu chí</div></div></div></div>
  <div style="flex:1"><div class="row" style="gap:10px"><span class="chip bad" style="font-size:14px;padding:4px 14px">CHƯA ĐẠT</span><span class="xs muted">Quán cơm · tủ mát bàn chặt 1,5 m · kịch bản S.3 · Khó · 14 lượt</span></div>
   <div style="font-size:17px;font-weight:600;margin-top:8px">Trượt tiêu chí bắt buộc “Đúng quyền hạn”: bạn tự giảm giá cho khách.</div>
   <div class="sm muted" style="margin-top:4px">Buổi luyện đạt khi đạt từ 5/6 tiêu chí <b>và</b> đạt cả 2 tiêu chí bắt buộc: Báo giá đúng kịch bản, Đúng quyền hạn.</div></div>
  <div class="col" style="gap:8px"><span class="btn pri">${ic('refresh', 15)}Luyện lại tình huống này</span><span class="btn">${ic('chat', 15)}Xem lại cuộc chat</span></div>
 </div>
 <div class="row"><b>Chấm theo 6 tiêu chí</b><span class="ai" style="margin-left:4px">${ic('spark', 10)}AI chấm</span><span class="sp xs muted row" style="gap:6px">${ic('lock', 13)}= tiêu chí bắt buộc · người kèm có thể sửa điểm nếu AI chấm chưa đúng</span></div>
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
  ${crit.map(([t, ok, must, q, g]) => `<div class="card" style="padding:14px 16px;${ok ? '' : 'border:1.5px solid var(--bad);background:#FFFBFA'}">
   <div class="row" style="gap:8px">${ok ? ic('checkc', 19, 'var(--ok)') : ic('xc', 19, 'var(--bad)')}<b class="sm">${t}</b>${must ? ic('lock', 13, 'var(--muted)') : ''}<span class="sp chip ${ok ? 'ok' : 'bad'}" style="font-size:11px">${ok ? 'Đạt' : 'Chưa đạt'}</span></div>
   <div class="xs muted" style="margin-top:10px;font-weight:600">BẠN ĐÃ NÓI</div>
   <div class="sm" style="margin-top:3px;padding-left:10px;border-left:3px solid ${ok ? '#CDE7D8' : '#F0C3BC'};font-style:italic">“${q}”</div>
   <div class="xs muted" style="margin-top:10px;font-weight:600">${ok ? 'NHẬN XÉT' : 'NÊN NÓI THẾ NÀY'}</div>
   <div class="sm" style="margin-top:3px;${ok ? '' : 'color:#173E5F;background:var(--ice);border-radius:8px;padding:8px 10px'}">${g}</div></div>`).join('')}
 </div>
 <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:18px">
  <div class="card">
   <div class="row"><h3>Các lần luyện nhóm “Tủ bàn chặt & salad”</h3><span class="sp xs muted">cần 1 lần đạt bản Khó</span></div>
   <table class="tbl" style="margin-top:8px"><thead><tr><th>Lần</th><th>Ngày</th><th>Tình huống</th><th>Tiêu chí</th><th>Kết quả</th></tr></thead><tbody>
    ${[['1', '27/10', 'Tủ salad 1,5 m · Vừa', '4/6', 'bad', 'Chưa đạt · chưa hỏi phiên bản'], ['2', '29/10', 'Tủ đông bàn chặt 1,2 m · Vừa', '6/6', 'ok', 'Đạt'], ['3', '02/11', 'Tủ mát bàn chặt 1,5 m · Khó', '5/6', 'bad', 'Chưa đạt · tự giảm giá']].map(([n, d, k, c, s, r]) => `<tr><td>${n}</td><td>${d}</td><td class="sm">${k}</td><td><b>${c}</b></td><td><span class="chip ${s}" style="font-size:11px">${r}</span></td></tr>`).join('')}
   </tbody></table>
  </div>
  <div class="card">
   <div class="row"><h3>Người kèm cặp</h3><span class="sp chip ok" style="font-size:11px">${ic('eye', 12)}Đã xem 10:42</span></div>
   <div class="row" style="gap:10px;align-items:flex-start;margin-top:12px">${av('HH', '#2A5A85', '#fff', 32)}<div><div class="xs"><b>Đoàn Thị Hồng Hà</b> <span class="muted">· nhận xét</span></div><div class="sm" style="margin-top:3px">Phần báo giá và khác biệt rất đúng kịch bản. Khách đòi bớt thì nhớ “niềm tin lâu dài hơn doanh số trước mắt”: không tự giảm, đưa mẫu rẻ để khách tự chọn. Luyện lại bản Khó trước thứ 4 nhé.</div></div></div>
   <div class="row" style="gap:8px;margin-top:14px"><span class="btn sm">${ic('edit', 13)}Sửa điểm</span><span class="btn sm">${ic('plus', 13)}Giao bài luyện thêm</span></div>
  </div>
 </div>
</div></main></div>`);

module.exports = S;
