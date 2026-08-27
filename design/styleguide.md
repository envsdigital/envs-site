# envs — Styleguide

Extracted **2026-08-27** from Figma → **Styleguide (Copy)**
`https://www.figma.com/design/w7JotzS0Xf4vyuI8M5447A/Styleguide--Copy-` (view-only access).

Machine-readable versions: [`tokens.json`](./tokens.json) · [`tokens.css`](./tokens.css)

---

## 1. Colours

| Token | Hex | Figma style | Use |
|---|---|---|---|
| Background | `#191919` | Background | page background (near-black) |
| Foreground | `#FFFFFF` | Foreground | pure white |
| Primary | `#BFF24E` | Primary | lime green — brand accent |
| Secondary | `#908AFF` | Secondary | periwinkle / purple — secondary accent |
| Tertiary | `#F5F5F5` | Tertiary | off-white — **default fill for logo & body text** |
| Surface | `#292929` | *(not a published style)* | dark frame background used on some guide pages |

> `#9747FF` seen in the file is **Figma's component-annotation colour**, not a brand colour — ignore it.

## 2. Typography

- **Family:** `Loos Normal` (Normal width) by **CSTM Fonts** — commercial, no free
  version, not on Google Fonts. Buy a webfont licence at <https://type.today> or
  <https://store.typenetwork.com/foundry/cstmfonts/fonts/loos>. The guide only uses
  weight 400 Regular. No font files are bundled in this repo.
- Suggested free fallback in the stack: **Space Grotesk** (SIL OFL) — close
  grotesque, not identical.
- **Weight:** `400` everywhere in the guide. **Letter-spacing:** `0`.

| Style | Font size | Line height | Notes |
|---|---|---|---|
| `h1` | 58px | 120% | |
| `h2` | 52px | 120% | |
| `h3` | 36px | 120% | |
| `h4` | 30px | 140% | |
| `p.large` | 28px | 150% | |
| `p` | 18px | 160% | paragraph spacing 10px |
| `p.small` | 16px | 160% | |

*(The documentation table inside the Figma "Tipografia" frame prints "120%" for every
row — that's stale. The values above are the file's actual published text styles.)*

## 3. Logos

All 12 SVGs in [`assets/logos/`](./assets/logos/) — 3 marks × 4 colourways,
one folder per colour (`tertiary/`, `background/`, `primary/`, `secondary/`):

| File (in each colour folder) | Figma layer | Box | What it is |
|---|---|---|---|
| `envs-wordmark.svg` | Logo / *colour* | 423×187 | full `envs` wordmark |
| `envs-icon-e.svg` | Redução / *colour* | 187×187 | `e` monogram (compact logo) |
| `envs-bubble.svg` | Icon / *colour* | 187×187 | speech-bubble mark |

| Folder | Fill | Use on |
|---|---|---|
| `tertiary/` | `#F5F5F5` | dark backgrounds (default) |
| `background/` | `#191919` | light backgrounds |
| `primary/` | `#BFF24E` | — |
| `secondary/` | `#908AFF` | — |

See [`assets/logos/README.md`](./assets/logos/README.md) for recolouring notes
(the shape is one component; fill is the only difference between folders).

## 4. Brand imagery

No image assets are stored in this repo. Everything below lives in the Figma
"Components" page — re-export if needed:

- **Background texture** — 1920×1080 green/purple brush-stroke; the hero / thumbnail background.
- **"Noising Colors"** — component set, 5 grain-gradient fills: `verde`, `verde-preto`,
  `verde-lilas`, `lilas`, `lilas-preto`.
- **AdobeStock photos** (`488655468`, `338907188`, `338907186`) — creator/podcast
  shots; licensed, do not redistribute.

## 5. Social

Social artwork lives only in the Figma "Redes Sociais" page — no local copies kept.
Re-export from Figma if needed:

- **LinkedIn cover** — 1584×396, "Para criadores que buscam o melhor"
- **Imagens de perfil** — `envs` wordmark & `e` mark on dark / primary / secondary / textured
- **Instagram "Carrossel #1"** — 6 slides (copy below)

Live site domain: **envs.com.br**.
The existing Figma artwork still shows the old handle **@envssoftware** / **envssoftware.com.br** — update it when regenerating social assets.

### Instagram "Carrossel #1" copy

1. **Transforme seu negócio com SaaS** (dark) — Descubra por que desenvolver uma solução SaaS (Software as a Service) pode ser a chave para o sucesso do seu empreendimento. Vamos explorar as vantagens dessa abordagem inovadora! 🚀
2. **Receita recorrente** (purple) — Uma das maiores vantagens do SaaS é a geração de receita recorrente. Com assinaturas mensais ou anuais, seu negócio ganha estabilidade financeira e previsibilidade no fluxo de caixa.
3. **Escalabilidade sem esforço!** (green) — Expandir um negócio SaaS é mais fácil e rápido. Adicione novos recursos e acomode mais usuários sem grandes investimentos em infraestrutura. Cresça junto com seus …
4. **Acessível de Qualquer Lugar** (white) — Com o SaaS, seus clientes podem acessar a plataforma de qualquer lugar, a qualquer hora, em qualquer dispositivo. Isso aumenta a conveniência e a satisfação do cliente, além de expandir seu mercado potencial.
5. **Inovação constante** (purple) — O modelo SaaS permite atualizações e melhorias contínuas, garantindo que seus clientes sempre tenham acesso às mais recentes funcionalidades e segurança. Mantenha-se à frente da concorrência!
6. **Curtiu? Vem construir seu SaaS com a Envs!** (dark) — Temos um time de especialistas prontos para entender e transformar sua demanda em um SaaS!

## 6. Figma pages — coverage

| Page | Content | Captured |
|---|---|---|
| About | file thumbnail only | — |
| Branding | Tipografia, Logos, Cores | ✅ tokens + logo SVGs |
| Redes Sociais | profile images, LinkedIn cover, Instagram carousel | ✅ |
| Components | "Background" texture, "Noising Colors" ×5, 3 AdobeStock photos | ✅ (photos skipped) |
| Patterns | *empty* | — |
| Templates | *empty* | — |

There is also a `Layout guide style` named **Instagram** (a Figma layout grid, nothing to export).
