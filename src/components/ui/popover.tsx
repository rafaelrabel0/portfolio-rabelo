// Popover ancorado, recriado no estilo do site (o do 21st.dev não é acessível
// sem login e traria Radix para um projeto que não usa Radix).
//
// Fica posicionado em relação ao elemento pai, que precisa ser `relative`.
// Sem foco-trap nem portal de propósito: aqui ele é um aviso, não um diálogo —
// o visitante continua digitando no input embaixo dele.

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export function Popover({
  open,
  title,
  children,
  onClose,
  closeLabel,
  className,
}: {
  open: boolean;
  title?: ReactNode;
  children: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}) {
  return (
    <div
      data-open={open}
      role="status"
      aria-live="polite"
      className={cn(
        "popover absolute bottom-full left-1/2 z-40 mb-3 w-[min(21rem,calc(100vw-2.5rem))] -translate-x-1/2",
        className
      )}
    >
      <div className="relative rounded-2xl border border-border-strong bg-surface-2 p-4 shadow-2xl">
        {onClose && (
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-2.5 top-2.5 text-faint transition-colors hover:text-fg"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {title && <p className="pr-6 font-display text-sm font-semibold">{title}</p>}
        <div className="mt-1.5 text-xs leading-relaxed text-muted">{children}</div>
        <span aria-hidden className="popover-arrow left-1/2 -ml-[5px]" />
      </div>
    </div>
  );
}
