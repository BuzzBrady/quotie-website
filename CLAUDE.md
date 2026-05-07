# Quotie Marketing Website

SEO-optimized Next.js marketing site for Quotie — a B2B SaaS quoting platform for trades businesses.

## Quick Start

```bash
cd ~/Desktop/quotie-website
npm run dev -- --port 3001   # Dev server (3000 is the app)
npx next build               # Production build
```

## Architecture

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based config via `@theme inline` in globals.css)
- **Animations:** framer-motion (fade-in, orbital, tabbed transitions)
- **Blog:** MDX files in `src/content/blog/` via next-mdx-remote + gray-matter
- **Lead capture:** Supabase `leads` table (same prod instance as the app)
- **Hosting:** Vercel, Sydney region (`syd1`)
- **Repo:** github.com/BuzzBrady/quotie-website

## Relationship to the App

| | Marketing Site | Quotie App |
|--|--|--|
| **Repo** | `quotie-website` | `quote-pro-working` |
| **Stack** | Next.js (SSG) | Vite + React (SPA) |
| **Domain** | `quotie.au` (planned) | `app.quotie.au` (planned) |
| **Purpose** | SEO, lead capture, content | Product (quoting, CRM, jobs) |
| **Supabase** | Writes to `leads` table only | Full access |

The marketing site does NOT share components with the app. Design language is aligned (same brand colors, fonts, tone) but the codebases are independent.

## Domain & Deployment (TODO)

- `quotie.au` -> Vercel project for this repo
- `app.quotie.au` -> Vercel project for quote-pro-working
- Environment variables needed in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL` -- `https://ucmgleztmtyoptcflsia.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- the prod anon key (in `.env.local`)

## Brand

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-blue` | `#1f61aa` | Gradient start, primary accent |
| `brand-cyan` | `#39b9e5` | Gradient end, secondary accent |
| `brand-dark` | `#08080c` | Dark section backgrounds |
| `brand-text` | `#e8e8ed` | Light text on dark backgrounds |
| `brand-muted` | `rgba(232,232,237,0.5)` | Subdued text |

### Fonts
- **Headings:** Plus Jakarta Sans (600/700/800) -- `var(--font-jakarta)`
- **Body:** DM Sans (400/500/600/700) -- `var(--font-dm)`
- Both loaded via `next/font/google` with `display: swap`

### Gradient
The brand gradient is `from-brand-blue to-brand-cyan` (or `from-[#1f61aa] to-[#39b9e5]`). Used on logo text, headline accent words, CTA buttons, accent elements.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, header, footer, lead modal)
│   ├── page.tsx                # Homepage
│   ├── not-found.tsx           # 404
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # robots.txt
│   ├── og/route.tsx            # Dynamic OG image generation (edge runtime)
│   ├── api/leads/route.ts      # Server-side lead capture endpoint
│   ├── features/               # Features deep-dive page
│   ├── pricing/                # Pricing page (PricingClient.tsx)
│   ├── industries/             # Industry hub + 9 dynamic pages
│   │   ├── _data/industries.ts # Industry data (typed)
│   │   └── [slug]/page.tsx     # Dynamic industry pages
│   ├── blog/                   # Blog listing + posts + categories
│   │   ├── [slug]/page.tsx
│   │   └── category/[category]/page.tsx
│   ├── about/                  # About page (founders, story, values)
│   ├── contact/                # Contact form
│   ├── demo/                   # Demo request (high-intent conversion)
│   ├── changelog/              # Product updates timeline
│   ├── privacy/                # Privacy policy
│   └── terms/                  # Terms of service
├── components/
│   ├── layout/                 # Header, Footer
│   ├── sections/               # Homepage sections (Hero, Features, etc.)
│   ├── lead-capture/           # LeadCaptureForm, LeadModalProvider
│   ├── blog/                   # BlogCard, MDXComponents
│   ├── seo/                    # JsonLd structured data
│   └── ui/                     # Container, SectionHeader
├── content/blog/               # MDX blog posts
└── lib/                        # constants, metadata, supabase, mdx, blogConstants
```

## Key Patterns

### Client pages with metadata
If a page needs `"use client"`, metadata goes in a sibling `layout.tsx`:
```
src/app/features/
├── layout.tsx    # export const metadata = createMetadata(...)
└── page.tsx      # "use client" -- interactive page
```

### Lead capture
All CTAs use two mechanisms:
1. **LeadCaptureModal** -- `useLeadModal()` context hook with a `source` tag
2. **LeadCaptureForm** -- inline form (CTA section, demo page, contact page)

Both write to Supabase `leads` table with UTM params, referrer, and page URL. Source tags: `hero_schedule_demo`, `nav_get_started`, `pricing_team`, `demo_page`, `industry_{slug}`, etc.

### SEO
- Every page uses `createMetadata()` from `src/lib/metadata.ts`
- Dynamic OG images at `/og?title=&subtitle=&tag=`
- JSON-LD schemas: `SoftwareApplicationSchema`, `OrganizationSchema`, `FAQSchema`
- Sitemap includes all static routes + dynamic industry/blog slugs

### Blog posts
MDX files in `src/content/blog/` with frontmatter:
```yaml
---
title: "Post Title"
description: "SEO description"
date: "2026-05-07"
author: "Buzz Brady"
authorRole: "Founder, Quotie"
category: "quoting-tips"
tags: ["quoting", "productivity"]
featured: false
---
```
Categories: quoting-tips, sales, industry-insights, product-updates, business-growth

## Pricing (from Locky)

| Plan | Setup | Monthly | Users |
|------|-------|---------|-------|
| 1 Man Band | $3,000 | $300/mo | 1 |
| Small Team | $5,000 | $650/mo | 2-5 |
| 6+ Users | Contact us | Contact us | 6+ |

All prices + GST.

## Real Customers (ONLY use these for testimonials)

| Name | Role | Company | Industry |
|------|------|---------|----------|
| Jed Bolton | Director | Bolton EC | Solar & Electrical |
| Jake Ruwhiu | Director | Virtue Roofing | Metal Roofing |
| Cooper Kelly | Director | Coastal Cleans Co | Cleaning |

Do NOT invent testimonials. Do NOT use fake names.

## Founders

- **Lachlan Boys** ("Locky") -- Co-founder. Professional estimator. Built the original quoting system from trades experience.
- **Buzz Brady** -- Co-founder & Developer. Rebuilt the platform from scratch with modern tech.
- Both from the **Central Coast, NSW**, Australia.

## Feature Accuracy

### Real features (safe to claim):
- Quote template builder (conditional fields, matrix pricing, calculations)
- Instant PDF generation (HTML templates, branded, server-side)
- Multi-option proposals (up to 4 options per quote group)
- Email sending via Gmail/Outlook (native, from user's own address)
- Reply tracking (client replies appear in Quotie)
- CC/BCC support
- Customisable email templates with merge variables
- Follow-up dashboard (urgency sorting, reschedule tracking, notes)
- Pipeline tracking (status: draft, sent, won, lost)
- Won revenue, conversion rate, pipeline value metrics
- Contact management (multi-address, quote history)
- GoHighLevel two-way sync (contacts + opportunities)
- ServiceM8 integration (job creation)
- Automation workflows (triggers on quote events, webhook/HTTP actions)
- Job handoff (quote to job, configurable pipeline, SOPs, task tracking)
- Calendar (day/week/month views, drag-and-drop)
- Notifications (bell icon, real-time, daily digest)
- Multi-tenant with row-level security

### NOT features (do NOT claim):
- Open/read tracking on emails
- Digital signatures / e-signing
- Online payment collection / deposits
- Client-facing quote acceptance portal (planned, not shipped)
- SMS sending
- Invoicing
- Google Calendar sync
- API access (planned, not shipped)
- SSO / SAML
- Revenue forecasting
- Export/report generation
- Kanban drag-and-drop pipeline
- Site visits feature (planned soon)

## Showcase Images

PDF page screenshots in `public/showcase/`:
| ID | Industry | Pages | Padded |
|----|----------|-------|--------|
| `solar` | Hughes Electrical | 12 | Yes (01-12) |
| `solar2` | Bolton EC | 17 | Yes (01-17) |
| `roofing` | Virtue Roofing | 18 | Yes (01-18) |
| `roofing2` | HDK Long Run Roofing | 3 | No (1-3) |
| `cleaning` | Coastal Cleans | 9 | No (1-9) |

Images are WebP, 1200px wide, `blur-[6px]` applied via CSS.

## Design Guidelines

### Animation philosophy
- Simple fade-ins on scroll (useInView + motion.div)
- No scroll hijacking, no sticky stacking, no scroll-driven transforms
- Subtle ambient motion (gradient orbs with animate-blob)
- Interactive elements (tabbed content, orbital hover, accordion)
- If an effect doesn't serve comprehension, remove it

### Copy tone
- Direct, confident, business-owner-to-business-owner
- Not trades-specific in positioning -- works for any service business
- Speed claim: "under 30 seconds" (reflects real performance)
- No buzzwords, no fluff. Say what it does, show proof.
