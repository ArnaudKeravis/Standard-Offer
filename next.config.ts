import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Keep tracing rooted on this worktree when a parent lockfile exists.
  outputFileTracingRoot: projectRoot,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.sharepoint.com",
      },
      {
        protocol: "https",
        hostname: "sodexo.sharepoint.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
