// FAQ em acordeão. Recriado no estilo do site (o código do 21st.dev não é
// acessível sem login): em vez de estado em React, usa <details>/<summary>
// nativos com a abertura animada em CSS. Funciona sem JS, é acessível por
// teclado de graça e continua server component.

import { ChevronDown } from "lucide-react";

export type FaqEntry = { q: string; a: string };

export function Faq({ entries }: { entries: FaqEntry[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface/40">
      {entries.map((entry) => (
        <details key={entry.q} className="faq-item group">
          <summary className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface/60 md:px-6 md:py-5">
            <span className="font-display text-base font-semibold md:text-lg">{entry.q}</span>
            <ChevronDown className="faq-chevron h-4 w-4 shrink-0 text-faint" />
          </summary>
          <div className="faq-answer">
            <div>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted md:px-6 md:pb-6 md:text-base">
                {entry.a}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
