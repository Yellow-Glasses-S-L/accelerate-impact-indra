# Especificaciones de imágenes — Accelerate Impact

---

## Resumen general

El site Accelerate Impact utiliza **27 assets visuales activos** entre los 8 archivos HTML analizados: 3 vídeos MP4, 2 animaciones GIF, 5 imágenes de módulo, 5 fotografías de facilitadores, 2 imágenes editoriales de Nadia, 1 imagen full-bleed de "El Líder", 1 imagen iceberg, y 4 imágenes de stock de Unsplash que son placeholders temporales. El estilo visual es oscuro y cinematográfico: predominan los fondos azul marino profundo (`#002532`) con overlays semitransparentes, tipografía Indra Sans, y un tratamiento editorial de mezcla de luz sobre vídeo. Los formatos predominantes son MP4 (vídeo), PNG y JPG (imágenes fijas).

---

## Cómo está organizado este documento

Este informe recoge las especificaciones de **todas** las imágenes y vídeos que utiliza actualmente el site, con la información necesaria para que el equipo de marca de Indra pueda producir o seleccionar los assets definitivos.

**Estructura del documento:**

1. **Por página** — sección detallada para cada una de las 8 páginas del site (Home, Líder Indra, Journey, Nadia, Autodiagnóstico, Agenda, Modelo, Contacto). Para cada asset se incluye: nombre del fichero, tipo (vídeo/imagen), aspect ratio, resolución mínima, comportamiento, tratamiento aplicado, overlays y notas específicas para el equipo de marca.
2. **Imágenes externas / placeholders a reemplazar** — listado de los 7 assets que actualmente son fotografías de stock de Unsplash y necesitan ser sustituidos por imágenes propias de Indra.
3. **Especificaciones técnicas globales** — formatos preferidos, color profile, compresión y consideraciones móvil/desktop que aplican a todos los assets.
4. **Tabla resumen** — visión rápida de todos los assets en una sola tabla.

---

> ## ⚠️ IMPORTANTE — Las dimensiones son orientativas
>
> Las **dimensiones y resoluciones** indicadas en este documento son las que actualmente se utilizan en el site. **No es estrictamente necesario que los assets entregados coincidan exactamente con estas medidas**: con que las imágenes que nos hagan llegar tengan **dimensiones similares** o un aspect ratio aproximado, ya nos sirven — desde el equipo técnico haremos el ajuste fino necesario.
>
> Lo que sí es importante es:
> - El **formato** (vídeo MP4, PNG con transparencia, JPG, etc.)
> - El **estilo visual** y el **tratamiento** descrito en cada caso (claro/oscuro, blanco y negro, color, contraste, etc.)
> - Que la **resolución sea suficiente** (mínimo 1920×1080 para vídeos y full-bleed; mínimo 1200 px en el lado más largo para imágenes secundarias)
>
> Las dimensiones exactas son una referencia, no un requisito.

---

## Por página

---

### Home (index.html)

#### Hero — Vídeo de fondo

- **Fichero:** `indra-wow.mp4`
- **Tipo:** Vídeo MP4
- **Aspect ratio:** 16/9 implícito (ocupa el 100% de la pantalla)
- **Resolución mínima recomendada:** 1920×1080 (Full HD)
- **Peso actual del fichero:** ~2,4 MB
- **Comportamiento:** Reproduce en bucle automático (sin sonido). Al terminar, se reproduce en sentido inverso, creando un efecto pingpong continuo.
- **Tratamiento aplicado:** opacidad al 65%, la imagen se recorta para llenar toda la pantalla sin deformarse, centrada horizontalmente y verticalmente. Encima lleva una capa oscura en degradado vertical (más oscura arriba y abajo, más transparente al centro).
- **Overlay:** degradado oscuro `rgba(2,9,20)` con opacidad del 35% arriba, 15% al centro, 35% abajo.
- **Notas para el equipo de marca:** Es el primer impacto visual del site. Debe ser un vídeo cinético, con movimiento sutil, que funcione bien al 65% de opacidad y con degradados oscuros encima. Idealmente planos aéreos, texturas tecnológicas o imágenes de personas en contextos de liderazgo y conexión global. El vídeo se reproducirá hacia adelante y luego hacia atrás en bucle.

---

#### Carrusel "La Comunidad de Líderes" — 4 imágenes de tarjeta (Why / How / What / Expect)

Estas cuatro imágenes son actualmente **placeholders de Unsplash** (ver sección de placeholders al final del documento). A continuación se describen sus especificaciones para que el equipo de marca produzca los assets definitivos.

- **Tipo:** Imagen fija JPG o PNG
- **Sección:** Carrusel horizontal de 4 tarjetas (Why · How · What · Expect)
- **Aspect ratio:** 32/27 (aproximadamente 1.18:1, casi cuadrado, ligeramente más ancho que alto)
- **Dimensiones aproximadas:** entre 300 px y 550 px de alto según pantalla (el ancho se calcula a partir del ratio 32/27)
- **Resolución mínima recomendada:** 1600×1350 px
- **Tratamiento aplicado:** La imagen se recorta para llenar el contenedor sin deformarse. Ligeramente rotada (entre −1,5° y +1,4°) para dar sensación editorial de foto apoyada sobre mesa.
- **Overlay:** Ninguno directo sobre la imagen. El fondo de la sección es azul muy pálido.
- **Notas para el equipo de marca:** Cuatro imágenes temáticas, una por bloque narrativo. Deben funcionar bien recortadas en formato casi cuadrado. Recomendamos fotografías de personas en acción o en diálogo, con composición central para que el recorte sea versátil.

---

### Líder Indra (lider-indra.html)

#### Hero — GIF de fondo

- **Fichero:** `journey-gif.gif`
- **Tipo:** GIF animado
- **Aspect ratio:** 16/9 implícito (ocupa el 100% de la pantalla)
- **Resolución mínima recomendada:** 1920×1080 o superior
- **Peso actual del fichero:** ~19,4 MB
- **Comportamiento:** Loop infinito, decorativo, sin controles de usuario.
- **Tratamiento aplicado:** Se escala ligeramente al 103% para evitar bordes blancos durante el movimiento. La imagen se recorta para llenar toda la pantalla sin deformarse. Encima hay dos capas de overlay oscuro.
- **Overlay:** Capa 1: degradado radial oscuro desde la esquina superior derecha (`#0A4A5A → #002532 → #001318`) con opacidad 82%. Capa 2: brillo azul sutil en la esquina superior izquierda (azul Indra al 18% de opacidad).
- **Alt:** Vacío (decorativo, `aria-hidden="true"`).
- **Notas para el equipo de marca:** Este GIF se usa tanto en esta página como en Journey. Es el fondo del hero principal. Debe tolerar un oscurecimiento muy intenso (82% de opacidad) y seguir transmitiendo movimiento y energía. Recomendamos reemplazarlo por un vídeo MP4 en el futuro para reducir peso.

---

#### Sección full-bleed — Imagen de "El Líder Indra"

- **Fichero:** `its-on-us.png`
- **Tipo:** Imagen PNG
- **Sección:** Transición editorial entre el hero y la sección de tres compromisos
- **Aspect ratio:** No definido explícitamente (ocupa el 100% del ancho, altura natural de la imagen)
- **Peso actual del fichero:** ~1,1 MB
- **Tratamiento aplicado:** Ocupa el ancho completo de la página sin recorte. Sin overlay. Sin mezcla de colores.
- **Alt:** `"El Líder Indra"` (imagen con significado visual)
- **Notas para el equipo de marca:** Imagen editorial de impacto, a sangre completa. Idealmente formato apaisado (más ancho que alto) con composición que funcione a cualquier ancho de pantalla. Podría ser una ilustración, composición gráfica o fotografía de gran formato relacionada con el concepto "It's On Us".

---

### Journey (journey.html)

#### Hero — GIF de fondo

- **Fichero:** `journey-gif.gif`
- **Tipo:** GIF animado (mismo fichero que en lider-indra.html)
- **Tratamiento aplicado:** Idéntico al descrito en la página Líder Indra (escala 103%, sin deformación, overlay oscuro al 82%, brillo azul sutil).
- **Notas para el equipo de marca:** Ver especificaciones completas en la sección de Líder Indra.

---

#### Carrusel de pasos del Journey — 3 imágenes de tarjeta (Paso 01 / 02 / 03)

Estas tres imágenes son actualmente **placeholders de Unsplash** (ver sección de placeholders).

- **Tipo:** Imagen fija JPG o PNG
- **Sección:** Carrusel horizontal de 3 tarjetas numeradas
- **Aspect ratio:** 32/27 (aproximadamente 1.18:1, casi cuadrado)
- **Dimensiones aproximadas:** entre 300 px y 550 px de alto según pantalla
- **Resolución mínima recomendada:** 1600×1350 px
- **Tratamiento aplicado:** La imagen se recorta para llenar el contenedor sin deformarse. Ligeramente rotada (entre −1,5° y +1,4°) para dar efecto editorial. Sombra lateral derecha sutil.
- **Overlay:** Ninguno.
- **Notas para el equipo de marca:** Tres imágenes que ilustran las tres fases del Journey del participante. Mismas especificaciones técnicas que las del carrusel de Home. La composición central es importante para que el recorte funcione bien.

---

### Nadia (nadia.html)

#### Hero — Vídeo de fondo

- **Fichero:** `ezgif-3a0c36e364ef0aa5.mp4`
- **Tipo:** Vídeo MP4
- **Aspect ratio:** 16/9 implícito (ocupa el 100% de la pantalla)
- **Resolución mínima recomendada:** 1920×1080 (Full HD)
- **Peso actual del fichero:** ~786 KB
- **Comportamiento:** Reproduce automáticamente sin sonido. Al terminar, se reproduce hacia atrás (efecto boomerang). El vídeo forma parte del fondo del hero de Nadia.
- **Tratamiento aplicado:** opacidad al 35%. La imagen se recorta para llenar toda la pantalla sin deformarse, centrada. El color del vídeo se mezcla con el fondo como si fuera luz proyectada (modo "luminosity"), lo que desatura los colores del vídeo y lo integra con el azul marino del fondo.
- **Overlay:** Brillo azul suave en zona central (azul Indra al 14% de opacidad). El fondo del hero es azul marino profundo (`#002532` con variante radial).
- **Alt:** Vacío (decorativo, `aria-hidden="true"`).
- **Notas para el equipo de marca:** Este vídeo debe funcionar correctamente al 35% de opacidad y con el modo de mezcla de luminosidad. Recomendamos contenido abstracto, texturas de luz, partículas, o imágenes de conversación e interacción humana. Al mezclarse con el fondo azul marino, los colores cálidos o los blancos resultan más visibles que los azules. Evitar vídeos con mucho texto o elementos gráficos que no sobrevivan al oscurecimiento.

---

#### Transición editorial "¿Cuándo hablar con Nadia?" — Imagen full-bleed

- **Fichero:** `nadia-cuando.png`
- **Tipo:** Imagen PNG
- **Sección:** Separación visual entre la sección "¿Cuándo hablar con Nadia?" y "¿Cómo hablar con Nadia?"
- **Aspect ratio:** 21/9 (panorámico, formato cinemascope)
- **Dimensiones aproximadas:** ancho 100% de la pantalla, alto máximo 480 px
- **Resolución mínima recomendada:** 2520×1080 px (o cualquier imagen con ratio 21:9 de al menos 1920 px de ancho)
- **Peso actual del fichero:** ~1,7 MB
- **Tratamiento aplicado:** La imagen se recorta para llenar el contenedor sin deformarse. El punto de enfoque vertical está al 30% desde arriba (es decir, el recorte favorece la parte superior de la imagen).
- **Overlay:** Ninguno directo.
- **Alt:** Vacío (decorativa, `aria-hidden="true"`).
- **Notas para el equipo de marca:** Imagen panorámica de gran impacto. Formato muy apaisado (21:9). Al recortarse, se mostrará la zona superior de la imagen, así que el punto de interés debe situarse en el tercio superior. Podría ser una fotografía de ambiente, una composición abstracta relacionada con la conversación o la reflexión.

---

#### Acento visual "¿Cómo hablar con Nadia?" — Imagen lateral

- **Fichero:** `nadia-como.png`
- **Tipo:** Imagen PNG
- **Sección:** Columna derecha de la sección "¿Cómo hablar con Nadia?" (solo visible en pantallas de escritorio)
- **Dimensiones exactas en pantalla:** 320 px de ancho × 420 px de alto
- **Resolución mínima recomendada:** 640×840 px (doble densidad de píxeles)
- **Tratamiento aplicado:** La imagen se recorta para llenar el contenedor sin deformarse. Se aplica el modo de mezcla "pantalla" (los píxeles oscuros se vuelven transparentes, los claros se mantienen), lo que permite que los elementos claros de la imagen floten sobre el fondo oscuro azul marino. El punto de enfoque está centrado.
- **Overlay:** Ninguno directo, pero el fondo de la sección es azul marino muy oscuro (`#002532`).
- **Alt:** Vacío (decorativa, `aria-hidden="true"`).
- **Notas para el equipo de marca:** Esta imagen debe diseñarse específicamente para funcionar con el modo "pantalla" sobre fondo muy oscuro. Esto significa que los fondos negros de la imagen desaparecerán, y solo los elementos claros (blancos, azules claros, celestes) serán visibles. Recomendamos una composición con fondo completamente negro y el motivo principal en tonos claros. Podría ser una figura, una silueta, partículas o un elemento gráfico relacionado con Nadia.

---

### Autodiagnóstico (autodiagnostico.html)

#### Hero — Vídeo de fondo

- **Fichero:** `ezgif-3ad9e1bfcaf70125.mp4`
- **Tipo:** Vídeo MP4
- **Aspect ratio:** 16/9 implícito (ocupa el 100% de la pantalla)
- **Resolución mínima recomendada:** 1920×1080 (Full HD)
- **Peso actual del fichero:** ~544 KB
- **Comportamiento:** Reproduce automáticamente sin sonido. Al terminar, se reproduce hacia atrás (efecto boomerang).
- **Tratamiento aplicado:** Se escala ligeramente al 103% para evitar bordes durante el movimiento. La imagen se recorta para llenar toda la pantalla sin deformarse, centrada. Encima hay una capa oscura y un brillo azul sutil.
- **Overlay:** Capa 1: degradado radial oscuro `#0A4A5A → #002532 → #001318` con opacidad 82%. Capa 2: brillo azul en la parte superior derecha (azul Indra al 18% de opacidad).
- **Alt:** Vacío (decorativo, `aria-hidden="true"`).
- **Notas para el equipo de marca:** Mismo comportamiento que el vídeo hero de Nadia. Debe funcionar bien oscurecido al 82%. Recomendamos contenido relacionado con introspección, reflexión, liderazgo o datos/métricas, ya que esta página trata el autodiagnóstico.

---

#### Sección Iceberg — Imagen cinématica de fondo

- **Fichero:** `iceberg.jpg`
- **Tipo:** Imagen JPG
- **Sección:** Fondo de la sección "Lo que se ve. Y lo que no se ve." (el modelo Iceberg de liderazgo)
- **Dimensiones del contenedor:** Altura mínima del 70% del alto de la pantalla (aproximadamente 700–800 px en pantalla Full HD)
- **Resolución mínima recomendada:** 1920×1080 px
- **Peso actual del fichero:** ~1,5 MB
- **Tratamiento aplicado:** Se escala ligeramente al 105% para evitar bordes. La imagen se recorta para llenar toda la sección sin deformarse, centrada. Encima lleva un overlay gradiente oscuro progresivo y un brillo azul.
- **Overlay:** Degradado vertical lineal: muy oscuro arriba (`rgba(2,9,20,0.45)`), más oscuro al 60% (`rgba(2,9,20,0.65)`), casi opaco abajo (`rgba(2,9,20,0.92)`). Brillo radial azul centrado (azul Indra al 12%).
- **Alt:** Vacío (decorativa, `aria-hidden="true"`).
- **Notas para el equipo de marca:** La imagen debe funcionar bien con un oscurecimiento progresivo muy intenso en la parte inferior (casi completamente negro). El área inferior es donde aparece el texto, por lo que no debe haber elementos importantes en esa zona. El motivo principal debe situarse en el tercio superior o central. La metáfora del iceberg (algo visible sobre la superficie y mucho más debajo) es el concepto que inspira la imagen.

---

#### Tarjetas de módulos de evaluación — 3 imágenes (Competencias / Drivers / Traits)

- **Ficheros:** `autodiag-m1.png`, `autodiag-m2.png`, `autodiag-m6.png`
- **Tipo:** Imagen PNG
- **Sección:** Tres tarjetas de módulo en cuadrícula (módulo 1, 2 y 3 del autodiagnóstico)
- **Aspect ratio:** 4/3 (horizontal, clásico)
- **Dimensiones aproximadas:** aproximadamente 400–600 px de ancho según pantalla; la altura se calcula con ratio 4:3
- **Resolución mínima recomendada:** 800×600 px por imagen (mínimo 1600×1200 px para pantallas de alta densidad)
- **Peso actual:** ~1,7–1,9 MB cada una
- **Tratamiento aplicado:** La imagen se recorta para llenar el contenedor sin deformarse. Sin overlay. Sin mezcla de colores. La imagen ocupa la mitad superior de cada tarjeta.
- **Alt:** Vacío (decorativas).
- **Notas para el equipo de marca:** Tres imágenes distintas, una por módulo del autodiagnóstico: "Lo que haces" (Competencias), "Lo que te mueve" (Drivers) y "Quién eres" (Traits). Deberían ser visualmente diferenciadas entre sí pero coherentes en estilo. Recomendamos fotografías de personas, gestos, comportamientos o metáforas visuales relacionadas con cada dimensión del liderazgo. El formato 4:3 con recorte central permite bastante flexibilidad de composición.

  > **Nota:** Existen en el repositorio también `autodiag-m3.png` y `autodiag-m4.png` (~1,8 MB cada una) que no están referenciadas en el HTML actual. Pueden ser versiones alternativas o descartadas.

---

### Agenda (agenda.html)

#### Hero — Sin imagen

La página Agenda no tiene imagen o vídeo en el hero. El fondo es el color sólido azul marino de marca (`bg-paper-deep`, es decir `#002532`).

---

#### Fotografías de facilitadores — 5 imágenes (Retrato)

- **Ficheros:** `lucia-crespo.jpg`, `greg-orme.png`, `diego-guerrero.jpg`, `rafa-vazquez.jpg`, `amanda-carmo.jpg`, `javier-albares.png`
- **Tipo:** JPG y PNG
- **Sección:** Columna derecha de cada sesión de la agenda (los tres días), dentro de tarjetas de presentación del facilitador
- **Dimensiones en pantalla:** las tarjetas de facilitador son compactas (aproximadamente 44×44 px según el CSS base de `.fac-photo`). Sin embargo, para evitar pixelado se recomienda entregar a mayor resolución.
- **Resolución mínima recomendada:** 200×200 px (formato cuadrado o circular recortado al centro)
- **Tratamiento aplicado:** La imagen se recorta para llenar un contenedor cuadrado o circular sin deformarse.
- **Pesos actuales:**
  - `lucia-crespo.jpg`: ~29 KB
  - `greg-orme.png`: ~390 KB
  - `diego-guerrero.jpg`: ~12 KB
  - `rafa-vazquez.jpg`: ~28 KB
  - `amanda-carmo.jpg`: ~29 KB
  - `javier-albares.png`: ~491 KB
- **Alt:** Nombre completo del facilitador (accesible).
- **Notas para el equipo de marca:** Fotografías de perfil profesional. Fondo neutro o difuminado preferiblemente. Formato cuadrado entregado, ya que en pantalla se muestra en miniatura. La calidad actual de algunos ficheros (diego-guerrero.jpg con solo 12 KB) puede mejorar.

---

### Contacto (info.html)

No contiene ninguna imagen, vídeo ni fondo visual. Solo texto editorial sobre fondo claro.

---

### Modelo de Liderazgo (modelo.html)

No contiene imágenes, vídeos ni fondos visuales. La página es íntegramente tipográfica sobre fondos de color sólido de marca. Solo incluye el logotipo SVG de Accelerate Impact y el SVG de Yellow Glasses en el footer (vectoriales, no necesitan especificaciones de resolución).

---

## Imágenes externas / placeholders a reemplazar

Las siguientes imágenes están cargadas desde Unsplash (servicio externo de stock) y desde DiceBear (servicio de avatares generativos). Son **temporales** y deben ser reemplazadas por assets definitivos de Indra antes del lanzamiento.

### Imágenes de Unsplash — 4 imágenes (Home y Journey)

| URL de placeholder | Página | Sección |
|---|---|---|
| `photo-1502904550040-7534597429ae` (Unsplash) | Home | Carrusel — tarjeta "Why" |
| `photo-1491911923017-19f90d8d7f83` (Unsplash) | Home | Carrusel — tarjeta "How" |
| `photo-1712844470079-d9cc7ebd69a5` (Unsplash) | Home | Carrusel — tarjeta "What" |
| `photo-1584907600887-9732fa3647ac` (Unsplash) | Home | Carrusel — tarjeta "Expect" |
| `photo-1461896836934-ffe607ba8211` (Unsplash) | Journey | Carrusel — Paso 01 |
| `flagged/photo-1569744068983-6dfc2f27deb8` (Unsplash) | Journey | Carrusel — Paso 02 |
| `photo-1540575467063-178a50c2df87` (Unsplash) | Journey | Carrusel — Paso 03 |

**Especificaciones para los assets definitivos (carrusel Home y Journey):**
- Ratio: **32/27** (aproximadamente 1,18:1)
- Resolución mínima: **1600×1350 px**
- Formato entregado: JPG o PNG, posteriormente convertir a WebP
- Tratamiento: sin overlay, composición central (el recorte puede variar según pantalla)

### Avatares DiceBear — Facilitadores genéricos en Agenda

En `agenda.html` existen referencias a avatares generados dinámicamente por la API de DiceBear (iniciales sobre fondo azul claro). Estos corresponden a los facilitadores genéricos del sistema de datos (Diego Guerrero, Ana Torres, Marcos Vidal, Elena Navarro, Rafael Vázquez, Amanda Carmo, Javier Alvares) que están definidos en el JavaScript de la página pero **no se muestran en el HTML visible** del schedule actual (donde se usan los ficheros locales reales). Son datos de fallback para cuando no haya foto disponible.

---

## Activos en el repositorio no referenciados en HTML

Los siguientes archivos existen en el directorio del proyecto pero no están activos en ninguna página:

| Fichero | Tipo | Peso | Observación |
|---|---|---|---|
| `lider.gif` | GIF | 15,9 MB | Versión alternativa del hero GIF; sustituido por `journey-gif.gif` |
| `hero-bg.mp4` | MP4 | 26,6 MB | Versión anterior del vídeo hero; sustituido por `indra-wow.mp4` |
| `ezgif-3195557a68e97965.webp` | WebP animado | 3,0 MB | No referenciado en ningún HTML |
| `ezgif-595c62c70ea0e119.webp` | WebP animado | 1,1 MB | No referenciado en ningún HTML |
| `autodiag-m3.png` | PNG | 1,8 MB | Módulo de autodiagnóstico alternativo, no usado en HTML actual |
| `autodiag-m4.png` | PNG | 1,8 MB | Módulo de autodiagnóstico alternativo, no usado en HTML actual |

---

## Especificaciones técnicas globales

- **Formatos preferidos:** WebP (con fallback JPG/PNG para navegadores antiguos). Para imágenes con transparencia: WebP con alpha (fallback PNG). Para vídeos: MP4 (H.264).
- **Compresión:** Imágenes JPG entre calidad 80–90. PNG con compresión máxima sin pérdida. WebP entre calidad 75–85. Los ficheros actuales de algunos módulos (1,7–1,9 MB por PNG) pueden optimizarse significativamente.
- **Perfil de color:** sRGB (obligatorio para correcta visualización en navegadores web).
- **Versiones móviles:** El site es responsive. Las imágenes del carrusel se muestran a 44 vw de alto en móvil (máximo 240 px). Los héroes de vídeo ocupan el 100 vh en todos los tamaños. Se recomienda proporcionar las imágenes en el tamaño máximo especificado y dejar que el navegador redimensione.
- **Densidad de píxeles:** Los valores de resolución mínima indicados arriban son para pantallas estándar (1x). Para pantallas Retina (2x), doblar las dimensiones.
- **Animaciones / GIFs:** Se recomienda convertir los GIFs grandes (`journey-gif.gif`, 19,4 MB) a vídeo MP4 o WebM para mejorar el rendimiento de carga.

---

## Tabla resumen

| Fichero | Página(s) | Sección | Ratio | Resolución mínima recomendada | Estado |
|---|---|---|---|---|---|
| `indra-wow.mp4` | Home | Hero (vídeo de fondo) | 16/9 | 1920×1080 | Activo |
| `journey-gif.gif` | Líder Indra, Journey | Hero (GIF animado de fondo) | 16/9 | 1920×1080 | Activo |
| `its-on-us.png` | Líder Indra | Full-bleed entre hero y compromisos | Natural | Mínimo 1920 px de ancho | Activo |
| `ezgif-3a0c36e364ef0aa5.mp4` | Nadia | Hero (vídeo de fondo) | 16/9 | 1920×1080 | Activo |
| `nadia-cuando.png` | Nadia | Transición editorial panorámica | 21/9 | 2520×1080 | Activo |
| `nadia-como.png` | Nadia | Acento visual lateral (solo escritorio) | ~3/4 | 640×840 | Activo |
| `ezgif-3ad9e1bfcaf70125.mp4` | Autodiagnóstico | Hero (vídeo de fondo) | 16/9 | 1920×1080 | Activo |
| `iceberg.jpg` | Autodiagnóstico | Sección iceberg (fondo cinémático) | 16/9 | 1920×1080 | Activo |
| `autodiag-m1.png` | Autodiagnóstico | Tarjeta módulo "Lo que haces" | 4/3 | 800×600 | Activo |
| `autodiag-m2.png` | Autodiagnóstico | Tarjeta módulo "Lo que te mueve" | 4/3 | 800×600 | Activo |
| `autodiag-m6.png` | Autodiagnóstico | Tarjeta módulo "Quién eres" | 4/3 | 800×600 | Activo |
| `lucia-crespo.jpg` | Agenda | Foto facilitadora (Día 1) | 1/1 | 200×200 | Activo |
| `greg-orme.png` | Agenda | Foto facilitador (Días 1 y 2) | 1/1 | 200×200 | Activo |
| `diego-guerrero.jpg` | Agenda | Foto facilitador (Día 1) | 1/1 | 200×200 | Activo |
| `rafa-vazquez.jpg` | Agenda | Foto facilitador (Día 3) | 1/1 | 200×200 | Activo |
| `amanda-carmo.jpg` | Agenda | Foto facilitadora (Día 3) | 1/1 | 200×200 | Activo |
| `javier-albares.png` | Agenda | Foto facilitador (Día 3) | 1/1 | 200×200 | Activo |
| Unsplash `photo-1502904550040` | Home | Carrusel tarjeta "Why" | 32/27 | 1600×1350 | **Placeholder — reemplazar** |
| Unsplash `photo-1491911923017` | Home | Carrusel tarjeta "How" | 32/27 | 1600×1350 | **Placeholder — reemplazar** |
| Unsplash `photo-1712844470079` | Home | Carrusel tarjeta "What" | 32/27 | 1600×1350 | **Placeholder — reemplazar** |
| Unsplash `photo-1584907600887` | Home | Carrusel tarjeta "Expect" | 32/27 | 1600×1350 | **Placeholder — reemplazar** |
| Unsplash `photo-1461896836934` | Journey | Carrusel paso 01 | 32/27 | 1600×1350 | **Placeholder — reemplazar** |
| Unsplash `flagged/photo-1569744` | Journey | Carrusel paso 02 | 32/27 | 1600×1350 | **Placeholder — reemplazar** |
| Unsplash `photo-1540575467063` | Journey | Carrusel paso 03 | 32/27 | 1600×1350 | **Placeholder — reemplazar** |

---

*Documento generado el 30 de abril de 2026. Para dudas sobre el site, contactar con el equipo de Yellow Glasses.*
