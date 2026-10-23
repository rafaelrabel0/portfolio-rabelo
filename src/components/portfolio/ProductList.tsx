"use client";

// Lista de produtos com preview: nomes grandes; ao apontar, a tela inicial do
// site oficial segue o cursor (com inércia) e troca entre um produto e outro.
// Clicar no nome abre o site; quem não tem site (pessoal) abre os detalhes na
// própria lista. Mesma peça na home (destaques) e em /projetos (todos).

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Project } from "@/content/projects";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { ProjectMock } from "@/components/portfolio/ProjectMock";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { cn } from "@/lib/cn";

const CARD_W = 480;
const CARD_H = 300;

function Details({ p, locale }: { p: Project; locale: Locale }) {
  const ui = getUi(locale);
  return (
    <div className="grid gap-6 pb-8 pt-2 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
      {p.link ? (
        <a href={p.link.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-border transition-colors hover:border-border-strong">
          <ProjectMock project={p} />
        </a>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <ProjectMock project={p} />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-base leading-relaxed text-muted">{p.summary[locale]}</p>
        {p.metrics && (
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {p.metrics.map((m) => (
              <div key={m.value}>
                <dt className="font-mono text-2xl tabular-nums text-fg">{m.value}</dt>
                <dd className="text-xs text-faint">{m.label[locale]}</dd>
              </div>
            ))}
          </dl>
        )}
        {p.flow && <FlowDiagram flow={p.flow} compact className="mt-6" />}
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>
        {p.link ? (
          <a href={p.link.url} target="_blank" rel="noreferrer" className="btn btn-line mt-6">
            {p.link.label} <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <p className="label mt-6">{ui.projects.noLink}</p>
        )}
      </div>
    </div>
  );
}

export function ProductList({ items, locale }: { items: Project[]; locale: Locale }) {
  const ui = getUi(locale);
  const [hover, setHover] = useState<number | null>(null);
  const [last, setLast] = useState(0);
  // As capturas só entram no DOM depois do primeiro apontar: o cartão é fixo
  // na tela (opacity 0) e o lazy nativo baixaria todas de saída.
  const [armed, setArmed] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, ready: false });

  // O cartão segue o cursor com inércia (sem re-render: transform direto).
  useEffect(() => {
    if (!armed) return;
    let raf = 0;
    const loop = () => {
      const p = pos.current;
      const t = target.current;
      if (!p.ready) {
        p.x = t.x;
        p.y = t.y;
        p.ready = true;
      }
      p.x += (t.x - p.x) * 0.16;
      p.y += (t.y - p.y) * 0.16;
      const el = cardRef.current;
      if (el) {
        const vx = (t.x - p.x) * 0.04;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${Math.max(-6, Math.min(6, vx))}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [armed]);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    let x = e.clientX + 28;
    let y = e.clientY - CARD_H / 2;
    if (x + CARD_W > window.innerWidth - 16) x = e.clientX - CARD_W - 28;
    y = Math.max(72, Math.min(window.innerHeight - CARD_H - 16, y));
    target.current = { x, y };
  };

  const enter = (i: number) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setArmed(true);
    setHover(i);
    setLast(i);
  };

  const cur = items[last];

  return (
    <>
      <ol className="proj-list" onPointerMove={move} onPointerLeave={() => setHover(null)} data-hover={hover !== null}>
        {items.map((p, i) => {
          const isOpen = open === p.slug;
          const head = (
            <>
              <span className="proj-i font-mono text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="proj-name font-display font-semibold tracking-[-0.035em]">{p.name}</span>
              <span className="proj-meta hidden min-w-0 md:block">
                <span className="block truncate text-sm text-muted">{p.tagline[locale]}</span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {ui.status[p.status]} · {p.link ? p.link.label : ui.projects.noLink}
                </span>
              </span>
            </>
          );
          return (
            <li key={p.slug} className={cn("proj-row", hover === i && "is-hover")} data-open={isOpen} data-r>
              <div className="flex items-center gap-3" onPointerEnter={enter(i)}>
                {p.link ? (
                  <a href={p.link.url} target="_blank" rel="noreferrer" className="proj-head" aria-label={`${p.name} — ${p.link.label}`}>
                    {head}
                    <ArrowUpRight className="proj-arrow h-6 w-6 shrink-0" />
                  </a>
                ) : (
                  <button type="button" className="proj-head text-left" onClick={() => setOpen(isOpen ? null : p.slug)} aria-expanded={isOpen}>
                    {head}
                    <Plus className={cn("proj-arrow h-6 w-6 shrink-0 transition-transform duration-500", isOpen && "rotate-45")} />
                  </button>
                )}
                {p.link && (
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : p.slug)}
                    aria-expanded={isOpen}
                    className="hidden h-9 shrink-0 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-muted transition-colors hover:border-border-strong hover:text-fg sm:inline-flex"
                  >
                    <Plus className={cn("h-3.5 w-3.5 transition-transform duration-500", isOpen && "rotate-45")} />
                    {isOpen ? ui.projects.close : ui.projects.details}
                  </button>
                )}
              </div>
              <div className="pb-5 pl-12 md:hidden">
                <p className="text-sm text-muted">{p.tagline[locale]}</p>
                {/* no celular não há cursor: a tela do site aparece na própria lista */}
                {p.link ? (
                  <a href={p.link.url} target="_blank" rel="noreferrer" className="mt-3 block overflow-hidden rounded-xl border border-border">
                    <ProjectMock project={p} />
                  </a>
                ) : (
                  <div className="mt-3 overflow-hidden rounded-xl border border-border">
                    <ProjectMock project={p} />
                  </div>
                )}
              </div>
              <div className="acc-body">
                <div>
                  <Details p={p} locale={locale} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* cartão que segue o cursor */}
      {armed && (
        <div ref={cardRef} aria-hidden className="proj-card" data-visible={hover !== null}>
          <div className="proj-card-in">
            {items.map((p, i) => (
              <div key={p.slug} className={cn("proj-card-face", i === last && "on")}>
                <ProjectMock project={p} className="h-full" />
              </div>
            ))}
            <div className="proj-card-cap">
              <span>{cur.name}</span>
              <span>{cur.link ? cur.link.label : ui.projects.noLink}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
