import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const STEPS = [
  {
    step: "01",
    who: "Us + you",
    title: "We map your pricing",
    description:
      "Onboarding starts with a working session: your products, rates, rules, and the way you actually price jobs.",
  },
  {
    step: "02",
    who: "Us",
    title: "We build your system",
    description:
      "Templates, calculations, conditional logic, branded PDFs, email templates — built and tested by us, typically live in a couple of weeks.",
  },
  {
    step: "03",
    who: "You",
    title: "You fill in a form",
    description:
      "From then on, every quote takes under 30 seconds. You only ever come back to us for price updates or new products.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            badge="Done for you"
            trail="Scope of works"
            title="We build it. You quote."
            gradient="You quote."
            subtitle="Quotie isn't software you set up. It's a system we build for you."
          />
        </Reveal>

        <ol className="mt-12 lg:mt-16 border-t-2 border-ink">
          {STEPS.map((s, i) => (
            <li key={s.step}>
              <Reveal delay={i * 0.08}>
                <div className="grid md:grid-cols-[110px_minmax(0,1fr)_minmax(0,1.25fr)_120px] gap-x-8 gap-y-2 items-baseline py-7 lg:py-9 border-b border-rule">
                  <span className="font-mono text-sm text-brand-blue">{s.step}</span>
                  <h3 className="font-jakarta font-extrabold text-ink text-2xl lg:text-[28px] tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed text-pretty">
                    {s.description}
                  </p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint md:text-right">
                    {s.who}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
