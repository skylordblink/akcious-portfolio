export type ServiceKey =
  | "trading-bots"
  | "casino-sportsbook"
  | "defi-smart-contracts"
  | "ai-agents"
  | "fullstack";

export type ThreeKind =
  | "candlesticks"
  | "dice"
  | "nodes"
  | "distort"
  | "stack";

export type Service = {
  slug: ServiceKey;
  title: string;
  shortTitle: string;
  tagline: string;
  problem: string;
  delivers: string[];
  stack: string[];
  threeKind: ThreeKind;
};

export const SERVICES: Service[] = [
  {
    slug: "trading-bots",
    title: "Trading & Telegram Bots",
    shortTitle: "Bots",
    tagline: "24/7 automation that signals, executes, and reports.",
    problem:
      "Manual trading and Telegram ops don't scale. Markets move while you sleep, signals get missed, and busy ops eat up the team. I build production bots that watch markets, execute trades, route alerts, and keep the ledger honest — running unattended for months at a time.",
    delivers: [
      "Exchange APIs — Binance, Bybit, OKX, MT5 and beyond",
      "Custom strategy engines with backtest harness",
      "Risk management & position sizing built in",
      "Telegram & Discord alerts with in-thread execution",
      "PnL tracking, daily reports, and ops dashboards",
      "Hardened deployment with auto-restart & health checks",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "Python",
      "Redis",
      "PostgreSQL",
      "Docker",
      "WebSockets",
    ],
    threeKind: "candlesticks",
  },
  {
    slug: "casino-sportsbook",
    title: "Casino & Sportsbook Platforms",
    shortTitle: "iGaming",
    tagline: "Real-money platforms built to handle real traffic.",
    problem:
      "iGaming products live or die on three things: trust, throughput, and time-to-market. I build casino and sportsbook platforms end to end — game integrations, live odds, wallet, KYC, payouts — production-grade from day one so you can take real wagers without firefighting infra.",
    delivers: [
      "Live odds engines & real-time event streaming",
      "Wallet, deposits, withdrawals, and ledgers you can audit",
      "KYC, AML, and responsible-gaming integrations",
      "Provably-fair RNG and game-result transparency",
      "Sportsbook builders with custom market types",
      "Operator dashboards, agent tools, and revenue reports",
    ],
    stack: [
      "Next.js",
      "Node.js",
      "TypeScript",
      "Socket.io",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "Cloudflare",
    ],
    threeKind: "dice",
  },
  {
    slug: "defi-smart-contracts",
    title: "DeFi Protocols & Smart Contracts",
    shortTitle: "DeFi",
    tagline: "Audited smart contracts and the dApps that drive them.",
    problem:
      "DeFi is unforgiving — one bug and the treasury is gone. I design and ship smart-contract systems with the discipline of a payments company: tests, invariants, fuzzing, and frontend integrations that don't lie about state. AMMs, lending vaults, RWA tokenization, staking — all built to survive an audit.",
    delivers: [
      "AMM and lending-vault contracts in Solidity",
      "RWA tokenization & on-chain governance",
      "Foundry & Hardhat test suites with coverage",
      "Subgraph indexing for fast frontend reads",
      "Wallet integrations (RainbowKit, wagmi, viem)",
      "Multi-chain deploys with consistent ABIs",
    ],
    stack: [
      "Solidity",
      "Foundry",
      "Hardhat",
      "viem",
      "wagmi",
      "The Graph",
      "Next.js",
      "TypeScript",
    ],
    threeKind: "nodes",
  },
  {
    slug: "ai-agents",
    title: "AI Agents & Workflow Automation",
    shortTitle: "AI",
    tagline: "Agents that actually do the work, not just chat.",
    problem:
      "Most AI demos are chatbots that hallucinate. I build agents that touch real systems — your CRM, your inbox, your DB — with evals, guardrails, and a paper trail. RAG pipelines that retrieve what matters, workflow automation that shaves hours off your team's week.",
    delivers: [
      "LLM agents with tool use & function calling",
      "RAG pipelines on your private data",
      "Evals, guardrails, and observability",
      "Lead scoring and intent classification",
      "Integrations with CRMs, calendars, and ticket systems",
      "Background workers with retry, queue, and audit",
    ],
    stack: [
      "Python",
      "TypeScript",
      "OpenAI",
      "Anthropic",
      "LangChain",
      "Pinecone",
      "Postgres pgvector",
      "Temporal",
    ],
    threeKind: "distort",
  },
  {
    slug: "fullstack",
    title: "Full-Stack Web & Mobile",
    shortTitle: "Full-Stack",
    tagline: "Schema to deployment — production from the first commit.",
    problem:
      "Half-finished apps don't ship revenue. I deliver web and mobile products end to end — design, schema, API, frontend, payments, deployment, and post-launch ops. Built the way you'd build it if you had the time: typed top to bottom, monitored, fast to iterate on.",
    delivers: [
      "Web apps in Next.js 15 / React 19",
      "Mobile apps in React Native / Expo",
      "REST + real-time APIs (Socket.io, WebRTC)",
      "Stripe, PayPal, and crypto payment rails",
      "Auth, billing, admin tooling out of the box",
      "Deploy on Vercel, Cloudflare, or your cloud",
    ],
    stack: [
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "Tailwind",
      "PostgreSQL",
      "Supabase",
      "Stripe",
    ],
    threeKind: "stack",
  },
];

export const SERVICE_BY_SLUG: Record<ServiceKey, Service> = SERVICES.reduce(
  (acc, s) => {
    acc[s.slug] = s;
    return acc;
  },
  {} as Record<ServiceKey, Service>
);
