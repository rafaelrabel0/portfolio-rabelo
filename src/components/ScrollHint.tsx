"use client";

// Indicador "role para explorar" no hero — some conforme o usuário rola.

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollHint({ label }: { label: string }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 220], [1, 0]);

  return (
    <motion.a
      href="#about"
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-faint transition-colors hover:text-muted"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{label}</span>
      <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown className="h-4 w-4" />
      </motion.span>
    </motion.a>
  );
}
