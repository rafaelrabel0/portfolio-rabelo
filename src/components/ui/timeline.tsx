// Timeline com rótulo grudado (sticky) e trilho que preenche conforme o scroll —
// o componente do Aceternity, sem framer-motion.
//
// O original mede a altura do container com useEffect e anima height/opacity com
// useScroll. Isso pedia client component e a lib inteira; aqui o trilho é uma
// scroll-driven animation em CSS (.timeline-beam) e isto segue server component.

import type { ReactNode } from "react";

export type TimelineEntry = {
  label: string;
  title: string;
  content: ReactNode;
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      {/* trilho: base apagada + feixe ember que cresce com o scroll */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[15px] top-2 w-px bg-border md:left-[19px]"
      >
        <div
          className="timeline-beam h-full w-px"
          style={{
            background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-2))",
          }}
        />
      </div>

      <div className="space-y-12 md:space-y-16">
        {entries.map((entry) => (
          <div key={entry.label} className="relative flex gap-6 md:gap-10">
            <div className="sticky top-24 z-10 flex h-8 w-8 shrink-0 items-center justify-center md:h-10 md:w-10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg md:h-10 md:w-10">
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_4px_color-mix(in_srgb,var(--color-accent)_45%,transparent)]" />
              </span>
            </div>

            {/* max-w-3xl: linha de leitura de ~80 caracteres, senão o texto
                atravessa os 1440px e fica difícil de acompanhar */}
            <div className="min-w-0 max-w-3xl flex-1 pb-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{entry.label}</p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight md:text-2xl">
                {entry.title}
              </h3>
              <div className="mt-4">{entry.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
