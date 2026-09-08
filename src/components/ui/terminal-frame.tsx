// Moldura de janela de terminal. Existe porque as peças do brainless usam as
// cores do terminal de verdade (Tokyo Night, hardcoded) — soltas no tema claro
// do site elas ficariam escuras à força, sem explicação.
//
// Dentro da moldura a cor escura passa a ser intencional: é um terminal, e
// terminal é escuro nos dois temas.

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function TerminalFrame({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("glow overflow-hidden rounded-2xl border border-border-strong", className)}
      style={{ background: "#16161e" }}
    >
      <div
        className="flex items-center gap-2 border-b px-4 py-2.5"
        style={{ background: "#1a1b26", borderColor: "#2b2d3a" }}
      >
        <span aria-hidden className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </span>
        <p className="ml-1 font-mono text-[11px]" style={{ color: "#787c99" }}>
          {title}
        </p>
      </div>

      {/* O conteúdo é uma cena de terminal: em tela estreita rola na horizontal
          em vez de quebrar as linhas e destruir o alinhamento. */}
      <div className="overflow-x-auto px-4 py-4 md:px-5">
        <div className="min-w-[560px]">{children}</div>
      </div>
    </div>
  );
}
