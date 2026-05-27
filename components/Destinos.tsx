"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinos = [
  {
    id: "cancun",
    nombre: "Cancún",
    descripcion:
      "El destino todo incluido más popular de México. Playas de arena blanca, aguas turquesa y resorts de clase mundial en el Caribe mexicano.",
    gradiente: "from-[#005F8E] to-[#0099CC]",
    emoji: "🌊",
    keyword: "Paquetes todo incluido Cancún",
  },
  {
    id: "puerto-vallarta",
    nombre: "Puerto Vallarta",
    descripcion:
      "La Bahía de Banderas: joya del Pacífico. Naturaleza exuberante, malecon histórico y resorts con vista al océano.",
    gradiente: "from-[#1B5E3B] to-[#2E8B57]",
    emoji: "🏔️",
    keyword: "Paquetes todo incluido Puerto Vallarta",
  },
  {
    id: "los-cabos",
    nombre: "Los Cabos",
    descripcion:
      "Donde el desierto se encuentra con el mar. Lujo, privacidad y paisajes únicos en la punta de Baja California Sur.",
    gradiente: "from-[#7B3F00] to-[#C76B1A]",
    emoji: "🌵",
    keyword: "Paquetes todo incluido Los Cabos",
  },
  {
    id: "mazatlan",
    nombre: "Mazatlán",
    descripcion:
      "La Perla del Pacífico. Malecón más largo de América, playas extensas y el mejor marisco de México a precios accesibles.",
    gradiente: "from-[#4A1A6E] to-[#8B3DC8]",
    emoji: "🎭",
    keyword: "Hoteles baratos Mazatlán",
  },
  {
    id: "cozumel",
    nombre: "Cozumel",
    descripcion:
      "Paraíso del snorkeling y buceo. Arrecifes de coral espectaculares y aguas cristalinas en la isla más famosa del Caribe mexicano.",
    gradiente: "from-[#004D5E] to-[#008B9A]",
    emoji: "🐠",
    keyword: "Hoteles baratos Cozumel",
  },
  {
    id: "huatulco",
    nombre: "Huatulco",
    descripcion:
      "Nueve bahías paradisíacas en la costa oaxaqueña. El secreto mejor guardado del Pacífico mexicano: naturaleza virgen y playas privadas.",
    gradiente: "from-[#5C3317] to-[#8B5E3C]",
    emoji: "🌺",
    keyword: "Hoteles baratos Huatulco",
  },
];

export default function Destinos() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.from(".destinos-header", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".destinos-header", start: "top 85%", once: true },
      });

      gsap.from(".destination-card", {
        opacity: 0,
        y: 32,
        stagger: 0.09,
        duration: 0.6,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".destination-grid", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="destinos" ref={sectionRef} className="py-24 md:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="destinos-header text-center mb-16">
          <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">
            Nuestros Destinos
          </p>
          <h2
            className="font-display font-bold text-cream leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Paquetes Todo Incluido<br />
            <span className="text-coral">en los Mejores Destinos de México</span>
          </h2>
          <p className="font-body text-cream-dim text-lg max-w-2xl mx-auto leading-relaxed">
            Vuelo, hotel, alimentos y diversión — sin sorpresas ni cargos ocultos. Encuentra el paquete
            vacacional todo incluido que tu familia merece.
          </p>
        </div>

        {/* Grid */}
        <div className="destination-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {destinos.map((destino) => (
            <article
              key={destino.id}
              className="destination-card group bg-surface border border-border rounded-xl overflow-hidden hover:border-coral/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(2,132,199,0.12)]"
            >
              {/* Visual */}
              <div
                className={`h-44 bg-gradient-to-br ${destino.gradiente} relative flex items-center justify-center overflow-hidden`}
              >
                <span className="text-7xl opacity-60 select-none" role="img" aria-hidden="true">
                  {destino.emoji}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-cream text-2xl mb-2">{destino.nombre}</h3>
                <p className="font-body text-cream-dim text-sm leading-relaxed mb-5">
                  {destino.descripcion}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-muted text-xs font-body">{destino.keyword}</span>
                  <a
                    href="tel:+528002288377"
                    className="text-coral text-sm font-body font-medium hover:text-cream transition-colors duration-200 flex items-center gap-1"
                    aria-label={`Cotizar paquete todo incluido a ${destino.nombre}`}
                  >
                    Cotizar →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="font-body text-cream-dim text-sm mb-5">
            ¿No encuentras tu destino? Tenemos más opciones disponibles.
          </p>
          <a
            href="tel:+528002288377"
            className="inline-flex items-center gap-3 bg-coral hover:bg-coral-hover text-cream font-body font-medium text-base px-8 py-4 rounded-md transition-colors duration-200"
          >
            <PhoneIcon />
            Habla con un asesor · 800 228 8377
          </a>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
    </svg>
  );
}
