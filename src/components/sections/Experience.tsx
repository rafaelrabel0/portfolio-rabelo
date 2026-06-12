import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { experience } from "@/content/skills";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Experience({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  return (
    <Section id="experience">
      <SectionHeader eyebrow="02" title={ui.sections.experienceTitle} />
      <div className="space-y-12">
        {experience.map((exp) => (
          <Reveal key={exp.company}>
            <div className="grid gap-6 md:grid-cols-[260px_1fr]">
              <div>
                <p className="font-mono text-xs text-accent">{exp.period}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{exp.role[locale]}</h3>
                <p className="mt-1 text-sm text-muted">{exp.company}</p>
              </div>
              <ul className="space-y-4 border-l border-border pl-6">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="relative text-sm leading-relaxed text-muted">
                    <span className="absolute -left-[27px] top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    {b[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
