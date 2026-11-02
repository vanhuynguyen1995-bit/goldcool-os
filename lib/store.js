// Lưu dữ liệu dạng tài liệu JSON có phiên bản trên Vercel Blob (mỗi lần ghi là 1 file mới → không bị cache cũ)
// Khi chạy local không có BLOB_READ_WRITE_TOKEN thì lưu vào thư mục .data
import fs from 'node:fs';
import path from 'node:path';

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
let blob = null;
async function B() { if (!blob) blob = await import('@vercel/blob'); return blob; }
const LOCAL = path.join(process.cwd(), '.data');
const PREFIX = 'gctrain/';

export async function readDoc(key, fallback) {
  if (!useBlob) {
    try { return JSON.parse(fs.readFileSync(path.join(LOCAL, key + '.json'), 'utf8')); } catch { return fallback; }
  }
  const { list } = await B();
  const { blobs } = await list({ prefix: PREFIX + key + '@', limit: 100 });
  if (!blobs.length) return fallback;
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  const r = await fetch(blobs[0].url, { cache: 'no-store' });
  if (!r.ok) return fallback;
  return r.json();
}

export async function writeDoc(key, data) {
  if (!useBlob) {
    fs.mkdirSync(LOCAL, { recursive: true });
    fs.writeFileSync(path.join(LOCAL, key + '.json'), JSON.stringify(data));
    return;
  }
  const { put, list, del } = await B();
  await put(PREFIX + key + '@' + Date.now() + '.json', JSON.stringify(data), {
    access: 'public', contentType: 'application/json', addRandomSuffix: true,
  });
  // dọn bản cũ, giữ 3 bản gần nhất
  try {
    const { blobs } = await list({ prefix: PREFIX + key + '@', limit: 100 });
    blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    const old = blobs.slice(3).map(b => b.url);
    if (old.length) await del(old);
  } catch {}
}
