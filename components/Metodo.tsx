"use client";

import { falha } from "@/data/site";
import { Reveal } from "@/lib/anim";

function Diagram({ data, good }: { data: typeof falha.maioria; good: boolean }) {
  return (
    <div className={`rounded-3xl border p-8 ${good ? "border-lime/40 bg-lime/[0.04]" : "border-white/10 bg-surface/40"}`}>
      <p className={`flex items-center gap-2 text-xs font-bold tracking-[0.2em] ${good ? "text-lime" : "text-fg/45"}`}>
        <span>{good ? "✓" : "✕"}</span>
        {data.tag}
      </p>
      <div className="mt-6 space-y-2.5">
        {data.rows.map((r) => (
          <div
            key={r.area}
            className={`flex items-center justify-between rounded-xl border px-5 py-3 text-sm ${
              r.gargalo
                ? good
                  ? "border-lime bg-lime/10 font-bold"
                  : "border-danger/60 bg-danger/10 font-bold"
                : "border-white/8 text-fg/60"
            }`}
          >
            <span>{r.area}</span>
            <span className={r.gargalo ? (good ? "text-lime" : "text-danger") : "text-fg/40"}>{r.note}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-fg/60">{data.desc}</p>
    </div>
  );
}

/** simple lag-curve chart for "Defasagem de Tempo" */
function LagChart() {
  return (
    <svg viewBox="0 0 400 180" className="w-full" aria-hidden>
      {/* axes */}
      <line x1="30" y1="150" x2="385" y2="150" stroke="rgba(245,245,245,.18)" strokeWidth="1" />
      <line x1="30" y1="15" x2="30" y2="150" stroke="rgba(245,245,245,.18)" strokeWidth="1" />
      {/* intervention marker */}
      <line x1="110" y1="20" x2="110" y2="150" stroke="#908aff" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="110" y="168" fill="#908aff" fontSize="11" textAnchor="middle">intervenção</text>
      {/* lag zone */}
      <rect x="110" y="20" width="105" height="130" fill="rgba(144,138,255,.06)" />
      <text x="162" y="38" fill="rgba(245,245,245,.45)" fontSize="10" textAnchor="middle">defasagem</text>
      {/* flat then rising result curve */}
      <path
        d="M30,132 C70,131 95,131 110,130 C160,128 190,120 215,100 C255,68 300,45 385,32"
        fill="none"
        stroke="#bff24e"
        strokeWidth="2.5"
      />
      <text x="330" y="24" fill="#bff24e" fontSize="11">resultado</text>
      {/* desist point */}
      <circle cx="185" cy="123" r="3.5" fill="#f07070" />
      <text x="185" y="112" fill="#f07070" fontSize="10" textAnchor="middle">“por que não tá funcionando?”</text>
    </svg>
  );
}

export default function Metodo() {
  const f = falha;
  return (
    <section className="border-y border-white/5 bg-surface/20 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="eyebrow mb-5">{f.eyebrow}</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(1.9rem,4.2vw,3.2rem)]">
            {f.title[0]}
            <br />
            <span className="text-lime">{f.title[1]}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-fg/65">{f.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <Diagram data={f.maioria} good={false} />
          </Reveal>
          <Reveal delay={0.12}>
            <Diagram data={f.envs} good />
          </Reveal>
        </div>

        {/* defasagem */}
        <Reveal className="mt-20">
          <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-bg p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-peri">{f.defasagem.tag}</p>
              <h3 className="display mt-3 text-2xl md:text-3xl">{f.defasagem.title}</h3>
              <p className="mt-5 text-fg/65">{f.defasagem.p1}</p>
              <p className="mt-4 font-medium text-fg/85">{f.defasagem.p2}</p>
            </div>
            <LagChart />
          </div>
        </Reveal>

        {/* 3 steps */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {f.steps.map((s, i) => (
            <Reveal key={s.n} delay={0.08 * i}>
              <div className="rounded-2xl border border-white/10 bg-surface/40 p-8">
                <span className="display text-5xl text-lime/80">{s.n}</span>
                <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg/60">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
