import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ background: "#08080c" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <Container className="relative z-10 text-center py-20">
        <div className="text-8xl font-extrabold text-white/5 font-[family-name:var(--font-jakarta)] mb-6 select-none">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-[family-name:var(--font-jakarta)]">
          Page not found
        </h1>

        <p className="text-white/40 text-lg max-w-md mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] text-[15px] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,232,237,0.1)]"
            style={{ background: "#e8e8ed", color: "#08080c" }}
          >
            Back to Home
          </a>
          <a
            href="/industries"
            className="text-[15px] transition-colors duration-300 hover:text-white/70"
            style={{ color: "rgba(232,232,237,0.4)" }}
          >
            Browse Industries →
          </a>
        </div>
      </Container>
    </section>
  );
}
