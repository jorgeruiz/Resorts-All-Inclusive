"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer, cardItem } from "@/lib/animations";
import { openCallModal } from "@/components/CallModal";

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
    callTitulo: "Hotel Riu — el más reservado",
    callMessage: "El Hotel Riu es uno de los resorts más solicitados en México por su nivel de servicio. Llámanos ahora y un asesor verifica disponibilidad y te garantiza el mejor precio del día.",
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
    callTitulo: "Hotel Xcaret, una experiencia única",
    callMessage: "El Hotel Xcaret incluye acceso al parque Xcaret y Xavage — una experiencia que no encontrarás en ningún otro resort. Disponibilidad limitada; te recomendamos reservar pronto.",
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
    callTitulo: "Hotel Krystal — mejor precio garantizado",
    callMessage: "El Hotel Krystal ofrece la mejor relación calidad-precio en Cancún: alberca infinita, spa y zona hotelera exclusiva. Un asesor te presenta las fechas con la tarifa más baja.",
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
    callTitulo: "Dreams Resort — vacaciones desde $10,147",
    callMessage: "El Dreams Resort es la opción perfecta si buscas calidad a precio accesible. Traslados incluidos y playa equipada desde $10,147 MXN por persona. Confirma disponibilidad hoy.",
  },
];

function useReservationsCounter() {
  const [count, setCount] = useState(43);
  useEffect(() => {
    const schedule = () => {
      const delay = (Math.random() * 2 + 2) * 60 * 1000;
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

function useViewingCounter(initial: number) {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 8) + 2);
    }, 15000 + Math.random() * 20000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

function PaqueteCard({ paquete, variants }: { paquete: (typeof paquetes)[0]; variants: ReturnType<typeof cardItem> }) {
  const viendo = useViewingCounter(paquete.viendo);
  return (
    <motion.article variants={variants} className="relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-coral/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)] flex flex-col">
      <div className="absolute top-4 left-4 z-10">
        <span className={`${paquete.badgeColor} text-[10px] font-body font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
          {paquete.badge}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-body px-2 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
        {viendo} viendo ahora
      </div>

      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-display font-bold text-cream text-2xl mt-6 mb-2">{paquete.hotel}</h3>
        <p className="font-body text-cream-dim text-sm leading-relaxed mb-5">{paquete.descripcion}</p>

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

        <div className="flex flex-wrap gap-2 mb-6">
          {["3 días · 2 noches", "2 adultos", "Habitación sencilla", "Todo incluido"].map((spec) => (
            <span key={spec} className="text-[11px] font-body text-coral border border-coral/30 bg-coral/5 px-2.5 py-1 rounded-full">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-body text-muted text-xs">desde</span>
            <span className="font-display font-extrabold text-coral text-3xl">{paquete.precio}</span>
            <span className="font-body text-muted text-xs">MXN / persona</span>
          </div>
          <p className="font-body text-muted text-[11px] mb-5">Precio por persona, sujeto a disponibilidad</p>
          <button
            onClick={() => openCallModal({ titulo: paquete.callTitulo, message: paquete.callMessage, section: "paquetes" })}
            className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-body font-medium text-sm py-3.5 rounded-xl transition-colors duration-200"
            aria-label={`Reservar ${paquete.hotel}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"/>
            </svg>
            Llama para separar tu lugar
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Paquetes() {
  const shouldReduce = useReducedMotion();
  const headerVariants = fadeInUp(shouldReduce);
  const itemVariants = cardItem(shouldReduce);
  const reservations = useReservationsCounter();

  return (
    <section id="paquetes" className="py-24 md:py-32 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-6"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">Hoteles Todo Incluido</p>
          <h2 className="font-display font-bold text-cream leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Paquetes con los<br />
            <span className="text-coral">Mejores Precios del Mercado</span>
          </h2>
          <p className="font-body text-cream-dim text-lg max-w-2xl mx-auto leading-relaxed">
            3 días · 2 noches · 2 adultos · Habitaciones sencillas · Todo incluido
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
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
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {paquetes.map((p) => (
            <PaqueteCard key={p.id} paquete={p} variants={itemVariants} />
          ))}
        </motion.div>

        <p className="text-center font-body text-muted text-xs mt-8">
          * Precios por persona en ocupación doble. Sujeto a disponibilidad y temporada. Llama para confirmar disponibilidad.
        </p>
      </div>
    </section>
  );
}
