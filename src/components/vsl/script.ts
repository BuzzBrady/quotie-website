/**
 * The explainer video's script and timing — the single source of truth.
 *
 * Each segment is one voiceover line plus how long its visuals hold (seconds).
 * Scene components read their timing from `T`, subtitles are cut from `vo`,
 * and the player reads `DURATION`. To retime the video (for example to a
 * recorded voiceover), change `dur` here and nothing else.
 *
 * `dur` was set from the spoken length of each line at a natural pace plus a
 * short breath, so a voiceover recorded from this script should fit.
 */

export type SegmentId =
  | "1a" | "1b" | "1c" | "2" | "3"
  | "4a" | "4b" | "4c" | "4d" | "4e" | "4f" | "5"
  | "6a" | "6b" | "6c" | "6d" | "6e" | "6f" | "6g" | "6h" | "7";

type SegmentDef = {
  id: SegmentId;
  /** Chapter shown in the scrub bar and the top-left eyebrow. */
  chapter: string;
  dur: number;
  vo: string;
};

const SEGMENTS: SegmentDef[] = [
  {
    id: "1a",
    chapter: "The quote you send now",
    dur: 13,
    vo: "If you run a service business, you know this quote. A day on the tools, then a night copying last month's job into a spreadsheet. What goes out is one plain page with a price on it.",
  },
  {
    id: "1b",
    chapter: "The quote you send now",
    dur: 5,
    vo: "It took too long, and it looks like every other quote your customer got.",
  },
  {
    id: "1c",
    chapter: "Welcome to Quotie",
    dur: 21,
    vo: "Welcome to Quotie. We've spent nearly two years building a different way to quote. Your own business logic, built into an engine that generates a full proposal for every job. Your scope, your options, your pricing, your past work, your reviews, your terms. All of it yours, in under thirty seconds.",
  },
  {
    id: "2",
    chapter: "We build it",
    dur: 11,
    vo: "Here's how it works. You tell us how you price a job. We build your form, your pricing logic, your wording and your documents.",
  },
  {
    id: "3",
    chapter: "You fill in a form",
    dur: 13,
    vo: "After that, you or your team fill in a form. Here's a simple example: a solar installer, a few questions, on a phone, on site. Then hit Create Quote.",
  },
  {
    id: "4a",
    chapter: "Your engine",
    dur: 7,
    vo: "Nothing is previewed. Your answers go to an engine built on your rules, and it does three jobs.",
  },
  {
    id: "4b",
    chapter: "Your engine",
    dur: 9,
    vo: "One: calculations. Double storey, so labour moves to the two-storey rate and access equipment goes in.",
  },
  {
    id: "4c",
    chapter: "Your engine",
    dur: 8,
    vo: "Two: text. Battery selected, so the backup circuit goes into the scope of works.",
  },
  {
    id: "4d",
    chapter: "Your engine",
    dur: 8,
    vo: "Three: pages. Battery quoted, battery pages in. No battery, no pages.",
  },
  {
    id: "4e",
    chapter: "Your engine",
    dur: 4.5,
    vo: "And a finished quote comes back.",
  },
  {
    id: "4f",
    chapter: "Your engine",
    dur: 17,
    vo: "That was three rules. A real build goes a lot further: price matrices, sections that repeat for every room, rules that depend on other rules, up to four options on one quote. However you actually price a job, that's what we build.",
  },
  {
    id: "5",
    chapter: "Rules, not AI",
    dur: 14,
    vo: "Same answers in, same quote out, whoever fills in the form. It isn't AI. It can only do what your rules say. That's why setup is real work, and why you can send it without re-reading every line.",
  },
  {
    id: "6a",
    chapter: "After the quote",
    dur: 6,
    vo: "Then everything after the quote. Send it from your own Gmail or Outlook.",
  },
  {
    id: "6b",
    chapter: "After the quote",
    dur: 8,
    vo: "Your client gets a hosted page. You know the moment they open it, and they accept and sign online.",
  },
  {
    id: "6c",
    chapter: "After the quote",
    dur: 10,
    vo: "Your pipeline keeps itself up to date. A new lead, a booked site visit, a sent quote, a signature: each one moves the card for you.",
  },
  {
    id: "6d",
    chapter: "After the quote",
    dur: 7.5,
    vo: "Mark it won and it becomes a job, with your playbook attached and the signed copy on file.",
  },
  {
    id: "6e",
    chapter: "After the quote",
    dur: 9.5,
    vo: "Then onto the schedule. Who's on which job, which day, morning, midday or afternoon, with a warning if someone's double-booked.",
  },
  {
    id: "6f",
    chapter: "After the quote",
    dur: 8,
    vo: "Follow-ups, callback leads, site visits, calendar and automations are all in there too.",
  },
  {
    id: "6g",
    chapter: "After the quote",
    dur: 7.5,
    vo: "Prices change? Update them yourself. Logic and wording changes come through our team.",
  },
  {
    id: "6h",
    chapter: "After the quote",
    dur: 6,
    vo: "Quotie is the CRM. The one thing it doesn't do is calling and texting.",
  },
  {
    id: "7",
    chapter: "We build it. You quote.",
    dur: 6,
    vo: "We build it. You quote. Schedule a demo.",
  },
];

export type Segment = SegmentDef & { start: number; end: number };

let cursor = 0;
export const TIMELINE: Segment[] = SEGMENTS.map((s) => {
  const seg = { ...s, start: cursor, end: cursor + s.dur };
  cursor += s.dur;
  return seg;
});

export const DURATION = cursor;

/** Timing of every segment by id: T["4b"].start, T["4b"].end, T["4b"].dur */
export const T = Object.fromEntries(TIMELINE.map((s) => [s.id, s])) as Record<
  SegmentId,
  Segment
>;

export function segmentAt(t: number): Segment {
  return TIMELINE.find((s) => t < s.end) ?? TIMELINE[TIMELINE.length - 1];
}

/** Chapters for the scrub bar: runs of segments sharing a chapter title. */
export const CHAPTERS = TIMELINE.reduce<{ title: string; start: number; end: number }[]>(
  (acc, s) => {
    const last = acc[acc.length - 1];
    if (last && last.title === s.chapter) last.end = s.end;
    else acc.push({ title: s.chapter, start: s.start, end: s.end });
    return acc;
  },
  [],
);

/* ------------------------------ Subtitles ------------------------------ */

export type Cue = { start: number; end: number; text: string };

const MAX_CUE_CHARS = 78;

/**
 * Break a line into subtitle-sized chunks. Short sentences that fit together
 * share a cue; a long sentence is split into even parts, at a comma or colon
 * where one is near the split point, so no cue is left with a stray word.
 */
function chunk(vo: string): string[] {
  const out: string[] = [];
  for (const raw of vo.match(/[^.?!]+[.?!]+/g) ?? [vo]) {
    const sentence = raw.trim();
    const prev = out[out.length - 1];
    if (prev && prev.length + sentence.length + 1 <= MAX_CUE_CHARS * 0.75) {
      out[out.length - 1] = `${prev} ${sentence}`;
      continue;
    }
    const parts = Math.ceil(sentence.length / MAX_CUE_CHARS);
    let rest = sentence;
    for (let left = parts; left > 1; left--) {
      const target = Math.round(rest.length / left);
      const spaces = [...rest.matchAll(/ /g)].map((m) => m.index);
      const clause = spaces.filter((i) => /[,:]/.test(rest[i - 1]));
      const nearest = (list: number[]) =>
        list.reduce((best, i) => (Math.abs(i - target) < Math.abs(best - target) ? i : best), list[0] ?? -1);
      let cut = nearest(clause);
      if (cut < 0 || Math.abs(cut - target) > target * 0.35) cut = nearest(spaces);
      if (cut < 0) break;
      out.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) out.push(rest);
  }
  return out;
}

/**
 * Subtitle cues. Each segment's line is spread across the spoken part of the
 * segment in proportion to length. Once a real voiceover exists these should
 * be nudged to the recording.
 */
export const CUES: Cue[] = TIMELINE.flatMap((s) => {
  const parts = chunk(s.vo);
  const lead = 0.25;
  const tail = Math.min(1, s.dur * 0.12);
  const span = s.dur - lead - tail;
  const total = parts.reduce((n, p) => n + p.length, 0);
  let at = s.start + lead;
  return parts.map((text) => {
    const len = (text.length / total) * span;
    const cue = { start: at, end: at + len, text };
    at += len;
    return cue;
  });
});

export function cueAt(t: number): Cue | null {
  return CUES.find((c) => t >= c.start && t < c.end) ?? null;
}

export function formatTime(t: number): string {
  const s = Math.max(0, Math.floor(t));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
