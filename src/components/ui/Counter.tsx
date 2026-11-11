import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

/** Contador animado. O texto final já está no HTML (acessível e sem JS); a animação só enfeita. */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const state = { v: 0 };
      const tween = gsap.to(state, {
        v: to,
        duration: 1.6,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          el.textContent = `${Math.round(state.v)}${suffix}`;
        },
      });
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tween.play();
            io.disconnect();
          }
        },
        { threshold: 0.6 },
      );
      el.textContent = `0${suffix}`;
      io.observe(el);
      return () => {
        io.disconnect();
        tween.kill();
        el.textContent = `${to}${suffix}`;
      };
    });
    return () => mm.revert();
  }, [to, suffix]);

  return <span ref={ref}>{`${to}${suffix}`}</span>;
}
