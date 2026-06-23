"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { CampusMap } from "@/components/Map";
import { Filters } from "@/components/Filters";
import { KioskMode } from "@/components/KioskMode";
import { RestaurantDetail } from "@/components/RestaurantDetail";
import { FloorPlanViewer } from "@/components/FloorPlanViewer";
import { useLiveData } from "@/hooks/use-live-data";
import { useThalesStore } from "@/lib/thales/store";
import { isRestaurantOpen, matchesFilter } from "@/lib/thales/utils";

export function ThalesCampusApp({ backHref }: { backHref?: string }) {
  useLiveData();

  const restaurants = useThalesStore((s) => s.restaurants);
  const selectedId = useThalesStore((s) => s.selectedId);
  const activeFilters = useThalesStore((s) => s.activeFilters);
  const showFloorPlan = useThalesStore((s) => s.showFloorPlan);
  const kioskMode = useThalesStore((s) => s.kioskMode);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return restaurants;
    return restaurants.filter((r) => {
      const open = isRestaurantOpen(r.horaires);
      return activeFilters.every((f) => matchesFilter(r, f, open));
    });
  }, [restaurants, activeFilters]);

  const selected = restaurants.find((r) => r.id === selectedId);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#1a2332] text-white select-none">
      {/* Compact top bar — lets map breathe */}
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between gap-4 bg-gradient-to-b from-black/50 to-transparent px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-[11px] font-medium text-white/80 ring-1 ring-white/15 hover:bg-black/50 backdrop-blur-md touch-manipulation"
            >
              <ArrowLeft className="size-3" />
              Standard Offer
            </Link>
          )}
          <div className="hidden sm:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-amber-400/80">
              Campus Thales · Sodexo
            </p>
            <p className="text-[11px] text-white/50">{timeStr} · {filtered.length} espaces</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <KioskMode restaurants={restaurants} />
          <div className="hidden md:flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/50">Live</span>
          </div>
        </div>
      </header>

      {/* Filters — bottom rail for max map visibility */}
      {!kioskMode && !selectedId && (
        <div className="absolute bottom-4 left-0 right-0 z-30 px-4 md:px-8">
          <div className="mx-auto max-w-5xl rounded-2xl bg-black/40 p-2 ring-1 ring-white/10 backdrop-blur-xl">
            <Filters />
          </div>
        </div>
      )}

      {/* Full-bleed map */}
      <div className="absolute inset-0">
        <CampusMap restaurants={restaurants} />
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && !showFloorPlan && (
          <RestaurantDetail
            restaurant={selected}
            isOpen={isRestaurantOpen(selected.horaires)}
          />
        )}
      </AnimatePresence>

      {/* Floor plan */}
      <AnimatePresence>
        {selected && showFloorPlan && selected.floorPlan && (
          <FloorPlanViewer restaurant={selected} />
        )}
      </AnimatePresence>
    </div>
  );
}
