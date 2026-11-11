import { Photo } from "../ui/Photo";

const WORDS = ["Saúde", "Movimento", "Resultados"];

function MarqueeRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: 4 }).flatMap((_, r) =>
        WORDS.map((w) => (
          <li key={`${r}-${w}`} className="display flex items-center whitespace-nowrap px-6 text-[clamp(2.2rem,6vw,4.5rem)] text-navy-950">
            {w}
            <span aria-hidden="true" className="ml-12 text-navy-800/60">•</span>
          </li>
        )),
      )}
    </ul>
  );
}

export function Immersive() {
  return (
    <>
      {/* Faixa horizontal animada com o lema do logotipo */}
      <section aria-label="Saúde, Movimento, Resultados" className="section theme-light overflow-hidden bg-sun-400 py-5 !bg-sun-400">
        <div className="marquee-track">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </section>

      <section className="section theme-dark relative isolate flex min-h-[80svh] items-center overflow-hidden" aria-labelledby="estilo-title">
        <div className="absolute inset-0 -z-10 h-[125%] w-full -top-[12%]">
          <Photo
            src="/images/panoramica.png"
            alt="Vista panorâmica da Praia de Iracema durante o treino"
            width={2400}
            height={1200}
            parallax={0.12}
            label="Foto real panorâmica (panoramica.webp)"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-navy-950/60" aria-hidden="true" />
        <div className="container-x px-4 py-24 text-center">
          <h2 id="estilo-title" data-reveal="scale" className="display mx-auto max-w-5xl text-[clamp(2.8rem,9vw,7.5rem)] text-white">
            Não é apenas treino.
            <br />
            <span className="text-sun-400">É um estilo de vida.</span>
          </h2>
          <p data-reveal="up" className="mx-auto mt-6 max-w-xl text-lg text-white/90">
            Areia, mar, música e gente que torce por você. Aqui o treino vira o melhor momento do dia.
          </p>
        </div>
      </section>
    </>
  );
}
