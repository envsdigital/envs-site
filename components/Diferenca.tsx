"use client";

import { diferenca } from "@/data/site";
import { Reveal } from "@/lib/anim";
import { CtaButton } from "./Chrome";

export default function Diferenca() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <Reveal className="text-center">
        <p className="eyebrow mb-5">{diferenca.eyebrow}</p>
        <h2 className="display mx-auto max-w-2xl text-[clamp(1.9rem,4.2vw,3.2rem)]">{diferenca.title}</h2>
      </Reveal>

      {/* compare cards */}
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {diferenca.compare.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.12}>
            <div
              className={`h-full rounded-2xl border p-8 ${
                c.good ? "border-lime/60 bg-lime/5" : "border-white/10 bg-surface/50"
              }`}
            >
              <p className={`text-xs font-bold tracking-[0.2em] ${c.good ? "text-lime" : "text-fg/50"}`}>{c.tag}</p>
              <p className="mt-4 text-lg text-fg/85">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-14 max-w-3xl text-center">
        <p className="text-xl leading-relaxed text-fg/75 md:text-2xl">{diferenca.analogy}</p>
      </Reveal>

      {/* agent diagram */}
      <Reveal className="mt-20">
        <div className="rounded-3xl border border-white/10 bg-surface/40 p-8 md:p-12">
          <h3 className="display text-center text-2xl md:text-3xl">{diferenca.praticaTitle}</h3>
          <p className="mt-3 text-center text-fg/70">
            Ele não <span className="text-fg/50 line-through">conversa com</span> o software. Ele{" "}
            <span className="font-bold text-lime">opera</span> o software.
          </p>

          <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16">
            {/* center node */}
            <div className="relative flex h-44 w-44 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-lime/25" />
              <div className="absolute inset-5 rounded-full border border-lime/15" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/envs-bubble-primary.svg" alt="" className="pulse h-20 w-20" />
              <span className="absolute -bottom-7 text-xs font-bold tracking-[0.2em] text-lime">AGENTE IA</span>
            </div>

            {/* verbs */}
            <div className="grid grid-cols-2 gap-3">
              {diferenca.verbs.map((v) => (
                <div
                  key={v}
                  className="rounded-xl border border-lime/30 bg-bg px-6 py-3 text-center text-sm font-bold text-lime"
                >
                  {v}
                </div>
              ))}
            </div>

            {/* systems */}
            <div className="flex max-w-[220px] flex-wrap justify-center gap-2">
              {diferenca.systems.map((s) => (
                <span key={s} className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-fg/70">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-20 max-w-3xl text-center">
        <p className="text-xl text-fg/80 md:text-2xl">{diferenca.fecho}</p>
        <div className="mt-8">
          <CtaButton>{diferenca.cta}</CtaButton>
        </div>
      </Reveal>

      {/* prova social por setor */}
      <div className="mt-24">
        <p className="text-center text-sm font-medium text-fg/55">{diferenca.provaTitle}</p>
        <div className="relative mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
          <div className="marquee-track gap-10">
            {[...diferenca.setores, ...diferenca.setores, ...diferenca.setores, ...diferenca.setores].map((s, i) => (
              <span key={i} className="whitespace-nowrap text-xl font-bold text-fg/25">
                {s} <span className="mx-4 text-lime/40">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
