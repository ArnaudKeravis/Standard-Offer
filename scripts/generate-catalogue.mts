import fs from "node:fs";
import path from "node:path";
import pdfParse from "pdf-parse";

const ROOT = process.cwd();
const PDF_PATH = path.join(ROOT, "TDDI_Standard_offer2.pdf");

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    console.error(
      `Missing PDF at ${PDF_PATH}\n\nAdd TDDI_Standard_offer2.pdf to the project root and re-run.`,
    );
    process.exitCode = 1;
    return;
  }

  const pdfBuffer = fs.readFileSync(PDF_PATH);
  const parsed = await pdfParse(pdfBuffer);

  // Phase 1: keep the raw text available for deterministic extraction.
  // Phase 2: turn this into structured solutions (typed) from the PDF.
  fs.mkdirSync(path.join(ROOT, "data"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "data", "pdf.raw.txt"), parsed.text, "utf-8");

  console.log("Wrote data/pdf.raw.txt (raw extracted PDF text).");
  console.log(
    "Next: parse the ~25 solutions into data/catalogue.json (blocked until PDF content is available).",
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

