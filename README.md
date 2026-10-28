# raphih.at

Raphael Huber’s landing page and portfolio. The main offer is hands-on AI implementation, custom software, and ongoing support for small organisations and institutions. Strategy, team management, and facilitation support the way the work gets done.

## Pages

- `/`: offering, approach, selected project links, personal introduction, and contact
- `/portfolio/`: all five featured projects, two additional experiments, project stories, real Rahu Bounce imagery and audio, and playable Hochstapler
- Existing `/#work` and `/#hochstapler` links forward to the portfolio.

## Run

Node.js 20 or newer. No dependency installation or build step required.

```sh
npm run dev
npm run check
```

Open http://localhost:4173. The local server handles the portfolio directory and its canonical trailing slash.

## Source

- `dist/index.html`, `dist/landing.css`, `dist/landing.js`: landing page
- `dist/portfolio/index.html`: portfolio page
- `dist/styles.css`, `dist/app.js`: shared styling and portfolio interactions
- `docs/project-research.md`: project sources and editorial decisions
- `docs/design-direction.md`: design and offering decisions

Product previews for rosa, Cordo, and buntaž are illustrative compositions with synthetic data. Rahu Bounce uses the real interface and a locally rendered audio sample. Fonts are local. The source does not add analytics or third-party requests; hosting may inject its own badge. Email and external project links navigate only after activation. The game optionally saves its best score in localStorage.

## Deployment

Netlify project `raphih-portfolio`, team `huber-raphael`, deploys `main` from https://github.com/rapfl/raphih.at. Each push runs `npm run check` and publishes `dist/`. The local `.netlify/` binding is ignored by Git. The canonical domain is https://raphih.at/.
