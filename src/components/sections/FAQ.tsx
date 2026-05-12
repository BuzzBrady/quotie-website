"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const FAQS = [
  {
    q: "What is Quotie?",
    a: "Quotie is a done-for-you quoting platform built for trades businesses. We build your pricing system and templates during onboarding — then your team generates branded proposals in under 30 seconds, with multiple options, automatic calculations, and a built-in follow-up pipeline.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most businesses are quoting within a day. We offer hands-on onboarding for every customer, so you're not left figuring it out alone. We'll help you map your pricing and have your first template ready to go.",
  },
  {
    q: "Can I customise my quote templates?",
    a: "Absolutely. We build your quote forms and PDF templates during onboarding — every field, layout, and calculation is tailored to exactly how your business works. After that, you just come to us for price changes or new materials.",
  },
  {
    q: "Does Quotie integrate with other tools?",
    a: "Yes — GoHighLevel, ServiceM8, Gmail, Outlook, Google Drive, and Dropbox integrations are built in. Contacts sync automatically, emails send from your own account, and documents can be stored where you already work.",
  },
  {
    q: "How does the PDF generation work?",
    a: "Fill in the quote form, hit generate. Quotie's engine builds a branded PDF from your template in seconds — complete with your logo, cover page, multiple options, totals, and any custom fields you've set up.",
  },
  {
    q: "Can I send quotes directly from Quotie?",
    a: "Yes. Compose an email, attach your PDFs, and send from your own Gmail or Outlook account — so clients see your email address, not a third-party tool. Replies come back directly to your inbox.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted at rest and in transit. Each business's data is completely isolated — your data is only visible to your team, no exceptions.",
  },
  {
    q: "What if I need help getting started?",
    a: "Every customer gets full onboarding. We build your quote forms, set up your PDF templates, configure your pricing, set up your branding, and train your team. You don't need to figure anything out yourself — we handle the hard part so you can start quoting from day one.",
  },
] as const;

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
            <Minus className="w-3 h-3 text-white/60" />
          ) : (
            <Plus className="w-3 h-3 text-white/60" />
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
