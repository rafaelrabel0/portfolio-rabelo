import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { skillGroups, tools } from "@/content/skills";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Skills({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  return (
    <Section id="skills">
      <SectionHeader eyebrow="06" title={ui.sections.skillsTitle} />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.category[locale]} delay={(i % 3) * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-surface/40 p-5">
              <h3 className="mb-4 font-display text-sm font-semibold text-fg">{g.category[locale]}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li key={item} className="rounded-md border border-border bg-bg/40 px-2.5 py-1 text-xs text-muted">{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mb-4 mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{ui.sections.toolsTitle}</p>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span key={tool} className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-fg">
              {tool}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
