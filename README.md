## Crypto Wiki

Crypto wiki is an end-to-end crypto-focused wiki where users create, view, and share formal
cryptography definitions with real-time custom LaTeX rendering (KaTeX) with macro sets. Users can
also embed links to definitions directly in academic papers, drastically reducing paper verbosity
and allowing for custom rendering of LaTeX definitions based on preferred macros on a per-user
basis.

The app consists of:

- Backend: Fastify API, PostgreSQL, Prisma 7
- Frontend: React + Vite + TanStack Router + React Query, real-time KaTeX/Markdown rendering

**Monorepo Layout**

- backend/
  - src/: Fastify server and routes
  - prisma/: Prisma schema and migrations
  - lib/: Prisma client setup with Postgres adapter
- frontend/
  - src/: React app (routes, components, Markdown/KaTeX renderer)

**Prerequisites**

- Node.js: LTS Krypton (v24.11.1) recommended
- PostgreSQL: running locally on port 5432 (or update env accordingly)
- npm
