// Entrada por scroll sem framer-motion: só classe + custom property de delay.
// Server component — não custa nada ao bundle do cliente.
//
// `immediate` (hero) usa animação CSS que roda no primeiro paint, sem depender
// de hidratação. O resto espera o RevealObserver marcar data-in.

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;

  return (
    <div
      className={cn(immediate ? "reveal-now" : "reveal", className)}
      style={style}
      {...(immediate ? {} : { "data-reveal": "" })}
    >
      {children}
    </div>
  );
}
