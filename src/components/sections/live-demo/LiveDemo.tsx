"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sun,
  HouseLine,
  Sparkle,
  Wrench,
  PaintRoller,
  Check,
  CaretDown,
  Minus,
  Plus,
} from "@phosphor-icons/react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  VERTICALS,
  clampNumber,
  defaultSelections,
  type NumberField,
  type QuoteLine,
  type ScopeItem,
  type SelectField,
  type Selections,
  type Vertical,
} from "./demoData";

const TAB_ICONS = {
  solar: Sun,
  roofing: HouseLine,
  cleaning: Sparkle,
  plumbing: Wrench,
  painting: PaintRoller,
} as const;

const fmt = (n: number) => `$${Math.abs(n).toLocaleString("en-AU")}`;

/** Options currently valid for a select field, given the other selections. */
function optionsFor(field: SelectField, s: Selections) {
  if (!field.availableValues) return field.options;
  const avail = field.availableValues(s);
  return field.options.filter((o) => avail.includes(o.value));
}

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

/** Counts toward the new total instead of jumping. */
function AnimatedTotal({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = value;
    if (from === to) return;
    const start = performance.now();
    const duration = 400;
    let raf: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{fmt(display)}</>;
}

/** Tracks which item ids changed since the last render of the same vertical. */
function useChangeFlash(
  verticalId: string,
  items: { id: string; value: string | number }[],
) {
  const prevValues = useRef<Map<string, string | number> | null>(null);
  const prevVertical = useRef(verticalId);
  const [flash, setFlash] = useState<{ ids: Set<string>; token: number }>({
    ids: new Set(),
    token: 0,
  });

  useEffect(() => {
    const values = new Map(items.map((i) => [i.id, i.value]));
    if (prevVertical.current !== verticalId) {
      // Tab switch — reset baseline, no flash.
      prevVertical.current = verticalId;
      prevValues.current = values;
      return;
    }
    if (prevValues.current) {
      const changed = new Set<string>();
      for (const [id, value] of values) {
        if (prevValues.current.get(id) !== value) changed.add(id);
      }
      if (changed.size > 0) {
        setFlash((f) => ({ ids: changed, token: f.token + 1 }));
      }
    }
    prevValues.current = values;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verticalId, JSON.stringify(items)]);

  return flash;
}

function NumberStepper({
  field,
  value,
  onChange,
}: {
  field: NumberField;
  value: Selections[string];
  onChange: (v: string | number) => void;
}) {
  const clamped = clampNumber(value, field.min, field.max, field.defaultValue);
  const nudge = (dir: 1 | -1) =>
    onChange(
      Math.min(field.max, Math.max(field.min, clamped + dir * field.step)),
    );

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center rounded-lg border border-white/[0.1] bg-white/[0.04] overflow-hidden">
        <button
          onClick={() => nudge(-1)}
          aria-label={`Decrease ${field.label}`}
          className="px-3.5 py-2.5 text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <Minus weight="bold" className="w-3.5 h-3.5" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={String(value)}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
          onBlur={() => onChange(clamped)}
          className="w-14 bg-transparent text-center text-sm font-semibold text-white focus:outline-none border-x border-white/[0.08] py-2.5"
        />
        <button
          onClick={() => nudge(1)}
          aria-label={`Increase ${field.label}`}
          className="px-3.5 py-2.5 text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <Plus weight="bold" className="w-3.5 h-3.5" />
        </button>
      </div>
      {field.unit && (
        <span className="text-sm text-white/40 font-medium">{field.unit}</span>
      )}
    </div>
  );
}

function QuotePreview({
  vertical,
  lines,
  scope,
  total,
}: {
  vertical: Vertical;
  lines: QuoteLine[];
  scope: ScopeItem[];
  total: number;
}) {
  const lineFlash = useChangeFlash(
    vertical.id,
    lines.map((l) => ({ id: l.id, value: l.amount })),
  );
  const scopeFlash = useChangeFlash(
    vertical.id,
    scope.map((s) => ({ id: s.id, value: s.text })),
  );

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl shadow-black/40 border border-white/[0.08]">
      {/* Branded header bar */}
      <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-cyan" />
      <div className="px-5 sm:px-7 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="font-bold text-slate-900 font-[family-name:var(--font-jakarta)] text-[15px] sm:text-lg leading-tight truncate">
            {vertical.docTitle}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Quote #1042 · Prepared for Sample Client
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-extrabold font-[family-name:var(--font-jakarta)]">
            Q
          </span>
        </div>
      </div>

      {/* Line items */}
      <div className="px-5 sm:px-7 pt-2 pb-4">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div
                key={lineFlash.ids.has(line.id) ? `f-${lineFlash.token}` : "s"}
                className={`flex items-baseline justify-between gap-4 py-2.5 border-b border-slate-100 rounded-md -mx-2 px-2 ${
                  lineFlash.ids.has(line.id) ? "demo-flash" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="text-[13px] sm:text-sm font-semibold text-slate-800">
                    {line.label}
                  </div>
                  {line.detail && (
                    <div className="text-[11px] sm:text-xs text-slate-400">
                      {line.detail}
                    </div>
                  )}
                </div>
                <div
                  className={`text-[13px] sm:text-sm font-bold whitespace-nowrap ${
                    line.amount < 0 ? "text-emerald-600" : "text-slate-800"
                  }`}
                >
                  {line.amount < 0 ? `−${fmt(line.amount)}` : fmt(line.amount)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Total bar */}
      <div className="mx-5 sm:mx-7 mb-4 rounded-xl bg-gradient-to-r from-brand-blue/[0.06] to-brand-cyan/[0.08] border border-brand-cyan/20 px-4 py-3 flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Total inc. GST
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-jakarta)]">
          <AnimatedTotal value={total} />
        </div>
      </div>

      {/* Scope of works — sentences that rewrite themselves */}
      <div className="px-5 sm:px-7 pb-6">
        <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3.5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
            Scope of works
          </div>
          <AnimatePresence initial={false}>
            {scope.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div
                  key={
                    scopeFlash.ids.has(item.id) ? `f-${scopeFlash.token}` : "s"
                  }
                  className={`flex items-start gap-2.5 py-1.5 rounded-md -mx-1.5 px-1.5 ${
                    scopeFlash.ids.has(item.id) ? "demo-flash" : ""
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-brand-cyan/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check
                      weight="bold"
                      className="w-2.5 h-2.5 text-brand-blue"
                    />
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={item.text}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-[12px] sm:text-[13px] leading-relaxed text-slate-600"
                    >
                      {item.text}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function LiveDemo() {
  const [activeId, setActiveId] = useState(VERTICALS[0].id);
  const vertical = VERTICALS.find((v) => v.id === activeId)!;
  const [selections, setSelections] = useState<Selections>(() =>
    defaultSelections(VERTICALS[0]),
  );

  const { lines, scope } = useMemo(
    () => vertical.compute(selections),
    [vertical, selections],
  );
  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  // Fields that just auto-reset because another selection made them invalid —
  // flashed so the visitor sees the compatibility rule fire.
  const [fieldFlash, setFieldFlash] = useState<{
    ids: Set<string>;
    token: number;
  }>({ ids: new Set(), token: 0 });

  const switchVertical = (v: Vertical) => {
    if (v.id === activeId) return;
    setActiveId(v.id);
    setSelections(defaultSelections(v));
    setFieldFlash({ ids: new Set(), token: 0 });
  };

  const setValue = (id: string, value: string | boolean | number) => {
    const next: Selections = { ...selections, [id]: value };
    // Compatibility rules: if a change invalidates another field's selection,
    // reset that field to its first valid option and flash it.
    const resets: string[] = [];
    for (const f of vertical.fields) {
      if (f.type === "select" && f.availableValues) {
        const avail = f.availableValues(next);
        if (!avail.includes(String(next[f.id]))) {
          next[f.id] = avail[0];
          resets.push(f.id);
        }
      }
    }
    setSelections(next);
    if (resets.length > 0) {
      setFieldFlash((prev) => ({
        ids: new Set(resets),
        token: prev.token + 1,
      }));
    }
  };

  return (
    <section
      id="live-demo"
      className="py-16 lg:py-24 border-t border-white/[0.04]"
      style={{ background: "#08080c" }}
    >
      <Container>
        <FadeIn>
          <SectionHeader
            badge="See it work"
            badgeIcon={
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
              </span>
            }
            title="Fill in the form. The quote writes itself."
            gradient="The quote writes itself."
            subtitle="Five trades, five different kinds of pricing logic. Your real engine is built to however your business quotes — whatever the logic, we build it."
          />
        </FadeIn>

        {/* Vertical tabs — swipeable row on mobile, centered wrap on desktop */}
        <FadeIn delay={0.1}>
          <div className="mt-10 mb-8 lg:mb-10 -mx-6 px-6 sm:mx-0 sm:px-0">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0 sm:flex-wrap sm:justify-center">
              {VERTICALS.map((v) => {
                const Icon = TAB_ICONS[v.id as keyof typeof TAB_ICONS];
                const active = v.id === activeId;
                return (
                  <button
                    key={v.id}
                    onClick={() => switchVertical(v)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold border whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent shadow-lg shadow-brand-cyan/20"
                        : "bg-white/[0.03] text-white/50 border-white/[0.08] hover:text-white/80 hover:border-white/[0.15]"
                    }`}
                  >
                    <Icon weight="duotone" className="w-4 h-4" />
                    {v.label}
                  </button>
                );
              })}
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold border border-dashed border-white/[0.15] text-white/40 whitespace-nowrap flex-shrink-0 transition-all duration-300 hover:text-white/80 hover:border-brand-cyan/40"
              >
                Your trade →
              </Link>
            </div>

            {/* Capability tag — tells the visitor what trick they're watching */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={vertical.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-center text-[13px] text-white/50 mt-5 px-2"
              >
                <span className="text-brand-cyan mr-1.5">◆</span>
                This example shows:{" "}
                <span className="text-white/80 font-medium">
                  {vertical.capability}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* Form + live quote */}
        <FadeIn delay={0.15}>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start max-w-5xl mx-auto">
            {/* Left: the form your team sees */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-5 sm:mb-6">
                The form you or your team fills in
              </div>
              <div className="space-y-5 sm:space-y-6">
                {vertical.fields.map((field) => {
                  const flashing = fieldFlash.ids.has(field.id);
                  return (
                  <div
                    key={`${vertical.id}-${field.id}${flashing ? `-f${fieldFlash.token}` : ""}`}
                    className={`rounded-lg -mx-2 px-2 ${flashing ? "demo-flash" : ""}`}
                  >
                    {field.type === "select" && field.variant === "dropdown" ? (
                      <>
                        <div className="text-sm font-semibold text-white/70 mb-2.5">
                          {field.label}
                        </div>
                        <div className="relative inline-block w-full sm:w-auto sm:min-w-[220px]">
                          <select
                            value={String(selections[field.id])}
                            onChange={(e) => setValue(field.id, e.target.value)}
                            className="appearance-none w-full px-4 py-2.5 pr-10 rounded-lg text-[13px] font-medium bg-white/[0.04] border border-white/[0.1] text-white cursor-pointer transition-colors hover:border-white/[0.2] focus:border-brand-cyan/50 focus:outline-none [&>option]:bg-[#0d0d14] [&>option]:text-white"
                          >
                            {optionsFor(field, selections).map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <CaretDown
                            weight="bold"
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none"
                          />
                        </div>
                      </>
                    ) : field.type === "select" ? (
                      <>
                        <div className="text-sm font-semibold text-white/70 mb-2.5">
                          {field.label}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {optionsFor(field, selections).map((opt) => {
                            const selected = selections[field.id] === opt.value;
                            return (
                              <button
                                key={opt.value}
                                onClick={() => setValue(field.id, opt.value)}
                                className={`px-4 py-2.5 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                                  selected
                                    ? "bg-brand-cyan/15 border-brand-cyan/50 text-white"
                                    : "bg-white/[0.03] border-white/[0.08] text-white/45 hover:text-white/70 hover:border-white/[0.15]"
                                }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    ) : field.type === "number" ? (
                      <>
                        <div className="text-sm font-semibold text-white/70 mb-2.5">
                          {field.label}
                        </div>
                        <NumberStepper
                          field={field}
                          value={selections[field.id]}
                          onChange={(v) => setValue(field.id, v)}
                        />
                      </>
                    ) : (
                      <button
                        onClick={() => setValue(field.id, !selections[field.id])}
                        className="flex items-center gap-3 group text-left"
                      >
                        <span
                          className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            selections[field.id]
                              ? "bg-gradient-to-br from-brand-blue to-brand-cyan border-transparent"
                              : "bg-white/[0.03] border-white/[0.15] group-hover:border-white/[0.3]"
                          }`}
                        >
                          {selections[field.id] === true && (
                            <Check weight="bold" className="w-3 h-3 text-white" />
                          )}
                        </span>
                        <span
                          className={`text-sm font-semibold transition-colors ${
                            selections[field.id] ? "text-white" : "text-white/70"
                          }`}
                        >
                          {field.label}
                        </span>
                      </button>
                    )}
                  </div>
                  );
                })}
              </div>

              <div className="mt-6 sm:mt-8 pt-5 border-t border-white/[0.06] text-xs text-white/30 leading-relaxed">
                In the real thing this form is yours — your fields, your
                products, your rules. Built by us during onboarding.
              </div>
            </div>

            {/* Right: the quote reacting */}
            <div className="relative lg:sticky lg:top-28">
              <div className="absolute -inset-6 bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative">
                <QuotePreview
                  vertical={vertical}
                  lines={lines}
                  scope={scope}
                  total={total}
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Mobile: sticky live total so the price reacts on screen while the
            quote card is below the fold */}
        <div className="lg:hidden sticky bottom-4 z-20 mt-6 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <div className="flex items-center justify-between rounded-2xl border border-brand-cyan/30 bg-[#0d0d14]/95 backdrop-blur-md px-5 py-3.5 shadow-2xl shadow-black/60">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">
                  Live total
                </span>
              </div>
              <div className="text-xl font-extrabold text-white font-[family-name:var(--font-jakarta)]">
                <AnimatedTotal value={total} />
              </div>
            </div>
          </div>
        </div>

        {/* DFY caption */}
        <FadeIn delay={0.2}>
          <div className="max-w-2xl mx-auto text-center mt-12">
            <p className="text-white/60 leading-relaxed">
              <span className="text-white font-semibold">
                You never build any of this.
              </span>{" "}
              During onboarding we sit down with you, map out your pricing, and
              build your form, your logic, and your templates. You — or your
              team — just answer the questions.
            </p>
            <p className="text-sm text-white/40 leading-relaxed mt-4">
              Tiered rates, travel zones, supplier price lists, minimum
              callouts, margin rules, compatibility charts — if you can explain
              how you price a job, we can build it into your engine.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
