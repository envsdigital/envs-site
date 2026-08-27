# envs.com.br — Build Prompt

**Como executar:** abra o Claude Code na raiz deste repo e cole o bloco abaixo
inteiro, sem editar. Ele lê a copy de `content/landing-copy.md` §3 e os assets de
`design/` sozinho.

---

```
Build me an award-winning cinematic "3D scroll" website for ENVS — a Brazilian
"AI operations partner" + software house. Study the style of the Awwwards Site of
the Year 2025 agency sites: enormous bold typography, scroll-driven pinned
sequences, kinetic manifesto text, a dark editorial feel. All copy in Brazilian
Portuguese.

COPY — read content/landing-copy.md section 3 ("Copy deck — versão envs") and use
that copy VERBATIM for every section. It is final text, not a brief: do not
rewrite, translate, shorten or "improve" it. If any [[placeholder]] is still
unfilled, stop and ask me for it instead of inventing a value.

Blocks marked `status: rascunho` in the deck ARE to be built — use their draft text
so the layout is complete — but keep that content isolated in `data/` files
(depoimentos.ts, case.ts) so it can be swapped without touching components.

STACK — Next.js (App Router) + TypeScript + Tailwind, GSAP ScrollTrigger for the
pinned/scrub sequences, Lenis for smooth scroll. Static export, deployable to
GitHub Pages / Cloudflare Pages. Target domain: envs.com.br.

BRAND — the two non-negotiables come from design/ (the company styleguide):
- COLORS (exact, no substitutes): background #191919, text #F5F5F5, primary
  accent #BFF24E (lime green), secondary accent #908AFF (periwinkle), surface
  #292929. Green is the single loud accent; purple only for secondary highlights
  and gradients. These are the brand — never shift their hue.
- LOGO & ICON (use the real files, do not redraw them): SVGs in
  design/assets/logos/ — envs-wordmark.svg (header + footer), envs-icon-e.svg
  (favicon + compact contexts), envs-bubble.svg (the "agent" glyph — use it in the
  hero and the agent diagrams). Each comes in 4 colorways (tertiary/, background/,
  primary/, secondary/ folders); pick the right one per background.
- TYPE: your call — pick what serves the design. Direction: a bold geometric
  grotesque, heavy modern headlines (700/800, tight tracking), same family at 400
  for body. Google Fonts only. Tell me what you picked and keep it in a single CSS
  variable so swapping it later is one line.
- Cursor becomes a small green dot with a trailing ring.

VISUALS — generate with the Seedance 2.0 model on the Higgsfield MCP (std mode,
1080p, 16:9, no audio, ~8s per clip). First generate ONE hero image — a dark void
with thousands of small lime-green (#BFF24E) particles swirling, faint periwinkle
nebula, a subtle grid horizon — and reference it in every clip so the look is
identical:
1. HERO FIELD — the particles slowly assemble into the envs speech-bubble mark
   (match the silhouette of design/assets/logos/tertiary/envs-bubble.svg) pulsing
   like a heartbeat; slow push-in.
2. THE TIMELINE — a continuous lateral dolly past three glowing monoliths labeled
   2024 / 2025 / 2026, each taller than the last, green light intensifying; end
   framed on 2026. (chain: use this clip's final frame as clip 3's start frame)
3. THE OPERATION — macro glide across floating UIs — a spreadsheet, an invoice, a
   CRM, a terminal — with a green cursor touching each one in turn, everything
   under control.
4. THE ROOM — silhouettes of a small team working late in a moody studio, green
   monitor glow, city bokeh through the window.

WEBSITE — Lenis smooth scroll, text reveals pinned to scroll position, subtle
grain, section transitions with slight motion blur. Sections in this order, each
filled with its matching block from the copy deck:
  1. HERO — glow + 4 floating pill tags in the corners (Financeiro, Jurídico,
     Comercial, Logística); eyebrow, huge 4-line headline with the last line in
     green, subhead, one big green CTA button, trust line under it.
  2. "2026: A VIRADA" — scroll-scrub clip 2; three timeline cards (2023–24 / 2025 /
     2026) that slam in one per scroll step, each with 3 bullet items and a kicker
     line. Last card highlighted green.
  3. "A DIFERENÇA" — two-column compare card (Chatbot/Automação vs Agente
     Autônomo) + the traffic-light/driver analogy as pinned kinetic text +
     a small diagram "Observa → Decide → Executa → Aprende" ringing a center
     "Agente IA" node (use envs-bubble.svg) wired to
     Planilhas/Documentos/Softwares/APIs.
  4. "O FUTURO CHEGOU" — long manifesto block; then a 3-step historical timeline
     (Anos 2000 / Anos 2010 / 2025 em diante) revealing on scroll; close with the
     4 one-line value bullets and a CTA.
  5. "STACK CERTIFICADA" — logo/word grid of the stack, "15+ certificações ativas".
  6. "O QUE A ENVS FAZ" — three FRENTE cards (Agentes de IA / Desenvolvimento de
     Software / Squad Plugado), each with a tiny animated mock (a fake terminal
     running agente_financeiro.run(), a Figma→Code→Deploy pipeline, a team-roles
     chip row with "55% ↓ custo"). Then two small cards: MÉTODO (etapa limitante)
     and GARANTIA (resultado ou devolução).
  7. "POR QUE EMPRESAS FICAM PARA TRÁS" — 6 pain items as an editorial list that
     reveal on scroll, then the summary paragraph.
  8. "O QUE OS AGENTES FAZEM NA PRÁTICA" — a tabbed panel (Financeiro / Operação /
     Comercial / Jurídico / Produto Digital / Qualquer Processo); each tab's
     checklist comes from the deck; below any tab, the fixed "COMO OS OUTROS FAZEM
     vs COMO A ENVS FAZ" split.
  9. "VISIBILIDADE TOTAL" — 3 feature blurbs (Backlog público / Ciclos curtos /
     Alinhamento quinzenal) beside a faux kanban board (backlog.envs.com.br) with
     rows animating between columns.
 10. "POR QUE A MAIORIA FALHA" — the bottleneck diagram (maioria automatiza tudo
     menos o gargalo vs envs resolve o gargalo primeiro) + "Defasagem de Tempo"
     concept with a small lag-curve chart + the 3 steps Identificar / Explorar /
     Elevar.
 11. "DEPOIMENTOS" — 3 testimonial cards. Build it fully with the deck's draft
     text, but put the three entries in `data/depoimentos.ts` with a
     `verificado: false` field on each, so swapping them later is one file.
 12. "CASE DE DESTAQUE" — scroll-scrub finale: the headline result number from the
     deck fills 60% of the viewport, ANTES/DEPOIS two-column, link chip to the
     client site.
 13. "RESULTADOS COMPROVADOS" — 4 stat counters that count up on scroll.
 14. "NOSSO ESCRITÓRIO" — clip 4 as background, one line about the team.
 15. FINAL CTA — oversized: "Toda empresa vai precisar de um parceiro de tech com
     IA. A sua já tem?" + "Agendar call gratuita agora" + secondary "Ver a tese
     completa". Footer: envs wordmark, "© 2026 envs. Todos os direitos
     reservados.", socials, envs.com.br.

Every CTA on the page links to the WhatsApp URL in the deck's CONFIG table
(target="_blank" rel="noopener").

Mobile pass: timeline cards and FRENTE cards become swipeable; tabbed panel
becomes an accordion; kanban board scrolls horizontally.

Compress the videos for web. Launch on localhost and verify every scroll-pinned
section and the two scrub sequences (timeline, case number) render correctly
before telling me it's done.
```
