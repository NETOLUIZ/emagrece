import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MQ } from "../lib/gsap";

let instance: Lenis | null = null;

/** Rolagem programática (âncoras) que funciona com ou sem Lenis. */
export function scrollToTarget(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el as HTMLElement, { offset: -72, duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  history.replaceState(null, "", hash);
}

/**
 * Lenis só no desktop com mouse e sem "reduzir movimento".
 * No celular o scroll nativo é mais fluido e não conflita com o ScrollTrigger.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      instance = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        instance = null;
      };
    });
    return () => mm.revert();
  }, []);
}
