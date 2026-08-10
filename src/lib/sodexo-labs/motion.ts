/** Apple-style fluid motion helpers for Labs deck (WWDC Designing Fluid Interfaces). */

/** Critically damped UI spring — no overshoot (Apple default). */
export const labsSpringUi = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.4,
};

/** Slightly snappier settle for chrome / progress. */
export const labsSpringChrome = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.32,
};

/** Momentum release — slight bounce only after a flick. */
export const labsSpringMomentum = {
  type: "spring" as const,
  bounce: 0.18,
  duration: 0.38,
};

/** Stagger item spring (critically damped). */
export const labsSpringStagger = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.42,
};

/**
 * Apple projection: resting point from release velocity (px/s).
 * decelerationRate ≈ 0.998 normal, 0.99 snappier.
 */
export function projectVelocity(
  initialVelocity: number,
  decelerationRate = 0.998,
): number {
  return (
    ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate)
  );
}

/** Progressive resistance past a bound — soft edge, not a hard stop. */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55,
): number {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}
