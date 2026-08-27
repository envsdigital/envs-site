# design/

Brand + design-system source of truth for **envs-site**, pulled from the Figma
"Styleguide (Copy)" file on 2026-08-27.

```
design/
├── styleguide.md      ← read this first: colours, type, logos, imagery, social, copy
├── tokens.json        ← tokens for tooling
├── tokens.css         ← CSS custom properties + element defaults (import this)
└── assets/
    └── logos/         tertiary/ background/ primary/ secondary/ — each: envs-wordmark·icon-e·bubble .svg (+README)
```

The typeface (Loos Normal, commercial) is not bundled — see `styleguide.md` §2.

## Use in the site

```css
@import "../design/tokens.css";
```

Then use `var(--color-primary)`, `var(--fs-h1)`, etc. Full list in `tokens.css`.

## Re-syncing

The Figma file is view-only. To refresh: re-open it, and re-export changed frames
(right-click → Copy as SVG/PNG, or the Export panel). Update `styleguide.md` +
`tokens.*` to match.
