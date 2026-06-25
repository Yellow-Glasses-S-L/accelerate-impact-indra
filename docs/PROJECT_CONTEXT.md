# Accelerate Impact Indra — Contexto del proyecto

> **Última actualización:** 2026-05-27
> **Mantener este documento al día tras cambios significativos.** Es la fuente de verdad para sesiones futuras.

---

## Qué es

Web estática para el programa de liderazgo de Indra **"Accelerate Impact"**: tres días intensivos de Action Learning Week en Campus Universitas dirigidos a la comunidad global de líderes de Indra.

- **URL producción:** https://accelerateimpact.es
- **Repo:** `Yellow-Glasses-S-L/accelerate-impact-indra` (rama `main`)
- **Cliente / interlocutora:** Reyes Minaya (Indra)
- **Partner externo:** Korn Ferry (consultora de desarrollo ejecutivo) — propietarios del Leadership Self-Diagnosis
- **Equipo YG:** Rebe Ferrer

---

## Stack y arquitectura

### Frontend
- HTML/CSS/JS **estático** (sin framework backend). 10 páginas independientes.
- **Tailwind CDN** + **Alpine.js** (reactividad + i18n) + **GSAP** + **Lenis** (smooth scroll) + **SplitType** (animaciones tipográficas)
- **View Transitions API** para transiciones cross-document
- Fuente **Indra Sans** self-hosted en WOFF2 (con `ss01`/`cv11` desactivados → 'a' double-story de marca)
- Animaciones notables: hero con ping-pong video (forward → reverse loop), stack cards sticky, journey horizontal scroll, cards 3/2 unificadas

### Deploy
- **Railway** con Docker (`caddy:2-alpine`)
- **Caddyfile custom** con:
  - CSP permisiva (necesario `unsafe-eval` para Alpine)
  - URLs limpias: `/journey.html` → 301 → `/journey`; `try_files` para servirlo
  - `Cache-Control: no-store` en HTML/JS/CSS/JSON; `max-age=31536000 immutable` en assets (woff2, mp4, jpg, png, svg, webp, geojson)
  - HTTP Range requests nativos (necesario para ping-pong video)
- Dominio custom `accelerateimpact.es` (migrado desde GitHub Pages)

### i18n
- Objeto `i18n = { key: { es: '...', en: '...' } }` **inline en cada página** dentro de un `<script>` del `<head>`
- Alpine reactivo: `x-text="t('clave')"` (o `x-html` si contiene `<strong>`, `<em>`, `<br>`...) + `localStorage` para persistencia del idioma
- Patrón alternativo para texto puntual sin merece crear clave: `x-text="lang==='es' ? '...' : '...'"`
- Componentes compartidos (navbar/footer) en `components.js` — usar el patrón inline `lang==='es' ? ...` para no tener que añadir claves a las 10 páginas

### Páginas (10)
1. **index** — home con manifiesto + 4 bloques horizontales WHY/HOW/WHAT/EXPECT + popups
2. **lider-indra** — 3 pilares de marca con popups detallados ("Más información")
3. **modelo** — modelo de liderazgo en 3 capítulos (actitudes / comportamientos / cultura)
4. **journey** — fases del programa con scroll horizontal
5. **agenda** — agenda detallada de los 3 días con tabs
6. **nadia** — asistente IA (widget conversacional)
7. **playbook** — guía oficial del participante (basada en PDF Korn Ferry)
8. **autodiagnostico** — herramienta interactiva con dropdowns
9. **faq** — preguntas frecuentes con acordeón + tabla de módulos (basado en PDF oficial)
10. **info** — contacto

---

## Convenciones / cómo trabajar en este repo

### Añadir o cambiar texto traducible
1. Localizar el objeto `i18n` dentro del `<script>` en el `<head>` de la página
2. Añadir o modificar la clave con `{ es: '...', en: '...' }`
3. En el HTML usar `x-text="t('clave')"` o `x-html="t('clave')"` si contiene HTML
4. Validar JS antes de commit:
   ```bash
   node -e "const fs=require('fs');const m=fs.readFileSync('faq.html','utf8').match(/const i18n = \{[\s\S]*?^    \};/m);new Function(m[0]+';return i18n;')();console.log('OK')"
   ```

### Componentes compartidos
- Navbar y footer viven en `components.js` y se inyectan en `<header id="site-navbar">` y `<footer id="site-footer">` de cada página
- Si hay que traducir algo en el navbar/footer, **usar el patrón inline** `lang==='es' ? '...' : '...'` para evitar tocar las 10 páginas con claves nuevas

### Visual (preferencias del cliente)
- **Cards de info en blanco** sobre fondos pastel/gradientes. Nunca poner gradientes detrás de texto/info.
- Acento único: `text-tef-blue` (`#00B0BD`)
- Tipografía: una sola familia (Indra Sans), jerarquía por peso + tamaño, no por color
- Ver `docs/DESIGN_SYSTEM.md` para tokens completos (colores, tipografía, spacing)

### Cache
Si después de un push los cambios no se ven en producción:
- **Hard refresh en el navegador** (Cmd+Shift+R / Ctrl+Shift+R)
- Railway tarda ~1 min en redeplegar tras `git push origin main`
- El Caddyfile ya manda `no-store` en HTML/JS/CSS/JSON, así que solo debería haber cache stale del navegador la primera vez tras un cambio importante

### Deploy
- Push a `main` → Railway redeploya automáticamente
- **No hay entorno staging** — los cambios van directos a producción

### Imágenes y assets
- Las imágenes de fondo grandes (`its-on-all-of-us.jpg` ~2MB) están en `images/sections/`
- Iconos y branding en `images/brand/`
- Vídeos de hero en `images/hero/`
- Ver `docs/IMAGE-SPECS.md` para specs de exportación que pasamos al equipo de marca de Indra

---

## Hitos completados (orden cronológico inverso)

### 2026-05-27 — Contenido oficial Playbook + FAQ
- Cliente envió 4 PDFs (versiones ES/EN del Playbook y FAQ del Leadership Self-Diagnosis)
- Re-escritos textualmente ambos archivos para coincidir con el contenido oficial Korn Ferry/Indra
- 3 actitudes traducidas al ES ("DAMOS LO MEJOR DE NOSOTROS", etc.)
- 6 skills del Modelo con nombres en ES ("Foco en el Cliente", "Innovación Digital"…) y subtítulos italic
- Mapping table Korn Ferry traducido al ES

### 2026-05-22 — Auditoría i18n completa
Cliente reportó que la versión EN seguía con texto en español. Auditoría sistemática + correcciones:
- `components.js` (navbar+footer compartido): "Líder Indra" → "Indra Leader", "Autodiagnóstico" → "Self-Assessment", aria "Menú" → "Menu"
- `index.html`: título "La Comunidad de Líderes de Indra", 3 popups completos del bloque HOW, "Cerrar", "Vídeo · Próximamente"
- `lider-indra.html`: 3 botones "Más información" → "More info", 3 popups completos
- `modelo.html`: hero strip, "Capítulo · 0X / 03" → "Chapter · 0X / 03", "Siguiente"
- `agenda.html`: tabs "Día · 0X", "3 días". **Bug crítico**: `d1_hours/d2_hours/d3_hours` eran strings sueltos (no `{es,en}`) → renderizaban literalmente la clave en EN
- `faq.html`: cabeceras de tabla
- `nadia.html`: aria-label "Cerrar" → "Close"
- Caddyfile: ampliado `no-store` a JS/CSS/JSON (problema: `components.js` se cacheaba y los cambios no se veían)
- Placeholder de vídeo del home oculto con `hidden` (cliente aún no ha enviado el vídeo)

### 2026-05-19 — URLs limpias
- `accelerateimpact.es/journey.html` → 301 → `accelerateimpact.es/journey`
- Caddy `try_files` + redirect regex
- Todos los `href` internos en HTML/JS y canonicals actualizados

### 2026-05-14 — Deploy a Railway con dominio custom
- Migración GitHub Pages → Railway con Caddy custom
- Configuración CSP para que Alpine.js funcione (necesita `unsafe-eval`)
- Dominio `accelerateimpact.es` conectado
- Favicon SVG + OG/Twitter meta tags en las 10 páginas
- Bug fixed: páginas servían HTML cacheado viejo tras deploys → `no-store`

### 2026-05-13 — Reorganización de assets
- 16 archivos no usados eliminados
- Carpetas categorizadas: `images/brand/`, `images/sections/`, `images/hero/`, `images/people/`...
- Refs en HTML/JS actualizadas

### Anteriores
- Setup completo de páginas, animaciones GSAP, cards 3/2, hero video ping-pong
- Fuente Indra Sans convertida OTF → WOFF2 con fontTools
- Login OTP por email
- Stack cards sticky en home, popups, View Transitions

---

## Decisiones técnicas notables

| Decisión | Razón |
|---|---|
| Estático sin framework | Cliente quería deploy simple, sin maintenance backend, contenido casi inmutable durante el programa |
| Tailwind CDN (no build) | Velocidad de iteración, sin pipeline de assets |
| Alpine.js para i18n | Suficiente para conmutar `es`/`en` sin framework reactivo completo |
| i18n inline por página | Cada página autocontenida, deploy más simple que un i18n centralizado JSON |
| Caddy en Railway (no Vercel/Netlify) | Control de CSP, soporte de Range para video ping-pong, stack ya configurado |
| Fuente WOFF2 self-hosted | La OTF original no tenía hinting web, se convirtió con fontTools |
| `no-store` para HTML/JS/CSS | Bug recurrente: navegador cacheaba versiones viejas post-deploy |
| URLs limpias sin `.html` | SEO + estética en barra de direcciones |
| `font-feature-settings: normal` global | Cliente quería la 'a' double-story de marca; sin esto OpenType activa `ss01` por defecto |

---

## Pendiente / próximas iteraciones

- **Vídeo del home**: placeholder actualmente oculto con `hidden` en `index.html` línea ~745. Cuando llegue el vídeo, quitar la clase `hidden` y sustituir el div placeholder por un `<video>` con poster
- Iteraciones de copy según feedback continuo de Reyes Minaya

---

## Cómo retomar el proyecto en una nueva sesión

1. **Lee este documento primero** para tener el contexto
2. Lee `docs/DESIGN_SYSTEM.md` si vas a tocar UI
3. Lee `docs/IMAGE-SPECS.md` si vas a manejar assets gráficos
4. Echa un vistazo a los últimos 5-10 commits (`git log --oneline | head -10`) para ver el estado más reciente
5. Para cambios pequeños: edita el HTML directamente, valida JS si toca el bloque i18n, commit + push
6. Para cambios grandes: planifica con TodoWrite, delega exploración masiva a subagentes Sonnet
7. **Tras cambios significativos: actualiza este documento** (sección "Hitos completados" + "Pendiente")
