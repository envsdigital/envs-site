"use client";

import { futuro, stack } from "@/data/site";
import { Reveal } from "@/lib/anim";
import { CtaButton } from "./Chrome";

export default function Futuro() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-5 py-28">
        <Reveal className="text-center">
          <p className="eyebrow mb-5">{futuro.eyebrow}</p>
          <h2 className="display text-[clamp(1.9rem,4.4vw,3.4rem)]">{futuro.title}</h2>
        </Reveal>

        <div className="mt-12 space-y-7">
          {futuro.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p
                className={
                  i === 2
                    ? "text-xl font-bold text-fg md:text-2xl"
                    : i === 3
                      ? "text-lg font-bold text-lime"
                      : "text-lg leading-relaxed text-fg/70"
                }
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        {/* historical timeline */}
        <div className="mt-20 space-y-0 border-l border-white/12 pl-8">
          {futuro.timeline.map((t, i) => (
            <Reveal key={t.era} delay={0.08 * i}>
              <div className="relative pb-12">
                <span
                  className={`absolute -left-[37px] top-1 h-2.5 w-2.5 rounded-full ${
                    i === futuro.timeline.length - 1 ? "bg-lime pulsedot" : "bg-fg/30"
                  }`}
                />
                <p className={`text-xs font-bold tracking-[0.25em] ${i === futuro.timeline.length - 1 ? "text-lime" : "text-fg/45"}`}>
                  {t.era}
                </p>
                <h3 className="display mt-2 text-xl md:text-2xl">{t.title}</h3>
                <p className="mt-2 text-fg/65">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-lg leading-relaxed text-fg/75">{futuro.fecho}</p>
          <div className="mt-9 text-center">
            <CtaButton>{futuro.cta}</CtaButton>
          </div>
          <ul className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-2">
            {futuro.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-surface/40 px-5 py-4 text-sm text-fg/80">
                <span className="text-lime">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* STACK */}
      <section className="border-y border-white/5 bg-surface/25 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow mb-5">{stack.eyebrow}</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{stack.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-fg/65">{stack.lead}</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stack.items.map((s, i) => (
              <Reveal key={s.name} delay={0.04 * i}>
                <div className="rounded-xl border border-white/10 bg-bg px-5 py-6 text-center transition hover:border-lime/40">
                  <p className="font-bold">{s.name}</p>
                  <p className="mt-1 text-xs text-fg/45">{s.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-fg/50">{stack.selo}</p>
        </div>
      </section>
    </>
  );
}
