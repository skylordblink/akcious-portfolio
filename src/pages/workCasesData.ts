export type WorkCaseSlug = "optionscope";

export type WorkCaseBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "image"; src: string; alt: string; caption?: string };

export type WorkCaseSection = {
  eyebrow: string;
  heading: string;
  blocks: WorkCaseBlock[];
};

export type WorkCase = {
  slug: WorkCaseSlug;
  title: string;
  subtitle: string;
  heroTagline: string;
  coverImage: string;
  meta: { label: string; value: string }[];
  techStack: string[];
  sections: WorkCaseSection[];
};

export const WORK_CASES: WorkCase[] = [
  {
    slug: "optionscope",
    title: "Optionscope",
    subtitle: "NSE options analysis, automated from a phone",
    heroTagline:
      "A two-part system — a Windows desktop “Control Room” and a mobile-first web app — that captures live TradingView charts, pulls NSE option-chain data, and returns a structured trade analysis in under three minutes per symbol.",
    coverImage: "/images/optionscope-control-room.png",
    meta: [
      { label: "Market", value: "Indian equity & derivatives (NSE)" },
      { label: "Timeline", value: "Two weeks, end to end" },
      { label: "Role", value: "Solo build — design, engineering, deployment, docs" },
      { label: "Status", value: "Shipped" },
    ],
    techStack: [
      "Electron",
      "Node.js",
      "TypeScript",
      "Puppeteer",
      "Anthropic Claude API",
      "Cloudflare Tunnel",
      "PWA Web App Manifest",
      "NSE public data feed",
    ],
    sections: [
      {
        eyebrow: "The work",
        heading: "Turning a 30-minute manual workflow into a 3-minute one-tap analysis",
        blocks: [
          {
            kind: "paragraph",
            text:
              "Active options traders on the NSE have a repeatable but slow daily ritual — pull up a symbol on TradingView across four timeframes, check the indicator stack, then walk over to nseindia.com to read the option-chain Open Interest, then build a hedged trade thesis from all of it. Done well, it takes thirty minutes per symbol. Done across a watchlist, it doesn’t happen at all.",
          },
          {
            kind: "paragraph",
            text:
              "Optionscope automates the whole pipeline. A trader types a symbol on their phone; the system captures the trader’s own TradingView chart layout, fetches live option-chain OI from NSE, hands both to Claude with a structured analysis prompt, and renders the response — direction, two hedged trade setups with strikes priced from live premiums, execution notes, invalidation levels — back to the phone in roughly three minutes. No login sharing, no cloud servers, no port forwarding, no manual screenshots.",
          },
        ],
      },
      {
        eyebrow: "The desktop app",
        heading: "Control Room — install, paste, press one button",
        blocks: [
          {
            kind: "image",
            src: "/images/optionscope-control-room.png",
            alt: "Optionscope Control Room desktop app — Setup screen with API key, model picker, TradingView chart links, and readiness checklist",
            caption: "Control Room — Setup + Readiness + Go online, all on one screen.",
          },
          {
            kind: "paragraph",
            text:
              "The operator side is a single Windows desktop app, packaged as one .exe installer. Open it, paste the API key, paste four TradingView chart-share links, pick the model, and press Go online. The app starts the capture engine, opens the secure phone tunnel, and shows the resulting link as a QR code the trader scans with their phone.",
          },
          {
            kind: "bullets",
            items: [
              "Built with Electron — Windows installer, system tray, auto-bundled Node.js runtime so the client never installs Node by hand",
              "A live readiness checklist that turns green as each dependency satisfies (API key, chart links, browser detected, tunnel binary present, engine running, phone link live)",
              "One-shot Go online button — starts the capture engine and the Cloudflare tunnel together; one Go offline button stops them",
              "Quick-link mode (rotating tunnel URL, zero setup) or Permanent-link mode (stable bookmarkable URL via one-time Cloudflare domain setup)",
              "Detects the trader’s installed Chrome or Edge for chart capture so the installer stays small — no bundled second browser",
              "Settings persisted locally in JSON; nothing leaves the machine except the analysis request to Anthropic",
            ],
          },
        ],
      },
      {
        eyebrow: "The mobile app",
        heading: "Phone-first interface, installable as a PWA",
        blocks: [
          {
            kind: "paragraph",
            text:
              "Everything the trader actually uses lives on the phone. Open the saved link, type a symbol, get a complete structured analysis back in under three minutes — direction and momentum table, two high-conviction hedged trade setups with primary leg, hedge leg, net premium, max profit, max loss, breakeven, targets, stops and risk-to-reward, execution notes, and a structure-invalidation table.",
          },
          {
            kind: "bullets",
            items: [
              "Submit any NSE symbol — indices (NIFTY, BANKNIFTY), sector indices, single-stock options or futures",
              "Output rendered as clean tables sized for phone screens, ready to act on",
              "Continue the conversation in-place — ask follow-up questions about the same symbol without resubmitting",
              "Companion AI assistant mode with streaming chat, optional web search for live market context, and file uploads (charts, PDFs, CSVs)",
              "Installable as a PWA — “Add to home screen” on Android or iOS gives a full-screen icon, no browser chrome",
              "Conversations saved on the trader’s own machine; revisit any past chat from the sidebar",
            ],
          },
        ],
      },
      {
        eyebrow: "How it's built",
        heading: "Local-first architecture, no cloud middleman",
        blocks: [
          {
            kind: "paragraph",
            text:
              "The architectural call that made the rest of the system possible: never touch the trader’s TradingView account. TradingView lets users publish a saved chart layout as a public, logged-out-viewable link — indicators and all. The capture engine fetches those public links with headless Chromium and screenshots them, so 2FA, session cookies, and credentials stay entirely on the trader’s side.",
          },
          {
            kind: "bullets",
            items: [
              "Headless Chromium (Puppeteer) captures the trader’s exact chart layout across 5-minute, 15-minute, Daily and Weekly timeframes — a single capture cycle per symbol",
              "NSE option-chain Open Interest and OI-Change pulled from the public endpoint — no broker API, no paid vendor",
              "All four chart images plus the option-chain payload sent to Claude in a single multi-image request along with an editable analysis prompt stored as a plain text file",
              "Cloudflare Tunnel provides a stable HTTPS URL from the trader’s home PC — no port forwarding, no dynamic DNS, no paid domain",
              "Tunnel runs as a Windows background service; starts on boot at market open, stops cleanly on shutdown",
              "Switchable model tier in the Control Room — Sonnet 4.6 for fast, low-cost daily use or Opus 4.8 for deeper analysis on demand",
              "Anthropic API key, chart links, conversation history and analysis output all stored on the trader’s own machine — nothing on third-party servers",
            ],
          },
        ],
      },
      {
        eyebrow: "Outcome",
        heading: "Three minutes per symbol, no laptop required",
        blocks: [
          {
            kind: "paragraph",
            text:
              "Shipped end-to-end in two weeks — backend engine, frontend interface, desktop app, mobile PWA, secure tunnel setup, full operator documentation. The trader now runs the same analysis they used to do manually in thirty minutes, from their phone, in under three. Across a watchlist, it’s the difference between an idea worth pursuing and an idea that never gets evaluated.",
          },
        ],
      },
    ],
  },
];

export const WORK_CASE_BY_SLUG: Record<WorkCaseSlug, WorkCase> = WORK_CASES.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<WorkCaseSlug, WorkCase>
);
