import { Section, SectionHeader } from "@/components/Section";
import { SkillMarquee } from "@/components/ui/skill-marquee";
import { skillGroups } from "@/content/skills";
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
        <SectionHeader eyebrow="07" title={ui.sections.skillsTitle} subtitle={ui.sections.skillsSubtitle} />
      </Section>

      <div className="w-full overflow-hidden pb-24 md:pb-32">
        <SkillMarquee fronts={fronts} hint={ui.sections.skillsHint} />

      </div>
    </>
  );
}

