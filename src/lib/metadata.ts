import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "./constants";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  ogTag?: string; // badge label shown on the OG image (e.g. "Solar Quoting Software")
  type?: "website" | "article";
  publishedTime?: string;
}

export function createMetadata({
  title,
  description,
  path,
  image,
  ogTag,
  type = "website",
  publishedTime,
}: CreateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  // Build dynamic OG image URL; fall back to a caller-supplied static image
  const ogImageUrl = (() => {
    if (image) return image;
    const params = new URLSearchParams({
      title,
      subtitle: description,
      ...(ogTag ? { tag: ogTag } : {}),
    });
    return `${SITE_URL}/og?${params.toString()}`;
  })();

  const ogImage = ogImageUrl;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_AU",
      type,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
