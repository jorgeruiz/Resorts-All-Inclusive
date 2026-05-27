"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const paquetes = [
  {
    id: "riu",
    hotel: "Hotel Riu",
    badge: "MÁS RESERVADO",
    badgeColor: "bg-coral text-white",
    precio: "$26,475",
    descripcion: "Resort todo incluido de nivel superior con acceso ilimitado a restaurantes, bares y entretenimiento.",
    amenidades: ["Restaurantes ilimitados", "Bares 24 hrs", "Actividades acuáticas", "Entretenimiento nocturno"],
    viendo: 7,
  },
  {
    id: "xcaret",
    hotel: "Hotel Xcaret",
    badge: "EXPERIENCIA ÚNICA",
    badgeColor: "bg-[#0891B2] text-white",
    precio: "$33,463",
    descripcion: "Sumérjase en la magia de la cultura mexicana con acceso a los parques Xcaret incluido en tu paquete.",
    amenidades: ["Acceso a parque Xcaret", "Xavage incluido", "Playa privada", "Shows nocturnos"],
    viendo: 4,
  },
  {
    id: "krystal",
    hotel: "Hotel Krystal",
    badge: "MEJOR PRECIO",
    badgeColor: "bg-gold text-white",
    precio: "$18,668",
    descripcion: "Excelente relación calidad-precio en una de las zonas hoteleras más exclusivas del Caribe mexicano.",
    amenidades: ["Todo incluido completo", "Alberca infinita", "Spa y gimnasio", "Wifi gratis"],
    viendo: 5,
  },
  {
    id: "dreams",
    hotel: "Dreams Resort",
    badge: "OFERTA ESPECIAL",
    badgeColor: "bg-emerald-600 text-white",
    precio: "$10,147",
    descripcion: "El precio más accesible del mercado sin sacrificar comodidad ni calidad. Ideal para primeros viajeros.",
    amenidades: ["Todo incluido básico", "Playa equipada", "Actividades diarias", "Traslados incluidos"],
    viendo: 9,
  },
];

// Urgency counter: simulates real-time bookings
function useReservationsCounter() {
  const [count, setCount] = useState(43);

  useEffect(() => {
    // Increment +1 every 2–4 minutes randomly
    const schedule = () => {
      const delay = (Math.random() * 2 + 2) * 60 * 1000; // 2–4 min
      return setTimeout(() => {
        setCount((c) => c + 1);
        scheduleRef.current = schedule();
      }, delay);
    };
    const scheduleRef = { current: schedule() };
    return () => clearTimeout(scheduleRef.current);
  }, []);

  return count;
}

// Per-card "viendo ahora" counter
function useViewingCounter(initial: number) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 8) + 2); // 2–9
    }, 15000 + Math.random() * 20000); // every 15–35s
    return () => clearInterval(interval);
  }, []);

  return count;
}

function PaqueteCard({ paquete }: { paquete: typeof paquetes[0] }) {
  const viendo = useViewingCounter(paquete.viendo);

  return (
    <article className="paquete-card relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-coral/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)] flex flex-col">
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`${paquete.badgeColor} text-[10px] font-body font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
          {paquete.badge}
        </span>
      </div>

      {/* "Viendo ahora" pill */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-body px-2 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
        {viendo} viendo ahora
      </div>

      {/* Card body */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-display font-bold text-cream text-2xl mt-6 mb-2">{paquete.hotel}</h3>
        <p className="font-body text-cream-dim text-sm leading-relaxed mb-5">{paquete.descripcion}</p>

        {/* Amenidades */}
        <ul className="flex flex-col gap-2 mb-6">
          {paquete.amenidades.map((a) => (
            <li key={a} className="flex items-center gap-2 text-sm font-body text-cream-dim">
              <svg width="14" height="14" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {a}
            </li>
          ))}
        </ul>

        {/* Specs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["3 días · 2 noches", "2 adultos", "Habitación sencilla", "Todo incluido"].map((spec) => (
            <span key={spec} className="text-[11px] font-body text-coral border border-coral/30 bg-coral/5 px-2.5 py-1 rounded-full">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-body text-muted text-xs">desde</span>
            <span className="font-display font-extrabold text-coral text-3xl">{paquete.precio}</span>
            <span className="font-body text-muted text-xs">MXN / persona</span>
          </div>
          <p className="font-body text-muted text-[11px] mb-5">Precio por persona, sujeto a disponibilidad</p>

          <a
            href="tel:+528002288377"
            className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-body font-medium text-sm py-3.5 rounded-xl transition-colors duration-200"
            aria-label={`Reservar ${paquete.hotel}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"/>
            </svg>
            Llama para separar tu lugar
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Paquetes() {
  const sectionRef = useRef<HTMLElement>(null);
  const reservations = useReservationsCounter();

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.from(".paquetes-header", {
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".paquetes-header", start: "top 85%", once: true },
      });

      gsap.from(".paquete-card", {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".paquetes-grid", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="paquetes" ref={sectionRef} className="py-24 md:py-32 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="paquetes-header text-center mb-6">
          <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">
            Hoteles Todo Incluido
          </p>
          <h2
            className="font-display font-bold text-cream leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Paquetes con los<br />
            <span className="text-coral">Mejores Precios del Mercado</span>
          </h2>
          <p className="font-body text-cream-dim text-lg max-w-2xl mx-auto leading-relaxed">
            3 días · 2 noches · 2 adultos · Habitaciones sencillas · Todo incluido
          </p>
        </div>

        {/* Live bookings counter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 bg-bg border border-border rounded-full px-5 py-2.5">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              <span className="font-body text-sm text-cream-dim">
                <span className="font-bold text-coral tabular-nums">{reservations}</span>
                {" "}personas reservaron en las últimas 24 horas
              </span>
            </span>
            <span className="text-lg" aria-hidden="true">🔥</span>
          </div>
        </div>

        {/* Cards */}
        <div className="paquetes-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {paquetes.map((p) => (
            <PaqueteCard key={p.id} paquete={p} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center font-body text-muted text-xs mt-8">
          * Precios por persona en ocupación doble. Sujeto a disponibilidad y temporada. Llama para confirmar disponibilidad.
        </p>
      </div>
    </section>
  );
}
