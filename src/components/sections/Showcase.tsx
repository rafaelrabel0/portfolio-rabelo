import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ShowcaseStage } from "@/components/showcase/ShowcaseStage";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Showcase({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <Section id="showcase">
      <SectionHeader eyebrow="04" title={ui.sections.showcaseTitle} subtitle={ui.sections.showcaseSubtitle} />

      <Reveal>
        <ShowcaseStage locale={locale} />
      </Reveal>
    </Section>
  );
}
