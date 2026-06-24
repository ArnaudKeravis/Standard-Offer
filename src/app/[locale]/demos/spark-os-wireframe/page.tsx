import type { Metadata } from "next";
import { SharePointOsWireframe } from "@/components/demos/sharepoint-os-wireframe";

export const metadata: Metadata = {
  title: "Spark OS Wireframe — Sodexo Spark Demos",
  description:
    "SharePoint page recreation with recommended placement for Operator persona, experience framing, and modular journey.",
};

export default function SparkOsWireframePage() {
  return <SharePointOsWireframe />;
}
