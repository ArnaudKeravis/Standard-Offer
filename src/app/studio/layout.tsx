import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Persona Studio",
  description:
    "Create, understand and design with the people you serve. Evidence-based personas for Sodexo CoDesign workshops.",
};

/**
 * Persona Studio root. A single default theme context is established here so the
 * shared design-system tokens resolve everywhere; individual project and
 * persona surfaces override `data-studio-theme` and `--persona-accent` locally.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-studio-theme="corporate"
      className="min-h-screen bg-[var(--studio-paper)] text-[var(--studio-ink)]"
    >
      {children}
    </div>
  );
}
