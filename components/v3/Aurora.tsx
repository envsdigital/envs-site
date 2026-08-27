"use client";

import { useEffect, useRef } from "react";

/**
 * Aurora sobre o limbo de um planeta.
 *
 * Camadas, na ordem em que são pintadas:
 *   1. estrelas
 *   2. cortinas de luz ondulando (verde → branco → roxo), desenhadas fora de tela
 *      em meia resolução e ampliadas com blur — é o que dá o aspecto de aurora
 *   3. o planeta: círculo escuro opaco que OCLUDE as cortinas, criando o efeito
 *      de a luz emergir por trás do arco
 *   4. rim light: traço com gradiente seguindo a curva + halo
 *
 * Substitui o vídeo MP4 que a referência usa: nítido em qualquer resolução,
 * sem bytes de vídeo, e ajustável por parâmetro.
 */
export default function Aurora() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // offscreen em meia resolução para as cortinas
    const off = document.createElement("canvas");
    const octx = off.getContext("2d")!;

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      off.width = Math.max(1, Math.round(w / 2));
      off.height = Math.max(1, Math.round(h / 2));
    };
    resize();
    window.addEventListener("resize", resize);

    // estrelas fixas
    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.72,
      r: Math.random() * 0.9 + 0.35,
      a: Math.random() * 0.5 + 0.25,
      tw: Math.random() * Math.PI * 2,
    }));

    // cor da cortina por posição horizontal: lime → branco-esverdeado → periwinkle
    const rayColor = (p: number) => {
      if (p < 0.42) {
        const k = p / 0.42;
        return [
          Math.round(191 + (232 - 191) * k),
          Math.round(242 + (255 - 242) * k),
          Math.round(78 + (200 - 78) * k),
        ];
      }
      const k = (p - 0.42) / 0.58;
      return [
        Math.round(232 + (144 - 232) * k),
        Math.round(255 + (138 - 255) * k),
        Math.round(200 + (255 - 200) * k),
      ];
    };

    let raf = 0;
    let start = performance.now();
    let alive = true;

    const draw = () => {
      if (!alive) return;
      const t = reduce ? 6 : (performance.now() - start) / 1000;

      // geometria do planeta: só a calota superior aparece.
      // 0.63 do canvas (118vh) ≈ 74vh → o arco fica visível na primeira tela.
      const horizon = h * 0.63;
      const R = w * 1.45;            // raio grande → curva suave
      const cx = w / 2;
      const cy = horizon + R;

      ctx.clearRect(0, 0, w, h);

      /* ---- 1. estrelas ---- */
      for (const s of stars) {
        const a = s.a * (0.62 + 0.38 * Math.sin(t * 0.7 + s.tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* ---- 2. cortinas de luz (offscreen, meia resolução) ---- */
      const ow = off.width, oh = off.height;
      octx.clearRect(0, 0, ow, oh);
      const oHorizon = oh * 0.63;

      const N = 96;
      for (let i = 0; i < N; i++) {
        const p = i / (N - 1);
        // ondulação: duas senoides de períodos diferentes = movimento orgânico
        const sway =
          Math.sin(t * 0.34 + i * 0.09) * 15 +
          Math.sin(t * 0.19 + i * 0.037) * 24 +
          Math.sin(t * 0.11 + i * 0.014) * 12;

        // altura da cortina varia ao longo da largura e no tempo
        const hv =
          0.62 +
          0.3 * Math.sin(i * 0.052 + t * 0.23) +
          0.18 * Math.sin(i * 0.121 - t * 0.15);
        // mais intensa no centro (onde o rim estoura), como na referência
        const center = 1 - Math.abs(p - 0.46) * 1.5;
        const rayH = oHorizon * Math.max(0.2, hv) * (0.7 + 0.6 * Math.max(0, center));

        const x = p * ow + sway * 0.5;
        const [r, g, b] = rayColor(p);

        // brilho de cada cortina oscila individualmente
        const flick = 0.62 + 0.38 * Math.sin(t * 0.5 + i * 0.63);

        const grad = octx.createLinearGradient(0, oHorizon - rayH, 0, oHorizon + oh * 0.05);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${0.16 * flick})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},${0.72 * flick})`);

        octx.fillStyle = grad;
        // largura MENOR que o espaçamento → sobra vão escuro entre as cortinas,
        // que é o que faz ler como estria de aurora e não como mancha
        const bw = (ow / N) * 0.44;
        octx.fillRect(x - bw / 2, oHorizon - rayH, bw, rayH + oh * 0.05);
      }

      // ampliar com blur: o upscale + filtro é o que "derrete" as faixas em aurora
      ctx.save();
      ctx.filter = "blur(9px) saturate(1.25)";
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(off, 0, 0, w, h);
      ctx.restore();

      /* ---- 3. planeta opaco: oclui as cortinas ao longo da curva ---- */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = "#0d0d0d";
      ctx.fill();
      // leve queda de luz na superfície, perto da borda
      const surf = ctx.createLinearGradient(0, horizon, 0, horizon + h * 0.3);
      surf.addColorStop(0, "rgba(255,255,255,0.05)");
      surf.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = surf;
      ctx.fill();
      ctx.restore();

      /* ---- 4. rim light seguindo a curva ---- */
      const rim = ctx.createLinearGradient(0, 0, w, 0);
      rim.addColorStop(0, "rgba(191,242,78,0.30)");
      rim.addColorStop(0.3, "rgba(214,250,150,0.85)");
      rim.addColorStop(0.47, "rgba(255,255,255,0.98)");
      rim.addColorStop(0.66, "rgba(178,175,255,0.85)");
      rim.addColorStop(1, "rgba(144,138,255,0.30)");

      // halo largo
      ctx.save();
      ctx.filter = "blur(13px)";
      ctx.strokeStyle = rim;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI * 1.16, Math.PI * 1.84);
      ctx.stroke();
      ctx.restore();

      // linha nítida
      ctx.save();
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1.15;
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI * 1.16, Math.PI * 1.84);
      ctx.stroke();
      ctx.restore();

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
