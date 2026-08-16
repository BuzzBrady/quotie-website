import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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
  utm_term?: string;
  referrer?: string;
  page_url?: string;
  pixel_event_id?: string;
}

const OPT_IN_SOURCES = new Set(["meta_opt_in", "meta_opt_in_white"]);
const APPLY_SOURCES = new Set([
  "meta_apply",
  "meta_apply_callback",
  "meta_apply_booked",
]);
const NOTE_ONLY_SOURCES = new Set(["meta_apply_booked"]);
const ADS_SOURCES = new Set([...OPT_IN_SOURCES, ...APPLY_SOURCES]);

function adsPageLabel(source?: string): string {
  if (source && APPLY_SOURCES.has(source)) return "quotie.au/apply";
  return "quotie.au/opt-in";
}

/** Opt-in stays on CLOSE_LEAD_STATUS_ID. Apply never falls back to that inbox. */
function closeStatusIdForSource(source?: string): string | undefined {
  if (source && APPLY_SOURCES.has(source)) {
    return process.env.CLOSE_APPLICATION_STATUS_ID || undefined;
  }
  return process.env.CLOSE_LEAD_STATUS_ID || undefined;
}

function leadNotes(body: LeadPayload): string {
  return [
    `Submitted via ${adsPageLabel(body.source)}`,
    body.page_url ? `Page: ${body.page_url}` : null,
    body.trade_type ? `Trade: ${body.trade_type}` : null,
    body.quotes_per_month ? `Quotes per month: ${body.quotes_per_month}` : null,
    body.quote_prep_time ? `Quote prep time: ${body.quote_prep_time}` : null,
    body.biggest_frustration
      ? `Biggest frustration: ${body.biggest_frustration}`
      : null,
    body.biggest_difference
      ? `Biggest difference: ${body.biggest_difference}`
      : null,
    body.timeline ? `Timeline: ${body.timeline}` : null,
    body.financial_position
      ? `Financial position: ${body.financial_position}`
      : null,
    body.preferred_call_time
      ? `Preferred call time: ${body.preferred_call_time}`
      : null,
    body.timezone ? `Timezone: ${body.timezone}` : null,
    body.callback_notes ? `Callback notes: ${body.callback_notes}` : null,
    body.source ? `Funnel source: ${body.source}` : null,
    body.pixel_event_id ? `Pixel event_id: ${body.pixel_event_id}` : null,
    body.utm_source ? `utm_source: ${body.utm_source}` : null,
    body.utm_medium ? `utm_medium: ${body.utm_medium}` : null,
    body.utm_campaign ? `utm_campaign: ${body.utm_campaign}` : null,
    body.referrer ? `referrer: ${body.referrer}` : null,
  ]
    .filter(Boolean)
    .join("\n");
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

  const notes = leadNotes(body);
  const existingId = await findCloseLeadId(apiKey, email);
  const statusId = closeStatusIdForSource(body.source);

  if (existingId) {
    const update: Record<string, unknown> = {};
    if (statusId && body.source && APPLY_SOURCES.has(body.source)) {
      update.status_id = statusId;
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
