/**
 * Server-side lead gating for /api/leads.
 *
 * Goal: stop bots and junk submissions (fake phones, throwaway emails,
 * scripted POSTs) before they create Close leads, CRM rows and Slack pings.
 * Real humans with real details always pass. Anything ambiguous fails open.
 */

import { promises as dns } from "node:dns";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { HONEYPOT_FIELD } from "@/lib/leadGateFields";

/** Sources the endpoint accepts. Anything else is a scripted POST. */
export const ALLOWED_SOURCES = new Set([
  "meta_opt_in",
  "meta_opt_in_white",
  "meta_apply",
  "meta_apply_callback",
  "meta_apply_booked",
]);

/** Sources where a phone number is mandatory (the whole point is a call). */
export const PHONE_REQUIRED_SOURCES = new Set([
  "meta_opt_in",
  "meta_opt_in_white",
  "meta_apply",
  "meta_apply_callback",
]);

/** Sources whose forms send honeypot + timing fields, so we can require them. */
export const TIMED_SOURCES = new Set(["meta_opt_in", "meta_opt_in_white", "meta_apply"]);

export { HONEYPOT_FIELD };

/** Fastest plausible human submission after the form mounts. */
export const MIN_FORM_MS = 3000;

const ALLOWED_COUNTRIES = new Set(["AU", "NZ"]);

// ---------------------------------------------------------------------------
// Bot signals (honeypot + timing)
// ---------------------------------------------------------------------------

export interface GateFields {
  [HONEYPOT_FIELD]?: string | null;
  form_started_at?: number | string | null;
  source?: string;
}

/**
 * Returns a reason string when the request looks automated, else null.
 * Callers should respond with a fake success so bots don't learn.
 */
export function botReason(body: GateFields, now = Date.now()): string | null {
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim()) return "honeypot";

  const started = Number(body.form_started_at);
  const timed = TIMED_SOURCES.has(body.source || "");

  if (!Number.isFinite(started) || started <= 0) {
    return timed ? "missing_timing" : null;
  }
  if (now - started < MIN_FORM_MS) return "too_fast";
  return null;
}

// ---------------------------------------------------------------------------
// Phone
// ---------------------------------------------------------------------------

export type PhoneResult =
  | { ok: true; phone: string | null }
  | { ok: false; error: string };

const PHONE_ERROR = "Please enter a valid Australian or NZ phone number.";

/** Digit strings nobody real has: 0400000000, 0412345678, 0498765432... */
function looksLikeKeyboardMash(digits: string): boolean {
  const distinct = new Set(digits.split("")).size;
  if (distinct <= 2) return true;
  if (/(\d)\1{5,}/.test(digits)) return true;
  if (/(?:0123456|1234567|2345678|3456789|9876543|8765432|7654321|6543210)/.test(digits)) {
    return true;
  }
  return false;
}

export function validatePhone(raw: string | undefined, required: boolean): PhoneResult {
  const input = (raw || "").trim();
  if (!input) {
    return required ? { ok: false, error: "Please enter your phone number." } : { ok: true, phone: null };
  }

  // Local format defaults to AU; an NZ number typed without +64 gets a second go.
  const parsed = [
    parsePhoneNumberFromString(input, "AU"),
    parsePhoneNumberFromString(input, "NZ"),
  ].find((p) => p?.isValid() && p.country && ALLOWED_COUNTRIES.has(p.country));
  if (!parsed) return { ok: false, error: PHONE_ERROR };
  if (looksLikeKeyboardMash(parsed.nationalNumber)) {
    return { ok: false, error: PHONE_ERROR };
  }

  // Keep the number as typed (whitespace collapsed). An NZ mobile without +64
  // also parses as a valid AU landline, so E.164 would silently corrupt it.
  return { ok: true, phone: input.replace(/\s+/g, " ") };
}

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------

export type EmailResult = { ok: true; email: string } | { ok: false; error: string };

const EMAIL_ERROR = "Please enter a valid email address.";

/** Stricter than the old regex: real TLD, no double dots, sane lengths. */
const EMAIL_RE = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/i;

/**
 * Throwaway / placeholder domains. Kept short and obvious on purpose:
 * the MX check below catches the long tail of made-up domains.
 */
const BLOCKED_DOMAINS = new Set([
  "example.com",
  "example.com.au",
  "test.com",
  "test.com.au",
  "email.com",
  "mail.com.invalid",
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "sharklasers.com",
  "grr.la",
  "10minutemail.com",
  "10minutemail.net",
  "temp-mail.org",
  "tempmail.com",
  "tempmail.net",
  "tempr.email",
  "throwawaymail.com",
  "yopmail.com",
  "yopmail.fr",
  "dispostable.com",
  "trashmail.com",
  "trashmail.de",
  "getnada.com",
  "nada.email",
  "maildrop.cc",
  "mailnesia.com",
  "mintemail.com",
  "mohmal.com",
  "fakeinbox.com",
  "spamgourmet.com",
  "emailondeck.com",
  "burnermail.io",
  "tempail.com",
  "moakt.com",
  "inboxkitten.com",
  "mailsac.com",
  "harakirimail.com",
  "33mail.com",
]);

/** Local parts that are only ever typed by someone testing or trolling. */
const JUNK_LOCAL_PARTS = new Set([
  "test",
  "testing",
  "asdf",
  "asdfasdf",
  "qwerty",
  "abc",
  "aaa",
  "aaaa",
  "xxx",
  "none",
  "null",
  "noemail",
  "no",
  "na",
  "n/a",
  "fake",
  "spam",
]);

const MX_TIMEOUT_MS = 2500;

/**
 * True when the domain can receive mail. Fails OPEN on DNS errors other than
 * "no such domain / no records", so a flaky resolver never blocks a real lead.
 */
export async function domainAcceptsMail(domain: string): Promise<boolean> {
  const timeout = new Promise<"timeout">((resolve) =>
    setTimeout(() => resolve("timeout"), MX_TIMEOUT_MS)
  );
  try {
    const result = await Promise.race([dns.resolveMx(domain), timeout]);
    if (result === "timeout") return true;
    return result.length > 0;
  } catch (err) {
    const code = (err as { code?: string }).code;
    if (code === "ENOTFOUND" || code === "ENODATA") {
      // Some domains publish only an A record and still accept mail.
      try {
        const a = await Promise.race([dns.resolve4(domain), timeout]);
        return a === "timeout" || a.length > 0;
      } catch {
        return false;
      }
    }
    return true;
  }
}

export async function validateEmail(raw: string | undefined): Promise<EmailResult> {
  const email = (raw || "").trim().toLowerCase();
  if (!email) return { ok: false, error: "Please enter your email." };
  if (email.length > 254 || !EMAIL_RE.test(email)) return { ok: false, error: EMAIL_ERROR };

  const [local, domain] = email.split("@");
  if (BLOCKED_DOMAINS.has(domain)) return { ok: false, error: EMAIL_ERROR };
  if (JUNK_LOCAL_PARTS.has(local)) return { ok: false, error: EMAIL_ERROR };
  if (!(await domainAcceptsMail(domain))) return { ok: false, error: EMAIL_ERROR };

  return { ok: true, email };
}

// ---------------------------------------------------------------------------
// Request origin + rate limit
// ---------------------------------------------------------------------------

/**
 * Browser fetches always send Origin on POST; scripted hits usually don't,
 * or send someone else's. Allow only same-host requests.
 */
export function originAllowed(origin: string | null, host: string | null): boolean {
  if (!host) return true;
  if (!origin) return process.env.NODE_ENV !== "production";
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

/**
 * Best-effort in-memory sliding window, per serverless instance. Blunts a
 * curl loop; not a substitute for a Vercel WAF rate-limit rule on /api/leads.
 */
export function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

/** Vercel stamps this on every request; empty locally. */
export function requestCountry(headers: Headers): string | null {
  return headers.get("x-vercel-ip-country") || null;
}
