"use client";

// Solicitar proposta: duas portas para o mesmo briefing — conversar com a IA
// (agente real em n8n, que faz as perguntas do briefing comercial) ou
// preencher o formulário em três etapas. Sem agente configurado, só o form.

import { useState } from "react";
import { Bot, ClipboardList } from "lucide-react";
import { ProposalChat } from "@/components/chat/ProposalChat";
import { ProposalForm } from "@/components/services/ProposalForm";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function Proposal({ locale, live }: { locale: Locale; live: boolean }) {
  const ui = getUi(locale);
  const [tab, setTab] = useState<"chat" | "form">(live ? "chat" : "form");

  return (
    <section id="proposta" data-chapter="proposta" className="relative scroll-mt-16 px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div data-r>
          <p className="label mb-3 flex items-center gap-3">
            <span className="text-accent">05</span> {ui.services.proposalLabel}
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            {ui.services.proposalTitle}
            <span className="text-accent">.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{ui.services.proposalSub}</p>
          <ol className="mt-10 grid gap-3 text-sm text-muted">
            {(locale === "pt"
              ? ["Você conta a dor e o contexto", "Escrevemos o que entendemos", "Proposta com escopo, prazo e investimento em até 48 h úteis"]
              : ["You tell us the pain and context", "We write down what we understood", "A proposal with scope, timeline and investment within 48 business hours"]
            ).map((s, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border font-mono text-[11px] text-fg">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <div data-r className="min-w-0">
          {live && (
            <div className="mb-4 inline-flex rounded-full border border-border p-1" role="tablist">
              <button role="tab" aria-selected={tab === "chat"} onClick={() => setTab("chat")} className={cn("tab", tab === "chat" && "on")}>
                <Bot className="h-4 w-4" /> {ui.services.tabChat}
              </button>
              <button role="tab" aria-selected={tab === "form"} onClick={() => setTab("form")} className={cn("tab", tab === "form" && "on")}>
                <ClipboardList className="h-4 w-4" /> {ui.services.tabForm}
              </button>
            </div>
          )}
          <div key={tab} className="proposal-panel">
            {tab === "chat" && live ? <ProposalChat locale={locale} /> : <ProposalForm locale={locale} />}
          </div>
        </div>
      </div>
    </section>
  );
}
