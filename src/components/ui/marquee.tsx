// Marquee infinito. O original (spell.sh) injeta os keyframes com <style jsx>
// e é client component; aqui as regras vivem em globals.css e isto é um server
// component — a faixa é decorativa e não precisa de JS nenhum.
//
// Duas trilhas idênticas deslizam -100%: quando a primeira sai da tela, a
// segunda já ocupou o lugar. A segunda é aria-hidden para o leitor de tela não
// ouvir a lista duas vezes.

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Marquee({
  children,
  className,
  duration = 32,
  gap = 40,
  direction = "left",
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  gap?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("marquee", className)}
      data-direction={direction}
      data-pause={pauseOnHover}
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-gap": `${gap}px`,
        } as CSSProperties
      }
    >
      <div className="marquee-track">{children}</div>
      <div aria-hidden className="marquee-track">
        {children}
      </div>
    </div>
  );
}
