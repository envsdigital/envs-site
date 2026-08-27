"use client";

import { useRef, useState } from "react";
import { agentes, visibilidade } from "@/data/site";
import { gsap, Reveal } from "@/lib/anim";
import { Section } from "./Shell";

const statusStyle: Record<string, string> = {
  "Concluído": "text-lime",
  "Em andamento": "text-peri",
  "Backlog": "text-fg/40",
};

export default function Agentes() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tab = agentes.tabs[active];

  const go = (i: number) => {
    if (i === active) return;
    setActive(i);
    if (panel.current) gsap.fromTo(panel.current, { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.35 });
  };

  return (
    <Section id="agentes" n="06" kicker="os agentes na prática">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <h2 className="display text-[clamp(1.9rem,4.2vw,3.2rem)]">
          Da IA que responde para a <span className="text-lime">IA que executa.</span>
        </h2>
        <p className="text-fg/55 lg:pt-3">{agentes.lead}</p>
      </div>

      {/* domain selector as a horizontal chip row */}
      <div className="mt-12 flex flex-wrap gap-2">
        {agentes.tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => go(i)}
            className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition ${
              i === active
                ? "border-lime bg-lime text-bg"
                : "border-white/12 text-fg/50 hover:border-fg/35 hover:text-fg/80"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div ref={panel} className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* the agent's routine */}
        <div className="rounded-xl border border-white/10 bg-surface/30 p-8">
          <h3 className="display text-2xl lg:text-[1.7rem]">{tab.title}</h3>
          <ol className="mt-7 space-y-0">
            {tab.steps.map((s, i) => (
              <li key={s} className="flex gap-4 border-t border-white/8 py-3.5 first:border-t-0 first:pt-0">
                <span className="font-mono text-[10px] text-lime/70">{`0${i + 1}`}</span>
                <span className="text-sm text-fg/80">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* the fixed comparison, stacked */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-surface/20 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/35">{agentes.outros.tag}</p>
            <ul className="mt-4 space-y-2">
              {agentes.outros.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-[13px] text-fg/50">
                  <span className="text-danger/60">✕</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-lime/45 bg-lime/[0.05] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">{agentes.envs.tag}</p>
            <ul className="mt-4 space-y-2">
              {agentes.envs.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-[13px] text-fg/85">
                  <span className="text-lime">✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* visibility — merged in here, as a live console rather than its own section */}
      <Reveal>
        <div className="mt-20 grid gap-10 rounded-2xl border border-white/10 bg-surface/25 p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">{visibilidade.eyebrow}</p>
            <h3 className="display mt-4 text-2xl lg:text-3xl">{visibilidade.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-fg/60">{visibilidade.lead}</p>
            <div className="mt-7 space-y-4 border-t border-white/8 pt-6">
              {visibilidade.features.map((f) => (
                <div key={f.title}>
                  <p className="text-sm font-bold text-fg/90">{f.title}</p>
                  <p className="mt-0.5 text-[13px] text-fg/50">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/12 bg-[#141414]">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <span className="font-mono text-[10px] text-fg/40">{visibilidade.board.url}</span>
              <span className="font-mono text-[10px] text-lime">● live</span>
            </div>
            <div className="divide-y divide-white/6">
              {visibilidade.board.rows.map((r) => (
                <div key={r.task} className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <span className="truncate text-[13px] text-fg/80">{r.task}</span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="font-mono text-[10px] text-fg/30">{r.sprint}</span>
                    <span className={`font-mono text-[10px] ${statusStyle[r.status]}`}>{r.status}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/8 px-4 py-2.5 font-mono text-[10px] text-fg/30">
              {visibilidade.board.footer}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
