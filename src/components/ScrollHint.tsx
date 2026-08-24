// Indicador "role para explorar" no hero — some conforme o usuário rola.
// Bob do chevron em keyframes CSS; o fade usa view() timeline quando existe.

import { ChevronDown } from "lucide-react";

export function ScrollHint({ label }: { label: string }) {
  return (
    <a
      href="#about"
      className="scroll-hint absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-faint transition-colors hover:text-muted md:flex"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{label}</span>
      <span className="scroll-hint-chevron">
        <ChevronDown className="h-4 w-4" />
      </span>
    </a>
  );
}
