"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Zap, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" style={{ background: "#08080c" }}>
      {/* Section header */}
      <Container className="pt-24 lg:pt-32 pb-16 text-center">
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
      </Container>

      {/* Feature 1: Multi-option — full width */}
      <div className="border-t border-white/[0.04]">
        <Container className="py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-6">
                <Layers className="w-3.5 h-3.5" />
                Multi-Option Proposals
              </div>
              <h3
                className="font-[family-name:var(--font-jakarta)] font-extrabold text-white mb-5"
                style={{ fontSize: "clamp(26px, 5vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                One proposal.
                <br />
                <span className="text-white/40">Multiple ways to say yes.</span>
              </h3>
              <p className="text-white/45 leading-relaxed mb-6 max-w-md">
                Send up to 4 options in a single quote group. Your client picks
                what works — no more sending separate quotes and hoping they
                open the right one.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Up to 4 pricing tiers in one quote group",
                  "Each option is a full branded PDF",
                  "Bundle and send in one email",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-amber-400" />
                    </div>
                    <span className="text-white/50 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-3xl blur-2xl" />
                <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Basic", price: "$18,400", items: ["13kW Solar", "10kW Inverter", "16kWh Battery"], rec: false },
                    { label: "Recommended", price: "$23,100", items: ["13kW Solar", "10kW Inverter", "32kWh Battery"], rec: true },
                    { label: "Premium", price: "$26,900", items: ["15kW Solar", "15kW Inverter", "32kWh Battery"], rec: false },
                  ].map((tier, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                        tier.rec
                          ? "bg-gradient-to-b from-amber-500/10 to-orange-500/5 border-amber-500/30 shadow-xl shadow-amber-500/5 scale-[1.03] z-10"
                          : "bg-white/[0.03] border-white/[0.07]"
                      }`}
                    >
                      {tier.rec && (
                        <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">Best Value</div>
                      )}
                      <div className={`text-xs font-semibold mb-1 ${tier.rec ? "text-white" : "text-white/50"}`}>{tier.label}</div>
                      <div className={`text-xl sm:text-2xl font-extrabold mb-3 font-[family-name:var(--font-jakarta)] ${tier.rec ? "text-white" : "text-white/70"}`}>{tier.price}</div>
                      <div className="space-y-1.5">
                        {tier.items.map((item, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${tier.rec ? "bg-amber-400" : "bg-white/20"}`} />
                            <span className={`text-[11px] ${tier.rec ? "text-white/70" : "text-white/35"}`}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>

      {/* Feature 2: Speed — reversed, with timeline */}
      <div className="border-t border-white/[0.04]">
        <Container className="py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Timeline visual — left on desktop */}
            <FadeIn className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl blur-2xl" />
                <div className="relative space-y-0">
                  {[
                    { time: "0s", label: "Open Quotie", sub: "Select template, enter client", color: "bg-blue-500", line: true },
                    { time: "8s", label: "Fill the form", sub: "Dropdowns, options, quantities", color: "bg-blue-400", line: true },
                    { time: "12s", label: "PDF generated", sub: "Branded, calculated, ready", color: "bg-indigo-400", line: true },
                    { time: "22s", label: "Email composed", sub: "Template + attachments", color: "bg-violet-400", line: true },
                    { time: "28s", label: "Client has it", sub: "Branded proposal in their inbox", color: "bg-emerald-400", line: false },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${step.color} shadow-lg ring-4 ring-white/[0.03]`} />
                        {step.line && <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />}
                      </div>
                      <div className="pb-6">
                        <div className="flex items-baseline gap-3 mb-0.5">
                          <span className="text-white/30 text-xs font-mono font-bold w-8">{step.time}</span>
                          <span className="text-white font-semibold text-sm">{step.label}</span>
                        </div>
                        <span className="text-white/30 text-xs ml-11">{step.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Copy — right on desktop */}
            <FadeIn delay={0.15} className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6">
                <Zap className="w-3.5 h-3.5" />
                Speed
              </div>
              <h3
                className="font-[family-name:var(--font-jakarta)] font-extrabold text-white mb-5"
                style={{ fontSize: "clamp(26px, 5vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Under 30 seconds.
                <br />
                <span className="text-white/40">That&apos;s not a target. It&apos;s the average.</span>
              </h3>
              <p className="text-white/45 leading-relaxed mb-6 max-w-md">
                Your pricing logic is pre-built. The template does the maths.
                Fill in the details, generate, send. Done.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Automatic calculations from your templates",
                  "Branded PDFs generated in seconds",
                  "Send from your own Gmail or Outlook",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-blue-400" />
                    </div>
                    <span className="text-white/50 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </div>
    </section>
  );
}
