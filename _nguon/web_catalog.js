// Danh mục sản phẩm GoldCool cho website (lấy từ DNA phiên bản 2 – Product Master).
// Không có giá bán. Thông số có thể điều chỉnh theo lô hàng.
// m: [mã, tên, kiểu / phiên bản, dung tích tổng / dùng (L), kích thước (mm), nhiệt độ (°C), công suất, phù hợp]
module.exports = [
  {
    slug: 'tu-dong-cong-nghiep', name: 'Tủ đông công nghiệp', short: 'Tủ đông inox 4 & 6 cánh, tủ đông nằm', pre: 'Tủ đông 4 & 6 cánh',
    img: 'td4c-gc', gallery: [['td4c-gc', 'Tủ đông inox 4 cánh GoldCool'], ['td6c-gc', 'Tủ đông inox 6 cánh GoldCool']],
    lead: 'Tủ đông inox 4 cánh và 6 cánh cho bếp nhà hàng, quán lẩu, nướng, bếp ăn tập thể. Dàn lạnh đồng 100%, chọn lạnh trực tiếp hoặc quạt gió theo cách bếp vận hành.',
    tags: ['Dàn lạnh đồng 100%', 'Bảo hành 24 tháng', 'Đổi mới 30 ngày đầu nếu lỗi kỹ thuật'],
    versions: [
      ['Lạnh trực tiếp', ['Có 2 ngăn riêng', 'Dùng cả 2 ngăn đông, hoặc 1 ngăn đông – 1 ngăn mát', 'Mức đầu tư thấp hơn', 'Cần xả đá định kỳ']],
      ['Lạnh quạt gió', ['Lạnh nhanh, nhiệt phân bố đều hơn', 'Không cần xả đá thủ công', 'Một ngăn, dùng chung một chế độ nhiệt', 'Mức đầu tư cao hơn']],
    ],
    cards: [
      ['Tủ đông inox 4 cánh', 'td4c-gc', 'Ngang 1,2 m · lạnh trực tiếp hoặc quạt gió', ['GC4C-1068L · trực tiếp', 'GC4C-1088L · quạt gió']],
      ['Tủ đông inox 6 cánh', 'td6c-gc', 'Ngang 1,8 m cho bếp lớn · lạnh trực tiếp hoặc quạt gió', ['GCTD-1600L · trực tiếp', 'GC6C-1800L · quạt gió']],
    ],
    models: [
      ['GC4C-1068L', 'Tủ đông inox 4 cánh', 'Lạnh trực tiếp, 2 ngăn riêng', '1068 / 750', '1200×700×1960', '10 đến −22', '430W', 'Nhà hàng cần tủ gọn 1,2 m'],
      ['GC4C-1088L', 'Tủ đông inox 4 cánh', 'Quạt gió, 1 ngăn', '1088 / 750', '1200×760×1960', '10 đến −22', '720W', 'Bếp mở cửa nhiều, hạn chế đóng tuyết'],
      ['GCTD-1600L', 'Tủ đông inox 6 cánh', 'Lạnh trực tiếp, 2 ngăn riêng', '1600 / —', 'Ngang 1800', '—', '—', 'Bếp lớn, đầu tư hợp lý'],
      ['GC6C-1800L', 'Tủ đông inox 6 cánh', 'Quạt gió, 1 ngăn', '1800 / 1500', '1800×760×1960', '10 đến −22', '900W', 'Bếp công suất cao'],
      ['HP-500A', 'Tủ đông nằm', 'Cửa trên', '– / 400', '1460×700×850', '10 đến −23', '335W', 'Bếp nhỏ, quán mới mở'],
      ['HP-768L', 'Tủ đông nằm', 'Cửa trên', '– / 500', '1760×700×855', '10 đến −23', '900W', 'Bếp vừa, bếp ăn công nghiệp'],
      ['HP-1150L', 'Tủ đông nằm', 'Cửa trên', '– / 900', '2160×805×855', '10 đến −23', '340W', 'Bếp vừa, bếp ăn công nghiệp'],
    ],
    cmp: true,
  },
  {
    slug: 'tu-mat-trung-bay', name: 'Tủ mát trưng bày', short: 'Tủ mát 2, 3, 4 cánh kính, tủ 1 cánh, tủ bánh kem', pre: 'Tủ mát 2 & 3 cánh',
    img: 'tm2c-gc', gallery: [['tm2c-gc', 'Tủ mát 2 cánh GoldCool'], ['tm2c-gc-02', 'Tủ mát 2 cánh GoldCool'], ['tm3c-gc', 'Tủ mát 3 cánh GoldCool'], ['tm3c-gc-02', 'Tủ mát 3 cánh GoldCool']],
    lead: 'Tủ mát cửa kính trưng bày đồ uống, rau củ, bánh cho quán ăn, cửa hàng, siêu thị mini. Dung tích từ 1050L đến 2500L, có dòng cao cấp kính sấy điện.',
    tags: ['Dung tích 1050L – 2500L', 'Bảo hành 24 tháng', 'Đổi mới 30 ngày đầu nếu lỗi kỹ thuật'],
    versions: [
      ['Tủ mát 2 cánh', ['1050L tiêu chuẩn', '1150L sức chứa tăng, vẫn ngang 1,2 m', '1200L cao cấp']],
      ['Tủ mát 3 cánh', ['1500L tiêu chuẩn', '1650L sức chứa tăng', '1800L cao cấp']],
      ['Dòng cao cấp GCS', ['Kính sấy điện, sấy gioăng', 'Lốc trên hoặc lốc dưới', 'Có bản 4 cánh 2500L cho chuỗi bán lẻ']],
    ],
    cards: [
      ['Tủ mát 2 cánh', 'tm2c-gc', '1050L · 1150L · 1200L cao cấp', ['GC1050', 'GC1150', 'GCS-1200L']],
      ['Tủ mát 3 cánh', 'tm3c-gc', '1500L · 1650L · 1800L cao cấp', ['GC1500', 'GC1650', 'GCS-1800L']],
      ['Tủ mát 2 cánh (ảnh thực tế)', 'tm2c-gc-02', 'Trưng bày đồ uống cho quán và cửa hàng', ['Tư vấn theo dung tích']],
      ['Tủ mát 3 cánh (ảnh thực tế)', 'tm3c-gc-02', 'Mặt trưng bày rộng cho cửa hàng lớn', ['Tư vấn theo dung tích']],
    ],
    models: [
      ['GC1050', 'Tủ mát 2 cánh', 'Tiêu chuẩn', '1050 / 700', '1200×630×2050', '0 đến 10', '410W', 'Cửa hàng vừa'],
      ['GC1150', 'Tủ mát 2 cánh', 'Sức chứa tăng', '1150 / 800', '1200×680×2020', '0 đến 10', '430W', 'Cần thêm sức chứa, giữ ngang 1,2 m'],
      ['GCS-1200L', 'Tủ mát 2 cánh cao cấp', 'Lốc trên hoặc dưới', '1200 / 900', '1250×750×2090', '0 đến 8', '480W', 'Ưu tiên trưng bày'],
      ['GC1500', 'Tủ mát 3 cánh', 'Tiêu chuẩn', '1500 / 1200', '1800×630×2000', '0 đến 10', '600W', 'Cửa hàng cần 3 cánh'],
      ['GC1650', 'Tủ mát 3 cánh', 'Sức chứa tăng', '1650 / 1400', '1800×680×2020', '0 đến 10', '600W', 'Cửa hàng lớn'],
      ['GCS-1800L', 'Tủ mát 3 cánh cao cấp', 'Lốc trên hoặc dưới', '1800 / 1600', '1880×750×2090', '0 đến 8', '1080W', 'Siêu thị, chuỗi'],
      ['GCS-2500L', 'Tủ mát 4 cánh cao cấp', 'Lốc trên', '2500 / 2200', '2500×750×2090', '0 đến 8', '1240W', 'Chuỗi bán lẻ, mặt trưng bày rất rộng'],
      ['GC428', 'Tủ mát 1 cánh', 'Cửa kính', '428', '600×630×1990', '0 đến 10', '260W', 'Quán, cửa hàng nhỏ'],
      ['GCDB250', 'Tủ bánh kem để bàn', 'Ngang 90 cm', '250', '900×510×810', '0 đến 10', '320W', 'Tiệm bánh, trà sữa, cafe'],
    ],
    cmp: true,
  },
  {
    slug: 'ban-mat-tu-salad', name: 'Tủ bàn chặt & tủ salad', short: 'Bàn mát, bàn đông, tủ salad 1,2 – 1,8 m', pre: 'Tủ bàn chặt',
    img: 'bc-gc', gallery: [['bc-gc', 'Tủ bàn chặt GoldCool'], ['salad-gc', 'Tủ salad GoldCool']],
    lead: 'Vừa là mặt bàn sơ chế vừa trữ lạnh ngay dưới tay. Tủ bàn chặt mát hoặc đông, tủ salad có khay topping cho quầy pizza, salad, bánh mì, trà sữa.',
    tags: ['Dài 1,2 · 1,5 · 1,8 m', 'Trực tiếp hoặc quạt gió', 'Bảo hành 24 tháng'],
    versions: [
      ['Tủ mát bàn chặt', ['Trữ rau, thịt sơ chế trong ngày', 'Nhiệt độ 0 đến 10°C', 'Có bản cánh kính']],
      ['Tủ đông bàn chặt', ['Trữ đông ngay tại khu sơ chế', 'Nhiệt độ 0 đến −18°C', 'Bản quạt gió hạ được xuống −22°C']],
      ['Tủ salad', ['Mặt trên có khay topping', 'Bản 1,8 m có 18 khay', 'Hợp pizza, salad, bánh mì']],
    ],
    cards: [
      ['Tủ bàn chặt', 'bc-gc', 'Mát hoặc đông · 1,2 · 1,5 · 1,8 m', ['GCQB450', 'GCQB500', 'GCQB550']],
      ['Tủ salad', 'salad-gc', 'Có khay topping · 1,2 · 1,5 · 1,8 m', ['Trực tiếp', 'Quạt gió']],
    ],
    models: [
      ['GCQB450', 'Tủ bàn chặt 1,2 m', 'Mát hoặc đông', '450 / 300', '1200×800×800', '0–10 / 0 đến −18', '212W (quạt gió 330W)', 'Bếp nhỏ, quầy bar'],
      ['GCQB500', 'Tủ bàn chặt 1,5 m', 'Mát hoặc đông', '500 / 330', '1500×800×800', '0–10 / 0 đến −18', '252W (quạt gió 390W)', 'Bếp 1–2 người thao tác'],
      ['GCQB550', 'Tủ bàn chặt 1,8 m', 'Mát hoặc đông', '550 / 360', '1800×800×800', '0–10 / 0 đến −18', '282W (quạt gió 410W)', 'Bếp lớn, khu sơ chế'],
      ['—', 'Tủ salad 1,2 / 1,5 / 1,8 m', 'Trực tiếp hoặc quạt gió, gồm khay', '450 / 500 / 550', 'Dài 1200–1800, sâu 800, cao 800', '0–10 / 0 đến −18', '212–282W (quạt gió 330–410W)', 'Pizza, salad, bánh mì'],
    ],
    cmp: true,
  },
  {
    slug: 'tu-dong-trung-bay', name: 'Tủ đông trưng bày', short: 'Kính cong, kính phẳng, tự động xả đá', pre: 'Tủ đông trưng bày',
    img: 'tdtb-gc-kinhcong', gallery: [['tdtb-gc-kinhcong', 'Tủ đông trưng bày kính cong'], ['tdtb-gc-kinhphang', 'Tủ đông trưng bày kính phẳng'], ['tdtb-gc-xada', 'Tủ đông trưng bày tự động xả đá']],
    lead: 'Trưng bày kem, thịt cá, hải sản, đồ đông lạnh cho cửa hàng thực phẩm và siêu thị. Chọn theo kiểu kính, chiều dài và lượng hàng.',
    tags: ['Dài 1,2 m – 2,5 m', 'Bảo hành 24 tháng', 'Tư vấn theo phiên bản'],
    versions: [
      ['Kính cong', ['Có giỏ chia ngăn, dễ sắp xếp', 'Hợp kem, thịt cá, hải sản, đồ đông lạnh', 'Thuận tiện khi phân loại nhiều mặt hàng']],
      ['Kính phẳng', ['Mặt kính rộng, nhìn hàng rõ', 'Lòng tủ thoáng', 'Hợp thực phẩm sơ chế hoặc chia khay']],
      ['Tự động xả đá', ['Hạn chế đóng tuyết', 'Giảm công xả đá thủ công', 'Hợp khi ưu tiên thuận tiện lâu dài']],
    ],
    cards: [
      ['Tủ đông kính cong', 'tdtb-gc-kinhcong', '4 – 9 giỏ · dài 1,2 – 2,5 m', ['GCKC688L', 'GCKC800L', 'GCKC1050L', 'GCKC1300L']],
      ['Tủ đông kính phẳng', 'tdtb-gc-kinhphang', 'Kính lùa · dài 2 m', ['GCKP620L']],
      ['Tủ đông tự động xả đá', 'tdtb-gc-xada', 'Kính lùa · dài 2,1 – 2,5 m', ['GCST1100', 'GCST1250']],
    ],
    models: [
      ['GCKC688L', 'Kính cong', '4 giỏ', '688 / 400', '1200×760×850', '0 đến −25', '350W', 'Quầy kem, cửa hàng nhỏ'],
      ['GCKC800L', 'Kính cong', '5 giỏ', '800 / 500', '1500×760×850', '0 đến −25', '420W', 'Siêu thị mini'],
      ['GCKC1050L', 'Kính cong', '7 giỏ', '1050 / 700', '2000×760×850', '0 đến −25', '500W', 'Cửa hàng đông lạnh nhiều nhóm hàng'],
      ['GCKC1300L', 'Kính cong', '9 giỏ', '1300 / 1050', '2500×760×850', '0 đến −25', '600W', 'Cửa hàng lớn, siêu thị'],
      ['GCKP620L', 'Kính phẳng', 'Kính lùa', '620 / 620', '2000×1000×880', '0 đến −18', '420W', 'Thịt cá, thực phẩm đóng gói'],
      ['GCST1100', 'Tự động xả đá', 'Kính lùa', '1100 / 900', '2100×880×850', '0 đến −22', '680W', 'Điểm bán mở tủ thường xuyên'],
      ['GCST1250', 'Tự động xả đá', 'Kính lùa', '1250 / 1100', '2500×875×870', '0 đến −22', '720W', 'Siêu thị, điểm bán lớn vận hành liên tục'],
    ],
  },
  {
    slug: 'may-rua-bat-goldwash', name: 'Máy rửa bát GoldWash', short: 'Máy rửa bát sóng âm, inox SUS304', pre: 'GoldWash',
    img: 'gw-gc', gallery: [['gw-gc', 'Máy rửa bát sóng âm GoldWash']],
    lead: 'Máy rửa bát công nghiệp dùng sóng âm, bồn inox SUS304, cho quán ăn, nhà hàng, bếp trung tâm. Chọn theo chiều dài và lượng bát đĩa mỗi ngày.',
    tags: ['Dài 1,2 m – 2,4 m', 'Inox SUS304', 'Bảo hành 24 tháng'],
    versions: [
      ['Máy Thường', ['Chuyên rửa bát đĩa, tô, khay, dụng cụ bếp', 'Tối ưu chi phí hơn', 'Có từ 1,5 m đến 2,4 m']],
      ['Máy Sục Khí Ozon', ['Vẫn rửa bát đĩa như bản thường', 'Có thêm hệ thống sục khí hỗ trợ làm sạch rau củ quả', 'Có từ 1,2 m đến 2,4 m']],
    ],
    cards: [
      ['Máy rửa bát GoldWash', 'gw-gc', 'Máy Thường hoặc Sục Khí Ozon · dài 1,2 – 2,4 m', ['1,2 m', '1,5 m', '1,8 m', '2 m', '2,4 m']],
    ],
    cols: ['Chiều dài', 'Kích thước (mm)', 'Phiên bản', 'Đầu sóng âm', 'Đầu sục ozone', 'Cân nặng', 'Phù hợp'],
    rows: [
      ['1,2 m', '1200×800×800/980', 'Sục Khí Ozon', '25', '8', '110 kg', 'Quán vừa, mặt bằng hạn chế'],
      ['1,5 m', '1500×800×800/980', 'Thường / Ozon', '35', '– / 12', '110 / 130 kg', 'Quán vừa'],
      ['1,8 m', '1800×800×800/980', 'Thường / Ozon', '40', '– / 14', '130 / 145 kg', 'Nhà hàng'],
      ['2 m', '2000×800×800/980', 'Thường / Ozon', '45', '– / 16', '140 / 155 kg', 'Nhà hàng nhiều ca'],
      ['2,4 m', '2400×800×800/980', 'Thường / Ozon', '50', '– / 18', '162 / 180 kg', 'Bếp trung tâm, bếp lớn'],
    ],
  },
];

// Thiết bị bếp inox (danh sách từ bảng giá 11/2026; thông số chi tiết gửi khi báo giá). Bảo hành 12 tháng.
module.exports.INOX = [
  ['Bếp họng & bếp Âu', 'bep', 'Bếp họng cho quán ăn, nhà hàng; bếp Âu nhiều họng cho bếp lớn.', ['Bếp họng: 1 · 2 · 3 · 5 họng', 'Bếp Âu: 4 · 6 họng']],
  ['Nồi phở', 'noi', 'Nồi inox nấu nước dùng cho quán phở, bún, bếp ăn.', ['Dung tích từ 20L đến 200L', 'Mỗi cỡ cách nhau 10L']],
  ['Bàn chặt inox', 'ban', 'Bàn sơ chế inox có giá dưới cho khu bếp.', ['Giá dưới dạng nan hoặc phẳng', 'Dài 1,2 · 1,5 · 1,8 m']],
  ['Chậu rửa inox', 'chau', 'Chậu rửa cho khu rửa rau, rửa thịt, rửa dụng cụ.', ['1 hố · 2 hố · 3 hố', 'Bản 1 hố và 2 hố có bàn']],
  ['Giá kệ inox', 'ke', 'Kệ kho khô và giá gia vị cho bếp.', ['Kệ 4 tầng, 5 tầng · dài 1,2 m, 1,45 m', 'Giá 2 tầng gia vị nan hoặc phẳng · 1,2 · 1,5 · 1,8 m']],
  ['Tủ cơm & tủ sấy', 'tu', 'Tủ nấu cơm công nghiệp và tủ sấy bát đĩa.', ['Tủ cơm 6 · 8 · 12 khay, có bản hẹn giờ', 'Tủ sấy bát đĩa']],
  ['Tủ bán hàng', 'tuban', 'Tủ inox bán hàng cho quầy, xe bán đồ ăn.', ['Bản thường', 'Bản có ngăn kéo']],
  ['Xe đẩy & phụ trợ', 'xe', 'Xe đẩy, xe rác và bẫy mỡ cho bếp.', ['Xe đẩy 3 tầng', 'Xe rác · Bẫy mỡ']],
];
