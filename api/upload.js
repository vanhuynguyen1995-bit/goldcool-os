// Cấp quyền tải ảnh/video thẳng từ trình duyệt lên Vercel Blob (không giới hạn 4,5MB của function)
import { handleUpload } from '@vercel/blob/client';
import { verify } from '../lib/auth.js';

export default async function handler(req, res) {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const json = await handleUpload({
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let p = {}; try { p = JSON.parse(clientPayload || '{}'); } catch {}
        const me = verify(p.token || '');
        if (!me) throw new Error('Phiên đăng nhập hết hạn');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'video/mp4', 'video/quicktime', 'video/webm'],
          maximumSizeInBytes: 200 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ uid: me.id }),
        };
      },
    });
    res.status(200).json(json);
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
}
