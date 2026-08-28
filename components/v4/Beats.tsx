"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/anim";
import { useContent } from "@/components/v3/Content";
import { Magnetic } from "@/components/v4/Cursor";
import { ParticleText } from "@/components/v4/ParticleText";

/* ============================================================
   Primitivos tipográficos da v4.
   Nada de card, painel ou caixa: só texto flutuando na cena.
   ============================================================ */

/** Posição do ponteiro, compartilhada por todo texto vivo da página. */
const ptr = { x: -9999, y: -9999 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
    },
    { passive: true }
  );
}

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Tamanho de fonte derivado do comprimento da própria frase, para a linha
 * encher a largura da tela sem cortar.
 *
 * Um `13vw` fixo com `whitespace-nowrap` corta frases longas nos dois lados —
 * "Pare de contratar pessoas" virava "are de contratar pessoa". Aqui a fonte
 * encolhe conforme a frase cresce: ~0.56em é a largura média de caractere do
 * Inter medium nesta faixa, então `100vw / (chars * 0.56)` é o tamanho que
 * preenche a linha. `bleed` acima de 1 deixa sangrar de propósito.
 */
function fitSize(text: string, bleed = 1, max = 11) {
  const chars = Math.max(text.length, 1);
  const vw = (bleed * 100) / (chars * 0.56);
  return `clamp(1.4rem, ${vw.toFixed(2)}vw, ${max}rem)`;
}

/**
 * Texto letra a letra que levanta conforme o cursor passa perto.
 * Roda só enquanto está na tela — sem o IntersectionObserver seriam dezenas
 * de laços por frame para texto que ninguém está vendo.
 */
function Letters({
  text,
  grad,
  className = "",
}: {
  text: string;
  /** [de, para]: gradiente contínuo ao longo da linha */
  grad?: [string, string];
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  /* O gradiente vai em cada letra, não no bloco.
     `bg-clip-text` no pai recorta pela forma do texto do próprio elemento e
     não enxerga os spans por letra — o fundo vaza como mancha na origem.
     Dando a cada letra a mesma imagem, do tamanho da linha inteira, e
     deslocando a posição pelo offset dela, o gradiente volta a ser contínuo. */
  useEffect(() => {
    const el = ref.current;
    if (!el || !grad) return;
    const kids = Array.from(el.children) as HTMLElement[];

    const paint = () => {
      const w = el.offsetWidth;
      const bl = el.offsetLeft;
      for (const c of kids) {
        c.style.backgroundImage = `linear-gradient(90deg, ${grad[0]}, ${grad[1]})`;
        c.style.backgroundSize = `${w}px 100%`;
        c.style.backgroundPosition = `${-(c.offsetLeft - bl)}px 0`;
        c.style.setProperty("background-clip", "text");
        c.style.setProperty("-webkit-background-clip", "text");
        c.style.color = "transparent";
      }
    };
    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, [text, grad]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const kids = Array.from(el.children) as HTMLElement[];
    let raf = 0;
    let on = false;

    const tick = () => {
      raf = 0;
      if (!on) return;
      const r = el.getBoundingClientRect();
      // o pai pode estar escalado pelo scroll; offsetLeft não sabe disso
      const k = el.offsetWidth ? r.width / el.offsetWidth : 1;
      // offsetLeft das letras é relativo ao mesmo offsetParent do wrapper,
      // então a diferença dá a posição dentro dele
      const bl = el.offsetLeft, bt = el.offsetTop;
      for (const c of kids) {
        const px = r.left + (c.offsetLeft - bl + c.offsetWidth / 2) * k;
        const py = r.top + (c.offsetTop - bt + c.offsetHeight / 2) * k;
        const d = Math.hypot(ptr.x - px, ptr.y - py);
        const f = Math.max(0, 1 - d / 240);
        const e = f * f;
        // só transform: `color` brigaria com os títulos em gradiente
        c.style.transform =
          e > 0.005 ? `translateY(${(-30 * e).toFixed(2)}px) scale(${1 + 0.1 * e})` : "";
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} aria-label={text} className={`inline-block ${className}`}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          style={{ transition: "transform .18s cubic-bezier(.22,1,.36,1)" }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#*+-";

/** Legenda que se decodifica ao entrar na tela. */
function useScramble(text: string) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      el.textContent = text;
      return;
    }
    let raf = 0;
    let frame = 0;
    const chars = Array.from(text);

    const run = () => {
      frame++;
      // cada caractere trava depois de um número crescente de frames
      const settled = frame / 1.6;
      el.textContent = chars
        .map((c, i) =>
          c === " " || i < settled
            ? c
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        )
        .join("");
      if (settled < chars.length) raf = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      raf = requestAnimationFrame(run);
    });
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return ref;
}

function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useScramble(text);
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

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
    // py: mantém o conteúdo fora da faixa do HUD fixo em cima e embaixo
    <section className={`relative flex ${h} flex-col justify-center px-5 py-20 sm:px-8 sm:py-24 ${className}`}>
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
 * direita) e `depth` escala junto, o que faz o texto passar pela câmera em
 * vez de só deslizar. É o que dá a sensação de estar dentro da cena.
 */
function Huge({
  children,
  align = "left",
  drift = 0,
  depth = 0,
  fit,
  grad,
  bleed = 1,
  max = 11,
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  drift?: number;
  depth?: number;
  /** frase pura: dimensiona pelo comprimento e anima letra a letra */
  fit?: string;
  grad?: [string, string];
  bleed?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || (!drift && !depth)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tw = gsap.fromTo(
      el,
      { xPercent: -drift, scale: 1 - depth, opacity: depth ? 0.45 : 1 },
      {
        xPercent: drift,
        scale: 1 + depth,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      }
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [drift, depth]);

  const a = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

  return (
    <div
      ref={ref}
      style={fit ? { fontSize: fitSize(fit, bleed, max) } : undefined}
      // nowrap só quando o tamanho veio de `fit`, que é o caso em que a
      // linha foi dimensionada pra caber. Deixar nowrap na base fazia os
      // títulos longos esticarem a página na horizontal: `whitespace-normal`
      // na className não vence — mesma especificidade, ordem do CSS decide.
      className={`${fit ? "whitespace-nowrap" : ""} font-medium leading-[0.88] tracking-[-0.035em] ${a} ${className}`}
    >
      {fit ? <Letters text={fit} grad={grad} /> : children}
    </div>
  );
}

/**
 * Contador que sobe quando entra na tela — o "(483)" da referência.
 * Fica sobrescrito ao lado do título, em peri.
 */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }
    const box = { v: 0 };
    const tw = gsap.to(box, {
      v: to,
      duration: 1.5,
      ease: "power2.out",
      // décimos só se o alvo tiver, senão vira "12.0"
      onUpdate: () => {
        const n = Number.isInteger(to) ? Math.round(box.v) : box.v.toFixed(1);
        el.textContent = `${prefix}${n}${suffix}`;
      },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [to, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/** A cor secundária como segunda voz, não como acento. */
const SPLIT_LIME =
  "bg-gradient-to-r from-lime via-lime to-peri bg-clip-text text-transparent";
/** mesmo par, para as linhas que usam `fit` e pintam letra a letra */
const GRAD: [string, string] = ["#bff24e", "#908aff"];

const LIME = "text-lime";
/* dimensões que sangram: o texto é maior que a viewport de propósito.
   O termo em vh é o que impede o beat de transbordar por cima do HUD em
   tela baixa — só com vw um título de 4 linhas não cabe em 700px de altura. */
const XL = "text-[clamp(3.2rem,min(13vw,17vh),11rem)]";
const LG = "text-[clamp(2.4rem,min(8.5vw,11vh),7rem)]";
const MD = "text-[clamp(1.9rem,min(5.6vw,7vh),4.4rem)]";

/* ============================================================
   As batidas, na ordem do scroll
   ============================================================ */

export function Abertura() {
  const { hero } = useContent();
  return (
    <Beat h="min-h-[130vh]" className="justify-between">
      {/* linha 1 sangra pela esquerda */}
      <Huge align="left" fit={hero.headline[0]} bleed={1.06} className="-ml-[3vw]">
        {null}
      </Huge>

      <div className="mx-auto max-w-md py-12 text-center">
        <Caption>{hero.sub}</Caption>
      </div>

      {/* Sem partículas aqui: a hero abre na tela e não há rolagem antes
          dela para o texto se formar — chegaria pronto e o efeito se perde. */}
      <Huge
        align="right"
        fit={hero.headline[hero.headline.length - 1]}
        grad={GRAD}
        bleed={1.06}
        className="-mr-[3vw]"
      >
        {null}
      </Huge>
    </Beat>
  );
}

export function Virada() {
  const { virada } = useContent();
  return (
    <>
      <Beat>
        <Huge align="left" drift={4} depth={0.12} fit={virada.title[0]} max={7} className="-ml-[2vw]">
          {null}
        </Huge>
        <div className="mt-3">
          <ParticleText text={virada.title[1]} align="right" max={7} />
        </div>
        <div className="mx-auto mt-16 max-w-lg text-center">
          <Caption>{virada.lead}</Caption>
        </div>
      </Beat>

      {/* as três ondas, uma por tela */}
      {virada.cards.map((c) => (
        <Beat key={c.title} h="min-h-[85vh]">
          <Caption className={c.now ? "text-lime" : "text-peri/70"}>
            <Scramble text={c.period} />
          </Caption>
          {/* a onda atual se monta de partículas; as passadas ficam estáticas */}
          {c.now ? (
            <div className="mt-4">
              <ParticleText text={c.title} align="left" bleed={0.94} max={7} />
            </div>
          ) : (
            <Huge
              align="left"
              drift={2}
              depth={0.08}
              fit={c.title}
              max={7}
              className="mt-4 text-fg/85"
            >
              {null}
            </Huge>
          )}
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
        <ParticleText text={diferenca.title} align="center" bleed={0.9} max={5} />
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
        <Caption><Scramble text={frentes.eyebrow} /></Caption>
        <Huge align="left" drift={3} className={`${LG} mt-5 whitespace-normal`}>
          {frentes.title}
        </Huge>
      </Beat>

      {três.map((f, i) => (
        <Beat key={f.tag} h="min-h-[80vh]">
          <div className="flex items-baseline gap-6">
            <span className={`${LG} font-medium text-peri/35`}>{`0${i + 1}`}</span>
            <div>
              <Caption className="text-lime"><Scramble text={f.tag} /></Caption>
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
        <Huge align="right" drift={-3} depth={0.1} className={`${LG} whitespace-normal text-right ${SPLIT_LIME}`}>
          {dores.title}
        </Huge>
      </Beat>

      {dores.items.map((d, i) => (
        <Beat key={d.title} h="min-h-[62vh]">
          <span className="font-mono text-[11px] tracking-[0.2em] text-peri/75">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-5 max-w-3xl text-[clamp(1.4rem,min(3.6vw,5vh),2.9rem)] font-medium leading-[1.08] tracking-[-0.028em]">
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
      <Beat h="min-h-[70vh]">
        <Huge align="center" className={`${MD} mx-auto whitespace-normal text-center text-fg/70`}>
          {stats.title[0]}
        </Huge>
        <div className="mt-6">
          <ParticleText text={stats.title[1]} align="center" bleed={0.85} max={6} />
        </div>
      </Beat>

      {/* cada número ocupa uma tela inteira e sobe ao entrar */}
      {stats.items.map((s, i) => (
        <Beat key={s.label} h="min-h-[78vh]" className="items-center text-center">
          <p className={`${XL} font-medium leading-none ${i % 2 ? "text-peri" : LIME}`}>
            <Counter to={s.value} prefix={s.prefix} />
            <span className="text-[0.42em] text-fg/70">{s.suffix}</span>
          </p>
          <div className="mx-auto mt-8 max-w-sm">
            <Caption>{s.label}</Caption>
          </div>
        </Beat>
      ))}

      {/* o case */}
      <Beat h="min-h-[85vh]">
        <Caption className="text-lime"><Scramble text={caseDestaque.eyebrow} /></Caption>
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
        <Caption className="text-lime"><Scramble text={garantiaFinal.eyebrow} /></Caption>
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
      <Beat h="min-h-screen" className="items-center justify-center text-center">
        <Caption className="text-lime"><Scramble text={finalCta.eyebrow} /></Caption>

        {/* sem partículas aqui: é o fim da página, não há rolagem além
            deste bloco para o texto se formar na frente do leitor */}
        <h2 className={`${LG} mx-auto mt-8 max-w-5xl font-medium leading-[0.95] tracking-[-0.035em]`}>
          {finalCta.title.slice(0, -1).join(" ")}{" "}
          <span className={SPLIT_LIME}>{finalCta.title[finalCta.title.length - 1]}</span>
        </h2>

        <div className="mx-auto mt-10 max-w-md">
          <Caption className="normal-case tracking-[0.06em] text-fg/55">{finalCta.lead}</Caption>
        </div>

        {/* pílula sólida: a única coisa opaca da página inteira, por isso puxa o olho */}
        <div className="mt-12">
          <Magnetic>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 text-[15px] font-semibold text-bg shadow-[0_0_44px_-6px_rgba(191,242,78,.55)] transition hover:shadow-[0_0_64px_-4px_rgba(191,242,78,.8)]"
            >
              {finalCta.primary}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
        </div>
      </Beat>
    </>
  );
}
