"use client";

// Cena 4 — projetos em destaque. Nomes grandes em lista; ao apontar, uma
// janela com a interface do projeto segue o cursor (com inércia) e troca de
// conteúdo entre um projeto e outro. Clicar no nome abre o site do projeto;
// os que não têm link público (pessoais) abrem os detalhes na própria lista.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { featured, type Project } from "@/content/projects";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { ProjectMock } from "@/components/portfolio/ProjectMock";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { cn } from "@/lib/cn";

const CARD_W = 440;
const CARD_H = 275;

function Details({ p, locale }: { p: Project; locale: Locale }) {
  const ui = getUi(locale);
  return (
    <div className="grid gap-6 pb-8 pt-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10">
      <div className="overflow-hidden rounded-2xl border border-border">
        <ProjectMock project={p} />
      </div>
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
        <FlowDiagram flow={p.flow} compact className="mt-6" />
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

export function Projects({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const [hover, setHover] = useState<number | null>(null);
  const [last, setLast] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, ready: false });

  // A janela segue o cursor com inércia (sem re-render: transform direto).
  useEffect(() => {
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
  }, []);

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
    setHover(i);
    setLast(i);
  };

  return (
    <section id="projetos" data-chapter="projetos" className="relative mx-auto w-full max-w-7xl scroll-mt-16 px-4 py-28 sm:px-6 md:py-36">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6" data-r>
        <div>
          <p className="label mb-3 flex items-center gap-3">
            <span className="text-accent">04</span> {ui.projects.label}
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight md:text-5xl">{ui.projects.title}</h2>
        </div>
        <p className="label hidden md:block">{ui.projects.hint}</p>
      </div>

      <ol className="proj-list" onPointerMove={move} onPointerLeave={() => setHover(null)} data-hover={hover !== null}>
        {featured.map((p, i) => {
          const isOpen = open === p.slug;
          const head = (
            <>
              <span className="proj-i font-mono text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="proj-name font-display font-semibold tracking-[-0.035em]">{p.name}</span>
              <span className="proj-meta hidden min-w-0 md:block">
                <span className="block truncate text-sm text-muted">{p.tagline[locale]}</span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {ui.status[p.status]} · {p.year}
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
                {/* no celular não há cursor: a interface aparece na própria lista */}
                <div className="mt-3 overflow-hidden rounded-xl border border-border">
                  <ProjectMock project={p} />
                </div>
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

      <div className="mt-12 flex justify-start" data-r>
        <Link href={`/${locale}/projetos`} className="btn btn-line">
          {ui.cta.allProjects} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* janela que segue o cursor */}
      <div ref={cardRef} aria-hidden className="proj-card" data-visible={hover !== null}>
        <div className="proj-card-in">
          {featured.map((p, i) => (
            <div key={p.slug} className={cn("proj-card-face", i === last && "on")}>
              <ProjectMock project={p} className="h-full" />
            </div>
          ))}
          <div className="proj-card-cap">
            <span>{featured[last].name}</span>
            <span>{featured[last].link ? featured[last].link!.label : ui.projects.noLink}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
