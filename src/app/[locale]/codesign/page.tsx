import type { Metadata } from "next";
import { CoDesignSharePoint } from "@/components/codesign/codesign-sharepoint";

export const metadata: Metadata = {
  title: "CoDesign — Innovate by design, with your clients | Sodexo Spark",
  description:
    "Sodexo CoDesign Services: a way to innovate by design with your clients. Method, four pillars, engagement models, deliverables and proof — a growth & retention engine.",
};

export default function CoDesignPage() {
  return <CoDesignSharePoint />;
}
