import type { ApplyMeeting } from "@/components/apply/applyQuestions";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function firstIso(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : value;
}

export function meetingFromUnknown(data: unknown): ApplyMeeting | null {
  const root = asRecord(data);
  if (!root) return null;

  const nested = asRecord(root.data) ?? asRecord(root.payload) ?? root;
  const start =
    firstIso(nested.startTime) ||
    firstIso(nested.start) ||
    firstIso(nested.start_time) ||
    firstIso(root.startTime) ||
    firstIso(root.start);

  if (!start) return {};
  return { startIso: start };
}

export function iframeHeightFromMessage(data: unknown): number | null {
  const root = asRecord(data);
  if (!root) return null;

  const type = String(root.type ?? root.event ?? root.method ?? "");
  const nested = asRecord(root.data) ?? root;
  const height = nested.iframeHeight ?? nested.height ?? root.iframeHeight;

  if (
    typeof height === "number" &&
    height > 200 &&
    (type.includes("dimension") ||
      type.includes("Dimension") ||
      root.originator === "CAL")
  ) {
    return Math.ceil(height);
  }

  return null;
}

export function isBookingSuccessMessage(data: unknown): boolean {
  const root = asRecord(data);
  if (!root) return false;

  const type = String(root.type ?? root.event ?? root.action ?? root.method ?? "");
  if (/bookingSuccessful/i.test(type)) return true;
  if (type === "booked" || type === "bookingConfirmed") return true;
  if (type === "calendly.event_scheduled") return true;

  const nested = asRecord(root.data);
  if (
    root.originator === "CAL" &&
    nested &&
    typeof nested.startTime === "string" &&
    (typeof nested.uid === "string" || typeof nested.title === "string")
  ) {
    return true;
  }

  return false;
}
