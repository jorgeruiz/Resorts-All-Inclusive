"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

// ── Fila 1 — izquierda a derecha ──────────────────────────
const row1 = [
  "Barceló Ixtapa",
  "Barceló Maya Palace",
  "Crow Paradise Club Puerto Vallarta",
  "Dreams Aventuras",
  "Dreams Los Cabos",
  "Dreams Sands Cancún",
  "Emporio Cancún",
  "GR Solaris Cancún",
  "Grand Palladium Vallarta",
  "Hard Rock Cancún",
  "Iberostar Selection Coral Cancún",
  "Iberostar Waves Paraíso del Mar",
  "Joia Paraíso by Iberostar",
  "Krystal Grand Puerto Vallarta",
  "Meliá Casa Maya Cancún",
];

// ── Fila 2 — derecha a izquierda ──────────────────────────
const row2 = [
  "Occidental Costa Cancún",
  "Paradisus La Perla",
  "Park Royal Beach Ixtapa",
  "Riu Caribe",
  "Riu Lupita",
  "Riu Palace Kukulcán",
  "Riu Palace Riviera Maya",
  "Riu Yucatán",
  "Royalton Hideaway Riviera Cancún",
  "Sandos Cancún",
  "Secrets Aura",
  "Secrets Moxché",
  "Secrets The Vine",
  "The Sens Cancún",
  "Xcaret México",
];

function HotelTag({ nombre }: { nombre: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <span className="w-1 h-1 rounded-full bg-[#06B6D4]/60 shrink-0" aria-hidden="true" />
      <span className="font-body text-sm font-medium text-white/70 tracking-wide">
        {nombre}
      </span>
    </span>
  );
}

function MarqueeRow({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  // Triplicamos para garantizar el loop sin saltos en pantallas muy anchas
  const repeated = [...items, ...items, ...items];
  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`flex gap-8 w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {repeated.map((nombre, i) => (
          <HotelTag key={`${nombre}-${i}`} nombre={nombre} />
        ))}
      </div>
    </div>
  );
}

export default function HotelesCarrusel() {
  const shouldReduce = useReducedMotion();
  const headerVariants = fadeInUp(shouldReduce);

  return (
    <section
      aria-label="Hoteles disponibles"
      className="py-14 overflow-hidden"
      style={{ backgroundColor: "#0C2340" }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          <div>
            <p className="text-[#06B6D4] text-xs font-body font-medium uppercase tracking-widest mb-1">
              Hoteles disponibles
            </p>
            <h2 className="font-display font-bold text-white text-xl leading-snug">
              Más de 30 resorts todo incluido
            </h2>
          </div>
          <p className="font-body text-white/50 text-sm max-w-xs leading-relaxed">
            Un solo asesor, todos los hoteles. Cotizamos el que mejor se adapte a ti.
          </p>
        </motion.div>
      </div>

      {/* Filas del carrusel */}
      <div className="flex flex-col gap-5">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
}
