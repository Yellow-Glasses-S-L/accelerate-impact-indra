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
        <svg viewBox="0 0 1041.7 250" width="240" height="58" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; flex-shrink:0;">
          <g fill="#00B0BD">
            <path class="l-dot" style="animation-delay:0.05s" d="M74.6 37.3C74.6 16.7 57.9 0 37.3 0S0 16.7 0 37.3s16.7 37.3 37.3 37.3 37.3-16.7 37.3-37.3"/>
            <path class="l-dot" style="animation-delay:0.22s" d="M162.3 37.3C162.3 16.7 145.6 0 125 0S87.7 16.7 87.7 37.3s16.7 37.3 37.3 37.3 37.3-16.7 37.3-37.3"/>
            <path class="l-dot" style="animation-delay:0.39s" d="M250 37.3C250 16.7 233.3 0 212.7 0s-37.3 16.7-37.3 37.3 16.7 37.3 37.3 37.3S250 57.9 250 37.3"/>
            <path class="l-dot" style="animation-delay:0.56s" d="M162.3 125c0-20.6-16.7-37.3-37.3-37.3S87.7 104.4 87.7 125s16.7 37.3 37.3 37.3 37.3-16.7 37.3-37.3"/>
            <path class="l-dot" style="animation-delay:0.73s" d="M162.3 212.7c0-20.6-16.7-37.3-37.3-37.3s-37.3 16.7-37.3 37.3S104.4 250 125 250s37.3-16.7 37.3-37.3"/>
            <path class="l-word" d="M329.5 95.9h-34.7V75.2h91v20.7H351v95.2h-21.5zM440.3 141.5c-1.8-10.8-8.9-19-20.7-19-12.6 0-19.9 8.3-22.4 19zm18.2 24.8c-1.8 6.6-12.3 26.5-38.9 26.5-24.8 0-43-18.2-43-43.9s18.2-43.9 43-43.9c23.2 0 41.4 18.2 41.4 42.2 0 2.5-.3 4.5-.5 6l-.3 2.3h-62.9c1.8 11.8 10.6 19.9 22.4 19.9 9.8 0 15.7-5.6 17.4-9.1zM473.4 75.2h20.7v115.9h-20.7zM570.2 141.5c-1.8-10.8-8.9-19-20.7-19-12.6 0-19.9 8.3-22.4 19zm18.3 24.8c-1.8 6.6-12.3 26.5-38.9 26.5-24.8 0-43-18.2-43-43.9s18.2-43.9 43-43.9c23.2 0 41.4 18.2 41.4 42.2 0 2.5-.3 4.5-.5 6l-.3 2.3h-62.9c1.8 11.8 10.6 19.9 22.4 19.9 9.8 0 15.7-5.6 17.4-9.1zM610 126.6h-14.1v-19.9H610V94.3c0-12.6 8.1-20.7 20.7-20.7h18.2v18.2h-12.4c-3.3 0-5.8 2.5-5.8 5.8v9.1h18.2v19.9h-18.2v64.6H610zM750.5 106.7h19l1.7 8.3h.8c1.5-1.8 3.5-3.5 5.6-5 3.8-2.5 9.6-5 17.6-5 19 0 33.1 14.1 33.1 35.6v50.5h-20.7v-48.8c0-10.8-7.5-18.2-18.2-18.2-10.8 0-18.2 7.5-18.2 18.2v48.8h-20.7zM960.1 159.7c-2.7 13.2-13.1 33.1-39.7 33.1-24.8 0-43-18.2-43-43.9s18.2-43.9 43-43.9c26.7 0 37.1 19.9 39.7 32.3h-20.7c-1.8-4.8-6.6-13.2-19-13.2S898 134 898 148.9s9.9 24.8 22.4 24.8 17.2-8.3 19-14.1h20.7zM1021 154.7h-17.4c-10.8 0-15.7 4.1-15.7 10.8 0 6.6 4.8 10.8 13.2 10.8 12.6 0 19.9-7.3 19.9-19zm1.6 28.2h-.8c-1.5 1.8-3.5 3.5-5.8 5-4 2.5-9.8 5-18.2 5-19.2 0-30.6-11.8-30.6-25.7 0-16.6 11.6-28.2 34.8-28.2h19v-1.7c0-9.3-5.6-15.7-14.9-15.7s-14.1 6-14.9 10.8h-20.7c1.8-13.9 13.1-27.3 35.6-27.3 21.5 0 35.6 14.2 35.6 32.3v53.8h-17.4zM844.2 106.7h20.7v84.4h-20.7zm22.6-24.4c0-6.8-5.5-12.3-12.3-12.3s-12.3 5.5-12.3 12.3 5.5 12.3 12.3 12.3c6.8-.1 12.3-5.5 12.3-12.3M717.4 148.9c0-14.9-9.9-24.8-22.4-24.8-12.4 0-22.4 9.9-22.4 24.8s9.9 24.8 22.4 24.8 22.4-9.9 22.4-24.8m20.7 0c0 25.7-18.2 43.9-43.1 43.9-24.8 0-43-18.2-43-43.9s18.2-43.9 43-43.9c24.9 0 43.1 18.2 43.1 43.9m-35.6-77.8H724l-19.9 24h-17.4z"/>
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
            <a href="/" class="flex-shrink-0">
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

        <!-- Middle: columns -->
        <div class="grid grid-cols-12 gap-6 py-10 border-b border-paper/10">
          <div class="col-span-12 md:col-span-4">
            <p class="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/50 mb-4"
               x-text="lang==='es' ? 'Partners del programa' : 'Program partners'"></p>
            <ul class="space-y-2 text-sm">
              <li><a href="https://www.egonzehnder.com" target="_blank" rel="noopener" class="text-paper/80 hover:text-tef-blue transition-colors">Egon Zehnder</a></li>
              <li><a href="https://www.kornferry.com" target="_blank" rel="noopener" class="text-paper/80 hover:text-tef-blue transition-colors">Korn Ferry</a></li>
              <li><a href="https://peopleexcellence.com" target="_blank" rel="noopener" class="text-paper/80 hover:text-tef-blue transition-colors">People Excellence</a></li>
              <li><a href="https://walkconsulting.net" target="_blank" rel="noopener" class="text-paper/80 hover:text-tef-blue transition-colors">WALK</a></li>
            </ul>
          </div>
          <div class="col-span-6 md:col-span-4">
            <p class="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/50 mb-4"
               x-text="lang==='es' ? 'Explorar' : 'Explore'"></p>
            <ul class="space-y-2 text-sm">
              <li><a href="lider-indra" class="text-paper/80 hover:text-tef-blue transition-colors" x-text="lang==='es' ? 'Líder Indra' : 'Indra Leader'">Líder Indra</a></li>
              <li><a href="journey" class="text-paper/80 hover:text-tef-blue transition-colors" x-text="t('nav_journey')"></a></li>
              <li><a href="autodiagnostico" class="text-paper/80 hover:text-tef-blue transition-colors" x-text="lang==='es' ? 'Autodiagnóstico' : 'Self-Assessment'">Autodiagnóstico</a></li>
              <li><a href="nadia" class="text-paper/80 hover:text-tef-blue transition-colors">Nadia</a></li>
              <li><a href="agenda" class="text-paper/80 hover:text-tef-blue transition-colors">Agenda</a></li>
              <li><a href="info" class="text-paper/80 hover:text-tef-blue transition-colors" x-text="t('nav_info')"></a></li>
            </ul>
          </div>
          <div class="col-span-6 md:col-span-4">
            <p class="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/50 mb-4"
               x-text="lang==='es' ? 'El programa' : 'The program'"></p>
            <ul class="space-y-2 text-sm text-paper/80">
              <li x-text="lang==='es' ? '10 meses · 3 fases' : '10 months · 3 phases'"></li>
              <li x-text="lang==='es' ? 'Comunidad de Líderes' : 'Leadership Community'"></li>
            </ul>
          </div>
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
