# raphih.at

Raphael Huber’s people-first website: personal support for social initiatives, shared learning, responsible AI use, and software shaped around the team. Projects illustrate the work; music and play remain creative interests. Built as a static site with local fonts, accessible controls, and an inline playable Hochstapler adaptation.

## Run

Node.js 20 or newer. No installation or build required.

```sh
npm run dev
npm run check
```

Open http://localhost:4173. Deploy `dist/` on any static host. The Netlify configuration publishes `dist/` after running the local checks. `.netlify/` holds the local project link and is ignored by Git. A separate private Sites preview is also retained.

## Content

- `dist/index.html`: page structure and project previews
- `dist/styles.css`: responsive layout, local typography, motion
- `dist/app.js`: case studies, filters, audio, curiosity dial, game
- `docs/project-research.md`: GitHub research and content decisions

Product previews for rosa, Cordo, and buntaž are illustrative compositions with synthetic data. Rahu Bounce uses the real interface and a locally rendered audio sample. The page makes no external network requests or analytics calls. Email and external project links only navigate after activation. The stacking game optionally saves its best score in localStorage.

Hosting target: Netlify project `raphih-portfolio` in team `huber-raphael`. Public publication at raphih.at requires adding the domain to Netlify and configuring its DNS at NameSilo. The separate Sites preview remains private.

Continuous deployment is connected to the `main` branch of https://github.com/rapfl/raphih.at. Every push runs `npm run check` and publishes `dist/`.
