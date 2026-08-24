"use client";

// Um único IntersectionObserver para todos os [data-reveal] da página, no lugar
// de um componente framer-motion por elemento.
//
// O IO sozinho não basta: em salto de scroll (clique numa âncora do menu,
// Ctrl+End, restauração de posição) o elemento entra e sai da área de detecção
// entre dois frames e o callback nunca chega — a seção ficava em opacity 0
// para sempre. Por isso existe o sweep: marca tudo que já alcançou a dobra,
// inclusive o que passou por cima. Ele roda no scroll com throttle de um frame
// e se desliga quando não há mais nada pendente.

import { useEffect } from "react";

const MARGIN = 80;

export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");

    const pending = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: `0px 0px -${MARGIN}px 0px` }
    );

    /** Marca o que já entrou na dobra (ou passou dela) e devolve quantos sobraram. */
    const sweep = () => {
      const limit = window.innerHeight - MARGIN;
      for (const el of pending()) {
        if (el.getBoundingClientRect().top < limit) {
          el.setAttribute("data-in", "");
          observer.unobserve(el);
        }
      }
      return pending().length;
    };

    const observeAll = () => {
      for (const el of pending()) observer.observe(el);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (sweep() === 0) window.removeEventListener("scroll", onScroll);
      });
    };

    observeAll();
    sweep();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Seções que só aparecem depois (chat, demos) entram no observer sozinhas.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
