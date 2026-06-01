"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { openCallModal } from "@/components/CallModal";

export default function Contacto() {
  const shouldReduce = useReducedMotion();
  const variants = fadeInUp(shouldReduce);

  return (
    <section id="contacto" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: "blur(1px)" }}>
          <source src="/cta.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ backgroundColor: "#F0FBFF", opacity: 0.88 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Left — encabezado */}
          <div>
            <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">Contáctanos</p>
            <h2 className="font-display font-bold text-cream leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Hablemos y Encontramos<br /><span className="text-coral">Tu Viaje Ideal</span>
            </h2>
            <p className="font-body text-cream-dim text-lg leading-relaxed mb-8">
              Cuéntanos a dónde quieres ir y nosotros nos encargamos del resto. Sin complicaciones, al precio más bajo del mercado.
            </p>
            <p className="font-body text-muted text-sm flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5 text-teal" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Tus datos son confidenciales. No compartimos tu información ni enviamos spam.
            </p>
          </div>

          {/* Right — llamada directa */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-border rounded-xl p-8 shadow-sm">
              <p className="font-body text-muted text-xs uppercase tracking-wider mb-4">Llámanos directamente</p>
              <button
                onClick={() => openCallModal({ titulo: "Llámanos sin costo", message: "El 800 228 8377 es una línea gratuita disponible desde cualquier teléfono en México. Nuestros asesores te atienden en menos de un minuto para resolver todas tus dudas.", section: "contacto" })}
                className="flex items-center gap-3 text-cream font-display font-bold text-3xl hover:text-coral transition-colors duration-200 mb-5"
              >
                <span className="text-coral">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"/>
                  </svg>
                </span>
                800 228 8377
              </button>
              <div className="flex flex-col gap-1 font-body text-muted text-sm border-t border-border pt-4">
                <span>Lun–Vie: 10:00–17:00 hrs</span>
                <span>Sáb–Dom: 10:00–14:00 hrs</span>
              </div>
            </div>

            <button
              onClick={() => openCallModal({ titulo: "¡A un paso de tu viaje ideal!", message: "Tenemos disponibilidad hoy. Un asesor toma tu reserva en minutos y te confirma el mejor precio del mercado — si lo encuentras más barato en otro lado, lo igualamos.", section: "contacto" })}
              className="flex items-center justify-center gap-4 bg-coral hover:bg-coral-hover text-white font-display font-bold text-xl px-8 py-6 rounded-xl transition-colors duration-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"/>
              </svg>
              Llama y Reserva Ahora
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
