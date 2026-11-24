"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  CaretDown,
  Check,
  Eye,
  FilePdf,
  PaperPlaneTilt,
  Signature,
} from "@phosphor-icons/react";
import {
  VERTICALS,
  type Selections,
} from "@/components/sections/live-demo/demoData";
import EngineRun from "@/components/sections/EngineRun";

/**
 * The hero plays the whole product on a loop: three answers go into a form,
 * Generate sends them to the engine (pricing rules → scope wording → page
 * rendering), the finished quote comes back, then it's sent, viewed and
 * signed. The quote is deliberately NOT a live preview — nothing appears on
 * the sheet until the engine has run. Numbers come from the same solar
 * vertical as the interactive demo further down, so the two can never disagree.
 */

const solar = VERTICALS.find((v) => v.id === "solar")!;
const fmt = (n: number) => `$${n.toLocaleString("en-AU")}`;

// How long each beat holds before the next one (ms).
// 0 empty · 1-3 answers · 4 engine runs · 5 generated · 6 sent · 7 viewed · 8 signed
const BEATS = [1100, 1200, 1200, 1300, 2700, 1700, 1300, 1500, 4200] as const;
const LAST = BEATS.length - 1;

function selectionsAt(step: number): Selections | null {
  if (step < 1) return null;
  return {
    size: "10",
    storeys: step >= 2 ? "double" : "single",
    inverter: "a",
    battery: step >= 3 ? "10" : "none",
  };
}

const RAIL = [
  { at: 5, icon: FilePdf, label: "Generated", note: "PDF in 24 sec" },
  { at: 6, icon: PaperPlaneTilt, label: "Sent", note: "From your inbox" },
  { at: 7, icon: Eye, label: "Viewed", note: "Opened 2:14 pm" },
  { at: 8, icon: Signature, label: "Signed", note: "Accepted online" },
] as const;

function CountUp({ value }: { value: number }) {
  // Mounts when the engine hands the quote back, so it counts up from zero
  // (server and client both render the final figure first — no mismatch).
  const [display, setDisplay] = useState(value);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current;
    prev.current = value;
    if (from === value) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 500);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{fmt(display)}</>;
}

function Pill({
  children,
  selected,
  tapped,
}: {
  children: React.ReactNode;
  selected: boolean;
  tapped: boolean;
}) {
  return (
    <span
      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors duration-300 ${
        selected
          ? "bg-brand-cyan/15 border-brand-cyan/60 text-white"
          : "bg-white/[0.03] border-white/10 text-white/45"
      } ${tapped ? "tap-ring" : ""}`}
    >
      {children}
    </span>
  );
}

export default function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(LAST);
      return;
    }
    if (!inView) return;
    const t = setTimeout(
      () => setStep((s) => (s >= LAST ? 0 : s + 1)),
      BEATS[step],
    );
    return () => clearTimeout(t);
  }, [step, inView, reduce]);

  const sel = selectionsAt(step);
  // The finished quote for the three answers — only shown once the engine has run.
  const finalLines = useMemo(() => solar.compute(selectionsAt(3)!).lines, []);
  const total = finalLines.reduce((sum, l) => sum + l.amount, 0);

  const running = step === 4;
  const generated = step >= 5;
  const signed = step >= 8;
  const lines = generated ? finalLines : [];

  return (
    <div ref={ref} className="relative" aria-hidden>
      <div className="grid grid-cols-12 items-start">
        {/* The form — the app side, so it wears the deep navy */}
        <div className="col-span-12 sm:col-start-1 sm:col-span-6 row-start-1 sm:mt-14 relative z-0">
          <div className="rounded-xl bg-deep border border-deep-rule shadow-[0_30px_60px_-30px_rgba(8,17,32,0.7)] p-4 sm:p-5 sm:pr-[4.25rem]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                New quote
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-cyan">
                Solar &amp; Electrical
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="text-xs font-medium text-white/60 mb-1.5">
                  System size
                </div>
                <div
                  key={`size-${step === 1}`}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 text-xs font-medium transition-colors duration-300 ${
                    sel
                      ? "border-brand-cyan/60 bg-brand-cyan/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/35"
                  } ${step === 1 ? "tap-ring" : ""}`}
                >
                  {sel ? "10kW system" : "Select…"}
                  <CaretDown weight="bold" className="w-3 h-3 text-white/40" />
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-white/60 mb-1.5">
                  Storeys
                </div>
                <div className="flex gap-2" key={`st-${step === 2}`}>
                  <Pill selected={step < 2} tapped={false}>
                    Single
                  </Pill>
                  <Pill selected={step >= 2} tapped={step === 2}>
                    Double
                  </Pill>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-white/60 mb-1.5">
                  Battery
                </div>
                <div className="flex gap-2" key={`bt-${step === 3}`}>
                  <Pill selected={step < 3} tapped={false}>
                    None
                  </Pill>
                  <Pill selected={step >= 3} tapped={step === 3}>
                    10kWh
                  </Pill>
                  <Pill selected={false} tapped={false}>
                    16kWh
                  </Pill>
                </div>
              </div>
            </div>

            <div
              key={`gen-${step === 4}`}
              className={`mt-5 flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold transition-colors duration-300 ${
                generated || running
                  ? "bg-white/[0.06] text-white/70 border border-white/10"
                  : "bg-brand-blue text-white border border-transparent"
              } ${step === 4 ? "tap-ring" : ""}`}
            >
              {generated ? (
                <>
                  <Check weight="bold" className="w-3.5 h-3.5 text-brand-cyan" />
                  Quote generated
                </>
              ) : running ? (
                "Sending to your engine…"
              ) : (
                "Generate quote"
              )}
            </div>
          </div>
        </div>

        {/* The quote — paper */}
        <div className="col-span-12 sm:col-start-6 sm:col-span-7 row-start-2 sm:row-start-1 relative z-10 -mt-3 mx-3 sm:mx-0 sm:mt-0">
          <div className="sheet rounded-lg relative overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-brand-blue to-brand-cyan" />
            <div className="px-5 pt-4 pb-3 border-b border-rule flex items-start justify-between gap-4">
              <div>
                <div className="font-jakarta font-bold text-ink text-[15px] leading-tight">
                  {solar.docTitle}
                </div>
                <div className="font-mono text-[10px] text-ink-faint mt-1 tracking-wide">
                  QUOTE #1042 · SAMPLE CLIENT
                </div>
              </div>
              <img src="/logo.svg" alt="" className="w-7 h-7" width={28} height={28} />
            </div>

            {/* Line items — height is reserved so the page never jumps */}
            <div className="px-5 pt-1 h-[264px]">
              {running && <EngineRun stepMs={720} className="pt-6" />}
              {!running && lines.length === 0 && (
                <div className="pt-4 space-y-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    Waiting on the form
                  </div>
                  {[72, 54, 64].map((w) => (
                    <div key={w} className="flex items-center justify-between">
                      <span
                        className="h-2 rounded-full bg-rule"
                        style={{ width: `${w}%` }}
                      />
                      <span className="h-2 w-10 rounded-full bg-rule" />
                    </div>
                  ))}
                </div>
              )}
              <AnimatePresence initial={false}>
                {lines.map((line, i) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.07 }}
                  >
                    <div className="flex items-baseline gap-2 py-2 border-b border-rule -mx-1.5 px-1.5 rounded-sm">
                      <div className="min-w-0">
                        <div className="text-[12.5px] font-semibold text-ink truncate">
                          {line.label}
                        </div>
                        <div className="text-[10.5px] text-ink-faint truncate">
                          {line.detail}
                        </div>
                      </div>
                      <span className="leader" />
                      <div className="font-mono text-[12.5px] font-medium text-ink tnum">
                        {fmt(line.amount)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Total + signature */}
            <div className="px-5 pb-5">
              <div className="flex items-baseline gap-2 border-t-2 border-ink pt-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                  Total inc. GST
                </span>
                <span className="leader" />
                <span className="font-jakarta font-extrabold text-ink text-2xl tracking-tight tnum">
                  {generated ? <CountUp value={total} /> : <span className="text-rule-strong">$—</span>}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <div className="flex-1 max-w-[190px]">
                  <svg
                    viewBox="0 0 190 46"
                    className="w-full h-[46px] overflow-visible"
                    fill="none"
                  >
                    <path
                      key={signed ? "on" : "off"}
                      pathLength={1}
                      style={{ "--sig-len": 1 } as React.CSSProperties}
                      className={`sig-path ${signed ? "is-drawn" : ""}`}
                      d="M6 34c8-14 16-26 22-26 5 0 1 14-3 24-2 6 6-10 14-12 5-1 2 8 6 8 5 0 8-10 14-10 4 0 2 9 7 9 6 0 9-16 16-22 4-3 3 10-1 20-2 5 8-9 15-9 5 0 3 8 9 8 9 0 22-6 40-12"
                      stroke="#1f61aa"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="border-t border-rule-strong pt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                    Accepted by client
                  </div>
                </div>
                <AnimatePresence>
                  {signed && (
                    <span
                      key="stamp"
                      className="stamp-in mb-1 border-2 border-brand-blue text-brand-blue rounded px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em]"
                    >
                      Signed
                    </span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status rail — what happens after you hit generate */}
      <div className="mt-6 sm:mt-7 grid grid-cols-4 gap-2 sm:gap-3">
        {RAIL.map((r) => {
          const on = step >= r.at;
          const Icon = r.icon;
          return (
            <div key={r.label}>
              <div className="h-[3px] rounded-full bg-rule overflow-hidden">
                <div
                  className="h-full bg-brand-blue origin-left transition-transform duration-500 ease-out"
                  style={{ transform: `scaleX(${on ? 1 : 0})` }}
                />
              </div>
              <div
                className={`mt-2.5 flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold transition-colors duration-300 ${
                  on ? "text-ink" : "text-ink-faint"
                }`}
              >
                <Icon
                  weight={on ? "fill" : "regular"}
                  className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                    on ? "text-brand-blue" : ""
                  }`}
                />
                {r.label}
              </div>
              <div
                className={`hidden sm:block font-mono text-[10px] uppercase tracking-[0.1em] mt-0.5 transition-opacity duration-300 text-ink-faint ${
                  on ? "opacity-100" : "opacity-0"
                }`}
              >
                {r.note}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
