import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { formatCloseLeadNote } from "@/lib/closeLeadNote";
import { sendCapiEvents } from "@/lib/metaCapi";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

interface LeadPayload {
  full_name: string;
  email: string;
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
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  referrer?: string;
  page_url?: string;
  pixel_event_id?: string;
  vsl_variant?: string;
  vsl_percent?: number | string | null;
  vsl_seconds?: number | string | null;
  vsl_duration?: number | string | null;
  vsl_unmuted?: boolean | string | null;
  vsl_completed?: boolean | string | null;
  fbp?: string;
  fbc?: string;
}

/** Existing Close lead custom fields — Trade is what setters filter on. */
const CLOSE_CUSTOM_TRADE = "cf_v8Y1jaSpeBb9pWGPw7BaQwAiqvk9r8zToQUBvXHCNc7";
const CLOSE_CUSTOM_COMPANY = "cf_YLtA8dnCGN8kgIhw0L5U0nO0Hkkp9j22wi1nCvR4JyD";

const OPT_IN_SOURCES = new Set(["meta_opt_in", "meta_opt_in_white"]);
const APPLY_SOURCES = new Set([
  "meta_apply",
  "meta_apply_callback",
  "meta_apply_booked",
]);
const NOTE_ONLY_SOURCES = new Set(["meta_apply_booked"]);
const ADS_SOURCES = new Set([...OPT_IN_SOURCES, ...APPLY_SOURCES]);

function capiEventForSource(source?: string): string | null {
  if (source === "meta_opt_in" || source === "meta_opt_in_white") return "Lead";
  if (source === "meta_apply") return "SubmitApplication";
  if (source === "meta_apply_booked") return "Schedule";
  if (source === "meta_apply_callback") return "Contact";
  return null;
}

/** Opt-in stays on CLOSE_LEAD_STATUS_ID. Apply never falls back to that inbox. */
function closeStatusIdForSource(source?: string): string | undefined {
  if (source && APPLY_SOURCES.has(source)) {
    return process.env.CLOSE_APPLICATION_STATUS_ID || undefined;
  }
  return process.env.CLOSE_LEAD_STATUS_ID || undefined;
}

function leadNotes(body: LeadPayload): string {
  return formatCloseLeadNote(body);
}

function closeCustomFields(body: LeadPayload): Record<string, string> {
  const custom: Record<string, string> = {};
  if (body.trade_type?.trim()) {
    custom[`custom.${CLOSE_CUSTOM_TRADE}`] = body.trade_type.trim();
  }
  if (body.company_name?.trim()) {
    custom[`custom.${CLOSE_CUSTOM_COMPANY}`] = body.company_name.trim();
  }
  return custom;
}

async function insertMarketingLead(
  supabase: SupabaseClient,
  body: LeadPayload,
  fullName: string,
  email: string
) {
  const { error } = await supabase.from("leads").insert({
    id: crypto.randomUUID(),
    full_name: fullName,
    email,
    phone: body.phone?.trim() || null,
    company_name: body.company_name?.trim() || null,
    trade_type: body.trade_type || null,
    source: body.source || "api",
    status: "new",
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    utm_term: body.utm_term || null,
    referrer: body.referrer || null,
    page_url: body.page_url || null,
  });

  return error;
}

async function ingestStaffLead(body: LeadPayload, fullName: string, email: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.INGEST_LEAD_WEBHOOK_SECRET;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !secret) return false;

  const res = await fetch(`${url}/functions/v1/ingest-lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey || "",
      "x-webhook-secret": secret,
    },
    body: JSON.stringify({
      contact_name: fullName,
      email,
      phone: body.phone?.trim() || null,
      business_name: body.company_name?.trim() || null,
      trade_type: body.trade_type || null,
      source: body.source || "meta_opt_in",
      notes: leadNotes(body),
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_term: body.utm_term || null,
      referrer: body.referrer || null,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("ingest-lead failed:", res.status, text);
    return false;
  }

  return true;
}

async function insertCrmLead(
  supabase: SupabaseClient,
  body: LeadPayload,
  fullName: string,
  email: string
) {
  const { data: stages, error: stagesError } = await supabase
    .from("crm_pipeline_stages")
    .select("id, is_won, is_lost, sort_order")
    .order("sort_order", { ascending: true });

  if (stagesError) {
    console.error("crm_pipeline_stages error:", stagesError);
  }

  const firstOpen = (stages ?? []).find(
    (stage: { is_won?: boolean; is_lost?: boolean }) =>
      !stage.is_won && !stage.is_lost
  );

  const { error } = await supabase.from("crm_leads").insert({
    id: crypto.randomUUID(),
    contact_name: fullName,
    email,
    phone: body.phone?.trim() || null,
    business_name: body.company_name?.trim() || null,
    trade_type: body.trade_type || null,
    source: body.source || "meta_opt_in",
    status: "open",
    stage_id: firstOpen?.id ?? null,
    notes: leadNotes(body),
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    utm_term: body.utm_term || null,
    referrer: body.referrer || null,
  });

  return error;
}

function closeAuth(apiKey: string) {
  return `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
}

async function findCloseLeadId(apiKey: string, email: string): Promise<string | null> {
  const query = encodeURIComponent(`email:${email}`);
  const res = await fetch(
    `https://api.close.com/api/v1/lead/?_limit=1&query=${query}`,
    { headers: { Authorization: closeAuth(apiKey), Accept: "application/json" } }
  );
  if (!res.ok) return null;
  const json = (await res.json()) as { data?: { id?: string }[] };
  return json.data?.[0]?.id ?? null;
}

async function addCloseNote(apiKey: string, leadId: string, note: string) {
  const res = await fetch("https://api.close.com/api/v1/activity/note/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: closeAuth(apiKey),
    },
    body: JSON.stringify({ lead_id: leadId, note }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Close note failed:", res.status, text);
  }
}

async function upsertCloseLead(
  body: LeadPayload,
  fullName: string,
  email: string
): Promise<boolean> {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) return false;

  const notes = leadNotes({ ...body, full_name: fullName, email });
  const existingId = await findCloseLeadId(apiKey, email);
  const statusId = closeStatusIdForSource(body.source);
  const custom = closeCustomFields(body);

  if (existingId) {
    const update: Record<string, unknown> = { ...custom };
    if (statusId && body.source && APPLY_SOURCES.has(body.source)) {
      update.status_id = statusId;
    }
    if (body.source === "meta_apply") {
      update.description = notes;
    }
    if (Object.keys(update).length > 0) {
      const res = await fetch(`https://api.close.com/api/v1/lead/${existingId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: closeAuth(apiKey),
        },
        body: JSON.stringify(update),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Close lead update failed:", res.status, text);
      }
    }
    await addCloseNote(apiKey, existingId, notes);
    return true;
  }

  const phone = body.phone?.trim();
  const payload: Record<string, unknown> = {
    name: body.company_name?.trim() || fullName,
    description: notes,
    contacts: [
      {
        name: fullName,
        emails: [{ type: "office", email }],
        phones: phone ? [{ type: "mobile", phone }] : [],
      },
    ],
    ...custom,
  };

  if (statusId) {
    payload.status_id = statusId;
  } else if (body.source && APPLY_SOURCES.has(body.source)) {
    console.error(
      "CLOSE_APPLICATION_STATUS_ID missing — apply lead created without application status"
    );
  }

  const res = await fetch("https://api.close.com/api/v1/lead/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: closeAuth(apiKey),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Close CRM lead create failed:", res.status, text);
    return false;
  }

  return true;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { full_name, email } = body;

  if (!full_name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  const fullName = full_name.trim();
  const normalisedEmail = email.trim().toLowerCase();
  const isAdsLead = ADS_SOURCES.has(body.source || "");

  try {
    let savedToQuotie = false;

    try {
      if (!NOTE_ONLY_SOURCES.has(body.source || "")) {
        const supabase = getSupabaseAdmin();

        const marketingError = await insertMarketingLead(
          supabase,
          body,
          fullName,
          normalisedEmail
        );

        if (marketingError) {
          console.error("Lead insert error:", marketingError);
        } else {
          savedToQuotie = true;
        }

        if (isAdsLead) {
          const ingested = await ingestStaffLead(body, fullName, normalisedEmail);
          if (!ingested) {
            const crmError = await insertCrmLead(
              supabase,
              body,
              fullName,
              normalisedEmail
            );
            if (crmError) {
              console.error("CRM lead insert error:", crmError);
            }
          }
        }
      }
    } catch (err) {
      console.error("Quotie lead save error:", err);
    }

    let savedToClose = false;
    if (isAdsLead) {
      savedToClose = await upsertCloseLead(body, fullName, normalisedEmail);
    }

    if (!savedToQuotie && !savedToClose) {
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    const capiName = capiEventForSource(body.source);
    if (capiName && body.pixel_event_id) {
      void sendCapiEvents(
        [
          {
            event_name: capiName,
            event_id: body.pixel_event_id,
            event_source_url: body.page_url,
            user_data: {
              em: normalisedEmail,
              ph: body.phone?.trim(),
              fn: fullName.split(/\s+/)[0],
              fbp: body.fbp || req.cookies.get("_fbp")?.value,
              fbc: body.fbc || req.cookies.get("_fbc")?.value,
            },
            custom_data: {
              content_name: body.source,
              content_category: "quotie_funnel",
              vsl_variant: body.vsl_variant,
              percent: Number.isFinite(Number(body.vsl_percent))
                ? Number(body.vsl_percent)
                : undefined,
            },
          },
        ],
        req.headers
      ).catch((err) => console.error("Lead CAPI error:", err));
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
