import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Quoting Software by Industry | Quotie",
  description:
    "Quotie is built for Australian and NZ trades businesses. Find quoting software tailored for solar, roofing, electrical, cleaning, plumbing, HVAC, painting, landscaping, and building.",
  path: "/industries",
});

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
