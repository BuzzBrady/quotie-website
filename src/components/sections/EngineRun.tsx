"use client";

import { useEffect, useState } from "react";
import { Check } from "@phosphor-icons/react";

/**
 * What happens between "Generate" and a finished quote. Quotes are NOT live
 * previews — the answers are sent to the company's engine, which does these
 * three jobs and hands back a document. Shown in the hero and the demo.
 */
export const ENGINE_STEPS = [
  "Running your pricing rules",
  "Writing the scope of works",
  "Rendering the pages",
] as const;

export default function EngineRun({
  stepMs = 520,
  className = "",
}: {
  stepMs?: number;
  className?: string;
}) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= ENGINE_STEPS.length) return;
    const t = setTimeout(() => setDone((d) => d + 1), stepMs);
    return () => clearTimeout(t);
  }, [done, stepMs]);

  return (
    <div className={className}>
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-blue mb-3">
        Sent to your engine
      </div>
      <ul className="space-y-2.5">
        {ENGINE_STEPS.map((label, i) => {
          const finished = i < done;
          const active = i === done;
          return (
            <li
              key={label}
              className={`flex items-center gap-2.5 text-[13px] font-medium transition-colors duration-300 ${
                finished ? "text-ink" : active ? "text-ink-soft" : "text-ink-faint/60"
              }`}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                {finished ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-white">
                    <Check weight="bold" className="w-2.5 h-2.5" />
                  </span>
                ) : active ? (
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-rule-strong border-t-brand-blue animate-spin" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-rule-strong" />
                )}
              </span>
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
