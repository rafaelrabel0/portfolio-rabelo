import Link from "next/link";
import Image from "next/image";
import { ArrowDownToLine, CalendarClock, FileText } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

// E-mail, GitHub e telefone saíram daqui: os três já estão no rodapé, logo
// abaixo. Esta seção fica só com as três ações que interessam a quem chegou
// até o fim da página.

export function Contact({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <Section id="contact">
      <Reveal>
        <div className="glow relative overflow-hidden rounded-3xl border border-border bg-surface/60 px-6 py-16 text-center md:px-16">
          <div
            aria-hidden
            className="bg-reed pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2"
            style={{ maskImage: "linear-gradient(to bottom, #000 35%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 35%, transparent)" }}
          />
          <Image src="/logo-rc.png" alt="Rabelo Co." width={86} height={36} className="logo-adaptive mx-auto mb-6 h-9 w-auto" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{ui.cta.availableForWork}</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            {ui.sections.contactTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">{ui.sections.contactSubtitle}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href={`/${locale}/servicos#proposta`}>
              <InteractiveHoverButton icon={<FileText className="h-4 w-4" />}>
                {ui.cta.requestProposal}
              </InteractiveHoverButton>
            </Link>
            <Link href={`/${locale}/servicos#agenda`}>
              <InteractiveHoverButton variant="outline" icon={<CalendarClock className="h-4 w-4" />}>
                {ui.cta.scheduleCall}
              </InteractiveHoverButton>
            </Link>
            <a href="/cv.pdf">
              <InteractiveHoverButton variant="outline" icon={<ArrowDownToLine className="h-4 w-4" />}>
                {ui.cta.downloadCv}
              </InteractiveHoverButton>
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
