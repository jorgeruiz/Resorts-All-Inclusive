"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer, cardItem } from "@/lib/animations";
import { openCallModal } from "@/components/CallModal";
import { useSessionPhone } from "@/lib/session-phone";

const faqs = [
  {
    pregunta: "¿Qué incluye un paquete todo incluido?",
    respuesta: "Nuestros paquetes todo incluido cubren hospedaje en resort, alimentos y bebidas ilimitados (desayuno, comida y cena), actividades y entretenimiento en el resort, y acceso a todas las instalaciones. Dependiendo del paquete, también pueden incluir vuelo de ida y vuelta desde tu ciudad de origen.",
  },
  {
    pregunta: "¿Cómo reservo mi paquete vacacional?",
    respuesta: "PHONE_PLACEHOLDER",
  },
  {
    pregunta: "¿Tienen precios especiales para grupos o familias?",
    respuesta: "Sí. Ofrecemos tarifas especiales para grupos de 5 personas en adelante y para familias con niños. Los precios varían según el destino y temporada. Llámanos para cotizar tu paquete grupal y obtener el mejor precio disponible.",
  },
  {
    pregunta: "¿Cuánto tiempo antes debo reservar mi viaje?",
    respuesta: "Recomendamos reservar con al menos 4 a 6 semanas de anticipación para obtener los mejores precios. En temporada alta (Semana Santa, verano, Navidad y Año Nuevo) lo ideal es reservar con 2 a 3 meses de anticipación para asegurar disponibilidad en los mejores resorts.",
  },
  {
    pregunta: "¿Qué pasa si necesito cambiar la fecha de mi reserva?",
    respuesta: "Entendemos que los planes pueden cambiar. Contáctanos lo antes posible — cuanto antes nos avises, más opciones tenemos disponibles. Las condiciones de cambio dependen de la política del hotel y la aerolínea incluida en tu paquete. Te asesoramos sin costo adicional.",
  },
  {
    pregunta: "¿Los paquetes incluyen vuelos desde mi ciudad?",
    respuesta: "Algunos paquetes incluyen vuelo y otros contemplan solo hospedaje. Al cotizar te presentamos ambas opciones para que elijas según tu presupuesto y punto de origen. Trabajamos con las principales aerolíneas que operan vuelos nacionales en México.",
  },
];

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();
  const phone = useSessionPhone();
  const headerVariants = fadeInUp(shouldReduce);
  const itemVariants = cardItem(shouldReduce);

  const resolvedFaqs = faqs.map((faq) =>
    faq.respuesta === "PHONE_PLACEHOLDER"
      ? { ...faq, respuesta: `Puedes reservar llamándonos directamente al ${phone.formatted}, donde un asesor personalizado te orientará, o enviándonos tu solicitud a través del formulario de cotización en esta página. Atendemos de lunes a viernes de 10:00 a 17:00 hrs y sábados y domingos de 10:00 a 14:00 hrs.` }
      : faq
  );

  return (
    <section id="faqs" className="py-24 md:py-32 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="font-display font-bold text-cream leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Preguntas Frecuentes
          </h2>
          <p className="font-body text-cream-dim text-base leading-relaxed">
            Desde cómo reservar un paquete todo incluido hasta el cambio de fecha de una reserva — resolvemos tus dudas más comunes.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {resolvedFaqs.map((faq, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-bg border border-border rounded-xl overflow-hidden">
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 cursor-pointer"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="font-body font-medium text-cream text-sm md:text-base leading-snug">
                  {faq.pregunta}
                </span>
                <span className={`text-coral shrink-0 mt-0.5 transition-transform duration-300 ${openIdx === i ? "rotate-45" : ""}`} aria-hidden="true">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                aria-hidden={openIdx !== i}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === i ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-6 pb-6 font-body text-cream-dim text-sm leading-relaxed">{faq.respuesta}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <p className="font-body text-muted text-sm mb-4">¿Tienes más preguntas? Nuestros asesores te responden.</p>
          <button
            onClick={() => openCallModal({ titulo: "Nuestros asesores te responden", message: `¿Tienes dudas sobre fechas, precios, destinos o qué incluye el paquete? Llama sin costo al ${phone.formatted} y te resolvemos todo sin compromiso. Atención 7 días a la semana.`, section: "faqs" })}
            className="inline-flex items-center gap-2 text-coral font-body font-medium hover:text-cream transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
            </svg>
            Llamar ahora · {phone.formatted}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
