"use client";

import { useRef, useState } from "react";
import { agentes } from "@/data/site";
import { gsap, Reveal } from "@/lib/anim";

export default function Agentes() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tab = agentes.tabs[active];

  const switchTab = (i: number) => {
    if (i === active) return;
    setActive(i);
    if (panel.current) {
      gsap.fromTo(panel.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <Reveal className="text-center">
        <p className="eyebrow mb-5">{agentes.eyebrow}</p>
        <h2 className="display text-[clamp(1.9rem,4.4vw,3.4rem)]">
          {agentes.title[0]} <span className="text-lime">{agentes.title[1]}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-fg/65">{agentes.lead}</p>
      </Reveal>

      <Reveal className="mt-14">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface/40 lg:grid lg:grid-cols-[240px_1fr]">
          {/* tab rail — horizontal scroll on mobile, vertical on desktop */}
          <div className="flex gap-1 overflow-x-auto border-b border-white/8 p-3 lg:flex-col lg:border-b-0 lg:border-r">
            {agentes.tabs.map((t, i) => (
              <button
                key={t.label}
                onClick={() => switchTab(i)}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm transition ${
                  i === active ? "bg-lime/10 font-bold text-lime" : "text-fg/60 hover:bg-white/5 hover:text-fg"
                }`}
              >
                <span aria-hidden>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* panel */}
          <div ref={panel} className="p-8 md:p-10">
            <span className="rounded-md bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wider text-bg">
              {tab.label}
            </span>
            <h3 className="display mt-5 max-w-md text-2xl md:text-3xl">{tab.title}</h3>
            <ul className="mt-7 divide-y divide-white/8">
              {tab.steps.map((s) => (
                <li key={s} className="flex items-start gap-3 py-3.5 text-fg/80">
                  <span className="text-lime">→</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* fixed comparison */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-surface/30 p-7">
            <p className="text-xs font-bold tracking-[0.2em] text-fg/45">{agentes.outros.tag}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-fg/60">
              {agentes.outros.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="text-danger/80">✕</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-lime/40 bg-lime/5 p-7">
            <p className="text-xs font-bold tracking-[0.2em] text-lime">{agentes.envs.tag}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-fg/85">
              {agentes.envs.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="text-lime">✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
