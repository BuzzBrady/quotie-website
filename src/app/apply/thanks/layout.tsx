import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Your Quotie Strategy Session Is Scheduled" },
  description:
    "Your meeting is scheduled. Watch the confirmation video and the Quotie system explainer before your strategy session.",
  robots: { index: false, follow: false, nocache: true },
};

export default function ApplyThanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
