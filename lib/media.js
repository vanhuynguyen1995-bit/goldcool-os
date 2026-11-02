// Ảnh thật GoldCool có sẵn (từ kho ảnh đã dùng cho AI Fanpage) – phục vụ Sale gửi khách khi luyện tập
const S = (id, g, kind, label) => ({ id: 'seed-' + id, g, kind, label, url: '/img/' + id + '.jpg', type: 'image/jpeg', seed: true });
export const SEED_MEDIA = [
  S('TD4C_GC_SP_01', 'td', 'anh', 'Tủ đông 4 cánh GoldCool – ảnh thực tế lắp tại bếp'),
  S('TD6C_GC_SP_01', 'td', 'anh', 'Tủ đông 6 cánh GoldCool – ảnh thực tế tại cửa hàng'),
  S('TD4C_MR_SP_01', 'td', 'maure', 'Tủ đông 4 cánh mẫu rẻ – ảnh thực tế'),
  S('TD6C_MR_SP_01', 'td', 'maure', 'Tủ đông 6 cánh mẫu rẻ – ảnh thực tế'),
  S('TM2C_GC_SP_01', 'tm', 'anh', 'Tủ mát 2 cánh GoldCool – ảnh thực tế (1)'),
  S('TM2C_GC_SP_02', 'tm', 'anh', 'Tủ mát 2 cánh GoldCool – ảnh thực tế tại nhà khách (2)'),
  S('TM2C_GC_SP_03', 'tm', 'anh', 'Tủ mát 2 cánh GoldCool – đang dùng tại cửa hàng thực phẩm (3)'),
  S('TM2C_MR_SP_01', 'tm', 'maure', 'Tủ mát 2 cánh mẫu rẻ – ảnh thực tế'),
  S('TM3C_GC_SP_01', 'tm', 'anh', 'Tủ mát 3 cánh GoldCool – ảnh thực tế (1)'),
  S('TM3C_GC_SP_02', 'tm', 'anh', 'Tủ mát 3 cánh GoldCool – đang dùng tại cửa hàng (2)'),
  S('TM3C_GC_SP_03', 'tm', 'anh', 'Tủ mát 3 cánh GoldCool – ảnh thực tế (3)'),
  S('TM3C_MR_SP_01', 'tm', 'maure', 'Tủ mát 3 cánh mẫu rẻ – ảnh thực tế'),
  S('BC_GC_SP_01', 'bc', 'anh', 'Tủ bàn chặt GoldCool – lắp đặt thực tế tại bếp'),
  S('BC_MR_SP_01', 'bc', 'maure', 'Tủ bàn chặt mẫu rẻ – ảnh thực tế'),
  S('SALAD_GC_SP_01', 'sl', 'anh', 'Tủ salad GoldCool – khay topping inox, ngăn mát bên dưới'),
  S('TDTB_GC_KINHCONG_SP_01', 'tb', 'anh', 'Tủ đông trưng bày kính cong GoldCool – ảnh thực tế'),
  S('TDTB_GC_KINHPHANG_SP_01', 'tb', 'anh', 'Tủ đông trưng bày kính phẳng GoldCool GCKP620L – ảnh thực tế'),
  S('TDTB_GC_XADA_SP_01', 'tb', 'anh', 'Tủ đông trưng bày tự động xả đá GoldCool – ảnh thực tế'),
  S('GW_GC_SP_01', 'gw', 'anh', 'Máy rửa bát sóng âm GoldWash – lắp đặt thực tế tại bếp'),
];
