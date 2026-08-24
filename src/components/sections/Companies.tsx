import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ClientCard } from "@/components/ui/client-card";
import { companies } from "@/content/companies";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

// Uma coluna por marca, lado a lado, mostrando só o nome e o foco. O que mudou
// na operação aparece ao apontar o card — quem só está passando os olhos não
// precisa ler seis blocos de entrega.
//
// Rabelo Co. saiu daqui: é a holding do Rafael, não cliente.

export function Companies({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <Section id="companies">
      <SectionHeader eyebrow="05" title={ui.sections.companiesTitle} subtitle={ui.sections.companiesSubtitle} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.05}>
            <ClientCard
              name={c.name}
              focus={c.focus[locale]}
              meta={
                c.deliveries.length > 0
                  ? c.deliveries.map((d) => `${d.count ?? 1}× ${d.label[locale]}`).join(" · ")
                  : undefined
              }
              overlayTitle={
                <>
                  <TrendingUp className="h-3 w-3" />
                  {ui.labels.improved}
                </>
              }
              overlay={
                <ul className="space-y-2.5">
                  {c.improvements.map((m, j) => (
                    <li key={j} className="text-sm leading-relaxed text-fg/85">
                      {m[locale]}
                    </li>
                  ))}
                </ul>
              }
            >
              <div className="flex flex-wrap gap-1.5">
                {c.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-faint">
                    {s}
                  </span>
                ))}
              </div>

              {c.links && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {c.links.slice(0, 2).map((l) => (
                    <Link
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      className="inline-flex items-center gap-1 font-mono text-xs text-cyan hover:text-fg"
                    >
                      {l.label} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              )}
            </ClientCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
