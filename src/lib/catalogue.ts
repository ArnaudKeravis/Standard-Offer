import fs from "node:fs";
import path from "node:path";

export type SparkLayer = "iq" | "xp" | "os";
export type ServiceLine = "food" | "hospitality" | "workplace";
export type Maturity = "live" | "piloting" | "roadmap";

export type Kpi = {
  label: string;
  value: string;
};

export type Solution = {
  slug: string;
  title: string;
  description: string;
  layer: SparkLayer;
  serviceLines: ServiceLine[];
  outcomes: string[];
  maturity: Maturity;
  capabilityBullets: string[];
  businessImpact: string[];
  kpis: Kpi[];
  tags: string[];
};

function catalogueJsonPath() {
  return path.join(process.cwd(), "data", "catalogue.json");
}

export function getCatalogue(): Solution[] {
  const p = catalogueJsonPath();
  if (!fs.existsSync(p)) {
    throw new Error(
      [
        "Catalogue dataset missing.",
        "",
        "Expected `data/catalogue.json` generated from `TDDI_Standard_offer2.pdf`.",
        "Once the PDF is in the project root, run:",
        "  npm run catalogue:generate",
      ].join("\n"),
    );
  }

  const raw = fs.readFileSync(p, "utf-8");
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) throw new Error("Invalid catalogue.json shape.");

  return parsed as Solution[];
}

