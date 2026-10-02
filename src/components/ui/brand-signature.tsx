"use client";

// Assinatura animada da marca (manual §6.7): fitas → símbolo → nome.
//
// Regras do manual que este componente cumpre:
// - sempre sobre carvão #0B0908, nos dois temas do site
// - toca UMA vez, quando entra na tela, e para no quadro final (6,2 s)
// - `focusY: 430` centraliza a marca final; o padrão (540) corta a legenda
//
// O desenho vem de `drawDecibanMark`, a mesma função do trailer e da abertura.

import { useEffect, useRef } from "react";
import { DECIBAN, DECIBAN_MARK_END, drawDecibanMark } from "@/lib/deciban-mark";
import { cn } from "@/lib/cn";

export function BrandSignature({
  className,
  canvasClassName,
  label,
  onStart,
}: {
  className?: string;
  canvasClassName?: string;
  label?: string;
  /** Chamado quando a animação começa a tocar (para sincronizar o entorno). */
  onStart?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef(onStart);
  useEffect(() => {
    startRef.current = onStart;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let inicio = 0;
    let t = 0;
    const mono = getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace";

    const desenhar = (tt: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const scale = Math.min((width * 0.82) / 440, (height * 0.78) / 350, 1.25);
      drawDecibanMark(ctx, width, height, tt, { scale, focusY: 430, readout: true, label, mono });
    };

    desenhar(0);

    const tocar = (agora: number) => {
      if (!inicio) inicio = agora;
      t = Math.min((agora - inicio) / 1000, DECIBAN_MARK_END);
      desenhar(t);
      if (t < DECIBAN_MARK_END) raf = requestAnimationFrame(tocar);
    };

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observer.disconnect();
        startRef.current?.();
        void document.fonts.ready.then(() => (raf = requestAnimationFrame(tocar)));
      },
      { threshold: 0.35 }
    );
    observer.observe(canvas);

    const aoRedimensionar = () => desenhar(t);
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [label]);

  return (
    <div className={className} style={{ background: DECIBAN.bg }}>
      <canvas ref={canvasRef} role="img" aria-label="deciban" className={cn("block w-full", canvasClassName ?? "h-[220px]")} />
    </div>
  );
}
