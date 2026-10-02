// Cena 2 — sobre. Pouco texto: uma frase que acende palavra por palavra
// conforme o scroll, e as leituras de um instrumento ao lado. A última leitura
// é o próprio site — o portfólio também é um dos projetos.

import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { MetaReadout } from "@/components/portfolio/MetaReadout";

export function About({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const f = ui.about.facts;
  const words = ui.about.manifesto.split(" ");
  const facts = [
    [f.base, f.baseV],
    [f.focus, f.focusV],
    [f.lang, f.langV],
    [f.edu, f.eduV],
    [f.company, f.companyV],
    [f.core, f.coreV],
  ];

  return (
    <section id="sobre" data-chapter="sobre" data-scene className="about-scene relative scroll-mt-0">
      <div className="stage">
        <div className="mx-auto grid h-full w-full max-w-7xl content-center gap-10 px-4 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="label mb-6 flex items-center gap-3">
              <span className="text-accent">02</span> {ui.about.label}
            </p>
            <p className="manifesto font-display font-medium tracking-[-0.02em]" style={{ ["--n" as string]: words.length }}>
              {words.map((w, i) => (
                <span key={i} style={{ ["--i" as string]: i }}>
                  {w}{" "}
                </span>
              ))}
            </p>
          </div>

          <div className="grid content-center gap-4">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {facts.map(([k, v], i) => (
                <div key={k} className="fact bg-surface/95 p-4 sm:p-5" style={{ ["--k" as string]: i }}>
                  <dt className="label">{k}</dt>
                  <dd className="mt-2 text-sm leading-snug text-fg sm:text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="fact hidden sm:block" style={{ ["--k" as string]: 6 }}>
              <MetaReadout locale={locale} title={ui.about.meta} text={ui.about.metaText} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
