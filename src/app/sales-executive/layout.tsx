import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Sales Executive | Quotie",
  description:
    "Get a dedicated, Quotie-trained sales executive in your business. They call leads, send quotes, follow up, and close jobs — so you can focus on the work.",
  path: "/sales-executive",
});

export default function SalesExecutiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
