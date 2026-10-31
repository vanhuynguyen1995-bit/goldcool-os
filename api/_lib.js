// Thư viện dùng chung cho API: kho dữ liệu Blob riêng tư, phiên đăng nhập, mật khẩu
const crypto = require('crypto');
const USERS = require('./_users.js');
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN || '';
const API = 'https://vercel.com/api/blob';
const H = (x = {}) => ({ authorization: 'Bearer ' + TOKEN, 'x-api-version': '12', ...x });
const DEFAULT_PW = process.env.GC_DEFAULT_PASSWORD || 'goldcool2026';
const ADMINS = ['huy', 'kien']; // Giám đốc, Quản lý dữ liệu (Kiên)

async function put(pathname, obj) {
  const r = await fetch(`${API}/?pathname=${encodeURIComponent(pathname)}`, { method: 'PUT', headers: H({ 'x-vercel-blob-access': 'private', 'x-add-random-suffix': '0', 'x-allow-overwrite': '1', 'x-content-type': 'application/json', 'x-cache-control-max-age': '60' }), body: JSON.stringify(obj) });
  if (!r.ok) throw new Error('Không ghi được dữ liệu (' + r.status + ')');
  return r.json();
}
async function list(prefix) {
  let out = [], cursor = '';
  do {
    const r = await fetch(`${API}?prefix=${encodeURIComponent(prefix)}&limit=1000${cursor ? '&cursor=' + encodeURIComponent(cursor) : ''}`, { headers: H() });
    if (!r.ok) throw new Error('Không đọc được danh sách (' + r.status + ')');
    const j = await r.json(); out = out.concat(j.blobs || []); cursor = j.hasMore ? j.cursor : '';
  } while (cursor);
  return out;
}
async function read(url) { const r = await fetch(url, { headers: { authorization: 'Bearer ' + TOKEN }, cache: 'no-store' }); if (!r.ok) return null; try { return await r.json(); } catch (e) { return null; } }
async function del(urls) { if (!urls.length) return; try { await fetch(`${API}/delete`, { method: 'POST', headers: H({ 'content-type': 'application/json' }), body: JSON.stringify({ urls }) }); } catch (e) { /* bỏ qua */ } }
// Bản ghi mới nhất theo tên file (tên file bắt đầu bằng thời điểm ghi)
const latest = (blobs) => blobs.slice().sort((a, b) => a.pathname.localeCompare(b.pathname)).pop();
const stamp = () => String(Date.now()).padStart(15, '0') + '-' + crypto.randomBytes(3).toString('hex');

// Mật khẩu
const hash = (pw, salt) => crypto.scryptSync(String(pw), salt, 32).toString('hex');
async function getPw(k) { const b = latest(await list(`users/${k}/pw-`)); return b ? await read(b.url) : null; }
async function setPw(k, pw, by, mustChange) { const salt = crypto.randomBytes(16).toString('hex'); await put(`users/${k}/pw-${stamp()}.json`, { salt, hash: hash(pw, salt), by, mustChange: !!mustChange, at: new Date().toISOString() }); const old = (await list(`users/${k}/pw-`)).sort((a, b) => a.pathname.localeCompare(b.pathname)).slice(0, -1); await del(old.map((b) => b.url)); }
async function checkPw(k, pw) {
  const rec = await getPw(k);
  if (!rec || rec.reset) return { ok: pw === DEFAULT_PW, mustChange: true };
  const a = Buffer.from(rec.hash, 'hex'), b = Buffer.from(hash(pw, rec.salt), 'hex');
  return { ok: a.length === b.length && crypto.timingSafeEqual(a, b), mustChange: !!rec.mustChange };
}

// Phiên đăng nhập: cookie ký bằng khóa suy ra từ token kho dữ liệu
const KEY = crypto.createHash('sha256').update('goldcool-session:' + TOKEN).digest();
const sign = (s) => crypto.createHmac('sha256', KEY).update(s).digest('base64url');
function makeCookie(k) { const body = Buffer.from(JSON.stringify({ k, exp: Date.now() + 30 * 864e5 })).toString('base64url'); return `gc_s=${body}.${sign(body)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 86400}`; }
function session(req) {
  const m = (req.headers.cookie || '').match(/(?:^|;\s*)gc_s=([^;]+)/); if (!m) return null;
  const [body, sig] = m[1].split('.'); if (!body || !sig) return null;
  const a = Buffer.from(sig), b = Buffer.from(sign(body)); if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try { const s = JSON.parse(Buffer.from(body, 'base64url').toString()); if (s.exp < Date.now()) return null; return USERS.find((u) => u.k === s.k) || null; } catch (e) { return null; }
}
const clearCookie = 'gc_s=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';

function send(res, code, obj, cookie) { res.statusCode = code; res.setHeader('content-type', 'application/json; charset=utf-8'); res.setHeader('cache-control', 'no-store'); if (cookie) res.setHeader('set-cookie', cookie); res.end(JSON.stringify(obj)); }
async function body(req) { if (req.body && typeof req.body === 'object') return req.body; if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } } return await new Promise((ok) => { let d = ''; req.on('data', (c) => { d += c; }); req.on('end', () => { try { ok(JSON.parse(d || '{}')); } catch (e) { ok({}); } }); }); }
const pub = (u) => ({ k: u.k, n: u.n, r: u.r, d: u.d, home: u.home, a: u.a, admin: ADMINS.includes(u.k) });

module.exports = { USERS, ADMINS, put, list, read, del, latest, stamp, getPw, setPw, checkPw, makeCookie, session, clearCookie, send, body, pub };
