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

**Light and dark are not one palette inverted.** Light is *paper* — warm neutrals, the register of a well-set document. Dark is *instrument* — cool neutrals, the register of the operational tools this work is about. Two ramps resolving into one set of roles, stated once each via CSS `light-dark()`, so the themes cannot drift apart the way twin light/dark blocks always eventually do.

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
