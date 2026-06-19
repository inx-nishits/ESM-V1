# ESM Products — B2B Storefront

Next.js 15 foundation for the ESM Products B2B PPE eCommerce platform.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- ShadCN UI (New York)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server (Turbopack)
- `npm run build` — production build
- `npm run typecheck` — TypeScript check
- `npm run lint` — ESLint

## Architecture

See Phase 7 implementation architecture for route groups, content provider pattern, and feature module structure.

## Foundation Status

- Design tokens (ESM Navy, Coral, Warm Gray)
- Mock content provider with sample catalog
- API route scaffolding
- Providers: cart, compare, saved products, checkout, session
- SEO: metadata helpers, sitemap, robots
- Route scaffolds for all planned pages (no page UI implemented)
