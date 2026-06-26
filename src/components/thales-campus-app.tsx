"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CampusMap } from "@/components/Map";
import { KioskMode } from "@/components/KioskMode";
import { RestaurantDetail } from "@/components/RestaurantDetail";
import { RestaurantListSidebar } from "@/components/RestaurantListSidebar";
import { FloorPlanViewer } from "@/components/FloorPlanViewer";
import { useLiveData } from "@/hooks/use-live-data";
import { useThalesStore } from "@/lib/thales/store";

export function ThalesCampusApp({ backHref }: { backHref?: string }) {
  useLiveData();

  const restaurants = useThalesStore((s) => s.restaurants);
  const selectedId = useThalesStore((s) => s.selectedId);
  const selectRestaurant = useThalesStore((s) => s.selectRestaurant);
  const showFloorPlan = useThalesStore((s) => s.showFloorPlan);
  const kioskMode = useThalesStore((s) => s.kioskMode);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selected = restaurants.find((r) => r.id === selectedId);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const showList = !selectedId && !kioskMode && !showFloorPlan;

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#1a2332] text-white select-none">
      <header className="relative z-30 shrink-0 bg-gradient-to-b from-black/60 to-black/20 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
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
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-amber-400/80">
                Campus Thales · Sodexo
              </p>
              <h1 className="text-lg font-bold tracking-tight md:text-xl">
                Mapping des espaces
              </h1>
              <p className="text-[11px] text-white/50">
                {timeStr} · {restaurants.length} espace{restaurants.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <KioskMode restaurants={restaurants} />
            <div className="hidden md:flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-white/50">Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <div className="relative min-w-0 flex-1">
          <CampusMap restaurants={restaurants} hoveredId={hoveredId} />
        </div>

        {showList && (
          <div className="absolute right-0 top-0 z-20 hidden h-full p-3 pl-0 md:block">
            <RestaurantListSidebar
              restaurants={restaurants}
              selectedId={selectedId}
              onSelect={(id) => selectRestaurant(id)}
              onHover={setHoveredId}
            />
          </div>
        )}
      </div>

      {showList && (
        <div className="shrink-0 border-t border-white/10 bg-[#0a1628]/90 p-3 backdrop-blur-xl md:hidden">
          <p className="mb-2 text-[11px] font-medium text-white/50">Espaces</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {restaurants.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => selectRestaurant(r.id)}
                className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 touch-manipulation"
              >
                {r.nom}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selected && !showFloorPlan && (
          <RestaurantDetail restaurant={selected} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && showFloorPlan && selected.floorPlan && (
          <FloorPlanViewer restaurant={selected} />
        )}
      </AnimatePresence>
    </div>
  );
}
