import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Reserve Your Quotie Strategy Session" },
  description:
    "Last step — reserve a time for your Quotie Strategy Session.",
  robots: { index: false, follow: false, nocache: true },
};

export default function ApplyBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
