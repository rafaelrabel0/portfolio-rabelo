import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ShowcaseStage } from "@/components/showcase/ShowcaseStage";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Showcase({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  // Com o webhook do agente configurado, o card da demo ganha composer real
  // que expande para o chat ao vivo.
  const liveChat = !!process.env.CHAT_WEBHOOK_URL;

  return (
    <Section id="showcase">
      <SectionHeader eyebrow="04" title={ui.sections.showcaseTitle} subtitle={ui.sections.showcaseSubtitle} />

      <Reveal>
        <ShowcaseStage locale={locale} liveChat={liveChat} />
      </Reveal>
    </Section>
  );
}
