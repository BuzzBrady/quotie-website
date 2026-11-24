import { ArrowRight, MapPin, Heart, Lightning, Crosshair } from "@phosphor-icons/react/ssr";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = createMetadata({
  title: "About Quotie — Australian-Built Quoting Software for Trades",
  description:
    "Founded by Lachlan Boys and Buzz Brady on the Central Coast, NSW. Quotie was built from real trades experience — professional estimating meets modern software.",
  path: "/about",
});

const values = [
  {
    icon: Lightning,
    title: "Speed",
    description:
      "Every second your team spends building a quote is a second not spent on the tools. We obsess over making quoting as fast as humanly possible.",
  },
  {
    icon: Crosshair,
    title: "Simplicity",
    description:
      "No endless settings menus. No training manuals. If your apprentice can't figure it out in five minutes, we've built it wrong.",
  },
  {
    icon: Heart,
    title: "Results",
    description:
      "We measure success in jobs won and time saved — not features shipped. If Quotie isn't making your business more money, we want to know.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-28 sm:pt-32 lg:pt-40 pb-14 lg:pb-20">
        <Container>
          <div className="max-w-4xl">
            <Eyebrow className="mb-6">
              <span className="inline-flex items-center gap-1.5">
                <MapPin weight="fill" className="w-3.5 h-3.5" />
                Central Coast, NSW, Australia
              </span>
            </Eyebrow>
            <h1 className="font-jakarta font-extrabold text-ink tracking-[-0.04em] leading-[1.04] text-[clamp(2.2rem,5vw,4.25rem)] text-balance">
              Australian-Built Quoting Software for{" "}
              <span className="mark-live mark-live-anim">Trades</span>
            </h1>
            <p className="mt-6 text-ink-soft text-lg leading-relaxed max-w-xl text-pretty">
              We built Quotie for the businesses that keep Australia running — the electricians, plumbers, roofers, and solar installers who deserve better tools.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-sheet border-y border-rule py-20 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] gap-8 lg:gap-16 items-start">
            <Eyebrow className="lg:sticky lg:top-28">Our Story</Eyebrow>
            <div className="max-w-2xl">
            <div className="space-y-6 text-ink-soft text-lg leading-relaxed text-pretty">
              <p>
                Quotie was founded by{" "}
                <strong className="text-ink">Lachlan Boys</strong> and{" "}
                <strong className="text-ink">Buzz Brady</strong> on the
                Central Coast of New South Wales. Both Aussie born and raised.
              </p>
              <p>
                Locky came from the trades side — years of professional
                estimating, watching the same problems play out over and over.
                Business owners spending entire evenings rebuilding quotes in
                Excel. Pricing that was sometimes right, sometimes not. Follow-ups
                forgotten. Jobs slipping through the cracks because nobody had a
                clear view of what was outstanding.
              </p>
              <p>
                He built an early system to solve it — a quoting tool that worked,
                but was held together with tape. It proved the concept: trades
                businesses didn&apos;t need another generic CRM. They needed
                something built specifically for how they actually quoted work.
              </p>
              <p>
                That&apos;s when Buzz came in. A software developer who saw the
                potential in what Locky had started and rebuilt it from the ground
                up — modern tech stack, proper infrastructure, and a platform that
                could scale. The rough prototype became Quotie: fast, branded, and
                built around the way real trades businesses operate.
              </p>
              <p>
                The combination of real-world estimating experience and modern
                software development is what makes Quotie different. It wasn&apos;t
                designed in a boardroom by people who&apos;ve never quoted a job.
                It was built by someone who&apos;s done thousands of them, and
                engineered by someone who knows how to make software that actually
                works.
              </p>
              <p>
                Today, Quotie is used by trades businesses across Australia and
                New Zealand — and constantly improved based on feedback from the
                people who use it every day.
              </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Founders */}
      <section className="bg-paper py-20 lg:py-24">
        <Container>
          <Eyebrow trail="2 founders" className="mb-8 max-w-md">The Team</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-ink">
            <Reveal>
              <div className="py-8 sm:pr-10 border-b border-rule h-full">
                <div className="font-mono text-xs text-ink-faint mb-4">LB</div>
                <h3 className="font-jakarta font-extrabold text-ink text-2xl lg:text-3xl tracking-[-0.03em] mb-1">
                  Lachlan Boys
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
                  Co-Founder
                </p>
                <p className="text-ink-soft leading-relaxed text-pretty">
                  Professional estimator turned founder. Locky spent years in the
                  trades industry quoting work and built the original system that
                  became Quotie. He knows what tradies need because he&apos;s
                  lived it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="py-8 sm:pl-10 sm:border-l border-b border-rule h-full">
                <div className="font-mono text-xs text-ink-faint mb-4">BB</div>
                <h3 className="font-jakarta font-extrabold text-ink text-2xl lg:text-3xl tracking-[-0.03em] mb-1">
                  Buzz Brady
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
                  Co-Founder &amp; Developer
                </p>
                <p className="text-ink-soft leading-relaxed text-pretty">
                  Software developer who took Locky&apos;s concept and rebuilt it
                  from the ground up. Buzz built the modern platform, the
                  infrastructure, and the tech that powers every quote Quotie
                  generates.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-sheet border-y border-rule py-20 lg:py-24">
        <Container>
          <SectionHeader
            badge="What we stand for"
            title="Built around three things"
            gradient="three things"
            subtitle="Everything we build at Quotie comes back to these three values."
            className="mb-12 lg:mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-ink">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={i * 0.08}>
                  <div
                    className={`py-8 border-b border-rule h-full ${
                      i > 0 ? "md:pl-8 md:border-l" : ""
                    } ${i < values.length - 1 ? "md:pr-8" : ""}`}
                  >
                    <Icon weight="duotone" className="w-6 h-6 text-brand-blue mb-5" />
                    <h3 className="font-jakarta font-extrabold text-ink text-2xl tracking-[-0.03em] mb-3">
                      {value.title}
                    </h3>
                    <p className="text-ink-soft leading-relaxed text-pretty">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Geography strip */}
      <section className="bg-deep py-16 lg:py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-baseline">
            <p className="font-jakarta font-extrabold text-white text-2xl lg:text-3xl tracking-[-0.03em] leading-tight text-balance flex items-start gap-3">
              <MapPin weight="fill" className="w-6 h-6 text-brand-cyan shrink-0 mt-1" />
              <span>Built on the Central Coast — used across Australia &amp; New Zealand</span>
            </p>
            <p className="text-white/60 leading-relaxed max-w-md text-pretty">
              Our customers are everywhere from Cairns to Christchurch. We keep
              Australian business hours and we pick up the phone.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-paper py-20 lg:py-24">
        <Container>
          <SectionHeader
            title="Want to see it in action?"
            gradient="in action?"
            subtitle="Book a free demo and we'll show you exactly how Quotie works for your trade."
            className="mb-9"
          />
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/demo" variant="ink" size="lg">
              Schedule a Demo
              <ArrowRight weight="bold" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Get in Touch
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
