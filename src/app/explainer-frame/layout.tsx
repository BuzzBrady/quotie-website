import type { Metadata } from "next";

// The picture for the homepage explainer video. It is only ever loaded inside
// the player's iframe (or by a frame-export script), never as a page to visit.
export const metadata: Metadata = {
  title: "Quotie explainer",
  robots: { index: false, follow: false },
};

export default function ExplainerFrameLayout({ children }: { children: React.ReactNode }) {
  return children;
}
