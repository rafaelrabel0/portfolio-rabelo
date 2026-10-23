"use client";

// A assinatura animada do rodapé (manual §6.7) ocupando o rodapé inteiro:
// toca uma vez no centro, sem divisão nenhuma em volta, e quando termina a marca
// desliza para a esquerda — aí o rodapé avisa (`onSettled`) e os contatos entram
// do lado direito. No celular a marca fica no centro, acima dos contatos.
//
// O canvas cobre o rodapé todo (o pai é carvão nos dois temas), então não existe
// mais a emenda entre o bloco da marca e o bloco dos contatos.

import { useEffect, useRef } from "react";
import { DECIBAN_MARK_END, drawDecibanMark } from "@/lib/deciban-mark";

const SLIDE = 0.9; // s — centro → esquerda depois da marca montada
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function FooterSignature({ onSettled, className }: { onSettled: () => void; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const settled = useRef(onSettled);
  useEffect(() => {
    settled.current = onSettled;
  });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const mono = getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace";
    const wide = () => window.matchMedia("(min-width: 1024px)").matches;

    let t = 0; // tempo da marca
    let s = 0; // 0 → 1 do deslize
    let raf = 0;
    let done = false;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      if (canvas.width !== Math.round(width * dpr)) canvas.width = Math.round(width * dpr);
      if (canvas.height !== Math.round(height * dpr)) canvas.height = Math.round(height * dpr);
      const isWide = wide();
      // a marca precisa caber na metade esquerda depois do deslize
      const room = isWide ? width * 0.46 : width;
      const scale = Math.min((room * 0.82) / 440, (height * 0.7) / 350, 1.3);
      const from = width / 2;
      const to = isWide ? width * 0.25 : width / 2;
      const cx = from + (to - from) * ease(s);
      drawDecibanMark(ctx, width, height, t, { scale, focusY: 430, readout: true, label: "made by", mono, centerX: cx });
    };

    let start = 0;
    const play = (now: number) => {
      if (!start) start = now;
      const el = (now - start) / 1000;
      t = Math.min(el, DECIBAN_MARK_END);
      s = Math.min(1, Math.max(0, (el - DECIBAN_MARK_END - 0.2) / SLIDE));
      draw();
      if (s < 1) {
        raf = requestAnimationFrame(play);
      } else if (!done) {
        done = true;
        settled.current();
      }
    };

    draw();
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        void document.fonts.ready.then(() => (raf = requestAnimationFrame(play)));
      },
      { threshold: 0.35 }
    );
    io.observe(canvas);

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} role="img" aria-label="deciban" className={className} />;
}
