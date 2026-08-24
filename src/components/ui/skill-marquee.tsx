"use client";

// Faixa infinita das frentes de trabalho. Ao apontar uma frente, a faixa para
// (o pause é CSS, em .marquee[data-pause]) e o painel abaixo lista as
// ferramentas daquela frente — em vez de despejar as cinco listas de uma vez.
//
// O painel tem altura reservada: sem isso a página saltava a cada hover.

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Marquee } from "@/components/ui/marquee";

export type SkillFront = {
  slug: string;
  label: string;
  items: string[];
};

export function SkillMarquee({ fronts, hint }: { fronts: SkillFront[]; hint: string }) {
  const [active, setActive] = useState<string | null>(null);
  const current = fronts.find((f) => f.slug === active);

  const chips = fronts.map((front) => (
    <button
      key={front.slug}
      type="button"
      onMouseEnter={() => setActive(front.slug)}
      onFocus={() => setActive(front.slug)}
      aria-pressed={active === front.slug}
      className={cn(
        "whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-base font-semibold transition-colors md:text-lg",
        active === front.slug
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-border bg-surface/60 text-muted hover:border-border-strong hover:text-fg"
      )}
    >
      {front.label}
    </button>
  ));

  return (
    <div onMouseLeave={() => setActive(null)}>
      {/* Lenta de propósito: o alvo é clicável e a faixa inteira para quando o
          ponteiro entra nela, então dá tempo de escolher a frente. */}
      <Marquee duration={64} gap={16} repeat={3}>
        {chips}
      </Marquee>

      {/* Painel das ferramentas da frente apontada */}
      <div className="mx-auto mt-6 min-h-[104px] w-full max-w-6xl px-5">
        {current ? (
          <div className="rounded-2xl border border-border bg-surface/40 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{current.label}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {current.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-bg/40 px-2.5 py-1 text-xs text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="pt-4 text-center font-mono text-xs text-faint">{hint}</p>
        )}
      </div>
    </div>
  );
}
