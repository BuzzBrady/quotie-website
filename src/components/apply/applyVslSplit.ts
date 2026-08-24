import { metaClickIds } from "@/lib/metaBrowser";

export const APPLY_VSL_STORAGE_KEY = "quotie_apply_vsl";

// Masters are gitignored (too large) — serve from the R2 bucket, same as the homepage hero.
const R2_BASE = "https://pub-6a618f39fa984c4aa12e520b363259e1.r2.dev";

export const APPLY_VSL_VARIANTS = {
  belief: {
    id: "belief",
    src: `${R2_BASE}/vsl-belief.mp4`,
    label: "Intro + problem + story + demo",
  },
  speed: {
    id: "speed",
    src: `${R2_BASE}/vsl-speed.mp4`,
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

export const APPLY_VSL_WATCH_KEY = "quotie_apply_vsl_watch";

export type ApplyVslWatch = {
  variant: ApplyVslVariantId;
  percent: number;
  seconds: number;
  duration: number;
  unmuted: boolean;
  completed: boolean;
};

export function readApplyVslWatch(): ApplyVslWatch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(APPLY_VSL_WATCH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ApplyVslWatch>;
    const variant = isApplyVslVariant(parsed.variant)
      ? parsed.variant
      : LIVE_APPLY_VSL;
    return {
      variant,
      percent: Number(parsed.percent) || 0,
      seconds: Number(parsed.seconds) || 0,
      duration: Number(parsed.duration) || 0,
      unmuted: Boolean(parsed.unmuted),
      completed: Boolean(parsed.completed),
    };
  } catch {
    return null;
  }
}

export function recordApplyVslWatch(
  update: Partial<ApplyVslWatch> & { variant?: ApplyVslVariantId }
) {
  if (typeof window === "undefined") return;
  const prev = readApplyVslWatch();
  const next: ApplyVslWatch = {
    variant:
      update.variant ||
      prev?.variant ||
      LIVE_APPLY_VSL,
    percent: Math.max(
      prev?.percent ?? 0,
      Math.min(100, Math.round(update.percent ?? 0))
    ),
    seconds: Math.max(prev?.seconds ?? 0, update.seconds ?? 0),
    duration: update.duration || prev?.duration || 0,
    unmuted: Boolean(prev?.unmuted || update.unmuted),
    completed: Boolean(prev?.completed || update.completed),
  };
  if (next.completed) next.percent = 100;
  localStorage.setItem(APPLY_VSL_WATCH_KEY, JSON.stringify(next));
}

export function applyLeadContext() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const vsl = assignApplyVslVariant(params.get("vsl"));
  const ids = metaClickIds();
  const watch = readApplyVslWatch();
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    utm_term: params.get("utm_term") || null,
    referrer: document.referrer || null,
    page_url: window.location.href,
    vsl_variant: vsl,
    vsl_percent: watch?.percent ?? 0,
    vsl_seconds: watch ? Math.round(watch.seconds) : 0,
    vsl_duration: watch ? Math.round(watch.duration) : 0,
    vsl_unmuted: watch?.unmuted ?? false,
    vsl_completed: watch?.completed ?? false,
    fbp: ids.fbp,
    fbc: ids.fbc,
  };
}
