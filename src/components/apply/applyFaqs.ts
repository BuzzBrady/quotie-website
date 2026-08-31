export const APPLY_FAQS = [
  {
    q: "What is Quotie?",
    a: "Quotie is a done-for-you quoting platform for trades and service businesses. We turn the pricing, products, labour, margins and calculations already inside your business into a custom quoting system your whole team can use.",
  },
  {
    q: "Is this for all trades?",
    a: "Yes. We build the quoting process around the way you're already quoting — so it applies to all trades. Electrical, plumbing, solar, roofing, cleaning, building — if you send quotes, we can encode how you already price jobs.",
  },
  {
    q: "Is this software I have to set up myself?",
    a: "No. Quotie is done-for-you, not DIY. Our team builds the quote form, templates, pricing logic, branding and training during onboarding. You fill in the form and generate the quote.",
  },
  {
    q: "What happens after I apply?",
    a: "You fill in a short application. If it looks like a fit, you book a Quotie Strategy Session. On that call we look at how you currently quote and what Quotie would look like in your business.",
  },
  {
    q: "How long does the application take?",
    a: "Around two minutes. Short questions — we already have your name, email and phone from the first step.",
  },
  {
    q: "Who will I speak to?",
    a: "If it's a fit, you book a Quotie Strategy Session with the team. You pick the time — we don't cold-call you after you apply.",
  },
  {
    q: "What do you need from my business?",
    a: "How you already price jobs — products, labour, margins and the calculations you use today. We encode that into the system. You don't need to rebuild your pricing from scratch.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are quoting within the first week. We work with you to understand how you price, build the form, and refine it together until it matches how your business actually works. It is a collaborative process — not a one-day setup.",
  },
  {
    q: "What do you actually build during onboarding?",
    a: "Your quote form, pricing logic, branded PDF template, email templates, pipeline setup, and any included integrations. Then we train your team. After that you only come back for one-off price changes or new materials.",
  },
  {
    q: "Do I have to change how I already price jobs?",
    a: "No. We take the way you already price work and turn it into the system. The point is consistency and speed — not a new pricing model you have to learn.",
  },
  {
    q: "Can my whole team use it?",
    a: "Yes. Once the system is built, everyone fills in the same form and generates the same standard of quote. That is why we build it around your business, not a generic template you maintain yourself.",
  },
  {
    q: "How fast are quotes once it's set up?",
    a: "Fill in the form and generate. Quotes go out in under 30 seconds — branded PDF, options, totals and your calculations already done.",
  },
  {
    q: "Can clients pick from more than one option?",
    a: "Yes. You can send up to four options on a quote so the client can choose what fits, instead of you rewriting a new proposal for every variation.",
  },
  {
    q: "Can clients view and sign quotes online?",
    a: "Yes. Every quote can include a hosted branded page. The client views it in the browser, picks an option, and signs with a signature pad. A signed certificate is stamped into the PDF. They can also decline with a reason.",
  },
  {
    q: "Do you know when a client opens a quote?",
    a: "Yes — on the hosted quote page. You can see when they view or download that page. This is not email open tracking.",
  },
  {
    q: "Can I email quotes from my own address?",
    a: "Yes. Emails send from your own Gmail or Outlook account, so the client sees you — not a third-party tool. Replies come back into Quotie.",
  },
  {
    q: "What happens after a quote is won?",
    a: "You can hand the quote off to a job, run it through your pipeline, and use Playbooks — step-by-step checklists with task tracking and job files.",
  },
  {
    q: "Does it track follow-ups and the pipeline?",
    a: "Yes. Outstanding quotes are ranked by urgency. You can see draft, sent, won and lost, plus won revenue, conversion rate and pipeline value. Follow-up notes and reschedules sit on the job.",
  },
  {
    q: "Does Quotie connect to the tools we already use?",
    a: "GoHighLevel (contacts, opportunities, calendar scan and automation actions), ServiceM8 contact search, Gmail, Outlook, Google Drive and Dropbox are built in.",
  },
  {
    q: "Can I add new products or change prices later?",
    a: "Yes. After onboarding you come to us for price changes or new materials. You are not expected to rebuild templates yourself.",
  },
  {
    q: "Is training included?",
    a: "Yes. Onboarding includes building the system and training your team until they can generate quotes themselves.",
  },
  {
    q: "Is our data separate from other companies?",
    a: "Yes. Data is encrypted at rest and in transit. Each business is isolated — your data is only visible to your team.",
  },
  {
    q: "Who is Quotie for?",
    a: "Service businesses that send quotes — solar, electrical, roofing, cleaning and other trades. If you price jobs from products, labour and margins, we can usually encode that.",
  },
  {
    q: "We are a one-person business. Is this still for us?",
    a: "Yes. We build the system around how you quote, whether that is one person or a small team. The application is how we check fit.",
  },
  {
    q: "Will I have to keep rebuilding templates?",
    a: "No. We build and manage the templates. You generate quotes. When something in your pricing changes, you come back for that change — not a full rebuild.",
  },
  {
    q: "Where is Quotie based?",
    a: "Central Coast, NSW, Australia. The team is available Monday to Friday, 8am–6pm AEST.",
  },
] as const;

const LANDER_QUESTIONS = new Set([
  "Is this for all trades?",
  "Is this software I have to set up myself?",
  "What happens after I apply?",
  "How long does the application take?",
  "How long does setup take?",
  "Do I have to change how I already price jobs?",
  "Can my whole team use it?",
]);

export const APPLY_LANDER_FAQS = APPLY_FAQS.filter((item) =>
  LANDER_QUESTIONS.has(item.q)
);
