"use client";

import { frentes, stack } from "@/data/site";
import { Reveal } from "@/lib/anim";
import { Section } from "./Shell";

export default function Frentes() {
  const { f1, f2, f3, metodo, garantia } = frentes;

  const rows = [
    {
      tag: f1.tag,
      title: f1.title,
      desc: f1.desc,
      body: (
        <div className="rounded-lg border border-white/10 bg-[#141414] p-5 font-mono text-[11px] leading-relaxed">
          <p className="text-lime">
            <span className="mr-1.5 text-fg/30">$</span>
            {f1.terminal[0]}
          </p>
          {f1.terminal.slice(1).map((l, i) => (
            <p key={l} className="mt-1.5 text-fg/70">
              <span className={`mr-1.5 ${i === f1.terminal.length - 2 ? "text-peri" : "text-lime"}`}>
                {i === f1.terminal.length - 2 ? "…" : "✓"}
              </span>
              {l}
            </p>
          ))}
        </div>
      ),
      bullets: f1.bullets,
    },
    {
      tag: f2.tag,
      title: f2.title,
      desc: f2.desc,
      body: (
        <div className="flex items-center gap-2">
          {f2.pipeline.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`rounded-md border px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider ${
                  i === f2.pipeline.length - 1
                    ? "border-lime/50 bg-lime/[0.07] text-lime"
                    : "border-white/12 text-fg/70"
                }`}
              >
                {s}
              </span>
              {i < f2.pipeline.length - 1 && <span className="font-mono text-xs text-fg/25">→</span>}
            </div>
          ))}
        </div>
      ),
      bullets: [],
    },
    {
      tag: f3.tag,
      title: f3.title,
      desc: f3.desc,
      body: (
        <div className="flex flex-wrap items-center gap-2">
          {f3.roles.map((r) => (
            <span key={r} className="rounded border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-fg/60">
              {r}
            </span>
          ))}
          <span className="rounded bg-lime px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-bg">
            {f3.badge}
          </span>
        </div>
      ),
      bullets: [],
    },
  ];

  return (
    <Section id="frentes" n="04" kicker="o que a envs faz">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <h2 className="display text-[clamp(1.9rem,4.2vw,3.2rem)]">{frentes.title}</h2>
        <p className="text-fg/55 lg:pt-3">{frentes.lead}</p>
      </div>

      {/* numbered editorial rows, not a card grid */}
      <div className="mt-16 border-t border-white/10">
        {rows.map((r, i) => (
          <Reveal key={r.tag}>
            <div className="grid gap-6 border-b border-white/10 py-11 lg:grid-cols-[90px_1fr_1fr] lg:gap-10">
              <span className="display text-4xl text-lime/25 lg:text-5xl">{`0${i + 1}`}</span>
              <div>
                <h3 className="display text-2xl lg:text-[1.75rem]">{r.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg/60">{r.desc}</p>
                {r.bullets.length > 0 && (
                  <ul className="mt-5 space-y-1.5">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-fg/70">
                        <span className="text-lime">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="lg:pt-1">{r.body}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* método + garantia as a two-up statement */}
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {[metodo, garantia].map((c) => (
          <Reveal key={c.tag}>
            <div className="h-full rounded-xl border border-lime/30 bg-lime/[0.04] p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">{c.tag}</p>
              <h3 className="display mt-4 text-2xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg/65">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* stack — dense inline row, not 8 boxes */}
      <div className="mt-16 rounded-xl border border-white/10 bg-surface/25 p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="display text-xl">{stack.title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-fg/35">{stack.selo}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/8 pt-6">
          {stack.items.map((s) => (
            <span key={s.name} className="group">
              <span className="text-sm font-bold text-fg/80 transition group-hover:text-lime">{s.name}</span>
              <span className="ml-2 font-mono text-[10px] text-fg/30">{s.role}</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
