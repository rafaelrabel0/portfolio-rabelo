"use client";

// Perguntas frequentes — acordeão com uma pergunta aberta por vez. A resposta
// desliza (grid-template-rows), o número acende e as linhas entram em cascata
// quando a seção aparece.

import { useState } from "react";
import { Mail, Plus } from "lucide-react";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Faq({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="perguntas" data-chapter="perguntas" className="relative scroll-mt-16 px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start" data-r>
          <p className="label mb-3 flex items-center gap-3">
            <span className="text-accent">07</span> {ui.services.faqLabel}
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">{ui.services.faqTitle}</h2>
          <a href={`mailto:${profile.contact.email}`} className="btn btn-line mt-8">
            <Mail className="h-4 w-4" /> {profile.contact.email}
          </a>
        </div>

        <ol className="faq border-t border-border">
          {services.faq.map((f, i) => {
            const on = open === i;
            return (
              <li key={i} className="faq-row" data-open={on} data-r style={{ ["--k" as string]: i }}>
                <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="faq-q">
                  <span className="faq-n font-mono text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-left font-display text-lg font-medium tracking-tight md:text-2xl">{f.q[locale]}</span>
                  <span className="faq-plus" aria-hidden>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className="acc-body">
                  <div>
                    <p className="max-w-2xl pb-6 pl-10 text-base leading-relaxed text-muted md:pl-12">{f.a[locale]}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
