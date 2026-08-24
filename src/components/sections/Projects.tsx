import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ProjectList } from "@/components/ui/project-list";
import { categoryOrder, projects } from "@/content/projects";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

// Só os destaques aqui, agrupados por categoria. A lista completa vive em
// /projetos — a home não precisa despejar catorze descrições.

export function Projects({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const featured = projects.filter((p) => p.featured);

  return (
    <Section id="projects">
      <SectionHeader eyebrow="03" title={ui.sections.projectsTitle} subtitle={ui.sections.projectsSubtitle} />

      <div className="space-y-12">
        {categoryOrder.map((cat) => {
          const list = featured.filter((p) => p.category === cat);
          if (list.length === 0) return null;

          return (
            <Reveal key={cat}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {ui.projectCategories[cat]}
              </h3>
              <ProjectList projects={list} locale={locale} ui={ui} />
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.05}>
        <div className="mt-10 flex justify-center">
          <Link href={`/${locale}/projetos`}>
            <InteractiveHoverButton variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              {ui.cta.allProjects}
            </InteractiveHoverButton>
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
