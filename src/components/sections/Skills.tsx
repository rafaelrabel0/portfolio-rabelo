import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { Marquee } from "@/components/ui/marquee";
import { skillGroups, tools } from "@/content/skills";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

const half = Math.ceil(tools.length / 2);
const firstRow = tools.slice(0, half);
const secondRow = tools.slice(half);

function ToolPill({ name }: { name: string }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-fg">
      {name}
    </span>
  );
}

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

      {/* Stack em duas faixas que correm em sentidos opostos — a lista é longa
          e, empilhada, ocupava meia tela sem ninguém ler até o fim. */}
      <Reveal delay={0.1}>
        <p className="mb-5 mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{ui.sections.toolsTitle}</p>
        <div className="-mx-5 space-y-3 md:mx-0">
          <Marquee duration={44} gap={12}>
            {firstRow.map((tool) => (
              <ToolPill key={tool} name={tool} />
            ))}
          </Marquee>
          <Marquee duration={52} gap={12} direction="right">
            {secondRow.map((tool) => (
              <ToolPill key={tool} name={tool} />
            ))}
          </Marquee>
        </div>
      </Reveal>
    </Section>
  );
}
