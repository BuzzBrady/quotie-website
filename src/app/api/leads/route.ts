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
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  referrer?: string;
  page_url?: string;
}

const OPT_IN_SOURCES = new Set(["meta_opt_in", "meta_opt_in_white"]);

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
      notes: body.page_url
        ? `Submitted via ${body.page_url}`
        : "Submitted via quotie.au/opt-in",
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
    notes: body.page_url
      ? `Submitted via ${body.page_url}`
      : "Submitted via quotie.au/opt-in",
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    utm_term: body.utm_term || null,
    referrer: body.referrer || null,
  });

  return error;
}

async function createCloseLead(
  body: LeadPayload,
  fullName: string,
  email: string
): Promise<boolean> {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) return false;

  const phone = body.phone?.trim();
  const payload: Record<string, unknown> = {
    name: body.company_name?.trim() || fullName,
    description: [
      "Submitted via quotie.au/opt-in",
      body.page_url ? `Page: ${body.page_url}` : null,
      body.utm_source ? `utm_source: ${body.utm_source}` : null,
      body.utm_medium ? `utm_medium: ${body.utm_medium}` : null,
      body.utm_campaign ? `utm_campaign: ${body.utm_campaign}` : null,
      body.referrer ? `referrer: ${body.referrer}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
    contacts: [
      {
        name: fullName,
        emails: [{ type: "office", email }],
        phones: phone ? [{ type: "mobile", phone }] : [],
      },
    ],
  };

  if (process.env.CLOSE_LEAD_STATUS_ID) {
    payload.status_id = process.env.CLOSE_LEAD_STATUS_ID;
  }

  const res = await fetch("https://api.close.com/api/v1/lead/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
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
  const isOptIn = OPT_IN_SOURCES.has(body.source || "");

  try {
    let savedToQuotie = false;

    try {
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

      if (isOptIn) {
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
    } catch (err) {
      console.error("Quotie lead save error:", err);
    }

    let savedToClose = false;
    if (isOptIn) {
      savedToClose = await createCloseLead(body, fullName, normalisedEmail);
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
