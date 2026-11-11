/** Barra sutil de progresso da página (animada pelo useScrollAnimations; escondida se não houver animação). */
export function ScrollProgress() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        data-progress
        className="h-full origin-left bg-sun-400"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
