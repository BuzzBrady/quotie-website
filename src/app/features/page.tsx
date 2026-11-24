"use client";

import { useState } from "react";
import {
  FileText,
  Lightning,
  Stack,
  EnvelopeSimple,
  Bell,
  BellRinging,
  ChartBar,
  UsersThree,
  Briefcase,
  CalendarBlank,
  PlugsConnected,
  ArrowRight,
  Check,
  CaretDown,
  Signature,
  MapPin,
  PhoneCall,
  Tag,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { SignMock } from "@/components/sections/platform/AppMocks";

/* ═══════════════════════════════════════════════════════════════
   FEATURE DEEP-DIVE GRID — detailed cards, mixed sizes
   ═══════════════════════════════════════════════════════════════ */

const features = [
  {
    icon: FileText,
    title: "Smart Quote Forms",
    description: "Your team sees a simple form tailored to your trade — dropdowns, quantities, and fields that adapt based on what you select. Fill it in, hit generate, and the system handles the rest. We build everything during onboarding so your team never touches a spreadsheet.",
    color: "text-cyan-400",
    accent: "cyan",
    bullets: ["Tailored fields for your trade", "Automatic pricing & margin calculations", "Consistent quotes across your whole team"],
  },
  {
    icon: Lightning,
    title: "Instant PDF Generation",
    description: "Branded PDFs generated instantly from your custom-built company template. Cover pages, multiple options, totals, and custom fields — all automatic.",
    color: "text-blue-400",
    accent: "blue",
    bullets: ["Custom branded templates", "Automatic quote numbering", "Download or send directly"],
  },
  {
    icon: Stack,
    title: "Multi-Option Proposals",
    description: "Send up to 4 quotes at a time in one email. Each option is a full branded PDF — your client sees every option in one place.",
    color: "text-amber-400",
    accent: "amber",
    bullets: ["Send up to 4 quotes at a time", "Full PDF per option", "Bundle in one email"],
  },
  {
    icon: Tag,
    title: "Pricing Catalog",
    description: "Every product and price your quotes are built from, in one place. Change a price or add a product yourself, review the before and after, and publish. The next quote uses it. The pricing logic we built around those prices stays exactly as it was. Changes to that logic, to your form, or to quote wording are made by our team.",
    color: "text-indigo-400",
    accent: "indigo",
    bullets: ["Edit prices and add products yourself", "Draft, review the before and after, then publish", "Products still in use can be switched off, not deleted", "Logic and wording changes handled by the Quotie team"],
  },
  {
    icon: Signature,
    title: "Accept & Sign Online",
    description: "Every quote email can include a hosted, branded quote page. Clients view all options online, choose what works, and digitally sign right there — a signed certificate is stamped into the PDF. You know the moment a client opens or downloads the page. Decline-with-reason handling included.",
    color: "text-sky-400",
    accent: "sky",
    bullets: ["Hosted branded quote page per email", "Digital signature with certificate PDF", "View & download tracking on the hosted page", "Quote viewed / signed / declined automation triggers", "Decline-with-reason handling"],
  },
  {
    icon: EnvelopeSimple,
    title: "Email & Unified Inbox",
    description: "Send quotes from your own Gmail or Outlook. All client email lives in Quotie — threaded conversations, reply composer with CC/BCC and attachments. Not just quote replies — every message with that contact.",
    color: "text-rose-400",
    accent: "rose",
    bullets: ["Native Gmail & Outlook sending", "Full two-way inbox sync", "Threaded conversations per contact", "Reply composer with CC/BCC + attachments"],
  },
  {
    icon: Bell,
    title: "Follow-Up Dashboard",
    description: "Every outstanding quote ranked by urgency — overdue, due today, upcoming. Reschedule tracking with ordinal badges. Send history and notes on every job.",
    color: "text-violet-400",
    accent: "violet",
    bullets: ["Urgency sorting", "One-click reschedule", "Reschedule badges (1st, 2nd, 3rd)"],
  },
  {
    icon: PhoneCall,
    title: "Callback Leads",
    description: "Pre-quote lead pipeline. Add leads in Quotie or pipe them in from your web forms and lead tools by webhook. Track call attempts, set timed callback reminders with live countdown, and auto-graduate the lead to a full quote when ready.",
    color: "text-orange-400",
    accent: "orange",
    bullets: ["Manual entry or webhook ingestion", "Call attempt tracking", "Timed callback reminders with live countdown", "Auto-graduates to a quote"],
  },
  {
    icon: MapPin,
    title: "Site Visits & Road Days",
    description: "Plan road days from within Quotie. Add your booked site visits, drag-to-order your stops, get travel-time routing, and view booking summaries. One-click creates a quote directly from a visit.",
    color: "text-lime-400",
    accent: "lime",
    bullets: ["Add visits by address or import booked ones", "Drag-to-order stops", "Travel-time routing", "Booking summaries", "One-click create quote from a visit"],
  },
  {
    icon: ChartBar,
    title: "Pipeline, Analytics & Profit",
    description: "Quote status tracking, won revenue, conversion rates, and pipeline value. Profit tracking adds per-company profit formulas, margin trends, profit-by-rep, and per-deal breakdowns on the analytics dashboard.",
    color: "text-emerald-400",
    accent: "emerald",
    bullets: ["Status tracking: draft, sent, won, lost", "Revenue & conversion metrics", "Per-company profit formulas", "Margin trends & profit-by-rep"],
  },
  {
    icon: BellRinging,
    title: "Notifications",
    description: "Real-time notifications when quotes are sent, won, or need follow-up. Daily digest emails so nothing slips through the cracks.",
    color: "text-pink-400",
    accent: "pink",
    bullets: ["Real-time in-app alerts", "Daily digest emails", "Follow-up reminders"],
  },
];

const bottomFeatures = [
  {
    icon: UsersThree,
    title: "CRM & Contacts",
    description: "Quotie is your CRM. Full contact history, multi-address support, lead owner and lead source on every deal. No calling or texting built in, everything else is.",
    color: "text-purple-400",
    border: "border-purple-500/15",
  },
  {
    icon: Briefcase,
    title: "Job Handoff",
    description: "One-click quote-to-job conversion. Customisable pipeline, Playbooks with step-by-step checklists, task tracking, and job files from Drive or Dropbox.",
    color: "text-slate-300",
    border: "border-slate-500/15",
  },
  {
    icon: CalendarBlank,
    title: "Calendar & Scheduling",
    description: "Day, week, and month views with drag-and-drop rescheduling. Quotes, jobs, and site visits all in one calendar.",
    color: "text-blue-400",
    border: "border-blue-500/15",
  },
  {
    icon: PlugsConnected,
    title: "Automations v2",
    description: "Triggers on quote events (sent, viewed, signed, declined, won) and job events. Multi-trigger workflows, AND/OR conditions, wait steps, filter steps. Actions: email, notifications, webhooks.",
    color: "text-teal-400",
    border: "border-teal-500/15",
  },
];

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE FEATURE EXPLORER
   ═══════════════════════════════════════════════════════════════ */

const explorerFeatures = [
  {
    id: "template",
    label: "Quote Form",
    icon: FileText,
    color: "text-cyan-400",
    activeBg: "bg-cyan-500/10 border-cyan-500/25",
    content: {
      title: "How quoting works",
      steps: [
        { label: "We build your quote form", detail: "Dropdowns, smart fields, quantities — tailored to your trade" },
        { label: "We configure your pricing", detail: "Margins, labour rates, material costs — all pre-built into the form" },
        { label: "We set up your options", detail: "Create as many quotes as you need per job — send up to 4 at a time" },
        { label: "Your team fills in the form", detail: "Pick the products, enter the quantities, hit generate. The system does the maths." },
      ],
    },
  },
  {
    id: "send",
    label: "Quote → Client",
    icon: EnvelopeSimple,
    color: "text-rose-400",
    activeBg: "bg-rose-500/10 border-rose-500/25",
    content: {
      title: "How sending works",
      steps: [
        { label: "Generate PDFs", detail: "Branded proposals built from your custom company template" },
        { label: "Compose email", detail: "Pick a template — client name, totals, and details fill in automatically" },
        { label: "Send from your email", detail: "Gmail or Outlook — clients see your address" },
        { label: "Track replies", detail: "Client responses appear in Quotie automatically" },
      ],
    },
  },
  {
    id: "followup",
    label: "Follow-Up Flow",
    icon: Bell,
    color: "text-violet-400",
    activeBg: "bg-violet-500/10 border-violet-500/25",
    content: {
      title: "How follow-ups work",
      steps: [
        { label: "Quote sent", detail: "Follow-up date is set (default or custom)" },
        { label: "Dashboard surfaces it", detail: "Ranked by urgency — overdue first" },
        { label: "Take action", detail: "Reschedule, send follow-up, mark won or lost" },
        { label: "Track history", detail: "Every reschedule logged with ordinal badge" },
      ],
    },
  },
];

type Feature = (typeof features)[number];

/** One feature set as a line item: name | what it does | what's included. */
function FeatureRow({ f, dark = false }: { f: Feature; dark?: boolean }) {
  const Icon = f.icon;
  return (
    <div
      className={`grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)_minmax(0,1fr)] gap-x-10 gap-y-4 py-8 lg:py-10 border-b ${
        dark ? "border-deep-rule" : "border-rule"
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon
          weight="duotone"
          className={`w-6 h-6 shrink-0 mt-0.5 ${dark ? "text-brand-cyan" : "text-brand-blue"}`}
        />
        <h3
          className={`font-jakarta font-extrabold text-xl lg:text-[22px] tracking-[-0.025em] leading-tight ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {f.title}
        </h3>
      </div>
      <p className={`leading-relaxed text-pretty ${dark ? "text-white/65" : "text-ink-soft"}`}>
        {f.description}
      </p>
      {f.bullets && (
        <ul className="space-y-2">
          {f.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm">
              <Check
                weight="bold"
                className={`w-3.5 h-3.5 shrink-0 mt-1 ${dark ? "text-brand-cyan" : "text-brand-blue"}`}
              />
              <span className={dark ? "text-white/75" : "text-ink"}>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FeatureExplorer() {
  const [activeId, setActiveId] = useState("template");
  const active = explorerFeatures.find((f) => f.id === activeId)!;

  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeader
                badge="How It Works"
                title="Follow the quote from build to close."
              />
            </Reveal>

            {/* Tab bar */}
            <div className="flex flex-wrap gap-2 mt-8">
              {explorerFeatures.map((f) => {
                const Icon = f.icon;
                const isActive = f.id === activeId;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveId(f.id)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-semibold border whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? "bg-ink text-white border-ink"
                        : "bg-sheet text-ink-soft border-rule-strong hover:text-ink hover:border-ink"
                    }`}
                  >
                    <Icon weight="duotone" className="w-4 h-4" />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue pb-4">
                  {active.content.title}
                </h3>
                <ol className="border-t-2 border-ink">
                  {active.content.steps.map((step, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-6 border-b border-rule"
                    >
                      <span className="font-mono text-sm text-brand-blue pt-1">
                        0{i + 1}
                      </span>
                      <div>
                        <div className="font-jakarta font-bold text-ink text-lg tracking-[-0.02em] mb-1">
                          {step.label}
                        </div>
                        <div className="text-ink-soft leading-relaxed">{step.detail}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

const FORM_FIELDS = [
  { label: "Job Type", value: "Solar Install" },
  { label: "Panel System", value: "13kW — Tier 1" },
  { label: "Inverter", value: "10kW Hybrid" },
  { label: "Battery", value: "16kWh" },
];

export default function FeaturesPage() {
  const hero = features[0];
  const HeroIcon = hero.icon;
  const byTitle = (t: string) => features.find((f) => f.title === t)!;

  const create = [byTitle("Instant PDF Generation"), byTitle("Multi-Option Proposals"), byTitle("Pricing Catalog")];
  const sendSign = [byTitle("Accept & Sign Online"), byTitle("Email & Unified Inbox")];
  const followUp = [
    byTitle("Follow-Up Dashboard"),
    byTitle("Callback Leads"),
    byTitle("Site Visits & Road Days"),
    byTitle("Pipeline, Analytics & Profit"),
    byTitle("Notifications"),
  ];

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="pt-28 sm:pt-32 lg:pt-40 pb-16 lg:pb-24">
          <Eyebrow
            trail={`${features.length + bottomFeatures.length} line items`}
            className="mb-6 max-w-xl"
          >
            Platform Features
          </Eyebrow>
          <h1 className="font-jakarta font-extrabold text-ink tracking-[-0.04em] leading-[1.02] text-[clamp(2.4rem,5.4vw,4.5rem)] max-w-4xl text-balance">
            Every tool your quoting{" "}
            <span className="mark-live mark-live-anim">workflow needs.</span>
          </h1>
          <p className="mt-6 text-ink-soft max-w-xl text-lg leading-relaxed text-pretty">
            Templates, PDFs, sending, tracking, follow-ups, jobs — one platform, no gaps.
          </p>
        </Container>
      </section>

      {/* Create the quote */}
      <section className="bg-sheet border-y border-rule py-20 lg:py-28">
        <Container>
          <Eyebrow trail="01" className="mb-10">
            Create the quote
          </Eyebrow>

          {/* Lead feature — Smart Quote Forms */}
          <Reveal>
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-16 items-center pb-12 lg:pb-16 border-b-2 border-ink">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <HeroIcon weight="duotone" className="w-8 h-8 text-brand-blue shrink-0" />
                  <h3 className="font-jakarta font-extrabold text-ink text-3xl lg:text-[40px] tracking-[-0.035em] leading-tight">
                    {hero.title}
                  </h3>
                </div>
                <p className="text-ink-soft text-lg leading-relaxed max-w-xl text-pretty">
                  {hero.description}
                </p>
                <ul className="mt-7 border-t border-rule max-w-xl">
                  {hero.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 py-2.5 border-b border-rule text-[15px] text-ink"
                    >
                      <Check weight="bold" className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-1.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mock form UI — the app side wears the deep navy */}
              <div
                className="rounded-xl bg-deep border border-deep-rule shadow-[0_30px_60px_-30px_rgba(8,17,32,0.7)] p-5 sm:p-7"
                aria-hidden
              >
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-brand-cyan mb-5">
                  New quote
                </div>
                <div className="space-y-3.5">
                  {FORM_FIELDS.map((field) => (
                    <div key={field.label}>
                      <div className="text-xs font-medium text-white/60 mb-1.5">{field.label}</div>
                      <div className="flex items-center justify-between rounded-md border border-brand-cyan/50 bg-brand-cyan/10 px-3 py-2.5 text-[13px] font-medium text-white">
                        {field.value}
                        <CaretDown weight="bold" className="w-3 h-3 text-white/40" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-5 text-center text-[11px]">
                  <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-2.5 font-medium text-white/55">
                    Save as Template
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-2.5 font-medium text-white/55">
                    Save as Draft
                  </div>
                  <div className="rounded-md bg-brand-blue px-2 py-2.5 font-semibold text-white">
                    Create Quote
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {create.map((f) => (
            <Reveal key={f.title}>
              <FeatureRow f={f} />
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Send it, get it signed */}
      <section className="bg-deep text-white py-20 lg:py-28 overflow-hidden">
        <Container>
          <Eyebrow dark trail="02" className="mb-10">
            Send it, get it signed
          </Eyebrow>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
            <div className="border-t border-deep-rule">
              {sendSign.map((f) => {
                const Icon = f.icon;
                return (
                  <Reveal key={f.title}>
                    <div className="py-8 border-b border-deep-rule">
                      <div className="flex items-start gap-3 mb-3">
                        <Icon weight="duotone" className="w-6 h-6 shrink-0 mt-0.5 text-brand-cyan" />
                        <h3 className="font-jakarta font-extrabold text-white text-xl lg:text-[22px] tracking-[-0.025em] leading-tight">
                          {f.title}
                        </h3>
                      </div>
                      <p className="text-white/65 leading-relaxed text-pretty">{f.description}</p>
                      <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                        {f.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-white/75">
                            <Check weight="bold" className="w-3.5 h-3.5 shrink-0 mt-1 text-brand-cyan" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <div aria-hidden>
                <SignMock />
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                Real Quotie screen, sample data
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Follow up and win */}
      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <Eyebrow trail="03" className="mb-2">
            Follow up and win
          </Eyebrow>
          <div className="border-t-2 border-ink mt-8">
            {followUp.map((f) => (
              <Reveal key={f.title}>
                <FeatureRow f={f} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Run the job — CRM, jobs, calendar, integrations & automations */}
      <section id="integrations" className="bg-sheet border-y border-rule py-20 lg:py-28 scroll-mt-16">
        <Container>
          <Eyebrow trail="04" className="mb-10">
            Run the job
          </Eyebrow>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 border-t-2 border-ink pt-10">
            {bottomFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.06}>
                  <Icon weight="duotone" className="w-7 h-7 text-brand-blue mb-4" />
                  <h3 className="font-jakarta font-extrabold text-ink text-lg tracking-[-0.02em] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-ink-soft text-[15px] leading-relaxed text-pretty">
                    {f.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Interactive explorer */}
      <FeatureExplorer />

      {/* Bottom CTA */}
      <section className="bg-deep py-20 lg:py-28">
        <Container>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 lg:gap-16 items-end">
            <div>
              <h2 className="font-jakarta font-extrabold text-white tracking-[-0.035em] leading-[1.05] text-[clamp(2rem,4.2vw,3.5rem)]">
                See it for yourself.
              </h2>
              <p className="mt-5 text-white/65 text-lg max-w-md leading-relaxed">
                Book a free demo and we&apos;ll walk you through Quotie — personalised for your trade.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="/demo" variant="light" size="lg">
                Schedule a Demo
                <ArrowRight weight="bold" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost-dark" size="lg">
                View Pricing
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
