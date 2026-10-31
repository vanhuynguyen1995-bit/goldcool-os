# GoldCool OS – phần mềm quản trị GoldCool Việt Nam

Phần mềm quản trị nội bộ GoldCool Việt Nam, gồm 3 phân hệ:
- **AI Sales**: hộp thư Fanpage, khách của tôi, chuyển giao, phòng thử AI, báo cáo, cài đặt.
- **Mục tiêu & KPI**: bảng số liệu Giám đốc, cây mục tiêu, báo cáo tuần, thẻ vấn đề.
- **Học viện**: học, thi, đóng vai, kết quả.

Gồm đủ 45 màn hình trong danh sách (46 trang: màn C08 tách thành Báo vấn đề mới và Chi tiết thẻ). 18 màn hình chính lấy nguyên từ bản thiết kế đã duyệt; 28 màn còn lại dựng cùng bộ nhận diện. Dữ liệu bám DNA phiên bản 2: phễu L1–L6, 5 kịch bản AI, giá bán lẻ đã gồm VAT, nhân sự theo sơ đồ tổ chức.

## Chạy thử trên máy

Mở file `index.html` bằng trình duyệt. Nếu ảnh không hiện, chạy một máy chủ tĩnh bất kỳ trong thư mục này, ví dụ `npx serve .`.

## Đưa lên Vercel (không cần cài gì)

1. Vào github.com, đăng nhập, bấm **New repository**, đặt tên `goldcool-os`, chọn **Private**, rồi bấm **Create repository**.
2. Ở trang repo vừa tạo, bấm **uploading an existing file**. Kéo **toàn bộ nội dung** thư mục này vào (gồm `index.html`, `vercel.json`, các thư mục `css`, `js`, `img`), rồi bấm **Commit changes**.
3. Vào vercel.com, đăng nhập bằng GitHub, bấm **Add New… → Project**, chọn repo `goldcool-os`, rồi bấm **Import**.
4. Ở mục **Framework Preset**, chọn **Other**. Không cần lệnh build. Bấm **Deploy**.
5. Khoảng 30 giây sau, Vercel cấp link dạng `goldcool-os.vercel.app`.

Mỗi lần sửa file trên GitHub, Vercel tự đưa bản mới lên.

Nếu máy đã có Node.js: mở Terminal trong thư mục này và chạy `npx vercel --prod`.

## Cấu trúc

| Thư mục / file | Nội dung |
|---|---|
| `index.html` | Trang chính |
| `js/screens.js` | 18 màn hình (sinh tự động từ bản thiết kế, không sửa tay) |
| `js/app.js` | Điều hướng, thao tác, AI thử theo 5 kịch bản, lưu trạng thái |
| `css/app.css` | Bộ nhận diện: navy #0F3D63, vàng #C9A227 |
| `img/` | 19 ảnh sản phẩm thật, đặt tên theo quy tắc NHÓM_DÒNG_PHIÊNBẢN_LOẠI_STT |

## Những gì đã chạy thật trong bản này

- **Đăng nhập** chọn vai trò (Sales, Giám đốc, Trưởng phòng SX–VH, nhân viên mới), mỗi vai trò vào đúng màn chính. Bấm tên ở góc dưới bên trái để đăng xuất.
- Điều hướng toàn bộ menu. Nút **☰ 46 màn hình** ở góc dưới bên phải để mở nhanh từng màn.
- **Thông báo**, **Ghi nhận đồng nghiệp**, **Báo vấn đề mới** (thẻ hiện ngay trên bảng), **Đề xuất mục tiêu**, **Khung chat website** chạy cùng luật 5 kịch bản.
- **Hộp thư**: tiếp nhận khách, nhắn tin, chặn câu hứa tồn kho hoặc ngày giao khi Kho chưa xác nhận.
- **Chi tiết khách**: ghi kết quả liên hệ. Muốn lên L4 bắt buộc có ngày và hành động follow-up.
- **Phòng thử AI**: gõ như khách để AI trả lời đúng 5 kịch bản. AI báo giá GoldCool trước, mẫu rẻ sau, gửi ảnh thật, chuyển Sales đúng lúc. AI không báo giá các nhóm tủ salad, tủ đông trưng bày, GoldWash.
- **Bảng giá**: chọn ngày áp dụng rồi duyệt cả bảng.
- **Cài đặt AI**: thêm hoặc bỏ câu bị cấm.
- **Thẻ vấn đề**: Giám đốc chọn phương án; trao đổi.
- **Báo cáo tuần**: nộp báo cáo.
- **Bài thi**: chọn đáp án, chấm câu.
- **Đóng vai**: khách AI phản hồi theo câu trả lời. Không tự giảm giá thì buổi luyện đạt; tự giảm giá thì chưa đạt.

Trạng thái lưu trong trình duyệt của từng người. Muốn làm lại từ đầu, mở menu **☰ 18 màn hình** và chọn **Đặt lại dữ liệu thử**.

## Chưa có trong bản này (bước tích hợp tiếp theo)

- Kết nối Fanpage Facebook, CRM Zotech, Zalo nhóm Sales.
- Đăng nhập, phân quyền theo vai trò, cơ sở dữ liệu dùng chung cho cả công ty.
- AI thật gọi mô hình ngôn ngữ (bản này mô phỏng đúng luật của 5 kịch bản).
- Đăng nhập thật bằng tài khoản công ty (bản này cho chọn vai trò để thử).

## Thư mục `_nguon`

Mã nguồn sinh 18 màn hình: `lib.js`, `batch1v2.js`, `batch2v2.js` (18 màn chính) và `batch3.js` (28 màn còn lại) là bản thiết kế. `build_app.js` đóng gói chúng thành `js/screens.js`. Thư mục này không được đưa lên Vercel.
