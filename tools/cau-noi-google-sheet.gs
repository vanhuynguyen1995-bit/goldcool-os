/**
 * CẦU NỐI GOOGLE SHEET → GOLDCOOL OS
 * Dùng khi chatbot Fanpage (Retion, chatbot.ai.vn…) chỉ xuất khách ra Google Sheet, không gửi thẳng được.
 * Mỗi phút, script đọc các dòng mới trong Sheet và gửi sang GoldCool OS; khách tự chia cho Sales theo tỉ lệ.
 *
 * CÁCH CÀI (5 phút, làm 1 lần):
 * 1. Mở Google Sheet mà chatbot đang đổ khách vào → menu Tiện ích mở rộng → Apps Script.
 * 2. Xóa hết code có sẵn, dán toàn bộ file này vào.
 * 3. Sửa 2 dòng CẤU HÌNH bên dưới:
 *      DIA_CHI  = địa chỉ đầy đủ lấy ở GoldCool OS › Cài đặt › Kết nối Fanpage › "Hiện địa chỉ đầy đủ"
 *      TEN_TRANG = tên trang tính (tab) chứa khách, ví dụ "Sheet1"
 * 4. Bấm Lưu (biểu tượng đĩa mềm), chọn hàm "caiDat" ở thanh trên rồi bấm Chạy. Google hỏi quyền → Cho phép.
 *    Từ giờ cứ mỗi phút script tự chạy. Muốn chạy ngay để thử: chọn hàm "guiKhachMoi" rồi bấm Chạy.
 *
 * DÒNG ĐẦU TIÊN CỦA SHEET LÀ TÊN CỘT. Tên cột tiếng Việt hay tiếng Anh đều được, ví dụ:
 *   Tên | SĐT | Địa chỉ | Sản phẩm | Cấp khách | Tin nhắn | Tóm tắt | Link hội thoại | Nguồn
 * Script tự thêm cột "GoldCool OS" ở cuối để đánh dấu dòng đã gửi (ghi "Đã gửi · tên Sales" hoặc lỗi).
 * Dòng nào lỗi: xóa chữ trong cột "GoldCool OS" của dòng đó, phút sau script gửi lại.
 */

// ====== CẤU HÌNH ======
const DIA_CHI = 'https://goldcool-os-386s.vercel.app/api/inbound?key=DAN_KHOA_VAO_DAY';
const TEN_TRANG = 'Sheet1';
// ======================

const COT_DANH_DAU = 'GoldCool OS';

function caiDat() {
  ScriptApp.getProjectTriggers().forEach((t) => { if (t.getHandlerFunction() === 'guiKhachMoi') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('guiKhachMoi').timeBased().everyMinutes(1).create();
  guiKhachMoi();
  SpreadsheetApp.getActive().toast('Đã bật: mỗi phút tự gửi khách mới sang GoldCool OS', 'GoldCool OS', 8);
}

function boDau(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function guiKhachMoi() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  try {
    const sh = SpreadsheetApp.getActive().getSheetByName(TEN_TRANG);
    if (!sh) throw new Error('Không thấy trang tính "' + TEN_TRANG + '"');
    const data = sh.getDataRange().getValues();
    if (data.length < 2) return;
    let head = data[0].map(String);
    let mark = head.indexOf(COT_DANH_DAU);
    if (mark < 0) { mark = head.length; sh.getRange(1, mark + 1).setValue(COT_DANH_DAU).setFontWeight('bold'); }
    const keys = head.map(boDau);
    let sent = 0;
    for (let r = 1; r < data.length && sent < 30; r++) {
      const row = data[r];
      if (String(row[mark] || '').trim()) continue;            // đã gửi hoặc đang có ghi chú
      if (!row.some((v, i) => i !== mark && String(v).trim())) continue; // dòng trống
      const body = { source: 'Fanpage' };
      keys.forEach((k, i) => { if (k && i !== mark && String(row[i]).trim() !== '') body[k] = row[i] instanceof Date ? row[i].toISOString() : String(row[i]); });
      let note;
      try {
        const res = UrlFetchApp.fetch(DIA_CHI, { method: 'post', contentType: 'application/json', payload: JSON.stringify(body), muteHttpExceptions: true });
        const j = JSON.parse(res.getContentText() || '{}');
        note = res.getResponseCode() === 200 ? 'Đã gửi · ' + (j.sales || 'chưa chia') : 'Lỗi ' + res.getResponseCode() + ': ' + (j.error || '');
      } catch (e) { note = 'Lỗi: ' + e.message; }
      sh.getRange(r + 1, mark + 1).setValue(note + ' · ' + Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'HH:mm dd/MM'));
      sent++;
    }
  } finally { lock.releaseLock(); }
}
