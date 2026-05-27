# Estado del Sitio — Resorts All Inclusive

---

## Estado actual

**Última actualización:** 27 de mayo de 2026
**Versión del sitio:** 1.0.0
**URL de producción:** https://resorts-allinclusive.com
**Repo:** https://github.com/jorgeruiz/Resorts-All-Inclusive

---

## Construcción inicial

**Fecha:** 27 de mayo de 2026
**Path de construcción:** Standalone (sin DESIGN.md previo — generado en esta sesión)
**Stack:** Next.js 16.2.6 · React 19 · Tailwind CSS v4 · GSAP 3 · Lenis

**Features implementadas:**
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

**Pendientes antes del lanzamiento:**
- [ ] Configurar `RESEND_API_KEY` en Vercel Environment Variables
- [ ] Verificar email `contacto@resorts-allinclusive.com` en Resend
- [ ] Agregar OG image real (`/public/og-default.jpg`, 1200×630px)
- [ ] Agregar favicon (`/public/favicon.ico`, `/public/apple-touch-icon.png`)
- [ ] Agregar logo PNG/SVG del cliente (actualmente logotipo es texto)
- [ ] Crear páginas `/aviso-de-privacidad` y `/terminos-y-condiciones`
- [ ] Reemplazar gradientes CSS en tarjetas de destinos por fotos reales (WebP, ~150KB)
- [ ] Completar campos `sameAs` del schema JSON-LD con redes sociales del cliente
- [ ] Conectar dominio `resorts-allinclusive.com` en Vercel
- [ ] Configurar Google Analytics 4 (agregar `next/script` con GA4 measurement ID)
- [ ] Verificar propiedad en Google Search Console

---

## Historial de cambios

_Sin cambios registrados aún. Primera sesión de construcción completada el 27 de mayo de 2026._
