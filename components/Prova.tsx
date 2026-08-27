"use client";

import { useEffect, useRef } from "react";
import { gsap, Reveal, Counter } from "@/lib/anim";
import { stats } from "@/data/site";
import { depoimentos, depoimentosHeader } from "@/data/depoimentos";
import { caseDestaque } from "@/data/case";
import { CtaButton } from "./Chrome";

function Depoimentos() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <Reveal className="text-center">
        <p className="eyebrow mb-5">{depoimentosHeader.eyebrow}</p>
        <h2 className="display text-[clamp(1.9rem,4vw,3rem)]">{depoimentosHeader.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-fg/65">{depoimentosHeader.lead}</p>
      </Reveal>
      <div className="snap-row mt-14 lg:grid-cols-3">
        {depoimentos.map((d, i) => (
          <Reveal key={d.nome} delay={0.08 * i} className="h-full">
            <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/40 p-8">
              <span className="display text-4xl text-lime/60">“</span>
              <blockquote className="mt-2 flex-1 leading-relaxed text-fg/80">{d.texto}</blockquote>
              <figcaption className="mt-7 border-t border-white/8 pt-5">
                <p className="font-bold">{d.nome}</p>
                <p className="text-sm text-fg/50">
                  {d.cargo} · {d.empresa}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Case() {
  const c = caseDestaque;
  const numRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { scale: 0.55, opacity: 0.1 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "center 55%", scrub: 0.5 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="border-y border-white/5 bg-surface/20 py-28">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="text-center">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h2 className="display text-[clamp(1.9rem,4.2vw,3.2rem)]">
            {c.title} <span className="text-lime">{c.titleHighlight}</span>
          </h2>
        </Reveal>

        {/* scrub number */}
        <div ref={numRef} className="my-20 text-center will-change-transform">
          <p className="display text-[clamp(4.5rem,16vw,12rem)] leading-none text-lime">{c.numero}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-fg/50">{c.numeroLabel}</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {c.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <p className="leading-relaxed text-fg/70">{p}</p>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-lg font-bold text-fg">{c.resultado}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-bg p-7">
              <p className="text-xs font-bold tracking-[0.25em] text-fg/45">ANTES</p>
              <p className="mt-3 text-sm leading-relaxed text-fg/65">{c.antes}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-lime/40 bg-lime/5 p-7">
              <p className="text-xs font-bold tracking-[0.25em] text-lime">DEPOIS</p>
              <p className="mt-3 text-sm leading-relaxed text-fg/80">{c.depois}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <CtaButton>{c.cta}</CtaButton>
          {c.clienteUrl ? (
            <a href={c.clienteUrl} target="_blank" rel="noopener" className="rounded-full border border-white/15 px-5 py-2 text-sm text-fg/60 hover:text-lime">
              {c.clienteLabel} ↗
            </a>
          ) : (
            <span className="rounded-full border border-white/15 px-5 py-2 text-sm text-fg/40">{c.clienteLabel}</span>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <Reveal className="text-center">
        <p className="eyebrow mb-5">{stats.eyebrow}</p>
        <h2 className="display text-[clamp(1.9rem,4vw,3rem)]">
          {stats.title[0]} <span className="text-lime">{stats.title[1]}</span>
        </h2>
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.items.map((s, i) => (
          <Reveal key={s.label} delay={0.06 * i}>
            <div className="h-full rounded-2xl border border-white/10 bg-surface/40 p-7 text-center">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} className="display text-4xl text-lime md:text-5xl" />
              <p className="mt-3 text-xs leading-relaxed text-fg/55 md:text-sm">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Prova() {
  return (
    <>
      <Depoimentos />
      <Case />
      <Stats />
    </>
  );
}
