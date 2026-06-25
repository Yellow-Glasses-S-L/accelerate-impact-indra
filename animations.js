/**
 * AGENDA — Animation Engine
 * Coherente con scroll.js: mismas curvas, mismos timings, misma filosofía
 * Complementa scroll.js sin duplicar lo que ya hace
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Timing tokens ─────────────────────────────────────────── */
  const D = { fast: 0.4, base: 0.8, slow: 1.1 };
  const E = { out: 'power3.out', in: 'power2.in', back: 'back.out(1.5)' };
  const STAGGER = 0.08;

  /* ── Barra de progreso de scroll ────────────────────────────── */
  function initProgressBar() {
    if (reduced) return;
    const bar = Object.assign(document.createElement('div'), {
      id: 'agenda-progress'
    });
    bar.style.cssText =
      'position:fixed;top:0;left:0;height:2px;background:#00B0BD;' +
      'width:0%;z-index:9999;pointer-events:none;transition:width 0.06s linear;';
    document.body.appendChild(bar);
    document.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  /* ── Hero — anima h1 y subtítulo sin tocar el DOM de Alpine ─── */
  function initHero() {
    if (reduced) return;
    const h1  = document.querySelector('section[data-nav-dark] h1');
    const sub = document.querySelector('section[data-nav-dark] p');
    if (h1)  gsap.from(h1,  { y: 36, opacity: 0, duration: D.slow, ease: E.out, delay: 0.3 });
    if (sub) gsap.from(sub, { y: 20, opacity: 0, duration: D.base, ease: E.out, delay: 0.65 });
  }

  /* ── Tab bar — entrada al cargar ────────────────────────────── */
  function initTabBar() {
    if (reduced) return;
    const bar = document.querySelector('section.sticky');
    if (bar) gsap.from(bar, { y: -18, opacity: 0, duration: D.base, ease: E.out, delay: 0.85 });
  }

  /* ── Intro card + articles cuando el día se vuelve visible ─── */
  function animateDayPanel(panel) {
    if (reduced) return;
    const card     = panel.querySelector('[class*="rounded-br-2xl"]');
    const articles = panel.querySelectorAll('article');
    if (card) {
      gsap.fromTo(card,
        { y: 20, opacity: 0, scale: 0.98 },
        { y: 0,  opacity: 1, scale: 1, duration: D.base, ease: E.out }
      );
    }
    if (articles.length) {
      gsap.fromTo(articles,
        { y: 44, opacity: 0 },
        { y: 0,  opacity: 1, duration: D.slow, ease: E.out, stagger: STAGGER, delay: card ? 0.12 : 0 }
      );
    }
  }

  function initDayTransitions() {
    document.querySelectorAll('[x-show*="activeDay"]').forEach(panel => {
      new MutationObserver(() => {
        if (panel.style.display !== 'none') animateDayPanel(panel);
      }).observe(panel, { attributes: true, attributeFilter: ['style'] });
    });
  }

  /* ── Session articles — scroll reveal por columna ──────────── */
  function initArticleReveals() {
    if (reduced || typeof ScrollTrigger === 'undefined') return;
    gsap.utils.toArray('article').forEach(article => {
      const cfg = { trigger: article, start: 'top 86%', once: true };
      const time  = article.querySelector('[class*="md:col-span-2"]');
      const title = article.querySelector('h3');
      const desc  = article.querySelector('p[class*="text-\\[16px\\]"]');
      const fac   = article.querySelector('[class*="md:col-span-3"]');
      const items = article.querySelectorAll('ul li');
      if (time)         gsap.from(time,  { x: -50, opacity: 0, duration: D.base, ease: E.out, scrollTrigger: cfg });
      if (title)        gsap.from(title, { y: 30,  opacity: 0, duration: D.slow, ease: E.out, delay: STAGGER,     scrollTrigger: cfg });
      if (desc)         gsap.from(desc,  { y: 20,  opacity: 0, duration: D.base, ease: E.out, delay: STAGGER * 2, scrollTrigger: cfg });
      if (fac)          gsap.from(fac,   { x: 50,  opacity: 0, duration: D.base, ease: E.out, delay: STAGGER * 3, scrollTrigger: cfg });
      if (items.length) gsap.from(items, { x: 8,   opacity: 0, duration: D.fast, ease: E.out, stagger: STAGGER * 0.7, delay: STAGGER * 2, scrollTrigger: cfg });
    });
  }

  /* ── Facilitator cards — hover ──────────────────────────────── */
  function initFacilitatorHover() {
    if (reduced) return;
    document.querySelectorAll('.fac-photo').forEach(photo => {
      const card = photo.closest('[class*="rounded-xl"]');
      const text = photo.nextElementSibling;
      if (!card) return;
      card.addEventListener('mouseenter', () => {
        gsap.to(photo, { scale: 1.07, duration: D.fast, ease: E.back, overwrite: 'auto' });
        if (text) gsap.to(text, { x: 4, duration: D.fast, ease: E.out, overwrite: 'auto' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(photo, { scale: 1, duration: D.fast, ease: E.out, overwrite: 'auto' });
        if (text) gsap.to(text, { x: 0, duration: D.fast, ease: E.out, overwrite: 'auto' });
      });
    });
  }

  /* ── CTA — reveal + arrow hover ─────────────────────────────── */
  function initCTA() {
    if (reduced || typeof ScrollTrigger === 'undefined') return;
    const section = document.querySelector('section.bg-paper-warm');
    if (!section) return;
    const textBlock = section.querySelector('div > div');
    const btn   = section.querySelector('a[href*="journey"]');
    const arrow = btn?.querySelector('svg');
    const cfg = { trigger: section, start: 'top 85%', once: true };
    if (textBlock) gsap.from(textBlock, { y: 44, opacity: 0, duration: D.slow, ease: E.out, scrollTrigger: cfg });
    if (btn)       gsap.from(btn,       { y: 44, opacity: 0, duration: D.slow, ease: E.out, delay: STAGGER, scrollTrigger: cfg });
    if (arrow && btn) {
      btn.addEventListener('mouseenter', () => gsap.to(arrow, { x: 5, duration: D.fast, ease: E.out, overwrite: 'auto' }));
      btn.addEventListener('mouseleave', () => gsap.to(arrow, { x: 0, duration: D.fast, ease: E.out, overwrite: 'auto' }));
    }
  }

  /* ── Refresca ScrollTrigger tras cambio de idioma ───────────── */
  function initLangRefresh() {
    if (typeof ScrollTrigger === 'undefined') return;
    document.addEventListener('click', e => {
      if (e.target.closest('button')?.textContent?.trim().match(/^(ES|EN)$/)) {
        setTimeout(() => ScrollTrigger.refresh(), 80);
      }
    });
  }

  /* ── Boot — espera a window.load para que GSAP (defer) esté listo */
  function boot() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    initProgressBar();
    initHero();
    initTabBar();
    initDayTransitions();
    initArticleReveals();
    initFacilitatorHover();
    initCTA();
    initLangRefresh();

    // Anima el día 1 que ya es visible al cargar
    const day1 = document.querySelector('[x-show*="activeDay===1"]');
    if (day1) setTimeout(() => animateDayPanel(day1), 350);
  }

  window.addEventListener('load', boot);
})();
