"use client";

// O que construímos — a cena 4 do vídeo da marca em HTML: a lista de frentes
// com um par de furos à esquerda de cada uma; o par acende quando a frente
// entra em foco e volta a 36% quando ela sai. Ao lado, o que já foi entregue
// naquela frente (sem nome de cliente).

import { useRef } from "react";
import { services } from "@/content/services";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { useSceneStep } from "@/components/motion/SceneEngine";
import { cn } from "@/lib/cn";

export function Fronts({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const ref = useRef<HTMLElement>(null);
  const fronts = services.fronts;
  const step = useSceneStep(ref, fronts.length);
  const f = fronts[step];

  return (
    <section
      ref={ref}
      id="frentes"
      data-chapter="frentes"
      data-scene
      className="relative"
      style={{ height: `${fronts.length * 55 + 100}svh` }}
    >
      <div className="stage">
        <div className="mx-auto grid h-full w-full max-w-7xl content-center gap-10 px-4 pb-10 pt-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="label mb-3 flex items-center gap-3">
              <span className="text-accent">01</span> {ui.services.frontsLabel}
            </p>
            <h2 className="mb-8 max-w-lg font-display text-2xl font-medium tracking-tight md:text-4xl">{ui.services.frontsTitle}</h2>
            <ol className="grid gap-1">
              {fronts.map((x, i) => (
                <li key={x.slug} className={cn("front-item", i === step && "on", i < step && "past")}>
                  <span className="front-pair" aria-hidden>
                    <i />
                    <i />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="front-name block truncate font-display tracking-tight">{x.name[locale]}</span>
                    <span className="front-note block truncate font-mono text-[11px] text-faint">{x.note[locale]}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div key={f.slug} className="front-panel h-fit self-center">
            <p className="font-mono text-xs tabular-nums text-faint">
              {String(step + 1).padStart(2, "0")} / {String(fronts.length).padStart(2, "0")}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-fg md:text-xl">{f.text[locale]}</p>
            <p className="label mt-7 mb-3">{ui.services.delivered}</p>
            <ul className="grid gap-2">
              {f.work.map((w, i) => (
                <li key={i} className="front-work" style={{ ["--k" as string]: i }}>
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {w[locale]}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {f.stack.map((s) => (
                <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
