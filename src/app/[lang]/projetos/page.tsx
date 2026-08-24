import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ProjectList } from "@/components/ui/project-list";
import { categoryOrder, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import { isLocale } from "@/lib/i18n";

// Lista completa — todo projeto, de cliente ou próprio, agrupado por categoria.
// A home mostra só os destaques e manda para cá.

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "pt";
  const ui = getUi(locale);
  const title = `${ui.sections.allProjectsTitle} — ${profile.shortName}`;

  return {
    metadataBase: new URL("https://rabelo.company"),
    alternates: { canonical: `/${locale}/projetos`, languages: { "pt-BR": "/pt/projetos", en: "/en/projetos" } },
    title,
    description: ui.sections.allProjectsSubtitle,
    openGraph: {
      title,
      description: ui.sections.allProjectsSubtitle,
      type: "website",
      url: `/${locale}/projetos`,
      siteName: "Rabelo Co.",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function ProjetosPage({ params }: PageProps<"/[lang]/projetos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const ui = getUi(lang);

  return (
    <>
      <Nav locale={lang} />
      <main className="pt-16">
        <Section>
          <SectionHeader
            eyebrow={String(projects.length).padStart(2, "0")}
            title={ui.sections.allProjectsTitle}
            subtitle={ui.sections.allProjectsSubtitle}
          />

          <div className="space-y-12">
            {categoryOrder.map((cat) => {
              const list = projects.filter((p) => p.category === cat);
              if (list.length === 0) return null;

              return (
                <Reveal key={cat}>
                  <h2 className="mb-3 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {ui.projectCategories[cat]}
                    <span className="text-faint">({list.length})</span>
                  </h2>
                  <ProjectList projects={list} locale={lang} ui={ui} />
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12">
            <Link
              href={`/${lang}#projects`}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" /> {ui.privacy.backHome}
            </Link>
          </div>
        </Section>
      </main>
      <Footer locale={lang} />
    </>
  );
}
