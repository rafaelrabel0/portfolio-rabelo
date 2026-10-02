"use client";

// Leitura de instrumento no canto da tela: capítulo atual e a escala de décimos
// do manual (§6.2) — dez divisões, uma acesa — marcando quanto da página já foi.
// É o lembrete discreto de que o site também é um projeto.

import { useEffect, useState } from "react";
import { onActiveChapter } from "@/lib/scene-engine";
import { cn } from "@/lib/cn";

export type Chapter = { id: string; label: string };

export function SceneHud({ chapters, className }: { chapters: Chapter[]; className?: string }) {
  const [active, setActive] = useState("");
  const [tenth, setTenth] = useState(0);

  useEffect(() => {
    const off = onActiveChapter(setActive);
    return () => {
      off();
    };
  }, []);

  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setTenth(max > 0 ? Math.min(9, Math.floor((window.scrollY / max) * 10)) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const i = chapters.findIndex((c) => c.id === active);
  const chapter = chapters[i];

  return (
    <div
      aria-hidden
      data-show={!!chapter}
      className={cn(
        "hud pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-faint lg:flex",
        className
      )}
    >
      <span className="tabular-nums text-muted">
        {String(i + 1).padStart(2, "0")}
        <span className="text-faint"> / {String(chapters.length).padStart(2, "0")}</span>
      </span>
      <span className="flex gap-[3px]">
        {Array.from({ length: 10 }, (_, k) => (
          <i key={k} className={cn("tick", k === tenth && "on", k < tenth && "past")} />
        ))}
      </span>
      <span key={chapter?.id} className="hud-label text-muted">
        {chapter?.label}
      </span>
    </div>
  );
}
