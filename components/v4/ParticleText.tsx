"use client";

import { useEffect, useRef } from "react";

/**
 * Texto que se monta de partículas conforme a página rola.
 *
 * O texto é desenhado uma vez num canvas fora da tela; os pixels acesos
 * viram os alvos das partículas. A posição de cada uma é interpolada entre
 * o ponto espalhado e o alvo por um fator que sai da posição do bloco na
 * viewport: espalhado ao entrar por baixo, formado no centro, espalhado de
 * novo ao sair por cima. Como tudo vem do scroll e nada de um relógio, o
 * movimento é reversível — subir a página desfaz o texto.
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
    let visible = false;
    let built = false;
    let parts: {
      tx: number; ty: number;   // alvo
      sx: number; sy: number;   // ponto espalhado
      d: number;                // atraso: escalona a chegada
      m: number;                // 0..1 → lime→peri ao longo da linha
    }[] = [];
    let dpr = 1;
    let W = 0, H = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.offsetWidth;

      // a família precisa vir resolvida: `var(--font-inter)` invalida a string
      // inteira em canvas e o desenho cai no padrão de 10px
      const fam = getComputedStyle(host).fontFamily || "sans-serif";

      /* Mede a frase de verdade em vez de supor 0.56em por caractere. A média
         erra para mais em frases com muitas maiúsculas ou acentos, e o que
         sobra passa da borda e é cortado. */
      const probe = document.createElement("canvas").getContext("2d");
      if (!probe) return;
      probe.font = `500 100px ${fam}`;
      const w100 = probe.measureText(text).width || 1;
      const fs = Math.min(max * 16, (W * bleed * 100) / w100);

      // altura da caixa acompanha a fonte, com folga pra acentos e descidas
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
            sx: x + (Math.random() - 0.5) * W * 0.5,
            sy: y + (Math.random() - 0.5) * H * 4,
            d: Math.random() * 0.34,
            m: gradient ? x / Math.max(1, W) : 0,
          });
        }
      }
      parts = next;
      built = true;
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || !built) return;

      /* fator de formação, tirado da posição do bloco na viewport:
         entra por baixo → 0, formado no miolo, desfeito ao sair por cima.
         O platô é largo de propósito — cobre de 18% a 82% da altura da
         tela. Com uma faixa estreita a frase só ficava legível no ponto
         exato da rolagem, e ninguém consegue parar ali. */
      const r = host.getBoundingClientRect();
      const v = (r.top + r.height / 2) / window.innerHeight;
      const off = Math.abs(v - 0.5);
      const form = reduce
        ? 1
        : 1 - Math.min(1, Math.max(0, (off - 0.32) / 0.16));

      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const p of parts) {
        // cada partícula tem seu próprio trecho do percurso
        const pi = Math.min(1, Math.max(0, (form - p.d) / (1 - p.d)));
        const e = pi * pi * (3 - 2 * pi);   // smoothstep

        // deriva lenta enquanto está solta, pra não parecer congelada
        const drift = (1 - e) * 6;
        const x = p.sx + (p.tx - p.sx) * e + Math.sin(t * 0.7 + p.d * 20) * drift;
        const y = p.sy + (p.ty - p.sy) * e + Math.cos(t * 0.6 + p.d * 26) * drift;

        const cr = LIME[0] + (PERI[0] - LIME[0]) * p.m;
        const cg = LIME[1] + (PERI[1] - LIME[1]) * p.m;
        const cb = LIME[2] + (PERI[2] - LIME[2]) * p.m;
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${(0.12 + 0.88 * e).toFixed(3)})`;
        ctx.fillRect(x, y, 1.7, 1.7);
      }

      ctx.globalCompositeOperation = "source-over";
    };

    // amostrar antes da fonte carregar produz o recorte da fonte de sistema
    if (document.fonts?.ready) document.fonts.ready.then(build);
    else build();

    // o laço só roda enquanto o bloco está por perto
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { rootMargin: "20% 0px" }
    );
    io.observe(host);
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      built = false;
      build();
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
