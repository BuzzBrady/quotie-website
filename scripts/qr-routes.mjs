// Shared helper: loads the real redirects() output from next.config.ts using
// Next's own config loader and route validator (no extra dependencies).
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Frozen baseline: the slugs printed when QR codes were first produced.
// The printed list in src/config/qr-printed-slugs.json must always contain
// all of these (so deleting one from the JSON is caught too, even on
// Vercel builds without git history). Only ever add to this list.
export const FROZEN_BASELINE_SLUGS = Object.freeze([
  "car",
  "pamphlet",
  "jumper",
  "shirt",
  "card-zac",
  "card-erin",
  "card-buzz",
]);

export const FALLBACK_DESTINATION = "/directory";
export const TEMPORARY_STATUS_CODES = new Set([302, 307]);

export function loadPrintedSlugs() {
  const file = path.join(repoRoot, "src/config/qr-printed-slugs.json");
  const data = JSON.parse(readFileSync(file, "utf8"));
  if (!data || !Array.isArray(data.slugs)) {
    throw new Error(`${file} must contain a "slugs" array`);
  }
  return data.slugs;
}

export async function loadRedirects() {
  const loadConfig = require("next/dist/server/config").default;
  const loadCustomRoutes = require("next/dist/lib/load-custom-routes").default;
  const { PHASE_PRODUCTION_BUILD } = require("next/constants");
  const config = await loadConfig(PHASE_PRODUCTION_BUILD, repoRoot, { silent: true });
  // Same processing and validation Next applies at build time.
  const { redirects } = await loadCustomRoutes(config);
  return redirects.filter((r) => !r.internal);
}

export function statusOf(route) {
  if (route.statusCode) return route.statusCode;
  return route.permanent ? 308 : 307;
}
