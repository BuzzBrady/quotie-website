import Link from "next/link";
import {
  Sun,
  House,
  Lightning,
  Sparkle,
  Drop,
  Wind,
  PaintBrush,
  Leaf,
  Hammer,
  ArrowRight,
} from "@phosphor-icons/react/ssr";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const industryData = [
  { slug: "solar", name: "Solar", icon: Sun, desc: "Complex solar system configurations built into beautiful, branded proposals." },
  { slug: "roofing", name: "Roofing", icon: House, desc: "Multi-section roof measuring, material options, and instant proposals." },
  { slug: "electrical", name: "Electrical", icon: Lightning, desc: "Accurate electrical quotes with automatic labour and materials calculations." },
  { slug: "cleaning", name: "Cleaning", icon: Sparkle, desc: "Service options and frequencies quoted professionally in under a minute." },
  { slug: "plumbing", name: "Plumbing", icon: Drop, desc: "On-site quoting with consistent pricing across your whole team." },
  { slug: "hvac", name: "HVAC", icon: Wind, desc: "System options, installation complexity, and warranty terms — one proposal." },
  { slug: "painting", name: "Painting", icon: PaintBrush, desc: "Quote different scopes and finishes with proposals that match your quality." },
  { slug: "landscaping", name: "Landscaping", icon: Leaf, desc: "Materials, labour, and project milestones in one professional quote." },
  { slug: "building", name: "Building", icon: Hammer, desc: "Multi-stage builds with consistent pricing and professional proposals." },
];

export default function IndustriesPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-12 lg:pb-16">
        <Container>
          <Eyebrow trail={`${industryData.length} trades`} className="mb-6 max-w-md">
            Built for Trades
          </Eyebrow>
          <h1 className="font-jakarta font-extrabold text-ink tracking-[-0.04em] leading-[1.03] text-[clamp(2.3rem,5vw,4.25rem)] max-w-3xl text-balance">
            Quoting software for{" "}
            <span className="mark-live mark-live-anim">every trade.</span>
          </h1>
          <p className="mt-6 text-ink-soft max-w-lg text-lg leading-relaxed text-pretty">
            Whether you&apos;re quoting solar systems or cleaning contracts, Quotie adapts to how your trade actually works.
          </p>
        </Container>
      </section>

      {/* The trades — a ledger, one line per industry */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <ul className="border-t-2 border-ink">
            {industryData.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <li key={industry.slug}>
                  <Reveal delay={Math.min(i, 5) * 0.04}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="group grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[56px_240px_minmax(0,1fr)_auto] gap-x-4 md:gap-x-6 gap-y-1.5 items-center py-5 md:py-6 border-b border-rule transition-colors duration-200 hover:bg-sheet md:px-3 md:-mx-3"
                    >
                      <span className="font-mono text-xs text-ink-faint tnum hidden md:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex items-center gap-3">
                        <Icon weight="duotone" className="w-6 h-6 text-brand-blue shrink-0" />
                        <span className="font-jakarta font-extrabold text-ink text-xl md:text-2xl tracking-[-0.03em] group-hover:text-brand-blue transition-colors">
                          {industry.name}
                        </span>
                      </span>
                      <span className="order-last col-span-2 md:order-none md:col-span-1 text-ink-soft text-[15px] leading-relaxed">
                        {industry.desc}
                      </span>
                      <ArrowRight
                        weight="bold"
                        className="w-4 h-4 text-ink-faint group-hover:text-brand-blue group-hover:translate-x-1 transition-[color,transform] duration-200"
                      />
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-sheet border-t border-rule">
        <Container className="py-20 lg:py-24">
          <div className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-end">
            <div>
              <h2 className="font-jakarta font-extrabold text-ink tracking-[-0.03em] leading-[1.08] text-[clamp(1.9rem,4vw,3rem)]">
                Don&apos;t see your trade?
              </h2>
              <p className="mt-4 text-ink-soft max-w-md text-lg leading-relaxed text-pretty">
                Quotie works for any service business that needs to quote. If your
                trade isn&apos;t listed, we&apos;d still love to show you how it works.
              </p>
            </div>
            <ButtonLink href="/demo" variant="ink" size="lg">
              Schedule a Demo
              <ArrowRight weight="bold" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </div>
  );
}
