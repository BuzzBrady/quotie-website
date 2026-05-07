import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "./constants";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

export function createMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: CreateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og/home.png`;

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
