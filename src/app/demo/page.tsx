import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import LeadCaptureForm from "@/components/lead-capture/LeadCaptureForm";
import Eyebrow from "@/components/ui/Eyebrow";
import { CheckCircle } from "@phosphor-icons/react/ssr";

export const metadata = createMetadata({
  title: "Book a Free Demo — See Quotie in Action",
  description:
    "Book a free personalised demo and see how Quotie helps trades businesses quote faster and close more work. Personalised walkthrough, live quote generation, no commitment required.",
  path: "/demo",
});

const expectations = [
  "Personalised walkthrough of Quotie for your specific trade",
  "See real quotes generated live in under 30 seconds",
  "Get your first template built during the call",
  "No commitment required — zero pressure",
];

const testimonials = [
  {
    quote:
      "I couldn't believe how quickly we closed $360k in a single month as soon as we had Quotie dialled in. The multi-option proposals are a game changer, clients love being able to choose what works for them.",
    author: "Jed Bolton",
    role: "Director, Bolton EC",
    rating: 5,
  },
  {
    quote:
      "I know exactly where every single quote is at, every single day. Who needs a follow-up, who's ready to go. Complete visibility into the pipeline for the first time ever.",
    author: "Cooper Kelly",
    role: "Director, Coastal Cleans Co",
    rating: 5,
  },
  {
    quote:
      "Quotie has been a great resource for our company. For solar installs we need a way to store data and track each job's progress from approval to installation and Quotie handles this perfectly.",
    author: "Benjamin Hughes",
    role: "Director, Hughes Electrical Group",
    rating: 5,
  },
];

export default function DemoPage() {
  return (
    <>
      {/* Main hero */}
      <section className="relative overflow-hidden bg-paper">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 50% at 80% 35%, rgba(57,185,229,0.14) 0%, transparent 70%)",
          }}
        />
        <Container className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: copy */}
            <div>
              <Eyebrow className="mb-6">
                Free, no-obligation demo
              </Eyebrow>
              <h1 className="font-jakarta font-extrabold tracking-[-0.04em] leading-[1.02] text-ink text-[clamp(2.4rem,5vw,4rem)] mb-5">
                See Quotie <span className="mark-live">in Action</span>
              </h1>
              <p className="text-ink-soft text-lg leading-relaxed mb-9 max-w-md text-pretty">
                Book a free demo and we&apos;ll show you how to quote faster and close more work — personalised for your trade and your business.
              </p>

              <ul className="border-t-2 border-ink mb-10">
                {expectations.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3.5 border-b border-rule"
                  >
                    <CheckCircle weight="fill" className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-ink text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <figure className="border-l-[3px] border-brand-cyan pl-5">
                <blockquote className="font-jakarta font-semibold text-ink text-lg leading-snug tracking-[-0.01em] text-pretty">
                  &ldquo;I couldn&apos;t believe how quickly we closed $360k in a single month as soon as we had Quotie dialled in.&rdquo;
                </blockquote>
                <figcaption className="text-ink-soft text-sm mt-2.5">— Jed Bolton, Director, Bolton EC</figcaption>
              </figure>
            </div>

            {/* Right: form */}
            <div className="sheet rounded-xl overflow-hidden lg:sticky lg:top-28">
              <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-cyan" />
              <div className="p-6 sm:p-9">
                <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-ink mb-1.5 font-jakarta">
                  Book your free demo
                </h2>
                <p className="text-ink-soft text-[15px] mb-6">
                  Takes 30 seconds. We&apos;ll be in touch within one business day.
                </p>
                <LeadCaptureForm source="demo_page" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-sheet border-y border-rule py-16 lg:py-24">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
            What our customers say
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 border-t-2 border-ink">
            {testimonials.map((t) => (
              <figure
                key={t.author}
                className="py-7 border-b border-rule md:border-b-0 flex flex-col"
              >
                <blockquote className="text-ink-soft text-[16px] leading-relaxed mb-5 text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-4 border-t border-rule">
                  <p className="text-ink text-sm font-semibold">{t.author}</p>
                  <p className="text-ink-faint text-sm">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
