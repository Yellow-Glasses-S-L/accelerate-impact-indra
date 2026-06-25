/* ─────────────────────────────────────────────────────────────
 * scroll.js — Animation engine (universal + páginas secundarias)
 *
 * ARQUITECTURA:
 *   • index.html  → tiene su propio script inline con M1–M7
 *   • scroll.js   → Lenis, universales, journey, nadia, info
 *
 * Regla: scroll.js NO toca elementos del home que ya maneja
 * el script inline (.intro-hero, .hero-sequential, [data-cards-3d],
 * [data-cohort-nadia], [data-accelerate-header]).
 * Sí maneja: [data-stack-cards] (index), [data-track-section] (journey).
 * ───────────────────────────────────────────────────────────── */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Script loader dinámico ── */
  function loadScript(src) {
    return new Promise((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = resolve;
      document.head.appendChild(s);
    });
  }

  /* ── Boot ── */
  window.addEventListener('load', async () => {
    await loadScript('https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js');

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('has-scroll-fx');

    /* ── Scroll hint — fade out on first scroll ── */
    const scrollHint = document.querySelector('[data-scroll-hide]');
    if (scrollHint) {
      gsap.to(scrollHint, {
        opacity: 0, y: -10, duration: 0.4, ease: 'power2.in',
        scrollTrigger: { trigger: document.body, start: 'top -60px', once: true }
      });
    }

    /* ─────────────────────────────────────────────
     * LENIS — smooth scroll
     * ───────────────────────────────────────────── */
    let lenis = null;
    if (typeof Lenis !== 'undefined' && !reduced) {
      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 1.5,
        wheelMultiplier: 1
      });
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      lenis.on('scroll', ScrollTrigger.update);
      window.__lenis = lenis;
    }

    /* ─────────────────────────────────────────────
     * UNIVERSALES — data-* en cualquier página
     * ───────────────────────────────────────────── */

    /* data-reveal="up|down|left|right|scale|blur" */
    gsap.utils.toArray('[data-reveal]').forEach(el => {
      const type  = (el.dataset.reveal || 'up').trim();
      const start = el.dataset.revealStart || 'top 88%';
      const dur   = parseFloat(el.dataset.revealDuration) || 1.0;
      const delay = parseFloat(el.dataset.revealDelay)    || 0;
      const from  = { opacity: 0 };
      if (type === 'up')    from.y      = 56;
      if (type === 'down')  from.y      = -56;
      if (type === 'left')  from.x      = -64;
      if (type === 'right') from.x      = 64;
      if (type === 'scale') from.scale  = 0.92;
      if (type === 'blur')  from.filter = 'blur(14px)';
      gsap.from(el, {
        ...from, duration: dur, delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' }
      });
    });

    /* data-reveal-stagger (contenedor) > data-stagger-item (hijos) */
    gsap.utils.toArray('[data-reveal-stagger]').forEach(parent => {
      const items = parent.querySelectorAll('[data-stagger-item]');
      if (!items.length) return;
      gsap.from(items, {
        y: parseFloat(parent.dataset.staggerDistance) || 48,
        opacity: 0, duration: 1.0, ease: 'power3.out',
        stagger: parseFloat(parent.dataset.staggerDelay) || 0.1,
        scrollTrigger: { trigger: parent, start: parent.dataset.revealStart || 'top 82%' }
      });
    });

    /* data-parallax="speed" — yPercent relativo a la velocidad */
    gsap.utils.toArray('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const scope = el.closest('[data-parallax-scope]') || el.closest('section') || el.parentElement;
      gsap.to(el, {
        yPercent: -speed * 40, ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
    });

    /* data-reveal-line — clip-path wipe horizontal */
    gsap.utils.toArray('[data-reveal-line]').forEach(el => {
      gsap.from(el, {
        clipPath: 'inset(0 100% 0 0)', duration: 1.6, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    /* data-counter="número" — contador animado */
    gsap.utils.toArray('[data-counter]').forEach(el => {
      const target = parseFloat(el.dataset.counter);
      if (isNaN(target)) return;
      const obj = { n: 0 };
      gsap.to(obj, {
        n: target, duration: 1.8, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.n).toString(); },
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });

    /* data-draw — SVG path draw */
    gsap.utils.toArray('[data-draw]').forEach(p => {
      try {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: parseFloat(p.dataset.drawDuration) || 2.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: p, start: 'top 82%' }
        });
      } catch (e) {}
    });

    /* data-pin="true" — pin element durante data-pin-distance px */
    gsap.utils.toArray('[data-pin]').forEach(el => {
      gsap.to(el, {
        ease: 'none',
        scrollTrigger: {
          trigger: el, start: 'top top',
          end: '+=' + (parseInt(el.dataset.pinDistance) || 600),
          pin: true, pinSpacing: true, scrub: true
        }
      });
    });

    /* data-split-words / data-split-chars — SplitType en cualquier página */
    if (!reduced && typeof SplitType !== 'undefined') {
      document.querySelectorAll('[data-split-words]').forEach(el => {
        requestAnimationFrame(() => {
          if (!el.textContent.trim()) return;
          const split = new SplitType(el, { types: 'words' });
          if (!split.words?.length) return;
          gsap.from(split.words, {
            y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%' }
          });
        });
      });

      document.querySelectorAll('[data-split-chars]').forEach(el => {
        requestAnimationFrame(() => {
          if (!el.textContent.trim()) return;
          const split = new SplitType(el, { types: 'chars' });
          if (!split.chars?.length) return;
          gsap.from(split.chars, {
            y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.03,
            scrollTrigger: { trigger: el, start: 'top 90%' }
          });
        });
      });
    }

    /* ─────────────────────────────────────────────
     * Alpine + resize refresh
     * ───────────────────────────────────────────── */
    if (window.Alpine) {
      document.addEventListener('alpine:initialized', () => ScrollTrigger.refresh());
    } else {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn && (btn.textContent.trim() === 'ES' || btn.textContent.trim() === 'EN')) {
        setTimeout(() => ScrollTrigger.refresh(), 60);
      }
    });

    /* ─────────────────────────────────────────────
     * PAGE TRANSITIONS — fade out/in (Alpine-safe)
     * No usa Barba.js porque cada página tiene su
     * propio i18n en <head> que no se puede re-inyectar.
     * ───────────────────────────────────────────── */
    // El home tiene su propio intro cinematic — no aplicar fade-in genérico
    const isHomePage = !!document.querySelector('.intro-hero');
    const pageMain   = document.querySelector('main');
    if (pageMain && !reduced && !isHomePage) {
      gsap.from(pageMain, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out', delay: 0.05 });
    }
    if (!reduced) {
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href]');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
            href.startsWith('http') || href.startsWith('tel:')) return;
        if (a.target === '_blank' || a.hasAttribute('data-no-transition')) return;
        e.preventDefault();
        const dest = href;
        gsap.to(pageMain || document.body, {
          opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
          onComplete: () => { window.location.href = dest; }
        });
      }, { capture: true });
    }

    /* ─────────────────────────────────────────────
     * JOURNEY — Hero + track nodes
     * ───────────────────────────────────────────── */
    const journeyHero = document.querySelector('[data-journey-hero]');
    if (journeyHero && !reduced) {
      gsap.from('[data-journey-eyebrow]', { y: 16, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
      if (typeof SplitType !== 'undefined') {
        requestAnimationFrame(() => {
          const h1 = journeyHero.querySelector('h1');
          if (h1 && h1.textContent.trim()) {
            const split = new SplitType(h1, { types: 'words' });
            if (split.words?.length) {
              gsap.from(split.words, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.6 });
            }
          }
        });
      }
      gsap.from('[data-journey-sub]', { y: 16, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 1.0 });
    }

    /* ─────────────────────────────────────────────
     * STACK CARDS — data-stack-cards (index.html)
     * Cards stack on scroll: each new card slides in
     * and previous cards scale down slightly.
     * ───────────────────────────────────────────── */
    const stackCards = document.querySelectorAll('[data-stack-card]');
    if (stackCards.length && !reduced) {
      stackCards.forEach((card, i) => {
        if (i === 0) return; // first card has nothing to scale before it
        // As card i slides in, scale down all previous cards
        gsap.to(Array.from(stackCards).slice(0, i), {
          scale: 1 - (0.03 * i),
          transformOrigin: '50% 0%',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top top+=88',
            end: 'top top+=88',
            scrub: 0.5
          }
        });
      });
    }

    /* ─────────────────────────────────────────────
     * JOURNEY TRACK — CSS sticky horizontal scroll (journey.html)
     * Sin GSAP pin (evita conflicto con Lenis en subpáginas).
     * La sección recibe altura dinámica; el pin es position:sticky.
     * ───────────────────────────────────────────── */
    const journeySection   = document.getElementById('journey-hscroll-section');
    const journeyPin       = document.getElementById('journey-hscroll-pin');
    const journeyTrack     = document.getElementById('journey-track');
    const journeyBar       = document.getElementById('journey-progress');
    const journeyBarWrap   = document.getElementById('journey-progress-wrap');
    const journeyTabs      = document.querySelectorAll('.journey-tab');
    const journeyActiveNum = document.getElementById('journey-active-num');
    const JOURNEY_LABELS      = ['01','02','03'];
    let journeyCurrentIdx     = -1;
    let cachedCardW           = 0;
    const journeyTimelineFill = document.getElementById('journey-timeline-fill');

    if (journeySection && journeyPin && journeyTrack && window.innerWidth >= 768) {
      const getJourneyMaxX = () => Math.max(0, journeyTrack.scrollWidth - window.innerWidth);

      // Alinear track con el margen del h2 del header (igual que home)
      const journeyHeaderH2 = document.querySelector('[data-journey-header] h2');
      function alignJourneyTrack() {
        if (!journeyHeaderH2) return;
        const h2Left   = journeyHeaderH2.getBoundingClientRect().left;
        const sepMx    = 20;
        const offset   = Math.max(0, h2Left - sepMx);
        journeyTrack.style.paddingLeft = offset + 'px';

        // Article width = image natural width (aspect 32:27) + card overhang past image right edge
        // Card width is clamp(288px,31vw,368px); left = imgW-210; right = imgW-210+cardW → overhang = cardW-210
        // artW = imgW + overhang + buffer = imgW + (368-210) + 70 = imgW + 228 → round to 230
        const imgH = Math.max(395, Math.min(700, 0.475 * window.innerWidth));
        const imgW = Math.round(imgH * 32 / 27);
        const artW = imgW + 230;
        cachedCardW = artW;
        journeyTrack.querySelectorAll('.journey-card').forEach(card => {
          card.style.width = artW + 'px';
        });

        // paddingRight = viewport - artW - offset  →  total = 4×artW (last card always reachable)
        const minPadRight = Math.max(64, window.innerWidth - artW - offset);
        journeyTrack.style.paddingRight = minPadRight + 'px';
      }

      // La sección necesita altura = viewport + distancia de scroll horizontal
      function setJourneySectionHeight() {
        journeySection.style.height = (window.innerHeight + getJourneyMaxX()) + 'px';
      }

      alignJourneyTrack();
      setJourneySectionHeight();
      window.addEventListener('resize', () => {
        alignJourneyTrack();
        setJourneySectionHeight();
        ScrollTrigger.refresh();
      });

      function setJourneyActiveCard(idx) {
        if (idx === journeyCurrentIdx) return;
        journeyCurrentIdx = idx;

        // Actualizar círculos y labels del timeline (acumulativo: i ≤ idx = activo)
        journeyTabs.forEach((btn, i) => {
          const circle = btn.querySelector('[data-tab-circle]');
          const label  = btn.querySelector('span');
          const active = i <= idx;
          if (circle) {
            circle.classList.toggle('bg-tef-blue',    active);
            circle.classList.toggle('border-tef-blue', active);
            circle.classList.toggle('bg-paper',       !active);
            circle.classList.toggle('border-ink/20',  !active);
          }
          if (label) {
            label.classList.toggle('text-tef-blue', active);
            label.classList.toggle('text-ink/40',   !active);
          }
        });

        if (journeyActiveNum) {
          gsap.to(journeyActiveNum, {
            opacity: 0, filter: 'blur(14px)', duration: 0.18,
            onComplete: () => {
              journeyActiveNum.textContent = JOURNEY_LABELS[idx];
              gsap.to(journeyActiveNum, { opacity: 1, filter: 'blur(0px)', duration: 0.28 });
            }
          });
        }
      }

      let jst = ScrollTrigger.create({
        id: 'journey-st',
        trigger: journeySection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter:     () => { if (journeyBarWrap) journeyBarWrap.style.opacity = '1'; },
        onLeave:     () => { if (journeyBarWrap) journeyBarWrap.style.opacity = '0'; },
        onEnterBack: () => { if (journeyBarWrap) journeyBarWrap.style.opacity = '1'; },
        onLeaveBack: () => { if (journeyBarWrap) journeyBarWrap.style.opacity = '0'; },
        onUpdate: (self) => {
          const total = getJourneyMaxX();
          gsap.set(journeyTrack, { x: -total * self.progress });
          if (journeyBar) journeyBar.style.width = (self.progress * 100) + '%';
          if (journeyTimelineFill) gsap.set(journeyTimelineFill, { scaleX: self.progress });
          // Active card: which card is nearest to the left-aligned position
          // Each card i aligns at progress = i*cardW/total → use round(progress*total/cardW)
          const n   = 5;
          const cw  = cachedCardW > 0 ? cachedCardW : total / n;
          const idx = Math.min(Math.max(0, Math.round(self.progress * total / cw)), n - 1);
          setJourneyActiveCard(idx);
        }
      });

      // Click tab → saltar a esa tarjeta
      journeyTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const i     = parseInt(tab.dataset.tab);
          const cards = journeyTrack.querySelectorAll('.journey-card');
          const cardW = cards[0] ? cards[0].offsetWidth : 0;
          const total = getJourneyMaxX();
          const progress = Math.max(0, Math.min(1, (i * cardW) / total));
          const dest = jst.start + progress * (jst.end - jst.start);
          if (window.__lenis) window.__lenis.scrollTo(dest, { duration: 0.8 });
          else window.scrollTo({ top: dest, behavior: 'smooth' });
        });
      });
    }

    /* ─────────────────────────────────────────────
     * NADIA — Avatar, título, propósito, cards, tips
     * ───────────────────────────────────────────── */
    const nadiaHero = document.querySelector('[data-nadia-hero]');
    if (nadiaHero && !reduced) {
      const avatar = nadiaHero.querySelector('[data-nadia-avatar]');
      if (avatar) gsap.from(avatar, { scale: 0.5, opacity: 0, duration: 1.4, ease: 'back.out(1.7)', delay: 0.2 });
      gsap.from('[data-nadia-eyebrow]', { y: 12, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 });
      if (typeof SplitType !== 'undefined') {
        requestAnimationFrame(() => {
          const h1 = nadiaHero.querySelector('h1');
          if (h1 && h1.textContent.trim()) {
            const split = new SplitType(h1, { types: 'chars' });
            if (split.chars?.length) {
              gsap.from(split.chars, {
                y: 60, opacity: 0, rotateX: -40, duration: 0.8, ease: 'power3.out',
                stagger: 0.04, delay: 0.6, transformOrigin: '50% 100%'
              });
            }
          }
        });
      }
      gsap.from('[data-nadia-sub]', { y: 16, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 });
    }

    const nadiaPurpose = document.querySelector('[data-nadia-purpose]');
    if (nadiaPurpose && !reduced && typeof SplitType !== 'undefined') {
      requestAnimationFrame(() => {
        if (!nadiaPurpose.textContent.trim()) return;
        const split = new SplitType(nadiaPurpose, { types: 'words' });
        if (split.words?.length) {
          gsap.from(split.words, {
            y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.025,
            scrollTrigger: { trigger: nadiaPurpose, start: 'top 85%' }
          });
        }
      });
    }

    gsap.utils.toArray('[data-nadia-card]').forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 === 0 ? -55 : 55, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 86%' }
      });
    });

    gsap.utils.toArray('[data-nadia-tip]').forEach((tip, i) => {
      gsap.from(tip, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: tip.closest('ol') || tip, start: 'top 84%' }
      });
    });

    /* ─────────────────────────────────────────────
     * INFO — secuencia de carta
     * ───────────────────────────────────────────── */
    const infoPage = document.querySelector('[data-info-page]');
    if (infoPage && !reduced) {
      gsap.from('[data-info-meta]', {
        clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power3.inOut', delay: 0.4
      });
      gsap.from('[data-info-letter]', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.55
      });
      if (typeof SplitType !== 'undefined') {
        requestAnimationFrame(() => {
          const greeting = document.querySelector('[data-info-greeting]');
          if (greeting && greeting.textContent.trim()) {
            const split = new SplitType(greeting, { types: 'chars' });
            if (split.chars?.length) {
              gsap.from(split.chars, {
                y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.9
              });
            }
          }
        });
      }
      gsap.from('[data-info-stamp]', {
        x: 50, opacity: 0, duration: 1.0, ease: 'back.out(1.2)', delay: 1.1
      });
    }

  });

  // ── Navbar adaptativa (subpáginas) — home tiene su propio M7 ──
  if (!document.querySelector('.intro-hero')) {
    const navbar = document.getElementById('site-navbar');
    if (navbar) {
      const navH = 80;
      const updateNavbar = () => {
        let isDark = false;
        for (const sec of document.querySelectorAll('[data-nav-dark]')) {
          const r = sec.getBoundingClientRect();
          if (r.top <= navH + 1 && r.bottom > navH) { isDark = true; break; }
        }
        navbar.classList.toggle('nav-on-dark', isDark);
      };
      window.addEventListener('scroll', updateNavbar, { passive: true });
      window.addEventListener('load', () => {
        if (window.__lenis) window.__lenis.on('scroll', updateNavbar);
        updateNavbar();
      }, { once: true });
      updateNavbar();
    }
  }

})();
