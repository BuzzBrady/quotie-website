"use client";

import { useState } from "react";
import {
  FileText,
  Zap,
  Layers,
  Mail,
  Bell,
  BarChart3,
  Users,
  Briefcase,
  Calendar,
  Plug,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { useLeadModal } from "@/components/lead-capture/LeadModalProvider";

/* ═══════════════════════════════════════════════════════════════
   FEATURE DEEP-DIVE GRID — detailed cards, mixed sizes
   ═══════════════════════════════════════════════════════════════ */

const features = [
  {
    icon: FileText,
    title: "Template Builder",
    description: "We build your pricing logic during onboarding — conditional fields, matrix pricing, automatic calculations. Your team just fills in the form and hits generate. Come back to us for price changes or new materials.",
    color: "text-cyan-400",
    border: "border-cyan-500/15",
    bg: "from-cyan-500/8 to-cyan-600/3",
    span: "lg:col-span-2",
    bullets: ["Conditional fields & matrix pricing", "Automatic margin calculations", "Reusable template library"],
  },
  {
    icon: Zap,
    title: "Instant PDF Generation",
    description: "Branded PDFs generated server-side from your HTML templates. Cover pages, multiple options, totals, and custom fields — all automatic.",
    color: "text-blue-400",
    border: "border-blue-500/15",
    bg: "from-blue-500/8 to-blue-600/3",
    span: "lg:col-span-1",
    bullets: ["Custom HTML templates", "Automatic quote numbering", "Download or send directly"],
  },
  {
    icon: Layers,
    title: "Multi-Option Proposals",
    description: "Send up to 4 options in a single quote group. Each option is a full branded PDF. Bundle and send in one professional email.",
    color: "text-amber-400",
    border: "border-amber-500/15",
    bg: "from-amber-500/8 to-amber-600/3",
    span: "lg:col-span-1",
    bullets: ["Up to 4 options per quote", "Full PDF per option", "Bundle in one email"],
  },
  {
    icon: Mail,
    title: "Email Sending & Reply Tracking",
    description: "Send quotes directly from your own Gmail or Outlook account. Customisable email templates with merge variables. Client replies are tracked and appear in Quotie automatically.",
    color: "text-rose-400",
    border: "border-rose-500/15",
    bg: "from-rose-500/8 to-rose-600/3",
    span: "lg:col-span-2",
    bullets: ["Native Gmail & Outlook sending", "Merge variable templates", "Reply tracking in-app", "CC/BCC with per-send overrides"],
  },
  {
    icon: Bell,
    title: "Follow-Up Dashboard",
    description: "Every outstanding quote ranked by urgency — overdue, due today, upcoming. Reschedule tracking with ordinal badges. Send history and notes on every quote group.",
    color: "text-violet-400",
    border: "border-violet-500/15",
    bg: "from-violet-500/8 to-violet-600/3",
    span: "lg:col-span-1",
    bullets: ["Urgency sorting", "One-click reschedule", "Reschedule badges (1st, 2nd, 3rd)"],
  },
  {
    icon: BarChart3,
    title: "Pipeline & Analytics",
    description: "Quote status tracking, won revenue, conversion rates, and pipeline value. Filter by date range, status, and user.",
    color: "text-emerald-400",
    border: "border-emerald-500/15",
    bg: "from-emerald-500/8 to-emerald-600/3",
    span: "lg:col-span-1",
    bullets: ["Status tracking: draft, sent, won, lost", "Revenue & conversion metrics", "Date and user filters"],
  },
];

const bottomFeatures = [
  {
    icon: Users,
    title: "CRM & Contacts",
    description: "Full contact history, multi-address support, GoHighLevel two-way sync. Import from GHL or add manually.",
    color: "text-purple-400",
    border: "border-purple-500/15",
  },
  {
    icon: Briefcase,
    title: "Job Handoff",
    description: "One-click quote-to-job conversion. Configurable pipeline columns, SOPs with step-by-step checklists, ServiceM8 integration.",
    color: "text-slate-300",
    border: "border-slate-500/15",
  },
  {
    icon: Calendar,
    title: "Calendar & Scheduling",
    description: "Day, week, and month views with drag-and-drop rescheduling. Link events to quotes and contacts.",
    color: "text-blue-400",
    border: "border-blue-500/15",
  },
  {
    icon: Plug,
    title: "Automations & Integrations",
    description: "GoHighLevel, ServiceM8, webhook and HTTP actions. Trigger automations on quote events.",
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
    label: "Template Builder",
    icon: FileText,
    color: "text-cyan-400",
    activeBg: "bg-cyan-500/10 border-cyan-500/25",
    content: {
      title: "How the template builder works",
      steps: [
        { label: "We build your template", detail: "Dropdowns, conditional fields, quantities — tailored to your trade" },
        { label: "We configure your pricing", detail: "Margins, labour rates, material costs, matrix pricing — all pre-built" },
        { label: "We set up your options", detail: "Up to 4 options per quote — tailored to however your business prices work" },
        { label: "Your team generates quotes", detail: "Fill the form, hit generate. The template does the maths." },
      ],
    },
  },
  {
    id: "send",
    label: "Quote → Client",
    icon: Mail,
    color: "text-rose-400",
    activeBg: "bg-rose-500/10 border-rose-500/25",
    content: {
      title: "How sending works",
      steps: [
        { label: "Generate PDFs", detail: "Branded proposals built from your HTML templates" },
        { label: "Compose email", detail: "Pick a template, merge variables auto-fill" },
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
                <Icon className={`w-4 h-4 ${isActive ? f.color : ""}`} />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`${f.span} group rounded-2xl border ${f.border} bg-gradient-to-br ${f.bg} p-7 sm:p-8 transition-all duration-300 hover:border-white/[0.15]`}
                >
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${f.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-[family-name:var(--font-jakarta)] mb-1">
                        {f.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                  {f.bullets && (
                    <ul className="space-y-2 sm:ml-16">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                            <Check className={`w-2.5 h-2.5 ${f.color}`} />
                          </div>
                          <span className="text-white/45 text-xs">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom row — 4 compact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {bottomFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`rounded-2xl border ${f.border} bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.03]`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4">
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <h3 className="text-[15px] font-bold text-white mb-1.5 font-[family-name:var(--font-jakarta)]">{f.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{f.description}</p>
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
              <ArrowRight className="w-4 h-4" />
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
