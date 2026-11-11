type Props = {
  /** Cor da seção de cima (a onda "preenche" a parte de baixo com a cor da seção seguinte). */
  from: string;
  to: string;
  flip?: boolean;
};

/** Divisor em onda inspirado no logotipo: assinatura visual entre seções. */
export function Wave({ from, to, flip }: Props) {
  return (
    <div aria-hidden="true" style={{ background: from, lineHeight: 0 }}>
      <svg
        className="wave-divider"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        style={flip ? { transform: "scaleY(-1)" } : undefined}
      >
        <path
          d="M0 40 C 180 10, 320 80, 520 52 S 900 6, 1100 44 S 1340 70, 1440 36 V90 H0 Z"
          fill="var(--color-sun-400)"
          opacity="0.95"
        />
        <path
          d="M0 56 C 200 28, 360 90, 580 64 S 940 24, 1140 60 S 1360 84, 1440 56 V90 H0 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
