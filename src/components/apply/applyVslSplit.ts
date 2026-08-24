import { metaClickIds } from "@/lib/metaBrowser";

export const APPLY_VSL_STORAGE_KEY = "quotie_apply_vsl";

export const APPLY_VSL_VARIANTS = {
  belief: {
    id: "belief",
    src: "/apply/vsl-belief.mp4?v=1",
    label: "Intro + problem + story + demo",
  },
  speed: {
    id: "speed",
    src: "/apply/vsl-speed.mp4?v=2",
    label: "Intro + demo",
  },
} as const;

export type ApplyVslVariantId = keyof typeof APPLY_VSL_VARIANTS;

export function isApplyVslVariant(
  value: string | null | undefined
): value is ApplyVslVariantId {
  return value === "belief" || value === "speed";
}

export function applyVslSrc(id: ApplyVslVariantId): string {
  return APPLY_VSL_VARIANTS[id].src;
}

/** Live cut until the split test comes back. Always intro → demo. */
export const LIVE_APPLY_VSL: ApplyVslVariantId = "speed";

export function assignApplyVslVariant(
  _forced?: string | null
): ApplyVslVariantId {
  if (typeof window !== "undefined") {
    localStorage.setItem(APPLY_VSL_STORAGE_KEY, LIVE_APPLY_VSL);
  }
  return LIVE_APPLY_VSL;
}

export function readApplyVslVariant(): ApplyVslVariantId | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(APPLY_VSL_STORAGE_KEY);
  return isApplyVslVariant(stored) ? stored : null;
}

export function applyLeadContext() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const vsl = assignApplyVslVariant(params.get("vsl"));
  const ids = metaClickIds();
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    utm_term: params.get("utm_term") || null,
    referrer: document.referrer || null,
    page_url: window.location.href,
    vsl_variant: vsl,
    fbp: ids.fbp,
    fbc: ids.fbc,
  };
}
