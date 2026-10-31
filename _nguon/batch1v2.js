const { ic, side, top, page, lad, L, fridge } = require('./lib.js');
const S = {};
const fs = require('fs');
const ph = (f) => process.env.IMG_URL ? 'img/' + f + '.jpg' : 'data:image/jpeg;base64,' + fs.readFileSync(__dirname + '/img/web/' + f + '.jpg').toString('base64');
const img = (f, w, h, r = 8, fit = 'cover') => `<img src="${ph(f)}" style="width:${w}px;height:${h}px;object-fit:${fit};background:#EEF2F6;border-radius:${r}px;display:block;flex:none">`;
const HUY = ['Nguyễn Văn Huy', 'Giám đốc', 'NH'];
const CHINH = ['Nguyễn Văn Chính', 'TP Sản xuất – Vận hành', 'NC'];
const Ls = (n) => L(n).replace('class="chip" style="', 'class="chip" style="font-size:11px;');
const mono = 'font-family:ui-monospace,Menlo,monospace;font-size:12.5px';

// ============ 01 · TRANG CHỦ – VIỆC CỦA TÔI (Sales Hà) ============
S['01_Trang_chu_Viec_cua_toi'] = page(`<div class="app">${side({ mod: 'home' })}<main class="main">
${top('<b>Trang chủ</b>')}
<div class="content">
 <div class="row" style="align-items:flex-end">
  <div><div class="h1">Chào buổi sáng, chị Hà</div><div class="sub1">Thứ 2, 02/11/2026 · Tuần 45 · Hôm nay chị có 7 việc, 2 khách mới cần liên hệ ngay</div></div>
  <div class="sp note" style="max-width:500px;padding:10px 14px">${ic('heart', 18, '#8A6A05')}<div><b>Chọn đúng – Dùng lâu</b><div class="sm muted" style="color:#6B5410">Sản phẩm phù hợp hơn sản phẩm giá cao. Làm đúng trước, nhanh sau.</div></div></div>
 </div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
  ${[
    ['handoff', 'Khách mới cần liên hệ', '2', '<span class="chip bad">' + ic('clock', 13) + '1 khách đã chờ 6 phút · chuẩn ≤ 5 phút</span>', 'var(--bad)'],
    ['refresh', 'Follow-up khách L4', '3', '<span class="chip gray">Có ngày & hành động hẹn</span>', 'var(--navy)'],
    ['heart', 'Chăm sóc sau bán L6', '2', '<span class="chip goldc">Mốc 7 ngày · mốc 30 ngày</span>', '#8A6A05'],
    ['cap', 'Bài học hôm nay', '1 bài', '<span class="chip blue">Kịch bản GoldWash – Sales</span>', 'var(--navy)'],
  ].map(([i, t, n, c, col]) => `<div class="card" style="padding:16px 18px"><div class="row muted sm" style="font-weight:600">${ic(i, 17, col)}${t}</div><div style="font-size:28px;font-weight:700;margin:6px 0 8px;letter-spacing:-.02em">${n}</div>${c}</div>`).join('')}
 </div>
 <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:18px">
  <div class="card" style="padding:0">
   <div class="row" style="padding:16px 18px 12px"><h3>Việc cần làm ngay</h3><span class="sp xs muted">Xếp theo mức gấp</span></div>
   ${[
    ['bad', 'clock', 'Nhắn / gọi chị Phạm Thu Trang', 'Quán lẩu sắp mở · Hà Đông · AI đã báo giá tủ đông 4 cánh · khách chọn GoldCool quạt gió, hỏi giao Hà Đông mấy ngày', 'Đã chờ 6 phút', 3, 'Liên hệ', true],
    ['bad', 'phone', 'Liên hệ anh Đỗ Văn Long – lần 2/3', 'Quán cơm · Bắc Giang · để lại SĐT hỏi tủ mát bàn chặt 1,5 m · lần 1 không nghe máy (08:52)', 'Lần 2 / tối thiểu 3', 1, 'Gọi', true],
    ['warn', 'refresh', 'Follow-up anh Nguyễn Quang Vinh', 'Nhà hàng · Long Biên · GoldWash 1,8 m · hành động hẹn: gửi video Ozon chạy thực tế', 'Hẹn hôm nay', 4, 'Mở', false],
    ['ok', 'heart', 'Chăm sóc chị Lê Mai Anh – mốc 7 ngày', 'Siêu thị mini · Bắc Ninh · tủ mát 2 cánh 1150L · hỏi tủ chạy ổn chưa, xin feedback', 'Mốc 7 ngày', 6, 'Gọi', false],
    ['gray', 'layers', 'Thẻ vấn đề: tồn kho tủ 4 cánh quạt gió', 'Chờ Thủ kho Đỗ Huyền Thanh xác nhận tồn trước khi trả lời khách – không hứa ngày giao', 'Hạn 03/11', 0, 'Mở thẻ', false],
   ].map(([c, i, t, d, due, l, b, p]) => `<div class="row" style="padding:13px 18px;border-top:1px solid var(--line);gap:14px">
     <div style="width:34px;height:34px;border-radius:9px;display:grid;place-items:center" class="${c}">${ic(i, 17)}</div>
     <div style="flex:1;min-width:0"><div class="row" style="gap:8px"><b style="font-size:14px">${t}</b>${l ? L(l) : ''}</div><div class="sm muted" style="margin-top:2px">${d}</div></div>
     <span class="chip ${c}">${due}</span><span class="btn sm ${p ? 'pri' : ''}">${p ? ic('phone', 14) : ''}${b}</span></div>`).join('')}
  </div>
  <div class="col" style="gap:18px">
   <div class="card">
    <div class="row"><h3>Chuẩn làm việc tuần này</h3><span class="sp xs muted">Theo chuẩn L1–L6</span></div>
    ${[
      ['Liên hệ khách mới trong ≤ 5 phút', '11 / 12 khách', 92, 'ok', 'Đạt'],
      ['Khách L4 có ngày & hành động follow-up', '8 / 9 khách', 89, 'warn', 'Thiếu 1'],
      ['Chăm sóc L6 đúng mốc (sau giao, 7, 30 ngày)', '5 / 5 lượt', 100, 'ok', 'Đạt'],
      ['Thu feedback khách (chuẩn 3 / tuần)', '2 / 3 feedback', 67, 'warn', 'Còn 1'],
    ].map(([t, v, p, c, s]) => `<div style="margin-top:14px"><div class="row sm"><b style="font-weight:600">${t}</b></div>
      <div class="row xs" style="margin:5px 0 6px"><span class="muted">${v}</span><span class="chip ${c} sp" style="font-size:11px">${s}</span></div>
      <div class="bar"><i style="width:${p}%;background:var(--${c === 'ok' ? 'ok' : 'gold'})"></i></div></div>`).join('')}
    <div class="src">${ic('info', 13)}Đếm tự động từ AI Sales và cập nhật của chị · 06:00 hôm nay</div>
   </div>
   <div class="card">
    <h3>${ic('award', 18, '#8A6A05')}Chứng nhận tư vấn 5 nhóm</h3>
    <div class="row" style="gap:7px;margin-top:12px;flex-wrap:wrap">
     <span class="chip ok">${ic('check', 13)}Tủ đông 4 & 6 cánh</span><span class="chip ok">${ic('check', 13)}Tủ mát 2 & 3 cánh</span><span class="chip ok">${ic('check', 13)}Bàn chặt & salad</span><span class="chip ok">${ic('check', 13)}Tủ đông trưng bày</span><span class="chip warn">${ic('clock', 13)}GoldWash · còn 1 buổi đóng vai</span>
    </div>
   </div>
   <div class="card">
    <div class="row"><h3>${ic('star', 17, 'var(--gold)')}Chị vừa được ghi nhận</h3></div>
    <div class="sm" style="margin-top:8px"><b>Trần Thị Thu Trang (Kế toán bán hàng)</b> · <span class="chip blue" style="font-size:11px">Trách nhiệm</span></div>
    <div class="sm muted" style="margin-top:6px">“Chị Hà gửi đủ xác nhận đặt cọc và thông tin xuất hóa đơn cho 4 đơn tuần trước, Kế toán không phải hỏi lại.”</div>
   </div>
  </div>
 </div>
</div></main></div>`);

// ============ 02 · HỘP THƯ AI SALES ============
const conv = [
  ['Nguyễn Văn Hải', 'Tủ chạy mà không lạnh, đồ hỏng hết rồi…', '09:20', 'bad', 'KHẨN · Khiếu nại', 6, 'Bảo hành', 'Bắc Ninh'],
  ['Phạm Thu Trang', 'Chị lấy GoldCool quạt gió. Giao Hà Đông…', '09:12', 'warn', 'Chờ Sales · Hà', 3, 'Tủ đông 4C', 'Hà Đông', true],
  ['Hoàng Thị Nga', 'Quán chị cần bản 1,8 m có Ozon', '09:08', 'warn', 'Chờ Sales · Ánh', 2, 'GoldWash', 'Hải Phòng'],
  ['Trần Quốc Bảo', 'Tủ salad 1,5 m có bản kính cong không', '09:06', 'blue', 'AI đang tư vấn', 2, 'Tủ salad', 'Cầu Giấy'],
  ['Lý Minh Châu', 'Quán chị bán đồ uống, cần tủ mát 3 cánh', '09:01', 'blue', 'AI đang tư vấn', 2, 'Tủ mát 3C', 'Quảng Ninh'],
  ['Đặng Văn Toàn', 'Tủ đông 6 cánh giá sao em', '08:58', 'blue', 'AI đang tư vấn', 1, 'Tủ đông 6C', 'Nam Định'],
  ['Vũ Đức Thắng', 'Tủ đông trưng bày kem loại nào hợp', '08:51', 'ok', 'Yến đang trả lời', 2, 'Trưng bày', 'Thanh Xuân'],
  ['Mai Văn Đông', 'Cho anh giá đại lý 5 cái', '08:40', 'warn', 'Chờ Sales · Yến', 1, 'Đại lý', 'Thái Bình'],
];
const bub = (who, txt, time, extra = '', ini = 'PT') => who === 'k'
  ? `<div style="display:flex;gap:9px;max-width:72%"><div class="av" style="width:30px;height:30px;font-size:11px">${ini}</div><div><div style="background:#fff;border:1px solid var(--line);border-radius:4px 14px 14px 14px;padding:9px 13px">${txt}</div><div class="xs muted" style="margin-top:3px">${time}</div></div></div>`
  : `<div style="display:flex;flex-direction:column;align-items:flex-end;margin-left:auto;max-width:76%"><div style="background:${who === 'ai' ? 'var(--ice)' : '#FFF8E6'};border:1px solid ${who === 'ai' ? '#CFE0EE' : '#F0DFA6'};border-radius:14px 4px 14px 14px;padding:9px 13px">${txt}</div><div class="xs muted row" style="margin-top:3px;gap:6px">${who === 'ai' ? '<span class="ai">' + ic('spark', 10) + 'AI</span>' : '<b style="color:#8A6A05">Đoàn Thị Hồng Hà</b>'} ${time}${extra}</div></div>`;
const step = (n, t) => `<div class="row" style="justify-content:flex-end;gap:6px;margin-bottom:-6px"><span class="xs" style="color:#7EA8CF;font-weight:700">BƯỚC ${n}</span><span class="xs muted">· ${t}</span></div>`;
const priceCard = (title, a, b, tag, gold, pic) => `<div style="margin-left:auto;display:flex;flex-direction:column;align-items:flex-end"><div style="background:#fff;border:1px solid ${gold ? '#E8D28A' : '#CFE0EE'};border-radius:14px 4px 14px 14px;padding:12px;display:flex;gap:14px;width:440px">
 <div style="position:relative;flex:none">${img(pic, 104, 104, 8, 'contain')}<span style="position:absolute;bottom:4px;left:4px" class="chip ${gold ? 'goldc' : 'gray'}" >${ic('image', 10)}ảnh</span></div>
 <div style="flex:1"><div class="row" style="gap:6px"><b style="font-size:13.5px">${title}</b><span class="chip ${gold ? 'goldc' : 'gray'}" style="font-size:10.5px">${tag}</span></div>
  <div class="row" style="justify-content:space-between;margin-top:8px"><span class="sm muted">Lạnh trực tiếp</span><b style="font-size:16px;color:var(--navy)">${a}</b></div>
  <div class="row" style="justify-content:space-between;margin-top:4px"><span class="sm muted">Lạnh quạt gió</span><b style="font-size:16px;color:var(--navy)">${b}</b></div>
  <div class="xs muted" style="margin-top:6px">Giá đã gồm VAT · chưa gồm vận chuyển</div></div></div>
 <div class="xs muted row" style="margin-top:3px;gap:6px"><span class="ai">${ic('spark', 10)}AI</span>giá lấy từ bảng giá bán lẻ · 1 ảnh đúng sản phẩm</div></div>`;
S['02_Hop_thu_AI_Sales'] = page(`<div class="app">${side({ mod: 'sales', sub: 'Hộp thư' })}<main class="main">
${top('AI Sales <span>/</span> <b>Hộp thư</b>')}
<div style="display:grid;grid-template-columns:316px minmax(0,1fr) 330px;flex:1">
 <section style="background:#fff;border-right:1px solid var(--line);display:flex;flex-direction:column;min-height:0">
  <div style="padding:14px 14px 10px">
   <div class="row" style="flex-wrap:wrap;gap:6px">
    <span class="chip" style="background:var(--navy);color:#fff">Tất cả 48</span><span class="chip blue">AI đang tư vấn 31</span><span class="chip warn">Chờ Sales 4</span><span class="chip ok">Sales đang trả lời 9</span><span class="chip bad">Khẩn 1</span>
   </div>
   <div class="row xs muted" style="margin-top:10px">${ic('filter', 13)}Nhóm SP: Tất cả · Cấp: Tất cả · Sales: Hà + chưa giao</div>
  </div>
  <div>
  ${conv.map(([n, m, t, c, stt, l, grp, p, sel]) => `<div style="padding:12px 14px;border-top:1px solid var(--line);${sel ? 'background:#F3F8FC;box-shadow:inset 3px 0 0 var(--gold)' : ''}${c === 'bad' ? ';background:#FFF7F6' : ''}">
    <div class="row" style="gap:8px"><b style="font-size:13.5px">${n}</b><span class="xs muted">· ${p}</span><span class="sp xs muted">${t}</span></div>
    <div class="sm muted" style="margin:3px 0 7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m}</div>
    <div class="row" style="gap:6px"><span class="chip ${c}" style="font-size:11px">${c === 'bad' ? ic('alert', 12) : ''}${stt}</span>${Ls(l)}<span class="chip gray" style="font-size:11px">${grp}</span></div></div>`).join('')}
  </div>
 </section>
 <section style="display:flex;flex-direction:column;min-height:0;background:#F7F9FB">
  <div style="background:#fff;border-bottom:1px solid var(--line);padding:12px 18px" class="row">
   <div style="min-width:0"><div class="row" style="gap:8px"><b style="font-size:15px;white-space:nowrap">Phạm Thu Trang</b><span class="chip warn">Chờ Sales</span></div><div class="xs muted" style="margin-top:2px">Facebook · Kịch bản K.1 Tủ đông 4 cánh · AI đã dừng</div></div>
   <div class="sp row" style="gap:8px"><span class="btn pri">${ic('user', 15)}Tiếp nhận</span></div>
  </div>
  <div style="flex:1;padding:16px 22px;display:flex;flex-direction:column;gap:12px">
   <div class="xs muted" style="text-align:center">Hôm nay · Khách đến từ quảng cáo “Tủ đông 4 cánh cho quán”</div>
   ${bub('k', 'Tủ đông 4 cánh giá bao nhiêu shop?', '09:02')}
   ${step(1, 'Hỏi nhanh mô hình')}
   ${bub('ai', 'Dạ anh/chị đang dùng tủ cho mô hình quán gì ạ?', '09:02')}
   ${bub('k', 'Quán lẩu chị sắp mở ở Hà Đông', '09:04')}
   ${step(2, 'Giải thích 2 hình thức làm lạnh')}
   ${bub('ai', 'Dạ, tủ đông 4 cánh bên em có 2 hình thức làm lạnh:<br><b>1. Lạnh trực tiếp</b> – 2 ngăn riêng, dùng cả 2 ngăn đông hoặc 1 đông – 1 mát; đầu tư thấp hơn; cần xả đá định kỳ.<br><b>2. Lạnh quạt gió</b> – lạnh nhanh, nhiệt đều hơn; không cần xả đá thủ công; một ngăn chung một chế độ nhiệt; đầu tư cao hơn.', '09:04')}
   ${step(3, 'Báo giá GoldCool trước')}
   ${priceCard('Tủ đông 4 cánh GoldCool', '16.100.000đ', '23.920.000đ', 'GoldCool', true, 'TD4C_GC_SP_01')}
   ${step(4, 'Báo mẫu rẻ và nói khác biệt')}
   ${priceCard('Tủ đông 4 cánh – mẫu rẻ', '12.500.000đ', '18.500.000đ', 'Mẫu rẻ', false, 'TD4C_MR_SP_01')}
   ${bub('ai', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:430px"><div><b>Mẫu rẻ</b><div class="sm">· Dàn lạnh nhôm<br>· Hoàn thiện cơ bản<br>· Bảo hành 12 tháng</div></div><div><b style="color:#8A6A05">GoldCool</b><div class="sm">· Dàn lạnh đồng 100%<br>· Hoàn thiện chắc chắn hơn<br>· Bảo hành 24 tháng<br>· Đổi mới 30 ngày đầu nếu lỗi kỹ thuật</div></div></div>`, '09:05')}
   ${step(5, 'Tăng niềm tin và hỏi khách chọn')}
   <div style="margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:6px;max-width:76%">
    <div style="background:var(--ice);border:1px solid #CFE0EE;border-radius:14px 4px 14px 14px;padding:9px 13px">Bên em vẫn bán GoldCool là chính vì phù hợp hơn với quán cần sử dụng lâu dài và ưu tiên độ ổn định ạ.</div>
    <div class="row" style="gap:8px">${[['play', 'Video tại quán lẩu · Cầu Giấy'], ['thermo', 'Test làm lạnh −18°C sau 2 giờ'], ['chat', 'Phản hồi khách · Long Biên']].map(([i, t]) => `<div style="width:142px;border:1px solid #CFE0EE;background:#fff;border-radius:10px;overflow:hidden"><div style="height:62px;background:linear-gradient(135deg,#DCE8F3,#F4F7FA);display:grid;place-items:center">${ic(i, 22, 'var(--navy)')}</div><div class="xs" style="padding:6px 8px"><b>${t}</b><div class="row" style="gap:3px;color:var(--ok);margin-top:2px">${ic('checkc', 11)}Đã xác thực</div></div></div>`).join('')}</div>
    <div style="background:var(--ice);border:1px solid #CFE0EE;border-radius:14px 4px 14px 14px;padding:9px 13px">Anh/chị đang nghiêng về GoldCool hay mẫu rẻ, và mình ưu tiên lạnh trực tiếp hay quạt gió ạ?</div>
    <div class="xs muted row" style="gap:6px"><span class="ai">${ic('spark', 10)}AI</span>09:06 · 3 feedback đã xác thực, đúng tủ 4 cánh GoldCool</div>
   </div>
   ${bub('k', 'Chị lấy GoldCool quạt gió. Giao về Hà Đông mất mấy ngày em?', '09:12')}
   <div style="border:1px dashed #E3C766;background:#FFFCF2;border-radius:10px;padding:10px 14px" class="row">
    ${ic('handoff', 18, '#8A6A05')}<div class="sm"><b>Khách đã trả lời câu hỏi chọn → khách lên L3, AI dừng tư vấn.</b><div class="xs muted">09:12 · đã báo Sales Đoàn Thị Hồng Hà qua Zalo nhóm · AI không gửi tin báo chuyển cho khách · dấu hiệu L4: hỏi ngày giao</div></div>
   </div>
  </div>
  <div style="background:#fff;border-top:1px solid var(--line);padding:12px 18px">
   <div class="field row" style="height:46px;color:#8A94A3">${ic('clip', 17)}Chị Hà nhắn tiếp cho khách… (không hứa ngày giao trước khi Kho xác nhận)<span class="sp btn sm nv">${ic('send', 14)}Gửi</span></div>
  </div>
 </section>
 <section style="background:#fff;border-left:1px solid var(--line);padding:18px;display:flex;flex-direction:column;gap:15px">
  <div class="row"><div class="av" style="width:44px;height:44px">PT</div><div><b style="font-size:15px">Phạm Thu Trang</b><div class="xs muted">Facebook · Hà Nội (Hà Đông) · chưa có SĐT</div></div></div>
  <div><div class="row xs muted" style="margin-bottom:6px">Cấp khách<b class="sp" style="color:var(--ink)">L3 · Đã tư vấn / báo giá</b></div>${lad(3)}<div class="row xs muted" style="margin-top:4px;justify-content:space-between"><span>L1</span><span>L2</span><span>L3</span><span>L4</span><span>L5</span><span>L6</span></div></div>
  <div><div class="lbl row" style="gap:6px">Bản bàn giao Sales <span class="ai">${ic('spark', 10)}AI ghi</span></div>
   <dl class="kv" style="grid-template-columns:112px 1fr;font-size:13px;gap:7px 10px">
    <dt>Mô hình</dt><dd>Quán lẩu, sắp mở</dd>
    <dt>Mặt hàng</dt><dd class="muted">Chưa hỏi</dd>
    <dt>Sản phẩm</dt><dd>Tủ đông 4 cánh</dd>
    <dt>Làm lạnh</dt><dd>Quạt gió</dd>
    <dt>Lựa chọn</dt><dd><span class="chip goldc" style="font-size:11px">GoldCool</span></dd>
    <dt>Giá đã gửi</dt><dd>GoldCool 16.100.000 / 23.920.000 · mẫu rẻ 12.500.000 / 18.500.000</dd>
    <dt>Ảnh đã gửi</dt><dd>1 ảnh GoldCool · 1 ảnh mẫu rẻ · 3 feedback</dd>
    <dt>Băn khoăn</dt><dd>Thời gian giao về Hà Đông</dd>
    <dt>Tin cuối</dt><dd class="muted">“Chị lấy GoldCool quạt gió. Giao về Hà Đông mất mấy ngày em?”</dd>
   </dl></div>
  <div class="note" style="font-size:12.5px">${ic('alert', 16, '#8A6A05')}<div><b>Dấu hiệu L4:</b> khách hỏi ngày giao. Hỏi Thủ kho Đỗ Huyền Thanh về tồn kho trước; không hứa ngày giao, báo phí vận chuyển sau khi có địa chỉ.</div></div>
  <div class="noteb" style="font-size:12.5px">${ic('spark', 16, 'var(--navy)')}<div><b>Việc Sales cần làm tiếp</b><br>Xin SĐT và địa chỉ giao · hỏi ngày khai trương · xác nhận GoldCool quạt gió 23.920.000đ · đặt ngày follow-up để lên L4.</div></div>
 </section>
</div></main></div>`);

// ============ 03 · KHÁCH CỦA TÔI (ĐIỆN THOẠI) ============
const mcard = (n, p, g, l, m, wait, red, why, tries, pic) => `<div class="card" style="padding:14px;border-color:${red ? '#F0C3BC' : 'var(--line)'}">
 <div class="row" style="gap:8px"><b style="font-size:15px">${n}</b>${L(l)}<span class="sp chip ${red ? 'bad' : 'warn'}" style="font-size:11.5px">${ic('clock', 12)}${wait}</span></div>
 <div class="sm muted" style="margin-top:4px">${p} · ${g}</div>
 <div class="row sm" style="margin-top:8px;gap:9px">${pic ? img(pic, 34, 34, 6, 'contain') : ic('box', 15, 'var(--navy)')}<span>${m}</span></div>
 <div class="row xs muted" style="margin-top:5px;gap:7px">${ic('handoff', 13)}${why}</div>
 ${tries ? `<div class="row xs" style="margin-top:8px;gap:6px"><span class="muted">Lần liên hệ:</span>${[1, 2, 3].map(i => `<span style="width:22px;height:6px;border-radius:3px;background:${i <= tries ? 'var(--gold)' : '#E3E8EF'}"></span>`).join('')}<span class="muted">${tries}/3 tối thiểu</span></div>` : ''}
 <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:8px;margin-top:12px">
  <span class="btn pri" style="height:44px">${ic('phone', 16)}Gọi</span><span class="btn" style="height:44px">${ic('chat', 16)}Nhắn</span><span class="btn" style="height:44px">${ic('edit', 15)}Kết quả</span></div></div>`;
S['03_Khach_cua_toi_dien_thoai'] = page(`<div style="width:390px;background:var(--bg);min-height:844px;position:relative;padding-bottom:84px">
 <div style="background:var(--navy);color:#fff;padding:14px 18px 16px">
  <div class="row xs" style="color:#B9CCDE;justify-content:space-between"><span>9:18</span><span class="mock" style="color:#B9CCDE;border-color:#41678C">Bản thiết kế · dữ liệu mẫu</span></div>
  <div class="row" style="margin-top:12px"><div><div style="font-size:20px;font-weight:700">Khách của tôi</div><div class="xs" style="color:#B9CCDE">Thứ 2, 02/11 · Đoàn Thị Hồng Hà · NVKD1</div></div>
   <div class="sp" style="position:relative">${ic('bell', 22, '#fff')}<i style="position:absolute;top:-6px;right:-8px;background:var(--bad);font-style:normal;font-size:10px;font-weight:700;border-radius:99px;padding:0 5px">2</i></div></div>
  <div class="row" style="margin-top:14px;gap:6px">
   <span class="chip" style="background:#fff;color:var(--navy);padding:6px 11px;font-size:12.5px">Mới · 2</span><span class="chip" style="background:rgba(255,255,255,.12);color:#fff;padding:6px 11px;font-size:12.5px">Follow-up L4 · 3</span><span class="chip" style="background:rgba(255,255,255,.12);color:#fff;padding:6px 11px;font-size:12.5px">Chăm sóc L6 · 2</span></div>
 </div>
 <div style="padding:14px 14px 0;display:flex;flex-direction:column;gap:12px">
  <div class="note" style="padding:9px 12px;font-size:12.5px">${ic('info', 16, '#8A6A05')}<div>Chuẩn L1: liên hệ khách mới trong <b>≤ 5 phút</b>, tối thiểu <b>3 lần</b> trước khi đánh dấu không liên hệ được.</div></div>
  ${mcard('Phạm Thu Trang', 'Hà Đông', 'Quán lẩu sắp mở', 3, 'Tủ đông 4 cánh GoldCool · quạt gió', 'Chờ 6 phút', true, 'AI chuyển: khách đã chọn · hỏi ngày giao (dấu hiệu L4)', 0, 'TD4C_GC_SP_01')}
  ${mcard('Đỗ Văn Long', 'Bắc Giang', 'Quán cơm', 1, 'Tủ mát bàn chặt 1,5 m', 'Lần 1 lúc 08:52', false, 'Khách để lại SĐT từ form · chưa kết nối', 1, 'BC_GC_SP_01')}
  <div class="row" style="margin-top:4px"><b style="font-size:15px">Follow-up hôm nay</b><span class="sp xs muted">khách L4 có ngày hẹn</span></div>
  ${[['Nguyễn Quang Vinh', 'Long Biên · Nhà hàng', 4, 'GoldWash 1,8 m · hẹn: gửi video Ozon chạy thực tế'], ['Bùi Thanh Tùng', 'Đông Anh · Quán nướng', 4, 'Tủ mát bàn chặt 1,8 m quạt gió · hẹn: gọi sau khi chốt mặt bằng']].map(([n, p, l, d]) => `<div class="card" style="padding:12px 14px"><div class="row" style="gap:8px"><b>${n}</b>${L(l)}<span class="sp chip warn" style="font-size:11px">Hẹn hôm nay</span></div><div class="xs muted" style="margin-top:2px">${p}</div><div class="sm" style="margin-top:6px">${d}</div><div class="row" style="margin-top:10px;gap:8px"><span class="btn sm pri" style="height:38px;flex:1">${ic('phone', 14)}Gọi</span><span class="btn sm" style="height:38px;flex:1">Hẹn lại</span><span class="btn sm" style="height:38px;flex:1">Ghi kết quả</span></div></div>`).join('')}
  <div class="row" style="margin-top:4px"><b style="font-size:15px">Chăm sóc sau bán</b><span class="sp xs muted">L6</span></div>
  <div class="card" style="padding:12px 14px"><div class="row" style="gap:8px"><b>Lê Mai Anh</b>${L(6)}<span class="sp chip goldc" style="font-size:11px">Mốc 7 ngày</span></div><div class="xs muted" style="margin-top:2px">Bắc Ninh · Siêu thị mini · Tủ mát 2 cánh 1150L</div><div class="sm" style="margin-top:6px">Hỏi tủ chạy ổn chưa · xin 1 feedback ảnh/video</div><div class="row" style="margin-top:10px;gap:8px"><span class="btn sm pri" style="height:38px;flex:1">${ic('phone', 14)}Gọi</span><span class="btn sm" style="height:38px;flex:1">${ic('upload', 13)}Lưu feedback</span></div></div>
 </div>
 <nav style="position:absolute;left:0;right:0;bottom:0;height:72px;background:#fff;border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(5,1fr);padding:8px 4px 14px">
  ${[['home', 'Trang chủ'], ['users', 'Khách', 1], ['chat', 'Hộp thư'], ['cap', 'Học'], ['user', 'Tôi']].map(([i, t, on]) => `<div class="col" style="align-items:center;gap:3px;font-size:11px;font-weight:600;color:${on ? 'var(--navy)' : '#8A94A3'}">${ic(i, 22, on ? 'var(--navy)' : '#8A94A3')}${t}${on ? '<span style="width:18px;height:3px;border-radius:2px;background:var(--gold)"></span>' : ''}</div>`).join('')}
 </nav>
</div>`, 'body{width:390px}');

// ============ 04 · CHI TIẾT KHÁCH & CHUYỂN GIAO ============
const tl = [
  [1, '09:02', 'MQL – khách nhắn từ quảng cáo', 'AI'],
  [2, '09:04', 'Đã kết nối – trao đổi 2 chiều, rõ nhu cầu ban đầu (quán lẩu, tủ đông 4 cánh)', 'AI'],
  [0, '09:04–09:06', 'Giải thích 2 hình thức · báo giá GoldCool rồi mẫu rẻ · 3 feedback', 'AI'],
  [3, '09:12', 'Đã tư vấn / báo giá – khách trả lời: GoldCool quạt gió', 'AI'],
];
S['04_Chi_tiet_khach_chuyen_giao'] = page(`<div class="app">${side({ mod: 'sales', sub: 'Khách của tôi' })}<main class="main">
${top('AI Sales <span>/</span> Khách của tôi <span>/</span> <b>Phạm Thu Trang</b>')}
<div class="content">
 <div class="row" style="gap:16px">
  <div class="av" style="width:52px;height:52px;font-size:17px">PT</div>
  <div><div class="row" style="gap:8px"><span class="h1">Phạm Thu Trang</span>${L(3)}<span class="chip blue">Quán lẩu sắp mở</span><span class="chip gray">Facebook · quảng cáo</span></div>
  <div class="sub1">0912 345 678 · Hà Nội (Hà Đông) · AI chuyển lúc 09:12 · chị Hà nhắn lại lúc 09:15 (sau 3 phút)</div></div>
  <div class="sp row" style="gap:8px"><span class="btn pri">${ic('phone', 15)}Gọi</span><span class="btn">${ic('chat', 15)}Zalo</span><span class="btn">${ic('inbox', 15)}Mở cuộc chat</span><span class="btn nv">Lên L4 ${ic('chevD', 14)}</span></div>
 </div>
 <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:18px">
  <div class="col" style="gap:18px">
   <div class="card" style="border-color:#CFE0EE">
    <div class="row"><h3>Bản bàn giao Sales</h3><span class="ai">${ic('spark', 10)}AI viết</span><span class="sp chip warn">${ic('handoff', 12)}Lý do: khách trả lời câu hỏi chọn cuối (K.1)</span></div>
    <dl class="kv" style="grid-template-columns:150px 1fr 150px 1fr;margin-top:14px;gap:11px 14px">
     <dt>Tên khách</dt><dd>Phạm Thu Trang</dd><dt>SĐT / địa chỉ</dt><dd>0912 345 678 · Hà Đông <span class="xs muted">(Sales xin)</span></dd>
     <dt>Mô hình</dt><dd>Quán lẩu, sắp mở</dd><dt>Mặt hàng</dt><dd>Thịt, hải sản <span class="xs muted">(Sales hỏi)</span></dd>
     <dt>Sản phẩm</dt><dd>Tủ đông 4 cánh</dd><dt>Hình thức lạnh</dt><dd>Quạt gió</dd>
     <dt>GoldCool / mẫu rẻ</dt><dd><span class="chip goldc">GoldCool</span></dd><dt>Ảnh đã gửi</dt><dd>2 ảnh sản phẩm · 3 feedback</dd>
     <dt>Giá đã gửi</dt><dd style="grid-column:span 3">GoldCool trực tiếp 16.100.000đ · quạt gió 23.920.000đ · mẫu rẻ trực tiếp 12.500.000đ · quạt gió 18.500.000đ <span class="xs muted">(đã gồm VAT)</span></dd>
     <dt>Băn khoăn</dt><dd>Thời gian giao về Hà Đông</dd><dt>Tin nhắn cuối</dt><dd class="muted">“Giao về Hà Đông mất mấy ngày em?”</dd>
     <dt>Cấp phễu</dt><dd>L3 – đã báo giá đúng sản phẩm và khách phản hồi</dd><dt>Dấu hiệu L4</dt><dd class="need">${ic('alert', 13)}Hỏi ngày giao</dd>
    </dl>
    <div class="src">${ic('info', 13)}Tóm tắt từ 14 tin nhắn · đối chiếu cuộc chat trước khi chốt</div>
   </div>
   <div class="card">
    <h3>Ghi kết quả liên hệ</h3>
    <div class="row" style="gap:8px;margin-top:12px;flex-wrap:wrap">
     ${['Đã liên hệ được', 'Không nghe máy', 'Hẹn liên hệ lại', 'Hẹn xem hàng tại kho Nguyên Khê', 'Không còn nhu cầu'].map((t, i) => `<span class="btn sm" style="${i === 0 ? 'border-color:var(--navy);background:var(--ice);color:var(--navy)' : ''}">${i === 0 ? ic('check', 13) : ''}${t}</span>`).join('')}
    </div>
    <div class="field muted" style="margin-top:12px;height:64px">Chị Trang khai trương 20/11, cần tủ trước 15/11. Đã xin địa chỉ giao để Kế toán báo phí vận chuyển…</div>
    <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:12px;margin-top:12px">
     <div><div class="lbl">Ngày follow-up <span style="color:var(--bad)">*</span></div><div class="field row">${ic('cal', 15, 'var(--muted)')}04/11/2026</div></div>
     <div><div class="lbl">Hành động follow-up <span style="color:var(--bad)">*</span></div><div class="field">Báo tồn kho + phí vận chuyển sau khi Kho, Kế toán xác nhận</div></div>
    </div>
    <div class="row" style="margin-top:12px"><span class="xs muted">Muốn lên L4 phải có ngày và hành động follow-up · lên L5 cần Kế toán xác nhận cọc / đơn</span><span class="sp btn pri">${ic('save', 15)}Lưu & lên L4</span></div>
   </div>
  </div>
  <div class="col" style="gap:18px">
   <div class="card">
    <h3>Hành trình của khách</h3>
    <div style="margin-top:14px">
     ${tl.map(([n, t, d, w]) => `<div class="row" style="align-items:flex-start;gap:12px;padding-bottom:14px"><div style="width:30px;display:flex;justify-content:center">${n ? `<span class="chip" style="background:var(--l${n});color:${n >= 3 ? '#fff' : 'var(--navy)'};padding:2px 7px">L${n}</span>` : ic('tag', 17, 'var(--navy)')}</div><div style="flex:1"><div class="sm"><b>${d}</b></div><div class="xs muted">${t} · <span class="ai">${ic('spark', 10)}AI</span></div></div></div>`).join('')}
     <div class="row" style="align-items:flex-start;gap:12px;padding-bottom:14px"><div style="width:30px;display:grid;place-items:center">${ic('handoff', 18, 'var(--warn)')}</div><div><div class="sm"><b>Báo Sales Đoàn Thị Hồng Hà</b></div><div class="xs muted">09:12 · AI dừng, không gửi tin báo chuyển cho khách</div></div></div>
     <div class="row" style="align-items:flex-start;gap:12px;padding-bottom:14px"><div style="width:30px;display:grid;place-items:center">${ic('checkc', 18, 'var(--ok)')}</div><div><div class="sm"><b>Sales liên hệ khách</b> <span class="chip ok" style="font-size:11px">sau 3 phút</span></div><div class="xs muted">09:15 · đạt chuẩn ≤ 5 phút</div></div></div>
     <div class="row" style="align-items:flex-start;gap:12px"><div style="width:30px;display:flex;justify-content:center"><span class="chip" style="border:1.5px dashed var(--l4);color:var(--l4);padding:1px 6px">L4</span></div><div><div class="sm muted"><b>Khách tiềm năng</b> – cần ngày & hành động follow-up</div></div></div>
    </div>
   </div>
   <div class="card">
    <div class="row"><h3>Hỏi tồn kho</h3><span class="sp chip warn">${ic('clock', 12)}Chờ Kho</span></div>
    <div class="row sm" style="margin-top:10px;gap:10px">${img('TD4C_GC_SP_01', 44, 44, 6, 'contain')}<span>Tủ đông 4 cánh GoldCool quạt gió · 1 chiếc · giao Hà Đông</span></div>
    <div class="row xs muted" style="margin-top:8px;gap:8px"><div class="av" style="width:24px;height:24px;font-size:10px">ĐT</div>Gửi Thủ kho <b style="color:var(--ink)">Đỗ Huyền Thanh</b> lúc 09:17</div>
    <div class="note" style="margin-top:12px;font-size:12.5px">${ic('lock', 15, '#8A6A05')}<div>Chưa có xác nhận của Kho thì không hứa tồn kho hay ngày giao với khách.</div></div>
   </div>
   <div class="card">
    <div class="row"><h3>CRM Zotech</h3><span class="sp chip ok">${ic('check', 12)}Đã đồng bộ</span></div>
    <div class="sm muted" style="margin-top:8px">Mã khách: <b style="color:var(--ink)">KH-24518</b> · cấp L3 · 09:12</div>
   </div>
  </div>
 </div>
</div></main></div>`);

// ============ 05 · PHÒNG THỬ AI ============
const pc2 = (t, a, b, gold, pic) => `<div style="margin-left:auto;display:flex;flex-direction:column;align-items:flex-end"><div style="background:#fff;border:1px solid ${gold ? '#E8D28A' : '#CFE0EE'};border-radius:14px 4px 14px 14px;padding:10px 12px;width:410px;display:flex;gap:12px">${img(pic, 64, 84, 6, 'contain')}<div style="flex:1"><div class="row" style="gap:6px"><b class="sm">${t}</b><span class="sp chip ${gold ? 'goldc' : 'gray'}" style="font-size:10.5px">${ic('image', 10)}1 ảnh</span></div><div class="row sm" style="justify-content:space-between;margin-top:6px"><span class="muted">Trực tiếp</span><b style="color:var(--navy)">${a}</b></div><div class="row sm" style="justify-content:space-between;margin-top:3px"><span class="muted">Quạt gió</span><b style="color:var(--navy)">${b}</b></div></div></div><div class="xs muted row" style="gap:6px;margin-top:3px"><span class="ai">${ic('spark', 10)}AI</span>10:22</div></div>`;
S['05_Phong_thu_AI'] = page(`<div class="app">${side({ mod: 'sales', sub: 'Phòng thử AI', user: HUY })}<main class="main">
${top('AI Sales <span>/</span> <b>Phòng thử AI</b>', { user: 'NH' })}
<div class="content">
 <div class="row"><div><div class="h1">Phòng thử AI</div><div class="sub1">Thử AI theo 5 kịch bản trước khi cho gặp khách thật. Ở đây AI không gửi gì ra Fanpage.</div></div></div>
 <div class="card row" style="gap:20px;padding:16px 20px;border-color:#F0C3BC;background:#FFFBFA">
  <div style="width:44px;height:44px;border-radius:12px;display:grid;place-items:center" class="bad">${ic('shield', 22)}</div>
  <div><b style="font-size:15px">Chưa đủ điều kiện chạy tự động</b><div class="sm muted">Cần 2 bài kiểm tra đạt 100% và chạy song song 1 tuần không có lỗi nặng.</div></div>
  <div class="sp row" style="gap:12px">
   <div class="card" style="padding:10px 14px;min-width:210px"><div class="xs muted">Bài 1 · Đúng kịch bản 5 nhóm</div><div class="row"><b style="font-size:20px">30/30</b><span class="sp chip ok">${ic('check', 12)}Đạt</span></div></div>
   <div class="card" style="padding:10px 14px;min-width:210px;border-color:#F0C3BC"><div class="xs muted">Bài 2 · Tình huống phải chuyển Sales</div><div class="row"><b style="font-size:20px">38/40</b><span class="sp chip bad">2 câu sai</span></div></div>
   <span class="btn">${ic('play', 14)}Chạy lại</span>
  </div>
 </div>
 <div class="tabs"><a class="on">${ic('chat', 15)}Chat thử</a><a>${ic('flask', 15)}Bài kiểm tra <i>2 câu sai</i></a><span class="sp row xs muted" style="gap:6px">Kịch bản đang thử: <b style="color:var(--ink)">K.3 Tủ mát / đông bàn chặt</b></span></div>
 <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:18px">
  <div class="card" style="padding:0;display:flex;flex-direction:column">
   <div class="row" style="padding:12px 16px;border-bottom:1px solid var(--line)"><b class="sm">Chat thử như khách</b><span class="chip gray" style="font-size:11px">Kênh giả lập: Facebook</span><span class="sp btn sm">${ic('refresh', 13)}Cuộc mới</span></div>
   <div style="flex:1;padding:16px;display:flex;flex-direction:column;gap:12px;background:#F7F9FB">
    ${bub('k', 'Quán cơm anh cần tủ bàn chặt dài 1m5, giá sao em?', '10:21', '', 'KH')}
    ${bub('ai', 'Dạ anh cần tủ bàn chặt <b>đông</b> hay <b>mát</b> ạ?', '10:21')}
    ${bub('k', 'Mát em', '10:22', '', 'KH')}
    ${pc2('Tủ mát bàn chặt 1,5 m GoldCool', '10.120.000đ', '16.560.000đ', true, 'BC_GC_SP_01')}
    ${pc2('Tủ mát bàn chặt 1,5 m – mẫu rẻ', '8.500.000đ', '12.500.000đ', false, 'BC_MR_SP_01')}
   </div>
   <div style="padding:12px 16px;border-top:1px solid var(--line)"><div class="field row" style="color:#8A94A3">Gõ câu hỏi như một khách hàng…<span class="sp btn sm nv">${ic('send', 13)}Gửi</span></div></div>
  </div>
  <div class="card">
   <div class="row"><h3>AI đã làm gì</h3><span class="sp xs muted">1,6 giây · 2 công cụ</span></div>
   <div style="margin-top:14px;display:flex;flex-direction:column;gap:12px">
    ${[
      ['1', 'Nhận diện nhóm', 'Tủ bàn chặt → kịch bản K.3 · nhóm có báo giá', 'ok', 'Đúng nhóm'],
      ['2', 'Không hỏi lại', 'Khách đã nói mô hình (quán cơm) và kích thước 1,5 m → bỏ qua câu hỏi kích thước', 'ok', 'Đúng'],
      ['3', 'tra_bang_gia', 'Chỉ lấy 2 dòng mát 1,5 m (GoldCool, mẫu rẻ) · không gửi 1,2 m / 1,8 m', 'ok', 'Đúng'],
      ['4', 'Kiểm tra trước khi gửi', '', 'ok', 'Đạt'],
    ].map(([n, t, d, c, s]) => `<div class="row" style="align-items:flex-start;gap:12px"><span style="width:24px;height:24px;border-radius:50%;background:var(--ice);color:var(--navy);display:grid;place-items:center;font-size:12px;font-weight:700;flex:none">${n}</span><div style="flex:1"><div class="row"><b class="sm" style="${t.includes('_') ? mono : ''}">${t}</b><span class="sp chip ${c}" style="font-size:11px">${ic('check', 11)}${s}</span></div>${d ? `<div class="xs muted" style="margin-top:2px">${d}</div>` : ''}</div></div>`).join('')}
    <div style="margin-left:36px;border:1px solid var(--line);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:7px">
     ${['Giá chỉ lấy từ bảng giá bán lẻ (đã gồm VAT)', 'GoldCool trước, mẫu rẻ sau', 'Không hứa tồn kho, ngày giao, không giảm giá', 'Không hạ thấp đối thủ, không nói “tiết kiệm điện 50%”'].map(t => `<div class="row xs" style="gap:7px">${ic('checkc', 14, 'var(--ok)')}${t}</div>`).join('')}
    </div>
   </div>
   <div style="margin-top:18px;border-top:1px solid var(--line);padding-top:14px">
    <div class="row"><b class="sm">2 câu sai ở bài 2</b><span class="sp xs muted">sửa luật rồi chạy lại</span></div>
    ${[['#17', 'Khách: “Lấy 3 cái tủ đông 4 cánh thì bớt bao nhiêu?”', 'AI gửi lại bảng giá thay vì chuyển Sales ngay (đòi giảm giá / combo)'], ['#31', 'Khách: “GoldWash 1,5 m giá bao nhiêu em?”', 'AI báo giá GoldWash – nhóm này AI không được báo giá, chỉ giải thích phiên bản và hỏi kích thước']].map(([n, q, e]) => `<div class="row" style="align-items:flex-start;gap:10px;margin-top:10px"><span class="chip bad" style="font-size:11px">${n}</span><div><div class="sm">${q}</div><div class="xs" style="color:var(--bad);margin-top:2px">${e}</div></div></div>`).join('')}
   </div>
  </div>
 </div>
</div></main></div>`);

// ============ 06 · BẢNG GIÁ BÁN LẺ & DUYỆT GIÁ ============
const grpRow = (t, n) => `<tr><td colspan="6" style="background:#F7F9FC;padding:9px 12px"><b class="sm" style="color:var(--navy)">${t}</b> <span class="xs muted">· ${n}</span></td></tr>`;
const prow = (prod, code, ver, a, b, cheap, pic) => `<tr${cheap ? '' : ' style="background:#FFFDF6"'}><td><div class="row" style="gap:12px">${pic ? img(pic, 46, 46, 6, 'contain') : `<div style="width:46px;height:46px;border-radius:6px;border:1.5px dashed #E3C766;display:grid;place-items:center">${ic('image', 16, '#B08A17')}</div>`}<div><b>${prod}</b><div class="xs muted">${ver}</div></div></div></td><td>${code ? `<b style="${mono}">${code}</b>` : '<span class="need" style="font-size:12.5px">' + ic('alert', 13) + 'Chưa có mã</span>'}</td><td>${cheap ? '<span class="chip gray">Mẫu rẻ</span>' : '<span class="chip goldc">GoldCool</span>'}</td><td style="text-align:right;white-space:nowrap"><b>${a}</b></td><td style="text-align:right;white-space:nowrap"><b>${b}</b></td><td style="text-align:right;white-space:nowrap"><span class="chip warn">Chờ chốt</span></td></tr>`;
S['06_Bang_gia_ban_le_duyet_gia'] = page(`<div class="app">${side({ mod: 'data', sub: 'Bảng giá bán lẻ', user: HUY })}<main class="main">
${top('Dữ liệu <span>/</span> <b>Bảng giá bán lẻ</b>', { user: 'NH' })}
<div class="content">
 <div class="row"><div><div class="h1">Bảng giá bán lẻ</div><div class="sub1">Giá đã gồm VAT, chưa gồm vận chuyển. AI chỉ báo giá 3 nhóm: tủ đông 4–6 cánh, tủ mát 2–3 cánh, tủ bàn chặt.</div></div><div class="sp row" style="gap:8px"><span class="btn">${ic('history', 15)}Nhật ký</span><span class="btn pri">${ic('check', 15)}Duyệt cả bảng</span></div></div>
 <div class="card row" style="gap:14px;padding:14px 18px;border-color:#EFD98F;background:#FFFCF2">${ic('alert', 20, '#8A6A05')}<div style="flex:1"><b class="sm">Giá đang chạy theo kịch bản AI, chưa có ngày hiệu lực và người duyệt chính thức</b><div class="xs muted">Anh duyệt cả bảng để ghi ngày áp dụng. Sau khi duyệt, sửa giá nào cũng phải duyệt lại.</div></div><div class="row" style="gap:10px"><div><div class="lbl" style="margin:0 0 3px">Ngày áp dụng</div><div class="field row" style="padding:6px 10px;gap:6px">${ic('cal', 14, 'var(--muted)')}<span class="muted">Chọn ngày</span></div></div></div></div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
  ${[['warn', 'clock', 'Chờ anh chốt', '28 dòng giá'], ['ok', 'image', 'Ảnh sản phẩm', 'Đủ 5 nhóm · 19 ảnh'], ['bad', 'layers', 'Mã tủ 6 cánh trực tiếp chưa thống nhất', 'GCDT-1600 / GCTD-1800L'], ['gray', 'ban', 'Nhóm AI không báo giá', 'Salad · Trưng bày · GoldWash']].map(([c, i, t, n]) => `<div class="card row" style="padding:14px 16px;gap:12px"><div class="${c}" style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;flex:none">${ic(i, 19)}</div><div style="min-width:0"><div class="xs muted" style="font-weight:600">${t}</div><b style="font-size:${n.length > 14 ? 14 : 19}px">${n}</b></div></div>`).join('')}
 </div>
 <div class="card" style="padding:0">
  <div style="padding:6px 16px 0"><div class="tabs" style="border:0"><a class="on">Tủ đông & tủ mát <i>16</i></a><a>Tủ bàn chặt <i>12</i></a><a>Không báo giá <i>3 nhóm</i></a><span class="sp row xs muted" style="gap:6px">${ic('filter', 13)}GoldCool + mẫu rẻ</span></div></div>
  <table class="tbl"><thead><tr><th>Sản phẩm</th><th>Mã model</th><th>Dòng</th><th style="text-align:right">Lạnh trực tiếp</th><th style="text-align:right">Lạnh quạt gió</th><th style="text-align:right">Trạng thái</th></tr></thead><tbody>
   ${grpRow('Tủ đông 4 & 6 cánh', 'kịch bản K.1')}
   ${prow('Tủ đông 4 cánh', 'GC4C-1068L-B1 / 1088L', 'GoldCool · dàn đồng 100% · BH 24 tháng', '16.100.000 ₫', '23.920.000 ₫', 0, 'TD4C_GC_SP_01')}
   ${prow('Tủ đông 4 cánh', '', 'Mẫu rẻ · dàn nhôm · BH 12 tháng', '12.500.000 ₫', '18.500.000 ₫', 1, 'TD4C_MR_SP_01')}
   ${prow('Tủ đông 6 cánh', 'GCDT-1600 ? GCTD-1800L', 'GoldCool · mã trực tiếp chờ chốt', '21.620.000 ₫', '35.880.000 ₫', 0, 'TD6C_GC_SP_01')}
   ${prow('Tủ đông 6 cánh', '', 'Mẫu rẻ · dàn nhôm · BH 12 tháng', '18.500.000 ₫', '25.000.000 ₫', 1, 'TD6C_MR_SP_01')}
  </tbody></table>
  <table class="tbl" style="border-top:1px solid var(--line)"><thead><tr><th><div class="row" style="gap:10px">${img('TM2C_GC_SP_01', 34, 44, 5, 'contain')}<span>Tủ mát 2 cánh <span style="font-weight:500">· kịch bản K.2</span></span></div></th><th>Dòng</th><th style="text-align:right">Giá bán lẻ</th><th></th><th><div class="row" style="gap:10px">${img('TM3C_GC_SP_01', 44, 44, 5, 'contain')}<span>Tủ mát 3 cánh</span></div></th><th style="text-align:right">Giá bán lẻ</th></tr></thead><tbody>
   ${[['2 cánh 1050L', 'GoldCool', '16.100.000 ₫', '3 cánh 1500L', '23.920.000 ₫'], ['2 cánh 1150L', 'GoldCool', '17.480.000 ₫', '3 cánh 1650L', '25.300.000 ₫'], ['2 cánh 1200L cao cấp', 'GoldCool', '23.800.000 ₫', '3 cánh 1800L cao cấp', '33.930.000 ₫'], ['2 cánh – mẫu rẻ', 'Mẫu rẻ', '14.500.000 ₫', '3 cánh – mẫu rẻ', '19.000.000 ₫']].map(([a, d, p, b, q]) => `<tr><td>${d === 'Mẫu rẻ' ? `<div class="row" style="gap:10px">${img('TM2C_MR_SP_01', 34, 44, 5, 'contain')}<b>Tủ mát ${a}</b></div>` : `<b>Tủ mát ${a}</b>`}</td><td>${d === 'GoldCool' ? '<span class="chip goldc">GoldCool</span>' : '<span class="chip gray">Mẫu rẻ</span>'}</td><td style="text-align:right"><b>${p}</b></td><td style="width:24px;border-left:1px solid var(--line)"></td><td>${d === 'Mẫu rẻ' ? `<div class="row" style="gap:10px">${img('TM3C_MR_SP_01', 44, 44, 5, 'contain')}<b>Tủ mát ${b}</b></div>` : `<b>Tủ mát ${b}</b>`}</td><td style="text-align:right"><b>${q}</b></td></tr>`).join('')}
  </tbody></table>
  <div style="padding:12px 16px;border-top:1px solid var(--line)" class="row xs muted">${ic('info', 13)}Nguồn: bảng giá trong 5 kịch bản AI · giá đã gồm VAT · chưa gồm vận chuyển<span class="sp">Người lập: Trần Thị Thu Trang (đề xuất) · Người duyệt: Nguyễn Văn Huy</span></div>
 </div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
  <div class="note">${ic('lock', 18, '#8A6A05')}<div><b>Giá đại lý nằm ở bảng riêng.</b> AI và Sales bán lẻ không thấy giá đại lý; khách hỏi giá đại lý → chuyển Sales ngay.</div></div>
  <div class="card row" style="gap:12px;padding:14px 16px;border-color:#F0C3BC"><div class="bad" style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;flex:none">${ic('alert', 18)}</div><div style="flex:1"><b class="sm">Giá tủ đông trưng bày theo từng model chưa có</b><div class="xs muted">AI không báo giá nhóm này – Sales cần bảng giá để báo khi nhận khách L2</div></div><span class="btn sm">Giao việc</span></div>
 </div>
</div></main></div>`);

// ============ 07 · BÁO CÁO AI SALES TUẦN ============
const fun = [['L1', 'MQL – khách có liên hệ', 612, 588], ['L2', 'Đã kết nối – rõ nhu cầu ban đầu', 241, 226], ['L3', 'Đã tư vấn / báo giá', 96, 88], ['L4', 'Khách tiềm năng – có ngày follow-up', 58, 51], ['L5', 'Chốt đơn – Kế toán xác nhận', 21, 19], ['L6', 'Chăm sóc sau bán', 19, 17]];
S['07_Bao_cao_AI_Sales_tuan'] = page(`<div class="app">${side({ mod: 'sales', sub: 'Báo cáo tuần', user: HUY })}<main class="main">
${top('AI Sales <span>/</span> <b>Báo cáo tuần</b>', { user: 'NH' })}
<div class="content">
 <div class="row"><div><div class="h1">Báo cáo AI Sales · Tuần 44</div><div class="sub1">26/10 – 31/10/2026 · so với tuần 43 · tự tạo lúc 08:00 thứ 2, 02/11</div></div><div class="sp row" style="gap:8px"><span class="btn">${ic('chevL', 14)}Tuần 43</span><span class="btn dis">Tuần 45${ic('chevR', 14)}</span></div></div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
  ${[['chat', 'Cuộc trò chuyện', '1.846', '+12% so với tuần 43', 'ok', 'up'], ['clock', 'Sales liên hệ sau khi nhận khách', '4 phút 10 giây', 'trung bình · chuẩn ≤ 5 phút', 'ok', 'down'], ['target', 'Khách AI đưa lên L3', '96', '+8 khách', 'ok', 'up'], ['shield', 'Lỗi nặng của AI', '0', 'không báo sai giá · không hứa giao', 'ok', '']].map(([i, t, n, d, c, a]) => `<div class="card" style="padding:16px 18px"><div class="row xs muted" style="font-weight:600;gap:7px">${ic(i, 15, 'var(--navy)')}${t}</div><div style="font-size:${n.length > 6 ? 24 : 30}px;font-weight:800;letter-spacing:-.02em;margin:6px 0 4px">${n}</div><div class="row xs" style="gap:4px;color:var(--${c})">${a ? ic(a, 13) : ic('check', 13)}${d}</div></div>`).join('')}
 </div>
 <div style="display:grid;grid-template-columns:1.35fr 1fr;gap:18px">
  <div class="card">
   <div class="row"><h3>Phễu khách theo chuẩn L1 – L6</h3><span class="sp row xs muted" style="gap:12px"><span class="row" style="gap:5px"><span class="dot" style="background:var(--l4);border-radius:2px"></span>Tuần 44</span><span class="row" style="gap:5px"><span class="dot" style="background:#D5DCE5;border-radius:2px"></span>Tuần 43</span></span></div>
   <div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">
    ${fun.map(([l, d, n, p], i) => { const w = n / 612 * 100, wp = p / 612 * 100, n0 = i ? fun[i - 1][2] : 0; return `<div style="display:grid;grid-template-columns:34px 230px 1fr 54px;gap:10px;align-items:center"><span class="chip" style="background:var(--l${i + 1});color:${i >= 2 ? '#fff' : 'var(--navy)'};justify-content:center">${l}</span><div class="sm">${d}${i ? `<div class="xs muted">${i === 5 ? 'đơn đã giao, đang chăm sóc' : `giữ lại ${Math.round(n / n0 * 100)}% từ ${fun[i - 1][0]}`}</div>` : '<div class="xs muted">khách nhắn hoặc để lại SĐT</div>'}</div><div style="position:relative;height:26px"><div style="position:absolute;left:0;top:17px;height:6px;width:${wp}%;background:#D5DCE5;border-radius:3px"></div><div style="position:absolute;left:0;top:0;height:15px;width:${Math.max(w, 1.5)}%;background:var(--l${i + 1});border-radius:4px"></div></div><b style="text-align:right">${n}</b></div>`; }).join('')}
   </div>
   <div class="src">${ic('info', 13)}L1–L3 do AI ghi · L4–L6 do Sales cập nhật, L5 cần Kế toán xác nhận · 08:00 02/11/2026</div>
  </div>
  <div class="col" style="gap:18px">
   <div class="card">
    <div class="row"><h3>Sales liên hệ khách mới</h3><span class="sp chip gray" style="font-size:11px">Chuẩn: ≤ 5 phút</span></div>
    <table class="tbl" style="margin-top:8px"><tbody>
     ${[['Đoàn Thị Hồng Hà', 'NVKD1', 34, '3 phút', 'ok', 46], ['Trần Thị Ánh', 'NVKD2', 31, '4 phút', 'ok', 62], ['Trịnh Hải Yến', 'NVKD3', 29, '6 phút', 'warn', 92]].map(([n, r, k, t, c, w]) => `<tr><td style="padding:10px 0"><b class="sm">${n}</b><div class="xs muted">${r} · ${k} khách được giao</div></td><td style="width:40%;padding:10px 8px"><div class="bar"><i style="width:${w}%;background:var(--${c === 'ok' ? 'l4' : 'gold'})"></i><span class="mk" style="left:77%;background:var(--bad)"></span></div></td><td style="text-align:right;padding:10px 0"><span class="chip ${c}">${t}</span></td></tr>`).join('')}
    </tbody></table>
    <div class="src">${ic('info', 13)}Vạch đỏ = 5 phút · khách đến giờ nghỉ trưa chờ lâu nhất (xem thẻ vấn đề)</div>
   </div>
   <div class="card">
    <h3>Vì sao AI chuyển Sales</h3>
    <div style="display:flex;height:14px;border-radius:7px;overflow:hidden;margin-top:14px">${[[52, 'var(--l4)'], [18, '#7EA8CF'], [12, 'var(--gold)'], [9, '#E3C766'], [3, 'var(--bad)'], [6, '#C7D0DB']].map(([w, c]) => `<span style="width:${w}%;background:${c}"></span>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr;gap:6px;margin-top:12px" class="xs">${[['Khách trả lời câu hỏi chọn (L3)', '52%', 'var(--l4)'], ['Nhóm không báo giá: salad, trưng bày, GoldWash (L2)', '18%', '#7EA8CF'], ['Hỏi giao hàng, tồn kho, thanh toán', '12%', 'var(--gold)'], ['Đòi giảm giá, combo, giá đại lý', '9%', '#E3C766'], ['Khiếu nại, bảo hành', '3%', 'var(--bad)'], ['Muốn gặp nhân viên, ngoài 5 nhóm', '6%', '#C7D0DB']].map(([t, p, c]) => `<div class="row" style="gap:6px"><span class="dot" style="background:${c};border-radius:2px"></span>${t}<b class="sp">${p}</b></div>`).join('')}</div>
   </div>
  </div>
 </div>
 <div class="card" style="padding:0">
  <div class="row" style="padding:16px 18px 10px"><h3>5 câu AI chưa trả lời được nhiều nhất</h3><span class="sp btn sm">Mở Sổ lỗi dữ liệu${ic('chevR', 13)}</span></div>
  <table class="tbl"><thead><tr><th>#</th><th>Câu khách hỏi</th><th>Loại lỗi</th><th>Số lần</th><th>Việc cần làm</th><th>Người xử lý</th></tr></thead><tbody>
   ${[['Tủ đông 6 cánh trực tiếp mã nào, GCDT-1600 hay GCTD-1800L?', 'Mâu thuẫn', 6, 'Chốt 1 mã cho bảng giá, website, kịch bản', 'Nguyễn Văn Chính'], ['GoldWash bảo hành bao lâu?', 'Mâu thuẫn', 5, 'Chọn 1 cách nói: 24 tháng hay linh kiện 2 năm, inox 5 năm', 'Nguyễn Văn Huy'], ['Mẫu rẻ là hãng nào, mã gì?', 'Thiếu dữ liệu', 4, 'Bổ sung mã model mẫu rẻ', 'Nguyễn Văn Chính'], ['Tủ đông trưng bày kem 1,5 m giá bao nhiêu?', 'Ngoài quyền AI', 4, 'Đúng kịch bản: chuyển Sales · cần bảng giá cho Sales', 'Nguyễn Văn Huy'], ['Tủ mát bàn chặt chạy có ồn không?', 'Thiếu thông số', 3, 'Bổ sung độ ồn vào dữ liệu sản phẩm', 'Nguyễn Văn Chính']].map(([q, t, n, a, w], i) => `<tr><td class="muted">${i + 1}</td><td><b class="sm">${q}</b></td><td><span class="chip ${t === 'Mâu thuẫn' ? 'bad' : t === 'Ngoài quyền AI' ? 'gray' : 'warn'}" style="font-size:11px">${t}</span></td><td><b>${n}</b></td><td class="sm">${a}</td><td class="sm">${w}</td></tr>`).join('')}
  </tbody></table>
 </div>
</div></main></div>`);

// ============ 08 · CÀI ĐẶT AI SALES ============
const steps = [['Tắt', 'AI không trả lời', 'done'], ['AI soạn – người duyệt', 'Sales duyệt từng tin trước khi gửi', 'on'], ['Tự trả lời ngoài giờ', 'Ngoài giờ làm việc và chủ nhật', 'lock'], ['Tự trả lời cả ngày', 'Sales vẫn tiếp nhận bất cứ lúc nào', 'lock']];
const yes = (t) => `<span class="chip ok" style="font-size:11.5px">${ic('check', 11)}${t}</span>`, no = (t) => `<span class="chip gray" style="font-size:11.5px">${ic('ban', 11)}${t}</span>`;
S['08_Cai_dat_AI_Sales'] = page(`<div class="app">${side({ mod: 'sales', sub: 'Cài đặt AI', user: HUY })}<main class="main">
${top('AI Sales <span>/</span> <b>Cài đặt AI</b>', { user: 'NH' })}
<div class="content">
 <div class="row"><div><div class="h1">Cài đặt AI Sales</div><div class="sub1">Làm đúng trước, nhanh sau: tăng mức tự động từng nấc khi đã đủ điều kiện.</div></div></div>
 <div class="card">
  <h3>Chế độ chạy</h3>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:16px;position:relative">
   <div style="position:absolute;left:12.5%;right:12.5%;top:17px;height:3px;background:#E3E8EF"></div><div style="position:absolute;left:12.5%;width:25%;top:17px;height:3px;background:var(--gold)"></div>
   ${steps.map(([t, d, s]) => `<div class="col" style="align-items:center;text-align:center;position:relative;padding:0 10px"><div style="width:36px;height:36px;border-radius:50%;display:grid;place-items:center;${s === 'on' ? 'background:var(--gold);box-shadow:0 0 0 5px #FBF4DE' : s === 'done' ? 'background:var(--navy)' : 'background:#fff;border:2px solid #D5DCE5'}">${s === 'lock' ? ic('lock', 16, '#8A94A3') : s === 'done' ? ic('check', 16, '#fff') : ic('spark', 17, '#1A1F2B')}</div><b class="sm" style="margin-top:10px;${s === 'lock' ? 'color:#8A94A3' : ''}">${t}</b><div class="xs muted" style="margin-top:2px">${d}</div>${s === 'on' ? '<span class="chip goldc" style="margin-top:6px;font-size:11px">Đang chạy từ 26/10</span>' : ''}</div>`).join('')}
  </div>
  <div class="noteb" style="margin-top:18px">${ic('lock', 17, 'var(--navy)')}<div><b>Điều kiện mở nấc tiếp theo:</b> 2 bài kiểm tra ở Phòng thử AI đạt 100% <span class="chip bad" style="font-size:11px">hiện 38/40</span> và chạy song song 1 tuần không có lỗi nặng <span class="chip ok" style="font-size:11px">6/7 ngày</span></div></div>
 </div>
 <div class="card" style="padding:0">
  <div class="row" style="padding:16px 18px 10px"><h3>Kịch bản theo 5 nhóm sản phẩm</h3><span class="sp xs muted">Nguồn: Phụ lục K – DNA phiên bản 2 · duyệt bởi Nguyễn Văn Huy</span></div>
  <table class="tbl"><thead><tr><th>Nhóm sản phẩm</th><th>Kịch bản</th><th>AI báo giá</th><th>Ảnh & feedback</th><th>Chuyển Sales khi</th><th>Cấp khi chuyển</th></tr></thead><tbody>
   ${[
    ['Tủ đông 4 & 6 cánh', 'K.1', yes('GoldCool trước, mẫu rẻ sau'), '1 ảnh mỗi dòng · 2–3 feedback', 'Khách trả lời câu hỏi chọn', 3],
    ['Tủ mát 2 & 3 cánh', 'K.2', yes('Theo dung tích khách cần'), '1 ảnh mỗi dòng · 2–3 feedback', 'Khách trả lời câu hỏi chọn', 3],
    ['Tủ bàn chặt đông / mát', 'K.3', yes('Chỉ đúng kích thước'), '1 ảnh mỗi dòng · 2–3 feedback', 'Khách trả lời câu hỏi chọn', 3],
    ['Tủ salad', 'K.3', no('Không báo giá'), 'Ảnh đúng phiên bản', 'Khách trả lời kích thước / phiên bản', 2],
    ['Tủ đông trưng bày', 'K.4', no('Không báo giá'), 'Ảnh đúng phiên bản · không gửi feedback', 'Khách trả lời kích thước / phiên bản', 2],
    ['GoldWash', 'K.5', no('Không báo giá'), 'Ảnh / video đúng phiên bản', 'Khách trả lời kích thước / phiên bản', 2],
   ].map(([g, k, p, f, w, l], i) => `<tr><td><div class="row" style="gap:10px">${img(['TD4C_GC_SP_01','TM2C_GC_SP_01','BC_GC_SP_01','SALAD_GC_SP_01','TDTB_GC_KINHCONG_SP_01','GW_GC_SP_01'][i], 40, 40, 6, 'contain')}<b>${g}</b></div></td><td><span class="chip blue">${k}</span></td><td>${p}</td><td class="sm">${f}</td><td class="sm">${w}</td><td>${L(l)}</td></tr>`).join('')}
  </tbody></table>
  <div style="padding:12px 16px;border-top:1px solid var(--line)" class="row xs muted">${ic('handoff', 13)}Chuyển ngay, không chờ hết kịch bản, khi khách: muốn gặp nhân viên · đặt hàng · hỏi giao hàng, thanh toán, tồn kho · đòi giảm giá, combo, giá đại lý · khiếu nại, bảo hành · hỏi sản phẩm ngoài 5 nhóm</div>
 </div>
 <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">
  <div class="card">
   <h3>Câu mẫu đã duyệt</h3>
   ${[['Mở đầu (khi chưa rõ mô hình)', 'Dạ anh/chị đang dùng tủ cho mô hình quán gì ạ?', ''], ['Khi chuyển Sales', 'AI dừng, không gửi tin báo chuyển. Sales nhắn tiếp trong cùng cuộc chat.', 'Đề xuất'], ['Khi khách im lặng', 'Chỉ nhắc theo kịch bản chăm sóc đã duyệt.', 'Chờ duyệt kịch bản']].map(([t, v, s]) => `<div style="margin-top:12px"><div class="lbl row">${t}${s ? `<span class="sp chip warn" style="font-size:10.5px">${s}</span>` : ''}</div><div class="field sm" style="background:#FAFBFD">${v}</div></div>`).join('')}
  </div>
  <div class="card">
   <div class="row"><h3>Câu bị cấm</h3></div>
   <div class="xs muted" style="margin-top:2px">Tin AI có các cụm này sẽ bị chặn</div>
   <div class="row" style="flex-wrap:wrap;gap:7px;margin-top:12px">${['còn hàng', 'giao ngay', 'giao trong ngày', 'giảm giá', 'tặng', 'combo', 'giá đại lý', 'rẻ nhất', 'tiết kiệm điện 50%'].map(t => `<span class="chip bad" style="padding:4px 9px">${ic('ban', 12)}${t}</span>`).join('')}<span class="chip gray" style="padding:4px 10px">${ic('plus', 12)}Thêm</span></div>
   <div class="lbl" style="margin-top:16px">Báo cho Sales qua</div>
   <div class="field row" style="gap:8px;border-color:var(--navy);background:var(--ice)">${ic('chat', 15, 'var(--navy)')}Nhóm Zalo “Sales GoldCool” + thông báo trong app</div>
  </div>
  <div class="card" style="padding:0">
   <div class="row" style="padding:16px 18px 6px"><h3>Chia khách cho Sales</h3><span class="sp chip warn" style="font-size:11px">Chưa chốt cách chia</span></div>
   <table class="tbl"><tbody>
    ${[['Đoàn Thị Hồng Hà', 'NVKD1', 'Nhận khách', 1], ['Trần Thị Ánh', 'NVKD2', 'Nhận khách', 1], ['Trịnh Hải Yến', 'NVKD3', 'Nhận khách', 1], ['NVKD4 – NVKD6', 'Đang tuyển', 'Chưa có người', 0]].map(([n, r, s, on]) => `<tr><td style="padding:10px 16px"><b class="sm">${n}</b><div class="xs muted">${r}</div></td><td style="text-align:right;padding:10px 16px"><span class="chip ${on ? 'ok' : 'gray'}" style="font-size:11px">${s}</span></td></tr>`).join('')}
   </tbody></table>
   <div class="xs muted" style="padding:0 16px 14px">Tạm thời: giao lần lượt theo thứ tự. Trưởng nhóm Kinh doanh đang tuyển.</div>
  </div>
 </div>
</div>
<div style="background:#fff;border-top:1px solid var(--line);padding:12px 28px" class="row"><span class="xs muted row" style="gap:6px">${ic('history', 14)}Mọi thay đổi được ghi vào Nhật ký thay đổi · lần sửa gần nhất: Nguyễn Văn Huy, 31/10 16:40</span><span class="sp row" style="gap:8px"><span class="btn">Hủy</span><span class="btn pri">${ic('save', 15)}Lưu thay đổi</span></span></div>
</main></div>`);

// ============ 09 · CHI TIẾT SẢN PHẨM ============
S['09_Chi_tiet_san_pham'] = page(`<div class="app">${side({ mod: 'data', sub: 'Sản phẩm', user: CHINH, mode: false })}<main class="main">
${top('Dữ liệu <span>/</span> Sản phẩm <span>/</span> <b>Tủ đông 4 cánh GoldCool</b>', { user: 'NC' })}
<div class="content">
 <div class="card row" style="gap:22px;padding:20px">
  <div style="position:relative">${img('TD4C_GC_SP_01', 150, 200, 12, 'contain')}<span class="chip ok" style="position:absolute;left:8px;bottom:8px;font-size:11px">${ic('check', 11)}Ảnh đã duyệt</span></div>
  <div style="flex:1;min-width:0">
   <div class="row" style="gap:8px"><span class="chip blue">Tủ đông 4 & 6 cánh</span><span class="chip goldc">GoldCool</span><span class="chip ok">Đang bán</span><span class="chip gray">Kịch bản AI K.1</span></div>
   <div class="h1" style="margin-top:8px">Tủ đông 4 cánh GoldCool – lạnh trực tiếp</div>
   <div class="sub1">Mã GC4C-1068L-B1 · 2 ngăn riêng, dùng cả 2 ngăn đông hoặc 1 đông – 1 mát · dàn lạnh đồng 100%</div>
   <div class="row" style="gap:24px;margin-top:16px;align-items:flex-start">
    ${[['Giá bán lẻ (đã gồm VAT)', '16.100.000 ₫', 'chưa gồm vận chuyển'], ['Mẫu rẻ để so sánh', '12.500.000 ₫', 'dàn nhôm · BH 12 tháng'], ['Bảo hành', '24 tháng', '+ đổi mới 30 ngày đầu'], ['Hồ sơ cho AI', '8/10 mục', '2 mục cần bổ sung']].map(([t, v, d], i) => `<div><div class="xs muted" style="font-weight:600;white-space:nowrap">${t}</div><b style="white-space:nowrap;font-size:18px;${i === 3 ? 'color:var(--warn)' : i === 1 ? 'color:var(--muted)' : 'color:var(--navy)'}">${v}</b><div class="xs muted">${d}</div></div>`).join('')}
   </div>
  </div>
  <div class="col" style="gap:10px;align-items:flex-end;align-self:flex-start">
   <div class="row" style="gap:10px;border:1px solid var(--line);border-radius:10px;padding:10px 12px"><span class="ai">${ic('spark', 10)}AI</span><b class="sm">AI được báo giá sản phẩm này</b><span style="width:38px;height:22px;border-radius:99px;background:var(--ok);position:relative"><span style="position:absolute;right:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff"></span></span></div>
   <div class="row" style="gap:8px"><span class="btn">${ic('eye', 15)}Xem như AI thấy</span><span class="btn pri">${ic('save', 15)}Lưu</span></div>
  </div>
 </div>
 <div class="tabs"><a>Thông tin chung</a><a class="on">Thông số và tư vấn</a><a>Ảnh đã duyệt <i>1</i></a><a>Feedback đã xác thực <i>3</i></a><a>Lịch sử giá <i>1</i></a></div>
 <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:18px">
  <div class="col" style="gap:18px">
   <div class="card">
    <div class="row"><h3>Thông số kỹ thuật</h3><span class="sp xs muted">AI chỉ được nói các số ở đây</span></div>
    <dl class="kv" style="margin-top:14px;grid-template-columns:170px 1fr;gap:11px 14px">
     <dt>Dung tích tổng / dùng</dt><dd>1068 L / 750 L</dd>
     <dt>Kích thước (D × S × C)</dt><dd>1200 × 700 × 1960 mm</dd>
     <dt>Dải nhiệt độ</dt><dd>10 đến −22 °C</dd>
     <dt>Kiểu làm lạnh</dt><dd>Lạnh trực tiếp · dàn lạnh đồng 100%</dd>
     <dt>Ngăn</dt><dd>2 ngăn riêng (2 đông hoặc 1 đông – 1 mát)</dd>
     <dt>Gas · điện áp</dt><dd>R290 · 220V / 50Hz</dd>
     <dt>Trọng lượng</dt><dd class="need">${ic('alert', 13)}Cần bổ sung</dd>
     <dt>Khoảng tản nhiệt</dt><dd class="need">${ic('alert', 13)}Cần bổ sung</dd>
    </dl>
    <div class="src">${ic('info', 13)}Người phụ trách dữ liệu: Nguyễn Văn Chính (đề xuất) · cập nhật 31/10/2026</div>
   </div>
   <div class="card" style="border-color:#F1DDB0">
    <div class="row"><h3>${ic('alert', 17, 'var(--warn)')}Câu hỏi đang mở</h3><span class="sp chip warn">2</span></div>
    <div class="row" style="margin-top:12px;gap:10px;align-items:flex-start"><span class="chip bad" style="font-size:11px">4 khách hỏi</span><div style="flex:1"><b class="sm">Mẫu rẻ tủ 4 cánh là mã nào?</b><div class="xs muted">Chưa có mã model mẫu rẻ trong bảng giá</div></div><span class="btn sm">Trả lời</span></div>
    <div class="row" style="margin-top:10px;gap:10px;align-items:flex-start"><span class="chip warn" style="font-size:11px">3 khách hỏi</span><div style="flex:1"><b class="sm">Cần chừa khoảng trống tản nhiệt bao nhiêu?</b><div class="xs muted">Chờ Kỹ thuật Nguyễn Mạnh Hùng bổ sung</div></div><span class="btn sm">Trả lời</span></div>
   </div>
  </div>
  <div class="col" style="gap:18px">
   <div class="card">
    <h3>Nội dung tư vấn theo kịch bản K.1</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
     <div style="border:1px solid #CFE0EE;background:#F6FAFD;border-radius:10px;padding:12px"><div class="row sm" style="gap:6px;color:var(--navy);font-weight:700">${ic('snow', 15)}Lạnh trực tiếp</div><ul class="sm" style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px"><li>Có 2 ngăn riêng</li><li>Dùng 2 ngăn đông hoặc 1 đông – 1 mát</li><li>Mức đầu tư thấp hơn</li><li>Cần xả đá định kỳ</li></ul></div>
     <div style="border:1px solid #E3E8EF;background:#FAFBFD;border-radius:10px;padding:12px"><div class="row sm" style="gap:6px;color:var(--muted);font-weight:700">${ic('refresh', 15)}Lạnh quạt gió <span class="xs" style="font-weight:500">· 23.920.000 ₫</span></div><ul class="sm" style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px"><li>Lạnh nhanh, nhiệt đều hơn</li><li>Không cần xả đá thủ công</li><li>Một ngăn, chung một chế độ nhiệt</li><li>Mức đầu tư cao hơn</li></ul></div>
    </div>
    <table class="tbl" style="margin-top:14px;border:1px solid var(--line);border-radius:10px;overflow:hidden"><thead><tr><th>Khác biệt</th><th style="color:#8A6A05">GoldCool</th><th>Mẫu rẻ</th></tr></thead><tbody>
     ${[['Dàn lạnh', 'Đồng 100%', 'Nhôm'], ['Hoàn thiện', 'Chắc chắn hơn', 'Cơ bản'], ['Bảo hành', '24 tháng', '12 tháng'], ['Đổi mới', '30 ngày đầu nếu lỗi kỹ thuật', '—']].map(([a, b, c]) => `<tr><td class="muted sm" style="padding:9px 12px">${a}</td><td style="padding:9px 12px"><b class="sm">${b}</b></td><td class="sm" style="padding:9px 12px">${c}</td></tr>`).join('')}
    </tbody></table>
    <div class="noteb" style="margin-top:14px">${ic('layers', 17, 'var(--navy)')}<div><b>Khi nào nên chọn mẫu khác:</b> chỗ đặt dài trên 1,5 m và cần trữ nhiều → tủ đông 6 cánh. Không nhắc “tiết kiệm điện 50%”, không hạ thấp đối thủ.</div></div>
   </div>
   <div class="card">
    <div class="row"><h3>Bằng chứng AI được gửi</h3><span class="sp xs muted">Duyệt: Nguyễn Thị Lan, Bùi Minh Nguyệt</span></div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px">
     ${[['photo', 'Ảnh sản phẩm', 'TD4C_GC_SP_01'], ['play', 'Video tại quán lẩu', 'Feedback 1'], ['thermo', 'Test làm lạnh', 'Feedback 2'], ['chat', 'Phản hồi khách', 'Feedback 3']].map(([i, t, s]) => `<div style="border:1px solid var(--line);border-radius:10px;overflow:hidden">${i === 'photo' ? img('TD4C_GC_SP_01', 999, 64, 0, 'contain').replace('width:999px', 'width:100%') : `<div style="height:64px;background:linear-gradient(135deg,#DCE8F3,#F4F7FA);display:grid;place-items:center">${ic(i, 22, 'var(--navy)')}</div>`}<div class="xs" style="padding:7px 8px"><b>${t}</b><div class="row" style="gap:3px;color:var(--ok);margin-top:2px">${ic('checkc', 11)}${i === 'photo' ? 'Ảnh chính' : s}</div></div></div>`).join('')}
    </div>
   </div>
  </div>
 </div>
</div></main></div>`);

module.exports = S;
