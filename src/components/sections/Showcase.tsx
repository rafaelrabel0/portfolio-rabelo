import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { AgentChatDemo } from "@/components/showcase/AgentChatDemo";
import { FunnelLiveDemo } from "@/components/showcase/FunnelLiveDemo";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Showcase({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <Section id="showcase">
      <SectionHeader eyebrow="04" title={ui.sections.showcaseTitle} subtitle={ui.sections.showcaseSubtitle} />

      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <AgentChatDemo locale={locale} />
          <p className="mt-3 px-1 text-xs text-faint">{ui.sections.showcaseChatCaption}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <FunnelLiveDemo locale={locale} />
          <p className="mt-3 px-1 text-xs text-faint">{ui.sections.showcaseFunnelCaption}</p>
        </Reveal>
      </div>
    </Section>
  );
}
