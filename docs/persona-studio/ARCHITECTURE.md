# Persona Studio — Architecture

Persona Studio is built **inside** the existing `Standard-Offer` Next.js
application as an isolated, top-level product area under `/studio`. It reuses
the toolchain (Next 15 App Router, React 19, Tailwind v4, shadcn primitives,
framer-motion, lucide) but not the selling-deck chrome or its `[locale]`
i18n routing.

## Route isolation

The next-intl middleware matcher excludes `studio` and `api`, so Persona Studio
is served at the top level without a locale prefix (mirroring the existing
`/thales` product area). See `src/middleware.ts`.

## Layers

```
Routes (Server Components)   src/app/studio/**
  └─ read via ──────────────────────────────┐
Repository (interface)       src/lib/persona-studio/repository/types.ts
  ├─ SeedRepository (Phase 1, read-only, in-memory)
  └─ SupabaseRepository (later phases, RLS)   ← swap-in, no UI change
Seed data                    src/lib/persona-studio/data/seed/**
Schemas (Zod, source of truth) src/lib/persona-studio/ai/schemas/**
Inferred types               src/types/persona-studio/**
Components                   src/components/persona-studio/**
```

### Rules

- **Server Components by default.** Client Components only for genuine
  interaction (search/filter, forms, chat, DnD, voting).
- **Client components never touch the repository or the database.** They receive
  server-fetched data as props or call route handlers.
- **Zod is the source of truth.** TS types are `z.infer`; the `types/*` modules
  only re-export them.
- **AI provider + retrieval are behind interfaces** (added in Phase 3/5); the
  seed repository has no AI dependency.

## Theming

One component set, two families. A container sets
`data-studio-theme="corporate" | "tdf"` and injects `--persona-accent`; all
tokens resolve from CSS variables in `globals.css`. No family-specific layout is
hard-coded in components.

## Tech stack (current + planned)

- **Now:** Next.js 15, React 19, TypeScript strict, Tailwind v4, Zod, Vitest.
- **Planned:** OpenAI Responses API (server-only, structured outputs),
  Supabase (Postgres + Auth + Storage + RLS), pgvector retrieval, Playwright.
