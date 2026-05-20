## Sodexo Spark — decisions (Phase 1)

### i18n routing
- **Locale prefix**: always (`/en/...`, `/fr/...`) to keep URLs explicit for sharing in pitches.
- **Default locale**: `en` (matches source deck).

### Typography (Phase 1 fallback)
- **Display**: `Inter Tight` (via `next/font/google`) until brand-approved display face is provided.
- **Body/UI**: `Inter`.
- **Outlined headline treatment**: implemented via `-webkit-text-stroke` utility (`.spark-outline`) to replicate the PDF’s solid + outlined device.

### Theming
- **Default surface**: light, paper-like (`--spark-paper`) to match the deliverable feel.
- **Dark surface**: supported via `.dark` class for cinematic sections (hero + deep dives); full toggle will be added when we introduce those sections.

### Spark portal & XP Catalogue linking (Phase 0–2)
- **App entry**: `/[locale]` is the Standard Offer selling deck. `/[locale]/deck` redirects home.
- **Path choice**: Business vs Experience Catalogue lives in deck section `#roadmap` (Portfolio logic), not a separate landing page.
- **Registry**: `data/solution-links.json` maps standard slugs ↔ catalogue IDs ↔ `roadmapTier` (70/20/10) ↔ journey deep links.
- **Catalogue URLs**: `NEXT_PUBLIC_XP_CATALOGUE_URL` (default `https://xpcatalogue.vercel.app`); tier filter `?tier=70|20|10` (to be implemented on catalogue).

### Catalogue source of truth
- **Source**: `TDDI_Standard_offer2.pdf` in project root (required).
- **Parsing**: generator script will extract text from the PDF and emit a typed TS dataset for runtime use.

