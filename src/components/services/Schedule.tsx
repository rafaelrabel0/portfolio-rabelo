"use client";

// Agendar conversa: calendário do mês com o dia de hoje marcado, só dias úteis
// de hoje em diante; horários das 9h às 17h (horário de Brasília) conforme a
// duração escolhida (30, 45 ou 60 min). O pedido vai para /api/booking; se não
// der, sai por e-mail já preenchido. A confirmação é humana, por e-mail —
// a página não promete um horário que não pode garantir.

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarPlus, ChevronLeft, ChevronRight, Loader2, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const TZ = "America/Sao_Paulo";
const OPEN = 9 * 60;
const CLOSE = 17 * 60;
const DURATIONS = [30, 45, 60];

type Ymd = { y: number; m: number; d: number };

/** Data e minuto atuais em Brasília, independente do fuso do visitante. */
function nowBrt() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get("year"), m: get("month"), d: get("day"), min: get("hour") * 60 + get("minute") };
}

const key = (a: Ymd) => a.y * 10000 + a.m * 100 + a.d;
const pad = (n: number) => String(n).padStart(2, "0");
const hhmm = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
const iso = (a: Ymd) => `${a.y}-${pad(a.m)}-${pad(a.d)}`;

function slotsFor(day: Ymd, dur: number, today: { y: number; m: number; d: number; min: number }) {
  const out: number[] = [];
  const isToday = key(day) === key(today);
  for (let t = OPEN; t + dur <= CLOSE; t += 30) {
    if (isToday && t < today.min + 60) continue; // pelo menos 1 h de antecedência
    out.push(t);
  }
  return out;
}

/** Link do Google Agenda (Brasília = UTC−3, sem horário de verão desde 2019). */
function gcalLink(day: Ymd, start: number, dur: number, title: string, details: string) {
  const utc = (min: number) => {
    const d = new Date(Date.UTC(day.y, day.m - 1, day.d, 0, min + 180));
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };
  const q = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${utc(start)}/${utc(start + dur)}`, details });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

type Today = ReturnType<typeof nowBrt>;

/** "Hoje" só existe no navegador: a página é estática e o servidor não sabe
 *  quando ela será aberta. Até montar, mostra a moldura vazia (sem salto). */
export function Schedule({ locale }: { locale: Locale }) {
  const [today, setToday] = useState<Today | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- relógio do visitante, só existe no cliente
    setToday(nowBrt());
  }, []);
  if (!today) return <div className="frame min-h-[460px]" aria-busy />;
  return <ScheduleInner locale={locale} today={today} />;
}

function ScheduleInner({ locale, today }: { locale: Locale; today: Today }) {
  const ui = getUi(locale);
  const t = ui.schedule;
  const [view, setView] = useState({ y: today.y, m: today.m });
  const [day, setDay] = useState<Ymd | null>(null);
  const [dur, setDur] = useState(30);
  const [time, setTime] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", topic: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  const loc = locale === "pt" ? "pt-BR" : "en-US";
  const monthName = new Intl.DateTimeFormat(loc, { month: "long", year: "numeric" }).format(new Date(view.y, view.m - 1, 1));
  const first = new Date(view.y, view.m - 1, 1).getDay();
  const days = new Date(view.y, view.m, 0).getDate();
  const maxView = today.y * 12 + today.m + 2;
  const canPrev = view.y * 12 + view.m > today.y * 12 + today.m;
  const canNext = view.y * 12 + view.m < maxView;

  const shift = (k: number) =>
    setView((v) => {
      const n = v.y * 12 + (v.m - 1) + k;
      return { y: Math.floor(n / 12), m: (n % 12) + 1 };
    });

  const selectable = (d: number) => {
    const a = { y: view.y, m: view.m, d };
    const wd = new Date(view.y, view.m - 1, d).getDay();
    if (wd === 0 || wd === 6) return false;
    if (key(a) < key(today)) return false;
    return slotsFor(a, 30, today).length > 0;
  };

  const slots = day ? slotsFor(day, dur, today) : [];
  const dayLabel = day ? new Intl.DateTimeFormat(loc, { weekday: "long", day: "numeric", month: "long" }).format(new Date(day.y, day.m - 1, day.d)) : "";
  const title = locale === "pt" ? `Conversa com a deciban — ${form.name}` : `Call with deciban — ${form.name}`;
  const details = `${form.topic}\n${form.email}`;
  const mailBody =
    `${locale === "pt" ? "Pedido de conversa" : "Call request"}\n` +
    `${dayLabel} · ${time !== null ? hhmm(time) : ""} (${t.tz}) · ${dur} ${t.minutes}\n` +
    `${t.name}: ${form.name}\n${t.email}: ${form.email}\n${t.topic} ${form.topic}`;
  const mailto = `mailto:${profile.contact.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(mailBody)}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || time === null) return;
    if (!form.name.trim() || !form.email.trim()) return setErr(t.required);
    if (!consent) return setErr(ui.proposal.consentRequired);
    setErr("");
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: iso(day), time: hhmm(time), duration: dur, locale, consent: true, consentTs: new Date().toISOString() }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok" && day && time !== null) {
    return (
      <div className="sched-done frame flex flex-col items-start gap-4 p-7">
        <span className="done-pair" aria-hidden>
          <i />
          <i />
        </span>
        <p className="font-display text-2xl font-semibold">{t.doneTitle}</p>
        <p className="text-sm text-fg first-letter:uppercase">
          {dayLabel} · {hhmm(time)}–{hhmm(time + dur)} <span className="normal-case text-faint">({t.tz})</span>
        </p>
        <p className="max-w-md text-sm text-muted">{t.doneText}</p>
        <div className="flex flex-wrap gap-2">
          <a href={gcalLink(day, time, dur, title, details)} target="_blank" rel="noreferrer" className="btn btn-line">
            <CalendarPlus className="h-4 w-4" /> {t.addCalendar}
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setStatus("idle");
              setTime(null);
            }}
          >
            {t.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="frame grid overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* calendário */}
      <div className="border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
        <div className="mb-5 flex items-center justify-between">
          <p className="font-display text-xl font-semibold tracking-tight first-letter:uppercase">{monthName}</p>
          <div className="flex gap-1">
            <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label={t.prev} className="icon-btn">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => shift(1)} disabled={!canNext} aria-label={t.next} className="icon-btn">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {t.weekdays.map((w, i) => (
            <span key={i} className="pb-2 font-mono text-[11px] text-faint">
              {w}
            </span>
          ))}
          {Array.from({ length: first }, (_, i) => (
            <span key={`e${i}`} />
          ))}
          {Array.from({ length: days }, (_, i) => {
            const d = i + 1;
            const a = { y: view.y, m: view.m, d };
            const isToday = key(a) === key(today);
            const ok = selectable(d);
            const on = day && key(day) === key(a);
            return (
              <button
                key={d}
                type="button"
                disabled={!ok}
                onClick={() => {
                  setDay(a);
                  setTime(null);
                }}
                aria-pressed={!!on}
                aria-label={new Intl.DateTimeFormat(loc, { dateStyle: "full" }).format(new Date(view.y, view.m - 1, d))}
                className={cn("sched-day", isToday && "today", on && "on")}
              >
                {d}
                {isToday && <em>{t.today}</em>}
              </button>
            );
          })}
        </div>
        <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
          {t.closed} · 09:00–17:00 · {t.tz}
        </p>
      </div>

      {/* horário e dados */}
      <form onSubmit={submit} className="flex min-w-0 flex-col p-5 sm:p-7" noValidate>
        {!day ? (
          <div className="grid flex-1 place-items-center py-10 text-center">
            <p className="label">{t.pickDay}</p>
          </div>
        ) : (
          <div key={iso(day)} className="form-step grid gap-5">
            <div>
              <p className="label mb-2">{t.duration}</p>
              <div className="inline-flex rounded-full border border-border p-1">
                {DURATIONS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setDur(m);
                      setTime(null);
                    }}
                    className={cn("tab", dur === m && "on")}
                  >
                    {m} {t.minutes}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="label mb-2">
                {t.pickTime} · <span className="normal-case">{dayLabel}</span>
              </p>
              <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
                {slots.map((s) => (
                  <button key={s} type="button" onClick={() => setTime(s)} className={cn("slot", time === s && "on")}>
                    {hhmm(s)}
                  </button>
                ))}
              </div>
            </div>

            {time !== null && (
              <div className="form-step grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className="sched-input" placeholder={t.name} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} autoComplete="name" aria-label={t.name} />
                  <input className="sched-input" type="email" placeholder={t.email} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} autoComplete="email" aria-label={t.email} />
                </div>
                <input className="sched-input" placeholder={t.topicPh} value={form.topic} onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))} aria-label={t.topic} maxLength={500} />
                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-muted">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent)]" />
                  <span>
                    {ui.proposal.consentLabel}{" "}
                    <Link href={`/${locale}/privacidade`} target="_blank" className="text-fg underline underline-offset-2">
                      {ui.chat.consentLink}
                    </Link>
                    .
                  </span>
                </label>
                {err && <p className="text-xs text-accent-2">{err}</p>}
                {status === "error" && (
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span>{t.fallback}</span>
                    <a href={mailto} className="btn btn-line">
                      <Mail className="h-4 w-4" /> {t.fallbackCta}
                    </a>
                  </div>
                )}
                <button type="submit" disabled={status === "sending"} className="btn btn-solid mt-1 w-fit disabled:opacity-60">
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {status === "sending" ? t.sending : `${t.confirm} · ${hhmm(time)}`}
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
