import { createMetadata } from "@/lib/metadata";
import { FAQSchema } from "@/components/seo/JsonLd";
import { FAQS } from "@/lib/faqData";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import LiveDemo from "@/components/sections/live-demo/LiveDemo";
import SelectionDiff from "@/components/sections/SelectionDiff";
import CoreIdea from "@/components/sections/CoreIdea";
import Showcase from "@/components/sections/Showcase";
import WhatYouGet from "@/components/sections/WhatYouGet";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export const metadata = createMetadata({
  title: "Quotie — Quote Faster. Close More.",
  description:
    "Powerful custom quoting, built for your business — we build your pricing system, you generate branded proposals in under 30 seconds. Quote storage, tracking, and follow-ups for trades businesses across Australia & NZ.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <FAQSchema items={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
      <Hero />
      <SocialProof />
      <LiveDemo />
      <SelectionDiff />
      <CoreIdea />
      <WhatYouGet />
      <Showcase />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
