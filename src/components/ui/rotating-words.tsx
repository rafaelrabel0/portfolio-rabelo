// Palavras que se revezam numa linha — o efeito do animated-hero do 21st.dev,
// aqui em CSS puro. O original usa framer-motion; no hero isso custaria o LCP,
// porque o h1 só apareceria depois da hidratação. Server component.
//
// Cada palavra ganha uma fatia igual do ciclo via animation-delay, e os
// keyframes são emitidos conforme a quantidade de palavras (a fatia de cada
// uma é 100/N do ciclo, então o @keyframes não pode ser fixo).

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export function RotatingWords({
  words,
  className,
  wordClassName,
  secondsPerWord = 2.4,
}: {
  words: string[];
  className?: string;
  wordClassName?: string;
  secondsPerWord?: number;
}) {
  if (words.length === 0) return null;
  if (words.length === 1) return <span className={className}>{words[0]}</span>;

  const total = words.length * secondsPerWord;
  const slot = 100 / words.length;
  const name = `rotator-cycle-${words.length}`;

  // A saída passa do fim da fatia (1.12 × slot) para cruzar com a entrada da
  // palavra seguinte — sem isso a linha fica vazia por um instante na troca.
  const enter = (slot * 0.12).toFixed(3);
  const holdEnd = slot.toFixed(3);
  const exit = (slot * 1.12).toFixed(3);

  const keyframes =
    `@keyframes ${name}{` +
    `0%{opacity:0;transform:translateY(110%)}` +
    `${enter}%{opacity:1;transform:translateY(0)}` +
    `${holdEnd}%{opacity:1;transform:translateY(0)}` +
    `${exit}%{opacity:0;transform:translateY(-110%)}` +
    `100%{opacity:0;transform:translateY(-110%)}}`;

  // A palavra mais longa reserva largura e altura para as outras, que são
  // absolutas — sem isso a linha muda de tamanho a cada troca.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <span className={cn("rotator", className)}>
      <style>{keyframes}</style>
      <span aria-hidden className={cn("rotator-sizer", wordClassName)}>
        {longest}
      </span>
      {words.map((word, i) => (
        <span
          key={word}
          className={cn("rotator-word", wordClassName)}
          style={
            {
              animationName: name,
              animationDuration: `${total}s`,
              animationDelay: `${(i * secondsPerWord).toFixed(2)}s`,
            } as CSSProperties
          }
        >
          {word}
        </span>
      ))}
    </span>
  );
}
