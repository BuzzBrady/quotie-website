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
  CaretRight,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { useLeadModal } from "@/components/lead-capture/LeadModalProvider";

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
    icon: EnvelopeSimple,
    title: "Email Sending & Reply Tracking",
    description: "Send quotes directly from your own Gmail or Outlook account. Email templates auto-fill client names, quote totals, and more. Client replies are tracked and appear in Quotie automatically.",
    color: "text-rose-400",
    accent: "rose",
    bullets: ["Native Gmail & Outlook sending", "Auto-filled email templates", "Reply tracking in-app", "CC/BCC support"],
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
    icon: ChartBar,
    title: "Pipeline & Analytics",
    description: "Quote status tracking, won revenue, conversion rates, and pipeline value. Filter by date range, status, and user.",
    color: "text-emerald-400",
    accent: "emerald",
    bullets: ["Status tracking: draft, sent, won, lost", "Revenue & conversion metrics", "Date and user filters"],
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
    description: "Full contact history, multi-address support, GoHighLevel two-way sync. Import from GHL or add manually.",
    color: "text-purple-400",
    border: "border-purple-500/15",
  },
  {
    icon: Briefcase,
    title: "Job Handoff",
    description: "One-click quote-to-job conversion. Customisable pipeline, SOPs with step-by-step checklists, ServiceM8 integration.",
    color: "text-slate-300",
    border: "border-slate-500/15",
  },
  {
    icon: CalendarBlank,
    title: "Calendar & Scheduling",
    description: "Day, week, and month views with drag-and-drop rescheduling. Link events to quotes and contacts.",
    color: "text-blue-400",
    border: "border-blue-500/15",
  },
  {
    icon: PlugsConnected,
    title: "Automations & Integrations",
    description: "GoHighLevel and ServiceM8 integrations built in. Automate actions when quotes are sent, won, or lost.",
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

function FeatureExplorer() {
  const [activeId, setActiveId] = useState("template");
  const active = explorerFeatures.find((f) => f.id === activeId)!;

  return (
    <section className="border-t border-white/[0.04]">
      <Container className="py-14 lg:py-32">
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/40 text-xs font-semibold mb-6">
            How It Works
          </div>
          <h2
            className="font-[family-name:var(--font-jakarta)] font-extrabold text-white"
            style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
          >
            Follow the quote from build to close.
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {explorerFeatures.map((f) => {
            const Icon = f.icon;
            const isActive = f.id === activeId;
            return (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? `${f.activeBg} text-white`
                    : "border-transparent text-white/35 hover:text-white/60 hover:bg-white/[0.03]"
                }`}
              >
                <Icon weight="duotone" className={`w-4 h-4 ${isActive ? f.color : ""}`} />
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-bold text-white mb-8 text-center font-[family-name:var(--font-jakarta)]">
                {active.content.title}
              </h3>
              <div className="space-y-0">
                {active.content.steps.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-xs font-bold text-white/50">
                        {i + 1}
                      </div>
                      {i < active.content.steps.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent min-h-[32px]" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-white font-semibold text-sm mb-1">{step.label}</div>
                      <div className="text-white/35 text-sm">{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function FeaturesPage() {
  return (
    <div style={{ background: "#08080c" }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-blue/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[100px]" />
        </div>
        <Container className="relative z-10 py-16 sm:py-24 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm font-semibold text-white/40 mb-6">
            Platform Features
          </div>
          <h1
            className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-5 max-w-3xl mx-auto"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            Every tool your quoting{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              workflow needs.
            </span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
            Templates, PDFs, sending, tracking, follow-ups, jobs — one platform, no gaps.
          </p>
        </Container>
      </section>

      {/* Main feature grid */}
      <section className="border-t border-white/[0.04]">
        <Container className="py-24 lg:py-32">
          {/* Hero card — Smart Quote Forms */}
          {(() => {
            const hero = features[0];
            const HeroIcon = hero.icon;
            return (
              <div className="relative group mb-6 rounded-2xl p-px bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/5" />
                <div className="relative rounded-[15px] bg-[#0a0a10] p-8 sm:p-10 lg:p-12">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.03] rounded-full blur-[80px] pointer-events-none" />
                  <div className="relative lg:flex lg:items-start lg:gap-16">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                          <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-lg" />
                          <div className="relative w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <HeroIcon weight="duotone" className="w-6 h-6 text-cyan-400" />
                          </div>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-extrabold text-white font-[family-name:var(--font-jakarta)] tracking-tight">
                          {hero.title}
                        </h3>
                      </div>
                      <p className="text-white/40 text-sm lg:text-[15px] leading-relaxed max-w-xl mb-8 lg:mb-0">
                        {hero.description}
                      </p>
                    </div>

                    {/* Mock form UI */}
                    <div className="lg:min-w-[400px] space-y-3">
                      {[
                        { label: "Job Type", value: "Solar Install" },
                        { label: "Panel System", value: "13kW — Tier 1" },
                        { label: "Inverter", value: "10kW Hybrid" },
                        { label: "Battery", value: "16kWh" },
                      ].map((field) => (
                        <div key={field.label} className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/[0.06] px-4 py-2.5">
                          <span className="text-white/30 text-xs font-medium">{field.label}</span>
                          <span className="text-white/60 text-xs font-semibold">{field.value}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 pt-3">
                        <div className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-center text-[10px] font-medium text-white/30">
                          Save as Template
                        </div>
                        <div className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-center text-[10px] font-medium text-white/30">
                          Save as Draft
                        </div>
                        <div className="flex-1 rounded-lg bg-brand-blue px-3 py-2 text-center text-[10px] font-semibold text-white">
                          Create Quote
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Feature grid — 5 cards in a modern layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {features.slice(1).map((f) => {
              const Icon = f.icon;
              const glowMap: Record<string, string> = {
                blue: "from-blue-500/20",
                amber: "from-amber-500/20",
                rose: "from-rose-500/20",
                violet: "from-violet-500/20",
                emerald: "from-emerald-500/20",
                pink: "from-pink-500/20",
              };
              const iconBgMap: Record<string, string> = {
                blue: "bg-blue-500/10 border-blue-500/20",
                amber: "bg-amber-500/10 border-amber-500/20",
                rose: "bg-rose-500/10 border-rose-500/20",
                violet: "bg-violet-500/10 border-violet-500/20",
                emerald: "bg-emerald-500/10 border-emerald-500/20",
                pink: "bg-pink-500/10 border-pink-500/20",
              };
              const glowDotMap: Record<string, string> = {
                blue: "bg-blue-400/20",
                amber: "bg-amber-400/20",
                rose: "bg-rose-400/20",
                violet: "bg-violet-400/20",
                emerald: "bg-emerald-400/20",
                pink: "bg-pink-400/20",
              };
              const borderMap: Record<string, string> = {
                blue: "from-blue-500/25",
                amber: "from-amber-500/25",
                rose: "from-rose-500/25",
                violet: "from-violet-500/25",
                emerald: "from-emerald-500/25",
                pink: "from-pink-500/25",
              };
              return (
                <div
                  key={f.title}
                  className="group relative rounded-2xl p-px bg-gradient-to-b from-white/[0.08] to-transparent hover:from-white/[0.15] transition-all duration-300 overflow-hidden"
                  style={{ background: undefined }}
                >
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 rounded-2xl p-px bg-gradient-to-b ${borderMap[f.accent]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative rounded-[15px] bg-[#0c0c12] p-6 sm:p-7 h-full flex flex-col">
                    {/* Ambient glow */}
                    <div className={`absolute -top-10 -right-10 w-40 h-40 ${glowDotMap[f.accent]} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative flex items-center gap-3.5 mb-4">
                      <div className="relative">
                        <div className={`absolute inset-0 ${glowDotMap[f.accent]} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className={`relative w-10 h-10 rounded-xl ${iconBgMap[f.accent]} border flex items-center justify-center`}>
                          <Icon weight="duotone" className={`w-5 h-5 ${f.color}`} />
                        </div>
                      </div>
                      <h3 className="text-[15px] font-bold text-white font-[family-name:var(--font-jakarta)] tracking-tight">
                        {f.title}
                      </h3>
                    </div>

                    <p className="text-white/35 text-[13px] leading-relaxed mb-5 flex-1">
                      {f.description}
                    </p>

                    {f.bullets && (
                      <ul className="space-y-2 border-t border-white/[0.04] pt-4">
                        {f.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2.5">
                            <Check weight="duotone" className={`w-3.5 h-3.5 ${f.color} flex-shrink-0 opacity-60`} />
                            <span className="text-white/40 text-xs">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom row — 4 compact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {bottomFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl p-px bg-gradient-to-b from-white/[0.06] to-transparent hover:from-white/[0.12] transition-all duration-300"
                >
                  <div className="rounded-[15px] bg-[#0c0c12] p-5 sm:p-6 h-full">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3.5">
                      <Icon weight="duotone" className={`w-4 h-4 ${f.color}`} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5 font-[family-name:var(--font-jakarta)]">{f.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Interactive explorer */}
      <FeatureExplorer />

      {/* Bottom CTA */}
      <section className="border-t border-white/[0.04]">
        <Container className="py-24 lg:py-32 text-center">
          <h2
            className="font-[family-name:var(--font-jakarta)] font-extrabold text-white mb-5"
            style={{ fontSize: "clamp(28px, 3vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
          >
            See it for yourself.
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto mb-10">
            Book a free demo and we&apos;ll walk you through Quotie — personalised for your trade.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-sm font-bold text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300"
            >
              Schedule a Demo
              <ArrowRight weight="duotone" className="w-4 h-4" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.1] text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              View Pricing
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
