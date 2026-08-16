"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  PaperPlaneTilt,
  Bell,
  ChartBar,
  UsersThree,
  Briefcase,
  CalendarBlank,
  PlugsConnected,
  Signature,
  MapPin,
} from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const items = [
  {
    icon: FileText,
    title: "Smart Quote Forms",
    description: "Your team sees a simple form tailored to your trade. Fill it in, hit generate — the pricing engine does the rest.",
    color: "text-cyan-400",
    border: "border-cyan-500/15",
    bg: "from-cyan-500/8 to-cyan-600/3",
    size: "lg" as const,
  },
  {
    icon: Signature,
    title: "Accept & Sign Online",
    description: "Every quote gets a branded hosted page. Clients view all options, accept, and digitally sign — signed certificate stamped into the PDF.",
    color: "text-brand-cyan",
    border: "border-brand-cyan/20",
    bg: "from-brand-cyan/8 to-brand-blue/3",
    size: "md" as const,
  },
  {
    icon: PaperPlaneTilt,
    title: "Email & Inbox",
    description: "Send from Gmail or Outlook. Full two-way inbox sync for all client emails — threaded conversations, reply composer, CC/BCC.",
    color: "text-rose-400",
    border: "border-rose-500/15",
    bg: "from-rose-500/8 to-rose-600/3",
    size: "md" as const,
  },
  {
    icon: Bell,
    title: "Follow-Ups & Callback Leads",
    description: "Outstanding quotes ranked by urgency. Pre-quote callback pipeline with call tracking and timed reminders that auto-graduate to a quote.",
    color: "text-violet-400",
    border: "border-violet-500/15",
    bg: "from-violet-500/8 to-violet-600/3",
    size: "sm" as const,
  },
  {
    icon: ChartBar,
    title: "Pipeline, Analytics & Profit",
    description: "Won revenue, conversion rates, pipeline value. Plus per-company profit formulas, margin trends, and profit-by-rep.",
    color: "text-emerald-400",
    border: "border-emerald-500/15",
    bg: "from-emerald-500/8 to-emerald-600/3",
    size: "sm" as const,
  },
  {
    icon: UsersThree,
    title: "CRM & Contacts",
    description: "Full contact history with GoHighLevel two-way sync built in.",
    color: "text-purple-400",
    border: "border-purple-500/15",
    bg: "from-purple-500/8 to-purple-600/3",
    size: "sm" as const,
  },
  {
    icon: Briefcase,
    title: "Job Handoff",
    description: "Won quotes become jobs. Playbooks with step-by-step checklists, task tracking, customisable pipeline.",
    color: "text-slate-300",
    border: "border-slate-500/15",
    bg: "from-slate-500/8 to-slate-600/3",
    size: "sm" as const,
  },
  {
    icon: MapPin,
    title: "Site Visits & Road Days",
    description: "Plan road days, scan GHL calendars for booked visits, drag to order stops, travel-time routing, one-click create quote from a visit.",
    color: "text-orange-400",
    border: "border-orange-500/15",
    bg: "from-orange-500/8 to-orange-600/3",
    size: "sm" as const,
  },
  {
    icon: CalendarBlank,
    title: "Calendar",
    description: "Day, week, month views. Drag-and-drop rescheduling. Quotes, jobs, and site visits in one view.",
    color: "text-blue-400",
    border: "border-blue-500/15",
    bg: "from-blue-500/8 to-blue-600/3",
    size: "sm" as const,
  },
  {
    icon: PlugsConnected,
    title: "Automations",
    description: "Trigger on quote viewed, signed, or declined — plus job events. Multi-trigger workflows, wait steps, AND/OR conditions, GHL actions.",
    color: "text-teal-400",
    border: "border-teal-500/15",
    bg: "from-teal-500/8 to-teal-600/3",
    size: "lg" as const,
  },
];

function BentoCard({ item, index }: { item: (typeof items)[number]; index: number }) {
  const Icon = item.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative rounded-2xl border ${item.border} bg-gradient-to-br ${item.bg} transition-all duration-300 hover:border-white/[0.15] overflow-hidden ${
        item.size === "lg"
          ? "md:col-span-2 p-7 sm:p-8"
          : item.size === "md"
            ? "p-6 sm:p-7"
            : "p-5 sm:p-6"
      }`}
    >
      <div className={`flex ${item.size === "lg" ? "items-start gap-5" : "flex-col"}`}>
        <div className={`w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 ${item.size !== "lg" ? "mb-4" : ""}`}>
          <Icon weight="duotone" className={`w-5 h-5 ${item.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-white font-[family-name:var(--font-jakarta)] mb-1.5 ${item.size === "lg" ? "text-lg" : "text-[15px]"}`}>
            {item.title}
          </h3>
          <p className={`text-white/40 leading-relaxed ${item.size === "sm" ? "text-xs" : "text-sm"}`}>
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatYouGet() {
  return (
    <section className="py-16 lg:py-20 border-t border-white/[0.04]" style={{ background: "#08080c" }}>
      <Container>
        <div className="mb-14">
          <SectionHeader
            badge="The Full Toolkit"
            title="What you actually get."
            subtitle="Everything else that comes with every Quotie plan."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <BentoCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/features"
            className="text-sm text-white/30 hover:text-white/60 transition-colors inline-flex items-center gap-2"
          >
            See all features in detail
            <span className="text-white/20">&rarr;</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
