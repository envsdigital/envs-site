"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor da v4: um ponto sólido que acompanha o ponteiro na hora e um anel
 * que chega atrasado. O anel cresce sobre qualquer coisa clicável.
 *
 * Só monta em ponteiro fino — em touch não existe hover e o anel ficaria
 * parado num canto.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = -100, y = -100;      // ponteiro
    let rx = -100, ry = -100;    // anel, atrasado
    let scale = 1;
    let target = 1;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      // cresce sobre link ou botão
      target = (e.target as Element)?.closest?.("a,button") ? 2.1 : 1;
    };
    window.addEventListener("pointermove", move, { passive: true });

    let raf = 0;
    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (target - scale) * 0.14;
      d.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      r.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(${scale.toFixed(3)})`;
      r.style.opacity = String(0.55 - (scale - 1) * 0.18);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("v4-cursor");
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("v4-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[5px] w-[5px] rounded-full bg-lime opacity-0 [.v4-cursor_&]:opacity-100"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-8 w-8 rounded-full border border-peri/70 opacity-0"
      />
    </>
  );
}

/**
 * Envolve um alvo e o puxa na direção do cursor quando ele chega perto.
 * O empurrão é uma fração da distância, então o alvo nunca alcança o
 * ponteiro — é atração, não perseguição.
 */
export function Magnetic({
  children,
  strength = 0.32,
  radius = 130,
}: {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      const f = Math.max(0, 1 - d / (radius + r.width / 2));
      tx = dx * strength * f;
      ty = dy * strength * f;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}
