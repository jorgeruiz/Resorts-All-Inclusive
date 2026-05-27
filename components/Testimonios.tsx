"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonios = [
  {
    nombre: "María González",
    origen: "Ciudad de México",
    destino: "Cancún",
    iniciales: "MG",
    rating: 5,
    texto:
      "Encontré el mejor precio para Cancún después de semanas buscando. El servicio fue impecable desde la primera llamada. Regresamos todos los veranos con Resorts All Inclusive.",
  },
  {
    nombre: "Roberto Martínez",
    origen: "Guadalajara",
    destino: "Los Cabos",
    iniciales: "RM",
    rating: 5,
    texto:
      "Nunca imaginé que ir a Los Cabos pudiera ser tan accesible. Los asesores me explicaron todo con paciencia y encontraron el paquete perfecto para mi luna de miel.",
  },
  {
    nombre: "Ana López",
    origen: "Monterrey",
    destino: "Puerto Vallarta",
    iniciales: "AL",
    rating: 5,
    texto:
      "La atención personalizada hace toda la diferencia frente a una plataforma en línea. Ya estoy reservando mi tercer viaje con ellos. Totalmente recomendados.",
  },
];

export default function Testimonios() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.from(".testimonios-header", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testimonios-header", start: "top 85%", once: true },
      });

      gsap.from(".testimonio-card", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testimonios-grid", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="testimonios" ref={sectionRef} className="py-24 md:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="testimonios-header text-center mb-16">
          <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">
            Nuestros Viajeros
          </p>
          <h2
            className="font-display font-bold text-cream leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Lo que Dicen<br />
            <span className="text-coral">Nuestros Clientes</span>
          </h2>
        </div>

        <div className="testimonios-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonios.map((t, i) => (
            <blockquote
              key={i}
              className="testimonio-card relative bg-surface border border-border rounded-xl p-8 flex flex-col"
            >
              {/* Decorative quote */}
              <span
                className="absolute top-5 right-6 font-display font-black text-[80px] leading-none text-coral/10 select-none pointer-events-none"
                aria-hidden="true"
              >
                "
              </span>

              {/* Stars */}
              <div
                className="flex gap-1 mb-5"
                aria-label={`Calificación: ${t.rating} de 5 estrellas`}
              >
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" fill="#EDA52A" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                ))}
              </div>

              {/* Quote text */}
              <p className="font-body text-cream-dim text-sm leading-relaxed italic flex-1 mb-6">
                "{t.texto}"
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3 mt-auto">
                <div
                  className="w-10 h-10 rounded-full bg-coral/15 border border-coral/25 flex items-center justify-center text-coral font-display font-bold text-sm shrink-0"
                  aria-hidden="true"
                >
                  {t.iniciales}
                </div>
                <div>
                  <cite className="font-body font-medium text-cream text-sm not-italic block">
                    {t.nombre}
                  </cite>
                  <p className="font-body text-muted text-xs">
                    {t.origen} · Viajó a {t.destino}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
