"use client";

import { useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { APPLY_FAQS } from "@/components/apply/applyFaqs";

type FaqItem = { q: string; a: string };

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-[15px] font-semibold text-slate-900">{item.q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center">
          {isOpen ? (
            <Minus weight="bold" className="w-3 h-3 text-slate-500" />
          ) : (
            <Plus weight="bold" className="w-3 h-3 text-slate-500" />
          )}
        </span>
      </button>
      {isOpen && (
        <p className="pb-4 text-sm leading-relaxed text-slate-600">{item.a}</p>
      )}
    </div>
  );
}

export default function ApplyFaq({
  items = APPLY_FAQS,
  heading = "Common questions",
}: {
  items?: readonly FaqItem[];
  heading?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div>
      <p className="mb-4 text-center text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
        {heading}
      </p>
      <div>
        {items.map((faq, i) => (
          <AccordionItem
            key={faq.q}
            item={faq}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
