// Iris Liu portfolio — shared pieces (nav, contact links, footer) and small effects.
const SITE = {
  mail: 'a0970770669@gmail.com',
  instagram: 'https://www.instagram.com/imirisiam/',
  linkedin: 'https://tw.linkedin.com/in/iris-liu-b192a8406',
  // Where the large photos/videos load from. '' = this folder (local preview);
  // the published copy points this at the Cloudflare R2 bucket.
  media: {cases: 'https://pub-172ccf5ec35240b2a9c77a026b6d25f6.r2.dev/%E7%AC%AC1%E6%89%B9/portfolio/', photos: 'https://pub-172ccf5ec35240b2a9c77a026b6d25f6.r2.dev/%E7%AC%AC2%E6%89%B9/portfolio/'},
};
// Full URL of a large photo/video: same folder locally, or the R2 bucket when SITE.media is set
// (a string, or {cases, photos} when the case-study files and the photos sit in different R2 folders).
const mediaURL = p => !SITE.media ? p : typeof SITE.media === 'string' ? SITE.media + p : (p.startsWith('img/cs-') ? SITE.media.cases : SITE.media.photos) + p;

const NAV = [
  ['project.html', 'Project'],
  ['about.html', 'About me'],
  ['home.html', 'Iris Liu', 'logo'],
  ['contact.html', 'Contact'],
  ['playground.html', 'Playground'],
];

const tpl = {
  nav(active) {
    return `<nav class="nav">${NAV.map(([href, label, cls]) =>
      `<a href="${href}" class="${cls || ''}${active === href && !cls ? ' on' : ''}">${label}</a>`).join('')}</nav>`;
  },
  links() {
    return `<div class="links">
      <a class="link-row" href="mailto:${SITE.mail}"><span><img class="mail" src="img/icons/mail-sm.svg" alt="">Mail</span>${SITE.mail}</a>
      <a class="link-row" href="${SITE.instagram}" target="_blank" rel="noopener"><span><img src="img/icons/ig-sm.svg" alt="">Instagram</span>imirisiam</a>
      <a class="link-row" href="${SITE.linkedin}" target="_blank" rel="noopener"><span><img src="img/icons/in-sm.svg" alt="">Linkedin</span>Iris Liu</a>
    </div>`;
  },
  cta() {
    return `<section class="cta reveal"><h2 class="display center" style="color:var(--dark)">Let’s Create<br>Something Together !</h2>${tpl.links()}</section>`;
  },
  connect() {
    return `<section class="connect"><hr><div class="closing"><p>Curiosity &amp; Creativity make life full of treasures.</p>
      <a class="top" href="#top">TOP<img src="img/icons/arrow-up.svg" alt=""></a></div></section>`;
  },
  footer() {
    return `<div class="wordmark"><span>Designed by</span><i>Iris .</i></div>
    <footer class="foot"><p>Iris liu © 2026. All right reserved. <a class="replay" href="index.html">Board again ✈</a></p><div class="icons">
      <a href="mailto:${SITE.mail}" aria-label="Mail"><img src="img/icons/mail-lg.svg" alt=""></a>
      <a href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><img src="img/icons/in-lg.svg" alt=""></a>
      <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><img src="img/icons/ig-lg.svg" alt=""></a>
    </div></footer>`;
  },
// Case study footer, from Figma (AT "Frame 283" 69:97 / MG "Frame 315"). data-active = "prev|next" pages
caseFoot(arg) {
  const [prev, next] = (arg || 'project.html|project.html').split('|');
  return `<section class="cfoot">
    <div class="cfoot-box">
      <nav class="cfoot-nav">
        <a href="${prev}" class="prev"><img src="img/icons/footer-arrow-back.svg" alt="">Previous Project</a>
        <a href="project.html" class="all"><img src="img/icons/footer-flower.svg" alt="">All Works</a>
        <a href="${next}" class="next">Next Project<img src="img/icons/footer-arrow-forward.svg" alt=""></a>
      </nav>
      <p class="cfoot-cta">Let’t Create Something Together !</p>
    </div>
    <div class="cfoot-row"><p>Iris liu © 2026. All right reserved. <a class="replay" href="index.html">Board again ✈</a></p><div class="icons">
      <a href="mailto:${SITE.mail}" aria-label="Mail"><img src="img/icons/footer-mail.svg" alt=""></a>
      <a href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><img src="img/icons/footer-linkedin.svg" alt=""></a>
      <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><img src="img/icons/footer-instagram.svg" alt=""></a>
    </div></div>
  </section>`;
},
  plant() {
    return `<iframe class="plant-frame reveal" src="plant.html" aria-label="Water my plant, a small game" scrolling="no" allowtransparency="true"></iframe>`;
  },
};

// <div data-part="nav" data-active="about.html"></div> etc.
document.querySelectorAll('[data-part]').forEach(el => {
  const html = tpl[el.dataset.part](el.dataset.active);
  el.insertAdjacentHTML('beforebegin', html);
  el.remove();
});
document.body.id ||= 'top';

// Typewriter: type the first phrase, delete it like backspace, then type the next, forever.
document.querySelectorAll('[data-typewriter]').forEach(el => {
  const phrases = JSON.parse(el.dataset.typewriter);
  el.classList.add('tw');
  el.innerHTML = '<span class="txt"></span><span class="caret"></span>';
  const txt = el.querySelector('.txt');
  let i = 0;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  (async function loop() {
    for (;;) {
      const p = phrases[i % phrases.length];
      el.classList.add('typing');
      for (let n = 1; n <= p.length; n++) { txt.textContent = p.slice(0, n); await wait(70 + Math.random() * 60); }
      el.classList.remove('typing');
      await wait(1500);
      el.classList.add('typing');
      for (let n = p.length - 1; n >= 0; n--) { txt.textContent = p.slice(0, n); await wait(38); }
      el.classList.remove('typing');
      await wait(450);
      i++;
    }
  })();
});

// Fade sections in as they scroll into view.
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
