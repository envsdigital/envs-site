"use client";

import { useEffect, useRef } from "react";
import { gsap, Reveal, Counter } from "@/lib/anim";
import { stats, escritorio, garantiaFinal, finalCta, WA_URL } from "@/data/site";
import { depoimentos } from "@/data/depoimentos";
import { caseDestaque } from "@/data/case";
import { Section, KineticText } from "./Shell";

export default function Prova() {
  const c = caseDestaque;
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = num.current;
    if (!el) return;
    const tw = gsap.fromTo(
      el,
      { letterSpacing: "0.35em", opacity: 0.25 },
      {
        letterSpacing: "-0.03em",
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 35%", scrub: 0.6 },
      }
    );
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, []);

  return (
    <>
      <Section id="prova" n="08" kicker="a prova">
        {/* CASE — number as a full-bleed banner */}
        <Reveal>
          <p className="max-w-3xl text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-tight">
            Eles tinham a ideia. A gente construiu o produto.
          </p>
        </Reveal>

        <div className="my-12 overflow-hidden border-y border-white/10 py-10 text-center">
          <span ref={num} className="display block text-[clamp(3.5rem,13vw,10rem)] leading-none text-lime">
            {c.numero}
          </span>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-fg/40">{c.numeroLabel}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-5">
            {c.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-sm leading-relaxed text-fg/65">{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <p className="text-base font-bold text-fg">{c.resultado}</p>
            </Reveal>
          </div>

          <div className="space-y-px self-start">
            <div className="bg-white/[0.03] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/35">antes</p>
              <p className="mt-3 text-[13px] leading-relaxed text-fg/60">{c.antes}</p>
            </div>
            <div className="bg-lime/[0.06] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">depois</p>
              <p className="mt-3 text-[13px] leading-relaxed text-fg/85">{c.depois}</p>
            </div>
          </div>
        </div>

        {/* STATS — one wide strip */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-xl border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((s) => (
            <div key={s.label} className="bg-surface/30 p-7">
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="display block text-[2.2rem] leading-none text-lime"
              />
              <p className="mt-3 text-[12px] leading-relaxed text-fg/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* DEPOIMENTOS — quotes as editorial rows */}
        <div className="mt-20 border-t border-white/10">
          {depoimentos.map((d, i) => (
            <Reveal key={d.nome} delay={i * 0.05}>
              <figure className="grid gap-5 border-b border-white/10 py-9 lg:grid-cols-[190px_1fr] lg:gap-10">
                <figcaption className="lg:pt-1">
                  <p className="text-sm font-bold">{d.nome}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-fg/40">
                    {d.cargo}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-lime/60">{d.empresa}</p>
                </figcaption>
                <blockquote className="text-[15px] leading-relaxed text-fg/75 lg:text-base">
                  “{d.texto}”
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* GARANTIA — quiet, wide, confident */}
      <section className="border-y border-white/8 bg-surface/20">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">{garantiaFinal.eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(1.7rem,3.4vw,2.6rem)]">
              O risco é nosso tanto quanto é seu.{" "}
              <span className="text-lime">Resultado ou devolução.</span>
            </h2>
          </div>
          <div className="lg:pt-2">
            <KineticText text={garantiaFinal.body} className="text-sm leading-relaxed text-fg/60" />
            <p className="mt-6 border-l-2 border-lime pl-5 text-[15px] font-medium italic text-fg/85">
              {garantiaFinal.quote}
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contato" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 75%, rgba(191,242,78,0.13), transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[1180px] px-5 py-28 lg:py-36">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-lime">{finalCta.eyebrow}</p>
          <h2 className="display mt-7 max-w-4xl text-[clamp(2.2rem,6vw,4.6rem)]">
            Toda empresa vai precisar de um parceiro de tech com IA.{" "}
            <span className="text-lime">A sua já tem?</span>
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-md text-sm leading-relaxed text-fg/60">{finalCta.lead}</p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 font-bold text-bg transition hover:brightness-110"
              >
                {finalCta.primary}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#virada"
                className="font-mono text-[11px] uppercase tracking-widest text-fg/50 transition hover:text-lime"
              >
                {finalCta.secondary}
              </a>
            </div>
          </div>

          {/* escritório folded in as a closing line */}
          <p className="mt-20 border-t border-white/8 pt-8 text-sm text-fg/45">
            <span className="text-fg/70">{escritorio.title}</span> {escritorio.lead}
          </p>
        </div>
      </section>

      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-4 px-5 py-10 md:flex-row md:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/envs-wordmark.svg" alt="envs" className="h-4 w-auto opacity-70" />
          <p className="font-mono text-[10px] text-fg/30">{finalCta.footer}</p>
          <a href="https://envs.com.br" className="font-mono text-[10px] text-fg/30 hover:text-lime">
            {finalCta.domain}
          </a>
        </div>
      </footer>
    </>
  );
}
