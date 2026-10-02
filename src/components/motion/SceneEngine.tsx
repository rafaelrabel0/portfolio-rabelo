"use client";

// Liga o motor das cenas uma vez por página (ver lib/scene-engine.ts) e
// remove o no-js do <html> — sem JS o CSS mostra tudo no estado final.

import { useEffect, useRef, useState, type RefObject } from "react";
import { onScene, startSceneEngine } from "@/lib/scene-engine";

export function SceneEngine() {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    return startSceneEngine();
  }, []);
  return null;
}

/** Passo atual (0..steps-1) de uma cena; só re-renderiza quando o passo muda. */
export function useSceneStep(ref: RefObject<HTMLElement | null>, steps: number, bias = 0) {
  const [step, setStep] = useState(0);
  const last = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onScene(el, (p) => {
      const s = Math.max(0, Math.min(steps - 1, Math.floor(p * steps + bias)));
      if (s !== last.current) {
        last.current = s;
        setStep(s);
      }
    });
  }, [ref, steps, bias]);
  return step;
}

/** Verdadeiro uma vez que o elemento entrou na tela (para tocar algo uma vez). */
export function useSeen<T extends Element>(ref: RefObject<T | null>, threshold = 0.35) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, seen]);
  return seen;
}
