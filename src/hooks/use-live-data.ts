"use client";

import { useEffect } from "react";
import restaurantsData from "../../data/restaurants.json";
import { useThalesStore } from "@/lib/thales/store";
import type { Restaurant } from "@/lib/thales/types";

export function useLiveData() {
  const setRestaurants = useThalesStore((s) => s.setRestaurants);
  const updateLiveData = useThalesStore((s) => s.updateLiveData);

  useEffect(() => {
    setRestaurants(restaurantsData as Restaurant[]);
  }, [setRestaurants]);

  useEffect(() => {
    async function fetchLive() {
      try {
        const res = await fetch("/api/thales/wait-times");
        const data = await res.json();
        for (const live of data.restaurants) {
          updateLiveData(live.id, {
            attenteTempsReel: live.attenteTempsReel,
            affluence: live.affluence,
          });
        }
      } catch {
        /* keep static data on failure */
      }
    }

    fetchLive();
    const interval = setInterval(fetchLive, 30_000);
    return () => clearInterval(interval);
  }, [updateLiveData]);
}
