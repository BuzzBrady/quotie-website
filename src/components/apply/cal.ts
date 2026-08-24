/** Public Cal.com event used on /apply/book. */
export const APPLY_CAL_URL =
  process.env.NEXT_PUBLIC_APPLY_CAL_URL ||
  "https://cal.com/team/quotie/quotie-strategy-session";

export function calEmbedUrl(
  base: string,
  prefill?: { name?: string; email?: string }
): string {
  const fallback = "https://cal.com/team/quotie/quotie-strategy-session";
  try {
    const url = new URL(base.trim() || fallback);
    if (!url.searchParams.has("embed")) url.searchParams.set("embed", "true");
    if (!url.searchParams.has("layout")) {
      url.searchParams.set("layout", "month_view");
    }
    if (prefill?.name) url.searchParams.set("name", prefill.name);
    if (prefill?.email) url.searchParams.set("email", prefill.email);
    return url.toString();
  } catch {
    return fallback;
  }
}
