import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Features — Everything From Enquiry to Handshake",
  description:
    "Explore every Quotie feature: quote templates, PDF generation, multi-option proposals, email sending, follow-up dashboards, pipeline tracking, CRM, job handoff, calendar, and automations.",
  path: "/features",
});

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
