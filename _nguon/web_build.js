// Sinh các trang website GoldCool (web/*.html) từ phần đầu, chân trang dùng chung.
// Chạy: node _nguon/web_build.js
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'web');
const CATS = require('./web_catalog.js');
const INOXC = CATS.INOX;

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

const NAV = [['san-pham.html', 'Sản phẩm'], ['do-bep-inox.html', 'Thiết bị bếp inox'], ['combo-bep.html', 'Combo bếp'], ['index.html#vi-sao', 'Vì sao GoldCool'], ['tin-tuc.html', 'Tin tức'], ['index.html#tu-van', 'Liên hệ']];
const SUB = () => CATS.map((c) => [c.slug + '.html', c.name]).concat([['do-bep-inox.html', 'Thiết bị bếp inox'], ['combo-bep.html', 'Combo thiết bị bếp']]);
const logo = `<a class="logo" href="index.html" aria-label="GoldCool – Trang chủ"><span class="mk">${ic('snow', 24, '#0F3D63', 2.2)}</span><span><span class="g">Gold</span><span class="c">Cool</span></span></a>`;
const header = (on, solid) => `<header class="hdr${solid ? ' solid' : ''}">
 ${logo}
 <nav class="nav" aria-label="Menu chính">${NAV.map(([h, t]) => t === 'Sản phẩm' ? `<div class="dd"><a href="${h}"${t === on ? ' class="on"' : ''}>${t} <span aria-hidden="true">▾</span></a><div class="ddm">${SUB().map(([hh, tt]) => `<a href="${hh}">${tt}</a>`).join('')}</div></div>` : `<a href="${h}"${t === on ? ' class="on"' : ''}>${t}</a>`).join('')}</nav>
 <div class="sp"><a class="hot" href="tel:0865868868">${ic('phone', 18, '#E6C35C')}0865 868 868</a><a class="btn g" href="index.html#tu-van" style="height:46px;padding:0 20px;font-size:15px">Nhận tư vấn</a><button class="burger" aria-label="Mở menu" aria-expanded="false">${ic('menu', 26)}</button></div>
</header>
<nav class="mnav" aria-label="Menu điện thoại">${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}${SUB().slice(0, 5).map(([h, t]) => `<a href="${h}" class="sub">– ${t}</a>`).join('')}<a href="tel:0865868868">Gọi 0865 868 868</a></nav>`;
const footer = `<footer class="ft"><div class="wrap in">
 <div class="ftg">
  <div>${logo.replace('class="logo"', 'class="logo" style="color:#fff"')}<p style="margin-top:18px;font-size:14.5px;line-height:1.6;max-width:320px">Chọn đúng – Dùng lâu. Lạnh sâu – Bền lâu – Tiết kiệm điện. Thiết bị lạnh và thiết bị bếp cho cơ sở F&amp;B.</p></div>
  <div><h4>Sản phẩm</h4><ul>${SUB().map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
  <div><h4>Hỗ trợ</h4><ul><li><a href="index.html#so-sanh">Bảo hành 24 tháng</a></li><li><a href="index.html#so-sanh">Đổi mới 30 ngày</a></li><li><a href="index.html#quy-trinh">Giao hàng &amp; lắp đặt</a></li><li><a href="tin-tuc.html">Tin tức &amp; kiến thức</a></li></ul></div>
  <div><h4>Liên hệ</h4><ul><li><a href="tel:0865868868">Hotline / Zalo: 0865 868 868</a></li><li>Kho CN05 KCN Nguyên Khê, Phúc Thịnh, Hà Nội</li><li><a href="https://goldcool.vn/" target="_blank" rel="noopener">goldcool.vn</a></li></ul></div>
 </div>
 <div class="bot"><span>© 2026 GoldCool Việt Nam</span><span>Hotline / Zalo 0865 868 868</span></div>
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

const pick = ['Tủ đông 4 & 6 cánh', 'Tủ mát 2 & 3 cánh', 'Tủ bàn chặt', 'Tủ salad', 'Tủ đông trưng bày', 'GoldWash', 'Đồ bếp inox', 'Combo thiết bị bếp'];
const form = `<section class="sec form-sec" id="tu-van"><div class="wrap in">
 <div class="fg">
  <div class="fl">
   <svg style="position:absolute;right:-80px;bottom:-80px;opacity:.06" width="380" height="380" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width=".6" aria-hidden="true">${I.snow}</svg>
   <div class="eyebrow">Nhận tư vấn miễn phí</div>
   <h2 class="h2 d">Kể cho chúng tôi<br>về quán của bạn.</h2>
   <p>Tư vấn viên GoldCool sẽ liên hệ lại để đề xuất thiết bị phù hợp và gửi báo giá riêng cho quán của bạn.</p>
   <div class="ct">
    <div><span class="ic" style="background:rgba(201,162,39,.18)">${ic('phone', 20, '#E6C35C')}</span><div><b><a href="tel:0865868868">0865 868 868</a></b><small>Hotline &amp; Zalo</small></div></div>
    <div><span class="ic" style="background:rgba(201,162,39,.18)">${ic('pin', 20, '#E6C35C')}</span><div><b>Kho CN05 KCN Nguyên Khê</b><small>Phúc Thịnh, Hà Nội · xem hàng trực tiếp</small></div></div>
    <div><span class="ic" style="background:rgba(201,162,39,.18)">${ic('globe', 20, '#E6C35C')}</span><div><b><a href="https://goldcool.vn/" target="_blank" rel="noopener">goldcool.vn</a></b><small>Website chính thức</small></div></div>
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
     <div class="f"><label for="f-size">Mặt bằng / chỗ đặt</label><input id="f-size" name="size" placeholder="Ví dụ: bếp 3×4 m, chỗ đặt tủ 1,3 m" maxlength="30"></div>
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


/* Hình minh họa nét cho các nhóm đồ inox (dùng khi chưa có ảnh thật) */
const ART = {
  'Bàn inox': '<path d="M18 40h124M22 40v54M138 40v54M22 70h116"/><path d="M18 40l6-8h112l6 8"/>',
  'Chậu rửa inox': '<path d="M14 38h132v10H14zM20 48v46M140 48v46M20 76h120"/><path d="M34 48v14a6 6 0 0 0 6 6h28a6 6 0 0 0 6-6V48M86 48v14a6 6 0 0 0 6 6h28a6 6 0 0 0 6-6V48"/><path d="M80 38V20h12v6"/>',
  'Kệ & giá inox': '<path d="M30 14v84M130 14v84M30 22h100M30 46h100M30 70h100M30 94h100"/><rect x="42" y="30" width="18" height="16" rx="2"/><rect x="66" y="34" width="26" height="12" rx="2"/><rect x="98" y="56" width="20" height="14" rx="2"/><rect x="44" y="80" width="30" height="14" rx="2"/>',
  'Bếp công nghiệp': '<path d="M16 52h128v42H16z"/><circle cx="50" cy="44" r="14"/><circle cx="110" cy="44" r="14"/><path d="M36 30h28M96 30h28M30 72h12M74 72h12M118 72h12"/><path d="M50 22c-4-6 4-8 0-14M110 22c-4-6 4-8 0-14"/>',
  'Tủ inox': '<rect x="34" y="12" width="92" height="86" rx="3"/><path d="M80 12v86M70 50v12M90 50v12M34 92h92"/>',
  'Chụp hút khói': '<path d="M62 8h36v22H62z"/><path d="M62 30 22 64h116L98 30"/><path d="M22 64v8h116v-8M44 72v8M80 72v8M116 72v8"/><path d="M50 96c4-6-4-8 0-14M80 96c4-6-4-8 0-14M110 96c4-6-4-8 0-14"/>',
  'Xe đẩy inox': '<path d="M26 26h108M26 54h108M26 82h108M30 26v62M130 26v62M20 26h12"/><circle cx="40" cy="96" r="6"/><circle cx="120" cy="96" r="6"/>',
  'Dụng cụ & phụ kiện': '<path d="M26 92 66 52M60 46a14 14 0 1 0 20 20"/><path d="M98 16v44M90 16v18a8 8 0 0 0 16 0V16M98 60v34"/><path d="M124 18c10 6 10 30 0 36v40"/>',
};
Object.assign(ART, { bep: ART['Bếp công nghiệp'], ban: ART['Bàn inox'], chau: ART['Chậu rửa inox'], ke: ART['Kệ & giá inox'], tu: ART['Tủ inox'], xe: ART['Xe đẩy inox'],
  noi: '<path d="M34 40h92v44a10 10 0 0 1-10 10H44a10 10 0 0 1-10-10z"/><path d="M26 40h108M22 52h12M126 52h12"/><path d="M70 40v-6h20v6"/><path d="M126 66h10v14h-10"/><path d="M60 24c-4-6 4-8 0-14M80 24c-4-6 4-8 0-14M100 24c-4-6 4-8 0-14"/>',
  tuban: '<path d="M20 30h120v8H20zM26 38v56h108V38"/><path d="M26 58h108M56 38v20M104 38v20M74 72h12"/><path d="M34 30l10-16h72l10 16"/>' });
const art = (k, big) => `<svg viewBox="0 0 160 110" width="100%" height="100%" fill="none" stroke="#0F3D63" stroke-width="${big ? 2.4 : 2.6}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g opacity=".9">${ART[k] || ART['Bàn inox']}</g></svg>`;
const INOX = [
  ['Bàn inox', 'Bàn sơ chế, bàn chia đồ, bàn có giá dưới cho khu bếp nóng và bếp lạnh.'],
  ['Chậu rửa inox', 'Chậu 1, 2, 3 hố cho khu rửa rau, rửa thịt và rửa dụng cụ.'],
  ['Kệ & giá inox', 'Kệ nhiều tầng cho kho khô, giá treo xoong nồi, kệ trên tường.'],
  ['Bếp công nghiệp', 'Bếp á, bếp hầm, bếp chiên cho quán ăn và nhà hàng.'],
  ['Tủ inox', 'Tủ đựng bát đĩa, tủ dụng cụ, tủ chứa đồ trong bếp.'],
  ['Chụp hút khói', 'Chụp hút trên khu bếp nấu, giữ bếp thông thoáng.'],
  ['Xe đẩy inox', 'Xe đẩy thức ăn, xe thu dọn bát đĩa giữa bếp và phòng ăn.'],
  ['Dụng cụ & phụ kiện', 'Dụng cụ nấu, khay, giỏ và phụ kiện inox cho bếp.'],
];
/* ===================== TRANG CHỦ ===================== */
const index = head('GoldCool – Tủ đông, tủ mát, thiết bị bếp cho nhà hàng | Chọn đúng, Dùng lâu', 'Tủ đông, tủ mát, tủ bàn chặt, tủ trưng bày và máy rửa bát GoldWash cho nhà hàng, quán ăn. Dàn lạnh đồng, bảo hành 24 tháng, đổi mới 30 ngày đầu nếu lỗi kỹ thuật. Hotline 0865 868 868.') + `
<section class="hero"><div class="wrap">
 ${header('', false)}
 <svg class="frost" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width=".5" aria-hidden="true">${I.snow}</svg>
 <div class="hero-g in">
  <div>
   <div class="eyebrow">Thiết bị lạnh &amp; bếp cho nhà hàng, quán ăn</div>
   <h1 class="d">Chọn đúng.<br><em>Dùng lâu.</em></h1>
   <p class="lead">Tủ đông, tủ mát, tủ bàn chặt, tủ trưng bày, máy rửa bát GoldWash và thiết bị bếp inox cho nhà hàng, quán ăn, cửa hàng. Tư vấn đúng nhu cầu của quán trước, báo giá sau.</p>
   <div class="tag3"><span>${ic('thermo', 16, '#A9D0F0')}Lạnh sâu</span><span>${ic('shield', 16, '#A9D0F0')}Bền lâu</span><span>${ic('zap', 16, '#A9D0F0')}Tiết kiệm điện</span></div>
   <div class="cta"><a class="btn g" href="#tu-van">Nhận tư vấn miễn phí ${ic('arrow', 18, 'currentColor', 2.4)}</a><a class="btn o" href="san-pham.html">Xem sản phẩm</a></div>
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
  <div><span class="ic" style="background:rgba(201,162,39,.16)">${ic('tag', 20, '#E6C35C')}</span><div><b>Tư vấn đúng nhu cầu</b><span>Hỏi kỹ mô hình quán trước khi đề xuất thiết bị</span></div></div>
  <div><span class="ic" style="background:rgba(201,162,39,.16)">${ic('pin', 20, '#E6C35C')}</span><div><b>Kho tại Hà Nội</b><span>CN05 KCN Nguyên Khê, Phúc Thịnh · xem hàng trực tiếp</span></div></div>
 </div></div>
</div></section>

<section class="sec prod" id="san-pham"><div class="wrap in">
 <div class="shead"><div><div class="eyebrow">Danh mục sản phẩm</div><h2 class="h2 d">Thiết bị lạnh và thiết bị bếp<br>cho cả căn bếp chuyên nghiệp</h2></div><a class="btn n r" href="san-pham.html">Xem tất cả sản phẩm</a></div>
 <div class="catg">${CATS.map((c) => `<a class="cat" href="${c.slug}.html"><div class="im"><img src="img/${c.img}.jpg" alt="${c.name}" loading="lazy"></div><div class="bd"><h3>${c.name}</h3><p>${c.short}</p><span class="more">Xem sản phẩm →</span></div></a>`).join('')}
  <a class="cat" href="do-bep-inox.html"><div class="im art">${art('bep', 1)}</div><div class="bd"><h3>Thiết bị bếp inox</h3><p>Bếp họng, bếp Âu, nồi phở, bàn, chậu, kệ, tủ cơm, xe đẩy</p><span class="more">Xem sản phẩm →</span></div></a>
  <a class="cat" href="combo-bep.html"><div class="im"><img src="img/td6c-gc.jpg" alt="Combo thiết bị bếp" loading="lazy"></div><div class="bd"><h3>Combo thiết bị bếp</h3><p>Cấu hình gợi ý theo mô hình quán</p><span class="more">Xem combo →</span></div></a>
 </div>
</div></section>
<section class="sec" id="vi-sao"><div class="wrap in">
 <div class="shead"><div><div class="eyebrow">Vì sao chọn GoldCool</div><h2 class="h2 d">Bán bằng sự am hiểu.<br>Giữ khách bằng trách nhiệm.</h2></div><p class="sub r" style="max-width:440px">Mỗi quán có món ăn, lượng khách và chỗ đặt khác nhau. Chúng tôi hỏi kỹ trước khi đề xuất, và chỉ đề xuất thứ phù hợp, kể cả khi đó là mẫu rẻ hơn.</p></div>
 <div class="pil">
  <div><div class="n">01 · LẠNH SÂU</div><h3>Giữ đúng nhiệt cho nguyên liệu</h3><p>Hai hình thức làm lạnh để chọn đúng cách dùng của bếp: lạnh trực tiếp hoặc quạt gió.</p><ul><li>✓ Trực tiếp: 2 ngăn riêng, 2 đông hoặc 1 đông – 1 mát</li><li>✓ Quạt gió: lạnh nhanh, nhiệt đều, không xả đá thủ công</li></ul></div>
  <div><div class="n">02 · BỀN LÂU</div><h3>Làm cho quán chạy cả ngày</h3><p>Hoàn thiện chắc chắn, dàn lạnh đồng, phù hợp quán cần dùng lâu dài và ưu tiên độ ổn định.</p><ul><li>✓ Bảo hành 24 tháng</li><li>✓ Đổi mới 30 ngày đầu nếu lỗi kỹ thuật</li></ul></div>
  <div><div class="n">03 · TIẾT KIỆM ĐIỆN</div><h3>Chọn đúng cỡ, không thừa công suất</h3><p>Tư vấn theo chỗ đặt và lượng hàng thực tế để quán không phải mua tủ lớn hơn nhu cầu.</p><ul><li>✓ Hỏi mô hình và kích thước trước khi báo giá</li><li>✓ Đề xuất bản phù hợp, không phải bản đắt nhất</li></ul></div>
 </div>
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
 </div></div>
</div></section>

<section class="sec proc" id="quy-trinh"><div class="wrap in">
 <div class="shead"><div><div class="eyebrow">Làm đúng trước, nhanh sau</div><h2 class="h2 d">5 bước từ tư vấn<br>đến chăm sóc sau bán</h2></div><p class="sub r" style="color:#A9BFD3;max-width:420px">Mỗi bước có người chịu trách nhiệm. Không hứa ngày giao khi kho chưa xác nhận.</p></div>
 <div class="steps">
  <div class="st"><div class="dot">1</div><h3>Hiểu mô hình quán</h3><p>Món bán, lượng khách, mặt hàng cần trữ, chỗ đặt dài bao nhiêu.</p></div>
  <div class="st"><div class="dot">2</div><h3>Chọn đúng phiên bản</h3><p>Lạnh trực tiếp hay quạt gió, kích thước, GoldCool hay mẫu rẻ.</p></div>
  <div class="st"><div class="dot">3</div><h3>Báo giá minh bạch</h3><p>Báo giá riêng cho quán, kèm ảnh thật đúng sản phẩm và phản hồi khách đã dùng.</p></div>
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
 <div class="cta-box"><div style="flex:1;min-width:240px"><b>Cần chọn thiết bị cho quán?</b><span>Để lại thông tin, tư vấn viên GoldCool gọi lại và gửi báo giá riêng cho quán.</span></div><a class="btn g" href="index.html#tu-van">Nhận tư vấn</a></div>
</div></div></section>
${footer}${tail}`;


/* ===================== THIẾT BỊ BẾP INOX ===================== */
const formNo = form.replace('value="Tủ đông 4 & 6 cánh" checked', 'value="Tủ đông 4 & 6 cánh"');
const crumbs = (t) => `<a href="index.html">Trang chủ</a> / <a href="san-pham.html">Sản phẩm</a> / <span>${t}</span>`;
const inoxPage = head('Thiết bị bếp inox cho nhà hàng, quán ăn – GoldCool', 'Bếp họng, bếp Âu, nồi phở 20–200L, bàn chặt inox, chậu rửa, giá kệ, tủ cơm, tủ sấy bát đĩa, tủ bán hàng, xe đẩy, bẫy mỡ. Bảo hành 12 tháng. Hotline 0865 868 868.') + `
${header('Thiết bị bếp inox', true)}
<section class="pagehead"><div class="wrap in"><div class="crumb">${crumbs('Thiết bị bếp inox')}</div><div class="eyebrow" style="margin-top:18px">Thiết bị bếp inox</div><h1 class="h2 d">Bếp gọn, sạch, dùng lâu</h1><p>Bếp họng, bếp Âu, nồi phở, bàn chặt, chậu rửa, giá kệ, tủ cơm, tủ sấy, tủ bán hàng và phụ trợ inox cho khu nấu, sơ chế, rửa và kho.</p><div class="tags">${['8 nhóm sản phẩm', 'Bảo hành 12 tháng', 'Tư vấn theo mặt bằng bếp'].map((t) => `<span>${t}</span>`).join('')}</div><div class="cta" style="margin-top:26px"><a class="btn g" href="#tu-van">Nhận tư vấn &amp; báo giá ${ic('arrow', 18, 'currentColor', 2.4)}</a><a class="btn o" href="https://zalo.me/0865868868" target="_blank" rel="noopener">Gửi ảnh mặt bằng qua Zalo</a></div></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap in">
 <div class="cats" id="pcats"><button class="on" data-c="">Tất cả</button>${INOXC.map(([k]) => `<button data-c="${k}">${k}</button>`).join('')}</div>
 <div class="ig" data-products="inox">${INOXC.map(([k, a, d, v]) => `<div class="icard" data-cat="${k}"><div class="ia">${art(a, 1)}</div><div class="bd"><h3>${k}</h3><p>${d}</p><ul class="chk">${v.map((x) => `<li>${x}</li>`).join('')}</ul><div class="list" data-list="${k}"></div><a class="more" href="#tu-van" data-pre="Đồ bếp inox" data-n="${k}">Nhận báo giá ${k.toLowerCase()} →</a></div></div>`).join('')}</div>
 <p class="fine2">Thông số chi tiết (kích thước, độ dày inox) tư vấn viên gửi kèm báo giá theo đúng mẫu quán cần.</p>
 <div class="ibar"><div><b>Cần cả bộ cho bếp mới?</b><span>Xem <a href="combo-bep.html" style="font-weight:700;color:var(--navy)">combo thiết bị bếp</a> theo mô hình quán, hoặc gửi ảnh bếp qua Zalo 0865 868 868 để được lên danh sách.</span></div><a class="btn n" href="#tu-van">Để lại thông tin</a></div>
</div></section>
${formNo}
${footer}${tail}`;

/* ===================== TRANG TỪNG DÒNG SẢN PHẨM ===================== */
const cmpBox = `<div class="cmpb"><h3>GoldCool và mẫu rẻ khác nhau ở đâu?</h3><p class="s">Bên cạnh dòng GoldCool, chúng tôi có mẫu rẻ hơn để bạn so sánh. Tư vấn viên nói rõ ưu, nhược của từng bản.</p>
 <div class="tbl2"><div class="r h"><div></div><div>GoldCool</div><div>Mẫu rẻ</div></div>${[['Dàn lạnh', 'Đồng (tủ đông 4 – 6 cánh: đồng 100%)', 'Nhôm'], ['Hoàn thiện', 'Chắc chắn hơn', 'Cơ bản'], ['Hiệu suất làm lạnh', 'Hiệu suất và độ ổn định tốt hơn', '—'], ['Bảo hành', '24 tháng', '12 tháng'], ['Đổi mới', '30 ngày đầu nếu lỗi kỹ thuật, theo chính sách', '—']].map(([a, b, c]) => `<div class="r"><div>${a}</div><div>${b}</div><div>${c}</div></div>`).join('')}</div></div>`;
const MCOLS = ['Mã', 'Sản phẩm', 'Kiểu / phiên bản', 'Dung tích tổng / dùng (L)', 'Kích thước (mm)', 'Nhiệt độ (°C)', 'Công suất', 'Phù hợp'];
const catPage = (c) => head(`${c.name} – GoldCool`, `${c.lead} Bảo hành chính hãng. Hotline 0865 868 868.`, `<meta property="og:image" content="img/${c.img}.jpg">`) + `
${header('Sản phẩm', true)}
<section class="pagehead ph2"><div class="wrap in"><div class="phg"><div><div class="crumb">${crumbs(c.name)}</div><div class="eyebrow" style="margin-top:18px">${c.short}</div><h1 class="h2 d">${c.name}</h1><p>${c.lead}</p><div class="tags">${c.tags.map((t) => `<span>${t}</span>`).join('')}</div><div class="cta" style="margin-top:26px"><a class="btn g" href="#tu-van" data-pre="${c.pre}">Nhận tư vấn &amp; báo giá ${ic('arrow', 18, 'currentColor', 2.4)}</a><a class="btn o" href="#thong-so">Xem thông số</a></div></div>
 <div class="phi"><img src="img/${c.img}.jpg" alt="${c.gallery[0][1]}" fetchpriority="high"></div></div></div></section>
<section class="sec" style="padding-top:56px"><div class="wrap in">
 <div class="eyebrow">Sản phẩm</div><h2 class="h2 d" style="font-size:clamp(28px,3.4vw,40px)">Chọn theo phiên bản</h2>
 <div class="mg">${c.cards.map(([t, im, d, codes]) => `<article class="mc"><div class="im"><img src="img/${im}.jpg" alt="${t}" loading="lazy"></div><div class="bd"><h3>${t}</h3><p>${d}</p><div class="codes">${codes.map((x) => `<span>${x}</span>`).join('')}</div><a class="btn g" href="#tu-van" data-pre="${c.pre}" data-n="${t}">Nhận báo giá</a></div></article>`).join('')}</div>
 <div class="vg">${c.versions.map(([t, l]) => `<div class="vc"><h3>${t}</h3><ul class="chk">${l.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
</div></section>
<section class="sec" id="thong-so" style="background:var(--bg)"><div class="wrap in">
 <div class="eyebrow">Thông số kỹ thuật</div><h2 class="h2 d" style="font-size:clamp(28px,3.4vw,40px)">Bảng thông số ${c.name.toLowerCase()}</h2>
 <div class="spec"><table><thead><tr>${(c.cols || MCOLS).map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${(c.rows || c.models).map((r) => `<tr>${r.map((v, k) => `<td${k === 0 ? ' class="code"' : ''}>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
 <p class="fine2">Thông số theo danh mục GoldCool, có thể điều chỉnh theo lô hàng. Gas R290, điện 220V/50Hz với hầu hết cấu hình. Tư vấn viên xác nhận thông số chính xác khi báo giá.</p>
 ${c.cmp ? cmpBox : ''}
 ${c.gallery.length > 1 ? `<h3 style="margin-top:48px;font-size:22px">Ảnh sản phẩm thực tế</h3><div class="pgal">${c.gallery.map(([im, a]) => `<figure><img src="img/${im}.jpg" alt="${a}" loading="lazy"><figcaption>${a}</figcaption></figure>`).join('')}</div>` : ''}
</div></section>
${formNo.replace(`value="${c.pre}">`, `value="${c.pre}" checked>`)}
${footer}${tail}`;

/* ===================== TẤT CẢ SẢN PHẨM ===================== */
const allPage = head('Sản phẩm GoldCool – Tủ đông, tủ mát, tủ trưng bày, GoldWash, thiết bị bếp inox', 'Danh mục sản phẩm GoldCool: tủ đông công nghiệp, tủ mát trưng bày, tủ bàn chặt, tủ salad, tủ đông trưng bày, máy rửa bát GoldWash, thiết bị bếp inox và combo bếp.') + `
${header('Sản phẩm', true)}
<section class="pagehead"><div class="wrap in"><div class="crumb"><a href="index.html">Trang chủ</a> / <span>Sản phẩm</span></div><div class="eyebrow" style="margin-top:18px">Danh mục sản phẩm</div><h1 class="h2 d">Sản phẩm GoldCool</h1><p>Thiết bị lạnh, máy rửa bát và thiết bị bếp inox cho nhà hàng, quán ăn, cửa hàng, siêu thị. Chọn dòng sản phẩm để xem phiên bản, ảnh thực tế và thông số.</p></div></section>
<section class="sec" style="padding-top:32px"><div class="wrap in">
 <div class="jump">${SUB().map(([h, t]) => `<a href="#${h.replace('.html', '')}">${t}</a>`).join('')}</div>
 ${CATS.map((c) => `<div class="blk" id="${c.slug}"><div class="bh"><div><h2>${c.name}</h2><p>${c.short}</p></div><a class="btn l" href="${c.slug}.html">Xem chi tiết &amp; thông số →</a></div>
  <div class="mg sm">${c.cards.map(([t, im, d, codes]) => `<a class="mc" href="${c.slug}.html"><div class="im"><img src="img/${im}.jpg" alt="${t}" loading="lazy"></div><div class="bd"><h3>${t}</h3><p>${d}</p><div class="codes">${codes.map((x) => `<span>${x}</span>`).join('')}</div></div></a>`).join('')}</div></div>`).join('')}
 <div class="blk" id="do-bep-inox"><div class="bh"><div><h2>Thiết bị bếp inox</h2><p>8 nhóm sản phẩm · bảo hành 12 tháng</p></div><a class="btn l" href="do-bep-inox.html">Xem chi tiết →</a></div>
  <div class="mg sm">${INOXC.map(([k, a, d, v]) => `<a class="mc" href="do-bep-inox.html"><div class="im art">${art(a, 1)}</div><div class="bd"><h3>${k}</h3><p>${v.join(' · ')}</p></div></a>`).join('')}</div></div>
 <div class="blk" id="combo-bep"><div class="bh"><div><h2>Combo thiết bị bếp</h2><p>Cấu hình gợi ý theo mô hình quán</p></div><a class="btn l" href="combo-bep.html">Xem combo →</a></div></div>
</div></section>
${formNo}
${footer}${tail}`;

/* ===================== COMBO BẾP ===================== */
const comboPage = head('Combo thiết bị bếp theo mô hình quán – GoldCool', 'Combo thiết bị bếp cho quán lẩu nướng, quán cơm phở bún, cà phê trà sữa, nhà hàng và bếp ăn tập thể: tủ đông, tủ mát, bàn chặt, GoldWash và đồ inox. Hotline 0865 868 868.') + `
${header('Combo bếp', true)}
<section class="pagehead"><div class="wrap in"><div class="eyebrow">Combo thiết bị bếp</div><h1 class="h2 d">Setup cả căn bếp<br>theo đúng mô hình quán</h1><p>Mỗi combo là cấu hình gợi ý: thiết bị lạnh GoldCool kết hợp đồ bếp inox. Tư vấn viên điều chỉnh số lượng, kích thước theo mặt bằng và lượng khách của quán.</p></div></section>
<section class="sec" style="padding-top:48px"><div class="wrap in">
 <div class="cbg" data-products="combo"><div class="empty">Đang tải combo…</div></div>
 <div class="steps3">${[['1', 'Kể về quán', 'Mô hình, món bán, lượng khách, diện tích bếp.'], ['2', 'Nhận cấu hình', 'Tư vấn viên đề xuất danh sách thiết bị và báo giá riêng.'], ['3', 'Giao &amp; lắp đặt', 'Kiểm tra hàng, hướng dẫn sử dụng, bảo hành theo chính sách.']].map(([n, t, d]) => `<div><span>${n}</span><b>${t}</b><p>${d}</p></div>`).join('')}</div>
</div></section>
${formNo}
${footer}${tail}`;

/* ===================== CHI TIẾT SẢN PHẨM ===================== */
const productPage = head('Sản phẩm – GoldCool', 'Đồ bếp inox và combo thiết bị bếp GoldCool.') + `
${header('', true)}
<section class="pagehead" style="padding-bottom:56px"><div class="wrap in"><a id="p-back" href="do-bep-inox.html" style="color:#B6C8D9;font-size:14px;font-weight:600">← Quay lại</a><div class="eyebrow" id="p-cat" style="margin-top:20px"></div><h1 class="h2 d" id="p-name">Đang tải…</h1></div></section>
<section class="sec" style="padding-top:48px"><div class="wrap in"><div class="pd">
 <div class="pim" id="p-img"></div>
 <div><p class="lead2" id="p-sum"></p><h3 id="p-ih" style="margin-top:22px;font-size:17px"></h3><ul class="chk" id="p-items"></ul>
 <div class="cta-box" style="margin-top:28px"><div style="flex:1;min-width:220px"><b>Nhận báo giá cho quán</b><span>Website không niêm yết giá. Để lại thông tin, tư vấn viên gửi báo giá đúng cấu hình bạn cần.</span></div><a class="btn g" id="p-cta" href="#tu-van">Nhận tư vấn</a></div></div>
</div></div></section>
${formNo}
${footer}${tail}`;
fs.writeFileSync(path.join(OUT, 'index.html'), index);
fs.writeFileSync(path.join(OUT, 'do-bep-inox.html'), inoxPage);
fs.writeFileSync(path.join(OUT, 'combo-bep.html'), comboPage);
fs.writeFileSync(path.join(OUT, 'chi-tiet.html'), productPage);
fs.writeFileSync(path.join(OUT, 'san-pham.html'), allPage);
CATS.forEach((c) => fs.writeFileSync(path.join(OUT, c.slug + '.html'), catPage(c)));
fs.writeFileSync(path.join(OUT, 'tin-tuc.html'), news);
fs.writeFileSync(path.join(OUT, 'bai-viet.html'), article);
console.log('Đã sinh ' + (7 + CATS.length) + ' trang website');
