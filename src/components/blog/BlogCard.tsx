import Link from 'next/link';
import type { PostMeta } from '@/lib/mdx';
import { CATEGORY_LABELS } from '@/lib/blogConstants';

interface BlogCardProps {
  post: PostMeta;
  featured?: boolean;
}

/**
 * Featured: a large sheet with the post image.
 * Default: one row in the ledger of posts — stack these inside a
 * `border-t-2 border-ink` container (see blog/page.tsx).
 */
export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;
  const hasImage = !!post.image;

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group sheet rounded-lg overflow-hidden grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      >
        {hasImage && (
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[340px] overflow-hidden border-b lg:border-b-0 lg:border-r border-rule bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className={`p-6 sm:p-8 lg:p-10 flex flex-col ${hasImage ? '' : 'lg:col-span-2'}`}>
          <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint mb-5">
            <span className="text-brand-blue">{categoryLabel}</span>
            <span className="leader" aria-hidden />
            <span>Featured</span>
          </div>

          <h2 className="text-2xl lg:text-[32px] font-extrabold text-ink font-jakarta tracking-[-0.03em] leading-[1.12] mb-4 text-balance group-hover:text-brand-blue transition-colors">
            {post.title}
          </h2>

          <p className="text-ink-soft leading-relaxed mb-8 text-pretty">
            {post.description}
          </p>

          <div className="mt-auto pt-4 border-t border-rule flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            <span className="text-ink-soft">{post.author}</span>
            <span aria-hidden>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 md:grid-cols-[130px_minmax(0,1fr)_auto] gap-x-8 gap-y-2 items-baseline py-6 lg:py-7 border-b border-rule"
    >
      <div className="flex md:flex-col gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em]">
        <time dateTime={post.date} className="text-ink-faint">
          {formatDate(post.date)}
        </time>
        <span className="text-brand-blue">{categoryLabel}</span>
      </div>

      <div className="min-w-0">
        <h3 className="text-xl lg:text-2xl font-extrabold text-ink font-jakarta tracking-[-0.025em] leading-snug mb-1.5 text-balance group-hover:text-brand-blue transition-colors">
          {post.title}
        </h3>
        <p className="text-ink-soft text-[15px] leading-relaxed line-clamp-2 max-w-2xl">
          {post.description}
        </p>
      </div>

      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint md:text-right whitespace-nowrap">
        {post.readingTime}
        <span
          aria-hidden
          className="ml-2 inline-block text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-blue"
        >
          &rarr;
        </span>
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
