"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Skip on touch devices
    if (navigator.maxTouchPoints > 0) return;

    // Disable all motion if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.globalTimeline.timeScale(0);
      return;
    }

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis initializes so positions are correct
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });
    setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}
