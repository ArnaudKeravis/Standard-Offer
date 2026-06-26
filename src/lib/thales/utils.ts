import type { Affluence, Horaire, Restaurant } from "./types";

export const FOODTRUCK_ID = "foodtruck";
export const FOODTRUCK_SEASONAL_MESSAGE = "De retour aux beaux jours";

const DAY_MAP: Record<string, number> = {
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
  dimanche: 0,
};

const DAY_NAMES_FR = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
] as const;

export interface RestaurantOpenState {
  isOpen: boolean;
  statusLabel: string;
  showAffluence: boolean;
  showServices: boolean;
  showHoraires: boolean;
}

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

function parseTimeToMinutes(time: string): number | null {
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

export function parseDaysFromJour(jour: string): number[] {
  const normalized = jour.toLowerCase().trim();
  const rangeMatch = normalized.match(
    /^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s*-\s*(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)$/,
  );
  if (rangeMatch) {
    const start = DAY_MAP[rangeMatch[1]];
    const end = DAY_MAP[rangeMatch[2]];
    const days: number[] = [];
    if (start <= end) {
      for (let d = start; d <= end; d++) days.push(d);
    } else {
      for (let d = start; d <= 6; d++) days.push(d);
      for (let d = 0; d <= end; d++) days.push(d);
    }
    return days;
  }
  const single = DAY_MAP[normalized];
  return single !== undefined ? [single] : [];
}

function formatTimeFrench(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h00` : `${h}h${m.toString().padStart(2, "0")}`;
}

function isSlotOpenOnDay(h: Horaire, day: number, currentMinutes: number): boolean {
  if (!h.ouverture || !h.fermeture) return false;
  const days = parseDaysFromJour(h.jour);
  if (days.length > 0 && !days.includes(day)) return false;
  if (days.length === 0 && (day === 0 || day === 6)) return false;

  const open = parseTimeToMinutes(h.ouverture);
  const close = parseTimeToMinutes(h.fermeture);
  if (open === null || close === null) return false;
  return currentMinutes >= open && currentMinutes < close;
}

export function isRestaurantOpen(horaires: Restaurant["horaires"], now = new Date()): boolean {
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return horaires.some((h) => isSlotOpenOnDay(h, day, currentMinutes));
}

export function isFoodTruckOutOfOperation(restaurant: Pick<Restaurant, "id">): boolean {
  return restaurant.id === FOODTRUCK_ID;
}

export function getNextOpening(horaires: Restaurant["horaires"], now = new Date()): Date | null {
  const slots: { dayOfWeek: number; openMinutes: number }[] = [];

  for (const h of horaires) {
    if (!h.ouverture || !h.fermeture) continue;
    const openMinutes = parseTimeToMinutes(h.ouverture);
    if (openMinutes === null) continue;
    const days = parseDaysFromJour(h.jour);
    const effectiveDays = days.length > 0 ? days : [1, 2, 3, 4, 5];
    for (const day of effectiveDays) {
      slots.push({ dayOfWeek: day, openMinutes });
    }
  }

  if (slots.length === 0) return null;

  const candidates: Date[] = [];
  for (let offset = 0; offset <= 7; offset++) {
    const date = new Date(now);
    date.setDate(date.getDate() + offset);
    date.setSeconds(0, 0);
    const dayOfWeek = date.getDay();

    for (const slot of slots) {
      if (slot.dayOfWeek !== dayOfWeek) continue;
      const opening = new Date(date);
      opening.setHours(Math.floor(slot.openMinutes / 60), slot.openMinutes % 60, 0, 0);
      if (opening > now) candidates.push(opening);
    }
  }

  if (candidates.length === 0) return null;
  return candidates.reduce((earliest, d) => (d < earliest ? d : earliest));
}

export function formatNextOpeningMessage(horaires: Restaurant["horaires"], now = new Date()): string {
  const next = getNextOpening(horaires, now);
  if (!next) return "Horaires non disponibles";

  const timeStr = formatTimeFrench(next.getHours() * 60 + next.getMinutes());
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const nextDay = new Date(next);
  nextDay.setHours(0, 0, 0, 0);
  const diffDays = Math.round((nextDay.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

  if (diffDays === 0) return `De retour dès aujourd'hui à ${timeStr}`;
  if (diffDays === 1) return `De retour dès demain à ${timeStr}`;
  return `De retour dès ${DAY_NAMES_FR[next.getDay()]} à ${timeStr}`;
}

export function getRestaurantOpenState(restaurant: Restaurant, now = new Date()): RestaurantOpenState {
  if (isFoodTruckOutOfOperation(restaurant)) {
    return {
      isOpen: false,
      statusLabel: FOODTRUCK_SEASONAL_MESSAGE,
      showAffluence: false,
      showServices: false,
      showHoraires: false,
    };
  }

  const open = isRestaurantOpen(restaurant.horaires, now);
  if (open) {
    return {
      isOpen: true,
      statusLabel: "Ouvert",
      showAffluence: true,
      showServices: true,
      showHoraires: true,
    };
  }

  return {
    isOpen: false,
    statusLabel: formatNextOpeningMessage(restaurant.horaires, now),
    showAffluence: false,
    showServices: false,
    showHoraires: true,
  };
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
