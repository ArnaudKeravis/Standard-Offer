import type { Metadata } from "next";
import { SharePointWrxWireframe } from "@/components/demos/sharepoint-wrx-wireframe";

export const metadata: Metadata = {
  title: "WRX Wireframe — Sodexo Spark Demos",
  description:
    "Sodexo WRX product page recreation with recommended placement for Consumer persona, experience framing, and modular journey.",
};

export default function SparkXpWireframePage() {
  return <SharePointWrxWireframe />;
}
