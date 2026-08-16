import { CheckCircle } from "@phosphor-icons/react/ssr";

export default function OptInThanks() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white px-5 text-center">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(31,97,170,0.16) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-md">
        <div className="mb-8 flex items-center justify-center">
          <span className="font-[family-name:var(--font-jakarta)] text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            Quotie
          </span>
        </div>

        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle weight="duotone" className="h-7 w-7 text-emerald-500" />
        </div>

        <h1 className="mb-3 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-slate-900">
          You&apos;re in.
        </h1>
        <p className="text-base leading-relaxed text-slate-500">
          One of the Quotie team will call you shortly to show you how it works
          for your trade. Keep an eye on your phone.
        </p>
      </div>
    </div>
  );
}
