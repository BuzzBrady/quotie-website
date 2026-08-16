const CLIENTS = [
  "Bolton EC",
  "Hughes Electrical Group",
  "Coastal Cleans Co",
  "HDK Long Run Roofing",
] as const;

export default function ApplyClientLogos() {
  return (
    <div className="text-center">
      <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
        Used by trade businesses
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CLIENTS.map((name) => (
          <div
            key={name}
            className="flex min-h-[64px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
          >
            <span className="font-[family-name:var(--font-jakarta)] text-[13px] font-bold leading-tight text-slate-500">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
