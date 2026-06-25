# Accelerate Impact — Design System

Sistema editorial-ejecutivo inspirado en la identidad Indra 2024+. Tipografía Inter (fallback de Indra Sans propietaria). Jerarquía por peso + tamaño, no por color. Un solo acento estratégico: **Indra Blue `#00B0BD`**.

---

## Tokens

### Colors

```js
tef:   { blue: '#00B0BD', dark: '#0B2739', light: '#E8F0FF' }
ink:   { DEFAULT: '#0F0F0F', soft: '#2A2A28', mute: '#6B6B66' }
paper: { DEFAULT: '#FAFAF7', warm: '#F3EFE8', deep: '#0B0B0B' }
```

**Uso:**
- `bg-paper` — fondo por defecto (off-white cálido, no blanco puro)
- `bg-paper.warm` — hover de cards, separadores sutiles
- `bg-paper.deep` — heroes oscuros, footer, sección Nadia (contraste)
- `text-ink` — cuerpo principal
- `text-ink.mute` — meta, subtítulos, placeholders
- `text-tef-blue` — hover de links, subrayado activo nav, CTA acento
- Nada de grays genéricos de Tailwind (`gray-500`, etc.) — usar siempre los tokens semánticos

### Typography

```js
sans:    ['Inter', 'sans-serif']      // body + display
display: ['Inter', 'sans-serif']      // alias para títulos (mismo font, distinta clase)
mono:    ['"IBM Plex Mono"', ...]     // meta labels, §01, fechas, tracking
```

**Escala:**

| Rol | Clase | Uso |
|---|---|---|
| Hero title | `font-light text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-[-0.02em]` | Solo 1 por página |
| Section title | `font-light text-3xl md:text-5xl leading-[1] tracking-[-0.01em]` | Secciones principales |
| Card title | `font-light text-2xl md:text-3xl leading-[1.05] tracking-tight` | Grid de exploración |
| Body | `text-sm md:text-base text-ink leading-relaxed` | Párrafos |
| Body meta | `text-[13px] text-ink-mute leading-relaxed` | Descripciones en cards |
| Meta label | `font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute` | §01, fechas, "EDICIÓN 2026" |
| Nav | `text-[13px] text-ink-mute hover:text-ink` | Links header |
| Lang toggle | `font-mono text-[11px] tracking-widest` | ES/EN |

**Italic como recurso:** usar `<em class="italic font-normal">palabra</em>` para crear un momento tipográfico dentro de títulos en light (ej: "Te damos la bienvenida a *Accelerate* Impact"). Solo 1 énfasis italic por título.

### Spacing

- Container: `max-w-7xl mx-auto px-6`
- Vertical rhythm: `py-14 md:py-20` heroes · `py-16 md:py-20` main · `space-y-16 md:space-y-20` entre secciones
- Grid principal: 12 columnas con `gap-6`

### Borders & radii

- **Hairline:** `border-ink/10` (light) · `border-paper/10` (dark). **Nunca** `border-gray-200`.
- Cards exploradoras: sin shadow, sin radius. Un único borde superior/izquierdo en el contenedor + `border-r border-b` en cada celda → rejilla unificada tipo tabla editorial.
- Botones: no cápsula. Links subrayados con `border-b border-ink/40 hover:border-tef-blue pb-1`.
- Solo queda `rounded-` puntual en: avatar circular del isotipo T, toggle buttons si aplica.

### Shadow

Prácticamente eliminado. En lugar de shadows, usamos:
- Hairline borders
- Cambio sutil de fondo en hover (`hover:bg-paper-warm`)
- Contraste directo entre secciones (paper ↔ paper.deep)

### Motion

Transitions cortas (150–300ms), ninguna animación llamativa.

```css
@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.reveal { animation: fadeUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.reveal-1 { animation-delay: 0.05s; }
.reveal-2 { animation-delay: 0.15s; }
.reveal-3 { animation-delay: 0.25s; }
```

Staggered reveal solo en el hero del home. No scroll-triggers ni parallax.

### Texture

Grain SVG sutil (`opacity: 0.06`, `mix-blend-mode: overlay`) en fondos oscuros para romper el flat-color. Clase `.grain` aplicable a cualquier sección.

---

## Components

### Isotipo Indra (T de 5 puntos)

SVG inline, 20×24 viewBox, relleno `#00B0BD`:

```html
<svg class="w-5 h-6" viewBox="0 0 20 24" fill="#00B0BD" aria-hidden="true">
  <circle cx="3" cy="3" r="2.5"/>
  <circle cx="10" cy="3" r="2.5"/>
  <circle cx="17" cy="3" r="2.5"/>
  <circle cx="10" cy="12" r="2.5"/>
  <circle cx="10" cy="21" r="2.5"/>
</svg>
```

### Header

- Fondo `bg-paper/90` + `backdrop-blur-md`, `border-b border-ink/10`
- Alto `h-16`
- Brand a la izquierda: isotipo + "Accelerate Impact" + micro-tag mono "by Indra · Universitas"
- Nav centro-derecha: links sin pill, con underline animado en azul Indra para página activa
- Toggle ES/EN a la derecha en mono, separado por `/`

### Footer

- Fondo `bg-paper-deep` + grain
- 3 filas:
  1. Brand grande + CTA "Escríbenos" subrayado
  2. 3 columnas de links (Partners · Explorar · El programa)
  3. Legal + logo "powered-by-YG" discreto (opacity 60%) + toggle ES/EN

### Section header pattern

```html
<div class="flex items-center gap-4 mb-10">
  <span class="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute">§ 01</span>
  <span class="w-12 h-px bg-ink/20"></span>
  <span class="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute">Título sección</span>
</div>
```

### Card grid (tabla editorial)

Rejilla continua con hairlines, no cards separadas:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-ink/10">
  <a class="group relative p-6 md:p-7 border-r border-b border-ink/10 flex flex-col min-h-[220px] hover:bg-paper-warm transition-colors">
    <span class="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute">01 / Label</span>
    <h3 class="font-sans font-light text-2xl md:text-3xl leading-[1.05] tracking-tight mt-8 mb-3">Título</h3>
    <p class="text-[13px] text-ink-mute leading-relaxed">Descripción breve.</p>
    <span class="absolute top-6 right-6 text-xl text-ink-mute group-hover:text-tef-blue group-hover:translate-x-1 transition-all">→</span>
  </a>
  ...
</div>
```

### Link arrow (CTA editorial)

```html
<a class="group inline-flex items-center gap-3 text-ink border-b border-ink/40 hover:border-tef-blue hover:text-tef-blue transition-colors pb-1">
  <span class="font-mono text-xs tracking-[0.18em] uppercase">Etiqueta</span>
  <span class="text-xl group-hover:translate-x-1 transition-transform">→</span>
</a>
```

Para fondos oscuros: `text-paper border-paper/40 hover:border-paper`.

### Contrast section (Nadia, CTA fuerte)

Fila completa `bg-paper-deep` con grain y grid 12-col: §label mono a la izquierda, título grande + body en el centro, link-arrow a la derecha.

---

## Iconografía

- Isotipo Indra: única identidad visual. No usar íconos decorativos en heroes ni cards.
- Cards de exploración: sin íconos, solo número editorial + título.
- Heroicons stroke-2 permitidos puntualmente en: tarjetas de contacto (mail/phone), facilitadores agenda, banner AI coach interior.
- Emojis: solo en las 4 cards internas de Nadia (🎯🔍💬🌱) como guiño humano.

---

## Voz tipográfica

- Títulos en **light** (300) siempre. La energía viene del tamaño + tracking, no del peso.
- **Nunca** `font-bold` / `font-extrabold` en títulos display. Reservado para CTAs y labels nav activos.
- Italic solo para énfasis puntual en títulos (*Accelerate*, *Tu*, *Your*).
- Meta labels siempre mono, UPPERCASE, tracking-[0.2em], text-[10px].

---

## Do / Don't

**DO**
- Jerarquía por size + weight light + italic, no por color
- Hairlines para separar, no cards con shadow
- Un único azul Indra como acento, usado con intención (hover, underline activo, subrayado CTA)
- Secciones numeradas §01, §02, §03 con rule line
- Espacio generoso; respirar antes que rellenar
- Contraste fuerte paper ↔ paper.deep para secciones clave

**DON'T**
- Gradientes de colores (morado, violeta, amarillo decorativo)
- Cards con bordes de colores brillantes o shadows pronunciadas
- Íconos decorativos en hero o cards principales
- Rounded-full en botones grandes (sí en toggles pequeños)
- Texto > 2xl en bold
- Tailwind `gray-*` genéricos — usar tokens `ink`/`paper`

---

## Stack técnico

- HTML estático (sin build step) — listo para SharePoint
- Tailwind CSS vía CDN. Config inline en cada página con los tokens.
- Alpine.js vía CDN (`defer`) para bilingüismo y tabs. `x-data` en `<html>` con lang persistido a `localStorage`.
- Google Fonts: `Inter` + `IBM Plex Mono`.
- **Pitfall crítico:** el `<script src="cdn.tailwindcss.com">` DEBE cargarse ANTES del bloque `tailwind.config = {...}`. Si se invierte, los tokens custom no se registran.

---

## Estado actual de implementación

- ✅ `index.html` — sistema aplicado al 100% (hero, grid, Nadia, peers, header, footer)
- 🟡 `modelo.html`, `journey.html`, `autodiagnostico.html`, `agenda.html`, `nadia.html`, `info.html` — todavía con sistema anterior (Inter + grays). Pendiente propagar.

---

## Activos visuales

- `powered-by-YG.svg` — logo YG discreto para fondos oscuros (usa rect blanco interno)
- `powered-by-YG-black.svg` — versión para fondos claros
- Isotipo Indra inline en header y footer

---

*Última actualización: 2026-04-20. Branding oficial del programa pendiente semana del 21. Esta IVC se sustituirá cuando llegue.*
