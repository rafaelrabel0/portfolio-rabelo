// Diagrama de fluxo de um projeto, desenhado em DOM a partir dos dados
// (content/projects.ts). Substitui os prints antigos: crisp nos dois temas,
// sem marca de cliente. Um pulso ember percorre as colunas da esquerda para a
// direita — a "evidência" passando pelo sistema.

import type { FlowNode } from "@/content/projects";
import { cn } from "@/lib/cn";

export function FlowDiagram({ flow, className, compact }: { flow: FlowNode[][]; className?: string; compact?: boolean }) {
  return (
    <div className={cn("flow", compact && "flow-compact", className)} style={{ ["--cols" as string]: flow.length }}>
      <span aria-hidden className="flow-pulse" />
      {flow.map((col, c) => (
        <div key={c} className="flow-col">
          {col.map((n) => (
            <div key={n.t} className={cn("flow-node", n.hot && "hot")}>
              <b>{n.t}</b>
              <small>{n.s}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
