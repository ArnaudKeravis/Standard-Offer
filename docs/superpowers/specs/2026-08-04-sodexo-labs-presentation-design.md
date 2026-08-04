# Sodexo Labs — Dynamic Presentation Space (Design Spec)

**Date:** 2026-08-04  
**Status:** Approved for planning (pending final user review of this document)  
**Repo:** Standard-Offer (Next.js 15 / Vercel)  
**Primary references:** Labs deck EN (111225), Short intro EN/FR, Digital & AI Credentials PPT, CoDesign OS credentials UX, Persona Studio Work/Heal/Play/Learn

---

## 1. Problem

Sodexo Labs is today presented via static PDF/PPT on large 16:9 screens. The team needs a **presentation-mode website** that:

- Feels like Labs (visual ID, space, motion) — not a generic deck site
- Supports **live pitching** with snap slides and animated transitions
- Personalizes by **audience** (internal vs external) and **territory** (Work / Heal / Play / Learn)
- Offers a **filterable credentials room** with richer media than the current OS cards alone
- Lives in the Standard-Offer sandbox alongside Studio, Spark, and demos — with a **hub** to find artefacts

---

## 2. Goals & success criteria

### Goals

1. Replace the short Labs intro deck with a cinematic, controllable web presentation for big screens.
2. Gate every session with Audience → Territory, including deep-link presets.
3. Personalize personas, proof stories, context, and default credential filters by territory.
4. Enrich internal sessions with Growth Engine + CoDesign framing; keep external client-safe.
5. Provide a credentials library with filters and imagery sourced from Digital & AI Credentials where available.
6. Add a sandbox hub so Labs, Studio, Spark, and demos are discoverable.

### Success looks like

- A presenter can open a URL, pick (or deep-link) audience + area, and advance an animated 16:9 deck with keyboard.
- Switching Work → Heal clearly changes persona, case, and credential defaults.
- Credentials room is usable mid-pitch and as a standalone browse.
- `/hub` lists the main artefacts without breaking the existing `/` → `/en` Spark redirect.

### Non-goals (v1)

- Live OneDrive / PPT auto-import
- French copy (EN shell first; i18n structure allowed)
- Auth / access control
- In-UI credential editing
- Replacing CoDesign OS
- Full parallax-only site without snap presentation control

---

## 3. Interaction model (locked)

**Hybrid C + animated transitions**

- **Presentation mode (default after gates):** full-bleed 16:9 snap slides; keyboard (←→ / Space), click, optional fullscreen (`F`)
- **Animated slide changes:** 400–600ms fade/slide + staggered text; soft parallax on 1–2 layers max; respect `prefers-reduced-motion`
- **Credentials room:** free scroll + filters (like CoDesign OS), reachable from HUD and `/labs/credentials`
- **Entry gates:** two full-screen choosers — Audience, then Territory — with choices sticky in HUD
- **Deep links:** `/labs?audience=internal|external&area=work|heal|play|learn`  
  - Both present → skip choosers and enter deck (change via HUD)  
  - Partial → run only the missing gate  
  - None → full chooser flow

---

## 4. Information architecture & routes

| Route | Role |
|---|---|
| `/hub` | Sandbox home — links to Labs, Persona Studio, Spark (`/en`), demos, CoDesign OS (external) |
| `/labs` | Choosers → animated Labs presentation |
| `/labs/credentials` | Filterable credentials room |

**Isolation (Studio pattern):**

- `src/app/labs/**`
- `src/components/sodexo-labs/**`
- `src/lib/sodexo-labs/**`
- `public/labs/**` (images)
- Docs under `docs/sodexo-labs/` (optional follow-up; this spec is source of truth for v1)

**Root `/`:** keep existing redirect to `/en` (Spark deck). Hub is `/hub`, not a breaking change to the commercial entry.

**Runtime:** Server Components for content resolution; client only for slide engine, motion, filters, HUD, choosers.

---

## 5. Session narrative (slides)

After gates:

| # | Slide | Personalization |
|---|---|---|
| 01 | Cover — Sodexo Labs | Territory accent / imagery |
| 02 | Welcome / why Labs | Audience tone (internal = growth engine; external = client value) |
| 03 | Four offers | Shared pillars; internal adds CoDesign ↔ growth-engine link |
| 04 | Method (double diamond) | Shared; internal may tease method/OS depth |
| 05 | The space — 4 zones | Shared Labs spatial ID |
| 06 | Persona & experience | Territory flagship persona + journey |
| 07 | Proof / case | 1–2 territory-matched stories |
| 08 | Global network | Shared |
| 09 | Session formats (Flash → Custom) | Shared |
| 10 | Credentials teaser | Default filter = current area → enter room |
| 11 | Close / CTA | Audience-specific CTA |

**HUD (post-gates):** audience · territory · slide progress · Credentials · reset choosers

**Source narrative:** Labs deck Presentation in English — 111225 (11 slides), expanded with CoDesign four-offers + growth-engine for internal, and XP/Studio persona flavor per territory.

---

## 6. Audience & territory behavior

### Audience

| | Internal | External |
|---|---|---|
| Tone | Team / commercial engine | Client co-creation value |
| Offers | 4 pillars + Growth Engine / CoDesign linkage | 4 pillars, client language |
| Method | May reference CoDesign OS / methodology depth | Keep outcome-focused |
| CTA | Mobilize Labs in bids & renewals | Book a session |

### Territory (align Persona Studio)

| Area | Accent direction | Persona / proof flavor |
|---|---|---|
| Work | Navy / blue | Workplace / corporate XP |
| Heal | Teal | Healthcare / care |
| Learn | Indigo | Campus / education |
| Play | Violet / energy | Sports / hospitality / events |

Territory drives: persona spot, case spot(s), credentials default filter, subtle cover/zone accent.

---

## 7. Visual identity & motion

**Base (from Labs decks, not CoDesign warm paper):**

- Navy `#1E2F9A` → Blue `#1968FF`
- Cool paper `#EEF3F8`
- Teal `#2BB8B0` (energy / Immersion)
- Ink `#0B1020`

**Typography:** expressive display (e.g. Instrument Serif) + geometric body (e.g. DM Sans). Avoid Inter/Roboto/system-default look. Big-screen type scale; one idea per slide.

**Zones (space slide):** Theatre · Immersion · Hub · Garage — four distinct accents.

**Motion principles:** purposeful, 2–3 signature motions; no glow/noise; reduced-motion = instant cuts.

**Big-screen rules:** 16:9 composition, generous margins, HUD never competes with hero line.

---

## 8. Content & data model

Zod schemas are source of truth; TS types via `z.infer`.

### Core types

```ts
// Conceptual — exact schemas live in src/lib/sodexo-labs/schemas/

audience: 'internal' | 'external'
area: 'work' | 'heal' | 'play' | 'learn'

LabsSessionConfig { audience, area }

LabsOffer {
  id, title, summary, whenLabel
  internalExtra?: string  // growth engine / CoDesign link
}

LabsPersonaSpot {
  area, name, role, essence, tensions[]
  sourceRef  // studio persona id or XP catalogue ref
}

LabsCaseSpot {
  area, client, challenge, approach, outcome
  imageSrc?
}

LabsCredential {
  id, client, title
  areas: Area[]
  sectors: string[]
  regions: string[]
  audienceHint: 'internal' | 'external' | 'both'
  challenge, approach, outcome
  images: { src, alt }[]
}
```

### Content packs

Resolver: `getLabsPack(audience, area)` → slide copy overrides + persona + cases + default credential query.

Personas: **read** from Persona Studio seed by family (`WORK` / `HEAL` / `LEARN` / `PLAY`) — no Studio DB writes from Labs.

### Credentials strategy (A + C, enriched from B)

1. Structure & filter UX inspired by CoDesign OS credentials.
2. Curated flagship set for v1 (expandable), tagged by area (+ sector/region).
3. Enrich copy and **images** from Digital & AI Credentials PPT into `public/labs/credentials/`.
4. No runtime PPT parser — manual curated export for v1.

### Filters (credentials room)

Area · Sector · Region · Search  
Default area = session area (clearable).

---

## 9. Hub (`/hub`)

Single-purpose directory (not a dashboard):

- Sodexo Labs → `/labs`
- Persona Studio → `/studio`
- Spark Standard Offer → `/en`
- Demos → existing demo routes
- CoDesign OS → `https://sodexo-codesign-os.vercel.app/` (and/or credentials)

Visual tone: calm, navigational, can share Labs cool palette lightly without competing with Labs cover hero.

---

## 10. Technical approach (Approach 1)

**Slide engine + content packs**

1. Client `LabsDeck` controller: index, transitions, keyboard, URL sync for slide optional later.
2. Server-resolved pack passed as props for the active `audience` × `area`.
3. Credentials page/room as separate client filter surface over seed data.
4. CSS variables per territory for accents; shared Labs tokens for chrome.

**Dependencies:** prefer CSS + existing stack; add motion library only if needed (e.g. framer-motion) — decide in implementation plan against current `package.json`.

**Testing:** schema validation for packs/credentials; unit tests for resolver (audience/area → expected spots); smoke that routes render.

**Definition of done:** lint, `tsc --noEmit`, test, build pass; `/hub`, `/labs`, `/labs/credentials` usable fullscreen 16:9 with personalization working.

---

## 11. Open decisions deferred to implementation plan

- Exact display font pair if Instrument Serif / DM Sans unavailable under license — pick closest approved pair
- Whether slide index syncs to URL hash (`#3`) in v1
- Exact curated credential count for first ship (target 8–15)
- Whether `/hub` gets a soft entry link from Studio nav (nice-to-have)

---

## 12. References

- Labs deck EN PDF — `Labs deck Presentation in English - 111225.pdf`
- Short intro EN/FR high quality PDFs
- Introducing Sodexo Labs PPTX
- Digital & AI Credentials PPTX
- CoDesign presentation / credentials: https://sodexo-codesign-os.vercel.app/codesign · https://sodexo-codesign-os.vercel.app/credentials
- Persona Studio areas: WORK / HEAL / LEARN / PLAY
