"use client";

import { pointPosition, profileLine, profilePath } from "@/lib/workshops/aso/profile";
import { PHASES } from "@/lib/workshops/aso/run-of-show";
import type { ColCategory, ProfilePoint } from "@/lib/workshops/aso/types";

const WIDTH = 1200;
const HEIGHT = 420;

const COL_LABEL: Record<ColCategory, string> = {
  flat: "",
  "4": "4",
  "3": "3",
  "2": "2",
  "1": "1",
  hc: "HC",
  sprint: "SPRINT",
  ravito: "",
};

function named(point: ProfilePoint): boolean {
  return point.col === "hc" || point.col === "sprint" || point.col === "1" || point.col === "2";
}

export function StageProfile({
  points,
  activeId,
  compact = false,
  onSelect,
}: {
  points: ProfilePoint[];
  activeId?: string;
  compact?: boolean;
  onSelect?: (sequenceId: string) => void;
}) {
  const width = compact ? 640 : WIDTH;
  const height = compact ? 72 : HEIGHT;
  const line = profileLine(points, width, height);
  const area = compact ? "" : profilePath(points, width, height);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={compact ? "h-14 w-full" : "h-full w-full"}
      role="img"
      aria-label="Profil d'étape de la journée"
    >
      {!compact ? (
        <path d={area} fill="rgba(255,229,0,0.16)" />
      ) : null}
      <path
        d={line}
        fill="none"
        stroke="#FFE500"
        strokeWidth={compact ? 3 : 5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {points.map((point) => {
        const pos = pointPosition(point, width, height);
        const active = point.sequenceId === activeId;
        const label = COL_LABEL[point.col];
        return (
          <g
            key={point.sequenceId}
            transform={`translate(${pos.x} ${pos.y})`}
            className={active && !compact ? "aso-col-pulse" : undefined}
          >
            {onSelect ? (
              <circle
                r={compact ? 7 : 16}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onSelect(point.sequenceId)}
              />
            ) : null}
            <circle
              r={active ? (compact ? 5.5 : 9) : compact ? 3.5 : 6}
              fill={active ? "#E2231A" : PHASES[point.phase].color}
              stroke={active ? "#FFE500" : "#0E0E0E"}
              strokeWidth={active ? 2 : 1.5}
            />
            {!compact && named(point) ? (
              <text
                y={-16}
                textAnchor="middle"
                fill="#F4F1EA"
                fontFamily="Barlow Condensed, sans-serif"
                fontSize="15"
                fontWeight="800"
                letterSpacing="0.06em"
              >
                {label} · {point.title.toUpperCase()}
              </text>
            ) : null}
            {!compact && !named(point) && point.col !== "ravito" ? (
              <text
                y={18}
                textAnchor="middle"
                fill="#7C776C"
                fontFamily="Inter, sans-serif"
                fontSize="10"
                fontWeight="700"
              >
                {point.start}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
