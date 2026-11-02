import crypto from 'node:crypto';

const SECRET = process.env.APP_SECRET || 'dev-secret-goldcool';

export const hashPin = (pin, salt) => crypto.createHash('sha256').update(salt + ':' + String(pin)).digest('hex');
export const newSalt = () => crypto.randomBytes(8).toString('hex');
export const newId = () => crypto.randomBytes(6).toString('hex');

export function sign(payload) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 30 * 864e5 })).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return body + '.' + sig;
}

export function verify(token) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const good = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString());
    return p.exp > Date.now() ? p : null;
  } catch { return null; }
}

export const todayVN = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
