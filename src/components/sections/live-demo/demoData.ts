// Hardcoded demo verticals for the homepage live example.
// This is NOT a real pricing engine — each vertical is a tiny lookup table
// with invented-but-plausible numbers. Real customer pricing never goes here.

export type SelectField = {
  id: string;
  label: string;
  type: "select";
  /** "pills" (default) renders buttons; "dropdown" renders a native select */
  variant?: "pills" | "dropdown";
  options: { value: string; label: string }[];
  defaultValue: string;
  /**
   * Compatibility filtering — returns the option values that are valid given
   * the other current selections. Options outside this list are hidden, and
   * if the current value becomes invalid it auto-resets to the first valid
   * option (the UI flashes the field so the reset is visible).
   */
  availableValues?: (s: Selections) => string[];
};

export type NumberField = {
  id: string;
  label: string;
  type: "number";
  min: number;
  max: number;
  step: number;
  unit?: string;
  defaultValue: number;
};

export type CheckboxField = {
  id: string;
  label: string;
  type: "checkbox";
  defaultValue: boolean;
};

export type Field = SelectField | NumberField | CheckboxField;

export type Selections = Record<string, string | boolean | number>;

/** Sanitise a free-typed number so the demo never computes on garbage. */
export function clampNumber(
  value: Selections[string],
  min: number,
  max: number,
  fallback: number,
): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export type QuoteLine = {
  id: string;
  label: string;
  detail?: string;
  amount: number;
};

export type ScopeItem = {
  id: string;
  text: string;
};

export type Vertical = {
  id: string;
  label: string;
  docTitle: string;
  /** The pricing-engine capability this vertical demos — shown under the tabs. */
  capability: string;
  fields: Field[];
  compute: (s: Selections) => { lines: QuoteLine[]; scope: ScopeItem[] };
};

/* ------------------------------ Solar ------------------------------ */

const SOLAR_SYSTEMS: Record<string, { label: string; price: number }> = {
  "6.6": { label: "6.6kW solar system", price: 6490 },
  "8": { label: "8kW solar system", price: 7990 },
  "10": { label: "10kW solar system", price: 9990 },
  "13": { label: "13kW solar system", price: 12490 },
  "15": { label: "15kW solar system", price: 13990 },
};

const SOLAR_BATTERIES: Record<string, { label: string; price: number }> = {
  "10": { label: "10kWh battery storage", price: 8200 },
  "13.5": { label: "13.5kWh battery storage", price: 10600 },
  "16": { label: "16kWh battery storage", price: 11900 },
};

/** Which batteries each inverter brand can actually be paired with. */
const INVERTER_BATTERIES: Record<string, string[]> = {
  a: ["none", "10", "16"],
  b: ["none", "13.5"],
};

const solar: Vertical = {
  id: "solar",
  label: "Solar & Electrical",
  docTitle: "Solar Installation Proposal",
  capability:
    "Options filter themselves — incompatible gear can't be quoted.",
  fields: [
    {
      id: "size",
      label: "System size",
      type: "select",
      variant: "dropdown",
      options: [
        { value: "6.6", label: "6.6kW system" },
        { value: "8", label: "8kW system" },
        { value: "10", label: "10kW system" },
        { value: "13", label: "13kW system" },
        { value: "15", label: "15kW system" },
      ],
      defaultValue: "10",
    },
    {
      id: "storeys",
      label: "Storeys",
      type: "select",
      options: [
        { value: "single", label: "Single" },
        { value: "double", label: "Double" },
      ],
      defaultValue: "single",
    },
    {
      id: "inverter",
      label: "Inverter brand",
      type: "select",
      options: [
        { value: "a", label: "Brand A" },
        { value: "b", label: "Brand B" },
      ],
      defaultValue: "a",
    },
    {
      id: "battery",
      label: "Battery",
      type: "select",
      options: [
        { value: "none", label: "None" },
        { value: "10", label: "10kWh" },
        { value: "13.5", label: "13.5kWh" },
        { value: "16", label: "16kWh" },
      ],
      defaultValue: "none",
      availableValues: (s) => INVERTER_BATTERIES[s.inverter as string] ?? ["none"],
    },
  ],
  compute(s) {
    const size = s.size as string;
    const system = SOLAR_SYSTEMS[size];
    const double = s.storeys === "double";
    const brandName = s.inverter === "b" ? "Brand B" : "Brand A";
    const battery = SOLAR_BATTERIES[s.battery as string];

    const lines: QuoteLine[] = [
      {
        id: "system",
        label: system.label,
        detail: `Panels + ${brandName} hybrid inverter, installed`,
        amount: system.price,
      },
      {
        id: "labour",
        label: "Installation labour",
        detail: double ? "Two-storey rate" : "Single-storey rate",
        amount: double ? 2450 : 1800,
      },
    ];
    if (double) {
      lines.push({
        id: "access",
        label: "Elevated access & safety",
        detail: "EWP hire + edge protection",
        amount: 900,
      });
    }
    if (battery) {
      lines.push({
        id: "battery",
        label: battery.label,
        detail: "Supplied, installed & commissioned",
        amount: battery.price,
      });
      lines.push({
        id: "backup",
        label: "Backup circuit installation",
        detail: "Essential loads stay on in an outage",
        amount: 650,
      });
    }

    const scope: ScopeItem[] = [
      {
        id: "system",
        text: `Supply and install one ${size}kW solar system — panels, inverter and racking.`,
      },
      {
        id: "install",
        text: double
          ? "Two-storey installation including elevated work platform and edge protection."
          : "Standard single-storey installation on tilt-mount racking.",
      },
    ];
    if (battery) {
      scope.push({
        id: "battery",
        text: `Supply and install one ${s.battery}kWh battery with a dedicated backup circuit for essential loads.`,
      });
    }
    scope.push({
      id: "grid",
      text: "Grid connection, metering and full handover included.",
    });
    return { lines, scope };
  },
};

/* ----------------------------- Roofing ----------------------------- */

const ROOF_RATES: Record<
  string,
  { rate: number; capping: number; match: string; scopeName: string }
> = {
  colorbond: {
    rate: 58,
    capping: 1450,
    match: "Colorbond-matched",
    scopeName: "Colorbond steel",
  },
  tile: {
    rate: 74,
    capping: 1900,
    match: "Terracotta-matched",
    scopeName: "terracotta tile",
  },
};

/** Cutting waste allowance applied to the measured roof area. */
const ROOF_WASTE = 0.075;

const roofing: Vertical = {
  id: "roofing",
  label: "Roofing",
  docTitle: "Roof Replacement Quote",
  capability: "Measured area × rate — with waste factored in automatically.",
  fields: [
    {
      id: "material",
      label: "Roof material",
      type: "select",
      options: [
        { value: "colorbond", label: "Colorbond" },
        { value: "tile", label: "Tile" },
      ],
      defaultValue: "colorbond",
    },
    {
      id: "area",
      label: "Roof area",
      type: "number",
      min: 80,
      max: 400,
      step: 10,
      unit: "m²",
      defaultValue: 220,
    },
    {
      id: "access",
      label: "Site access",
      type: "select",
      options: [
        { value: "easy", label: "Easy" },
        { value: "restricted", label: "Restricted" },
      ],
      defaultValue: "easy",
    },
  ],
  compute(s) {
    const mat = ROOF_RATES[s.material as string];
    const area = clampNumber(s.area, 80, 400, 220);
    const orderArea = Math.ceil(area * (1 + ROOF_WASTE));
    const restricted = s.access === "restricted";

    const lines: QuoteLine[] = [
      {
        id: "roof",
        label: "Roof replacement",
        detail: `${area}m² measured + 7.5% waste → ${orderArea}m² @ $${mat.rate}/m²`,
        amount: orderArea * mat.rate,
      },
      {
        id: "capping",
        label: "Flashings & ridge capping",
        detail: mat.match,
        amount: mat.capping,
      },
    ];
    if (restricted) {
      lines.push({
        id: "scaffold",
        label: "Scaffold allowance",
        detail: "Perimeter scaffold hire",
        amount: 1850,
      });
    }

    const scope: ScopeItem[] = [
      {
        id: "roof",
        text: `Strip and replace ${area}m² of roofing in ${mat.scopeName}.`,
      },
      {
        id: "materials",
        text: `Materials ordered at ${orderArea}m² — measured area plus cutting waste.`,
      },
      {
        id: "capping",
        text: `${mat.match} flashings and ridge capping throughout.`,
      },
      {
        id: "access",
        text: restricted
          ? "Perimeter scaffold supplied and installed for the duration of works."
          : "Ground-accessible site — standard fall protection.",
      },
      {
        id: "disposal",
        text: "Old roofing removed and disposed of responsibly.",
      },
    ];
    return { lines, scope };
  },
};

/* ----------------------------- Cleaning ---------------------------- */

const CLEAN_SERVICES: Record<
  string,
  {
    label: string;
    base: number;
    perRoom: number;
    perRoomExtra: number;
    inclusions: string;
  }
> = {
  regular: {
    label: "Regular clean",
    base: 140,
    perRoom: 35,
    perRoomExtra: 25,
    inclusions:
      "Dust and vacuum throughout, mop hard floors, wipe down all kitchen and bathroom surfaces.",
  },
  deep: {
    label: "Deep clean",
    base: 260,
    perRoom: 60,
    perRoomExtra: 45,
    inclusions:
      "Everything in a regular clean, plus skirting boards, window sills, light fittings and behind furniture.",
  },
  endlease: {
    label: "End-of-lease clean",
    base: 340,
    perRoom: 85,
    perRoomExtra: 65,
    inclusions:
      "Full bond-back clean — walls spot-cleaned, inside all cupboards, with a re-clean guarantee for your property manager.",
  },
};

/** Bedrooms billed at the full rate before the tier rate kicks in. */
const CLEAN_TIER_BREAK = 4;

const cleaning: Vertical = {
  id: "cleaning",
  label: "Cleaning",
  docTitle: "Cleaning Service Quote",
  capability: "Tiered pricing — the per-room rate drops past 4 bedrooms.",
  fields: [
    {
      id: "service",
      label: "Service type",
      type: "select",
      options: [
        { value: "regular", label: "Regular" },
        { value: "deep", label: "Deep" },
        { value: "endlease", label: "End of lease" },
      ],
      defaultValue: "regular",
    },
    {
      id: "bedrooms",
      label: "Bedrooms",
      type: "number",
      min: 1,
      max: 8,
      step: 1,
      defaultValue: 3,
    },
    {
      id: "oven",
      label: "Add oven deep clean",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  compute(s) {
    const service = CLEAN_SERVICES[s.service as string];
    const rooms = clampNumber(s.bedrooms, 1, 8, 3);
    const fullRooms = Math.min(rooms, CLEAN_TIER_BREAK);
    const extraRooms = Math.max(0, rooms - CLEAN_TIER_BREAK);

    const lines: QuoteLine[] = [
      {
        id: "base",
        label: `${service.label} — base`,
        detail: "Kitchen, bathrooms, living areas",
        amount: service.base,
      },
      {
        id: "rooms",
        label: "Bedrooms",
        detail:
          extraRooms > 0
            ? `${fullRooms} × $${service.perRoom} + ${extraRooms} × $${service.perRoomExtra} tier rate`
            : `${rooms} × $${service.perRoom}`,
        amount:
          fullRooms * service.perRoom + extraRooms * service.perRoomExtra,
      },
    ];
    if (s.oven) {
      lines.push({
        id: "oven",
        label: "Oven deep clean",
        detail: "Racks, trays & glass door",
        amount: 85,
      });
    }

    const scope: ScopeItem[] = [
      {
        id: "service",
        text: `${service.label} of a ${rooms}-bedroom home.`,
      },
      { id: "inclusions", text: service.inclusions },
    ];
    if (s.oven) {
      scope.push({
        id: "oven",
        text: "Full oven deep clean — racks, trays and glass door.",
      });
    }
    return { lines, scope };
  },
};

/* ----------------------------- Plumbing ---------------------------- */
// Materials takeoff demo: a few site measurements derive the whole quote —
// pipe lengths round up in 6m sticks, fittings come off the bend count, and
// labour is built up per metre + per bend, rounded to the half hour.

const PIPE_LENGTH_M = 6;

const PIPE_MATERIALS: Record<
  string,
  {
    name: string;
    /** $ per 6m length */
    lengthPrice: number;
    /** $ per elbow / per join */
    elbowPrice: number;
    joinPrice: number;
    /** labour hours per metre / per bend */
    hoursPerMetre: number;
    hoursPerBend: number;
  }
> = {
  copper: {
    name: "Copper",
    lengthPrice: 96,
    elbowPrice: 18,
    joinPrice: 12,
    hoursPerMetre: 0.2,
    hoursPerBend: 0.3,
  },
  pex: {
    name: "PEX",
    lengthPrice: 32,
    elbowPrice: 6,
    joinPrice: 4,
    hoursPerMetre: 0.12,
    hoursPerBend: 0.15,
  },
};

const PLUMB_LABOUR_BASE_HOURS = 1.5;
const PLUMB_LABOUR_RATE = 110;
const LAGGING_PER_METRE = 7;

const plumbing: Vertical = {
  id: "plumbing",
  label: "Plumbing",
  docTitle: "Renovation Rough-in Quote",
  capability:
    "A full materials takeoff — lengths, fittings and labour derived from a few measurements.",
  fields: [
    {
      id: "material",
      label: "Pipe material",
      type: "select",
      options: [
        { value: "copper", label: "Copper" },
        { value: "pex", label: "PEX" },
      ],
      defaultValue: "copper",
    },
    {
      id: "run",
      label: "Run length",
      type: "number",
      min: 4,
      max: 40,
      step: 1,
      unit: "m",
      defaultValue: 18,
    },
    {
      id: "bends",
      label: "Bends / direction changes",
      type: "number",
      min: 0,
      max: 12,
      step: 1,
      defaultValue: 5,
    },
    {
      id: "hotwater",
      label: "Hot water line",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  compute(s) {
    const mat = PIPE_MATERIALS[s.material as string];
    const run = clampNumber(s.run, 4, 40, 18);
    const bends = clampNumber(s.bends, 0, 12, 5);
    const lengths = Math.ceil(run / PIPE_LENGTH_M);
    const joins = lengths - 1;

    // Labour builds up per metre + per bend, then rounds UP to the half hour.
    const rawHours =
      PLUMB_LABOUR_BASE_HOURS + run * mat.hoursPerMetre + bends * mat.hoursPerBend;
    const hours = Math.ceil(rawHours * 2) / 2;

    const lines: QuoteLine[] = [
      {
        id: "pipe",
        label: `${mat.name} pipe supply`,
        detail: `${run}m → ${lengths} × ${PIPE_LENGTH_M}m lengths @ $${mat.lengthPrice}`,
        amount: lengths * mat.lengthPrice,
      },
    ];
    if (bends > 0 || joins > 0) {
      const parts = [
        bends > 0 ? `${bends} elbow${bends === 1 ? "" : "s"}` : null,
        joins > 0 ? `${joins} join${joins === 1 ? "" : "s"}` : null,
      ].filter(Boolean);
      const source =
        bends > 0
          ? `${bends} bend${bends === 1 ? "" : "s"}`
          : `${lengths} lengths`;
      lines.push({
        id: "fittings",
        label: "Fittings",
        detail: `${source} → ${parts.join(" + ")}`,
        amount: bends * mat.elbowPrice + joins * mat.joinPrice,
      });
    }
    lines.push({
      id: "labour",
      label: "Labour — rough-in",
      detail: `≈ ${hours} hrs @ $${PLUMB_LABOUR_RATE}/hr`,
      amount: Math.round(hours * PLUMB_LABOUR_RATE),
    });
    if (s.hotwater) {
      lines.push({
        id: "lagging",
        label: "Lagging & insulation",
        detail: `${run}m × $${LAGGING_PER_METRE}/m`,
        amount: run * LAGGING_PER_METRE,
      });
    }

    const scope: ScopeItem[] = [
      {
        id: "run",
        text: `Re-run ${run}m of ${mat.name.toLowerCase()} through the renovation zone — ${bends} direction change${bends === 1 ? "" : "s"}.`,
      },
      {
        id: "supply",
        text: `All pipe cut from standard ${PIPE_LENGTH_M}m lengths — offcuts and wastage allowed for.`,
      },
    ];
    if (s.hotwater) {
      scope.push({
        id: "hotwater",
        text: "Hot water line lagged end-to-end, tempering valve checked for compliance.",
      });
    }
    scope.push({
      id: "test",
      text: "Pressure tested and certified before wall linings close up.",
    });
    return { lines, scope };
  },
};

/* ----------------------------- Painting ---------------------------- */

const PAINT_PRICES: Record<
  string,
  { interior: number; exterior: number; scopeName: string }
> = {
  small: { interior: 4200, exterior: 5800, scopeName: "2–3 bedroom" },
  medium: { interior: 6300, exterior: 8200, scopeName: "3–4 bedroom" },
  large: { interior: 8900, exterior: 11500, scopeName: "5+ bedroom" },
};

const painting: Vertical = {
  id: "painting",
  label: "Painting",
  docTitle: "Painting Quote",
  capability: "Bundle pricing & condition-based extras.",
  fields: [
    {
      id: "areas",
      label: "What are we painting?",
      type: "select",
      options: [
        { value: "interior", label: "Interior" },
        { value: "exterior", label: "Exterior" },
        { value: "both", label: "Both" },
      ],
      defaultValue: "interior",
    },
    {
      id: "size",
      label: "Home size",
      type: "select",
      options: [
        { value: "small", label: "2–3 bed" },
        { value: "medium", label: "3–4 bed" },
        { value: "large", label: "5+ bed" },
      ],
      defaultValue: "medium",
    },
    {
      id: "prep",
      label: "Extensive prep (peeling paint / cracks)",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  compute(s) {
    const prices = PAINT_PRICES[s.size as string];
    const areas = s.areas as string;
    const interior = areas === "interior" || areas === "both";
    const exterior = areas === "exterior" || areas === "both";

    const lines: QuoteLine[] = [];
    if (interior) {
      lines.push({
        id: "interior",
        label: "Interior painting",
        detail: "Walls, ceilings, trims — 2 coats",
        amount: prices.interior,
      });
    }
    if (exterior) {
      lines.push({
        id: "exterior",
        label: "Exterior painting",
        detail: "Wash, undercoat + 2 top coats",
        amount: prices.exterior,
      });
    }
    if (areas === "both") {
      lines.push({
        id: "discount",
        label: "Combined booking discount",
        detail: "Interior + exterior together",
        amount: -800,
      });
    }
    if (s.prep) {
      lines.push({
        id: "prep",
        label: "Extensive surface preparation",
        detail: "Sand back peeling paint, fill cracks",
        amount: 1200,
      });
    }

    const areaName =
      areas === "both"
        ? "Interior and exterior"
        : areas === "interior"
          ? "Interior"
          : "Exterior";
    const scope: ScopeItem[] = [
      {
        id: "job",
        text: `${areaName} repaint of a ${prices.scopeName} home.`,
      },
    ];
    if (interior) {
      scope.push({
        id: "interior",
        text: "Walls, ceilings, doors and trims — two coats, furniture protected throughout.",
      });
    }
    if (exterior) {
      scope.push({
        id: "exterior",
        text: "Fascias, gutters and downpipes included, pressure washed before coating.",
      });
    }
    if (s.prep) {
      scope.push({
        id: "prep",
        text: "Full surface preparation — peeling paint sanded back and cracks filled before undercoat.",
      });
    }
    if (areas === "both") {
      scope.push({
        id: "both",
        text: "One crew, one schedule — colour consult included.",
      });
    }
    return { lines, scope };
  },
};

export const VERTICALS: Vertical[] = [solar, roofing, cleaning, plumbing, painting];

export function defaultSelections(v: Vertical): Selections {
  return Object.fromEntries(v.fields.map((f) => [f.id, f.defaultValue]));
}
