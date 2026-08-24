import { Section, SectionHeader } from "@/components/Section";
import { Marquee } from "@/components/ui/marquee";
import { SkillMarquee } from "@/components/ui/skill-marquee";
import { skillGroups, tools } from "@/content/skills";
import { getUi } from "@/dictionaries/ui";
import { t, type Locale } from "@/lib/i18n";

// Duas faixas infinitas, ambas de borda a borda da tela (fora do container do
// Section, senão a faixa parece começar e terminar no meio da página):
//
// 1. frentes de trabalho — apontar uma pausa a faixa e lista as ferramentas
// 2. stack e ferramentas — só passa; é inventário, não tem o que abrir

export function Skills({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  const fronts = skillGroups.map((g) => ({
    slug: g.slug,
    label: g.category[locale],
    items: g.items.map((item) => t(item, locale)),
  }));

  return (
    <>
      <Section id="skills" className="pb-0 md:pb-0">
        <SectionHeader eyebrow="06" title={ui.sections.skillsTitle} subtitle={ui.sections.skillsSubtitle} />
      </Section>

      <div className="w-full overflow-hidden pb-24 md:pb-32">
        <SkillMarquee fronts={fronts} hint={ui.sections.skillsHint} />

        <p className="mx-auto mb-5 mt-16 w-full max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          {ui.sections.toolsTitle}
        </p>
        <div className="space-y-3">
          <Marquee duration={46} gap={12} repeat={2}>
            {firstRow.map((tool) => (
              <ToolPill key={tool} name={tool} />
            ))}
          </Marquee>
          <Marquee duration={54} gap={12} direction="right" repeat={2}>
            {secondRow.map((tool) => (
              <ToolPill key={tool} name={tool} />
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
}

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
