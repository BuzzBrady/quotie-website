# Meta Ads Opt-in Page — Reference

Built 2026-08-16. Live URL: **https://quotie.au/opt-in**  
Dev: **http://localhost:3001/opt-in** (this site always runs on 3001)

This page is a paid-traffic landing page, not part of the marketing site. No header, footer, or nav. Only Privacy and Terms in the legal line.

Higher-intent application (separate Close status): **`/apply`** — see **`APPLY-REFERENCE.md`**. This opt-in page stays **New Lead - AUS**.

---

## Purpose

Facebook/Meta ads used to send people to a **Facebook Instant Form**, then Make.com pushed the lead into Close CRM for dialling.

New flow:

```
Meta ad → quotie.au/opt-in → form submit
  → Close CRM (New Lead - AUS)     ← primary dialling inbox
  → Quotie marketing `leads` table  ← /leads and /crm/marketing (needs service role)
  → Quotie CRM `crm_leads`          ← /crm/pipeline (needs service role)
  → Meta Pixel Lead event
  → /apply (name, email, phone carried in the URL + session)
```

Make is **not** used for this page. The site writes to Close itself.

---

## What shipped

| Item | Detail |
|------|--------|
| Page | White, single-column, mobile-first |
| Isolation | No site chrome; logo is not a home link |
| SEO | `noindex, nofollow, nocache`; `/opt-in` disallowed in robots; not in sitemap |
| Form | Full name, email, phone (all required) |
| Source tag | `meta_opt_in` |
| Next step | Redirects to `/apply` with `firstName`, `email`, `mobile`. `/opt-in/thanks` still exists but is not the post-submit URL. |
| Split test leftover | `/opt-in/white` and `/opt-in/white/thanks` 308 to the winner URLs |
| Commits | `3cfa6c3` page, `4513c22` Close + staff leads |

---

## Page copy (locked)

**Top bar:** Former Full-Time Estimator Reveals

**Headline:** How Much **Time, Margin & Revenue** Is Your Current Quoting Process Costing You?

**Subhead:** See how Quotie turns the way you already price jobs into a system that can build, send and manage professional quotes in seconds.

**CTA:** SHOW ME HOW QUOTIE WORKS

**Removed on purpose:** supporting line (“Without rebuilding…”), Q icon next to Quotie, price, site nav, logo-as-home-link.

**Quotes** (rotate every 6s, dots to switch):

1. Jed Bolton — Director, Bolton EC  
2. Benjamin Hughes — Director, Hughes Electrical Group  
3. Lachlan Williams — Director, Coastal Cleans Co (quote originally stored as Cooper Kelly; name changed on request)

Do not invent extra testimonials. Edit quotes in `src/components/opt-in/OptInQuotes.tsx`.

---

## File map

```
src/app/layout.tsx                         # SiteChrome wrapper
src/app/opt-in/layout.tsx                  # noindex metadata
src/app/opt-in/page.tsx                    # white winner
src/app/opt-in/thanks/page.tsx
src/app/api/leads/route.ts                 # Close + Quotie inserts
src/app/robots.ts                          # disallow /opt-in
src/components/layout/SiteChrome.tsx       # hide header/footer on /opt-in*
src/components/opt-in/OptInLanding.tsx
src/components/opt-in/OptInForm.tsx
src/components/opt-in/OptInQuotes.tsx
src/components/opt-in/OptInThanks.tsx
next.config.ts                             # 308 /opt-in/white → /opt-in
```

Not in sitemap. Not in `NAV_LINKS` or footer product links.

---

## Design decisions

- **White won.** Dark variant existed at `/opt-in` then `/opt-in/white`. White is now `/opt-in`. Dark is gone.
- **Price hidden** for cold Meta traffic.
- **Phone required** so setters can call from Close.
- **Wordmark only** (no Q mark).
- **Body copy contrast** pushed up (slate-800 subhead, darker form placeholders).
- Brand gradient, Plus Jakarta / DM Sans, and CTA gradient match the rest of the site.

---

## Lead pipeline (on submit)

`OptInForm` POSTs to `/api/leads` with `source: "meta_opt_in"`, UTMs, referrer, and full `page_url` (includes `fbclid`).

Then `src/app/api/leads/route.ts`:

1. **Close CRM** (if `CLOSE_API_KEY` is set)  
   `POST https://api.close.com/api/v1/lead/`  
   Auth: HTTP Basic, API key as username, empty password.  
   Status: `CLOSE_LEAD_STATUS_ID` = **New Lead - AUS** (`stat_8H8vIOVxnikZ3hELnpGPyups32JAfXwk7DjAvuvh3tn`).  
   Lead name = company or person name. Contact gets email + mobile. Description has page URL + UTMs.

2. **Quotie marketing inbox** (if `SUPABASE_SERVICE_ROLE_KEY` is set)  
   Insert into `leads` with `status: "new"`.  
   Staff UI: `app.quotie.au/leads` and `/crm/marketing`.  
   Anon key **cannot** insert (RLS). Without the service role this step is skipped.

3. **Quotie staff CRM** (opt-in sources only, if service role is set)  
   Prefer `ingest-lead` edge function when `INGEST_LEAD_WEBHOOK_SECRET` is set.  
   Else insert `crm_leads` (`status: "open"`, first non-won/lost stage).  
   Staff UI: `app.quotie.au/crm/pipeline`.

4. **Meta Pixel** `Lead` with `content_name: meta_opt_in`, then redirect to `/apply` (contact details in query + sessionStorage).

If Close succeeds and Quotie fails, the form still returns 201 (dialling is the ads outcome). Form fails only if both fail.

Demo/contact/modal forms still go to `/api/leads` but **do not** create Close or `crm_leads` rows (only `source` in `meta_opt_in` / `meta_opt_in_white`).

---

## Environment variables

Local: `.env.local` (gitignored). Production: Vercel project for this repo.

| Variable | Required for | Notes |
|----------|----------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Site + API | `https://ucmgleztmtyoptcflsia.supabase.co` — must be a full `https://` URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client forms | Prod anon key |
| `CLOSE_API_KEY` | Close dialling | Close → Settings → Developer → API Keys. **Do not commit.** |
| `CLOSE_LEAD_STATUS_ID` | Same Close inbox as FB forms | `stat_8H8vIOVxnikZ3hELnpGPyups32JAfXwk7DjAvuvh3tn` (New Lead - AUS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Quotie `/leads` + `/crm/pipeline` | Bypasses RLS. Not set locally at time of build. **Do not commit.** |
| `INGEST_LEAD_WEBHOOK_SECRET` | Optional | `x-webhook-secret` for `ingest-lead` function |

Collaborators must **not** add Vercel env vars (see CLAUDE.md git workflow). List them on the PR; Buzz adds them in prod.

### Local Close key

The Close key used in this session lives only in `.env.local`. It was also pasted in chat — rotate it in Close if this thread is shared.

---

## Ads Manager

- Landing URL: `https://quotie.au/opt-in`
- Conversion: Meta Pixel `Lead` on submit (then they land on `/apply`)
- Old Instant Form + Make path can stay on other ads; this page does not need Make
- Point new ad sets at `/opt-in`, not `/opt-in/white`

---

## Session history (what we tried, then dropped)

1. Isolated ads page separate from the main site.  
2. Dark first version, then a white `/opt-in/white` split test.  
3. White won; dark removed; `/opt-in/white` 308s to `/opt-in`.  
4. Social proof stripped, then client quotes added back as a rotator.  
5. Q icon removed; supporting copy line removed; form/placeholder contrast increased.  
6. Cooper Kelly name on the third quote changed to Lachlan Williams.  
7. Discovered marketing `leads` inserts were failing (RLS + no service role).  
8. Wired Close + Quotie CRM. Verified Close with two labelled test leads (safe to delete):  
   - `TEST — quotie.au/opt-in (safe to delete)`  
   - `Landing Page Test` (`optin-form-test@quotie.au`)

---

## How to change it later

| Change | Where |
|--------|--------|
| Copy / layout | `OptInLanding.tsx` |
| Form fields / source tag | `OptInForm.tsx` |
| Quotes | `OptInQuotes.tsx` |
| Close payload / status | `createCloseLead()` in `api/leads/route.ts` |
| Hide chrome on another ads URL | `SiteChrome.tsx` `isAdsPage` |
| Thank-you copy | `OptInThanks.tsx` |

Dev: `npm run dev -- --port 3001`
