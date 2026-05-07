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
  title: "Features — Everything From Enquiry to Invoice | Quotie",
  description:
    "Explore every capability Quotie offers: quote templates, PDF generation, multi-option proposals, email tracking, follow-up dashboards, pipeline analytics, CRM, job handoff, calendar, and automations.",
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
      "Conditional fields that show/hide based on customer answers",
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
      "Every quote generates a polished, branded PDF in seconds. No more fiddling with Word docs or InDesign. Your logo, colours, and contact details are baked in automatically.",
    benefits: [
      "Pixel-perfect branded PDFs generated server-side",
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
      "Let clients choose from Good, Better, Best options in a single professional proposal. More choices means higher average job values and fewer back-and-forth emails.",
    benefits: [
      "Present up to three pricing tiers in one document",
      "Client-facing selection interface that looks great on mobile",
      "Automatic total recalculation when an option is selected",
      "Track which option was chosen and when",
    ],
  },
  {
    icon: Mail,
    id: "email",
    title: "Email Sending & Tracking",
    description:
      "Send quotes directly from Quotie using your own Gmail or Outlook account. Know exactly when a client opens your quote and stop guessing whether it landed.",
    benefits: [
      "Native Gmail and Outlook integration — sends from your address",
      "Open tracking so you know when to follow up",
      "Threaded reply tracking — client replies land in your inbox",
      "Customisable email templates with merge fields",
    ],
  },
  {
    icon: Bell,
    id: "followups",
    title: "Follow-Up Dashboard",
    description:
      "Never let a quote go cold. The follow-up dashboard surfaces every outstanding quote ranked by urgency, so you always know who to call next.",
    benefits: [
      "Urgency scoring based on quote age and client behaviour",
      "One-click follow-up email or SMS from the dashboard",
      "Reschedule follow-ups with a single tap",
      "Daily digest notifications so nothing slips through the cracks",
    ],
  },
  {
    icon: BarChart3,
    id: "pipeline",
    title: "Pipeline & Analytics",
    description:
      "Get a real-time view of your entire quote pipeline. See conversion rates, average job values, and which team members are closing the most work.",
    benefits: [
      "Kanban-style pipeline with drag-and-drop status updates",
      "Win rate and conversion analytics by template and trade type",
      "Revenue forecasting based on outstanding quotes",
      "Export reports for your accountant or business coach",
    ],
  },
  {
    icon: Users,
    id: "crm",
    title: "CRM & Contacts",
    description:
      "A lightweight CRM built for trades. Store your clients, their sites, and their full quoting history in one place — with optional two-way sync to GoHighLevel.",
    benefits: [
      "Full contact history with linked quotes and jobs",
      "Site addresses and access notes per client",
      "Two-way GoHighLevel contact sync",
      "Tag contacts by trade type, source, or any custom label",
    ],
  },
  {
    icon: Briefcase,
    id: "jobs",
    title: "Job Handoff",
    description:
      "When a quote is accepted, convert it to a job instantly. Field techs get everything they need — scope, photos, site notes — without a single phone call.",
    benefits: [
      "One-click quote-to-job conversion",
      "Job checklists and SOP steps attached per trade type",
      "Field-friendly mobile view for on-site teams",
      "ServiceM8 integration for scheduling and invoicing",
    ],
  },
  {
    icon: Calendar,
    id: "calendar",
    title: "Calendar & Scheduling",
    description:
      "Book site visits, quote appointments, and job starts directly from Quotie. Everything stays in sync so your diary never gets double-booked.",
    benefits: [
      "Day, week, and month views with drag-and-drop rescheduling",
      "Link calendar events directly to quotes and contacts",
      "Google Calendar sync (coming soon)",
      "Team availability view for multi-technician businesses",
    ],
  },
  {
    icon: Plug,
    id: "integrations",
    title: "Automations & Integrations",
    description:
      "Connect Quotie to the tools you already use. GoHighLevel, ServiceM8, Google Drive, and more — with a workflow engine that automates repetitive tasks.",
    benefits: [
      "GoHighLevel two-way contact and opportunity sync",
      "ServiceM8 job creation on quote acceptance",
      "Google Drive automatic quote PDF filing",
      "Custom automation triggers: quote sent, opened, accepted",
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
            Everything From{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Enquiry to Invoice
            </span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
            One platform that handles every step — from the first quote to the final invoice — so your team can focus on the work, not the admin.
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
              className={`border-t border-white/[0.06] py-20 ${isEven ? "" : ""}`}
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
            subtitle="Book a free personalised demo and we'll show you how to quote faster and close more work."
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
