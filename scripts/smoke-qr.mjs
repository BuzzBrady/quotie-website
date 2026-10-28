#!/usr/bin/env node
// Smoke test live QR redirects against a deployment.
// Usage: npm run smoke:qr [-- <baseUrl>]   or   QR_SMOKE_BASE_URL=<url> npm run smoke:qr
// Default base URL: https://quotie.au
// Expected Locations come from the real redirects() in next.config.ts.
import {
  FALLBACK_DESTINATION,
  TEMPORARY_STATUS_CODES,
  loadPrintedSlugs,
  loadRedirects,
} from "./qr-routes.mjs";

const base = (process.argv[2] || process.env.QR_SMOKE_BASE_URL || "https://quotie.au").replace(/\/+$/, "");

const redirects = await loadRedirects();
const destinationFor = (source) => redirects.find((r) => r.source === source)?.destination;

const cases = loadPrintedSlugs().map((slug) => ({
  path: `/q/${slug}`,
  expected: destinationFor(`/q/${slug}`),
}));
cases.push({ path: "/q/unknown", expected: destinationFor("/q/:path*") ?? FALLBACK_DESTINATION });

// Compare as absolute URLs so relative and absolute Location headers both work.
const resolve = (loc) => new URL(loc, `${base}/`).href;

const rows = [];
let failed = 0;
for (const { path, expected } of cases) {
  let status = "ERR";
  let location = "";
  let ok = false;
  try {
    const res = await fetch(`${base}${path}`, { method: "HEAD", redirect: "manual" });
    status = res.status;
    location = res.headers.get("location") ?? "";
    ok = TEMPORARY_STATUS_CODES.has(status) && !!expected && resolve(location) === resolve(expected);
  } catch (err) {
    location = `request failed: ${err.message}`;
  }
  if (!ok) failed++;
  rows.push({ path, status, location, expected: expected ?? "(none in config)", result: ok ? "PASS" : "FAIL" });
}

console.log(`QR smoke test against ${base}`);
console.table(rows);
if (failed > 0) {
  console.error(`${failed} of ${rows.length} QR redirects failed.`);
  process.exit(1);
}
console.log(`All ${rows.length} QR redirects OK.`);
