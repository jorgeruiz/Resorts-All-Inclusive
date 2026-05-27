"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Hide full content immediately (before any paint)
      gsap.set(".hero-full", { opacity: 0, y: 40 });
      gsap.set(".hero-end-overlay", { opacity: 0 });

      if (reducedMotion) {
        gsap.set(".hero-full", { opacity: 1, y: 0 });
        gsap.set(".hero-initial", { opacity: 0 });
        return;
      }

      // Scroll-driven narrative timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#inicio",
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1.5,
        },
      });

      // Phase 1 — initial title fades out (0–30%)
      tl.to(".hero-initial", { opacity: 0, y: -60, duration: 1, ease: "power2.in" })

        // Phase 2 — overlay darkens slightly, full content appears (20–65%)
        .to(".hero-video-overlay", { opacity: 0.6, duration: 1 }, 0.2)
        .to(".hero-full", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 0.35)

        // Phase 3 — video fades out, solid transition overlay fades in (65–100%)
        .to(".hero-video-container", { opacity: 0, duration: 1.2 }, 1.8)
        .to(".hero-end-overlay", { opacity: 1, duration: 1 }, 1.9);
    },
    { scope: containerRef }
  );

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-black"
      aria-label="Hero"
    >
      {/* Skip link */}
      <a
        href="#destinos"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0284C7] text-white px-4 py-2 rounded-md font-body text-sm"
      >
        Saltar sección hero
      </a>

      {/* Video background */}
      <div className="hero-video-container absolute inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay — controlled by GSAP */}
        <div
          className="hero-video-overlay absolute inset-0 bg-black"
          style={{ opacity: 0.45 }}
        />
      </div>

      {/* Solid overlay for end-of-hero transition to next section */}
      <div
        className="hero-end-overlay absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: "#F0FBFF" }}
        aria-hidden="true"
      />

      {/* ── Phase 1: Initial title ── */}
      <div className="hero-initial absolute inset-0 z-20 flex items-center justify-center px-6 text-center pointer-events-none">
        <h1
          className="font-display font-extrabold text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
        >
          Agencia de viajes<br />
          <span style={{ color: "#06B6D4" }}>todo incluido</span>
        </h1>
      </div>

      {/* ── Phase 2: Full content ── */}
      <div className="hero-full absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pt-20 text-center">
        <p
          className="inline-flex items-center gap-3 text-xs font-body font-medium uppercase tracking-widest mb-6"
          style={{ color: "#06B6D4" }}
        >
          <span className="w-10 h-px bg-current" aria-hidden="true" />
          Agencia de viajes todo incluido · México
          <span className="w-10 h-px bg-current" aria-hidden="true" />
        </p>

        <p
          className="font-display font-extrabold text-white leading-none tracking-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)" }}
        >
          Los Mejores<br />
          <span style={{ color: "#06B6D4" }}>Resorts All Inclusive</span>
          <br />
          en México
        </p>

        <p className="font-body text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Cancún, Puerto Vallarta, Los Cabos y más — al precio más bajo garantizado.
          Más de 5,000 familias y parejas nos eligen cada año.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="tel:+528002288377"
            className="flex items-center gap-3 text-white font-body font-medium text-lg px-8 py-4 rounded-md transition-opacity hover:opacity-90 duration-200 w-full sm:w-auto justify-center"
            style={{ backgroundColor: "#0284C7" }}
          >
            <PhoneIcon />
            Llama y Reserva · 800 228 8377
          </a>
          <a
            href="#destinos"
            className="flex items-center gap-2 border border-white/30 hover:border-white text-white font-body font-medium text-base px-6 py-4 rounded-md transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            Ver Destinos
            <ChevronDownIcon />
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 text-white/50 text-sm font-body">
          <span className="flex items-center gap-2">
            <StarIcon />
            +5,000 viajeros satisfechos
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
          <span>Precio más bajo garantizado</span>
          <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
          <span>Atención 7 días a la semana</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs font-body animate-bounce z-30"
        aria-hidden="true"
      >
        <span className="uppercase tracking-widest text-[10px]">Scroll</span>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#EDA52A" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
}
