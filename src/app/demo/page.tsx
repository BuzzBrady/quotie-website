import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import LeadCaptureForm from "@/components/lead-capture/LeadCaptureForm";
import { CheckCircle2, Star } from "lucide-react";

export const metadata = createMetadata({
  title: "Book a Free Demo — See Quotie in Action",
  description:
    "Book a free personalised demo and see how Quotie helps trades businesses quote faster and close more work. Personalised walkthrough, live quote generation, no commitment required.",
  path: "/demo",
});

const expectations = [
  "Personalised walkthrough of Quotie for your specific trade",
  "See real quotes generated live in under 30 seconds",
  "Get your first template built during the call",
  "No commitment required — zero pressure",
];

const testimonials = [
  {
    quote:
      "We were sending quotes from Word documents. Now we send a branded PDF with three options in about 20 seconds. Our close rate went up immediately.",
    author: "Jake T.",
    role: "Electrical Contractor, Brisbane",
    rating: 5,
  },
  {
    quote:
      "The follow-up dashboard alone is worth it. I used to forget about quotes after sending. Now I know exactly who to call and when.",
    author: "Sarah M.",
    role: "Solar Installer, Perth",
    rating: 5,
  },
  {
    quote:
      "Setup took about an hour. The team helped me get my first template going on the demo call. Couldn't have been easier.",
    author: "Dan R.",
    role: "Plumber, Melbourne",
    rating: 5,
  },
];

export default function DemoPage() {
  return (
    <>
      {/* Main hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: "#08080c" }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-cyan/8 rounded-full blur-[80px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[60px]" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm font-semibold text-white/50 mb-6">
                Free, no-obligation demo
              </div>
              <h1
                className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-white mb-5"
                style={{ fontSize: "clamp(32px, 4.5vw, 64px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
              >
                See Quotie{" "}
                <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                  in Action
                </span>
              </h1>
              <p className="text-white/40 text-lg leading-relaxed mb-8 max-w-md">
                Book a free demo and we&apos;ll show you how to quote faster and close more work — personalised for your trade and your business.
              </p>

              <ul className="space-y-4 mb-10">
                {expectations.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-white/60 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-white/40 text-xs ml-2">5.0 from trades across Australia</span>
                </div>
                <p className="text-white/50 text-sm italic">
                  &ldquo;Best quoting tool we&apos;ve ever used. Setup in a day, paying for itself by the end of the week.&rdquo;
                </p>
                <p className="text-white/30 text-xs mt-2">— Mark B., Roofing Contractor, Sydney</p>
              </div>
            </div>

            {/* Right: form */}
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl opacity-30 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(59,130,246,0.25), rgba(57,185,229,0.1), transparent 70%)",
                }}
              />
              <div className="relative rounded-2xl border border-white/[0.1] bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
                <div className="p-8">
                  <h2 className="text-xl font-bold text-white mb-1 font-[family-name:var(--font-jakarta)]">
                    Book your free demo
                  </h2>
                  <p className="text-white/40 text-sm mb-6">
                    Takes 30 seconds. We&apos;ll be in touch within one business day.
                  </p>
                  <LeadCaptureForm source="demo_page" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section
        className="py-20 border-t border-white/[0.06]"
        style={{ background: "#08080c" }}
      >
        <Container>
          <p className="text-center text-white/25 text-sm uppercase tracking-widest font-semibold mb-10">
            What trades businesses say
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-white/70 text-sm font-semibold">{t.author}</p>
                  <p className="text-white/30 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
