"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/data/site";
import { WA_URL } from "@/data/site";

const RUN = [
  { t: "cmd", s: "envs run --agent financeiro --watch" },
  { t: "dim", s: "conectando: ERP · CRM · banco · e-mail" },
  { t: "ok", s: "12 faturas vencendo em 48h identificadas" },
  { t: "ok", s: "cruzado com CRM — 3 clientes de alto risco" },
  { t: "ok", s: "régua de cobrança disparada" },
  { t: "warn", s: "exceção: cliente #4471 em negociação → pulado" },
  { t: "ok", s: "conciliação bancária concluída" },
  { t: "ok", s: "relatório executivo enviado ao gestor" },
  { t: "idle", s: "aguardando próximo ciclo · 24h sem parar" },
];

const color: Record<string, string> = {
  cmd: "text-lime",
  dim: "text-fg/35",
  ok: "text-fg/80",
  warn: "text-peri",
  idle: "text-fg/40",
};

function AgentTerminal() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= RUN.length) {
      const r = setTimeout(() => setN(0), 4200);
      return () => clearTimeout(r);
    }
    const d = n === 0 ? 500 : RUN[n].t === "cmd" ? 700 : 620;
    const t = setTimeout(() => setN((v) => v + 1), d);
    return () => clearTimeout(t);
  }, [n]);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/12 bg-[#141414] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[10px] text-fg/35">agente_financeiro — envs</span>
      </div>
      <div className="h-[268px] space-y-1.5 overflow-hidden p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
        {RUN.slice(0, n).map((l, i) => (
          <p key={i} className={color[l.t]}>
            {l.t === "cmd" && <span className="mr-1.5 text-fg/30">$</span>}
            {l.t === "ok" && <span className="mr-1.5 text-lime">✓</span>}
            {l.t === "warn" && <span className="mr-1.5">!</span>}
            {l.t === "idle" && <span className="mr-1.5 text-lime/50">•</span>}
            {l.s}
          </p>
        ))}
        {n < RUN.length && <span className="caret inline-block text-lime">▍</span>}
      </div>
    </div>
  );
}

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" ref={wrap} className="relative min-h-[100svh] overflow-hidden">
      {/* soft top-right glow, off-center on purpose */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 44% at 78% 26%, rgba(191,242,78,0.11), transparent 68%), radial-gradient(ellipse 38% 36% at 12% 78%, rgba(144,138,255,0.09), transparent 72%)",
        }}
      />
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,245,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1180px] items-center gap-12 px-5 pt-28 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* LEFT — headline, left aligned, oversized */}
        <div>
          <p className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/45">
            <span className="h-px w-8 bg-lime" />
            Automação inteligente para empresas que querem crescer
          </p>

          <h1 className="display text-[clamp(2.5rem,6.2vw,4.9rem)]">
            <span className="block">Pare de contratar</span>
            <span className="block">pessoas para fazer</span>
            <span className="block">o que a IA faz</span>
            <span className="relative inline-block text-lime">
              sozinha.
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="7"
                viewBox="0 0 200 7"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M0,5 Q50,1 100,4 T200,3" stroke="#bff24e" strokeWidth="2" fill="none" opacity="0.55" />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-fg/60">{hero.sub}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-lime px-7 py-3.5 font-bold text-bg transition hover:brightness-110"
            >
              {hero.cta}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-widest text-fg/35">
              Call de 30 min · sem compromisso
            </span>
          </div>

          {/* domain row — inline, not floating pills */}
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/8 pt-5">
            {hero.pills.map((p) => (
              <span key={p} className="font-mono text-[11px] uppercase tracking-wider text-fg/40">
                {p}
              </span>
            ))}
            <span className="font-mono text-[11px] text-lime/60">+ qualquer processo</span>
          </div>
        </div>

        {/* RIGHT — the product, working */}
        <div className="relative">
          <AgentTerminal />
          <p className="mt-3 text-right font-mono text-[10px] text-fg/30">
            execução real de um agente financeiro
          </p>
        </div>
      </div>
    </section>
  );
}
