# Akcious Pison — 3D Portfolio

A 3D portfolio site for **Akcious Pison** — full-stack developer & bot engineer. React 18 + TypeScript + Vite, with a Three.js character scene, GSAP-driven scroll animations, a CLI-themed boot loader, and dedicated service pages with per-service `@react-three/fiber` scenes.

**Live:** https://akcious.vercel.app

Open source under MIT — fork it, customize it, ship your own portfolio.

---

## Table of Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Customization guide — fork it for yourself](#customization-guide--fork-it-for-yourself)
- [Adding more service pages](#adding-more-service-pages)
- [The 3D character — important if you fork](#the-3d-character--important-if-you-fork)
- [Deployment](#deployment)
- [Available scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Boot-terminal loader** — Dark CLI-style terminal card. Status lines print as percent climbs, ending in `PRESS ANY KEY TO ENTER` (desktop) or `TAP ANYWHERE TO ENTER` (touch). First visit per session only — sub­sequent home visits skip it via `sessionStorage`.
- **Five deep-linkable service pages** — `/services/trading-bots`, `/services/casino-sportsbook`, `/services/defi-smart-contracts`, `/services/ai-agents`, `/services/fullstack`. Each has a hero, problem statement, deliverables list, tech-stack chips, reused Contact section, and a **dedicated `@react-three/fiber` 3D centerpiece** (candlesticks, dice + chip, network nodes, distorted icosahedron, layered platform stack).
- **3D character scene** on the home page (raw Three.js) with GSAP-driven scroll choreography, head tracking, and an animated intro.
- **TechStack physics scene** — floating tech-icon stack with Rapier physics.
- **Custom cursor**, smooth scroll via GSAP ScrollSmoother, character-by-character text reveals.
- **Client-side routing** with `react-router-dom` + `vercel.json` SPA fallback so direct loads of `/services/...` URLs don't 404.
- **Responsive** — hero stacks on mobile, 3D scenes scale down, typography uses `clamp()`.

---

## Tech stack

**Core**
- React 18
- TypeScript
- Vite 5

**3D & animation**
- `three` — raw Three.js for the home character scene
- `@react-three/fiber` + `@react-three/drei` — declarative R3F for service-page 3D scenes
- `@react-three/postprocessing`, `@react-three/cannon`, `@react-three/rapier` — physics & post-effects (TechStack section)
- `gsap` + `@gsap/react` — scroll smoother, split-text reveals, character timeline

**Supporting**
- `react-router-dom` — routing
- `react-icons` — icon set
- `@vercel/analytics` — Vercel analytics hook

---

## Project structure

```text
.
├── public/
│   ├── favicon.svg              # AP monogram favicon
│   ├── models/                  # 3D character GLB + HDR env
│   ├── draco/                   # DRACO decoder for GLB compression
│   └── images/                  # project screenshots + tech logos
├── src/
│   ├── App.tsx                  # Router + LoadingProvider wrapper
│   ├── main.tsx                 # React root
│   ├── index.css, App.css       # global styles, CSS vars, breakpoints
│   ├── context/
│   │   └── LoadingProvider.tsx  # loader state (home only)
│   ├── components/
│   │   ├── Character/           # 3D character scene (raw Three.js)
│   │   ├── Service3D/           # R3F per-service 3D scenes
│   │   │   ├── index.tsx        # Canvas + scene dispatcher
│   │   │   ├── CandlesticksScene.tsx
│   │   │   ├── DiceScene.tsx
│   │   │   ├── NodesScene.tsx
│   │   │   ├── DistortScene.tsx
│   │   │   └── StackScene.tsx
│   │   ├── styles/              # per-component CSS
│   │   ├── utils/               # GSAP timelines, splitText
│   │   ├── Loading.tsx          # boot-terminal loader
│   │   ├── MainContainer.tsx    # home page composition
│   │   ├── Navbar.tsx           # home nav (GSAP ScrollSmoother)
│   │   ├── Landing.tsx, About.tsx, WhatIDo.tsx, Career.tsx,
│   │   ├── Work.tsx, TechStack.tsx, Contact.tsx,
│   │   ├── SocialIcons.tsx, Cursor.tsx, HoverLinks.tsx
│   └── pages/
│       ├── ServicePage.tsx      # shared layout for all 5 service pages
│       ├── servicesData.ts      # all service content (single source of truth)
│       └── styles/ServicePage.css
├── vercel.json                  # SPA fallback for /services/* routes
├── package.json
└── vite.config.ts
```

---

## Getting started

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+

### Run locally

```bash
git clone https://github.com/skylordblink/akcious-portfolio.git
cd akcious-portfolio
npm install
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

The first time you load the page you'll see the boot-terminal loader. Subsequent visits in the same session skip it (it's cached in `sessionStorage`). To force the loader to replay, clear `sessionStorage` or open in incognito.

---

## Customization guide — fork it for yourself

If you fork this repo to build your own portfolio, here's a file-by-file map of what to change. All content is hardcoded in component files (with one exception — service pages, which use a data file).

### Home page content

| File | What to edit |
|---|---|
| [`index.html`](index.html) | `<title>` and `<meta name="description">` |
| [`public/favicon.svg`](public/favicon.svg) | Replace the `AP` text with your initials, or swap colors |
| [`src/components/Landing.tsx`](src/components/Landing.tsx) | Big hero name + role tagline |
| [`src/components/About.tsx`](src/components/About.tsx) | "About Me" paragraph |
| [`src/components/WhatIDo.tsx`](src/components/WhatIDo.tsx) | Two skill cards (titles, descriptions, tag lists) |
| [`src/components/Career.tsx`](src/components/Career.tsx) | Career timeline entries |
| [`src/components/Work.tsx`](src/components/Work.tsx) | `projects` array — title, category, tools, image path, link |
| [`src/components/Contact.tsx`](src/components/Contact.tsx) | "Work With Me" copy + the credit line |
| [`src/components/SocialIcons.tsx`](src/components/SocialIcons.tsx) | Social URLs and the icon set (currently GitHub / Telegram / WhatsApp / Instagram) |
| [`src/components/Navbar.tsx`](src/components/Navbar.tsx) | Logo initials + `navbar-connect` link text |
| [`src/components/Loading.tsx`](src/components/Loading.tsx) | `BOOT_LINES` array — the status messages that print during boot |
| [`public/images/`](public/images/) | Replace project screenshots referenced in `Work.tsx` |

### Service page content

All five service pages share one component ([`src/pages/ServicePage.tsx`](src/pages/ServicePage.tsx)) and read from one file:

**[`src/pages/servicesData.ts`](src/pages/servicesData.ts)** — every service has:
- `slug` — URL segment (`/services/<slug>`)
- `title`, `shortTitle`, `tagline`
- `problem` — 2-3 sentence paragraph
- `delivers[]` — bullet list (rendered with a teal `>` glyph)
- `stack[]` — technology chips
- `threeKind` — which 3D scene to mount (`candlesticks` / `dice` / `nodes` / `distort` / `stack`)

Edit copy freely without touching layout code.

### Styling & theme

Site-wide tokens are in [`src/index.css`](src/index.css):

```css
:root {
  --accentColor: #5eead4;       /* teal accent */
  --backgroundColor: #0a0e17;   /* dark page bg */
}
body {
  background-color: #0a0e17;
}
```

Change these to retheme the whole site. Per-component styles are in [`src/components/styles/`](src/components/styles/). Service page styles are in [`src/pages/styles/ServicePage.css`](src/pages/styles/ServicePage.css).

---

## Adding more service pages

Want a 6th service (e.g., "Mobile Apps Only")? Three small changes:

1. **Add an entry to `servicesData.ts`:**
   ```ts
   {
     slug: 'mobile-apps',
     title: 'Mobile Apps',
     shortTitle: 'Mobile',
     tagline: 'Native-feeling apps that ship.',
     problem: '...',
     delivers: ['...', '...'],
     stack: ['React Native', 'Expo', 'TypeScript'],
     threeKind: 'stack',   // reuse an existing scene, or add a new one
   },
   ```
   Update the `ServiceKey` and `ThreeKind` union types at the top of the file accordingly.

2. **Add it to the Contact services list** in [`src/components/Contact.tsx`](src/components/Contact.tsx) (the `SERVICES_LIST` array).

3. **(Optional) New 3D scene** — if you want a unique scene rather than reusing one of the existing five:
   - Add `MyScene.tsx` to [`src/components/Service3D/`](src/components/Service3D/)
   - Register it in `src/components/Service3D/index.tsx` under a new `ThreeKind` key

That's it. No new routes to define — `/services/:slug` is a single dynamic route in `App.tsx`.

---

## The 3D character — important if you fork

The 3D character model in `public/models/character.enc` is an **encrypted GLB** loaded and decrypted at runtime by [`src/components/Character/`](src/components/Character/). It depicts a specific person and ships as-is from the original boilerplate.

**If you fork this repo, replace or remove the character — don't ship someone else's likeness as your own work.** Options:

1. **Replace with your own GLB** — Provide an unencrypted `.glb` and update [`src/components/Character/utils/character.ts`](src/components/Character/utils/character.ts) to load it via `GLTFLoader` directly (skip the decryption step).
2. **Remove the character section** — Strip `<CharacterModel />` from [`src/App.tsx`](src/App.tsx), and the related scene logic in MainContainer / Landing. Replace with something simpler (a 3D logo, abstract geometry, or no 3D at all).
3. **Use one of the service-page 3D scenes as the hero** — They're built with `@react-three/fiber` primitives in [`src/components/Service3D/`](src/components/Service3D/) and need no external assets.

The service-page 3D scenes ([`src/components/Service3D/`](src/components/Service3D/)) use only primitives (`<boxGeometry>`, `<sphereGeometry>`, etc.) and drei helpers — no external assets — so they're fully reusable.

---

## Deployment

### Vercel (recommended)

1. Push your fork to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo.
3. Framework preset auto-detects as **Vite** → leave defaults.
4. Click Deploy.

The included [`vercel.json`](vercel.json) handles SPA fallback so direct loads of `/services/...` URLs serve `index.html` correctly. No extra config needed.

### Netlify

Set the build command to `npm run build` and publish directory to `dist`. Add a `_redirects` file with:

```
/*  /index.html  200
```

### Cloudflare Pages / static hosts

Same idea — point the build at `dist/` and configure SPA fallback (rewrite all unknown routes to `/index.html`).

---

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with `--host` (visible on LAN) |
| `npm run build` | Type-check (`tsc -b`) + production bundle (`vite build`) |
| `npm run preview` | Serve the production build locally for verification |
| `npm run lint` | Run ESLint across the project |

---

## Troubleshooting

**Blank screen in dev**
Check the browser console. Most blank-screen issues are import path typos (case-sensitive on Linux/Mac but not Windows — push to a CI build to catch).

**`/services/...` 404s on a fresh deploy**
Confirm `vercel.json` (or your platform's equivalent rewrite rule) is in place. Vercel needs `index.html` served for unknown routes.

**Loader replays even after first visit**
The `sessionStorage` key is `akcious_booted`. If you're hard-refreshing the same tab, it should persist. Across tabs / windows it resets. To force-replay during development, run `sessionStorage.clear()` in DevTools.

**3D performance issues on low-end devices**
The character scene is the heaviest asset. Two levers: reduce `renderer.setPixelRatio(...)` in [`Scene.tsx`](src/components/Character/Scene.tsx), or strip the postprocessing effects in [`TechStack.tsx`](src/components/TechStack.tsx).

**Type errors after editing `servicesData.ts`**
The `ServiceKey` and `ThreeKind` union types at the top of the file are enforced. Add new slugs / scene kinds there before referencing them.

**GSAP plugins**
This project uses the standard `gsap` package — `SplitText` and `ScrollSmoother` are now in the free core. If you're migrating from older code, remove any `gsap-trial` references and reinstall.

---

## License

MIT — see [LICENSE](LICENSE).

If you ship a portfolio based on this code, a link back is appreciated but not required.
