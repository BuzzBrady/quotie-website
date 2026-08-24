import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Your Quoting System, Built For You" },
  description:
    "Watch how Quotie turns the pricing, products, labour, margins and calculations already inside your business into a custom quoting system your entire team can use.",
  robots: { index: false, follow: false, nocache: true },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
