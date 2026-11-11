import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, X } from "lucide-react";
import { SITE } from "../../data/content";
import { useGallery } from "../../lib/liveContent";
import { Photo } from "../ui/Photo";

// Padrão bento: alguns itens ocupam mais espaço no grid
const SPAN = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "",
  "",
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "col-span-2",
];

export function Gallery() {
  const items = useGallery();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (d: number) => setIndex((v) => (v === null ? v : (v + d + items.length) % items.length));

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => setIndex(null);
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("close", onClose);
    document.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = index !== null ? items[index] : null;

  return (
    <section id="galeria" className="section theme-dark section-pad" aria-labelledby="galeria-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p data-reveal="up" className="eyebrow">Galeria</p>
            <h2 id="galeria-title" data-reveal="up" className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">
              A turma em <span className="highlight">ação</span>
            </h2>
          </div>
          <a
            data-reveal="up"
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost w-fit text-white"
          >
            Mais no Instagram
            <ExternalLink size={20} aria-hidden="true" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>

        <ul data-stagger-group className="mt-12 grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-4">
          {items.map((g, i) => (
            <li key={g.id} data-stagger-item className={`${SPAN[i] ?? ""} min-h-0`}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Ampliar foto ${i + 1} de ${items.length}`}
                className="group relative block h-full w-full overflow-hidden rounded-3xl"
              >
                <span className="block h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                  <Photo src={g.src} alt={g.alt} width={900} height={900} label={`galeria-${i + 1}.webp`} />
                </span>
                <span className="absolute inset-0 grid place-items-center bg-navy-950/0 text-white opacity-0 transition-[opacity,background-color] duration-200 group-hover:bg-navy-950/45 group-hover:opacity-100 group-focus-visible:bg-navy-950/45 group-focus-visible:opacity-100">
                  <Maximize2 size={28} aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Foto ampliada"
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-navy-950/90"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-10">
          {current && (
            <div className="h-[75dvh] w-full max-w-5xl overflow-hidden rounded-3xl">
              <Photo src={current.src} alt={current.alt} width={1600} height={1200} className="!object-contain" label={`galeria-${(index ?? 0) + 1}.webp`} />
            </div>
          )}
          <button type="button" onClick={close} aria-label="Fechar" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/30" style={{ top: "max(1rem, env(safe-area-inset-top))" }}>
            <X aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/30">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Próxima foto" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/30">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </section>
  );
}
