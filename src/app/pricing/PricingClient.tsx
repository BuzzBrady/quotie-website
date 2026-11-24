"use client";

import {
  Check,
  ArrowRight,
  ShieldCheck,
  Lightning,
  UsersThree,
  Buildings,
} from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { useLeadModal } from "@/components/lead-capture/LeadModalProvider";

const tiers = [
  {
    id: "solo",
    name: "1 Man Band",
    icon: Lightning,
    setup: 5880,
    monthly: 495,
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
    setup: 6840,
    monthly: 750,
    description: "For growing businesses with a team that needs to quote consistently.",
    cta: "Get Started",
    popular: true,
    features: [
      "Everything in 1 Man Band",
      "2–5 users",
      "Custom branding & cover pages",
      "Integrations (ServiceM8, GoHighLevel)",
      "Automation workflows",
      "Job handoff & Playbooks",
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
    a: "Yes — all prices shown include GST. What you see is what you pay.",
  },
  {
    q: "Is my data safe?",
    a: "All data is encrypted at rest and in transit. Each business's data is completely isolated — your data is only visible to your team, no exceptions.",
  },
  {
    q: "What integrations are included?",
    a: "ServiceM8 and GoHighLevel integrations are included on the Small Team plan and above. Email sending via Gmail or Outlook is available on all plans.",
  },
];

export default function PricingClient() {
  const { openLeadModal } = useLeadModal();

  return (
    <>
      {/* Hero */}
      <section className="bg-paper">
        <Container className="pt-28 sm:pt-32 lg:pt-40 pb-12 lg:pb-16">
          <Eyebrow trail="All prices in AUD incl. GST" className="mb-6 max-w-xl">
            Simple, transparent pricing
          </Eyebrow>
          <h1 className="font-jakarta font-extrabold text-ink tracking-[-0.04em] leading-[1.02] text-[clamp(2.4rem,5.4vw,4.5rem)] text-balance">
            Setup once.{" "}
            <span className="mark-live mark-live-anim">Quote forever.</span>
          </h1>
          <p className="mt-6 text-ink-soft max-w-xl text-lg leading-relaxed text-pretty">
            One-time setup fee to get your templates built and your team trained,
            then a flat monthly rate. No per-quote fees. No surprises.
          </p>
        </Container>
      </section>

      {/* Pricing — set as a multi-option proposal, the way Quotie sends them */}
      <section className="bg-paper pb-20 lg:pb-28">
        <Container>
          <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint border-t-2 border-ink pt-4 mb-6">
            <span className="text-ink">Proposal</span>
            <span className="leader" aria-hidden />
            <span>{tiers.length} options</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <Reveal key={tier.id} delay={i * 0.07} className="h-full">
                  <div
                    className={`sheet rounded-lg overflow-hidden h-full flex flex-col ${
                      tier.popular ? "!border-ink ring-1 ring-ink" : ""
                    }`}
                  >
                    <div
                      className={`px-6 sm:px-7 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] flex items-center justify-between ${
                        tier.popular
                          ? "bg-ink text-white"
                          : "border-b border-rule text-ink-faint"
                      }`}
                    >
                      <span>Option {i + 1}</span>
                      {tier.popular && <span className="text-brand-cyan">Most Popular</span>}
                    </div>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon weight="duotone" className="w-6 h-6 text-brand-blue shrink-0" />
                        <h3 className="font-jakarta font-extrabold text-ink text-2xl tracking-[-0.03em]">
                          {tier.name}
                        </h3>
                      </div>
                      <p className="text-ink-soft text-[15px] leading-relaxed mb-6 text-pretty">
                        {tier.description}
                      </p>

                      {/* Figures */}
                      <div className="border-t-2 border-ink mb-6">
                        {tier.setup !== null ? (
                          <>
                            <div className="flex items-baseline gap-2.5 py-3 border-b border-rule">
                              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                                One-time setup
                              </span>
                              <span className="leader" aria-hidden />
                              <span className="tnum font-jakarta font-extrabold text-ink text-[34px] leading-none tracking-[-0.03em]">
                                ${tier.setup.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-baseline gap-2.5 py-3 border-b border-rule">
                              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                                Monthly
                              </span>
                              <span className="leader" aria-hidden />
                              <span className="tnum font-jakarta font-bold text-ink text-xl tracking-[-0.02em]">
                                + ${tier.monthly}/mo
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="py-3 border-b border-rule font-jakarta font-extrabold text-ink text-[34px] leading-none tracking-[-0.03em] min-h-[calc(34px+1.5rem+1px)] md:min-h-[111px] flex items-center">
                            Let&apos;s Talk
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => openLeadModal(`pricing_${tier.id}`)}
                        className={buttonClass(
                          tier.popular ? "brand" : "ink",
                          "lg",
                          "w-full mb-7",
                        )}
                      >
                        {tier.cta}
                        <ArrowRight weight="bold" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>

                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1">
                        Scope
                      </div>
                      <ul className="border-t border-rule">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 py-2.5 border-b border-rule text-sm text-ink"
                          >
                            <Check weight="bold" className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-1" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Onboarding note */}
          <div className="mt-10 flex items-start gap-3 border-y border-rule py-5 text-[15px] text-ink-soft">
            <ShieldCheck weight="duotone" className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-ink">Hands-on onboarding included.</strong>{" "}
              We build your
              templates, train your team, and make sure you&apos;re confident
              before going live.
            </span>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-sheet border-y border-rule py-20 lg:py-28">
        <Container>
          <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                badge="Pricing FAQ"
                title="Common questions"
                gradient="questions"
                subtitle="Everything you need to know about plans and billing."
              />
            </div>
            <div className="border-t-2 border-ink">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-6 border-b border-rule">
                  <h3 className="font-jakarta font-bold text-ink text-[17px] tracking-[-0.01em] mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-ink-soft leading-relaxed text-pretty">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-deep py-20 lg:py-28">
        <Container>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 lg:gap-16 items-end">
            <SectionHeader
              title="Not sure which plan fits?"
              gradient="which plan fits?"
              subtitle="Book a free 20-minute demo and we'll recommend the right setup for your business."
              dark
            />
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="/demo" variant="light" size="lg">
                Schedule a Demo
                <ArrowRight weight="bold" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost-dark" size="lg">
                Get in Touch
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
