/* The Lo Down with Isha Lo — shared behavior.
   Everything client-specific lives in CONFIG so links are easy to swap later. */
const CONFIG = {
  email: 'teamlo@conactus.lodowndevelopment.com',
  joinForm: 'https://api.leadconnectorhq.com/widget/form/Q6xUotUfxnujanOTKWmt',
  stripe: {
    tech: 'https://buy.stripe.com/aFa9AUf9gbH39OjfLd9Zm0n',
    strategic: 'https://buy.stripe.com/bJeaEY4uCfXj0dJ6aD9Zm0o',
    community: 'https://buy.stripe.com/6oU5kEd1826t1hN7eH9Zm0p',
  },
  paper: 'https://static1.squarespace.com/static/6990ad60f2b7e2415b9cedab/t/6a7100600fe08a66b699a664/1785790560275/The-End-of-the-End-A-White-Paper-by-Isha-Lo.docx.pdf',
  // "By May 2027" -> counted to the last moment of May 2027
  deadline: new Date('2027-05-31T23:59:59'),
  earlyBird: new Date('2027-01-01T00:00:00'),
};
const mail = (subject, body = '') => `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}${body ? '&body=' + encodeURIComponent(body) : ''}`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
document.documentElement.classList.add('js');

/* ---------- shared chrome ---------- */
const page = document.body.dataset.page || '';
const links = [
  ['programs', 'programs.html', 'Labs & Certification'],
  ['team', 'team.html', 'Team'],
  ['partners', 'partners.html', 'Partners'],
  ['paper', 'paper.html', 'White Paper'],
];
const mark = `<img src="images/logo-mark.png" alt="" width="44" height="32">`;
const logo = `<a class="logo" href="index.html" aria-label="The Lo Down with Isha Lo — home">${mark}<span><b>The Lo Down</b><small>with Isha Lo</small></span></a>`;

$('#site-header').outerHTML = `
<header class="hdr" id="hdr"><div class="hdr-in">
  ${logo}
  <nav class="nav" aria-label="Main">${links.map(([k, h, t]) => `<a class="nl${page === k ? ' on' : ''}" href="${h}">${t}</a>`).join('')}</nav>
  <div style="display:flex;align-items:center;gap:6px">
    <button class="btn btn-clay desk" data-join>Join 1M Women <span class="arr">→</span></button>
    <button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>
  </div>
</div></header>
<div class="mnav" id="mnav">
  <a class="ml" href="index.html">Home</a>
  ${links.map(([, h, t]) => `<a class="ml" href="${h}">${t}</a>`).join('')}
  <button class="btn btn-clay" data-join>Join 1M Women <span class="arr">→</span></button>
</div>`;

$('#site-footer').outerHTML = `
<footer class="ftr"><div class="wrap">
  <div class="ftr-top">
    <div>${logo}<p class="mm">Guiding Human Transformation in a Changing World.</p></div>
    <div><h5>Explore</h5><ul>
      <li><a href="index.html">Home</a></li>
      ${links.map(([, h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}
      <li><a href="#" data-join>Join 1M Women</a></li>
    </ul></div>
    <div><h5>Say hello</h5><ul>
      <li><a href="${mail('Hello from the website')}">${CONFIG.email}</a></li>
      <li>Dallas | Fort Worth market</li>
      <li><a href="partners.html">Partnership inquiries</a></li>
    </ul></div>
  </div>
  <div class="ftr-bot"><span>© <span id="yr"></span> The Lo Down with Isha Lo™. All rights reserved.</span><span>Distributed Intelligence™ · Distributed-Intelligence Leadership™ · F.L.O. Method™</span></div>
</div></footer>

<div class="modal" id="joinModal" role="dialog" aria-modal="true" aria-labelledby="jm-t">
  <div class="modal-bg" data-close></div>
  <div class="modal-card">
    <button class="modal-x" data-close aria-label="Close">×</button>
    <div class="modal-head"><h3 id="jm-t">Join 1,000,000 Women</h3><p>Participant, partner, or ally — add your name and we’ll be in touch.</p></div>
    <iframe title="Join 1M Women form" data-src="${CONFIG.joinForm}" loading="lazy"></iframe>
  </div>
</div>

<button class="chat-fab" id="chatFab" aria-label="Open the Lo Down guide"><span class="dot">✦</span><span class="lbl">Ask the guide</span></button>
<aside class="chat" id="chat" aria-label="Lo Down guide">
  <div class="chat-h"><span class="mono" style="width:40px;height:40px;font-size:1rem">Lo</span><div><b>The Lo Down guide</b><small>Quick answers, no waiting</small></div><button class="x" aria-label="Close chat">×</button></div>
  <div class="chat-b" id="chatB"></div>
  <div class="quick" id="chatQ"></div>
  <form class="chat-f" id="chatF"><input id="chatI" placeholder="Ask a question…" aria-label="Your question" autocomplete="off"><button aria-label="Send">↑</button></form>
</aside>`;

$('#yr').textContent = new Date().getFullYear();
$$('[data-paper]').forEach(a => { a.href = CONFIG.paper; a.target = '_blank'; a.rel = 'noopener'; });

/* ---------- menu + header behavior ---------- */
const burger = $('.burger');
burger.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', open);
});
$$('#mnav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  $('#hdr').classList.toggle('hide', y > lastY && y > 320 && !document.body.classList.contains('menu-open'));
  lastY = y;
}, { passive: true });

/* ---------- join modal ---------- */
const modal = $('#joinModal');
const openJoin = e => {
  e && e.preventDefault();
  document.body.classList.remove('menu-open');
  const f = $('iframe', modal);
  if (!f.src) f.src = f.dataset.src;
  modal.classList.add('open');
  $('.modal-x', modal).focus();
};
const closeJoin = () => modal.classList.remove('open');
document.addEventListener('click', e => {
  if (e.target.closest('[data-join]')) openJoin(e);
  if (e.target.closest('[data-close]')) closeJoin();
});
addEventListener('keydown', e => { if (e.key === 'Escape') { closeJoin(); closeChat(); } });

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach(el => io.observe(el));

/* ---------- magnetic buttons ---------- */
if (matchMedia('(hover:hover)').matches) {
  $$('.btn-clay, .btn-light').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .18, y = (e.clientY - r.top - r.height / 2) * .28;
      b.style.transform = `translate(${x}px,${y - 3}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

/* ---------- hero parallax ---------- */
const heroImg = $('.arch img');
if (heroImg) addEventListener('scroll', () => { const y = Math.min(scrollY, 700); heroImg.style.transform = `translate3d(0,${y * .06}px,0) scale(1.08)`; }, { passive: true });

/* ---------- countdown ---------- */
const cd = $$('[data-cd]');
if (cd.length) {
  const tick = () => {
    const ms = Math.max(0, CONFIG.deadline - Date.now());
    const v = { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 };
    cd.forEach(el => { el.textContent = String(v[el.dataset.cd]).padStart(el.dataset.cd === 'd' ? 1 : 2, '0'); });
  };
  tick(); setInterval(tick, 1000);
}
const early = $('[data-early-days]');
if (early) {
  const d = Math.ceil((CONFIG.earlyBird - Date.now()) / 864e5);
  early.textContent = d > 0 ? `${d} days left to lock in early pricing` : 'Early registration has closed';
}

/* ---------- number counters ---------- */
$$('[data-count]').forEach(el => {
  const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suf || '';
  const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
  el.textContent = fmt(0);
  new IntersectionObserver((es, ob) => es.forEach(e => {
    if (!e.isIntersecting) return; ob.disconnect();
    const t0 = performance.now(), dur = 2200;
    (function step(t) { const p = Math.min(1, (t - t0) / dur), k = 1 - Math.pow(1 - p, 4); el.textContent = fmt(to * k); if (p < 1) requestAnimationFrame(step); })(t0);
  }), { threshold: .4 }).observe(el);
});

/* ---------- impacted -> empowered slider ---------- */
const shift = $('[data-shift]');
if (shift) {
  const inp = $('input', shift), lines = $$('.shift-line span', shift);
  const upd = () => {
    const t = inp.value / 100;
    shift.style.setProperty('--t', t);
    const idx = t < .34 ? 0 : t < .72 ? 1 : 2;
    lines.forEach((l, i) => l.style.opacity = i === idx ? 1 : 0);
    inp.setAttribute('aria-valuetext', ['AI-impacted', 'AI-fluent', 'AI-empowered'][idx]);
  };
  inp.addEventListener('input', upd); upd();
  // gentle self-demo the first time it scrolls into view
  new IntersectionObserver((es, ob) => es.forEach(e => {
    if (!e.isIntersecting) return; ob.disconnect();
    if (inp.dataset.touched) return;
    let v = 0; const t0 = performance.now();
    (function s(t) { if (inp.dataset.touched) return; const p = Math.min(1, (t - t0) / 2600); v = 100 * (1 - Math.pow(1 - p, 3)) * .62; inp.value = v; upd(); if (p < 1) requestAnimationFrame(s); })(t0);
  }), { threshold: .6 }).observe(shift);
  ['pointerdown', 'keydown'].forEach(ev => inp.addEventListener(ev, () => inp.dataset.touched = 1));
}

/* ---------- generic tabs ---------- */
$$('[data-tabs]').forEach(root => {
  const tabs = $$('[role=tab]', root), panes = $$('[data-pane]', root);
  const sel = i => {
    tabs.forEach((t, j) => t.setAttribute('aria-selected', i === j));
    panes.forEach((p, j) => p.classList.toggle('on', i === j));
    const host = root.closest('[data-t]'); if (host) host.dataset.t = i;
    if (root.dataset.card) { const c = $(root.dataset.card); if (c) { c.style.opacity = 0; setTimeout(() => { c.querySelector('.k').textContent = tabs[i].dataset.k; c.querySelector('h3').textContent = tabs[i].dataset.h; c.querySelector('p').textContent = tabs[i].dataset.p; c.style.opacity = 1; }, 180); } }
  };
  tabs.forEach((t, i) => { t.addEventListener('click', () => sel(i)); t.addEventListener('mouseenter', () => { if (root.hasAttribute('data-hover')) sel(i); }); });
  sel(0);
});

/* ---------- sessions: filter + auto "completed" ---------- */
$$('.sess').forEach(s => { if (new Date(s.dataset.date + 'T23:59:59') < Date.now()) s.classList.add('past'); });
$$('.filters button').forEach(b => b.addEventListener('click', () => {
  $$('.filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  const f = b.dataset.f;
  $$('.sess').forEach(s => s.classList.toggle('hide', f !== 'all' && s.dataset.type !== f));
}));

/* ---------- capability selector (certification) ---------- */

/* ---------- tuition toggle ---------- */
$$('.seg[data-seg]').forEach(seg => {
  const bs = $$('button', seg), tgt = $$(seg.dataset.seg);
  bs.forEach((b, i) => b.addEventListener('click', () => {
    bs.forEach(x => x.setAttribute('aria-pressed', x === b));
    tgt.forEach((t, j) => t.classList.toggle('on', i === j));
  }));
});
const orgR = $('#orgRange');
if (orgR) {
  const out = $('#orgOut'), btn = $('#orgBtn');
  const u = () => { out.textContent = orgR.value >= 200 ? '200+' : orgR.value; btn.href = mail('Organizational interest — Leading AI with Human Intelligence™ Certification', `Organization:\nNumber of participants: ${out.textContent}\nLeadership development needs:\n`); };
  orgR.addEventListener('input', u); u();
}

/* ---------- join roles ---------- */
const roleTabs = $$('.role-tabs button');
if (roleTabs.length) {
  const copy = {
    participant: 'Build your own AI fluency and step into what’s next — in your career, your business, and your family.',
    partner: 'Put your organization behind the mission. Sponsor the forums, share the room, and help put AI fluency in reach of a million women.',
    ally: 'Women, men, and allies choosing to build a more equitable, human‑centered AI future — side by side. Add your name and your voice.',
  };
  const p = $('#rolePanel p');
  roleTabs.forEach(b => b.addEventListener('click', () => {
    roleTabs.forEach(x => x.setAttribute('aria-selected', x === b));
    p.style.opacity = 0; setTimeout(() => { p.textContent = copy[b.dataset.r]; p.style.opacity = 1; }, 160);
    $('#roleBtn').dataset.role = b.dataset.r;
    const partner = b.dataset.r === 'partner';
    $('#roleBtn').hidden = partner; $('#rolePartner').hidden = !partner;
  }));
  p.style.transition = 'opacity .3s';
}

/* ---------- white paper model ---------- */
const model = $('.model');
if (model) $$('.seg button', model).forEach(b => b.addEventListener('click', () => {
  $$('.seg button', model).forEach(x => x.setAttribute('aria-pressed', x === b));
  model.dataset.m = b.dataset.m;
  $$('.txt > div', model).forEach(d => d.hidden = d.dataset.m !== b.dataset.m);
}));

/* ---------- chat guide (stand-in until the GoHighLevel chat widget is wired up) ---------- */
const chat = $('#chat'), chatB = $('#chatB'), chatQ = $('#chatQ');
const KB = [
  { k: ['distributed', 'framework', 'change management', 'end of the end'], q: 'What is Distributed Intelligence™?', a: 'Distributed Intelligence™ is the model for leading transformation when human intelligence and AI operate across the same work. Traditional change management assumes a stable end state — with AI, there isn’t one. <a href="paper.html">Read the white paper →</a> or <a href="'+CONFIG.paper+'" target="_blank" rel="noopener">download the PDF ↓</a>' },
  { k: ['lab', 'session', 'workshop', 'masterclass', 'forum', 'upcoming', 'date'], q: 'Upcoming AI Labs', a: 'The AI Leadership Lab is a 2½‑hour applied session, in person or virtual (lunch included in person). Next up: Sep 26 (virtual, $100) and Sep 30 (Plano, TX, $125). <a href="programs.html#labs">See all sessions →</a>' },
  { k: ['cert', 'tuition', 'cost', 'price', 'how much', 'accredit', 'cpd'], q: 'Certification cost', a: 'The Leading AI with Human Intelligence™ Certification is 25 hours, accredited by The CPD Standards Office. Tuition is $4,997 — or $3,997 if you register before Jan 1, 2027. Sessions begin after Jan 15, 2027. <a href="programs.html#tuition">Tuition details →</a>' },
  { k: ['partner', 'sponsor', 'stripe', 'tier'], q: 'Partner with us', a: 'Partner tiers are $500 (Community), $1,000 (Strategic) and $2,500 (Technology or Transformation — 4 spots per session, $4,500 for a two‑forum bundle). <a href="partners.html">See the tiers →</a>' },
  { k: ['1m', 'million', 'women', 'join', 'mission', 'ally'], q: 'Join 1M Women', a: 'The mission: transform the digital wellness of 1,000,000 women through AI fluency by May 2027. Join as a participant, partner, or ally. <a href="#" data-join>Add your name →</a>' },
  { k: ['isha', 'who', 'founder', 'team'], q: 'Who is Isha Lo?', a: 'Isha Lo is a Global Transformation Strategist known as the Fixer of Change — she sees what will stall a transformation and builds the strategy before the gap becomes the obstacle. <a href="team.html">Meet the team →</a>' },
  { k: ['contact', 'talk', 'email', 'human', 'reach', 'call'], q: 'Talk to the team', a: `Happy to connect you. Email <a href="${mail('Question from the website')}">${CONFIG.email}</a> — the team is based in the Dallas | Fort Worth market.` },
];
const say = (t, who) => { const d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = t; chatB.appendChild(d); chatB.scrollTop = chatB.scrollHeight; };
const ask = q => {
  say(q.replace(/</g, '&lt;'), 'me');
  const low = q.toLowerCase();
  const hit = KB.find(e => e.q.toLowerCase() === low) || KB.find(e => e.k.some(k => low.includes(k)));
  setTimeout(() => say(hit ? hit.a : `Good question — I’d rather you hear that from a person. <a href="${mail('Question from the website', q)}">Email the team →</a>`, 'bot'), 450);
};
chatQ.innerHTML = KB.map(e => `<button type="button">${e.q}</button>`).join('');
chatQ.addEventListener('click', e => { if (e.target.matches('button')) ask(e.target.textContent); });
$('#chatF').addEventListener('submit', e => { e.preventDefault(); const i = $('#chatI'); if (i.value.trim()) { ask(i.value.trim()); i.value = ''; } });
const openChat = () => { chat.classList.add('open'); $('#chatFab').style.visibility = 'hidden'; if (!chatB.children.length) say('Hi — I’m the Lo Down guide. Ask me about AI Labs, the certification, partnering, or the 1M Women mission.', 'bot'); };
function closeChat() { chat.classList.remove('open'); $('#chatFab').style.visibility = ''; }
$('#chatFab').addEventListener('click', openChat);
$('.chat-h .x').addEventListener('click', closeChat);
