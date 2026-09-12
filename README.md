# magnocreative.com

The portfolio and design system of **Alejandro Fernandini**, an experience designer working on internal and operational software — compliance platforms, audit tooling, and the CRM systems people use all day at work.

The site is here because a portfolio that claims design-systems practice should be one. The system underneath it is real, documented, and open to read.

---

## The design system

Tokens are organised in three tiers, and the order is the whole point:

| Tier | What it holds | Who may reference it |
|---|---|---|
| **Primitives** | Raw OKLCH ramps. No meaning attached. | The semantic tier only |
| **Semantic** | Roles — `--surface-raised`, `--text-secondary`, `--interactive-hover` | Components |
| **Component** | Per-component overrides aliasing the semantic tier | That component |

A component never reaches past the semantic tier. That single constraint is what lets the entire site retheme by editing two files, and it's why no component carries a theme branch of its own.

**Why OKLCH.** Lightness in OKLCH is perceptually uniform across hues, so `paper-600` and `accent-600` carry the same visual weight. Contrast becomes predictable rather than hand-tuned per colour.

**The palette starts from the logo.** The mark is two mountains in `#4f729a` and `#7297b7`. Those are anchor points in the blue ramp, not colours used directly: `blue-600` is the deep peak exactly, `blue-400` sits essentially on the light one. Neither works as a link colour on its own, since the deep peak measures 4.83:1 on cream and 3.85:1 on the dark ground and the light peak fails on cream outright. The interactive roles come from the steps either side.

**Light and dark are not one palette inverted.** Light is *paper*, a warm cream, the register of a well-set document. Dark is *slate*, the mark's own blue taken down to a ground, so the logo sits natively in it. Two grounds resolving into one set of roles, stated once each via CSS `light-dark()`, so the themes cannot drift apart the way twin light/dark blocks always eventually do.

Slate bottoms out at 17% lightness rather than the ~10% a dark theme usually reaches for. At 10% sRGB has almost no room for chroma, so a hue specified down there renders as black however much saturation it carries. Raising the ground is what makes the colour visible; the chroma is secondary.

Three details that matter more than they sound:

- The theme switch sets `color-scheme`, so native form controls, scrollbars and the text caret follow the theme too — something a class-based theme never manages.
- Dark-mode body text stops short of pure white. Full-contrast white on near-black haloes badly over a long read.
- Screenshots authored on light grounds sit on their own light plate rather than glaring out of a dark page.

---

## Running it

```bash
npm install
npm run dev          # the site — localhost:3000
npm run storybook    # the design system — localhost:6006
```

Build with `npm run build`.

---

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Storybook with accessibility and docs addons · MDX for case studies · self-hosted variable fonts, so no request leaves for a font CDN and nothing render-blocks.

---

## Structure

```
src/
  app/          routes and pages
  styles/       design tokens — the three tiers live here
  content/      case studies in MDX
```

---

© Alejandro Fernandini. Case studies, writing and images are not licensed for reuse.
