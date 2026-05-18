# SEO Reference — Quotie Marketing Website

Audit performed 2026-05-15. Overall score: 9/10 (up from 8.5 after fixes).

---

## What's In Place

### Metadata
- Centralized `createMetadata()` in `src/lib/metadata.ts` — every page uses it
- Unique titles and descriptions on all pages (homepage, features, pricing, industries, blog, about, contact, demo, changelog, privacy, terms)
- Title template: `%s | Quotie` via root layout
- `metadataBase` set to `https://quotie.au`
- Locale: `en_AU`

### Canonical URLs
- Automatically set via `alternates.canonical` in `createMetadata()`
- Every page resolves to its full absolute URL

### Open Graph & Twitter
- Dynamic OG images generated at `/og?title=&subtitle=&tag=` (edge runtime)
- 1200x630px, brand-aligned design with logo
- Twitter card type: `summary_large_image`
- OG site name, locale, and type set in root layout

### Robots.txt (`src/app/robots.ts`)
- `User-Agent: *`, `Allow: /`, `Disallow: /api/`
- Sitemap URL: `https://quotie.au/sitemap.xml`

### Sitemap (`src/app/sitemap.ts`)
- All static routes with priority and changeFrequency
- All 9 industry pages (priority 0.8, monthly)
- All blog posts (priority 0.6, monthly, lastModified from post date) — ADDED
- All blog category pages (priority 0.5, weekly) — ADDED

### Structured Data / JSON-LD (`src/components/seo/JsonLd.tsx`)
- `SoftwareApplicationSchema` — rendered in root layout (every page)
- `OrganizationSchema` — rendered in root layout (every page)
- `FAQSchema` — rendered on homepage with all 8 FAQ items
- `BlogPosting` schema — rendered on each blog post page (headline, author, datePublished, publisher, mainEntityOfPage)

### Heading Hierarchy
- Every page has a single H1
- Headings follow H1 > H2 > H3 order throughout

### Image SEO
- All images have descriptive `alt` attributes
- Showcase images: `alt="{Industry} page {n}"`
- Logo images: `alt="Quotie"`

### Internal Linking
- Header: 5 nav links (Features, Pricing, Industries, Blog, About)
- Footer: 4 sections (Product, Industries, Resources, Legal) covering all key pages
- No page is more than 2 clicks from homepage

### Blog SEO
- Dynamic metadata per post (title, description, canonical, OG image, article type, publishedTime)
- Category pages with metadata
- Static generation via `generateStaticParams()`
- Reading time calculated automatically
- BlogPosting JSON-LD on every post

### Performance
- Fonts: Plus Jakarta Sans + DM Sans, both with `display: swap`
- Static generation for all industry and blog pages
- Showcase images: WebP format, 1200px wide

---

## Changes Made (2026-05-15)

### 1. Wired up JSON-LD schemas (HIGH priority)
**Files:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/seo/JsonLd.tsx`

- `SoftwareApplicationSchema` and `OrganizationSchema` were defined but never rendered anywhere
- Added both to root layout so they appear on every page
- Added `FAQSchema` to homepage, mapping the 8 FAQ items from `src/lib/faqData.ts`

### 2. Added BlogPosting schema to blog posts (HIGH priority)
**File:** `src/app/blog/[slug]/page.tsx`

- Added inline JSON-LD `BlogPosting` schema with: headline, description, datePublished, author, publisher, mainEntityOfPage, and optional image
- Helps Google show rich results for blog content

### 3. Added blog posts and categories to sitemap (HIGH priority)
**File:** `src/app/sitemap.ts`

- Blog posts now appear in sitemap with `priority: 0.6`, `changeFrequency: monthly`, and `lastModified` set to the post's date
- Blog category pages now appear with `priority: 0.5`, `changeFrequency: weekly`
- Previously only static routes and industry pages were listed

### 4. Removed placeholder social links from footer (MEDIUM priority)
**File:** `src/components/layout/Footer.tsx`

- Twitter, LinkedIn, Facebook links pointed to `#twitter`, `#linkedin`, `#facebook` (dead links)
- Removed entirely — add back when real profile URLs exist

### 5. Extracted FAQ data to shared module
**File:** `src/lib/faqData.ts` (new)

- FAQ items moved from the client component (`FAQ.tsx`) to a shared module so both the client component and the server-rendered FAQSchema can use the same data
- `src/components/sections/FAQ.tsx` now imports from `src/lib/faqData.ts`

---

## Remaining Opportunities (lower priority)

### Migrate showcase images to `next/image`
- `src/components/sections/Showcase.tsx` uses raw `<img>` tags with eslint-disable
- `next/image` would add automatic srcset, lazy loading, and format negotiation
- Risk: the auto-scroll strip + CSS blur design may need rework

### Add BreadcrumbSchema for blog
- Blog posts and category pages would benefit from breadcrumb structured data
- Schema: Home > Blog > Category > Post title

### Custom blog category descriptions
- Category pages currently auto-generate: "Articles and guides on {label} for trades businesses"
- Custom per-category descriptions in `src/lib/blogConstants.ts` would improve CTR in search results

### Add social profile URLs
- When real Twitter/LinkedIn/Facebook accounts exist, add them back to the footer
- Also add URLs to the `sameAs` array in `OrganizationSchema` (`src/components/seo/JsonLd.tsx` line 77)

### Monitor Core Web Vitals
- Run PageSpeed Insights on key pages after deployment
- Key metrics: LCP, FID/INP, CLS
