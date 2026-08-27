"use client";

import { falha } from "@/data/site";
import { Reveal } from "@/lib/anim";
import { Section } from "./Shell";

function Stack({ data, good }: { data: typeof falha.maioria; good: boolean }) {
  return (
    <div>
      <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${good ? "text-lime" : "text-fg/35"}`}>
        {good ? "✓" : "✕"} {data.tag}
      </p>
      <div className="mt-5 space-y-px">
        {data.rows.map((r) => (
          <div
            key={r.area}
            className={`flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-wider ${
              r.gargalo
                ? good
                  ? "bg-lime text-bg"
                  : "border border-danger/50 bg-danger/10 text-danger"
                : "bg-white/[0.03] text-fg/45"
            }`}
          >
            <span>{r.area}</span>
            <span className={r.gargalo ? "font-bold" : "opacity-60"}>{r.note}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[13px] leading-relaxed text-fg/55">{data.desc}</p>
    </div>
  );
}

export default function Metodo() {
  const f = falha;
  return (
    <Section id="metodo" n="07" kicker="por que a maioria falha">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <h2 className="display text-[clamp(1.9rem,4.2vw,3.2rem)]">
          {f.title[0]} <span className="text-lime">{f.title[1]}</span>
        </h2>
        <p className="text-fg/55 lg:pt-3">{f.lead}</p>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10">
        <Reveal>
          <Stack data={f.maioria} good={false} />
        </Reveal>
        <Reveal delay={0.1}>
          <Stack data={f.envs} good />
        </Reveal>
      </div>

      {/* defasagem — chart leads, text follows */}
      <Reveal>
        <div className="mt-24 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <svg viewBox="0 0 440 200" className="w-full" aria-hidden>
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bff24e" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#bff24e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="34" y1="168" x2="428" y2="168" stroke="rgba(245,245,245,.14)" />
            <line x1="34" y1="16" x2="34" y2="168" stroke="rgba(245,245,245,.14)" />
            <rect x="120" y="16" width="118" height="152" fill="rgba(144,138,255,.07)" />
            <line x1="120" y1="16" x2="120" y2="168" stroke="#908aff" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="120" y="188" fill="#908aff" fontSize="10" textAnchor="middle" fontFamily="monospace">
              intervenção
            </text>
            <text x="179" y="34" fill="rgba(245,245,245,.4)" fontSize="9.5" textAnchor="middle" fontFamily="monospace">
              defasagem
            </text>
            <path
              d="M34,148 C80,147 105,146 120,145 C172,142 205,132 238,110 C282,78 330,50 428,36 L428,168 L34,168 Z"
              fill="url(#fill)"
            />
            <path
              d="M34,148 C80,147 105,146 120,145 C172,142 205,132 238,110 C282,78 330,50 428,36"
              fill="none"
              stroke="#bff24e"
              strokeWidth="2.5"
            />
            <circle cx="203" cy="136" r="4" fill="#f07070" />
            <text x="203" y="124" fill="#f07070" fontSize="9.5" textAnchor="middle" fontFamily="monospace">
              “por que não tá funcionando?”
            </text>
            <text x="424" y="28" fill="#bff24e" fontSize="10" textAnchor="end" fontFamily="monospace">
              resultado
            </text>
          </svg>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-peri">{f.defasagem.tag}</p>
            <h3 className="display mt-4 text-2xl lg:text-3xl">{f.defasagem.title}</h3>
            <p className="mt-5 text-sm leading-relaxed text-fg/60">{f.defasagem.p1}</p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-fg/85">{f.defasagem.p2}</p>
          </div>
        </div>
      </Reveal>

      {/* 3 steps as a horizontal process bar */}
      <div className="mt-20 grid gap-px overflow-hidden rounded-xl border border-white/10 md:grid-cols-3">
        {f.steps.map((s) => (
          <div key={s.n} className="bg-surface/35 p-7">
            <div className="flex items-baseline gap-3">
              <span className="display text-3xl text-lime/40">{s.n}</span>
              <h3 className="text-lg font-bold">{s.title}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-fg/55">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
