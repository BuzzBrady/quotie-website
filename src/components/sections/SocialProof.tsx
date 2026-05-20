import Image from "next/image";
import Container from "@/components/ui/Container";

const customers = [
  "Bolton EC",
  "Virtue Roofing",
  "Coastal Cleans Co",
  "Hughes Electrical",
  "HDK Longrun Roofing",
];

export default function SocialProof() {
  return (
    <section className="py-10 border-t border-white/[0.04]" style={{ background: "#08080c" }}>
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span className="text-xs text-white/20 uppercase tracking-widest font-semibold whitespace-nowrap">
            Trusted by
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {customers.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-white/15 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Partner strip */}
      <Container>
        <div className="border-t border-white/[0.04] pt-6 pb-2 flex items-center justify-center gap-4">
          <span className="text-xs text-white/20 uppercase tracking-widest font-semibold whitespace-nowrap">
            Partnered with
          </span>
          <a href="/sales-executive" className="opacity-40 hover:opacity-60 transition-opacity">
            <Image
              src="/twg-logo.png"
              alt="Tradie Web Guys"
              width={120}
              height={16}
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
