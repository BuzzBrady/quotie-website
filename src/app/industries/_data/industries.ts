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
      "No visibility into which quotes your clients have opened",
    ],
    features: [
      "Conditional product options for panels, inverters, and batteries",
      "Automatic system sizing calculations",
      "Branded PDF proposals sent directly from your domain",
      "Multi-option quotes so clients can choose their system size",
      "Quote open tracking and follow-up reminders",
      "Pipeline dashboard to track every deal",
    ],
    showcaseId: "solar",
    showcasePages: 12,
    testimonial: {
      quote:
        "Quotie completely changed how we sell solar. We used to spend an hour on each proposal — now it's done before we even leave the customer's house.",
      author: "Jed Bolton",
      role: "Director",
      company: "Bolton EC",
    },
    stats: [
      { value: "30s", label: "Average quote time" },
      { value: "3x", label: "More proposals sent" },
      { value: "40%", label: "Higher close rate" },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    title: "Roofing Quoting Software",
    description:
      "Quote roofing jobs faster with accurate material takeoffs, multiple roof sections, and professional proposals your clients can sign on the spot.",
    heroHeadline: "Quote every roof section in seconds.",
    heroSubheadline:
      "Handle complex measuring, material options, and multiple roof sections — all in one professional proposal.",
    painPoints: [
      "Measuring and calculating materials for complex roof sections",
      "Too many material options making quotes inconsistent",
      "Quotes that take hours to prepare and look unprofessional",
      "No way to present multiple product tiers to clients",
    ],
    features: [
      "Multi-section roof quoting with automatic calculations",
      "Material options including tile, metal, and membrane",
      "Tiered product presentation (good/better/best)",
      "Branded proposals with your logo and colours",
      "Digital acceptance and deposit collection",
      "Job scheduling and follow-up reminders",
    ],
    showcaseId: "roofing",
    showcasePages: 18,
    testimonial: {
      quote:
        "Our quotes used to take 2-3 hours. Now we generate them on-site and the client can accept before we drive away.",
      author: "Jake Ruwhiu",
      role: "Owner",
      company: "Virtue Roofing",
    },
    stats: [
      { value: "2hr", label: "Saved per quote" },
      { value: "18pg", label: "Professional proposals" },
      { value: "5min", label: "From measure to send" },
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    title: "Electrical Quoting Software",
    description:
      "Generate itemised electrical quotes for switchboard upgrades, new builds, and service work — with automatic labour and materials calculations.",
    heroHeadline: "Itemised electrical quotes. In seconds.",
    heroSubheadline:
      "From switchboard upgrades to new builds — generate accurate, professional proposals without the manual calculations.",
    painPoints: [
      "Itemising labour and materials for complex electrical jobs",
      "Switchboard upgrades with many variables and compliance requirements",
      "Quoting new builds with multiple stages and subcontractors",
      "Inconsistent pricing when different estimators quote the same job",
    ],
    features: [
      "Line-item quoting with labour and materials",
      "Switchboard upgrade templates with compliance notes",
      "Multi-stage project quoting",
      "Automatic GST and margin calculations",
      "Branded proposals with your licence number",
      "Quote acceptance and payment links",
    ],
    stats: [
      { value: "50%", label: "Less time quoting" },
      { value: "0", label: "Calculation errors" },
      { value: "100%", label: "Consistent pricing" },
    ],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    title: "Cleaning Services Quoting",
    description:
      "Quote commercial and residential cleaning contracts fast. Handle recurring services, multiple frequencies, and custom add-ons in one branded proposal.",
    heroHeadline: "Close cleaning contracts faster.",
    heroSubheadline:
      "Quote recurring services, one-off cleans, and custom add-ons — with professional proposals that win the job.",
    painPoints: [
      "Quoting multiple service frequencies and recurring contracts",
      "Presenting different service tiers without confusing clients",
      "Tracking which prospects have received quotes",
      "Following up on quotes without a system",
    ],
    features: [
      "Recurring service quoting (weekly, fortnightly, monthly)",
      "Multiple service tiers with optional add-ons",
      "Automatic pricing based on square footage or rooms",
      "Branded proposals sent from your domain",
      "Quote open notifications and follow-up reminders",
      "Contract acceptance with digital signature",
    ],
    showcaseId: "cleaning",
    showcasePages: 9,
    testimonial: {
      quote:
        "We sign up new commercial clients every week now. The professional proposals make us look like a much bigger operation than we are.",
      author: "Cooper Kelly",
      role: "Owner",
      company: "Coastal Cleans",
    },
    stats: [
      { value: "9pg", label: "Professional proposals" },
      { value: "2x", label: "More contracts closed" },
      { value: "5min", label: "To quote any job" },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    title: "Plumbing Quoting Software",
    description:
      "Quote plumbing jobs on-site with accurate parts pricing, travel time, and labour — and send professional proposals before you leave the driveway.",
    heroHeadline: "Quote on-site. Win the job before you leave.",
    heroSubheadline:
      "Handle emergency callouts, scheduled work, and parts pricing — with professional proposals sent straight from your phone.",
    painPoints: [
      "Balancing emergency vs scheduled job pricing",
      "Keeping parts pricing up to date across your team",
      "Travel time and after-hours rates calculated manually",
      "Quotes that take too long and lose jobs to competitors",
    ],
    features: [
      "Emergency and standard rate switching",
      "Parts library with current pricing",
      "Travel time and after-hours calculations",
      "Mobile-first quoting from any device",
      "Instant PDF proposal sent via email or SMS",
      "Quote tracking and follow-up reminders",
    ],
    stats: [
      { value: "On-site", label: "Quote and close" },
      { value: "0", label: "Manual calculations" },
      { value: "24/7", label: "Mobile access" },
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    title: "HVAC Quoting Software",
    description:
      "Quote HVAC installations and service contracts with system sizing, installation complexity, and warranty terms — all in one professional proposal.",
    heroHeadline: "From site survey to signed quote. Fast.",
    heroSubheadline:
      "Handle system sizing, installation complexity, and warranty terms — and send proposals your clients can accept on the spot.",
    painPoints: [
      "System sizing calculations that vary by site conditions",
      "Complex installation requirements and access charges",
      "Warranty and service contract terms to include in proposals",
      "Multiple brand options to present to clients",
    ],
    features: [
      "System sizing and capacity calculations",
      "Installation complexity and access surcharges",
      "Warranty and service contract inclusions",
      "Multiple brand and model options",
      "Branded proposals with technical specifications",
      "Service contract quoting and renewal reminders",
    ],
    stats: [
      { value: "30s", label: "System quote time" },
      { value: "3", label: "Options per proposal" },
      { value: "Zero", label: "Missed follow-ups" },
    ],
  },
  {
    slug: "painting",
    name: "Painting",
    title: "Painting Quoting Software",
    description:
      "Quote interior and exterior painting jobs room by room — with paint types, surface prep, and coats — and send professional proposals your clients love.",
    heroHeadline: "Room-by-room quotes. Professional every time.",
    heroSubheadline:
      "Handle paint types, surface prep, and multiple coats — with beautiful proposals that reflect your quality of work.",
    painPoints: [
      "Room-by-room quoting with different finishes and prep requirements",
      "Paint type and brand options that affect pricing",
      "Surface preparation costs that are easy to underquote",
      "Quotes that don't reflect the quality of your work",
    ],
    features: [
      "Room-by-room quoting with square meterage",
      "Paint type and sheen level options",
      "Surface preparation line items",
      "Before/after photo inclusions in proposals",
      "Colour consultation notes and paint schedules",
      "Staged payment terms and acceptance",
    ],
    stats: [
      { value: "Per-room", label: "Accurate pricing" },
      { value: "0%", label: "Underquoted jobs" },
      { value: "Premium", label: "Brand presentation" },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    title: "Landscaping Quoting Software",
    description:
      "Quote landscaping projects with materials, labour, and staged milestones — including seasonal pricing and subcontractor costs.",
    heroHeadline: "Materials, labour, and staging — all in one quote.",
    heroSubheadline:
      "From small garden makeovers to large earthmoving projects — quote accurately and win more landscaping work.",
    painPoints: [
      "Combining materials and labour across complex projects",
      "Staged project quoting with multiple milestones",
      "Seasonal pricing variations for plants and materials",
      "Subcontractor costs that are hard to track and include",
    ],
    features: [
      "Materials and labour quoting with margin control",
      "Staged milestone quoting with payment schedules",
      "Plant and material libraries with current pricing",
      "Subcontractor cost inclusions",
      "Site plan and photo attachments",
      "Seasonal variation and escalation clauses",
    ],
    stats: [
      { value: "Staged", label: "Project milestones" },
      { value: "100%", label: "Margin visibility" },
      { value: "Fast", label: "On-site quoting" },
    ],
  },
  {
    slug: "building",
    name: "Building",
    title: "Building & Construction Quoting",
    description:
      "Quote multi-stage building projects with subcontractor costs, variations, and professional contract proposals that protect your business.",
    heroHeadline: "Professional building quotes. Every time.",
    heroSubheadline:
      "Multi-stage builds, subcontractor quotes, and variations — all in one system that keeps your projects on track.",
    painPoints: [
      "Multi-stage builds with many trades and subcontractors",
      "Variations and scope changes that blow out costs",
      "Subcontractor quotes that need to roll up into your proposal",
      "Compliance and contract terms that must be included",
    ],
    features: [
      "Multi-stage project quoting with milestones",
      "Subcontractor cost roll-up",
      "Variation management and approval workflows",
      "Contract terms and compliance inclusions",
      "Progress payment schedules",
      "Document and specification attachments",
    ],
    stats: [
      { value: "Multi", label: "Stage projects" },
      { value: "Full", label: "Variation tracking" },
      { value: "Zero", label: "Cost blowouts" },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
