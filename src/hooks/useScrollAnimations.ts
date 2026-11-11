import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger, MQ } from "../lib/gsap";

/**
 * Animações globais por atributo (um único mecanismo, sem conflito):
 *   data-reveal="up|left|right|scale|mask"   → entra ao aparecer na viewport (stagger em lote)
 *   data-parallax="0.12"                     → parallax discreto (só desktop)
 *   data-stagger-group                       → filhos [data-reveal] entram em sequência
 * Sem JS / com "reduzir movimento": tudo fica visível (a classe js-anim nunca é aplicada).
 */
export function useScrollAnimations() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.classList.add("js-anim");

      const from = (kind: string) => {
        switch (kind) {
          case "left":
            return { x: -48, opacity: 0 };
          case "right":
            return { x: 48, opacity: 0 };
          case "scale":
            return { scale: 0.92, opacity: 0 };
          default:
            return { y: 36, opacity: 0 };
        }
      };

      // Reveals simples, agrupados por tipo para ganhar stagger natural
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      els.forEach((el) => {
        const kind = el.dataset.reveal ?? "up";
        if (kind === "mask") {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
          const img = el.querySelector("img, [data-photo]");
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.18 },
              {
                scale: 1,
                duration: 1.6,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              },
            );
          }
          return;
        }
        const delay = Number(el.dataset.delay ?? 0);
        gsap.fromTo(el, from(kind), {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Grupos com stagger (cards)
      gsap.utils.toArray<HTMLElement>("[data-stagger-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
        gsap.fromTo(
          items,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          },
        );
      });

      // Barra de progresso da página
      const bar = document.querySelector<HTMLElement>("[data-progress]");
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
          },
        );
      }

      // Efeitos mais pesados só em desktop com mouse
      const inner = gsap.matchMedia();
      inner.add(MQ.desktop, () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax ?? 0.12);
          gsap.fromTo(
            el,
            { yPercent: -speed * 100 },
            {
              yPercent: speed * 100,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });

      // Garante cálculo correto após fontes/imagens
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);

      return () => {
        inner.revert();
        window.removeEventListener("load", refresh);
        root.classList.remove("js-anim");
      };
    });

    return () => mm.revert();
  }, []);
}
