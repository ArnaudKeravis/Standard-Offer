import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Persona portrait.
 *
 * When a `src` is supplied (editorial portrait asset in `/public`), it is shown
 * edge-to-edge with a subtle accent wash so it sits on-brand. Without one, we
 * fall back to a clean human-silhouette illustration over the accent gradient —
 * never a broken image, always visibly a person.
 */
export function PersonaPortrait({
  name,
  src,
  className,
  rounded = "rounded-2xl",
  sizes = "(max-width: 768px) 40vw, 288px",
}: {
  name: string;
  src?: string;
  className?: string;
  rounded?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", rounded, className)}
      style={{
        background:
          "linear-gradient(140deg, color-mix(in oklab, var(--studio-accent), white 4%), color-mix(in oklab, var(--studio-accent), black 30%))",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={`Portrait de ${name}`}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : (
        <HumanSilhouette name={name} />
      )}
    </div>
  );
}

/** In-code human figure so the fallback still clearly reads as a person. */
function HumanSilhouette({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 100 125"
      role="img"
      aria-label={`Portrait de ${name}`}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMax meet"
    >
      <g fill="rgba(255,255,255,0.92)">
        <circle cx="50" cy="45" r="20" />
        <path d="M50 68c-20 0-33 14-36 33 24 12 48 12 72 0-3-19-16-33-36-33Z" />
      </g>
    </svg>
  );
}
