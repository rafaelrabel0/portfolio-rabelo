"use client";

// O agente em cena. Parado, é uma janela pequena de chat esperando o
// visitante — nada roda sozinho. Na primeira mensagem a janela cresce aos
// poucos (sem ocupar a tela toda), abre o painel "o que o agente fez" e a
// conversa começa.
//
// Com CHAT_WEBHOOK_URL configurada, fala com o agente real em n8n
// (/api/chat, modo practice). Sem ela — ou se o agente cair — segue com uma
// demonstração roteirizada, e o selo do cabeçalho diz qual das duas é.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { AgentReply } from "@/lib/chat";
import { getUi } from "@/dictionaries/ui";
import { cn } from "@/lib/cn";

type Msg = { id: number; role: "user" | "agent"; text: string };
type Trace = { id: number; at: string; label: string; hot?: boolean };

const DEMO: Record<Locale, { reply: string[]; trace: string[] }[]> = {
  pt: [
    {
      reply: [
        "Prazer! Já entendi o cenário.",
        "Pra eu te ajudar direito: quantos contatos chegam por dia, mais ou menos, e por onde — WhatsApp, Instagram ou site?",
      ],
      trace: ["buffer · 1 mensagem", "intenção: diagnóstico", "tool: registrar_contexto"],
    },
    {
      reply: [
        "Perfeito. Com esse volume, um agente responde na hora, qualifica pelos critérios do seu negócio e só passa para a equipe quem está pronto para comprar.",
        "Quer que eu deixe isso anotado para o Rafael montar uma proposta?",
      ],
      trace: ["qualificação: volume + canal", "etapa → Qualificado", "evento: lead_qualified"],
    },
    {
      reply: ["Combinado! Ficou tudo registrado. Para seguir de verdade, é só pedir a proposta aqui na página — ou marcar 30 minutos na agenda."],
      trace: ["tool: finalizar_atendimento", "handoff → humano"],
    },
  ],
  en: [
    {
      reply: ["Nice to meet you! I get the picture.", "To help you properly: roughly how many contacts come in per day, and through where — WhatsApp, Instagram or your site?"],
      trace: ["buffer · 1 message", "intent: diagnosis", "tool: log_context"],
    },
    {
      reply: [
        "Perfect. At that volume, an agent replies instantly, qualifies by your business criteria and only hands the team the people ready to buy.",
        "Want me to note this down so Rafael can put together a proposal?",
      ],
      trace: ["qualification: volume + channel", "stage → Qualified", "event: lead_qualified"],
    },
    {
      reply: ["Done! Everything is logged. To move forward for real, request a proposal on this page — or book 30 minutes in the schedule."],
      trace: ["tool: close_conversation", "handoff → human"],
    },
  ],
};

const now = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function newSession() {
  return typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : `s-${Math.random().toString(36).slice(2, 12)}-${Date.now()}`;
}

export function AgentStage({ locale, live, variant = "portfolio" }: { locale: Locale; live: boolean; variant?: "portfolio" | "services" }) {
  const ui = getUi(locale);
  const [expanded, setExpanded] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [trace, setTrace] = useState<Trace[]>([]);
  const [busy, setBusy] = useState<"idle" | "thinking" | "typing">("idle");
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"live" | "demo">(live ? "live" : "demo");
  const seq = useRef(0);
  const turn = useRef(0);
  const session = useRef<string>("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const push = (role: Msg["role"], text: string) => setMsgs((m) => [...m, { id: ++seq.current, role, text }]);
  const log = (label: string, hot?: boolean) => setTrace((t) => [...t, { id: ++seq.current, at: now(), label, hot }]);

  const speak = async (bubbles: string[]) => {
    for (const b of bubbles) {
      setBusy("typing");
      await wait(Math.min(1600, 450 + b.length * 14));
      push("agent", b);
    }
    setBusy("idle");
  };

  const runDemo = async () => {
    const script = DEMO[locale];
    const step = script[Math.min(turn.current, script.length - 1)];
    turn.current++;
    setBusy("thinking");
    for (const t of step.trace) {
      await wait(420);
      log(t, t.startsWith("tool") || t.startsWith("evento") || t.startsWith("event"));
    }
    await speak(step.reply);
  };

  const runLive = async (text: string) => {
    session.current ||= newSession();
    setBusy("thinking");
    const t0 = performance.now();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.current, mode: "practice", locale, message: { type: "text", text } }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as AgentReply;
      log(`n8n · ${Math.round(performance.now() - t0)} ms`);
      if (data.tool) log(`tool: ${data.tool}`, true);
      if (data.stage) log(`${locale === "pt" ? "etapa" : "stage"} → ${data.stage}`);
      if (data.status && data.status !== "qualifying") log(`status: ${data.status}`, true);
      await speak(
        data.reply
          .split(/\n{2,}/)
          .map((s) => s.trim())
          .filter(Boolean)
      );
    } catch {
      // agente fora do ar: segue com a demonstração e avisa no selo
      setMode("demo");
      log(ui.agent.error);
      await runDemo();
    }
  };

  const send = async () => {
    const text = value.trim();
    if (!text || busy !== "idle") return;
    setValue("");
    if (!expanded) setExpanded(true);
    push("user", text);
    log(locale === "pt" ? "mensagem recebida" : "message received");
    // a janela cresce primeiro; o agente começa quando ela já está aberta
    if (!expanded) await wait(650);
    if (mode === "live") await runLive(text);
    else await runDemo();
    inputRef.current?.focus();
  };

  const reset = () => {
    setMsgs([]);
    setTrace([]);
    setBusy("idle");
    setExpanded(false);
    turn.current = 0;
    session.current = "";
    setMode(live ? "live" : "demo");
  };

  return (
    <div className="agent-wrap">
      <div className={cn("agent-box", expanded && "is-open")}>
        {/* conversa */}
        <div className="agent-chat">
          <header className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="agent-avatar" aria-hidden>
              <b>d</b>
              <b className="text-accent">b</b>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-fg">{ui.chat.headerTitle}</p>
              <p className="truncate font-mono text-[10px] text-faint">{busy === "thinking" ? `${ui.agent.thinking}…` : ui.agent.status}</p>
            </div>
            <span className={cn("agent-badge", mode === "live" && "live")}>{mode === "live" ? ui.agent.live : ui.agent.demo}</span>
            {expanded && (
              <button onClick={reset} aria-label={ui.agent.reset} className="flex h-8 w-8 items-center justify-center rounded-full text-faint transition-colors hover:bg-surface-2 hover:text-fg">
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </header>

          <div ref={logRef} className="agent-log" aria-live="polite">
            <div className="bubble agent">{ui.agent.greeting}</div>
            {msgs.map((m) => (
              <div key={m.id} className={cn("bubble", m.role)}>
                {m.text}
              </div>
            ))}
            {busy !== "idle" && (
              <div className="bubble agent typing" aria-label={ui.agent.thinking}>
                <i />
                <i />
                <i />
              </div>
            )}
          </div>

          <form
            className="border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <div className="agent-composer">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={ui.agent.placeholder}
                maxLength={600}
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-fg outline-none placeholder:text-faint"
                aria-label={ui.agent.placeholder}
              />
              <button type="submit" disabled={!value.trim() || busy !== "idle"} aria-label={ui.chat.send} className="agent-send">
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 px-1 text-[10.5px] leading-snug text-faint">
              {ui.agent.consent}{" "}
              <Link href={`/${locale}/privacidade`} className="underline underline-offset-2 hover:text-muted">
                {ui.chat.consentLink}
              </Link>
              .
            </p>
          </form>
        </div>

        {/* o que o agente fez */}
        <aside className="agent-trace" aria-label={ui.agent.trace}>
          <p className="label mb-3">{ui.agent.trace}</p>
          <ol className="grid gap-2">
            {trace.map((t) => (
              <li key={t.id} className={cn("trace-row", t.hot && "hot")}>
                <span className="font-mono text-[10px] tabular-nums text-faint">{t.at}</span>
                <span className="font-mono text-[11.5px]">{t.label}</span>
              </li>
            ))}
          </ol>
          {variant === "portfolio" && (
            <p className="mt-auto pt-6 text-xs leading-relaxed text-faint">
              n8n · buffer · memória · tools · {locale === "pt" ? "passagem para humano" : "human handoff"}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
