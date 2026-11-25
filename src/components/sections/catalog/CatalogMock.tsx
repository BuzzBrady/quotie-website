"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  Check,
  Clock,
  EyeSlash,
  MagnifyingGlass,
  PencilSimple,
  Plus,
} from "@phosphor-icons/react";

/**
 * Coded mockup of the app's Pricing page (quote-pro-working:
 * src/components/products) in edit mode. Labels and the draft → review →
 * publish flow mirror the real screen. Sample data only.
 */

const B = "#e6e6e6"; // app border
const PRIMARY = "#2563eb"; // app primary

const TABS = [
  { label: "Systems", count: 5 },
  { label: "Batteries", count: 3 },
  { label: "Inverters", count: 2 },
  { label: "Business Rules", count: 4 },
];

const ROWS = [
  { product: "10kWh battery storage", price: "$8,200" },
  { product: "13.5kWh battery storage", price: "$10,600", next: "$11,150" },
  { product: "16kWh battery storage", price: "$11,900" },
];

// 0 read-only · 1 edit mode, cell focused · 2 new price typed (draft)
// 3 review dialog · 4 published
const BEATS = [2200, 1500, 2600, 2800, 4200];

export default function CatalogMock({
  step: controlledStep,
}: {
  /** Drive the steps from outside (the explainer video) instead of the built-in loop. */
  step?: number;
} = {}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [ownStep, setStep] = useState(0);
  const controlled = controlledStep !== undefined;
  const step = controlled ? controlledStep : ownStep;

  useEffect(() => {
    if (controlled) return;
    // Reduced motion: hold on the draft state, which shows the whole idea.
    // Set in an effect (not during render) so server and client HTML match.
    if (reduced) {
      const t = setTimeout(() => setStep(2), 0);
      return () => clearTimeout(t);
    }
    if (!inView) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % BEATS.length), BEATS[step]);
    return () => clearTimeout(t);
  }, [step, inView, reduced, controlled]);

  const s = step;
  const editing = s >= 1 && s <= 3;
  const changed = s >= 2;
  const published = s === 4;

  return (
    <div ref={ref} aria-hidden>
      <div
        className="relative rounded-xl overflow-hidden bg-white text-[#1a1a1a] border shadow-[0_30px_60px_-30px_rgba(11,22,38,0.35)]"
        style={{ borderColor: "#d4d9e2" }}
      >
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[17px] font-bold tracking-tight">Pricing</div>
              <div className="text-[10.5px] text-[#737373] mt-0.5 min-h-[2.6em] sm:min-h-0">
                {editing
                  ? "Editing — changes are saved to a draft until you publish"
                  : "The products, prices and business rules your quotes are built from"}
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1 text-[9.5px] text-[#737373]">
                <Clock className="w-3 h-3" /> Synced 25 Nov 2026
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold transition-colors duration-300"
                style={{
                  borderColor: editing ? "#f0f0f0" : B,
                  background: editing ? "#f0f0f0" : "#fff",
                }}
              >
                <PencilSimple weight="bold" className="w-3 h-3" /> Edit catalog
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {["3 product groups", "10 products"].map((b) => (
              <span
                key={b}
                className="rounded-full border px-2 py-0.5 text-[9.5px] font-semibold"
                style={{ borderColor: B }}
              >
                {b}
              </span>
            ))}
            <span className="rounded-full border border-green-200 bg-green-50 text-green-700 px-2 py-0.5 text-[9.5px] font-semibold">
              10 active
            </span>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 mt-3 pb-2.5 border-b overflow-hidden"
            style={{ borderColor: B }}
          >
            {TABS.map((t) => {
              const on = t.label === "Batteries";
              return (
                <span
                  key={t.label}
                  className="shrink-0 rounded-md px-2 py-1 text-[10.5px] font-semibold"
                  style={on ? { background: PRIMARY, color: "#fff" } : { color: "#737373" }}
                >
                  {t.label} <span className="opacity-70 font-medium">({t.count})</span>
                </span>
              );
            })}
          </div>

          {/* Search row */}
          <div className="flex gap-2 mt-3">
            <div
              className="flex-1 flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[10.5px] text-[#a3a3a3]"
              style={{ borderColor: B }}
            >
              <MagnifyingGlass className="w-3 h-3" /> Search Batteries...
            </div>
            {editing && (
              <span
                className="hidden sm:inline-flex items-center gap-1 rounded-md border px-2 py-1.5 text-[10.5px] font-semibold"
                style={{ borderColor: B }}
              >
                <Plus weight="bold" className="w-3 h-3" /> Add product
              </span>
            )}
            <span
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1.5 text-[10.5px] font-semibold text-[#737373]"
              style={{ borderColor: B }}
            >
              <EyeSlash className="w-3 h-3" /> Active only
            </span>
          </div>

          {/* Table */}
          <div className="mt-3 rounded-lg border overflow-hidden" style={{ borderColor: B }}>
            <div
              className="grid grid-cols-[minmax(0,1fr)_92px_52px] bg-[#f7f7f7] border-b text-[9.5px] font-semibold text-[#737373]"
              style={{ borderColor: B }}
            >
              <div className="px-3 py-2">Product</div>
              <div className="px-3 py-2">Price</div>
              <div className="px-2 py-2">Active</div>
            </div>
            {ROWS.map((r, i) => {
              const target = !!r.next;
              const focused = target && s === 1;
              const showNext = target && changed;
              return (
                <div
                  key={r.product}
                  className={`grid grid-cols-[minmax(0,1fr)_92px_52px] items-center text-[11.5px] ${
                    i < ROWS.length - 1 ? "border-b" : ""
                  }`}
                  style={{ borderColor: B }}
                >
                  <div className="px-3 py-2.5 font-medium truncate">{r.product}</div>
                  <div
                    className="px-2 py-1.5 transition-colors duration-300"
                    style={{
                      background: showNext && !published ? "#fffbeb" : "transparent",
                    }}
                  >
                    <span
                      className="tnum inline-block w-full rounded px-1 py-1 font-semibold transition-shadow duration-200"
                      style={{
                        boxShadow: focused
                          ? `0 0 0 1.5px ${PRIMARY}`
                          : editing
                            ? `0 0 0 1px ${B}`
                            : "none",
                      }}
                    >
                      {showNext ? r.next : r.price}
                      {focused && (
                        <span className="ml-px inline-block w-px h-3 align-middle bg-[#1a1a1a] animate-pulse" />
                      )}
                    </span>
                  </div>
                  <div className="px-2 py-2.5">
                    <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-green-600 text-white">
                      <Check weight="bold" className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Draft bar */}
        <div
          className="flex items-center justify-between gap-3 border-t px-4 py-2.5 transition-opacity duration-300"
          style={{
            borderColor: B,
            background: published ? "#f0fdf4" : "#f4f7fe",
            opacity: changed ? 1 : 0,
          }}
        >
          <div className="min-w-0">
            {published ? (
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-green-700">
                <Check weight="bold" className="w-3 h-3 shrink-0" />
                <span className="truncate">
                  Published — your quote engine now uses these prices
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                  <PencilSimple weight="fill" className="w-3 h-3" style={{ color: PRIMARY }} />
                  1 unpublished change
                </div>
                <div className="hidden sm:block text-[9.5px] text-[#737373]">
                  Last edited by you less than a minute ago
                </div>
              </>
            )}
          </div>
          {!published && (
            <div className="flex items-center gap-2 shrink-0 text-[10.5px] font-semibold">
              <span className="text-[#737373]">Discard</span>
              <span
                className="rounded-md px-2.5 py-1.5 text-white"
                style={{ background: PRIMARY }}
              >
                Review &amp; publish
              </span>
            </div>
          )}
        </div>

        {/* Review dialog */}
        <div
          className="absolute inset-0 flex items-center justify-center p-4 bg-black/35 transition-opacity duration-300"
          style={{ opacity: s === 3 ? 1 : 0, pointerEvents: "none" }}
        >
          <div className="w-full max-w-[340px] rounded-lg bg-white p-4 shadow-2xl">
            <div className="text-[13px] font-bold">Review &amp; publish</div>
            <div className="text-[10.5px] text-[#737373] mt-0.5">
              These changes will go live in your quote engine.
            </div>
            <div className="mt-3 rounded-md border overflow-hidden" style={{ borderColor: B }}>
              <div
                className="px-2.5 py-1.5 bg-[#f7f7f7] border-b text-[10.5px] font-semibold"
                style={{ borderColor: B }}
              >
                Batteries
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-3 px-2.5 py-2 text-[10.5px]">
                <span className="text-[#737373]">Product</span>
                <span className="text-[#737373]">Before</span>
                <span className="text-[#737373]">After</span>
                <span className="font-medium truncate pt-1">13.5kWh battery storage</span>
                <span className="tnum text-[#737373] pt-1">$10,600</span>
                <span className="tnum font-bold pt-1">$11,150</span>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2 text-[10.5px] font-semibold">
              <span className="rounded-md border px-2.5 py-1.5" style={{ borderColor: B }}>
                Cancel
              </span>
              <span className="rounded-md px-2.5 py-1.5 text-white" style={{ background: PRIMARY }}>
                Publish
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What the next quote says */}
      <div className="sheet mt-4 px-4 sm:px-5 py-3.5">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1.5">
          {published ? "The next quote you generate" : "Quotes right now"}
        </div>
        <div className="flex items-baseline gap-2.5 text-sm text-ink">
          <span className="font-medium">13.5kWh battery storage</span>
          <span className="leader" aria-hidden />
          <span className={`tnum font-semibold ${published ? "mark-live" : ""}`}>
            {published ? "$11,150" : "$10,600"}
          </span>
        </div>
      </div>
    </div>
  );
}
