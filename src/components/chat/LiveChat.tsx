"use client";

// Chat ao vivo com o agente n8n. Abre expandindo a partir do card de origem
// (anchor) até um overlay central, com backdrop. Estados do agente: pensando
// (aguardando o webhook) e digitando (simulação antes de revelar a resposta).
// Composer com texto, imagem (comprimida no client) e áudio (MediaRecorder).
// Fins por modo: practice → opções enviar/editar quando qualificado, com
// agradecimento só após confirmar; proposal → agradecimento automático quando
// a tool de finalização responde status "finalized".

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, Check, CheckCircle2, ImagePlus, Loader2, Mic, PencilLine, RotateCcw, Send, X } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import type { AgentReply, AgentStatus, ChatBubble, ChatMode, OutgoingMessage } from "@/lib/chat";

type Rect = { left: number; top: number; width: number; height: number };
type Phase = "idle" | "thinking" | "typing";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// ---------- helpers de mídia ----------

const fileToDataUrl = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });

async function compressImage(file: File): Promise<{ dataUrl: string; mimeType: string }> {
  const url = await fileToDataUrl(file);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = url;
  });
  const max = 1280;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  if (scale === 1 && file.size < 400_000) return { dataUrl: url, mimeType: file.type || "image/jpeg" };
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
  return { dataUrl: canvas.toDataURL("image/jpeg", 0.82), mimeType: "image/jpeg" };
}

const b64 = (dataUrl: string) => dataUrl.slice(dataUrl.indexOf(",") + 1);

// ---------- componente ----------

export function LiveChat({
  locale,
  mode,
  initialText,
  anchor,
  onClose,
}: {
  locale: Locale;
  mode: ChatMode;
  initialText: string;
  anchor: Rect | null;
  onClose: () => void;
}) {
  const ui = getUi(locale);
  const waHref = `https://wa.me/${profile.contact.phone.replace(/\D/g, "")}`;

  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState<Rect | null>(null);
  const [bubbles, setBubbles] = useState<ChatBubble[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [status, setStatus] = useState<AgentStatus>("qualifying");
  const [stage, setStage] = useState<string | null>(null);
  const [failed, setFailed] = useState<null | "offline" | "error">(null);
  const [thanks, setThanks] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const seq = useRef(0);
  const session = useRef<string>("");
  const lastMsg = useRef<OutgoingMessage | null>(null);
  const started = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!session.current && typeof window !== "undefined") {
    session.current = typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : `s-${Math.random().toString(36).slice(2)}`;
  }

  const push = (b: Omit<ChatBubble, "id">) => setBubbles((l) => [...l, { ...b, id: ++seq.current }]);

  // Overlay: alvo central responsivo + trava de scroll + Esc.
  useEffect(() => {
    setMounted(true);
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(680, vw - 16);
      const h = Math.min(700, vh - 24);
      setTarget({ left: (vw - w) / 2, top: (vh - h) / 2, width: w, height: h });
    };
    compute();
    window.addEventListener("resize", compute);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [bubbles.length, phase, status, failed]);

  const send = useCallback(
    async (msg: OutgoingMessage) => {
      lastMsg.current = msg;
      setFailed(null);
      setPhase("thinking");
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: session.current, mode, locale, message: msg }),
        });
        if (res.status === 503) {
          setPhase("idle");
          setFailed("offline");
          return;
        }
        if (!res.ok) throw new Error("upstream");
        const data: AgentReply = await res.json();

        if (data.tool) push({ role: "tool", text: data.tool });

        // Resposta pode vir em várias "bolhas" separadas por linha em branco;
        // cada uma ganha sua simulação de digitação, como numa conversa real.
        const parts = (data.reply ?? "")
          .split(/\n{2,}/)
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 4);
        for (const part of parts) {
          setPhase("typing");
          await new Promise((r) => setTimeout(r, Math.min(2200, 450 + part.length * 14)));
          push({ role: "agent", text: part });
          setPhase("idle");
          await new Promise((r) => setTimeout(r, 260));
        }
        if (data.stage) setStage(data.stage);
        setPhase("idle");
        setStatus(data.status);
        setConfirming(false);
        if (data.status === "finalized") setTimeout(() => setThanks(true), 900);
      } catch {
        setPhase("idle");
        setConfirming(false);
        setFailed("error");
      }
    },
    [locale, mode]
  );

  // Primeira mensagem: a que disparou a expansão do chat.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    push({ role: "user", text: initialText });
    send({ type: "text", text: initialText });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const busy = phase !== "idle";

  const sendText = (text: string) => {
    push({ role: "user", text });
    send({ type: "text", text });
  };
  const sendImage = async (file: File) => {
    try {
      const { dataUrl, mimeType } = await compressImage(file);
      push({ role: "user", image: dataUrl });
      send({ type: "image", data: b64(dataUrl), mimeType });
    } catch {
      setFailed("error");
    }
  };
  const sendAudio = async (blob: Blob, duration: number) => {
    try {
      const dataUrl = await fileToDataUrl(blob);
      push({ role: "user", audio: { duration } });
      send({ type: "audio", data: b64(dataUrl), mimeType: blob.type || "audio/webm", duration });
    } catch {
      setFailed("error");
    }
  };
  const confirmSend = () => {
    setConfirming(true);
    push({ role: "user", text: ui.chat.sendToRafael });
    send({ type: "control", action: "confirm_send" });
  };
  const editAnswers = () => {
    setStatus("qualifying");
    push({ role: "user", text: ui.chat.editAnswers });
    send({ type: "control", action: "edit_answers" });
  };
  const retry = () => lastMsg.current && send(lastMsg.current);

  // Reinicia o atendimento do zero: sessão nova (memória nova no n8n) e
  // saudação local do agente, sem chamada à API.
  const restart = () => {
    session.current = typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : `s-${Math.random().toString(36).slice(2)}`;
    lastMsg.current = null;
    setBubbles([{ id: ++seq.current, role: "agent", text: ui.chat.proposalGreeting }]);
    setStatus("qualifying");
    setStage(null);
    setThanks(false);
    setFailed(null);
    setConfirming(false);
    setPhase("idle");
  };

  if (!mounted || !target) return null;

  const initialRect = anchor ?? { ...target, top: target.top + 24 };

  return createPortal(
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-bg/75 backdrop-blur-sm"
      />

      {/* Card do chat expandindo do anchor até o centro */}
      <motion.div
        initial={{ ...initialRect, opacity: anchor ? 1 : 0 }}
        animate={{ ...target, opacity: 1 }}
        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
        transition={{ type: "spring", stiffness: 230, damping: 28 }}
        className="glow fixed flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
        style={{ transformOrigin: "center" }}
        role="dialog"
        aria-modal
        aria-label={ui.chat.headerTitle}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-surface-2/60 px-4 py-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/15">
            <Bot className="h-4.5 w-4.5 text-accent" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{ui.chat.headerTitle}</p>
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
          <AnimatePresence mode="popLayout">
            {stage && (
              <motion.span
                key={stage}
                initial={{ opacity: 0, scale: 0.8, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 4 }}
                className="hidden rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted sm:inline"
              >
                {stage}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label={ui.chat.close}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Mensagens */}
        <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
          <AnimatePresence initial={false}>
            {bubbles.map((s) => {
              if (s.role === "tool") {
                return (
                  <motion.div key={s.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/80 px-2.5 py-1 font-mono text-[10px] text-cyan">
                      <Check className="h-3 w-3" /> {s.text}
                    </span>
                  </motion.div>
                );
              }
              const isAgent = s.role === "agent";
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={isAgent ? "flex justify-start" : "flex justify-end"}
                >
                  <div
                    className={
                      isAgent
                        ? "max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-accent/20 bg-accent/10 px-3.5 py-2 text-sm"
                        : "max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-br-sm border border-border bg-surface-2 px-3.5 py-2 text-sm text-fg/90"
                    }
                  >
                    {s.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image} alt="" className="max-h-52 rounded-xl" />
                    ) : s.audio ? (
                      <span className="flex items-center gap-2 text-muted">
                        <Mic className="h-3.5 w-3.5 text-cyan" />
                        <span className="flex items-end gap-[2px]">
                          {[5, 9, 13, 8, 11, 6, 12, 9, 5, 10, 7].map((h, j) => (
                            <span key={j} className="w-[3px] rounded-full bg-cyan/70" style={{ height: h }} />
                          ))}
                        </span>
                        <span className="font-mono text-[11px]">
                          0:{String(Math.round(s.audio.duration)).padStart(2, "0")}
                        </span>
                      </span>
                    ) : (
                      <>
                        {s.text}
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

          {/* Pensando / digitando */}
          <AnimatePresence>
            {busy && (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-accent/20 bg-accent/10 px-3.5 py-2.5">
                  {phase === "thinking" && (
                    <span className="font-mono text-[11px] text-muted">{ui.chat.thinking}</span>
                  )}
                  {[0, 1, 2].map((j) => (
                    <motion.span
                      key={j}
                      className="h-1.5 w-1.5 rounded-full bg-accent/80"
                      animate={{ opacity: [0.3, 1, 0.3], y: phase === "typing" ? [0, -3, 0] : 0 }}
                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.18 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Erros */}
          <AnimatePresence>
            {failed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-surface-2/60 px-4 py-3 text-center text-xs text-muted"
              >
                <span>{failed === "offline" ? ui.chat.offline : ui.chat.errorMsg}</span>
                {failed === "error" && (
                  <button onClick={retry} className="rounded-full border border-border px-3 py-1.5 font-medium text-fg transition-colors hover:border-border-strong">
                    {ui.chat.retry}
                  </button>
                )}
                <a
                  href={waHref}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-medium text-fg transition-colors hover:bg-accent/20"
                >
                  <WhatsappIcon className="h-3.5 w-3.5 text-accent" /> {ui.proposal.whatsappCta}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Practice qualificado: enviar pro Rafael ou editar respostas */}
        <AnimatePresence>
          {mode === "practice" && status === "qualified" && !thanks && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="border-t border-border bg-surface-2/40 px-4 py-3"
            >
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-accent">{ui.chat.qualifiedTitle}</p>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={confirmSend}
                  disabled={confirming || busy}
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {confirming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {ui.chat.sendToRafael}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={editAnswers}
                  disabled={confirming || busy}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-fg disabled:opacity-60"
                >
                  <PencilLine className="h-4 w-4" /> {ui.chat.editAnswers}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Composer */}
        <Composer locale={locale} disabled={busy || thanks || failed === "offline"} onText={sendText} onImage={sendImage} onAudio={sendAudio} />

        {/* Agradecimento */}
        <AnimatePresence>
          {thanks && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-bg/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.45, ease: EASE }}
                className="glow mx-4 max-w-sm rounded-2xl border border-border bg-surface/95 p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight">{ui.chat.thanksTitle}</h3>
                <p className="mt-2 text-sm text-muted">{ui.chat.thanksMsg}</p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={`/${locale}`}
                    className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                  >
                    {ui.chat.thanksAboutCta} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-fg"
                  >
                    <RotateCcw className="h-4 w-4" /> {ui.chat.thanksRestartCta}
                  </motion.button>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs text-faint transition-colors hover:text-fg"
                >
                  {ui.chat.close}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>,
    document.body
  );
}

// ---------- composer ----------

function Composer({
  locale,
  disabled,
  onText,
  onImage,
  onAudio,
}: {
  locale: Locale;
  disabled: boolean;
  onText: (text: string) => void;
  onImage: (file: File) => void;
  onAudio: (blob: Blob, duration: number) => void;
}) {
  const ui = getUi(locale);
  const [value, setValue] = useState("");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const fileRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const discard = useRef(false);
  const secondsRef = useRef(0);

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    setValue("");
    onText(text);
  };

  const stopTracks = () => recRef.current?.stream.getTracks().forEach((t) => t.stop());

  const startRecording = async () => {
    if (disabled || recording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      recRef.current = rec;
      chunks.current = [];
      discard.current = false;
      rec.ondataavailable = (e) => e.data.size > 0 && chunks.current.push(e.data);
      rec.onstop = () => {
        stopTracks();
        setRecording(false);
        if (timer.current) clearInterval(timer.current);
        if (!discard.current && chunks.current.length > 0) {
          onAudio(new Blob(chunks.current, { type: rec.mimeType || "audio/webm" }), secondsRef.current);
        }
        setSeconds(0);
      };
      rec.start();
      setRecording(true);
      setSeconds(0);
      secondsRef.current = 0;
      timer.current = setInterval(() => {
        secondsRef.current += 1;
        setSeconds(secondsRef.current);
        if (secondsRef.current >= 60) rec.stop(); // limite de 60s
      }, 1000);
    } catch {
      // permissão negada — segue sem áudio
    }
  };

  const stopRecording = (keep: boolean) => {
    discard.current = !keep;
    recRef.current?.stop();
  };

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
      discard.current = true;
      if (recRef.current?.state === "recording") recRef.current.stop();
    },
    []
  );

  const btnCls =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg disabled:opacity-40";

  if (recording) {
    return (
      <div className="flex items-center gap-3 border-t border-border bg-surface-2/40 px-4 py-3">
        <motion.span
          className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-2"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="font-mono text-xs text-muted">
          {ui.chat.recording} 0:{String(seconds).padStart(2, "0")}
        </span>
        <span className="flex flex-1 items-end justify-center gap-[3px]">
          {[6, 12, 8, 14, 10, 16, 9, 13, 7, 11, 15, 8, 12, 6].map((h, j) => (
            <motion.span
              key={j}
              className="w-[3px] rounded-full bg-accent/70"
              animate={{ height: [h * 0.5, h, h * 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.06 }}
            />
          ))}
        </span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => stopRecording(false)} aria-label={ui.chat.cancel} className={btnCls}>
          <X className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => stopRecording(true)}
          aria-label={ui.chat.send}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-transform hover:scale-105"
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border-t border-border bg-surface-2/40 px-4 py-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onImage(f);
          e.target.value = "";
        }}
      />
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => fileRef.current?.click()} disabled={disabled} aria-label={ui.chat.attachImage} className={btnCls}>
        <ImagePlus className="h-4 w-4" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={startRecording} disabled={disabled} aria-label={ui.chat.recordAudio} className={btnCls}>
        <Mic className="h-4 w-4" />
      </motion.button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), submit())}
        placeholder={ui.chat.placeholder}
        disabled={disabled}
        className="min-w-0 flex-1 rounded-full border border-border bg-surface/70 px-4 py-2 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-accent/60 disabled:opacity-50"
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label={ui.chat.send}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-transform hover:scale-105 disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
      </motion.button>
    </div>
  );
}
