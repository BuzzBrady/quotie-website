export const APPLY_CONFIRM_VIDEO =
  process.env.NEXT_PUBLIC_APPLY_CONFIRM_VSL_URL ?? "";

export const APPLY_EXPLAINER_VIDEO =
  process.env.NEXT_PUBLIC_APPLY_EXPLAINER_VSL_URL ?? "";

export const APPLY_FAQ_VIDEOS = [
  {
    q: "Do I have to set Quotie up myself?",
    url: process.env.NEXT_PUBLIC_APPLY_FAQ_VIDEO_1 ?? "",
  },
  {
    q: "Will it match how we already price jobs?",
    url: process.env.NEXT_PUBLIC_APPLY_FAQ_VIDEO_2 ?? "",
  },
  {
    q: "Can my team quote without everything coming back through me?",
    url: process.env.NEXT_PUBLIC_APPLY_FAQ_VIDEO_3 ?? "",
  },
  {
    q: "How long until we're actually sending quotes?",
    url: process.env.NEXT_PUBLIC_APPLY_FAQ_VIDEO_4 ?? "",
  },
  {
    q: "What if our pricing is complicated?",
    url: process.env.NEXT_PUBLIC_APPLY_FAQ_VIDEO_5 ?? "",
  },
  {
    q: "Can clients view and sign quotes online?",
    url: process.env.NEXT_PUBLIC_APPLY_FAQ_VIDEO_6 ?? "",
  },
  {
    q: "What happens after a quote is won?",
    url: process.env.NEXT_PUBLIC_APPLY_FAQ_VIDEO_7 ?? "",
  },
  {
    q: "What should I have ready for the strategy session?",
    url: process.env.NEXT_PUBLIC_APPLY_FAQ_VIDEO_8 ?? "",
  },
] as const;
