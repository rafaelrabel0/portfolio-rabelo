"use client";

// Demo auto-reproduzida do agente SDR no WhatsApp: conversa, tools e etapa do CRM.
// Conteúdo ilustrativo — espelha o fluxo real (buffer, Whisper, qualificação, eventos).

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, Zap } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Step =
  | { kind: "lead"; text: { pt: string; en: string }; audio?: string }
  | { kind: "agent"; text: { pt: string; en: string } }
  | { kind: "tool"; text: { pt: string; en: string } }
  | { kind: "stage"; text: { pt: string; en: string } };

const STEPS: Step[] = [
  { kind: "stage", text: { pt: "Contato Inicial", en: "New Lead" } },
  { kind: "lead", text: { pt: "Oi! Vocês têm solução pra infiltração na parede?", en: "Hi! Do you have a fix for wall infiltration?" } },
  { kind: "agent", text: { pt: "Olá! Sou o assistente da loja 😊 Infiltração é chato mesmo — temos sim! Como posso te chamar?", en: "Hello! I'm the store assistant 😊 Infiltration is a pain — we do! What's your name?" } },
  { kind: "lead", text: { pt: "Maria", en: "Maria" } },
  { kind: "tool", text: { pt: "tool: Nome → Supabase", en: "tool: Name → Supabase" } },
  { kind: "stage", text: { pt: "Em Atendimento", en: "In Conversation" } },
  { kind: "tool", text: { pt: "evento: conversation_started → dashboard", en: "event: conversation_started → dashboard" } },
  { kind: "agent", text: { pt: "Prazer, Maria! Essa área é interna ou externa? E sabe a metragem aproximada?", en: "Nice to meet you, Maria! Is the area indoors or outdoors? Rough size in m²?" } },
  { kind: "lead", audio: "0:11", text: { pt: "Áudio", en: "Voice note" } },
  { kind: "tool", text: { pt: "Whisper: “é a parede da varanda, uns 15m²”", en: "Whisper: “it's the balcony wall, about 15m²”" } },
  { kind: "agent", text: { pt: "Perfeito! Parede externa de ~15m² — já tenho o que preciso. Vou te conectar com um especialista agora 😊", en: "Perfect! Outdoor wall, ~15m² — that's all I need. Connecting you to a specialist now 😊" } },
  { kind: "tool", text: { pt: "tool: Qualificação → nota no CRM", en: "tool: Qualification → CRM note" } },
  { kind: "stage", text: { pt: "Qualificado", en: "Qualified" } },
  { kind: "tool", text: { pt: "evento: lead_qualified → dashboard", en: "event: lead_qualified → dashboard" } },
];

export function AgentChatDemo({ locale }: { locale: Locale }) {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (count >= STEPS.length) {
      const t = setTimeout(() => setCount(0), 4500);
      return () => clearTimeout(t);
    }
    const next = STEPS[count];
    if (next.kind === "agent") {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setCount((c) => c + 1);
      }, 1300);
      return () => clearTimeout(t);
    }
    const delay = next.kind === "lead" ? 1100 : next.kind === "stage" ? 500 : 800;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [count, typing]);

  const visible = STEPS.slice(0, count);
  const stage = [...visible].reverse().find((s) => s.kind === "stage");

  return (
    <div className="glow flex h-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-surface/80">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/60 px-4 py-3">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
          <Bot className="h-4 w-4 text-accent" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{locale === "pt" ? "Agente SDR — WhatsApp" : "SDR Agent — WhatsApp"}</p>
          <p className="font-mono text-[10px] text-faint">n8n · GPT-4o · Evolution API</p>
        </div>
        <AnimatePresence mode="popLayout">
          {stage && (
            <motion.span
              key={stage.text.pt}
              initial={{ opacity: 0, scale: 0.8, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 4 }}
              className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent"
            >
              {stage.text[locale]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {visible.map((s, i) => {
            if (s.kind === "stage") return null;
            if (s.kind === "tool") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/80 px-2.5 py-1 font-mono text-[10px] text-cyan">
                    <Zap className="h-3 w-3" /> {s.text[locale]}
                  </span>
                </motion.div>
              );
            }
            const isAgent = s.kind === "agent";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={isAgent ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    isAgent
                      ? "max-w-[80%] rounded-2xl rounded-br-sm border border-accent/20 bg-accent/10 px-3.5 py-2 text-sm"
                      : "max-w-[80%] rounded-2xl rounded-bl-sm border border-border bg-surface-2 px-3.5 py-2 text-sm text-fg/90"
                  }
                >
                  {"audio" in s && s.audio ? (
                    <span className="flex items-center gap-2 text-muted">
                      <Mic className="h-3.5 w-3.5 text-cyan" />
                      <span className="flex items-end gap-[2px]">
                        {[5, 9, 13, 8, 11, 6, 12, 9, 5, 10, 7].map((h, j) => (
                          <motion.span
                            key={j}
                            className="w-[3px] rounded-full bg-cyan/70"
                            animate={{ height: [h, h + 4, h] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: j * 0.08 }}
                          />
                        ))}
                      </span>
                      <span className="font-mono text-[11px]">{s.audio}</span>
                    </span>
                  ) : (
                    s.text[locale]
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
            <div className="flex items-center gap-1 rounded-2xl rounded-br-sm border border-accent/20 bg-accent/10 px-3.5 py-2.5">
              {[0, 1, 2].map((j) => (
                <motion.span
                  key={j}
                  className="h-1.5 w-1.5 rounded-full bg-accent/80"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: j * 0.18 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
