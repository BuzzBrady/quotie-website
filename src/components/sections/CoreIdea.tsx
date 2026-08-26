"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Archive,
  PaperPlaneTilt,
  Signature,
  Bell,
  Briefcase,
  Cpu,
} from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

// 5 satellites, 72° apart, starting at the top.
const NODES = [
  { icon: Archive, label: "Stored & searchable", x: 50, y: 6 },
  { icon: PaperPlaneTilt, label: "Sent & tracked", x: 91, y: 36 },
  { icon: Signature, label: "Signed online", x: 76, y: 88 },
  { icon: Bell, label: "Followed up", x: 24, y: 88 },
  { icon: Briefcase, label: "Becomes a job", x: 9, y: 36 },
] as const;

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CoreIdea() {
  return (
    <section
      className="py-16 lg:py-24 border-t border-white/[0.04]"
      style={{ background: "#08080c" }}
    >
      <Container>
        <FadeIn>
          <SectionHeader
            badge="The whole platform"
            title="One simple idea. Everything else is built around it."
            gradient="Everything else is built around it."
            subtitle="Form in, quote out. That's the core of Quotie."
          />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-14 max-w-5xl mx-auto">
          {/* Orbital diagram */}
          <FadeIn delay={0.1}>
            <div className="relative mx-auto w-full max-w-md" style={{ aspectRatio: "1" }}>
              {/* Connector lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {NODES.map((n) => (
                  <line
                    key={n.label}
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.4"
                    strokeDasharray="1.5 1.5"
                  />
                ))}
              </svg>

              {/* Center node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-brand-blue/30 to-brand-cyan/30 blur-2xl" />
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex flex-col items-center justify-center text-center shadow-2xl shadow-brand-cyan/20">
                    <Cpu weight="duotone" className="w-7 h-7 text-white/90 mb-1.5" />
                    <div className="text-white font-bold text-[13px] leading-tight font-[family-name:var(--font-jakarta)] px-4">
                      Your pricing engine
                    </div>
                  </div>
                </div>
              </div>

              {/* Satellites */}
              {NODES.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/[0.1] bg-[#0d0d13] whitespace-nowrap shadow-lg shadow-black/40 transition-colors hover:border-brand-cyan/40">
                      <Icon weight="duotone" className="w-4 h-4 text-brand-cyan" />
                      <span className="text-[12px] font-semibold text-white/70">
                        {n.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* Copy */}
          <FadeIn delay={0.2}>
            <p className="text-white/50 leading-relaxed text-lg mb-5">
              Every quote you or your team generates is stored, tracked, and managed
              from the same place — so the system that{" "}
              <span className="text-white font-semibold">creates</span> your
              quotes is the same system that follows them up, gets them signed,
              and turns them into jobs.
            </p>
            <p className="text-white/50 leading-relaxed text-lg">
              No exporting, no copy-pasting between tools, no &ldquo;which
              version did we send?&rdquo; The quote is the centre of your
              business — so it&apos;s the centre of Quotie.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
