export interface Industry {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  painPoints: string[];
  features: string[];
  showcaseId?: string;
  showcasePages?: number;
  showcasePad?: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  stats?: { value: string; label: string }[];
  content?: { heading: string; text: string }[];
}

export const industries: Industry[] = [
  {
    slug: "solar",
    name: "Solar",
    title: "Solar Quoting Software",
    description:
      "Stop quoting solar in Excel. Build professional solar proposals with panel, inverter, and battery configurations in under 30 seconds.",
    heroHeadline: "Stop quoting solar in Excel.",
    heroSubheadline:
      "Build professional solar proposals with complex panel, inverter, and battery configurations — in under 30 seconds.",
    painPoints: [
      "Complex system configurations with panels, inverters, and batteries",
      "Manual Excel calculations that slow down your sales process",
      "Inconsistent proposals that don't reflect your brand",
      "No visibility into which quotes are outstanding or overdue",
    ],
    features: [
      "Smart dropdowns for panels, inverters, and batteries",
      "Automatic pricing calculations built into your quote form",
      "Branded PDF proposals sent directly from your email",
      "Multi-option quotes so clients can choose their system size",
      "Follow-up dashboard to track every outstanding quote",
      "Pipeline tracking with won revenue and conversion metrics",
    ],
    showcaseId: "solar",
    showcasePages: 12,
    showcasePad: true,
    testimonial: {
      quote:
        "We went from spending entire evenings rebuilding solar quotes in Excel to sending 8 different system options in minutes. Quotie paid for itself in the first week.",
      author: "Jed Bolton",
      role: "Director",
      company: "Bolton EC",
    },
    stats: [
      { value: "<30s", label: "Average quote time" },
      { value: "$360k+", label: "Closed in one month" },
      { value: "8", label: "Options per client" },
    ],
    content: [
      {
        heading: "Solar quoting is uniquely complex",
        text: "A customer asking for 'a solar quote' could get half a dozen different proposals depending on system size, panel brand, inverter choice, battery options, and finance packages. Most installers simplify by sending one option. But the businesses closing the most work are sending 4-8 options per customer, letting the client pick what suits their budget and goals.",
      },
      {
        heading: "Your pricing logic, built once",
        text: "During onboarding we build your entire solar pricing system — panel brands, inverter models, battery compatibility rules, rebate calculations, labour scaling, and margin logic. Your team picks the system config from smart dropdowns. The form filters to only show compatible products, so nobody can accidentally quote a battery that doesn't work with the inverter they selected.",
      },
      {
        heading: "Rebates and savings calculated automatically",
        text: "Government rebates, STC values, and customer savings projections are calculated from the actual system specs on every quote. No manual lookups, no outdated spreadsheet formulas. When rebate values change, you update one number and every future quote reflects it.",
      },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    title: "Roofing Quoting Software",
    description:
      "Quote roofing jobs faster with accurate material calculations, multiple options, and professional proposals that match the quality of your work.",
    heroHeadline: "Professional roofing quotes. Every time.",
    heroSubheadline:
      "Handle complex material options and multiple roof sections — all in one branded proposal your clients can review immediately.",
    painPoints: [
      "Calculating materials for complex roof sections manually",
      "Too many product options making quotes inconsistent",
      "Quotes that take hours to prepare and look unprofessional",
      "No way to present multiple product options to clients",
    ],
    features: [
      "Multi-option proposals for different scopes and materials",
      "Smart fields for material types and roof sections",
      "Branded PDF proposals with your logo and colours",
      "Send quotes directly from your Gmail or Outlook",
      "Follow-up reminders so no quote goes cold",
      "Pipeline tracking for every outstanding job",
    ],
    showcaseId: "roofing2",
    showcasePages: 3,
    showcasePad: false,
    stats: [
      { value: "<30s", label: "Quote generation time" },
      { value: "100%", label: "Follow-up coverage" },
      { value: "4", label: "Options per proposal" },
    ],
    content: [
      {
        heading: "Material options without the confusion",
        text: "Different profiles, different materials, different price points. Colorbond vs Zincalume, Trimdek vs Klip-Lok, with or without insulation. Your quote form adapts based on what's selected — choose a roof profile and the correct materials, screws, and flashing options appear automatically. No chance of quoting the wrong combination.",
      },
      {
        heading: "Multiple scopes in one proposal",
        text: "Clients often want to see what a full re-roof costs versus a repair, or the difference between standard and premium materials. Quotie lets you send multiple options in a single branded proposal so the client can compare side by side. No need to build separate quotes for each scenario.",
      },
      {
        heading: "Proposals that match your workmanship",
        text: "Your roofing work is professional. Your quotes should be too. Every proposal goes out as a branded PDF with your logo, your terms, detailed specs, and a clear pricing breakdown — presenting your business at its best from the first interaction.",
      },
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    title: "Electrical Quoting Software",
    description:
      "Generate accurate electrical quotes with automatic calculations and professional proposals — faster than rebuilding spreadsheets.",
    heroHeadline: "Accurate electrical quotes. In seconds.",
    heroSubheadline:
      "From switchboard upgrades to new builds — generate consistent, professional proposals without the manual calculations.",
    painPoints: [
      "Labour and materials calculations done manually every time",
      "Inconsistent pricing when different people quote the same job",
      "Quotes that take too long and lose jobs to competitors",
      "No system to track which quotes are outstanding",
    ],
    features: [
      "Automatic pricing calculations built into your quote form",
      "Smart fields that adapt based on job type and complexity",
      "Multi-option proposals for different scope levels",
      "Branded PDFs sent from your own email",
      "Follow-up dashboard for outstanding quotes",
      "Contact management with quote history",
    ],
    testimonial: {
      quote:
        "Quotie has been a great resource for our company. For solar installs we need a way to store data and track each job's progress from approval to installation and Quotie handles this perfectly. For anyone looking for a similar solution this would be a great option to check out!",
      author: "Benjamin Hughes",
      role: "Director",
      company: "Hughes Electrical Group",
    },
    stats: [
      { value: "<30s", label: "Quote generation" },
      { value: "100%", label: "Consistent pricing" },
      { value: "0", label: "Manual calculations" },
    ],
    content: [
      {
        heading: "Every job type, one system",
        text: "Switchboard upgrades, new builds, lighting installs, ceiling fan replacements — each has different pricing and different fields that matter. Quotie's conditional forms adapt to the job type. Quote a switchboard upgrade and you see circuit count, phase type, and board condition. Quote a lighting job and you get fixture types, dimming requirements, and room quantities.",
      },
      {
        heading: "Consistent pricing across your team",
        text: "When two electricians quote the same job and come back with different prices, it's a bad look. Quotie pulls from a single pricing source — your labour rates, material costs, and margin rules. Everyone quotes the same way, every time. When supplier costs change, update once and every future quote reflects it.",
      },
      {
        heading: "Win work with speed",
        text: "Electrical work is competitive. The sparky who gets a professional quote back same-day wins the job more often than the one who takes three days. With your pricing pre-built, you can quote on-site and send before you leave the driveway.",
      },
    ],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    title: "Cleaning Services Quoting",
    description:
      "Quote commercial and residential cleaning jobs fast. Present multiple service options and send professional proposals that win the contract.",
    heroHeadline: "Close cleaning contracts faster.",
    heroSubheadline:
      "Quote different service levels and frequencies — with professional proposals that make your business stand out.",
    painPoints: [
      "Presenting different service options without confusing clients",
      "Tracking which prospects have received quotes",
      "Following up on quotes without a system",
      "Quotes that don't look professional enough to win commercial work",
    ],
    features: [
      "Multi-option proposals for different service levels",
      "Automatic pricing based on your configured logic",
      "Branded proposals sent from your own email",
      "Follow-up reminders and pipeline tracking",
      "Contact management with full quote history",
      "GoHighLevel sync for lead management",
    ],
    showcaseId: "cleaning",
    showcasePages: 9,
    showcasePad: false,
    testimonial: {
      quote:
        "I used to lose track of who I'd quoted and who needed a follow-up. Now everything's in one place — I know exactly where every job stands without digging through emails.",
      author: "Cooper Kelly",
      role: "Director",
      company: "Coastal Cleans Co",
    },
    stats: [
      { value: "9pg", label: "Professional proposals" },
      { value: "100%", label: "Pipeline visibility" },
      { value: "<30s", label: "Quote time" },
    ],
    content: [
      {
        heading: "Service levels that sell themselves",
        text: "Cleaning clients want options. A basic clean, a deep clean, and a premium package with extras. Quotie lets you present all three in one branded proposal so the client picks what suits their budget. Most businesses see higher average job values because clients upgrade when they can see what they're getting.",
      },
      {
        heading: "Win commercial contracts",
        text: "Commercial cleaning contracts are won on presentation as much as price. A branded, professional proposal with clear scope, frequency options, and transparent pricing puts you ahead of competitors sending email estimates. First impressions count, especially with property managers and facility teams.",
      },
      {
        heading: "Never lose track of a lead",
        text: "Cleaning leads come fast. Enquiry today, quote tomorrow, follow up next week. Without a system, quotes get buried and you forget who needs chasing. Quotie's follow-up dashboard shows every outstanding quote sorted by urgency, so nothing slips through.",
      },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    title: "Plumbing Quoting Software",
    description:
      "Quote plumbing jobs on-site and send professional proposals before you leave the driveway. Fast, accurate, branded.",
    heroHeadline: "Quote on-site. Win the job before you leave.",
    heroSubheadline:
      "Generate professional plumbing proposals in seconds — with your pricing, your branding, and your terms.",
    painPoints: [
      "Quoting takes too long and jobs go to the first responder",
      "Pricing is inconsistent across your team",
      "No follow-up system — quotes get forgotten",
      "Proposals look unprofessional compared to bigger companies",
    ],
    features: [
      "Pre-built pricing for any plumbing job type",
      "Multi-option proposals for different scope levels",
      "Branded PDFs generated in seconds",
      "Send from your own email with reply tracking",
      "Follow-up dashboard with urgency sorting",
      "Mobile-friendly — quote from any device",
    ],
    stats: [
      { value: "<30s", label: "Quote and send" },
      { value: "100%", label: "Consistent pricing" },
      { value: "Mobile", label: "Quote from anywhere" },
    ],
    content: [
      {
        heading: "Quote on-site, win on the spot",
        text: "Plumbing work is often urgent. The customer wants it fixed, and they want to know what it costs now. With Quotie on your phone, you can generate a branded quote while standing in their kitchen. By the time the next plumber calls back with a price, you've already got the job.",
      },
      {
        heading: "Handle the variety",
        text: "One day it's a hot water replacement, next it's a full bathroom reno, then a blocked drain. Each job has different pricing, different materials, different scope. Quotie's forms adapt to the job type so your team always sees the right fields — no scrolling past irrelevant options.",
      },
      {
        heading: "Grow beyond one truck",
        text: "When you've got two or three plumbers quoting jobs, consistency matters. Quotie makes sure everyone quotes from the same price list with the same margins. You see every quote across the team, who sent what, and which ones need follow-up.",
      },
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    title: "HVAC Quoting Software",
    description:
      "Quote HVAC installations with system options, branded proposals, and a pipeline to track every outstanding quote.",
    heroHeadline: "From site survey to signed quote. Fast.",
    heroSubheadline:
      "Present multiple system options in one professional proposal — and track every quote through your pipeline.",
    painPoints: [
      "Multiple brand and model options to present clearly",
      "Complex pricing that changes with installation requirements",
      "Quotes that take hours to build manually",
      "No system to track which quotes need follow-up",
    ],
    features: [
      "Multi-option proposals for different system configurations",
      "Smart fields that adapt to installation complexity",
      "Automatic pricing calculations",
      "Branded proposals with technical specs",
      "Follow-up reminders and pipeline tracking",
      "Send from your own email with reply tracking",
    ],
    stats: [
      { value: "<30s", label: "System quote time" },
      { value: "Multi", label: "Options per proposal" },
      { value: "Zero", label: "Missed follow-ups" },
    ],
    content: [
      {
        heading: "System options presented clearly",
        text: "HVAC customers need to compare brands, capacities, and efficiency ratings. Quotie lets you present multiple system configurations in one proposal — a budget option, a mid-range, and a premium — with specs and pricing side by side. Clients make better decisions and you close more work at higher values.",
      },
      {
        heading: "Installation complexity handled",
        text: "Ducted vs split, single zone vs multi-zone, existing ductwork vs new install. Each scenario changes the labour, materials, and price. Your quote form adapts based on what's selected, so the right fields appear for the right job. No more mental checklists or missed line items.",
      },
      {
        heading: "From survey to signed quote, faster",
        text: "HVAC jobs often start with a site survey. With your pricing pre-built in Quotie, you can generate a professional proposal the same day as the walkthrough. That speed makes a real difference when the customer is getting quotes from three other companies.",
      },
    ],
  },
  {
    slug: "painting",
    name: "Painting",
    title: "Painting Quoting Software",
    description:
      "Quote painting jobs with accurate pricing, branded proposals, and a follow-up system that keeps your pipeline full.",
    heroHeadline: "Professional painting quotes. Every time.",
    heroSubheadline:
      "We build your pricing system. You generate branded proposals in seconds — with multiple options for different scopes.",
    painPoints: [
      "Quoting different scopes and finishes is time-consuming",
      "Pricing is inconsistent when done from scratch each time",
      "Quotes don't reflect the quality of your work",
      "No system to follow up on outstanding quotes",
    ],
    features: [
      "Quote forms built for interior, exterior, and commercial jobs",
      "Multi-option proposals for different scopes",
      "Branded PDFs with your logo and terms",
      "Send and track quotes from your own email",
      "Follow-up dashboard for outstanding quotes",
      "Contact management with quote history",
    ],
    stats: [
      { value: "<30s", label: "Quote time" },
      { value: "Branded", label: "Professional proposals" },
      { value: "100%", label: "Follow-up coverage" },
    ],
    content: [
      {
        heading: "Interior, exterior, commercial — one system",
        text: "Painting quotes vary a lot depending on the job. Interior repaint with 12 rooms is different from an exterior weatherboard job, which is different again from a commercial fit-out. Quotie's forms adapt to the job type so you're only filling in what's relevant. Pick interior and you get room counts, ceiling heights, and finish types. Pick exterior and you see surface area, prep work, and access requirements.",
      },
      {
        heading: "Scope options that upsell naturally",
        text: "Clients often want to know the difference between a standard repaint and a premium finish with feature walls. Present both options in one proposal instead of going back and forth. Most painters who offer tiered options see clients upgrade because they can see exactly what the extra cost gets them.",
      },
      {
        heading: "Look bigger than you are",
        text: "A branded proposal with clear scope, pricing breakdown, and professional terms makes a two-person painting crew look like an established operation. Clients trust businesses that present professionally, especially for jobs inside their home.",
      },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    title: "Landscaping Quoting Software",
    description:
      "Quote landscaping projects with accurate pricing, multiple options, and professional proposals — from small gardens to large earthmoving jobs.",
    heroHeadline: "Quote any landscaping job. In seconds.",
    heroSubheadline:
      "From small garden makeovers to large projects — get your pricing built once and generate professional proposals instantly.",
    painPoints: [
      "Complex projects with materials and labour to calculate",
      "Multiple scope options that are hard to present clearly",
      "Quotes take too long and look unprofessional",
      "No visibility into your quote pipeline",
    ],
    features: [
      "Pre-built pricing for any job type",
      "Multi-option proposals for different project scopes",
      "Branded PDFs with your logo and terms",
      "Send and track quotes from your own email",
      "Follow-up reminders and pipeline tracking",
      "Job handoff when quotes are won",
    ],
    stats: [
      { value: "<30s", label: "Quote generation" },
      { value: "Multi", label: "Options per quote" },
      { value: "100%", label: "Pipeline visibility" },
    ],
    content: [
      {
        heading: "Big projects, clear proposals",
        text: "Landscaping jobs can range from a simple garden tidy to a $50k outdoor living area. The bigger the job, the more important the proposal. Quotie generates detailed, branded proposals that break down materials, labour, and scope so the client knows exactly what they're paying for. No more scribbled estimates on the back of a business card.",
      },
      {
        heading: "Stage it out with options",
        text: "Clients love seeing what's possible. Show them a basic package, a mid-range, and the full dream build in one proposal. Some will go all-in. Others will start with phase one and come back later. Either way, you've made the sale easier by giving them choices instead of a single take-it-or-leave-it number.",
      },
      {
        heading: "Track the pipeline",
        text: "Landscaping quotes often have a long lead time. The client might sit on it for weeks before deciding. Without a system, those quotes disappear into your inbox. Quotie tracks every outstanding quote and tells you when it's time to follow up, so you're not chasing your tail trying to remember who you quoted last month.",
      },
    ],
  },
  {
    slug: "building",
    name: "Building",
    title: "Building & Construction Quoting",
    description:
      "Generate professional building quotes with accurate pricing, multi-option proposals, and a pipeline to track every job.",
    heroHeadline: "Professional building quotes. Every time.",
    heroSubheadline:
      "Get your pricing system built once and generate consistent, branded proposals — with multiple options for different scopes.",
    painPoints: [
      "Quoting is slow and inconsistent across your team",
      "No clear way to present different scope options",
      "Quotes get lost and follow-ups are forgotten",
      "Proposals don't look professional enough for larger jobs",
    ],
    features: [
      "Quote forms with automatic calculations built in",
      "Multi-option proposals for different project scopes",
      "Branded PDFs with your company details and terms",
      "Send from your own email with reply tracking",
      "Follow-up dashboard and pipeline tracking",
      "Job handoff with customisable pipeline",
    ],
    stats: [
      { value: "<30s", label: "Quote generation" },
      { value: "Branded", label: "Professional proposals" },
      { value: "100%", label: "Pipeline visibility" },
    ],
    content: [
      {
        heading: "Quote complexity without the headache",
        text: "Building quotes involve a lot of moving parts — materials, labour across multiple trades, subcontractor allowances, site costs, and contingencies. Quotie lets you build your pricing structure once and generate consistent quotes regardless of who on your team is doing the quoting. The form adapts based on job type and scope.",
      },
      {
        heading: "Present scope options clearly",
        text: "Clients often want to see what a project costs at different specification levels. Standard fittings vs premium, basic landscaping vs full outdoor area. Present these as clearly differentiated options in one proposal so the client can compare without you building three separate quotes from scratch.",
      },
      {
        heading: "From quote to job, seamlessly",
        text: "When a building quote gets accepted, the work is just starting. Quotie's job handoff feature turns won quotes into active jobs with task tracking, customisable pipeline stages, and a calendar to schedule the work. No re-entering information. No lost details between the sales and delivery side of your business.",
      },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
