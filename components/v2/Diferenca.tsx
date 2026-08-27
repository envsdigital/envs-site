"use client";

import { diferenca } from "@/data/site";
import { Reveal } from "@/lib/anim";
import { Section, KineticText } from "./Shell";

export default function Diferenca() {
  return (
    <Section id="diferenca" n="02" kicker="a diferença">
      {/* asymmetric: statement left, comparison right */}
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="display text-[clamp(1.9rem,4vw,3rem)]">
            A diferença que ninguém está explicando direito.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-fg/55">{diferenca.analogy}</p>
        </div>

        <div className="space-y-4">
          {diferenca.compare.map((c) => (
            <Reveal key={c.tag}>
              <div
                className={`grid grid-cols-[auto_1fr] gap-5 rounded-xl border p-7 ${
                  c.good ? "border-lime/50 bg-lime/[0.05]" : "border-white/10 bg-surface/30"
                }`}
              >
                <span className={`font-mono text-2xl ${c.good ? "text-lime" : "text-danger/70"}`}>
                  {c.good ? "✓" : "✕"}
                </span>
                <div>
                  <p className={`font-mono text-[11px] tracking-[0.18em] ${c.good ? "text-lime" : "text-fg/40"}`}>
                    {c.tag}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg/80">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* the loop diagram — horizontal, technical */}
          <Reveal>
            <div className="mt-8 rounded-xl border border-white/10 bg-surface/25 p-7">
              <p className="font-mono text-[11px] tracking-[0.18em] text-fg/40">CICLO DO AGENTE</p>
              <p className="mt-3 text-sm text-fg/70">
                Ele não <span className="text-fg/35 line-through">conversa com</span> o software. Ele{" "}
                <span className="font-bold text-lime">opera</span> o software.
              </p>

              <div className="mt-7 flex items-center gap-2 overflow-x-auto pb-1">
                {diferenca.verbs.map((v, i) => (
                  <div key={v} className="flex shrink-0 items-center gap-2">
                    <span className="rounded-md border border-lime/35 bg-lime/[0.06] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-lime">
                      {v}
                    </span>
                    <span className="font-mono text-xs text-fg/25">
                      {i === diferenca.verbs.length - 1 ? "↻" : "→"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/8 pt-5">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-fg/30">opera:</span>
                {diferenca.systems.map((s) => (
                  <span key={s} className="rounded border border-white/12 px-2.5 py-1 font-mono text-[10px] text-fg/55">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* sector marquee — full bleed */}
      <div className="mt-24 -mx-5 border-y border-white/8 py-5">
        <div
          className="overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}
        >
          <div className="marquee-track gap-12">
            {[...Array(4)].flatMap(() => diferenca.setores).map((s, i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap">
                <span className="font-mono text-sm uppercase tracking-[0.15em] text-fg/25">{s}</span>
                <span className="h-1 w-1 rounded-full bg-lime/40" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 text-center font-mono text-[11px] text-fg/35">{diferenca.provaTitle}</p>
    </Section>
  );
}
