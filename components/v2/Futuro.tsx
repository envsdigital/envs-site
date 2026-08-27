"use client";

import { futuro } from "@/data/site";
import { Reveal } from "@/lib/anim";
import { KineticText } from "./Shell";
import { WA_URL } from "@/data/site";

/**
 * The one inverted section: lime background, dark type.
 * Breaks the dark rhythm exactly once, at the emotional peak of the argument.
 */
export default function Futuro() {
  return (
    <section id="futuro" className="relative bg-lime text-bg">
      <div className="mx-auto max-w-[1180px] px-5 py-24 lg:py-32">
        <div className="flex items-baseline gap-4 pb-12">
          <span className="font-mono text-xs">03</span>
          <span className="h-px flex-1 bg-bg/25" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">o futuro chegou</span>
        </div>

        <h2 className="display max-w-4xl text-[clamp(2.1rem,5.4vw,4.2rem)]">
          A empresa que não automatiza seus processos com IA está com os dias contados.
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-[15px] leading-relaxed text-bg/75">
            <p>{futuro.paragraphs[0]}</p>
            <p>{futuro.paragraphs[1]}</p>
          </div>

          <div className="space-y-8">
            <KineticText
              text={futuro.paragraphs[2]}
              className="display text-2xl leading-tight lg:text-3xl"
            />
            <p className="border-l-2 border-bg/40 pl-5 text-lg font-bold">{futuro.paragraphs[3]}</p>
          </div>
        </div>

        {/* three waves — horizontal, as a table not a timeline */}
        <div className="mt-20 border-t border-bg/20">
          {futuro.timeline.map((t, i) => {
            const now = i === futuro.timeline.length - 1;
            return (
              <Reveal key={t.era} delay={i * 0.06}>
                <div
                  className={`grid items-baseline gap-3 border-b py-7 lg:grid-cols-[150px_1fr_1.1fr] lg:gap-8 ${
                    now ? "border-bg/40" : "border-bg/15"
                  }`}
                >
                  <span className={`font-mono text-[11px] tracking-[0.18em] ${now ? "font-bold" : "opacity-55"}`}>
                    {t.era}
                  </span>
                  <h3 className={`display text-xl lg:text-2xl ${now ? "" : "opacity-80"}`}>{t.title}</h3>
                  <p className="text-sm leading-relaxed text-bg/65">{t.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <p className="max-w-xl text-[15px] leading-relaxed text-bg/80">{futuro.fecho}</p>
          <div className="lg:text-right">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-3 rounded-full bg-bg px-7 py-3.5 font-bold text-lime transition hover:bg-bg/85"
            >
              {futuro.cta}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-3 border-t border-bg/20 pt-8 sm:grid-cols-2">
          {futuro.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm font-medium">
              <span className="mt-0.5 font-mono text-xs">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
