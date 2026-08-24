// Botão do Magic UI (interactive-hover-button): um ponto que cresce até cobrir
// o botão enquanto o rótulo desliza e reaparece com a seta.
//
// Adaptado dos tokens shadcn do original (bg-background / bg-primary /
// text-primary-foreground) para os tokens ember do site, e com variante para os
// dois pesos de CTA que o portfólio já usava: sólido e contornado.

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline";

const base =
  "group relative inline-flex w-auto cursor-pointer items-center overflow-hidden rounded-full px-5 py-3 text-sm font-medium";

const variants: Record<Variant, { shell: string; dot: string; reveal: string }> = {
  // Sólido: o hover inverte para o acento, então o rótulo revelado fica escuro.
  solid: {
    shell: "bg-fg text-bg",
    dot: "bg-accent",
    reveal: "text-bg",
  },
  outline: {
    shell: "border border-border bg-transparent text-fg hover:border-border-strong",
    dot: "bg-accent",
    reveal: "text-bg",
  },
};

export function InteractiveHoverButton({
  children,
  className,
  variant = "solid",
  icon,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  icon?: ReactNode;
}) {
  const v = variants[variant];

  return (
    <span className={cn(base, v.shell, className)}>
      <span className="flex items-center justify-center gap-2">
        <span
          className={cn(
            "h-2 w-2 shrink-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-[80]",
            v.dot
          )}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-8 group-hover:opacity-0">
          {children}
        </span>
      </span>
      {/* Cópia só para o efeito: aria-hidden para o leitor de tela não anunciar
          o rótulo duas vezes. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 z-10 flex translate-x-8 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
          v.reveal
        )}
      >
        {icon}
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </span>
    </span>
  );
}
