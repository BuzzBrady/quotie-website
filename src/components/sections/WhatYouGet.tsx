import {
  FileText,
  Zap,
  Layers,
  Send,
  Bell,
  BarChart3,
  Users,
  Briefcase,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const ITEMS = [
  {
    icon: FileText,
    color: "text-blue-400",
    bg: "from-blue-500/20 to-blue-700/20",
    title: "Custom Quote Templates",
    description:
      "Build your pricing logic once with dropdowns, conditional fields, and calculated totals.",
  },
  {
    icon: Zap,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-700/20",
    title: "Instant PDF Generation",
    description:
      "Branded proposals generated in seconds — cover page, options, and all.",
  },
  {
    icon: Layers,
    color: "text-amber-400",
    bg: "from-amber-500/20 to-orange-500/20",
    title: "Multi-Option Proposals",
    description:
      "Present Bronze, Silver, and Gold tiers side-by-side in a single document.",
  },
  {
    icon: Send,
    color: "text-indigo-400",
    bg: "from-indigo-500/20 to-indigo-700/20",
    title: "Quote Groups & Sending",
    description:
      "Group quotes together and send directly from your own Gmail or Outlook account.",
  },
  {
    icon: Bell,
    color: "text-rose-400",
    bg: "from-rose-500/20 to-rose-700/20",
    title: "Follow-Up Dashboard",
    description:
      "See every overdue, due today, and upcoming follow-up in one urgency-sorted view.",
  },
  {
    icon: BarChart3,
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-teal-500/20",
    title: "Pipeline & Analytics",
    description:
      "Revenue closed, conversion rate, avg deal size, and open pipeline in real time.",
  },
  {
    icon: Users,
    color: "text-purple-400",
    bg: "from-purple-500/20 to-purple-700/20",
    title: "CRM & Contacts",
    description:
      "Full contact management with GoHighLevel and ServiceM8 sync built in.",
  },
  {
    icon: Briefcase,
    color: "text-slate-400",
    bg: "from-slate-500/20 to-slate-700/20",
    title: "Job Handoff",
    description:
      "Convert won quotes to jobs with SOPs, task tracking, and fulfilment pipeline.",
  },
] as const;

export default function WhatYouGet() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#08080c" }}>
      <Container>
        <div className="mb-14">
          <SectionHeader
            badge="The Full Toolkit"
            title="What you actually get."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${item.bg} mb-4`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2 font-[family-name:var(--font-jakarta)]">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
