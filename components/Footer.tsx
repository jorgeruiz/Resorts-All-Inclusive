"use client";

import Link from "next/link";
import { openCallModal } from "@/components/CallModal";
import { useSessionPhone } from "@/lib/session-phone";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#destinos", label: "Destinos" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#faqs", label: "Preguntas Frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const phone = useSessionPhone();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display font-bold text-2xl text-cream mb-3">
              Resorts<span className="text-coral">AI</span>
            </p>
            <p className="font-body text-cream-dim text-sm leading-relaxed max-w-xs">
              Agencia de viajes en línea especializada en paquetes vacacionales todo incluido en los mejores destinos de México.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navegación pie de página">
            <p className="font-body text-cream text-xs font-medium uppercase tracking-wider mb-5">
              Navegación
            </p>
            <ul className="flex flex-col gap-2.5 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-cream-dim text-sm hover:text-cream transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-body text-cream text-xs font-medium uppercase tracking-wider mb-5">
              Contacto
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => openCallModal({ titulo: "¿Hablamos?", message: "Llámanos en horario de atención y con gusto te asesoramos. Lun–Vie de 10:00 a 17:00 hrs y Sáb–Dom de 10:00 a 14:00 hrs. Línea gratuita desde cualquier teléfono en México.", section: "footer" })}
                className="flex items-center gap-2 font-body text-cream-dim text-sm hover:text-coral transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
                </svg>
                {phone.formatted}
              </button>
              <div className="font-body text-muted text-xs flex flex-col gap-1">
                <span>Lun–Vie: 10:00–17:00 hrs</span>
                <span>Sáb–Dom: 10:00–14:00 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-muted text-xs">
            © {year} Resorts All Inclusive. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/aviso-de-privacidad"
              className="font-body text-muted text-xs hover:text-cream-dim transition-colors duration-200"
            >
              Aviso de Privacidad
            </Link>
            <Link
              href="/terminos-y-condiciones"
              className="font-body text-muted text-xs hover:text-cream-dim transition-colors duration-200"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
