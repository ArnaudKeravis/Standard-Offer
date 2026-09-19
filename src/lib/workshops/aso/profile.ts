import type { ProfilePoint, WorkshopSequence } from "@/lib/workshops/aso/types";

export function timeToMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(":").map((part) => Number(part));
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    throw new Error(`Invalid time: ${hhmm}`);
  }
  return hours * 60 + minutes;
}

export function stagePoints(sequences: WorkshopSequence[]): ProfilePoint[] {
  if (sequences.length === 0) return [];

  const starts = sequences.map((sequence) => timeToMinutes(sequence.start));
  const last = sequences[sequences.length - 1];
  const startMin = Math.min(...starts);
  const endMin = timeToMinutes(last.start) + last.durationMin;
  const span = Math.max(1, endMin - startMin);

  return sequences.map((sequence, index) => {
    const start = starts[index];
    const mid = start + sequence.durationMin / 2;
    return {
      sequenceId: sequence.id,
      title: sequence.title,
      start: sequence.start,
      durationMin: sequence.durationMin,
      phase: sequence.phase,
      x: (mid - startMin) / span,
      y: Math.max(0, Math.min(1, sequence.intensity / 100)),
      intensity: sequence.intensity,
      col: sequence.col,
    };
  });
}

export function profilePath(points: ProfilePoint[], width: number, height: number): string {
  if (points.length === 0) return "";

  const padX = width * 0.04;
  const padY = height * 0.12;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const coords = points.map((point) => {
    const x = padX + point.x * innerW;
    const y = padY + (1 - point.y) * innerH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const firstX = padX + points[0].x * innerW;
  const lastX = padX + points[points.length - 1].x * innerW;
  const baseline = padY + innerH;

  return `M ${firstX.toFixed(1)} ${baseline.toFixed(1)} L ${coords.join(" L ")} L ${lastX.toFixed(1)} ${baseline.toFixed(1)} Z`;
}

export function profileLine(points: ProfilePoint[], width: number, height: number): string {
  if (points.length === 0) return "";

  const padX = width * 0.04;
  const padY = height * 0.12;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  return points
    .map((point, index) => {
      const x = padX + point.x * innerW;
      const y = padY + (1 - point.y) * innerH;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function pointPosition(
  point: ProfilePoint,
  width: number,
  height: number,
): { x: number; y: number } {
  const padX = width * 0.04;
  const padY = height * 0.12;
  return {
    x: padX + point.x * (width - padX * 2),
    y: padY + (1 - point.y) * (height - padY * 2),
  };
}
