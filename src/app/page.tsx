import { createMetadata } from "@/lib/metadata";
import { FAQSchema } from "@/components/seo/JsonLd";
import { FAQS } from "@/lib/faqData";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Showcase from "@/components/sections/Showcase";
import Features from "@/components/sections/Features";
import WhatYouGet from "@/components/sections/WhatYouGet";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export const metadata = createMetadata({
  title: "Quotie — Quote Faster. Close More.",
  description:
    "We build your quoting system — you generate branded proposals in under 30 seconds. Multi-option quotes, pipeline tracking, and automated follow-ups for trades businesses across Australia & NZ.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <FAQSchema items={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
      <Hero />
      <SocialProof />
      <Showcase />
      <Features />
      <WhatYouGet />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
