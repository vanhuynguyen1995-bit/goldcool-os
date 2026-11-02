// Chấm dự phòng khi chưa có AI: dựa trên từ khóa, độ dài, câu hỏi kết thúc, lỗi cấm
import { CRITERIA } from './kb.js';

const BAD = [
  [/h[ỏo]i\s*(s[ếe]p|qu[ảa]n\s*l[ýy])|xin\s*(s[ếe]p|gi[áa])|đi\s*xin/i, 'Nhắn khách "hỏi sếp / xin giá" – thiếu chuyên nghiệp'],
  [/(ki[ểe]m\s*tra|h[ỏo]i)\s*(l[ạa]i\s*)?(r[ồo]i\s*|v[àa]\s*)?b[áa]o\s*l[ạa]i|đ[ểe]\s*em\s*h[ỏo]i/i, 'Nhắn "em kiểm tra/hỏi lại rồi báo" – thiếu chuyên nghiệp'],
  [/50\s*%/i, 'Nói "tiết kiệm điện 50%" – không được dùng'],
  [/gi[ảa]m\s*th[êe]m|em\s*b[ớo]t\s*cho/i, 'Nhắc giảm thêm – không giảm ngay khi khách vừa mặc cả, tổng mức giảm tối đa 10%'],
  [/h[àa]ng\s*(l[ởo]m|d[ởo]m|k[ée]m)|b[êe]n\s*kia\s*(k[ée]m|d[ởo]m)/i, 'Chê đối thủ'],
];

export function fallbackScore(sc, text) {
  const t = String(text || '');
  const low = t.toLowerCase();
  const kw = sc?.kw || [];
  const hit = kw.filter(k => low.includes(String(k).toLowerCase())).length;
  const ratio = kw.length ? hit / kw.length : 0.5;
  const q = (t.match(/\?/g) || []).length;
  const lines = t.split('\n').filter(x => x.trim()).length;
  const longPara = t.split('\n').some(x => x.length > 260);
  const flags = BAD.filter(([re]) => re.test(t)).map(([, m]) => m);
  const s = {
    quytrinh: Math.round(20 * (0.4 + 0.6 * ratio)),
    thongtin: Math.round(25 * ratio),
    niemtin: Math.round(20 * (/(bảo hành|đồng|video|feedback|ảnh|24 tháng|30 ngày)/i.test(t) ? 0.85 : 0.35)),
    trinhbay: Math.round(15 * (longPara ? 0.4 : lines >= 3 ? 0.9 : 0.6)),
    dandat: Math.round(20 * ((/dạ|ạ/i.test(t) ? 0.4 : 0.1) + (q === 1 ? 0.6 : q > 2 ? 0.2 : q === 2 ? 0.4 : 0.1))),
  };
  if (flags.length) { s.thongtin = Math.min(s.thongtin, 5); s.dandat = Math.min(s.dandat, 5); }
  const missing = kw.filter(k => !low.includes(String(k).toLowerCase()));
  return {
    scores: s, flags,
    good: [hit ? `Có ${hit}/${kw.length} ý chính cần có` : 'Đã trả lời khách'].concat(q === 1 ? ['Kết thúc bằng 1 câu hỏi dẫn bước tiếp'] : []),
    fix: (missing.length ? [`Còn thiếu: ${missing.filter(m => m !== '?').join(', ') || 'câu hỏi kết thúc'}`] : []).concat(q > 2 ? ['Hỏi dồn nhiều câu – mỗi lần chỉ hỏi 1 câu'] : []).concat(longPara ? ['Đoạn văn quá dài – tách khối, gạch đầu dòng'] : []),
    better: sc?.sample || '',
    fallback: true,
  };
}

export function total(scores) {
  return CRITERIA.reduce((a, c) => a + Math.max(0, Math.min(c.max, Number(scores?.[c.k]) || 0)), 0);
}
