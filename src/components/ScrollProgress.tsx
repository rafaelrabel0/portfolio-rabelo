// Barra de progresso de scroll no topo, com o gradiente ember do site.
//
// Scroll-driven animation do CSS: zero JS, zero listener de scroll. Onde o
// browser não suporta `animation-timeline` a barra simplesmente não aparece
// (regra .scroll-progress em globals.css) — é decoração, não conteúdo.

export function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[2px]"
      style={{
        background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-2) 55%, #b14ae2)",
      }}
    />
  );
}
