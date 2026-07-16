# Persona Studio — Roadmap

## Phase 1 — Foundation ✅ (delivered)

- Isolated `/studio` product area + theme layer (two families, one component set)
- Zod data model + inferred types + version-history schema
- Repository interface + read-only seed repository + mock auth + env validation
- Seeded **Corporate Workplace** (8 Personix archetypes) and **Tour de France
  Hospitality** (4 personas) projects
- Persona **library** (searchable/filterable), **gallery**, and editorial
  **detail** view with evidence tags, confidence explanation and coverage
- 26 unit tests; lint, typecheck and production build green

## Phase 2 — Create & edit

- 6-step project creation wizard (context → sources → clusters → generate →
  review → publish)
- Block-based persona editor (add/remove/reorder/rename sections, custom fields,
  save templates)
- Evidence tagging + confidence controls, source management, version history UI
- Adds `react-hook-form`

## Phase 3 — AI persona chat

- Provider abstraction + OpenAI Responses API (streaming, structured output)
- Evidence/basis panel, suggested questions, insufficient-evidence behaviour
- Conversation persistence; versioned prompt files

## Phase 4 — Workshop features

- Presentation mode, compare (2–5), needs map, journey lens, idea challenge,
  workshop board
- Playwright end-to-end journey (open TdF → browse 4 → compare → ask Thomas →
  challenge an idea → presentation mode)

## Phase 5 — Research ingestion (MVP in progress)

- ✅ Soft facilitator write-gate (`PERSONA_STUDIO_ACCESS_SECRET` + `/studio/unlock`)
- ✅ Source text/PDF upload → extract → chunk into `EvidenceItem` + keyword retrieval
- ✅ Facilitator session path (`/session`: Present → Compare → Challenge → Board)
- ✅ Anti-stereotype review + differentiation score on persona detail
- ⏳ Supabase + RLS, pgvector embeddings, real cluster/persona generation

## Known limitations (Phase 1)

- Portraits are large on XP assets (compression still recommended).
- Write gate is cookie-based (not full Supabase Auth).
- Board / chat persistence remain browser-local.
- UI is bilingual FR/EN via cookie; persona content is authored bilingually.
