// Seletor de idioma pareado com o ThemeToggle: mesma altura, mesma borda, mesmo
// raio. Em vez de um botão que troca de rótulo, mostra os dois idiomas com uma
// pílula que desliza para o ativo — fica óbvio o que está selecionado e o que
// acontece ao clicar.
//
// O idioma é rota (/pt, /en), então o item inativo é um Link de verdade: funciona
// sem JS e o crawler vê as duas versões.

import Link from "next/link";
import { cn } from "@/lib/cn";
import { locales, type Locale } from "@/lib/i18n";

export function LocaleToggle({
  locale,
  hrefFor,
  className,
}: {
  locale: Locale;
  /** Caminho equivalente na outra língua, mantendo a página atual. */
  hrefFor: (target: Locale) => string;
  className?: string;
}) {
  const activeIndex = locales.indexOf(locale);

  return (
    <div
      className={cn(
        "relative flex h-8 items-center rounded-full border border-border p-0.5 font-mono text-xs",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute top-0.5 h-7 w-[calc(50%-2px)] rounded-full bg-surface-2 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative z-10 flex h-7 w-9 items-center justify-center rounded-full uppercase transition-colors",
              active ? "text-fg" : "text-faint hover:text-muted"
            )}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
