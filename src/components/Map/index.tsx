"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { MapCallout } from "./MapCallout";
import { useThalesStore } from "@/lib/thales/store";
import type { Restaurant } from "@/lib/thales/types";
import { MAP_CALLOUTS, THEME_STYLES } from "@/lib/thales/map-layout";
import { getWaitColor, isRestaurantOpen, matchesFilter } from "@/lib/thales/utils";

interface CampusMapProps {
  restaurants: Restaurant[];
}

export function CampusMap({ restaurants }: CampusMapProps) {
  const selectedId = useThalesStore((s) => s.selectedId);
  const selectRestaurant = useThalesStore((s) => s.selectRestaurant);
  const mapZoom = useThalesStore((s) => s.mapZoom);
  const activeFilters = useThalesStore((s) => s.activeFilters);
  const kioskMode = useThalesStore((s) => s.kioskMode);

  const filteredIds = useMemo(() => {
    if (activeFilters.length === 0) return new Set(restaurants.map((r) => r.id));
    return new Set(
      restaurants
        .filter((r) => {
          const open = isRestaurantOpen(r.horaires);
          return activeFilters.every((f) => matchesFilter(r, f, open));
        })
        .map((r) => r.id),
    );
  }, [restaurants, activeFilters]);

  const layoutById = useMemo(
    () => new Map(MAP_CALLOUTS.map((l) => [l.id, l])),
    [],
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1a2332]">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: mapZoom.scale,
          x: `${(50 - mapZoom.x) * (mapZoom.scale - 1) * 0.8}%`,
          y: `${(50 - mapZoom.y) * (mapZoom.scale - 1) * 0.8}%`,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 200,
          duration: kioskMode ? 1.2 : 0.8,
        }}
      >
        {/* 16:9 map stage */}
        <div className="relative aspect-video w-full max-h-full max-w-[100vw]">
          <Image
            src="/thales/campus-aerial.png"
            alt="Vue aérienne du campus Thales"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Subtle edge vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />

          {/* Leader lines + pins */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {MAP_CALLOUTS.map((layout) => {
              const restaurant = restaurants.find((r) => r.id === layout.id);
              if (!restaurant) return null;
              const visible = filteredIds.has(layout.id) || kioskMode;
              const selected = selectedId === layout.id;
              const theme = THEME_STYLES[layout.theme];
              const waitColor = getWaitColor(restaurant.attenteTempsReel);
              const dotColors = { green: "#34d399", orange: "#fbbf24", red: "#f87171" };

              const cardCenterX = layout.cardX + (layout.cardWidth ?? 15) / 2;
              const cardCenterY = layout.cardY + 5;

              return (
                <g key={layout.id} opacity={visible ? 1 : 0.15}>
                  <line
                    x1={cardCenterX}
                    y1={cardCenterY}
                    x2={layout.pinX}
                    y2={layout.pinY}
                    stroke={theme.line}
                    strokeWidth={selected ? 0.35 : 0.2}
                    strokeOpacity={selected ? 0.9 : 0.55}
                  />
                  {selected && (
                    <circle
                      cx={layout.pinX}
                      cy={layout.pinY}
                      r="2.5"
                      fill="none"
                      stroke="rgba(255,184,28,0.5)"
                      strokeWidth="0.3"
                    >
                      <animate
                        attributeName="r"
                        from="1"
                        to="4"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="1"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  <circle
                    cx={layout.pinX}
                    cy={layout.pinY}
                    r={selected ? 1.1 : 0.75}
                    fill={dotColors[waitColor]}
                    stroke={selected ? "#ffb81c" : "#fff"}
                    strokeWidth={selected ? 0.35 : 0.2}
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive callout cards */}
          {restaurants.map((r) => {
            const layout = layoutById.get(r.id);
            if (!layout) return null;
            return (
              <MapCallout
                key={r.id}
                restaurant={r}
                layout={layout}
                selected={selectedId === r.id}
                visible={filteredIds.has(r.id)}
                isOpen={isRestaurantOpen(r.horaires)}
                onClick={() => selectRestaurant(selectedId === r.id ? null : r.id)}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Title overlay — matches mapping PDF */}
      {!selectedId && (
        <div className="pointer-events-none absolute left-[2%] top-[3%] z-10 max-w-md">
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-white drop-shadow-lg md:text-2xl lg:text-3xl">
            Mapping des espaces
          </h2>
          <p className="mt-1 max-w-sm text-[10px] leading-snug text-white/80 drop-shadow md:text-xs">
            Un lieu de vie gourmand, convivial et créatif où chaque espace a sa
            personnalité et ses usages.
          </p>
        </div>
      )}
    </div>
  );
}
