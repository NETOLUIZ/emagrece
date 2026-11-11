import { InstagramIcon } from "./ui/InstagramIcon";
import { NAV, SITE } from "../data/content";
import { Logo } from "./ui/Logo";
import { scrollToTarget } from "../hooks/useSmoothScroll";
import { whatsappUrl } from "../lib/whatsapp";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

export function Footer() {
  const a = SITE.address;
  return (
    <footer className="section theme-dark px-4 pb-28 pt-16 sm:pb-16" style={{ background: "var(--color-navy-950)" }}>
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[var(--muted)]">{SITE.bio}. {SITE.tagline}.</p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="eyebrow">Navegação</h2>
          <ul className="mt-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(n.href);
                  }}
                  className="inline-flex min-h-11 items-center text-white/90 underline-offset-4 hover:text-sun-400 hover:underline"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Contato</h2>
          <address className="mt-3 not-italic text-white/90">
            {a.street}
            <br />
            {a.district}, {a.city}/{a.state}
          </address>
          <ul className="mt-4 flex gap-3">
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram do Emagrece na Praia (nova aba)" className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors duration-150 hover:bg-sun-400 hover:text-navy-950">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp do Emagrece na Praia (nova aba)" className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors duration-150 hover:bg-sun-400 hover:text-navy-950">
                <WhatsAppIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 border-t border-white/15 pt-6 text-sm text-[var(--muted)]">
        <p>© {new Date().getFullYear()} Emagrece na Praia. Todos os direitos reservados.</p>
        <p className="mt-1">Os resultados variam de pessoa para pessoa. Antes de iniciar qualquer atividade física, consulte seu médico.</p>
      </div>
    </footer>
  );
}
