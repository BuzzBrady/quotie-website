"use client";

import {
  Check,
  ArrowRight,
  ShieldCheck,
  Lightning,
  UsersThree,
  Buildings,
  Question,
} from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLeadModal } from "@/components/lead-capture/LeadModalProvider";

const tiers = [
  {
    id: "solo",
    name: "1 Man Band",
    icon: Lightning,
    setup: 3000,
    monthly: 300,
    description: "Everything you need to start quoting professionally as a sole trader.",
    cta: "Get Started",
    popular: false,
    features: [
      "Custom-built quote form & pricing",
      "Instant branded PDF generation",
      "Multi-option proposals",
      "Email sending (Gmail / Outlook)",
      "Follow-up dashboard",
      "Contact management",
      "Pipeline tracking",
      "1 user",
    ],
  },
  {
    id: "team",
    name: "Small Team",
    icon: UsersThree,
    setup: 5000,
    monthly: 650,
    description: "For growing businesses with a team that needs to quote consistently.",
    cta: "Get Started",
    popular: true,
    features: [
      "Everything in 1 Man Band",
      "2–5 users",
      "Custom branding & cover pages",
      "GoHighLevel integration",
      "ServiceM8 integration",
      "Automation workflows",
      "Job handoff & SOPs",
      "Calendar & scheduling",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "6+ Users",
    icon: Buildings,
    setup: null,
    monthly: null,
    description: "For larger teams with custom requirements. Let's talk about what you need.",
    cta: "Contact Us",
    popular: false,
    features: [
      "Everything in Small Team",
      "Unlimited users",
      "Custom onboarding & training",
      "Dedicated account manager",
      "Custom quote form builds",
      "Volume pricing",
    ],
  },
];

const faqs = [
  {
    q: "What's included in the setup fee?",
    a: "Everything. We reverse-engineer how your business quotes — your pricing logic, materials, labour rates, margin rules, upsells, optional extras, the lot. From there we build your custom quote form with conditional fields, dropdown dependencies, and automatic calculations so the numbers are right every time. Then we design your branded PDF template from scratch — cover page, scope of works, terms, imagery, page layout — matched to your brand. We configure your email templates, set up your pipeline stages, connect any integrations (GoHighLevel, ServiceM8), and train your team until they're confident. Most setups go through multiple revision rounds before we lock it in.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most businesses are quoting within the first week. We work with you to understand your pricing, build your quote form, and refine it until it's dialled in. Expect a few rounds of tweaks as we nail down exactly how your business quotes.",
  },
  {
    q: "Can I add more users later?",
    a: "Yes. If you start as a sole trader and grow, we'll move you to the team plan. If your team grows past 5, we'll work out custom pricing that fits.",
  },
  {
    q: "Is GST included in the pricing?",
    a: "No — all prices shown are exclusive of GST. GST is added on top at 10%.",
  },
  {
    q: "Is my data safe?",
    a: "All data is encrypted at rest and in transit. Each business's data is completely isolated — your data is only visible to your team, no exceptions.",
  },
  {
    q: "What integrations are included?",
    a: "GoHighLevel and ServiceM8 integrations are included on the Small Team plan and above. Email sending via Gmail or Outlook is available on all plans.",
  },
];

export default function PricingClient() {
  const { openLeadModal } = useLeadModal();

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-slate-50">
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
            Setup once.{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Quote forever.
            </span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-lg leading-relaxed mb-4">
            One-time setup fee to get your templates built and your team trained,
            then a flat monthly rate. No per-quote fees. No surprises.
          </p>
          <p className="text-slate-400 text-sm">All prices in AUD + GST</p>
        </Container>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {tiers.map((tier) => {
              const Icon = tier.icon;
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
                          weight="duotone"
                          className={`w-5 h-5 ${
                            tier.popular ? "text-white" : "text-slate-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-jakarta)]">
                        {tier.name}
                      </h3>
                    </div>

                    <div className="mb-6">
                      {tier.setup !== null ? (
                        <div>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
                              ${tier.setup.toLocaleString()}
                            </span>
                            <span className="text-slate-500 text-sm">AUD setup</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-slate-700">
                              + ${tier.monthly}/mo
                            </span>
                            <span className="text-slate-400 text-xs">AUD</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
                          Let&apos;s Talk
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
                          <Check weight="duotone" className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{f}</span>
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
              <ShieldCheck weight="duotone" className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Hands-on onboarding included.</strong> We build your
                templates, train your team, and make sure you&apos;re confident
                before going live.
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
            badgeIcon={<Question weight="duotone" className="w-4 h-4" />}
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
                <p className="text-slate-500 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-24" style={{ background: "#08080c" }}>
        <Container className="text-center">
          <SectionHeader
            title="Not sure which plan fits?"
            gradient="which plan fits?"
            subtitle="Book a free 20-minute demo and we'll recommend the right setup for your business."
            dark
            className="mb-10"
          />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-sm font-bold text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300"
            >
              Schedule a Demo
              <ArrowRight weight="duotone" className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.1] text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
