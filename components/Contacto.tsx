"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  telefono: z
    .string()
    .min(10, "Ingresa un número válido de 10 dígitos")
    .max(15, "Número demasiado largo"),
  destino: z.string().min(1, "Selecciona un destino de interés"),
  mensaje: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const destinos = [
  "Cancún",
  "Puerto Vallarta",
  "Los Cabos",
  "Mazatlán",
  "Cozumel",
  "Huatulco",
  "Otro destino",
];

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.from(".contacto-content", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".contacto-content", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  const onSubmit = async (data: FormData) => {
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 md:py-32 bg-bg border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="contacto-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <div>
            <p className="text-teal text-xs font-body font-medium uppercase tracking-widest mb-4">
              Cotiza Gratis
            </p>
            <h2
              className="font-display font-bold text-cream leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Hablemos y Encontramos<br />
              <span className="text-coral">Tu Viaje Ideal</span>
            </h2>
            <p className="font-body text-cream-dim text-lg leading-relaxed mb-10">
              Cuéntanos a dónde quieres ir y nosotros nos encargamos del resto. Sin complicaciones, al precio más bajo disponible en el mercado.
            </p>

            {/* Phone card */}
            <div className="bg-surface border border-border rounded-xl p-6 mb-5">
              <p className="font-body text-muted text-xs uppercase tracking-wider mb-3">
                Llámanos directamente
              </p>
              <a
                href="tel:+528002288377"
                className="flex items-center gap-3 hover:gap-4 text-cream font-display font-bold text-2xl transition-all duration-200 hover:text-coral group"
              >
                <span className="text-coral">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
                  </svg>
                </span>
                800 228 8377
              </a>
              <div className="mt-4 flex flex-col gap-1 font-body text-muted text-sm">
                <span>Lun–Vie: 10:00–17:00 hrs</span>
                <span>Sáb–Dom: 10:00–14:00 hrs</span>
              </div>
            </div>

            {/* Trust note */}
            <p className="font-body text-muted text-sm flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5 text-teal" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Tus datos son confidenciales. No compartimos tu información con terceros ni enviamos spam.
            </p>
          </div>

          {/* Right: form */}
          <div className="bg-surface border border-border rounded-xl p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-5" aria-hidden="true">✈️</div>
                <h3 className="font-display font-bold text-cream text-2xl mb-3">¡Mensaje Enviado!</h3>
                <p className="font-body text-cream-dim text-base leading-relaxed">
                  Un asesor se pondrá en contacto contigo muy pronto. También puedes llamarnos ahora al{" "}
                  <a href="tel:+528002288377" className="text-coral hover:underline">
                    800 228 8377
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h3 className="font-display font-bold text-cream text-xl mb-6">
                  Solicita tu Cotización Gratuita
                </h3>

                <div className="flex flex-col gap-5">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block font-body text-sm text-cream-dim mb-1.5"
                    >
                      Nombre completo <span className="text-coral">*</span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      className="w-full bg-bg border border-border rounded-md px-4 py-3 font-body text-cream text-sm placeholder:text-muted focus:border-coral focus:outline-none transition-colors duration-200"
                      aria-describedby={errors.nombre ? "nombre-error" : undefined}
                      {...register("nombre")}
                    />
                    {errors.nombre && (
                      <p
                        id="nombre-error"
                        className="mt-1.5 text-xs font-body text-coral"
                        role="alert"
                      >
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block font-body text-sm text-cream-dim mb-1.5"
                    >
                      Teléfono <span className="text-coral">*</span>
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      autoComplete="tel"
                      placeholder="55 1234 5678"
                      className="w-full bg-bg border border-border rounded-md px-4 py-3 font-body text-cream text-sm placeholder:text-muted focus:border-coral focus:outline-none transition-colors duration-200"
                      aria-describedby={errors.telefono ? "telefono-error" : undefined}
                      {...register("telefono")}
                    />
                    {errors.telefono && (
                      <p
                        id="telefono-error"
                        className="mt-1.5 text-xs font-body text-coral"
                        role="alert"
                      >
                        {errors.telefono.message}
                      </p>
                    )}
                  </div>

                  {/* Destino */}
                  <div>
                    <label
                      htmlFor="destino"
                      className="block font-body text-sm text-cream-dim mb-1.5"
                    >
                      Destino de interés <span className="text-coral">*</span>
                    </label>
                    <select
                      id="destino"
                      defaultValue=""
                      className="w-full bg-bg border border-border rounded-md px-4 py-3 font-body text-cream text-sm focus:border-coral focus:outline-none transition-colors duration-200"
                      aria-describedby={errors.destino ? "destino-error" : undefined}
                      {...register("destino")}
                    >
                      <option value="" disabled className="text-muted">
                        Selecciona un destino
                      </option>
                      {destinos.map((d) => (
                        <option key={d} value={d} className="bg-surface">
                          {d}
                        </option>
                      ))}
                    </select>
                    {errors.destino && (
                      <p
                        id="destino-error"
                        className="mt-1.5 text-xs font-body text-coral"
                        role="alert"
                      >
                        {errors.destino.message}
                      </p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label
                      htmlFor="mensaje"
                      className="block font-body text-sm text-cream-dim mb-1.5"
                    >
                      ¿Algo más que quieras contarnos? <span className="text-muted">(opcional)</span>
                    </label>
                    <textarea
                      id="mensaje"
                      rows={3}
                      placeholder="Número de personas, fechas aproximadas, presupuesto..."
                      className="w-full bg-bg border border-border rounded-md px-4 py-3 font-body text-cream text-sm placeholder:text-muted focus:border-coral focus:outline-none transition-colors duration-200 resize-none"
                      {...register("mensaje")}
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-body text-coral text-center" role="alert">
                      Ocurrió un error. Por favor llámanos al 800 228 8377.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-coral hover:bg-coral-hover disabled:opacity-60 disabled:cursor-not-allowed text-cream font-body font-medium text-base py-4 rounded-md transition-colors duration-200"
                  >
                    {sending ? "Enviando..." : "Solicitar Cotización Gratuita"}
                  </button>

                  <p className="text-xs font-body text-muted text-center leading-relaxed">
                    Al enviar, aceptas que nos pongamos en contacto contigo para atender tu solicitud.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
