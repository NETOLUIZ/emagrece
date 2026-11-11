import { Check, Clock, Sunrise, Sunset, Moon, Smartphone } from "lucide-react";
import { PLANS } from "../../data/content";
import { useSchedule } from "../../lib/liveContent";
import { whatsappUrl } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

const slotIcon = (s: string) => {
  const h = parseInt(s, 10);
  if (h < 12) return <Sunrise size={16} aria-hidden="true" />;
  if (h < 18) return <Sunset size={16} aria-hidden="true" />;
  return <Moon size={16} aria-hidden="true" />;
};

export function Plans() {
  const schedule = useSchedule();
  return (
    <section id="planos" className="section theme-light section-pad" aria-labelledby="planos-title">
      <div className="container-x">
        <div className="max-w-3xl">
          <p data-reveal="up" className="eyebrow">Planos e horários</p>
          <h2 id="planos-title" data-reveal="up" className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">
            Preço que cabe <span className="highlight">no seu bolso</span>
          </h2>
          <p data-reveal="up" className="mt-4 text-lg text-[var(--muted)]">
            Fale com a gente pelo WhatsApp para saber valores e escolher o plano ideal para a sua rotina.
          </p>
        </div>

        <ul data-stagger-group className="mt-12 grid gap-6 md:grid-cols-2">
          {PLANS.map((p) => (
            <li key={p.id} data-stagger-item>
              <article
                className={`relative flex h-full flex-col rounded-[2rem] p-8 ${
                  p.highlight ? "bg-navy-950 text-white shadow-[0_30px_60px_-30px_rgba(10,31,92,0.8)]" : "border-2 border-[var(--line)] bg-white"
                }`}
              >
                <span
                  className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    p.highlight ? "bg-sun-400 text-navy-950" : "bg-navy-900 text-white"
                  }`}
                >
                  {p.highlight && <Smartphone size={14} aria-hidden="true" />}
                  {p.badge}
                </span>
                <h3 className="display text-5xl">{p.name}</h3>
                <p className={`mt-2 text-sm font-semibold ${p.highlight ? "text-sun-400" : "text-teal-500"}`} style={p.highlight ? undefined : { color: "#0b6f7a" }}>
                  Frequência: {p.frequency}
                </p>

                <ul className="mt-6 space-y-3">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <Check size={20} className={`mt-0.5 shrink-0 ${p.highlight ? "text-sun-400" : "text-navy-800"}`} aria-hidden="true" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <p className={`mb-4 text-lg font-bold ${p.highlight ? "text-white" : ""}`}>
                    {p.price ?? "Valores pelo WhatsApp"}
                  </p>
                  <a
                    href={whatsappUrl(`Olá! Tenho interesse no ${p.name} do Emagrece na Praia. Pode me passar os valores?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn w-full ${p.highlight ? "btn-primary" : "btn-primary"}`}
                  >
                    <WhatsAppIcon />
                    Quero este plano
                    <span className="sr-only">(abre o WhatsApp em nova aba)</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Horários */}
        <div className="mt-20">
          <h3 data-reveal="up" className="display flex items-center gap-3 text-4xl sm:text-5xl">
            <Clock size={34} aria-hidden="true" />
            Nossos horários
          </h3>
          <ul data-stagger-group className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {schedule.map((d) => (
              <li key={d.day} data-stagger-item className="overflow-hidden rounded-2xl border-2 border-[var(--line)] bg-white">
                <p className="display bg-navy-900 px-4 py-2 text-xl text-white">{d.day}</p>
                {d.slots.length > 0 ? (
                  <ul className="space-y-2 p-4">
                    {d.slots.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-lg font-bold">
                        <span className="text-teal-500" style={{ color: "#0b6f7a" }}>{slotIcon(s)}</span>
                        {s}
                        {parseInt(s, 10) < 12 && <span className="text-xs font-semibold text-[var(--muted)]">da manhã</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-lg font-bold">{"note" in d ? d.note : ""}</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Horários conforme divulgados no Instagram. Antes de ir, confirme no WhatsApp se a turma está confirmada.
          </p>
        </div>
      </div>
    </section>
  );
}
