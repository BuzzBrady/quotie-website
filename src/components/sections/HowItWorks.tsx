"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChatsCircle, Hammer, Lightning } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const STEPS = [
  {
    icon: ChatsCircle,
    step: "01",
    title: "We map your pricing",
    description:
      "Onboarding starts with a working session: your products, rates, rules, and the way you actually price jobs.",
    color: "text-brand-cyan",
    border: "border-brand-cyan/20",
    bg: "from-brand-cyan/10 to-brand-blue/5",
  },
  {
    icon: Hammer,
    step: "02",
    title: "We build your system",
    description:
      "Templates, calculations, conditional logic, branded PDFs, email templates — built and tested by us, typically live in a couple of weeks.",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "from-blue-500/10 to-indigo-500/5",
  },
  {
    icon: Lightning,
    step: "03",
    title: "You fill in a form",
    description:
      "From then on, every quote takes under 30 seconds. You only ever come back to us for price updates or new products.",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "from-emerald-500/10 to-teal-500/5",
  },
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

export default function HowItWorks() {
  return (
    <section
      className="py-16 lg:py-24 border-t border-white/[0.04]"
      style={{ background: "#08080c" }}
    >
      <Container>
        <FadeIn>
          <SectionHeader
            badge="Done for you"
            title="We build it. You quote."
            gradient="You quote."
            subtitle="Quotie isn't software you set up. It's a system we build for you."
          />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-14 max-w-5xl mx-auto">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div
                  className={`relative h-full rounded-2xl border ${step.border} bg-gradient-to-br ${step.bg} p-7 overflow-hidden`}
                >
                  <div className="absolute top-5 right-6 text-5xl font-extrabold text-white/[0.05] font-[family-name:var(--font-jakarta)]">
                    {step.step}
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5">
                    <Icon weight="duotone" className={`w-5.5 h-5.5 ${step.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 font-[family-name:var(--font-jakarta)]">
                    {step.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
