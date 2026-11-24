import Container from "@/components/ui/Container";

// Real customers only — see CLAUDE.md.
const CUSTOMERS = ["Bolton EC", "Hughes Electrical Group", "Coastal Cleans Co"];

export default function SocialProof() {
  return (
    <section className="bg-paper pb-14 lg:pb-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-baseline gap-x-4 gap-y-4 border-t border-rule pt-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint shrink-0">
            Trusted by trades across Australia &amp; New Zealand
          </span>
          <span className="leader hidden md:block" aria-hidden />
          <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-2">
            {CUSTOMERS.map((c) => (
              <li
                key={c}
                className="font-jakarta font-extrabold tracking-[-0.02em] text-ink/70 text-[15px] sm:text-base"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
