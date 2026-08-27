"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/anim";
import { virada } from "@/data/site";
import { Reveal } from "@/lib/anim";

export default function Virada() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cards = el.querySelectorAll("[data-card]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "+=1400", pin: true, scrub: 0.6 },
      });
      cards.forEach((c, i) => {
        tl.fromTo(c, { y: 110, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, i * 0.9);
      });
      tl.to({}, { duration: 0.6 }); // hold at the end
    });
    mm.add("(max-width: 1023px)", () => {
      el.querySelectorAll("[data-card]").forEach((c) => {
        gsap.fromTo(
          c,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: c, start: "top 85%" } }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="virada" className="relative">
      <div className="mx-auto max-w-6xl px-5 pt-28 text-center">
        <Reveal>
          <p className="eyebrow mb-5">{virada.eyebrow}</p>
          <h2 className="display text-[clamp(1.9rem,4.6vw,3.6rem)]">
            {virada.title[0]}
            <br />
            <span className="text-lime">{virada.title[1]}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-fg/70">{virada.lead}</p>
        </Reveal>
      </div>

      <div ref={stage} className="flex min-h-[70vh] items-center lg:min-h-screen">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-16 lg:grid-cols-3">
          {virada.cards.map((c) => (
            <div
              key={c.title}
              data-card
              className={`rounded-2xl border p-7 ${
                c.now
                  ? "border-lime/60 bg-lime/5 shadow-[0_0_60px_-15px_rgba(191,242,78,0.35)]"
                  : "border-white/10 bg-surface/50"
              }`}
            >
              <p className={`text-xs font-bold tracking-[0.2em] ${c.now ? "text-lime" : "text-fg/50"}`}>{c.period}</p>
              <h3 className="display mt-3 text-2xl">{c.title}</h3>
              <p className="mt-3 text-sm text-fg/65">{c.desc}</p>
              <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-fg/80">
                    <span className={c.now ? "text-lime" : "text-fg/40"}>{c.now ? "✓" : "→"}</span>
                    {it}
                  </li>
                ))}
              </ul>
              <p className={`mt-6 text-sm font-bold ${c.now ? "text-lime" : "italic text-fg/45"}`}>{c.kicker}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
