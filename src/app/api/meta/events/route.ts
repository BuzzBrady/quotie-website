import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvents, type CapiEvent } from "@/lib/metaCapi";

type Body = {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
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

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.event_name || !body.event_id) {
    return NextResponse.json({ error: "event_name and event_id required" }, { status: 400 });
  }

  const event: CapiEvent = {
    event_name: body.event_name,
    event_id: body.event_id,
    event_source_url: body.event_source_url || req.headers.get("referer") || undefined,
    user_data: {
      em: body.em,
      ph: body.ph,
      fn: body.fn,
      fbp: body.fbp || req.cookies.get("_fbp")?.value,
      fbc: body.fbc || req.cookies.get("_fbc")?.value,
    },
    custom_data: {
      content_name: body.content_name,
      content_category: body.content_category || "quotie_funnel",
      vsl_variant: body.vsl_variant,
      percent: body.percent,
    },
  };

  try {
    const result = await sendCapiEvents([event], req.headers);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Meta events route error:", err);
    return NextResponse.json({ sent: false, error: "capi error" }, { status: 200 });
  }
}
