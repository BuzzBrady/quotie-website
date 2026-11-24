"use client";

import { Plus, ArrowsLeftRight, TextT } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
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
    detail: `“${accessLine.label} — ${fmt(accessLine.amount)}” was added by the engine.`,
  },
  {
    icon: ArrowsLeftRight,
    title: "The same line, at a different rate",
    detail: `Installation labour went from ${fmt(labourSingle.amount)} to ${fmt(labourDouble.amount)}.`,
  },
  {
    icon: TextT,
    title: "The scope wording was rebuilt",
    detail: "“…including elevated work platform and edge protection.”",
  },
] as const;

function QuoteCard({ quote }: { quote: (typeof QUOTES)[number] }) {
  const isDouble = quote.selection === "Double";
  return (
    <div className="sheet rounded-lg overflow-hidden h-full flex flex-col">
      <div className="px-5 sm:px-6 py-4 border-b border-rule flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          Storeys
        </span>
        <span
          className={`px-3 py-1 rounded-md text-sm font-semibold border ${
            isDouble
              ? "bg-ink text-white border-ink"
              : "bg-sheet text-ink-soft border-rule-strong"
          }`}
        >
          {quote.selection}
        </span>
      </div>
      <div className="px-5 sm:px-6 py-2 flex-1">
        {quote.lines.map((line) => (
          <div
            key={line.label}
            className="flex items-baseline gap-2.5 py-2.5 border-b border-rule"
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold text-ink">
                <span className={line.changed ? "mark-live" : ""}>{line.label}</span>
                {line.isNew && (
                  <span className="ml-2 align-middle font-mono text-[9.5px] uppercase tracking-[0.12em] text-brand-blue border border-brand-blue/40 px-1.5 py-0.5 rounded">
                    New
                  </span>
                )}
              </div>
              {line.detail && (
                <div className="text-xs text-ink-faint mt-0.5">{line.detail}</div>
              )}
            </div>
            <span className="leader" aria-hidden />
            <div className="font-mono tnum text-sm font-medium text-ink whitespace-nowrap">
              <span className={line.changed ? "mark-live" : ""}>{line.amount}</span>
            </div>
          </div>
        ))}
        <div className="flex items-baseline gap-2.5 border-t-2 border-ink -mt-px pt-3 pb-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            Total inc. GST
          </div>
          <span className="leader" aria-hidden />
          <div className="tnum text-2xl font-extrabold tracking-tight text-ink font-jakarta">
            {quote.total}
          </div>
        </div>
      </div>
      <div className="px-5 sm:px-6 pb-5 pt-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1.5">
          Scope of works
        </div>
        <p className="text-[13px] leading-relaxed text-ink-soft">
          <span className={isDouble ? "mark-live" : ""}>{quote.scope}</span>
        </p>
      </div>
    </div>
  );
}

export default function SelectionDiff() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            badge="One answer changed"
            trail="Highlighted = nobody typed it"
            title="Same form. One different answer. A completely different quote."
            gradient="A completely different quote."
          />
        </Reveal>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-14 mt-12 lg:mt-16 items-start">
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
              {QUOTES.map((q) => (
                <QuoteCard key={q.selection} quote={q} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="border-t-2 border-ink">
              {CALLOUTS.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="py-5 border-b border-rule">
                    <Icon weight="bold" className="w-4 h-4 text-brand-blue mb-2.5" />
                    <div className="font-jakarta font-bold text-ink text-[15px] leading-snug mb-1">
                      {c.title}
                    </div>
                    <div className="text-sm text-ink-soft leading-relaxed">
                      {c.detail}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="text-ink-soft leading-relaxed mt-6 text-pretty">
              One dropdown. Three changes — a new line item, a different labour
              rate, and rewritten scope wording. Nobody typed any of it, and no AI
              made it up. The engine followed rules we wrote with you, so the
              same answers produce the same quote every time.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
