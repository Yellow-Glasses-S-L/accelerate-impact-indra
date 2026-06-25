(function () {

  /* ── PAGE LOADER — solo primera visita de la sesión ── */
  if (!sessionStorage.getItem('ai_loaded')) {
    sessionStorage.setItem('ai_loaded', '1');

    var ls = document.createElement('style');
    ls.textContent = `
      #page-loader {
        position: fixed; inset: 0; z-index: 99998;
        background: #E3E2DA;
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
        will-change: transform;
      }
      #l-row {
        display: flex; align-items: center; gap: 32px;
        padding: 0 24px;
      }
      #l-text { display: flex; flex-direction: column; text-align: left; }
      /* Salida: telón que sube */
      #page-loader.out { transform: translateY(-100%); }

      /* 1. Entrada de cada círculo: materializa con blur + escala */
      @keyframes lDotIn {
        0%   { opacity: 0; transform: scale(0.12); filter: blur(18px); }
        60%  { opacity: 1; transform: scale(1.09); filter: blur(0); }
        100% { opacity: 1; transform: scale(1);    filter: blur(0); }
      }
      /* 2. Respiro colectivo post-entrada */
      @keyframes lDotBreath {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.06); }
      }
      /* 3. Texto slide-up */
      @keyframes lTextUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      /* 4. Barra de progreso automática */
      @keyframes lBarAuto {
        from { transform: scaleX(0); }
        to   { transform: scaleX(0.88); }
      }

      .l-dot {
        transform-origin: center; transform-box: fill-box;
        animation: lDotIn 0.62s cubic-bezier(0.34, 1.1, 0.64, 1) both;
      }
      .l-dot.breath {
        animation: lDotBreath 3.2s ease-in-out infinite;
      }
      /* Wordmark "Indra" — entra tras los puntos */
      @keyframes lWordIn {
        from { opacity: 0; transform: translateX(-12px); filter: blur(10px); }
        to   { opacity: 1; transform: translateX(0);     filter: blur(0); }
      }
      .l-word {
        transform-origin: left center; transform-box: fill-box;
        animation: lWordIn 0.7s cubic-bezier(0.34, 1.1, 0.64, 1) 0.9s both;
      }
      /* Divisor vertical entre logo y texto */
      @keyframes lDividerIn {
        from { transform: scaleY(0); opacity: 0; }
        to   { transform: scaleY(1); opacity: 1; }
      }
      #l-divider {
        width: 1px; height: 56px;
        background: rgba(3,26,52,0.18);
        transform-origin: center;
        animation: lDividerIn 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 1.15s both;
        flex-shrink: 0;
      }

      #l-eyebrow {
        display: block;
        font-family: 'Indra Sans', Inter, sans-serif;
        font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase;
        color: #002532; opacity: 0.38; margin-bottom: 4px;
        animation: lTextUp 0.55s ease 0.85s both;
      }
      #l-title {
        display: block;
        font-family: 'Indra Sans', Inter, sans-serif;
        font-size: 27px; letter-spacing: -0.025em; font-weight: 400;
        color: #002532;
        animation: lTextUp 0.6s ease 1.02s both;
      }

      /* Barra de progreso — esquina inferior */
      #l-bar {
        position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
        background: rgba(3,26,52,0.06);
        overflow: hidden;
      }
      #l-bar-fill {
        height: 100%; background: #00B0BD;
        transform: scaleX(0); transform-origin: left;
      }
      #l-bar-fill.running {
        animation: lBarAuto 3.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s forwards;
      }
      #l-bar-fill.complete {
        animation: none !important;
        transform: scaleX(1) !important;
        transition: transform 0.2s ease;
      }
    `;
    document.head.appendChild(ls);

    var lang = localStorage.getItem('lang') || 'es';
    var loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div id="l-row">
        <svg viewBox="0 0 124 28" width="220" height="50" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; flex-shrink:0;">
          <g fill="#002532">
            <path class="l-dot" style="animation-delay:0.05s" d="M0 14.9209L0.796217 15.1315C0.796217 15.1315 10.5354 12.1663 13.5 11.9642C16.4644 12.1663 26.204 15.1315 26.204 15.1315L27 14.9209C27 14.9209 18.5298 9.1066 13.5 8.99353C8.47021 9.1066 0 14.9209 0 14.9209Z"/>
            <path class="l-dot" style="animation-delay:0.22s" d="M27 0.895235L26.204 0.68457C26.204 0.68457 16.4644 3.64976 13.5002 3.85187C10.5356 3.64976 0.796013 0.68457 0.796013 0.68457L0 0.895235C0 0.895235 8.47021 6.70949 13.5002 6.82256C18.5298 6.70949 27 0.895235 27 0.895235Z"/>
            <path class="l-word" d="M34.5239 1.29572H38.0366V14.5012H34.5239V1.29572ZM42.1913 1.29572H48.4799L55.3539 11.5584H56.1092V1.29572H59.6219V14.5012H53.3333L46.4593 4.23869H45.7038V14.5012H42.1913V1.29572ZM63.7764 1.29572H73.9553C78.4687 1.29572 81.2258 3.80493 81.2258 7.89846C81.2258 11.992 78.4687 14.5012 73.9553 14.5012H63.7764V1.29572ZM77.6189 7.89846C77.6189 5.52158 76.3347 4.23869 73.9553 4.23869H67.2889V11.5584H73.9553C76.3347 11.5584 77.6189 10.2756 77.6189 7.89846ZM84.0586 1.29572H95.5028C99.1476 1.29572 101.3 3.05015 101.3 6.03111C101.3 8.2005 100.148 9.72846 98.1279 10.3889V10.6907L101.376 14.4261V14.5014H97.3347L94.1621 10.7661H87.5713V14.5014H84.0586V1.29572ZM97.6932 6.0309C97.6932 4.87993 96.9191 4.23869 95.5026 4.23869H87.5711V7.82311H95.5026C96.9191 7.82311 97.6932 7.18166 97.6932 6.0309ZM103.264 14.4259L111.139 1.29572H116.125L124 14.4261V14.5014H120.091L118.674 12.049H108.59L107.173 14.5014H103.264V14.4261L103.264 14.4259ZM116.994 9.106L114.199 4.23869H113.066L110.271 9.106H116.994Z"/>
            <path class="l-word" d="M33.751 22.6743C33.751 20.0156 35.6591 18.2851 38.5841 18.2851H44.5092V19.8651H38.5841C36.6509 19.8651 35.6465 20.8307 35.6465 22.6741C35.6465 24.5175 36.6507 25.4833 38.5841 25.4833H42.6765V22.2604H44.5092V27.0633H38.5841C35.6591 27.0633 33.751 25.3326 33.751 22.6741V22.6743ZM53.2465 24.5807H48.9156V27.0637H47.0828V18.2853H53.5354C55.8075 18.2853 57.2636 19.5144 57.2636 21.4329C57.2636 22.7998 56.5232 23.8156 55.2801 24.2921V24.5303L57.4393 27.0133V27.0635H55.3555L53.2465 24.5805V24.5807ZM55.3681 21.4329C55.3681 20.392 54.7529 19.8653 53.5354 19.8653H48.9156V23.0003H53.5354C54.7531 23.0003 55.3681 22.4736 55.3681 21.4327V21.4329ZM58.4185 22.6743C58.4185 19.8653 60.3267 18.0343 63.2516 18.0343H65.2476C68.1725 18.0343 70.0807 19.8651 70.0807 22.6743C70.0807 25.4835 68.1725 27.3143 65.2476 27.3143H63.2516C60.3267 27.3143 58.4185 25.4835 58.4185 22.6743ZM68.1852 22.6743C68.1852 20.6554 67.181 19.6145 65.2476 19.6145H63.2516C61.3184 19.6145 60.314 20.6554 60.314 22.6743C60.314 24.6932 61.3182 25.7343 63.2516 25.7343H65.2476C67.1808 25.7343 68.1852 24.6934 68.1852 22.6743ZM71.5997 22.9252V18.2851H73.4955V22.9252C73.4955 24.9317 74.4996 25.7343 76.433 25.7343H77.2994C79.2325 25.7343 80.2369 24.9317 80.2369 22.9252V18.2851H82.1327V22.9252C82.1327 25.7343 80.2245 27.3143 77.2996 27.3143H76.4332C73.5083 27.3143 71.6001 25.7343 71.6001 22.9252H71.5997ZM84.0656 18.2853H89.9029C92.175 18.2853 93.6312 19.5144 93.6312 21.4329C93.6312 23.3515 92.175 24.5807 89.9029 24.5807H85.8983V27.0637H84.0656V18.2853ZM91.7356 21.4329C91.7356 20.392 91.1204 19.8653 89.9029 19.8653H85.8983V23.0003H89.9029C91.1206 23.0003 91.7356 22.4736 91.7356 21.4327V21.4329Z"/>
          </g>
        </svg>
        <div id="l-divider"></div>
        <div id="l-text">
          <span id="l-eyebrow">${lang === 'en' ? 'Welcome to' : 'Bienvenido a'}</span>
          <span id="l-title">Accelerate Impact</span>
        </div>
      </div>
      <div id="l-bar"><div id="l-bar-fill"></div></div>
    `;
    document.body.prepend(loader);

    // Barra arranca en el siguiente frame para que la animación CSS se active
    requestAnimationFrame(function () {
      var fill = document.getElementById('l-bar-fill');
      if (fill) fill.classList.add('running');
    });

    // Cuando terminan las entradas (~1.35s), respiro colectivo suave
    setTimeout(function () {
      loader.querySelectorAll('.l-dot').forEach(function (d, i) {
        d.classList.add('breath');
        d.style.animationDelay = (i * 0.1) + 's';
      });
    }, 1400);

    var t0 = Date.now();
    var MIN = 2400; // mínimo que se ve la animación completa

    function dismiss() {
      // Barra a 100% antes de salir
      var fill = document.getElementById('l-bar-fill');
      if (fill) { fill.classList.remove('running'); fill.classList.add('complete'); }
      var wait = Math.max(0, MIN - (Date.now() - t0));
      setTimeout(function () {
        loader.classList.add('out');
        setTimeout(function () { loader.remove(); }, 950);
      }, wait);
    }

    var maxT = setTimeout(dismiss, 5500);

    var promises = [document.fonts.ready];
    var vid = document.querySelector('video');
    if (vid) {
      promises.push(new Promise(function (resolve) {
        if (vid.readyState >= 3) { resolve(); return; }
        vid.addEventListener('canplaythrough', resolve, { once: true });
      }));
    }
    Promise.all(promises).then(function () { clearTimeout(maxT); dismiss(); });
  }

  /* ── BASE FONT SIZE — 18px global ── */
  const baseStyle = document.createElement('style');
  baseStyle.textContent = 'html { font-size: 18px; }';
  document.head.appendChild(baseStyle);

  /* ── NAVBAR ADAPTATIVA — nav-on-dark CSS (global, todas las páginas) ── */
  const navDarkStyle = document.createElement('style');
  navDarkStyle.textContent = `
    .navbar-pill { transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }
    #site-navbar.nav-on-dark .navbar-pill {
      background: rgba(2,9,20,0.15) !important;
      border-color: rgba(247,247,255,0.12) !important;
      backdrop-filter: blur(24px) saturate(150%) !important;
      -webkit-backdrop-filter: blur(24px) saturate(150%) !important;
    }
    #site-navbar.nav-on-dark .navbar-pill img {
      filter: brightness(0) invert(1) opacity(0.95);
      transition: filter 0.35s ease;
    }
    #site-navbar.nav-on-dark .navbar-pill nav a,
    #site-navbar.nav-on-dark .navbar-pill button { color: rgba(247,247,255,0.72) !important; }
    #site-navbar.nav-on-dark .navbar-pill nav a:hover,
    #site-navbar.nav-on-dark .navbar-pill button:hover { color: #E3E2DA !important; }
    #site-navbar.nav-on-dark .navbar-pill a.text-tef-dark,
    #site-navbar.nav-on-dark .navbar-pill button.text-tef-dark { color: #E3E2DA !important; }
    #site-navbar.nav-on-dark .navbar-pill span.text-tef-dark\\/20 { color: rgba(247,247,255,0.3) !important; }
    #site-navbar.nav-on-dark .navbar-pill button[aria-label] span { background-color: rgba(247,247,255,0.85) !important; }
    #site-navbar.nav-on-dark .navbar-pill button[aria-label] svg { color: rgba(247,247,255,0.92) !important; }
    #site-navbar.nav-on-dark .navbar-pill span.bg-black\\/10 { background-color: rgba(247,247,255,0.2) !important; }

    /* ── DROPDOWN del hamburguesa — adaptativo light/dark ── */
    .navbar-dropdown {
      transition: background 0.35s ease, border-color 0.35s ease;
    }
    .navbar-dropdown a {
      display: block;
      padding: 8px 16px;
      margin: -8px -16px;
      border-radius: 8px;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .navbar-dropdown a:hover { background: rgba(0,0,0,0.06); }
    #site-navbar.nav-on-dark .navbar-dropdown {
      background: rgba(2,9,20,0.15) !important;
      border-color: rgba(247,247,255,0.12) !important;
      backdrop-filter: blur(24px) saturate(150%) !important;
      -webkit-backdrop-filter: blur(24px) saturate(150%) !important;
    }
    #site-navbar.nav-on-dark .navbar-dropdown a { color: rgba(247,247,255,0.72) !important; }
    #site-navbar.nav-on-dark .navbar-dropdown a:hover {
      color: #E3E2DA !important;
      background: rgba(247,247,255,0.1) !important;
    }
    #site-navbar.nav-on-dark .navbar-dropdown a.text-tef-dark { color: #E3E2DA !important; }
  `;
  document.head.appendChild(navDarkStyle);

  /* ── CUSTOM CURSOR — punto azul Indra ── */
  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  if (!isTouchDevice) {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      #custom-cursor {
        position: fixed; top: 0; left: 0; z-index: 99999;
        width: 10px; height: 10px; border-radius: 50%;
        background: #00B0BD;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: transform 0.12s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
        will-change: top, left;
      }
      #custom-cursor.is-hovering {
        width: 22px; height: 22px;
        background: rgba(0, 102, 255, 0.25);
        border: 1.5px solid #00B0BD;
      }
    `;
    document.head.appendChild(style);

    const dot = document.createElement('div');
    dot.id = 'custom-cursor';
    document.body.appendChild(dot);

    let mx = -100, my = -100;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    }, { passive: true });

    document.addEventListener('mouseover', e => {
      const el = e.target.closest('a, button, [role="button"], input, textarea, select, label');
      dot.classList.toggle('is-hovering', !!el);
    });
  }

  const path = window.location.pathname;
  const current =
    path.includes('lider-indra') ? 'lider-indra' :
    path.includes('nadia') ? 'nadia' :
    path.includes('info') ? 'info' :
    path.includes('journey') ? 'journey' :
    path.includes('agenda') ? 'agenda' :
    path.includes('autodiagnostico') ? 'autodiagnostico' :
    path.includes('modelo') ? 'modelo' : 'home';

  function navLink(href, inner, page) {
    const active = current === page;
    const cls = 'font-mono text-xs tracking-[0.18em] uppercase transition-colors ' +
      (active ? 'text-tef-dark' : 'text-tef-dark/50 hover:text-tef-dark');
    return `<a href="${href}" class="${cls}">${inner}</a>`;
  }

  /* ── NAVBAR ── */
  const navEl = document.getElementById('site-navbar');
  if (navEl) {
    navEl.className = 'sticky top-0 z-50';
    navEl.setAttribute('style', 'background:transparent !important;border:none !important;backdrop-filter:none !important;padding:16px 24px 0;pointer-events:none;');
    navEl.setAttribute('x-data', '{ menuOpen: false }');
    navEl.innerHTML = `
      <div class="w-fit mx-auto relative">

        <!-- Pill -->
        <div class="navbar-pill pointer-events-auto flex items-center h-14 px-5 gap-3 rounded-full border border-black/[0.08] shadow-md"
             style="background:rgba(247,247,255,0.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);">

            <!-- Logo -->
            <a href="index.html" class="flex-shrink-0">
              <img src="images/brand/indra-logo.svg" class="h-5 md:h-7 w-auto" alt="Accelerate Impact">
            </a>

            <span class="hidden xl:block w-px h-4 bg-black/10 mx-3 flex-shrink-0"></span>

            <!-- Nav desktop (xl+) -->
            <nav class="hidden xl:flex items-center gap-8">
              ${navLink('lider-indra', `<span x-text="lang==='es' ? 'Líder Indra' : 'Indra Leader'">Líder Indra</span>`, 'lider-indra')}
              ${navLink('journey', `<span x-text="t('nav_journey')">Journey</span>`, 'journey')}
              ${navLink('autodiagnostico', `<span x-text="lang==='es' ? 'Autodiagnóstico' : 'Self-Assessment'">Autodiagnóstico</span>`, 'autodiagnostico')}
              ${navLink('nadia', 'Nadia', 'nadia')}
              ${navLink('agenda', 'Agenda', 'agenda')}
              ${navLink('info', `<span x-text="t('nav_info')">Contacto</span>`, 'info')}
            </nav>

            <span class="hidden xl:block w-px h-4 bg-black/10 mx-3 flex-shrink-0"></span>

            <!-- Right: lang + hamburger -->
            <div class="flex items-center gap-1 flex-shrink-0">
              <div class="flex items-center gap-0 font-mono text-xs tracking-[0.18em]">
                <button @click="lang='es'" :class="lang==='es' ? 'text-tef-dark' : 'text-tef-dark/40 hover:text-tef-dark'" class="px-2 py-1 transition-colors uppercase">ES</button>
                <span class="text-tef-dark/20">/</span>
                <button @click="lang='en'" :class="lang==='en' ? 'text-tef-dark' : 'text-tef-dark/40 hover:text-tef-dark'" class="px-2 py-1 transition-colors uppercase">EN</button>
              </div>
              <button @click="menuOpen = !menuOpen"
                      class="xl:hidden relative flex justify-center items-center w-8 h-8 focus:outline-none ml-1"
                      :aria-label="lang==='es' ? 'Menú' : 'Menu'">
                <!-- Hamburger (3 lines) -->
                <span x-show="!menuOpen" class="absolute inset-0 flex flex-col justify-center items-center gap-1.5">
                  <span class="block w-5 h-px bg-tef-dark"></span>
                  <span class="block w-5 h-px bg-tef-dark"></span>
                  <span class="block w-5 h-px bg-tef-dark"></span>
                </span>
                <!-- X (close icon) — centrado por SVG -->
                <svg x-show="menuOpen" class="w-5 h-5 text-tef-dark" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                  <path d="M5 5l10 10M15 5L5 15"/>
                </svg>
              </button>
            </div>

        </div>

        <!-- Hamburger dropdown — width matches pill (parent w-fit) -->
        <div x-show="menuOpen"
             x-transition:enter="transition ease-out duration-200"
             x-transition:enter-start="opacity-0 -translate-y-2"
             x-transition:enter-end="opacity-100 translate-y-0"
             x-transition:leave="transition ease-in duration-150"
             x-transition:leave-start="opacity-100 translate-y-0"
             x-transition:leave-end="opacity-0 -translate-y-2"
             class="absolute top-full left-0 right-0 mt-2 pointer-events-auto"
             style="display:none" x-cloak>
          <div class="navbar-dropdown rounded-2xl border border-black/[0.08] shadow-md overflow-hidden"
               style="background:rgba(247,247,255,0.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);">
            <nav class="px-5 py-5 flex flex-col gap-3.5">
              ${navLink('lider-indra', `<span x-text="lang==='es' ? 'Líder Indra' : 'Indra Leader'">Líder Indra</span>`, 'lider-indra').replace('class="', '@click="menuOpen=false" class="text-sm ')}
              ${navLink('journey', `<span x-text="t('nav_journey')">Journey</span>`, 'journey').replace('class="', '@click="menuOpen=false" class="text-sm ')}
              ${navLink('autodiagnostico', `<span x-text="lang==='es' ? 'Autodiagnóstico' : 'Self-Assessment'">Autodiagnóstico</span>`, 'autodiagnostico').replace('class="', '@click="menuOpen=false" class="text-sm ')}
              ${navLink('nadia', 'Nadia', 'nadia').replace('class="', '@click="menuOpen=false" class="text-sm ')}
              ${navLink('agenda', 'Agenda', 'agenda').replace('class="', '@click="menuOpen=false" class="text-sm ')}
              ${navLink('info', `<span x-text="t('nav_info')">Contacto</span>`, 'info').replace('class="', '@click="menuOpen=false" class="text-sm ')}
            </nav>
          </div>
        </div>

      </div>`;

    if (current === 'home') navEl.classList.add('nav-on-dark');
  }

  /* ── FOOTER ── */
  const footEl = document.getElementById('site-footer');
  if (footEl) {
    footEl.innerHTML = `
      <div class="relative max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-16">

        <!-- Top: logo -->
        <div class="pb-10 border-b border-paper/10">
          <img src="images/brand/indra-logo.svg" class="h-10 md:h-12 w-auto brightness-0 invert" alt="Accelerate Impact">
        </div>

        <!-- Disclaimer — always shown -->
        <p class="py-5 text-[12px] text-paper/50 leading-relaxed max-w-3xl"
           x-text="lang==='en' ? '* The self-diagnosis is confidential and non-evaluative. Only you and the designated People team have access.' : '* El autodiagnóstico es confidencial y no evaluativo. Sólo accederás tú y el equipo People designado.'"></p>

        <!-- Bottom: legal + YG -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-paper/10">
          <p class="font-mono text-[11px] tracking-[0.18em] uppercase text-paper/40">© 2026 Indra S.A.</p>
          <div class="flex items-center gap-5">
            <a href="https://yellowglasses.es" target="_blank" rel="noopener"
               class="text-paper/50 hover:text-paper transition-colors" aria-label="Powered by Yellow Glasses">
              <img src="images/brand/powered-by-YG.svg" alt="Powered by Yellow Glasses" class="h-6 w-auto" />
            </a>
          </div>
        </div>

      </div>`;
  }

  /* ── PAGE READY: fade-in suave para evitar destello entre páginas ── */
  const markLoaded = () => document.documentElement.classList.add('loaded');
  // Esperamos a window.load + 200ms para que scroll.js registre sus gsap.from
  // (que snapean elementos a estados iniciales async tras cargar split-type)
  const reveal = () => {
    setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(markLoaded)), 200);
  };
  if (document.readyState === 'complete') {
    reveal();
  } else {
    window.addEventListener('load', reveal, { once: true });
  }
  // Safety net global
  setTimeout(markLoaded, 1800);
})();
