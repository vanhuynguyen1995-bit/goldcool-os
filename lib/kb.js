// Kiến thức GoldCool dùng cho AI chấm điểm và AI đóng vai khách (theo 6 quy trình đã chốt 02/11/2026)
export const GROUPS = {
  td: 'Tủ đông 4 & 6 cánh',
  tm: 'Tủ mát 2 & 3 cánh',
  bc: 'Tủ đông & tủ mát bàn chặt',
  sl: 'Tủ salad',
  tb: 'Tủ đông trưng bày',
  gw: 'Máy rửa bát GoldWash',
};

export const KB = `
GOLDCOOL VIỆT NAM – thiết bị lạnh, thiết bị bếp cho F&B. DNA: CHỌN ĐÚNG – DÙNG LÂU. Lạnh sâu – Bền lâu – Tiết kiệm điện.
Bán bằng sự am hiểu, tạo niềm tin bằng chất lượng, giữ khách bằng trách nhiệm. Sản phẩm phù hợp hơn sản phẩm giá cao.

QUY TẮC CHUNG CHO SALE (nhận lead L1, tư vấn qua Zalo):
- Đọc lead, không hỏi lại điều khách đã nói. Mỗi tin một ý, mỗi lần hỏi MỘT câu.
- TƯ VẤN MỀM MẠI, KHÔNG DẬP KHUÔN: mỗi tin CHIA SẺ một điều có ích trước (kinh nghiệm chọn, lợi ích, quán khác dùng thế nào, nhắc lại đúng điều khách vừa nói) rồi mới HỎI một câu kèm lý do ("để em…"). Các bước chỉ là khung tham khảo, đổi thứ tự theo khách; khách đã rõ mẫu, cần gấp thì đi thẳng báo giá.
- Trong lúc tư vấn hỏi dần, đan xen tự nhiên (không hỏi dồn, không như phỏng vấn) để nắm: mô hình & mặt hàng; mở mới hay mua thêm/thay thiết bị cũ (cũ đang vướng gì); chỗ đặt/kích thước; bao giờ cần thiết bị; khu vực/địa chỉ (nếu chưa biết, hỏi kèm lý do báo phí ship, lịch giao); ai cùng quyết định (khi khách nói để hỏi lại).
- Đọc khách để đổi nhịp: khách cụt lủn → tin ngắn, hỏi dạng chọn A hay B; khách nhắn dài → trả lời đủ ý rồi hỏi 1 câu; khách tham khảo → chia sẻ kinh nghiệm, không ép, hẹn lại; khách nhắn "ok" → không gửi dồn bước tiếp, hỏi nhẹ xem đã ổn chưa.
- Gửi phương án GoldCool kèm ưu điểm – lưu ý để KHÁCH TỰ CHỌN. Khách chọn mẫu nào thì tăng niềm tin vào đúng mẫu đó (khen lựa chọn, lý do hợp quán, bằng chứng đúng mẫu). Khách chưa biết chọn mới tư vấn: hỏi thêm 1 câu rồi nói "em nghiêng về … vì …".
- Báo giá theo mẫu: "Giá niêm yết …đ, giảm 8% còn …đ" (tủ mát cao cấp GCS giảm 12%). Giá đã gồm VAT, chưa gồm vận chuyển. Mức giảm đã áp dụng sẵn, KHÔNG giảm thêm.
- Tin nhắn trình bày thoáng: mỗi phương án một khối, giá niêm yết và giá sau giảm mỗi thứ một dòng, ưu điểm gạch đầu dòng ngắn, không viết đoạn dài, hạn chế emoji.
- Luôn kèm ảnh thực tế đúng model và 1–2 video/feedback đúng mẫu để tăng niềm tin.
- Mẫu rẻ chỉ đưa ra để so sánh khi khách im lặng 15–30 phút sau báo giá, chỉ "cảm ơn" hoặc kêu giá cao; không đưa khi khách đã chọn GoldCool. Mẫu rẻ: dàn lạnh nhôm, hoàn thiện cơ bản, bảo hành 12 tháng, không đổi mới. GoldCool: dàn đồng, hoàn thiện chắc chắn, lạnh và ổn định tốt hơn, bảo hành 24 tháng, đổi mới 30 ngày đầu nếu lỗi kỹ thuật.
- Khách hỏi giảm giá: trả lời ngay "giá đã giảm 8% trên giá niêm yết, là mức áp dụng chung, đã gồm VAT", nhấn giá trị. KHÔNG hứa xin thêm, KHÔNG nhắn "để em hỏi sếp/em đi xin giá".
- Follow-up sau 1 ngày: hỏi đúng chỗ khách lăn tăn (giá, chất lượng, chưa chọn được mẫu, đang so bên khác, chưa đến lúc mua) rồi xử lý đúng chỗ đó.
- Chốt đơn: xác nhận sản phẩm, số lượng, xin địa chỉ, kiểm tra kho rồi gửi xác nhận đơn (giá niêm yết – giảm – còn, địa chỉ, ngày giao dự kiến, phí vận chuyển).
- TUYỆT ĐỐI KHÔNG: nhắn khách "em kiểm tra và báo lại", "để em hỏi lại/hỏi sếp" (thiếu chuyên nghiệp, mất niềm tin); tự tạo thông số/giá/bảo hành; nói "tiết kiệm điện 50%"; tự giảm giá, tặng quà, combo; hứa ngày giao/tồn kho khi chưa kiểm tra; chê đối thủ; feedback giả; gửi dồn nhiều ảnh, bảng giá.

1) TỦ ĐÔNG 4 & 6 CÁNH (khách thường đã rõ 4 hay 6 cánh – chỉ tư vấn đúng loại đó)
- 4 cánh trực tiếp GC4C-1068L-B1: niêm yết 17.500.000đ, giảm 8% còn 16.100.000đ. 1068L, 1200×700×1960, 10 đến −22°C, 430W.
- 4 cánh quạt gió GC4C-1088L: niêm yết 26.000.000đ, còn 23.920.000đ. 1088L, 1200×760×1960, 720W.
- 6 cánh trực tiếp GCTD-1600L: niêm yết 23.500.000đ, còn 21.620.000đ. 1600L, 1800×700×2000, 10 đến −22°C, 660W.
- 6 cánh quạt gió GC6C-1800L: niêm yết 39.000.000đ, còn 35.880.000đ. 1800L, 1800×760×1960, 900W.
- Mẫu rẻ: 4 cánh trực tiếp 12.500.000đ, quạt gió 18.500.000đ; 6 cánh trực tiếp 18.500.000đ, quạt gió 25.000.000đ.
- Trực tiếp: giá tốt, 2 ngăn riêng (2 ngăn đông hoặc 1 đông – 1 mát), có đóng đá, xả đá tay 1–2 tháng/lần. Quạt gió: lạnh nhanh, lạnh sâu, nhiệt đều, không đóng đá, 1 ngăn chung một chế độ nhiệt, giá cao hơn. Dàn đồng 100%.
- Luồng: hỏi mô hình → gửi 2 phương án để khách tự chọn → tăng niềm tin đúng mẫu → (mẫu rẻ nếu cần) → chốt.

2) TỦ MÁT 2 & 3 CÁNH
- 2 cánh: 1050L (GC1050) niêm yết 17.500.000đ còn 16.100.000đ; 1150L (GC1150) niêm yết 19.000.000đ còn 17.480.000đ; 1200L cao cấp (GCS-1200L) niêm yết 28.000.000đ giảm 12% còn 24.640.000đ.
- 3 cánh: 1500L niêm yết 26.000.000đ còn 23.920.000đ; 1650L niêm yết 27.500.000đ còn 25.300.000đ; 1800L cao cấp niêm yết 39.000.000đ giảm 12% còn 34.320.000đ.
- Mẫu rẻ 2 cánh 14.500.000đ, 3 cánh 19.000.000đ. Tiêu chuẩn 0–10°C; cao cấp GCS 0–8°C, kính sấy điện, sấy gioăng chống đọng sương, lốc trên/dưới.
- Ưu tiên mẫu chủ lực (1050/1150/1500/1650); không đẩy khách lên cao cấp. Hỏi mô hình và mặt hàng trưng bày trước.

3) TỦ ĐÔNG & TỦ MÁT BÀN CHẶT (phải biết đông hay mát và kích thước trước khi báo giá; chỉ báo 2 giá đúng kích thước)
- Mát trực tiếp 1,2/1,5/1,8m: niêm yết 10,5/11/11,5 triệu → còn 9.660.000/10.120.000/10.580.000đ. Mát quạt gió: 17/18/19 triệu → 15.640.000/16.560.000/17.480.000đ.
- Đông trực tiếp: 11/11,5/12 triệu → 10.120.000/10.580.000/11.040.000đ. Đông quạt gió: 18/19/20 triệu → 16.560.000/17.480.000/18.400.000đ.
- Mẫu rẻ mát trực tiếp/quạt gió 1,2m 8/12tr, 1,5m 8,5/12,5tr, 1,8m 9/13tr; đông 1,2m 8,5/12,5tr, 1,5m 9/13tr, 1,8m 9,5/13,5tr.
- Sâu 800, cao 800mm; mát 0–10°C, đông 0 đến −18°C (quạt gió −22°C). Model GCQB450/500/550. Mặt bàn inox sơ chế.

4) TỦ SALAD (chọn theo số khay, nguyên liệu, kích thước)
- 1,2/1,5/1,8m (450/500/550L), 0–10°C, bản 1,8m 18 khay topping. Giá: niêm yết giảm 8% (Sale tra bảng giá hiện hành).
- Mẫu rẻ cùng cấu hình rẻ hơn GoldCool 3.000.000đ, dàn nhôm, bảo hành 12 tháng.
- Luồng: mô hình → nguyên liệu, số khay → kích thước → 2 phương án trực tiếp/quạt gió → tăng niềm tin → mẫu rẻ nếu cần → chốt.

5) TỦ ĐÔNG TRƯNG BÀY (không có mẫu rẻ; tối ưu giá bằng kích thước/dòng)
- Kính cong GCKC688L (1,2m), GCKC800L (1,5m), GCKC1050L (2m), GCKC1300L (2,5m): giỏ chia ngăn, 0 đến −25°C.
- Kính phẳng GCKP620L: 2000×1000mm, 0 đến −22°C, mặt kính rộng, kê giữa cửa hàng được, hợp thực phẩm chia khay.
- Tự động xả đá GCST1100 (2,1m), GCST1250 (2,5m): 0 đến −22°C, hạn chế đóng tuyết.
- Giá: niêm yết giảm 8%. Luồng: hỏi mặt hàng → giới thiệu dòng để khách chọn kiểu trưng bày → hỏi chỗ đặt → báo 1 mẫu vừa chỗ đặt kèm ảnh → tăng niềm tin → chốt.

6) MÁY RỬA BÁT SÓNG ÂM GOLDWASH (không giới thiệu mẫu rẻ)
- Máy Thường (rửa bát đĩa, tiết kiệm hơn) / Máy Sục Khí Ozon (thêm sục khí, dùng cho rau củ quả). Cỡ 1,2m chỉ có bản Sục khí.
- Cỡ – đầu sóng – đầu sục – nặng (Thường/Sục khí): 1,2m 25–8 –/110kg; 1,5m 35–12 110/130kg; 1,8m 40–14 130/145kg; 2,0m 45–16 140/155kg; 2,4m 50–18 162/180kg.
- 100% Inox SUS304, máy nặng chắc, quạt tản nhiệt, tiêu âm 2 lớp, bảo hành 24 tháng. Không hứa hiệu quả diệt khuẩn hay số bát/giờ.
- Khách im lặng sau báo giá / kêu đắt / đang tham khảo: chia sẻ trước "thị trường có máy rẻ hơn 3–5 triệu tùy kích thước, nên so 4 thông số: inox 201 hay 304, trọng lượng, số đầu sóng âm/sục khí, bảo hành", rồi gửi thông số GoldWash. Không mời khách gửi máy bên khác, chỉ chia sẻ thông tin.
`;

export const CRITERIA = [
  { k: 'quytrinh', name: 'Đúng quy trình, đúng bước', max: 20 },
  { k: 'thongtin', name: 'Thông tin chính xác (giá, thông số, chính sách)', max: 25 },
  { k: 'niemtin', name: 'Tăng niềm tin (lợi ích, ảnh, feedback)', max: 20 },
  { k: 'trinhbay', name: 'Trình bày thoáng, ngắn gọn', max: 15 },
  { k: 'dandat', name: 'Mềm mại, chia sẻ – hỏi, dẫn dắt bước tiếp', max: 20 },
];

export const PERSONAS = {
  de: 'Khách dễ tính: trả lời đủ ý, hợp tác, có nhu cầu thật.',
  gia: 'Khách hay mặc cả: hỏi giảm giá, so sánh với chỗ rẻ hơn, nói "đắt quá".',
  imlang: 'Khách ít nói: trả lời cụt, hay chỉ "ok", "cảm ơn", có lúc không trả lời câu hỏi.',
  khotinh: 'Khách khó tính: nghi ngờ chất lượng, hỏi bảo hành, độ bền, xuất xứ, đòi bằng chứng.',
  thamkhao: 'Khách đang tham khảo: chưa gấp, hỏi giá nhiều bên, nói "để anh/chị suy nghĩ thêm".',
};

// Tài liệu cho Sale: tách KB thành các phần
export function docs() {
  const keys = ['td', 'tm', 'bc', 'sl', 'tb', 'gw'];
  return KB.trim().split(/\n\n+/).map(block => {
    const lines = block.split('\n').map(x => x.trim()).filter(Boolean);
    const m = lines[0].match(/^(\d)\)\s*(.*)$/);
    const body = lines.slice(1).map(x => x.replace(/^-\s*/, ''));
    if (m) return { g: keys[Number(m[1]) - 1], title: m[2], lines: body };
    if (/QUY TẮC CHUNG/.test(lines[0])) return { g: 'chung', title: 'Quy tắc chung khi tư vấn', lines: body };
    return { g: 'dna', title: 'DNA GoldCool', lines };
  });
}
