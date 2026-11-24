import { Check, Wrench } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import CatalogMock from "./CatalogMock";

const YOURS = [
  "Change the price of any product or material",
  "Add a new product to an existing group",
  "Switch a product off without deleting it",
];

const OURS = [
  "How a price is calculated — rules, conditions, what triggers what",
  "What the form asks, and when it asks it",
  "The wording in your quote: scope, inclusions, terms",
  "New product groups and the data behind them",
];

export default function Catalog() {
  return (
    <section id="pricing-catalog" className="bg-sheet border-y border-rule py-20 lg:py-28 scroll-mt-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <Reveal>
            <SectionHeader
              badge="Your pricing catalog"
              trail="Prices are yours to change"
              title="Change your prices. The logic stays put."
              gradient="The logic stays put."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-soft text-lg leading-relaxed text-pretty">
              Supplier put the price up? Open your catalog, change the number,
              publish. Every quote from then on uses it. The rules we built
              around that price don&apos;t move, so you can&apos;t break your
              quoting by updating it.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 lg:gap-14 items-start">
          <Reveal delay={0.1}>
            <CatalogMock />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              Real Quotie screen, sample data
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border-t-2 border-ink">
              <div className="py-6 border-b border-rule">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
                  You change, any time
                </h3>
                <ul className="space-y-2.5">
                  {YOURS.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                      <Check weight="bold" className="w-3.5 h-3.5 shrink-0 mt-1.5 text-brand-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-6 border-b border-rule">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
                  We change, with you
                </h3>
                <ul className="space-y-2.5">
                  {OURS.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                      <Wrench weight="bold" className="w-3.5 h-3.5 shrink-0 mt-1.5 text-ink-faint" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-ink-soft leading-relaxed mt-6 text-pretty">
              Edits sit in a draft until you review the before and after and
              publish. A product your quotes still rely on can&apos;t be
              deleted, only switched off. Anything that changes how your
              business quotes goes through a person on our team, who makes the
              change and checks it against your quotes.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
