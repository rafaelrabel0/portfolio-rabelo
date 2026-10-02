"use client";

// Pedido de proposta em três etapas — as perguntas vêm do briefing comercial e
// do roteiro de qualificação da deciban: quem é, o que precisa e por quê,
// prazo, faixa de investimento e quem decide. POST /api/proposal → webhook.
// Se o envio falhar, o mesmo pedido sai por e-mail, já preenchido.

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, Mail, Send } from "lucide-react";
import { profile } from "@/content/profile";
import { services, type ProposalOption } from "@/content/services";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

type Form = {
  name: string;
  role: string;
  company: string;
  segment: string;
  email: string;
  whatsapp: string;
  needs: string[];
  pain: string;
  tools: string;
  budget: string;
  deadline: string;
  deadlineDate: string;
  decider: string;
  history: string;
  website: string; // honeypot
};

const EMPTY: Form = {
  name: "", role: "", company: "", segment: "", email: "", whatsapp: "",
  needs: [], pain: "", tools: "", budget: "", deadline: "", deadlineDate: "", decider: "", history: "", website: "",
};

type Status = "idle" | "sending" | "ok" | "error";

const input =
  "w-full rounded-xl border border-border bg-bg/60 px-3.5 py-3 text-[15px] text-fg placeholder:text-faint outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_14%,transparent)]";

function Chips({ options, value, onPick, locale, multi }: { options: ProposalOption[]; value: string | string[]; onPick: (id: string) => void; locale: Locale; multi?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => {
        const on = Array.isArray(value) ? value.includes(o.id) : value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={on}
            onClick={() => onPick(o.id)}
            className={cn("chip", on && "on")}
          >
            <i aria-hidden />
            {o.label[locale]}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, children, req }: { label: string; children: React.ReactNode; req?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">
        {label}
        {req && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function ProposalForm({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const t = ui.proposal;
  const opts = services.proposal;
  const [f, setF] = useState<Form>(EMPTY);
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((x) => ({ ...x, [k]: e.target.value }));
  const label = (list: ProposalOption[], id: string) => list.find((o) => o.id === id)?.label[locale] ?? "";

  const summary = () =>
    [
      `${t.name}: ${f.name}${f.role ? ` (${f.role})` : ""}`,
      `${t.company}: ${f.company}${f.segment ? ` · ${f.segment}` : ""}`,
      `${t.email}: ${f.email}`,
      `${t.whatsapp}: ${f.whatsapp}`,
      `${t.needs} ${f.needs.map((n) => label(opts.needs, n)).join(", ")}`,
      `${t.pain} ${f.pain}`,
      `${t.tools} ${f.tools}`,
      `${t.budget}: ${label(opts.budgets, f.budget)}`,
      `${t.deadline}: ${label(opts.deadlines, f.deadline)}${f.deadlineDate ? ` — ${f.deadlineDate}` : ""}`,
      `${t.decider} ${label(opts.deciders, f.decider)}`,
      f.history ? `${t.history} ${f.history}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const mailto = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
    `${locale === "pt" ? "Pedido de proposta" : "Proposal request"} — ${f.company || f.name}`
  )}&body=${encodeURIComponent(summary())}`;

  const valid = (s: number) => {
    if (s === 0) return !!f.name.trim() && !!f.company.trim() && (!!f.email.trim() || !!f.whatsapp.trim());
    if (s === 1) return f.needs.length > 0 && !!f.pain.trim();
    return true;
  };

  const next = () => {
    if (!valid(step)) return setError(t.required);
    setError("");
    setStep((s) => Math.min(2, s + 1));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) return next();
    if (!valid(0) || !valid(1)) return setError(t.required);
    if (!consent) return setError(t.consentRequired);
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, locale, consent: true, consentTs: new Date().toISOString() }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="form-done flex flex-col items-center gap-4 px-6 py-16 text-center">
        <span className="done-pair" aria-hidden>
          <i />
          <i />
        </span>
        <p className="font-display text-2xl font-semibold">{t.successTitle}</p>
        <p className="max-w-sm text-sm text-muted">{t.successMsg}</p>
      </div>
    );
  }

  const titles = [t.s1, t.s2, t.s3];

  return (
    <form onSubmit={submit} noValidate className="p-5 sm:p-7">
      {/* progresso: escala de passos */}
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-xs tabular-nums text-faint">
          {t.step} {step + 1} {t.of} 3
        </span>
        <div className="flex flex-1 gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <i key={i} className={cn("exp-tick", i === step && "on", i < step && "past")} />
          ))}
        </div>
      </div>
      <p className="mb-5 font-display text-xl font-medium tracking-tight">{titles[step]}</p>

      <div key={step} className="form-step grid gap-4">
        {step === 0 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.name} req>
                <input className={input} value={f.name} onChange={set("name")} autoComplete="name" />
              </Field>
              <Field label={t.role}>
                <input className={input} value={f.role} onChange={set("role")} autoComplete="organization-title" />
              </Field>
              <Field label={t.company} req>
                <input className={input} value={f.company} onChange={set("company")} autoComplete="organization" />
              </Field>
              <Field label={t.segment}>
                <input className={input} value={f.segment} onChange={set("segment")} />
              </Field>
              <Field label={t.email} req>
                <input className={input} type="email" value={f.email} onChange={set("email")} autoComplete="email" />
              </Field>
              <Field label={t.whatsapp}>
                <input className={input} type="tel" value={f.whatsapp} onChange={set("whatsapp")} autoComplete="tel" placeholder="+55 …" />
              </Field>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <Field label={t.needs} req>
              <Chips
                multi
                locale={locale}
                options={opts.needs}
                value={f.needs}
                onPick={(id) => setF((x) => ({ ...x, needs: x.needs.includes(id) ? x.needs.filter((n) => n !== id) : [...x.needs, id] }))}
              />
            </Field>
            <Field label={t.pain} req>
              <textarea className={cn(input, "min-h-[110px] resize-y")} value={f.pain} onChange={set("pain")} placeholder={t.painPh} maxLength={3000} />
            </Field>
            <Field label={t.tools}>
              <input className={input} value={f.tools} onChange={set("tools")} placeholder={t.toolsPh} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label={t.budget}>
              <Chips locale={locale} options={opts.budgets} value={f.budget} onPick={(id) => setF((x) => ({ ...x, budget: id }))} />
            </Field>
            <Field label={t.deadline}>
              <Chips locale={locale} options={opts.deadlines} value={f.deadline} onPick={(id) => setF((x) => ({ ...x, deadline: id }))} />
            </Field>
            {f.deadline === "data" && (
              <Field label={t.deadlineDate}>
                <input className={input} value={f.deadlineDate} onChange={set("deadlineDate")} />
              </Field>
            )}
            <Field label={t.decider}>
              <Chips locale={locale} options={opts.deciders} value={f.decider} onPick={(id) => setF((x) => ({ ...x, decider: id }))} />
            </Field>
            <Field label={t.history}>
              <input className={input} value={f.history} onChange={set("history")} placeholder={t.historyPh} />
            </Field>
            <label className="flex cursor-pointer items-start gap-2.5 text-xs text-muted">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-accent)]"
              />
              <span>
                {t.consentLabel}{" "}
                <Link href={`/${locale}/privacidade`} target="_blank" className="text-fg underline underline-offset-2">
                  {ui.chat.consentLink}
                </Link>
                .
              </span>
            </label>
          </>
        )}
      </div>

      {/* honeypot — invisível para humanos */}
      <input type="text" name="website" value={f.website} onChange={set("website")} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {error && <p className="mt-4 text-xs text-accent-2">{error}</p>}
      {status === "error" && (
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{t.errorMsg}</span>
          <a href={mailto} className="btn btn-line">
            <Mail className="h-4 w-4" /> {t.emailCta}
          </a>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => {
              setError("");
              setStep((s) => s - 1);
            }} className="btn btn-ghost">
            <ArrowLeft className="h-4 w-4" /> {t.back}
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button type="submit" className="btn btn-solid">
            {t.next} <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="btn btn-solid disabled:opacity-60">
            {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {status === "sending" ? t.sending : t.submit}
          </button>
        )}
      </div>
    </form>
  );
}
