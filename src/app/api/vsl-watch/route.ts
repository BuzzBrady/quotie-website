import { NextRequest, NextResponse } from "next/server";
import {
  reportVslWatchToClose,
  type VslWatchEvent,
} from "@/lib/closeVslWatch";

const EVENTS = new Set<VslWatchEvent>([
  "view",
  "play",
  "progress",
  "complete",
  "flush",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asEvent(value: unknown): VslWatchEvent | undefined {
  return typeof value === "string" && EVENTS.has(value as VslWatchEvent)
    ? (value as VslWatchEvent)
    : undefined;
}

function asNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function asBool(value: unknown): boolean {
  return value === true || value === "true";
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const event = asEvent(body.event) || "flush";
  const percent = asNumber(body.vsl_percent);
  const seconds = asNumber(body.vsl_seconds);
  const duration = asNumber(body.vsl_duration);

  const result = await reportVslWatchToClose({
    email,
    phone: typeof body.phone === "string" ? body.phone : undefined,
    full_name: typeof body.full_name === "string" ? body.full_name : undefined,
    source:
      typeof body.source === "string"
        ? body.source
        : event === "view"
          ? "meta_vsl_view"
          : "meta_vsl_watch",
    vsl_variant: typeof body.vsl_variant === "string" ? body.vsl_variant : null,
    vsl_percent: percent,
    vsl_seconds: seconds,
    vsl_duration: duration,
    vsl_unmuted: asBool(body.vsl_unmuted),
    vsl_completed: asBool(body.vsl_completed),
    event,
  });

  return NextResponse.json(
    { success: result.ok, skipped: result.reason || null },
    { status: 200 }
  );
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
