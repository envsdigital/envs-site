"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { WA_URL } from "@/data/site";

export const SECTIONS = [
  { id: "hero", n: "00", label: "Início" },
  { id: "virada", n: "01", label: "A virada" },
  { id: "diferenca", n: "02", label: "A diferença" },
  { id: "futuro", n: "03", label: "O futuro" },
  { id: "frentes", n: "04", label: "O que fazemos" },
  { id: "dores", n: "05", label: "O diagnóstico" },
  { id: "agentes", n: "06", label: "Os agentes" },
  { id: "metodo", n: "07", label: "O método" },
  { id: "prova", n: "08", label: "A prova" },
  { id: "contato", n: "09", label: "Contato" },
];

/** Fixed left index rail — reads like an IDE gutter. Desktop only. */
export function Rail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const triggers = SECTIONS.map((s) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(s.id),
      });
    }).filter(Boolean);
    return () => triggers.forEach((t) => t?.kill());
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-screen w-[92px] flex-col justify-center border-r border-white/8 xl:flex">
      <ul className="space-y-1 px-4">
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-2 py-1.5 font-mono text-[10px] transition"
                title={s.label}
              >
                <span
                  className={`h-px transition-all duration-300 ${on ? "w-5 bg-lime" : "w-2.5 bg-fg/25 group-hover:w-4 group-hover:bg-fg/50"}`}
                />
                <span className={on ? "text-lime" : "text-fg/30 group-hover:text-fg/60"}>{s.n}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const LOG = [
  "nota fiscal #8842 emitida",
  "conciliação bancária concluída",
  "régua de cobrança disparada — 34 clientes",
  "contrato analisado — 2 cláusulas sinalizadas",
  "follow-up enviado — oportunidade #2291",
  "estoque verificado — pedido liberado",
  "relatório executivo gerado",
  "CRM sincronizado — 118 registros",
];

/** Thin ticker strip: the agent is working while you read. */
export function Ticker() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-bg/90 backdrop-blur-sm">
      <div className="flex h-8 items-center gap-3 overflow-hidden px-4">
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-lime">
          <span className="pulsedot h-1.5 w-1.5 rounded-full bg-lime" />
          AGENTE ATIVO
        </span>
        <div className="relative flex-1 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 92%, transparent)" }}>
          <div className="marquee-track gap-8">
            {[...LOG, ...LOG].map((l, i) => (
              <span key={i} className="whitespace-nowrap font-mono text-[10px] text-fg/35">
                <span className="mr-2 text-lime/60">✓</span>
                {l}
              </span>
            ))}
          </div>
        </div>
        <span className="hidden shrink-0 font-mono text-[10px] text-fg/25 sm:block">24/7</span>
      </div>
    </div>
  );
}

export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 xl:pl-[92px]">
      <div className="flex items-center justify-between px-5 py-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#hero" aria-label="envs" className="mix-blend-difference">
          <img src="/logos/envs-wordmark.svg" alt="envs" className="h-4 w-auto" />
        </a>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fg/70 transition hover:text-lime"
        >
          Agendar call
          <span className="inline-block h-px w-6 bg-fg/40 transition-all group-hover:w-9 group-hover:bg-lime" />
        </a>
      </div>
    </header>
  );
}

/** Section wrapper: numbered, left-aligned, editorial. */
export function Section({
  id,
  n,
  kicker,
  children,
  className = "",
  bleed = false,
}: {
  id: string;
  n: string;
  kicker: string;
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className={bleed ? "" : "mx-auto max-w-[1180px] px-5"}>
        <div className={bleed ? "mx-auto max-w-[1180px] px-5" : ""}>
          <div className="flex items-baseline gap-4 pt-24 pb-10">
            <span className="font-mono text-xs text-lime">{n}</span>
            <span className="h-px flex-1 bg-current opacity-15" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-45">{kicker}</span>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/** Word-by-word kinetic reveal for big statements. */
export function KineticText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll("span[data-w]");
    const tween = gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 60%", scrub: 0.4 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);
  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span data-w key={i}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
