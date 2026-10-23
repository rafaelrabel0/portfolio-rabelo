"use client";

// Link para o site de um produto com a tela inicial seguindo o cursor — o
// mesmo gesto da lista de projetos, para usar solto no meio de um texto ou de
// uma lista (painel de frentes da deciban). O cartão vai para o <body> por
// portal: dentro de um [data-r] (que usa translate), position: fixed passaria a
// contar a partir do ancestral transformado e o cartão sairia do lugar.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectMock } from "@/components/portfolio/ProjectMock";
import { cn } from "@/lib/cn";

const W = 400;
const H = 250;

export function SitePeek({ project, children, className }: { project: Project; children: ReactNode; className?: string }) {
  const [on, setOn] = useState(false);
  const [armed, setArmed] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, ready: false });

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
      p.x += (t.x - p.x) * 0.18;
      p.y += (t.y - p.y) * 0.18;
      if (card.current) card.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [armed]);

  if (!project.link) return <span className={className}>{children}</span>;

  const place = (e: React.PointerEvent) => {
    let x = e.clientX + 24;
    let y = e.clientY - H - 18;
    if (x + W > window.innerWidth - 16) x = e.clientX - W - 24;
    if (y < 72) y = e.clientY + 24;
    target.current = { x, y };
  };

  return (
    <>
      <a
        href={project.link.url}
        target="_blank"
        rel="noreferrer"
        className={cn("site-peek", className)}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          place(e);
          setArmed(true);
          setOn(true);
        }}
        onPointerMove={(e) => e.pointerType === "mouse" && place(e)}
        onPointerLeave={() => setOn(false)}
      >
        {children}
        <ArrowUpRight className="site-peek-arrow h-3.5 w-3.5 shrink-0" />
      </a>
      {armed &&
        createPortal(
          <div ref={card} aria-hidden className="proj-card site-peek-card" data-visible={on}>
            <div className="proj-card-in">
              <ProjectMock project={project} className="h-full" />
              <div className="proj-card-cap">
                <span>{project.name}</span>
                <span>{project.link.label}</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
