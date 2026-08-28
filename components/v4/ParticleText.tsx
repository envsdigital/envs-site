"use client";

import { useEffect, useRef } from "react";

/**
 * Texto que se monta de partículas ao entrar na tela.
 *
 * O texto é desenhado uma vez num canvas fora da tela; os pixels acesos
 * viram os alvos das partículas, que entram espalhadas e convergem para o
 * seu lugar. Depois de assentar, cada uma respira de leve — parado demais
 * denunciaria que virou imagem.
 *
 * O texto real fica num filho visualmente escondido, para leitor de tela e
 * para busca: o canvas é decorativo.
 */

const LIME = [191, 242, 78];
const PERI = [144, 138, 255];

export function ParticleText({
  text,
  align = "left",
  bleed = 1,
  max = 11,
  gradient = true,
  className = "",
}: {
  text: string;
  align?: "left" | "right" | "center";
  /** mesma conta do fitSize: a fonte sai do comprimento da frase */
  bleed?: number;
  max?: number;
  /** false = tudo em lime; true = lime→peri ao longo da linha */
  gradient?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = wrap.current;
    const canvas = cv.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let started = false;
    let parts: {
      tx: number; ty: number; x: number; y: number; vx: number; vy: number; m: number;
    }[] = [];
    let t0 = 0;
    let dpr = 1;
    let W = 0, H = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.offsetWidth;
      // altura da caixa acompanha a fonte, com folga pra acentos e descidas
      const fs = Math.min(
        max * 16,
        (W * bleed) / (text.length * 0.56)
      );
      H = Math.ceil(fs * 1.32);
      host.style.height = `${H}px`;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // desenha o texto uma vez e lê os pixels acesos
      const off = document.createElement("canvas");
      off.width = Math.max(1, W);
      off.height = Math.max(1, H);
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.fillStyle = "#fff";
      octx.textBaseline = "middle";
      octx.textAlign = align === "right" ? "right" : align === "center" ? "center" : "left";
      // a família precisa vir resolvida: `var(--font-inter)` invalida a string
      // inteira em canvas e o desenho cai no padrão de 10px
      const fam = getComputedStyle(host).fontFamily || "sans-serif";
      octx.font = `500 ${fs}px ${fam}`;
      octx.fillText(text, align === "right" ? W : align === "center" ? W / 2 : 0, H / 2);

      const data = octx.getImageData(0, 0, off.width, off.height).data;
      // passo maior em tela pequena: a contagem de partículas cresce com a área
      const gap = W > 1100 ? 4 : 3;
      const next: typeof parts = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * off.width + x) * 4 + 3] < 128) continue;
          next.push({
            tx: x,
            ty: y,
            x: reduce ? x : x + (Math.random() - 0.5) * W * 0.9,
            y: reduce ? y : y + (Math.random() - 0.5) * H * 7,
            vx: 0,
            vy: 0,
            m: gradient ? x / Math.max(1, W) : 0,
          });
        }
      }
      parts = next;
    };

    const draw = () => {
      const el = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const p of parts) {
        // mola crítica: acelera pro alvo e amortece
        p.vx = (p.vx + (p.tx - p.x) * 0.045) * 0.86;
        p.vy = (p.vy + (p.ty - p.y) * 0.045) * 0.86;
        p.x += p.vx;
        p.y += p.vy;

        // respiro depois de assentar
        const br = el > 1.6 ? Math.sin(el * 1.7 + p.tx * 0.05) * 0.5 : 0;

        const cr = LIME[0] + (PERI[0] - LIME[0]) * p.m;
        const cg = LIME[1] + (PERI[1] - LIME[1]) * p.m;
        const cb = LIME[2] + (PERI[2] - LIME[2]) * p.m;
        // entra apagada e acende conforme chega
        const near = 1 - Math.min(1, Math.hypot(p.tx - p.x, p.ty - p.y) / 90);
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${0.35 + 0.65 * near})`;
        ctx.fillRect(p.x, p.y + br, 1.7, 1.7);
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (started) return;
      started = true;
      const go = () => {
        build();
        t0 = performance.now();
        raf = requestAnimationFrame(draw);
      };
      // amostrar antes da fonte carregar produz o recorte da fonte de sistema
      if (document.fonts?.ready) document.fonts.ready.then(go);
      else go();
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "-10% 0px" }
    );
    io.observe(host);

    const onResize = () => {
      if (!started) return;
      cancelAnimationFrame(raf);
      build();
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [text, align, bleed, max, gradient]);

  return (
    <div ref={wrap} className={`relative w-full ${className}`}>
      <canvas ref={cv} aria-hidden className="absolute inset-0 h-full w-full" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
