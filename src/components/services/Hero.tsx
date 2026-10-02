// Abertura do lado comercial. Depois da assinatura animada, a frase que gira
// o que a deciban constrói e três números medidos — nada de promessa vaga.

import Link from "next/link";
import { ArrowUpRight, CalendarClock, FileText } from "lucide-react";
import { RotatingWords } from "@/components/ui/rotating-words";
import { TapePair } from "@/components/ui/tape-pair";
import { services } from "@/content/services";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function ServicesHero({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const h = services.hero;
  const metrics = [
    { v: "7+", l: locale === "pt" ? "negócios B2B atendidos" : "B2B businesses served" },
    { v: "48h", l: locale === "pt" ? "úteis para a proposta" : "business hours to a proposal" },
    { v: "2–4", l: locale === "pt" ? "semanas para um agente no ar" : "weeks to a live agent" },
  ];

  return (
    <section data-scene className="svc-hero relative">
      <div className="stage">
        <div className="svc-hero-tapes" aria-hidden>
          <TapePair n={41} />
        </div>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 pb-24 pt-16 sm:px-6 md:pb-28">
          <p className="enter label mb-8" style={{ ["--d" as string]: "0.05s" }}>
            {h.eyebrow[locale]}
          </p>
          <h1 className="enter max-w-6xl font-display font-semibold leading-[0.98] tracking-[-0.04em] svc-h1" style={{ ["--d" as string]: "0.15s" }}>
            {h.lead[locale]}{" "}
            <RotatingWords words={h.builds.map((b) => b[locale])} secondsPerWord={2.2} wordClassName="svc-word" />
            <br />
            <span className="text-muted">{h.tail[locale]}</span>
            <span className="text-accent">.</span>
          </h1>
          <p className="enter mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={{ ["--d" as string]: "0.35s" }}>
            {h.sub[locale]}
          </p>
          <div className="enter mt-9 flex flex-wrap items-center gap-2.5" style={{ ["--d" as string]: "0.5s" }}>
            <a href="#proposta" className="btn btn-solid">
              <FileText className="h-4 w-4" /> {ui.cta.requestProposal}
            </a>
            <a href="#agenda" className="btn btn-line">
              <CalendarClock className="h-4 w-4" /> {ui.cta.scheduleCall}
            </a>
            <Link href={`/${locale}`} className="btn btn-ghost">
              {ui.cta.seePortfolio} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <dl className="enter mt-10 grid max-w-3xl grid-cols-3 gap-6 border-t border-border pt-6" style={{ ["--d" as string]: "0.65s" }}>
            {metrics.map((m) => (
              <div key={m.v}>
                <dt className="font-mono text-2xl tabular-nums text-fg md:text-4xl">{m.v}</dt>
                <dd className="mt-1 text-xs leading-snug text-faint md:text-sm">{m.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
