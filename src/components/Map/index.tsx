"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { BUILDINGS } from "@/components/Filters/constants";
import { useThalesStore } from "@/lib/thales/store";
import type { Restaurant } from "@/lib/thales/types";
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
        .map((r) => r.id)
    );
  }, [restaurants, activeFilters]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 origin-center"
        animate={{
          scale: mapZoom.scale,
          x: `${(50 - mapZoom.x) * mapZoom.scale * 0.5}%`,
          y: `${(50 - mapZoom.y) * mapZoom.scale * 0.5}%`,
        }}
        transition={{ type: "spring", damping: 28, stiffness: 200, duration: kioskMode ? 1.2 : 0.8 }}
      >
        <svg
          viewBox="0 0 100  70"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Plan du campus Thales"
        >
          <defs>
            <linearGradient id="campusBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c1a30" />
              <stop offset="50%" stopColor="#0a1425" />
              <stop offset="100%" stopColor="#060d18" />
            </linearGradient>
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
            </linearGradient>
            <filter id="pinGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="100" height="70" fill="url(#campusBg)" />

          {/* Green areas */}
          <ellipse cx="50" cy="55" rx="35" ry="8" fill="rgba(34,197,94,0.06)" />
          <ellipse cx="15" cy="25" rx="8" ry="6" fill="rgba(34,197,94,0.05)" />
          <ellipse cx="85" cy="35" rx="10" ry="7" fill="rgba(34,197,94,0.05)" />

          {/* Paths */}
          <path
            d="M 10 50 Q 30 45, 50 48 Q 70 51, 90 45"
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="0.8"
          />
          <path
            d="M 35 10 L 35 60 M 65 8 L 65 58"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
            strokeDasharray="1 1"
          />

          {/* Buildings */}
          {BUILDINGS.map((b) => (
            <g key={b.id}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="1"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.15"
              />
              <text
                x={b.x + b.w / 2}
                y={b.y + b.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.25)"
                fontSize="2"
                fontWeight="500"
              >
                {b.label}
              </text>
            </g>
          ))}

          {/* Restaurant pins */}
          {restaurants.map((r) => {
            const visible = filteredIds.has(r.id);
            const selected = selectedId === r.id;
            const waitColor = getWaitColor(r.attenteTempsReel);
            const colorMap = { green: "#34d399", orange: "#fbbf24", red: "#f87171" };

            if (!visible && !kioskMode) return null;

            return (
              <g
                key={r.id}
                style={{ cursor: "pointer", opacity: visible ? 1 : 0.2 }}
                onClick={() => selectRestaurant(selected ? null : r.id)}
              >
                {selected && (
                  <motion.circle
                    cx={r.positionX}
                    cy={r.positionY}
                    r="4"
                    fill="none"
                    stroke="rgba(255,184,28,0.4)"
                    strokeWidth="0.3"
                    initial={{ r: 2, opacity: 1 }}
                    animate={{ r: 5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <motion.circle
                  cx={r.positionX}
                  cy={r.positionY}
                  r={selected ? 2.2 : 1.6}
                  fill={colorMap[waitColor]}
                  stroke={selected ? "#ffb81c" : "rgba(255,255,255,0.5)"}
                  strokeWidth={selected ? 0.4 : 0.2}
                  filter="url(#pinGlow)"
                  whileHover={{ r: 2.4 }}
                  layoutId={`pin-${r.id}`}
                />
                <text
                  x={r.positionX}
                  y={r.positionY - 3}
                  textAnchor="middle"
                  fill={selected ? "#ffb81c" : "rgba(255,255,255,0.7)"}
                  fontSize={selected ? "2.2" : "1.8"}
                  fontWeight={selected ? "700" : "500"}
                >
                  {r.nom}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,13,24,0.6)_100%)]" />
    </div>
  );
}
