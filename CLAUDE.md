# CLAUDE.md

Marketing site for a one-person web development & automation business serving
small local businesses in the Lehigh Valley, PA. This site is the owner's
primary sales asset — prospects judge his work by it. It must look better than
the sites of the businesses being pitched.

## Run locally

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

No install step. No dependencies. If a change requires compiling, it's wrong.

## Hard constraints — do not violate

| Rule | Why |
| --- | --- |
| Plain HTML + CSS + vanilla JS only | Deploys by pushing to GitHub → static host. No build pipeline exists. |
| No npm, no bundler, no framework, no TypeScript | Same. There is no `package.json` and there should never be one. |
| No backend, no database, no server-side code | Static host only. |
| **All paths must be relative** (`css/style.css`, not `/css/style.css`) | GitHub Pages project repos serve from `/<repo-name>/`. Root-absolute paths work on localhost and 404 in production. This is the single easiest way to break the deploy. |
| Booking = Cal.com embed only | No backend to store appointments in. Never build a custom booking form. |
| Contact form = Formspree (or equivalent) | Must surface real success **and** error states. Never fail silently. |
| All content lives in `data/site-content.js` | Owner edits copy/prices/projects without touching HTML. |
| Max two font families | Performance. Currently Space Grotesk + Inter. |
| No stock photography | Use type, color, layout, CSS/SVG. Non-negotiable brand rule. |
| WCAG AA minimum | 4.5:1 normal text, 3:1 large text and UI borders, in **both** themes. |

## Placeholders that must be replaced before launch

Search the codebase for `PLACEHOLDER` — every invented value is tagged.

- `data/site-content.js` → business name, prices, all portfolio projects, contact email/phone
- `book.html` → Cal.com scheduling link
- `js/contact.js` → Formspree endpoint

## Architecture

```
index.html  services.html  work.html  about.html  book.html  404.html
css/style.css          — entire design system + all page styles, one file
js/main.js             — nav toggle, theme toggle, footer year, scroll reveal
js/render.js           — renders repeated content from site-content.js
js/contact.js          — Formspree submit with success/error states
data/site-content.js   — ALL editable content, one global `SITE` const
assets/                — favicon + inline-able SVG only
```

**`data/site-content.js` is a classic script defining a global `const SITE`**,
loaded via `<script src="data/site-content.js"></script>` before `render.js`.
It is deliberately *not* JSON fetched at runtime — `fetch()` fails over
`file://` and adds a network round trip for no gain.

**Header and footer markup is duplicated in each page, not injected by JS.**
Six pages is little enough to maintain by hand. JS injection would flash a
missing nav on load and leave the site unnavigable with JS off. **If you edit
the header or footer, edit it in all six files.**

**Progressive enhancement:** every page must be readable and navigable with JS
disabled. JS renders the *repeated* lists (services, projects) and handles the
contact form — the core copy and nav are in the HTML.

## Design direction — "Technical Blueprint"

The tone is a well-made technical document, not a SaaS landing page. It should
read as precise and built-by-hand, because the audience is trades and auto
shops who respect visible craft and distrust slick.

- **Type:** `Space Grotesk` for display headings (geometric, slightly
  mechanical). `Inter` for body and UI. Monospace (`ui-monospace` stack) for
  metadata: section numbers, prices, labels, form hints. The mono is a system
  stack, so it costs nothing and doesn't count against the two-family budget.
- **Scale:** fluid via `clamp()`. Real hierarchy — display type is genuinely
  large (up to ~4.5rem), body is 1.0625rem, mono labels are 0.75rem uppercase
  with wide tracking. Nothing important is 16px-flat.
- **Color:** ink + warm paper, with **safety orange** as the single accent —
  chosen because it reads as trades/industrial rather than generic tech blue.
  One accent only. Semantic tokens are defined in `:root` and re-declared in
  `@media (prefers-color-scheme: dark)`; never hardcode a hex outside `:root`.
- **Layout:** asymmetric grid, generous whitespace, hairline `1px` rules
  instead of drop shadows, oversized mono section numbers (`01 / 02 / 03`),
  cards defined by borders not elevation.
- **Motion:** subtle only — small translate + fade on scroll reveal, border
  and color transitions on hover. All of it wrapped in
  `@media (prefers-reduced-motion: no-preference)` so reduced-motion users get
  a static site by default, not an animated one that's been patched.

### Theme handling

`prefers-color-scheme` drives the default. A manual toggle overrides it by
setting `data-theme="light"|"dark"` on `<html>`, persisted in `localStorage`.
Every color must therefore be defined in three places: bare `:root` (light),
`@media (prefers-color-scheme: dark)` guarded with
`:root:not([data-theme="light"])`, and `:root[data-theme="dark"]`. A color
defined only inside a media query will break the toggle.

## Content rules

- Plain-spoken and competent. No "leverage", "synergy", "solutions", "elevate",
  "unlock", "transform your business".
- First person singular. It is one person; say so. That's the selling point.
- **Never invent testimonials or client names.** Fabricated social proof on a
  site whose whole job is establishing trust is both a legal and a credibility
  risk. Where real testimonials don't exist yet, use an honest process/
  guarantee block instead.

## Commit convention

Commit after every stage. The owner has lost this project once already to
uncommitted work — err toward committing more often, not less.
