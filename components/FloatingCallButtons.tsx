"use client";

import { openCallModal } from "./CallModal";
import { useSessionPhone } from "@/lib/session-phone";

const PhoneIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
  </svg>
);

export default function FloatingCallButtons() {
  const phone = useSessionPhone();
  const modal = {
    titulo: "¿Listo para planear tu viaje?",
    message: `Un asesor real te atiende ahora mismo. Llama al ${phone.formatted} — línea gratuita desde cualquier teléfono en México — y resuelve todas tus dudas sobre paquetes todo incluido.`,
    section: "floating",
  };

  return (
    <>
      {/* Burbuja — solo desktop */}
      <button
        onClick={() => openCallModal(modal)}
        aria-label={`Llamar ahora: ${phone.formatted}`}
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
        style={{ backgroundColor: "#0284C7" }}
      >
        <PhoneIcon size={24} />
      </button>

      {/* Barra fija — solo mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3" style={{ backgroundColor: "#0C2340" }}>
        <button
          onClick={() => openCallModal(modal)}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-lg font-body font-bold text-white text-base transition-opacity duration-200 hover:opacity-90"
          style={{ backgroundColor: "#0284C7" }}
        >
          <PhoneIcon size={18} />
          Llama para hablar con un asesor
        </button>
      </div>
    </>
  );
}
