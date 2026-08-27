"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/anim";
import { WA_URL } from "@/data/site";

/* ---------- primitivos da linguagem v3 ---------- */

export function Glossy({
  children,
  href = WA_URL,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const ext = href.startsWith("http");
  return (
    <a
      href={href}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noopener" : undefined}
      className={`glossy inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] font-medium text-fg ${className}`}
    >
      {children}
    </a>
  );
}

export function Ghost({ children, href = "#solucoes" }: { children: React.ReactNode; href?: string }) {
  const ext = href.startsWith("http");
  return (
    <a
      href={href}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noopener" : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-[15px] font-medium text-fg/75 transition hover:border-white/25 hover:text-fg"
    >
      {children}
    </a>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[13px] text-fg/70 backdrop-blur-sm">
      {children}
    </span>
  );
}

/** Cabeçalho de seção: label + régua, título à esquerda, descrição à direita. */
export function Head({
  label,
  title,
  desc,
  id,
}: {
  label: string;
  title: React.ReactNode;
  desc?: string;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="flex items-center gap-3">
        <span className="flex h-1.5 w-1.5 rounded-full bg-lime" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg/45">{label}</span>
      </div>
      <div className="mt-5 h-px w-full bg-white/10" />
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <h2 className="h-display text-[clamp(2rem,4.4vw,3.4rem)]">{title}</h2>
        {desc && <p className="text-[15px] leading-relaxed text-fg/50 lg:pb-2">{desc}</p>}
      </div>
    </div>
  );
}

/** Card bento: arte com gradiente em cima, legenda de vidro embaixo. */
export function Bento({
  title,
  desc,
  art,
  className = "",
}: {
  title: string;
  desc: string;
  art: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bento flex flex-col ${className}`}>
      <div className="relative min-h-[190px] flex-1 overflow-hidden">{art}</div>
      <div className="p-3">
        <div className="bento-cap p-5">
          <h3 className="text-[17px] font-medium">{title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-fg/50">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/** Esfera gradiente que troca de rótulo — o motivo recorrente do layout. */
export function Orb({ labels, size = 300 }: { labels: string[]; size?: number }) {
  const [i, setI] = useState(0);
  const txt = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      if (txt.current) {
        gsap.fromTo(txt.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
      }
      setI((v) => (v + 1) % labels.length);
    }, 2600);
    return () => clearInterval(t);
  }, [labels.length]);

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <div className="orb absolute inset-0" style={{ animation: "aurora-breathe 9s ease-in-out infinite" }} />
      <span
        ref={txt}
        className="relative z-10 text-[clamp(1.1rem,2vw,1.6rem)] font-medium text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
      >
        {labels[i]}
      </span>
    </div>
  );
}

/* ---------- artes de fundo para os cards bento ---------- */

export function ArtGlow({ hue = "lime" }: { hue?: "lime" | "peri" | "mix" }) {
  const bg =
    hue === "lime"
      ? "radial-gradient(ellipse 62% 72% at 30% 105%, rgba(191,242,78,.55), transparent 62%), radial-gradient(ellipse 45% 50% at 78% 12%, rgba(144,138,255,.28), transparent 65%)"
      : hue === "peri"
        ? "radial-gradient(ellipse 62% 72% at 68% 105%, rgba(144,138,255,.6), transparent 62%), radial-gradient(ellipse 45% 50% at 20% 14%, rgba(191,242,78,.24), transparent 65%)"
        : "radial-gradient(ellipse 58% 66% at 24% 102%, rgba(191,242,78,.5), transparent 60%), radial-gradient(ellipse 58% 66% at 76% 102%, rgba(144,138,255,.5), transparent 60%)";
  return (
    <>
      <div className="absolute inset-0" style={{ background: bg }} />
      <div className="stars absolute inset-0 opacity-60" />
    </>
  );
}

/** Arte: sliders (controle) */
export function ArtSliders() {
  return (
    <div className="absolute inset-0">
      <ArtGlow hue="mix" />
      <div className="absolute inset-0 flex items-center justify-center gap-7">
        {[0.32, 0.6, 0.46].map((v, i) => (
          <div key={i} className="relative h-28 w-1.5 rounded-full bg-white/15">
            <span
              className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_16px_4px_rgba(191,242,78,.55)]"
              style={{ top: `${v * 100}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Arte: grade de sistemas conectados */
export function ArtSystems({ items }: { items: string[] }) {
  return (
    <div className="absolute inset-0">
      <ArtGlow hue="peri" />
      <div className="absolute inset-0 grid grid-cols-4 content-center gap-2.5 px-6">
        {items.slice(0, 8).map((s, i) => (
          <span
            key={i}
            className="grid h-11 place-items-center rounded-lg border border-white/12 bg-white/[0.06] text-[9px] uppercase tracking-wider text-fg/70 backdrop-blur-sm"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Arte: gráfico de linha subindo */
export function ArtChart() {
  return (
    <div className="absolute inset-0">
      <ArtGlow hue="lime" />
      <svg viewBox="0 0 320 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <path d="M0,132 C60,128 92,120 136,96 C186,68 240,40 320,22" fill="none" stroke="#bff24e" strokeWidth="2.5" />
        <path d="M0,140 C60,136 92,130 136,112 C186,90 240,72 320,58" fill="none" stroke="rgba(144,138,255,.75)" strokeWidth="2" />
      </svg>
    </div>
  );
}
