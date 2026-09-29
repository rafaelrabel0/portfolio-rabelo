"use client";

// Assinatura animada da marca no rodapé (manual §6.7).
//
// Regras que o manual fixa e este componente cumpre:
// - sempre sobre carvão #0B0908, nos dois temas do site
// - toca UMA vez, quando entra na tela, e para no quadro final (6,2 s)
// - `focusY: 430` centraliza a marca final; o padrão (540) corta a legenda
//
// O desenho vem de `drawDecibanMark`, a mesma função determinística usada no
// trailer — nada de reimplementar a animação aqui.

import { useEffect, useRef } from "react";
import { DECIBAN, DECIBAN_MARK_END, drawDecibanMark } from "@/lib/deciban-mark";

export function BrandSignature({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let inicio = 0;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      return { width, height };
    };

    const desenhar = (t: number) => {
      const { width, height } = dimensionar();
      // escala pelo canvas: o desenho nasce em 1920×1080
      const scale = Math.min(width / 1920, height / 1080) * 1.9;
      drawDecibanMark(ctx, width, height, t, { scale, focusY: 430, readout: true });
    };

    // Sem movimento: vai direto para o quadro final, que é a marca montada.
    if (reduzido) {
      desenhar(DECIBAN_MARK_END);
      const aoRedimensionar = () => desenhar(DECIBAN_MARK_END);
      window.addEventListener("resize", aoRedimensionar);
      return () => window.removeEventListener("resize", aoRedimensionar);
    }

    desenhar(0);

    const tocar = (agora: number) => {
      if (!inicio) inicio = agora;
      const t = (agora - inicio) / 1000;
      desenhar(Math.min(t, DECIBAN_MARK_END));
      if (t < DECIBAN_MARK_END) raf = requestAnimationFrame(tocar);
    };

    // Toca uma vez, quando aparece.
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observer.disconnect();
        raf = requestAnimationFrame(tocar);
      },
      { threshold: 0.4 }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={className}
      // carvão fixo: é a única área do rodapé na identidade da marca, e vale
      // nos dois temas
      style={{ background: DECIBAN.bg }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="deciban"
        className="block h-[190px] w-full md:h-[240px]"
      />
    </div>
  );
}
