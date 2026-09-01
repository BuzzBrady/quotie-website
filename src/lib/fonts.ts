import { Inter } from "next/font/google";

// Shared Inter instance for the ads funnel (/opt-in, /apply).
// Single instantiation so next/font emits one font pipeline instead of
// one per component.
export const inter = Inter({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
});
