/** Paste a YouTube, Vimeo or Wistia URL. Empty shows the placeholder. */
export const APPLY_VSL_URL = process.env.NEXT_PUBLIC_APPLY_VSL_URL ?? "";

export function toVslEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);

    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtube-nocookie.com")
    ) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
      const embed = parsed.pathname.match(/\/embed\/([^/]+)/);
      if (embed?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${embed[1]}?rel=0`;
      }
      const shorts = parsed.pathname.match(/\/shorts\/([^/]+)/);
      if (shorts?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${shorts[1]}?rel=0`;
      }
    }

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }

    if (parsed.hostname.includes("wistia.com") || parsed.hostname.includes("wistia.net")) {
      const hashed = parsed.pathname.match(/\/(?:medias|embed\/iframe)\/([^/]+)/);
      if (hashed?.[1]) {
        return `https://fast.wistia.net/embed/iframe/${hashed[1]}`;
      }
    }

    return trimmed;
  } catch {
    return null;
  }
}
