"use client";

// Cena 6 — skills & ferramentas. Três faixas passando em sentidos alternados;
// apontar para uma skill pausa as faixas e abre a leitura embaixo: como ela
// entra no trabalho, com quais ferramentas e onde já está em produção.
// No toque, tocar escolhe.

import { useState } from "react";
import { skills } from "@/content/skills";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const ROWS = [skills.slice(0, 6), skills.slice(6, 11), skills.slice(11)];
const SPEED = [58, 46, 52];

export function Skills({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const current = skills.find((s) => s.slug === (active ?? pinned));

  return (
    <section id="skills" data-chapter="skills" className="relative scroll-mt-16 overflow-hidden py-28 md:py-36">
      <div className="mx-auto mb-12 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6" data-r>
        <div>
          <p className="label mb-3 flex items-center gap-3">
            <span className="text-accent">06</span> {ui.skills.label}
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight md:text-5xl">{ui.skills.title}</h2>
        </div>
        <p className="label hidden md:block">{ui.skills.hint}</p>
      </div>

      <div className="grid gap-3" onPointerLeave={() => setActive(null)} data-r>
        {ROWS.map((row, r) => (
          <div
            key={r}
            className="marquee"
            data-direction={r % 2 ? "right" : "left"}
            data-paused={!!active}
            style={{ ["--marquee-duration" as string]: `${SPEED[r]}s`, ["--marquee-gap" as string]: "12px" }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-track" aria-hidden={copy === 1}>
                {row.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    tabIndex={copy === 1 ? -1 : 0}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(s.slug)}
                    onFocus={() => setActive(s.slug)}
                    onBlur={() => setActive(null)}
                    onClick={() => setPinned((p) => (p === s.slug ? null : s.slug))}
                    className={cn("skill-pill", (active ?? pinned) === s.slug && "on")}
                  >
                    <i aria-hidden />
                    {s.name[locale]}
                  </button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* leitura */}
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6" aria-live="polite">
        <div className="skill-readout" data-on={!!current}>
          {current ? (
            <div key={current.slug} className="skill-read grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12">
              <div>
                <p className="label mb-3">{ui.skills.label}</p>
                <p className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{current.name[locale]}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
                  <span aria-hidden className="pair" />
                  <span>
                    <span className="text-faint">{ui.skills.proof}: </span>
                    {current.proof[locale]}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-fg md:text-xl">{current.how[locale]}</p>
                <p className="label mt-6 mb-2">{ui.skills.tools}</p>
                <div className="flex flex-wrap gap-1.5">
                  {current.tools.map((t) => (
                    <span key={t} className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="skill-idle label">{ui.skills.hint}</p>
          )}
        </div>
      </div>
    </section>
  );
}
