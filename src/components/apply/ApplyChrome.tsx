import ApplyFooter from "@/components/apply/ApplyFooter";

export default function ApplyChrome({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F9] text-slate-900">
      <div
        className="relative z-20 bg-white"
        style={{
          boxShadow:
            "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 8px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div className="flex items-center justify-center px-4 py-3">
          <span className="font-[family-name:var(--font-jakarta)] text-xl sm:text-2xl font-bold uppercase tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            Quotie
          </span>
        </div>
      </div>

      <div
        className={`relative z-10 mx-auto flex w-full flex-1 flex-col px-5 pb-10 pt-8 sm:pt-12 ${
          wide ? "max-w-[880px]" : "max-w-[560px]"
        }`}
      >
        {children}
        <div className="mt-auto pt-10">
          <ApplyFooter />
        </div>
      </div>
    </div>
  );
}
