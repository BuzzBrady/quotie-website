import Link from 'next/link';
import type { PostMeta } from '@/lib/mdx';
import { CATEGORY_LABELS } from '@/lib/blogConstants';
import {
  Lightning,
  Trophy,
  Lightbulb,
  Rocket,
  TrendUp,
} from '@phosphor-icons/react/ssr';

const CATEGORY_STYLES: Record<
  string,
  {
    gradient: string;
    icon: React.ComponentType<{ weight: 'duotone'; className: string }>;
    accent: string;
    pattern: string;
  }
> = {
  'quoting-tips': {
    gradient: 'from-brand-blue/40 to-brand-cyan/25',
    icon: Lightning,
    accent: 'text-brand-cyan/30',
    pattern: 'bg-[radial-gradient(circle_at_80%_20%,rgba(57,185,229,0.15),transparent_50%)]',
  },
  sales: {
    gradient: 'from-emerald-600/35 to-teal-500/20',
    icon: Trophy,
    accent: 'text-emerald-400/30',
    pattern: 'bg-[radial-gradient(circle_at_20%_80%,rgba(52,211,153,0.12),transparent_50%)]',
  },
  'industry-insights': {
    gradient: 'from-violet-600/35 to-blue-500/20',
    icon: Lightbulb,
    accent: 'text-violet-400/30',
    pattern: 'bg-[radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.12),transparent_50%)]',
  },
  'product-updates': {
    gradient: 'from-orange-500/35 to-amber-500/20',
    icon: Rocket,
    accent: 'text-orange-400/30',
    pattern: 'bg-[radial-gradient(circle_at_30%_30%,rgba(251,146,60,0.12),transparent_50%)]',
  },
  'business-growth': {
    gradient: 'from-emerald-500/35 to-cyan-500/20',
    icon: TrendUp,
    accent: 'text-emerald-400/30',
    pattern: 'bg-[radial-gradient(circle_at_60%_40%,rgba(16,185,129,0.12),transparent_50%)]',
  },
};

const DEFAULT_STYLE = CATEGORY_STYLES['quoting-tips'];

interface BlogCardProps {
  post: PostMeta;
  featured?: boolean;
}

function Fallback({ category, className }: { category: string; className?: string }) {
  const style = CATEGORY_STYLES[category] ?? DEFAULT_STYLE;
  const Icon = style.icon;
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} ${className ?? ''}`}>
      <div className={`absolute inset-0 ${style.pattern}`} />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <Icon weight="duotone" className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 ${style.accent}`} />
    </div>
  );
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;
  const hasImage = !!post.image;

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
      >
        <div className="relative h-64 lg:h-80 overflow-hidden">
          {hasImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/60 to-[#08080c]/30" />
            </>
          ) : (
            <Fallback category={post.category} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/20 text-brand-cyan border border-brand-blue/30">
              {categoryLabel}
            </span>
            <span className="text-white/30 text-xs uppercase tracking-wider font-semibold">
              Featured
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-extrabold text-white font-[family-name:var(--font-jakarta)] tracking-tight mb-3 group-hover:text-brand-cyan transition-colors">
            {post.title}
          </h2>

          <p className="text-white/50 leading-relaxed mb-6 text-base">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-white/30 text-sm">
            <span>{post.author}</span>
            <span>&middot;</span>
            <span>{formatDate(post.date)}</span>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/50 to-[#08080c]/20" />
          </>
        ) : (
          <Fallback category={post.category} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
        {/* Category badge floating on thumbnail */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/40 backdrop-blur-md text-white/80 border border-white/10">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white font-[family-name:var(--font-jakarta)] tracking-tight mb-2 group-hover:text-brand-cyan transition-colors leading-snug">
          {post.title}
        </h3>

        <p className="text-white/40 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.description}
        </p>

        <div className="flex items-center gap-3 text-white/25 text-xs mt-auto pt-4 border-t border-white/[0.06]">
          <span className="font-medium">{post.author}</span>
          <span>&middot;</span>
          <span>{formatDate(post.date)}</span>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
