"use client";

import { CheckCircle2 } from "lucide-react";
import LeadCaptureForm from "@/components/lead-capture/LeadCaptureForm";
import Container from "@/components/ui/Container";

const TRUST_SIGNALS = [
  "No credit card required",
  "We handle the setup",
  "Cancel anytime",
];

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="animate-blob absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-blob absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            animationDelay: "8s",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-[family-name:var(--font-jakarta)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Get a quoting system built for{" "}
            <span className="relative inline-block">
              your business
              {/* Underline SVG */}
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 C50 2, 150 2, 198 6"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-blue-100/70 text-base sm:text-lg mb-10 leading-relaxed">
            Tell us about your trade and we&apos;ll get you set up with a
            quoting system that fits the way you actually work.
          </p>

          {/* Lead capture form */}
          <div className="bg-white/[0.08] backdrop-blur-sm rounded-2xl border border-white/[0.15] p-6 sm:p-8 mb-8">
            <LeadCaptureForm source="landing_page_cta" />
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {TRUST_SIGNALS.map((signal) => (
              <div
                key={signal}
                className="flex items-center gap-2 text-sm text-blue-100/60"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-200/60" />
                {signal}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
