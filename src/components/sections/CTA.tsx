"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import LeadCaptureForm from "@/components/lead-capture/LeadCaptureForm";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

const INCLUDED = [
  ["Template build", "Included"],
  ["Pricing logic configured", "Included"],
  ["Your branding", "Included"],
  ["Team training", "Included"],
] as const;

/** The close of the page — set like the acceptance block of a quote. */
export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="bg-deep py-20 lg:py-28">
      <Container>
        <div ref={ref} className="sheet rounded-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-cyan" />
          <div className="grid lg:grid-cols-2">
            {/* The offer */}
            <div className="p-7 sm:p-10 lg:p-14 lg:border-r border-rule">
              <Eyebrow trail="Acceptance">Quote no. 0001</Eyebrow>
              <h2 className="mt-6 font-jakarta font-extrabold text-ink tracking-[-0.035em] leading-[1.05] text-[clamp(2rem,4vw,3.25rem)] text-balance">
                Get a quoting system built for{" "}
                <span className="mark-live">your business</span>
              </h2>
              <p className="mt-5 text-ink-soft text-lg leading-relaxed max-w-md text-pretty">
                The examples above are a fraction of what your system will do.
                Tell us about your trade and we&apos;ll build a quoting system
                that fits the way you actually price.
              </p>

              <dl className="mt-9 border-t border-rule">
                {INCLUDED.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline gap-3 py-2.5 border-b border-rule text-[15px]"
                  >
                    <dt className="font-medium text-ink">{k}</dt>
                    <span className="leader" aria-hidden />
                    <dd className="font-mono text-xs uppercase tracking-[0.1em] text-brand-blue">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 max-w-[240px]" aria-hidden>
                <svg viewBox="0 0 190 46" className="w-full h-12 overflow-visible" fill="none">
                  <path
                    pathLength={1}
                    style={{ "--sig-len": 1 } as React.CSSProperties}
                    className={`sig-path ${inView ? "is-drawn" : ""}`}
                    d="M6 34c8-14 16-26 22-26 5 0 1 14-3 24-2 6 6-10 14-12 5-1 2 8 6 8 5 0 8-10 14-10 4 0 2 9 7 9 6 0 9-16 16-22 4-3 3 10-1 20-2 5 8-9 15-9 5 0 3 8 9 8 9 0 22-6 40-12"
                    stroke="#1f61aa"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="border-t border-rule-strong pt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                  Your signature goes here
                </div>
              </div>
            </div>

            {/* The form */}
            <div className="p-7 sm:p-10 lg:p-14 bg-paper/60 flex flex-col justify-center">
              <h3 className="font-jakarta font-bold text-ink text-xl tracking-[-0.02em] mb-1.5">
                Tell us about your business
              </h3>
              <p className="text-sm text-ink-soft mb-6">
                We handle the setup. You start quoting.
              </p>
              <LeadCaptureForm source="landing_page_cta" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
