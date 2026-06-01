"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CallModalPayload = {
  titulo?: string;
  message: string;
  section: string;
};

/** Abre el modal desde cualquier componente — sin contexto ni props */
export function openCallModal(payload: CallModalPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("open-call-modal", { detail: payload }));
}

/** Dispara el evento de analítica sin abrir el modal (p.ej. si el usuario confirma) */
function trackCallIntent(section: string) {
  // GTM dataLayer — UN solo evento con parámetro de sección
  if (typeof window !== "undefined" && Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({ event: "call_intent", call_section: section });
  }
  // Google Ads — conversion de llamada
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", { send_to: "AW-18195520666" });
  }
}

const PhoneIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
  </svg>
);

export default function CallModal() {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<CallModalPayload | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CallModalPayload>).detail;
      setPayload(detail);
      setOpen(true);
    };
    window.addEventListener("open-call-modal", handler);
    return () => window.removeEventListener("open-call-modal", handler);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleConfirm = () => {
    if (payload) trackCallIntent(payload.section);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && payload && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Confirmar llamada"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full sm:max-w-md bg-[#0C2340] border border-white/10 rounded-t-3xl sm:rounded-2xl p-8 shadow-2xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.03, 0.26, 1] }}
          >
            {/* Pill handle (mobile) */}
            <div className="sm:hidden w-10 h-1 rounded-full bg-white/20 mx-auto mb-6" aria-hidden="true" />

            {/* Cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white/80 transition-colors"
              aria-label="Cerrar"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Icono */}
            <div className="w-14 h-14 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/30 flex items-center justify-center text-[#06B6D4] mb-5 mx-auto">
              <PhoneIcon size={26} />
            </div>

            {/* Título */}
            <h3 className="font-display font-bold text-white text-2xl text-center mb-3 leading-tight">
              {payload.titulo ?? "¡Estás a un paso!"}
            </h3>

            {/* Mensaje personalizado */}
            <p className="font-body text-white/70 text-sm leading-relaxed text-center mb-6">
              {payload.message}
            </p>

            {/* Número destacado */}
            <div className="flex items-center justify-center gap-2 mb-7">
              <span className="text-[#06B6D4]"><PhoneIcon size={16} /></span>
              <span className="font-display font-bold text-[#06B6D4] text-lg tracking-wide">
                800 228 8377
              </span>
              <span className="font-body text-white/40 text-xs">— sin costo</span>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+528002288377"
                onClick={handleConfirm}
                className="flex items-center justify-center gap-3 bg-[#0284C7] hover:bg-[#0369A1] text-white font-body font-bold text-base py-4 rounded-xl transition-colors duration-200"
              >
                <PhoneIcon size={18} />
                Llamar ahora
              </a>
              <button
                onClick={() => setOpen(false)}
                className="font-body text-white/40 text-sm py-3 rounded-xl border border-white/10 hover:border-white/20 hover:text-white/60 transition-colors duration-200"
              >
                Quizás después
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
