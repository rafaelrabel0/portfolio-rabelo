"use client";

// Demo auto-reproduzida do dashboard de funil: eventos chegando do n8n em tempo real.
// Sequência roteirizada (determinística) — espelha o contrato real de eventos.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Trophy } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type EventKind = "lead_created" | "conversation_started" | "lead_qualified" | "followup_sent" | "deal_won";

type Ev = { kind: EventKind; meta?: string };

const SEQUENCE: Ev[] = [
  { kind: "lead_created", meta: "Meta Ads" },
  { kind: "conversation_started" },
  { kind: "lead_created", meta: "Google" },
  { kind: "followup_sent", meta: "FUP1" },
  { kind: "lead_qualified" },
  { kind: "conversation_started" },
  { kind: "lead_created", meta: "Meta Ads" },
  { kind: "lead_qualified" },
  { kind: "deal_won" },
  { kind: "followup_sent", meta: "FUP 30min" },
  { kind: "conversation_started" },
  { kind: "lead_created", meta: "Indicação" },
  { kind: "lead_qualified" },
  { kind: "followup_sent", meta: "FUP3" },
  { kind: "deal_won" },
];

const BASE: Record<EventKind, number> = {
  lead_created: 128,
  conversation_started: 94,
  lead_qualified: 47,
  followup_sent: 211,
  deal_won: 21,
};

const eventStyle: Record<EventKind, string> = {
  lead_created: "text-cyan border-cyan/30 bg-cyan/10",
  conversation_started: "text-fg/80 border-border bg-surface-2/80",
  lead_qualified: "text-accent border-accent/30 bg-accent/10",
  followup_sent: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  deal_won: "text-accent border-accent/40 bg-accent/15",
};

const eventLabel: Record<EventKind, { pt: string; en: string }> = {
  lead_created: { pt: "lead_created", en: "lead_created" },
  conversation_started: { pt: "conversation_started", en: "conversation_started" },
  lead_qualified: { pt: "lead_qualified", en: "lead_qualified" },
  followup_sent: { pt: "followup_sent", en: "followup_sent" },
  deal_won: { pt: "deal_won 🎉", en: "deal_won 🎉" },
};

const STAGES: { kind: EventKind; label: { pt: string; en: string }; color: string }[] = [
  { kind: "lead_created", label: { pt: "Leads criados", en: "Leads created" }, color: "bg-cyan/70" },
  { kind: "conversation_started", label: { pt: "Conversas iniciadas", en: "Conversations started" }, color: "bg-fg/40" },
  { kind: "lead_qualified", label: { pt: "Qualificados pela IA", en: "AI-qualified" }, color: "bg-accent/80" },
  { kind: "deal_won", label: { pt: "Vendas", en: "Deals won" }, color: "bg-accent" },
];

export function FunnelLiveDemo({ locale }: { locale: Locale }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1500);
    return () => clearInterval(t);
  }, []);

  // Contagens derivadas dos eventos já processados (reinicia a cada volta da sequência)
  const loop = Math.floor(tick / SEQUENCE.length);
  const pos = tick % SEQUENCE.length;
  const processed = SEQUENCE.slice(0, pos + 1);
  const counts = { ...BASE };
  for (const e of processed) counts[e.kind] += 1;

  const feed = processed.slice(-4).map((e, i) => ({ ...e, id: loop * SEQUENCE.length + (pos - (processed.slice(-4).length - 1)) + i }));
  const max = counts.lead_created;
  const fupCount = counts.followup_sent;

  return (
    <div className="glow flex h-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-surface/80">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/60 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/15">
          <Activity className="h-4 w-4 text-cyan" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{locale === "pt" ? "Dashboard de Vendas IA" : "AI Sales Dashboard"}</p>
          <p className="font-mono text-[10px] text-faint">Supabase Edge Function · ingest-event</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
          <span className="relative h-1.5 w-1.5 rounded-full bg-accent">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
          </span>
          {locale === "pt" ? "ao vivo" : "live"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Funnel */}
        <div className="space-y-2.5">
          {STAGES.map((s, i) => {
            const value = counts[s.kind];
            const prev = i > 0 ? counts[STAGES[i - 1].kind] : null;
            const conv = prev ? Math.round((value / prev) * 100) : null;
            return (
              <div key={s.kind}>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-xs text-muted">{s.label[locale]}</span>
                  <span className="font-mono text-xs">
                    <motion.span
                      key={value}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block font-semibold text-fg"
                    >
                      {value}
                    </motion.span>
                    {conv !== null && <span className="ml-2 text-[10px] text-faint">{conv}%</span>}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    className={`h-full rounded-full ${s.color}`}
                    animate={{ width: `${Math.max(8, (value / max) * 100)}%` }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Follow-ups counter */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3.5 py-2.5">
          <span className="text-xs text-muted">{locale === "pt" ? "Follow-ups enviados pela IA" : "AI follow-ups sent"}</span>
          <motion.span key={fupCount} initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} className="font-display text-lg font-bold text-gradient">
            {fupCount}
          </motion.span>
        </div>

        {/* Event feed */}
        <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {[...feed].reverse().map((e) => (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, x: -16, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2"
              >
                {e.kind === "deal_won" ? <Trophy className="h-3 w-3 shrink-0 text-accent" /> : <span className="h-1 w-1 shrink-0 rounded-full bg-faint" />}
                <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${eventStyle[e.kind]}`}>{eventLabel[e.kind][locale]}</span>
                {e.meta && <span className="font-mono text-[10px] text-faint">· {e.meta}</span>}
                <span className="ml-auto font-mono text-[10px] text-faint">n8n → POST /ingest-event</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
