import { defineConfig } from "@playwright/test";
import { env } from "node:process";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.pw.ts",

  use: {
    baseURL: env.PLAYWRIGHT_BASE_URL,
    browserName: "chromium",
    headless: true,
    extraHTTPHeaders: {
      "x-vercel-protection-bypass": env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
      "x-vercel-set-bypass-cookie": "true",
    },
  },
});
