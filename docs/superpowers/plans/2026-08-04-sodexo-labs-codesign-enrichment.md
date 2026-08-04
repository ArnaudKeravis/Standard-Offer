# Sodexo Labs CoDesign Enrichment — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrich Labs with CoDesign KPI + growth slides (internal), engagement models, and PPT illustration accents instead of photo backdrops.

**Architecture:** Extend Zod pack (`kpis`, `growth`, `engagements` replacing `formats`); audience-aware slide list in `labs-deck`; extract transparent PNGs to `public/labs/elements/`; new `SlideAccent` helper; retire Formats + photo `SlideBackdrop` usage on deck slides.

**Tech Stack:** Next.js 15, Zod, framer-motion, Vitest, extracted PPTX media.

**Spec:** `docs/superpowers/specs/2026-08-04-sodexo-labs-codesign-enrichment-design.md`

---

### Task 1: Schema + seed data

**Files:**
- Modify: `src/lib/sodexo-labs/schemas/content.ts`, `schemas/index.ts`
- Create: `src/lib/sodexo-labs/data/kpis.ts`, `growth.ts`, `engagements.ts`
- Modify: `src/lib/sodexo-labs/resolve-pack.ts`
- Delete or stop importing: `data/formats.ts` (after migration)
- Modify: `tests/sodexo-labs/unit/schemas.test.ts`, `resolve-pack.test.ts`

- [ ] Add `LabsKpi`, `LabsGrowthCopy`, `LabsEngagement`; replace `formats` with `engagements` on `LabsPack`; make `kpis`/`growth` optional (present when internal)
- [ ] Seed CoDesign numbers + engagement models
- [ ] Update `resolveLabsPack` + tests
- [ ] Commit

### Task 2: Extract PPT elements

**Files:**
- Create: `public/labs/elements/*.png` from Labs intro PPTX media
- Create: `src/components/sodexo-labs/deck/slide-accent.tsx`

- [ ] Copy curated transparent assets (theatre/hub/garage/immersion + collage accents)
- [ ] Add `SlideAccent` positioned decorative Image
- [ ] Commit

### Task 3: New slides + deck wiring

**Files:**
- Create: `kpi-slide.tsx`, `growth-slide.tsx`, `engagements-slide.tsx`
- Modify: `labs-deck.tsx`, `slides/index.ts`
- Modify/retire: `formats-slide.tsx`
- Modify: cover, welcome, network, close, zones, method (remove backdrops, add accents)

- [ ] Audience-aware slide array (13 internal / 11 external)
- [ ] Wire HUD dark slides correctly
- [ ] Commit

### Task 4: Verify + deploy

- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build`
- [ ] Push `main` for Vercel

---
