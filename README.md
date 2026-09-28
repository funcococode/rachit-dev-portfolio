# Rachit Shrivastava — Portfolio

React 19 · Vite · Tailwind CSS v4 · Framer Motion · Lenis smooth scroll · React Router

## Run it

Requires **Node 20.19+ or 22.12+** (Node 21 is not supported by Vite). `nvm use` picks up `.nvmrc`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview
```

Deploys as-is to Vercel (`vercel.json`) or Netlify (`public/_redirects`) — both rewrite routes to `index.html` so `/work/:slug` pages work on refresh.

## Edit your content

| What | Where |
| --- | --- |
| Name, email, socials, timezone, availability, stack, capabilities, process | `src/data/site.js` |
| Projects & case studies | `src/data/projects.js` |
| Colours, fonts, easing | `@theme` block in `src/index.css` |

**Please check each project's `role`, `year` and `stack`** — they're best guesses.

### Adding real screenshots
Each project draws its own animated generative cover until you add images:

1. Put files in `public/projects/<slug>/`, e.g. `public/projects/trip-unplanned/cover.jpg`
2. In `projects.js`: `images: ['/projects/trip-unplanned/cover.jpg', '/projects/trip-unplanned/desktop.jpg', '/projects/trip-unplanned/mobile.jpg']`
   - `[0]` → cover (hover preview + case-study hero) · `[1]` → browser mockup · `[2]` → phone mockup (use a tall mobile screenshot)

## Design system — two tones, all boxes

Only two colours: green `#064e3b` and cream `#f8e7c9` (in `src/index.css` → `@theme`,
and `COLORS` in `src/components/Stage.jsx`). No rounded corners — everything sits in a
ruled grid.

Each section is a `<Stage tone="light">` (green on cream) or `<Stage tone="dark">`
(cream on green). Stages expose `--bg` / `--fg` CSS variables, so hover fills
(`FillBox`), table rows and borders (`rule`, `rule-soft`, `muted`) invert
themselves automatically. The fixed nav switches to match the section under it.

## Structure

```
src/
  components/
    Stage            ColorStage + Stage — the two-tone section system
    FillBox          the fill-from-bottom hover box (buttons, rows, links)
    Rules            HRule / VRule — hairlines that draw themselves in
    VariableText     letters change weight as the cursor gets close
    SplitText        masked char/word reveal
    ScrollRevealText words light up with scroll (*word* = boxed)
    Magnetic         pulls children toward the cursor
    RollText         letter-roll hover for links
    Marquee          infinite, scroll-velocity-reactive marquee
    Cursor           custom cursor — add data-cursor="Label" to any element
    Preloader        boxed counter + tile-grid reveal
    PageTransition   green column route transition
    ProjectArt       generative project covers / screenshots
    Vinyl, Waveform  used on the What Else page
    BrowserFrame, CountUp, LocalTime, SectionLabel, Nav, Footer
  hooks/        useSynth (Web Audio loop), useLoader, useGoToSection
  sections/     Hero, About, Work (project table), Services, Stack (toolkit table), ElseTeaser
  pages/        Home, CaseStudy (/work/:slug), Else (/else), NotFound
  data/         site.js, projects.js
```

Animations respect `prefers-reduced-motion`. The custom cursor only appears on devices with a fine pointer.
