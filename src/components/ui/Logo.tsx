type Props = { className?: string };

/**
 * Wordmark provisório em texto + onda.
 * ⚠️ Substituir pelo logotipo oficial (SVG/PNG) quando a assessoria enviar o arquivo.
 */
export function Logo({ className = "" }: Props) {
  return (
    <span className={`inline-flex flex-col leading-none text-white ${className}`} aria-label="Emagrece na Praia">
      <span className="font-display text-[0.8rem] font-extrabold uppercase tracking-[0.24em]">Emagrece</span>
      <span className="font-display text-[1.7rem] font-black uppercase tracking-wide">
        <span className="text-[0.55em] align-top mr-1 tracking-[0.2em]">na</span>Praia
      </span>
      <svg viewBox="0 0 120 14" className="mt-0.5 h-2.5 w-24" aria-hidden="true">
        <path d="M0 8 C15 0 25 14 40 7 S70 0 85 7 S108 12 120 5" fill="none" stroke="#2e8fd8" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M0 12 C18 6 30 16 48 11 S80 5 96 11 S112 13 120 9" fill="none" stroke="#ffcb2e" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}
