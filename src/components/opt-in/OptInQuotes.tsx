"use client";

import { useCallback, useEffect, useState } from "react";
import { Star } from "@phosphor-icons/react";

const QUOTES = [
  {
    quote:
      "I couldn't believe how quickly we closed $360k in a single month as soon as we had Quotie dialled in. The multi-option proposals are a game changer, clients love being able to choose what works for them.",
    name: "Jed Bolton",
    role: "Director, Bolton EC",
  },
  {
    quote:
      "Quotie has been a great resource for our company. For solar installs we need a way to store data and track each job's progress from approval to installation and Quotie handles this perfectly. For anyone looking for a similar solution this would be a great option to check out!",
    name: "Benjamin Hughes",
    role: "Director, Hughes Electrical Group",
  },
  {
    quote:
      "I know exactly where every single quote is at, every single day. Who needs a follow-up, who's ready to go. Complete visibility into the pipeline for the first time ever.",
    name: "Lachlan Williams",
    role: "Director, Coastal Cleans Co",
  },
] as const;

export default function OptInQuotes() {
  const [active, setActive] = useState(0);
  const current = QUOTES[active];

  const next = useCallback(() => {
    setActive((i) => (i + 1) % QUOTES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="mb-10 text-center">
      <div className="mb-3 flex items-center justify-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} weight="fill" className="h-3.5 w-3.5 text-amber-400" />
        ))}
      </div>

      <blockquote
        key={current.name}
        className="mx-auto mb-4 max-w-[480px] text-[15px] leading-relaxed text-slate-700"
      >
        &ldquo;{current.quote}&rdquo;
      </blockquote>

      <p className="text-sm font-semibold text-slate-900">{current.name}</p>
      <p className="mt-0.5 text-xs text-slate-500">{current.role}</p>

      <div className="mt-4 flex items-center justify-center gap-2">
        {QUOTES.map((q, i) => (
          <button
            key={q.name}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Quote from ${q.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-slate-800" : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
