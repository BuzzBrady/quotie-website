import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import LeadCaptureForm from "@/components/lead-capture/LeadCaptureForm";
import { industries, getIndustry } from "../_data/industries";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import {
  CheckCircle,
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

  const HeroIcon = INDUSTRY_ICONS[industry.slug];
  const headlineWords = industry.heroHeadline.split(" ");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-paper pt-28 sm:pt-32 lg:pt-40 pb-12 lg:pb-16 overflow-hidden">
        <Container className="relative">
          {HeroIcon && (
            <HeroIcon
              weight="duotone"
              aria-hidden
              className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-brand-blue/[0.09] pointer-events-none select-none"
              style={{ width: "clamp(200px, 20vw, 300px)", height: "clamp(200px, 20vw, 300px)" }}
            />
          )}
          <div className="relative max-w-3xl">
            <Eyebrow className="mb-6">{industry.name} Quoting Software</Eyebrow>

            <h1 className="font-jakarta font-extrabold text-ink tracking-[-0.04em] leading-[1.05] text-[clamp(2.1rem,4.6vw,3.75rem)] text-balance">
              {headlineWords.slice(0, -2).join(" ")}{" "}
              <span className="mark-live mark-live-anim">
                {headlineWords.slice(-2).join(" ")}
              </span>
            </h1>

            <p className="mt-6 text-ink-soft max-w-xl text-lg leading-relaxed text-pretty">
              {industry.heroSubheadline}
            </p>
          </div>
        </Container>
      </section>

      {/* Pain points + features, side by side */}
      <section className="bg-sheet border-y border-rule py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <Eyebrow className="mb-4">The problem</Eyebrow>
              <h2 className="font-jakarta font-extrabold text-ink text-2xl sm:text-3xl tracking-[-0.03em] mb-6">
                Sound familiar?
              </h2>
              <ul className="border-t-2 border-ink">
                {industry.painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 py-4 border-b border-rule">
                    <XCircle weight="fill" className="w-5 h-5 text-red-600/80 flex-shrink-0 mt-0.5" />
                    <p className="text-[15px] text-ink-soft leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow className="mb-4">The fix</Eyebrow>
              <h2 className="font-jakarta font-extrabold text-ink text-2xl sm:text-3xl tracking-[-0.03em] mb-6">
                What Quotie gives you
              </h2>
              <ul className="border-t-2 border-ink">
                {industry.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 py-4 border-b border-rule">
                    <CheckCircle weight="fill" className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <p className="text-[15px] text-ink leading-relaxed">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Industry content — detailed paragraphs */}
      {industry.content && industry.content.length > 0 && (
        <section className="bg-paper py-20 lg:py-24">
          <Container>
            <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-28">
                <Eyebrow className="mb-5">Quotie for {industry.name}</Eyebrow>
                <h2 className="font-jakarta font-extrabold text-ink tracking-[-0.03em] leading-[1.1] text-[clamp(1.75rem,3.4vw,2.6rem)] text-balance">
                  How it works for{" "}
                  <span className="mark-live">
                    {industry.name.toLowerCase()} businesses
                  </span>
                </h2>
              </div>

              <div className="border-t-2 border-ink">
                {industry.content.map((section, i) => (
                  <Reveal key={i}>
                    <div className="py-7 border-b border-rule">
                      <h3 className="font-jakarta font-bold text-ink text-xl tracking-[-0.02em] mb-2">
                        {section.heading}
                      </h3>
                      <p className="text-ink-soft leading-relaxed text-pretty">
                        {section.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Showcase — real proposal pages, blurred for customer privacy */}
      {industry.showcaseId && industry.showcasePages && (
        <section className="bg-deep py-20 lg:py-24 overflow-hidden">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow dark trail={`${industry.showcasePages} pages`} className="mb-5">
                Real quotes
              </Eyebrow>
              <h2 className="font-jakarta font-extrabold text-white tracking-[-0.03em] leading-[1.1] text-[clamp(1.75rem,3.4vw,2.6rem)] mb-3">
                What a {industry.name.toLowerCase()} proposal looks like
              </h2>
              <p className="text-white/60">
                Professional, branded, and built to win jobs.
              </p>
            </div>

            <div className="mt-10 -mx-5 sm:-mx-8 px-5 sm:px-8 flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-4">
              {Array.from({
                length: Math.min(industry.showcasePages!, 5),
              }).map((_, i) => {
                const pageNum = i + 1;
                const padded = industry.showcasePad
                  ? String(pageNum).padStart(2, "0")
                  : String(pageNum);
                const src = `/showcase/${industry.showcaseId}/page-${padded}.webp`;

                return (
                  <figure key={i} className="flex-shrink-0 w-44 sm:w-52 lg:flex-1 lg:w-auto">
                    <div className="rounded-md overflow-hidden bg-white ring-1 ring-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                      <Image
                        src={src}
                        alt={`${industry.name} proposal page ${pageNum}`}
                        width={384}
                        height={512}
                        className="w-full aspect-[3/4] object-cover object-top blur-[6px] scale-[1.04]"
                      />
                    </div>
                    <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                      Page {String(pageNum).padStart(2, "0")}
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
              {industry.showcasePages}-page professional proposal
            </p>
          </Container>
        </section>
      )}

      {/* Testimonial */}
      {industry.testimonial && (
        <section className="bg-sheet border-b border-rule py-20 lg:py-24">
          <Container>
            <figure className="max-w-4xl border-t-2 border-ink pt-8">
              <Eyebrow className="mb-6">Reference</Eyebrow>
              <blockquote className="font-jakarta font-semibold text-ink text-xl sm:text-2xl lg:text-[28px] leading-[1.35] tracking-[-0.02em] text-pretty">
                &ldquo;{industry.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-ink-soft">
                <span className="font-semibold text-ink">
                  {industry.testimonial.author}
                </span>{" "}
                — {industry.testimonial.role}, {industry.testimonial.company}
              </figcaption>
            </figure>
          </Container>
        </section>
      )}

      {/* Stats + CTA buttons */}
      <section className="bg-paper py-20 lg:py-24">
        <Container>
          {industry.stats && (
            <dl className="grid grid-cols-3 border-t-2 border-ink mb-10">
              {industry.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-6 border-b border-rule ${
                    i > 0 ? "pl-3 sm:pl-6 border-l" : ""
                  } pr-2`}
                >
                  <dd className="font-jakarta font-extrabold text-ink text-[26px] sm:text-5xl tracking-[-0.04em] tnum">
                    {stat.value}
                  </dd>
                  <dt className="mt-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.12em] text-ink-faint">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/demo" variant="ink" size="lg">
              Schedule a Demo
            </ButtonLink>
            <a
              href="/pricing"
              className="text-[15px] font-semibold text-ink hover:text-brand-blue transition-colors"
            >
              See Pricing →
            </a>
          </div>
        </Container>
      </section>

      {/* CTA form */}
      <section className="bg-deep py-20 lg:py-24">
        <Container>
          <div className="sheet rounded-xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-cyan" />
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-7 sm:p-10 lg:p-14 lg:border-r border-rule flex flex-col justify-center">
                <h2 className="font-jakarta font-extrabold text-ink tracking-[-0.03em] leading-[1.08] text-[clamp(1.9rem,3.6vw,2.75rem)] text-balance mb-4">
                  Ready to quote {industry.name.toLowerCase()} jobs faster?
                </h2>
                <p className="text-ink-soft text-lg leading-relaxed text-pretty">
                  Join {industry.name.toLowerCase()} businesses across Australia
                  and New Zealand who use Quotie to win more work.
                </p>
              </div>

              <div className="p-7 sm:p-10 lg:p-14 bg-paper/60">
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
