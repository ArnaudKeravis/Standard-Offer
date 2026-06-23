"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useThalesStore } from "@/lib/thales/store";
import type { Restaurant, Stand } from "@/lib/thales/types";
import { OFFRE_LABELS } from "@/lib/thales/utils";
import { FloorPlanBackButton } from "@/components/RestaurantDetail";

const STAND_COLORS: Record<string, string> = {
  italien: "#e74c3c",
  sushi: "#3498db",
  healthy: "#2ecc71",
  "fast-corner": "#f39c12",
  grill: "#e67e22",
  "street-food": "#9b59b6",
  desserts: "#fd79a8",
  brasserie: "#1abc9c",
  boulangerie: "#d4a574",
  "coffee-shop": "#6d4c41",
};

interface FloorPlanViewerProps {
  restaurant: Restaurant;
}

export function FloorPlanViewer({ restaurant }: FloorPlanViewerProps) {
  const floorPlan = restaurant.floorPlan!;
  const selectedStand = useThalesStore((s) => s.selectedStand);
  const selectStand = useThalesStore((s) => s.selectStand);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const handleStandClick = useCallback(
    (stand: Stand) => {
      selectStand(selectedStand?.id === stand.id ? null : stand);
      setScale(1.4);
      setPan({
        x: -(stand.positionX + stand.width / 2) * 0.3,
        y: -(stand.positionY + stand.height / 2) * 0.3,
      });
    },
    [selectStand, selectedStand]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-[#060d18]"
    >
      <FloorPlanBackButton />

      <div className="absolute left-6 top-20 z-50">
        <h2 className="text-xl font-bold text-white">{restaurant.nom}</h2>
        <p className="text-sm text-white/50">Plan interactif — touchez un stand</p>
      </div>

      <div
        ref={containerRef}
        className="flex h-full items-center justify-center overflow-hidden p-16 pt-28"
      >
        <motion.div
          animate={{ scale, x: pan.x, y: pan.y }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-5xl"
        >
          <svg
            viewBox={floorPlan.viewBox}
            className="w-full h-auto drop-shadow-2xl"
            role="img"
            aria-label={`Plan de ${restaurant.nom}`}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="100%" height="100%" fill="#0f1a2e" rx="16" />
            <rect width="100%" height="100%" fill="url(#grid)" rx="16" />

            <rect
              x="30"
              y="30"
              width="90%"
              height="85%"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              rx="8"
              strokeDasharray="8 4"
            />

            <text x="400" y="460" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="14">
              ACCÈS CONVIVES
            </text>

            {floorPlan.stands.map((stand) => {
              const color = STAND_COLORS[stand.categorie] ?? "#64748b";
              const isSelected = selectedStand?.id === stand.id;
              return (
                <g key={stand.id} style={{ cursor: "pointer" }} onClick={() => handleStandClick(stand)}>
                  <motion.rect
                    x={stand.positionX}
                    y={stand.positionY}
                    width={stand.width}
                    height={stand.height}
                    rx={8}
                    fill={isSelected ? color : `${color}88`}
                    stroke={isSelected ? "#fff" : color}
                    strokeWidth={isSelected ? 2.5 : 1}
                    filter={isSelected ? "url(#glow)" : undefined}
                    whileHover={{ fill: color }}
                    layoutId={`stand-${stand.id}`}
                  />
                  <text
                    x={stand.positionX + stand.width / 2}
                    y={stand.positionY + stand.height / 2 - 6}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="600"
                    pointerEvents="none"
                  >
                    {stand.nom}
                  </text>
                  <text
                    x={stand.positionX + stand.width / 2}
                    y={stand.positionY + stand.height / 2 + 10}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.6)"
                    fontSize="9"
                    pointerEvents="none"
                  >
                    {OFFRE_LABELS[stand.categorie] ?? stand.categorie}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedStand && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 w-full max-w-md px-6"
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-2xl p-6 ring-1 ring-white/20 shadow-2xl">
              <div className="flex items-center gap-3">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: STAND_COLORS[selectedStand.categorie] ?? "#64748b" }}
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedStand.nom}</h3>
                  <p className="text-sm text-white/60">
                    {OFFRE_LABELS[selectedStand.categorie] ?? selectedStand.categorie}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 z-50 flex flex-col gap-2">
        {Object.entries(STAND_COLORS)
          .filter(([key]) => floorPlan.stands.some((s) => s.categorie === key))
          .map(([key, color]) => (
            <div key={key} className="flex items-center gap-2 text-xs text-white/50">
              <span className="size-2.5 rounded-sm" style={{ backgroundColor: color }} />
              {OFFRE_LABELS[key] ?? key}
            </div>
          ))}
      </div>
    </motion.div>
  );
}
