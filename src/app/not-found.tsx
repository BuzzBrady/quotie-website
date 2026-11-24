import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-paper min-h-screen flex items-center">
      <Container className="w-full pt-28 pb-20">
        <div className="max-w-xl">
          <Eyebrow trail="Line item not found" className="mb-6">
            Error 404
          </Eyebrow>

          <h1 className="font-jakarta font-extrabold text-ink tracking-[-0.04em] leading-[1.02] text-[clamp(2.4rem,6vw,4.25rem)] mb-5">
            Page <span className="mark-live">not found</span>
          </h1>

          <p className="text-ink-soft text-lg leading-relaxed max-w-md mb-9">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/" variant="ink" size="lg">
              Back to Home
            </ButtonLink>
            <ButtonLink href="/industries" variant="outline" size="lg">
              Browse Industries →
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
