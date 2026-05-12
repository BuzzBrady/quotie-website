"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "@phosphor-icons/react";
import Container from "@/components/ui/Container";

const industryData = [
  { slug: "solar", name: "Solar", icon: Sun, color: "#f59e0b", desc: "Complex solar system configurations built into beautiful, branded proposals." },
  { slug: "roofing", name: "Roofing", icon: House, color: "#ef4444", desc: "Multi-section roof measuring, material options, and instant proposals." },
  { slug: "electrical", name: "Electrical", icon: Lightning, color: "#3b82f6", desc: "Accurate electrical quotes with automatic labour and materials calculations." },
  { slug: "cleaning", name: "Cleaning", icon: Sparkle, color: "#8b5cf6", desc: "Service options and frequencies quoted professionally in under a minute." },
  { slug: "plumbing", name: "Plumbing", icon: Drop, color: "#06b6d4", desc: "On-site quoting with consistent pricing across your whole team." },
  { slug: "hvac", name: "HVAC", icon: Wind, color: "#10b981", desc: "System options, installation complexity, and warranty terms — one proposal." },
  { slug: "painting", name: "Painting", icon: PaintBrush, color: "#ec4899", desc: "Quote different scopes and finishes with proposals that match your quality." },
  { slug: "landscaping", name: "Landscaping", icon: Leaf, color: "#22c55e", desc: "Materials, labour, and project milestones in one professional quote." },
  { slug: "building", name: "Building", icon: Hammer, color: "#f97316", desc: "Multi-stage builds with consistent pricing and professional proposals." },
];

export default function IndustriesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const isHovering = hoveredIndex !== null;
  const activeIndex = isHovering ? hoveredIndex : autoIndex;
  const active = industryData[activeIndex];

  const isHoveringRef = useRef(isHovering);
  isHoveringRef.current = isHovering;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHoveringRef.current) {
        setAutoIndex((prev) => (prev + 1) % industryData.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "#08080c" }} className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-20">
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-15 blur-[150px]"
            style={{ background: `radial-gradient(circle, ${active?.color || "rgba(59,130,246,0.4)"} 0%, transparent 70%)`, transition: "background 0.5s ease" }}
          />
        </div>
        <Container className="relative z-10 pt-16 sm:pt-24 lg:pt-36 pb-8 sm:pb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm font-semibold text-white/40 mb-6">
            Built for Trades
          </div>
          <h1
            className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-5 max-w-3xl mx-auto"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            Quoting software for{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              every trade.
            </span>
          </h1>
          <p className="text-white/40 max-w-lg mx-auto text-lg leading-relaxed">
            Whether you&apos;re quoting solar systems or cleaning contracts, Quotie adapts to how your trade actually works.
          </p>
        </Container>
      </section>

      {/* Orbital layout */}
      <section className="pb-24 lg:pb-32">
        <Container>
          {/* Desktop: orbital ring */}
          <div className="hidden lg:block relative mx-auto" style={{ width: "700px", height: "700px" }}>
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center w-64">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="text-3xl font-extrabold font-[family-name:var(--font-jakarta)] mb-3"
                      style={{ color: active.color }}
                    >
                      {active.name}
                    </div>
                    <p className="text-white/45 text-sm leading-relaxed mb-5">
                      {active.desc}
                    </p>
                    <Link
                      href={`/industries/${active.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                      style={{ color: active.color }}
                    >
                      Learn more
                      <ArrowRight weight="duotone" className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Orbit ring */}
            <div
              className="absolute inset-8 rounded-full border border-white/[0.04]"
            />

            {/* Industry circles */}
            {industryData.map((industry, i) => {
              const Icon = industry.icon;
              const angle = (i / industryData.length) * 360 - 90;
              const radius = 290;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const isActive = activeIndex === i;

              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="absolute group"
                  style={{
                    left: `calc(50% + ${x}px - 40px)`,
                    top: `calc(50% + ${y}px - 40px)`,
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-300 border"
                    style={{
                      background: isActive ? `${industry.color}15` : "rgba(255,255,255,0.02)",
                      borderColor: isActive ? `${industry.color}40` : "rgba(255,255,255,0.07)",
                      transform: isActive ? "scale(1.15)" : "scale(1)",
                      boxShadow: isActive ? `0 0 40px ${industry.color}20` : "none",
                    }}
                  >
                    <Icon
                      weight="duotone"
                      className="w-5 h-5 mb-1 transition-colors duration-300"
                      style={{ color: isActive ? industry.color : "rgba(255,255,255,0.35)" }}
                    />
                    <span
                      className="text-[10px] font-semibold transition-colors duration-300"
                      style={{ color: isActive ? industry.color : "rgba(255,255,255,0.3)" }}
                    >
                      {industry.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile: vertical list with colored accents */}
          <div className="lg:hidden space-y-3">
            {industryData.map((industry) => {
              const Icon = industry.icon;
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300"
                    style={{
                      background: `${industry.color}10`,
                      borderColor: `${industry.color}25`,
                    }}
                  >
                    <Icon weight="duotone" className="w-5 h-5" style={{ color: industry.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm mb-0.5">{industry.name}</div>
                    <div className="text-white/35 text-xs truncate">{industry.desc}</div>
                  </div>
                  <ArrowRight weight="duotone" className="w-4 h-4 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/[0.05]">
        <Container className="py-20">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-[family-name:var(--font-jakarta)]">
              Don&apos;t see your trade?
            </h2>
            <p className="text-white/40 max-w-md mx-auto mb-8">
              Quotie works for any service business that needs to quote. If your
              trade isn&apos;t listed, we&apos;d still love to show you how it works.
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
    </div>
  );
}
