import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/components/sodexo-labs/labs-tokens.css";

export const metadata: Metadata = {
  title: "Sodexo Labs",
  description:
    "Co-creating experiences in presentation mode — curated Sodexo Labs credentials for client workshops.",
};

/** Labs keeps its colour system; typography matches Spark (root Inter / Inter Tight). */
export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-labs-root
      className="min-h-screen bg-[var(--labs-paper)] text-[var(--labs-ink)] antialiased"
    >
      {children}
    </div>
  );
}
