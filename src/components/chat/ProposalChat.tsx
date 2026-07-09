"use client";

// Convite do chat de proposta em /servicos: card compacto com saudação do
// agente e um composer de texto. Na primeira mensagem, expande para o
// LiveChat (modo proposal) a partir do próprio card.

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { LiveChat } from "@/components/chat/LiveChat";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function ProposalChat({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const cardRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [live, setLive] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);

  const start = () => {
    const text = value.trim();
    if (!text) return;
    setAnchor(cardRef.current?.getBoundingClientRect() ?? null);
    setValue("");
    setLive(text);
  };

  return (
    <>
      <div ref={cardRef} className="glow overflow-hidden rounded-2xl border border-border bg-surface/80">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-surface-2/60 px-4 py-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/15">
            <Bot className="h-4.5 w-4.5 text-accent" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{ui.chat.headerTitle}</p>
            <p className="font-mono text-[10px] text-faint">n8n · GPT-4o · webhook</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            {ui.chat.liveBadge}
          </span>
        </div>

        {/* Saudação */}
        <div className="px-4 py-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-accent/20 bg-accent/10 px-3.5 py-2 text-sm">
              {ui.chat.proposalGreeting}
              <span className="ml-2 whitespace-nowrap align-baseline font-mono text-[9px] tracking-[-0.18em] text-cyan/80">✓✓</span>
            </div>
          </motion.div>
        </div>

        {/* Composer de abertura */}
        <div className="flex items-center gap-2 border-t border-border bg-surface-2/40 px-4 py-3">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), start())}
            placeholder={ui.chat.proposalPlaceholder}
            className="min-w-0 flex-1 rounded-full border border-border bg-surface/70 px-4 py-2.5 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-accent/60"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={start}
            disabled={!value.trim()}
            aria-label={ui.chat.send}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-transform hover:scale-105 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {live && (
          <LiveChat locale={locale} mode="proposal" initialText={live} anchor={anchor} onClose={() => setLive(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
