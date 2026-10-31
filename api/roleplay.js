// Phòng đóng vai: AI đóng vai khách và chấm điểm buổi luyện (cần ANTHROPIC_API_KEY trong biến môi trường Vercel)
const L = require('./_lib.js');
const KEY = process.env.ANTHROPIC_API_KEY || '';
const MODEL = process.env.ROLEPLAY_MODEL || 'claude-sonnet-5-5';

const CASE = `Tình huống: anh Tuấn, chủ quán cơm (bếp chạy cả ngày), cần tủ mát bàn chặt 1,5 m để thịt và rau sơ chế. Tủ cũ hỏng sau 2 năm.
Giá bán lẻ đã gồm VAT, chưa gồm vận chuyển: GoldCool lạnh trực tiếp 1,5 m 10.120.000đ, quạt gió 16.560.000đ; mẫu rẻ trực tiếp 8.500.000đ, quạt gió 12.500.000đ.
Khác biệt: GoldCool dàn đồng, hoàn thiện chắc chắn hơn, hiệu suất và độ ổn định tốt hơn, bảo hành 24 tháng, đổi mới 30 ngày đầu nếu lỗi kỹ thuật theo chính sách; mẫu rẻ dàn nhôm, hoàn thiện cơ bản, bảo hành 12 tháng.
Quy tắc Sales GoldCool: không tự giảm giá, tạo ưu đãi hay combo ngoài chính sách đã duyệt; không hứa ngày giao, không xác nhận tồn kho khi chưa kiểm tra; không hạ thấp đối thủ; không nói "tiết kiệm điện 50%"; niềm tin lâu dài hơn doanh số trước mắt; sản phẩm phù hợp hơn sản phẩm giá cao.`;

const SYS_REPLY = `Bạn đóng vai KHÁCH HÀNG tên Tuấn nhắn tin với nhân viên Sales của GoldCool (thiết bị lạnh cho nhà hàng). Bạn không phải trợ lý, không gợi ý đáp án, không nhận xét Sales.
${CASE}
Tính cách: thực tế, hơi khó, quan tâm giá. Bạn đang đòi bớt 1 triệu và nói chỗ khác bán còn bớt.
Cách phản ứng:
- Nếu Sales đồng ý giảm giá, tặng quà hoặc ưu đãi ngoài chính sách: bạn chốt ngay, đòi số tài khoản.
- Nếu Sales chỉ nói chung chung ("giá tốt rồi", "không giảm được") mà không giải thích giá trị hay đưa lựa chọn: tiếp tục ép giá bằng cách khác (so sánh chỗ khác, hỏi tặng kèm, hỏi miễn phí vận chuyển, dọa đi mua chỗ khác). Không lặp lại nguyên văn câu bạn đã nói.
- Nếu Sales giữ giá lịch sự VÀ giải thích khác biệt phù hợp với bếp chạy cả ngày (dàn đồng, bảo hành 24 tháng, đổi mới 30 ngày) HOẶC đưa mẫu rẻ để bạn tự chọn: bạn dần xuôi, có thể hỏi thêm 1 câu (bảo hành thế nào, bao giờ giao, phí ship), rồi đồng ý lấy GoldCool hoặc mẫu rẻ tùy Sales tư vấn.
- Nếu Sales hứa ngày giao cụ thể hoặc cam kết điều không có trong chính sách: bạn tin và hỏi tiếp chi tiết.
- Nếu Sales chê bai hãng khác: bạn hơi khó chịu.
Trả lời bằng tiếng Việt, giọng nhắn tin Facebook, 1–2 câu ngắn, xưng "anh", gọi Sales là "em". Chỉ viết nội dung tin nhắn.`;

const SYS_GRADE = `Bạn là người kèm cặp Sales của GoldCool. Chấm buổi luyện đóng vai dưới đây theo DNA GoldCool.
${CASE}
Chấm 6 tiêu chí, 2 tiêu chí có dấu * là bắt buộc:
1. Hỏi nhu cầu – hỏi đúng thông tin còn thiếu, không hỏi lại điều đã biết.
2. Giải thích phiên bản – nói đúng khác biệt GoldCool và mẫu rẻ, trực tiếp và quạt gió nếu cần.
3. Báo giá đúng kịch bản* – nếu có nhắc giá thì đúng giá, đúng kích thước, GoldCool trước mẫu rẻ, không nêu giá sai.
4. Đúng quyền hạn* – không tự giảm giá, không tặng, không tạo combo/ưu đãi, không hứa ngày giao, không xác nhận tồn kho.
5. Bằng chứng & khác biệt – gắn khác biệt với nỗi lo của khách (bếp chạy cả ngày, tủ cũ hỏng sau 2 năm), không hạ thấp đối thủ.
6. Bước tiếp theo – kết thúc bằng một bước rõ ràng (xin địa chỉ, thời điểm cần, hẹn gửi báo giá/bàn giao) mà không hứa điều ngoài quyền.
Đạt buổi luyện khi đạt từ 5/6 tiêu chí và đạt cả 2 tiêu chí bắt buộc.
Trả về DUY NHẤT một JSON, không kèm chữ nào khác:
{"criteria":[{"name":"Hỏi nhu cầu","pass":true,"quote":"câu Sales đã nói (trích nguyên văn, ngắn)","comment":"nhận xét 1 câu","better":"câu nên nói (chỉ khi chưa đạt)"}, ... đủ 6 mục theo đúng thứ tự],"summary":"nhận xét chung 1–2 câu cho Sales, giọng người kèm cặp"}`;

async function claude(system, messages, max) {
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': KEY, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: MODEL, max_tokens: max, system, messages }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j.error && j.error.message) || ('AI lỗi ' + r.status));
  return (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('').trim();
}
const clean = (s, n) => String(s || '').replace(/[\u0000-\u0008\u000b-\u001f]/g, ' ').slice(0, n);

module.exports = async (req, res) => {
  try {
    const me = L.session(req); if (!me) return L.send(res, 401, { error: 'Chưa đăng nhập' });
    if (req.method === 'GET') return L.send(res, 200, { ai: !!KEY });
    if (!KEY) return L.send(res, 503, { error: 'no_key' });
    const b = await L.body(req);
    const log = (Array.isArray(b.log) ? b.log : []).slice(-40).map((m) => ({ who: m.who === 'kh' ? 'kh' : 'sales', text: clean(m.text, 800) })).filter((m) => m.text.trim());
    if (!log.length) return L.send(res, 400, { error: 'Chưa có hội thoại' });
    if (b.action === 'grade') {
      const transcript = log.map((m) => (m.who === 'kh' ? 'KHÁCH: ' : 'SALES: ') + m.text).join('\n');
      const out = await claude(SYS_GRADE, [{ role: 'user', content: 'Hội thoại:\n' + transcript }], 1500);
      const m = out.match(/\{[\s\S]*\}/); if (!m) throw new Error('AI chấm chưa trả đúng định dạng, thử lại');
      const g = JSON.parse(m[0]);
      if (!Array.isArray(g.criteria) || g.criteria.length !== 6) throw new Error('AI chấm thiếu tiêu chí, thử lại');
      const ok = g.criteria.filter((c) => c.pass).length; const must = g.criteria[2].pass && g.criteria[3].pass;
      g.ok = ok; g.pass = ok >= 5 && must; g.at = new Date().toISOString(); g.by = 'ai';
      await L.put(`audit/${L.stamp()}.json`, { user: me.k, name: me.n, area: 'Luyện đóng vai', text: `Đóng vai “Quán cơm chê giá bàn chặt 1,5 m”: ${ok}/6 · ${g.pass ? 'Đạt' : 'Chưa đạt'}`, at: g.at });
      return L.send(res, 200, { grade: g });
    }
    // Ghép hội thoại thành các lượt user (Sales) / assistant (khách); bắt đầu bằng lượt Sales
    const msgs = [];
    log.forEach((m) => { const role = m.who === 'kh' ? 'assistant' : 'user'; const last = msgs[msgs.length - 1]; if (last && last.role === role) last.content += '\n' + m.text; else msgs.push({ role, content: m.text }); });
    if (msgs[0].role !== 'user') msgs.unshift({ role: 'user', content: '(Sales mở đầu cuộc trò chuyện)' });
    if (msgs[msgs.length - 1].role !== 'user') return L.send(res, 400, { error: 'Đến lượt Sales trả lời' });
    const reply = await claude(SYS_REPLY, msgs, 300);
    return L.send(res, 200, { reply: reply.replace(/^["“]|["”]$/g, '') });
  } catch (e) { return L.send(res, 500, { error: e.message }); }
};
