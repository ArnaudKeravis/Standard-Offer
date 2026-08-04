# Sodexo Labs Presentation Space — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/labs` (audience → territory gates, animated 16:9 snap deck, personalized content) plus `/labs/credentials` and `/hub` in Standard-Offer.

**Architecture:** Isolated Labs space (`src/app/labs`, `src/components/sodexo-labs`, `src/lib/sodexo-labs`) with Zod content packs resolved by `audience × area`. Client slide engine (framer-motion) for transitions; Server Components pass resolved packs. Credentials seed adapted from CoDesign OS `credentials-rich.json`, tagged by Work/Heal/Play/Learn, with curated images under `public/labs/credentials/`. Middleware excludes `hub` and `labs` from next-intl.

**Tech Stack:** Next.js 15 App Router, React 19, Zod 4, Vitest, framer-motion (already in package.json), CSS variables + Tailwind 4, Fuse.js optional for credential search (already in package.json).

**Spec:** `docs/superpowers/specs/2026-08-04-sodexo-labs-presentation-design.md`

---

## File map

| Path | Responsibility |
|---|---|
| `src/lib/sodexo-labs/schemas/*.ts` | Zod source of truth |
| `src/lib/sodexo-labs/parse-session.ts` | Query → audience/area |
| `src/lib/sodexo-labs/resolve-pack.ts` | audience × area → pack |
| `src/lib/sodexo-labs/area-theme.ts` | CSS accent tokens per area |
| `src/lib/sodexo-labs/map-persona.ts` | Studio seed persona → LabsPersonaSpot |
| `src/lib/sodexo-labs/data/*` | Offers, cases, credentials, static copy |
| `src/components/sodexo-labs/**` | Gates, deck, HUD, credentials UI |
| `src/app/labs/**` | Routes + layout |
| `src/app/hub/**` | Sandbox directory |
| `public/labs/credentials/**` | Credential imagery |
| `tests/sodexo-labs/unit/**` | Schema, parse, resolve, filter tests |
| `src/middleware.ts` | Exclude `hub` \| `labs` |

---

### Task 1: Schemas + session parsing

**Files:**
- Create: `src/lib/sodexo-labs/schemas/session.ts`
- Create: `src/lib/sodexo-labs/schemas/content.ts`
- Create: `src/lib/sodexo-labs/schemas/credential.ts`
- Create: `src/lib/sodexo-labs/schemas/index.ts`
- Create: `src/lib/sodexo-labs/parse-session.ts`
- Test: `tests/sodexo-labs/unit/parse-session.test.ts`
- Test: `tests/sodexo-labs/unit/schemas.test.ts`

- [ ] **Step 1: Write failing schema + parse tests**

```ts
// tests/sodexo-labs/unit/parse-session.test.ts
import { describe, expect, it } from "vitest";
import { parseLabsSession } from "@/lib/sodexo-labs/parse-session";

describe("parseLabsSession", () => {
  it("returns nulls when params missing", () => {
    expect(parseLabsSession({})).toEqual({ audience: null, area: null });
  });

  it("parses valid audience and area", () => {
    expect(parseLabsSession({ audience: "internal", area: "work" })).toEqual({
      audience: "internal",
      area: "work",
    });
  });

  it("ignores invalid values", () => {
    expect(parseLabsSession({ audience: "foo", area: "WORK" })).toEqual({
      audience: null,
      area: null,
    });
  });
});
```

```ts
// tests/sodexo-labs/unit/schemas.test.ts
import { describe, expect, it } from "vitest";
import { LabsCredential } from "@/lib/sodexo-labs/schemas";

describe("LabsCredential", () => {
  it("accepts a minimal credential", () => {
    const parsed = LabsCredential.parse({
      id: "lilly",
      client: "Eli Lilly",
      title: "The Cell",
      areas: ["work"],
      sectors: ["workplace"],
      regions: ["GSA"],
      audienceHint: "both",
      challenge: "…",
      approach: "…",
      outcome: "…",
      images: [],
    });
    expect(parsed.id).toBe("lilly");
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

Run: `npm run test -- tests/sodexo-labs/unit/parse-session.test.ts tests/sodexo-labs/unit/schemas.test.ts`  
Expected: FAIL (modules not found)

- [ ] **Step 3: Implement schemas + parse**

```ts
// src/lib/sodexo-labs/schemas/session.ts
import { z } from "zod";

export const LabsAudience = z.enum(["internal", "external"]);
export const LabsArea = z.enum(["work", "heal", "play", "learn"]);

export const LabsSessionConfig = z.object({
  audience: LabsAudience,
  area: LabsArea,
});

export type LabsAudience = z.infer<typeof LabsAudience>;
export type LabsArea = z.infer<typeof LabsArea>;
export type LabsSessionConfig = z.infer<typeof LabsSessionConfig>;
```

```ts
// src/lib/sodexo-labs/schemas/content.ts
import { z } from "zod";
import { LabsArea, LabsAudience } from "./session";

export const LabsOffer = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  whenLabel: z.string(),
  internalExtra: z.string().optional(),
});

export const LabsPersonaSpot = z.object({
  area: LabsArea,
  name: z.string(),
  role: z.string(),
  essence: z.string(),
  tensions: z.array(z.string()).max(4),
  portraitUrl: z.string().optional(),
  sourceRef: z.string(),
});

export const LabsCaseSpot = z.object({
  id: z.string(),
  area: LabsArea,
  client: z.string(),
  challenge: z.string(),
  approach: z.string(),
  outcome: z.string(),
  imageSrc: z.string().optional(),
});

export const LabsZone = z.object({
  id: z.enum(["theatre", "immersion", "hub", "garage"]),
  name: z.string(),
  verbs: z.array(z.string()),
  accent: z.string(),
});

export const LabsFormat = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  summary: z.string(),
});

export const LabsPack = z.object({
  session: z.object({ audience: LabsAudience, area: LabsArea }),
  offers: z.array(LabsOffer).length(4),
  persona: LabsPersonaSpot,
  cases: z.array(LabsCaseSpot).min(1).max(2),
  zones: z.array(LabsZone).length(4),
  formats: z.array(LabsFormat).length(4),
  copy: z.object({
    coverSubtitle: z.string(),
    welcomeHeadline: z.string(),
    welcomeBody: z.string(),
    methodNote: z.string().optional(),
    closeHeadline: z.string(),
    closeCta: z.string(),
  }),
});

export type LabsOffer = z.infer<typeof LabsOffer>;
export type LabsPersonaSpot = z.infer<typeof LabsPersonaSpot>;
export type LabsCaseSpot = z.infer<typeof LabsCaseSpot>;
export type LabsPack = z.infer<typeof LabsPack>;
```

```ts
// src/lib/sodexo-labs/schemas/credential.ts
import { z } from "zod";
import { LabsArea } from "./session";

export const LabsCredential = z.object({
  id: z.string(),
  client: z.string(),
  title: z.string(),
  areas: z.array(LabsArea).min(1),
  sectors: z.array(z.string()).min(1),
  regions: z.array(z.string()).min(1),
  audienceHint: z.enum(["internal", "external", "both"]),
  challenge: z.string(),
  approach: z.string(),
  outcome: z.string(),
  year: z.string().optional(),
  images: z.array(z.object({ src: z.string(), alt: z.string() })),
});

export type LabsCredential = z.infer<typeof LabsCredential>;
```

```ts
// src/lib/sodexo-labs/schemas/index.ts
export * from "./session";
export * from "./content";
export * from "./credential";
```

```ts
// src/lib/sodexo-labs/parse-session.ts
import { LabsArea, LabsAudience } from "./schemas/session";
import type { LabsArea as Area, LabsAudience as Audience } from "./schemas/session";

export type ParsedLabsSession = {
  audience: Audience | null;
  area: Area | null;
};

export function parseLabsSession(
  params: Record<string, string | string[] | undefined>,
): ParsedLabsSession {
  const rawAudience = Array.isArray(params.audience)
    ? params.audience[0]
    : params.audience;
  const rawArea = Array.isArray(params.area) ? params.area[0] : params.area;

  const audienceParsed = LabsAudience.safeParse(rawAudience);
  const areaParsed = LabsArea.safeParse(rawArea);

  return {
    audience: audienceParsed.success ? audienceParsed.data : null,
    area: areaParsed.success ? areaParsed.data : null,
  };
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `npm run test -- tests/sodexo-labs/unit/parse-session.test.ts tests/sodexo-labs/unit/schemas.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/sodexo-labs tests/sodexo-labs
git commit -m "feat(labs): add Zod schemas and session query parsing"
```

---

### Task 2: Static content + pack resolver

**Files:**
- Create: `src/lib/sodexo-labs/data/offers.ts`
- Create: `src/lib/sodexo-labs/data/zones.ts`
- Create: `src/lib/sodexo-labs/data/formats.ts`
- Create: `src/lib/sodexo-labs/data/cases.ts`
- Create: `src/lib/sodexo-labs/data/copy.ts`
- Create: `src/lib/sodexo-labs/map-persona.ts`
- Create: `src/lib/sodexo-labs/resolve-pack.ts`
- Create: `src/lib/sodexo-labs/area-theme.ts`
- Test: `tests/sodexo-labs/unit/resolve-pack.test.ts`

- [ ] **Step 1: Write failing resolver tests**

```ts
import { describe, expect, it } from "vitest";
import { resolveLabsPack } from "@/lib/sodexo-labs/resolve-pack";
import { LabsPack } from "@/lib/sodexo-labs/schemas";

describe("resolveLabsPack", () => {
  it("returns a valid pack for external × work", () => {
    const pack = resolveLabsPack({ audience: "external", area: "work" });
    expect(LabsPack.parse(pack).persona.area).toBe("work");
    expect(pack.copy.methodNote).toBeUndefined();
  });

  it("adds internal extras on offers and method note", () => {
    const pack = resolveLabsPack({ audience: "internal", area: "heal" });
    expect(pack.offers.every((o) => o.internalExtra)).toBe(true);
    expect(pack.copy.methodNote).toBeTruthy();
    expect(pack.persona.area).toBe("heal");
  });

  it("changes persona when area changes", () => {
    const work = resolveLabsPack({ audience: "external", area: "work" });
    const play = resolveLabsPack({ audience: "external", area: "play" });
    expect(work.persona.sourceRef).not.toBe(play.persona.sourceRef);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

Run: `npm run test -- tests/sodexo-labs/unit/resolve-pack.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement data + resolver**

**Flagship Studio personas (EN, from seed):**

| Area | Prefer sourceRef |
|---|---|
| work | first XP WORK consumer persona with portrait (e.g. white-collar / `persona-xp-work-white-collar` — verify id in seed) |
| heal | first XP HEAL patient/staff consumer persona |
| learn | first XP LEARN student/parent persona |
| play | `persona-thomas-garcia` or first XP PLAY fan persona |

`map-persona.ts`: read `SEED_DATA.personas`, pick by id map, localize with `localizePersona(..., "en")`, map to `LabsPersonaSpot` using `name`, archetype/role, `oneLineEssence` / essence section, 2–3 frustration bullets as `tensions`, `portraitUrl`.

**Cases (seed in `cases.ts`):** at least one per area from Labs deck / CoDesign OS:
- work: Colgate blue-collar OR Thales campus OR AstraZeneca
- heal: Clariane OR Cooper / HSTV
- learn: Cyber Campus (or campus-flavored story)
- play: Newcastle United / Roland-Garros / Arsenal

**Offers:** four CoDesign pillars with `internalExtra` strings about Growth Engine / commercial cycles.

**Copy:** audience-specific welcome + close strings in `copy.ts`.

```ts
// src/lib/sodexo-labs/area-theme.ts
import type { LabsArea } from "./schemas";

export function accentForLabsArea(area: LabsArea): string {
  switch (area) {
    case "work":
      return "#1E2F9A";
    case "heal":
      return "#0E7A74";
    case "learn":
      return "#4338CA";
    case "play":
      return "#6D28D9";
  }
}

export function labsCssVars(area: LabsArea): Record<string, string> {
  return {
    "--labs-navy": "#1E2F9A",
    "--labs-blue": "#1968FF",
    "--labs-paper": "#EEF3F8",
    "--labs-teal": "#2BB8B0",
    "--labs-ink": "#0B1020",
    "--labs-muted": "#5B6478",
    "--labs-accent": accentForLabsArea(area),
  };
}
```

`resolveLabsPack(session)`: assemble offers (strip `internalExtra` when external), zones, formats, persona via map, cases filtered by area (1–2), copy by audience. Validate with `LabsPack.parse` before return.

- [ ] **Step 4: Run tests — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add src/lib/sodexo-labs tests/sodexo-labs
git commit -m "feat(labs): resolve audience×area content packs from seed"
```

---

### Task 3: Credentials seed + filter helpers

**Files:**
- Create: `src/lib/sodexo-labs/data/credentials.ts`
- Create: `src/lib/sodexo-labs/filter-credentials.ts`
- Create: `public/labs/credentials/.gitkeep`
- Test: `tests/sodexo-labs/unit/filter-credentials.test.ts`
- Optional script: `scripts/labs-import-credentials.mts` (adapt from OS JSON)

- [ ] **Step 1: Write failing filter tests**

```ts
import { describe, expect, it } from "vitest";
import { filterLabsCredentials } from "@/lib/sodexo-labs/filter-credentials";
import { LABS_CREDENTIALS } from "@/lib/sodexo-labs/data/credentials";

describe("filterLabsCredentials", () => {
  it("filters by area", () => {
    const out = filterLabsCredentials(LABS_CREDENTIALS, { area: "play" });
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((c) => c.areas.includes("play"))).toBe(true);
  });

  it("searches client names", () => {
    const out = filterLabsCredentials(LABS_CREDENTIALS, { query: "lilly" });
    expect(out.some((c) => c.id === "lilly")).toBe(true);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

- [ ] **Step 3: Build credentials seed**

1. Copy structure from `/Users/Arnaud.Keravis/sodexo-codesign-os/data/credentials-rich.json` (26 items).
2. Map `sector` → `sectors[]` (lowercase slug: workplace, sports, healthcare, …).
3. Map each credential to `areas[]`:
   - workplace / industrial / corporate → `work`
   - healthcare / senior → `heal`
   - sports / hospitality (events) → `play`
   - campus / education / mixed campus → `learn` (and/or `work` if dual)
4. Set `title` from `project`, `outcome` from first `outcomes[]` string or join short.
5. `audienceHint`: `"internal"` only for Sodexo Live! internal; else `"both"`.
6. `images`: start with `[]`; when PPT assets extracted later, point to `/labs/credentials/{id}-1.jpg`.
7. Export `LABS_CREDENTIALS` validated with `z.array(LabsCredential).parse(...)`.

```ts
// src/lib/sodexo-labs/filter-credentials.ts
import type { LabsArea } from "./schemas";
import type { LabsCredential } from "./schemas";

export type CredentialFilters = {
  area?: LabsArea | "all";
  sector?: string | "all";
  region?: string | "all";
  query?: string;
};

export function filterLabsCredentials(
  items: LabsCredential[],
  filters: CredentialFilters,
): LabsCredential[] {
  const q = filters.query?.trim().toLowerCase() ?? "";
  return items.filter((c) => {
    if (filters.area && filters.area !== "all" && !c.areas.includes(filters.area))
      return false;
    if (
      filters.sector &&
      filters.sector !== "all" &&
      !c.sectors.includes(filters.sector)
    )
      return false;
    if (
      filters.region &&
      filters.region !== "all" &&
      !c.regions.some((r) => r.toLowerCase() === filters.region!.toLowerCase())
    )
      return false;
    if (!q) return true;
    const blob = [c.client, c.title, c.challenge, c.approach, c.outcome, ...c.sectors]
      .join(" ")
      .toLowerCase();
    return blob.includes(q);
  });
}
```

- [ ] **Step 4: Run tests — PASS**

- [ ] **Step 5: Commit**

```bash
git add src/lib/sodexo-labs public/labs tests/sodexo-labs
git commit -m "feat(labs): add credentials seed and filter helpers"
```

---

### Task 4: Middleware + Labs/Hub layouts + tokens

**Files:**
- Modify: `src/middleware.ts`
- Create: `src/app/labs/layout.tsx`
- Create: `src/app/hub/layout.tsx`
- Create: `src/app/globals-labs.css` OR add Labs tokens block imported from layout
- Prefer: `src/components/sodexo-labs/labs-tokens.css` imported in labs + hub layouts

- [ ] **Step 1: Exclude hub/labs from i18n middleware**

```ts
// src/middleware.ts — matcher
export const config = {
  matcher: ["/((?!_next|thales|studio|labs|hub|api|.*\\..*).*)"],
};
```

- [ ] **Step 2: Labs layout with fonts + tokens**

Use `next/font/google` for **Instrument Serif** + **DM Sans** (both on Google Fonts).

```tsx
// src/app/labs/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "@/components/sodexo-labs/labs-tokens.css";

const body = DM_Sans({ subsets: ["latin"], variable: "--font-labs-body" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-labs-display",
});

export const metadata: Metadata = {
  title: "Sodexo Labs",
  description: "Co-creating the future of experiences — presentation mode.",
};

export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${body.variable} ${display.variable} min-h-screen bg-[var(--labs-paper)] text-[var(--labs-ink)] antialiased`}
      data-labs-root
    >
      {children}
    </div>
  );
}
```

`labs-tokens.css`: define `--labs-*` defaults, `.labs-display` / `.labs-body` helpers, reduced-motion rules.

Hub layout can reuse the same CSS with a simpler shell.

- [ ] **Step 3: Smoke — `npx tsc --noEmit`**

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts src/app/labs src/app/hub src/components/sodexo-labs/labs-tokens.css
git commit -m "feat(labs): isolate labs/hub routes and brand tokens"
```

---

### Task 5: Gates + session shell + deep links

**Files:**
- Create: `src/components/sodexo-labs/gates/audience-gate.tsx`
- Create: `src/components/sodexo-labs/gates/territory-gate.tsx`
- Create: `src/components/sodexo-labs/labs-session.tsx` (client orchestrator)
- Create: `src/app/labs/page.tsx`

- [ ] **Step 1: Server page reads searchParams**

```tsx
// src/app/labs/page.tsx
import { LabsSession } from "@/components/sodexo-labs/labs-session";
import { parseLabsSession } from "@/lib/sodexo-labs/parse-session";
import { resolveLabsPack } from "@/lib/sodexo-labs/resolve-pack";

export default async function LabsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const parsed = parseLabsSession(params);
  const initialPack =
    parsed.audience && parsed.area
      ? resolveLabsPack({ audience: parsed.audience, area: parsed.area })
      : null;

  return (
    <LabsSession
      initialAudience={parsed.audience}
      initialArea={parsed.area}
      initialPack={initialPack}
    />
  );
}
```

- [ ] **Step 2: Client orchestrator**

`LabsSession` state machine:
1. If no audience → `AudienceGate`
2. Else if no area → `TerritoryGate`
3. Else → `LabsDeck` with pack

On choose: `router.replace` with query (`?audience=&area=`) so deep links stay shareable. When both set after gate, call `resolveLabsPack` via server action **or** pass a client-safe pack map.

**Prefer:** export `resolveLabsPack` as pure (no server-only imports) so client can resolve after gate without round-trip. Ensure `map-persona` / `SEED_DATA` import is OK on client — Studio seed is large. **Better:** server action `getLabsPackAction(audience, area)` returning pack JSON.

```ts
// src/app/labs/actions.ts
"use server";
import { resolveLabsPack } from "@/lib/sodexo-labs/resolve-pack";
import type { LabsSessionConfig } from "@/lib/sodexo-labs/schemas";

export async function getLabsPackAction(session: LabsSessionConfig) {
  return resolveLabsPack(session);
}
```

Gates: full-bleed 16:9, two large choices (Internal/External), then four territory cards with area accents. Selection animates with framer-motion (`layoutId` or opacity).

- [ ] **Step 3: Manual check** `/labs` and `/labs?audience=external&area=work`

- [ ] **Step 4: Commit**

```bash
git add src/app/labs src/components/sodexo-labs
git commit -m "feat(labs): add audience and territory entry gates with deep links"
```

---

### Task 6: Slide engine + HUD + animated transitions

**Files:**
- Create: `src/components/sodexo-labs/deck/labs-deck.tsx`
- Create: `src/components/sodexo-labs/deck/labs-hud.tsx`
- Create: `src/components/sodexo-labs/deck/slides/*.tsx` (one file per slide or grouped)
- Create: `src/components/sodexo-labs/deck/slide-frame.tsx`

- [ ] **Step 1: Implement `LabsDeck` controller**

Behavior:
- `index` 0..10 for the 11 slides
- Keyboard: ArrowRight/Left, Space, PageUp/Down; `f` → fullscreen
- Click on empty stage → next (ignore interactive elements)
- AnimatePresence + motion.div: `initial={{ opacity: 0, y: 24 }}` `animate={{ opacity: 1, y: 0 }}` `exit={{ opacity: 0, y: -16 }}` duration ~0.45s
- Respect `useReducedMotion()` → duration 0

HUD: audience label, area pill, dots, link to `/labs/credentials?area={area}&audience={audience}`, “Change” resets to gates (clear query).

Slide components receive `pack: LabsPack`:
1. Cover
2. Welcome
3. Offers (show `internalExtra` only if internal)
4. Method
5. Zones
6. Persona
7. Cases
8. Network (static EN copy — France, US, Brazil, India, UK&I)
9. Formats
10. Credentials teaser (CTA button)
11. Close

Typography: display font for titles, large clamp() sizes, 6–8vw padding.

- [ ] **Step 2: Wire into `LabsSession` when pack ready**

- [ ] **Step 3: Visual check fullscreen 16:9**

- [ ] **Step 4: Commit**

```bash
git add src/components/sodexo-labs
git commit -m "feat(labs): animated snap deck with HUD and eleven slides"
```

---

### Task 7: Credentials room UI

**Files:**
- Create: `src/app/labs/credentials/page.tsx`
- Create: `src/components/sodexo-labs/credentials/credentials-room.tsx`
- Create: `src/components/sodexo-labs/credentials/credential-card.tsx`

- [ ] **Step 1: Server page**

Parse `area` / `audience` from searchParams; pass `LABS_CREDENTIALS` + default filters to client room. Link back to `/labs?audience=&area=`.

- [ ] **Step 2: Client room**

Sticky controls: search input, area chips (all + 4), sector chips, region chips. Grid of cards: client, title, challenge excerpt, meta, optional image. Empty state copy. Use `filterLabsCredentials`.

Card open: simple detail panel / dialog with approach + outcome + images.

- [ ] **Step 3: Commit**

```bash
git add src/app/labs/credentials src/components/sodexo-labs/credentials
git commit -m "feat(labs): credentials room with area/sector/region filters"
```

---

### Task 8: Hub page

**Files:**
- Create: `src/app/hub/page.tsx`
- Create: `src/components/sodexo-labs/hub/hub-home.tsx` (or inline in page if small)

- [ ] **Step 1: Implement `/hub`**

Artefacts (links):
- Sodexo Labs → `/labs`
- Persona Studio → `/studio`
- Spark Standard Offer → `/en`
- Demos: `/en/demos/thales`, `/en/demos/lenotre`, wireframes
- CoDesign OS → `https://sodexo-codesign-os.vercel.app/` (external, `rel="noopener"`)
- CoDesign credentials → `https://sodexo-codesign-os.vercel.app/credentials`

Layout: one composition — “CoDesign sandbox” / product name hero-level, short line, then a simple list or large text links (no card grid dashboard). Cool Labs-adjacent palette, calm.

- [ ] **Step 2: Commit**

```bash
git add src/app/hub src/components/sodexo-labs/hub
git commit -m "feat(hub): sandbox home linking Labs, Studio, Spark, demos"
```

---

### Task 9: Credential imagery enrichment (from PPT)

**Files:**
- Create: `scripts/extract-labs-credential-images.mts` OR document manual steps
- Update: `src/lib/sodexo-labs/data/credentials.ts` image paths
- Add: `public/labs/credentials/*.{jpg,png,webp}`

- [ ] **Step 1: Extract**

Unzip Digital & AI Credentials PPTX (`pptx` = zip), collect `ppt/media/*`. Curate 1 image for each of ~8–12 flagship ids (lilly, astrazeneca, microsoft, newcastle, clariane, thales, roland-garros, arsenal, colgate, …). Resize/compress for web (max ~1600px wide). Save as `public/labs/credentials/{id}-1.webp`.

If automated extraction is too noisy, manually export key slides as images from Keynote/PowerPoint — still commit under `public/labs/credentials/`.

- [ ] **Step 2: Wire `images` arrays** on those credential records

- [ ] **Step 3: Commit**

```bash
git add public/labs/credentials src/lib/sodexo-labs/data/credentials.ts
git commit -m "feat(labs): enrich credentials with curated PPT imagery"
```

---

### Task 10: Polish, a11y, verification

**Files:** touch as needed (focus rings, skip link, HUD contrast on cover vs light slides)

- [ ] **Step 1: Reduced-motion + focus-visible pass on gates/deck/credentials**

- [ ] **Step 2: Run full verification**

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
```

Expected: all pass. Fix any failures without skipping tests.

- [ ] **Step 3: Manual 16:9 checklist**

- `/hub` links work  
- `/labs` gates → deck animations  
- Deep link skips gates  
- Internal shows growth-engine extras; external does not  
- Work vs Play changes persona + cases + credential default  
- Credentials filters + images  
- Keyboard + fullscreen  

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix(labs): polish a11y and pass lint/tsc/test/build"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|---|---|
| Hybrid snap + credentials room | 6, 7 |
| Animated slide transitions | 6 |
| Audience → Territory gates | 5 |
| Deep links A+C | 1, 5 |
| Work/Heal/Play/Learn personalization | 2, 6, 7 |
| Internal Growth Engine extras | 2, 6 |
| Four offers | 2, 6 |
| Credentials A+C + PPT images | 3, 7, 9 |
| `/labs` + `/hub` isolation | 4, 5, 8 |
| Labs visual ID + fonts | 4, 6 |
| EN first | all copy EN |
| DoD lint/tsc/test/build | 10 |

---

## Self-review notes

- No FR strings in v1; `localizePersona(..., "en")` only.
- Keep `resolveLabsPack` off the client bundle if seed is huge — use server action (Task 5).
- Do not modify Persona Studio schemas or weaken Zod.
- Root `/` redirect to `/en` unchanged.
