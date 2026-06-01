"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#destinos", label: "Destinos" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#faqs", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* Logo — siempre visible */}
        <a href="#inicio" className="font-display font-bold text-xl text-cream tracking-tight shrink-0">
          Resorts<span className="text-coral">México</span>
        </a>

        {/* Links — solo desktop */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-body text-cream-dim hover:text-cream transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — siempre visible en desktop y mobile */}
        <a
          href="#paquetes"
          className="flex items-center gap-2 bg-coral hover:bg-coral-hover text-white font-body font-bold text-sm px-4 py-2.5 rounded-md transition-colors duration-200 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Paquetes Disponibles</span>
          <span className="sm:hidden">Paquetes</span>
          <span className="inline-flex items-center justify-center bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">HOY</span>
        </a>
      </nav>
    </header>
  );
}
