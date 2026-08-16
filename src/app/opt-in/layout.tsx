import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "See How Quotie Works" },
  description:
    "See how Quotie turns the way you already price jobs into a system that can build, send and manage professional quotes in seconds.",
  robots: { index: false, follow: false, nocache: true },
};

export default function OptInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
