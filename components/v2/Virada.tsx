"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/anim";
import { virada, diferenca } from "@/data/site";
import { KineticText } from "./Shell";

/**
 * Horizontal scroll: the three eras move sideways as you scroll down.
 * Scrolling forward literally advances through time.
 */
export default function Virada() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current, t = track.current;
    if (!w || !t) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const dist = () => t.scrollWidth - window.innerWidth + 120;
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: w,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <section id="virada" className="relative">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="flex items-baseline gap-4 pt-24 pb-10">
            <span className="font-mono text-xs text-lime">01</span>
            <span className="h-px flex-1 bg-fg/15" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg/45">2026: a virada</span>
          </div>
          <h2 className="display max-w-3xl text-[clamp(1.9rem,4.6vw,3.5rem)]">
            Se 2024 foi o ano do chat,{" "}
            <span className="text-lime">2026 é o ano da IA que executa.</span>
          </h2>
          <p className="mt-6 max-w-xl text-fg/55">{virada.lead}</p>
        </div>
      </section>

      {/* horizontal track */}
      <div ref={wrap} className="relative overflow-hidden py-16 lg:h-screen lg:py-0">
        <div className="flex h-full items-center">
          <div
            ref={track}
            className="flex gap-5 px-5 max-lg:snap-x max-lg:overflow-x-auto lg:gap-8 lg:pl-[max(1.25rem,calc((100vw-1180px)/2))]"
          >
            {virada.cards.map((c, i) => (
              <article
                key={c.title}
                className={`relative flex w-[78vw] shrink-0 flex-col justify-between rounded-2xl border p-8 max-lg:snap-start sm:w-[430px] lg:h-[460px] lg:w-[460px] lg:p-10 ${
                  c.now
                    ? "border-lime/60 bg-gradient-to-br from-lime/[0.09] to-transparent"
                    : "border-white/10 bg-surface/40"
                }`}
              >
                {/* era number as a design element */}
                <span
                  className={`display pointer-events-none absolute right-6 top-4 select-none text-[110px] leading-none ${
                    c.now ? "text-lime/10" : "text-fg/[0.04]"
                  }`}
                >
                  {i + 1}
                </span>

                <div className="relative">
                  <p className={`font-mono text-[11px] tracking-[0.2em] ${c.now ? "text-lime" : "text-fg/40"}`}>
                    {c.period}
                  </p>
                  <h3 className="display mt-4 text-3xl lg:text-4xl">{c.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg/60">{c.desc}</p>
                </div>

                <div className="relative mt-8">
                  <ul className="space-y-2 border-t border-white/10 pt-5">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-fg/75">
                        <span className={`mt-0.5 font-mono text-[10px] ${c.now ? "text-lime" : "text-fg/30"}`}>
                          {c.now ? "✓" : "—"}
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-6 text-sm font-bold ${c.now ? "text-lime" : "text-fg/35"}`}>{c.kicker}</p>
                </div>
              </article>
            ))}

            {/* closing statement rides at the end of the track */}
            <div className="flex w-[78vw] shrink-0 items-center max-lg:snap-start sm:w-[430px] lg:w-[520px]">
              <KineticText
                text={diferenca.fecho}
                className="text-xl leading-snug text-fg/80 lg:text-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
