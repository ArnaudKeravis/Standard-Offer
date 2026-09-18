import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FY27 people coverage · CoDesign",
  description:
    "Password-gated FY27 coverage board for design seats, dates, validation and budget.",
};

export default function PeopleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[var(--spark-paper)] text-[var(--spark-ink)] antialiased">
      {children}
    </div>
  );
}
