/* GoldCool – website: menu điện thoại, form tư vấn, tin tức */
(function () {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (v) => { try { return new Date(v).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }); } catch (e) { return ''; } };

  /* Menu điện thoại */
  const bg = $('.burger'), mn = $('.mnav');
  if (bg && mn) {
    bg.addEventListener('click', () => { const on = mn.classList.toggle('on'); bg.setAttribute('aria-expanded', on); const h = $('.hdr'); if (on && !h.classList.contains('solid')) { h.style.position = 'fixed'; h.style.background = 'var(--navy3)'; } else if (!h.classList.contains('solid')) { h.style.position = ''; h.style.background = ''; } });
    $$('a', mn).forEach((a) => a.addEventListener('click', () => { mn.classList.remove('on'); bg.setAttribute('aria-expanded', 'false'); const h = $('.hdr'); if (!h.classList.contains('solid')) { h.style.position = ''; h.style.background = ''; } }));
  }

  /* Form tư vấn */
  const form = $('#lead');
  if (form) {
    const status = $('#f-status');
    const setErr = (id, msg) => { const f = $('#' + id).closest('.f'); f.classList.toggle('err', !!msg); $('.msg', f).textContent = msg || ''; };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const data = { name: (d.get('name') || '').trim(), phone: (d.get('phone') || '').trim(), model: d.get('model') || '', city: (d.get('city') || '').trim(), products: d.getAll('products'), size: (d.get('size') || '').trim(), when: d.get('when') || '', note: (d.get('note') || '').trim(), website: d.get('website') || '', page: location.pathname, ref: document.referrer.slice(0, 200) };
      let bad = false;
      setErr('f-name', data.name.length < 2 ? 'Nhập họ tên' : ''); bad = bad || data.name.length < 2;
      const ph = data.phone.replace(/[^\d+]/g, ''); const okPh = /^(\+?84|0)\d{8,10}$/.test(ph);
      setErr('f-phone', okPh ? '' : 'Số điện thoại chưa đúng, ví dụ 0912 345 678'); bad = bad || !okPh;
      setErr('f-model', data.model ? '' : 'Chọn mô hình kinh doanh'); bad = bad || !data.model;
      setErr('f-city', data.city ? '' : 'Nhập tỉnh / thành phố'); bad = bad || !data.city;
      const pk = $('#f-products').closest('.f'); $('.msg', pk).textContent = data.products.length ? '' : 'Chọn ít nhất 1 sản phẩm'; bad = bad || !data.products.length;
      if (bad) { status.textContent = 'Vui lòng kiểm tra lại các mục đánh dấu đỏ.'; status.style.color = 'var(--bad)'; const first = $('.f.err input, .f.err select', form); if (first) first.focus(); return; }
      const btn = $('button[type=submit]', form); btn.disabled = true; btn.style.opacity = .7; status.style.color = ''; status.textContent = 'Đang gửi…';
      try {
        const r = await fetch('/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || 'Chưa gửi được');
        form.style.display = 'none'; $('#lead-done').classList.add('on');
      } catch (err) {
        status.style.color = 'var(--bad)'; status.textContent = (err.message || 'Chưa gửi được') + '. Vui lòng gọi 0865 868 868 hoặc thử lại.';
      } finally { btn.disabled = false; btn.style.opacity = ''; }
    });
    $('#lead-again').addEventListener('click', () => { form.reset(); form.style.display = ''; $('#lead-done').classList.remove('on'); $('#f-status').textContent = 'Tư vấn viên GoldCool liên hệ lại sớm nhất trong giờ làm việc.'; });
  }

  /* Ảnh bài viết: ảnh có sẵn (img/...) hoặc ảnh tải lên (uploads/...) */
  const imgUrl = (c) => !c ? '' : /^https?:|^img\//.test(c) ? c : '/api/file?p=' + encodeURIComponent(c);

  /* Danh sách bài viết */
  const box = $('[data-posts]');
  if (box) {
    const lim = box.dataset.posts;
    const card = (p) => `<a class="post" href="bai-viet.html?s=${encodeURIComponent(p.slug)}"><div class="im">${p.cover ? `<img src="${esc(imgUrl(p.cover))}" alt="" loading="lazy">` : ''}</div><div class="bd"><div class="k">${esc(p.category || 'Kiến thức')}</div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt || '')}</p><div class="meta">${fmtDate(p.publishedAt || p.at)}</div></div></a>`;
    fetch('/api/posts').then((r) => r.json()).then((j) => {
      let ps = j.posts || [];
      const draw = (cat) => { const list = (cat ? ps.filter((p) => p.category === cat) : ps).slice(0, lim === 'all' ? 999 : +lim); box.innerHTML = list.length ? list.map(card).join('') : '<div class="empty">Chưa có bài viết.</div>'; };
      const cats = $('#cats');
      if (cats) { const cs = [...new Set(ps.map((p) => p.category).filter(Boolean))]; cats.innerHTML = ['<button class="on" data-c="">Tất cả</button>'].concat(cs.map((c) => `<button data-c="${esc(c)}">${esc(c)}</button>`)).join(''); cats.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; $$('button', cats).forEach((x) => x.classList.toggle('on', x === b)); draw(b.dataset.c); }); }
      draw('');
    }).catch(() => { box.innerHTML = '<div class="empty">Chưa tải được bài viết.</div>'; });
  }


  /* Điền sẵn form theo trang khách đang xem (?sp=sản phẩm&n=ghi chú) */
  const qs = new URLSearchParams(location.search);
  const presel = (sp, n) => {
    const box2 = $('#f-products'); if (!box2) return;
    if (sp) $$('input', box2).forEach((i) => { if (i.value === sp) i.checked = true; });
    const nt = $('#f-note'); if (n && nt && !nt.value.includes(n)) nt.value = (nt.value ? nt.value + '\n' : '') + 'Quan tâm: ' + n;
  };
  if (/do-bep-inox/.test(location.pathname)) presel('Đồ bếp inox');
  if (/combo-bep/.test(location.pathname)) presel('Combo thiết bị bếp');
  if (qs.get('sp')) presel(qs.get('sp'), qs.get('n'));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-pre]'); if (!a) return;
    presel(a.dataset.pre, a.dataset.n);
  });

  /* Đồ bếp inox: lọc nhóm + sản phẩm đã đăng trong trang quản trị */
  const ig = $('[data-products="inox"]');
  if (ig) {
    const pc = $('#pcats');
    pc.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; $$('button', pc).forEach((x) => x.classList.toggle('on', x === b)); $$('.icard', ig).forEach((c) => { c.hidden = !!b.dataset.c && c.dataset.cat !== b.dataset.c; }); });
    fetch('/api/products?group=inox').then((r) => r.json()).then((j) => {
      (j.products || []).forEach((p) => {
        const l = $(`[data-list="${CSS.escape(p.category)}"]`, ig); if (!l) return;
        l.insertAdjacentHTML('beforeend', `<a href="san-pham.html?s=${encodeURIComponent(p.slug)}">${p.image ? `<img src="${esc(imgUrl(p.image))}" alt="" loading="lazy">` : '<img alt="">'}<span>${esc(p.name)}</span></a>`);
        const card = l.closest('.icard'); const ia = $('.ia', card);
        if (p.image && !ia.dataset.photo) { ia.dataset.photo = '1'; ia.innerHTML = `<img src="${esc(imgUrl(p.image))}" alt="${esc(p.category)}" loading="lazy">`; }
      });
    }).catch(() => {});
  }

  /* Combo thiết bị bếp */
  const cbg = $('[data-products="combo"]');
  if (cbg) {
    fetch('/api/products?group=combo').then((r) => r.json()).then((j) => {
      const ps = j.products || [];
      cbg.innerHTML = ps.length ? ps.map((p) => `<article class="cb"><div class="im">${p.image ? `<img src="${esc(imgUrl(p.image))}" alt="${esc(p.name)}" loading="lazy">` : ''}</div><div class="bd"><div class="k">${esc(p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.summary || '')}</p><ul class="chk">${(p.items || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul><div class="act"><a class="btn g" href="#tu-van" data-pre="Combo thiết bị bếp" data-n="${esc(p.name)}">Nhận báo giá combo</a><a class="btn l" href="san-pham.html?s=${encodeURIComponent(p.slug)}">Chi tiết</a></div></div></article>`).join('') : '<div class="empty">Chưa có combo. Gọi 0865 868 868 để được tư vấn setup bếp.</div>';
    }).catch(() => { cbg.innerHTML = '<div class="empty">Chưa tải được combo. Gọi 0865 868 868 để được tư vấn.</div>'; });
  }

  /* Trang chi tiết sản phẩm */
  const pn = $('#p-name');
  if (pn) {
    const slug = qs.get('s') || '';
    fetch('/api/products?slug=' + encodeURIComponent(slug)).then((r) => r.json().then((j) => ({ ok: r.ok, j }))).then(({ ok, j }) => {
      if (!ok || !j.product) { pn.textContent = 'Không tìm thấy sản phẩm'; $('#p-sum').innerHTML = 'Sản phẩm có thể đã được gỡ. <a href="do-bep-inox.html" style="color:var(--navy);font-weight:700">Xem đồ bếp inox</a>.'; return; }
      const p = j.product, combo = p.group === 'combo';
      document.title = p.name + ' – GoldCool';
      const md3 = document.querySelector('meta[name=description]'); if (md3) md3.setAttribute('content', p.summary || p.name);
      $('#p-back').href = combo ? 'combo-bep.html' : 'do-bep-inox.html'; $('#p-back').textContent = combo ? '← Combo thiết bị bếp' : '← Đồ bếp inox';
      $('#p-cat').textContent = (combo ? 'Combo · ' : 'Đồ bếp inox · ') + p.category;
      pn.textContent = p.name;
      $('#p-img').innerHTML = p.image ? `<img src="${esc(imgUrl(p.image))}" alt="${esc(p.name)}">` : '';
      $('#p-sum').textContent = p.summary || '';
      $('#p-ih').textContent = (p.items || []).length ? (combo ? 'Combo gồm' : 'Thông tin sản phẩm') : '';
      $('#p-items').className = 'chk big'; $('#p-items').innerHTML = (p.items || []).map((i) => `<li>${esc(i)}</li>`).join('');
      presel(combo ? 'Combo thiết bị bếp' : 'Đồ bếp inox', p.name);
    }).catch(() => { pn.textContent = 'Chưa tải được sản phẩm'; });
  }
  /* Trang bài viết: Markdown đơn giản (## tiêu đề, - danh sách, **đậm**, > trích dẫn, ![ảnh](url), [liên kết](url)) */
  const md = (src) => {
    const inl = (t) => esc(t).replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, a, u) => `<img src="${esc(imgUrl(u))}" alt="${a}">`).replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|[\w./#?=-]+)\)/g, '<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
    const out = []; let list = null;
    const flush = () => { if (list) { out.push(`<${list.t}>${list.items.map((i) => `<li>${inl(i)}</li>`).join('')}</${list.t}>`); list = null; } };
    String(src || '').split(/\r?\n/).forEach((ln) => {
      const l = ln.trimEnd();
      let m;
      if ((m = l.match(/^[-*] (.*)/))) { if (!list || list.t !== 'ul') { flush(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); return; }
      if ((m = l.match(/^\d+[.)] (.*)/))) { if (!list || list.t !== 'ol') { flush(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); return; }
      flush();
      if (!l.trim()) return;
      if ((m = l.match(/^### (.*)/))) out.push(`<h3>${inl(m[1])}</h3>`);
      else if ((m = l.match(/^## (.*)/))) out.push(`<h2>${inl(m[1])}</h2>`);
      else if ((m = l.match(/^> ?(.*)/))) out.push(`<blockquote>${inl(m[1])}</blockquote>`);
      else out.push(`<p>${inl(l)}</p>`);
    });
    flush(); return out.join('');
  };
  window.GC_MD = md;
  const ab = $('#a-body');
  if (ab) {
    const slug = new URLSearchParams(location.search).get('s') || '';
    fetch('/api/posts?slug=' + encodeURIComponent(slug)).then((r) => r.json().then((j) => ({ ok: r.ok, j }))).then(({ ok, j }) => {
      if (!ok || !j.post) { $('#a-title').textContent = 'Không tìm thấy bài viết'; ab.innerHTML = '<p>Bài viết có thể đã được gỡ. <a href="tin-tuc.html">Xem các bài khác</a>.</p>'; return; }
      const p = j.post;
      document.title = p.title + ' – GoldCool';
      const md2 = document.querySelector('meta[name=description]'); if (md2) md2.setAttribute('content', p.excerpt || p.title);
      $('#a-cat').textContent = p.category || 'Kiến thức';
      $('#a-title').textContent = p.title;
      $('#a-meta').textContent = fmtDate(p.publishedAt || p.at) + (p.author ? ' · ' + p.author : '');
      $('#a-cover').innerHTML = p.cover ? `<img src="${esc(imgUrl(p.cover))}" alt="">` : '';
      if (!p.cover) $('#a-cover').style.display = 'none';
      ab.innerHTML = md(p.body);
    }).catch(() => { $('#a-title').textContent = 'Chưa tải được bài viết'; });
  }
})();
