interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  gradient?: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  badgeIcon,
  title,
  gradient,
  subtitle,
  dark = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 ${
            dark
              ? "border-white/[0.08] bg-white/[0.03] text-white/50"
              : "border-slate-200 bg-white px-4 py-1.5 text-slate-600 shadow-sm"
          }`}
        >
          {badgeIcon}
          {badge}
        </div>
      )}

      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 font-[family-name:var(--font-jakarta)] ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {gradient ? (
          <>
            {title.split(gradient)[0]}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              {gradient}
            </span>
            {title.split(gradient)[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-base sm:text-lg max-w-xl mx-auto ${
            dark ? "text-white/40" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
