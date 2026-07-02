"use client";

// Form "Solicitar proposta" — POST /api/proposal → webhook n8n/CRM.
// Honeypot anti-spam; se o envio falhar, oferece WhatsApp com a mensagem pronta.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "ok" | "error" | "invalid";

const inputCls =
  "w-full rounded-xl border border-border bg-surface/70 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-accent/60";

export function ProposalForm({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", company: "", message: "", website: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const waText = encodeURIComponent(
    `${locale === "pt" ? "Olá! Quero uma proposta." : "Hi! I'd like a proposal."}\n` +
      `${ui.proposal.name}: ${form.name}\n${ui.proposal.company}: ${form.company}\n${form.message}`
  );
  const waHref = `https://wa.me/${profile.contact.phone.replace(/\D/g, "")}?text=${waText}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim() || (!form.email.trim() && !form.whatsapp.trim())) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glow flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface/70 px-6 py-14 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <p className="font-display text-xl font-bold">{ui.proposal.successTitle}</p>
        <p className="max-w-sm text-sm text-muted">{ui.proposal.successMsg}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="glow space-y-4 rounded-2xl border border-border bg-surface/70 p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{ui.proposal.name} *</span>
          <input className={inputCls} value={form.name} onChange={set("name")} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{ui.proposal.company}</span>
          <input className={inputCls} value={form.company} onChange={set("company")} autoComplete="organization" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{ui.proposal.email}</span>
          <input className={inputCls} type="email" value={form.email} onChange={set("email")} autoComplete="email" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">{ui.proposal.whatsapp}</span>
          <input className={inputCls} type="tel" value={form.whatsapp} onChange={set("whatsapp")} autoComplete="tel" placeholder="+55 …" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-muted">{ui.proposal.message} *</span>
        <textarea
          className={`${inputCls} min-h-[120px] resize-y`}
          value={form.message}
          onChange={set("message")}
          placeholder={ui.proposal.messagePlaceholder}
        />
      </label>

      {/* Honeypot — invisível para humanos */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={set("website")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <AnimatePresence>
        {status === "invalid" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-accent-2">
            {ui.proposal.required}
          </motion.p>
        )}
        {status === "error" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>{ui.proposal.errorMsg}</span>
            <a
              href={waHref}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-accent/20"
            >
              <WhatsappIcon className="h-4 w-4 text-accent" /> {ui.proposal.whatsappCta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === "sending" ? ui.proposal.sending : ui.proposal.submit}
      </button>
    </form>
  );
}
