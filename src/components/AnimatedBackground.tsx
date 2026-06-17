"use client";

// Background animado global — blobs ember (laranja/vermelho/roxo) desfocados em
// deriva lenta, com granulado fino por cima. Paleta das referências.

import { motion, useReducedMotion } from "framer-motion";

const blobs = [
  {
    size: 720,
    color: "#ff6d2e",
    opacity: 0.16,
    initial: { top: "-12%", left: "55%" },
    x: [0, -120, 60, 0],
    y: [0, 80, -40, 0],
    duration: 34,
  },
  {
    size: 560,
    color: "#ef3b2d",
    opacity: 0.12,
    initial: { top: "30%", left: "-10%" },
    x: [0, 100, -60, 0],
    y: [0, -70, 50, 0],
    duration: 40,
  },
  {
    size: 620,
    color: "#8b2bd9",
    opacity: 0.1,
    initial: { top: "65%", left: "60%" },
    x: [0, -90, 110, 0],
    y: [0, 60, -80, 0],
    duration: 46,
  },
];

export function AnimatedBackground() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* padrão do wallpaper (símbolo RC tesselado) — camada base bem sutil */}
      <div
        className="bg-pattern absolute inset-0"
        style={{
          backgroundImage: "url(/bg-pattern.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            ...b.initial,
            opacity: b.opacity,
            background: `radial-gradient(closest-side, ${b.color}, transparent 70%)`,
            filter: "blur(90px)",
          }}
          animate={reduced ? undefined : { x: b.x, y: b.y, scale: [1, 1.12, 0.95, 1] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
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
