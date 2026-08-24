export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "1088687213818179";

export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function digitsPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return `61${digits.slice(1)}`;
  return digits;
}

/** Persist fbclid as _fbc so CAPI can match the click after the landing URL is stripped. */
export function captureFbclid() {
  if (typeof window === "undefined") return;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid || readCookie("_fbc")) return;
  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  document.cookie = `_fbc=${encodeURIComponent(fbc)}; path=/; max-age=7776000; SameSite=Lax`;
}

export function metaClickIds(): { fbp: string | null; fbc: string | null } {
  if (typeof window === "undefined") return { fbp: null, fbc: null };
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  const fbc =
    readCookie("_fbc") ||
    (fbclid ? `fb.1.${Date.now()}.${fbclid}` : null);
  return { fbp: readCookie("_fbp"), fbc };
}

export type FunnelCapiPayload = {
  event_name: string;
  event_id: string;
  event_source_url: string;
  content_name?: string;
  content_category?: string;
  vsl_variant?: string;
  percent?: number;
  em?: string | null;
  ph?: string | null;
  fn?: string | null;
  fbp?: string | null;
  fbc?: string | null;
};

export function sendCapiBeacon(payload: FunnelCapiPayload) {
  if (typeof window === "undefined") return;
  void fetch("/api/meta/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* Pixel still fired. */
  });
}
