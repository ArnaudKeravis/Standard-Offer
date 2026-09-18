import type { ValidationStatus } from "./schemas";

export const STATUS_LABEL: Record<ValidationStatus, string> = {
  pr0: "Pr0 already here",
  pr1: "Pr1 validated",
  pr2: "Pr2 to validate",
  external: "External",
};

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
