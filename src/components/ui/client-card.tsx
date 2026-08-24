// Card de marca/cliente com um overlay que revela no hover o que mudou na
// operação — o papel do testimonial-1 do 21st.dev, sem depoimento inventado:
// aqui o que aparece é a entrega real, contada sem nome de cliente final.
//
// O overlay cobre o card em vez de ocupar o corpo dele. Assim o card já diz
// algo sem interação (primeira versão deixava quatro caixas quase vazias para
// quem não passa o mouse) e o hover acrescenta a leitura de resultado.
//
// Em telas de toque, onde hover não existe, o overlay some e as melhorias
// entram no fluxo normal do card — senão o conteúdo seria inalcançável.

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ClientCard({
  name,
  focus,
  meta,
  overlayTitle,
  overlay,
  children,
  className,
}: {
  name: string;
  focus: string;
  /** Linha curta de contexto (contagem de clientes, papel). */
  meta?: string;
  overlayTitle: ReactNode;
  /** Revelado no hover: o que mudou na operação. */
  overlay: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      tabIndex={0}
      className={cn(
        "client-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 p-6",
        "transition-all hover:border-border-strong focus-visible:border-border-strong",
        className
      )}
    >
      {/* brilho ember no canto, acende junto com o overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
      />

      <div className="relative">
        <h3 className="font-display text-lg font-bold tracking-tight">{name}</h3>
        <p className="mt-1 text-sm text-muted">{focus}</p>
        {meta && <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{meta}</p>}
      </div>

      <div className="relative mt-5 flex-1 border-t border-border pt-4">{children}</div>

      {/* Overlay do hover — em telas de toque ele não existe (ver client-overlay
          em globals.css) e o conteúdo aparece abaixo, no fluxo. */}
      <div className="client-overlay absolute inset-0 flex flex-col bg-bg/92 p-6 backdrop-blur-sm">
        <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          {overlayTitle}
        </p>
        <div className="mt-4 min-h-0 flex-1 overflow-hidden">{overlay}</div>
      </div>

      <div className="client-overlay-inline relative mt-5 border-t border-border pt-4">
        <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          {overlayTitle}
        </p>
        <div className="mt-3">{overlay}</div>
      </div>
    </article>
  );
}
