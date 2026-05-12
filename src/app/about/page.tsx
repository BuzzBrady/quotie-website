import { ArrowRight, MapPin, Heart, Lightning, Crosshair } from "@phosphor-icons/react/ssr";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

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
      <section
        className="relative min-h-[65vh] flex items-center overflow-hidden pt-20"
        style={{ background: "#08080c" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-brand-cyan/8 rounded-full blur-[80px]" />
        </div>
        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm font-semibold text-white/50 mb-6">
              <MapPin weight="duotone" className="w-4 h-4" />
              Central Coast, NSW, Australia
            </div>
            <h1
              className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 68px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
            >
              Australian-Built Quoting Software for{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                Trades
              </span>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed max-w-xl">
              We built Quotie for the businesses that keep Australia running — the electricians, plumbers, roofers, and solar installers who deserve better tools.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-semibold text-slate-600 mb-8">
              Our Story
            </div>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Quotie was founded by{" "}
                <strong className="text-slate-900">Lachlan Boys</strong> and{" "}
                <strong className="text-slate-900">Buzz Brady</strong> on the
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
        </Container>
      </section>

      {/* Founders */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-600 mb-10">
              The Team
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center mb-5">
                  <span className="text-lg font-bold text-white">LB</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 font-[family-name:var(--font-jakarta)]">
                  Lachlan Boys
                </h3>
                <p className="text-brand-blue text-sm font-semibold mb-3">
                  Co-Founder
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Professional estimator turned founder. Locky spent years in the
                  trades industry quoting work and built the original system that
                  became Quotie. He knows what tradies need because he&apos;s
                  lived it.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center mb-5">
                  <span className="text-lg font-bold text-white">BB</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 font-[family-name:var(--font-jakarta)]">
                  Buzz Brady
                </h3>
                <p className="text-brand-blue text-sm font-semibold mb-3">
                  Co-Founder &amp; Developer
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Software developer who took Locky&apos;s concept and rebuilt it
                  from the ground up. Buzz built the modern platform, the
                  infrastructure, and the tech that powers every quote Quotie
                  generates.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 bg-white border-t border-slate-100">
        <Container>
          <SectionHeader
            badge="What we stand for"
            title="Built around three things"
            gradient="three things"
            subtitle="Everything we build at Quotie comes back to these three values."
            dark={false}
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 border border-brand-blue/20 flex items-center justify-center mb-5">
                    <Icon weight="duotone" className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-jakarta)]">
                    {value.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Geography strip */}
      <section
        className="py-20 border-t border-white/[0.06]"
        style={{ background: "#08080c" }}
      >
        <Container className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white/50 mb-6">
            <MapPin weight="duotone" className="w-4 h-4 text-brand-cyan" />
            Built on the Central Coast — used across Australia &amp; New Zealand
          </div>
          <p className="text-white/30 text-sm max-w-md mx-auto">
            Our customers are everywhere from Cairns to Christchurch. We keep
            Australian business hours and we pick up the phone.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-slate-100">
        <Container className="text-center">
          <SectionHeader
            title="Want to see it in action?"
            gradient="in action?"
            subtitle="Book a free demo and we'll show you exactly how Quotie works for your trade."
            dark={false}
            className="mb-10"
          />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-sm font-bold text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300"
            >
              Schedule a Demo
              <ArrowRight weight="duotone" className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
