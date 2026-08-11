import { createMetadata } from "@/lib/metadata";
import PricingClient from "./PricingClient";

export const metadata = createMetadata({
  title: "Pricing — Simple Plans for Every Trades Business | Quotie",
  description:
    "Quotie pricing: 1 Man Band at $495/mo, Small Team at $695/mo, or custom for 6+ users. Hands-on onboarding included. All prices incl. GST.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingClient />;
}
