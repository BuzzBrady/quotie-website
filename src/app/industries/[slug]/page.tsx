import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import LeadCaptureForm from "@/components/lead-capture/LeadCaptureForm";
import { industries, getIndustry } from "../_data/industries";
import Image from "next/image";
import {
  CheckCircle,
  Quotes,
  Star,
  XCircle,
  SunHorizon,
  HouseLine,
  Lightning,
  Broom,
  Drop,
  Fan,
  PaintRoller,
  Tree,
  HardHat,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

const INDUSTRY_ICONS: Record<string, Icon> = {
  solar: SunHorizon,
  roofing: HouseLine,
  electrical: Lightning,
  cleaning: Broom,
  plumbing: Drop,
  hvac: Fan,
  painting: PaintRoller,
  landscaping: Tree,
  building: HardHat,
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return createMetadata({
    title: `${industry.title} | Quotie`,
    description: industry.description,
    path: `/industries/${industry.slug}`,
    ogTag: industry.title,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  return (
    <>
      {/* Hero — tighter, gets to content faster */}
      <section className="relative pt-24 sm:pt-28 pb-8 sm:pb-10" style={{ background: "#08080c" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, rgba(57,185,229,0.2) 50%, transparent 70%)",
            }}
          />
        </div>

        <Container className="relative z-10">
          {/* Decorative industry icon */}
          {(() => {
            const HeroIcon = INDUSTRY_ICONS[industry.slug];
            return HeroIcon ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none" style={{ right: "clamp(40px, 5vw, 120px)" }}>
                <HeroIcon
                  weight="duotone"
                  className="text-brand-cyan/[0.07]"
                  style={{ width: "clamp(200px, 20vw, 320px)", height: "clamp(200px, 20vw, 320px)" }}
                />
              </div>
            ) : null;
          })()}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-white/50 mb-5">
              {industry.name} Quoting Software
            </div>

            <h1
              className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-5"
              style={{
                fontSize: "clamp(30px, 4.5vw, 58px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              {industry.heroHeadline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] to-brand-cyan bg-clip-text text-transparent">
                {industry.heroHeadline.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p
              className="text-white/50 max-w-xl mb-8"
              style={{ fontSize: "clamp(15px, 1.15vw, 18px)", lineHeight: 1.7 }}
            >
              {industry.heroSubheadline}
            </p>

          </div>
        </Container>
      </section>

      {/* Two-column: Pain Points + Features side by side */}
      <section
        className="py-12 sm:py-16 border-t border-white/[0.05]"
        style={{ background: "#08080c" }}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Pain Points */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">
                The problem
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 font-[family-name:var(--font-jakarta)]">
                Sound familiar?
              </h2>
              <div className="space-y-3">
                {industry.painPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <XCircle weight="duotone" className="w-5 h-5 text-red-400/70 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/50 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">
                The fix
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 font-[family-name:var(--font-jakarta)]">
                What Quotie gives you
              </h2>
              <div className="space-y-3">
                {industry.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <CheckCircle weight="duotone" className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/60 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Industry Content — detailed paragraphs */}
      {industry.content && industry.content.length > 0 && (
        <section
          className="py-16 sm:py-20 border-t border-white/[0.05]"
          style={{ background: "#08080c" }}
        >
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">
                Quotie for {industry.name}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-10 font-[family-name:var(--font-jakarta)]">
                How it works for{" "}
                <span className="bg-gradient-to-r from-[#3b82f6] to-brand-cyan bg-clip-text text-transparent">
                  {industry.name.toLowerCase()} businesses
                </span>
              </h2>

              <div className="space-y-8">
                {industry.content.map((section, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-jakarta)]">
                      {section.heading}
                    </h3>
                    <p className="text-white/45 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Showcase */}
      {industry.showcaseId && industry.showcasePages && (
        <section
          className="py-16 sm:py-20 border-t border-white/[0.05]"
          style={{ background: "#08080c" }}
        >
          <Container>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">
                Real quotes
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-[family-name:var(--font-jakarta)]">
                What a {industry.name.toLowerCase()} proposal looks like
              </h2>
              <p className="text-sm text-white/35">
                Professional, branded, and built to win jobs.
              </p>
            </div>

            <div className="relative">
              <div className="flex gap-3 overflow-hidden justify-center">
                {Array.from({
                  length: Math.min(industry.showcasePages!, 5),
                }).map((_, i) => {
                  const pageNum = i + 1;
                  const padded = industry.showcasePad
                    ? String(pageNum).padStart(2, "0")
                    : String(pageNum);
                  const src = `/showcase/${industry.showcaseId}/page-${padded}.webp`;

                  return (
                    <div
                      key={i}
                      className="relative flex-shrink-0 w-40 sm:w-48 rounded-lg overflow-hidden border border-white/[0.08]"
                      style={{
                        transform: `rotate(${(i - 2) * 1.5}deg)`,
                        opacity: 1 - Math.abs(i - 2) * 0.15,
                      }}
                    >
                      <Image
                        src={src}
                        alt={`${industry.name} proposal page ${pageNum}`}
                        width={384}
                        height={512}
                        className="w-full aspect-[3/4] object-cover object-top blur-[4px]"
                      />
                      {i !== 2 && (
                        <div
                          className="absolute inset-0"
                          style={{
                            backdropFilter: `blur(${Math.abs(i - 2) * 2}px)`,
                            background: "rgba(8,8,12,0.2)",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08080c] to-transparent pointer-events-none" />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/30">
                {industry.showcasePages}-page professional proposal
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Testimonial */}
      {industry.testimonial && (
        <section
          className="py-16 sm:py-20 border-t border-white/[0.05]"
          style={{ background: "#08080c" }}
        >
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    weight="duotone"
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <Quotes weight="duotone" className="w-8 h-8 text-white/10 mx-auto mb-4" />

              <blockquote className="text-xl sm:text-2xl font-medium text-white/80 leading-relaxed mb-8 font-[family-name:var(--font-jakarta)]">
                &ldquo;{industry.testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-white/[0.1] flex items-center justify-center text-sm font-bold text-white">
                  {industry.testimonial.author[0]}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">
                    {industry.testimonial.author}
                  </div>
                  <div className="text-xs text-white/40">
                    {industry.testimonial.role},{" "}
                    {industry.testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Stats + CTA buttons */}
      <section
        className="py-16 sm:py-20 border-t border-white/[0.05]"
        style={{ background: "#08080c" }}
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            {industry.stats && (
              <div className="grid grid-cols-3 gap-6 sm:gap-10 mb-10">
                {industry.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-jakarta)] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/30">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] text-[15px] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,232,237,0.1)]"
                style={{ background: "#e8e8ed", color: "#08080c" }}
              >
                Schedule a Demo
              </a>
              <a
                href="/pricing"
                className="text-[15px] transition-colors duration-300 hover:text-white/70"
                style={{ color: "rgba(232,232,237,0.4)" }}
              >
                See Pricing →
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Form */}
      <section
        className="py-16 sm:py-20 border-t border-white/[0.05]"
        style={{ background: "#08080c" }}
      >
        <Container>
          <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.3), transparent 60%)",
                }}
              />
            </div>

            <div className="relative z-10 px-6 sm:px-12 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-[family-name:var(--font-jakarta)]">
                  Ready to quote {industry.name.toLowerCase()} jobs faster?
                </h2>
                <p className="text-white/40 text-lg leading-relaxed">
                  Join {industry.name.toLowerCase()} businesses across Australia
                  and New Zealand who use Quotie to win more work.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
                <LeadCaptureForm
                  source={`industry_${industry.slug}_cta`}
                  compact
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
