"use client";

// Um único IntersectionObserver para todos os [data-reveal] da página, no lugar
// de um componente framer-motion por elemento. ~30 linhas, zero dependência.

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("no-js");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );

    const observeAll = () => {
      for (const el of document.querySelectorAll("[data-reveal]:not([data-in])")) {
        observer.observe(el);
      }
    };

    observeAll();

    // Seções que só aparecem depois (chat, demos) entram no observer sozinhas.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
