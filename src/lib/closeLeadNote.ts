export type CloseLeadNoteInput = {
  full_name?: string;
  email?: string;
  phone?: string;
  company_name?: string;
  trade_type?: string;
  quotes_per_month?: string;
  quote_prep_time?: string;
  biggest_frustration?: string;
  biggest_difference?: string;
  timeline?: string;
  financial_position?: string;
  preferred_call_time?: string;
  timezone?: string;
  callback_notes?: string;
  source?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  utm_id?: string | null;
  referrer?: string | null;
  page_url?: string | null;
  country?: string | null;
  vsl_variant?: string | null;
  vsl_percent?: number | string | null;
  vsl_seconds?: number | string | null;
  vsl_duration?: number | string | null;
  vsl_unmuted?: boolean | string | null;
  vsl_completed?: boolean | string | null;
};

const VSL_LABEL: Record<string, string> = {
  speed: "Intro → demo (speed cut)",
  belief: "Intro + story + demo (long cut)",
};

function num(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function bool(value: boolean | string | null | undefined): boolean {
  return value === true || value === "true";
}

function mmss(total: number): string {
  const s = Math.max(0, Math.round(total));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

const ADS_SOURCES = new Set([
  "meta_opt_in",
  "meta_opt_in_white",
  "meta_apply",
  "meta_apply_booked",
  "meta_apply_callback",
]);

function isAdsSource(source?: string): boolean {
  return ADS_SOURCES.has(source || "");
}

function funnelLabel(source?: string): string {
  if (source === "meta_apply") return "Apply form (quotie.au/apply)";
  if (source === "meta_apply_booked") return "Booked strategy session";
  if (source === "meta_apply_callback") return "Callback request";
  if (source === "meta_opt_in" || source === "meta_opt_in_white") {
    return "Opt-in (quotie.au/opt-in)";
  }
  if (source) return `Website enquiry (${source})`;
  return "Unknown";
}

const OPT_IN_SOURCES = new Set(["meta_opt_in", "meta_opt_in_white"]);

/** Matches the VSL status line we stamp into a Close lead description. */
export const VSL_LINE_RE =
  /^(Did not unmute[^\n]*|Unmuted[^\n]*|VSL not watched yet[^\n]*|Reached VSL[^\n]*|Watched [^\n]*)/m;

export function watchLineRank(line: string): number {
  if (
    /Did not unmute|not unmuted yet|VSL not watched yet/i.test(line) &&
    !/^Watched /i.test(line) &&
    !/^Unmuted/i.test(line)
  ) {
    return /Reached VSL/i.test(line) ? 0.5 : 0;
  }
  if (/Watched 100%|completed/i.test(line)) return 100;
  const match = line.match(/Watched (\d+)%/i);
  if (match) return Math.max(Number(match[1]), 1);
  if (/^Unmuted/i.test(line) || /\bunmuted\b/i.test(line)) return 1;
  return 0;
}

export function replaceVslLine(description: string, watchLine: string): string {
  const next = watchLine.trim();
  if (!next) return description;
  if (!description.trim()) return next;

  const match = description.match(VSL_LINE_RE);
  if (match) {
    if (watchLineRank(match[0]) > watchLineRank(next)) return description;
    return description.replace(VSL_LINE_RE, next);
  }

  const nl = description.indexOf("\n");
  if (nl === -1) return `${description}\n${next}`;
  return `${description.slice(0, nl)}\n${next}${description.slice(nl)}`;
}

export function formatVslWatch(body: CloseLeadNoteInput): string {
  const unmuted = bool(body.vsl_unmuted);
  const completed = bool(body.vsl_completed);
  const percent = num(body.vsl_percent);
  const seconds = num(body.vsl_seconds);
  const duration = num(body.vsl_duration);
  const variant = body.vsl_variant
    ? VSL_LABEL[body.vsl_variant] || body.vsl_variant
    : null;

  if (!unmuted && !(percent && percent > 1)) {
    if (OPT_IN_SOURCES.has(body.source || "")) {
      return "VSL not watched yet";
    }
    if (body.source === "meta_vsl_view") {
      return variant
        ? `Reached VSL page · not unmuted yet · ${variant}`
        : "Reached VSL page · not unmuted yet";
    }
    return variant
      ? `Did not unmute · ${variant}`
      : "Did not unmute / did not watch";
  }

  if (!completed && unmuted && !(percent && percent >= 1)) {
    const started =
      seconds != null && duration && duration > 0
        ? `${mmss(seconds)} / ${mmss(duration)}`
        : null;
    return ["Unmuted · watching", started, variant].filter(Boolean).join(" · ");
  }

  const pct = completed ? 100 : Math.max(0, Math.min(100, Math.round(percent || 0)));
  const time =
    seconds != null && duration && duration > 0
      ? `${mmss(seconds)} / ${mmss(duration)}`
      : seconds != null
        ? mmss(seconds)
        : null;

  return [
    completed ? "Watched 100% (completed)" : `Watched ${pct}%`,
    time,
    unmuted ? "unmuted" : null,
    variant,
  ]
    .filter(Boolean)
    .join(" · ");
}

function section(title: string, lines: Array<string | null | undefined>): string | null {
  const body = lines.filter((line): line is string => Boolean(line && line.trim()));
  if (body.length === 0) return null;
  return `${title}\n${body.join("\n")}`;
}

function line(label: string, value?: string | null): string | null {
  if (!value || !String(value).trim()) return null;
  return `${label}: ${String(value).trim()}`;
}

export function formatCloseLeadNote(body: CloseLeadNoteInput): string {
  const utm = [
    body.utm_source && `source=${body.utm_source}`,
    body.utm_medium && `medium=${body.utm_medium}`,
    body.utm_campaign && `campaign=${body.utm_campaign}`,
    body.utm_content && `content=${body.utm_content}`,
    body.utm_term && `term=${body.utm_term}`,
    body.utm_id && `id=${body.utm_id}`,
  ]
    .filter(Boolean)
    .join(" | ");

  // VSL watch stats only make sense for the ads funnel — website enquiries
  // never see the VSL, so skip the "Did not unmute" noise for them.
  const hasVslData =
    body.vsl_variant != null ||
    body.vsl_percent != null ||
    body.vsl_seconds != null ||
    body.vsl_unmuted != null ||
    body.vsl_completed != null;

  const headline = [
    funnelLabel(body.source),
    isAdsSource(body.source) || hasVslData ? formatVslWatch(body) : null,
    body.financial_position || null,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    headline,
    section("WHO", [
      line("Name", body.full_name),
      line("Phone", body.phone),
      line("Email", body.email),
      line("Company", body.company_name),
    ]),
    section("APPLICATION", [
      line("Trade", body.trade_type),
      line("Quotes / month", body.quotes_per_month),
      line("Time per quote", body.quote_prep_time),
      line("Frustration", body.biggest_frustration),
      line("Biggest difference they want", body.biggest_difference),
      line("Timeline", body.timeline),
      line("Financial", body.financial_position),
    ]),
    section("BOOKING", [
      line("Preferred call time", body.preferred_call_time),
      line("Timezone", body.timezone),
      line("Callback notes", body.callback_notes),
    ]),
    section("SOURCE", [
      line("Funnel", body.source),
      line("Page", body.page_url),
      line("UTM", utm || null),
      line("Referrer", body.referrer),
      line("Country", body.country),
    ]),
  ]
    .filter(Boolean)
    .join("\n\n");
}
