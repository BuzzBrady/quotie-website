import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getPostsByCategory } from '@/lib/mdx';
import { createMetadata } from '@/lib/metadata';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import BlogCard from '@/components/blog/BlogCard';
import { ALL_CATEGORIES, CATEGORY_LABELS } from '@/lib/blogConstants';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) return {};

  return createMetadata({
    title: `${label} — Quotie Blog`,
    description: `Articles and guides on ${label.toLowerCase()} for trades businesses.`,
    path: `/blog/category/${category}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-28 sm:pt-32 lg:pt-40 pb-10 lg:pb-14">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint hover:text-ink transition-colors mb-8"
          >
            <span aria-hidden>&larr;</span>
            All Posts
          </Link>
          <SectionHeader
            as="h1"
            badge={label}
            trail={`${posts.length} ${posts.length === 1 ? 'article' : 'articles'}`}
            title={label}
          />
        </Container>
      </section>

      {/* Category filter */}
      <div className="bg-paper/90 backdrop-blur-md border-y border-rule sticky top-16 lg:top-[72px] z-20">
        <Container>
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
            <Link
              href="/blog"
              className="flex-none py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint border-b-2 border-transparent -mb-px hover:text-ink transition-colors"
            >
              All
            </Link>
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                aria-current={cat.slug === category ? 'page' : undefined}
                className={`flex-none py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] border-b-2 -mb-px transition-colors ${
                  cat.slug === category
                    ? 'text-ink border-brand-cyan'
                    : 'text-ink-faint border-transparent hover:text-ink'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Posts */}
      <section className="bg-paper py-12 lg:py-16 min-h-[50vh]">
        <Container>
          {posts.length > 0 ? (
            <div className="border-t-2 border-ink">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24">
              <p className="text-ink-soft mb-4">No posts in this category yet.</p>
              <Link href="/blog" className="text-brand-blue text-sm font-semibold hover:underline">
                View all posts
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
