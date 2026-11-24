"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Briefcase,
  CalendarBlank,
  ChartBar,
  FileText,
  MapPin,
  PaperPlaneTilt,
  PlugsConnected,
  Signature,
  UsersThree,
} from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  AutomationsMock,
  DashboardMock,
  FollowUpsMock,
  JobsMock,
  SendMock,
  SignMock,
  ViewedToast,
} from "./AppMocks";

// What happens to a quote after it's generated — in the order it happens.
const STAGES = [
  {
    id: "send",
    icon: PaperPlaneTilt,
    title: "Email & Inbox",
    description:
      "Send from Gmail or Outlook. Full two-way inbox sync for all client emails — threaded conversations, reply composer, CC/BCC.",
    Mock: SendMock,
  },
  {
    id: "sign",
    icon: Signature,
    title: "Accept & Sign Online",
    description:
      "Every quote gets a branded hosted page. Clients view all options, accept, and digitally sign — signed certificate stamped into the PDF.",
    Mock: SignMock,
  },
  {
    id: "followups",
    icon: Bell,
    title: "Follow-Ups & Callback Leads",
    description:
      "Outstanding quotes ranked by urgency. Pre-quote callback pipeline with call tracking and timed reminders that auto-graduate to a quote.",
    Mock: FollowUpsMock,
  },
  {
    id: "pipeline",
    icon: ChartBar,
    title: "Pipeline, Analytics & Profit",
    description:
      "Won revenue, conversion rates, pipeline value. Plus per-company profit formulas, margin trends, and profit-by-rep.",
    Mock: DashboardMock,
  },
  {
    id: "jobs",
    icon: Briefcase,
    title: "Job Handoff",
    description:
      "Won quotes become jobs. Playbooks with step-by-step checklists, task tracking, customisable pipeline.",
    Mock: JobsMock,
  },
  {
    id: "automations",
    icon: PlugsConnected,
    title: "Automations",
    description:
      "Trigger on quote viewed, signed, or declined — plus job events. Multi-trigger workflows, wait steps, AND/OR conditions, GHL actions.",
    Mock: AutomationsMock,
  },
] as const;

const ALSO = [
  {
    icon: FileText,
    title: "Smart Quote Forms",
    description:
      "You (or your team) get a simple form tailored to your trade. Fill it in, hit generate — the pricing engine does the rest.",
  },
  {
    icon: UsersThree,
    title: "CRM & Contacts",
    description: "Full contact history with GoHighLevel two-way sync built in.",
  },
  {
    icon: MapPin,
    title: "Site Visits & Road Days",
    description:
      "Plan road days, scan GHL calendars for booked visits, drag to order stops, travel-time routing, one-click create quote from a visit.",
  },
  {
    icon: CalendarBlank,
    title: "Calendar",
    description:
      "Day, week, month views. Drag-and-drop rescheduling. Quotes, jobs, and site visits in one view.",
  },
] as const;

export default function Platform() {
  const [active, setActive] = useState<(typeof STAGES)[number]["id"]>("send");
  const stage = STAGES.find((s) => s.id === active)!;
  const Mock = stage.Mock;

  return (
    <section className="bg-deep text-white py-20 lg:py-28 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <Reveal>
            <SectionHeader
              dark
              badge="The whole platform"
              trail="Everything downstream of the quote"
              title="One simple idea. Everything else is built around it."
              gradient="Everything else is built around it."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/65 text-lg leading-relaxed text-pretty">
              Form in, quote out. That&apos;s the core of Quotie. Every quote you
              or your team generates is stored, tracked, and managed from the
              same place — so the system that{" "}
              <span className="text-white font-semibold">creates</span> your
              quotes is the same system that follows them up, gets them signed,
              and turns them into jobs.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 lg:mt-16 grid lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 items-start">
            {/* Stage list — a horizontal scroller on mobile, a ledger on desktop */}
            <div
              role="tablist"
              aria-label="Platform features"
              className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 lg:border-t lg:border-deep-rule"
            >
              {STAGES.map((s) => {
                const on = s.id === active;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(s.id)}
                    className={`group relative text-left shrink-0 lg:shrink lg:w-full rounded-lg lg:rounded-none border lg:border-0 lg:border-b px-4 py-2.5 lg:px-0 lg:py-4 lg:pl-5 transition-colors duration-200 ${
                      on
                        ? "border-brand-cyan/60 lg:border-deep-rule bg-white/[0.06] lg:bg-transparent"
                        : "border-deep-rule hover:bg-white/[0.03] lg:hover:bg-transparent"
                    }`}
                  >
                    <span
                      className={`hidden lg:block absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-brand-cyan origin-top transition-transform duration-300 ${
                        on ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <span
                      className={`flex items-center gap-2.5 font-jakarta font-bold text-sm lg:text-[17px] tracking-[-0.01em] whitespace-nowrap transition-colors ${
                        on ? "text-white" : "text-white/55 group-hover:text-white/85"
                      }`}
                    >
                      <Icon
                        weight={on ? "fill" : "regular"}
                        className={`w-[18px] h-[18px] shrink-0 ${on ? "text-brand-cyan" : ""}`}
                      />
                      {s.title}
                    </span>
                    <span
                      className={`hidden lg:grid transition-[grid-template-rows,opacity] duration-300 ${
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-sm leading-relaxed text-white/60">
                          {s.description}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* The real screen */}
            <div className="relative">
              <p className="lg:hidden mb-4 text-sm leading-relaxed text-white/65">
                {stage.description}
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stage.id}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  aria-hidden
                >
                  <Mock />
                </motion.div>
              </AnimatePresence>
              {active === "send" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="hidden sm:block absolute -bottom-5 -left-6"
                  aria-hidden
                >
                  <ViewedToast />
                </motion.div>
              )}
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                Real Quotie screens, sample data
              </p>
            </div>
          </div>
        </Reveal>

        {/* The rest of the toolkit */}
        <Reveal>
          <div className="mt-16 lg:mt-20 pt-8 border-t border-deep-rule">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cyan mb-6">
              Also in the toolkit
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              {ALSO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <Icon weight="duotone" className="w-6 h-6 text-brand-cyan mb-3" />
                    <h4 className="font-jakarta font-bold text-white text-[15px] mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-white/55">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <Link
              href="/features"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              See all features in detail
              <ArrowRight weight="bold" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
