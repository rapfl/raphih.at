# Project selection — 27 October 2026

Reviewed through the connected GitHub account `rapfl`. The account profile identifies Raphael Huber. This file records sources and editorial decisions; private operational identifiers and credentials are deliberately excluded.

## Main selection

1. **Rahu Bounce** — monophonic MIDI bass synthesizer for trance, bounce, and hardgroove. C++17, JUCE 7, RAHU CORE. v1.2, macOS Universal VST3/AU/standalone. Strong lead project because the sound and interface are tangible. Sources: [README](https://github.com/rapfl/rahu-bounce/blob/main/README.md), `docs/images/main.png`. The screenshot and audio are from the matching local project. No download is promised because a public release was not verified.
2. **rosa** — pedagogical planning companion for teaching in Austria. The lesson is the central object, with week/year planning, curriculum references, method selection, quality checks, and PDF generation. Source: [README](https://github.com/rapfl/rosa/blob/main/README.md). Public website `rosa-ai.at` is identified in that README. Active development; no adoption or outcome metrics claimed.
3. **Cordo** — coordination product for organisations running school workshops. Enquiry, team assignment, confirmation, delivery, report. Sources: [README](https://github.com/rapfl/cordo/blob/main/README.md), [architecture](https://github.com/rapfl/cordo/blob/main/docs/ARCHITECTURE.md). Distinguish from the older `coordo` repository. Architecture describes buntaž as the operational predecessor and Cordo as its successor product. Marked in development.
4. **buntaž automation** — Google Sheets + Apps Script workflow for workshop coordination, bookings, assignment, email, reminders, and calendars. Source: [README](https://github.com/rapfl/Buntaz/blob/main/README.md). User called this “worksheet automation”; repository evidence supports **spreadsheet workshop automation**, so the portfolio uses that description. Do not publish the production Sheet, Script, or internal documentation IDs.
5. **Hochstapler** — hidden stacking minigame within rosa. Source: [concept](https://github.com/rapfl/rosa/blob/main/docs/konzepte/HOCHSTAPLER.md), `apps/rosa/components/hochstapler-spiel.tsx`. Correct documented name is Hochstapler (user wrote Hochstaple). Unlock by typing `stapel`, Konami code, or tapping the mark five times on mobile. Shrinking overlap, accelerating layers, +10 per layer and +25 precision bonus. The portfolio implements a smaller adaptation, clearly distinguished from the original.

## Additional experiments

- **Headturner Hat** — focused noise-first techno hi-hat instrument. JUCE; closed/open, decay, tone, air, metal, drive; preset handling and macOS/Windows packaging. [Public README](https://github.com/rapfl/headturner-hat/blob/main/README.md).
- **Valley Nomads** — browser multiplayer board game for 3–4 players, original pixel artwork, deterministic rules, WebSocket sessions, and bots. [hex8 README](https://github.com/rapfl/hex8/blob/main/README.md). Avoid using CATAN trademarks or artwork to present the game.

## Not selected

- `buntaz_gpts`: relevant AI coaching work, but its README explicitly states the prompts are placeholders and the pilot is not publicly approved. Omitted from the portfolio rather than suggesting a finished deployment.
- `classcalm`: README is generic Create React App boilerplate; insufficient evidence for a strong case study.
- Earlier `coordo` and `siedler` iterations: avoid duplicating successor projects.
- `methodensammlung.com`: no README at the expected path; not enough evidence for inclusion in this pass.

## Personal positioning

“Code, sound, education, and automation” is an editorial synthesis of this project set. “Creative developer” is positioning, not a verified employment title. No employer, location, client results, years of experience, audience figures, or qualifications are asserted. Process language is distilled from the repositories’ documented domain modelling, test harnesses, and iteration practices.

## Assets

- Rahu Bounce screenshot and audio sample: owner’s local project, corresponding to the reviewed repository.
- rosa logo: owner’s local `rosa-kanon/werkstatt/marke/system/assets/rosa-quer.svg`.
- rosa lesson, Cordo schedule, and buntaž table: hand-built illustrative compositions, using synthetic content and labelled as such in their stories.
- Space Grotesk and DM Sans: locally hosted Google Fonts distributions, SIL Open Font License.
