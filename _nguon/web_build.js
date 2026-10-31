// Sinh các trang website GoldCool (web/*.html) từ phần đầu, chân trang dùng chung.
// Chạy: node _nguon/web_build.js
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'web');

const I = {
  snow: '<path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2M4 9l2 3-2 3M20 9l-2 3 2 3"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  thermo: '<path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  shieldc: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
};
const ic = (n, s = 20, c = 'currentColor', w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const NAV = [['index.html#san-pham', 'Sản phẩm'], ['index.html#vi-sao', 'Vì sao GoldCool'], ['index.html#so-sanh', 'So sánh'], ['index.html#quy-trinh', 'Quy trình'], ['tin-tuc.html', 'Tin tức'], ['index.html#tu-van', 'Liên hệ']];
const logo = `<a class="logo" href="index.html" aria-label="GoldCool – Trang chủ"><span class="mk">${ic('snow', 24, '#0F3D63', 2.2)}</span><span><span class="g">Gold</span><span class="c">Cool</span></span></a>`;
const header = (on, solid) => `<header class="hdr${solid ? ' solid' : ''}">
 ${logo}
 <nav class="nav" aria-label="Menu chính">${NAV.map(([h, t]) => `<a href="${h}"${t === on ? ' class="on"' : ''}>${t}</a>`).join('')}</nav>
 <div class="sp"><a class="hot" href="tel:0865868868">${ic('phone', 18, '#E6C35C')}0865 868 868</a><a class="btn g" href="index.html#tu-van" style="height:46px;padding:0 20px;font-size:15px">Nhận tư vấn</a><button class="burger" aria-label="Mở menu" aria-expanded="false">${ic('menu', 26)}</button></div>
</header>
<nav class="mnav" aria-label="Menu điện thoại">${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="tel:0865868868">Gọi 0865 868 868</a></nav>`;
const footer = `<footer class="ft"><div class="wrap in">
 <div class="ftg">
  <div>${logo.replace('class="logo"', 'class="logo" style="color:#fff"')}<p style="margin-top:18px;font-size:14.5px;line-height:1.6;max-width:320px">Chọn đúng – Dùng lâu. Lạnh sâu – Bền lâu – Tiết kiệm điện. Thiết bị lạnh và thiết bị bếp cho cơ sở F&amp;B.</p></div>
  <div><h4>Sản phẩm</h4><ul><li><a href="index.html#san-pham">Tủ đông 4 &amp; 6 cánh</a></li><li><a href="index.html#san-pham">Tủ mát 2 &amp; 3 cánh</a></li><li><a href="index.html#san-pham">Tủ bàn chặt &amp; salad</a></li><li><a href="index.html#san-pham">Tủ đông trưng bày</a></li><li><a href="index.html#san-pham">GoldWash</a></li></ul></div>
  <div><h4>Hỗ trợ</h4><ul><li><a href="index.html#so-sanh">Bảo hành 24 tháng</a></li><li><a href="index.html#so-sanh">Đổi mới 30 ngày</a></li><li><a href="index.html#quy-trinh">Giao hàng &amp; lắp đặt</a></li><li><a href="tin-tuc.html">Tin tức &amp; kiến thức</a></li></ul></div>
  <div><h4>Liên hệ</h4><ul><li><a href="tel:0865868868">Hotline / Zalo: 0865 868 868</a></li><li>Kho CN05 KCN Nguyên Khê, Phúc Thịnh, Hà Nội</li><li>goldcool.vn</li></ul></div>
 </div>
 <div class="bot"><span>© 2026 GoldCool Việt Nam</span><span>Giá niêm yết đã gồm VAT, chưa gồm vận chuyển</span></div>
</div></footer>
<div class="fab"><a href="https://zalo.me/0865868868" target="_blank" rel="noopener" aria-label="Nhắn Zalo" style="background:#0068FF;color:#fff;font-weight:800;font-size:13px">Zalo</a><a href="tel:0865868868" aria-label="Gọi hotline" style="background:var(--gold)">${ic('phone', 22, '#072238')}</a></div>`;
const head = (title, desc, extra = '') => `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${desc}">
<meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:image" content="img/td4c-gc.jpg"><meta name="theme-color" content="#0F3D63">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23C9A227'/%3E%3Cpath d='M16 6v20M7.3 11l17.4 10M7.3 21l17.4-10' stroke='%230F3D63' stroke-width='2.6' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@700;800&display=swap">
<link rel="stylesheet" href="site.css">${extra}</head><body>`;
const tail = `<script src="site.js"></script></body></html>`;

const pick = ['Tủ đông 4 & 6 cánh', 'Tủ mát 2 & 3 cánh', 'Tủ bàn chặt', 'Tủ salad', 'Tủ đông trưng bày', 'GoldWash'];
const form = `<section class="sec form-sec" id="tu-van"><div class="wrap in">
 <div class="fg">
  <div class="fl">
   <svg style="position:absolute;right:-80px;bottom:-80px;opacity:.06" width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width=".6" aria-hidden="true">${I.snow}</svg>
   <div class="eyebrow">Nhận tư vấn miễn phí</div>
   <h2 class="h2 d">Kể cho chúng tôi<br>về quán của bạn.</h2>
   <p>Tư vấn viên GoldCool sẽ liên hệ lại để đề xuất thiết bị phù hợp và gửi báo giá đã gồm VAT.</p>
   <div class="ct">
    <div><span class="ic" style="background:rgba(201,162,39,.18)">${ic('phone', 20, '#E6C35C')}</span><div><b><a href="tel:0865868868">0865 868 868</a></b><small>Hotline &amp; Zalo</small></div></div>
    <div><span class="ic" style="background:rgba(201,162,39,.18)">${ic('pin', 20, '#E6C35C')}</span><div><b>Kho CN05 KCN Nguyên Khê</b><small>Phúc Thịnh, Hà Nội · xem hàng trực tiếp</small></div></div>
    <div><span class="ic" style="background:rgba(201,162,39,.18)">${ic('globe', 20, '#E6C35C')}</span><div><b>goldcool.vn</b><small>Website chính thức</small></div></div>
   </div>
   <div class="promise"><div>✓ Không gọi làm phiền ngoài nhu cầu bạn để lại</div><div>✓ Thông tin chỉ dùng để tư vấn, không chia sẻ cho bên khác</div></div>
  </div>
  <div class="fr">
   <form id="lead" novalidate>
    <h3>Đăng ký nhận tư vấn</h3><div class="s">Điền 1 phút. Các mục có dấu * là bắt buộc.</div>
    <div class="grid2">
     <div class="f"><label for="f-name">Họ và tên *</label><input id="f-name" name="name" autocomplete="name" placeholder="Ví dụ: Nguyễn Văn An" required maxlength="80"><div class="msg"></div></div>
     <div class="f"><label for="f-phone">Số điện thoại / Zalo *</label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="09xx xxx xxx" required maxlength="20"><div class="msg"></div></div>
     <div class="f"><label for="f-model">Mô hình kinh doanh *</label><select id="f-model" name="model" required><option value="">Chọn mô hình</option>${['Quán lẩu, nướng', 'Nhà hàng', 'Quán cơm, phở, bún', 'Quán cà phê, trà sữa', 'Siêu thị mini, tạp hóa', 'Cửa hàng kem, đồ đông lạnh', 'Bếp ăn tập thể, khách sạn', 'Đại lý, cửa hàng điện máy', 'Khác'].map((o) => `<option>${o}</option>`).join('')}</select><div class="msg"></div></div>
     <div class="f"><label for="f-city">Tỉnh / thành phố *</label><input id="f-city" name="city" list="cities" placeholder="Ví dụ: Hà Nội" required maxlength="40"><datalist id="cities">${['Hà Nội', 'TP Hồ Chí Minh', 'Hải Phòng', 'Bắc Ninh', 'Bắc Giang', 'Hưng Yên', 'Hải Dương', 'Quảng Ninh', 'Thái Nguyên', 'Vĩnh Phúc', 'Phú Thọ', 'Nam Định', 'Thái Bình', 'Ninh Bình', 'Thanh Hóa', 'Nghệ An', 'Đà Nẵng'].map((c) => `<option value="${c}">`).join('')}</datalist><div class="msg"></div></div>
     <div class="f full"><span class="lab">Sản phẩm quan tâm *</span><div class="pick" id="f-products">${pick.map((p, i) => `<label><input type="checkbox" name="products" value="${p}"${i === 0 ? ' checked' : ''}>${p}</label>`).join('')}</div><div class="msg"></div></div>
     <div class="f"><label for="f-size">Chỗ đặt tủ dài khoảng</label><input id="f-size" name="size" placeholder="Ví dụ: 1,3 m" maxlength="30"></div>
     <div class="f"><span class="lab">Bạn cần thiết bị khi nào?</span><div class="seg">${['Trong tháng', '1–3 tháng', 'Đang tham khảo'].map((t, i) => `<label><input type="radio" name="when" value="${t}"${i === 0 ? ' checked' : ''}>${t}</label>`).join('')}</div></div>
     <div class="f full"><label for="f-note">Ghi chú thêm</label><textarea id="f-note" name="note" maxlength="1000" placeholder="Mặt hàng cần trữ, số lượng tủ, câu hỏi về lạnh trực tiếp hay quạt gió…"></textarea></div>
     <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    </div>
    <div class="submit"><button class="btn g" type="submit">Gửi yêu cầu tư vấn ${ic('arrow', 18, 'currentColor', 2.4)}</button><small id="f-status" role="status">Tư vấn viên GoldCool liên hệ lại sớm nhất trong giờ làm việc.</small></div>
   </form>
   <div class="done" id="lead-done"><div style="width:64px;height:64px;border-radius:50%;background:#E5F4EC;display:grid;place-items:center;margin:0 auto">${ic('shieldc', 30, '#1E8E5A')}</div><h3 style="margin-top:18px">Đã nhận thông tin của bạn</h3><p class="s" style="max-width:380px;margin:8px auto 0">Tư vấn viên GoldCool sẽ liên hệ lại sớm nhất trong giờ làm việc. Cần gấp, gọi <a href="tel:0865868868" style="color:var(--navy);font-weight:700">0865 868 868</a>.</p><button class="btn l" type="button" id="lead-again" style="margin-top:20px">Gửi thêm yêu cầu khác</button></div>
  </div>
 </div>
</div></section>`;

/* ===================== TRANG CHỦ ===================== */
const index = head('GoldCool – Tủ đông, tủ mát, thiết bị bếp cho nhà hàng | Chọn đúng, Dùng lâu', 'Tủ đông, tủ mát, tủ bàn chặt, tủ trưng bày và máy rửa bát GoldWash cho nhà hàng, quán ăn. Dàn lạnh đồng, bảo hành 24 tháng, đổi mới 30 ngày đầu nếu lỗi kỹ thuật. Hotline 0865 868 868.') + `
<section class="hero"><div class="wrap">
 ${header('', false)}
 <svg class="frost" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width=".5" aria-hidden="true">${I.snow}</svg>
 <div class="hero-g in">
  <div>
   <div class="eyebrow">Thiết bị lạnh &amp; bếp cho nhà hàng, quán ăn</div>
   <h1 class="d">Chọn đúng.<br><em>Dùng lâu.</em></h1>
   <p class="lead">Tủ đông, tủ mát, bàn chặt, tủ trưng bày và máy rửa bát GoldWash cho cơ sở F&amp;B. Tư vấn đúng nhu cầu của quán trước, báo giá minh bạch sau.</p>
   <div class="tag3"><span>${ic('thermo', 16, '#A9D0F0')}Lạnh sâu</span><span>${ic('shield', 16, '#A9D0F0')}Bền lâu</span><span>${ic('zap', 16, '#A9D0F0')}Tiết kiệm điện</span></div>
   <div class="cta"><a class="btn g" href="#tu-van">Nhận tư vấn miễn phí ${ic('arrow', 18, 'currentColor', 2.4)}</a><a class="btn o" href="#san-pham">Xem sản phẩm</a></div>
  </div>
  <div class="collage" aria-hidden="true">
   <div class="p" style="left:40px;top:0;width:min(430px,70%);height:470px"><img src="img/tm3c-gc-03.jpg" alt="" style="object-position:50% 40%" fetchpriority="high"></div>
   <div class="p" style="right:0;top:110px;width:250px;height:330px"><img src="img/td4c-gc.jpg" alt="" style="object-position:50% 60%"></div>
   <div class="p" style="right:30px;top:470px;width:300px;height:190px"><img src="img/tdtb-gc-kinhcong.jpg" alt="" style="object-position:50% 70%" loading="lazy"></div>
   <div class="badge" style="left:0;top:400px"><span class="ic" style="background:#FBF4DE">${ic('shieldc', 22, '#B08A17')}</span><div><b>24 tháng</b><small>Bảo hành chính hãng</small></div></div>
   <div class="badge" style="right:270px;top:520px"><span class="ic" style="background:var(--ice)">${ic('refresh', 22, '#0F3D63')}</span><div><b>30 ngày</b><small>Đổi mới nếu lỗi kỹ thuật</small></div></div>
  </div>
 </div>
 <div class="in"><div class="trust">
  <div><span class="ic" style="background:rgba(201,162,39,.16)">${ic('snow', 20, '#E6C35C')}</span><div><b>Dàn lạnh đồng</b><span>Tủ đông 4 và 6 cánh GoldCool dùng dàn đồng 100%</span></div></div>
  <div><span class="ic" style="background:rgba(201,162,39,.16)">${ic('shield', 20, '#E6C35C')}</span><div><b>Bảo hành 24 tháng</b><span>Đổi mới trong 30 ngày đầu nếu có lỗi kỹ thuật</span></div></div>
  <div><span class="ic" style="background:rgba(201,162,39,.16)">${ic('tag', 20, '#E6C35C')}</span><div><b>Giá minh bạch</b><span>Giá niêm yết đã gồm VAT, báo trước phí vận chuyển</span></div></div>
  <div><span class="ic" style="background:rgba(201,162,39,.16)">${ic('pin', 20, '#E6C35C')}</span><div><b>Kho tại Hà Nội</b><span>CN05 KCN Nguyên Khê, Phúc Thịnh · xem hàng trực tiếp</span></div></div>
 </div></div>
</div></section>

<section class="sec" id="vi-sao"><div class="wrap in">
 <div class="shead"><div><div class="eyebrow">Vì sao chọn GoldCool</div><h2 class="h2 d">Bán bằng sự am hiểu.<br>Giữ khách bằng trách nhiệm.</h2></div><p class="sub r" style="max-width:440px">Mỗi quán có món ăn, lượng khách và chỗ đặt khác nhau. Chúng tôi hỏi kỹ trước khi đề xuất, và chỉ đề xuất thứ phù hợp, kể cả khi đó là mẫu rẻ hơn.</p></div>
 <div class="pil">
  <div><div class="n">01 · LẠNH SÂU</div><h3>Giữ đúng nhiệt cho nguyên liệu</h3><p>Hai hình thức làm lạnh để chọn đúng cách dùng của bếp: lạnh trực tiếp hoặc quạt gió.</p><ul><li>✓ Trực tiếp: 2 ngăn riêng, 2 đông hoặc 1 đông – 1 mát</li><li>✓ Quạt gió: lạnh nhanh, nhiệt đều, không xả đá thủ công</li></ul></div>
  <div><div class="n">02 · BỀN LÂU</div><h3>Làm cho quán chạy cả ngày</h3><p>Hoàn thiện chắc chắn, dàn lạnh đồng, phù hợp quán cần dùng lâu dài và ưu tiên độ ổn định.</p><ul><li>✓ Bảo hành 24 tháng</li><li>✓ Đổi mới 30 ngày đầu nếu lỗi kỹ thuật</li></ul></div>
  <div><div class="n">03 · TIẾT KIỆM ĐIỆN</div><h3>Chọn đúng cỡ, không thừa công suất</h3><p>Tư vấn theo chỗ đặt và lượng hàng thực tế để quán không phải mua tủ lớn hơn nhu cầu.</p><ul><li>✓ Hỏi mô hình và kích thước trước khi báo giá</li><li>✓ Đề xuất bản phù hợp, không phải bản đắt nhất</li></ul></div>
 </div>
</div></section>

<section class="sec prod" id="san-pham"><div class="wrap in">
 <div class="shead"><div><div class="eyebrow">5 dòng sản phẩm</div><h2 class="h2 d">Đủ thiết bị lạnh cho<br>một căn bếp chuyên nghiệp</h2></div><a class="btn n r" href="#tu-van">Nhận báo giá</a></div>
 <div class="pg">
  <a class="pc big" href="#tu-van"><div class="im"><img src="img/td4c-gc.jpg" alt="Tủ đông 4 cánh GoldCool trong bếp nhà hàng" style="object-position:50% 65%" loading="lazy"></div><div class="bd"><div class="k">Tủ đông 4 &amp; 6 cánh</div><h3>Tủ đông inox cho bếp nhà hàng</h3><p>Lạnh trực tiếp hoặc quạt gió, dàn lạnh đồng 100%. Phù hợp quán lẩu, nướng, nhà hàng trữ thịt và hải sản.</p><div class="row"><div class="price">Từ 16.100.000đ<small>Tủ 4 cánh lạnh trực tiếp · đã gồm VAT</small></div><span class="more">Nhận tư vấn →</span></div></div></a>
  <a class="pc" href="#tu-van"><div class="im"><img src="img/tm2c-gc.jpg" alt="Tủ mát 2 cánh GoldCool" style="object-position:50% 45%" loading="lazy"></div><div class="bd"><div class="k">Tủ mát 2 &amp; 3 cánh</div><h3>Tủ mát kính trưng bày</h3><p>Dung tích 1050L đến 1800L cho đồ uống, siêu thị mini.</p><div class="row"><span class="chip gd">Từ 16.100.000đ</span><span class="more">→</span></div></div></a>
  <a class="pc" href="#tu-van"><div class="im"><img src="img/bc-gc.jpg" alt="Tủ bàn chặt GoldCool" style="object-position:50% 70%" loading="lazy"></div><div class="bd"><div class="k">Tủ bàn chặt</div><h3>Bàn mát, bàn đông</h3><p>Dài 1,2 – 1,5 – 1,8 m, vừa làm mặt bàn sơ chế vừa trữ lạnh.</p><div class="row"><span class="chip gd">Từ 9.660.000đ</span><span class="more">→</span></div></div></a>
  <a class="pc" href="#tu-van"><div class="im"><img src="img/tdtb-gc-kinhcong.jpg" alt="Tủ đông trưng bày kính cong GoldCool" style="object-position:50% 72%" loading="lazy"></div><div class="bd"><div class="k">Tủ đông trưng bày</div><h3>Kính cong, kính phẳng, xả đá</h3><p>Trưng bày kem, đồ đông lạnh cho cửa hàng, siêu thị.</p><div class="row"><span class="chip">Tư vấn theo phiên bản</span><span class="more">→</span></div></div></a>
  <a class="pc" href="#tu-van"><div class="im"><img src="img/gw-gc.jpg" alt="Máy rửa bát GoldWash" style="object-position:50% 70%" loading="lazy"></div><div class="bd"><div class="k">GoldWash</div><h3>Máy rửa bát cho bếp lớn</h3><p>Bồn inox SUS 304, chọn theo chiều dài và lượng bát đĩa mỗi ngày.</p><div class="row"><span class="chip">Tư vấn theo kích thước</span><span class="more">→</span></div></div></a>
 </div>
 <div class="fine">${ic('info', 18, '#5B6878')}Có thêm tủ salad. Giá niêm yết đã gồm VAT, chưa gồm vận chuyển.</div>
</div></section>

<section class="sec" id="so-sanh"><div class="wrap in cmp">
 <div><div class="eyebrow">Minh bạch khi so sánh</div><h2 class="h2 d">GoldCool hay mẫu rẻ?<br>Bạn được chọn.</h2><p class="sub">Chúng tôi bán cả hai và nói rõ khác biệt. Quán dùng lâu dài, mở tủ nhiều, chạy cả ngày thường chọn GoldCool. Quán cần đầu tư ban đầu thấp có thể chọn mẫu rẻ.</p>
  <div class="note">${ic('shieldc', 22, '#0F3D63')}<div><b>Niềm tin lâu dài hơn doanh số trước mắt.</b> Tư vấn viên sẽ nói thật ưu, nhược điểm của từng bản trước khi bạn quyết định.</div></div></div>
 <div><div class="tbl" role="table" aria-label="So sánh GoldCool và mẫu rẻ">
  <div class="r h" role="row"><div>So sánh</div><div>GoldCool</div><div>Mẫu rẻ</div></div>
  <div class="r" role="row"><div class="lb">Dàn lạnh</div><div>Đồng 100%</div><div>Nhôm</div></div>
  <div class="r" role="row"><div class="lb">Hoàn thiện</div><div>Chắc chắn hơn</div><div>Cơ bản</div></div>
  <div class="r" role="row"><div class="lb">Hiệu suất &amp; ổn định</div><div>Tốt hơn</div><div>Tiêu chuẩn</div></div>
  <div class="r" role="row"><div class="lb">Bảo hành</div><div>24 tháng</div><div>12 tháng</div></div>
  <div class="r" role="row"><div class="lb">Đổi mới</div><div>30 ngày đầu nếu lỗi kỹ thuật</div><div>—</div></div>
  <div class="r" role="row"><div class="lb">Tủ đông 4 cánh</div><div>16.100.000đ / 23.920.000đ</div><div>12.500.000đ / 18.500.000đ</div></div>
 </div><div style="margin-top:10px;font-size:13.5px;color:var(--muted);text-align:right">Giá tủ đông 4 cánh: lạnh trực tiếp / lạnh quạt gió · đã gồm VAT · chưa gồm vận chuyển</div></div>
</div></section>

<section class="sec proc" id="quy-trinh"><div class="wrap in">
 <div class="shead"><div><div class="eyebrow">Làm đúng trước, nhanh sau</div><h2 class="h2 d">5 bước từ tư vấn<br>đến chăm sóc sau bán</h2></div><p class="sub r" style="color:#A9BFD3;max-width:420px">Mỗi bước có người chịu trách nhiệm. Không hứa ngày giao khi kho chưa xác nhận.</p></div>
 <div class="steps">
  <div class="st"><div class="dot">1</div><h3>Hiểu mô hình quán</h3><p>Món bán, lượng khách, mặt hàng cần trữ, chỗ đặt dài bao nhiêu.</p></div>
  <div class="st"><div class="dot">2</div><h3>Chọn đúng phiên bản</h3><p>Lạnh trực tiếp hay quạt gió, kích thước, GoldCool hay mẫu rẻ.</p></div>
  <div class="st"><div class="dot">3</div><h3>Báo giá minh bạch</h3><p>Giá đã gồm VAT, ảnh thật đúng sản phẩm và phản hồi khách đã dùng.</p></div>
  <div class="st"><div class="dot">4</div><h3>Giao và lắp đặt</h3><p>Kiểm tra tồn kho, hẹn lịch giao, nghiệm thu và kích hoạt bảo hành.</p></div>
  <div class="st"><div class="dot">5</div><h3>Chăm sóc sau bán</h3><p>Hỏi thăm sau giao, sau 7 ngày và 30 ngày để tủ chạy ổn định.</p></div>
 </div>
</div></section>

<section class="sec"><div class="wrap in">
 <div class="shead"><div><div class="eyebrow">Lắp đặt thực tế</div><h2 class="h2 d">Đang chạy mỗi ngày tại<br>nhà hàng và cửa hàng</h2></div></div>
 <div class="gal">
  <div><img src="img/td6c-gc.jpg" alt="Tủ đông 6 cánh GoldCool tại nhà hàng" style="object-position:30% 60%" loading="lazy"><span>Tủ đông 6 cánh tại nhà hàng</span></div>
  <div><img src="img/tm3c-gc-02.jpg" alt="Tủ mát 3 cánh tại cửa hàng" style="object-position:50% 60%" loading="lazy"><span>Tủ mát 3 cánh tại cửa hàng</span></div>
  <div><img src="img/tdtb-gc-kinhphang.jpg" alt="Tủ đông trưng bày kính phẳng" style="object-position:50% 70%" loading="lazy"><span>Tủ trưng bày kính phẳng</span></div>
  <div><img src="img/salad-gc.jpg" alt="Tủ salad GoldCool" style="object-position:50% 55%" loading="lazy"><span>Tủ salad</span></div>
  <div><img src="img/tm2c-gc-03.jpg" alt="Tủ mát 2 cánh GoldCool" style="object-position:50% 50%" loading="lazy"><span>Tủ mát 2 cánh</span></div>
 </div>
</div></section>

<section class="sec prod" id="tin-tuc"><div class="wrap in">
 <div class="shead"><div><div class="eyebrow">Tin tức &amp; kiến thức</div><h2 class="h2 d">Chọn thiết bị lạnh<br>cho đúng quán của bạn</h2></div><a class="btn l r" href="tin-tuc.html">Xem tất cả bài viết</a></div>
 <div class="posts" data-posts="3"><div class="empty">Đang tải bài viết…</div></div>
</div></section>
${form}
${footer}${tail}`;

/* ===================== TIN TỨC ===================== */
const news = head('Tin tức & kiến thức – GoldCool', 'Kiến thức chọn tủ đông, tủ mát, bàn chặt, tủ trưng bày và máy rửa bát cho nhà hàng, quán ăn từ GoldCool.') + `
${header('Tin tức', true)}
<section class="pagehead"><div class="wrap in"><div class="eyebrow">Tin tức &amp; kiến thức</div><h1 class="h2 d">Chọn đúng – Dùng lâu</h1><p>Kinh nghiệm chọn và dùng thiết bị lạnh cho nhà hàng, quán ăn, cửa hàng.</p></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap in">
 <div class="cats" id="cats"></div>
 <div class="posts" data-posts="all"><div class="empty">Đang tải bài viết…</div></div>
</div></section>
${footer}${tail}`;

/* ===================== BÀI VIẾT ===================== */
const article = head('Bài viết – GoldCool', 'Bài viết từ GoldCool.') + `
${header('Tin tức', true)}
<section class="pagehead" style="padding-bottom:96px"><div class="wrap in"><div class="article"><a href="tin-tuc.html" style="color:#B6C8D9;font-size:14px;font-weight:600">← Tin tức &amp; kiến thức</a><div class="eyebrow" id="a-cat" style="margin-top:20px"></div><h1 class="h2 d" id="a-title">Đang tải…</h1><p id="a-meta" style="font-size:15px"></p></div></div></section>
<section style="padding-bottom:96px"><div class="wrap in"><div class="article">
 <div class="cover" id="a-cover"></div>
 <div class="prose" id="a-body"></div>
 <div class="cta-box"><div style="flex:1;min-width:240px"><b>Cần chọn thiết bị cho quán?</b><span>Để lại thông tin, tư vấn viên GoldCool gọi lại và báo giá đã gồm VAT.</span></div><a class="btn g" href="index.html#tu-van">Nhận tư vấn</a></div>
</div></div></section>
${footer}${tail}`;

fs.writeFileSync(path.join(OUT, 'index.html'), index);
fs.writeFileSync(path.join(OUT, 'tin-tuc.html'), news);
fs.writeFileSync(path.join(OUT, 'bai-viet.html'), article);
console.log('Đã sinh 3 trang website');
