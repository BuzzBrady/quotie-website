"use client";

import { Suspense } from "react";
import { inter } from "@/lib/fonts";
import { Star } from "@phosphor-icons/react";
import ApplyHero from "@/components/apply/ApplyHero";
import ApplyVsl from "@/components/apply/ApplyVsl";
import ApplyCta from "@/components/apply/ApplyCta";
import ApplyStickyCta from "@/components/apply/ApplyStickyCta";
import ApplyFaq from "@/components/apply/ApplyFaq";
import ApplyFooter from "@/components/apply/ApplyFooter";
import { APPLY_LANDER_FAQS } from "@/components/apply/applyFaqs";

function CtaFallback() {
  return (
    <div className="text-center">
      <a
        href="/apply/form"
        className="optin-cta w-full inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-5 text-[15px] font-semibold uppercase tracking-[0.06em] leading-none text-white"
      >
        Apply Now
      </a>
    </div>
  );
}

export default function ApplyLanding() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F9] text-slate-900">
      <div
        className="relative z-20 bg-white"
        style={{ boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 8px rgba(15, 23, 42, 0.04)" }}
      >
        <div className="flex items-center justify-center px-4 py-3">
          <span className="font-[family-name:var(--font-jakarta)] text-xl sm:text-2xl font-bold uppercase tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            Quotie
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[560px] flex-1 flex-col px-5 pb-28 pt-8 sm:pb-10 sm:pt-12">
        <ApplyHero />

        <div className="mb-6">
          <ApplyVsl />
        </div>

        <div className="mb-3">
          <Suspense fallback={<CtaFallback />}>
            <ApplyCta />
          </Suspense>
        </div>

        <p
          className={`${inter.className} mb-10 flex items-center justify-center gap-2 text-[15px] text-slate-500`}
          style={{ fontWeight: 400, lineHeight: 1.4 }}
        >
          <span className="inline-flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} weight="fill" className="h-4 w-4 text-amber-400" />
            ))}
          </span>
          5 stars from 12 reviews
        </p>

        <div className="mb-10">
          <ApplyFaq items={APPLY_LANDER_FAQS} heading="Questions before you apply" />
        </div>

        <div className="mb-10">
          <Suspense fallback={<CtaFallback />}>
            <ApplyCta />
          </Suspense>
        </div>

        <ApplyFooter />
      </div>

      <Suspense>
        <ApplyStickyCta />
      </Suspense>
    </div>
  );
}
