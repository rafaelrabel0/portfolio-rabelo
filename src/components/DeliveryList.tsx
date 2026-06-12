"use client";

// Lista animada de entregas por cliente (sem expor nomes de clientes).

import { motion } from "framer-motion";
import type { Delivery, ClientStatus } from "@/content/companies";
import type { Locale } from "@/lib/i18n";

const statusDot: Record<ClientStatus, string> = {
  ativo: "bg-accent",
  onboarding: "bg-amber-400",
  parcial: "bg-cyan",
  proposta: "bg-purple-400",
  planejamento: "bg-faint",
};

export function DeliveryList({
  deliveries,
  statusLabels,
  locale,
}: {
  deliveries: Delivery[];
  statusLabels: Record<ClientStatus, string>;
  locale: Locale;
}) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      className="space-y-1.5"
    >
      {deliveries.map((d, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, x: -16 },
            show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } },
          }}
          className="group flex items-center gap-2.5 rounded-lg border border-transparent px-2 py-2 text-sm transition-colors hover:border-border hover:bg-bg/40"
        >
          <span className={`relative h-2 w-2 shrink-0 rounded-full ${statusDot[d.status]}`}>
            {(d.status === "ativo" || d.status === "onboarding") && (
              <span className={`absolute inset-0 animate-ping rounded-full opacity-60 ${statusDot[d.status]}`} />
            )}
          </span>
          <span className="min-w-0 flex-1 text-fg/90">{d.label[locale]}</span>
          {d.count !== undefined && (
            <span className="shrink-0 rounded-full border border-border bg-surface-2/70 px-2 py-0.5 font-mono text-[10px] text-muted transition-colors group-hover:border-border-strong">
              ×{d.count}
            </span>
          )}
          <span className="shrink-0 font-mono text-[10px] uppercase text-faint">{statusLabels[d.status]}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
