"use client";

import { useState } from "react";
import {
  virada, diferenca, futuro, frentes, stack, dores, agentes,
  visibilidade, falha, stats, escritorio, garantiaFinal, finalCta,
} from "@/data/site";
import { depoimentos } from "@/data/depoimentos";
import { caseDestaque } from "@/data/case";
import { Reveal, Counter } from "@/lib/anim";
import { Head, Bento, Orb, Glossy, Ghost, Pill, ArtGlow, ArtSliders, ArtSystems, ArtChart } from "./Kit";

const S = "mx-auto max-w-[1240px] px-5";

/* ---------- 01 · declaração + esfera ---------- */
export function Statement() {
  return (
    <section className={`${S} py-28 lg:py-36`}>
      <div className="grid items-center gap-14 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="h-display text-[clamp(1.5rem,3.1vw,2.5rem)] leading-[1.22]">
            A envs coloca <span className="text-lime">agentes de IA para operar</span> seu financeiro,
            jurídico, comercial e logística — integra os sistemas que você já usa e continua do seu
            lado enquanto o negócio cresce.
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {diferenca.setores.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center lg:justify-end">
          <Orb labels={hero4} size={300} />
        </Reveal>
      </div>
    </section>
  );
}
const hero4 = ["Financeiro", "Jurídico", "Comercial", "Logística"];

/* ---------- 02 · a virada ---------- */
export function Virada() {
  return (
    <section className={`${S} py-20`}>
      <Head
        id="virada"
        label="2026: a virada"
        title={
          <>
            Se 2024 foi o ano do chat,{" "}
            <span className="bg-gradient-to-r from-lime to-peri bg-clip-text text-transparent">
              2026 é o ano da IA que executa
            </span>
          </>
        }
        desc={virada.lead}
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {virada.cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div
              className={`bento h-full p-7 ${c.now ? "border-lime/40" : ""}`}
              style={
                c.now
                  ? { background: "radial-gradient(ellipse 90% 70% at 50% 108%, rgba(191,242,78,.16), #101010 62%)" }
                  : undefined
              }
            >
              <span className={`font-mono text-[11px] tracking-[0.18em] ${c.now ? "text-lime" : "text-fg/35"}`}>
                {c.period}
              </span>
              <h3 className="h-display mt-4 text-[1.7rem]">{c.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-fg/50">{c.desc}</p>
              <ul className="mt-6 space-y-2 border-t border-white/8 pt-5">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[13.5px] text-fg/70">
                    <span className={c.now ? "text-lime" : "text-fg/25"}>{c.now ? "✓" : "—"}</span>
                    {it}
                  </li>
                ))}
              </ul>
              <p className={`mt-6 text-[13.5px] font-medium ${c.now ? "text-lime" : "text-fg/35"}`}>{c.kicker}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mx-auto mt-16 max-w-2xl text-center text-[clamp(1.15rem,2.2vw,1.6rem)] leading-snug text-fg/75">
          {diferenca.fecho}
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- 03 · o que nos diferencia (bento) ---------- */
export function Solucoes() {
  return (
    <section className={`${S} py-20`}>
      <Head
        id="solucoes"
        label="o que nos diferencia"
        title="O que separa a envs de quem só “faz automação”"
        desc="Automação segue regras fixas. Agente autônomo observa, decide e adapta."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <Reveal>
          <Bento
            title={frentes.f1.title}
            desc={frentes.f1.desc}
            art={
              <div className="absolute inset-0">
                <ArtGlow hue="lime" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[78%] rounded-lg border border-white/12 bg-black/45 p-4 font-mono text-[10.5px] backdrop-blur-sm">
                    <p className="text-lime">$ {frentes.f1.terminal[0]}</p>
                    {frentes.f1.terminal.slice(1, 3).map((l) => (
                      <p key={l} className="mt-1.5 text-fg/60">
                        <span className="mr-1.5 text-lime">✓</span>
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            }
            className="h-full"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Bento
            title={frentes.f2.title}
            desc={frentes.f2.desc}
            art={
              <div className="absolute inset-0">
                <ArtChart />
                <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
                  {frentes.f2.pipeline.map((p, i) => (
                    <span
                      key={p}
                      className={`rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase backdrop-blur-sm ${
                        i === frentes.f2.pipeline.length - 1
                          ? "border-lime/50 bg-lime/15 text-lime"
                          : "border-white/15 bg-black/35 text-fg/70"
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            }
            className="h-full"
          />
        </Reveal>
        <Reveal>
          <Bento
            title={frentes.f3.title}
            desc={frentes.f3.desc}
            art={<ArtSliders />}
            className="h-full"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Bento
            title="Integra o que você já usa"
            desc="Planilhas, documentos, softwares, APIs — qualquer sistema. Sem trocar sua stack."
            art={<ArtSystems items={["ERP", "CRM", "Banco", "NF-e", "Sheets", "Slack", "E-mail", "APIs"]} />}
            className="h-full"
          />
        </Reveal>
      </div>

      {/* método + garantia */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[frentes.metodo, frentes.garantia].map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.06}>
            <div className="bento h-full p-8" style={{ background: "radial-gradient(ellipse 80% 90% at 20% 0%, rgba(144,138,255,.12), #101010 60%)" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-peri">{c.tag}</span>
              <h3 className="h-display mt-4 text-[1.6rem]">{c.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-fg/50">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* stack inline */}
      <Reveal>
        <div className="mt-4 bento p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="h-display text-[1.4rem]">{stack.title}</h3>
            <span className="font-mono text-[10px] uppercase tracking-wider text-fg/35">{stack.selo}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/8 pt-6">
            {stack.items.map((s) => (
              <span key={s.name}>
                <span className="text-[13.5px] font-medium text-fg/80">{s.name}</span>
                <span className="ml-2 font-mono text-[10px] text-fg/30">{s.role}</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 04 · agentes (rail lateral estilo cosmoq) ---------- */
export function Agentes() {
  const [i, setI] = useState(0);
  const t = agentes.tabs[i];
  return (
    <section className={`${S} py-20`}>
      <Head
        id="agentes"
        label="os agentes na prática"
        title="Da IA que responde para a IA que executa"
        desc={agentes.lead}
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* rail */}
        <div className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0">
          {agentes.tabs.map((tb, k) => (
            <button
              key={tb.label}
              onClick={() => setI(k)}
              className={`flex shrink-0 items-center gap-3 border-b px-4 py-3.5 text-left text-[14px] transition ${
                k === i ? "border-lime text-fg" : "border-white/10 text-fg/45 hover:text-fg/80"
              }`}
            >
              <span aria-hidden className="text-base">{tb.icon}</span>
              {tb.label}
            </button>
          ))}
        </div>

        {/* painel */}
        <div className="bento p-8 lg:p-10" style={{ background: "radial-gradient(ellipse 70% 80% at 88% 4%, rgba(144,138,255,.14), #101010 58%)" }}>
          <h3 className="h-display text-[1.8rem]">{t.title}</h3>
          <ol className="mt-7 space-y-0">
            {t.steps.map((s, k) => (
              <li key={s} className="flex gap-4 border-t border-white/8 py-3.5 first:border-t-0 first:pt-0">
                <span className="font-mono text-[10px] text-lime/70">{`0${k + 1}`}</span>
                <span className="text-[14px] text-fg/75">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-3 border-t border-white/8 pt-7 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/35">{agentes.outros.tag}</p>
              <ul className="mt-3 space-y-1.5">
                {agentes.outros.items.map((x) => (
                  <li key={x} className="flex gap-2 text-[12.5px] text-fg/45">
                    <span className="text-danger/60">✕</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">{agentes.envs.tag}</p>
              <ul className="mt-3 space-y-1.5">
                {agentes.envs.items.map((x) => (
                  <li key={x} className="flex gap-2 text-[12.5px] text-fg/80">
                    <span className="text-lime">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* backlog */}
      <Reveal>
        <div className="mt-4 bento grid gap-10 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">{visibilidade.eyebrow}</span>
            <h3 className="h-display mt-4 text-[1.7rem]">{visibilidade.title}</h3>
            <p className="mt-4 text-[13.5px] leading-relaxed text-fg/50">{visibilidade.lead}</p>
            <div className="mt-7 space-y-4 border-t border-white/8 pt-6">
              {visibilidade.features.map((f) => (
                <div key={f.title}>
                  <p className="text-[13.5px] font-medium text-fg/85">{f.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-fg/45">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <span className="font-mono text-[10px] text-fg/40">{visibilidade.board.url}</span>
              <span className="font-mono text-[10px] text-lime">● live</span>
            </div>
            {visibilidade.board.rows.map((r) => (
              <div key={r.task} className="flex items-center justify-between gap-4 border-b border-white/6 px-4 py-3.5 last:border-b-0">
                <span className="truncate text-[13px] text-fg/75">{r.task}</span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-[10px] text-fg/30">{r.sprint}</span>
                  <span className={`font-mono text-[10px] ${r.status === "Concluído" ? "text-lime" : r.status === "Em andamento" ? "text-peri" : "text-fg/35"}`}>
                    {r.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 05 · diagnóstico ---------- */
export function Dores() {
  return (
    <section className={`${S} py-20`}>
      <Head id="dores" label="o diagnóstico" title={dores.title} />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {dores.items.map((d, i) => (
          <Reveal key={d.title} delay={i * 0.04}>
            <div className="bento h-full p-7">
              <span className="font-mono text-[11px] text-lime/60">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[16px] font-medium leading-snug">{d.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-fg/45">{d.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mx-auto mt-12 max-w-3xl text-[14px] leading-relaxed text-fg/55">{dores.fecho}</p>
      </Reveal>
    </section>
  );
}

/* ---------- 06 · método ---------- */
export function Metodo() {
  const f = falha;
  return (
    <section className={`${S} py-20`}>
      <Head
        id="metodo"
        label="por que a maioria falha"
        title={<>{f.title[0]} <span className="text-lime">{f.title[1]}</span></>}
        desc={f.lead}
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {[
          { d: f.maioria, good: false },
          { d: f.envs, good: true },
        ].map(({ d, good }) => (
          <Reveal key={d.tag}>
            <div className={`bento h-full p-8 ${good ? "border-lime/35" : ""}`}>
              <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${good ? "text-lime" : "text-fg/35"}`}>
                {good ? "✓" : "✕"} {d.tag}
              </span>
              <div className="mt-6 space-y-1.5">
                {d.rows.map((r) => (
                  <div
                    key={r.area}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 font-mono text-[11px] uppercase tracking-wider ${
                      r.gargalo
                        ? good
                          ? "bg-lime text-bg"
                          : "border border-danger/40 bg-danger/10 text-danger"
                        : "bg-white/[0.03] text-fg/40"
                    }`}
                  >
                    <span>{r.area}</span>
                    <span className={r.gargalo ? "font-bold" : "opacity-60"}>{r.note}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-fg/50">{d.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {f.steps.map((s) => (
          <Reveal key={s.n}>
            <div className="bento h-full p-7">
              <span className="h-display text-3xl text-lime/40">{s.n}</span>
              <h3 className="mt-3 text-[16px] font-medium">{s.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-fg/45">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 07 · prova ---------- */
export function Prova() {
  const c = caseDestaque;
  return (
    <section className={`${S} py-20`}>
      <Head id="prova" label="resultados" title="Não são palavras. São números de quem já fez." />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="bento h-full p-7">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} className="h-display block text-[2.1rem] text-lime" />
              <p className="mt-3 text-[12.5px] leading-relaxed text-fg/45">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* case */}
      <Reveal>
        <div
          className="bento mt-4 overflow-hidden p-8 lg:p-12"
          style={{ background: "radial-gradient(ellipse 70% 90% at 50% 108%, rgba(191,242,78,.16), rgba(144,138,255,.08) 42%, #101010 72%)" }}
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">{c.eyebrow}</span>
              <h3 className="h-display mt-4 text-[clamp(1.5rem,3vw,2.3rem)]">
                {c.title} <span className="text-lime">{c.titleHighlight}</span>
              </h3>
              <p className="mt-5 text-[13.5px] leading-relaxed text-fg/55">{c.paragraphs[1]}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Glossy>{c.cta} <span>→</span></Glossy>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-xl border border-white/8 bg-black/30 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/35">antes</p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-fg/55">{c.antes}</p>
              </div>
              <div className="rounded-xl border border-lime/35 bg-lime/[0.07] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">depois</p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-fg/80">{c.depois}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* depoimentos */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {depoimentos.map((d, i) => (
          <Reveal key={d.nome} delay={i * 0.06}>
            <figure className="bento flex h-full flex-col p-7">
              <blockquote className="flex-1 text-[14px] leading-relaxed text-fg/70">“{d.texto}”</blockquote>
              <figcaption className="mt-6 border-t border-white/8 pt-5">
                <p className="text-[13.5px] font-medium">{d.nome}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-fg/35">
                  {d.cargo} · <span className="text-lime/60">{d.empresa}</span>
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 08 · futuro + garantia + CTA ---------- */
export function Fecho() {
  return (
    <>
      <section className={`${S} py-20`}>
        <Head label="o futuro chegou" title={futuro.title} />
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-[14px] leading-relaxed text-fg/55">
            <p>{futuro.paragraphs[0]}</p>
            <p>{futuro.paragraphs[1]}</p>
          </div>
          <div className="space-y-7">
            <p className="h-display text-[1.5rem] leading-tight lg:text-[1.8rem]">{futuro.paragraphs[2]}</p>
            <p className="border-l-2 border-lime pl-5 text-[15px] font-medium text-lime">{futuro.paragraphs[3]}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {futuro.timeline.map((t, i) => {
            const now = i === futuro.timeline.length - 1;
            return (
              <Reveal key={t.era} delay={i * 0.06}>
                <div className={`bento h-full p-7 ${now ? "border-lime/40" : ""}`}>
                  <span className={`font-mono text-[10px] tracking-[0.2em] ${now ? "text-lime" : "text-fg/35"}`}>{t.era}</span>
                  <h3 className="h-display mt-3 text-[1.25rem] leading-snug">{t.title}</h3>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-fg/45">{t.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mx-auto mt-12 max-w-3xl text-[14px] leading-relaxed text-fg/60">{futuro.fecho}</p>
        </Reveal>
      </section>

      {/* garantia */}
      <section className={`${S} pb-20`}>
        <Reveal>
          <div
            className="bento p-10 lg:p-14"
            style={{ background: "radial-gradient(ellipse 60% 90% at 10% 0%, rgba(144,138,255,.14), #101010 55%)" }}
          >
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">{garantiaFinal.eyebrow}</span>
                <h2 className="h-display mt-4 text-[clamp(1.6rem,3.2vw,2.5rem)]">
                  O risco é nosso tanto quanto é seu.{" "}
                  <span className="text-lime">Resultado ou devolução.</span>
                </h2>
              </div>
              <div>
                <p className="text-[14px] leading-relaxed text-fg/55">{garantiaFinal.body}</p>
                <p className="mt-6 border-l-2 border-lime pl-5 text-[14.5px] italic text-fg/85">{garantiaFinal.quote}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA final com aurora */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="stars absolute inset-0 opacity-70" />
          <div className="aurora" />
        </div>
        <div className={`${S} relative py-32 text-center lg:py-40`}>
          <Pill>{finalCta.eyebrow}</Pill>
          <h2 className="h-display mx-auto mt-8 max-w-3xl text-[clamp(2.1rem,5.4vw,4.2rem)]">
            Toda empresa vai precisar de um parceiro de tech com IA.{" "}
            <span className="bg-gradient-to-r from-lime to-peri bg-clip-text text-transparent">A sua já tem?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-[15px] leading-relaxed text-fg/55">{finalCta.lead}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Glossy>{finalCta.primary} <span>→</span></Glossy>
            <Ghost href="#virada">{finalCta.secondary}</Ghost>
          </div>
          <p className="mx-auto mt-24 max-w-2xl text-[13px] leading-relaxed text-fg/40">
            <span className="text-fg/65">{escritorio.title}</span> {escritorio.lead}
          </p>
        </div>
      </section>

      <footer className="border-t border-white/8">
        <div className={`${S} flex flex-col items-center gap-4 py-10 md:flex-row md:justify-between`}>
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
