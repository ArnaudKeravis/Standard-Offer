import { cn } from "@/lib/utils";

/**
 * Persona portrait. Real portrait assets arrive in a later phase; for now we
 * render a clean accent monogram so the layout is presentation-ready without
 * broken image references. `portraitUrl` remains in the data model for later.
 */
export function PersonaPortrait({
  name,
  className,
  rounded = "rounded-2xl",
}: {
  name: string;
  className?: string;
  rounded?: string;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-center overflow-hidden",
        rounded,
        className,
      )}
      style={{
        background:
          "linear-gradient(140deg, color-mix(in oklab, var(--studio-accent), white 4%), color-mix(in oklab, var(--studio-accent), black 30%))",
      }}
    >
      <span className="studio-display text-[2.75rem] font-bold leading-none text-white/95 sm:text-6xl">
        {initials}
      </span>
    </div>
  );
}
