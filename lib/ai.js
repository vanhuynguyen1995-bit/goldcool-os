import { KB, CRITERIA, GROUPS, PERSONAS } from './kb.js';

// Ưu tiên: ANTHROPIC_API_KEY (trả phí riêng) → nếu không có, dùng Vercel AI Gateway qua OIDC (miễn phí theo hạn mức Vercel)
let OIDC = '';
export const setOidc = (t) => { if (t) OIDC = t; };
const gwToken = () => process.env.AI_GATEWAY_API_KEY || OIDC || process.env.VERCEL_OIDC_TOKEN || '';
const GEM = () => process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
export const hasAI = () => !!(GEM() || process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY);
const MODEL = () => process.env.ANTHROPIC_MODEL || (process.env.ANTHROPIC_API_KEY ? 'claude-sonnet-5-5' : 'anthropic/claude-sonnet-5');

async function gemini(system, messages, max_tokens) {
  const models = [process.env.GEMINI_MODEL, 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash'].filter(Boolean);
  const contents = messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  let last = '';
  for (const model of models) {
    for (const think of [true, false]) {
      const gc = { maxOutputTokens: Math.max(max_tokens, 256) * 2, temperature: 0.7 };
      if (think) gc.thinkingConfig = { thinkingBudget: 0 };
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': GEM() },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, generationConfig: gc }),
      });
      if (!r.ok) {
        last = r.status + ': ' + (await r.text()).slice(0, 300);
        if (r.status === 400 && think && /thinking/i.test(last)) continue; // model không hỗ trợ tắt suy nghĩ
        if (r.status === 404) break; // thử model khác
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

async function claude(system, messages, max_tokens = 1200) {
  if (GEM()) return gemini(system, messages, max_tokens);
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

export async function aiScoreChat(g, persona, messages) {
  const sys = `Bạn là trưởng phòng kinh doanh GoldCool, chấm cả cuộc hội thoại luyện tập giữa Sale và một khách giả lập, theo đúng quy trình công ty.\n\nKIẾN THỨC & QUY TRÌNH:\n${KB}\n\nTHANG ĐIỂM (tổng 100):\n${RUBRIC}\n\n${SCORE_FORMAT.replace('"better":"câu trả lời mẫu tốt hơn, trình bày thoáng như tin Zalo thật"', '"better":"viết lại tin nhắn yếu nhất của Sale cho tốt hơn"')}`;
  const convo = messages.map(m => (m.role === 'user' ? 'SALE: ' : 'KHÁCH: ') + m.content).join('\n\n');
  const user = `NHÓM: ${GROUPS[g]}\nKIỂU KHÁCH: ${PERSONAS[persona] || persona}\n\nHỘI THOẠI:\n${convo}`;
  return parseJSON(await claude(sys, [{ role: 'user', content: user }], 1500));
}

export async function aiCustomer(g, persona, messages) {
  const sys = `Bạn đóng vai MỘT KHÁCH HÀNG Việt Nam đang nhắn Zalo hỏi mua ${GROUPS[g]} của GoldCool để luyện tập cho nhân viên Sale.
Tính cách: ${PERSONAS[persona] || persona}
Tự nghĩ ra một mô hình kinh doanh cụ thể phù hợp (quán, nhà hàng, cửa hàng…) và giữ nhất quán suốt cuộc chat.
Quy tắc: chỉ trả lời như khách thật, ngắn 1–3 câu, văn nói tự nhiên, xưng anh/chị, gọi Sale là "em". Không giải thích, không chấm điểm, không tiết lộ mình là AI.
Thỉnh thoảng thử thách Sale đúng các tình huống thực tế: hỏi giá, hỏi giảm giá, so bên khác rẻ hơn, hỏi bảo hành, im lặng chỉ "ok", hỏi giao hàng.
Nếu Sale tư vấn tốt, đúng nhu cầu, tạo được niềm tin thì dần dần đồng ý mua. Nếu Sale tư vấn kém thì lạnh nhạt hoặc nói để suy nghĩ thêm.
Kiến thức sản phẩm (để bạn biết Sale nói đúng hay sai, KHÔNG tự nói ra):\n${KB}`;
  const msgs = messages.length ? messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })) : [];
  // khách mở đầu
  if (!msgs.length || msgs[0].role !== 'user') msgs.unshift({ role: 'user', content: '(Bắt đầu: bạn là khách, hãy nhắn tin đầu tiên hỏi sản phẩm)' });
  return (await claude(sys, msgs, 300)).trim();
}

export async function aiPing() { return (await claude('Trả lời đúng 1 từ.', [{ role: 'user', content: 'Nói: OK' }], 10)).trim(); }
