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
      if (reducedMotion) return;

      // Entrance animation on load — NOT scroll-linked to avoid blank hero
      gsap
        .timeline()
        .from(".hero-headline", { yPercent: 20, opacity: 0, duration: 0.9, ease: "power3.out" })
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" }, "-=0.4");

      // Pin section on desktop (no scrub — just scroll-over effect)
      if (window.matchMedia("(min-width: 1024px)").matches) {
        ScrollTrigger.create({
          trigger: "#inicio",
          start: "top top",
          end: "+=80%",
          pin: true,
          pinSpacing: true,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* Skip link for accessibility */}
      <a
        href="#destinos"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-coral text-cream px-4 py-2 rounded-md font-body text-sm"
      >
        Saltar sección hero
      </a>

      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#E0F9FC] via-bg to-bg pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative blur orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(2,132,199,0.10) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Eyebrow */}
        <p className="hero-sub inline-flex items-center gap-3 text-teal text-xs font-body font-medium uppercase tracking-widest mb-8">
          <span className="w-10 h-px bg-teal" aria-hidden="true" />
          Agencia de viajes todo incluido · México
          <span className="w-10 h-px bg-teal" aria-hidden="true" />
        </p>

        {/* H1 */}
        <h1
          className="hero-headline font-display font-extrabold text-cream leading-none tracking-tight mb-7"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Los Mejores<br />
          <span className="text-coral">Resorts All Inclusive</span>
          <br />
          en México
        </h1>

        {/* Subheadline */}
        <p className="hero-sub font-body text-cream-dim text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Cancún, Puerto Vallarta, Los Cabos y más — al precio más bajo garantizado.
          Más de 5,000 familias y parejas nos eligen cada año.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="tel:+528002288377"
            className="flex items-center gap-3 bg-coral hover:bg-coral-hover text-cream font-body font-medium text-lg px-8 py-4 rounded-md transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            <PhoneIcon />
            Llama y Reserva · 800 228 8377
          </a>
          <a
            href="#destinos"
            className="flex items-center gap-2 border border-border hover:border-cream/50 text-cream font-body font-medium text-base px-6 py-4 rounded-md transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            Ver Destinos
            <ChevronDownIcon />
          </a>
        </div>

        {/* Trust bar */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 text-muted text-sm font-body">
          <span className="flex items-center gap-2">
            <StarIcon />
            +5,000 viajeros satisfechos
          </span>
          <span className="hidden sm:block w-px h-4 bg-border" aria-hidden="true" />
          <span>Precio más bajo garantizado</span>
          <span className="hidden sm:block w-px h-4 bg-border" aria-hidden="true" />
          <span>Atención 7 días a la semana</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs font-body animate-bounce"
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
