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
  Check,
  ArrowRight,
} from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = createMetadata({
  title: "Features — Everything From Enquiry to Handshake",
  description:
    "Explore every Quotie feature: quote templates, PDF generation, multi-option proposals, email sending, follow-up dashboards, pipeline tracking, CRM, job handoff, calendar, and automations.",
  path: "/features",
});

const features = [
  {
    icon: FileText,
    id: "templates",
    title: "Quote Templates & Pricing Engine",
    description:
      "Build your pricing system once and generate perfectly calculated quotes every time. Define your labour rates, materials, margins, and conditional logic — then let Quotie do the maths.",
    benefits: [
      "Conditional fields that show/hide based on selections",
      "Automatic pricing calculations with configurable margins",
      "Matrix pricing for complex multi-variable jobs",
      "Reusable template library across your whole team",
    ],
  },
  {
    icon: Zap,
    id: "pdf",
    title: "Instant PDF Generation",
    description:
      "Every quote generates a polished, branded PDF in seconds. No more fiddling with Word docs or spreadsheets. Your logo, colours, and terms are baked in automatically.",
    benefits: [
      "Branded PDFs generated server-side via your HTML templates",
      "Custom cover pages and terms sections",
      "Automatic quote numbering and expiry dates",
      "Download or send directly from within the app",
    ],
  },
  {
    icon: Layers,
    id: "proposals",
    title: "Multi-Option Proposals",
    description:
      "Send up to 4 options in a single quote group — different scopes, different price points. Your client picks what works for them without you sending separate quotes.",
    benefits: [
      "Up to 4 pricing tiers in one quote group",
      "Each option is a full branded PDF",
      "Bundle options together and send in one email",
      "Track which options are sent and when",
    ],
  },
  {
    icon: Mail,
    id: "email",
    title: "Email Sending & Tracking",
    description:
      "Send quotes directly from Quotie using your own Gmail or Outlook account. Know when a client opens your quote, and reply tracking brings their responses into Quotie automatically.",
    benefits: [
      "Native Gmail and Outlook integration — sends from your address",
      "Customisable email templates with merge variables",
      "Reply tracking — client replies appear in Quotie",
      "CC/BCC support with per-send overrides",
    ],
  },
  {
    icon: Bell,
    id: "followups",
    title: "Follow-Up Dashboard",
    description:
      "Never let a quote go cold. The follow-up dashboard surfaces every outstanding quote ranked by urgency, so you always know who to call next.",
    benefits: [
      "Urgency-sorted view: overdue, due today, upcoming",
      "One-click reschedule with calendar picker",
      "Reschedule tracking (1st, 2nd, 3rd follow-up badges)",
      "Send history and notes on every quote group",
    ],
  },
  {
    icon: BarChart3,
    id: "pipeline",
    title: "Pipeline & Analytics",
    description:
      "Get a clear view of your quote pipeline. See won revenue, conversion rates, and pipeline value — your business health on one screen.",
    benefits: [
      "Quote status tracking: draft, sent, won, lost",
      "Won revenue and conversion rate metrics",
      "Pipeline value and quote volume stats",
      "Filter by date range, status, and user",
    ],
  },
  {
    icon: Users,
    id: "crm",
    title: "CRM & Contacts",
    description:
      "A lightweight CRM built for trades. Store your clients, their sites, and their full quoting history in one place — with optional sync to GoHighLevel.",
    benefits: [
      "Full contact history with linked quotes and jobs",
      "Multi-address support per contact",
      "GoHighLevel two-way contact sync",
      "Import contacts from GHL or add manually",
    ],
  },
  {
    icon: Briefcase,
    id: "jobs",
    title: "Job Handoff",
    description:
      "When a quote is won, convert it to a job. Configurable pipeline columns, task tracking, and SOPs keep your team on track from acceptance to completion.",
    benefits: [
      "One-click quote-to-job conversion",
      "Configurable pipeline with custom columns",
      "SOPs with step-by-step checklists per job type",
      "ServiceM8 integration for scheduling",
    ],
  },
  {
    icon: Calendar,
    id: "calendar",
    title: "Calendar & Scheduling",
    description:
      "View your follow-ups, site visits, and job schedules in one calendar. Day, week, and month views with drag-and-drop rescheduling.",
    benefits: [
      "Day, week, and month calendar views",
      "Drag-and-drop event rescheduling",
      "Link events to quotes and contacts",
      "Team calendar for multi-user businesses",
    ],
  },
  {
    icon: Plug,
    id: "integrations",
    title: "Automations & Integrations",
    description:
      "Connect Quotie to the tools you already use. GoHighLevel, ServiceM8, and webhook-based automations let you trigger actions when quotes are sent or accepted.",
    benefits: [
      "GoHighLevel two-way contact and opportunity sync",
      "ServiceM8 job creation integration",
      "Automation triggers: quote sent, accepted, or custom",
      "Webhook and HTTP request actions for any API",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-center overflow-hidden pt-20"
        style={{ background: "#08080c" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-cyan/8 rounded-full blur-[80px]" />
        </div>
        <Container className="relative z-10 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm font-semibold text-white/50 mb-6">
            Platform Features
          </div>
          <h1
            className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-5"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            Everything between the{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              enquiry and the handshake.
            </span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
            One platform that handles quoting, sending, tracking, follow-ups, and job handoff — so your team can focus on the work, not the admin.
          </p>
        </Container>
      </section>

      {/* Feature sections */}
      <section style={{ background: "#08080c" }} className="pb-8">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isEven = i % 2 === 0;
          return (
            <div
              key={feature.id}
              id={feature.id}
              className="border-t border-white/[0.06] py-20"
            >
              <Container>
                <div
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Text */}
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 border border-white/[0.08] mb-5">
                      <Icon className="w-6 h-6 text-brand-cyan" />
                    </div>
                    <h2
                      className="font-[family-name:var(--font-jakarta)] font-extrabold text-white mb-4"
                      style={{ fontSize: "clamp(24px, 2.8vw, 40px)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
                    >
                      {feature.title}
                    </h2>
                    <p className="text-white/40 text-lg leading-relaxed mb-8">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-brand-cyan/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-brand-cyan" />
                          </div>
                          <span className="text-white/60 text-sm leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual card */}
                  <div className="flex-1 w-full">
                    <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 min-h-[280px] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-cyan/5" />
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 border border-white/[0.1] flex items-center justify-center">
                          <Icon className="w-10 h-10 text-brand-cyan" />
                        </div>
                        <p className="text-white/20 text-sm text-center max-w-xs">
                          {feature.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section
        className="py-24 border-t border-white/[0.06]"
        style={{ background: "#08080c" }}
      >
        <Container className="text-center">
          <SectionHeader
            badge="Ready to get started?"
            title="See Quotie in action"
            gradient="Quotie"
            subtitle="Book a free personalised demo and we'll show you how Quotie works for your trade."
            dark
            className="mb-10"
          />
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
    </>
  );
}
