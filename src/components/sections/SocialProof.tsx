import Image from "next/image";
import Container from "@/components/ui/Container";

export default function SocialProof() {
  return (
    <section className="py-10 border-t border-white/[0.04]" style={{ background: "#08080c" }}>
      <Container>
        <div className="flex items-center justify-center">
          <span className="text-sm text-white/20 tracking-wide font-semibold text-center">
            Trusted by trades across Australia &amp; New Zealand
          </span>
        </div>
      </Container>

      {/* Partner strip */}
      <Container>
        <div className="border-t border-white/[0.04] mt-6 pt-6 pb-2 flex items-center justify-center gap-4">
          <span className="text-xs text-white/20 uppercase tracking-widest font-semibold whitespace-nowrap">
            Partnered with
          </span>
          <a href="/sales-executive" className="opacity-40 hover:opacity-60 transition-opacity" title="Quotie × Tradie Web Guys Sales Executive Program">
            <Image
              src="/twg-logo.png"
              alt="Tradie Web Guys"
              width={120}
              height={16}
              className="w-auto h-auto"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
