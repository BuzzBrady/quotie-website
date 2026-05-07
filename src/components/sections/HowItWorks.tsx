"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const STATS = [
  {
    value: "$360k+",
    label: "Revenue Closed in One Month",
    detail:
      "One Quotie customer closed over $360,000 in a single month — tracked entirely through the platform.",
    color: "text-emerald-400",
    accent: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
  },
  {
    value: "4hrs",
    label: "Saved Per Quote Day",
    detail:
      "Businesses report saving 4+ hours every day they send quotes — no more manual PDF wrangling.",
    color: "text-blue-400",
    accent: "from-blue-500/20 to-blue-700/20",
    border: "border-blue-500/20",
  },
  {
    value: "8+",
    label: "Options Per Client, in Minutes",
    detail:
      "Send 8 or more distinct proposal options to a single client — all generated and sent in minutes.",
    color: "text-indigo-400",
    accent: "from-indigo-500/20 to-violet-500/20",
    border: "border-indigo-500/20",
  },
  {
    value: "<30s",
    label: "From Enquiry to Inbox",
    detail:
      "From the moment you open Quotie to the moment your client receives a branded PDF — under 30 seconds.",
    color: "text-cyan-400",
    accent: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
  },
] as const;

function DesktopHowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div
      ref={containerRef}
      className="hidden lg:grid lg:grid-cols-2 gap-16"
      style={{ minHeight: `${STATS.length * 40}vh` }}
    >
      {/* Left: scroll-driven list */}
      <div className="sticky top-32 self-start space-y-4">
        {STATS.map((stat, i) => {
          return (
            <ScrollStat
              key={stat.label}
              stat={stat}
              index={i}
              total={STATS.length}
              progress={scrollYProgress}
            />
          );
        })}
      </div>

      {/* Right: big card deck */}
      <div className="space-y-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`p-8 rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.accent} backdrop-blur-sm`}
          >
            <div
              className={`text-5xl font-extrabold font-[family-name:var(--font-jakarta)] ${stat.color} mb-3`}
            >
              {stat.value}
            </div>
            <div className="text-white font-semibold text-lg mb-2">
              {stat.label}
            </div>
            <div className="text-white/50 leading-relaxed">{stat.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScrollStat({
  stat,
  index,
  total,
  progress,
}: {
  stat: (typeof STATS)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 0.5) / total, (index + 1) / total],
    [0.3, 1, 0.3]
  );
  const x = useTransform(
    progress,
    [index / total, (index + 0.5) / total],
    [-10, 0]
  );

  return (
    <motion.div style={{ opacity, x }} className="flex items-center gap-4">
      <div
        className={`w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-b ${stat.accent}`}
      />
      <div>
        <span className={`font-bold ${stat.color} mr-2`}>{stat.value}</span>
        <span className="text-white/60 text-sm">{stat.label}</span>
      </div>
    </motion.div>
  );
}

function MobileHowItWorks() {
  return (
    <div className="lg:hidden space-y-4">
      {STATS.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.accent}`}
        >
          <div
            className={`text-4xl font-extrabold font-[family-name:var(--font-jakarta)] ${stat.color} mb-2`}
          >
            {stat.value}
          </div>
          <div className="text-white font-semibold mb-1">{stat.label}</div>
          <div className="text-white/50 text-sm leading-relaxed">
            {stat.detail}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#08080c" }}>
      <Container>
        <div className="mb-16">
          <SectionHeader
            badge="Proof, Not Promises"
            title="Numbers don't lie. Neither do results."
            gradient="Neither do results."
          />
        </div>

        <DesktopHowItWorks />
        <MobileHowItWorks />
      </Container>
    </section>
  );
}
