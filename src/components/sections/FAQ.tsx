"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/lib/faqData";

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.07]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-[15px] sm:text-base font-medium text-white/90">
          {item.q}
        </span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-white/[0.12] flex items-center justify-center">
          {isOpen ? (
            <Minus weight="duotone" className="w-3 h-3 text-white/60" />
          ) : (
            <Plus weight="duotone" className="w-3 h-3 text-white/60" />
          )}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0px" }}
      >
        <p className="pb-5 text-sm sm:text-[15px] text-white/45 leading-relaxed">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 lg:py-24" style={{ background: "#08080c" }}>
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <SectionHeader
              badge="Common Questions"
              title="Got questions? We've got answers."
            />
          </div>

          <div>
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
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
