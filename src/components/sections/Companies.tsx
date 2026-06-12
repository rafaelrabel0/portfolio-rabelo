import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { companies, type ClientStatus } from "@/content/companies";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

const statusDot: Record<ClientStatus, string> = {
  ativo: "bg-accent",
  onboarding: "bg-amber-400",
  parcial: "bg-cyan",
  proposta: "bg-blue-400",
  planejamento: "bg-faint",
};

export function Companies({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <Section id="companies">
      <SectionHeader eyebrow="05" title={ui.sections.companiesTitle} subtitle={ui.sections.companiesSubtitle} />

      <div className="space-y-5">
        {companies.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 2) * 0.06}>
            <article className="rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
              <div className="flex flex-col gap-2 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold">{c.name}</h3>
                    {c.isHolding && (
                      <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">Holding</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">{c.focus[locale]}</p>
                </div>
                {c.links && (
                  <div className="flex flex-wrap gap-3">
                    {c.links.map((l) => (
                      <Link key={l.url} href={l.url} target="_blank" className="inline-flex items-center gap-1 font-mono text-xs text-cyan hover:text-fg">
                        {l.label} <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-fg/85">{c.description[locale]}</p>

              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {/* Serviços */}
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{ui.labels.services}</p>
                  <ul className="space-y-2">
                    {c.services.map((s, j) => (
                      <li key={j} className="flex gap-2 text-sm text-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        {s[locale]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Clientes */}
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                    {ui.labels.clients} {c.clients.length > 0 && <span className="text-faint">({c.clients.length})</span>}
                  </p>
                  {c.clients.length === 0 ? (
                    <p className="text-sm text-faint">{locale === "pt" ? "Produtos próprios da marca." : "In-house brand products."}</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {c.clients.map((cl) => (
                        <li key={cl.name} className="flex items-start gap-2.5 rounded-lg border border-transparent px-2 py-1.5 text-sm transition-colors hover:border-border hover:bg-bg/40">
                          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${statusDot[cl.status]}`} />
                          <span className="min-w-0">
                            <span className="text-fg/90">{cl.name}</span>
                            {cl.segment && <span className="ml-2 text-xs text-faint">{cl.segment[locale]}</span>}
                            {cl.notes && <span className="block text-xs text-muted">{cl.notes[locale]}</span>}
                          </span>
                          <span className="ml-auto shrink-0 font-mono text-[10px] uppercase text-faint">{ui.status[cl.status]}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
