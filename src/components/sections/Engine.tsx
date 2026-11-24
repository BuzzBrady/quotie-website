import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * What the engine does between "Generate" and a finished quote, and why that
 * isn't an AI tool. Quotes are not live previews: the form is sent to the
 * company's engine and a document comes back.
 */
const JOBS = [
  {
    n: "01",
    title: "Calculations",
    body: "Your price lists, labour rates, margins, minimums, travel, rebates and the conditions between them. Worked through in the order your business works them through.",
    example: "Double storey → labour moves to the two-storey rate, access equipment is added.",
  },
  {
    n: "02",
    title: "Text building",
    body: "Scope of works, inclusions, exclusions and terms are assembled from wording we wrote with you. The right sentences go in for this job and the wrong ones stay out.",
    example: "Battery selected → the backup circuit paragraph is written into the scope.",
  },
  {
    n: "03",
    title: "Dynamic page rendering",
    body: "The document itself is built to fit the job. Pages, sections and option layouts appear, drop out and reflow based on what was quoted.",
    example: "Battery quoted → the battery pages are in. No battery, no pages.",
  },
] as const;

export default function Engine() {
  return (
    <section id="engine" className="bg-deep text-white py-20 lg:py-28 scroll-mt-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <Reveal>
            <SectionHeader
              dark
              badge="When you hit generate"
              trail="Form in, engine, quote out"
              title="It's an engine built on your rules. Not an AI having a guess."
              gradient="Not an AI having a guess."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/65 text-lg leading-relaxed text-pretty">
              Your quote isn&apos;t a live preview and it isn&apos;t generated
              by a chatbot. When you hit generate, the form is sent to an
              engine we built for your business. It does three jobs and hands
              back a finished document.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16 grid md:grid-cols-3 border-t border-deep-rule">
          {JOBS.map((job, i) => (
            <Reveal key={job.n} delay={i * 0.08}>
              <div
                className={`h-full py-8 md:py-10 border-b border-deep-rule md:border-b-0 ${
                  i > 0 ? "md:pl-8 md:border-l md:border-deep-rule" : ""
                } ${i < JOBS.length - 1 ? "md:pr-8" : ""}`}
              >
                <div className="font-mono text-sm text-brand-cyan mb-4">{job.n}</div>
                <h3 className="font-jakarta font-extrabold text-white text-xl tracking-[-0.02em] mb-3">
                  {job.title}
                </h3>
                <p className="text-white/65 text-[15px] leading-relaxed text-pretty">
                  {job.body}
                </p>
                <p className="mt-5 font-mono text-[11px] leading-relaxed text-white/45">
                  {job.example}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 lg:mt-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:gap-16 pt-8 border-t border-deep-rule">
            <p className="font-jakarta font-bold text-white text-xl lg:text-2xl tracking-[-0.02em] leading-snug text-balance">
              Same answers in, same quote out. Every time, whoever on your
              team fills in the form.
            </p>
            <p className="text-white/65 leading-relaxed text-pretty">
              An AI tool writes something plausible and leaves you to check it.
              Your engine can only do what your rules say, and those rules were
              written by people who sat down with you and learned how you price
              a job. That&apos;s why setup takes real work, and why you can
              send the quote without re-reading every line.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
