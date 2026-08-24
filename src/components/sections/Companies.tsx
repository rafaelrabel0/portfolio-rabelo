import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { DeliveryList } from "@/components/DeliveryList";
import { ClientCard } from "@/components/ui/client-card";
import { companies } from "@/content/companies";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Companies({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <Section id="companies">
      <SectionHeader eyebrow="05" title={ui.sections.companiesTitle} subtitle={ui.sections.companiesSubtitle} />

      {/* Um card por marca. O que foi entregue fica visível; o que mudou na
          operação aparece no hover — a lista completa de serviços vive em
          /servicos, não precisa duplicar aqui. */}
      <div className="grid gap-5 md:grid-cols-2">
        {companies.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 2) * 0.06}>
            <ClientCard
              name={c.name}
              focus={c.focus[locale]}
              meta={
                c.clientCount > 0
                  ? `${ui.labels.clients}: ${c.clientCount}`
                  : locale === "pt"
                    ? "Produtos próprios da marca"
                    : "In-house brand products"
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
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                {locale === "pt" ? "Entregas" : "Delivered"}
              </p>
              {c.deliveries.length > 0 ? (
                <DeliveryList deliveries={c.deliveries} statusLabels={ui.status} locale={locale} />
              ) : (
                <ul className="space-y-2">
                  {c.services.map((sv, j) => (
                    <li key={j} className="text-sm text-muted">
                      {sv[locale]}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.stack.slice(0, 6).map((s) => (
                  <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-faint">
                    {s}
                  </span>
                ))}
              </div>

              {c.links && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {c.links.map((l) => (
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
