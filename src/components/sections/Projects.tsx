import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { projects } from "@/content/projects";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

const statusColor: Record<string, string> = {
  producao: "text-accent",
  funcional: "text-cyan",
  dev: "text-amber-400",
  planejamento: "text-muted",
};

export function Projects({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeader eyebrow="03" title={ui.sections.projectsTitle} subtitle={ui.sections.projectsSubtitle} />

      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:border-border-strong hover:bg-surface">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-0.5 text-xs text-faint">{p.company}</p>
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-wider ${statusColor[p.status]}`}>
                  ● {ui.status[p.status]}
                </span>
              </div>

              <p className="mt-4 text-sm text-muted">{p.tagline[locale]}</p>

              <dl className="mt-4 space-y-2 text-sm">
                <Line label={ui.labels.problem} value={p.problem[locale]} />
                <Line label={ui.labels.solution} value={p.solution[locale]} accent />
                {p.result && <Line label={ui.labels.result} value={p.result[locale]} />}
              </dl>

              {p.metrics && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {p.metrics.map((m) => (
                    <div key={m.value}>
                      <span className="font-display text-xl font-bold text-gradient">{m.value}</span>
                      <span className="ml-1.5 text-xs text-faint">{m.label[locale]}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">{s}</span>
                ))}
              </div>

              {p.links && p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4">
                  {p.links.map((l) => (
                    <Link key={l.url} href={l.url} target="_blank" className="inline-flex items-center gap-1 text-xs font-medium text-cyan transition-colors hover:text-fg">
                      {l.label} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-border-strong">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold">{p.name}</h3>
                <span className={`font-mono text-[10px] uppercase ${statusColor[p.status]}`}>● {ui.status[p.status]}</span>
              </div>
              <p className="mt-2 flex-1 text-sm text-muted">{p.tagline[locale]}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint">{s}</span>
                ))}
              </div>
              {p.links && p.links[0] && (
                <Link href={p.links[0].url} target="_blank" className="mt-4 inline-flex items-center gap-1 text-xs text-cyan hover:text-fg">
                  {p.links[0].label} <ArrowUpRight className="h-3 w-3" />
                </Link>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Line({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-faint">{label}</dt>
      <dd className={accent ? "text-fg/90" : "text-muted"}>{value}</dd>
    </div>
  );
}
