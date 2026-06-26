import { NextResponse } from "next/server";
import restaurantsData from "../../../../../data/restaurants.json";
import type { Affluence, LiveRestaurantData } from "@/lib/thales/types";
import { isFoodTruckOutOfOperation, isRestaurantOpen } from "@/lib/thales/utils";

function randomAffluence(): Affluence {
  const options: Affluence[] = ["fluide", "modere", "sature"];
  return options[Math.floor(Math.random() * options.length)];
}

export async function GET() {
  const live: LiveRestaurantData[] = restaurantsData.map((r) => {
    const open = !isFoodTruckOutOfOperation(r) && isRestaurantOpen(r.horaires);
    return {
      id: r.id,
      affluence: (open ? randomAffluence() : r.affluence) as Affluence,
      ouvert: open,
    };
  });

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    restaurants: live,
  });
}
