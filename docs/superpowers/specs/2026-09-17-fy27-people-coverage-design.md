# FY27 People Coverage — Design Spec

**Date:** 2026-09-17  
**Status:** Approved for build (audience, scope, money, gate, visual approach locked in conversation)  
**Repo:** Standard-Offer (Next.js 15 / Vercel)  
**Route:** `/people` (password-gated)

---

## 1. Problem

FY27 design staffing lives in a spreadsheet. Arnaud, his n-1, and finance PMO cannot see in one glance:

1. Who is already here vs validated to recruit vs still to validate
2. When external cover starts and ends
3. Which internal seat replaces which external
4. Where a missing validation creates a coverage hole
5. Where budget exists and should be aligned or reallocated

The December Design System cliff is the exercise: Ismael ends in P4-Dec; the internal Design System Manager is Pr2. If it stays unvalidated, there is no resource after December.

---

## 2. Goals

1. Hub card on `/` opens a gated FY27 coverage board.
2. Everyone in `people.xlsx` is on the board (Product Design, Co-Design, B2B, MyApps, FM, Comms).
3. Default zoom is Product Design; other teams are one click.
4. Timeline is FY27 P1 (Sep) through P12 (Aug). P13 is not in budget.
5. Status is labeled, not color-only: Pr0 already here, Pr1 validated, Pr2 to validate, External.
6. Money is visible: annual cost from start, OPEX/CAPEX, funding (BOOST / ACC / BAU).
7. Two first-class signals:
   - **Coverage risk** — Design System: Guillaume (left P1) → Ismael (P1-P4) → internal DSM (Pr2, P4).
   - **Arbitrate** — India B2C / SoEze: Nikhil (full-time) + internal Lead Product Design B2C are one decision on full-year budget.

### Success

Open `/people`, unlock, see the December cliff and the India arbitration without opening Excel.

### Non-goals (v1)

- Editing seats in the UI
- Live Excel / HR sync
- SSO
- Showing the shared password in the UI or in git

---

## 3. Status overrides vs the source file

Apply these before render (do not silently keep Excel labels):

| Seat | File | Board |
|---|---|---|
| Labs manager West US | Pr2 | **Pr1 validated**, P1-Sep, in budget |
| Labs manager Brazil | Pr2 | **Pr1 validated**, P4-Dec |
| Labs manager East US | Pr2, P13 | **Pr2**, not in budget |
| DSM after extern leave B2B / B2C / B2O | Design System Manager | **Lead Product Design** B2B / B2C / B2O |
| Remaining Portugal DSM after extern leave | Design System Manager | **Design System Manager** (Ismael replacement) |
| Nikhil (SoEze) | 0.5 in FTE column | **1.0 FTE**; 0.5 is OPEX/CAPEX mix, not half-time. Keep source cost figures. |

---

## 4. Architecture

| Layer | Implementation |
|---|---|
| Hub card | `ARTEFACTS` in `src/components/sodexo-labs/hub/hub-home.tsx` |
| Gate | Cookie + `PEOPLE_BOARD_ACCESS_SECRET` (server-only). Same idea as Studio unlock. Unset secret = no data, not an open board. |
| Seed | Typed Zod catalogue in `src/lib/people-board/` |
| UI | `/people` timeline (client island) + `/people/unlock` |
| Isolation | Middleware matcher excludes `/people` from next-intl |

No new npm dependencies.

---

## 5. Data model

Zod is source of truth. One `PersonSeat` per row. Periods are integers 1-13. Internals in budget span start→P12. Externals span start→end. P13 seats have `inBudget: false` and no FY bar.

Signals are separate records pointing at `personIds`.

---

## 6. UI

Spark tokens (`--spark-ink`, `--spark-paper`, `--spark-amber`). Dense Gantt: sticky name column, P1-P12 header, today marker, row click opens a cost/funding/chain panel. Risk and arbitrate banners above the chart.

Copy: no em-dashes. Status always has a text label.

---

## 7. Security

- Costs and names are behind the gate.
- Secret only in env / Vercel, never in source, hub copy, or this spec's examples as the live value.
- HttpOnly cookie, 12h, SameSite=lax, secure in production.
