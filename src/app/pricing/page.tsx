import { createMetadata } from "@/lib/metadata";
import PricingClient from "./PricingClient";

export const metadata = createMetadata({
  title: "Pricing — Simple Plans for Every Trades Business | Quotie",
  description:
    "Quotie pricing: Starter at $29/mo, Professional at $79/mo, and Enterprise custom. All plans include a free trial. No credit card required.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingClient />;
}
