import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { createMetadata } from '@/lib/metadata';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
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
      <section className="bg-paper pt-28 sm:pt-32 lg:pt-40 pb-10 lg:pb-14">
        <Container>
          <SectionHeader
            as="h1"
            badge="Quotie Blog"
            trail={`${posts.length} ${posts.length === 1 ? 'article' : 'articles'}`}
            title="Built for Trades"
            subtitle="Practical guides on quoting, selling, and growing your trade business."
          />
        </Container>
      </section>

      {/* Category filter */}
      <div className="bg-paper/90 backdrop-blur-md border-y border-rule sticky top-16 lg:top-[72px] z-20">
        <Container>
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
            <Link
              href="/blog"
              aria-current="page"
              className="flex-none py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink border-b-2 border-brand-cyan -mb-px"
            >
              All
            </Link>
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="flex-none py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint border-b-2 border-transparent -mb-px hover:text-ink transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <section className="bg-paper py-12 lg:py-16 min-h-[60vh]">
        <Container>
          {/* Featured post */}
          {featured && (
            <div className="mb-14 lg:mb-20">
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* Post ledger */}
          {rest.length > 0 && (
            <>
              {featured && (
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-4">
                  Latest Posts
                </p>
              )}
              <div className="border-t-2 border-ink">
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}

          {posts.length === 0 && (
            <div className="py-24">
              <p className="text-ink-soft">No posts yet.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
