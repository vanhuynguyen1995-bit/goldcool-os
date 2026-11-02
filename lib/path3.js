// LỘ TRÌNH 3 NGÀY cho Sale mới – bài kiểm tra trắc nghiệm + điều kiện Đạt/Chưa đạt
// Nội dung lấy từ quy trình đã chốt (lib/kb.js) và DNA GoldCool v2 (giá hiệu lực 02/11/2026, phễu L1–L6)
import { GROUPS } from './kb.js';

// ans = id phương án đúng; why = giải thích hiện sau khi nộp bài
const q = (id, text, opts, ans, why) => ({ id, text, opts, ans, why });

export const QUIZZES = {
  // ===== NGÀY 1
  nen: {
    day: 1, title: 'Nền tảng: DNA, quy tắc tư vấn & phễu L1–L6', pass: 90,
    qs: [
      q('n1', 'DNA của GoldCool là gì?', { a: 'CHỌN ĐÚNG – DÙNG LÂU', b: 'GIÁ RẺ NHẤT THỊ TRƯỜNG', c: 'BÁN NHANH – CHỐT GỌN', d: 'NHIỀU MẪU NHẤT' }, 'a', 'DNA: CHỌN ĐÚNG – DÙNG LÂU. Lạnh sâu – Bền lâu – Tiết kiệm điện. Sản phẩm phù hợp hơn sản phẩm giá cao.'),
      q('n2', 'Báo giá GoldCool cho khách theo mẫu nào?', { a: 'Chỉ gửi giá sau giảm', b: '"Giá niêm yết …đ, giảm 8% còn …đ"', c: 'Gửi cả bảng giá để khách tự xem', d: '"Giá khoảng … tùy anh/chị lấy bao nhiêu"' }, 'b', 'Mẫu chuẩn: "Giá niêm yết …đ, giảm 8% còn …đ" (tủ mát cao cấp GCS giảm 12%). Giá niêm yết và giá sau giảm mỗi thứ một dòng.'),
      q('n3', 'Khách nói "giảm thêm cho anh chút, anh lấy luôn". Sale trả lời thế nào?', { a: '"Để em hỏi sếp rồi báo lại anh nhé"', b: '"Em bớt thêm cho anh 500 nghìn ạ"', c: '"Giá đã giảm 8% trên giá niêm yết, là mức áp dụng chung, đã gồm VAT" rồi nhấn giá trị và dẫn sang chốt', d: '"Em đi xin giá đặc biệt cho anh ạ"' }, 'c', 'Trả lời ngay mức giảm đã áp dụng sẵn, nhấn giá trị (dàn đồng, bảo hành 24 tháng, đổi mới 30 ngày). Không tự giảm, không hứa xin thêm.'),
      q('n4', 'Câu nào Sale TUYỆT ĐỐI KHÔNG nhắn khách?', { a: '"Dạ anh/chị đang làm mô hình gì ạ?"', b: '"Để em kiểm tra và báo lại anh ạ"', c: '"Giá đã gồm VAT, chưa gồm vận chuyển ạ"', d: '"Em gửi anh video tủ đang chạy thực tế nhé"' }, 'b', '"Em kiểm tra rồi báo lại", "để em hỏi sếp / xin giá" là thiếu chuyên nghiệp, làm mất niềm tin. Hỏi nội bộ trước rồi mới trả lời khách.'),
      q('n5', 'Khi nào đưa mẫu rẻ ra để khách so sánh?', { a: 'Ngay tin đầu tiên để khách có nhiều lựa chọn', b: 'Khi khách đã chọn GoldCool và hỏi địa chỉ giao', c: 'Khi khách im lặng 15–30 phút sau báo giá, chỉ "cảm ơn" hoặc kêu giá cao', d: 'Không bao giờ giới thiệu mẫu rẻ' }, 'c', 'Mẫu rẻ chỉ là công cụ so sánh. Không đưa khi khách đã sẵn sàng mua GoldCool.'),
      q('n6', 'Điểm khác nhau đúng giữa mẫu rẻ và GoldCool?', { a: 'Mẫu rẻ dàn đồng, GoldCool dàn nhôm', b: 'Mẫu rẻ dàn nhôm, bảo hành 12 tháng; GoldCool dàn đồng, bảo hành 24 tháng, đổi mới 30 ngày đầu nếu lỗi kỹ thuật', c: 'Cả hai đều bảo hành 24 tháng', d: 'Mẫu rẻ tiết kiệm điện 50% hơn' }, 'b', 'Mẫu rẻ: dàn nhôm, hoàn thiện cơ bản, 12 tháng, không đổi mới. GoldCool: dàn đồng, chắc chắn, lạnh và ổn định tốt hơn, 24 tháng, đổi mới 30 ngày đầu.'),
      q('n7', 'Giá bán lẻ GoldCool báo cho khách đã gồm những gì?', { a: 'Đã gồm VAT, chưa gồm vận chuyển', b: 'Chưa gồm VAT, đã gồm vận chuyển', c: 'Đã gồm VAT và vận chuyển, lắp đặt', d: 'Chưa gồm VAT và vận chuyển' }, 'a', 'Giá bán lẻ đã gồm VAT, chưa gồm vận chuyển.'),
      q('n8', 'Mỗi tin nhắn tư vấn nên hỏi khách mấy câu?', { a: 'Hỏi hết một lượt cho nhanh', b: 'Một câu – hỏi một chút, chia sẻ một chút, hỏi tiếp', c: 'Không hỏi, chỉ gửi giá', d: 'Ít nhất 3 câu để khai thác đủ' }, 'b', 'Mỗi tin một ý, mỗi lần hỏi MỘT câu, kết thúc bằng câu hỏi dẫn bước tiếp.'),
      q('n9', 'Khách đã nói "mình mở quán lẩu nướng". Tin tiếp theo của Sale?', { a: 'Hỏi lại "anh/chị làm mô hình gì ạ?" cho chắc', b: 'Dùng luôn thông tin đó, không hỏi lại, tư vấn bước tiếp', c: 'Gửi toàn bộ catalogue', d: 'Hỏi tên, tuổi khách trước' }, 'b', 'Đọc lead, không hỏi lại điều khách đã nói.'),
      q('n10', 'Khách chọn một mẫu (VD quạt gió). Sale làm gì tiếp?', { a: 'Tăng niềm tin vào đúng mẫu đó: khen lựa chọn, lý do hợp quán, bằng chứng đúng mẫu', b: 'So sánh lại với mẫu kia cho khách phân vân', c: 'Giới thiệu ngay mẫu rẻ', d: 'Gửi lại bảng giá' }, 'a', 'Khách chọn mẫu nào thì tăng niềm tin vào đúng mẫu đó, rồi hỏi thời điểm cần hàng.'),
      q('n11', 'Câu nào về điện năng được phép nói?', { a: '"Tủ tiết kiệm điện 50%"', b: 'Nêu công suất định danh; chỉ nói số tiêu thụ thực tế khi có số đo được duyệt', c: '"Tủ gần như không tốn điện"', d: '"Rẻ điện nhất thị trường"' }, 'b', 'Không bao giờ nói "tiết kiệm điện 50%". Chỉ dùng thông số đã được duyệt.'),
      q('n12', 'L1 (MQL) là gì?', { a: 'Khách đã đặt cọc', b: 'Data đủ điều kiện: khách để lại thông tin thật và có nhu cầu liên quan sản phẩm GoldCool', c: 'Khách đã nhận báo giá', d: 'Khách đã mua và được chăm sóc' }, 'b', 'L1 – MQL: thông tin thật, có nhu cầu. Sai SĐT, trùng, spam, không nhu cầu thì không tính.'),
      q('n13', 'Lead L1 mới cần được Sale liên hệ thế nào?', { a: 'Trong ngày là được', b: 'Trong ≤ 5 phút; chưa kết nối thì gọi lại, nhắn Zalo/SMS, tối thiểu 3 lần ở các khung giờ khác nhau', c: 'Chờ khách nhắn lại', d: 'Gọi 1 lần, không nghe thì bỏ' }, 'b', 'Yêu cầu L1: liên hệ ≤ 5 phút, tối thiểu 3 lần ở 3 khung giờ.'),
      q('n14', 'Khi nào được ghi khách là L3?', { a: 'Khi đã gửi bảng giá chung hoặc catalogue', b: 'Khi có nhu cầu rõ + sản phẩm đề xuất + giá cụ thể', c: 'Khi khách xem tin nhắn', d: 'Khi khách để lại số điện thoại' }, 'b', 'L3 = nhu cầu rõ + sản phẩm đề xuất + giá cụ thể. Gửi bảng giá chung chưa phải L3.'),
      q('n15', 'Khách nói "mai anh chuyển khoản". Ghi nhận cấp nào?', { a: 'L5 – chốt đơn', b: 'Chưa phải L5; L5 chỉ khi đã đặt cọc/thanh toán hoặc kế toán xác nhận. Khách L4 phải có ngày và hành động follow-up', c: 'L6', d: 'L1' }, 'b', 'Chưa tính L5 nếu khách chỉ nói "anh lấy rồi", "mai chuyển khoản". L4 bắt buộc có ngày và hành động follow-up tiếp theo.'),
    ],
  },

  // ===== NGÀY 2 – 6 nhóm sản phẩm
  td: {
    day: 2, g: 'td', title: GROUPS.td, pass: 80,
    qs: [
      q('td1', 'Tủ đông 4 cánh trực tiếp GC4C-1068L-B1 báo giá thế nào?', { a: 'Niêm yết 17.500.000đ, giảm 8% còn 16.100.000đ', b: 'Niêm yết 16.100.000đ, giảm 8% còn 14.812.000đ', c: 'Niêm yết 26.000.000đ, giảm 8% còn 23.920.000đ', d: '12.500.000đ' }, 'a', '4 cánh trực tiếp: 17.500.000đ → 16.100.000đ. 12.500.000đ là mẫu rẻ.'),
      q('td2', 'Tủ đông 6 cánh quạt gió GC6C-1800L báo giá thế nào?', { a: 'Niêm yết 35.880.000đ', b: 'Niêm yết 39.000.000đ, giảm 8% còn 35.880.000đ', c: 'Niêm yết 23.500.000đ, giảm 8% còn 21.620.000đ', d: '25.000.000đ' }, 'b', '6 cánh quạt gió: 39.000.000đ → 35.880.000đ. 25.000.000đ là mẫu rẻ quạt gió.'),
      q('td3', 'Ưu điểm đặc trưng của dòng TRỰC TIẾP?', { a: 'Không đóng đá, không phải xả đá', b: '2 ngăn riêng: cài 2 ngăn đông hoặc 1 đông – 1 mát, giá dễ đầu tư hơn', c: 'Lạnh nhanh nhất, nhiệt đều nhất', d: 'Chỉ 1 ngăn' }, 'b', 'Trực tiếp: giá tốt, 2 ngăn riêng; lưu ý có đóng đá, xả đá tay 1–2 tháng/lần.'),
      q('td4', 'Lưu ý cần nói với khách về dòng QUẠT GIÓ?', { a: 'Phải xả đá mỗi tuần', b: '1 ngăn, dùng chung một chế độ nhiệt; giá cao hơn', c: 'Không cài được nhiệt độ', d: 'Chỉ dùng được cho đồ mát' }, 'b', 'Quạt gió: lạnh nhanh, sâu, đều, không đóng đá; lưu ý 1 ngăn chung một chế độ nhiệt.'),
      q('td5', 'Quán bún phở mở tủ liên tục, không muốn mất công xả đá. Sale nghiêng về dòng nào?', { a: 'Trực tiếp', b: 'Quạt gió', c: 'Mẫu rẻ', d: 'Tủ mát' }, 'b', 'Mở tủ nhiều, cần lạnh lại nhanh, không đóng đá → quạt gió. Nói "em nghiêng về … vì …".'),
    ],
  },
  tm: {
    day: 2, g: 'tm', title: GROUPS.tm, pass: 80,
    qs: [
      q('tm1', 'Tủ mát 2 cánh 1050L (GC1050) báo giá thế nào?', { a: 'Niêm yết 17.500.000đ, giảm 8% còn 16.100.000đ', b: 'Niêm yết 19.000.000đ, giảm 8% còn 17.480.000đ', c: '14.500.000đ', d: 'Niêm yết 28.000.000đ, giảm 12% còn 24.640.000đ' }, 'a', '1050L: 17.500.000đ → 16.100.000đ. 1150L: 19.000.000đ → 17.480.000đ.'),
      q('tm2', 'Tủ mát 2 cánh cao cấp GCS-1200L báo giá thế nào?', { a: 'Niêm yết 28.000.000đ, giảm 8% còn 25.760.000đ', b: 'Niêm yết 28.000.000đ, giảm 12% còn 24.640.000đ', c: 'Niêm yết 24.640.000đ', d: 'Niêm yết 26.000.000đ, giảm 8% còn 23.920.000đ' }, 'b', 'Dòng cao cấp GCS giảm 12% (không phải 8%).'),
      q('tm3', 'Điểm riêng của tủ mát cao cấp GCS?', { a: 'Dàn nhôm, giá rẻ', b: 'Kính sấy điện, sấy gioăng chống đọng sương, chọn lốc trên/lốc dưới, 0–8°C', c: 'Không có cửa kính', d: 'Nhiệt độ âm sâu −18°C' }, 'b', 'GCS: kính sấy điện, sấy gioăng, lốc trên/dưới, 0–8°C. Tiêu chuẩn 0–10°C.'),
      q('tm4', 'Mẫu rẻ tủ mát 3 cánh giá bao nhiêu?', { a: '14.500.000đ', b: '19.000.000đ', c: '23.920.000đ', d: '18.500.000đ' }, 'b', 'Mẫu rẻ 2 cánh 14.500.000đ, 3 cánh 19.000.000đ.'),
      q('tm5', 'Cách tư vấn đúng với tủ mát?', { a: 'Đẩy khách lên dòng cao cấp vì lãi cao', b: 'Hỏi mô hình và mặt hàng trưng bày trước, ưu tiên mẫu chủ lực (1050/1150/1500/1650), để khách tự chọn', c: 'Gửi cả 6 mẫu một lúc', d: 'Báo mẫu rẻ trước' }, 'b', 'Sản phẩm phù hợp hơn sản phẩm giá cao: không đẩy khách lên cao cấp.'),
    ],
  },
  bc: {
    day: 2, g: 'bc', title: GROUPS.bc, pass: 80,
    qs: [
      q('bc1', 'Trước khi báo giá tủ bàn chặt, Sale phải biết điều gì?', { a: 'Khách đông hay mát và kích thước (1,2 / 1,5 / 1,8m)', b: 'Khách quen ai trong công ty', c: 'Không cần, gửi cả bảng giá', d: 'Màu sắc khách thích' }, 'a', 'Phải biết đông hay mát và kích thước trước; chỉ báo 2 giá đúng kích thước.'),
      q('bc2', 'Tủ MÁT bàn chặt trực tiếp 1,5m báo giá thế nào?', { a: 'Niêm yết 11.000.000đ, giảm 8% còn 10.120.000đ', b: 'Niêm yết 11.500.000đ, giảm 8% còn 10.580.000đ', c: 'Niêm yết 18.000.000đ, giảm 8% còn 16.560.000đ', d: '8.500.000đ' }, 'a', 'Mát trực tiếp 1,2/1,5/1,8m: 9.660.000 / 10.120.000 / 10.580.000đ sau giảm.'),
      q('bc3', 'Tủ ĐÔNG bàn chặt quạt gió 1,8m giá sau giảm?', { a: '17.480.000đ', b: '18.400.000đ', c: '11.040.000đ', d: '13.500.000đ' }, 'b', 'Đông quạt gió 1,8m: niêm yết 20.000.000đ → 18.400.000đ. 13.500.000đ là mẫu rẻ.'),
      q('bc4', 'Cách báo giá bàn chặt đúng quy trình?', { a: 'Gửi toàn bộ 12 mức giá', b: 'Chỉ báo 2 giá (trực tiếp và quạt gió) đúng kích thước khách cần', c: 'Báo mẫu rẻ trước', d: 'Báo giá trung bình' }, 'b', 'Không gửi dồn bảng giá; chỉ 2 phương án đúng kích thước.'),
      q('bc5', 'Kích thước và nhiệt độ tủ bàn chặt GoldCool?', { a: 'Dài 1,2/1,5/1,8m, sâu 800, cao 800mm; mát 0–10°C, đông 0 đến −18°C (quạt gió −22°C)', b: 'Chỉ có 1,5m', c: 'Sâu 600mm, đông −30°C', d: 'Dài 2,4m' }, 'a', 'Model GCQB450/500/550, mặt bàn inox sơ chế.'),
    ],
  },
  sl: {
    day: 2, g: 'sl', title: GROUPS.sl, pass: 80,
    qs: [
      q('sl1', 'Tủ salad tư vấn chọn theo những gì?', { a: 'Số khay, nguyên liệu và kích thước chỗ đặt', b: 'Chỉ theo giá', c: 'Theo màu inox', d: 'Theo số cánh' }, 'a', 'Luồng: mô hình → nguyên liệu, số khay → kích thước → 2 phương án trực tiếp/quạt gió.'),
      q('sl2', 'Tủ salad bản 1,8m có bao nhiêu khay topping?', { a: '9 khay', b: '12 khay', c: '18 khay', d: '24 khay' }, 'c', 'Bản 1,8m có 18 khay topping.'),
      q('sl3', 'Mẫu rẻ tủ salad so với GoldCool cùng cấu hình?', { a: 'Rẻ hơn 3.000.000đ, dàn nhôm, bảo hành 12 tháng', b: 'Bằng giá', c: 'Rẻ hơn 50%', d: 'Không có mẫu rẻ' }, 'a', 'Mẫu rẻ tủ salad = giá GoldCool cùng cấu hình − 3.000.000đ.'),
      q('sl4', 'Các kích thước tủ salad?', { a: '1,2 / 1,5 / 1,8m (450 / 500 / 550L)', b: '1,0 / 2,0m', c: 'Chỉ 1,8m', d: '2,4m' }, 'a', '0–10°C, ba cỡ 1,2 / 1,5 / 1,8m.'),
      q('sl5', 'Giá tủ salad Sale lấy ở đâu?', { a: 'Tự ước lượng theo tủ bàn chặt', b: 'Tra bảng giá hiện hành (niêm yết giảm 8%), không tự đặt số', c: 'Hỏi khách muốn bao nhiêu', d: 'Nhắn khách "để em hỏi sếp"' }, 'b', 'Không tự tạo giá. Hỏi nội bộ trước rồi mới báo khách.'),
    ],
  },
  tb: {
    day: 2, g: 'tb', title: GROUPS.tb, pass: 80,
    qs: [
      q('tb1', 'Tủ đông trưng bày có mẫu rẻ để so sánh không?', { a: 'Có, rẻ hơn 3 triệu', b: 'Không – tối ưu giá bằng kích thước hoặc dòng phù hợp', c: 'Có, dàn nhôm', d: 'Có, bảo hành 6 tháng' }, 'b', 'Tủ đông trưng bày không có mẫu rẻ.'),
      q('tb2', 'Đặc điểm dòng KÍNH CONG (GCKC)?', { a: 'Giỏ chia ngăn, dễ phân loại hàng; 0 đến −25°C', b: 'Mặt kính phẳng 2m × 1m', c: 'Tự động xả đá', d: 'Chỉ làm mát' }, 'a', 'Kính cong: GCKC688L (1,2m), 800L (1,5m), 1050L (2m), 1300L (2,5m).'),
      q('tb3', 'Kính phẳng GCKP620L phù hợp khi nào?', { a: 'Cần mặt kính rộng, kê giữa cửa hàng, bày thực phẩm chia khay (2000×1000mm)', b: 'Quầy kem nhỏ 1,2m', c: 'Cần 2 ngăn đông mát riêng', d: 'Bếp sơ chế' }, 'a', 'Kính phẳng: 2000×1000mm, 0 đến −22°C, mặt kính rộng.'),
      q('tb4', 'Dòng TỰ ĐỘNG XẢ ĐÁ là model nào, lợi ích gì?', { a: 'GCST1100 / GCST1250 – hạn chế đóng tuyết, giảm công xả đá', b: 'GCKC688L – giỏ chia ngăn', c: 'GC4C-1088L – 4 cánh', d: 'GCQB500 – bàn chặt' }, 'a', 'GCST1100 (2,1m), GCST1250 (2,5m), 0 đến −22°C.'),
      q('tb5', 'Luồng tư vấn tủ đông trưng bày đúng?', { a: 'Báo giá cả 7 model ngay', b: 'Hỏi mặt hàng → giới thiệu dòng để khách chọn kiểu trưng bày → hỏi chỗ đặt → báo 1 mẫu vừa chỗ đặt kèm ảnh', c: 'Giới thiệu mẫu rẻ trước', d: 'Hỏi ngân sách rồi báo mẫu đắt nhất' }, 'b', 'Hỏi một chút, chia sẻ một chút; báo 1 mẫu vừa chỗ đặt, kèm ảnh đúng model.'),
    ],
  },
  gw: {
    day: 2, g: 'gw', title: GROUPS.gw, pass: 80,
    qs: [
      q('gw1', 'Máy rửa bát GoldWash có hai phiên bản nào?', { a: 'Máy Thường và Máy Sục Khí Ozon (thêm sục khí, dùng cho rau củ quả)', b: 'Máy 1 bồn và 2 bồn', c: 'Máy nóng và máy lạnh', d: 'Máy nhựa và máy inox' }, 'a', 'Máy Thường rửa bát đĩa, tiết kiệm hơn; Sục Khí Ozon thêm sục khí cho rau củ.'),
      q('gw2', 'Cỡ 1,2m của GoldWash có bản nào?', { a: 'Chỉ bản Sục khí', b: 'Chỉ bản Thường', c: 'Cả hai bản', d: 'Không có cỡ 1,2m' }, 'a', 'Cỡ 1,2m chỉ có bản Sục khí.'),
      q('gw3', 'Chất liệu và bảo hành GoldWash?', { a: '100% Inox SUS304, bảo hành 24 tháng', b: 'Inox 201, bảo hành 12 tháng', c: 'Nhựa ABS, bảo hành 6 tháng', d: 'Inox 304, bảo hành 36 tháng' }, 'a', 'SUS304, máy nặng chắc, quạt tản nhiệt, tiêu âm 2 lớp, 24 tháng.'),
      q('gw4', 'Khách kêu đắt, đang tham khảo máy rẻ hơn. Sale làm gì?', { a: 'Giới thiệu mẫu GoldWash rẻ', b: 'Chia sẻ thị trường có máy rẻ hơn 3–5 triệu và nên so 4 thông số: inox 201 hay 304, trọng lượng, số đầu sóng âm/sục khí, bảo hành – rồi gửi thông số GoldWash', c: 'Tự giảm 3 triệu', d: 'Chê máy bên khác kém' }, 'b', 'GoldWash không giới thiệu mẫu rẻ; không chê đối thủ, chỉ chia sẻ cách so sánh.'),
      q('gw5', 'Điều Sale KHÔNG được hứa về GoldWash?', { a: 'Bảo hành 24 tháng', b: 'Hiệu quả diệt khuẩn hay số bát/giờ', c: 'Inox SUS304', d: 'Có bản Sục khí cho rau củ' }, 'b', 'Không cam kết hiệu quả làm sạch, diệt khuẩn hay số bát/giờ khi chưa có dữ liệu xác thực.'),
    ],
  },

  // ===== NGÀY 2 – bài giá (phải đúng 100%)
  gia: {
    day: 2, title: 'Bảng giá bán lẻ (hiệu lực 02/11/2026)', pass: 100,
    qs: [
      q('p1', 'Tủ đông 4 cánh QUẠT GIÓ – giá sau giảm?', { a: '23.920.000đ', b: '26.000.000đ', c: '21.620.000đ', d: '18.500.000đ' }, 'a', 'Niêm yết 26.000.000đ, giảm 8% còn 23.920.000đ.'),
      q('p2', 'Tủ đông 6 cánh TRỰC TIẾP – giá sau giảm?', { a: '23.500.000đ', b: '21.620.000đ', c: '16.100.000đ', d: '18.500.000đ' }, 'b', 'Niêm yết 23.500.000đ, giảm 8% còn 21.620.000đ.'),
      q('p3', 'Tủ mát 2 cánh 1150L – giá sau giảm?', { a: '16.100.000đ', b: '19.000.000đ', c: '17.480.000đ', d: '14.500.000đ' }, 'c', 'Niêm yết 19.000.000đ, giảm 8% còn 17.480.000đ.'),
      q('p4', 'Tủ mát 3 cánh 1500L – giá sau giảm?', { a: '23.920.000đ', b: '25.300.000đ', c: '26.000.000đ', d: '19.000.000đ' }, 'a', 'Niêm yết 26.000.000đ, giảm 8% còn 23.920.000đ.'),
      q('p5', 'Tủ mát 3 cánh 1650L – giá sau giảm?', { a: '23.920.000đ', b: '25.300.000đ', c: '27.500.000đ', d: '34.320.000đ' }, 'b', 'Niêm yết 27.500.000đ, giảm 8% còn 25.300.000đ.'),
      q('p6', 'Tủ mát 3 cánh cao cấp GCS-1800L – báo giá?', { a: 'Niêm yết 39.000.000đ, giảm 8% còn 35.880.000đ', b: 'Niêm yết 39.000.000đ, giảm 12% còn 34.320.000đ', c: 'Niêm yết 34.320.000đ', d: 'Niêm yết 33.930.000đ' }, 'b', 'Dòng GCS giảm 12%: 39.000.000đ → 34.320.000đ.'),
      q('p7', 'Tủ MÁT bàn chặt QUẠT GIÓ 1,2m – giá sau giảm?', { a: '9.660.000đ', b: '15.640.000đ', c: '16.560.000đ', d: '12.000.000đ' }, 'b', 'Niêm yết 17.000.000đ, giảm 8% còn 15.640.000đ.'),
      q('p8', 'Tủ ĐÔNG bàn chặt TRỰC TIẾP 1,2m – giá sau giảm?', { a: '9.660.000đ', b: '10.120.000đ', c: '10.580.000đ', d: '8.500.000đ' }, 'b', 'Niêm yết 11.000.000đ, giảm 8% còn 10.120.000đ.'),
      q('p9', 'Tủ ĐÔNG bàn chặt TRỰC TIẾP 1,8m – giá sau giảm?', { a: '10.580.000đ', b: '11.040.000đ', c: '12.000.000đ', d: '18.400.000đ' }, 'b', 'Niêm yết 12.000.000đ, giảm 8% còn 11.040.000đ.'),
      q('p10', 'Mẫu rẻ tủ đông 4 cánh QUẠT GIÓ – giá?', { a: '12.500.000đ', b: '18.500.000đ', c: '25.000.000đ', d: '23.920.000đ' }, 'b', 'Mẫu rẻ 4 cánh: trực tiếp 12.500.000đ, quạt gió 18.500.000đ. Mẫu rẻ chỉ một giá, không giảm.'),
      q('p11', 'Mẫu rẻ tủ MÁT bàn chặt TRỰC TIẾP 1,8m – giá?', { a: '8.000.000đ', b: '9.000.000đ', c: '9.500.000đ', d: '13.000.000đ' }, 'b', 'Mẫu rẻ mát trực tiếp 1,2/1,5/1,8m: 8 / 8,5 / 9 triệu.'),
      q('p12', 'Mẫu rẻ tủ mát 2 cánh – giá?', { a: '14.500.000đ', b: '16.100.000đ', c: '19.000.000đ', d: '12.500.000đ' }, 'a', 'Mẫu rẻ tủ mát 2 cánh 14.500.000đ, 3 cánh 19.000.000đ.'),
    ],
  },
};

export const QORDER = ['nen', 'td', 'tm', 'bc', 'sl', 'tb', 'gw', 'gia'];
// Ngày 3: đóng vai với AI – mỗi nhóm cần đủ số cuộc và điểm trung bình tối thiểu
export const RP = { minCalls: 2, minAvg: 75 };

// Đề cho Sale (không kèm đáp án), xáo câu và phương án
export function quizForClient(id) {
  const z = QUIZZES[id]; if (!z) throw new Error('Không có bài kiểm tra này');
  const sh = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  return { id, title: z.title, day: z.day, pass: z.pass, g: z.g || null,
    qs: sh(z.qs).map(x => ({ id: x.id, text: x.text, opts: sh(Object.entries(x.opts)).map(([k, t]) => ({ k, t })) })) };
}

export function gradeQuiz(id, answers) {
  const z = QUIZZES[id]; if (!z) throw new Error('Không có bài kiểm tra này');
  const detail = z.qs.map(x => ({ id: x.id, text: x.text, pick: answers?.[x.id] || null, pickText: x.opts[answers?.[x.id]] || '', right: x.ans, rightText: x.opts[x.ans], ok: answers?.[x.id] === x.ans, why: x.why }));
  const correct = detail.filter(d => d.ok).length;
  const pct = Math.round(correct / z.qs.length * 100);
  return { quiz: id, correct, total: z.qs.length, pct, passed: pct >= z.pass, detail };
}

// Tổng hợp trạng thái lộ trình của 1 Sale
export function pathStatus(quizAtts, chatAtts, signoff) {
  const best = {};
  for (const a of quizAtts || []) {
    const b = best[a.quiz];
    if (!b) best[a.quiz] = { pct: a.pct, passed: a.passed, tries: 1, at: a.at };
    else { b.tries++; if (a.pct > b.pct) { b.pct = a.pct; b.at = a.at; } b.passed = b.passed || a.passed; }
  }
  const quizzes = QORDER.map(id => ({ id, title: QUIZZES[id].title, day: QUIZZES[id].day, g: QUIZZES[id].g || null, pass: QUIZZES[id].pass, n: QUIZZES[id].qs.length, best: best[id]?.pct ?? null, tries: best[id]?.tries || 0, passed: !!best[id]?.passed }));
  const tot = (a) => (a.final ? a.final.total : a.ai ? a.ai.total : 0);
  const rp = Object.keys(GROUPS).map(g => {
    const l = (chatAtts || []).filter(a => a.g === g);
    const avg = l.length ? Math.round(l.reduce((x, a) => x + tot(a), 0) / l.length) : null;
    return { g, name: GROUPS[g], n: l.length, avg, passed: l.length >= RP.minCalls && avg >= RP.minAvg };
  });
  const d1 = quizzes.filter(x => x.day === 1).every(x => x.passed);
  const d2 = quizzes.filter(x => x.day === 2).every(x => x.passed);
  const d3 = rp.every(x => x.passed);
  const passed = d1 && d2 && d3;
  const missing = [];
  quizzes.filter(x => !x.passed).forEach(x => missing.push(`Bài "${x.title}" cần ≥ ${x.pass}%${x.best != null ? ` (cao nhất ${x.best}%)` : ''}`));
  rp.filter(x => !x.passed).forEach(x => missing.push(`Đóng vai ${x.name}: cần ≥ ${RP.minCalls} cuộc, TB ≥ ${RP.minAvg} (hiện ${x.n} cuộc${x.avg != null ? `, TB ${x.avg}` : ''})`));
  const weak = rp.filter(x => x.avg != null).sort((a, b) => a.avg - b.avg)[0] || null;
  return { quizzes, rp, rule: RP, days: { d1, d2, d3 }, passed, missing, weak, signoff: signoff || null,
    stage: signoff ? 'Đủ điều kiện nhận khách thật' : passed ? 'Đạt – chờ Giám đốc xác nhận' : !d1 ? 'Ngày 1' : !d2 ? 'Ngày 2' : 'Ngày 3' };
}
