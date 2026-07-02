"use client";

// Agenda embedada via Cal.com (snippet oficial de embed inline).
// calLink vem de NEXT_PUBLIC_CAL_LINK (ex.: "rafael-rabelo/discovery").
// Sem link configurado, o pai renderiza o fallback de WhatsApp no lugar.

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // API do embed do Cal.com (função com fila própria)
    Cal?: ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };
  }
}

export function CalEmbed({ calLink }: { calLink: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current || !ref.current) return;
    mounted.current = true;

    // Snippet oficial do Cal.com (loader com fila até o embed.js carregar)
    (function (C: Window, A: string, L: string) {
      const p = function (a: { q: unknown[] }, ar: unknown) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal = C.Cal!;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api = function (...apiArgs: unknown[]) {
              p(api as unknown as { q: unknown[] }, apiArgs);
            } as ((...a: unknown[]) => void) & { q: unknown[] };
            const namespace = args[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns![namespace] = cal.ns![namespace] || api;
              p(cal.ns![namespace] as { q: unknown[] }, args);
              p(cal as unknown as { q: unknown[] }, ["initNamespace", namespace]);
            } else {
              p(cal as unknown as { q: unknown[] }, args);
            }
            return;
          }
          p(cal as unknown as { q: unknown[] }, args);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal!("init", { origin: "https://cal.com" });
    window.Cal!("inline", {
      elementOrSelector: ref.current,
      calLink,
      layout: "month_view",
    });
    window.Cal!("ui", {
      theme: document.documentElement.dataset.theme === "light" ? "light" : "dark",
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [calLink]);

  return <div ref={ref} className="min-h-[560px] w-full overflow-auto rounded-2xl border border-border bg-surface/60" />;
}
