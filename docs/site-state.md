# Estado del Sitio — Resorts All Inclusive

---

## Estado actual

**Última actualización:** 1 de junio de 2026
**Versión del sitio:** 1.2.0
**URL de producción:** https://resorts-allinclusive.com
**Repo:** https://github.com/jorgeruiz/Resorts-All-Inclusive

---

## Construcción inicial

**Fecha:** 27 de mayo de 2026
**Path de construcción:** Standalone (sin DESIGN.md previo — generado en esta sesión)
**Stack inicial planeado:** Next.js 16.2.6 · React 19 · Tailwind CSS v4 · GSAP 3 · Lenis

> ⚠️ Stack final difiere del planeado — ver sección "Historial de cambios".

**Features implementadas en v1.0.0:**
- [x] Design system completo (`DESIGN.md`) — paleta, tipografía, tokens, componentes
- [x] Layout raíz con fuentes Syne + DM Sans, metadata SEO completa, schema TravelAgency JSON-LD
- [x] Smooth scroll con Lenis (solo desktop, no touch)
- [x] Cursor personalizado coral con GSAP quickTo (solo hover:hover)
- [x] Navbar sticky — transparente en top, sólido al scroll, hamburger mobile con drawer
- [x] Hero full-viewport con GSAP ScrollTrigger pin (desktop) y scrub entrance
- [x] Sección Destinos — 6 tarjetas (Cancún, PV, Los Cabos, Mazatlán, Cozumel, Huatulco) con stagger GSAP
- [x] Sección Beneficios — 4 pilares de confianza con iconos SVG
- [x] Sección Testimonios — 3 testimonios con stagger GSAP
- [x] Sección FAQs — acordeón accesible (aria-expanded) con 6 preguntas
- [x] Sección Contacto — formulario react-hook-form + zod + teléfono prominente
- [x] Footer — navegación, horarios, links legales
- [x] API route `/api/contact` — validación zod + email transaccional vía Resend
- [x] `sitemap.xml` generado automáticamente (`app/sitemap.ts`)
- [x] `robots.txt` generado automáticamente (`app/robots.ts`)
- [x] `prefers-reduced-motion` — GSAP desactivado globalmente
- [x] Accesibilidad WCAG AA — focus rings, aria-expanded, aria-hidden, aria-label, aria-describedby
- [x] Build de producción exitoso (Next.js Turbopack)

---

## Pendientes de entrega por el cliente

Estos items no dependen de desarrollo — requieren activos o configuraciones del cliente:

- [ ] Configurar `RESEND_API_KEY` en Vercel Environment Variables
- [ ] Verificar email `contacto@resorts-allinclusive.com` en Resend
- [ ] Agregar OG image real (`/public/og-default.jpg`, 1200×630px, <200KB)
- [ ] Agregar favicon (`/public/favicon.ico`, `/public/apple-touch-icon.png`)
- [ ] Agregar logo PNG/SVG del cliente (actualmente logotipo es texto "ResortsAI")
- [ ] Crear páginas `/aviso-de-privacidad` y `/terminos-y-condiciones`
- [ ] Completar campos `sameAs` del schema JSON-LD con redes sociales del cliente
- [ ] Confirmar GA4 Measurement ID (actualmente GTM-KPXN2KB2 + Google Ads AW-18195520666 activos; GA4 pendiente)
- [ ] Verificar propiedad en Google Search Console

---

## Historial de cambios

### v1.2.0 — 31 de mayo de 2026
**Tracking, modales de llamada, carrusel de hoteles, hero video**

- [x] **GTM integrado** — GTM-KPXN2KB2 en `<head>` (script inline) y `<body>` (noscript iframe)
- [x] **Google Ads integrado** — AW-18195520666 con tracking de conversión de llamada
- [x] **CallModal** — modal contextual de llamada que se abre desde cualquier sección con mensaje personalizado por destino/hotel. Usa custom events (`window.dispatchEvent`) — sin Context ni prop drilling
- [x] **FloatingCallButtons** — burbuja fija desktop (bottom-right) + barra fija mobile (bottom full-width), siempre visibles en pantalla
- [x] **HotelesCarrusel** — marquee CSS infinito con ~30 resorts en 2 filas (izquierda/derecha). Gradiente de fade en edges con `maskImage`. Items triplicados para evitar salto en pantallas anchas
- [x] **Hero v3 — scroll storytelling con video de fondo**
  - Arquitectura: video `position: sticky` + capa de contenido con `marginTop: -100vh`
  - Phase 1: "Agencia de viajes todo incluido" (pantalla completa, video limpio)
  - Phase 2: "Los Mejores Resorts All Inclusive en México" (video con blur 5px, fade in de contenido completo + CTAs)
  - Phase 3: Sección Destinos integrada en el Hero (el video se desvanece al entrar las tarjetas)
  - `prefers-reduced-motion`: fallback estático sin animaciones
- [x] **Destinos absorbidos por Hero.tsx** — `Destinos.tsx` eliminado como componente separado; los destinos son ahora Phase 3 del scroll storytelling del Hero
- [x] **Imágenes reales en tarjetas de destinos** — reemplazados los gradientes CSS por fotos WebP reales (`/cancun.webp`, `/puerto-vallarta.webp`, etc.)
- [x] **suppressHydrationWarning** en `<html>` y `<body>` para compatibilidad con scripts GTM en React 19
- [x] **Sección Paquetes** — 4 cards (Riu, Xcaret, Krystal, Dreams) con precios en MXN, badges, contador de reservas animado (social proof), botón de llamada contextual por paquete

### v1.1.0 — 29 de mayo de 2026
**Tema claro → oscuro, fix animaciones GSAP, hero video inicial**

- [x] Cambio de tema claro (oceánico) a tema oscuro (`#07111D`)
- [x] Fix hidratación GSAP en React 19 (uso de `useGSAP` de `@gsap/react`)
- [x] Hero video — primera versión con fondo de video y animaciones de scroll

### v1.0.0 — 27 de mayo de 2026
**Construcción inicial**

Ver sección "Construcción inicial" arriba.

---

## Stack final (v1.2.0)

| Tecnología | Planeado | Final | Motivo del cambio |
|-----------|---------|-------|------------------|
| Animaciones | GSAP | **Framer Motion** | GSAP no tiene `useMotionValue`/`useTransform` nativos de React; mezclar ambos creó conflictos |
| Smooth scroll | Lenis | **CSS `scroll-behavior`** | Lenis intercepta el scroll nativo y rompe `getBoundingClientRect` de Framer Motion |
| Fuente display | Syne | **Raleway** | Mejor legibilidad en español; pesos 700/800/900 más completos |
| Tailwind | v4 con config JS | **v4 CSS-based** | Tailwind v4 no usa `tailwind.config.js` — tokens en `globals.css` con `@theme` |

**`SmoothScroll.tsx`** es un placeholder que devuelve `null`. Se conservó para no romper el import en `layout.tsx`.
