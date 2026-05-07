"use client";

import { useState } from "react";
import {
  Check,
  X,
  ArrowRight,
  Shield,
  Zap,
  Building2,
  HelpCircle,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLeadModal } from "@/components/lead-capture/LeadModalProvider";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "Perfect for sole traders getting their quoting organised.",
    cta: "Get Started",
    popular: false,
    features: [
      "50 quotes per month",
      "Basic quote templates",
      "Email sending",
      "PDF generation",
      "1 user",
      "Contact management",
      "Email support",
    ],
    notIncluded: [
      "Custom branding",
      "Live Pulse tracking",
      "GoHighLevel integration",
      "Smart follow-ups",
      "Multi-option proposals",
      "Priority support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    icon: Shield,
    monthlyPrice: 79,
    yearlyPrice: 66,
    description: "For growing trades businesses that want to close more work.",
    cta: "Start Free Trial",
    popular: true,
    features: [
      "Unlimited quotes",
      "Custom branding & logo",
      "Live Pulse open tracking",
      "GoHighLevel integration",
      "Smart follow-up dashboard",
      "Multi-option proposals",
      "5 users",
      "Priority support",
      "PDF generation",
      "ServiceM8 integration",
      "Advanced analytics",
      "Calendar & scheduling",
    ],
    notIncluded: [
      "Unlimited users",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "API access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    monthlyPrice: null,
    yearlyPrice: null,
    description:
      "For larger organisations with custom requirements and compliance needs.",
    cta: "Talk to Sales",
    popular: false,
    features: [
      "Everything in Professional",
      "Unlimited users",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "API access",
      "Custom onboarding",
      "SSO / SAML",
      "Custom contract",
      "Volume discounts",
    ],
    notIncluded: [],
  },
];

const faqs = [
  {
    q: "Can I change plans at any time?",
    a: "Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the end of your current billing period.",
  },
  {
    q: "Is there a free trial?",
    a: "Professional comes with a 14-day free trial — no credit card required. Starter has a 7-day trial.",
  },
  {
    q: "What counts as a quote?",
    a: "Any quote generated and saved within Quotie. Drafts that are deleted before sending don't count against your limit.",
  },
  {
    q: "Do you offer discounts for yearly billing?",
    a: "Yes — switching to annual billing gives you two months free (roughly 17% off the monthly rate).",
  },
  {
    q: "Is my data safe?",
    a: "All data is encrypted at rest and in transit. We use Australian data centres where possible and comply with the Australian Privacy Act.",
  },
  {
    q: "What integrations are included?",
    a: "GoHighLevel and ServiceM8 integrations are included on Professional and above. Google Drive and Dropbox are available on all plans.",
  },
];

export default function PricingClient() {
  const [yearly, setYearly] = useState(false);
  const { openLeadModal } = useLeadModal();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-50">
        <Container className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-600 shadow-sm mb-6">
            Simple, transparent pricing
          </div>
          <h1
            className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-slate-900 mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
            }}
          >
            Pay for what you need.
            <br />
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Scale as you grow.
            </span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-lg leading-relaxed mb-10">
            All plans include a free trial. No credit card required to get
            started.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                !yearly
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                yearly
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                Save 17%
              </span>
            </button>
          </div>
        </Container>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const price = yearly ? tier.yearlyPrice : tier.monthlyPrice;
              return (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl overflow-hidden ${
                    tier.popular
                      ? "ring-2 ring-brand-blue shadow-2xl shadow-brand-blue/10 bg-white"
                      : "border border-slate-200 bg-white shadow-sm"
                  }`}
                >
                  {tier.popular && (
                    <div className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-bold text-center py-2 tracking-wider uppercase">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tier.popular
                            ? "bg-gradient-to-br from-brand-blue to-brand-cyan"
                            : "bg-slate-100"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            tier.popular ? "text-white" : "text-slate-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-jakarta)]">
                        {tier.name}
                      </h3>
                    </div>

                    <div className="mb-4">
                      {price !== null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
                            ${price}
                          </span>
                          <span className="text-slate-500 text-sm">/mo</span>
                          {yearly && (
                            <span className="text-xs text-slate-400 ml-1">
                              billed annually
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
                          Custom
                        </div>
                      )}
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <button
                      onClick={() => openLeadModal(`pricing_${tier.id}`)}
                      className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 mb-8 ${
                        tier.popular
                          ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/20"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {tier.cta}
                    </button>

                    <ul className="space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{f}</span>
                        </li>
                      ))}
                      {tier.notIncluded.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm opacity-40"
                        >
                          <X className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-500">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Money-back badge */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-800">
              <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>30-day money-back guarantee.</strong> Not happy?
                We&apos;ll refund you, no questions asked.
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-slate-100">
        <Container>
          <SectionHeader
            badge="Pricing FAQ"
            badgeIcon={<HelpCircle className="w-4 h-4" />}
            title="Common questions"
            gradient="questions"
            subtitle="Everything you need to know about plans and billing."
            dark={false}
            className="mb-14"
          />
          <div className="max-w-3xl mx-auto grid gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-24" style={{ background: "#08080c" }}>
        <Container className="text-center">
          <SectionHeader
            title="Still not sure which plan?"
            gradient="which plan?"
            subtitle="Book a free 20-minute demo and we'll recommend the right plan for your business."
            dark
            className="mb-10"
          />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-sm font-bold text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300"
            >
              Schedule a Demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.1] text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              Talk to Sales
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
