"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const beneficios = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    titulo: "Precio Más Bajo Garantizado",
    descripcion:
      "Si encuentras el mismo paquete todo incluido a mejor precio en otro lugar, lo igualamos. Tu presupuesto es nuestra prioridad.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.77 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9A16 16 0 0 0 15 15.91l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    titulo: "Asesor Personal 7 Días",
    descripcion:
      "Un asesor real te atiende de lunes a domingo. Sin chatbots ni filas de espera. Atención humana y personalizada para tu viaje.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    titulo: "Sin Cargos Ocultos",
    descripcion:
      "El precio que te cotizamos es el precio que pagas. Impuestos, cargos y servicios incluidos desde el primer presupuesto.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    titulo: "+5,000 Viajeros Felices",
    descripcion:
      "Miles de familias y parejas han confiado en nosotros para sus vacaciones. Su satisfacción es nuestra mejor carta de presentación.",
  },
];

export default function Beneficios() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.from(".beneficios-header", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".beneficios-header", start: "top 85%", once: true },
      });

      gsap.from(".beneficio-item", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".beneficios-grid", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="beneficios-header text-center mb-16">
          <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">
            Por Qué Elegirnos
          </p>
          <h2
            className="font-display font-bold text-cream leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            La Agencia que Trabaja<br />
            <span className="text-coral">Para Ti</span>
          </h2>
        </div>

        <div className="beneficios-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
          {beneficios.map((item, i) => (
            <div key={i} className="beneficio-item flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-coral/10 border border-coral/20 flex items-center justify-center text-coral mb-5">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-cream text-lg mb-3 leading-snug">
                {item.titulo}
              </h3>
              <p className="font-body text-cream-dim text-sm leading-relaxed">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
