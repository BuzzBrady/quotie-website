import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { createMetadata } from '@/lib/metadata';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import { ALL_CATEGORIES } from '@/lib/blogConstants';

export const metadata = createMetadata({
  title: 'Blog — Quoting Tips, Sales Advice & Trades Insights',
  description:
    'Practical advice for trades businesses on quoting faster, closing more jobs, and growing your pipeline.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: '#08080c' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #1f61aa, transparent)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #39b9e5, transparent)' }}
          />
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 px-4 py-1.5 text-sm font-semibold mb-6">
              Quotie Blog
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-[family-name:var(--font-jakarta)] mb-4">
              Built for Trades
            </h1>
            <p className="text-white/40 text-lg leading-relaxed">
              Practical guides on quoting, selling, and growing your trade business.
            </p>
          </div>
        </Container>
      </section>

      {/* Category filter */}
      <div style={{ background: '#08080c' }} className="border-b border-white/[0.06] sticky top-[64px] z-20">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
            <Link
              href="/blog"
              className="flex-none px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 transition-all hover:bg-white/15"
            >
              All
            </Link>
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="flex-none px-4 py-1.5 rounded-full text-sm font-medium text-white/50 border border-white/[0.08] hover:text-white hover:border-white/20 transition-all"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <section style={{ background: '#08080c' }} className="py-16 min-h-[60vh]">
        <Container>
          {/* Featured post */}
          {featured && (
            <div className="mb-12">
              <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-4">
                Featured
              </p>
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <>
              {featured && (
                <div className="border-t border-white/[0.06] pt-12 mb-8">
                  <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
                    Latest Posts
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}

          {posts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/30">No posts yet.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
