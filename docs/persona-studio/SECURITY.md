# Persona Studio — Security & Data Governance

Persona Studio may handle client research and participant information. The
following controls apply as the product moves beyond seed data.

## ⚠️ Agent safety warning

**Never give an autonomous coding agent production database credentials,
unscoped infrastructure tokens, or access to production deletion operations.**
Agents operate against local/seed data and non-production environments only.

## Identity separation

Three identities are kept distinct:

- **Fictional persona identity** (e.g. "David Richardson") — safe to display.
- **Real research participant identity** — never displayed on persona-facing
  screens by default.
- **Anonymous participant reference** (e.g. "P07") — the only participant link
  stored alongside evidence (`SourceDocument.participantRef`).

## Controls (by phase)

- **Now (Phase 1+):** env-var validation (`validation/env.ts`, all optional),
  mock auth, optional facilitator write-gate via
  `PERSONA_STUDIO_ACCESS_SECRET` (browse open / create-edit locked until unlock),
  confidentiality labels on sources, no secrets in source control.
- **Auth phase:** Supabase Auth, project-level access, Row Level Security.
- **AI phase:** server-side-only AI calls; keys never sent to the browser.
- **Ingestion phase:** file type/size validation, sanitisation of imported
  content, soft deletion, data export & deletion, audit log for AI generation
  and major edits.

## Data minimisation

Do not store unnecessary personal information. Prefer anonymous references over
names. Apply the correct `ConfidentialityLabel` to every source
(`PUBLIC | INTERNAL | CLIENT_CONFIDENTIAL | RESTRICTED`).
