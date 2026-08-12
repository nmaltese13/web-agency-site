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
| Structured content lives in `data/site-content.js` | Owner edits copy/prices/projects without touching HTML. **Exception:** About-page prose is static in `about.html` — see Architecture. |
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

**About-page prose is static markup, not rendered from the data file.** It's
long-form writing, not a repeated list, and keeping it in `about.html` means
that page reads fine with JS off. There is deliberately no `SITE.about`.

**Progressive enhancement — and its honest limit.** Nav, headings, hero copy,
the whole About page, and the contact form markup are in the HTML and work
with JS disabled. The *lists* (services, projects, FAQ, process) are rendered
from `site-content.js` and are empty without JS, so Home, Services and Work
carry a `<noscript>` block that says so and points at the Book page. That's
the accepted trade-off for the single-source-of-truth requirement — don't
"fix" it by duplicating content into `<noscript>`, and don't quietly delete
the notices either.

**Contact details are rendered by JS**, with a static fallback in each page's
footer for the no-JS case. Those fallbacks are a second copy: if you change
`business.email` or `business.phone`, grep for `data-render="biz-email"` and
update the six HTML files too.

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

### Border tokens — read before touching a border color

- `--line` / `--line-strong` are **decorative** hairlines: card edges, rules,
  dividers. Exempt from contrast rules.
- `--border-control` is for anything the user operates — input, select,
  textarea, ghost button, filter chip, icon button. Its boundary is what
  identifies the control, so WCAG 1.4.11 requires **3:1** against the surface
  behind it. `--line-strong` measures 1.7:1 and **fails**. Using it on a form
  field is the specific mistake this token exists to prevent.

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

## Verifying a change — don't judge it by reading the code

There's no test suite. Look at the pages:

```bash
python3 -m http.server 8000
```

Headless Chrome works for screenshots, with two traps worth knowing:

1. **`--window-size` is clamped to a minimum width (~500px)**, so a mobile
   screenshot taken directly lays out too wide and gets cropped — it looks
   like a broken overflow when nothing is wrong. Render the page inside a
   fixed-width `<iframe>` in a scratch harness page instead.
2. **`--blink-settings=preferredColorScheme` does not work.** Test dark mode
   by setting `localStorage['nwc-theme'] = 'dark'` from a same-origin scratch
   page that redirects to the target. Chrome also reuses the default profile
   between headless runs, so always set the theme *explicitly* rather than
   relying on its absence — otherwise one run's theme leaks into the next.

Keep scratch harness files out of the repo.

Check contrast numerically rather than by eye; both themes must hold.

## Current status (Aug 2026)

All six pages are built and verified at 390px and 1440px in both themes.
Nothing is deployed yet. **Before this goes live:** replace every
`PLACEHOLDER` (see above), and delete the six invented portfolio projects —
shipping fictional client work is the fastest way to lose a deal.

## Commit convention

Commit after every stage. The owner has lost this project once already to
uncommitted work — err toward committing more often, not less.
