import { useLayoutEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, MQ } from "../../lib/gsap";
import { Photo } from "../ui/Photo";
import { scrollToTarget } from "../../hooks/useSmoothScroll";
import { SITE } from "../../data/content";

const TITLE = ["Seu", "melhor", "resultado", "começa", "aqui."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          "[data-hero-media]",
          { clipPath: "inset(12% 8% 12% 8% round 32px)", scale: 1.2 },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, duration: 1.6, ease: "expo.out" },
        )
          .fromTo(".hero-word > span", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.09 }, "-=1.0")
          .fromTo("[data-hero-sub]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
          .fromTo("[data-hero-cta] > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.5")
          .fromTo("[data-hero-scroll]", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

        // Profundidade: a foto se move mais devagar que o texto (só desktop com mouse)
        const inner = gsap.matchMedia();
        inner.add(MQ.desktop, () => {
          gsap.to("[data-hero-photo]", {
            yPercent: 14,
            scale: 1.08,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
          gsap.to("[data-hero-content]", {
            yPercent: -10,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "30% top", end: "bottom top", scrub: true },
          });
        });
        return () => inner.revert();
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={root}
      className="section theme-dark relative isolate flex min-h-[100svh] items-end overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div data-hero-media className="absolute inset-0 -z-10">
        <div data-hero-photo className="h-full w-full">
          <Photo
            src="/images/hero.jpg"
            alt="Turma do Emagrece na Praia reunida na areia com a bandeira da assessoria, em Fortaleza"
            eager
            width={1920}
            height={1080}
            label="Foto real do hero (hero.webp)"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/25" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" aria-hidden="true" />
      </div>

      <div data-hero-content className="container-x px-4 pb-24 pt-32 sm:pb-28 lg:pb-32">
        <p className="eyebrow mb-4">{SITE.bio}</p>

        <h1 id="hero-title" className="display text-[clamp(3.4rem,13vw,9.5rem)] text-white">
          {TITLE.map((w, i) => (
            <span key={i} className="hero-word mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className={`inline-block ${w === "aqui." ? "text-sun-400" : ""}`}>{w}</span>
            </span>
          ))}
        </h1>

        <p data-hero-sub className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
          Treine ao ar livre, supere seus limites e transforme sua rotina com o Emagrece na Praia.
        </p>

        <div data-hero-cta className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#aula-experimental"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#aula-experimental");
            }}
            className="btn btn-primary"
          >
            Quero começar
          </a>
          <a
            href="#sobre"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#sobre");
            }}
            className="btn btn-ghost text-white"
          >
            Conhecer a assessoria
          </a>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#sobre"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget("#sobre");
        }}
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:flex"
      >
        Role
        <ArrowDown className="bob" size={22} aria-hidden="true" />
      </a>
    </section>
  );
}
