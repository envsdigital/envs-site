"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/v3/Content";

/**
 * HUD fixo nos cantos — nunca sai da tela enquanto a cena passa por trás.
 * O rótulo superior esquerdo reage ao progresso do scroll, como no
 * "SCROLL TO DIVE IN → KEEP GOING" da referência.
 */
export function Hud() {
  const { WA_URL } = useContent();
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const status = p < 0.02 ? "ROLE PARA ENTRAR" : p > 0.94 ? "VAMOS CONVERSAR" : "CONTINUE";

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
        {/* em tela estreita o rótulo de status sai: sobram logo e CTA */}
        <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fg/85 sm:inline">
          {status}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/envs-wordmark.svg" alt="envs" className="h-[13px] w-auto opacity-90 sm:h-[15px]" />
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="pointer-events-auto font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fg/85 transition hover:text-lime"
        >
          Agendar call
        </a>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-end justify-between px-4 py-4 sm:px-8 sm:py-6">
        <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fg/55 sm:inline">
          envs.com.br
        </span>

        {/* barra de progresso, no lugar do visualizador de áudio da referência */}
        <div className="flex items-end gap-[3px]" aria-hidden>
          {Array.from({ length: 22 }).map((_, i) => {
            const on = i / 22 <= p;
            return (
              <span
                key={i}
                className="w-[2px] transition-all duration-300"
                style={{
                  height: `${on ? 6 + Math.sin(i * 1.7) * 3 + 8 : 4}px`,
                  background: on ? "#bff24e" : "rgba(245,245,245,0.18)",
                }}
              />
            );
          })}
        </div>

        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fg/55">
          {String(Math.round(p * 100)).padStart(2, "0")}%
        </span>
      </div>
    </>
  );
}
