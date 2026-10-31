// Đóng gói 18 màn hình đã duyệt thành web app tĩnh (chạy được trên Vercel)
process.env.IMG_URL = '1';
const fs = require('fs');
const path = require('path');
const { CSS, side, top, page } = require('./lib.js');
const A = require('./batch1v2.js');
const B = require('./batch2v2.js');
const OUT = process.argv[2] || '/home/claude/goldcool-os';

const ROUTES = {
  '01_Trang_chu_Viec_cua_toi': ['trang-chu', 'home', 'Trang chủ – Việc của tôi'],
  '02_Hop_thu_AI_Sales': ['hop-thu', 'sales', 'Hộp thư AI Sales'],
  '03_Khach_cua_toi_dien_thoai': ['khach-cua-toi', 'sales', 'Khách của tôi (điện thoại)'],
  '04_Chi_tiet_khach_chuyen_giao': ['khach/pham-thu-trang', 'sales', 'Chi tiết khách & chuyển giao'],
  '05_Phong_thu_AI': ['phong-thu-ai', 'sales', 'Phòng thử AI'],
  '06_Bang_gia_ban_le_duyet_gia': ['bang-gia', 'data', 'Bảng giá bán lẻ & duyệt giá'],
  '07_Bao_cao_AI_Sales_tuan': ['bao-cao-ai', 'sales', 'Báo cáo AI Sales tuần'],
  '08_Cai_dat_AI_Sales': ['cai-dat-ai', 'sales', 'Cài đặt AI Sales'],
  '09_Chi_tiet_san_pham': ['san-pham', 'data', 'Chi tiết sản phẩm'],
  '10_Bang_so_lieu_Giam_doc': ['bang-so-lieu', 'kpi', 'Bảng số liệu Giám đốc'],
  '11_Cay_muc_tieu': ['cay-muc-tieu', 'kpi', 'Cây mục tiêu'],
  '12_Bao_cao_tuan_dien_thoai': ['bao-cao-tuan', 'kpi', 'Báo cáo tuần (điện thoại)'],
  '13_Bang_the_van_de': ['the-van-de', 'kpi', 'Bảng thẻ vấn đề'],
  '14_Chi_tiet_the_van_de_7_buoc': ['the-van-de/vd-1107', 'kpi', 'Chi tiết thẻ vấn đề 7 bước'],
  '15_Hom_nay_hoc_gi_dien_thoai': ['hom-nay-hoc-gi', 'hv', 'Hôm nay học gì (điện thoại)'],
  '16_Lam_bai_thi': ['bai-thi', 'hv', 'Làm bài thi'],
  '17_Phong_dong_vai': ['dong-vai', 'hv', 'Phòng đóng vai'],
  '18_Ket_qua_buoi_dong_vai': ['ket-qua-dong-vai', 'hv', 'Kết quả buổi đóng vai'],
};
const B3 = require('./batch3.js');
const CODES = { '01': 'A02', '02': 'B01', '03': 'B02', '04': 'B03', '05': 'B07', '06': 'A08', '07': 'B06', '08': 'B08', '09': 'A07', '10': 'C01', '11': 'C02', '12': 'C05', '13': 'C07', '14': 'C08', '15': 'D01', '16': 'D04', '17': 'D07', '18': 'D08' };
const R3 = {
  A01_Dang_nhap: ['dang-nhap', 'set', 'Đăng nhập'], A03_Thong_bao: ['thong-bao', 'home', 'Thông báo'], A04_Nhan_vien: ['nhan-vien', 'set', 'Danh sách nhân viên'], A05_Ho_so_nhan_vien: ['nhan-vien/ho-so', 'set', 'Hồ sơ nhân viên'],
  A06_Danh_sach_san_pham: ['danh-sach-san-pham', 'data', 'Danh sách sản phẩm'], A09_Bang_gia_dai_ly: ['bang-gia-dai-ly', 'data', 'Bảng giá đại lý'], A10_Kho_tai_lieu: ['kho-tai-lieu', 'data', 'Kho tài liệu'], A11_Nhat_ky_thay_doi: ['nhat-ky', 'set', 'Nhật ký thay đổi'],
  B04_So_loi_du_lieu: ['so-loi', 'sales', 'Sổ lỗi dữ liệu'], B05_Cham_chat_luong: ['cham-chat-luong', 'sales', 'Chấm chất lượng tư vấn tuần'], B09_Khung_chat_website: ['chat-website', 'sales', 'Khung chat trên website'],
  C03_Chi_tiet_muc_tieu: ['muc-tieu/chi-tiet', 'kpi', 'Chi tiết mục tiêu'], C04_De_xuat_muc_tieu: ['de-xuat-muc-tieu', 'kpi', 'Đề xuất / duyệt mục tiêu'], C06_Bao_cao_cua_doi: ['bao-cao-doi', 'kpi', 'Báo cáo tuần của đội'], C08_Tao_the_van_de: ['the-van-de/moi', 'kpi', 'Báo vấn đề mới'],
  C09_Ghi_nhan: ['ghi-nhan', 'kpi', 'Ghi nhận đồng nghiệp'], C10_Danh_gia_thang: ['danh-gia-thang', 'kpi', 'Đánh giá cách làm việc tháng'], C11_Thu_vien_quyet_dinh: ['thu-vien-quyet-dinh', 'kpi', 'Thư viện quyết định'], C12_Bang_diem_quy: ['bang-diem-quy', 'kpi', 'Bảng điểm quý'], C13_Tom_tat_AI: ['tom-tat-ai', 'kpi', 'Tóm tắt tuần của Trợ lý AI'], C14_Cai_dat_KPI: ['cai-dat-kpi', 'set', 'Cài đặt KPI'],
  D02_Thu_vien_bai_hoc: ['thu-vien-bai-hoc', 'hv', 'Thư viện bài học'], D03_Xem_bai_hoc: ['xem-bai-hoc', 'hv', 'Xem bài học'], D05_Ket_qua_bai_thi: ['ket-qua-thi', 'hv', 'Kết quả bài thi'], D06_Chon_tinh_huong: ['chon-tinh-huong', 'hv', 'Chọn tình huống đóng vai'], D09_Ho_so_nang_luc: ['ho-so-nang-luc', 'hv', 'Hồ sơ năng lực và chứng nhận'], D10_Theo_doi_doi_hoc: ['theo-doi-doi-hoc', 'hv', 'Theo dõi đội học'], D11_Quan_ly_noi_dung: ['quan-ly-noi-dung', 'hv', 'Quản lý nội dung Học viện'],
};
const body = (html) => html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));
const screens = {};
const meta = [];
for (const [k, html] of Object.entries({ ...A, ...B })) {
  const [id, mod, title] = ROUTES[k];
  screens[id] = body(html);
  meta.push({ id, mod, title, no: CODES[k.slice(0, 2)], mobile: k.includes('dien_thoai') });
}
for (const [k, html] of Object.entries(B3)) {
  const [id, mod, title] = R3[k];
  screens[id] = body(html);
  meta.push({ id, mod, title, no: k.slice(0, 3), mobile: false, full: /^(A01|B09)/.test(k) });
}
meta.sort((a, b) => a.no.localeCompare(b.no));
// Khung cho các màn chưa có bản thiết kế chi tiết (giữ đúng bộ nhận diện)
const USERS = { home: undefined, sales: undefined, kpi: ['Nguyễn Văn Huy', 'Giám đốc', 'NH'], hv: ['Nhân viên mới', 'Sales NVKD4 · ngày 9/30', 'N4'], data: ['Nguyễn Văn Chính', 'TP Sản xuất – Vận hành', 'NC'], set: ['Nguyễn Văn Huy', 'Giám đốc', 'NH'] };
const placeholders = {};
for (const mod of Object.keys(USERS)) {
  const u = USERS[mod];
  placeholders[mod] = `<div class="app">${side({ mod, sub: '%%SUB%%', user: u, mode: mod === 'sales' })}<main class="main">${top('%%CRUMB%%', { user: u ? u[2] : 'HH' })}
<div class="content"><div class="h1">%%TITLE%%</div>
<div class="card" style="padding:40px;text-align:center;border-style:dashed;background:#FAFBFD">
<div style="width:56px;height:56px;border-radius:14px;background:var(--ice);display:grid;place-items:center;margin:0 auto">%%ICON%%</div>
<div style="font-size:17px;font-weight:700;margin-top:14px">Màn hình này nằm trong danh sách 45 màn hình của GoldCool OS</div>
<div class="sub1" style="max-width:560px;margin:6px auto 0">Bản hiện tại triển khai 18 màn hình chính đã duyệt. Màn hình này sẽ được dựng ở giai đoạn tiếp theo theo đúng bản mô tả phần mềm.</div>
<div class="row" style="justify-content:center;gap:8px;margin-top:18px"><span class="btn pri" data-go="trang-chu">Về Trang chủ</span><span class="btn" data-open-menu="1">Xem 18 màn hình</span></div></div></div></main></div>`;
}
['css', 'js', 'img'].forEach((d) => fs.rmSync(path.join(OUT, d), { recursive: true, force: true }));
fs.mkdirSync(path.join(OUT, 'img'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'js'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'css'), { recursive: true });
// Ảnh: bản 900px cho web
const { execSync } = require('child_process');
execSync(`python3 -c "
import os
from PIL import Image
src='${__dirname}/img'; out='${OUT}/img'
for f in os.listdir(src):
  if f.endswith('.jpg'):
    im=Image.open(os.path.join(src,f)); im.thumbnail((900,900)); im.save(os.path.join(out,f),quality=82)
"`);
const iconSvg = (n) => require('./lib.js').ic(n, 26, 'var(--navy)');
fs.writeFileSync(path.join(OUT, 'js/screens.js'), '// Tự sinh từ 18 màn hình thiết kế – không sửa tay\nwindow.SCREENS=' + JSON.stringify(screens) + ';\nwindow.SCREEN_META=' + JSON.stringify(meta) + ';\nwindow.PLACEHOLDERS=' + JSON.stringify(placeholders) + ';\nwindow.ICONS=' + JSON.stringify({ file: iconSvg('file'), layers: iconSvg('layers') }) + ';\n');
const extra = fs.readFileSync(path.join(__dirname, 'app_extra.css'), 'utf8');
fs.writeFileSync(path.join(OUT, 'css/app.css'), CSS + '\n' + extra);
fs.copyFileSync(path.join(__dirname, 'app.js'), path.join(OUT, 'js/app.js'));
fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GoldCool OS</title><meta name="description" content="Phần mềm quản trị GoldCool Việt Nam – AI Sales, Mục tiêu & KPI, Học viện">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23C9A227'/%3E%3Cpath d='M16 6v20M7.3 11l17.4 10M7.3 21l17.4-10' stroke='%230F3D63' stroke-width='2.6' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="stylesheet" href="css/app.css"></head><body><div id="root"></div><div id="toast"></div>
<script src="js/screens.js"></script><script src="js/app.js"></script></body></html>`);
const FONT = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">';
fs.writeFileSync(path.join(OUT, 'index.html'), fs.readFileSync(path.join(OUT, 'index.html'), 'utf8').replace('<link rel="stylesheet" href="css/app.css">', FONT + '<link rel="stylesheet" href="css/app.css">'));
// Bản để đăng thành trang có link (không có thẻ doctype/head)
fs.writeFileSync(path.join(OUT, 'app.html'), `<title>GoldCool OS</title>\n${FONT}<link rel="stylesheet" href="css/app.css">\n<div id="root"></div><div id="toast"></div>\n<script src="js/screens.js"></script><script src="js/app.js"></script>\n`);
fs.writeFileSync(path.join(OUT, 'vercel.json'), JSON.stringify({ cleanUrls: true, headers: [{ source: '/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] }] }, null, 2));
console.log('OK', OUT, Object.keys(screens).length, 'màn');
