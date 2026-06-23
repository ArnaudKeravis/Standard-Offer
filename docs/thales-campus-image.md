# Image de fond SharePoint

Le site SharePoint Sodexo (`Design Community Hub`) n’est pas accessible automatiquement (authentification requise).

## Option 1 — Fichier local (recommandé)

1. Téléchargez l’image vierge depuis SharePoint
2. Remplacez `public/thales/campus-aerial.png`
3. Redéployez

## Option 2 — URL SharePoint

Si vous avez un lien direct vers l’image (clic droit → Copier le lien sur le fichier) :

```bash
# .env.local
NEXT_PUBLIC_THALES_CAMPUS_IMAGE=https://sodexo.sharepoint.com/.../campus.png
```

> Les liens SharePoint expirent souvent ou nécessitent une session — le fichier local est plus fiable pour Vercel.
