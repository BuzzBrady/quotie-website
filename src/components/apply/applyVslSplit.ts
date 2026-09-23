import { metaClickIds } from "@/lib/metaBrowser";
import { readApplyContact, saveApplyContact } from "@/components/apply/applyQuestions";

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

export function hydrateApplyContactFromUrl() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const email = (params.get("email") || "").trim().toLowerCase();
    if (!email) return;
    const stored = readApplyContact();
    const firstName = (
      params.get("firstName") ||
      params.get("first_name") ||
      stored?.firstName ||
      ""
    ).trim();
    saveApplyContact({
      email,
      phone: (params.get("mobile") || params.get("phone") || stored?.phone || "").trim(),
      firstName,
      fullName: stored?.fullName || firstName,
    });
  } catch {
    /* Private mode / blocked storage — URL params still work for Close. */
  }
}

function vslWatchContact() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  let stored: ReturnType<typeof readApplyContact> = null;
  try {
    stored = readApplyContact();
  } catch {
    stored = null;
  }
  const email = (params.get("email") || stored?.email || "").trim().toLowerCase();
  if (!email) return null;
  const firstName = (
    params.get("firstName") ||
    params.get("first_name") ||
    stored?.firstName ||
    ""
  ).trim();
  return {
    email,
    phone: (params.get("mobile") || params.get("phone") || stored?.phone || "").trim(),
    firstName,
    fullName: (stored?.fullName || firstName).trim(),
  };
}

export type VslWatchEvent = "view" | "play" | "progress" | "complete" | "flush";

export function sendVslWatchToClose(
  update: Partial<ApplyVslWatch> & { event: VslWatchEvent }
) {
  if (typeof window === "undefined") return;
  hydrateApplyContactFromUrl();
  const contact = vslWatchContact();
  if (!contact?.email) return;
  const watch = readApplyVslWatch();
  const payload = {
    email: contact.email,
    phone: contact.phone,
    full_name: contact.fullName,
    vsl_variant: update.variant || watch?.variant || LIVE_APPLY_VSL,
    vsl_percent: update.percent ?? watch?.percent ?? 0,
    vsl_seconds: Math.round(update.seconds ?? watch?.seconds ?? 0),
    vsl_duration: Math.round(update.duration ?? watch?.duration ?? 0),
    vsl_unmuted: Boolean(update.unmuted ?? watch?.unmuted),
    vsl_completed: Boolean(update.completed ?? watch?.completed),
    event: update.event,
    source: update.event === "view" ? "meta_vsl_view" : "meta_vsl_watch",
  };
  void fetch("/api/vsl-watch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* Close update is best-effort; pixel still fired. */
  });
}

export function applyLeadContext(opts?: { includeVsl?: boolean }) {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const vsl = assignApplyVslVariant(params.get("vsl"));
  const ids = metaClickIds();
  const watch = readApplyVslWatch();
  const includeVsl = opts?.includeVsl !== false;
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    utm_content: params.get("utm_content") || null,
    utm_term: params.get("utm_term") || null,
    utm_id: params.get("utm_id") || null,
    referrer: document.referrer || null,
    page_url: window.location.href,
    ...(includeVsl
      ? {
          vsl_variant: vsl,
          vsl_percent: watch?.percent ?? 0,
          vsl_seconds: watch ? Math.round(watch.seconds) : 0,
          vsl_duration: watch ? Math.round(watch.duration) : 0,
          vsl_unmuted: watch?.unmuted ?? false,
          vsl_completed: watch?.completed ?? false,
        }
      : {}),
    fbp: ids.fbp,
    fbc: ids.fbc,
  };
}
