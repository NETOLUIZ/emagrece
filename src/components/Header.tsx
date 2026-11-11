import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "../data/content";
import { Logo } from "./ui/Logo";
import { scrollToTarget } from "../hooks/useSmoothScroll";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open ? "bg-navy-950/92 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container-x flex items-center justify-between px-4" style={{ height: "var(--header-h)" }}>
        <a href="#inicio" onClick={(e) => go(e, "#inicio")} aria-label="Emagrece na Praia, ir para o início" className="rounded-md">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={(e) => go(e, n.href)}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-semibold text-white/90 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="ml-2">
              <a href="#aula-experimental" onClick={(e) => go(e, "#aula-experimental")} className="btn btn-primary !min-h-11 !py-2 !text-base">
                Aula experimental
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="grid h-12 w-12 place-items-center rounded-full text-white transition-colors duration-150 hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="lg:hidden"
        style={{ height: "calc(100dvh - var(--header-h))", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="container-x flex h-full flex-col gap-1 overflow-y-auto px-4 pb-8 pt-4">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={(e) => go(e, n.href)}
                className="display flex min-h-14 items-center border-b border-white/10 text-3xl text-white"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li className="mt-6">
            <a href="#aula-experimental" onClick={(e) => go(e, "#aula-experimental")} className="btn btn-primary w-full">
              Agendar aula experimental
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
