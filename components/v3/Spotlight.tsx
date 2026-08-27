"use client";

import { useEffect } from "react";

/**
 * Alimenta o spotlight dos cards .bento.
 *
 * Um único listener delegado no documento em vez de um por card: o CSS lê
 * --mx/--my e faz o resto. Só roda em ponteiro fino (mouse), e a escrita é
 * agendada em rAF para não forçar layout a cada mousemove.
 */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let queued = false;
    let last: { el: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      queued = false;
      if (!last) return;
      last.el.style.setProperty("--mx", `${last.x}px`);
      last.el.style.setProperty("--my", `${last.y}px`);
    };

    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".bento");
      if (!card) return;
      const r = card.getBoundingClientRect();
      last = { el: card, x: e.clientX - r.left, y: e.clientY - r.top };
      if (!queued) {
        queued = true;
        requestAnimationFrame(flush);
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
