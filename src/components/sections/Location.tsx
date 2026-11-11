import { MapPin, Navigation } from "lucide-react";
import { InstagramIcon } from "../ui/InstagramIcon";
import { MAPS, SCHEDULE, SITE } from "../../data/content";
import { whatsappUrl } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

export function Location() {
  const a = SITE.address;
  return (
    <section id="local" className="section theme-light section-pad" aria-labelledby="local-title">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal="up" className="eyebrow">Localização e contato</p>
          <h2 id="local-title" data-reveal="up" className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">
            Te esperamos na <span className="highlight">areia</span>
          </h2>

          <address data-reveal="up" className="mt-6 flex gap-3 text-lg not-italic">
            <MapPin className="mt-1 shrink-0 text-navy-800" aria-hidden="true" />
            <span>
              {a.street}
              <br />
              {a.district}, {a.city}/{a.state}
              <br />
              <strong>{a.reference}</strong>
            </span>
          </address>

          <ul data-reveal="up" className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 text-[var(--muted)]">
            {SCHEDULE.map((d) => (
              <li key={d.day} className="flex justify-between border-b border-[var(--line)] py-1.5">
                <span className="font-semibold text-navy-950">{d.short}</span>
                <span>{d.slots.length ? d.slots.join(" · ") : "note" in d ? d.note : ""}</span>
              </li>
            ))}
          </ul>

          <div data-reveal="up" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={MAPS.route} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Navigation size={20} aria-hidden="true" />
              Abrir rota
              <span className="sr-only">(Google Maps, nova aba)</span>
            </a>
            <a href={whatsappUrl("Olá! Vim pelo site do Emagrece na Praia.")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-navy-950">
              <WhatsAppIcon size={20} />
              WhatsApp
              <span className="sr-only">(nova aba)</span>
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-navy-950">
              <InstagramIcon size={20} />
              Instagram
              <span className="sr-only">(nova aba)</span>
            </a>
          </div>
        </div>

        <div data-reveal="mask" className="min-h-[22rem] overflow-hidden rounded-[2rem] shadow-xl lg:col-span-7 lg:min-h-[32rem]">
          <iframe
            title="Mapa com o local dos treinos do Emagrece na Praia, na Av. Historiador Raimundo Girão, 1002, Fortaleza"
            src={MAPS.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[22rem] w-full border-0 lg:min-h-[32rem]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
