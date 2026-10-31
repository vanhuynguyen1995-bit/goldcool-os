const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
(async () => {
  const S = require(path.resolve(process.argv[2]));
  const out = process.argv[3];
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const [name, html] of Object.entries(S)) {
    const mobile = name.includes('dien_thoai');
    const p = await b.newPage({ viewport: { width: mobile ? 390 : 1440, height: mobile ? 844 : 900 }, deviceScaleFactor: 2 });
    fs.writeFileSync(path.join(out, name + '.html'), html);
    await p.setContent(html, { waitUntil: 'load' });
    await p.screenshot({ path: path.join(out, name + '.png'), fullPage: true });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    console.log(name, h);
    await p.close();
  }
  await b.close();
})();
