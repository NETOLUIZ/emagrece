import { BENEFITS } from "../../data/content";
import { Icon } from "../ui/Icon";

export function Benefits() {
  return (
    <section id="beneficios" className="section theme-sky section-pad" aria-labelledby="beneficios-title">
      <div className="container-x">
        <div className="max-w-3xl">
          <p data-reveal="up" className="eyebrow">Por que treinar na praia?</p>
          <h2 id="beneficios-title" data-reveal="up" className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">
            Ar livre muda <span className="highlight">tudo</span>
          </h2>
        </div>

        <ul data-stagger-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <li
              key={b.title}
              data-stagger-item
              className={`group rounded-[1.75rem] bg-white p-7 shadow-[0_18px_40px_-28px_rgba(10,31,92,0.5)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-26px_rgba(10,31,92,0.55)] ${
                i % 3 === 1 ? "lg:translate-y-6 lg:hover:translate-y-[1.1rem]" : ""
              }`}
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-sun-400 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110">
                <Icon name={b.icon} size={28} />
              </span>
              <h3 className="display mt-5 text-3xl">{b.title}</h3>
              <p className="mt-2 text-[var(--muted)]">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
