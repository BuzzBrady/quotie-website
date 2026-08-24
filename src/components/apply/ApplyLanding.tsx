import { Suspense } from "react";
import ApplyWordmark from "@/components/apply/ApplyWordmark";
import ApplyHero from "@/components/apply/ApplyHero";
import ApplyVsl from "@/components/apply/ApplyVsl";
import ApplyCta from "@/components/apply/ApplyCta";
import ApplyStickyCta from "@/components/apply/ApplyStickyCta";
import ApplyFaq from "@/components/apply/ApplyFaq";
import ApplyFooter from "@/components/apply/ApplyFooter";
import OptInQuotes from "@/components/opt-in/OptInQuotes";
import { APPLY_LANDER_FAQS } from "@/components/apply/applyFaqs";

function CtaFallback() {
  return (
    <div className="text-center">
      <a
        href="/apply/form"
        className="w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-4 text-[13px] sm:text-sm font-extrabold tracking-[0.06em] text-white uppercase shadow-lg shadow-brand-blue/20"
      >
        Apply Now
      </a>
      <p className="mt-3 text-[13px] text-slate-500">
        See if we should build it for you · 2 minutes
      </p>
    </div>
  );
}

export default function ApplyLanding() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white text-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(31,97,170,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 bg-gradient-to-r from-brand-blue to-brand-cyan">
        <p className="px-4 py-2.5 text-center text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-white">
          Former Full-Time Estimator Reveals
        </p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[680px] flex-1 flex-col px-5 pb-28 pt-8 sm:pb-10 sm:pt-12">
        <div className="mb-8">
          <ApplyWordmark />
        </div>

        <ApplyHero />

        <div className="mb-6">
          <ApplyVsl />
        </div>

        <div className="mb-10">
          <Suspense fallback={<CtaFallback />}>
            <ApplyCta />
          </Suspense>
        </div>

        <div className="mb-12">
          <OptInQuotes className="mb-0" />
        </div>

        <div className="mb-12">
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
