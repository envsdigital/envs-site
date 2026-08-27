"use client";

import { frentes } from "@/data/site";
import { Reveal } from "@/lib/anim";

function Terminal() {
  const [cmd, ...lines] = frentes.f1.terminal;
  return (
    <div className="rounded-xl border border-white/10 bg-bg p-5 font-mono text-sm">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
      </div>
      <p className="text-lime">
        <span className="text-fg/40">$ </span>
        {cmd}
      </p>
      {lines.map((l, i) => (
        <p key={l} className="mt-1.5 text-fg/70">
          <span className={i === lines.length - 1 ? "text-peri" : "text-lime"}>{i === lines.length - 1 ? "…" : "✓"}</span>{" "}
          {l}
          {i === lines.length - 1 && <span className="caret text-lime">▍</span>}
        </p>
      ))}
    </div>
  );
}

export default function Frentes() {
  const { f1, f2, f3, metodo, garantia } = frentes;
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <Reveal className="text-center">
        <p className="eyebrow mb-5">{frentes.eyebrow}</p>
        <h2 className="display mx-auto max-w-3xl text-[clamp(1.9rem,4.4vw,3.4rem)]">{frentes.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-fg/65">{frentes.lead}</p>
      </Reveal>

      <div className="mt-16 space-y-6">
        {/* FRENTE 01 */}
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-surface/40 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-lime">{f1.tag}</p>
              <h3 className="display mt-3 text-3xl">{f1.title}</h3>
              <p className="mt-4 text-fg/65">{f1.desc}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {f1.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-fg/80">
                    <span className="text-lime">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <Terminal />
              </div>
            </div>
          </div>
        </Reveal>

        {/* FRENTE 02 + 03 */}
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-surface/40 p-8">
              <p className="text-xs font-bold tracking-[0.25em] text-lime">{f2.tag}</p>
              <h3 className="display mt-3 text-2xl">{f2.title}</h3>
              <p className="mt-3 text-sm text-fg/65">{f2.desc}</p>
              <div className="mt-8 flex items-center gap-3">
                {f2.pipeline.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className={`rounded-lg border px-4 py-2.5 text-sm font-bold ${
                        i === f2.pipeline.length - 1 ? "border-lime/50 bg-lime/10 text-lime" : "border-white/15 text-fg/80"
                      }`}
                    >
                      {step}
                    </span>
                    {i < f2.pipeline.length - 1 && <span className="text-fg/35">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-white/10 bg-surface/40 p-8">
              <p className="text-xs font-bold tracking-[0.25em] text-lime">{f3.tag}</p>
              <h3 className="display mt-3 text-2xl">{f3.title}</h3>
              <p className="mt-3 text-sm text-fg/65">{f3.desc}</p>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {f3.roles.map((r) => (
                  <span key={r} className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-fg/75">
                    {r}
                  </span>
                ))}
                <span className="rounded-full bg-lime px-4 py-1.5 text-xs font-bold text-bg">{f3.badge}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* metodo + garantia */}
        <div className="grid gap-6 md:grid-cols-2">
          {[metodo, garantia].map((card, i) => (
            <Reveal key={card.tag} delay={0.06 * i}>
              <div className="h-full rounded-3xl border border-lime/25 bg-lime/[0.04] p-8">
                <p className="text-xs font-bold tracking-[0.25em] text-lime">{card.tag}</p>
                <h3 className="display mt-3 text-2xl">{card.title}</h3>
                <p className="mt-3 text-sm text-fg/70">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
