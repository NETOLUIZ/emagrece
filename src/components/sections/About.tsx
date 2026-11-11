import { Photo } from "../ui/Photo";
import { Counter } from "../ui/Counter";
import { SCHEDULE, SITE } from "../../data/content";

const weeklyClasses = SCHEDULE.reduce((acc, d) => acc + d.slots.length, 0);

export function About() {
  return (
    <section id="sobre" className="section theme-light section-pad" aria-labelledby="sobre-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <div data-reveal="mask" className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(10,31,92,0.55)]">
            <Photo
              src="/images/sobre.jpg"
              alt="Professores e alunos do Emagrece na Praia reunidos na areia"
              className="absolute inset-0 scale-110"
              width={1200}
              height={1500}
              parallax={0.06}
              label="Foto real: time e alunos (sobre.webp)"
            />
          </div>
          <div
            data-reveal="up"
            data-delay="0.25"
            className="absolute -bottom-6 right-3 max-w-[15rem] rounded-2xl bg-sun-400 p-4 text-navy-950 shadow-xl sm:-right-4"
          >
            <p className="display text-2xl leading-none">Aqui você faz parte de uma família.</p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <p data-reveal="up" className="eyebrow">A assessoria</p>
          <h2 id="sobre-title" data-reveal="up" className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">
            Treine pra se tornar <span className="highlight">alguém melhor</span> pra você
          </h2>
          <div className="mt-6 space-y-4 text-lg text-[var(--muted)]">
            <p data-reveal="up">
              O Emagrece na Praia é o funcional mais animado da Praia de Iracema, em Fortaleza. Os treinos acontecem na
              areia, em turmas, com um time de professores que cuida da execução e da segurança de cada aluno.
            </p>
            <p data-reveal="up">
              Mais do que queimar calorias, a proposta é transformar exercício em hábito: cuidar do corpo e da mente,
              treinar por privilégio e não por obrigação, e encontrar na turma a motivação para voltar amanhã.
            </p>
            {/* TODO(conteúdo): história de fundação e missão com as palavras da assessoria. */}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-8">
            <div data-reveal="up" className="flex flex-col-reverse">
              <dt className="mt-1 text-sm font-semibold text-[var(--muted)]">turmas por semana na praia*</dt>
              <dd className="display text-6xl text-navy-800">
                <Counter to={weeklyClasses} />
              </dd>
            </div>
            <div data-reveal="up" data-delay="0.1" className="flex flex-col-reverse">
              <dt className="mt-1 text-sm font-semibold text-[var(--muted)]">edição da Corrida é na areia</dt>
              <dd className="display text-6xl text-navy-800">
                <Counter to={3} suffix="ª" />
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-[var(--muted)]">
            *Conforme os horários divulgados em {SITE.instagramHandle}. Confirme sempre no WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
