# Newsletters and monitoring — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hub artefact “Newsletters and monitoring” with a React index at `/newsletters` and the FY26 Yearly Retrospective as a static HTML issue under `public/newsletters/`.

**Architecture:** Typed registry drives the index. Issues are standalone HTML in `public/newsletters/` (pixel-faithful recreation of the Labs newsletter). Middleware excludes `newsletters` from next-intl. Hub card links to the index; each issue links back with a small “← Newsletters” control in the HTML.

**Tech Stack:** Next.js 15 App Router, React 19, Vitest, existing Spark/hub tokens (`--spark-*`), framer-motion optional (index can stay motion-light like a simple page).

**Spec:** `docs/superpowers/specs/2026-08-04-newsletters-and-monitoring-design.md`

**Note on commits:** Do not commit unless the user explicitly asks. Skip commit steps during execution.

---

## File map

| Path | Responsibility |
|---|---|
| `src/lib/newsletters/types.ts` | `NewsletterIssue` type |
| `src/lib/newsletters/registry.ts` | Seed list of issues |
| `src/components/newsletters/newsletter-index.tsx` | Index UI |
| `src/app/newsletters/layout.tsx` | Metadata + paper shell |
| `src/app/newsletters/page.tsx` | Route → index |
| `public/newsletters/fy26-yearly-retrospective.html` | FY26 issue HTML |
| `src/components/sodexo-labs/hub/hub-home.tsx` | New ARTEFACTS card |
| `src/middleware.ts` | Exclude `newsletters` from intl |
| `tests/newsletters/unit/registry.test.ts` | Registry sanity |
| `vitest.config.ts` | Include `tests/newsletters/**/*.test.ts` |

---

### Task 1: Registry + unit test

**Files:**
- Create: `src/lib/newsletters/types.ts`
- Create: `src/lib/newsletters/registry.ts`
- Create: `tests/newsletters/unit/registry.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/newsletters/unit/registry.test.ts
import { describe, expect, it } from "vitest";
import { NEWSLETTER_ISSUES } from "@/lib/newsletters/registry";

describe("NEWSLETTER_ISSUES", () => {
  it("includes FY26 as the first issue", () => {
    expect(NEWSLETTER_ISSUES.length).toBeGreaterThanOrEqual(1);
    expect(NEWSLETTER_ISSUES[0]).toMatchObject({
      id: "fy26-yearly-retrospective",
      href: "/newsletters/fy26-yearly-retrospective.html",
    });
  });

  it("has unique ids and hrefs", () => {
    const ids = NEWSLETTER_ISSUES.map((i) => i.id);
    const hrefs = NEWSLETTER_ISSUES.map((i) => i.href);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

Run: `npm run test -- tests/newsletters/unit/registry.test.ts`  
Expected: FAIL — module not found

- [ ] **Step 3: Implement types + registry**

```ts
// src/lib/newsletters/types.ts
export type NewsletterIssue = {
  id: string;
  title: string;
  subtitle?: string;
  period: string;
  href: string;
  coverImage?: { src: string; alt: string };
};
```

```ts
// src/lib/newsletters/registry.ts
import type { NewsletterIssue } from "./types";

export const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  {
    id: "fy26-yearly-retrospective",
    title: "CoDesign & Labs · FY26 Yearly Retrospective",
    subtitle:
      "Commercial impact, Labs sessions, wins and lessons from the field.",
    period: "Sept 2025 → Sept 2026",
    href: "/newsletters/fy26-yearly-retrospective.html",
    coverImage: {
      src: "/labs/elements/zone-hub.png",
      alt: "Sodexo Labs hub zone illustration",
    },
  },
];
```

- [ ] **Step 4: Run test — expect PASS**

Run: `npm run test -- tests/newsletters/unit/registry.test.ts`  
Expected: PASS

---

### Task 2: Middleware exclusion

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 1: Add `newsletters` to the matcher negative lookahead**

Change:

```ts
matcher: ["/((?!_next|thales|studio|labs|hub|api|.*\\..*).*)"],
```

To:

```ts
matcher: ["/((?!_next|thales|studio|labs|hub|newsletters|api|.*\\..*).*)"],
```

This keeps `/newsletters` and static `*.html` out of next-intl (html already excluded via `.*\\..*`).

- [ ] **Step 2: Sanity-check matcher string**

Confirm the file still exports `config.matcher` as a single string array entry and includes `newsletters`.

---

### Task 3: Copy FY26 HTML + back link

**Files:**
- Create: `public/newsletters/fy26-yearly-retrospective.html`

- [ ] **Step 1: Create directory and copy source**

```bash
mkdir -p public/newsletters
cp "/Users/Arnaud.Keravis/Downloads/9ab2d7d8-59c4-4f92-9d80-bdbeafe670a1.html" \
  public/newsletters/fy26-yearly-retrospective.html
```

- [ ] **Step 2: Add back-link styles + markup**

Inside the existing `<style>` block (near the end of styles, before `</style>`), append:

```css
.newsletters-back{
  position:fixed;top:16px;left:16px;z-index:50;
  display:inline-flex;align-items:center;gap:8px;
  font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;
  text-transform:uppercase;text-decoration:none;font-weight:700;
  color:#fff;background:rgba(15,18,32,.55);backdrop-filter:blur(8px);
  border:1px solid rgba(255,255,255,.28);padding:8px 12px;border-radius:4px;
  transition:background .2s,transform .2s;
}
.newsletters-back:hover{background:rgba(15,18,32,.75);transform:translateY(-1px);}
```

Immediately after `<body>` (or as first child inside body before `<header>`), insert:

```html
<a class="newsletters-back" href="/newsletters">← Newsletters</a>
```

Do not otherwise alter content, scripts, or Clearbit logo behaviour.

---

### Task 4: Index page (layout + component + route)

**Files:**
- Create: `src/app/newsletters/layout.tsx`
- Create: `src/components/newsletters/newsletter-index.tsx`
- Create: `src/app/newsletters/page.tsx`

- [ ] **Step 1: Layout**

```tsx
// src/app/newsletters/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Newsletters · CoDesign Sandbox",
  description:
    "CoDesign & Labs newsletters and year-in-review artefacts.",
};

export default function NewslettersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--spark-paper)] text-[var(--spark-ink)] antialiased">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Index component**

```tsx
// src/components/newsletters/newsletter-index.tsx
import Image from "next/image";
import Link from "next/link";
import { NEWSLETTER_ISSUES } from "@/lib/newsletters/registry";

export function NewsletterIndex() {
  return (
    <main className="relative min-h-screen">
      <section className="border-b border-[var(--spark-line)] bg-[var(--spark-ink-deep)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
          <Link
            href="/"
            className="mb-8 inline-flex text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,white,transparent_35%)] transition-colors hover:text-white"
          >
            ← Hub
          </Link>
          <p className="text-xs font-semibold tracking-[0.2em] text-[color:color-mix(in_oklab,white,transparent_35%)]">
            CoDesign · Labs
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl tracking-[-0.03em] md:text-5xl">
            Newsletters
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:color-mix(in_oklab,white,transparent_28%)] md:text-lg">
            Year-in-review and Labs issues for CoDesign — start with the FY26
            retrospective.
          </p>
        </div>
      </section>

      <section className="bg-[var(--spark-paper)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-16">
          {NEWSLETTER_ISSUES.length === 0 ? (
            <p className="text-base text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
              No issues yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
              {NEWSLETTER_ISSUES.map((issue) => (
                <li key={issue.id}>
                  <a
                    href={issue.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--spark-line)] bg-white shadow-[0_18px_40px_rgba(14,26,74,0.06)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--spark-paper)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--spark-ink-deep)]">
                      {issue.coverImage ? (
                        <Image
                          src={issue.coverImage.src}
                          alt={issue.coverImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--spark-iq), transparent 20%), transparent 70%), var(--spark-ink-deep)",
                          }}
                        />
                      )}
                      <div
                        aria-hidden
                        className="absolute left-0 top-0 h-1 w-full bg-[var(--spark-iq)]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <p className="text-[10px] font-semibold tracking-[0.16em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)] uppercase">
                        {issue.period}
                      </p>
                      <h2 className="mt-2 font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)]">
                        {issue.title}
                      </h2>
                      {issue.subtitle ? (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                          {issue.subtitle}
                        </p>
                      ) : null}
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--spark-ink)]">
                        Open
                        <span aria-hidden className="text-[var(--spark-amber)]">
                          →
                        </span>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Page route**

```tsx
// src/app/newsletters/page.tsx
import { NewsletterIndex } from "@/components/newsletters/newsletter-index";

export default function NewslettersPage() {
  return <NewsletterIndex />;
}
```

---

### Task 5: Hub card

**Files:**
- Modify: `src/components/sodexo-labs/hub/hub-home.tsx`

- [ ] **Step 1: Insert artefact after Labs (or near top of list)**

Add to `ARTEFACTS` array:

```ts
{
  id: "newsletters",
  label: "Newsletters and monitoring",
  description:
    "CoDesign & Labs issues and year-in-review artefacts — start with the FY26 retrospective.",
  href: "/newsletters",
  cta: "Browse newsletters",
  image: {
    src: "/labs/elements/zone-hub.png",
    alt: "Sodexo Labs hub zone illustration",
  },
  accent: "bg-[var(--spark-iq)]",
},
```

Place it after the Labs entry so newsletters sit near primary Labs artefacts.

---

### Task 6: Verification

- [ ] **Step 1: Unit tests**

Run: `npm run test -- tests/newsletters/unit/registry.test.ts`  
Expected: PASS

- [ ] **Step 2: Types + lint**

Run: `npx tsc --noEmit`  
Run: `npm run lint`  
Expected: no errors in new files

- [ ] **Step 3: Build**

Run: `npm run build`  
Expected: success; `/newsletters` listed; static HTML available under public

- [ ] **Step 4: Manual smoke**

1. Open `/` — card “Newsletters and monitoring” visible  
2. Open card → `/newsletters` shows FY26  
3. Open issue → full HTML retrospective renders  
4. “← Newsletters” returns to index; “← Hub” returns to `/`

---

## Spec coverage checklist

| Spec requirement | Task |
|---|---|
| Hub card “Newsletters and monitoring” | Task 5 |
| Index at `/newsletters` | Task 4 |
| FY26 static HTML in `public/newsletters/` | Task 3 |
| Registry for future issues | Task 1 |
| Back link on HTML issue | Task 3 |
| Monitoring naming-only (no tab) | N/A — not built |
| Middleware / no locale capture | Task 2 |
| lint / tsc / test / build | Task 6 |
