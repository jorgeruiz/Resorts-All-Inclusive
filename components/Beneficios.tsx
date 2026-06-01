"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer, cardItem } from "@/lib/animations";

const beneficios = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    titulo: "Precio Más Bajo Garantizado",
    descripcion: "Si encuentras el mismo paquete todo incluido a mejor precio en otro lugar, lo igualamos. Tu presupuesto es nuestra prioridad.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.77 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9A16 16 0 0 0 15 15.91l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    titulo: "Asesor Personal 7 Días",
    descripcion: "Un asesor real te atiende de lunes a domingo. Sin chatbots ni filas de espera. Atención humana y personalizada para tu viaje.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    titulo: "Sin Cargos Ocultos",
    descripcion: "El precio que te cotizamos es el precio que pagas. Impuestos, cargos y servicios incluidos desde el primer presupuesto.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    titulo: "+5,000 Viajeros Felices",
    descripcion: "Miles de familias y parejas han confiado en nosotros para sus vacaciones. Su satisfacción es nuestra mejor carta de presentación.",
  },
];

export default function Beneficios() {
  const shouldReduce = useReducedMotion();
  const headerVariants = fadeInUp(shouldReduce);
  const itemVariants = cardItem(shouldReduce);

  return (
    <section className="py-24 md:py-32 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">Por Qué Elegirnos</p>
          <h2 className="font-display font-bold text-cream leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            La Agencia que Trabaja<br />
            <span className="text-coral">Para Ti</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {beneficios.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-coral/10 border border-coral/20 flex items-center justify-center text-coral mb-5">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-cream text-lg mb-3 leading-snug">{item.titulo}</h3>
              <p className="font-body text-cream-dim text-sm leading-relaxed">{item.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
