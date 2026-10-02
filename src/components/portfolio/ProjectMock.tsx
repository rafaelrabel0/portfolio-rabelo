// Interfaces dos projetos em destaque, desenhadas em HTML/CSS. Projetos sem
// link público (Grudaí, Paroli) só existem para o visitante por aqui; os
// outros ganham uma vitrine viva no lugar de um print parado.
//
// Tudo fictício e seguro: o cofre mostra entradas de exemplo mascaradas.

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

function Uai() {
  return (
    <div className="mock mock-uai">
      <Image src="/projects/uai.jpg" alt="" fill sizes="480px" className="object-cover opacity-90" />
      <div className="mock-uai-isl">
        <span className="spin" />
        <div>
          <b>Inglês → Português</b>
          <p>entregar vale mais que perfeito, sempre.</p>
        </div>
      </div>
    </div>
  );
}

function FaceFinder() {
  return (
    <div className="mock mock-ff">
      <Win title="ache-suas-fotos · demo">
        <div className="mock-ff-body">
          <div className="mock-ff-crowd">
            {Array.from({ length: 13 }, (_, i) => (
              <span key={i} className={cn("face", i === 7 && "me")} style={{ ["--i" as string]: i }}>
                {i === 7 && <em>0,533</em>}
              </span>
            ))}
          </div>
          <div className="mock-ff-side">
            <div className="selfie">
              <span />
            </div>
            <p>
              <b>13</b> rostos
            </p>
            <p className="ok">é você</p>
          </div>
        </div>
      </Win>
    </div>
  );
}

function Grudai() {
  return (
    <div className="mock mock-grudai">
      <div className="mock-desk">
        <Win title="Planilha — orçamento.xlsx" className="mock-under">
          <div className="mock-sheet">
            {Array.from({ length: 24 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </Win>
        <div className="note n1">
          <b>Ligar p/ fornecedor</b>
          <p>até 15h · pedir prazo</p>
        </div>
        <div className="note n2">
          <b>Ideias do lançamento</b>
          <p>• vídeo de 30 s{"\n"}• convite por código</p>
        </div>
        <div className="note n3 pin">
          <b>⏰ Reunião 16:30</b>
          <p>a nota salta na hora</p>
        </div>
        <span className="grudai-dot" />
      </div>
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

export function ProjectMock({ project, className }: { project: Project; className?: string }) {
  const v = project.visual;
  let inner: React.ReactNode = null;
  if (v.kind === "mock") {
    inner = v.mock === "uai" ? <Uai /> : v.mock === "facefinder" ? <FaceFinder /> : v.mock === "grudai" ? <Grudai /> : <Paroli />;
  } else if (v.kind === "image") {
    inner = <Image src={v.src} alt="" fill sizes="480px" className="object-cover" />;
  }
  return <div className={cn("relative aspect-[16/10] w-full overflow-hidden", className)}>{inner}</div>;
}
