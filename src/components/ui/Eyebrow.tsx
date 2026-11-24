/**
 * Mono label that opens a section — set like the reference line on a quote.
 * `trail` is the right-hand side of the dotted leader (optional).
 */
export default function Eyebrow({
  children,
  trail,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  trail?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-baseline gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] ${
        dark ? "text-white/55" : "text-ink-faint"
      } ${className}`}
      style={
        dark
          ? ({ "--leader-color": "rgba(255,255,255,0.22)" } as React.CSSProperties)
          : undefined
      }
    >
      <span className={dark ? "text-brand-cyan" : "text-brand-blue"}>{children}</span>
      {trail !== undefined && (
        <>
          <span className="leader hidden sm:block" aria-hidden />
          <span className="hidden sm:inline">{trail}</span>
        </>
      )}
    </div>
  );
}
