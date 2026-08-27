"use client";

import { dores } from "@/data/site";
import { Reveal } from "@/lib/anim";

export default function Dores() {
  return (
    <section className="border-y border-white/5 bg-surface/20 py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <p className="eyebrow mb-5">{dores.eyebrow}</p>
          <h2 className="display max-w-2xl text-[clamp(1.9rem,4.2vw,3.2rem)]">{dores.title}</h2>
        </Reveal>

        <div className="mt-14 divide-y divide-white/8">
          {dores.items.map((d, i) => (
            <Reveal key={d.title} delay={0.03 * i}>
              <div className="flex gap-6 py-8">
                <span className="font-mono text-sm text-lime/60">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-bold md:text-xl">{d.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-fg/60">{d.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 rounded-2xl border border-white/10 bg-bg p-8">
            <p className="leading-relaxed text-fg/75">{dores.fecho}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
