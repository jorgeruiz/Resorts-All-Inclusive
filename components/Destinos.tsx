"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer, cardItem } from "@/lib/animations";

const destinos = [
  {
    id: "cancun",
    nombre: "Cancún",
    descripcion: "El destino todo incluido más popular de México. Playas de arena blanca, aguas turquesa y resorts de clase mundial en el Caribe mexicano.",
    imagen: "/cancun.webp",
  },
  {
    id: "puerto-vallarta",
    nombre: "Puerto Vallarta",
    descripcion: "La Bahía de Banderas: joya del Pacífico. Naturaleza exuberante, malecón histórico y resorts con vista al océano.",
    imagen: "/puerto-vallarta.webp",
  },
  {
    id: "los-cabos",
    nombre: "Los Cabos",
    descripcion: "Donde el desierto se encuentra con el mar. Lujo, privacidad y paisajes únicos en la punta de Baja California Sur.",
    imagen: "/los-cabos.webp",
  },
  {
    id: "mazatlan",
    nombre: "Mazatlán",
    descripcion: "La Perla del Pacífico. Malecón más largo de América, playas extensas y el mejor marisco de México a precios accesibles.",
    imagen: "/mazatlan.webp",
  },
  {
    id: "cozumel",
    nombre: "Cozumel",
    descripcion: "Paraíso del snorkeling y buceo. Arrecifes de coral espectaculares y aguas cristalinas en la isla más famosa del Caribe mexicano.",
    imagen: "/cozumel.webp",
  },
  {
    id: "huatulco",
    nombre: "Huatulco",
    descripcion: "Nueve bahías paradisíacas en la costa oaxaqueña. El secreto mejor guardado del Pacífico mexicano: naturaleza virgen y playas privadas.",
    imagen: "/huatulco.webp",
  },
];

export default function Destinos() {
  const shouldReduce = useReducedMotion();
  const headerVariants = fadeInUp(shouldReduce);
  const itemVariants = cardItem(shouldReduce);

  return (
    <section id="destinos" className="py-24 md:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
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
            Vuelo, hotel, alimentos y diversión — sin sorpresas ni cargos ocultos.
            Encuentra el paquete vacacional todo incluido que tu familia merece.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {destinos.map((destino) => (
            <motion.article
              key={destino.id}
              variants={itemVariants}
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-coral/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(2,132,199,0.12)]"
            >
              <div className="relative h-48 overflow-hidden bg-elevated">
                <Image
                  src={destino.imagen}
                  alt={`Destino: ${destino.nombre}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-cream text-2xl mb-2">{destino.nombre}</h3>
                <p className="font-body text-cream-dim text-sm leading-relaxed mb-5">{destino.descripcion}</p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="inline-flex items-center gap-1.5 text-teal text-xs font-body font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    Paquetes disponibles
                  </span>
                  <a
                    href="tel:+528002288377"
                    className="flex items-center gap-1.5 bg-coral hover:bg-coral-hover text-white text-sm font-body font-medium px-4 py-2 rounded-md transition-colors duration-200"
                    aria-label={`Llamar para reservar en ${destino.nombre}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"/>
                    </svg>
                    Llama para separar tu lugar
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <p className="font-body text-cream-dim text-sm mb-5">
            ¿No encuentras tu destino? Tenemos más opciones disponibles.
          </p>
          <a
            href="tel:+528002288377"
            className="inline-flex items-center gap-3 bg-coral hover:bg-coral-hover text-white font-body font-medium text-base px-8 py-4 rounded-md transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"/>
            </svg>
            Habla con un asesor · 800 228 8377
          </a>
        </motion.div>
      </div>
    </section>
  );
}
