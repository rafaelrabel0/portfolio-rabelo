"use client";

// Cena 3 — percurso. Um calendário de mesa ao lado do marco: a cada passo do
// scroll uma página é arrancada (ou volta, rolando para cima) e o mês do marco
// aparece, com o dia marcado quando o marco tem data. A régua de anos no topo
// acompanha o progresso contínuo da cena.

import { useEffect, useMemo, useRef, useState } from "react";
import { timeline } from "@/content/timeline";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { useSceneStep } from "@/components/motion/SceneEngine";
import { cn } from "@/lib/cn";

const YEARS = [2022, 2023, 2024, 2025, 2026];

function monthGrid(year: number, month: number) {
  const first = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: first }, () => null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  return cells;
}

function Page({ i, locale, className }: { i: number; locale: Locale; className?: string }) {
  const ui = getUi(locale);
  const m = timeline[i];
  const month = new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", { month: "long" }).format(
    new Date(m.year, m.month - 1, 1)
  );
  const cells = monthGrid(m.year, m.month);
  const range = m.period[locale].includes("—");
  return (
    <div className={cn("cal-page", className)}>
      <div className="cal-rings" aria-hidden>
        <i />
        <i />
      </div>
      <div className="flex items-end justify-between gap-3 border-b border-border px-5 pb-3 pt-6">
        <div className="min-w-0">
          <p className="font-display text-3xl font-semibold capitalize tracking-tight text-fg md:text-4xl">{month}</p>
          <p className="mt-0.5 font-mono text-sm tabular-nums text-faint">{m.year}</p>
        </div>
        <span className={cn("shrink-0 text-right font-mono text-[10px] uppercase leading-snug tracking-[0.14em]", range ? "text-muted" : "text-accent")}>
          {m.period[locale]}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-y-1 px-4 pb-4 pt-3 text-center font-mono text-[11px]">
        {ui.schedule.weekdays.map((d, k) => (
          <span key={k} className="pb-1 text-faint">
            {d}
          </span>
        ))}
        {cells.map((d, k) => (
          <span
            key={k}
            className={cn(
              "cal-day mx-auto",
              d === null && "invisible",
              m.day && d === m.day && "is-day",
              !m.day && d !== null && "in-range"
            )}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Experience({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const ref = useRef<HTMLElement>(null);
  const step = useSceneStep(ref, timeline.length);
  const [shown, setShown] = useState(step);
  const [tear, setTear] = useState<{ page: number; dir: 1 | -1; key: number } | null>(null);
  const [tearKey, setTearKey] = useState(0);

  // Troca de página (ajuste de estado no render, o passo vem do scroll):
  // guarda a página que sai para animar por cima da nova.
  if (step !== shown) {
    const dir = step > shown ? 1 : -1;
    setTear({ page: dir === 1 ? shown : step, dir, key: tearKey + 1 });
    setTearKey(tearKey + 1);
    setShown(step);
  }

  useEffect(() => {
    if (!tear) return;
    const t = setTimeout(() => setTear(null), 760);
    return () => clearTimeout(t);
  }, [tear]);

  const m = timeline[shown];
  const yearPos = useMemo(() => {
    const t = timeline[shown];
    return ((t.year - YEARS[0] + (t.month - 1) / 12) / (YEARS.length - 1 + 10 / 12)) * 100;
  }, [shown]);

  return (
    <section
      ref={ref}
      id="percurso"
      data-chapter="percurso"
      data-scene
      className="exp-scene relative"
      style={{ height: `${timeline.length * 62 + 100}svh` }}
    >
      <div className="stage">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 pb-8 pt-20 sm:px-6 md:pt-24 lg:pb-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label mb-3 flex items-center gap-3">
                <span className="text-accent">03</span> {ui.experience.label}
              </p>
              <h2 className="max-w-2xl font-display text-2xl font-medium tracking-tight md:text-4xl">{ui.experience.title}</h2>
            </div>
            <p className="label hidden md:block">{ui.experience.hint}</p>
          </div>

          {/* régua de anos */}
          <div className="relative mx-3 mt-6 h-8 md:mx-4 md:mt-8" aria-hidden>
            <div className="absolute inset-x-0 top-3 h-px bg-border" />
            <div className="year-fill absolute left-0 top-3 h-px bg-accent" style={{ width: `${yearPos}%` }} />
            {YEARS.map((y, k) => (
              <span
                key={y}
                className={cn("absolute top-0 -translate-x-1/2 font-mono text-[11px] tabular-nums", m.year >= y ? "text-fg" : "text-faint")}
                style={{ left: `${(k / (YEARS.length - 1 + 10 / 12)) * 100}%`, paddingTop: 14 }}
              >
                <i className={cn("absolute left-1/2 top-[9px] h-2 w-2 -translate-x-1/2 rounded-full", m.year >= y ? "bg-accent" : "bg-border-strong")} />
                {y}
              </span>
            ))}
            <span className="year-dot absolute top-[7px] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg" style={{ left: `${yearPos}%` }} />
          </div>

          <div className="mt-6 grid min-h-0 flex-1 items-center gap-6 md:mt-4 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] md:gap-14">
            {/* calendário de mesa */}
            <div className="cal mx-auto w-full max-w-[250px] md:max-w-none" aria-hidden>
              <div className="cal-under cal-under-2" />
              <div className="cal-under" />
              <Page i={shown} locale={locale} className={cn(tear?.dir === -1 && "cal-drop")} key={`p-${shown}-${tear?.key ?? 0}`} />
              {tear?.dir === 1 && <Page i={tear.page} locale={locale} className="cal-tear" key={`t-${tear.key}`} />}
            </div>

            {/* o marco */}
            <div key={shown} className="exp-card">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tabular-nums text-faint">
                  {String(shown + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-border-strong" />
                <span className="label text-accent">{m.kicker[locale]}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">{m.title[locale]}</h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{m.text[locale]}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {m.tags.map((t) => (
                  <span key={t} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* escala de décimos: um passo aceso */}
          <div className="mt-6 flex gap-1.5" aria-hidden>
            {timeline.map((_, k) => (
              <i key={k} className={cn("exp-tick", k === shown && "on", k < shown && "past")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
