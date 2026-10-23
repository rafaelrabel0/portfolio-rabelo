"use client";

// Agente em dois modos: o fluxo (como foi construído) e, ao apontar para o
// cartão, uma conversa ilustrativa tocando fala por fala (o que o cliente vê).
// A conversa fica sobre o fluxo, no mesmo tamanho, e rola como um chat de
// verdade: a fala nova entra embaixo e empurra as antigas. No celular e no
// teclado, o par de botões troca o modo.

import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";
import type { ChatLine, FlowNode } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { cn } from "@/lib/cn";

type View = "flow" | "chat";

const BARS = [5, 9, 14, 8, 12, 16, 10, 6, 13, 9, 15, 7, 11, 5];

export function AgentVisual({
  flow,
  chat,
  locale,
  labels,
}: {
  flow: FlowNode[][];
  chat: ChatLine[];
  locale: Locale;
  labels: { flow: string; chat: string; hint: string; illustrative: string };
}) {
  const root = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>("flow");
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  const show = (v: View) => {
    if (v === view) return;
    setShown(0);
    setTyping(false);
    setView(v);
  };
  const showRef = useRef(show);
  useEffect(() => {
    showRef.current = show;
  });

  // Apontar para o cartão inteiro toca a conversa; sair volta ao fluxo.
  useEffect(() => {
    const card = root.current?.closest("article");
    if (!card) return;
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && showRef.current("chat");
    const leave = (e: PointerEvent) => e.pointerType === "mouse" && showRef.current("flow");
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
    };
  }, []);

  // Fala por fala; antes de cada resposta do agente, os três pontinhos.
  useEffect(() => {
    if (view !== "chat") return;
    let t: ReturnType<typeof setTimeout>;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t = setTimeout(() => setShown(chat.length), 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    const step = () => {
      if (i >= chat.length) return;
      const line = chat[i];
      if (line.who === "out") {
        setTyping(true);
        t = setTimeout(() => {
          setTyping(false);
          setShown(++i);
          t = setTimeout(step, 700);
        }, 900);
      } else {
        setShown(++i);
        t = setTimeout(step, line.who === "note" ? 600 : 800);
      }
    };
    t = setTimeout(step, 300);
    return () => clearTimeout(t);
  }, [view, chat]);

  return (
    <div ref={root} className="av">
      <div className="av-bar">
        <div className="av-seg" role="group">
          <button type="button" aria-pressed={view === "flow"} onClick={() => show("flow")}>
            {labels.flow}
          </button>
          <button type="button" aria-pressed={view === "chat"} onClick={() => show("chat")}>
            {labels.chat}
          </button>
        </div>
        <span className="av-hint">{view === "chat" ? labels.illustrative : labels.hint}</span>
      </div>

      <div className="av-stage" data-view={view}>
        <div className="av-face av-flow" aria-hidden={view !== "flow"}>
          <FlowDiagram flow={flow} compact />
        </div>
        <div className="av-face av-chat" aria-hidden={view !== "chat"}>
          <div className="av-log">
            {chat.slice(0, shown).map((line, i) => (
              <div key={i} className={cn("av-line", line.who)}>
                <div className={cn("av-msg", line.who)}>
                  {line.who === "note" && <span className="av-dot" aria-hidden />}
                  {line.audio ? (
                    <span className="av-audio">
                      <Mic className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="av-wave" aria-hidden>
                        {BARS.map((h, b) => (
                          <i key={b} style={{ height: h }} />
                        ))}
                      </span>
                      <span className="sr-only">{line.text[locale]}</span>
                      <span className="font-mono text-[11px] tabular-nums">{line.audio}</span>
                    </span>
                  ) : (
                    line.text[locale]
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="av-line out" aria-hidden>
                <span className="av-typing">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
