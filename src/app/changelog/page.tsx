import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import { Zap, Bug, Sparkles, Shield, ArrowRight } from "lucide-react";

export const metadata = createMetadata({
  title: "Changelog — What's New in Quotie",
  description:
    "Stay up to date with the latest improvements, new features, and bug fixes in Quotie.",
  path: "/changelog",
});

type EntryType = "feature" | "improvement" | "fix" | "security";

interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  description: string;
  type: EntryType;
  changes: string[];
}

const entries: ChangelogEntry[] = [
  {
    date: "December 2025",
    version: "v2.4.0",
    title: "Multi-Option Proposals & Client Portal",
    type: "feature",
    description:
      "Clients can now select from Good, Better, Best pricing options directly from a mobile-friendly portal — no login required.",
    changes: [
      "New multi-option proposal view with side-by-side pricing tiers",
      "Client-facing portal with branded header and acceptance flow",
      "Automatic quote total recalculation when an option is selected",
      "Option selection events trigger follow-up automation rules",
      "PDF generation updated to include all option columns",
    ],
  },
  {
    date: "November 2025",
    version: "v2.3.0",
    title: "Live Pulse Email Tracking",
    type: "feature",
    description:
      "Know exactly when a client opens your quote. Live Pulse sends a notification the moment your email is read, so you can follow up at exactly the right time.",
    changes: [
      "Real-time open tracking for sent quotes",
      "Push notifications on mobile when a quote is opened",
      "Open history log per quote (timestamps, device type)",
      "Follow-up dashboard now surfaces 'opened but not responded' quotes separately",
      "Gmail and Outlook native send now supported alongside SMTP",
    ],
  },
  {
    date: "October 2025",
    version: "v2.2.0",
    title: "GoHighLevel & ServiceM8 Integrations",
    type: "improvement",
    description:
      "Two-way sync with GoHighLevel and one-click job creation in ServiceM8 when a quote is accepted.",
    changes: [
      "GoHighLevel contact sync — creates/updates contacts on quote send",
      "GoHighLevel opportunity pipeline sync — moves opportunity stage on quote status change",
      "ServiceM8 job creation triggered automatically on quote acceptance",
      "Integration settings page with per-integration connection status",
      "Webhook log viewer for debugging automation triggers",
    ],
  },
  {
    date: "September 2025",
    version: "v2.1.2",
    title: "Performance & Bug Fixes",
    type: "fix",
    description:
      "A batch of performance improvements and bug fixes based on customer reports.",
    changes: [
      "Fixed quote list not refreshing after a status change without page reload",
      "Resolved PDF generation timeout for quotes with large image attachments",
      "Fixed template conditional logic not evaluating correctly for nested conditions",
      "Improved calendar event loading speed by 40%",
      "Fixed mobile keyboard pushing form fields offscreen on iOS 18",
    ],
  },
  {
    date: "August 2025",
    version: "v2.0.0",
    title: "Quotie 2.0 — Rebuilt from the Ground Up",
    type: "feature",
    description:
      "A complete platform rebuild with a new design system, faster performance, and a revamped quoting engine that supports complex multi-variable pricing.",
    changes: [
      "New design system with three themes (light, moderate, dark)",
      "Completely rewritten quote engine with matrix pricing support",
      "Follow-up dashboard with urgency scoring and one-click actions",
      "Contacts CRM with full quote and job history",
      "Calendar and scheduling module",
      "Role-based access control with admin view-as functionality",
      "Real-time notifications and daily digest emails",
    ],
  },
];

const typeConfig: Record<EntryType, { icon: React.ElementType; label: string; color: string; bg: string }> = {
  feature: { icon: Sparkles, label: "New Feature", color: "text-brand-cyan", bg: "bg-brand-cyan/10 border-brand-cyan/20" },
  improvement: { icon: Zap, label: "Improvement", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  fix: { icon: Bug, label: "Bug Fix", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  security: { icon: Shield, label: "Security", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
};

export default function ChangelogPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: "#08080c" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/8 rounded-full blur-[100px]" />
        </div>
        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm font-semibold text-white/50 mb-6">
            Product Updates
          </div>
          <h1
            className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.035em", lineHeight: 1.06 }}
          >
            What&apos;s New in{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Quotie
            </span>
          </h1>
          <p className="text-white/35 text-lg max-w-lg mx-auto">
            We ship improvements every week. Here&apos;s what we&apos;ve been working on.
          </p>
        </Container>
      </section>

      {/* Timeline */}
      <section
        className="pb-24 border-t border-white/[0.06]"
        style={{ background: "#08080c" }}
      >
        <Container>
          <div className="max-w-3xl mx-auto pt-12">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06] ml-[11px] hidden sm:block" />

              <div className="space-y-12">
                {entries.map((entry) => {
                  const config = typeConfig[entry.type];
                  const TypeIcon = config.icon;
                  return (
                    <div key={entry.version} className="relative sm:pl-10">
                      {/* Timeline dot */}
                      <div className="hidden sm:flex absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border border-white/[0.1] items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                      </div>

                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.bg} ${config.color}`}
                              >
                                <TypeIcon className="w-3 h-3" />
                                {config.label}
                              </span>
                              <span className="text-xs text-white/25 font-mono">{entry.version}</span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-jakarta)]">
                              {entry.title}
                            </h2>
                          </div>
                          <span className="text-sm text-white/25 flex-shrink-0 pt-1">{entry.date}</span>
                        </div>

                        <p className="text-white/40 text-sm leading-relaxed mb-5">
                          {entry.description}
                        </p>

                        <ul className="space-y-2">
                          {entry.changes.map((change) => (
                            <li key={change} className="flex items-start gap-2 text-sm text-white/50">
                              <span className="text-brand-cyan/60 mt-1 flex-shrink-0">—</span>
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section
        className="py-16 border-t border-white/[0.06]"
        style={{ background: "#08080c" }}
      >
        <Container className="text-center">
          <p className="text-white/30 text-sm mb-4">Want to see these features in your business?</p>
          <a
            href="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-sm font-bold text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </Container>
      </section>
    </>
  );
}
