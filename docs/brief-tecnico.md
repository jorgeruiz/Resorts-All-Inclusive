# Brief Técnico — Resorts All Inclusive

**Generado por Constructor el 27 de mayo de 2026**
**Cliente:** Alejandra Peraza | **Stack:** Next.js + Vercel | **Ambición visual:** Experiencial

Este documento describe las decisiones técnicas de implementación: librerías de motion, animaciones, arquitectura frontend y stack recomendado. Fue generado automáticamente a partir del Brief de Diseño del cliente.

---

# Technical Implementation Brief — Resorts All Inclusive

**Project architecture**

Single-page Next.js 15 App Router project. All content renders on one scrollable route (`/`). Anchor-based navigation links to section IDs: `#inicio`, `#destinos`, `#testimonios`, `#faqs`, `#contacto`. No client-side routing between pages required; `next/navigation` router is not used for section navigation.

Shared root layout handles the sticky navigation bar and footer. Typography via `next/font/google`: one display family (high-impact grotesque — confirm exact face from design screens) and one body family (readable sans-serif). Maximum two font families total. Tailwind CSS for all utility classes; no CSS Modules.

Third-party integrations: phone CTA (`tel:8002288377`) rendered as a prominent button — no booking API, no scheduling system. Lead capture via a contact form that submits to a Next.js API route (`/api/contact`) and dispatches email via Resend. No e-commerce, no calendar integration. Google Analytics 4 via `next/script` with `strategy="afterInteractive"`.

---

**Dependencies to install**

```bash
npm install gsap@^3.12 @gsap/react lenis@^1.1 react-hook-form@^7.0 @hookform/resolvers zod resend
```

- `gsap@^3.12` + `@gsap/react`: primary animation engine; ScrollTrigger plugin for pinned sections and scrub-linked animations; Observer plugin for section snapping behavior
- `lenis@^1.1`: smooth scroll — required at `experiencial` level; integrate with ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)`
- `react-hook-form@^7.0` + `@hookform/resolvers` + `zod`: lead capture form with client-side validation
- `resend`: transactional email from the `/api/contact` API route

Do NOT install:
- `framer-motion` — GSAP is the chosen library; mixing both introduces bundle bloat and API conflicts
- `@react-three/fiber` or `@react-three/drei` — no 3D elements present in the design scope; parallax and scroll storytelling are achievable with ScrollTrigger alone
- `three` — same reason; explicitly out of scope unless design screens produced by Stitch/Claude Design contain literal 3D geometry
- Any cursor tracking library — implement the custom cursor as a native `useRef` + GSAP `quickTo` solution (no additional package)

---

**Motion specifications**

Library: GSAP 3.x with ScrollTrigger and Observer plugins. All animations operate exclusively on `transform` (`x`, `y`, `xPercent`, `yPercent`, `scale`) and `opacity`. No layout-triggering properties (`width`, `height`, `margin`, `padding`, `top`, `left`) are animated at any time.

Lenis initialization (root layout, client component):
```tsx
useEffect(() => {
  const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return () => { lenis.destroy(); gsap.ticker.remove() }
}, [])
```

**Hero section** — full-viewport scroll-pinned entrance with scrub:
```ts
gsap.timeline({
  scrollTrigger: { trigger: "#inicio", start: "top top", end: "+=120%", scrub: 1, pin: true }
})
.from(".hero-headline", { yPercent: 30, opacity: 0, duration: 1, ease: "power3.out" })
.from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.4")
```

**Section entrance** (destinations, testimonials, FAQs):
```ts
gsap.from(element, {
  opacity: 0, y: 40,
  duration: 0.7, ease: "power3.out",
  scrollTrigger: { trigger: element, start: "top 85%", once: true }
})
```

**Destination cards stagger:**
```ts
gsap.from(".destination-card", {
  opacity: 0, y: 32, stagger: 0.09, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: ".destination-grid", start: "top 80%", once: true }
})
```

**Custom cursor** (desktop only, `hover: hover` media query):
```ts
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.35, ease: "power3" })
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.35, ease: "power3" })
window.addEventListener("mousemove", (e) => { xTo(e.clientX); yTo(e.clientY) })
```

**`prefers-reduced-motion` handling** — apply before any GSAP code runs:
```ts
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.timeScale(0)
  lenis?.destroy() // revert to native scroll
}
```

Do NOT animate: navigation bar links, phone CTA button text, form labels, form error messages, footer links. Maximum four distinct animation patterns site-wide. GSAP markers must be `markers: true` in development and `markers: false` in production — use an environment variable check.

---

**Breakpoints and responsive strategy**

Desktop-first at `experiencial` level. The immersive scroll experience targets desktop viewports. Mobile receives a dignified simplified layout.

Breakpoint scale (Tailwind defaults):
- `2xl`: 1536px
- `xl`: 1280px
- `lg`: 1024px — threshold for disabling scroll-pinned sections and custom cursor
- `md`: 768px — threshold for collapsing navigation to hamburger
- `sm`: 640px

Layout transitions:
- Navigation: horizontal full menu above `md`, slide-in drawer below `md`
- Destination cards: 3 columns at `xl`, 2 at `md`, 1 at `sm`
- Hero: full-viewport centered layout at all breakpoints; font scales from `clamp(2.5rem, 6vw, 6rem)`

Animation behavior below `lg`:
- Disable all `ScrollTrigger.pin()` sections — replace with standard scroll entrance fades
- Disable custom cursor entirely (`pointer-events` on cursor element set to `none`, hidden via CSS `@media (hover: none)`)
- Disable Lenis on touch devices (`navigator.maxTouchPoints > 0` check before initialization)
- Section entrances retain opacity + `y` fade but reduce duration to `0.4s`

---

**Accessibility requirements**

Target: WCAG AA. Focus rings must always be visible: `outline: 2px solid currentColor; outline-offset: 4px` — never `outline: none` without a replacement.

Keyboard navigation requirements:
- Hamburger menu toggle: `aria-expanded`, `aria-controls` pointing to nav panel ID
- FAQ accordion: `<button>` elements with `aria-expanded`; panel has `aria-hidden` when collapsed
- Contact form: all inputs associated to labels via `htmlFor`/`id`; errors linked via `aria-describedby`
- Pinned scroll sections: add a visible "Skip section" link before each `ScrollTrigger.pin()` container with `aria-label`

`prefers-reduced-motion`: implemented via the GSAP `globalTimeline.timeScale(0)` pattern specified above. This disables all GSAP motion globally. Lenis is destroyed and native scroll restored. CSS transitions are scoped to `200ms ease-out` on `color`, `background-color`, `opacity` only.

Custom cursor: `aria-hidden="true"` on the cursor DOM element; never intercept pointer events.

---

**Performance budget**

- Lighthouse Performance desktop: 78+
- Lighthouse Performance mobile: 65+
- LCP: under 3.0s — the hero section image is the LCP element; give it `priority` prop and preload it
- CLS: under 0.05 — every `next/image` must have explicit `width` and `height` props; `fill` only inside a parent with known fixed dimensions and `position: relative`
- JS budget (animation stack): GSAP core + ScrollTrigger + Observer ≈ 65KB gzip; Lenis ≈ 10KB gzip; total 75KB acceptable at this level

Image strategy:
- Hero background: `<Image priority sizes="100vw" />` with explicit aspect-ratio container; WebP via Next.js automatic optimization
- Destination card thumbnails: `loading="lazy"` (default), `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"`
- Testimonial avatars: 80×80px explicit dimensions, `loading="lazy"`
- No raw `<img>` tags anywhere — all images through `next/image`

Font strategy: `next/font/google` with `display: "swap"` for both families. Preload the display family bold weight explicitly. No more than two `font-weight` variants loaded per family.