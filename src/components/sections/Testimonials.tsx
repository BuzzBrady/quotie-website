import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

// Real customers only — see CLAUDE.md. Do not add or edit quotes here
// without the customer's words.
const TESTIMONIALS = [
  {
    name: "Jed Bolton",
    role: "Director",
    company: "Bolton EC",
    metric: "$360k+",
    metricLabel: "Closed in one month",
    quote:
      "I couldn't believe how quickly we closed $360k in a single month once we had Quotie dialled in. The multi-option proposals are a game changer — clients love being able to choose what works for them.",
  },
  {
    name: "Benjamin Hughes",
    role: "Director",
    company: "Hughes Electrical Group",
    metric: "End-to-end",
    metricLabel: "Job tracking, approval to install",
    quote:
      "Quotie has been a great resource for our company. For solar installs we need a way to store data and track each job's progress from approval to installation and Quotie handles this perfectly. For anyone looking for a similar solution this would be a great option to check out!",
  },
  {
    name: "Cooper Kelly",
    role: "Director",
    company: "Coastal Cleans Co",
    metric: "100%",
    metricLabel: "Pipeline visibility",
    quote:
      "I know exactly where every single quote is at, every single day. Who needs a follow-up, who's ready to go. Complete visibility into the pipeline for the first time ever.",
  },
] as const;

const STATS = [
  { value: "30sec", label: "Quote to inbox" },
  { value: "4hrs", label: "Saved per day" },
  { value: "3x", label: "More proposals sent" },
  { value: "100%", label: "Pipeline visibility" },
];

export default function Testimonials() {
  const [lead, ...rest] = TESTIMONIALS;

  return (
    <section className="bg-sheet border-y border-rule py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            badge="Trusted by real businesses"
            trail="References"
            title="Built with businesses. Backed by results."
            gradient="Backed by results."
          />
        </Reveal>

        {/* Lead reference */}
        <Reveal delay={0.1}>
          <figure className="mt-12 lg:mt-16 grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 lg:gap-16 items-end border-t-2 border-ink pt-8">
            <div>
              <div className="font-jakarta font-extrabold text-ink tracking-[-0.05em] leading-[0.95] text-[clamp(4rem,11vw,8.5rem)] tnum">
                {lead.metric}
              </div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue">
                {lead.metricLabel}
              </div>
            </div>
            <div>
              <blockquote className="font-jakarta font-semibold text-ink text-xl sm:text-2xl lg:text-[28px] leading-[1.35] tracking-[-0.02em] text-pretty">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-ink-soft">
                <span className="font-semibold text-ink">{lead.name}</span> —{" "}
                {lead.role}, {lead.company}
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-x-12 gap-y-10 border-t border-rule pt-10">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-jakarta font-extrabold text-ink text-3xl tracking-[-0.04em] whitespace-nowrap">
                    {t.metric}
                  </span>
                  <span className="leader hidden sm:block" aria-hidden />
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-blue sm:text-right">
                    {t.metricLabel}
                  </span>
                </div>
                <blockquote className="mt-4 text-ink-soft text-[17px] leading-relaxed text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{t.name}</span> —{" "}
                  {t.role}, {t.company}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <Reveal>
          <dl className="mt-14 lg:mt-20 grid grid-cols-2 md:grid-cols-4 border-t-2 border-ink">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 md:px-6 border-b md:border-b-0 border-rule ${
                  i > 0 ? "md:border-l" : "md:pl-0"
                } ${i % 2 === 1 ? "pl-6 border-l md:border-l" : ""}`}
              >
                <dd className="font-jakarta font-extrabold text-ink text-4xl tracking-[-0.04em] tnum">
                  {s.value}
                </dd>
                <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
