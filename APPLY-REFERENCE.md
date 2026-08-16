# Meta Ads Application Page — Reference

Built 2026-08-16. Live URL (after merge): **https://quotie.au/apply**  
Dev: **http://localhost:3001/apply** (this site always runs on 3001)

Sister page to `/opt-in`. Same isolated ads chrome. This is the **higher-intent 2-step application funnel** — not the short opt-in.

Canonical lander is **`/apply`**. Application form is **`/apply/form`**. `/application` 308s to `/apply`.

---

## Purpose

Facebook Instant Forms + Make currently feed Close for some ads. This page writes to Close itself, same as `/opt-in`, but into a **different status**.

```
Meta ad → quotie.au/apply (VSL lander)
  → quotie.au/apply/form (7-question application)
  → Close CRM (New Lead + Application - AUS)
  → Quotie marketing `leads` + crm_leads
  → Meta Pixel Lead event
  → YES / Maybe  → /apply/book  (Cal strategy session)
  → booking success → /apply/thanks  (pre-call videos + expectations)
  → NO           → /apply/received
```

Make is **not** used for this page.

`/opt-in` is unchanged: source `meta_opt_in`, Close status **New Lead - AUS**. See **`OPT-IN-REFERENCE.md`**.

---

## What shipped

| Item | Detail |
|------|--------|
| Lander | `/apply` — logo, VSL, testimonials, CTA, client names, FAQ, final CTA |
| Form | `/apply/form` — 7-question wizard |
| Booking | `/apply/book` — Cal strategy session. “Can't find a time? Submit this” → `/apply/book/times` |
| Thanks | `/apply/thanks` — after they book (pre-call VSL + expectations) |
| Received | `/apply/received` — not in a position to invest |
| Isolation | No site chrome; wordmark is not a home link |
| SEO | `noindex, nofollow, nocache`; `/apply` disallowed in robots; not in sitemap or nav |
| Source tag | `meta_apply` |
| Calendar | `https://cal.com/team/quotie/quotie-strategy-session` |
| Alias | `/application` 308 → `/apply` |
| VSL | `NEXT_PUBLIC_APPLY_VSL_URL` — YouTube / Vimeo / Wistia. Empty = placeholder |

---

## Page copy (`ApplyLanding.tsx`)

**Logo:** Quotie wordmark (not a home link, no Q icon)

**Eyebrow:** STEP 1 OF 2

**Headline:** Watch the short **training** below

**Body:** In this short training, you’ll discover how Quotie takes the pricing, products, labour, margins and calculations already inside your business — and turns them into a custom quoting system your entire team can use.

**VSL:** embed from `NEXT_PUBLIC_APPLY_VSL_URL`, or a placeholder until the URL is set

**Testimonial bar:** Jed Bolton, Benjamin Hughes, Lachlan Williams (`OptInQuotes.tsx`)

**CTA:** APPLY TO SEE IF QUOTIE IS A FIT  
**Subline:** Takes around 2 minutes

**Client bar:** Bolton EC · Hughes Electrical Group · Coastal Cleans Co · HDK Long Run Roofing (wordmarks — we do not have their logo files)

**FAQ:** `applyFaqs.ts` — no prices, no unshipped features

**Final CTA:** same as above

**Footer:** Privacy Policy | Terms & Conditions · © year Quotie PTY LIMITED

**Removed on purpose:** price, site nav, Q icon, logo-as-home-link, DIY language.

`/apply/form` is a 7-question wizard. Name, email and phone come from `/opt-in` (query + sessionStorage) — Q7 is only the financial question.

**Q7 routing:** YES or Maybe → `/apply/book`. NO → `/apply/received`. All three still create the Close lead.

`/apply/thanks` is the post-booking pre-call page (confirmation + explainer videos, FAQ videos, team, testimonials, case studies, text FAQ). Booking success (Cal/Calendly `postMessage`, or “I’ve booked my session”) goes there. Meeting time/day is filled when the calendar sends a start time.

---

## File map

```
src/app/apply/layout.tsx                   # noindex metadata
src/app/apply/page.tsx                     # VSL lander (step 1)
src/app/apply/form/page.tsx                # 7-question application
src/app/apply/book/page.tsx                # qualified booking page
src/app/apply/thanks/page.tsx              # post-booking pre-call page
src/app/apply/received/page.tsx            # not in a position to invest
src/components/apply/ApplyLanding.tsx
src/components/apply/ApplyFormLanding.tsx
src/components/apply/ApplyForm.tsx
src/components/apply/ApplyBook.tsx
src/components/apply/ApplyThanks.tsx
src/components/apply/ApplyReceived.tsx
src/components/apply/applyQuestions.ts
src/components/apply/applyVideos.ts
src/components/apply/applyTeam.ts
src/components/apply/applyThanksFaqs.ts
src/components/apply/cal.ts
src/components/apply/ApplyVsl.tsx
src/components/apply/ApplyCta.tsx
src/components/apply/ApplyFaq.tsx
src/components/apply/applyFaqs.ts
src/components/apply/vsl.ts
src/components/opt-in/OptInQuotes.tsx      # reused
src/app/api/leads/route.ts                 # source meta_apply + application status
src/app/robots.ts                          # disallow /apply
src/components/layout/SiteChrome.tsx       # hide chrome on /apply*
next.config.ts                             # 308 /application → /apply
```

---

## Lead pipeline (on submit)

`ApplyForm` POSTs to `/api/leads` with `source: "meta_apply"`, trade, quote volume, prep time, frustration, biggest difference, timeline, financial position, name/email/phone, UTMs, and full `page_url` (includes `fbclid`). Extra answers go in Close / CRM notes — not extra `leads` columns.

Then `src/app/api/leads/route.ts`:

1. **Close CRM** (if `CLOSE_API_KEY` is set)  
   Status: `CLOSE_APPLICATION_STATUS_ID` = **New Lead + Application - AUS**  
   (`stat_iyBTeZLAXJfJChUwEZhjHRbXUwRF2OyRWTCn9ksjEhz`).  
   **Does not** use `CLOSE_LEAD_STATUS_ID` (that is New Lead - AUS for `/opt-in`).  
   Description includes page URL, trade, quotes/month, UTMs.

2. **Quotie marketing inbox** (if `SUPABASE_SERVICE_ROLE_KEY` is set)  
   Insert into `leads` with `status: "new"`. Quotes/month is not a `leads` column — it goes in Close / CRM notes only.

3. **Quotie staff CRM** (ads sources, if service role is set)  
   Prefer `ingest-lead` when `INGEST_LEAD_WEBHOOK_SECRET` is set.  
   Else insert `crm_leads`.

4. **Meta Pixel** `Lead` with `content_name: meta_apply`, then `/apply/book` (qualified) or `/apply/received`.
5. After they book: **Meta Pixel** `Schedule`, then `/apply/thanks`.

If Close succeeds and Quotie fails, the form still returns 201 (dialling is the ads outcome).

---

## Environment variables

Same as `/opt-in`, plus one dedicated status:

| Variable | Required for | Notes |
|----------|----------------|-------|
| `CLOSE_API_KEY` | Close dialling | Shared with `/opt-in`. **Do not commit.** |
| `CLOSE_LEAD_STATUS_ID` | `/opt-in` only | New Lead - AUS. Do **not** reuse for `/apply`. |
| `CLOSE_APPLICATION_STATUS_ID` | `/apply` only | `stat_iyBTeZLAXJfJChUwEZhjHRbXUwRF2OyRWTCn9ksjEhz` (New Lead + Application - AUS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Quotie `/leads` + `/crm/pipeline` | Bypasses RLS. **Do not commit.** |
| `INGEST_LEAD_WEBHOOK_SECRET` | Optional | `x-webhook-secret` for `ingest-lead` |
| `NEXT_PUBLIC_APPLY_VSL_URL` | VSL embed | YouTube / Vimeo / Wistia watch or embed URL. Empty = placeholder |
| `NEXT_PUBLIC_APPLY_CAL_URL` | Booking calendar | `https://cal.com/team/quotie/quotie-strategy-session` |
| `NEXT_PUBLIC_APPLY_CONFIRM_VSL_URL` | Thanks step 1 | Confirmation / expectations video |
| `NEXT_PUBLIC_APPLY_EXPLAINER_VSL_URL` | Thanks step 2 | System explainer VSL |
| `NEXT_PUBLIC_APPLY_FAQ_VIDEO_1` … `_8` | Thanks FAQ videos | Optional. Empty = placeholders |

Collaborators must **not** add Vercel env vars. List `CLOSE_APPLICATION_STATUS_ID` on the PR; Buzz adds it in prod.

---

## Ads Manager / tracking

| Step | Pixel event | `content_name` | Close |
|------|-------------|----------------|-------|
| `/opt-in` view | ViewContent | `opt_in` | — |
| Opt-in submit | **Lead** | `meta_opt_in` | New Lead - AUS (create) |
| `/apply` view | ViewContent | `apply_training` | — |
| `/apply/form` view | InitiateCheckout | `apply_form` | — |
| Form submit | **SubmitApplication** | `meta_apply` | Same Close lead, status → Application + note |
| `/apply/book` view | ViewContent | `apply_book` | — |
| Cal booked | **Schedule** | `meta_apply` | Note on same lead (`meta_apply_booked`) |
| Can't-find-a-time | **Contact** | `meta_apply_callback` | Note + Application status |
| `/apply/thanks` view | ViewContent | `apply_thanks` | — |

Advanced matching: email, phone (AU → 61…), first name sent to the pixel after opt-in. Each conversion has an `eventID` also stored on the Close note for a future CAPI match.

Close **upserts by email** — apply / book / callback do not create a second lead. Application status is only upgraded, never downgraded to New Lead.

- Landing URL: `https://quotie.au/apply` or `/opt-in`
- Optimise ads on **Lead** (opt-in), **SubmitApplication** (apply), **Schedule** (booked)
- Keep `/opt-in` ads pointed at `/opt-in` (first-touch inbox)

---

## How to change it later

| Change | Where |
|--------|--------|
| Lander copy / order | `ApplyLanding.tsx` |
| VSL URL | `NEXT_PUBLIC_APPLY_VSL_URL` or `vsl.ts` |
| Form wizard | `ApplyForm.tsx` / `applyQuestions.ts` |
| Booking page | `ApplyBook.tsx` |
| Cal URL | `NEXT_PUBLIC_APPLY_CAL_URL` |
| Thanks / pre-call page | `ApplyThanks.tsx` |
| Confirm + explainer + FAQ videos | `applyVideos.ts` |
| Team names | `applyTeam.ts` (do not invent titles) |
| Text FAQ | `applyThanksFaqs.ts` |
| Quotes | `OptInQuotes.tsx` (shared with `/opt-in`) |
| Close payload / status | `createCloseLead()` / `closeStatusIdForSource()` in `api/leads/route.ts` |

Dev: `npm run dev -- --port 3001`
