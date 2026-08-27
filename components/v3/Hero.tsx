"use client";

import { useEffect, useState } from "react";
import { hero, WA_URL } from "@/data/site";
import { Glossy, Ghost, Pill } from "./Kit";
import Aurora from "./Aurora";

const NAV = [
  { label: "A virada", href: "#virada" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Método", href: "#metodo" },
  { label: "Resultados", href: "#prova" },
];

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-5">
      <div
        className="hero-in mx-auto flex max-w-[1240px] items-center justify-between"
        style={{ animationDelay: "0.05s" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" aria-label="envs">
          <img src="/logos/envs-wordmark.svg" alt="envs" className="h-[18px] w-auto" />
        </a>

        <nav className="glass-pill hidden items-center gap-1 px-2 py-1.5 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-1.5 text-[13.5px] text-fg/70 transition hover:bg-white/[0.07] hover:text-fg"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="glossy px-5 py-2.5 text-[13.5px] font-medium text-fg"
        >
          Agendar call
        </a>
      </div>
    </header>
  );
}

/** Painel do agente que aparece "sobre" o horizonte da aurora. */
function AgentPanel() {
  const [n, setN] = useState(0);
  const rows = [
    { label: "Inadimplência identificada", value: "12 faturas", tone: "lime" },
    { label: "Cruzamento com CRM", value: "3 em risco", tone: "peri" },
    { label: "Régua de cobrança", value: "disparada", tone: "lime" },
    { label: "Conciliação bancária", value: "concluída", tone: "lime" },
  ];

  useEffect(() => {
    const t = setInterval(() => setN((v) => (v + 1) % (rows.length + 1)), 900);
    return () => clearInterval(t);
  }, [rows.length]);

  return (
    <div className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-t-2xl border border-b-0 border-white/12 bg-[#0d0d0d]/90 backdrop-blur-xl">
      {/* barra do app */}
      <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/envs-bubble-primary.svg" alt="" className="h-4 w-4" />
        <span className="text-[13px] font-medium text-fg/85">Agente Financeiro</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 font-mono text-[10px] text-lime">
          <span className="pulsedot h-1.5 w-1.5 rounded-full bg-lime" />
          rodando
        </span>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[1.25fr_1fr]">
        {/* execução */}
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-all duration-500 ${
                i < n
                  ? "border-white/10 bg-white/[0.04] opacity-100"
                  : "border-white/5 bg-white/[0.015] opacity-35"
              }`}
            >
              <span className="flex items-center gap-2.5 text-[13px] text-fg/80">
                <span className={i < n ? (r.tone === "lime" ? "text-lime" : "text-peri") : "text-fg/25"}>
                  {i < n ? "✓" : "○"}
                </span>
                {r.label}
              </span>
              <span className="font-mono text-[11px] text-fg/45">{r.value}</span>
            </div>
          ))}
        </div>

        {/* métricas */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { k: "Processos", v: "24h", s: "sem parar" },
            { k: "Intervenção", v: "0", s: "humana" },
            { k: "Sistemas", v: "6", s: "integrados" },
            { k: "Exceções", v: "1", s: "tratada" },
          ].map((m) => (
            <div key={m.k} className="rounded-lg border border-white/8 bg-white/[0.025] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-fg/35">{m.k}</p>
              <p className="mt-1.5 text-2xl font-medium text-lime">{m.v}</p>
              <p className="text-[11px] text-fg/40">{m.s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* fundo: aurora sobre o limbo do planeta (canvas animado) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[118vh]">
        <Aurora />
        {/* vinheta central: protege a legibilidade do headline */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 42% 34% at 50% 34%, rgba(13,13,13,0.72), transparent 72%)",
          }}
        />
        {/* queda para o fundo do site */}
        <div className="absolute inset-x-0 bottom-0 h-[26vh] bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 pt-36 text-center">
        {/* cada bloco entra um pouco depois do anterior, acompanhando a aurora */}
        <div className="hero-in" style={{ animationDelay: "0.15s" }}>
          <Pill>
            <span className="pulsedot h-1.5 w-1.5 rounded-full bg-lime" />
            {hero.eyebrow}
          </Pill>
        </div>

        <h1 className="h-display mx-auto mt-8 max-w-4xl text-[clamp(2.1rem,5.4vw,4.35rem)]">
          <span className="hero-in block" style={{ animationDelay: "0.3s" }}>
            Pare de contratar pessoas
          </span>
          <span className="hero-in block" style={{ animationDelay: "0.44s" }}>
            para fazer o que a
          </span>
          {/* a frase em gradiente ganha linha própria: não quebra no meio e
              fecha o headline com mais força */}
          <span
            className="hero-in block bg-gradient-to-r from-lime via-lime to-peri bg-clip-text text-transparent"
            style={{ animationDelay: "0.58s" }}
          >
            IA faz sozinha
          </span>
        </h1>

        <p
          className="hero-in mx-auto mt-7 max-w-lg text-[15px] leading-relaxed text-fg/55"
          style={{ animationDelay: "0.74s" }}
        >
          {hero.sub}
        </p>

        <div
          className="hero-in mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.88s" }}
        >
          <Glossy>
            {hero.cta}
            <span>→</span>
          </Glossy>
          <Ghost href="#virada">Ver como funciona</Ghost>
        </div>

        <p
          className="hero-in mt-6 font-mono text-[11px] uppercase tracking-wider text-fg/35"
          style={{ animationDelay: "1.0s" }}
        >
          {hero.trust.join("  ·  ")}
        </p>

        {/* painel emergindo do brilho */}
        <div className="hero-in mt-20" style={{ animationDelay: "1.16s" }}>
          <AgentPanel />
        </div>
      </div>

      <Nav />
    </section>
  );
}
