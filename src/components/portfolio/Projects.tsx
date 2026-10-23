// Cena 4 — projetos em destaque. Os quatro produtos que o Rafael escolheu
// (uai?, grudí, Sistere, Limiar), com a tela inicial de cada site seguindo o
// cursor; o resto abre em "ver todos".

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featured } from "@/content/projects";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import { ProductList } from "@/components/portfolio/ProductList";

export function Projects({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <section id="projetos" data-chapter="projetos" className="relative mx-auto w-full max-w-7xl scroll-mt-16 px-4 py-28 sm:px-6 md:py-36">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6" data-r>
        <div>
          <p className="label mb-3 flex items-center gap-3">
            <span className="text-accent">04</span> {ui.projects.label}
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight md:text-5xl">{ui.projects.title}</h2>
        </div>
        <p className="label hidden md:block">{ui.projects.hint}</p>
      </div>

      <ProductList items={featured} locale={locale} />

      <div className="mt-12 flex justify-start" data-r>
        <Link href={`/${locale}/projetos`} className="btn btn-line">
          {ui.cta.allProjects} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
