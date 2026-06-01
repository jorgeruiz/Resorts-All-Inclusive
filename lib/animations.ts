import type { Variants } from "framer-motion";

// hidden siempre opacity 0 para evitar hydration mismatch entre SSR y cliente.
// La duración 0 cuando shouldReduce === true hace la transición instantánea (accesibilidad).
// Googlebot ejecuta JS, por lo que ve el contenido animado correctamente.

export const fadeInUp = (shouldReduce: boolean | null): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: shouldReduce ? 0 : 0.55, ease: [0.22, 0.03, 0.26, 1] },
  },
});

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export const cardItem = (shouldReduce: boolean | null): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: shouldReduce ? 0 : 0.45, ease: "easeOut" },
  },
});
