import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Can't Find a Time? — Schedule Your Session" },
  description:
    "Let us know a good day and time for your Quotie Strategy Session.",
  robots: { index: false, follow: false, nocache: true },
};

export default function ApplyCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
