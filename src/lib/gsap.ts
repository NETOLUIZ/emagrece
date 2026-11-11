import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const MQ = {
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 768px) and (hover: hover) and (pointer: fine)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;
