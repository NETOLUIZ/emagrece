import { ArrowUpRight } from "lucide-react";
import { TRAININGS } from "../../data/content";
import { Photo } from "../ui/Photo";
import { scrollToTarget } from "../../hooks/useSmoothScroll";

export function Trainings() {
  return (
    <section id="treinos" className="section theme-dark section-pad" aria-labelledby="treinos-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p data-reveal="up" className="eyebrow">Nossos treinos</p>
            <h2 id="treinos-title" data-reveal="up" className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">
              Movimento que <span className="highlight">anima</span>
            </h2>
          </div>
          <p data-reveal="up" className="max-w-md text-lg text-[var(--muted)]">
            Funcional na rotina, aulões temáticos e a corrida na areia: três jeitos de fazer parte da turma.
          </p>
        </div>

        <ul data-stagger-group className="mt-12 grid gap-5 lg:grid-cols-12">
          {TRAININGS.map((t, i) => (
            <li
              key={t.id}
              data-stagger-item
              className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <article className="group relative isolate flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] p-7">
                <div className="absolute inset-0 -z-10 transition-transform duration-500 ease-out group-hover:scale-105">
                  <Photo src={t.image} alt={`${t.title}: treino do Emagrece na Praia`} width={1200} height={900} label={`Foto real: ${t.title}`} />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10" aria-hidden="true" />
                <span className="mb-3 inline-flex w-fit rounded-full bg-sun-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">
                  {t.tag}
                </span>
                <h3 className="display text-4xl text-white sm:text-5xl">{t.title}</h3>
                <p className="mt-3 max-w-lg text-white/90">{t.text}</p>
                <p className="mt-4 text-sm font-semibold text-sun-400">{t.meta}</p>
                <a
                  href="#aula-experimental"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget("#aula-experimental");
                  }}
                  className="mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full border border-white/40 px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-navy-950"
                >
                  Quero participar
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
