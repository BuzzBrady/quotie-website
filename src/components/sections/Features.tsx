"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
} from "framer-motion";
import {
  Layers,
  Zap,
  BarChart3,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const FEATURES = [
  {
    icon: Layers,
    accent: "#f59e0b",
    accentBg: "from-amber-500/20 to-orange-500/20",
    title: "Multiple options. One proposal.",
    description:
      "Give clients a Bronze, Silver, and Gold option — all in a single, beautifully branded PDF. No more sending three separate quotes.",
    visual: (
      <div className="space-y-3">
        {["Bronze — $4,200", "Silver — $6,800", "Gold — $9,500"].map(
          (tier, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
            >
              <span className="text-sm text-white/70">{tier.split("—")[0].trim()}</span>
              <span className="text-sm font-bold text-amber-400">
                {tier.split("—")[1].trim()}
              </span>
            </div>
          )
        )}
        <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
          <span className="text-xs text-amber-400 font-semibold">
            PDF GENERATED
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    accent: "#3b82f6",
    accentBg: "from-blue-500/20 to-blue-700/20",
    title: "Quote in under 30 seconds.",
    description:
      "Fill in the form — your pricing engine handles the rest. Every field, calculation, and option tier is pre-built and ready to fire.",
    visual: (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-white/60">Customer details filled</span>
          <span className="ml-auto text-blue-400 text-xs font-bold">3s</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="text-sm text-white/60">Options selected</span>
          <span className="ml-auto text-blue-400 text-xs font-bold">8s</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm text-white/60">PDF sent to client</span>
          <span className="ml-auto text-emerald-400 text-xs font-bold">28s</span>
        </div>
      </div>
    ),
  },
  {
    icon: BarChart3,
    accent: "#8b5cf6",
    accentBg: "from-indigo-500/20 to-violet-500/20",
    title: "Every quote tracked. Every follow-up scheduled.",
    description:
      "Never lose a lead again. Your pipeline shows every quote's status, follow-up due dates, and revenue potential at a glance.",
    visual: (
      <div className="space-y-2">
        {[
          { label: "Sent", count: 12, color: "bg-blue-500" },
          { label: "Opened", count: 9, color: "bg-indigo-500" },
          { label: "Follow-up due", count: 4, color: "bg-violet-500" },
          { label: "Won", count: 6, color: "bg-emerald-500" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-28 text-xs text-white/50">{item.label}</span>
            <div className="flex-1 h-2 rounded-full bg-white/[0.05]">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.count / 12) * 100}%` }}
              />
            </div>
            <span className="w-6 text-xs text-white/40 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: LayoutDashboard,
    accent: "#10b981",
    accentBg: "from-emerald-500/20 to-teal-500/20",
    title: "Know your real numbers.",
    description:
      "See revenue closed, average deal size, conversion rate, and more — all in real time. No spreadsheets required.",
    visual: (
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Revenue (MTD)", value: "$124k", color: "text-emerald-400" },
          { label: "Avg deal", value: "$8,400", color: "text-teal-400" },
          { label: "Conversion", value: "62%", color: "text-emerald-400" },
          { label: "Open pipeline", value: "$340k", color: "text-teal-300" },
        ].map((m) => (
          <div
            key={m.label}
            className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
          >
            <div className={`text-xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: FileText,
    accent: "#39b9e5",
    accentBg: "from-cyan-500/20 to-blue-500/20",
    title: "Your brand on every page.",
    description:
      "Logo, colours, cover pages, and custom fields — every quote looks like it came from a premium business. Not a template.",
    visual: (
      <div className="rounded-xl overflow-hidden border border-white/[0.08]">
        <div
          className="h-10 flex items-center px-4 gap-2"
          style={{ background: "rgba(57,185,229,0.15)" }}
        >
          <div className="w-4 h-4 rounded-sm bg-cyan-400/60" />
          <span className="text-xs text-cyan-300 font-bold">ACME SOLAR</span>
          <span className="ml-auto text-xs text-white/30">QUOTE #1042</span>
        </div>
        <div className="p-3 space-y-2 bg-white/[0.02]">
          <div className="h-2 rounded-full bg-white/[0.08] w-3/4" />
          <div className="h-2 rounded-full bg-white/[0.05] w-full" />
          <div className="h-2 rounded-full bg-white/[0.05] w-5/6" />
          <div className="h-2 rounded-full bg-white/[0.05] w-2/3" />
        </div>
      </div>
    ),
  },
] as const;

function FeatureCard({
  feature,
  index,
  progress,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = feature.icon;

  const scale = useTransform(
    progress,
    [index / FEATURES.length, (index + 1) / FEATURES.length],
    [1, 0.94]
  );
  const opacity = useTransform(
    progress,
    [index / FEATURES.length, (index + 0.8) / FEATURES.length],
    [1, 0.6]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
        top: `${80 + index * 24}px`,
        zIndex: index,
      }}
      className="sticky"
    >
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: content */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accentBg} border border-white/[0.08] mb-5`}
            >
              <Icon className="w-6 h-6" style={{ color: feature.accent }} />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 font-[family-name:var(--font-jakarta)]">
              {feature.title}
            </h3>
            <p className="text-white/50 leading-relaxed">{feature.description}</p>
          </div>

          {/* Right: visual */}
          <div className="p-8 lg:p-10 flex items-center border-l border-white/[0.05]">
            <div className="w-full">{feature.visual}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="features"
      className="py-24 lg:py-32"
      style={{ background: "#08080c" }}
    >
      <Container>
        <div className="mb-16">
          <SectionHeader
            badge="Why Quotie?"
            badgeIcon={
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
              </span>
            }
            title="Everything between the enquiry and the handshake."
            gradient="and the handshake."
          />
        </div>

        <div
          ref={containerRef}
          style={{ height: `${FEATURES.length * 60}vh` }}
          className="relative"
        >
          <div className="sticky top-0 pt-8 pb-32">
            <div className="space-y-6">
              {FEATURES.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
