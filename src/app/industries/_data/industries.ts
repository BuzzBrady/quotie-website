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
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  stats?: { value: string; label: string }[];
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
      "Conditional product options for panels, inverters, and batteries",
      "Automatic pricing calculations with configurable margins",
      "Branded PDF proposals sent directly from your email",
      "Multi-option quotes so clients can choose their system size",
      "Follow-up dashboard to track every outstanding quote",
      "Pipeline tracking with won revenue and conversion metrics",
    ],
    showcaseId: "solar",
    showcasePages: 12,
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
      "No way to present multiple product tiers to clients",
    ],
    features: [
      "Multi-option proposals (good/better/best)",
      "Conditional fields for material types and roof sections",
      "Branded PDF proposals with your logo and colours",
      "Send quotes directly from your Gmail or Outlook",
      "Follow-up reminders so no quote goes cold",
      "Pipeline tracking for every outstanding job",
    ],
    showcaseId: "roofing",
    showcasePages: 18,
    testimonial: {
      quote:
        "Our roofing proposals used to look like every other tradie's spreadsheet. Now clients tell us our quotes look more professional than companies ten times our size.",
      author: "Jake Ruwhiu",
      role: "Director",
      company: "Virtue Roofing",
    },
    stats: [
      { value: "18pg", label: "Professional proposals" },
      { value: "10x", label: "More professional" },
      { value: "<30s", label: "Quote generation time" },
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    title: "Electrical Quoting Software",
    description:
      "Generate accurate electrical quotes with automatic calculations, conditional fields, and professional proposals — faster than rebuilding spreadsheets.",
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
      "Configurable pricing logic with automatic calculations",
      "Conditional fields for job type and complexity",
      "Multi-option proposals for different scope levels",
      "Branded PDFs sent from your own email",
      "Follow-up dashboard for outstanding quotes",
      "Contact management with quote history",
    ],
    stats: [
      { value: "<30s", label: "Quote generation" },
      { value: "100%", label: "Consistent pricing" },
      { value: "0", label: "Manual calculations" },
    ],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    title: "Cleaning Services Quoting",
    description:
      "Quote commercial and residential cleaning jobs fast. Present multiple service tiers and send professional proposals that win the contract.",
    heroHeadline: "Close cleaning contracts faster.",
    heroSubheadline:
      "Quote different service levels and frequencies — with professional proposals that make your business stand out.",
    painPoints: [
      "Presenting different service tiers without confusing clients",
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
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    title: "Plumbing Quoting Software",
    description:
      "Quote plumbing jobs on-site and send professional proposals before you leave the driveway. Fast, accurate, branded.",
    heroHeadline: "Quote on-site. Win the job before you leave.",
    heroSubheadline:
      "Generate professional plumbing proposals in seconds — with your pricing logic, your branding, and your terms.",
    painPoints: [
      "Quoting takes too long and jobs go to the first responder",
      "Pricing is inconsistent across your team",
      "No follow-up system — quotes get forgotten",
      "Proposals look unprofessional compared to bigger companies",
    ],
    features: [
      "Configurable pricing templates for any plumbing job",
      "Multi-option proposals for different scope levels",
      "Branded PDFs generated in seconds",
      "Send from your own email, track opens and replies",
      "Follow-up dashboard with urgency sorting",
      "Mobile-friendly — quote from any device",
    ],
    stats: [
      { value: "<30s", label: "Quote and send" },
      { value: "100%", label: "Consistent pricing" },
      { value: "Mobile", label: "Quote from anywhere" },
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
      "Conditional fields for installation complexity",
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
  },
  {
    slug: "painting",
    name: "Painting",
    title: "Painting Quoting Software",
    description:
      "Quote painting jobs with configurable pricing, branded proposals, and a follow-up system that keeps your pipeline full.",
    heroHeadline: "Professional painting quotes. Every time.",
    heroSubheadline:
      "Build your pricing logic once and generate branded proposals in seconds — with multiple options for different scopes.",
    painPoints: [
      "Quoting different scopes and finishes is time-consuming",
      "Pricing is inconsistent when done from scratch each time",
      "Quotes don't reflect the quality of your work",
      "No system to follow up on outstanding quotes",
    ],
    features: [
      "Configurable templates for interior, exterior, and commercial",
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
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    title: "Landscaping Quoting Software",
    description:
      "Quote landscaping projects with configurable pricing, multiple options, and professional proposals — from small gardens to large earthmoving jobs.",
    heroHeadline: "Quote any landscaping job. In seconds.",
    heroSubheadline:
      "From small garden makeovers to large projects — build your pricing once and generate professional proposals instantly.",
    painPoints: [
      "Complex projects with materials and labour to calculate",
      "Multiple scope options that are hard to present clearly",
      "Quotes take too long and look unprofessional",
      "No visibility into your quote pipeline",
    ],
    features: [
      "Configurable pricing logic for any job type",
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
  },
  {
    slug: "building",
    name: "Building",
    title: "Building & Construction Quoting",
    description:
      "Generate professional building quotes with configurable pricing templates, multi-option proposals, and a pipeline to track every job.",
    heroHeadline: "Professional building quotes. Every time.",
    heroSubheadline:
      "Build your pricing system once and generate consistent, branded proposals — with multiple options for different scopes.",
    painPoints: [
      "Quoting is slow and inconsistent across your team",
      "No clear way to present different scope options",
      "Quotes get lost and follow-ups are forgotten",
      "Proposals don't look professional enough for larger jobs",
    ],
    features: [
      "Configurable quote templates with automatic calculations",
      "Multi-option proposals for different project scopes",
      "Branded PDFs with your company details and terms",
      "Send from your own email with reply tracking",
      "Follow-up dashboard and pipeline tracking",
      "Job handoff with configurable pipeline columns",
    ],
    stats: [
      { value: "<30s", label: "Quote generation" },
      { value: "Branded", label: "Professional proposals" },
      { value: "100%", label: "Pipeline visibility" },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
