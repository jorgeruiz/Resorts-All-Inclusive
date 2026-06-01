"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const testimonios = [
  { nombre: "María González", origen: "Ciudad de México", destino: "Cancún", iniciales: "MG", rating: 5, texto: "Encontré el mejor precio para Cancún después de semanas buscando. El servicio fue impecable desde la primera llamada. Regresamos todos los veranos con Resorts All Inclusive." },
  { nombre: "Roberto Martínez", origen: "Guadalajara", destino: "Los Cabos", iniciales: "RM", rating: 5, texto: "Nunca imaginé que ir a Los Cabos pudiera ser tan accesible. Los asesores me explicaron todo con paciencia y encontraron el paquete perfecto para mi luna de miel." },
  { nombre: "Ana López", origen: "Monterrey", destino: "Puerto Vallarta", iniciales: "AL", rating: 5, texto: "La atención personalizada hace toda la diferencia frente a una plataforma en línea. Ya estoy reservando mi tercer viaje con ellos. Totalmente recomendados." },
  { nombre: "Carlos Herrera", origen: "Puebla", destino: "Cancún", iniciales: "CH", rating: 5, texto: "Excelente servicio desde el primer contacto. Viajé con mi familia de 4 personas y encontraron un paquete perfecto dentro de nuestro presupuesto. Hotel increíble." },
  { nombre: "Valeria Soto", origen: "Ciudad de México", destino: "Cozumel", iniciales: "VS", rating: 5, texto: "Increíble experiencia. El resort era exactamente como lo prometieron y el precio fue imposible de encontrar en otro lugar. El snorkeling en Cozumel fue espectacular." },
  { nombre: "Eduardo Reyes", origen: "Guadalajara", destino: "Mazatlán", iniciales: "ER", rating: 5, texto: "Segunda vez que reservo con ellos. Siempre encuentran algo mejor de lo que espero. Mazatlán me sorprendió completamente. 100% recomendados para toda la familia." },
  { nombre: "Diana Morales", origen: "Monterrey", destino: "Huatulco", iniciales: "DM", rating: 5, texto: "No conocía Huatulco y me lo recomendaron ellos. Fue el mejor viaje de mi vida. Las bahías son espectaculares y el precio del paquete todo incluido fue increíble." },
  { nombre: "Jorge López", origen: "Ciudad de México", destino: "Puerto Vallarta", iniciales: "JL", rating: 5, texto: "Todo fue perfecto: vuelo, hotel, traslados. Sin preocupaciones. La asesoría fue clave para elegir el hotel correcto. Ya estoy planeando el siguiente viaje con ellos." },
];

const TOTAL = testimonios.length;

export default function Testimonios() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const shouldReduce = useReducedMotion();
  const headerVariants = fadeInUp(shouldReduce);

  const go = useCallback((idx: number) => {
    setCurrent(((idx % TOTAL) + TOTAL) % TOTAL);
  }, []);

  const prev = useCallback(() => go(current - 1), [current, go]);
  const next = useCallback(() => go(current + 1), [current, go]);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(id);
  }, [current, go]);

  // Video parallax
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || shouldReduce) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      video.style.transform = `translateY(${(-rect.top / window.innerHeight) * 30}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduce]);

  // Track slides by setting x = -(current * one-card-width).
  // Track width = TOTAL * 100% of container → each card = (100/TOTAL)% of track = 1 container width.
  // x = -(current * 100 / TOTAL)% of track = -(current * container_width).
  const xPercent = `${-(current * 100) / TOTAL}%`;

  return (
    <section id="testimonios" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <video ref={videoRef} autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover"
          style={{ filter: "blur(2px)" }}>
          <source src="/testimonios.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0C2340]/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <p className="text-[#06B6D4] text-xs font-body font-medium uppercase tracking-widest mb-4">Nuestros Viajeros</p>
          <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Lo que Dicen<br /><span style={{ color: "#06B6D4" }}>Nuestros Clientes</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Sliding track */}
          <div className="overflow-hidden mb-8">
            <motion.div
              className="flex"
              style={{ width: `${TOTAL * 100}%` }}
              animate={{ x: xPercent }}
              transition={{ duration: 0.6, ease: [0.22, 0.03, 0.26, 1] }}
            >
              {testimonios.map((t, i) => (
                <div key={i} style={{ width: `${100 / TOTAL}%` }} className="shrink-0 px-3">
                  <blockquote className="relative bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-7 flex flex-col h-full">
                    <span className="absolute top-4 right-5 font-display font-black text-[70px] leading-none text-white/10 select-none pointer-events-none" aria-hidden="true">"</span>
                    <div className="flex gap-1 mb-4" aria-label={`Calificación: ${t.rating} de 5`}>
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <svg key={j} width="13" height="13" fill="#EDA52A" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      ))}
                    </div>
                    <p className="font-body text-white/80 text-sm leading-relaxed italic flex-1 mb-6">"{t.texto}"</p>
                    <footer className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-[#0284C7]/30 border border-[#0284C7]/40 flex items-center justify-center text-[#06B6D4] font-display font-bold text-sm shrink-0" aria-hidden="true">
                        {t.iniciales}
                      </div>
                      <div>
                        <cite className="font-body font-medium text-white text-sm not-italic block">{t.nombre}</cite>
                        <p className="font-body text-white/50 text-xs">{t.origen} · Viajó a {t.destino}</p>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 hover:border-white/60 text-white/60 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Anterior">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonios">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonio ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-2 bg-[#06B6D4]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 hover:border-white/60 text-white/60 hover:text-white flex items-center justify-center transition-all duration-200" aria-label="Siguiente">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
