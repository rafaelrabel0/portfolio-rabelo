// O visual de cada projeto: a TELA INICIAL DO SITE OFICIAL (captura em
// public/projects/sites/) para quem tem site; uma interface desenhada em HTML
// só para quem não tem link público (<пароли/>), com dados fictícios e
// mascarados — o cofre de verdade nunca é fotografado.

import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

function Win({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mock-win", className)}>
      <div className="mock-bar">
        <span className="mock-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="truncate">{title}</span>
      </div>
      {children}
    </div>
  );
}




function Paroli() {
  const rows = [
    ["github.com", "rafael@…", "forte"],
    ["vercel.com", "deploy@…", "forte"],
    ["supabase.com", "ops@…", "média"],
    ["banco", "conta PJ", "forte"],
    ["n8n", "admin", "forte"],
  ];
  return (
    <div className="mock mock-paroli">
      <Win title="<пароли/> · cofre local">
        <div className="mock-paroli-body">
          <aside>
            <b>{"<пароли/>"}</b>
            <span className="on">Senhas</span>
            <span>Clientes</span>
            <span>Tarefas</span>
            <span>Finanças</span>
            <em>AES-256-GCM</em>
          </aside>
          <div className="list">
            <div className="search">⌕ buscar no cofre</div>
            {rows.map(([site, user, s], i) => (
              <div key={site} className={cn("row", i === 1 && "sel")}>
                <span className="ico">{site[0]}</span>
                <span className="min-w-0 flex-1">
                  <b>{site}</b>
                  <small>{user}</small>
                </span>
                <span className="pw">••••••••••</span>
                <span className={cn("str", s === "média" && "mid")} />
              </div>
            ))}
          </div>
        </div>
      </Win>
    </div>
  );
}

export function ProjectMock({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  const v = project.visual;
  let inner: React.ReactNode = null;
  if (v.kind === "site") {
    inner = (
      <Image
        src={v.src}
        alt={`${project.name} — tela inicial do site`}
        fill
        sizes="(max-width: 768px) 100vw, 640px"
        className="object-cover object-top"
        {...(priority ? { priority: true } : {})}
      />
    );
  } else if (v.kind === "mock") {
    inner = <Paroli />;
  }
  return <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-[#0b0908]", className)}>{inner}</div>;
}
