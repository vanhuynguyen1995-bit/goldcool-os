// Danh mục đồ bếp inox và combo hiển thị trên website (không có giá bán).
// Combo là cấu hình gợi ý theo mô hình quán; tư vấn viên điều chỉnh theo mặt bằng thực tế.
const at = '2026-10-31T08:00:00.000Z';
const INOX_CATS = ['Bàn inox', 'Chậu rửa inox', 'Kệ & giá inox', 'Bếp công nghiệp', 'Tủ inox', 'Chụp hút khói', 'Xe đẩy inox', 'Dụng cụ & phụ kiện'];
const COMBO_CATS = ['Quán lẩu – nướng', 'Quán cơm – phở – bún', 'Cà phê – trà sữa', 'Nhà hàng – bếp ăn'];
const SEED = [
  { id: 'cb-lau-nuong', group: 'combo', category: 'Quán lẩu – nướng', name: 'Combo bếp quán lẩu, nướng', slug: 'combo-quan-lau-nuong', image: 'img/td4c-gc.jpg', order: 1,
    summary: 'Trữ nhiều thịt, hải sản và rau; sơ chế nhanh trong giờ cao điểm.',
    items: ['Tủ đông 4 hoặc 6 cánh GoldCool', 'Tủ bàn chặt mát để sơ chế và trữ rau', 'Bàn inox sơ chế', 'Chậu rửa inox', 'Kệ inox để đồ khô', 'Máy rửa bát GoldWash (quán đông khách)'] },
  { id: 'cb-com-pho', group: 'combo', category: 'Quán cơm – phở – bún', name: 'Combo bếp quán cơm, phở, bún', slug: 'combo-quan-com-pho-bun', image: 'img/bc-gc.jpg', order: 2,
    summary: 'Bếp nấu nước dùng, trữ thịt và bánh phở, rau sống trong ngày.',
    items: ['Tủ bàn chặt đông hoặc mát GoldCool', 'Tủ đông 4 cánh GoldCool (quán lớn)', 'Bếp công nghiệp, bếp hầm', 'Bàn inox sơ chế', 'Chậu rửa inox', 'Chụp hút khói'] },
  { id: 'cb-cafe', group: 'combo', category: 'Cà phê – trà sữa', name: 'Combo quầy cà phê, trà sữa', slug: 'combo-quay-ca-phe-tra-sua', image: 'img/salad-gc.jpg', order: 3,
    summary: 'Quầy pha chế gọn, trưng bày đồ uống và trữ topping lạnh.',
    items: ['Tủ mát 2 cánh GoldCool trưng bày đồ uống', 'Tủ salad hoặc bàn mát quầy pha chế', 'Chậu rửa inox', 'Kệ inox quầy bar'] },
  { id: 'cb-nha-hang', group: 'combo', category: 'Nhà hàng – bếp ăn', name: 'Combo bếp nhà hàng, bếp ăn tập thể', slug: 'combo-bep-nha-hang', image: 'img/gw-gc.jpg', order: 4,
    summary: 'Bếp chạy cả ngày, lượng bát đĩa lớn, cần chia khu sơ chế – nấu – rửa.',
    items: ['Tủ đông 6 cánh GoldCool', 'Tủ mát 3 cánh GoldCool', 'Tủ bàn chặt GoldCool', 'Máy rửa bát GoldWash', 'Bếp công nghiệp và chụp hút khói', 'Bàn, chậu rửa, kệ, xe đẩy inox'] },
].map((p) => ({ ...p, status: 'published', createdAt: at, at }));
module.exports = { INOX_CATS, COMBO_CATS, SEED };
