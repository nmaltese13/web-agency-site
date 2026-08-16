# Web Agency Site

Marketing site for a web development & automation business serving small local
businesses in the Lehigh Valley, PA.

Static site: plain HTML, CSS, and vanilla JS. No build step, no bundler, no
dependencies. Pushing to `main` is the deploy.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

Live at **https://web-agency-site.nmalt0826.workers.dev** — hosted on Cloudflare
Pages, which rebuilds from `main` on every push. `git push origin main` deploys.

## Status

Live. Every page and asset serves over HTTPS and the custom 404 works.

Still to wire up: the Cal.com booking link, the Formspree form endpoint, and
real prices. See `CLAUDE.md` for those, plus tech constraints and design
direction.
