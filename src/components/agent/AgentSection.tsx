// Seção do agente — a mesma peça nos dois lados do site. No portfólio mostra
// que, além de automação e plataforma, eu construo agentes; nos serviços é a
// demonstração do que a deciban entrega.

import { AgentStage } from "@/components/agent/AgentStage";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

const LIVE = !!process.env.CHAT_WEBHOOK_URL;

export function AgentSection({
  locale,
  id,
  index,
  variant,
}: {
  locale: Locale;
  id: string;
  index: string;
  variant: "portfolio" | "services";
}) {
  const ui = getUi(locale);
  const title = variant === "portfolio" ? ui.agent.title : ui.agent.servicesTitle;
  const sub = variant === "portfolio" ? ui.agent.sub : ui.agent.servicesSub;

  return (
    <section id={id} data-chapter={id} className="agent-section relative scroll-mt-16 overflow-hidden px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center" data-r>
          <p className="label mb-3 inline-flex items-center gap-3">
            <span className="text-accent">{index}</span> {variant === "portfolio" ? ui.agent.label : ui.nav.demo}
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted md:text-lg">{sub}</p>
        </div>
        <div data-r>
          <AgentStage locale={locale} live={LIVE} variant={variant} />
        </div>
      </div>
    </section>
  );
}
