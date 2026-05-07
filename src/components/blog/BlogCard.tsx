import Link from 'next/link';
import type { PostMeta } from '@/lib/mdx';
import { CATEGORY_LABELS } from '@/lib/blogConstants';

interface BlogCardProps {
  post: PostMeta;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
      >
        {/* Image area */}
        <div className="relative h-64 lg:h-80 bg-gradient-to-br from-brand-blue/30 to-brand-cyan/20 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
          <span className="relative z-10 text-white/20 text-6xl font-bold font-[family-name:var(--font-jakarta)] select-none">
            Q
          </span>
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
      {/* Image placeholder */}
      <div className="h-44 bg-gradient-to-br from-brand-blue/20 to-brand-cyan/10 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
        <span className="relative z-10 text-white/10 text-4xl font-bold font-[family-name:var(--font-jakarta)] select-none">
          Q
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-blue/15 text-brand-cyan border border-brand-blue/25">
            {categoryLabel}
          </span>
        </div>

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
