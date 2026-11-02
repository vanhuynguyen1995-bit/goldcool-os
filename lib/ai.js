import { KB, CRITERIA, GROUPS, PERSONAS } from './kb.js';

// Ưu tiên: ANTHROPIC_API_KEY (trả phí riêng) → nếu không có, dùng Vercel AI Gateway qua OIDC (miễn phí theo hạn mức Vercel)
let OIDC = '';
export const setOidc = (t) => { if (t) OIDC = t; };
const gwToken = () => process.env.AI_GATEWAY_API_KEY || OIDC || process.env.VERCEL_OIDC_TOKEN || '';
const GEM = () => String(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').replace(/[^\x21-\x7e]/g, '');
export const hasAI = () => !!(GEM() || process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY);
const MODEL = () => process.env.ANTHROPIC_MODEL || (process.env.ANTHROPIC_API_KEY ? 'claude-sonnet-5-5' : 'anthropic/claude-sonnet-5');

async function gemini(system, messages, max_tokens, kind) {
  // khách giả lập dùng bản lite (nhiều lượt miễn phí hơn), chấm điểm dùng bản flash (chính xác hơn)
  const models = (kind === 'chat'
    ? [process.env.GEMINI_CHAT_MODEL, 'gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-flash-latest']
    : [process.env.GEMINI_MODEL, 'gemini-3.5-flash', 'gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-flash-latest']).filter(Boolean);
  const contents = messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  let last = '';
  for (const model of models) {
    for (const think of [true, false]) {
      const gc = { maxOutputTokens: Math.max(max_tokens, 256) * 2, temperature: 0.7 };
      if (think) gc.thinkingConfig = { thinkingBudget: 0 };
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': GEM() },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, generationConfig: gc }),
        signal: AbortSignal.timeout(kind === 'chat' ? 15000 : 30000),
      }).catch(e => ({ ok: false, status: 504, text: async () => 'timeout ' + e.message }));
      if (!r.ok) {
        last = model + ' ' + r.status + ': ' + (await r.text()).slice(0, 300);
        if (r.status === 400 && think) continue; // thử lại không kèm cấu hình suy nghĩ
        if ([400, 404, 429, 500, 503, 504].includes(r.status)) break; // thử model khác

        throw new Error('AI lỗi ' + last);
      }
      const j = await r.json();
      const t = (j.candidates?.[0]?.content?.parts || []).filter(p => !p.thought).map(p => p.text || '').join('');
      if (!t) throw new Error('AI không trả lời (' + (j.candidates?.[0]?.finishReason || j.promptFeedback?.blockReason || '?') + ')');
      return t;
    }
  }
  throw new Error('Không gọi được Gemini: ' + last);
}

async function claude(system, messages, max_tokens = 1200, kind = 'score') {
  if (GEM()) return gemini(system, messages, max_tokens, kind);
  const direct = !!process.env.ANTHROPIC_API_KEY;
  const url = direct ? 'https://api.anthropic.com/v1/messages' : 'https://ai-gateway.vercel.sh/v1/messages';
  const headers = { 'content-type': 'application/json', 'anthropic-version': '2023-06-01' };
  if (direct) headers['x-api-key'] = process.env.ANTHROPIC_API_KEY;
  else { const t = gwToken(); if (!t) throw new Error('Chưa có quyền dùng AI Gateway'); headers.authorization = 'Bearer ' + t; }
  const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ model: MODEL(), max_tokens, system, messages }) });
  if (!r.ok) throw new Error('AI lỗi ' + r.status + ': ' + (await r.text()).slice(0, 300));
  const j = await r.json();
  return (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
}

function parseJSON(t) {
  const m = t.match(/\{[\s\S]*\}/);
  return JSON.parse(m ? m[0] : t);
}

const RUBRIC = CRITERIA.map(c => `- ${c.k} (${c.name}): 0–${c.max}`).join('\n');
const SCORE_FORMAT = `Trả về DUY NHẤT một JSON:
{"scores":{"quytrinh":n,"thongtin":n,"niemtin":n,"trinhbay":n,"dandat":n},
 "flags":["lỗi nghiêm trọng nếu có, ví dụ: hứa xin sếp giảm giá, sai giá, chê đối thủ, hứa ngày giao, hỏi dồn nhiều câu"],
 "good":["2–3 điểm làm tốt, ngắn"],
 "fix":["2–3 điểm cần sửa, cụ thể"],
 "better":"câu trả lời mẫu tốt hơn, trình bày thoáng như tin Zalo thật"}
Mỗi lỗi nghiêm trọng làm điểm tiêu chí liên quan về gần 0. Chấm công bằng, không nương tay, nhận xét bằng tiếng Việt, xưng "bạn".`;

export async function aiScoreDrill(sc, answer) {
  const sys = `Bạn là trưởng phòng kinh doanh GoldCool, chấm bài luyện tập tư vấn qua tin nhắn của nhân viên Sale theo đúng quy trình công ty.\n\nKIẾN THỨC & QUY TRÌNH:\n${KB}\n\nTHANG ĐIỂM (tổng 100):\n${RUBRIC}\n\n${SCORE_FORMAT}`;
  const user = `NHÓM: ${GROUPS[sc.g]}\nTÌNH HUỐNG: ${sc.title} (bước: ${sc.stage})\nBỐI CẢNH: ${sc.ctx}\nKHÁCH NHẮN: ${sc.msg}\nYÊU CẦU CỦA BƯỚC NÀY:\n- ${(sc.tips || []).join('\n- ')}\n\nCÂU TRẢ LỜI CỦA SALE:\n"""${answer}"""`;
  return parseJSON(await claude(sys, [{ role: 'user', content: user }]));
}

function scText(sc) {
  return sc ? `TÌNH HUỐNG LUYỆN: ${sc.title} (bước: ${sc.stage})\nBỐI CẢNH: ${sc.ctx}\nYÊU CẦU ĐÚNG QUY TRÌNH:\n- ${(sc.tips || []).join('\n- ')}` : '';
}

export async function aiScoreChat(g, persona, messages, sc) {
  const sys = `Bạn là trưởng phòng kinh doanh GoldCool, chấm cả cuộc hội thoại luyện tập giữa Sale và một khách giả lập, theo đúng quy trình công ty.\n\nKIẾN THỨC & QUY TRÌNH:\n${KB}\n\nTHANG ĐIỂM (tổng 100):\n${RUBRIC}\n\n${SCORE_FORMAT.replace('"better":"câu trả lời mẫu tốt hơn, trình bày thoáng như tin Zalo thật"', '"better":"viết lại tin nhắn yếu nhất của Sale cho đúng quy trình, trình bày thoáng như tin Zalo thật"')}\nNếu Sale chỉ nhắn 1–2 câu qua loa hoặc bỏ dở thì điểm thấp.
Đánh giá cả sự MỀM MẠI: Sale có chia sẻ trước rồi mới hỏi không, câu hỏi có kèm lý do không, có hỏi đan xen tự nhiên để nắm được mở mới hay mua thêm, bao giờ cần, khu vực/địa chỉ (nếu chưa biết) không; có hỏi dồn, hỏi như phỏng vấn, copy kịch bản cứng nhắc, hay gửi dồn bước không phù hợp lời khách không. Tư vấn linh hoạt, khác thứ tự khung nhưng đúng mục đích thì KHÔNG trừ điểm quy trình.
Tin dạng [Ảnh sản phẩm: …], [Video: …], [Feedback khách: …], [Ảnh mẫu rẻ: …] là ảnh/video Sale đã gửi thật. Tiêu chí "Tăng niềm tin" phải xét: có gửi ảnh thực tế và video/feedback ĐÚNG MẪU đang tư vấn không, gửi đúng lúc không (sau khi khách chọn hoặc khách hỏi), có gửi dồn quá nhiều không. Nói "em gửi ảnh" mà không có ảnh thật = chưa gửi.`;
  const convo = messages.map(m => (m.role === 'user' ? 'SALE: ' : 'KHÁCH: ') + m.content).join('\n\n');
  const user = `NHÓM: ${GROUPS[g]}\nKIỂU KHÁCH: ${PERSONAS[persona] || persona}\n${scText(sc)}\n\nHỘI THOẠI:\n${convo}`;
  return parseJSON(await claude(sys, [{ role: 'user', content: user }], 1500, 'score'));
}

export async function aiCustomer(g, persona, messages, sc) {
  const sys = `Bạn đóng vai MỘT KHÁCH HÀNG Việt Nam đang nhắn Zalo hỏi mua ${GROUPS[g]} của GoldCool, để nhân viên Sale luyện tư vấn.
Tính cách: ${PERSONAS[persona] || persona}
${sc ? `Bối cảnh của bạn: ${sc.ctx}\nTình huống bạn cần tạo ra để thử Sale: ${sc.title}. Tin nhắn mở đầu của bạn là: "${sc.msg}".` : 'Tự nghĩ ra một mô hình kinh doanh cụ thể phù hợp (quán, nhà hàng, cửa hàng…).'}
${sc?.variant ? `Bạn là ${sc.variant.name}, ở ${sc.variant.area}. Thử thách phụ cho cuộc này: ${sc.variant.twist}.` : ''}
Giữ nhất quán thông tin quán của bạn suốt cuộc chat.
Quy tắc: chỉ trả lời như khách thật, ngắn 1–3 câu, văn nói tự nhiên, xưng anh/chị, gọi Sale là "em". Không giải thích, không chấm điểm, không tiết lộ mình là AI, không dùng ký hiệu markdown.
Như khách thật: không tự khai hết thông tin (mở mới hay mua thêm, khi nào cần, ở đâu, chỗ đặt rộng bao nhiêu) – chỉ nói khi Sale hỏi khéo hoặc chia sẻ đúng ý; nếu Sale hỏi dồn nhiều câu hoặc hỏi cộc lốc như phỏng vấn thì trả lời qua loa hoặc tỏ ra hơi khó chịu.
Thử thách Sale đúng tình huống trên và thêm 1–2 thử thách thực tế khác (hỏi giảm giá, so bên khác rẻ hơn, hỏi bảo hành, chỉ nhắn "ok", hỏi giao hàng…).
Nếu Sale tư vấn tốt, đúng nhu cầu, tạo được niềm tin thì dần đồng ý mua. Nếu Sale tư vấn kém, sai giá, hỏi dồn, hứa bừa thì lạnh nhạt hoặc nói để suy nghĩ thêm.
Khi Sale gửi ảnh/video, bạn thấy nó dưới dạng mô tả trong ngoặc vuông, ví dụ [Ảnh sản phẩm: Tủ đông 4 cánh quạt gió GC4C-1088L]. Phản hồi tự nhiên như vừa xem ảnh/video thật (khen, hỏi thêm chi tiết). Nếu Sale nói gửi ảnh mà không có ngoặc vuông nào thì nghĩa là chưa gửi – nhắc lại "ảnh đâu em". Nếu ảnh không đúng mẫu đang nói thì thắc mắc.
Sau khoảng 5–8 lượt, khi bạn đã quyết (đồng ý mua, hẹn suy nghĩ, hoặc từ chối) thì nhắn câu cuối và thêm đúng ký hiệu [HẾT] ở cuối tin.
Kiến thức sản phẩm (để bạn biết Sale nói đúng hay sai, KHÔNG tự nói ra):\n${KB}`;
  const msgs = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }));
  if (!msgs.length || msgs[0].role !== 'user') msgs.unshift({ role: 'user', content: '(Sale vào cuộc chat)' });
  return (await claude(sys, msgs, 300, 'chat')).replace(/\*\*/g, '').trim();
}

export async function aiPing(kind = 'score') { return (await claude('Trả lời đúng 1 từ.', [{ role: 'user', content: 'Nói: OK' }], 10, kind)).trim(); }
