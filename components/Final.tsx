"use client";

import { escritorio, garantiaFinal, finalCta } from "@/data/site";
import { Reveal } from "@/lib/anim";
import { CtaButton } from "./Chrome";

export default function Final() {
  return (
    <>
      {/* NOSSO ESCRITÓRIO */}
      <section className="relative overflow-hidden border-y border-white/5 py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(191,242,78,0.09), transparent 60%), radial-gradient(ellipse 50% 40% at 20% -10%, rgba(144,138,255,0.07), transparent 70%)",
          }}
        />
        {/* grid pattern suggesting the studio */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,245,245,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <Reveal className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow mb-5">{escritorio.eyebrow}</p>
          <h2 className="display text-[clamp(1.9rem,4.2vw,3.2rem)]">{escritorio.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-fg/65">{escritorio.lead}</p>
        </Reveal>
      </section>

      {/* GARANTIA */}
      <section className="mx-auto max-w-4xl px-5 py-28">
        <Reveal className="text-center">
          <p className="eyebrow mb-5">{garantiaFinal.eyebrow}</p>
          <h2 className="display text-[clamp(1.8rem,3.8vw,2.9rem)]">
            {garantiaFinal.title[0]}
            <br />
            <span className="text-lime">{garantiaFinal.title[1]}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-fg/65">{garantiaFinal.body}</p>
          <p className="mx-auto mt-8 max-w-xl border-l-2 border-lime pl-5 text-left text-lg font-medium italic text-fg/85">
            {garantiaFinal.quote}
          </p>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 55% 55% at 50% 60%, rgba(191,242,78,0.12), transparent 65%)" }}
        />
        <Reveal className="relative mx-auto max-w-4xl px-5 text-center">
          <p className="eyebrow mb-6">{finalCta.eyebrow}</p>
          <h2 className="display text-[clamp(2.2rem,6vw,4.6rem)]">
            {finalCta.title[0]}
            <br />
            {finalCta.title[1]}
            <br />
            <span className="text-lime">{finalCta.title[2]}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-fg/70">{finalCta.lead}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CtaButton>{finalCta.primary}</CtaButton>
            <CtaButton secondary href="#virada">
              {finalCta.secondary}
            </CtaButton>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 md:flex-row md:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/envs-wordmark.svg" alt="envs" className="h-5 w-auto opacity-80" />
          <p className="text-xs text-fg/40">{finalCta.footer}</p>
          <a href="https://envs.com.br" className="text-xs text-fg/40 hover:text-lime">
            {finalCta.domain}
          </a>
        </div>
      </footer>
    </>
  );
}
