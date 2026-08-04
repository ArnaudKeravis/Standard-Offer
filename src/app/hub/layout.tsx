import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/components/sodexo-labs/labs-tokens.css";

export const metadata: Metadata = {
  title: "CoDesign Sandbox",
  description: "Hub for Sodexo CoDesign workshop artefacts and sandbox previews.",
};

export default function HubLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--spark-paper)] text-[var(--spark-ink)] antialiased">
      {children}
    </div>
  );
}
