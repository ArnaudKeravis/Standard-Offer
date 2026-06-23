# Thales Campus — Application Restauration

Application web premium pour écran 16:9 affichée dans le campus Thales. Permet aux collaborateurs de visualiser l'offre restauration, comparer les espaces et trouver le lieu adapté à leur besoin.

## Accès

Depuis le menu **Interactive Map Thales** dans la barre de navigation Standard Offer, ou directement :

```
https://standard-offer.vercel.app/fr/demos/thales
https://standard-offer.vercel.app/en/demos/thales
```

Raccourci legacy : `/thales` redirige vers `/en/demos/thales`.

## Architecture

```
data/
  restaurants.json    # Données des 8 espaces (extensible)
  offres.json         # Types d'offres disponibles

src/
  app/thales/         # Page & layout fullscreen
  app/api/thales/     # API mockée temps d'attente
  components/
    Map/              # Carte interactive SVG du campus
    Filters/          # Barre de filtres
    RestaurantCard/   # Carte restaurant compacte
    RestaurantDetail/ # Panneau latéral détaillé
    FloorPlanViewer/  # Plan interactif avec stands
    KioskMode/        # Rotation automatique 60s
  lib/thales/         # Types, store Zustand, utilitaires
  hooks/use-live-data.ts
```

## Ajouter un restaurant

Éditer `data/restaurants.json` :

```json
{
  "id": "nouveau-restaurant",
  "nom": "Mon Restaurant",
  "positionX": 50,
  "positionY": 50,
  "type": "brasserie",
  "batiment": "Bâtiment X",
  "concept": "Description courte",
  "description": "Description longue",
  "photo": "/thales/photo.jpg",
  "horaires": [{ "jour": "Lundi - Vendredi", "ouverture": "11:30", "fermeture": "14:00" }],
  "capacite": 100,
  "attenteTempsReel": 5,
  "affluence": "moderee",
  "tags": ["brasserie", "healthy"],
  "offres": ["Stand 1", "Stand 2"],
  "offreDuJour": "Plat du jour",
  "services": ["Caisse assistée"],
  "localisation": "RDC Bâtiment X",
  "floorPlan": {
    "viewBox": "0 0 800 500",
    "stands": [
      { "id": "stand-1", "nom": "Stand 1", "categorie": "healthy", "positionX": 100, "positionY": 100, "width": 100, "height": 70 }
    ]
  }
}
```

`positionX` / `positionY` : coordonnées en % sur la carte (viewBox 100×70).

## Filtres disponibles

| ID | Critère |
|---|---|
| `healthy` | Tag healthy |
| `rapide` | Attente < 5 min |
| `sans-attente` | Attente ≤ 2 min |
| `vegetarien` | Tag végétarien |
| `coffee` | Coffee shop |
| `dessert` | Desserts |
| `street-food` | Street food |
| `food-court` | Food court |
| `ouvert` | Ouvert maintenant |

## API temps d'attente

`GET /api/thales/wait-times`

Retourne des données simulées (rafraîchies côté client toutes les 30s). À remplacer par l'API réelle Sodexo.

```json
{
  "updatedAt": "2026-06-23T12:00:00.000Z",
  "restaurants": [
    { "id": "self-helios-2", "attenteTempsReel": 4, "affluence": "moderee", "ouvert": true }
  ]
}
```

## Mode kiosque

Activer via le bouton « Mode kiosque » en haut à droite. Rotation automatique des restaurants toutes les 60 secondes avec zoom et mise en avant de l'offre du jour.

## Codes couleur attente

- **Vert** : 0–5 min
- **Orange** : 5–10 min
- **Rouge** : +10 min

## Stack technique

- Next.js 15 + React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Zustand
