import type { Affluence, Restaurant } from "./types";

export function getWaitColor(minutes: number): "green" | "orange" | "red" {
  if (minutes <= 5) return "green";
  if (minutes <= 10) return "orange";
  return "red";
}

export function getWaitLabel(minutes: number): string {
  if (minutes <= 1) return "< 2 min";
  return `${minutes} min`;
}

export const WAIT_COLORS = {
  green: { bg: "bg-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-400", ring: "ring-emerald-400/30" },
  orange: { bg: "bg-amber-500/20", text: "text-amber-400", dot: "bg-amber-400", ring: "ring-amber-400/30" },
  red: { bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-400", ring: "ring-red-400/30" },
} as const;

export const AFFLUENCE_CONFIG: Record<
  Affluence,
  { label: string; value: number; color: string }
> = {
  faible: { label: "Faible", value: 25, color: "bg-emerald-400" },
  moderee: { label: "Modérée", value: 55, color: "bg-amber-400" },
  forte: { label: "Forte", value: 90, color: "bg-red-400" },
};

export function isRestaurantOpen(horaires: Restaurant["horaires"], now = new Date()): boolean {
  const day = now.getDay();
  if (day === 0 || day === 6) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return horaires.some((h) => {
    const [openH, openM] = h.ouverture.split(":").map(Number);
    const [closeH, closeM] = h.fermeture.split(":").map(Number);
    const open = openH * 60 + openM;
    const close = closeH * 60 + closeM;
    return currentMinutes >= open && currentMinutes < close;
  });
}

export function matchesFilter(restaurant: Restaurant, filter: string, isOpen: boolean): boolean {
  switch (filter) {
    case "healthy":
      return restaurant.tags.includes("healthy");
    case "rapide":
      return restaurant.attenteTempsReel < 5;
    case "sans-attente":
      return restaurant.attenteTempsReel <= 2;
    case "vegetarien":
      return restaurant.tags.includes("vegetarien");
    case "coffee":
      return restaurant.tags.includes("coffee-shop");
    case "dessert":
      return restaurant.tags.includes("desserts");
    case "street-food":
      return restaurant.tags.includes("street-food");
    case "food-court":
      return restaurant.tags.includes("food-court");
    case "ouvert":
      return isOpen;
    default:
      return true;
  }
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
