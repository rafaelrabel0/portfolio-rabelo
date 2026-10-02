"use client";

// Como funciona — um trilho com as oito etapas e um ponto ember que anda com o
// scroll. A etapa em foco abre embaixo; ao fim do trilho entram as promessas
// do que o cliente recebe.

import { useRef } from "react";
import { Check } from "lucide-react";
import { services } from "@/content/services";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { useSceneStep } from "@/components/motion/SceneEngine";
import { cn } from "@/lib/cn";

export function Process({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const ref = useRef<HTMLElement>(null);
  const steps = services.process;
  // um passo a mais no fim: as promessas
  const step = useSceneStep(ref, steps.length + 1);
  const cur = steps[Math.min(step, steps.length - 1)];
  const done = step >= steps.length;

  return (
    <section
      ref={ref}
      id="processo"
      data-chapter="processo"
      data-scene
      className="process-scene relative"
      style={{ height: `${(steps.length + 1) * 45 + 100}svh` }}
    >
      <div className="stage">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 pb-10 pt-20 sm:px-6">
          <p className="label mb-3 flex items-center gap-3">
            <span className="text-accent">03</span> {ui.services.processLabel}
          </p>
          <h2 className="max-w-3xl font-display text-2xl font-medium tracking-tight md:text-5xl">{ui.services.processTitle}</h2>

          {/* trilho */}
          <div className="process-rail mt-12 md:mt-16" style={{ ["--n" as string]: steps.length }}>
            <div className="process-line" aria-hidden>
              <i />
            </div>
            <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
              {steps.map((s, i) => (
                <li key={s.n} className={cn("process-node", i === step && "on", i < step && "past")}>
                  <span className="dot" aria-hidden />
                  <span className="mt-4 block font-mono text-[10px] tabular-nums text-faint">{s.n}</span>
                  <span className="process-name mt-1 block text-[13px] font-medium md:text-sm">{s.name[locale]}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 min-h-[220px] md:mt-14">
            {!done ? (
              <div key={cur.n} className="process-detail grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
                <p className="font-display text-6xl font-semibold leading-none tracking-tight text-accent md:text-8xl">{cur.n}</p>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{cur.name[locale]}</p>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">{cur.when[locale]}</p>
                  </div>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{cur.text[locale]}</p>
                </div>
              </div>
            ) : (
              <div className="process-detail">
                <p className="label mb-4">{ui.services.promisesTitle}</p>
                <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {services.promises.map((p, i) => (
                    <li key={i} className="front-work text-base" style={{ ["--k" as string]: i }}>
                      <Check className="h-4 w-4 shrink-0 text-accent" />
                      {p[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
