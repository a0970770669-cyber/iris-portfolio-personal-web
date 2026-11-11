// Case study pages: the Figma frame is rebuilt from 2x exports placed at their exact Figma
// coordinates (in paint order), so every detail matches the design file.
// Usage: <div class="case" data-manifest="img/cs-mg2/manifest.json"></div>
//
// Optional "collapse" in the manifest: a list of expandable regions ("展開查看更多"), each
//   {"top": y where the region starts, "full": expanded height, "short": collapsed height,
//    "button": {"x","y","w","h"} toggle position (expanded coordinates),
//    "images": [{"z": image that contains the region, "visibleTo": y below which it is hidden when expanded}]}
// Everything below a collapsed region moves up; boxes spanning it shrink. Regions start collapsed.
(async function () {
  const host = document.querySelector('.case');
  if (!host) return;
  const url = host.dataset.manifest;
  const m = await (await fetch(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now(), {cache: 'no-store'})).json();
  const base = (typeof mediaURL === 'function' ? mediaURL(url.replace(/[^/]+$/, '')) : url.replace(/[^/]+$/, ''));   // media may live on R2; the manifest stays here
  const W = m.root.w, R = (m.collapse ? [].concat(m.collapse) : []).sort((a, b) => a.top - b.top);
  R.forEach(r => { r.collapsed = true; r.end = r.top + r.full; r.d = () => r.collapsed ? r.full - r.short : 0; });
  host.style.background = m.root.bg || '#fff';
  const pct = (v, of) => (v / of * 100) + '%';
  const cq = v => (v / W * 100) + 'cqw';

  // build elements once
  const items = m.items.slice().sort((a, b) => a.z - b.z).filter(it => !(it.kind === 'box' && !it.fill));
  const els = items.map(it => {
    let el;
    if (it.kind === 'box') { el = document.createElement('div'); el.className = 'case-box'; el.style.background = it.fill; if (it.radius) el.style.borderRadius = cq(it.radius); }
    else if (it.kind === 'text') { el = document.createElement('div'); el.className = 'case-text'; el.style.background = it.fill || 'transparent'; el.innerHTML = it.html; }
    else if (it.kind === 'html') { el = document.createElement('div'); el.className = 'case-html'; el.dataset.ia = it.ia; el.dataset.dw = it.dw; el.style.background = it.fill || 'transparent'; el.innerHTML = '<div class="ia-box"></div><i class="case-fade"></i>'; }
    else if (it.kind === 'video') {
      el = document.createElement('video'); el.className = 'case-video';
      Object.assign(el, {muted: true, loop: true, playsInline: true, autoplay: true, preload: 'none'});
      el.setAttribute('muted', ''); el.setAttribute('playsinline', '');
      el.dataset.src = base + it.file; if (it.poster) el.poster = base + it.poster;   // loaded when scrolled near
      el.style.objectFit = it.fit || 'cover'; if (it.radius) el.style.setProperty('--r', cq(it.radius));
    } else { el = document.createElement('img'); el.className = 'case-img'; el.src = base + it.file; el.alt = it.name || ''; el.loading = 'lazy'; el.decoding = 'async'; }
    el.style.zIndex = Math.floor(it.z);
    host.appendChild(el);
    return el;
  });
R.forEach(r => {
  r.btn = document.createElement('button'); r.btn.type = 'button'; r.btn.className = 'case-more';
  r.btn.addEventListener('click', () => {
    r.collapsed = !r.collapsed; place();
    if (r.collapsed) { const b = host.getBoundingClientRect(); scrollTo({top: scrollY + b.top + (r.top / W) * b.width - 200, behavior: 'smooth'}); }
  });
  host.appendChild(r.btn);
});

// position everything for the current state of each region
function place() {
  const above = y => R.reduce((s, r) => s + (r.end <= y ? r.d() : 0), 0);   // total shift for content starting at y
  const H = m.root.h - R.reduce((s, r) => s + r.d(), 0);
  host.style.setProperty('--ratio', `${W} / ${H}`);
  items.forEach((it, i) => {
    const el = els[i];
    let x = it.renderX ?? it.x, y = it.renderY ?? it.y, w = it.renderW ?? it.w, h = it.renderH ?? it.h;
    let clip = it.clip ? {...it.clip} : null, collapsedHere = false;
    const y0 = y, h0 = h;
    for (const r of R) {
      const img = (r.images || []).find(o => o.z === it.z);
      if (img) {                                            // image that contains the region: show only what fits
        const to = r.collapsed ? r.top + r.short : img.visibleTo;
        clip = {x, y: y0, w, h: Math.min(h0, to - y0), r: 0};
      } else if (y0 < r.top && y0 + h0 > r.end) h -= r.d(); // spans the region: shrink with it
      else if (it.kind === 'html' && y0 >= r.top && y0 < r.end) { h = r.collapsed ? r.short : r.full; collapsedHere = r.collapsed; }
    }
    y -= above(y0);
    el.style.left = pct(x, W); el.style.top = pct(y, H); el.style.width = pct(w, W); el.style.height = pct(h, H);
    if (clip) {
      const cy = clip.y - above(y0);
      const t = Math.max(0, cy - y), l = Math.max(0, clip.x - x), b = Math.max(0, y + h - (cy + clip.h)), rr = Math.max(0, x + w - (clip.x + clip.w));
      el.style.clipPath = `inset(${cq(t)} ${cq(rr)} ${cq(b)} ${cq(l)}${clip.r ? ` round ${cq(clip.r)}` : ''})`;
    } else el.style.clipPath = '';
    if (it.kind === 'html') el.classList.toggle('is-collapsed', collapsedHere);
  });
  R.forEach(r => {
    const b = r.button, y = b.y - above(b.y);
    Object.assign(r.btn.style, {left: pct(b.x, W), top: pct(y, H), width: pct(b.w, W), height: pct(b.h, H)});
    r.btn.textContent = r.collapsed ? '展開查看更多' : '收合';
    r.btn.setAttribute('aria-expanded', String(!r.collapsed));
  });
  fit();
}

  // text diagrams: drawn at their design width, then scaled to the slot so they stay sharp at any size
  const boxes = els.filter(e => e.classList.contains('case-html'));
  boxes.forEach(b => {
    const inner = b.firstElementChild;
    inner.style.width = b.dataset.dw + "px";                            // lay out at final width before measuring
    window.IA[b.dataset.ia](inner);
    inner.querySelectorAll('.ia-row').forEach(r => {                     // horizontal bar over each row of columns
      const cols = r.querySelectorAll(':scope > .ia-col'), last = cols[cols.length - 1];
      const bar = document.createElement('i'); bar.className = 'ia-bar';
      bar.style.top = (r.previousElementSibling && r.previousElementSibling.classList.contains('ia-row') ? 28 : 16) + 'px';
      r.prepend(bar);                                                   // ends exactly at the last column connector
      bar.style.width = (last.getBoundingClientRect().left - bar.getBoundingClientRect().left + 20) + 'px';
    });
  });
  function fit() {
    boxes.forEach(b => {
      const inner = b.firstElementChild, dw = +b.dataset.dw;
      inner.style.width = dw + 'px';
      const k = R.length ? b.clientWidth / dw : Math.min(b.clientWidth / dw, b.clientHeight / inner.scrollHeight);
      inner.style.transform = `scale(${k})`;
    });
  }
  place();
  addEventListener('resize', fit); document.fonts && document.fonts.ready.then(fit);

// videos: load when near the screen, play only while visible, retry once if a load fails
const vids = [...host.querySelectorAll('video')];
vids.forEach(v => v.addEventListener('error', () => {
  if (v.dataset.retried) return; v.dataset.retried = 1;
  setTimeout(() => { v.src = v.dataset.src + '?r=1'; v.load(); v.play().catch(() => {}); }, 800);
}));
const near = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && !e.target.src) { e.target.src = e.target.dataset.src; near.unobserve(e.target); } }), {rootMargin: '800px 0px'});
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()), {threshold: .1});
vids.forEach(v => { near.observe(v); io.observe(v); });
})();
