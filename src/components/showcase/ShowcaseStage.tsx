"use client";

// Orquestrador da seção "Na prática": uma timeline única dirige o chat e o
// dashboard. Eventos do agente atravessam o vão entre os cards como um pacote
// animado antes de aparecer no funil. A demo só começa quando entra na tela e
// pausa fora dela; nas escolhas, o visitante responde como o cliente (com
// autopilot de fallback).

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { AgentChatDemo } from "@/components/showcase/AgentChatDemo";
import { FunnelLiveDemo } from "@/components/showcase/FunnelLiveDemo";
import { LiveChat } from "@/components/chat/LiveChat";
import { SCRIPT, type ChoiceStep, type DemoEvent, type L, type LogItem } from "@/components/showcase/script";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export const AUTOPILOT_MS = 4800;

type Packet = {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  event: DemoEvent;
};

export type FeedEvent = DemoEvent & { id: number };

export function ShowcaseStage({ locale, ctaHref, liveChat }: { locale: Locale; ctaHref?: string; liveChat?: boolean }) {
  const ui = getUi(locale);
  const cta = ctaHref ?? `/${locale}/servicos#proposta`;

  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const funnelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.3 });

  const [idx, setIdx] = useState(0);
  const [log, setLog] = useState<LogItem[]>([]);
  const [typing, setTyping] = useState(false);
  const [stage, setStage] = useState<L | null>(null);
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [pending, setPending] = useState<ChoiceStep | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [name, setName] = useState("Maria");
  const [done, setDone] = useState(false);
  const [live, setLive] = useState<string | null>(null);
  const [liveAnchor, setLiveAnchor] = useState<DOMRect | null>(null);

  const seq = useRef(0);
  const processed = useRef(-1);
  const pendingRef = useRef<ChoiceStep | null>(null);
  const choices = useRef<Record<string, number>>({});

  const running = inView && !done && !pending && !live;

  // O visitante mandou uma mensagem real: pausa a demo e expande o chat ao vivo.
  const startLive = (text: string) => {
    setLiveAnchor(chatRef.current?.getBoundingClientRect() ?? null);
    setLive(text);
  };

  const appendLog = (item: Omit<LogItem, "id">) => {
    const id = ++seq.current;
    setLog((l) => [...l, { ...item, id }]);
  };

  const pushEvent = (event: DemoEvent) => {
    const id = ++seq.current;
    setEvents((e) => [...e.slice(-11), { ...event, id }]);
  };

  const firePacket = (event: DemoEvent) => {
    const c = containerRef.current;
    const a = chatRef.current;
    const b = funnelRef.current;
    if (!c || !a || !b) {
      pushEvent({ ...event, hero: true });
      return;
    }
    const cr = c.getBoundingClientRect();
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const vertical = br.top >= ar.bottom - 60;
    const from = vertical
      ? { x: ar.left - cr.left + ar.width / 2, y: ar.bottom - cr.top - 16 }
      : { x: ar.right - cr.left - 12, y: ar.top - cr.top + ar.height * 0.42 };
    const to = vertical
      ? { x: br.left - cr.left + br.width / 2, y: br.top - cr.top + 18 }
      : { x: br.left - cr.left + 12, y: br.top - cr.top + br.height * 0.72 };
    const id = ++seq.current;
    setPackets((p) => [...p, { id, from, to, event }]);
  };

  const deliver = (pk: Packet) => {
    setPackets((p) => p.filter((x) => x.id !== pk.id));
    pushEvent({ ...pk.event, hero: true });
  };

  const pick = (i: number) => {
    const p = pendingRef.current;
    if (!p) return;
    pendingRef.current = null;
    setPending(null);
    choices.current[p.id] = i;
    const opt = p.options[i];
    if (opt.name) setName(opt.name);
    appendLog({ kind: "lead", text: opt.text ?? opt.label, audio: opt.audio });
    setIdx((v) => v + 1);
  };

  // Motor da timeline: aplica o efeito de cada passo uma única vez (processed)
  // e reagenda o avanço sempre que volta a rodar (retorno à viewport).
  useEffect(() => {
    if (!running) return;

    if (idx >= SCRIPT.length) {
      const t = setTimeout(() => setDone(true), 1600);
      return () => clearTimeout(t);
    }

    const step = SCRIPT[idx];

    if (step.t === "tool" && step.onlyIfChoice && choices.current[step.onlyIfChoice.id] !== step.onlyIfChoice.option) {
      setIdx((v) => v + 1);
      return;
    }

    const fresh = processed.current !== idx;
    processed.current = idx;
    const next = () => setIdx((v) => v + 1);
    let t: ReturnType<typeof setTimeout>;

    switch (step.t) {
      case "stage":
        if (fresh) setStage(step.label);
        t = setTimeout(next, 600);
        break;
      case "lead":
        if (fresh) appendLog({ kind: "lead", text: step.text, audio: step.audio });
        t = setTimeout(next, 1200);
        break;
      case "agent": {
        if (fresh) setTyping(true);
        const dur = Math.min(2200, 700 + step.text.pt.length * 16);
        t = setTimeout(() => {
          setTyping(false);
          appendLog({ kind: "agent", text: step.text });
          next();
        }, dur);
        break;
      }
      case "tool":
        if (fresh) {
          appendLog({ kind: "tool", text: step.text });
          if (step.event) firePacket(step.event);
        }
        t = setTimeout(next, 900);
        break;
      case "ambient":
        if (fresh) pushEvent(step.event);
        t = setTimeout(next, 600);
        break;
      case "choice":
        pendingRef.current = step;
        setPending(step);
        return;
    }

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, running]);

  // Autopilot: se o visitante não escolher, a demo segue com a primeira opção.
  useEffect(() => {
    if (!pending || !inView || done || live) return;
    const t = setTimeout(() => pick(0), AUTOPILOT_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending, inView, done, live]);

  const replay = () => {
    choices.current = {};
    pendingRef.current = null;
    processed.current = -1;
    setLog([]);
    setEvents([]);
    setPackets([]);
    setStage(null);
    setPending(null);
    setTyping(false);
    setName("Maria");
    setDone(false);
    setIdx(0);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <div ref={chatRef}>
            <AgentChatDemo
              locale={locale}
              log={log}
              typing={typing}
              stage={stage}
              pending={pending}
              onPick={pick}
              name={name}
              progress={Math.min(1, idx / SCRIPT.length)}
              onLiveSend={liveChat ? startLive : undefined}
            />
          </div>
          <p className="mt-3 px-1 text-xs text-faint">{ui.sections.showcaseChatCaption}</p>
        </div>
        <div>
          <div ref={funnelRef}>
            <FunnelLiveDemo locale={locale} events={events} name={name} />
          </div>
          <p className="mt-3 px-1 text-xs text-faint">{ui.sections.showcaseFunnelCaption}</p>
        </div>
      </div>

      {/* Pacotes de evento voando do chat para o dashboard */}
      {packets.map((pk) => (
        <motion.div
          key={pk.id}
          className="pointer-events-none absolute left-0 top-0 z-20"
          initial={{ x: pk.from.x, y: pk.from.y, opacity: 0 }}
          animate={{
            x: [pk.from.x, (pk.from.x + pk.to.x) / 2, pk.to.x],
            y: [pk.from.y, Math.min(pk.from.y, pk.to.y) - 36, pk.to.y],
            opacity: [0, 1, 1],
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onAnimationComplete={() => deliver(pk)}
        >
          <span className="block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_5px_color-mix(in_srgb,var(--color-accent)_55%,transparent)]" />
        </motion.div>
      ))}

      {/* Final: fechamento da história + CTA */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center rounded-3xl bg-bg/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="glow pointer-events-auto mx-4 max-w-md rounded-2xl border border-border bg-surface/95 p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight">{ui.showcase.doneTitle}</h3>
              <p className="mt-2 text-sm text-muted">{ui.showcase.doneSubtitle}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={cta}
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                >
                  {ui.showcase.cta} <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={replay}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-fg"
                >
                  <RotateCcw className="h-4 w-4" /> {ui.showcase.replay}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat ao vivo (agente real via n8n) expandindo do card da demo */}
      <AnimatePresence>
        {live && (
          <LiveChat
            locale={locale}
            mode="practice"
            initialText={live}
            anchor={liveAnchor}
            onClose={() => setLive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
