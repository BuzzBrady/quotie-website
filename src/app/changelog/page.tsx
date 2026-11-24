import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import { Lightning, Bug, Sparkle, ShieldCheck, ArrowRight } from "@phosphor-icons/react/ssr";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

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
    date: "November 2026",
    version: "v3.7.0",
    title: "Edit Your Own Pricing Catalog",
    type: "feature",
    description:
      "Your Pricing page is no longer read-only. Update prices and add products yourself — the pricing logic we built for you stays exactly as it was.",
    changes: [
      "Edit catalog — change prices and add products in place",
      "Changes save to a draft until you review the before and after and publish",
      "Products your quotes still rely on can be switched off, not deleted",
      "Changes to pricing logic, form questions and quote wording are still made by the Quotie team",
    ],
  },
  {
    date: "September 2026",
    version: "v3.6.0",
    title: "Sales Pipelines, Tasks & a Faster Quote Form",
    type: "feature",
    description:
      "Your whole sales cycle on a board you control, a Tasks tab for everything that isn't a quote chase, and a full tidy-up of the quote form.",
    changes: [
      "Sales pipelines — drag opportunities between stages, or let new leads, sent quotes and signatures move them for you",
      "Each pipeline card shows how long it has sat in its stage",
      "Tasks tab in Follow-Ups, plus a What's Next summary on the dashboard",
      "Quote form: number steppers, searchable dropdowns, pill selectors, inline help, and a jump straight to anything you missed",
      "Road day itineraries — a nightly email with the route and travel times between stops",
      "Multiple quote templates per company, each with its own pricing catalog",
      "Profit before you send — a per-quote breakdown on Review & Send",
    ],
  },
  {
    date: "August 2026",
    version: "v3.5.0",
    title: "Shared Quote Links & Accept + Sign",
    type: "feature",
    description:
      "Every quote email can now include a hosted, branded quote page. Clients view all options online and accept & digitally sign right there — no download required.",
    changes: [
      "Hosted branded quote page per email — clients view all options online",
      "Digital signature pad — client signs on the page, certificate stamped into the PDF",
      "View & download tracking on the hosted quote page",
      "Decline-with-reason handling — clients can decline and leave a note",
      "New automation triggers: quote_viewed, quote_signed, quote_declined",
    ],
  },
  {
    date: "July 2026",
    version: "v3.4.0",
    title: "Automation Engine v2 & Emails Redesign",
    type: "feature",
    description:
      "A major upgrade to the automation engine — job event triggers, multi-trigger workflows, AND/OR condition groups, wait and filter steps — plus a redesigned Emails page.",
    changes: [
      "Job event triggers: created, status change, column change, scheduled, task completed",
      "Multi-trigger workflows — one automation can respond to several events",
      "AND/OR condition groups for precise automation logic",
      "Wait steps (duration or until-date, business-hours aware) and filter steps",
      "New GHL actions: create contact, add note, add tag, update opportunity",
      "Redesigned Emails page — full two-way inbox sync, threaded conversations, CC/BCC + attachments",
    ],
  },
  {
    date: "June 2026",
    version: "v3.3.0",
    title: "Site Visits, Callback Leads & Profit Tracking",
    type: "feature",
    description:
      "Road day planning, a pre-quote callback pipeline, and profit analytics — three new modules shipped together.",
    changes: [
      "Site Visits — scan GHL calendar for booked visits, drag-to-order stops, travel-time routing",
      "Booking summaries and one-click create quote from a visit",
      "Callback Leads pipeline — GHL webhook ingestion, call attempt tracking, timed reminders",
      "Auto-graduation from callback lead to a full quote",
      "Profit tracking — per-company formulas, margin trends, profit-by-rep, per-deal breakdowns",
      "Full contact inbox sync — all client email threads visible in Quotie",
    ],
  },
  {
    date: "May 2026",
    version: "v3.2.0",
    title: "Automation Engine & Email Improvements",
    type: "feature",
    description:
      "Build custom automations that trigger when quotes are sent, and send emails natively from Gmail or Outlook with CC/BCC and reply tracking.",
    changes: [
      "Automation builder — trigger actions in GoHighLevel, ServiceM8, and more when quotes are sent or won",
      "Native Gmail and Outlook email sending from your own address",
      "CC/BCC support with per-send overrides",
      "Reply tracking — client responses appear in Quotie",
      "Rich text email editor with auto-filled client details",
    ],
  },
  {
    date: "April 2026",
    version: "v3.1.0",
    title: "Follow-Up Dashboard & Notifications",
    type: "feature",
    description:
      "A dedicated follow-up dashboard that surfaces every outstanding quote ranked by urgency, plus real-time bell notifications.",
    changes: [
      "Urgency-sorted follow-up view: overdue, due today, upcoming",
      "Reschedule tracking with ordinal badges (1st, 2nd, 3rd follow-up)",
      "Send history and notes on every job",
      "Bell icon notifications with real-time updates",
      "Daily digest email notifications",
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
      "Integration connection status and diagnostics",
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
      "Fixed quote form fields not showing correctly in certain configurations",
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
      "Completely rewritten quote engine with advanced pricing support",
      "Follow-up dashboard with urgency scoring and one-click actions",
      "Contacts CRM with full quote and job history",
      "Calendar and scheduling module",
      "Team access controls with user permissions",
      "Real-time notifications and daily digest emails",
    ],
  },
];

const typeConfig: Record<EntryType, { icon: React.ElementType; label: string; color: string }> = {
  feature: { icon: Sparkle, label: "New Feature", color: "text-brand-blue" },
  improvement: { icon: Lightning, label: "Improvement", color: "text-ink" },
  fix: { icon: Bug, label: "Bug Fix", color: "text-amber-700" },
  security: { icon: ShieldCheck, label: "Security", color: "text-emerald-700" },
};

export default function ChangelogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-28 sm:pt-32 lg:pt-40 pb-12 lg:pb-16">
        <Container>
          <Eyebrow trail={`${entries.length} releases`} className="mb-6 max-w-md">
            Product Updates
          </Eyebrow>
          <h1 className="font-jakarta font-extrabold text-ink tracking-[-0.04em] leading-[1.04] text-[clamp(2.2rem,5vw,4rem)]">
            What&apos;s New in{" "}
            <span className="mark-live mark-live-anim">Quotie</span>
          </h1>
          <p className="mt-5 text-ink-soft text-lg max-w-lg leading-relaxed">
            We ship improvements every week. Here&apos;s what we&apos;ve been working on.
          </p>
        </Container>
      </section>

      {/* Ledger */}
      <section className="bg-paper pb-20 lg:pb-28">
        <Container>
          <div className="border-t-2 border-ink">
            {entries.map((entry) => {
              const config = typeConfig[entry.type];
              const TypeIcon = config.icon;
              return (
                <Reveal key={entry.version}>
                  <article className="grid md:grid-cols-[200px_minmax(0,1fr)] gap-x-10 gap-y-4 py-9 lg:py-12 border-b border-rule">
                    {/* Date + version */}
                    <div className="flex md:flex-col items-baseline md:items-start gap-x-3 gap-y-1.5 font-mono text-xs uppercase tracking-[0.12em]">
                      <span className="text-ink">{entry.date}</span>
                      <span className="leader md:hidden" aria-hidden />
                      <span className="text-ink-faint normal-case tracking-normal">{entry.version}</span>
                    </div>

                    <div className="max-w-2xl">
                      <div
                        className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] mb-3 ${config.color}`}
                      >
                        <TypeIcon weight="fill" className="w-3.5 h-3.5" />
                        {config.label}
                      </div>
                      <h2 className="font-jakarta font-extrabold text-ink text-2xl lg:text-[28px] tracking-[-0.03em] leading-tight text-balance">
                        {entry.title}
                      </h2>

                      <p className="mt-3 text-ink-soft leading-relaxed text-pretty">
                        {entry.description}
                      </p>

                      <ul className="mt-5 border-t border-rule">
                        {entry.changes.map((change) => (
                          <li
                            key={change}
                            className="flex items-start gap-3 py-2.5 border-b border-rule text-[15px] text-ink leading-relaxed"
                          >
                            <span className="text-brand-blue flex-shrink-0" aria-hidden>
                              —
                            </span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-sheet border-t border-rule py-16 lg:py-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="font-jakarta font-extrabold text-ink text-2xl tracking-[-0.03em]">
              Want to see these features in your business?
            </p>
            <ButtonLink href="/demo" variant="ink" size="lg" className="self-start sm:self-auto">
              Book a Demo
              <ArrowRight weight="bold" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
