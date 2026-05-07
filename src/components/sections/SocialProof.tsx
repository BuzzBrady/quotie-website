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
    </section>
  );
}
