// "Como funciona" em passos numerados. Recriado no estilo do site: número
// grande em display, conector entre os passos e destaque no card ativo por
// hover. Server component, sem JS.
//
// O conector é um pseudo-elemento no card (não uma linha atrás de tudo), então
// ele acompanha o grid quando quebra em uma coluna no mobile.

import { cn } from "@/lib/cn";

export type Step = { title: string; desc: string };

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={cn(
            "group relative flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6",
            "transition-colors hover:border-border-strong hover:bg-surface"
          )}
        >
          {/* conector para o passo seguinte — só entre colunas, no desktop */}
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute right-[-10px] top-1/2 hidden h-px w-[20px] bg-border lg:block"
            />
          )}

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold leading-none text-border-strong transition-colors group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-base font-semibold">{step.title}</h3>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">{step.desc}</p>
        </li>
      ))}
    </ol>
  );
}
