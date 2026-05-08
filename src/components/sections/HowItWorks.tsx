"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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

function RightCard({
  stat,
  index,
  onVisible,
}: {
  stat: (typeof STATS)[number];
  index: number;
  onVisible: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) onVisible(index);
  }, [isInView, index, onVisible]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`p-8 rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.accent} backdrop-blur-sm`}
    >
      <div
        className={`text-5xl font-extrabold font-[family-name:var(--font-jakarta)] ${stat.color} mb-3`}
      >
        {stat.value}
      </div>
      <div className="text-white font-semibold text-lg mb-2">{stat.label}</div>
      <div className="text-white/50 leading-relaxed">{stat.detail}</div>
    </motion.div>
  );
}

function DesktopHowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = STATS[activeIndex];

  return (
    <div className="hidden lg:grid lg:grid-cols-2 gap-16">
      {/* Left: single active stat, centered */}
      <div
        className="sticky top-32 self-start flex items-center justify-center"
        style={{ height: "360px" }}
      >
        <div className="text-center transition-all duration-500">
          <div
            key={active.value}
            className="animate-[fadeSlideIn_0.4s_ease-out]"
          >
            <div
              className={`text-7xl font-extrabold font-[family-name:var(--font-jakarta)] ${active.color} mb-3`}
            >
              {active.value}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {active.label}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {STATS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 h-2 bg-gradient-to-r from-brand-blue to-brand-cyan"
                    : "w-2 h-2 bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: cards that scroll naturally */}
      <div className="space-y-8">
        {STATS.map((stat, i) => (
          <RightCard
            key={stat.label}
            stat={stat}
            index={i}
            onVisible={setActiveIndex}
          />
        ))}
      </div>
    </div>
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
    <section className="py-16 lg:py-24" style={{ background: "#08080c" }}>
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
