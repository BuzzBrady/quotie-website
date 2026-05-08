"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  Send,
  Bell,
  BarChart3,
  Users,
  Briefcase,
  Calendar,
  Plug,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const items = [
  {
    icon: FileText,
    title: "Template Builder",
    description: "We build your pricing logic — conditional fields, matrix pricing, automatic calculations. Your team just fills in the form.",
    color: "text-cyan-400",
    border: "border-cyan-500/15",
    bg: "from-cyan-500/8 to-cyan-600/3",
    size: "lg" as const,
  },
  {
    icon: Send,
    title: "Email Sending",
    description: "Send from your own Gmail or Outlook. Customisable templates with merge variables. Replies tracked automatically.",
    color: "text-rose-400",
    border: "border-rose-500/15",
    bg: "from-rose-500/8 to-rose-600/3",
    size: "md" as const,
  },
  {
    icon: Bell,
    title: "Follow-Up Dashboard",
    description: "Every outstanding quote ranked by urgency. One-click reschedule. Nothing slips.",
    color: "text-violet-400",
    border: "border-violet-500/15",
    bg: "from-violet-500/8 to-violet-600/3",
    size: "md" as const,
  },
  {
    icon: BarChart3,
    title: "Pipeline & Analytics",
    description: "Won revenue, conversion rates, pipeline value. Your business on one screen.",
    color: "text-emerald-400",
    border: "border-emerald-500/15",
    bg: "from-emerald-500/8 to-emerald-600/3",
    size: "sm" as const,
  },
  {
    icon: Users,
    title: "CRM & Contacts",
    description: "Full contact history with GoHighLevel sync built in.",
    color: "text-purple-400",
    border: "border-purple-500/15",
    bg: "from-purple-500/8 to-purple-600/3",
    size: "sm" as const,
  },
  {
    icon: Briefcase,
    title: "Job Handoff",
    description: "Won quotes become jobs. SOPs, task tracking, configurable pipeline.",
    color: "text-slate-300",
    border: "border-slate-500/15",
    bg: "from-slate-500/8 to-slate-600/3",
    size: "sm" as const,
  },
  {
    icon: Calendar,
    title: "Calendar",
    description: "Day, week, month views. Drag-and-drop rescheduling.",
    color: "text-blue-400",
    border: "border-blue-500/15",
    bg: "from-blue-500/8 to-blue-600/3",
    size: "sm" as const,
  },
  {
    icon: Plug,
    title: "Automations",
    description: "GoHighLevel, ServiceM8, webhooks. Trigger actions on quote events.",
    color: "text-teal-400",
    border: "border-teal-500/15",
    bg: "from-teal-500/8 to-teal-600/3",
    size: "lg" as const,
  },
];

function BentoCard({ item, index }: { item: (typeof items)[number]; index: number }) {
  const Icon = item.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
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
          <Icon className={`w-5 h-5 ${item.color}`} />
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
