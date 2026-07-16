/**
 * Extract plain text from uploaded research files (Phase 5 MVP).
 *
 * Supports UTF-8 text / markdown / CSV directly, and PDF via `pdf-parse`.
 * Never invents content — empty or failed extraction returns "".
 */

export type ExtractResult = {
  text: string;
  type: string;
  warning?: string;
};

const TEXT_EXT = /\.(txt|md|markdown|csv|json)$/i;

export async function extractTextFromUpload(args: {
  buffer: Buffer;
  filename: string;
  mimeType?: string;
}): Promise<ExtractResult> {
  const name = args.filename.toLowerCase();
  const mime = (args.mimeType ?? "").toLowerCase();

  if (
    mime.startsWith("text/") ||
    mime === "application/json" ||
    TEXT_EXT.test(name)
  ) {
    return {
      text: args.buffer.toString("utf8"),
      type: name.endsWith(".md") || name.endsWith(".markdown")
        ? "markdown"
        : name.endsWith(".csv")
          ? "csv"
          : "text",
    };
  }

  if (mime === "application/pdf" || name.endsWith(".pdf")) {
    try {
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: args.buffer });
      const result = await parser.getText();
      await parser.destroy?.();
      return { text: (result.text ?? "").trim(), type: "pdf" };
    } catch (e) {
      return {
        text: "",
        type: "pdf",
        warning:
          e instanceof Error
            ? `PDF extraction failed: ${e.message}`
            : "PDF extraction failed.",
      };
    }
  }

  return {
    text: "",
    type: "unknown",
    warning: "Unsupported file type. Use TXT, MD, CSV or PDF.",
  };
}
