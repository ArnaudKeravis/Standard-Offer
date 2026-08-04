# Newsletters and monitoring — Hub artefact (Design Spec)

**Date:** 2026-08-04  
**Status:** Approved for planning (pending final user review of this document)  
**Repo:** Standard-Offer (Next.js 15 / Vercel)  
**Primary reference:** Labs newsletter HTML — CoDesign & Labs FY26 Yearly Retrospective  
(`9ab2d7d8-59c4-4f92-9d80-bdbeafe670a1.html`)

---

## 1. Problem

The CoDesign sandbox hub (`/`) lists live artefacts (Labs, Studio, demos, CoDesign OS) but has no home for **Labs / CoDesign newsletters** and year-in-review artefacts. The FY26 Yearly Retrospective already exists as a polished standalone HTML page and should be discoverable from the hub without a full React rebuild.

---

## 2. Goals & success criteria

### Goals

1. Add a hub card **“Newsletters and monitoring”** that opens a newsletter index.
2. Ship an index at `/newsletters` ready for multiple issues over time.
3. Publish the FY26 Yearly Retrospective as the **first issue**, preserving its HTML look, motion, and interactivity.
4. Keep the issue as static HTML (hybrid model): Next.js shell for the index; pixel-faithful HTML for issues.

### Success looks like

- From `/`, a designer opens **Newsletters and monitoring** → sees the index → opens FY26 and gets the same experience as the source HTML.
- Adding a future issue is: drop an HTML file under `public/newsletters/` + one registry entry.
- Hub, lint, types, tests, and build remain green.

### Non-goals (v1)

- A real **Monitoring** product surface (the phrase is card naming only for now)
- React rebuild of the retrospective content
- CMS, auth, or SharePoint sync
- New cover photography / illustration assets
- i18n for the newsletter index (EN is enough; matches Labs sandbox tone)

---

## 3. Approach (locked)

**Hybrid — option 1 (static HTML + React index)**

| Layer | Implementation |
|---|---|
| Hub card | Entry in `ARTEFACTS` in `src/components/sodexo-labs/hub/hub-home.tsx` |
| Index | Next.js route `/newsletters` (React, hub visual language) |
| Issues | Static files under `public/newsletters/*.html` |
| Catalogue | Typed registry in `src/lib/newsletters/registry.ts` driving the index |

Rejected for v1: iframe wrapper routes; `dangerouslySetInnerHTML` injection of the full document.

---

## 4. Information architecture & routes

| Route | Role |
|---|---|
| `/` | Hub — new card links to `/newsletters` |
| `/newsletters` | Newsletter index (React) |
| `/newsletters/fy26-yearly-retrospective.html` | FY26 issue (static HTML from `public/`) |

**Isolation:**

- `src/app/newsletters/**` — index page (+ optional layout)
- `src/components/newsletters/**` — index UI only
- `src/lib/newsletters/**` — registry + types
- `public/newsletters/**` — issue HTML files
- Spec: this document

Hub redirect note: `src/app/hub/page.tsx` already redirects to `/`; no change required for that legacy path.

---

## 5. Data model (registry)

Typed const array (same pattern as hub `ARTEFACTS`) — no Zod required for v1.

Each issue:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable key, e.g. `fy26-yearly-retrospective` |
| `title` | string | Display title |
| `subtitle` | string \| optional | One-line summary for the index |
| `period` | string | e.g. `Sept 2025 → Sept 2026` |
| `href` | string | Public path to HTML, e.g. `/newsletters/fy26-yearly-retrospective.html` |
| `coverImage` | `{ src, alt }` \| optional | Reuse Labs asset or omit (gradient fallback) |

**v1 seed:** one issue — FY26 Yearly Retrospective, pointing at the copied HTML.

---

## 6. UI

### Hub card

- **Label:** Newsletters and monitoring  
- **Description:** CoDesign & Labs issues and year-in-review artefacts — start with the FY26 retrospective.  
- **CTA:** Browse newsletters  
- **href:** `/newsletters`  
- **accent:** `bg-[var(--spark-iq)]`  
- **image:** reuse `/labs/elements/zone-hub.png` (or equivalent existing Labs asset)

### Index (`/newsletters`)

- Hub-aligned page: paper/ink tokens, display font, no dashboard clutter  
- Eyebrow: `CoDesign · Labs`  
- Title: `Newsletters`  
- One supporting sentence  
- Back link: `← Hub` → `/`  
- Issue list: simple cards/rows — title, period, subtitle, `Open →`  
- Layout works with one issue and scales when more are added

### Issue HTML

- Copy source HTML to `public/newsletters/fy26-yearly-retrospective.html` with content and scripts preserved (reveal animations, donuts, post-it wall, Clearbit `img` logos)
- **Only intentional edit:** a discreet **“← Newsletters”** control linking to `/newsletters` (header or fixed corner) so users can return without browser Back
- No Next layout wraps the HTML document (full standalone page)

---

## 7. Error handling & edge cases

- Missing cover image → decorative gradient fallback on the index card (same pattern as hub cards without images)
- Broken Clearbit logos → existing HTML `onerror` / initials fallbacks remain as-is
- Empty registry → should not happen in v1; if it did, index shows an empty-state line (“No issues yet”)

---

## 8. Testing & verification

- Manual: hub card → index → FY26 HTML → back link → index  
- `npm run lint`  
- `npx tsc --noEmit`  
- `npm run test`  
- `npm run build`

No requirement for a heavy unit suite on static HTML; registry/type sanity is enough if tests are easy to add.

---

## 9. Extending later

1. Add `public/newsletters/<slug>.html`  
2. Append one registry entry  
3. Optionally set `coverImage`  

Monitoring remains naming-only until a separate product decision.

---

## 10. Decisions locked

1. Index of newsletters (not a single-issue card)  
2. Hybrid: static HTML issues + React index  
3. “Monitoring” is card label only in v1  
4. Approach: public static files + registry-driven index (not iframe / not HTML injection)
