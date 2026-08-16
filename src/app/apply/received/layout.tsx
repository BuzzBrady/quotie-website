import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Application Received" },
  description: "Thanks for applying to Quotie.",
  robots: { index: false, follow: false, nocache: true },
};

export default function ApplyReceivedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
