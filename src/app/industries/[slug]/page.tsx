import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import LeadCaptureForm from "@/components/lead-capture/LeadCaptureForm";
import { industries, getIndustry } from "../_data/industries";
import { CheckCircle2, Quote, Star } from "lucide-react";

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
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-center pt-32 pb-20"
        style={{ background: "#08080c" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, rgba(57,185,229,0.2) 50%, transparent 70%)",
            }}
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-white/50 mb-6"
            >
              {industry.name} Quoting Software
            </div>

            <h1
              className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 68px)",
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
              }}
            >
              {industry.heroHeadline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] to-brand-cyan bg-clip-text text-transparent">
                {industry.heroHeadline.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p
              className="text-white/50 max-w-xl mb-10"
              style={{ fontSize: "clamp(15px, 1.2vw, 19px)", lineHeight: 1.7 }}
            >
              {industry.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
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

          {/* Stats */}
          {industry.stats && (
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl">
              {industry.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-white font-[family-name:var(--font-jakarta)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/30">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Pain Points */}
      <section
        className="py-20 border-t border-white/[0.05]"
        style={{ background: "#08080c" }}
      >
        <Container>
          <SectionHeader
            badge="Sound familiar?"
            title="The problems we solve"
            subtitle={`Every ${industry.name.toLowerCase()} business faces these challenges. Quotie fixes them.`}
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {industry.painPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                  <span className="text-red-400 text-xs font-bold">✕</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section
        className="py-20 border-t border-white/[0.05]"
        style={{ background: "#08080c" }}
      >
        <Container>
          <SectionHeader
            badge="Built for your trade"
            title="Everything you need to quote faster"
            gradient="quote faster"
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industry.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/70 leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Showcase */}
      {industry.showcaseId && industry.showcasePages && (
        <section
          className="py-20 border-t border-white/[0.05]"
          style={{ background: "#08080c" }}
        >
          <Container>
            <SectionHeader
              badge="Real quotes"
              title={`What a ${industry.name.toLowerCase()} proposal looks like`}
              subtitle="Professional, branded, and built to win jobs."
            />

            <div className="mt-12 relative">
              <div className="flex gap-3 overflow-hidden justify-center">
                {Array.from({
                  length: Math.min(industry.showcasePages, 5),
                }).map((_, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0 w-40 sm:w-48 rounded-lg overflow-hidden border border-white/[0.08]"
                    style={{
                      transform: `rotate(${(i - 2) * 1.5}deg)`,
                      opacity: 1 - Math.abs(i - 2) * 0.15,
                    }}
                  >
                    <div
                      className="w-full aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"
                      style={{ minHeight: 192 }}
                    >
                      <div className="text-center px-4">
                        <div className="w-8 h-8 rounded bg-blue-500/20 mx-auto mb-2" />
                        <div className="space-y-1.5">
                          <div className="h-1.5 bg-white/10 rounded w-full" />
                          <div className="h-1.5 bg-white/10 rounded w-3/4 mx-auto" />
                          <div className="h-1.5 bg-white/10 rounded w-5/6" />
                          <div className="h-1.5 bg-white/05 rounded w-full mt-3" />
                          <div className="h-1.5 bg-white/05 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                    {/* Blur overlay on outer pages */}
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
                ))}
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
          className="py-20 border-t border-white/[0.05]"
          style={{ background: "#08080c" }}
        >
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <Quote className="w-8 h-8 text-white/10 mx-auto mb-4" />

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

      {/* CTA */}
      <section
        className="py-20 border-t border-white/[0.05]"
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
