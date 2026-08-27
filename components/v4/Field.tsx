"use client";

import { useEffect, useRef } from "react";

/**
 * Terreno de partículas em perspectiva — a cena única por onde a câmera voa
 * durante todo o scroll da página.
 *
 * Projeção 3D feita à mão em canvas 2D (mais leve e previsível que puxar
 * three.js só para um campo de pontos):
 *
 *   sx = cx + (x / z) * focal
 *   sy = cy + (y / z) * focal
 *
 * Camadas:
 *   1. malha do terreno — grade de pontos com altura por soma de senoides,
 *      cor variando com a altura (verde escuro → lime)
 *   2. poeira — partículas soltas acima do terreno
 *   3. aberração cromática — só nas bordas, onde a lente "erra"
 *
 * A câmera avança com o scroll; o terreno é infinito por wrap no eixo z.
 */
export default function Field() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // camada de brilho: meia resolução + blur na hora de compor.
    // Desenhar blocos translúcidos direto no canvas principal deixa quadrados
    // de borda dura perto da câmera e faz moiré com o passo da grade.
    const glowCv = document.createElement("canvas");
    const gctx = glowCv.getContext("2d");
    if (!gctx) return;

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glowCv.width = Math.max(1, Math.round(w / 2));
      glowCv.height = Math.max(1, Math.round(h / 2));
      gctx.setTransform(0.5, 0, 0, 0.5, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ---- geometria do terreno ----
    const COLS = 76;        // largura da grade
    const ROWS = 130;       // profundidade
    const SPACING = 26;     // distância entre pontos
    const DEPTH = ROWS * SPACING;
    const EYE = 70;         // altura da câmera sobre o terreno

    // poeira flutuante
    const DUST = 520;
    const dust = Array.from({ length: DUST }, () => ({
      x: (Math.random() - 0.5) * COLS * SPACING * 1.3,
      y: -Math.random() * 420 - 10,
      z: Math.random() * DEPTH,
      s: Math.random() * 0.7 + 0.5,
    }));

    // altura do terreno num ponto — duas senoides cruzadas = dunas irregulares
    const heightAt = (x: number, z: number, t: number) =>
      Math.sin(x * 0.0055 + t * 0.11) * 34 +
      Math.sin(z * 0.0042 - t * 0.08) * 46 +
      Math.sin((x + z) * 0.0026 + t * 0.05) * 26;

    let camZ = 0;
    let targetZ = 0;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      // a câmera percorre várias voltas do terreno ao longo da página
      targetZ = p * DEPTH * 3.1;
    };
    onScroll();
    camZ = targetZ;
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let alive = true;
    const t0 = performance.now();

    const draw = () => {
      if (!alive) return;
      const t = reduce ? 4 : (performance.now() - t0) / 1000;

      // suaviza o avanço da câmera
      camZ += (targetZ - camZ) * 0.075;

      const focal = h * 0.86;
      const cx = w / 2;
      const cy = h * 0.52;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      /* ---- 1. terreno, em duas passadas ----
         glow: manchas largas somadas num buffer que é borrado ao compor →
               a luminosidade de musgo
         dots: pontos nítidos por cima → a granulação
         Sem a primeira passada o terreno lê como matriz de pontos, não como
         paisagem. */
      gctx.clearRect(0, 0, w, h);
      gctx.globalCompositeOperation = "lighter";
      ctx.globalCompositeOperation = "lighter";

      for (let pass = 0; pass < 2; pass++) {
        const glow = pass === 0;
        const c2 = glow ? gctx : ctx;
        for (let r = ROWS - 1; r >= 0; r--) {
          const z = ((r * SPACING - camZ) % DEPTH + DEPTH) % DEPTH;
          if (z < 24) continue;

          const fade = 1 - z / DEPTH;
          if (fade < 0.02) continue;
          const scale = focal / z;

          // a passada de brilho pode pular pontos: é borrada mesmo
          const step = glow ? 2 : 1;
          for (let c = 0; c < COLS; c += step) {
            const x = (c - COLS / 2) * SPACING;
            const y = EYE + heightAt(x, r * SPACING, t);

            const sx = cx + x * scale;
            if (sx < -90 || sx > w + 90) continue;
            const sy = cy + y * scale;
            if (sy < -90 || sy > h + 90) continue;

            // altura normalizada → cor: vale escuro, cume lime
            const hn = Math.min(1, Math.max(0, (EYE + 106 - y) / 212));

            if (glow) {
              const a = fade * fade * (0.07 + hn * 0.2);
              if (a < 0.006) continue;
              const rad = Math.min(90, Math.max(3, scale * 26));
              c2.fillStyle = `rgba(${Math.round(60 + hn * 120)},${Math.round(120 + hn * 110)},${Math.round(20 + hn * 45)},${a})`;
              c2.fillRect(sx - rad / 2, sy - rad / 2, rad, rad);
            } else {
              const a = fade * fade * (0.2 + hn * 0.8);
              if (a < 0.012) continue;
              const size = Math.min(4.5, Math.max(0.7, scale * 1.7));
              c2.fillStyle = `rgba(${Math.round(52 + hn * 168)},${Math.round(158 + hn * 88)},${Math.round(22 + hn * 62)},${a})`;
              c2.fillRect(sx, sy, size, size);

              // aberração cromática nas bordas
              const off = (sx - cx) / (w / 2);
              if (Math.abs(off) > 0.62 && size > 1.1) {
                c2.fillStyle = `rgba(255,80,60,${a * 0.4})`;
                c2.fillRect(sx + off * 2.6, sy, size, size);
                c2.fillStyle = `rgba(70,140,255,${a * 0.4})`;
                c2.fillRect(sx - off * 2.6, sy, size, size);
              }
            }
          }
        }

        // compõe o brilho borrado antes de desenhar os pontos nítidos por cima
        if (glow) {
          ctx.filter = "blur(16px)";
          ctx.drawImage(glowCv, 0, 0, w, h);
          ctx.filter = "none";
        }
      }

      /* ---- 2. poeira ---- */
      for (const d of dust) {
        let z = ((d.z - camZ) % DEPTH + DEPTH) % DEPTH;
        if (z < 18) continue;
        const fade = 1 - z / DEPTH;
        if (fade < 0.02) continue;
        const scale = focal / z;

        const sx = cx + d.x * scale;
        if (sx < -20 || sx > w + 20) continue;
        const sy = cy + (d.y + Math.sin(t * 0.4 + d.z * 0.01) * 12) * scale;
        if (sy < -20 || sy > h + 20) continue;

        // teto: sem ele a poeira mais próxima vira quadradão na tela
        const size = Math.min(3.4, Math.max(0.7, scale * 2.1 * d.s));
        const a = fade * fade * 0.95;
        ctx.fillStyle = `rgba(226,240,190,${a})`;
        ctx.fillRect(sx, sy, size, size);

        const off = (sx - cx) / (w / 2);
        if (Math.abs(off) > 0.7 && size > 1.4) {
          ctx.fillStyle = `rgba(255,90,70,${a * 0.5})`;
          ctx.fillRect(sx + off * 3.4, sy, size, size);
          ctx.fillStyle = `rgba(80,150,255,${a * 0.5})`;
          ctx.fillRect(sx - off * 3.4, sy, size, size);
        }
      }

      /* ---- 3. névoa: escurece o horizonte e o topo ----
         volta ao modo normal: em "lighter" a névoa clarearia em vez de
         escurecer, e o clear do frame seguinte somaria em vez de limpar. */
      ctx.globalCompositeOperation = "source-over";
      const fog = ctx.createLinearGradient(0, 0, 0, h);
      fog.addColorStop(0, "rgba(5,5,5,0.96)");
      fog.addColorStop(0.34, "rgba(5,5,5,0.35)");
      fog.addColorStop(0.52, "rgba(5,5,5,0)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden
    />
  );
}
