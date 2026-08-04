import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Newsletters · CoDesign Sandbox",
  description:
    "CoDesign & Labs newsletters and year-in-review artefacts.",
};

export default function NewslettersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--spark-paper)] text-[var(--spark-ink)] antialiased">
      {children}
    </div>
  );
}
