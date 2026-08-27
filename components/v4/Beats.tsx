"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/anim";
import { useContent } from "@/components/v3/Content";

/* ============================================================
   Primitivos tipográficos da v4.
   Nada de card, painel ou caixa: só texto flutuando na cena.
   ============================================================ */

/** Bloco de tela cheia. A cena 3D passa por trás. */
function Beat({
  children,
  className = "",
  h = "min-h-screen",
}: {
  children: React.ReactNode;
  className?: string;
  h?: string;
}) {
  return (
    // py-24: mantém o conteúdo fora da faixa do HUD fixo em cima e embaixo
    <section className={`relative flex ${h} flex-col justify-center px-8 py-24 ${className}`}>
      {children}
    </section>
  );
}

/** Legenda pequena, caixa alta, muito espaçada — o registro da referência. */
function Caption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-fg/70 ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * Tipo gigante que atravessa a tela conforme o scroll.
 * `drift` desloca no eixo x (positivo = entra pela esquerda e sai pela
 * direita), o que produz o efeito de passar pela câmera.
 */
function Huge({
  children,
  align = "left",
  drift = 0,
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  drift?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !drift) return;
    const tw = gsap.fromTo(
      el,
      { xPercent: -drift },
      {
        xPercent: drift,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      }
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [drift]);

  const a = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

  return (
    <div
      ref={ref}
      className={`whitespace-nowrap font-medium leading-[0.88] tracking-[-0.035em] ${a} ${className}`}
    >
      {children}
    </div>
  );
}

const LIME = "text-lime";
/** dimensões que sangram: o texto é maior que a viewport de propósito */
const XL = "text-[clamp(3.2rem,13vw,11rem)]";
const LG = "text-[clamp(2.4rem,8.5vw,7rem)]";
const MD = "text-[clamp(1.9rem,5.6vw,4.4rem)]";

/* ============================================================
   As batidas, na ordem do scroll
   ============================================================ */

export function Abertura() {
  const { hero } = useContent();
  return (
    <Beat h="min-h-[130vh]" className="justify-between">
      {/* linha 1 sangra pela esquerda */}
      <Huge align="left" className={`${XL} -ml-[3vw]`}>
        {hero.headline[0]}
      </Huge>

      <div className="mx-auto max-w-md py-12 text-center">
        <Caption>{hero.sub}</Caption>
      </div>

      {/* linha final sangra pela direita, em lime */}
      <Huge align="right" className={`${XL} ${LIME} -mr-[4vw]`}>
        {hero.headline[hero.headline.length - 1]}
      </Huge>
    </Beat>
  );
}

export function Virada() {
  const { virada } = useContent();
  return (
    <>
      <Beat>
        <Huge align="left" drift={4} className={`${LG} -ml-[2vw]`}>
          {virada.title[0]}
        </Huge>
        <Huge align="right" drift={-4} className={`${LG} ${LIME} mt-3 -mr-[2vw]`}>
          {virada.title[1]}
        </Huge>
        <div className="mx-auto mt-16 max-w-lg text-center">
          <Caption>{virada.lead}</Caption>
        </div>
      </Beat>

      {/* as três ondas, uma por tela */}
      {virada.cards.map((c) => (
        <Beat key={c.title} h="min-h-[85vh]">
          <Caption className={c.now ? "text-lime" : "text-fg/45"}>{c.period}</Caption>
          <Huge
            align="left"
            drift={c.now ? 3 : 2}
            className={`${LG} mt-4 ${c.now ? LIME : "text-fg/85"}`}
          >
            {c.title}
          </Huge>
          <div className="mt-8 max-w-md">
            <Caption className="normal-case tracking-[0.06em] text-fg/55">{c.desc}</Caption>
          </div>
          <ul className="mt-6 space-y-1.5">
            {c.items.map((it) => (
              <li key={it}>
                <Caption className={c.now ? "text-fg/80" : "text-fg/40"}>
                  <span className={`mr-3 ${c.now ? "text-lime" : "text-fg/25"}`}>
                    {c.now ? "✓" : "—"}
                  </span>
                  {it}
                </Caption>
              </li>
            ))}
          </ul>
          <p className={`mt-9 ${MD} font-medium ${c.now ? LIME : "text-fg/45"}`}>{c.kicker}</p>
        </Beat>
      ))}
    </>
  );
}

export function Diferenca() {
  const { diferenca } = useContent();
  return (
    <>
      <Beat>
        <Huge align="center" className={`${LG} mx-auto whitespace-normal text-center`}>
          {diferenca.title}
        </Huge>
      </Beat>

      {/* o contraste vira duas telas seguidas, não duas colunas */}
      {diferenca.compare.map((c) => (
        <Beat key={c.tag} h="min-h-[80vh]">
          <Caption className={c.good ? "text-lime" : "text-danger/70"}>
            {c.good ? "✓" : "✕"} {c.tag}
          </Caption>
          <p
            className={`mt-6 max-w-3xl text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.03em] ${
              c.good ? "text-fg" : "text-fg/40"
            }`}
          >
            {c.desc}
          </p>
        </Beat>
      ))}

      <Beat h="min-h-[80vh]">
        <p className="mx-auto max-w-3xl text-center text-[clamp(1.1rem,2.4vw,1.9rem)] leading-snug text-fg/70">
          {diferenca.analogy}
        </p>
      </Beat>

      {/* o ciclo do agente como palavras soltas na cena */}
      <Beat h="min-h-[70vh]">
        <Caption className="text-center">{diferenca.praticaLead}</Caption>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {diferenca.verbs.map((v, i) => (
            <span key={v} className="flex items-center gap-10">
              <span className={`${MD} font-medium ${LIME}`}>{v}</span>
              {i < diferenca.verbs.length - 1 && (
                <span className="font-mono text-lg text-fg/25">→</span>
              )}
            </span>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {diferenca.systems.map((s) => (
            <Caption key={s} className="text-fg/40">
              {s}
            </Caption>
          ))}
        </div>
      </Beat>

      <Beat h="min-h-[85vh]">
        <p className="mx-auto max-w-4xl text-center text-[clamp(1.3rem,3.2vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
          {diferenca.fecho}
        </p>
      </Beat>
    </>
  );
}

export function Frentes() {
  const { frentes, dores } = useContent();
  const três = [frentes.f1, frentes.f2, frentes.f3];
  return (
    <>
      <Beat h="min-h-[70vh]">
        <Caption>{frentes.eyebrow}</Caption>
        <Huge align="left" drift={3} className={`${LG} mt-5 whitespace-normal`}>
          {frentes.title}
        </Huge>
      </Beat>

      {três.map((f, i) => (
        <Beat key={f.tag} h="min-h-[80vh]">
          <div className="flex items-baseline gap-6">
            <span className={`${LG} font-medium text-lime/20`}>{`0${i + 1}`}</span>
            <div>
              <Caption className="text-lime">{f.tag}</Caption>
              <h3 className={`${MD} mt-3 font-medium leading-tight`}>{f.title}</h3>
            </div>
          </div>
          <div className="mt-8 max-w-xl">
            <Caption className="normal-case tracking-[0.06em] text-fg/55">{f.desc}</Caption>
          </div>
        </Beat>
      ))}

      {/* o diagnóstico: seis dores como uma lista longa que passa */}
      <Beat h="min-h-[70vh]">
        <Huge align="right" drift={-3} className={`${LG} whitespace-normal text-right ${LIME}`}>
          {dores.title}
        </Huge>
      </Beat>

      {dores.items.map((d, i) => (
        <Beat key={d.title} h="min-h-[62vh]">
          <span className="font-mono text-[11px] tracking-[0.2em] text-lime/60">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-5 max-w-3xl text-[clamp(1.4rem,3.6vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.028em]">
            {d.title}
          </p>
          <div className="mt-6 max-w-xl">
            <Caption className="normal-case tracking-[0.06em] text-fg/45">{d.body}</Caption>
          </div>
        </Beat>
      ))}
    </>
  );
}

export function Numeros() {
  const { stats, caseDestaque } = useContent();
  return (
    <>
      <Beat h="min-h-[60vh]">
        <Huge align="center" className={`${LG} mx-auto whitespace-normal text-center`}>
          {stats.title[0]} <span className={LIME}>{stats.title[1]}</span>
        </Huge>
      </Beat>

      {/* cada número ocupa uma tela inteira */}
      {stats.items.map((s) => (
        <Beat key={s.label} h="min-h-[78vh]" className="items-center text-center">
          <p className={`${XL} font-medium leading-none ${LIME}`}>
            {s.prefix}
            {s.value}
            <span className="text-[0.42em]">{s.suffix}</span>
          </p>
          <div className="mx-auto mt-8 max-w-sm">
            <Caption>{s.label}</Caption>
          </div>
        </Beat>
      ))}

      {/* o case */}
      <Beat h="min-h-[85vh]">
        <Caption className="text-lime">{caseDestaque.eyebrow}</Caption>
        <Huge align="left" drift={3} className={`${LG} mt-5 whitespace-normal`}>
          {caseDestaque.title}{" "}
          <span className={LIME}>{caseDestaque.titleHighlight}</span>
        </Huge>
        <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <Caption className="normal-case tracking-[0.06em] text-fg/50">
            {caseDestaque.antes}
          </Caption>
          <Caption className="normal-case tracking-[0.06em] text-fg/85">
            {caseDestaque.depois}
          </Caption>
        </div>
      </Beat>
    </>
  );
}

export function Fecho() {
  const { garantiaFinal, finalCta, WA_URL } = useContent();
  return (
    <>
      <Beat h="min-h-[80vh]">
        <Caption className="text-lime">{garantiaFinal.eyebrow}</Caption>
        <Huge align="left" className={`${LG} mt-5 whitespace-normal`}>
          {garantiaFinal.title[0]}{" "}
          <span className={LIME}>{garantiaFinal.title[1]}</span>
        </Huge>
        <div className="mt-10 max-w-2xl">
          <Caption className="normal-case tracking-[0.06em] text-fg/55">
            {garantiaFinal.quote}
          </Caption>
        </div>
      </Beat>

      {/* fechamento: a pergunta ocupa a tela e o CTA é a única coisa clicável */}
      <Beat h="min-h-[110vh]" className="items-center justify-center text-center">
        <Caption className="text-lime">{finalCta.eyebrow}</Caption>

        <h2 className={`${LG} mx-auto mt-8 max-w-5xl font-medium leading-[0.95] tracking-[-0.035em]`}>
          {finalCta.title.slice(0, -1).join(" ")}{" "}
          <span className={LIME}>{finalCta.title[finalCta.title.length - 1]}</span>
        </h2>

        <div className="mx-auto mt-10 max-w-md">
          <Caption className="normal-case tracking-[0.06em] text-fg/55">{finalCta.lead}</Caption>
        </div>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="group mt-12 inline-flex items-center gap-4 border-b border-lime/40 pb-2 font-mono text-[13px] uppercase tracking-[0.16em] text-lime transition hover:border-lime"
        >
          {finalCta.primary}
          <span className="transition-transform group-hover:translate-x-1.5">→</span>
        </a>
      </Beat>
    </>
  );
}
