// Projetos em lista, não em cards: uma linha por projeto com "Nome — Cliente".
// Apontar o nome mostra o print do projeto (HoverPreviewLink); clicar abre a
// descrição completa. Assim a página não obriga ninguém a ler catorze blocos
// de texto para achar o que interessa.
//
// O abrir/fechar é <details> nativo: sem estado em React, sem JS, e o teclado
// funciona de graça. Os links do projeto ficam dentro do corpo aberto — o nome
// não é link justamente para que o primeiro clique revele o conteúdo.

import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { HoverPreviewLink } from "@/components/ui/hover-preview";
import type { Project } from "@/content/projects";
import type { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

// União de pt|en — usar typeof ui["pt"] fixaria os literais em português.
type Ui = ReturnType<typeof getUi>;

const statusColor: Record<Project["status"], string> = {
  producao: "text-accent",
  funcional: "text-cyan",
  dev: "text-amber-400",
  planejamento: "text-muted",
};

export function ProjectList({
  projects,
  locale,
  ui,
}: {
  projects: Project[];
  locale: Locale;
  ui: Ui;
}) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {projects.map((p) => (
        <details key={p.slug} className="project-row group">
          <summary className="flex items-center gap-3 py-4 transition-colors hover:bg-surface/40 md:gap-4 md:py-5">
            <ChevronRight className="project-caret h-4 w-4 shrink-0 text-faint" />

            <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="font-display text-base font-semibold tracking-tight md:text-lg">
                {p.image ? (
                  <HoverPreviewLink
                    focusable={false}
                    preview={{ image: p.image, title: p.name, subtitle: p.tagline[locale] }}
                  >
                    {p.name}
                  </HoverPreviewLink>
                ) : (
                  p.name
                )}
              </span>
              <span aria-hidden className="text-faint">
                —
              </span>
              <span className="text-sm text-muted">{p.company}</span>
            </div>

            <span className={`shrink-0 font-mono text-[10px] uppercase tracking-wider ${statusColor[p.status]}`}>
              ● {ui.status[p.status]}
            </span>
          </summary>

          <div className="project-body">
            <div>
              <div className="max-w-3xl pb-6 pl-7 pr-1 md:pl-8">
                <p className="text-sm text-fg/90 md:text-base">{p.tagline[locale]}</p>

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

                <div className="mt-5">
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                    {ui.labels.stack}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {p.links && p.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {p.links.map((l) => (
                      <Link
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-medium text-cyan transition-colors hover:text-fg"
                      >
                        {l.label} <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function Line({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <dt className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-faint sm:w-20">{label}</dt>
      <dd className={accent ? "text-fg/90" : "text-muted"}>{value}</dd>
    </div>
  );
}
