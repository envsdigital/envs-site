"use client";

import { useState } from "react";
import { dores } from "@/data/site";
import { Reveal } from "@/lib/anim";
import { Section, KineticText } from "./Shell";

/** Diagnostic checklist — the reader ticks their own symptoms. */
export default function Dores() {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  return (
    <Section id="dores" n="05" kicker="o diagnóstico">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <h2 className="display text-[clamp(1.9rem,4.2vw,3.2rem)]">{dores.title}</h2>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-fg/35">
            marque o que acontece na sua · {checked.length}/6
          </p>
        </div>
        <div className="lg:pt-4">
          {checked.length >= 3 && (
            <div className="rounded-xl border border-lime/40 bg-lime/[0.06] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">diagnóstico</p>
              <p className="mt-3 text-sm leading-relaxed text-fg/85">
                {checked.length >= 5
                  ? "Cinco ou mais. Sua operação não tem um problema pontual: tem um gargalo estrutural. É exatamente aqui que a envs entra."
                  : "Três ou mais sintomas. Não é falta de esforço. É falta do parceiro certo."}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-14 border-t border-white/10">
        {dores.items.map((d, i) => {
          const on = checked.includes(i);
          return (
            <Reveal key={d.title} delay={i * 0.02}>
              <button
                onClick={() => toggle(i)}
                className="group grid w-full grid-cols-[auto_1fr] gap-5 border-b border-white/10 py-7 text-left transition hover:bg-white/[0.015] lg:grid-cols-[auto_0.9fr_1.1fr] lg:gap-8"
              >
                <span
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border font-mono text-[10px] transition ${
                    on ? "border-lime bg-lime text-bg" : "border-white/20 text-transparent group-hover:border-fg/40"
                  }`}
                >
                  ✓
                </span>
                <h3
                  className={`text-[17px] font-bold leading-snug transition lg:text-lg ${
                    on ? "text-lime" : "text-fg/90"
                  }`}
                >
                  {d.title}
                </h3>
                <p className="col-start-2 text-sm leading-relaxed text-fg/50 lg:col-start-3 lg:mt-0">{d.body}</p>
              </button>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 max-w-3xl">
        <KineticText text={dores.fecho} className="text-[15px] leading-relaxed text-fg/70" />
      </div>
    </Section>
  );
}
