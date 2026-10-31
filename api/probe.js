// Tạm thời: kiểm tra kết nối kho dữ liệu Blob (sẽ xóa sau)
module.exports = async (req, res) => {
  const T = process.env.BLOB_READ_WRITE_TOKEN; const out = { hasToken: !!T, node: process.version, tries: [] };
  const apis = ['https://vercel.com/api/blob', 'https://blob.vercel-storage.com'];
  const vers = ['12', '11', '7'];
  let put = null;
  for (const api of apis) for (const v of vers) {
    if (put) break;
    try {
      const r = await fetch(`${api}/?pathname=${encodeURIComponent('probe/test.json')}`, { method: 'PUT', headers: { authorization: 'Bearer ' + T, 'x-api-version': v, 'x-vercel-blob-access': 'private', 'x-add-random-suffix': '0', 'x-allow-overwrite': '1', 'x-content-type': 'application/json' }, body: JSON.stringify({ ok: 1, at: Date.now() }) });
      const t = await r.text(); out.tries.push({ api, v, s: r.status, t: t.slice(0, 300) });
      if (r.ok) put = { api, v, j: JSON.parse(t) };
    } catch (e) { out.tries.push({ api, v, e: String(e) }); }
  }
  out.put = put;
  if (put) {
    try { const r = await fetch(`${put.api}?prefix=probe/&limit=10`, { headers: { authorization: 'Bearer ' + T, 'x-api-version': put.v } }); out.list = { s: r.status, t: (await r.text()).slice(0, 400) }; } catch (e) { out.list = String(e); }
    for (const u of [put.j.url, put.j.downloadUrl].filter(Boolean)) {
      for (const auth of [true, false]) {
        try { const r = await fetch(u, { headers: auth ? { authorization: 'Bearer ' + T } : {} }); out['get_' + (auth ? 'auth' : 'noauth') + '_' + (u === put.j.url ? 'url' : 'dl')] = { s: r.status, t: (await r.text()).slice(0, 100) }; } catch (e) { out.getErr = String(e); }
      }
    }
  }
  res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(out, null, 1));
};
