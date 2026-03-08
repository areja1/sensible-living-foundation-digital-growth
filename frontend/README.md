# Frontend — Sense Gardens Map

Next.js 14 interactive map application built with TypeScript, Tailwind CSS, and Mapbox GL JS.

## Stack
- Next.js 14 + TypeScript
- Tailwind CSS
- Mapbox GL JS + react-map-gl
- shadcn/ui components
- urql (GraphQL client)

## Folder Structure
```
frontend/
├── app/               # Next.js app router
│   ├── page.tsx       # homepage
│   └── map/           # interactive map page
├── components/
│   ├── Map/           # map-specific components
│   ├── ui/            # shadcn/ui components
│   └── layout/        # Navbar, Footer
├── lib/
│   ├── graphql/       # GraphQL queries
│   └── mapbox/        # map layer configs
├── public/            # static assets
└── .env.local.example # copy to .env.local and fill in keys
```

## Setup
```bash
cp .env.local.example .env.local
npm install
npm run dev
```
