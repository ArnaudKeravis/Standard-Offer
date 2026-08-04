# Sodexo Labs — CoDesign enrichment + illustration elements

**Date:** 2026-08-04  
**Status:** Approved in conversation — pending file review  
**Parent:** `2026-08-04-sodexo-labs-presentation-design.md`  
**References:** Labs intro PPTX, [CoDesign presentation](https://sodexo-codesign-os.vercel.app/codesign)

---

## 1. Problem

The shipped Labs deck:

1. Uses **photographic slide backdrops** that fight the Labs visual ID and feel generic.
2. For **internal** sessions, underuses CoDesign’s commercial proof spine — especially the **numbers** (KPI strip + growth engine) and **engagement models**.
3. Keeps a Labs-only “session formats” framing instead of CoDesign’s buyable engagement models.

---

## 2. Locked decisions

| Topic | Decision |
|---|---|
| Visuals | **A** — Remove photo backdrops; use transparent isometric **elements** from the Labs PPT as floating accents |
| Numbers (internal) | **B** — KPI strip + Why / Growth engine (two slides after Welcome) |
| Engagement | **B** — CoDesign engagement models (One-Shot / Light / Medium / Premium), replacing Formats |
| Audience | Internal gets the two numbers slides; external skips them. Engagement models + illustration accents for both |
| Lifecycle years | Out of scope for this pass (user chose engagement models over lifecycle stages) |

---

## 3. Slide order

### External

Cover → Welcome → Offers → Method → Zones → Persona → Cases → Network → **Engagement models** → Credentials → Close

### Internal

Cover → Welcome → **KPI strip** → **Why / Growth engine** → Offers → Method → Zones → Persona → Cases → Network → **Engagement models** → Credentials → Close

HUD progress / `SLIDE_COUNT` must be **audience-aware** (11 external, 13 internal).

---

## 4. Content model

Add to pack (Zod):

```ts
LabsKpi { value: string; label: string }  // 4 items
LabsGrowthCopy {
  headline: string
  body: string
  impacts: { title: string; outcome: string }[]  // 4 cards
}
LabsEngagement {
  id: string
  name: string
  duration: string
  framing: string      // e.g. Time-to-value
  summary: string
  investment?: string  // pricing / recharge note when appropriate
}
```

- `kpis` + `growth` required when `audience === "internal"`, omitted/empty for external.
- `engagements` (length 4) replaces `formats` in the pack (migrate schema; update resolve + tests).
- Source numbers/copy from CoDesign Ouverture + Why CoDesign (same published figures: 25 / 3 yrs / €1B / +3%; portfolio mix; uplift / cross-sell / margin; four impact cards).

---

## 5. Visual treatment

### Remove

- `SlideBackdrop` photo usage on Cover / Welcome / Network / Close
- Side photo panel on Formats (retired with Formats slide)
- Reliance on `public/labs/presentation/*.jpg` for deck slides (hub card may keep one still or switch to an element)

### Add

Extract transparent PNGs from Labs PPT into `public/labs/elements/`:

| Asset | Use |
|---|---|
| Theatre / Hub / Garage / Immersion scenes | Zones cards or Zones slide accents |
| Session / space collage | Cover or Welcome floating element |
| Small collaboration vignettes | Offers / Method / Close accents |
| Optional ecosystem graphic | Network (only if it reads clean at 16:9; else keep region list) |

**Rules:** never full-bleed photo backgrounds; elements sit beside/above type on Labs color fields; respect reduced motion; keep territory CSS accent vars.

New helper: `SlideAccent` (positioned `Image`, decorative `aria-hidden`).

---

## 6. Interactions

- KPI values: staggered enter; light count-up only when value is purely numeric and `prefers-reduced-motion` is off
- Growth impact cards + engagement cards: stagger like existing `StaggerIn`
- Engagement cards: hover/focus lift (presentation-safe)
- Slide engine unchanged (keyboard / click / HUD)

---

## 7. Non-goals

- Contract lifecycle year strips (Year −1 → retention) — deferred
- Replacing CoDesign OS or linking every metric live
- FR copy
- Auto-import from OneDrive PPT

---

## 8. Definition of done

- Photo backdrops gone from Labs slides; PPT elements in use on key slides
- Internal session shows KPI + Growth slides; external does not
- Formats slide replaced by Engagement models (CoDesign content)
- Lint, `tsc`, Labs unit tests, and build pass
- Deployable on `main` / Vercel
