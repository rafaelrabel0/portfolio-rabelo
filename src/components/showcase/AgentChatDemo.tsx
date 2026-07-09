"use client";

// Card do agente SDR no WhatsApp — apresentação pura, dirigida pelo
// ShowcaseStage. Recebe o log da conversa, o typing, a etapa do CRM e as
// escolhas pendentes do visitante (quick replies com countdown de autopilot).

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, Send, Zap } from "lucide-react";
import { AUTOPILOT_MS } from "@/components/showcase/ShowcaseStage";
import type { ChoiceStep, L, LogItem } from "@/components/showcase/script";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function AgentChatDemo({
  locale,
  log,
  typing,
  stage,
  pending,
  onPick,
  name,
  progress,
  onLiveSend,
}: {
  locale: Locale;
  log: LogItem[];
  typing: boolean;
  stage: L | null;
  pending: ChoiceStep | null;
  onPick: (i: number) => void;
  name: string;
  progress: number;
  onLiveSend?: (text: string) => void;
}) {
  const ui = getUi(locale);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");

  const submitLive = () => {
    const text = draft.trim();
    if (!text || !onLiveSend) return;
    setDraft("");
    onLiveSend(text);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [log.length, typing, pending]);

  const resolve = (text: L) => text[locale].replace("{name}", name);

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
              key={stage.pt}
              initial={{ opacity: 0, scale: 0.8, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 4 }}
              className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent"
            >
              {stage[locale]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Progresso da conversa */}
      <div className="h-[2px] w-full bg-surface-2">
        <motion.div
          className="h-full bg-accent/70"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {log.map((s) => {
            if (s.kind === "tool") {
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/80 px-2.5 py-1 font-mono text-[10px] text-cyan">
                    <Zap className="h-3 w-3" /> {resolve(s.text)}
                  </span>
                </motion.div>
              );
            }
            const isAgent = s.kind === "agent";
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={isAgent ? "flex justify-start" : "flex justify-end"}
              >
                <div
                  className={
                    isAgent
                      ? "max-w-[80%] rounded-2xl rounded-bl-sm border border-accent/20 bg-accent/10 px-3.5 py-2 text-sm"
                      : "max-w-[80%] rounded-2xl rounded-br-sm border border-border bg-surface-2 px-3.5 py-2 text-sm text-fg/90"
                  }
                >
                  {s.audio ? (
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
                    <>
                      {resolve(s.text)}
                      {isAgent && (
                        <span className="ml-2 whitespace-nowrap align-baseline font-mono text-[9px] tracking-[-0.18em] text-cyan/80">✓✓</span>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-accent/20 bg-accent/10 px-3.5 py-2.5">
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

      {/* Quick replies do visitante (com countdown de autopilot na 1ª opção) */}
      <AnimatePresence>
        {pending && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="border-t border-border bg-surface-2/40 px-4 py-3"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-accent">{ui.showcase.youAnswer}</p>
            <div className="flex flex-wrap gap-2">
              {pending.options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => onPick(i)}
                  className="relative overflow-hidden rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-sm text-fg transition-all hover:scale-[1.03] hover:bg-accent/20"
                >
                  {o.label[locale]}
                  {i === 0 && (
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] bg-accent/70"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: AUTOPILOT_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Composer real: uma mensagem do visitante expande para o chat ao vivo */}
      {onLiveSend && (
        <>
          <div className="flex items-center gap-2 border-t border-border bg-surface-2/40 px-4 py-2.5">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), submitLive())}
              placeholder={ui.chat.demoPlaceholder}
              className="min-w-0 flex-1 rounded-full border border-border bg-surface/70 px-4 py-2 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-accent/60"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={submitLive}
              disabled={!draft.trim()}
              aria-label={ui.chat.send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-transform hover:scale-105 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
          <p className="bg-surface-2/40 px-4 pb-2 text-[10px] leading-snug text-faint">
            {ui.chat.consentNotice}{" "}
            <Link href={`/${locale}/privacidade`} target="_blank" className="text-cyan underline-offset-2 transition-colors hover:text-fg hover:underline">
              {ui.chat.consentLink}
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
