"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/lib/faqData";

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = `faq-${index}`;
  return (
    <div className="border-b border-rule">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={id}
          className="group w-full flex items-center justify-between py-5 text-left gap-6"
        >
          <span
            className={`font-jakarta font-bold text-[17px] tracking-[-0.01em] transition-colors ${
              isOpen ? "text-brand-blue" : "text-ink group-hover:text-brand-blue"
            }`}
          >
            {item.q}
          </span>
          <Plus
            weight="bold"
            className={`flex-shrink-0 w-4 h-4 text-ink-faint transition-transform duration-300 ${
              isOpen ? "rotate-45 text-brand-blue" : ""
            }`}
          />
        </button>
      </h3>
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-10 text-ink-soft leading-relaxed text-pretty">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              badge="Common Questions"
              title="Got questions? We've got answers."
            />
          </div>

          <div className="border-t-2 border-ink">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                index={i}
                item={faq}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
