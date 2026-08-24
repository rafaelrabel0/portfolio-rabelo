import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { Timeline } from "@/components/ui/timeline";
import { timeline } from "@/content/timeline";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Experience({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  const entries = timeline.map((m) => ({
    label: m.label[locale],
    title: m.title[locale],
    content: (
      <ul className="space-y-3">
        {m.bullets.map((b, i) => (
          <li key={i} className="relative pl-4 text-sm leading-relaxed text-muted">
            <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-border-strong" />
            {b[locale]}
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <Section id="experience">
      <SectionHeader eyebrow="02" title={ui.sections.experienceTitle} subtitle={ui.sections.experienceSubtitle} />
      <Reveal>
        <Timeline entries={entries} />
      </Reveal>
    </Section>
  );
}
