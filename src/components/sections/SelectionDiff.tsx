"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plus, ArrowsLeftRight, TextT } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  VERTICALS,
  defaultSelections,
} from "@/components/sections/live-demo/demoData";

// Derived from the solar vertical in live-demo/demoData.ts — the two cards
// are literally solar.compute() with one different answer, so this section
// can never drift out of sync with the live demo above it.
const fmt = (n: number) => `$${n.toLocaleString("en-AU")}`;

const solar = VERTICALS.find((v) => v.id === "solar")!;
const baseSelections = defaultSelections(solar);
const singleQuote = solar.compute({ ...baseSelections, storeys: "single" });
const doubleQuote = solar.compute({ ...baseSelections, storeys: "double" });

const singleById = new Map(singleQuote.lines.map((l) => [l.id, l]));
const installScope = (q: typeof singleQuote) =>
  q.scope.find((s) => s.id === "install")?.text ?? "";

type DiffLine = {
  label: string;
  detail?: string;
  amount: string;
  changed: boolean;
  isNew: boolean;
};

const QUOTES: {
  selection: string;
  total: string;
  scope: string;
  lines: DiffLine[];
}[] = [
  {
    selection: "Single",
    total: fmt(singleQuote.lines.reduce((sum, l) => sum + l.amount, 0)),
    scope: installScope(singleQuote),
    lines: singleQuote.lines.map((l) => ({
      label: l.label,
      detail: l.detail,
      amount: fmt(l.amount),
      changed: false,
      isNew: false,
    })),
  },
  {
    selection: "Double",
    total: fmt(doubleQuote.lines.reduce((sum, l) => sum + l.amount, 0)),
    scope: installScope(doubleQuote),
    lines: doubleQuote.lines.map((l) => {
      const prev = singleById.get(l.id);
      return {
        label: l.label,
        detail: l.detail,
        amount: fmt(l.amount),
        changed: !prev || prev.amount !== l.amount,
        isNew: !prev,
      };
    }),
  },
];

const labourSingle = singleById.get("labour")!;
const labourDouble = doubleQuote.lines.find((l) => l.id === "labour")!;
const accessLine = doubleQuote.lines.find((l) => l.id === "access")!;

const CALLOUTS = [
  {
    icon: Plus,
    title: "A line item that only exists on double storey",
    detail: `“${accessLine.label} — ${fmt(accessLine.amount)}” appeared on its own.`,
  },
  {
    icon: ArrowsLeftRight,
    title: "The same line, at a different rate",
    detail: `Installation labour went from ${fmt(labourSingle.amount)} to ${fmt(labourDouble.amount)}.`,
  },
  {
    icon: TextT,
    title: "The scope text rewrote itself",
    detail: "“…including elevated work platform and edge protection.”",
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

function QuoteCard({ quote }: { quote: (typeof QUOTES)[number] }) {
  const isDouble = quote.selection === "Double";
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-xl shadow-black/30 border border-white/[0.08]">
      <div className="h-1 bg-gradient-to-r from-brand-blue to-brand-cyan" />
      <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-slate-100">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          Storeys
        </div>
        <div
          className={`inline-flex px-3 py-1 rounded-lg text-sm font-bold ${
            isDouble
              ? "bg-brand-cyan/10 text-brand-blue border border-brand-cyan/30"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          {quote.selection}
        </div>
      </div>
      <div className="px-5 sm:px-6 py-3">
        {quote.lines.map((line) => (
          <div
            key={line.label}
            className={`flex items-baseline justify-between gap-3 py-2 border-b border-slate-100 -mx-2 px-2 rounded-md ${
              line.changed ? "bg-brand-cyan/[0.08]" : ""
            }`}
          >
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-slate-800 flex items-center gap-2">
                {line.label}
                {line.isNew && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-blue bg-brand-cyan/15 px-1.5 py-0.5 rounded">
                    New
                  </span>
                )}
              </div>
              {line.detail && (
                <div className="text-[11px] text-slate-400">{line.detail}</div>
              )}
            </div>
            <div className="text-[13px] font-bold text-slate-800 whitespace-nowrap">
              {line.amount}
            </div>
          </div>
        ))}
        <div className="flex items-baseline justify-between pt-3 pb-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Total inc. GST
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
            {quote.total}
          </div>
        </div>
      </div>
      <div className="px-5 sm:px-6 pb-5">
        <p
          className={`text-[12px] leading-relaxed rounded-lg px-3 py-2 border ${
            isDouble
              ? "text-slate-600 bg-brand-cyan/[0.06] border-brand-cyan/20"
              : "text-slate-500 bg-slate-50 border-slate-100"
          }`}
        >
          {quote.scope}
        </p>
      </div>
    </div>
  );
}

export default function SelectionDiff() {
  return (
    <section
      className="py-16 lg:py-24 border-t border-white/[0.04]"
      style={{ background: "#08080c" }}
    >
      <Container>
        <FadeIn>
          <SectionHeader
            badge="One answer changed"
            title="Same form. One different answer. A completely different quote."
            gradient="A completely different quote."
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto mt-12 items-start">
            {QUOTES.map((q) => (
              <QuoteCard key={q.selection} quote={q} />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto mt-12">
            <div className="grid sm:grid-cols-3 gap-4">
              {CALLOUTS.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-3">
                      <Icon weight="duotone" className="w-4 h-4 text-brand-cyan" />
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">
                      {c.title}
                    </div>
                    <div className="text-xs text-white/40 leading-relaxed">
                      {c.detail}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-white/50 leading-relaxed mt-10 max-w-xl mx-auto">
              One dropdown. Three changes — a new line item, a different labour
              rate, and rewritten scope wording. Nobody typed any of it.
              That&apos;s the difference between a quoting tool and a pricing
              system that actually knows your business.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
