"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { WA_URL } from "@/data/site";

/** Lenis smooth scroll wired into GSAP ScrollTrigger. */
export function SmoothScroll() {
  useEffect(() => {
    // `anchors` makes #links respect Lenis instead of jumping natively.
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -8 } });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Pinned sections change page height after mount — recompute offsets so
    // anchor targets and rail highlighting land in the right place.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

/** Green dot cursor with trailing ring (desktop only, CSS hides on touch). */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let x = -100, y = -100, rx = -100, ry = -100;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", move);
    let running = true;
    const loop = () => {
      if (!running) return;
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx - 17}px, ${ry - 17}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    return () => { running = false; window.removeEventListener("mousemove", move); };
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" aria-label="envs">
          <img src="/logos/envs-wordmark.svg" alt="envs" className="h-5 w-auto" />
        </a>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-lime px-5 py-2 text-sm font-bold text-bg transition hover:brightness-110"
        >
          Agendar call
        </a>
      </div>
    </header>
  );
}

export function CtaButton({
  children,
  secondary = false,
  href = WA_URL,
}: {
  children: React.ReactNode;
  secondary?: boolean;
  href?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className={
        secondary
          ? "inline-block rounded-full border border-white/20 px-7 py-3.5 font-bold text-fg transition hover:border-lime hover:text-lime"
          : "inline-block rounded-full bg-lime px-7 py-3.5 font-bold text-bg transition hover:brightness-110"
      }
    >
      {children}
    </a>
  );
}
