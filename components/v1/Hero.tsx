"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/data/site";
import { CtaButton } from "@/components/Chrome";

/**
 * Canvas particle field: lime particles drift in a dark void and assemble into
 * the envs speech-bubble mark (sampled from the real SVG), pulsing like a
 * heartbeat, with a slow push-in. Replaces the pack's Seedance hero clip.
 */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;

    type P = {
      x: number; y: number;       // current
      tx: number; ty: number;     // target (normalized -0.5..0.5, glyph space)
      phase: number; speed: number;
      ambient: boolean; c: string;
    };
    const particles: P[] = [];
    const LIME = "#bff24e";
    const PERI = "#908aff";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const img = new Image();
    img.src = "/logos/envs-bubble.svg";
    img.onload = () => {
      if (disposed) return;
      // sample the bubble silhouette
      const S = 150;
      const off = document.createElement("canvas");
      off.width = S; off.height = S;
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, S, S);
      const data = octx.getImageData(0, 0, S, S).data;
      const targets: [number, number][] = [];
      for (let y = 0; y < S; y += 2) {
        for (let x = 0; x < S; x += 2) {
          if (data[(y * S + x) * 4 + 3] > 100) targets.push([x / S - 0.5, y / S - 0.5]);
        }
      }
      // glyph particles
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      const max = Math.min(targets.length, 900);
      for (let i = 0; i < max; i++) {
        const [tx, ty] = targets[Math.floor((i / max) * targets.length)];
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          tx, ty,
          phase: Math.random() * Math.PI * 2,
          speed: 0.035 + Math.random() * 0.045,
          ambient: false,
          c: Math.random() < 0.1 ? PERI : LIME,
        });
      }
      // ambient drifters
      for (let i = 0; i < 110; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          tx: Math.random(), ty: Math.random(),
          phase: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.3,
          ambient: true,
          c: Math.random() < 0.25 ? PERI : LIME,
        });
      }
    };

    const t0 = performance.now();
    const draw = () => {
      if (disposed) return;
      const t = (performance.now() - t0) / 1000;
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h * 0.5;
      const pushIn = 0.92 + 0.08 * Math.min(t / 6, 1);           // slow push-in
      const pulse = 1 + 0.045 * Math.sin(t * 1.7);                // heartbeat
      // large faint watermark behind the headline
      const size = Math.min(w, h) * 1.15 * pushIn * pulse;

      for (const p of particles) {
        if (p.ambient) {
          p.x += Math.sin(t * 0.3 + p.phase) * 0.12 * p.speed * 3;
          p.y -= 0.06 * p.speed * 3;
          if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
          ctx.globalAlpha = 0.22 + 0.15 * Math.sin(t + p.phase);
          ctx.fillStyle = p.c;
          ctx.fillRect(p.x, p.y, 1.4, 1.4);
        } else {
          const jx = Math.sin(t * 1.2 + p.phase) * 1.6;
          const jy = Math.cos(t * 1.4 + p.phase) * 1.6;
          const gx = cx + p.tx * size + jx;
          const gy = cy + p.ty * size + jy;
          p.x += (gx - p.x) * p.speed;
          p.y += (gy - p.y) * p.speed;
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = p.c;
          ctx.fillRect(p.x, p.y, 1.7, 1.7);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

const pillPos = [
  "left-5 top-24 md:left-14 md:top-32",
  "right-5 top-24 md:right-14 md:top-36",
  "left-5 bottom-24 hidden md:block md:left-20 md:bottom-32",
  "right-5 bottom-24 hidden md:block md:right-20 md:bottom-28",
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(191,242,78,0.10), transparent 65%), radial-gradient(ellipse 40% 35% at 60% 40%, rgba(144,138,255,0.08), transparent 70%)",
        }}
      />
      <ParticleField />

      {hero.pills.map((p, i) => (
        <span
          key={p}
          className={`floaty absolute z-10 rounded-full border border-white/12 bg-surface/70 px-4 py-1.5 text-xs font-medium text-fg/80 backdrop-blur-sm ${pillPos[i]}`}
          style={{ animationDelay: `${i * 0.9}s` }}
        >
          <span className="pulsedot mr-2 inline-block h-1.5 w-1.5 rounded-full bg-lime align-middle" />
          {p}
        </span>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <p className="eyebrow mb-6">{hero.eyebrow}</p>
        <h1 className="display text-[clamp(2.4rem,7vw,5.4rem)]">
          {hero.headline.map((line, i) => (
            <span key={i} className={i === hero.headline.length - 1 ? "block text-lime" : "block"}>
              {line}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-base text-fg/70 md:text-lg">{hero.sub}</p>
        <div className="mt-9">
          <CtaButton>{hero.cta}</CtaButton>
        </div>
        <p className="mt-6 text-xs text-fg/50">
          {hero.trust.map((t, i) => (
            <span key={t}>
              <span className="mr-1 text-lime">✓</span>
              {t}
              {i < hero.trust.length - 1 && <span className="mx-2.5 text-fg/30">·</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
