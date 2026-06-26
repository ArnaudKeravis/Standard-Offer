import type { Affluence, Restaurant } from "./types";

export const AFFLUENCE_CONFIG: Record<
  Affluence,
  { label: string; emoji: string; value: number; color: string; dotColor: string }
> = {
  fluide: {
    label: "Fluide",
    emoji: "🟢",
    value: 25,
    color: "bg-emerald-400",
    dotColor: "#34d399",
  },
  modere: {
    label: "Modéré",
    emoji: "🟠",
    value: 55,
    color: "bg-amber-400",
    dotColor: "#fbbf24",
  },
  sature: {
    label: "Saturé",
    emoji: "🔴",
    value: 90,
    color: "bg-red-400",
    dotColor: "#f87171",
  },
};

export function getAffluenceColor(affluence: Affluence): string {
  return AFFLUENCE_CONFIG[affluence].dotColor;
}

export function isRestaurantOpen(horaires: Restaurant["horaires"], now = new Date()): boolean {
  const day = now.getDay();
  if (day === 0 || day === 6) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return horaires.some((h) => {
    if (!h.ouverture || !h.fermeture) return false;
    const [openH, openM] = h.ouverture.split(":").map(Number);
    const [closeH, closeM] = h.fermeture.split(":").map(Number);
    if (Number.isNaN(openH) || Number.isNaN(closeH)) return false;
    const open = openH * 60 + openM;
    const close = closeH * 60 + closeM;
    return currentMinutes >= open && currentMinutes < close;
  });
}

export const OFFRE_LABELS: Record<string, string> = {
  brasserie: "Brasserie",
  "food-court": "Food Court",
  healthy: "Healthy",
  vegetarien: "Végétarien",
  "street-food": "Street Food",
  boulangerie: "Boulangerie",
  "coffee-shop": "Coffee Shop",
  sushi: "Sushi",
  grill: "Grill",
  italien: "Italien",
  "fast-corner": "Fast Corner",
  "food-market": "Food Market",
  snacking: "Snacking",
  desserts: "Desserts",
};
