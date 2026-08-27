# logos/

Three marks × four colourways = 12 SVGs, exported from Figma
("Styleguide (Copy)" → Branding → Logos) on 2026-08-27.

```
logos/
├── tertiary/    fill #F5F5F5  (off-white — default, use on dark bg)
├── background/  fill #191919  (near-black — use on light bg)
├── primary/     fill #BFF24E  (lime green)
└── secondary/   fill #908AFF  (periwinkle)
```

Each folder has the same three files:

| File | Figma layer | ViewBox | Shape |
|---|---|---|---|
| `envs-wordmark.svg` | Logo / *colour* | `0 0 423 187` | full `envs` wordmark |
| `envs-icon-e.svg` | Redução / *colour* | `0 0 187 187` | `e` monogram (compact mark) |
| `envs-bubble.svg` | Icon / *colour* | `0 0 187 187` | speech-bubble mark |

Notes from the export:
- The `primary/` files come back `188` tall instead of `187` (Figma sub-pixel
  rounding on that instance). Harmless; the artwork is identical.
- `envs-wordmark.svg` keeps Figma's frame padding — glyphs sit at roughly
  `x 56–361` of the 423-wide viewBox (~15% empty on the right). Tighten the
  `viewBox` to `56 62 306 67` if you need the mark flush.

## Recolouring beyond these four

The four folders cover the brand palette. For an arbitrary colour, take any
file and either swap the `fill="#…"`, set `fill="currentColor"` and drive it
with CSS `color`, or use it as a CSS `mask`:

```css
.logo path { fill: var(--color-primary); }
/* or */
.logo-mask { background: var(--color-primary);
             mask: url("tertiary/envs-wordmark.svg") center / contain no-repeat; }
```
