"use client";

// Link que abre um card de preview seguindo o cursor — o hover-preview do
// 21st.dev, reduzido ao mecanismo e vestido com a identidade do site.
//
// Diferenças em relação ao original: os estilos vivem em globals.css (o
// original injeta um <style> com fontes do Google e um container de 100vh),
// a imagem passa por next/image (AVIF/WebP, tamanho certo) em vez de Unsplash,
// e o gatilho é acessível por teclado — no original só havia mouse.

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type PreviewData = {
  image: string;
  title: string;
  subtitle?: string;
};

const CARD_W = 300;
const CARD_H = 250;
const GAP = 20;

export function HoverPreviewLink({
  preview,
  children,
  href,
  className,
}: {
  preview: PreviewData;
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  // A imagem só entra no DOM depois do primeiro hover. Montada de saída, o
  // browser baixava os 14 previews da página junto com o conteúdo — o card
  // está na viewport (fixed, opacity 0), então o lazy nativo não segurava.
  const [armed, setArmed] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);

  const place = useCallback((clientX: number, clientY: number) => {
    let x = clientX - CARD_W / 2;
    let y = clientY - CARD_H - GAP;

    // Mantém o card dentro da viewport; sem espaço acima, abre abaixo.
    x = Math.min(x, window.innerWidth - CARD_W - 20);
    x = Math.max(x, 20);
    if (y < 20) y = clientY + GAP;

    setPos({ x, y });
  }, []);

  const show = useCallback(
    (e: React.MouseEvent) => {
      place(e.clientX, e.clientY);
      setArmed(true);
      setVisible(true);
    },
    [place]
  );

  const move = useCallback(
    (e: React.MouseEvent) => {
      if (visible) place(e.clientX, e.clientY);
    },
    [visible, place]
  );

  const hide = useCallback(() => setVisible(false), []);

  // Teclado: ancora o card no próprio link, já que não há cursor.
  const showFromFocus = useCallback(() => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;
    place(rect.left + rect.width / 2, rect.top);
    setArmed(true);
    setVisible(true);
  }, [place]);

  const Tag = href ? "a" : "span";

  return (
    <>
      <Tag
        ref={anchorRef as React.Ref<HTMLAnchorElement & HTMLSpanElement>}
        {...(href ? { href, target: "_blank", rel: "noreferrer" } : { tabIndex: 0 })}
        className={cn("preview-link", className)}
        onMouseEnter={show}
        onMouseMove={move}
        onMouseLeave={hide}
        onFocus={showFromFocus}
        onBlur={hide}
      >
        {children}
      </Tag>

      <div
        aria-hidden
        data-visible={visible}
        className="preview-card"
        style={{ left: pos.x, top: pos.y, width: CARD_W }}
      >
        <div className="glow overflow-hidden rounded-2xl border border-border bg-surface p-2 backdrop-blur">
          {armed && (
            <Image
              src={preview.image}
              alt=""
              width={CARD_W}
              height={168}
              className="h-auto w-full rounded-xl"
            />
          )}
          <div className="px-1.5 pb-1 pt-2.5 font-display text-sm font-semibold">{preview.title}</div>
          {preview.subtitle && (
            <div className="px-1.5 pb-1.5 text-xs text-faint">{preview.subtitle}</div>
          )}
        </div>
      </div>
    </>
  );
}
