"use client";

import { useEffect, useRef } from "react";

/**
 * Cena 3D contínua da v4 — a câmera voa por um terreno de partículas
 * enquanto a página rola.
 *
 * Projeção feita à mão em canvas 2D (mais leve e previsível que puxar
 * three.js só para um campo de pontos):
 *
 *   sx = cx + (x / z) * focal
 *   sy = cy + (y / z) * focal
 *
 * São DOIS canvas. A cena fica atrás do texto (-z-10) e a poeira mais
 * próxima da câmera fica na frente dele (z-20). É essa segunda camada que
 * faz o texto parecer imerso na cena em vez de colado por cima — na
 * referência dá pra ver partículas dentro das letras.
 *
 * Camadas, de trás pra frente:
 *   1. estrias de luz radiando do ponto de fuga
 *   2. terreno — grade de pontos, altura por soma de senoides, cor
 *      variando entre as duas cores da marca
 *   3. pluma — jato de partículas subindo no horizonte
 *   4. poeira ambiente
 *   5. névoa
 *   [texto da página]
 *   6. poeira de primeiro plano (canvas separado)
 */

// as duas cores da marca. O terreno mistura as duas em faixas.
const LIME = [191, 242, 78];
const PERI = [144, 138, 255];

export default function Field() {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const fgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const fg = fgRef.current;
    if (!bg || !fg) return;
    const ctx = bg.getContext("2d", { alpha: false });
    const fctx = fg.getContext("2d");
    if (!ctx || !fctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // camada de brilho: meia resolução + blur na hora de compor.
    // Desenhar blocos translúcidos direto no canvas principal deixa
    // quadrados de borda dura perto da câmera e faz moiré com o passo da grade.
    const glowCv = document.createElement("canvas");
    const gctx = glowCv.getContext("2d");
    if (!gctx) return;

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = bg.offsetWidth;
      h = bg.offsetHeight;
      for (const cv of [bg, fg]) {
        cv.width = w * dpr;
        cv.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glowCv.width = Math.max(1, Math.round(w / 2));
      glowCv.height = Math.max(1, Math.round(h / 2));
      gctx.setTransform(0.5, 0, 0, 0.5, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---- geometria do terreno ----
       A densidade cai em tela pequena: a mesma grade que roda folgado num
       desktop derruba o frame rate num celular, e ninguém vê 76 colunas em
       400px de largura mesmo. */
    const small = window.innerWidth < 720;
    const COLS = small ? 44 : 76;   // largura da grade
    const ROWS = small ? 84 : 130;  // profundidade
    const SPACING = 26;             // distância entre pontos
    const DEPTH = ROWS * SPACING;
    const EYE = 70;                 // altura da câmera sobre o terreno

    /* O mar: partículas em volume ao redor da câmera, não um chão.
       É o que dá o que atravessar — o terreno sozinho só passa por baixo. */
    const sea = Array.from({ length: small ? 340 : 820 }, () => ({
      x: (Math.random() - 0.5) * 3600,
      y: (Math.random() - 0.5) * 2400,
      z: Math.random() * DEPTH,
      s: Math.random() * 0.8 + 0.4,
      peri: Math.random() < 0.34,
    }));

    // poeira ambiente
    const dust = Array.from({ length: small ? 240 : 520 }, () => ({
      x: (Math.random() - 0.5) * COLS * SPACING * 1.3,
      y: -Math.random() * 420 - 10,
      z: Math.random() * DEPTH,
      s: Math.random() * 0.7 + 0.5,
      peri: Math.random() < 0.3,
    }));

    // pluma: jato que sobe no horizonte. z fixo à frente da câmera, então
    // acompanha o voo em vez de ficar pra trás.
    const plume = Array.from({ length: small ? 140 : 300 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random() * Math.random() * 340,
      y: Math.random() * 620,
      z: 640 + Math.random() * 620,
      v: 0.4 + Math.random() * 1.5,
      s: Math.random() * 0.6 + 0.4,
      peri: Math.random() < 0.42,
    }));

    // poeira de primeiro plano: passa entre a câmera e o texto.
    // Muitas e pequenas — poucas e grandes viram bolhas verdes na frente da copy.
    const near = Array.from({ length: small ? 90 : 220 }, () => ({
      x: (Math.random() - 0.5) * 2400,
      y: (Math.random() - 0.5) * 1500,
      z: 40 + Math.random() * 470,
      s: Math.random() * 0.8 + 0.35,
      peri: Math.random() < 0.38,
    }));

    // altura do terreno num ponto — senoides cruzadas = dunas irregulares
    const heightAt = (x: number, z: number, t: number) =>
      Math.sin(x * 0.0055 + t * 0.11) * 34 +
      Math.sin(z * 0.0042 - t * 0.08) * 46 +
      Math.sin((x + z) * 0.0026 + t * 0.05) * 26;

    let camZ = 0;
    let vel = 0;      // velocidade da câmera, com inércia
    let targetZ = 0;
    let targetVor = 0;   // 0 = terreno plano, 1 = vórtice
    let vor = 0;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      // a câmera percorre várias voltas do terreno ao longo da página
      // curso longo de propósito: sem distância a percorrer a velocidade
      // nunca chega a subir e não há aceleração pra sentir
      targetZ = p * DEPTH * 5.4;
      // no trecho final o terreno colapsa numa espiral
      targetVor = Math.min(1, Math.max(0, (p - 0.82) / 0.13));
    };
    onScroll();
    camZ = targetZ;
    window.addEventListener("scroll", onScroll, { passive: true });

    // paralaxe de cursor: desloca o ponto de fuga, o que inclina a cena inteira
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    // posição em pixels, para o halo que acende o terreno sob o ponteiro
    let px = -9999, py = -9999;
    const onMove = (e: PointerEvent) => {
      tmx = (e.clientX / window.innerWidth) * 2 - 1;
      tmy = (e.clientY / window.innerHeight) * 2 - 1;
      px = e.clientX;
      py = e.clientY;
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    /* ---- clique: efeito diferente conforme o trecho da página ----
       1. abertura  → onda de choque atravessando o terreno
       2. meio      → anel de luz que se abre a partir do ponto do clique
       3. números   → a cena inteira vira lavanda por um instante
       4. vórtice   → pulso que acelera o giro e abre a espiral */
    const ripples: { x: number; y: number; t0: number }[] = [];
    const rings: { x: number; y: number; t0: number }[] = [];
    let flash = 0;
    let pulse = 0;
    let spinBoost = 0;

    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      const max = document.body.scrollHeight - window.innerHeight;
      const prog = max > 0 ? window.scrollY / max : 0;

      if (prog < 0.18) {
        ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() });
        if (ripples.length > 4) ripples.shift();
      } else if (prog < 0.55) {
        rings.push({ x: e.clientX, y: e.clientY, t0: performance.now() });
        if (rings.length > 5) rings.shift();
      } else if (prog < 0.8) {
        flash = 1;
      } else {
        pulse = 1;
        spinBoost = 2.4;
      }
    };
    window.addEventListener("pointerdown", onDown, { passive: true });

    let raf = 0;
    let alive = true;
    let spinPhase = 0;
    const t0 = performance.now();

    const draw = () => {
      if (!alive) return;
      const t = reduce ? 4 : (performance.now() - t0) / 1000;

      // suaviza avanço da câmera e resposta do cursor
      /* Câmera com massa: o scroll não move a câmera, puxa ela.
         A velocidade tem inércia própria, então uma rolagem rápida abre
         distância e a câmera dispara atrás; parar não freia na hora, ela
         desacelera. É daí que vem a sensação de navegar, e não de arrastar. */
      const pull = (targetZ - camZ) * 0.035;
      vel += (pull - vel) * 0.09;
      camZ += vel;
      const speed = Math.min(1, Math.abs(vel) / 40);

      vor += (targetVor - vor) * 0.05;
      mx += (tmx - mx) * 0.045;
      my += (tmy - my) * 0.045;

      // decaimento dos efeitos de clique
      flash *= 0.94;
      pulse *= 0.955;
      spinBoost *= 0.965;
      spinPhase += (0.22 + spinBoost) * 0.016;
      const spin = spinPhase;
      const now = performance.now();
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].t0 > 1800) ripples.splice(i, 1);
      }

      // a lente abre com a velocidade: o campo passa rasgando pelas bordas
      const focal = h * (0.86 - speed * 0.2);
      const cx = w / 2 + mx * 46;
      const cy = h * 0.52 + my * 26;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);
      fctx.clearRect(0, 0, w, h);

      gctx.clearRect(0, 0, w, h);
      gctx.globalCompositeOperation = "lighter";
      ctx.globalCompositeOperation = "lighter";

      /* ---- 1. estrias radiando do ponto de fuga ----
         vão no buffer de brilho: o blur é o que as transforma em raios de
         luz em vez de linhas desenhadas. */
      const diag = Math.hypot(w, h);
      for (let i = 0; i < 30; i++) {
        const a = (i / 30) * Math.PI * 2 + t * 0.015 + Math.sin(i * 2.3) * 0.4;
        const sway = 0.55 + 0.45 * Math.sin(t * 0.3 + i * 1.7);
        const r0 = diag * 0.13;
        const r1 = diag * (0.42 + 0.5 * sway);
        const peri = i % 3 === 0;
        const c = peri ? PERI : LIME;
        gctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.05 + 0.055 * sway})`;
        gctx.lineWidth = 2 + 5 * sway;
        gctx.beginPath();
        gctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
        gctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        gctx.stroke();
      }

      /* ---- 2. terreno, em duas passadas ----
         glow: manchas largas somadas no buffer borrado → luminosidade de musgo
         dots: pontos nítidos por cima → granulação
         Sem a primeira passada o terreno lê como matriz de pontos, não como
         paisagem. */
      for (let pass = 0; pass < 2; pass++) {
        const glow = pass === 0;
        const c2 = glow ? gctx : ctx;

        for (let r = ROWS - 1; r >= 0; r--) {
          const z = ((r * SPACING - camZ) % DEPTH + DEPTH) % DEPTH;
          if (z < 24) continue;

          const planeFade = 1 - z / DEPTH;
          // no vórtice a profundidade deixa de vir da fileira, então o
          // desvanecer também precisa parar de vir dela
          const fade = planeFade + (0.8 - planeFade) * vor;
          if (fade < 0.02) continue;
          const flat = focal / z;

          // a passada de brilho pode pular pontos: é borrada mesmo
          const step = glow ? 2 : 1;
          for (let c = 0; c < COLS; c += step) {
            const x = (c - COLS / 2) * SPACING;
            const wz = r * SPACING;
            const y = EYE + heightAt(x, wz, t);

            let sx: number, sy: number, scale: number;
            if (vor > 0.002) {
              // espiral: a fileira vira raio, a coluna vira ângulo
              const ang = (c / COLS) * Math.PI * 2 + (r / ROWS) * 5.5 + spin;
              // raio contido: com 1450 só a borda da espiral cabia na tela
              const rad = (70 + (r / ROWS) * 640) * (1 + pulse * 0.5);
              const vx = Math.cos(ang) * rad;
              const vy = Math.sin(ang) * rad * 0.62;
              const vz = 760 + Math.sin(ang) * rad * 0.5;
              const pz = z + (vz - z) * vor;
              if (pz < 30) continue;
              scale = focal / pz;
              sx = cx + (x + (vx - x) * vor) * scale;
              sy = cy + (y + (vy - y) * vor) * scale;
            } else {
              scale = flat;
              sx = cx + x * scale;
              sy = cy + y * scale;
            }
            // onda de choque: uma crista que se afasta do ponto do clique
            for (const rp of ripples) {
              const age = (now - rp.t0) / 1000;
              const front = age * 950;
              const dd = (Math.hypot(sx - rp.x, sy - rp.y) - front) / 130;
              if (dd > 3 || dd < -3) continue;
              sy -= Math.exp(-dd * dd) * 66 * (1 - age / 1.8);
            }

            if (sx < -90 || sx > w + 90) continue;
            if (sy < -90 || sy > h + 90) continue;

            // altura normalizada → brilho: vale escuro, cume aceso
            const hn = Math.min(1, Math.max(0, (EYE + 106 - y) / 212));

            // faixas de peri atravessando o lime, deslocando devagar
            const band = 0.5 + 0.5 * Math.sin(x * 0.0016 + wz * 0.0011 + t * 0.13);
            // o flash empurra a mistura toda pro lavanda
            const m = Math.min(1, Math.pow(band, 1.7) + flash);
            const cr = LIME[0] + (PERI[0] - LIME[0]) * m;
            const cg = LIME[1] + (PERI[1] - LIME[1]) * m;
            const cb = LIME[2] + (PERI[2] - LIME[2]) * m;

            if (glow) {
              const rad = Math.min(54, Math.max(3, scale * 26));
              // perto da câmera os pontos se afastam na tela e cada mancha
              // destaca como bolha solta em vez de somar num campo. Atenua
              // pela própria largura da mancha: quanto maior, mais isolada.
              const solo = Math.min(1, Math.max(0.04, 1 - (rad - 14) / 40));
              const a = fade * fade * (0.07 + hn * 0.2) * solo;
              if (a < 0.006) continue;
              c2.fillStyle = `rgba(${Math.round(cr * 0.62)},${Math.round(cg * 0.62)},${Math.round(cb * 0.5)},${a})`;
              c2.fillRect(sx - rad / 2, sy - rad / 2, rad, rad);
            } else {
              // no vórtice não há mais vale nem cume: acende tudo por igual
              const a = fade * fade * (0.2 + hn * 0.8) * (1 + vor * 0.9);
              if (a < 0.012) continue;
              const k = (0.32 + hn * 0.68) * (1 - vor) + vor;
              // halo do ponteiro: o terreno acende por onde o cursor passa
              const hd = Math.hypot(sx - px, sy - py);
              const lit = hd < 210 ? Math.pow(1 - hd / 210, 2) : 0;

              const size = Math.min(4.5, Math.max(0.7, scale * 1.7)) * (1 + lit * 0.9);
              const kk = Math.min(1, k + lit * 0.8);
              c2.fillStyle = `rgba(${Math.round(cr * kk)},${Math.round(cg * kk)},${Math.round(cb * kk)},${Math.min(1, a + lit * 0.55)})`;
              c2.fillRect(sx, sy, size, size);

              // aberração cromática nas bordas
              const off = (sx - cx) / (w / 2);
              if (Math.abs(off) > 0.55 && size > 1.1) {
                // sem o teto o ganho passa de 1 na borda e o terreno vira
                // confete; a velocidade escancara a franja da lente
                const g = Math.min(1, (Math.abs(off) - 0.55) * 2.6) * (1 + speed);
                c2.fillStyle = `rgba(255,80,60,${a * 0.45 * g})`;
                c2.fillRect(sx + off * 3.2, sy, size, size);
                c2.fillStyle = `rgba(70,140,255,${a * 0.45 * g})`;
                c2.fillRect(sx - off * 3.2, sy, size, size);
              }
            }
          }
        }

        // compõe o brilho borrado antes dos pontos nítidos
        if (glow) {
          ctx.filter = "blur(16px)";
          ctx.drawImage(glowCv, 0, 0, w, h);
          ctx.filter = "none";
        }
      }

      /* ---- 3. pluma no horizonte ---- */
      for (const p of plume) {
        if (!reduce) {
          p.y -= p.v * 1.6;
          if (p.y < -140) {
            p.y = 560 + Math.random() * 120;
            p.a = Math.random() * Math.PI * 2;
            p.r = Math.random() * Math.random() * 340;
          }
        }
        const z = p.z;
        const scale = focal / z;
        // abre em leque conforme sobe
        const spread = 1 + (560 - p.y) / 620;
        const sx = cx + Math.cos(p.a) * p.r * spread * scale;
        const sy = cy + (p.y - 260) * scale;
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;

        // some nas pontas do percurso
        const life = Math.min(1, Math.min(p.y + 140, 620 - p.y) / 190);
        const a = life * 0.85 * p.s * (1 - vor);   // some quando vira vórtice
        if (a < 0.02) continue;
        const c = p.peri ? PERI : LIME;
        const size = Math.min(3, Math.max(0.8, scale * 2.3 * p.s));
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
        ctx.fillRect(sx, sy, size, size);
      }

      /* ---- 3b. o mar de partículas ----
         Cada uma é desenhada como um traço de onde estava até onde está.
         Parada, o traço tem comprimento zero e o cap redondo a resolve como
         ponto; acelerando, ela vira risco. É o mesmo código nos dois casos. */
      // com teto: sem ele o risco atravessa a tela inteira e come a copy
      const trail = Math.min(210, Math.abs(vel) * 4.2);
      ctx.lineCap = "round";
      for (const p of sea) {
        const z = ((p.z - camZ) % DEPTH + DEPTH) % DEPTH;
        if (z < 40) continue;
        const fade = 1 - z / DEPTH;
        if (fade < 0.03) continue;

        const s1 = focal / z;
        const s0 = focal / (z + trail);
        const x1 = cx + p.x * s1, y1 = cy + p.y * s1;
        if (x1 < -140 || x1 > w + 140 || y1 < -140 || y1 > h + 140) continue;

        const a = fade * fade * (0.2 + speed * 0.3) * p.s;
        if (a < 0.015) continue;
        const c = p.peri ? PERI : LIME;
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
        ctx.lineWidth = Math.min(3.4, Math.max(0.8, s1 * 2.4 * p.s));
        ctx.beginPath();
        ctx.moveTo(cx + p.x * s0, cy + p.y * s0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      /* ---- 4. poeira ambiente ---- */
      for (const d of dust) {
        const z = ((d.z - camZ) % DEPTH + DEPTH) % DEPTH;
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
        const c = d.peri ? PERI : [226, 240, 190];
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
        ctx.fillRect(sx, sy, size, size);

        const off = (sx - cx) / (w / 2);
        if (Math.abs(off) > 0.7 && size > 1.4) {
          ctx.fillStyle = `rgba(255,90,70,${a * 0.5})`;
          ctx.fillRect(sx + off * 3.4, sy, size, size);
          ctx.fillStyle = `rgba(80,150,255,${a * 0.5})`;
          ctx.fillRect(sx - off * 3.4, sy, size, size);
        }
      }

      /* ---- 5. névoa ----
         volta ao modo normal: em "lighter" a névoa clarearia em vez de
         escurecer, e o clear do frame seguinte somaria em vez de limpar. */
      ctx.globalCompositeOperation = "source-over";
      // no vórtice não há horizonte pra escurecer: a cena é centrada.
      // Na velocidade a névoa recua, senão o túnel que se abre fica tampado.
      const k = (1 - vor) * (1 - speed * 0.45);
      const fog = ctx.createLinearGradient(0, 0, 0, h);
      fog.addColorStop(0, `rgba(5,5,5,${0.96 * k})`);
      fog.addColorStop(0.34, `rgba(5,5,5,${0.35 * k})`);
      fog.addColorStop(0.52, "rgba(5,5,5,0)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, w, h);

      /* ---- 6. primeiro plano: passa NA FRENTE do texto ----
         avança com o scroll mais rápido que a cena (está mais perto), o que
         dá a sensação de atravessar o campo. */
      fctx.globalCompositeOperation = "lighter";
      for (const p of near) {
        p.z -= 0.55 + vel * 0.9;
        if (p.z < 30) {
          p.z = 500;
          p.x = (Math.random() - 0.5) * 2400;
          p.y = (Math.random() - 0.5) * 1500;
        } else if (p.z > 520) {
          p.z = 40;
        }
        const scale = focal / p.z;
        const sx = cx + p.x * scale;
        const sy = cy + p.y * scale;
        const rad = Math.min(9, Math.max(1.2, scale * 3.2 * p.s));
        if (sx < -rad || sx > w + rad || sy < -rad || sy > h + rad) continue;

        // some ao chegar coladinho na lente, senão "pisca" ao renascer
        const a = Math.min(1, (p.z - 30) / 90) * Math.min(1, (520 - p.z) / 120) * 0.42;
        if (a < 0.01) continue;

        const c = p.peri ? PERI : LIME;
        const grd = fctx.createRadialGradient(sx, sy, 0, sx, sy, rad);
        grd.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a})`);
        grd.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
        fctx.fillStyle = grd;
        fctx.beginPath();
        fctx.arc(sx, sy, rad, 0, Math.PI * 2);
        fctx.fill();
      }

      /* ---- 7. anel de luz do clique ----
         um traço largo com gradiente nas duas cores, abrindo e apagando */
      for (let i = rings.length - 1; i >= 0; i--) {
        const age = (now - rings[i].t0) / 1000;
        if (age > 1.15) {
          rings.splice(i, 1);
          continue;
        }
        const k = age / 1.15;
        const rad = 18 + (1 - Math.pow(1 - k, 3)) * 330;
        const a = (1 - k) * (1 - k) * 0.5;
        const g = fctx.createLinearGradient(
          rings[i].x - rad, rings[i].y, rings[i].x + rad, rings[i].y
        );
        g.addColorStop(0, `rgba(${LIME[0]},${LIME[1]},${LIME[2]},${a})`);
        g.addColorStop(1, `rgba(${PERI[0]},${PERI[1]},${PERI[2]},${a})`);
        fctx.strokeStyle = g;
        fctx.lineWidth = 1 + (1 - k) * 8;
        fctx.beginPath();
        fctx.arc(rings[i].x, rings[i].y, rad, 0, Math.PI * 2);
        fctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <>
      <canvas ref={bgRef} className="fixed inset-0 -z-10 h-full w-full" aria-hidden />
      <canvas
        ref={fgRef}
        className="pointer-events-none fixed inset-0 z-20 h-full w-full"
        aria-hidden
      />
    </>
  );
}
