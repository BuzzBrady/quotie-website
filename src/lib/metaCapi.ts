import { createHash } from "crypto";
import { META_PIXEL_ID } from "@/lib/metaBrowser";

const GRAPH_VERSION = "v21.0";

const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "Lead",
  "InitiateCheckout",
  "SubmitApplication",
  "Schedule",
  "Contact",
  "VslPlay",
  "VslProgress",
  "VslComplete",
  "ApplyCtaClick",
  "ApplyFormStep",
  "ApplyVsl",
]);

export type CapiUser = {
  em?: string | null;
  ph?: string | null;
  fn?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  client_ip_address?: string | null;
  client_user_agent?: string | null;
};

export type CapiEvent = {
  event_name: string;
  event_time?: number;
  event_id: string;
  event_source_url?: string | null;
  action_source?: "website";
  user_data?: CapiUser;
  custom_data?: Record<string, string | number | undefined>;
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashIfPresent(value?: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return undefined;
  return sha256(trimmed);
}

function clientIp(headers: Headers): string | undefined {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || undefined;
  return headers.get("x-real-ip") || undefined;
}

function userPayload(user: CapiUser | undefined, headers: Headers) {
  const data: Record<string, string> = {};
  const em = hashIfPresent(user?.em);
  const ph = hashIfPresent(user?.ph);
  const fn = hashIfPresent(user?.fn);
  if (em) data.em = em;
  if (ph) data.ph = ph;
  if (fn) data.fn = fn;
  if (user?.fbp) data.fbp = user.fbp;
  if (user?.fbc) data.fbc = user.fbc;
  const ip = user?.client_ip_address || clientIp(headers);
  const ua = user?.client_user_agent || headers.get("user-agent") || undefined;
  if (ip) data.client_ip_address = ip;
  if (ua) data.client_user_agent = ua;
  return data;
}

export async function sendCapiEvents(
  events: CapiEvent[],
  headers: Headers
): Promise<{ sent: boolean; skipped?: string; error?: string }> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) return { sent: false, skipped: "META_CAPI_ACCESS_TOKEN missing" };

  const allowed = events.filter((event) => ALLOWED_EVENTS.has(event.event_name));
  if (allowed.length === 0) return { sent: false, skipped: "no allowed events" };

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || META_PIXEL_ID;
  const payload: Record<string, unknown> = {
    data: allowed.map((event) => ({
      event_name: event.event_name,
      event_time: event.event_time || Math.floor(Date.now() / 1000),
      event_id: event.event_id,
      event_source_url: event.event_source_url || undefined,
      action_source: event.action_source || "website",
      user_data: userPayload(event.user_data, headers),
      custom_data: event.custom_data
        ? Object.fromEntries(
            Object.entries(event.custom_data).filter(
              ([, value]) => value !== undefined && value !== ""
            )
          )
        : undefined,
    })),
  };

  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testCode) payload.test_event_code = testCode;

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Meta CAPI failed:", res.status, text);
    return { sent: false, error: `capi ${res.status}` };
  }

  return { sent: true };
}
