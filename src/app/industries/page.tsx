import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { industries } from "./_data/industries";
import {
  Sun,
  Home,
  Zap,
  Sparkles,
  Droplets,
  Wind,
  Paintbrush,
  Leaf,
  HardHat,
  ArrowRight,
} from "lucide-react";

export const metadata = createMetadata({
  title: "Quoting Software by Industry | Quotie",
  description:
    "Quotie is built for Australian and NZ trades businesses. Find quoting software tailored for solar, roofing, electrical, cleaning, plumbing, HVAC, painting, landscaping, and building.",
  path: "/industries",
});

const industryIcons: Record<string, React.ReactNode> = {
  solar: <Sun className="w-6 h-6" />,
  roofing: <Home className="w-6 h-6" />,
  electrical: <Zap className="w-6 h-6" />,
  cleaning: <Sparkles className="w-6 h-6" />,
  plumbing: <Droplets className="w-6 h-6" />,
  hvac: <Wind className="w-6 h-6" />,
  painting: <Paintbrush className="w-6 h-6" />,
  landscaping: <Leaf className="w-6 h-6" />,
  building: <HardHat className="w-6 h-6" />,
};

const industryDescriptions: Record<string, string> = {
  solar:
    "Complex solar system configurations built into beautiful, branded proposals.",
  roofing:
    "Multi-section roof measuring, material options, and instant proposals.",
  electrical:
    "Itemised electrical quotes with labour, materials, and compliance notes.",
  cleaning:
    "Recurring service contracts and one-off cleans quoted in under a minute.",
  plumbing:
    "Emergency and scheduled job pricing with on-site quote and send.",
  hvac: "System sizing, installation complexity, and warranty terms — all in one.",
  painting:
    "Room-by-room quoting with paint types, prep, and professional proposals.",
  landscaping:
    "Materials, labour, and staged milestones for any landscaping project.",
  building:
    "Multi-stage builds, subcontractor costs, and variation management.",
};

export default function IndustriesPage() {
  return (
    <>
      <section
        className="relative pt-32 pb-20"
        style={{ background: "#08080c" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        <Container className="relative z-10">
          <SectionHeader
            badge="Built for Trades"
            title="Quoting software for every trade"
            gradient="every trade"
            subtitle="Whether you're quoting solar systems or cleaning contracts, Quotie adapts to how your trade actually works."
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry) => (
              <a
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-white/[0.08] text-brand-cyan">
                    {industryIcons[industry.slug]}
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-jakarta)]">
                  {industry.name}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {industryDescriptions[industry.slug]}
                </p>

                <div className="mt-4 text-xs font-medium text-blue-400/70 group-hover:text-blue-400 transition-colors duration-200">
                  Learn more →
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="py-20 border-t border-white/[0.05]"
        style={{ background: "#08080c" }}
      >
        <Container>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-[family-name:var(--font-jakarta)]">
              Don&apos;t see your trade?
            </h2>
            <p className="text-white/40 max-w-md mx-auto mb-8">
              Quotie works for any service business. If your trade isn&apos;t
              listed, we&apos;d still love to show you how it can work for you.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] text-[15px] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,232,237,0.1)]"
              style={{ background: "#e8e8ed", color: "#08080c" }}
            >
              Schedule a Demo
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
