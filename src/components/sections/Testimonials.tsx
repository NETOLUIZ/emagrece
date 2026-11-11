import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Quote } from "lucide-react";
import { SITE, TESTIMONIALS } from "../../data/content";
import { Photo } from "../ui/Photo";

export function Testimonials() {
  const [i, setI] = useState(0);
  const total = TESTIMONIALS.length;
  const go = (d: number) => setI((v) => (v + d + total) % total);
  const current = TESTIMONIALS[i];

  return (
    <section id="resultados" className="section theme-sky section-pad" aria-labelledby="resultados-title">
      <div className="container-x">
        <p data-reveal="up" className="eyebrow">Resultados e depoimentos</p>
        <h2 id="resultados-title" data-reveal="up" className="display mt-3 max-w-3xl text-[clamp(2.6rem,6vw,5rem)]">
          Gente real, <span className="highlight">histórias reais</span>
        </h2>

        {total > 0 && current ? (
          <div className="mt-12" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de alunos">
            <figure
              key={i}
              className="grid items-center gap-8 rounded-[2rem] bg-white p-6 shadow-xl sm:p-10 md:grid-cols-[14rem_1fr]"
              style={{ animation: "fadeIn 400ms ease-out" }}
            >
              {current.photo && (
                <div className="aspect-square overflow-hidden rounded-3xl">
                  <Photo src={current.photo} alt={`Foto de ${current.name}`} width={600} height={600} label="Foto autorizada" />
                </div>
              )}
              <div className={current.photo ? "" : "md:col-span-2"}>
                <Quote size={36} className="text-sun-500" aria-hidden="true" />
                <blockquote className="mt-3 text-xl leading-relaxed sm:text-2xl">{current.text}</blockquote>
                <figcaption className="mt-4 font-bold">{current.name}</figcaption>
              </div>
            </figure>

            {total > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p aria-live="polite" className="text-sm font-semibold text-[var(--muted)]">
                  {i + 1} de {total}
                </p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior" className="grid h-12 w-12 place-items-center rounded-full bg-navy-900 text-white transition-colors duration-150 hover:bg-navy-800">
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Próximo depoimento" className="grid h-12 w-12 place-items-center rounded-full bg-navy-900 text-white transition-colors duration-150 hover:bg-navy-800">
                    <ChevronRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div data-reveal="up" className="mt-12 grid gap-8 rounded-[2rem] bg-white p-8 shadow-xl md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="text-xl sm:text-2xl">
                As transformações dos nossos alunos são contadas por eles mesmos. Veja os destaques{" "}
                <strong>Depoimentos</strong> e <strong>Antes e depois</strong> no nosso Instagram.
              </p>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Cada pessoa tem seu ritmo: os resultados são individuais e variam conforme dedicação, rotina e alimentação.
              </p>
            </div>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Ver no Instagram
              <ExternalLink size={20} aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
