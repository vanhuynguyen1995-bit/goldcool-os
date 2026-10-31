# GoldCool OS · AI Sales

Hộp thư khách của đội Sales GoldCool Việt Nam. Khách từ Fanpage (đã được AI tư vấn theo DNA) được chia tự động cho Sales theo tỉ lệ; Sales gọi, ghi chú, hẹn gọi lại và cập nhật trạng thái đến khi chốt. Chỉ dùng dữ liệu thật, không có dữ liệu mẫu.

Link: https://goldcool-os-386s.vercel.app

## Các trang

| Trang | Ai dùng | Nội dung |
|---|---|---|
| Hộp thư | Tất cả | Việc cần làm ngay: khách khẩn (bảo hành, khiếu nại), khách mới chưa gọi, khách đến hẹn gọi lại. Giám đốc/HCNS thấy thêm khách chưa chia. |
| Khách | Tất cả | Sales: khách của mình. Giám đốc/HCNS: khách cả đội. Tìm theo tên, SĐT, sản phẩm; lọc theo trạng thái, theo Sales. Nút **Thêm khách** cho khách gọi hotline, nhắn Zalo, đến kho. |
| Báo cáo | Tất cả | Khách nhận, chưa gọi, tỉ lệ liên hệ, báo giá, chốt, thời gian gọi đầu. Giám đốc/HCNS xem thêm bảng theo từng Sales. |
| Cài đặt | Tất cả | Đổi mật khẩu, đăng xuất. Giám đốc/HCNS: tỉ lệ chia khách, kết nối Fanpage, đặt lại mật khẩu nhân viên, nhật ký thay đổi. |

Chi tiết một khách: nút Gọi, Zalo, mở hội thoại Fanpage; đổi trạng thái (Mới → Đã liên hệ → Đã báo giá → Đã chốt / Không nhu cầu); hẹn gọi lại; ghi chú; đánh dấu đã nhập Zotech; bản bàn giao từ AI; hội thoại với AI; lịch sử xử lý. Giám đốc/HCNS chuyển khách sang Sales khác.

Trên điện thoại: menu ở đáy màn hình, chạm vào khách để mở chi tiết, nút Gọi/Zalo to. Có thể "Thêm vào màn hình chính" như một ứng dụng.

## Tài khoản

6 tài khoản trong `api/_users.js`: Giám đốc, HCNS (quản trị), 4 Sales. Mật khẩu ban đầu dùng chung, lần đầu đăng nhập bắt buộc đổi. Quên mật khẩu: Giám đốc hoặc HCNS bấm **Đặt lại mật khẩu** trong Cài đặt.

## Nối chatbot Fanpage

Chatbot gửi mỗi khách đủ điều kiện về `POST /api/inbound?key=<INBOUND_KEY>` (JSON). Các tên trường thường gặp (name, phone, address, product, level, summary, last_message, link, conversation…) được tự nhận. Mẫu đầy đủ xem trong Cài đặt › Kết nối Fanpage.

Biến môi trường trên Vercel:
- `BLOB_READ_WRITE_TOKEN` — kho dữ liệu (đã có)
- `INBOUND_KEY` — khóa cổng nhận khách (đã có)
- `ZOTECH_WEBHOOK_URL` — tùy chọn: chuyển tiếp mỗi khách mới sang Zotech
- `GC_DEFAULT_PASSWORD` — tùy chọn: đổi mật khẩu ban đầu

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html`, `css/sales.css`, `js/sales.js` | Giao diện (không cần build) |
| `api/auth.js` | Đăng nhập, đổi / đặt lại mật khẩu, danh sách tài khoản |
| `api/inbound.js` | Cổng nhận khách, chia theo tỉ lệ, danh sách, cập nhật, thêm khách |
| `api/state.js` | Nhật ký thay đổi |
| `web/` | Website catalog (dự án Vercel riêng) |
| `_nguon/ban-thiet-ke/` | Bản thiết kế 46 màn hình cũ, lưu tham khảo, không đưa lên Vercel |
