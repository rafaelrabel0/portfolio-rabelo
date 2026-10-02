// Par de fitas perfuradas que se encaixa. Server component: quem anima é o CSS,
// a partir de duas variáveis que a cena define a partir do seu --p:
//   --slide  deslocamento em furos (A anda para um lado, B para o outro)
//   --lock   0 → 1: as coincidências acendem em ember e a linha liga os furos

import type { CSSProperties } from "react";
import { buildTapes } from "@/lib/tape";
import { cn } from "@/lib/cn";

export function TapePair({ n = 31, className, style }: { n?: number; className?: string; style?: CSSProperties }) {
  const [A, B, hits] = buildTapes(n);
  return (
    <div aria-hidden className={cn("tape-pair", className)} style={style}>
      <div className="tape tape-a">
        {A.map((h, i) => (
          <i key={i} className={cn(h === "x" && "x", hits.includes(i) && "hit")} />
        ))}
      </div>
      <div className="tape tape-b">
        {B.map((h, i) => (
          <i key={i} className={cn(h === "x" && "x", hits.includes(i) && "hit")} />
        ))}
      </div>
      {hits.map((i) => (
        <span key={i} className="tape-link" style={{ ["--i" as string]: i }} />
      ))}
    </div>
  );
}
