import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Quotie Application" },
  description:
    "Apply to see if Quotie is a fit. Seven short questions. Takes around 2 minutes.",
  robots: { index: false, follow: false, nocache: true },
};

export default function ApplyFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
