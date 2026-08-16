export const SITE_URL = "https://quotie.au";
export const APP_URL = "https://app.quotie.au";
export const SITE_NAME = "Quotie";
export const SITE_TAGLINE = "Quote Faster. Close More.";
export const SITE_DESCRIPTION =
  "We build your quoting system — you generate branded proposals in under 30 seconds. Multi-option quotes, Accept & Sign online, pipeline tracking, and automated follow-ups for trades businesses across Australia & NZ.";

export const BRAND = {
  blue: "#1f61aa",
  cyan: "#39b9e5",
  dark: "#08080c",
  darkAlt: "#0f172a",
  textLight: "#e8e8ed",
  textMuted: "rgba(232,232,237,0.5)",
} as const;

export const TRADE_TYPES = [
  "Roofing",
  "Electrical",
  "Plumbing",
  "Solar",
  "HVAC",
  "Painting",
  "Building / Construction",
  "Landscaping / Earthmoving",
  "Other",
] as const;

export const NAV_LINKS = [
  { name: "Features", href: "/features" },
  { name: "Sales Executive", href: "/sales-executive" },
  { name: "Pricing", href: "/pricing" },
  { name: "Industries", href: "/industries" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
] as const;

export const FOOTER_LINKS = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Integrations", href: "/features#integrations" },
    { name: "Changelog", href: "/changelog" },
  ],
  Industries: [
    { name: "Solar", href: "/industries/solar" },
    { name: "Roofing", href: "/industries/roofing" },
    { name: "Electrical", href: "/industries/electrical" },
    { name: "Cleaning", href: "/industries/cleaning" },
    { name: "All Industries", href: "/industries" },
  ],
  Resources: [
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Schedule a Demo", href: "/demo" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
} as const;
