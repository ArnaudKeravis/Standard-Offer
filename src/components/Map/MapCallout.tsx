"use client";

import type { MapCalloutLayout } from "@/lib/thales/map-layout";
import { THEME_STYLES } from "@/lib/thales/map-layout";
import type { Restaurant } from "@/lib/thales/types";
import { AFFLUENCE_CONFIG, getRestaurantOpenState } from "@/lib/thales/utils";

interface MapCalloutProps {
  restaurant: Restaurant;
  layout: MapCalloutLayout;
  selected: boolean;
  visible: boolean;
  onClick: () => void;
}

export function MapCallout({
  restaurant,
  layout,
  selected,
  visible,
  onClick,
}: MapCalloutProps) {
  const theme = THEME_STYLES[layout.theme];
  const openState = getRestaurantOpenState(restaurant);
  const affluence = AFFLUENCE_CONFIG[restaurant.affluence];
  const isWhite = layout.theme === "white";

  const ariaStatus = openState.showAffluence ? affluence.label : openState.statusLabel;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        absolute z-10 text-left touch-manipulation transition-all duration-200
        ${selected ? "z-20 ring-2 ring-amber-400/60 shadow-2xl shadow-black/30 scale-[1.04]" : "shadow-lg shadow-black/20 hover:scale-[1.02]"}
        rounded-sm overflow-hidden border ${theme.border}
        ${!visible ? "pointer-events-none opacity-25" : "opacity-100"}
      `}
      style={{
        left: `${layout.cardX}%`,
        top: `${layout.cardY}%`,
        width: `${layout.cardWidth ?? 15}%`,
        minWidth: "140px",
        maxWidth: "220px",
      }}
      aria-label={`${restaurant.nom} — ${ariaStatus}`}
    >
      <div
        className={`px-2.5 py-1.5 ${theme.header} ${isWhite ? "text-[#1a7a6e]" : "text-white"}`}
      >
        <p
          className={`text-[10px] font-bold uppercase leading-tight tracking-wide ${isWhite ? "text-[#333]" : ""}`}
        >
          {restaurant.nom}
        </p>
      </div>

      <div className="bg-white/95 px-2.5 py-2 backdrop-blur-sm">
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          {layout.keywords.map((kw) => (
            <span
              key={kw}
              className="text-[8px] font-semibold uppercase tracking-wider text-[#444] leading-tight"
            >
              {kw}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-start justify-between gap-2 border-t border-gray-100 pt-2">
          {openState.showAffluence ? (
            <>
              <span className="flex items-center gap-1 text-[9px] font-semibold text-[#333]">
                <span aria-hidden>{affluence.emoji}</span>
                {affluence.label}
              </span>
              <span className="text-[8px] font-medium text-emerald-600 shrink-0">Ouvert</span>
            </>
          ) : (
            <span className="text-[8px] font-medium leading-snug text-gray-500">
              {openState.statusLabel}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
