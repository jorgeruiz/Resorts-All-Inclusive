"use client";

import { useState, useEffect } from "react";

const PHONES = [
  { raw: "8005125032", formatted: "800 512 5032", tel: "tel:+528005125032" },
  { raw: "8002288377", formatted: "800 228 8377", tel: "tel:+528002288377" },
  { raw: "8005125059", formatted: "800 512 5059", tel: "tel:+528005125059" },
] as const;

const STORAGE_KEY = "rai_phone_idx";

function getIndex(): number {
  if (typeof window === "undefined") return 0;
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored !== null) return Number(stored);
  const idx = Math.floor(Math.random() * PHONES.length);
  sessionStorage.setItem(STORAGE_KEY, String(idx));
  return idx;
}

export type SessionPhone = (typeof PHONES)[number];

/** Devuelve el teléfono asignado a esta sesión (estable tras hidratación). */
export function useSessionPhone(): SessionPhone {
  const [phone, setPhone] = useState<SessionPhone>(PHONES[0]);

  useEffect(() => {
    setPhone(PHONES[getIndex()]);
  }, []);

  return phone;
}
