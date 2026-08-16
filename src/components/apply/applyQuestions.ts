export const APPLY_SESSION_KEY = "quotie_apply_booking";
export const APPLY_MEETING_KEY = "quotie_apply_meeting";
export const APPLY_CONTACT_KEY = "quotie_apply_contact";

export type ApplyContact = {
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
};

export function saveApplyContact(contact: ApplyContact) {
  sessionStorage.setItem(APPLY_CONTACT_KEY, JSON.stringify(contact));
}

export function readApplyContact(): ApplyContact | null {
  try {
    const raw = sessionStorage.getItem(APPLY_CONTACT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ApplyContact;
    if (!parsed.email || !parsed.fullName) return null;
    return parsed;
  } catch {
    return null;
  }
}

export type ApplyMeeting = {
  startIso?: string;
  requested?: boolean;
};

export const CALLBACK_WINDOWS = [
  "Weekday mornings (8am–12pm)",
  "Weekday afternoons (12pm–5pm)",
  "Weekday evenings (5pm–7pm)",
  "Weekends",
  "I have a specific time in mind",
] as const;

export const CALLBACK_TIMEZONES = [
  "AEST (Sydney, Melbourne, Brisbane)",
  "ACST (Adelaide, Darwin)",
  "AWST (Perth)",
  "NZST (New Zealand)",
  "Other",
] as const;

export function formatMeetingParts(startIso?: string): {
  time: string;
  day: string;
} | null {
  if (!startIso) return null;
  const date = new Date(startIso);
  if (Number.isNaN(date.getTime())) return null;

  const tz = "Australia/Sydney";
  const time = date.toLocaleTimeString("en-AU", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const day = date.toLocaleDateString("en-AU", {
    timeZone: tz,
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return { time, day };
}

export const FINANCIAL_YES = "YES - I'm in a financial position to invest";
export const FINANCIAL_MAYBE = "Maybe - I can invest if it's the right fit";
export const FINANCIAL_NO = "NO - I'm not in a position to invest";

export function isApplyQualified(financial: string): boolean {
  return financial === FINANCIAL_YES || financial === FINANCIAL_MAYBE;
}

export function firstNameFrom(fullName: string): string {
  const token = fullName.trim().split(/\s+/)[0];
  return token || "";
}

export const QUOTE_VOLUME_OPTIONS = [
  "Less than 10",
  "10-25",
  "26-50",
  "51-100",
  "100+",
] as const;

export const QUOTE_TIME_OPTIONS = [
  "Less than 10 minutes",
  "10 to 30 minutes",
  "30 to 60 minutes",
  "1 to 2 hours",
  "2+ hours",
  "It varies significantly depending on the job",
] as const;

export const FRUSTRATION_OPTIONS = [
  "Too much of the quoting depends on me",
  "Quotes take too long to prepare",
  "Pricing isn't consistent across the team",
  "We're too slow getting quotes back to customers",
  "We lose track of quotes and follow-ups",
  "Other",
] as const;

export const TIMELINE_OPTIONS = [
  "Immediately",
  "Within the next 30 days",
  "Within the next 1 to 3 months",
  "I'm just exploring options right now",
] as const;

export const FINANCIAL_OPTIONS = [
  FINANCIAL_YES,
  FINANCIAL_MAYBE,
  FINANCIAL_NO,
] as const;

export const STEP_META = [
  { remaining: "About 2 minutes left", percent: 14 },
  { remaining: "About 2 minutes left", percent: 29 },
  { remaining: "About 2 minutes left", percent: 43 },
  { remaining: "About 1 minute left", percent: 57 },
  { remaining: null, percent: 71 },
  { remaining: null, percent: 86 },
  { remaining: null, percent: 100 },
] as const;
