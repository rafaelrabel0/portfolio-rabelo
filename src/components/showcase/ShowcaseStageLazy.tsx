"use client";

// A demo "Na prática" é o único pedaço da home que precisa de framer-motion
// (~52 KB gzip). Ela vive abaixo da dobra e só começa a rodar quando entra na
// tela, então carregar o chunk antes disso é desperdício: aqui ela monta na
// primeira aproximação da viewport.
//
// O dynamic import tem de morar num Client Component — Server Components não
// fazem code splitting automático de Client Components (docs do Next 16).
// O esqueleto repete a moldura de 420px dos dois cards, então a troca não
// desloca nada (CLS zero).

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

const ShowcaseStage = dynamic(
  () => import("@/components/showcase/ShowcaseStage").then((m) => m.ShowcaseStage),
  { ssr: false, loading: () => <StageSkeleton /> }
);

function StageSkeleton() {
  return (
    <div aria-hidden className="grid gap-5 md:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i}>
          <div className="glow h-[420px] animate-pulse rounded-2xl border border-border bg-surface/80" />
          <p className="mt-3 h-4 px-1" />
        </div>
      ))}
    </div>
  );
}

export function ShowcaseStageLazy(props: { locale: Locale; ctaHref?: string; liveChat?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShow(true);
        observer.disconnect();
      },
      // Começa a baixar o chunk uma tela antes de aparecer.
      { rootMargin: "600px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? <ShowcaseStage {...props} /> : <StageSkeleton />}
    </div>
  );
}
