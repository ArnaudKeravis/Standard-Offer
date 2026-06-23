import { NextResponse } from "next/server";
import restaurantsData from "../../../../../data/restaurants.json";
import type { Affluence, LiveRestaurantData } from "@/lib/thales/types";

function randomAffluence(): Affluence {
  const options: Affluence[] = ["faible", "moderee", "forte"];
  return options[Math.floor(Math.random() * options.length)];
}

function isOpen(horaires: (typeof restaurantsData)[0]["horaires"]): boolean {
  const now = new Date();
  const day = now.getDay();
  if (day === 0 || day === 6) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  return horaires.some((h) => {
    const [oh, om] = h.ouverture.split(":").map(Number);
    const [ch, cm] = h.fermeture.split(":").map(Number);
    return current >= oh * 60 + om && current < ch * 60 + cm;
  });
}

export async function GET() {
  const live: LiveRestaurantData[] = restaurantsData.map((r) => ({
    id: r.id,
    attenteTempsReel: Math.max(0, r.attenteTempsReel + Math.floor(Math.random() * 5) - 2),
    affluence: randomAffluence(),
    ouvert: isOpen(r.horaires),
  }));

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    restaurants: live,
  });
}
