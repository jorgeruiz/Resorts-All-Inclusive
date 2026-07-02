"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer, cardItem } from "@/lib/animations";
import { openCallModal } from "@/components/CallModal";
import { useSessionPhone } from "@/lib/session-phone";

const destinosData = [
  {
    id: "cancun",
    nombre: "Cancún",
    descripcion: "El destino todo incluido más popular de México. Playas de arena blanca, aguas turquesa y resorts de clase mundial en el Caribe mexicano.",
    imagen: "/cancun.webp",
    callTitulo: "Cancún te está esperando",
    callMessage: "Cancún tiene los mejores resorts all inclusive del Caribe mexicano. Llámanos y un asesor te cotiza disponibilidad, fechas y el precio más bajo garantizado del día.",
  },
  {
    id: "puerto-vallarta",
    nombre: "Puerto Vallarta",
    descripcion: "La Bahía de Banderas: joya del Pacífico. Naturaleza exuberante, malecón histórico y resorts con vista al océano.",
    imagen: "/puerto-vallarta.webp",
    callTitulo: "El Pacífico te llama",
    callMessage: "Puerto Vallarta combina naturaleza, cultura y resorts de lujo con vista al mar. Nuestros asesores conocen las mejores opciones para tu estancia en la Bahía de Banderas.",
  },
  {
    id: "los-cabos",
    nombre: "Los Cabos",
    descripcion: "Donde el desierto se encuentra con el mar. Lujo, privacidad y paisajes únicos en la punta de Baja California Sur.",
    imagen: "/los-cabos.webp",
    callTitulo: "Lujo en Los Cabos",
    callMessage: "Los Cabos combina lujo y naturaleza única: desierto, mar y el famoso Arco. Te ayudamos a encontrar el resort con playa privada que mejor se adapta a tu presupuesto.",
  },
  {
    id: "mazatlan",
    nombre: "Mazatlán",
    descripcion: "La Perla del Pacífico. Malecón más largo de América, playas extensas y el mejor marisco de México a precios accesibles.",
    imagen: "/mazatlan.webp",
    callTitulo: "Mazatlán, la Perla del Pacífico",
    callMessage: "Mazatlán ofrece la mejor relación calidad-precio del Pacífico mexicano: playas extensas, gastronomía y resorts todo incluido a tarifas muy accesibles. Un asesor te cotiza ahora.",
  },
  {
    id: "cozumel",
    nombre: "Cozumel",
    descripcion: "Paraíso del snorkeling y buceo. Arrecifes de coral espectaculares y aguas cristalinas en la isla más famosa del Caribe mexicano.",
    imagen: "/cozumel.webp",
    callTitulo: "Cozumel, el Caribe en su máxima expresión",
    callMessage: "Cozumel tiene los arrecifes de coral más espectaculares del Caribe. Podemos incluir actividades acuáticas en tu paquete todo incluido. Llama y te contamos las opciones.",
  },
  {
    id: "huatulco",
    nombre: "Huatulco",
    descripcion: "Nueve bahías paradisíacas en la costa oaxaqueña. El secreto mejor guardado del Pacífico mexicano: naturaleza virgen y playas privadas.",
    imagen: "/huatulco.webp",
    callTitulo: "Huatulco, el secreto de México",
    callMessage: "Huatulco es el destino más exclusivo y menos conocido del Pacífico: 9 bahías vírgenes en Oaxaca. Pocos lo conocen — llama y te revelamos todo sobre este paraíso.",
  },
];

export default function Hero() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const phase3Ref       = useRef<HTMLDivElement>(null);
  const shouldReduce    = useReducedMotion();
  const progress        = useMotionValue(0);
  const rawVideoOpacity = useMotionValue(1);
  const phone           = useSessionPhone();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldReduce) return;

    const update = () => {
      // ── Phase 1 & 2 progress ──
      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const scrolled = -rect.top;
        progress.set(Math.max(0, Math.min(1, scrolled / scrollableDistance)));
      }

      // ── Video fade: se desvanece cuando Phase 3 entra al viewport ──
      const phase3 = phase3Ref.current;
      if (phase3) {
        const p3Top = phase3.getBoundingClientRect().top;
        const entered = Math.max(0, window.innerHeight - p3Top);
        const fadeDistance = window.innerHeight * 0.55;
        rawVideoOpacity.set(Math.max(0, 1 - entered / fadeDistance));
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [progress, rawVideoOpacity, shouldReduce]);

  // ── Phase 1: video limpio ──
  const phase1Opacity = useTransform(progress, [0, 0.30, 0.45], [1, 1, 0]);
  const phase1Y       = useTransform(progress, [0, 0.45], [0, -50]);

  // ── Phase 2: video con blur 5px ──
  const phase2Opacity = useTransform(progress, [0.25, 0.45], [0, 1]);
  const phase2Y       = useTransform(progress, [0.25, 0.45], [30, 0]);

  // ── Blur del video (se limpia antes de que Phase 3 entre al viewport) ──
  const blurPx      = useTransform(progress, [0.45, 0.55, 0.70, 0.80], [0, 5, 5, 0]);
  const videoFilter = useTransform(blurPx, (v: number) => `blur(${v}px)`);

  // ── Video opacity: se desvanece cuando Phase 3 entra al viewport ──
  const videoOpacity = rawVideoOpacity;

  const headerVariants = fadeInUp(shouldReduce);
  const itemVariants   = cardItem(shouldReduce);

  if (shouldReduce) {
    return (
      <section id="inicio" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display font-extrabold text-white mb-6" style={{ fontSize: "clamp(2.2rem,5.5vw,5.5rem)" }}>
            Los Mejores<br /><span style={{ color: "#06B6D4" }}>Resorts All Inclusive</span><br />en México
          </h1>
          <button
            onClick={() => openCallModal({ titulo: "¡Tus vacaciones comienzan aquí!", message: "Un asesor especializado te ayuda a elegir el resort todo incluido ideal según tu destino, fechas y presupuesto. Sin compromiso — precio más bajo garantizado.", section: "hero" })}
            className="inline-flex items-center gap-3 text-white font-body font-medium text-lg px-8 py-4 rounded-md"
            style={{ backgroundColor: "#0284C7" }}
          >
            <PhoneIcon /> Llama y Reserva · {phone.formatted}
          </button>
        </div>
      </section>
    );
  }

  return (
    <div id="inicio" style={{ position: "relative" }}>

      {/* ── Sticky: video — cubre toda la sección #inicio (Phase 1, 2 y 3) ── */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: 1 }}>
        <a href="#destinos" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#0284C7] text-white px-4 py-2 rounded-md font-body text-sm">
          Saltar sección hero
        </a>
        <motion.div className="absolute inset-0" style={{ opacity: videoOpacity, filter: videoFilter }}>
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </motion.div>
      </div>

      {/* ── Capa de contenido: se superpone sobre el video con margen negativo ── */}
      <div style={{ marginTop: "-100vh", position: "relative", zIndex: 10 }}>

      {/* ── Zona de animación: 200vh (Phase 1 y Phase 2) ── */}
      <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>

      {/* ── Texto + contenido (absolute, fluye con el scroll) ── */}
      <div className="absolute inset-0 pointer-events-none">

        {/* ── Phase 1: Agencia de viajes todo incluido ── */}
        <div className="h-screen flex items-center justify-center px-6 text-center pointer-events-auto relative">
          <motion.div style={{ opacity: phase1Opacity, y: phase1Y, textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>
            <h1
              className="font-display font-extrabold text-white leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
            >
              Agencia de viajes<br />
              <span style={{ color: "#06B6D4" }}>todo incluido</span>
            </h1>
          </motion.div>

          {/* Indicador de scroll — anclado al bottom */}
          <motion.div
            style={{ opacity: phase1Opacity }}
            className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3"
            aria-hidden="true"
          >
            <span className="uppercase tracking-widest text-[11px] font-body font-semibold text-white/90">Scroll</span>
            <div className="relative w-6 h-9 rounded-full border-2 border-white/90 flex justify-center pt-1.5">
              <motion.div
                className="w-1.5 h-2 rounded-full bg-white"
                animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Phase 2: Los mejores Resorts All Inclusive (video con blur) ── */}
        <div className="h-screen flex flex-col items-center justify-center px-6 text-center pointer-events-auto">
          <motion.div style={{ opacity: phase2Opacity, y: phase2Y }} className="flex flex-col items-center">
            <p className="inline-flex items-center gap-3 text-xs font-body font-bold uppercase tracking-widest mb-6 text-white">
              <span className="w-10 h-px bg-current" aria-hidden="true" />
              Agencia de viajes todo incluido · México
              <span className="w-10 h-px bg-current" aria-hidden="true" />
            </p>

            <p
              className="font-display font-extrabold text-white leading-none tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)", textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
            >
              Los Mejores<br />
              <span style={{ color: "#06B6D4" }}>Resorts All Inclusive</span>
              <br />en México
            </p>

            <p className="font-body font-bold text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Cancún, Puerto Vallarta, Los Cabos y más — al precio más bajo garantizado.
              Más de 5,000 familias y parejas nos eligen cada año.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => openCallModal({ titulo: "¡Tus vacaciones comienzan aquí!", message: "Un asesor especializado te ayuda a elegir el resort todo incluido ideal según tu destino, fechas y presupuesto. Sin compromiso — precio más bajo garantizado.", section: "hero" })}
                className="flex items-center gap-3 text-white font-body font-medium text-lg px-8 py-4 rounded-md transition-opacity hover:opacity-90 duration-200 w-full sm:w-auto justify-center"
                style={{ backgroundColor: "#0284C7" }}
              >
                <PhoneIcon /> Llama y Reserva · {phone.formatted}
              </button>
              <a
                href="#destinos"
                className="flex items-center gap-2 border border-white/30 hover:border-white text-white font-body font-medium text-base px-6 py-4 rounded-md transition-colors duration-200 w-full sm:w-auto justify-center"
              >
                Ver Destinos <ChevronDownIcon />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 text-white/80 text-sm font-body font-bold">
              <span className="flex items-center gap-2"><StarIcon /> +5,000 viajeros satisfechos</span>
              <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
              <span>Precio más bajo garantizado</span>
              <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />
              <span>Atención 7 días a la semana</span>
            </div>
          </motion.div>
        </div>

      </div>
      </div>{/* ── /containerRef ── */}

      {/* ── Phase 3: Destinos — el video de fondo se desvanece al entrar al viewport ── */}
      <div ref={phase3Ref} id="destinos" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">

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

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              {destinosData.map((destino) => (
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
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                        Paquetes disponibles
                      </span>
                      <button
                        onClick={() => openCallModal({ titulo: destino.callTitulo, message: destino.callMessage, section: "destinos" })}
                        className="flex items-center gap-1.5 bg-coral hover:bg-coral-hover text-white text-sm font-body font-medium px-4 py-2 rounded-md transition-colors duration-200"
                        aria-label={`Llamar para reservar en ${destino.nombre}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
                        </svg>
                        Llama para separar tu lugar
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

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
              <button
                onClick={() => openCallModal({ titulo: "¿No encuentras tu destino?", message: "Tenemos paquetes a muchos más destinos de México. Cuéntanos a dónde sueñas ir y nuestros asesores arman tu paquete todo incluido a la medida.", section: "destinos" })}
                className="inline-flex items-center gap-3 bg-coral hover:bg-coral-hover text-white font-body font-medium text-base px-8 py-4 rounded-md transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
                </svg>
                Habla con un asesor · {phone.formatted}
              </button>
            </motion.div>

          </div>
        </div>
      </div>{/* ── /content-layer ── */}
    </div>
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
