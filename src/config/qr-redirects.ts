// QR code short links: printed QR codes encode https://quotie.au/q/<slug>.
// These slugs are printed on physical marketing (car wrap, pamphlets,
// merch, business cards) and must NEVER be removed, only repointed.
// Every printed slug is listed in ./qr-printed-slugs.json, and
// scripts/check-qr-redirects.mjs fails the build if one goes missing.
// Destinations are relative so they also work on preview deployments.
// See SEO-REFERENCE.md "QR code redirects".
export const qrRedirects: Record<string, string> = {
  car: "/directory?utm_source=qr&utm_medium=car-wrap&utm_campaign=car",
  pamphlet: "/directory?utm_source=qr&utm_medium=pamphlet&utm_campaign=pamphlet",
  jumper: "/directory?utm_source=qr&utm_medium=merch&utm_campaign=jumper",
  shirt: "/directory?utm_source=qr&utm_medium=merch&utm_campaign=shirt",
  "card-zac": "/?utm_source=qr&utm_medium=business-card&utm_campaign=card-zac",
  "card-erin": "/?utm_source=qr&utm_medium=business-card&utm_campaign=card-erin",
  "card-buzz": "/?utm_source=qr&utm_medium=business-card&utm_campaign=card-buzz",
};

// Unknown slugs and bare /q land here.
export const qrFallbackDestination = "/directory";
