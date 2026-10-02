"use client";

// Abertura: a assinatura animada da deciban (manual §6.7) em tela cheia, sobre
// carvão, antes da página. Toca uma vez por sessão em cada lado do site; quem
// já viu (ou chegou por uma âncora) entra direto. Dá para pular.
//
// O script inline marca o <html> ANTES do primeiro paint, então quem já viu
// nunca vê a cortina piscar (data-intro="seen"). Ao terminar, data-intro="done"
// libera as entradas do hero (CSS) enquanto a cortina sobe.

import { useEffect, useRef, useState } from "react";
import { DECIBAN, DECIBAN_MARK_END, drawDecibanMark } from "@/lib/deciban-mark";

const HOLD = 0.5; // segura a marca montada antes de abrir a cortina
const OUT_MS = 900;

export function BrandIntro({ id, label, skipLabel }: { id: string; label: string; skipLabel: string }) {
  const key = `intro:${id}`;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(key, "1");
    } catch {}
    setLeaving(true);
    document.documentElement.dataset.intro = "done";
    delete document.body.dataset.scrollLock;
    window.setTimeout(() => setGone(true), OUT_MS);
  };

  useEffect(() => {
    const html = document.documentElement;
    let seen = location.hash.length > 1;
    try {
      seen ||= !!sessionStorage.getItem(key);
    } catch {}
    if (seen) {
      html.dataset.intro ||= "seen";
      // eslint-disable-next-line react-hooks/set-state-in-effect -- já visto: a cortina nem monta
      setGone(true);
      return;
    }
    // Navegação no cliente vinda do outro lado do site: o <html> ainda diz
    // "done". Zera para as entradas desta página esperarem a cortina.
    delete html.dataset.intro;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return finish();

    document.body.dataset.scrollLock = "";
    window.scrollTo(0, 0);
    const mono = getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace";

    const draw = (t: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
      if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr);
      const scale = Math.min((w * 0.8) / 440, (h * 0.5) / 350, 1.7);
      // a legenda dentro da marca é só "um produto"/"made by" (manual §6.7);
      // o contexto da página vai embaixo, em HTML
      drawDecibanMark(ctx, w, h, t, { scale, focusY: 430, mono, readout: true });
    };

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      draw(Math.min(t, DECIBAN_MARK_END));
      if (t < DECIBAN_MARK_END + HOLD) raf = requestAnimationFrame(tick);
      else finish();
    };
    // espera a fonte mono para a legenda não trocar de letra no meio
    void document.fonts.ready.then(() => {
      raf = requestAnimationFrame(tick);
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      delete document.body.dataset.scrollLock;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem(${JSON.stringify(key)})||location.hash.length>1)document.documentElement.dataset.intro="seen"}catch(e){}`,
        }}
      />
      <div className="intro" data-leaving={leaving} style={{ background: DECIBAN.bg }}>
        <div className="intro-field" aria-hidden />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" role="img" aria-label={`deciban — ${label}`} />
        <p className="intro-caption">{label}</p>
        <button type="button" onClick={finish} className="intro-skip">
          {skipLabel}
          <span aria-hidden className="ml-2 text-[#6b5f57]">esc</span>
        </button>
      </div>
    </>
  );
}
