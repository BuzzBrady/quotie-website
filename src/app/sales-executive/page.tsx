"use client";

import Image from "next/image";
import {
  Phone,
  UserCirclePlus,
  CalendarCheck,
  ChatCircleDots,
  ChartLineUp,
  Handshake,
  ClockCounterClockwise,
  ArrowRight,
  CheckCircle,
  Users,
} from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import LeadCaptureForm from "@/components/lead-capture/LeadCaptureForm";

const whatTheyDo = [
  {
    icon: Phone,
    title: "Call every lead",
    description:
      "Inbound enquiries get a call within minutes, not hours. Your sales exec works the phone so no lead goes cold.",
  },
  {
    icon: ChatCircleDots,
    title: "Pre-quote follow-up",
    description:
      "Qualify the lead, gather the details you need, answer initial questions, and make sure the job is worth quoting before you spend time on it.",
  },
  {
    icon: CalendarCheck,
    title: "Book site visits",
    description:
      "Schedule site visits directly into your calendar. The lead is warm, the appointment is set, you just show up.",
  },
  {
    icon: ChartLineUp,
    title: "Send quotes & proposals",
    description:
      "Using Quotie, your sales exec generates and sends professional multi-option proposals on your behalf. Branded, accurate, fast.",
  },
  {
    icon: ClockCounterClockwise,
    title: "Post-quote follow-up",
    description:
      "Chase every outstanding quote systematically. No lead slips through. Your sales exec follows up until the client says yes or no.",
  },
  {
    icon: Handshake,
    title: "Close the deal",
    description:
      "Get the verbal confirmation. Your sales exec handles objections, answers questions, and gets the client over the line. You just do the work.",
  },
];

const benefits = [
  "No recruiting, no hiring, no training from scratch",
  "Trained on Quotie — they hit the ground running",
  "Your leads get called back in minutes, not days",
  "Every quote gets followed up, every time",
  "Free up your time to be on tools, not on the phone",
  "Scale your sales without scaling your payroll",
  "Full visibility — see every call, quote, and follow-up in Quotie",
  "Backed by Tradie Web Guys, specialists in trades marketing",
];

const howItWorks = [
  {
    step: "01",
    title: "We learn your business",
    description:
      "Your pricing, your services, your ideal customer. We build your Quotie system and train your sales exec on exactly how you operate.",
  },
  {
    step: "02",
    title: "They start working your leads",
    description:
      "Every inbound enquiry gets called, qualified, and progressed. Site visits booked, quotes sent, follow-ups handled.",
  },
  {
    step: "03",
    title: "You focus on the work",
    description:
      "Touch base with your sales exec, answer their questions when needed, and watch the pipeline fill up. They sell, you deliver.",
  },
];

export default function SalesExecutivePage() {
  return (
    <div style={{ background: "#08080c" }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-blue/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
        </div>

        <Container className="relative z-10 py-16 sm:py-24 lg:py-32">
          {/* Quotie × TWG hero banner */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-14">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Quotie"
                width={52}
                height={52}
                className="w-[52px] h-[52px]"
              />
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-jakarta)]">
                Quotie
              </span>
            </div>
            <span className="text-2xl sm:text-3xl text-white/15 font-extralight">×</span>
            <Image
              src="/twg-logo.png"
              alt="Tradie Web Guys"
              width={260}
              height={34}
              className="w-auto h-8 sm:h-10"
            />
          </div>

          <div className="max-w-3xl">
            <h1
              className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
              }}
            >
              A sales team{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-brand-cyan bg-clip-text text-transparent">
                without the hire.
              </span>
            </h1>

            <p
              className="text-white/45 max-w-xl mb-10"
              style={{
                fontSize: "clamp(15px, 1.2vw, 19px)",
                lineHeight: 1.7,
              }}
            >
              Get a dedicated, Quotie-trained sales executive embedded in your
              business. They call your leads, send your quotes, follow up
              relentlessly, and close the deal. You stay on tools.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] text-[15px] font-semibold transition-all duration-300 bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              >
                Enquire Now
                <ArrowRight weight="bold" className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="text-[15px] transition-colors duration-300 text-white/35 hover:text-white/60"
              >
                How it works →
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* The problem */}
      <section className="border-t border-white/[0.05]">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2
              className="font-[family-name:var(--font-jakarta)] font-extrabold text-white mb-4"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              You didn&apos;t start a business to sit on the phone all day.
            </h2>
            <p className="text-white/35 text-[15px] leading-relaxed">
              Most trades business owners are stuck doing sales, quoting,
              follow-ups, and admin on top of the actual work. Leads go cold.
              Quotes don&apos;t get chased. Jobs slip through the cracks. Not
              because you don&apos;t care, but because there aren&apos;t enough
              hours in the day.
            </p>
          </div>
        </Container>
      </section>

      {/* What they do */}
      <section className="border-t border-white/[0.05]">
        <Container className="py-16 sm:py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">
              What your sales exec does
            </div>
            <h2
              className="font-[family-name:var(--font-jakarta)] font-extrabold text-white"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Everything between the lead and the{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-brand-cyan bg-clip-text text-transparent">
                handshake.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatTheyDo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-emerald-500/15 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center mb-4">
                    <Icon
                      weight="duotone"
                      className="w-5 h-5 text-emerald-400"
                    />
                  </div>
                  <h3 className="text-[15px] font-bold text-white mb-2 font-[family-name:var(--font-jakarta)]">
                    {item.title}
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-white/[0.05]"
      >
        <Container className="py-16 sm:py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">
              How it works
            </div>
            <h2
              className="font-[family-name:var(--font-jakarta)] font-extrabold text-white"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Up and running in days, not months.
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-0">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm font-bold text-emerald-400 font-[family-name:var(--font-jakarta)]">
                    {item.step}
                  </div>
                  {i < howItWorks.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-emerald-500/20 to-transparent min-h-[48px]" />
                  )}
                </div>
                <div className="pb-12">
                  <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-jakarta)]">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-t border-white/[0.05]">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">
                Why it works
              </div>
              <h2
                className="font-[family-name:var(--font-jakarta)] font-extrabold text-white mb-4"
                style={{
                  fontSize: "clamp(24px, 3vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                All the upside.{" "}
                <span className="text-white/30">None of the overhead.</span>
              </h2>
              <p className="text-white/35 text-[15px] leading-relaxed">
                Hiring a full-time salesperson means recruiting, training,
                salary, super, and hoping they work out. This is a trained
                professional, ready to go, with the tools already built.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <CheckCircle
                    weight="duotone"
                    className="w-5 h-5 text-emerald-400/70 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-white/50 text-sm leading-relaxed">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Powered by */}
      <section className="border-t border-white/[0.05]">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="font-[family-name:var(--font-jakarta)] font-extrabold text-white mb-4"
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Powered by{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                Quotie
              </span>
              . Delivered by{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Tradie Web Guys
              </span>
              .
            </h2>
            <p className="text-white/35 text-[15px] leading-relaxed mt-4 max-w-lg mx-auto">
              Quotie handles the quoting engine — smart forms, branded PDFs,
              pipeline tracking, and follow-up automation. Tradie Web Guys
              provides the trained sales executive who uses it all, every day, to
              win you work.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="rounded-xl border border-brand-cyan/15 bg-brand-cyan/5 p-5 text-center">
                <div className="text-sm font-bold text-white mb-1 font-[family-name:var(--font-jakarta)]">
                  Quotie
                </div>
                <p className="text-white/30 text-xs leading-relaxed">
                  Quoting platform, pricing engine, PDF generation, pipeline,
                  CRM, follow-ups
                </p>
              </div>
              <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-5 text-center flex flex-col items-center">
                <Image
                  src="/twg-logo.png"
                  alt="Tradie Web Guys"
                  width={150}
                  height={20}
                  className="mb-3 opacity-80"
                />
                <p className="text-white/30 text-xs leading-relaxed">
                  Trained sales executive, lead handling, quoting, follow-ups,
                  closing
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing teaser */}
      <section className="border-t border-white/[0.05]">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">
              Pricing
            </div>
            <h2
              className="font-[family-name:var(--font-jakarta)] font-extrabold text-white mb-4"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Monthly retainer + performance commission
            </h2>
            <p className="text-white/35 text-[15px] leading-relaxed max-w-lg mx-auto mb-4">
              You pay a monthly retainer for the sales exec, plus a commission on
              closed deals. Quotie is bundled into the program at a different
              rate to our standard plans.
            </p>
            <p className="text-white/25 text-sm">
              Pricing is tailored to your business size and volume. Get in touch
              below and we&apos;ll put together a proposal.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="enquire" className="border-t border-white/[0.05]">
        <Container className="py-16 sm:py-24">
          <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.25), transparent 60%)",
                }}
              />
            </div>

            <div className="relative z-10 px-6 sm:px-12 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-[family-name:var(--font-jakarta)]">
                  Ready to stop chasing leads yourself?
                </h2>
                <p className="text-white/40 text-lg leading-relaxed">
                  Tell us about your business and we&apos;ll put together a
                  sales executive proposal tailored to your trade, your volume,
                  and your goals.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
                <LeadCaptureForm
                  source="sales_executive_page"
                  compact
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
