# Quotie sales cycle

Working map. Scripts live in `SETTER-SCRIPT.md` and `CLOSER-SCRIPT.md`. VSL comes after these are locked.

## Funnel (ads)

```
Meta ad
  → /opt-in                  name, email, phone
  → Close: New Lead - AUS    setters dial from here
  → Pixel Lead
  → /apply                   training / VSL  (not written yet)
  → /apply/form              7 questions
  → Close: New Lead + Application - AUS
  → YES / Maybe              → /apply/book  → Cal strategy session
  → book success             → Pixel Schedule → /apply/thanks
  → NO                       → /apply/received
```

`/opt-in/thanks` exists but is not the live post-submit page. `/opt-in/white` 308s to `/opt-in`.

## What each step is for

| Step | Job | Who owns it |
|------|-----|-------------|
| Ad | Open the cost of the current quoting process. Get the click. | Ads |
| `/opt-in` | Get a callable lead. Phone is required so we can dial. | Page |
| Setter call | Confirm they are a real business, find the quoting pain, qualify money + timing, get them through the training + application, book the strategy session, lock show rate. | Setter (Benji) |
| `/apply` VSL | Same-side-of-table training. Make DFY obvious. Make the application feel like the next honest step, not a leap. | `sales/VSL.md` |
| `/apply/form` | Written discovery. Same questions the setter is listening for. | Page |
| `/apply/book` | They pick the time. We do not “cold call you after you apply” — they booked it. | Page + Cal |
| `/apply/thanks` | Show-rate + prep. What the session is, what to have ready, who they will meet. | Page |
| Strategy session | Deepen pain, close doors on Excel / DIY software / hiring, walk A–Z, take the investment. | Closer (Locky) |
| Onboarding | We build the form, pricing, PDF, emails, pipeline, integrations, training. They start quoting. | Locky + Buzz |

## Two inbound types

**Opt-in only** — Close status `New Lead - AUS`. Name, email, phone. May not have watched anything. Setter’s main job.

**Application in** — Close status `New Lead + Application - AUS`. We already have trade, quote volume, prep time, frustration, desired difference, timeline, financial position. If they booked, setter does a short prep / show-rate call. If they did not book, setter books them.

Do not create a second Close lead. Same email = same lead. Application status only upgrades.

## Application answers (use these on the call)

1. What type of trade business do you run?
2. Roughly how many quotes per month? (`<10` / `10–25` / `26–50` / `51–100` / `100+`)
3. How long does a typical quote take to prepare and send?
4. Biggest frustration (owner bottleneck / too slow / inconsistent pricing / slow to customer / lost follow-ups / other)
5. If Quotie fixed one thing, what would make the biggest difference? (optional)
6. Timeline (`Immediately` / `30 days` / `1–3 months` / `just exploring`)
7. Financial (`YES` / `Maybe` / `NO`)

`YES` and `Maybe` can book. `NO` still writes the lead, then `/apply/received`. Setter does not re-open a hard `NO` unless they clearly misspoke.

## Who we take

- Decision maker at a service business that sends quotes
- Real quoting problem we can put into a form (products, labour, margins, the maths they already use)
- Willing to invest in a done-for-you build if it is the right fit
- Timeline is now, 30 days, or 1–3 months with a real reason

## Who we do not take

- Not the owner / not involved in quoting
- Wants DIY software they will build themselves
- Main ask is invoicing, payments, SMS, or a generic CRM
- Hard `NO` on investment
- Just browsing and no pain
- Virtue Roofing / Jake Ruwhiu — do not reference

## Offer (do not invent)

Quotie is done-for-you, not self-serve.

We sit with them, work out how they already price jobs, and build:

- Quote form + pricing logic
- Branded PDF
- Email templates
- Pipeline
- Included integrations (GHL / ServiceM8 on Small Team+)
- Team training

They fill in the form and generate. Quotes in under 30 seconds. They come back later for one-off price changes or new materials.

**1 Man Band** — $5,800 setup + $495/mo — 1 user  
**Small Team** — $7,800 setup + $695/mo — 2–5 users  
**6+** — talk  

All AUD incl. GST. No per-quote fees. Most businesses are quoting within the first week. Setup is collaborative, not a one-day install.

Public site lists price. Ads pages hide it. Setter does not quote the number unless they push hard — then tell the truth (two published setups, closer confirms which one). Do not pretend the price is “custom based on how much you have.”

## Proof we can say

- Jed Bolton, Director, Bolton EC — $360k closed in one month once Quotie was dialled in. Multi-option proposals.
- Benjamin Hughes, Director, Hughes Electrical Group — solar job tracking from approval to install.
- Lachlan Williams, Director, Coastal Cleans Co — pipeline visibility, follow-ups.

Do not invent names. Do not use Virtue Roofing.

## What to find on both calls

Same depth as before. Talk about the business, not their feelings. Use plain words.

1. **Problem** — where a quote gets stuck (info, numbers, the document, they check it, send, chase)
2. **Cost** — quotes a month, how long, hours a week, whose time, job worth, how many they win, what’s sitting there
3. **What they want** — who should send a quote, how fast, same numbers every time
4. **Why now** — what changed in the last month or two (more work, hiring, someone leaving, a lost job)
5. **Who says yes** — who pays; other person on the call or they can say yes themselves
6. **Other options shut** — they say why keep doing it / hire / other software / Excel is not the answer

Say their numbers back out loud. Locky prices against that.

Don’t ask how it feels or what it means at home.

## Money rules

- Plan follows **who will send quotes**. 2+ people = team plan. Don’t drop down to get a yes.
- Take the **setup on the strategy session**. Monthly is after that.
- Don’t discount. Don’t make up a higher “was” price.
- Setter gets a recent quote sent before the close. That helps the close.
- Don’t put someone on the call who can’t say yes. Book the person who pays.

## What the strategy session is

From the thanks page, keep this honest:

> We look at how you currently price and send quotes, find the biggest bottlenecks, and show you what Quotie would look like inside your business. It is a working session, not a generic product tour.

They should bring a recent quote and how they already price (products, labour, margins, calculations). No presentation.

## Call length

| Call | Aim |
|------|-----|
| Setter, opt-in | 8–15 min |
| Setter, already booked | 4–7 min |
| Closer | 35–50 min |

## Open items

- [ ] Confirm closer is Locky on every strategy session
- [ ] Confirm payment collection on the close (invoice / card / transfer / split)
- [ ] Confirm whether setter ever quotes the exact setup number
- [ ] Confirm disqualify rule for `<10` quotes/month if they are a serious owner
- [ ] Film `sales/VSL.md` and drop the URL into `NEXT_PUBLIC_APPLY_VSL_URL`
