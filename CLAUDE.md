# Quotie Marketing Website

SEO-optimized Next.js marketing site for Quotie — a done-for-you (DFY) B2B SaaS quoting platform for trades businesses.

## Business Model — IMPORTANT

Quotie is **done-for-you**, not self-serve. This is critical for all copy:

- **Admins (Quotie team) build and manage templates** for each company. Users don't build their own templates.
- The quote form + template + pricing engine is the hardest part of setup — Quotie handles it all during onboarding.
- After setup, companies only come back for one-off price changes or to introduce new materials/products.
- The setup fee ($5.8k-$7.8k incl. GST) covers template building, pricing logic configuration, branding, and training.
- Users just fill in the form and hit generate — the system does the rest.

**Copy implications:**
- Don't say "build your own templates" — say "we build your pricing system for you"
- Don't say "set up in minutes" — say "we handle the setup, you start quoting"
- Don't position it as DIY software — position it as a managed service with powerful software
- Emphasise that onboarding includes template builds, pricing logic, and training

## Git Workflow — IMPORTANT

Buzz (BuzzBrady) is the lead developer and owns `main` and all production infrastructure.

**Rules for collaborators (Benji / benjiboys127) and their AI assistants:**

- **NEVER push to `main` directly.** `main` is branch-protected — pushes to it will be rejected.
- Work on a feature branch named `benji/<short-description>` (e.g. `benji/opt-in-page`), push that branch, and open a pull request. Buzz reviews and merges.
- **NEVER merge your own PRs.** PRs require Buzz's approval.
- **Do NOT touch production infrastructure:** no adding/changing Vercel environment variables, no Vercel project settings, no Supabase schema changes, no DNS. If your feature needs a new env var or external service key, list it clearly in the PR description and Buzz will migrate it to prod.
- **NEVER commit secrets** — API keys, `.env*` files, service role keys. Reference them via `process.env.*` and document the variable name in the PR.
- Run `npx next build` before opening a PR to confirm the site builds.

**For Buzz:** collect collaborator work by reviewing PRs, merging, then handling prod migration (env vars in Vercel, Supabase changes, etc.).

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
- **Lead capture:** Supabase `leads` table (same prod instance as the app). `/opt-in` and `/apply` also write Close CRM + Quotie `crm_leads`.
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
  - `CLOSE_API_KEY` -- Close CRM (opt-in + apply dialling). Buzz adds this in prod.
  - `CLOSE_LEAD_STATUS_ID` -- `stat_8H8vIOVxnikZ3hELnpGPyups32JAfXwk7DjAvuvh3tn` (New Lead - AUS) — `/opt-in` only
  - `CLOSE_APPLICATION_STATUS_ID` -- `stat_iyBTeZLAXJfJChUwEZhjHRbXUwRF2OyRWTCn9ksjEhz` (New Lead + Application - AUS) — `/apply` only
  - `SUPABASE_SERVICE_ROLE_KEY` -- required for Quotie app `/leads` and `/crm/pipeline` inserts (RLS blocks anon)
  - `INGEST_LEAD_WEBHOOK_SECRET` -- optional; official `ingest-lead` function

## Meta ads opt-in (`/opt-in`)

Isolated conversion page for paid traffic. No header/footer/nav. White page at `quotie.au/opt-in`. Full reference: **`OPT-IN-REFERENCE.md`**.

- Form: name, email, phone → `/api/leads` with source `meta_opt_in`
- Close CRM lead in **New Lead - AUS** (replaces Instant Form + Make for this URL)
- After submit: Pixel `Lead`, then redirect to `/apply` with name/email/phone. `/opt-in/thanks` still exists but is not the live post-submit URL.
- `noindex`; robots disallow `/opt-in`; `/opt-in/white` 308s to `/opt-in`

## Meta ads application (`/apply`)

Isolated higher-intent application for paid traffic. Same chrome as `/opt-in` (no header/footer/nav). White page at `quotie.au/apply`. Full reference: **`APPLY-REFERENCE.md`**.

- `/apply` VSL lander → `/apply/form` (7 questions) → `/apply/book` (qualified) → `/apply/thanks` (post-booking pre-call page)
- Not in a position to invest: `/apply/received`
- Form answers + name/email/phone → `/api/leads` with source `meta_apply`
- Close CRM lead in **New Lead + Application - AUS** via `CLOSE_APPLICATION_STATUS_ID` (do not reuse the opt-in status)
- Pixel `Lead` on apply submit. Pixel `Schedule` when a session is booked.
- `noindex`; robots disallow `/apply`; `/application` 308s to `/apply`

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
│   ├── layout.tsx              # Root layout (fonts, SiteChrome, pixel)
│   ├── page.tsx                # Homepage
│   ├── not-found.tsx           # 404
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # robots.txt
│   ├── og/route.tsx            # Dynamic OG image generation (edge runtime)
│   ├── api/leads/route.ts      # Lead capture (Supabase + Close + CRM)
│   ├── opt-in/                 # Meta ads landing page (no site chrome)
│   ├── apply/                  # Meta ads application (no site chrome)
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
│   ├── layout/                 # Header, Footer, SiteChrome
│   ├── sections/               # Homepage sections (Hero, Features, etc.)
│   ├── lead-capture/           # LeadCaptureForm, LeadModalProvider
│   ├── opt-in/                 # Isolated ads landing (form, quotes, thanks)
│   ├── apply/                  # Isolated ads application (form, thanks)
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

Both write to Supabase `leads` table with UTM params, referrer, and page URL. Source tags: `hero_schedule_demo`, `nav_get_started`, `pricing_team`, `demo_page`, `industry_{slug}`, `meta_opt_in`, `meta_apply`, etc.

`/opt-in` and `/apply` also create a Close CRM lead and a Quotie `crm_leads` row. See `OPT-IN-REFERENCE.md` and `APPLY-REFERENCE.md`.

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
| 1 Man Band | $5,800 | $495/mo | 1 |
| Small Team | $7,800 | $695/mo | 2-5 |
| 6+ Users | Contact us | Contact us | 6+ |

All prices incl. GST.

## Real Customers (ONLY use these for testimonials)

| Name | Role | Company | Industry |
|------|------|---------|----------|
| Jed Bolton | Director | Bolton EC | Solar & Electrical |
| Cooper Kelly | Director | Coastal Cleans Co | Cleaning |
| Benjamin Hughes | Director | Hughes Electrical Group | Solar & Electrical |

Do NOT invent testimonials. Do NOT use fake names.

**Virtue Roofing (Jake Ruwhiu) is an archived customer no longer with Quotie — do NOT reference them anywhere** (testimonials, showcase, industry pages, stats like "10x more professional"). Removed 2026-08-16.

## Founders

- **Lachlan Boys** ("Locky") -- Co-founder. Professional estimator. Built the original quoting system from trades experience.
- **Buzz Brady** -- Co-founder & Developer. Rebuilt the platform from scratch with modern tech.
- Both from the **Central Coast, NSW**, Australia.

## Feature Accuracy

### Real features (safe to claim):
- Quote template builder (conditional fields, matrix pricing, calculations)
- Instant PDF generation (HTML templates, branded, server-side)
- Multi-option proposals (up to 4 options per quote group)
- **Shared quote links** — public hosted branded quote pages (`/q/:token`), clients view online without downloading
- **Accept & Sign** — clients digitally sign quotes online (signature pad), signed certificate stamped into the PDF, decline-with-reason handling
- **Quote view & download tracking** — know when a client opens or downloads a quote on its hosted page (NOT email open tracking)
- Email sending via Gmail/Outlook (native, from user's own address)
- Reply tracking (client replies appear in Quotie)
- Unified Emails page — full two-way inbox sync for contact emails, threaded reply composer, CC/BCC + attachments
- Customisable email templates with merge variables
- Follow-up dashboard (urgency sorting, hot leads, reschedule tracking, notes)
- Callback leads — pre-quote lead pipeline (GHL webhook ingestion, call attempt tracking, timed callback reminders)
- Site visits / road day planning (GHL calendar scan, drag-to-order visits, travel-time routing, booking summaries)
- Pipeline tracking (status: draft, sent, won, lost)
- Won revenue, conversion rate, pipeline value metrics
- Profit tracking — per-company profit formulas, margin trends, profit-by-rep, per-deal breakdowns
- Lead attribution (lead owner + lead source tracked through the pipeline)
- Contact management (multi-address, quote history)
- GoHighLevel two-way sync (contacts + opportunities + calendar scan + automation actions: notes, tags, opportunity updates)
- ServiceM8 integration (contact search)
- Automation workflows v2 — triggers on quote events (sent, viewed, signed, declined, won) AND job events; multi-trigger, AND/OR condition groups, wait + filter steps; actions: send email, webhooks, GHL updates, notifications
- Job handoff (quote to job, configurable pipeline, Playbooks — formerly "SOPs" — with step-by-step checklists, task tracking, job files from Drive/Dropbox)
- Calendar (day/week/month views, quotes + jobs + site visits, drag-and-drop)
- Notifications (bell icon, real-time, daily digest)
- Product catalog viewer (synced pricing + business rules, read-only)
- Multi-tenant with row-level security

### NOT features (do NOT claim):
- Open/read tracking on **emails** (quote *view* tracking on hosted share pages IS real — don't confuse the two)
- Online payment collection / deposits
- SMS sending
- Invoicing
- Google Calendar sync
- API access (planned, not shipped)
- SSO / SAML
- Revenue forecasting
- Export/report generation
- Kanban drag-and-drop pipeline
- AI call-transcript → draft quote (EXISTS but internal-only/beta for 3 Quotie execs — do NOT market as available)

## Showcase Images

PDF page screenshots in `public/showcase/`:
| ID | Industry | Pages | Padded |
|----|----------|-------|--------|
| `solar` | Hughes Electrical | 12 | Yes (01-12) |
| `solar2` | Bolton EC | 17 | Yes (01-17) |
| `roofing2` | HDK Long Run Roofing | 3 | No (1-3) |
| `cleaning` | Coastal Cleans | 9 | No (1-9) |

(`roofing` — Virtue Roofing, 18pg — removed 2026-08-16: archived customer.)

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
