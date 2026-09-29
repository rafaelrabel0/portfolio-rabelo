// Marca deciban. O manual proíbe recolorir a logo, então o tema não é resolvido
// com `filter: invert` (como era na marca antiga) — os dois arquivos oficiais
// entram no HTML e o CSS mostra o certo para cada tema, sem JS e sem flash.
//
// dark  = para fundo escuro (furos claros)
// light = para fundo claro (furos escuros, ember #E8501A)

import Image from "next/image";
import { cn } from "@/lib/cn";

type Variante = "horizontal" | "simbolo";

const ARQUIVOS: Record<Variante, { dark: string; light: string; ratio: number }> = {
  // assinatura horizontal: símbolo de 3 colunas + nome (401 × 100)
  horizontal: {
    dark: "/brand/assinatura-horizontal-dark.svg",
    light: "/brand/assinatura-horizontal-light.svg",
    ratio: 401 / 100,
  },
  // símbolo reduzido: para marca ao lado de texto e espaços pequenos
  simbolo: {
    dark: "/brand/simbolo-reduzido-dark.svg",
    light: "/brand/simbolo-reduzido-light.svg",
    ratio: 19.6 / 17.6,
  },
};

export function BrandMark({
  variante = "horizontal",
  /** Altura em px. Mínimos do manual: horizontal 120px de largura, símbolo 16px. */
  height,
  className,
  priority,
}: {
  variante?: Variante;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const a = ARQUIVOS[variante];
  const width = Math.round(height * a.ratio);

  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ height, width }}>
      <Image
        src={a.dark}
        alt="deciban"
        width={width}
        height={height}
        className="brand-dark"
        {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      />
      <Image
        src={a.light}
        alt=""
        aria-hidden
        width={width}
        height={height}
        className="brand-light"
        {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      />
    </span>
  );
}
