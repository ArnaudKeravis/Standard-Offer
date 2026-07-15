<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Persona Studio

Persona Studio is a premium research + design tool for Sodexo CoDesign teams,
built inside this repo at `/studio` (isolated from the deck's `[locale]` i18n).
It lets teams create, visualize, talk to, and workshop evidence-based personas.

## Architecture (read before major changes)

- Routes: `src/app/studio/**` (Server Components by default).
- Data model (Zod = source of truth): `src/lib/persona-studio/ai/schemas/**`,
  inferred types in `src/types/persona-studio/**`.
- Data access: `PersonaRepository` interface in
  `src/lib/persona-studio/repository/**` (Phase 1 = read-only `SeedRepository`).
- Seed data: `src/lib/persona-studio/data/**`.
- Components: `src/components/persona-studio/**`.
- Docs: `docs/persona-studio/{PRODUCT,ARCHITECTURE,DATA_MODEL,AI_GROUNDING,SECURITY,ROADMAP}.md`.
- Rules: `.cursor/rules/persona-studio-*.mdc`.

## Commands

- Dev: `npm run dev` → open `/studio`
- Test: `npm run test` · Lint: `npm run lint` · Types: `npx tsc --noEmit`
- Build: `npm run build`

## Coding standards

- Zod schemas are the source of truth; TS types are `z.infer`. No `any` without
  a documented reason.
- Server Components by default; client components never touch the repository/DB.
- Next.js 15: `await` route `params` (they are Promises).

## Safety constraints (never)

- Never fabricate evidence or present assumptions as research.
- Never silently weaken a Zod schema.
- Never expose API keys or put AI prompts inside UI components.
- Never run destructive DB operations or edit production data.
- Never delete/skip failing tests to make a build pass.
- Never do a large refactor without presenting a plan first.

## Definition of done

`npm run lint`, `npx tsc --noEmit`, `npm run test` and `npm run build` all pass,
and the affected screens render with the seeded data.
