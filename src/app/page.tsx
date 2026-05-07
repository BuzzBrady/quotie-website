import { createMetadata } from "@/lib/metadata";
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
  title: "Quotie — Quote Faster. Close More. | Quoting Software for Trades",
  description:
    "Build quotes in under 30 seconds. Send branded proposals with multiple options, track your pipeline, and close more work. Built for Australian & NZ trades businesses.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
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
