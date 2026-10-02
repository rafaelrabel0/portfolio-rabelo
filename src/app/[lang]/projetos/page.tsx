import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { categoryOrder, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import { isLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

// Todos os projetos — próprios e de cliente, agrupados por categoria. Cada um
// com o diagrama do próprio fluxo (sem print, sem nome de cliente).

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "pt";
  const ui = getUi(locale);
  const title = `${ui.projects.allTitle} — ${profile.shortName}`;
  return {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: `/${locale}/projetos`, languages: { "pt-BR": "/pt/projetos", en: "/en/projetos" } },
    title,
    description: ui.projects.allSubtitle,
    openGraph: { title, description: ui.projects.allSubtitle, type: "website", url: `/${locale}/projetos`, siteName: "deciban", images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}

export default async function ProjetosPage({ params }: PageProps<"/[lang]/projetos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const ui = getUi(lang);

  return (
    <>
      <Nav locale={lang} world="portfolio" />
      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6">
        <Link href={`/${lang}#projetos`} className="btn btn-ghost -ml-2.5 mb-8">
          <ArrowLeft className="h-4 w-4" /> {ui.privacy.backHome}
        </Link>
        <p className="label mb-3">
          <span className="text-accent">{String(projects.length).padStart(2, "0")}</span> · {ui.projects.label}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-7xl">
          {ui.projects.allTitle}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{ui.projects.allSubtitle}</p>

        <div className="mt-20 grid gap-24">
          {categoryOrder.map((cat, c) => {
            const list = projects.filter((p) => p.category === cat);
            if (!list.length) return null;
            return (
              <section key={cat}>
                <h2 className="mb-8 flex items-baseline gap-3 border-b border-border pb-4 font-display text-2xl font-medium tracking-tight md:text-3xl" data-r>
                  <span className="font-mono text-xs text-accent">{String(c + 1).padStart(2, "0")}</span>
                  {ui.projectCategories[cat]}
                  <span className="font-mono text-xs text-faint">({list.length})</span>
                </h2>
                <div className="grid gap-5 lg:grid-cols-2">
                  {list.map((p) => (
                    <article key={p.slug} className="all-card" data-r>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                        <span className={p.status === "producao" ? "text-accent" : ""}>{ui.status[p.status]}</span>
                        <span>·</span>
                        <span>{p.origin === "own" ? ui.projects.own : ui.projects.client}</span>
                        <span>·</span>
                        <span>{p.year}</span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                      <p className="mt-1 text-sm text-fg/90">{p.tagline[lang]}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{p.summary[lang]}</p>
                      <FlowDiagram flow={p.flow} compact className="mt-5" />
                      {p.metrics && (
                        <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
                          {p.metrics.map((m) => (
                            <div key={m.value}>
                              <dt className="font-mono text-lg tabular-nums text-fg">{m.value}</dt>
                              <dd className="text-[11px] text-faint">{m.label[lang]}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      <div className="mt-5 flex flex-wrap items-center gap-1.5">
                        {p.stack.map((s) => (
                          <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
                            {s}
                          </span>
                        ))}
                        {p.link && (
                          <a href={p.link.url} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-sm text-fg underline-offset-4 hover:underline">
                            {p.link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer locale={lang} world="portfolio" />
    </>
  );
}
