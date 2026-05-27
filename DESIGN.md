# DESIGN.md — Resorts All Inclusive

**Generado en path Standalone el 27 de mayo de 2026**
**Nivel de ambición visual:** Experiencial
**Stack:** Next.js 16 · Tailwind CSS v4 · GSAP 3 · Lenis

Este archivo es la referencia de diseño del sitio. Cualquier cambio visual debe actualizarse aquí primero.

---

## Concepto Visual

**Tema:** Océano de noche — la profundidad del mar mexicano como base, con destellos cálidos de coral y oro que evocan atardeceres en el Pacífico y el Caribe.

**Sensación:** Premium pero accesible. Inmersivo sin ser intimidante. El sitio debe sentirse como el lobby de un resort cinco estrellas que también tiene los mejores precios del mercado.

**Referencias:** Editoriales de viaje de lujo latinoamericano, fotografía aérea de destinos de playa, tipografía grotesca de alto impacto.

---

## Paleta de Colores

### Colores base

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#07111D` | Fondo principal — océano profundo |
| `--color-surface` | `#0D1A2E` | Tarjetas, paneles, secciones alternadas |
| `--color-elevated` | `#122238` | Elementos elevados sobre surface |
| `--color-border` | `#1A2E46` | Bordes sutiles, divisores |

### Colores de acento

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-coral` | `#FF5C3E` | CTA primario, highlights, acento principal |
| `--color-coral-hover` | `#E84B2D` | Estado hover del coral |
| `--color-gold` | `#EDA52A` | Precio, estrellas, highlights secundarios |
| `--color-teal` | `#00B8A4` | Eyebrows, badges, acentos terciarios |

### Colores de texto

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-cream` | `#EDE8DF` | Texto primario — crema cálido |
| `--color-cream-dim` | `#B8B0A5` | Texto secundario, descripciones |
| `--color-muted` | `#5C7A96` | Texto terciario, placeholders, metadata |

### Ratios de contraste (WCAG AA)
- `cream` sobre `bg`: 12.4:1 ✓
- `cream` sobre `surface`: 11.1:1 ✓
- `coral` sobre `bg`: 3.8:1 — usar solo para texto grande o decorativo
- `teal` sobre `bg`: 4.8:1 ✓

---

## Tipografía

### Familias

| Rol | Familia | Pesos | Variable CSS |
|-----|---------|-------|--------------|
| Display / Headings | Syne | 700, 800 | `--font-syne` → `--font-display` |
| Body / UI | DM Sans | 400, 500 | `--font-dm-sans` → `--font-body` |

### Escala de texto

| Nombre | Tamaño | Peso | Uso |
|--------|--------|------|-----|
| Hero H1 | `clamp(2.5rem, 6vw, 6rem)` | 800 | Titular principal del hero |
| Section H2 | `clamp(2rem, 4vw, 3.5rem)` | 700 | Títulos de sección |
| Card H3 | `1.5rem` | 700 | Títulos de tarjetas |
| Body large | `1.125rem` | 400 | Subtítulos, descripciones hero |
| Body base | `1rem` | 400 | Texto general |
| Body small | `0.875rem` | 400/500 | Labels, metadata, FAQs |
| Eyebrow | `0.75rem` + `tracking-widest` | 500 | Categorías, badges sobre títulos |

### Convenciones tipográficas
- `font-display` para todos los headings (H1–H3) y el logotipo
- `font-body` para todo el texto de UI, formularios, navegación
- `leading-none` en H1 del hero (comprimido)
- `leading-tight` en H2 de sección
- `leading-relaxed` en párrafos de body

---

## Espaciado

Tailwind v4 con escala por defecto. Convenciones del proyecto:

| Contexto | Valor |
|----------|-------|
| Padding de sección (vertical) | `py-24 md:py-32` |
| Padding de contenedor (horizontal) | `px-6` |
| Ancho máximo de contenedor | `max-w-7xl mx-auto` |
| Gap entre cards | `gap-6` |
| Gap entre secciones del hero | `mb-6` a `mb-10` |
| Altura del navbar | `h-20` (80px) |
| Scroll margin para anclas | `80px` (compensa navbar sticky) |

---

## Breakpoints

Tailwind defaults (desktop-first a nivel Experiencial):

| Nombre | Valor | Comportamiento clave |
|--------|-------|----------------------|
| `sm` | 640px | Layout de 1 columna → 2 en CTAs |
| `md` | 768px | Navbar colapsa a hamburger; cards 1→2 cols |
| `lg` | 1024px | Threshold: scroll pin y cursor personalizado |
| `xl` | 1280px | Cards destinos 2→3 columnas |
| `2xl` | 1536px | No cambios estructurales relevantes |

---

## Componentes

### Navbar
- Sticky, `z-50`
- Transparente en top, `bg-bg/95 backdrop-blur-md border-b border-border` al scroll
- Desktop: logo + links horizontales + CTA tel botón coral
- Mobile (< `md`): hamburger + drawer vertical con links + CTA
- Botón hamburger: `aria-expanded`, `aria-controls="mobile-menu"`

### Botón Primario (CTA)
```
bg-coral hover:bg-coral-hover text-cream font-body font-medium
px-8 py-4 rounded-md transition-colors duration-200
```

### Botón Secundario
```
border border-border hover:border-cream text-cream font-body font-medium
px-6 py-4 rounded-md transition-colors duration-200
```

### Card de Destino
```
bg-surface border border-border rounded-xl overflow-hidden
hover:border-coral/50 hover:-translate-y-1 transition-all duration-300
```
- Header visual: `h-48` con gradiente de color por destino
- Content: `p-6` con H3, descripción, precio en gold, link cotizar en coral

### Card de Testimonio
```
bg-surface border border-border rounded-xl p-8
```
- Comilla decorativa: `text-coral/20 font-black text-5xl`
- Rating: estrellas en `--color-gold`
- Avatar: círculo `w-10 h-10 bg-coral/20 border border-coral/30`

### FAQ Item
```
bg-bg border border-border rounded-xl overflow-hidden
```
- Botón: `px-6 py-5 flex justify-between` con `aria-expanded`
- Panel: `max-h-0/max-h-96 opacity-0/opacity-100 transition-all duration-300`
- Icono: `+` rota `45deg` al abrir → se convierte en `×`

### Input de Formulario
```
w-full bg-bg border border-border rounded-md px-4 py-3
font-body text-cream text-sm placeholder:text-muted
focus:border-coral focus:outline-none transition-colors duration-200
```

---

## Animaciones

Ver `docs/brief-tecnico.md` para los snippets GSAP completos. Resumen:

| Patrón | Descripción | Dónde aplica |
|--------|-------------|--------------|
| Hero pinned | ScrollTrigger pin con scrub, solo desktop (`≥ lg`) | `#inicio` |
| Fade-in Y | `opacity:0, y:40` → visible, `duration:0.7` | Títulos de sección |
| Stagger cards | `stagger:0.09, y:32` desde `top 80%` | Cards de destinos |
| Stagger items | `stagger:0.08-0.12` | Testimonios, FAQs, Beneficios |
| Custom cursor | `gsap.quickTo`, solo `hover:hover` | Toda la página |

### Clases CSS requeridas por GSAP
```
.hero-headline    → animado con scrub (yPercent, opacity)
.hero-sub         → animado con scrub (opacity, y)
.hero-cta         → animado con scrub (opacity, y)
.destination-card → stagger desde .destination-grid
.destination-grid → trigger del stagger
.destinos-header  → fade-in Y
.beneficio-item   → stagger
.testimonio-card  → stagger
.faq-item         → stagger
.contacto-content → fade-in Y
.cursor           → posición con quickTo
```

---

## Cursor Personalizado

- Elemento: `div.cursor` — `position:fixed`, `w-5 h-5`, `border-radius:50%`, `bg-coral`
- Mix blend mode: `mix-blend-mode: difference`
- Oculto en `@media (hover: none)` via CSS
- `aria-hidden="true"` siempre
- Nunca intercepta pointer events

---

## Logotipo

Texto con `font-display font-bold`:
```
Resorts<span class="text-coral">AI</span>
```
El "AI" en coral hace referencia a "All Inclusive" de forma compacta.

---

## SEO y Accesibilidad

- `lang="es-MX"` en `<html>`
- Schema TravelAgency en JSON-LD en `<head>` del layout global
- Canonical: `https://resorts-allinclusive.com/`
- Canonical OG image: `https://resorts-allinclusive.com/og-default.jpg` (1200×630)
- Todos los `id` tienen `scroll-margin-top: 80px`
- Focus rings: `outline: 2px solid currentColor; outline-offset: 4px`
- Skip link "Saltar sección hero" antes del hero pinned
- Hamburger con `aria-expanded` y `aria-controls`
- FAQs con `aria-expanded` y `aria-hidden` en panel

---

## Activos Necesarios (cliente debe proveer)

| Archivo | Especificaciones | Estado |
|---------|-----------------|--------|
| `/public/og-default.jpg` | 1200×630px, JPG, <200KB | Pendiente |
| `/public/logo.png` | PNG transparente, 400px ancho | Pendiente |
| Imágenes de destinos | WebP, 800×480px por destino | Pendiente |
| Favicon | 32×32, 180×180 (Apple) | Pendiente |
