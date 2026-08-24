// Background animado global — blobs ember (laranja/vermelho/roxo) desfocados em
// deriva lenta, com granulado fino por cima. Paleta das referências.
//
// Só CSS: era framer-motion no root layout, o que arrastava a lib inteira para
// o bundle inicial de toda página. Agora é server component e a animação roda
// no compositor, sem trabalho de JS por frame.

import type { CSSProperties } from "react";

const blobs = [
  {
    size: 720,
    color: "#ff6d2e",
    opacity: 0.16,
    top: "-12%",
    left: "55%",
    x1: "-120px",
    y1: "80px",
    x2: "60px",
    y2: "-40px",
    duration: "34s",
  },
  {
    size: 560,
    color: "#ef3b2d",
    opacity: 0.12,
    top: "30%",
    left: "-10%",
    x1: "100px",
    y1: "-70px",
    x2: "-60px",
    y2: "50px",
    duration: "40s",
  },
  {
    size: 620,
    color: "#8b2bd9",
    opacity: 0.1,
    top: "65%",
    left: "60%",
    x1: "-90px",
    y1: "60px",
    x2: "110px",
    y2: "-80px",
    duration: "46s",
  },
];

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* padrão do wallpaper (símbolo RC tesselado) — camada base bem sutil */}
      <div
        className="bg-pattern absolute inset-0"
        style={{
          backgroundImage: "url(/bg-pattern.webp)",
          backgroundSize: "50% auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />
      {blobs.map((b, i) => (
        <div
          key={i}
          className="blob absolute rounded-full"
          style={
            {
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              opacity: b.opacity,
              background: `radial-gradient(closest-side, ${b.color}, transparent 70%)`,
              filter: "blur(90px)",
              "--blob-duration": b.duration,
              "--blob-x1": b.x1,
              "--blob-y1": b.y1,
              "--blob-x2": b.x2,
              "--blob-y2": b.y2,
            } as CSSProperties
          }
        />
      ))}
      {/* granulado fino por cima dos blobs */}
      <div className="bg-grain absolute inset-0" />
      {/* vinheta para manter o conteúdo legível */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 55%, var(--color-bg) 100%)" }}
      />
    </div>
  );
}
