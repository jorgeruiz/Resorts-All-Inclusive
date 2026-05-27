# Especificación Técnica del Sitio — Resorts All Inclusive

**Última actualización:** 27 de mayo de 2026
**Construido por:** Claude Code / Click Society

---

## Stack

**Framework:** Next.js 16.2.6 (App Router, Turbopack)
**Node:** v24.x
**Package manager:** npm
**Deploy:** Vercel

**Dependencias principales:**

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| next | 16.2.6 | Framework principal |
| react | 19.2.4 | UI |
| tailwindcss | ^4 | Estilos (CSS-based config, no tailwind.config.js) |
| gsap | ^3.12 | Animaciones — ScrollTrigger, scrub, stagger |
| @gsap/react | latest | Hook `useGSAP` para React |
| lenis | ^1.1 | Smooth scroll (solo desktop) |
| react-hook-form | ^7 | Formulario de contacto |
| @hookform/resolvers | latest | Integración zod con react-hook-form |
| zod | latest | Validación de esquemas |
| resend | latest | Email transaccional desde /api/contact |

---

## Design System

Ver `DESIGN.md` en la raíz para la especificación completa. Resumen:

**Colores primarios:**
- Background: `#07111D` — océano profundo
- Surface: `#0D1A2E` — tarjetas y paneles
- Coral: `#FF5C3E` — CTA principal, acento primario
- Gold: `#EDA52A` — precio, estrellas, highlights
- Teal: `#00B8A4` — eyebrows, badges
- Cream: `#EDE8DF` — texto primario
- Border: `#1A2E46` — bordes sutiles

**Tipografías:**
- Headings: `Syne` 700/800 (variable CSS: `--font-syne` → `--font-display`)
- Body: `DM Sans` 400/500 (variable CSS: `--font-dm-sans` → `--font-body`)
- Cargadas con `next/font/google`, `display: "swap"`

**Breakpoints:**
- Mobile: < 768px (hamburger, 1 columna)
- Tablet: 768px–1024px
- Desktop: ≥ 1024px (scroll pin, cursor personalizado activo)

---

## Componentes clave

| Componente | Ruta | Descripción |
|-----------|------|-------------|
| Layout raíz | `app/layout.tsx` | Fuentes, metadata SEO, JSON-LD schema, SmoothScroll, CustomCursor |
| Smooth Scroll | `components/SmoothScroll.tsx` | Client — Lenis + GSAP ticker (solo desktop, no touch) |
| Custom Cursor | `components/CustomCursor.tsx` | Client — cursor coral con GSAP quickTo (solo hover:hover) |
| Navbar | `components/Navbar.tsx` | Client — sticky, transparent→solid al scroll, hamburger mobile |
| Hero | `components/Hero.tsx` | Client — GSAP ScrollTrigger pin (desktop) + scrub entrance |
| Destinos | `components/Destinos.tsx` | Client — 6 tarjetas de destino con stagger GSAP |
| Beneficios | `components/Beneficios.tsx` | Client — 4 pilares de confianza con iconos SVG inline |
| Testimonios | `components/Testimonios.tsx` | Client — 3 testimonials con stagger GSAP |
| FAQs | `components/FAQs.tsx` | Client — acordeón con aria-expanded, 6 preguntas |
| Contacto | `components/Contacto.tsx` | Client — form react-hook-form+zod, teléfono prominente |
| Footer | `components/Footer.tsx` | Server — navegación, contacto, legal links |
| API Contact | `app/api/contact/route.ts` | API route — valida con zod, envía email vía Resend |

---

## Estructura de páginas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` | Single-page — todas las secciones |
| `/api/contact` | `app/api/contact/route.ts` | POST — lead capture, email vía Resend |
| `/sitemap.xml` | `app/sitemap.ts` | Sitemap generado automáticamente |
| `/robots.txt` | `app/robots.ts` | Robots.txt generado automáticamente |

---

## Decisiones de arquitectura

- **Single-page con anclas:** Toda la navegación es anchor-based (`#inicio`, `#destinos`, `#testimonios`, `#faqs`, `#contacto`). No se usa `next/navigation` para routing de secciones.
- **Tailwind v4 (CSS-based config):** No existe `tailwind.config.js`. Todos los tokens del design system se definen en `app/globals.css` con `@theme`. Las clases Tailwind se generan a partir de `--color-*` y `--font-*` variables.
- **GSAP solo en client components:** Todos los componentes con animaciones tienen `"use client"`. GSAP y ScrollTrigger se registran dentro de cada componente.
- **Lenis solo desktop:** Se verifica `navigator.maxTouchPoints > 0` antes de inicializar Lenis. En touch, se usa scroll nativo.
- **Resend lazy init:** `new Resend(...)` se instancia dentro del handler POST, no a nivel de módulo, para evitar error de build cuando `RESEND_API_KEY` no está disponible en build time.
- **`prefers-reduced-motion`:** `gsap.globalTimeline.timeScale(0)` desactiva todas las animaciones globalmente. CSS transitions limitadas a `color`, `background-color`, `opacity` en 200ms.

---

## Variables de entorno requeridas

| Variable | Descripción | Requerida en |
|----------|-------------|-------------|
| `RESEND_API_KEY` | API key de Resend | Producción |

Agregar en Vercel Dashboard → Settings → Environment Variables.

---

## Notas para mantenimiento

- El copy de las secciones está embebido directamente en cada componente (no en archivos separados). Para cambiar textos, editar el array de datos en el componente correspondiente.
- Las tarjetas de destinos en `Destinos.tsx` usan gradientes CSS, no imágenes. Cuando el cliente provea imágenes, reemplazar la div de gradiente por `<Image>` de next/image con `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"`.
- El logo "ResortsAI" es texto. Si el cliente provee un logo SVG/PNG, reemplazar en `Navbar.tsx` y `Footer.tsx`.
- El formulario de Contacto envía a `contacto@resorts-allinclusive.com`. Verificar este email en Resend antes del lanzamiento.
- El OG image (`/og-default.jpg`) es un placeholder. El cliente debe proveer la imagen final (1200×630px, JPG, <200KB).
