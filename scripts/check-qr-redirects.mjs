#!/usr/bin/env node
// Guard for printed QR codes. Runs before every build ("prebuild") and in CI.
// Fails (exit 1) if any printed /q/<slug> redirect has been removed, made
// permanent, or emptied, if the printed slug list has lost a baseline slug,
// or if the /q fallbacks are missing or ordered before the specific slugs.
import {
  FALLBACK_DESTINATION,
  FROZEN_BASELINE_SLUGS,
  TEMPORARY_STATUS_CODES,
  loadPrintedSlugs,
  loadRedirects,
  statusOf,
} from "./qr-routes.mjs";

const errors = [];

let printed = [];
try {
  printed = loadPrintedSlugs();
} catch (err) {
  errors.push(`Could not read printed slug list: ${err.message}`);
}

for (const slug of FROZEN_BASELINE_SLUGS) {
  if (!printed.includes(slug)) {
    errors.push(
      `Printed slug "${slug}" was removed from src/config/qr-printed-slugs.json. That list only ever grows.`,
    );
  }
}

let redirects = [];
try {
  redirects = await loadRedirects();
} catch (err) {
  errors.push(`Could not load redirects() from next.config.ts: ${err.message}`);
}

const indexOfSource = (source) => redirects.findIndex((r) => r.source === source);

const slugIndexes = [];
for (const slug of new Set([...FROZEN_BASELINE_SLUGS, ...printed])) {
  const source = `/q/${slug}`;
  const i = indexOfSource(source);
  if (i === -1) {
    errors.push(`Missing redirect for printed QR slug ${source}`);
    continue;
  }
  slugIndexes.push(i);
  const route = redirects[i];
  const status = statusOf(route);
  if (route.permanent === true || !TEMPORARY_STATUS_CODES.has(status)) {
    errors.push(`${source} must be temporary (302 or 307), got ${status}`);
  }
  if (typeof route.destination !== "string" || route.destination.trim() === "") {
    errors.push(`${source} has an empty destination`);
  }
}

const lastSlugIndex = Math.max(-1, ...slugIndexes);
for (const source of ["/q", "/q/:path*"]) {
  const i = indexOfSource(source);
  if (i === -1) {
    errors.push(`Missing fallback redirect ${source} -> ${FALLBACK_DESTINATION}`);
    continue;
  }
  const route = redirects[i];
  if (route.destination !== FALLBACK_DESTINATION) {
    errors.push(`Fallback ${source} must go to ${FALLBACK_DESTINATION}, got "${route.destination}"`);
  }
  if (route.permanent === true || !TEMPORARY_STATUS_CODES.has(statusOf(route))) {
    errors.push(`Fallback ${source} must be temporary (302 or 307)`);
  }
  if (i < lastSlugIndex) {
    errors.push(`Fallback ${source} is ordered before a specific /q/<slug> redirect, so it would swallow it`);
  }
}

if (errors.length > 0) {
  console.error("QR redirect check FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  console.error("Printed QR codes must keep working. See SEO-REFERENCE.md \"QR code redirects\".");
  process.exit(1);
}

console.log(
  `QR redirect check passed: ${printed.length} printed slugs, all temporary, fallbacks /q and /q/:path* -> ${FALLBACK_DESTINATION} after them.`,
);
