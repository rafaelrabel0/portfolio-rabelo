// A deciban — de onde vem o nome. A cena refaz Bletchley Park no scroll: as
// fitas deslizam, encaixam, os furos coincidentes acendem e aí vem a fórmula,
// a história e os valores que o nome obriga.

import { TapePair } from "@/components/ui/tape-pair";
import { services } from "@/content/services";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function NameScene({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const n = services.name;
  const lines =
    locale === "pt"
      ? ["Duas fitas perfuradas, deslizando contra a luz.", "Onde os furos coincidem, há evidência."]
      : ["Two punched tapes, sliding against the light.", "Where the holes line up, there is evidence."];

  return (
    <section id="deciban" data-chapter="deciban" data-scene className="name-scene relative">
      <div className="stage">
        <div className="mx-auto grid h-full w-full max-w-7xl content-center gap-10 px-4 pb-10 pt-20 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="label mb-3 flex items-center gap-3">
              <span className="text-accent">02</span> {n.eyebrow[locale]} · Bletchley Park, 1941
            </p>
            <div className="name-tapes my-10 md:my-14">
              <TapePair n={31} />
            </div>
            <div className="relative min-h-[3.2em] font-display text-2xl leading-snug tracking-tight md:text-3xl">
              <p className="nm-l1 absolute inset-0">{lines[0]}</p>
              <p className="nm-l2 absolute inset-0">{lines[1]}</p>
            </div>
            <p className="nm-formula mt-8 inline-block rounded-xl border border-border bg-surface/80 px-4 py-3 font-mono text-sm text-paper md:text-base">
              deciban = 10 · log₁₀ ({locale === "pt" ? "razão de verossimilhanças" : "likelihood ratio"})
            </p>
          </div>

          <div className="nm-right min-w-0">
            <h2 className="font-display text-2xl font-medium leading-tight tracking-tight md:text-4xl">{n.title[locale]}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{n.story[locale]}</p>
            <p className="mt-3 text-base leading-relaxed text-muted">{n.why[locale]}</p>
            <p className="label mt-8 mb-3">{ui.services.valuesLabel}</p>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {services.values.map((v, i) => (
                <div key={i} className="nm-value bg-surface p-4" style={{ ["--k" as string]: i }}>
                  <p className="text-sm font-semibold text-fg">{v.name[locale]}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{v.text[locale]}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-faint">{n.founder[locale]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
