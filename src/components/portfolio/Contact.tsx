// Cena 7 — contato. O conceito da marca vira o convite: as fitas deslizam até
// encaixar, os furos coincidentes acendem e só então a chamada aparece, com os
// dois caminhos — recrutador e cliente.

import Link from "next/link";
import { ArrowDownToLine, ArrowRight, ArrowUpRight, CalendarClock, FileText, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { TapePair } from "@/components/ui/tape-pair";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Contact({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const c = profile.contact;

  return (
    <section id="contato" data-chapter="contato" data-scene className="contact-scene relative">
      <div className="stage">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <p className="contact-kicker label mb-10">
            <span className="text-accent">07</span> · {ui.contact.kicker}
          </p>

          <div className="contact-tapes">
            <TapePair n={31} />
          </div>

          <h2 className="contact-title mt-12 font-display text-5xl font-semibold tracking-[-0.04em] md:text-8xl">
            {ui.contact.title}
            <span className="text-accent">.</span>
          </h2>
          <p className="contact-sub mt-4 text-base text-muted md:text-lg">{ui.contact.sub}</p>

          <div className="contact-cards mt-10 grid w-full max-w-4xl gap-4 text-left md:grid-cols-2">
            <div className="contact-card">
              <p className="label">{ui.contact.recruiter}</p>
              <p className="mt-2 text-sm text-muted">{ui.contact.recruiterText}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="/cv.pdf" className="btn btn-solid">
                  <ArrowDownToLine className="h-4 w-4" /> {ui.cta.downloadCv}
                </a>
                <a href={c.linkedin} target="_blank" rel="noreferrer" className="btn btn-line">
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
                <a href={`mailto:${c.email}`} className="btn btn-ghost">
                  <Mail className="h-4 w-4" /> {c.email}
                </a>
              </div>
            </div>
            <div className="contact-card is-client">
              <p className="label">{ui.contact.client}</p>
              <p className="mt-2 text-sm text-muted">{ui.contact.clientText}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/${locale}/servicos`} className="btn btn-solid">
                  {ui.contact.goDeciban} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={`/${locale}/servicos#proposta`} className="btn btn-line">
                  <FileText className="h-4 w-4" /> {ui.nav.proposal}
                </Link>
                <Link href={`/${locale}/servicos#agenda`} className="btn btn-ghost">
                  <CalendarClock className="h-4 w-4" /> {ui.nav.schedule} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
