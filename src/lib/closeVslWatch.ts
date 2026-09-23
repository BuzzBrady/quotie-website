import {
  formatVslWatch,
  replaceVslLine,
  type CloseLeadNoteInput,
} from "@/lib/closeLeadNote";

export type VslWatchEvent = "view" | "play" | "progress" | "complete" | "flush";

export type VslWatchPayload = CloseLeadNoteInput & {
  event?: VslWatchEvent | string | null;
};

function closeAuth(apiKey: string) {
  return `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
}

async function closeJson(
  apiKey: string,
  path: string,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; json: Record<string, unknown> | null }> {
  const res = await fetch(`https://api.close.com/api/v1${path}`, {
    ...init,
    headers: {
      Authorization: closeAuth(apiKey),
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  const text = await res.text().catch(() => "");
  let json: Record<string, unknown> | null = null;
  if (text) {
    try {
      json = JSON.parse(text) as Record<string, unknown>;
    } catch {
      json = null;
    }
  }
  if (!res.ok) {
    console.error("Close VSL watch failed:", path, res.status, text.slice(0, 400));
  }
  return { ok: res.ok, status: res.status, json };
}

async function findCloseLeadId(
  apiKey: string,
  email: string
): Promise<string | null> {
  const query = encodeURIComponent(`email:${email}`);
  const { ok, json } = await closeJson(apiKey, `/lead/?_limit=1&query=${query}`);
  if (!ok || !json) return null;
  const data = json.data as { id?: string }[] | undefined;
  return data?.[0]?.id ?? null;
}

async function findCloseLeadIdRetry(
  apiKey: string,
  email: string
): Promise<string | null> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const id = await findCloseLeadId(apiKey, email);
    if (id) return id;
    await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
  }
  return null;
}

function shouldAddNote(event: string | null | undefined, percent: number): boolean {
  if (event === "play" || event === "complete") return true;
  if (event === "progress") {
    return [25, 50, 75, 95, 100].includes(Math.round(percent));
  }
  return false;
}

export async function reportVslWatchToClose(
  body: VslWatchPayload
): Promise<{ ok: boolean; reason?: string }> {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) return { ok: false, reason: "no_key" };

  const email = body.email?.trim().toLowerCase();
  if (!email) return { ok: false, reason: "no_email" };

  const leadId = await findCloseLeadIdRetry(apiKey, email);
  if (!leadId) return { ok: false, reason: "no_lead" };

  const watchLine = formatVslWatch(body);
  if (!watchLine) return { ok: false, reason: "no_watch_line" };

  const current = await closeJson(apiKey, `/lead/${leadId}/`);
  const description =
    typeof current.json?.description === "string" ? current.json.description : "";
  const nextDescription = replaceVslLine(description, watchLine);

  if (nextDescription !== description) {
    await closeJson(apiKey, `/lead/${leadId}/`, {
      method: "PUT",
      body: JSON.stringify({ description: nextDescription }),
    });
  }

  const percent = Number(body.vsl_percent);
  if (shouldAddNote(body.event, Number.isFinite(percent) ? percent : 0)) {
    await closeJson(apiKey, "/activity/note/", {
      method: "POST",
      body: JSON.stringify({ lead_id: leadId, note: `VSL: ${watchLine}` }),
    });
  }

  return { ok: true };
}
