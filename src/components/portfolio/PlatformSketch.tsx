// Rascunho de tela em cinza para as plataformas de cliente: dá forma ao que
// o sistema faz sem print (que mostraria marca de cliente). Caixas e linhas,
// sem cor — só o momento que importa em cada jornada fica em ember.

import type { SketchKind } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const L = {
  pt: { approve: "aprovar", adjust: "ajustar", when: "qui · 18h", consent: "aceito", lead: "novo lead", today: "hoje", ask: "pergunte" },
  en: { approve: "approve", adjust: "adjust", when: "thu · 6pm", consent: "i agree", lead: "new lead", today: "today", ask: "ask" },
};

const line = (w: string, extra?: string) => <i className={cn("sk-line", extra)} style={{ width: w }} />;

function Approval({ t }: { t: (typeof L)["pt"] }) {
  return (
    <div className="sk-win grid grid-cols-[42%_1fr] gap-3">
      <div className="grid content-start gap-2">
        <div className="sk-img aspect-square" />
        {line("80%")}
        {line("55%")}
      </div>
      <div className="flex flex-col gap-2">
        {line("70%")}
        {line("92%")}
        {line("84%")}
        {line("60%")}
        <span className="sk-chip mt-1 self-start">{t.when}</span>
        <div className="mt-auto flex gap-2">
          <span className="sk-btn">{t.adjust}</span>
          <span className="sk-btn hot">{t.approve}</span>
        </div>
      </div>
    </div>
  );
}

function Calendar({ t }: { t: (typeof L)["pt"] }) {
  return (
    <div className="flex h-full items-center justify-center gap-5">
      <div className="sk-phone">
        <span className="sk-chip self-center">{t.today}</span>
        {["08", "09", "10", "11", "14"].map((h, i) => (
          <div key={h} className="flex items-center gap-2">
            <span className="sk-mono">{h}</span>
            <i className={cn("sk-slot", i === 2 && "hot", i === 4 && "sk-slot-empty")} />
          </div>
        ))}
      </div>
      <i className="sk-link" />
      <div className="sk-month">
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} className={cn(i === 17 && "hot")} />
        ))}
      </div>
    </div>
  );
}

function Crm({ t }: { t: (typeof L)["pt"] }) {
  return (
    <div className="sk-win grid grid-cols-[1.15fr_1fr] gap-3">
      <div className="flex flex-col gap-2">
        <i className="sk-bubble" style={{ width: "70%" }} />
        <i className="sk-bubble me" style={{ width: "55%" }} />
        <i className="sk-bubble" style={{ width: "80%" }} />
        <span className="mt-auto flex items-center gap-2">
          <i className="sk-check hot" />
          <span className="sk-mono">{t.consent}</span>
        </span>
      </div>
      <div className="sk-panel">
        <div className="flex items-center gap-2">
          <i className="sk-avatar" />
          <div className="grid flex-1 gap-1.5">
            {line("80%")}
            {line("50%")}
          </div>
        </div>
        <span className="sk-chip hot mt-3 self-start">{t.lead}</span>
        {line("90%", "mt-3")}
        {line("70%", "mt-1.5")}
      </div>
    </div>
  );
}

function Chat({ t }: { t: (typeof L)["pt"] }) {
  return (
    <div className="sk-win grid grid-cols-[30%_1fr] gap-3">
      <div className="grid content-start gap-2 border-r border-border pr-3">
        {line("90%", "sk-line-on")}
        {line("75%")}
        {line("85%")}
        {line("60%")}
      </div>
      <div className="flex flex-col gap-2">
        <i className="sk-bubble me" style={{ width: "58%" }} />
        <i className="sk-bubble" style={{ width: "86%", height: 30 }} />
        <i className="sk-bubble me" style={{ width: "40%" }} />
        <div className="sk-input mt-auto">
          <span className="sk-mono">{t.ask}</span>
          <i className="sk-mic hot" />
        </div>
      </div>
    </div>
  );
}

function Pipeline() {
  const cols = [3, 2, 2, 1];
  return (
    <div className="grid h-full grid-cols-4 gap-2">
      {cols.map((n, c) => (
        <div key={c} className="sk-col">
          {line("60%")}
          {Array.from({ length: n }, (_, i) => (
            <i key={i} className={cn("sk-card", c === 0 && i === n - 1 && "sk-card-ghost", c === 1 && i === 0 && "hot")} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function PlatformSketch({ kind, locale, className }: { kind: SketchKind; locale: Locale; className?: string }) {
  const t = L[locale];
  return (
    <div className={cn("sk", className)} aria-hidden>
      {kind === "approval" && <Approval t={t} />}
      {kind === "calendar" && <Calendar t={t} />}
      {kind === "crm" && <Crm t={t} />}
      {kind === "chat" && <Chat t={t} />}
      {kind === "pipeline" && <Pipeline />}
    </div>
  );
}
