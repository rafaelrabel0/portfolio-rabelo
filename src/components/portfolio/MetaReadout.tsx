"use client";

// Painel "você está dentro de um dos projetos": leituras ao vivo do próprio
// site — quadros por segundo do motor, quanto da página já foi, tela e tema.

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

export function MetaReadout({ locale, title, text }: { locale: Locale; title: string; text: string }) {
  const [r, setR] = useState({ fps: 60, sp: 0, w: 0, h: 0, theme: "dark" });

  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let since = performance.now();
    const tick = (now: number) => {
      frames++;
      if (now - since >= 500) {
        const fps = Math.round((frames * 1000) / (now - since));
        frames = 0;
        since = now;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setR({
          fps: Math.min(fps, 240),
          sp: max > 0 ? Math.round((window.scrollY / max) * 100) : 0,
          w: window.innerWidth,
          h: window.innerHeight,
          theme: document.documentElement.dataset.theme === "light" ? (locale === "pt" ? "claro" : "light") : locale === "pt" ? "escuro" : "dark",
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [locale]);

  const rows: [string, string][] = [
    [locale === "pt" ? "motor" : "engine", `${r.fps} fps`],
    [locale === "pt" ? "página" : "page", `${r.sp}%`],
    [locale === "pt" ? "tela" : "screen", r.w ? `${r.w}×${r.h}` : "—"],
    [locale === "pt" ? "tema" : "theme", r.theme],
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <p className="font-display text-base text-fg">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
      <div className="mt-4 grid grid-cols-4 gap-2 border-t border-border pt-3 font-mono text-[11px]">
        {rows.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <p className="uppercase tracking-[0.14em] text-faint">{k}</p>
            <p className="mt-1 truncate tabular-nums text-fg">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
