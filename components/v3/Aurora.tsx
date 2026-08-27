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
export default function Aurora({
  junction = 0.42,
  horizonAt = 0.63,
  intensity = 1,
  planet = true,
}: {
  /** onde o verde encontra o roxo (0 = esquerda, 1 = direita) */
  junction?: number;
  /** altura do arco (ou da base dos feixes, sem planeta) dentro do canvas */
  horizonAt?: number;
  /** multiplicador geral de brilho */
  intensity?: number;
  /** false = só os feixes, sem a circunferência nem o rim light */
  planet?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // só anima enquanto estiver na tela — poupa bateria e deixa duas
    // instâncias coexistirem sem custo
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(canvas);

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

    // ponto onde o verde encontra o roxo — o "encontro das luzes".
    // É a referência para cor, altura do feixe, bloom e estouro do rim.
    const JUNCTION = junction;

    // cor da cortina por posição horizontal: lime → branco-esverdeado → periwinkle
    const rayColor = (p: number) => {
      if (p < JUNCTION) {
        const k = p / JUNCTION;
        return [
          Math.round(191 + (232 - 191) * k),
          Math.round(242 + (255 - 242) * k),
          Math.round(78 + (200 - 78) * k),
        ];
      }
      const k = (p - JUNCTION) / (1 - JUNCTION);
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
      // fora da tela: mantém o loop vivo mas não pinta nada
      if (!visible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const t = reduce ? 6 : (performance.now() - start) / 1000;

      // entrada em duas camadas:
      //  · brilho — easeOutCubic, 2.2s
      //  · subida do planeta — easeOutQuart, 3.0s, para assentar DEPOIS da luz
      const FADE = 2.2;
      const RISE = 3.0;
      const intro = reduce ? 1 : Math.min(1, t / FADE);
      const ease = (1 - Math.pow(1 - intro, 3)) * intensity;

      const introRise = reduce ? 1 : Math.min(1, t / RISE);
      const easeRise = 1 - Math.pow(1 - introRise, 4);
      // começa 17% mais baixo e sobe até a posição final
      const riseFrac = (1 - easeRise) * 0.17;

      // geometria do planeta: só a calota superior aparece.
      // 0.63 do canvas (118vh) ≈ 74vh → o arco fica visível na primeira tela.
      const horizon = h * (horizonAt + riseFrac);
      const R = w * 1.45;            // raio grande → curva suave
      const cx = w / 2;
      const cy = horizon + R;

      ctx.clearRect(0, 0, w, h);

      /* ---- 1. estrelas ---- */
      for (const s of stars) {
        const a = s.a * (0.62 + 0.38 * Math.sin(t * 0.7 + s.tw)) * ease;
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
      // as cortinas sobem junto com o planeta, senão a luz descola do arco
      const oHorizon = oh * (horizonAt + riseFrac);

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
        // pico exatamente na junção das duas cores: é onde as luzes se fundem
        // e onde nasce a sensação de grandeza. Gaussiana em vez de rampa linear
        // → o pico fica definido e as laterais caem suaves.
        const d = (p - JUNCTION) / 0.3;
        const peak = Math.exp(-d * d);
        // as cortinas também crescem na entrada, não só clareiam
        const rayH =
          oHorizon * Math.max(0.2, hv) * (0.58 + 1.15 * peak) * (0.55 + 0.45 * ease);

        const x = p * ow + sway * 0.5;
        const [r, g, b] = rayColor(p);

        // brilho de cada cortina oscila individualmente
        const flick = 0.8 + 0.2 * Math.sin(t * 0.5 + i * 0.63);

        // base das cortinas abaixo do horizonte: a luz nasce de mais fundo,
        // atrás do arco, e o brilho encosta na borda do planeta
        const baseDrop = oh * 0.1;
        const top = oHorizon - rayH + baseDrop;
        const bottom = oHorizon + oh * 0.05 + baseDrop;

        const grad = octx.createLinearGradient(0, top, 0, bottom);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        if (planet) {
          // o planeta corta a base, então ela pode terminar cheia
          grad.addColorStop(0.45, `rgba(${r},${g},${b},${0.42 * flick})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},${1.0 * flick})`);
        } else {
          // sem planeta não há o que cortar: a cortina precisa apagar sozinha
          // embaixo, senão fica com corte reto no ar
          grad.addColorStop(0.4, `rgba(${r},${g},${b},${0.4 * flick})`);
          grad.addColorStop(0.82, `rgba(${r},${g},${b},${0.95 * flick})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        }

        octx.fillStyle = grad;
        // largura MENOR que o espaçamento → sobra vão escuro entre as cortinas,
        // que é o que faz ler como estria de aurora e não como mancha
        const bw = (ow / N) * 0.44;
        octx.fillRect(x - bw / 2, top, bw, bottom - top);
      }

      // ampliar com blur: o upscale + filtro é o que "derrete" as faixas em aurora
      ctx.save();
      ctx.filter = "blur(9px) saturate(1.25)";
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = ease;
      ctx.drawImage(off, 0, 0, w, h);
      ctx.restore();

      /* ---- 2b. bloom no encontro das duas luzes ---- */
      // somado por cima das cortinas e ANTES do planeta, para o arco recortá-lo.
      // É o que dá a escala: o ponto de fusão estoura em branco.
      const bx = w * JUNCTION;
      const by = horizon;
      const br = Math.max(w, h) * 0.42;
      const bloom = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      const pulse = (0.86 + 0.14 * Math.sin(t * 0.42)) * (planet ? 1 : 0.55);
      bloom.addColorStop(0, `rgba(236,255,208,${0.3 * pulse})`);
      bloom.addColorStop(0.28, `rgba(214,240,215,${0.14 * pulse})`);
      bloom.addColorStop(0.62, `rgba(176,172,255,${0.05 * pulse})`);
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = ease;
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // sem planeta, o desenho termina aqui: só estrelas, cortinas e bloom
      if (!planet) {
        if (!reduce) raf = requestAnimationFrame(draw);
        return;
      }

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
      // o estouro branco do rim cai na mesma junção das cortinas
      const rim = ctx.createLinearGradient(0, 0, w, 0);
      rim.addColorStop(0, "rgba(191,242,78,0.28)");
      rim.addColorStop(JUNCTION - 0.16, "rgba(214,250,150,0.88)");
      rim.addColorStop(JUNCTION, "rgba(255,255,255,1)");
      rim.addColorStop(JUNCTION + 0.2, "rgba(178,175,255,0.86)");
      rim.addColorStop(1, "rgba(144,138,255,0.28)");

      // halo largo
      ctx.save();
      ctx.filter = "blur(13px)";
      ctx.strokeStyle = rim;
      ctx.lineWidth = 7;
      ctx.globalAlpha = ease;
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI * 1.16, Math.PI * 1.84);
      ctx.stroke();
      ctx.restore();

      // linha nítida
      ctx.save();
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1.15;
      ctx.globalAlpha = 0.92 * ease;
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
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [junction, horizonAt, intensity, planet]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
