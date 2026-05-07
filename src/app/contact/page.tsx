import { createMetadata } from "@/lib/metadata";
import ContactClient from "./ContactClient";

export const metadata = createMetadata({
  title: "Contact Us — Get in Touch with Quotie",
  description:
    "Send us a message or email hello@quotie.au. We're based on the Central Coast, NSW and respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
