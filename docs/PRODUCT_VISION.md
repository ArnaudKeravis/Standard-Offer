# Design Hub — Product Vision

**Status:** Living draft  
**Owner:** Global Design / CoDesign / Sodexo Labs  
**Live sandbox:** [https://standard-offer.vercel.app](https://standard-offer.vercel.app)  
**Last updated:** 2026-08-04

---

## 1. Purpose

This repository and its deployed site are a **Design Hub sandbox**: a shared place for the design team to **prototype, present, and stress-test ideas** before they become official, scalable artefacts on our main SharePoint (Design Community Hub) and related systems.

It is **not** the source of truth for the organisation.  
It **is** a trampoline — fast loops, visible demos, honest feedback — that should always point back to durable knowledge and process where people actually work day to day.

---

## 2. What we are solving

Today, CoDesign / Labs / experience design work lives across:

- Decks and PDFs (Labs intros, credentials, Spark offer)
- SharePoint / OneDrive libraries
- Separate prototypes (Persona Studio, XP Catalogue, CoDesign OS, demos)

That makes it hard to:

1. **Show** the story on a large screen without juggling files  
2. **Connect** artefacts (persona → case → credential → Labs session)  
3. **Test** interaction and narrative ideas before investing in scalable platforms  
4. **Onboard** teammates into “what we have” in one glance  

The Design Hub sandbox closes that gap for **exploration and presentation**, while SharePoint remains the **system of record and scale**.

---

## 3. Vision (12–18 months)

> A living Design Hub where Sodexo CoDesign teams can open one URL, choose an audience and territory, walk an animated Labs story, browse evidence-based personas and credentials, and jump into related tools — with every serious artefact ultimately governed and discoverable from our main SharePoint and operating systems.

**Principles**

| Principle | Meaning |
|---|---|
| Sandbox first | Prefer shipping a clickable prototype over a perfect deck |
| Evidence over fiction | Personas, credentials, and claims stay grounded; never invent research |
| Audience-aware | Internal (growth engine / CoDesign depth) vs external (client-safe) |
| Territory-aware | Work / Heal / Play / Learn personalise proof and examples |
| Trampoline, not silo | Hub demos link out; SharePoint + OS remain the scalable spine |
| Design-owned | The design team can review, critique, and propose changes (incl. via Cursor) |

---

## 4. What lives here today

| Artefact | Role in the hub |
|---|---|
| **Sandbox home** (`/`) | Index of prototypes and linked products |
| **Sodexo Labs** (`/labs`) | 16:9 presentation mode — gates, animated story, credentials room |
| **Persona Studio** (`/studio`) | Evidence-based personas & workshop tools |
| **Spark Standard Offer** (`/en`) | Internal TDDI selling deck |
| **Demos** (Thales, Lenôtre, wireframes) | Experience prototypes |
| **Links out** | XP Catalogue, CoDesign OS, CoDesign credentials |

Related products (not replaced by this hub):

- [CoDesign presentation / OS](https://sodexo-codesign-os.vercel.app/codesign)  
- [XP Catalogue](https://xpcatalogue.vercel.app/)  
- **Design Community Hub (SharePoint)** — main shared knowledge base  

---

## 5. How this relates to scalability work

Parallel workstreams (led with Diane, Gabriel, and the wider practice) are defining how CoDesign scales: method, OS, credentials, SharePoint IA, handoffs to commercial cycles.

| Layer | Role |
|---|---|
| **This sandbox** | Speed of learning — interaction, narrative, visual ID, “does this pitch land?” |
| **SharePoint (main)** | Durable content, governance, team access, official libraries |
| **CoDesign OS / platforms** | Repeatable operating system for the method at scale |

**Rule of thumb:** if an idea proves valuable here, Diane & Gabriel (with the team) assess **need → ownership → SharePoint / OS home → scale path**. The sandbox should deep-link to those homes once they exist; it should not become a second unmanaged archive.

---

## 6. Success looks like

- Designers open the hub before a pitch or workshop and find the right artefact in under a minute  
- Internal Labs sessions surface CoDesign proof (numbers, growth engine, engagement models) without a separate deck hunt  
- External sessions stay client-safe and territory-relevant  
- Feedback from the team lands as concrete improvements (content, flows, missing links)  
- New prototypes are added to the hub **and** given a clear SharePoint / OS destination when they graduate  

---

## 7. Non-goals

- Replacing SharePoint as the team’s main knowledge base  
- Production auth / client-facing multi-tenant product (unless decided later)  
- Auto-syncing every OneDrive PPT into the site  
- Treating Vercel demos as the official archive of credentials or research  

---

## 8. How the team can contribute

1. **Review** the live hub and Labs / Studio flows on a large screen if possible  
2. **Add ideas** — missing artefacts, broken narrative, better SharePoint deep links, content gaps  
3. **Use Cursor** (access granted by Arnaud) to propose or implement small improvements with the same grounding rules  
4. **Diane & Gabriel** — map sandbox wins to the scalability track: what must live on SharePoint, what stays experimental, what feeds CoDesign OS  

---

## 9. Open questions (for the team)

- Which SharePoint libraries should every hub card deep-link to first?  
- What is the graduation checklist from sandbox → official artefact?  
- Which territories / audiences need content next (FR, sector packs)?  
- How do Labs + CoDesign OS stay one story without duplicate maintenance?

---

## 10. References

- Spec: `docs/superpowers/specs/2026-08-04-sodexo-labs-presentation-design.md`  
- Enrichment: `docs/superpowers/specs/2026-08-04-sodexo-labs-codesign-enrichment-design.md`  
- Persona Studio product: `docs/persona-studio/PRODUCT.md`  
