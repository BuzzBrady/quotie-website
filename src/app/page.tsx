import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Quotie — Quote Faster. Close More. | Quoting Software for Trades",
  description:
    "Build quotes in under 30 seconds. Send branded proposals with multiple options, track your pipeline, and close more work. Built for Australian & NZ trades businesses.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#08080c" }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20">
          <h1
            className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-brand-text mb-5"
            style={{
              fontSize: "clamp(36px, 5.5vw, 80px)",
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
            }}
          >
            From enquiry to proposal
            <br />
            <span className="bg-gradient-to-r from-[#3b82f6] to-brand-cyan bg-clip-text text-transparent">
              in under 30 seconds.
            </span>
          </h1>

          <p
            className="text-brand-muted max-w-[420px] mb-8"
            style={{
              fontSize: "clamp(14px, 1.1vw, 18px)",
              lineHeight: 1.7,
            }}
          >
            Build your pricing system once. Generate branded quotes instantly —
            with multiple options, automatic calculations, and everything your
            client needs to say yes.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="/demo"
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-[10px] text-[14px] sm:text-[15px] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,232,237,0.1)]"
              style={{
                background: "#e8e8ed",
                color: "#08080c",
                letterSpacing: "-0.01em",
              }}
            >
              Schedule A Demo
            </a>
            <a
              href="/features"
              className="text-[14px] sm:text-[15px] transition-colors duration-300 hover:text-white/80"
              style={{ color: "rgba(232,232,237,0.45)" }}
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
