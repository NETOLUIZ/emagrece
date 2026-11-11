import { useState } from "react";
import { ImageOff } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Prioridade de carregamento (LCP). */
  eager?: boolean;
  width?: number;
  height?: number;
  /** Rótulo mostrado no espaço reservado quando a foto real ainda não foi enviada. */
  label?: string;
  parallax?: number;
};

/**
 * Foto real quando existir em /public/images; caso contrário, um espaço reservado
 * claramente marcado (nunca usamos foto de terceiros como se fosse da assessoria).
 */
export function Photo({ src, alt, className = "", eager, width = 1600, height = 1000, label, parallax }: Props) {
  const [failed, setFailed] = useState(false);
  // src vem como "/images/x.jpg" nos dados; prefixa com o base path do deploy (ex.: "/emagrece/").
  const resolvedSrc = src.startsWith("/") ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;

  if (failed) {
    return (
      <div
        data-photo
        role="img"
        aria-label={`${alt} (foto ainda não enviada)`}
        className={`relative block h-full w-full overflow-hidden bg-navy-800 ${className}`}
        {...(parallax ? { "data-parallax": parallax } : {})}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 400 250"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2e8fd8" />
              <stop offset="1" stopColor="#bfe3f7" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill="url(#sky)" />
          <circle cx="300" cy="90" r="34" fill="#ffcb2e" />
          <path d="M0 150 C60 135 110 165 170 150 S290 135 400 152 V250 H0Z" fill="#14a9b8" />
          <path d="M0 175 C70 160 120 190 190 175 S300 160 400 178 V250 H0Z" fill="#0f2d80" />
          <path d="M0 205 C80 195 150 215 230 205 S350 195 400 208 V250 H0Z" fill="#f4ead6" />
        </svg>
        <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full bg-navy-950/85 px-3 py-1.5 text-xs font-semibold text-white">
          <ImageOff size={14} aria-hidden="true" />
          {label ?? "Foto real a enviar"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      onError={() => setFailed(true)}
      className={`block h-full w-full object-cover ${className}`}
      {...(parallax ? { "data-parallax": parallax } : {})}
    />
  );
}
