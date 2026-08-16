"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LeadModalProvider } from "@/components/lead-capture/LeadModalProvider";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdsPage =
    pathname === "/opt-in" ||
    pathname.startsWith("/opt-in/") ||
    pathname === "/apply" ||
    pathname.startsWith("/apply/");

  if (isAdsPage) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <LeadModalProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LeadModalProvider>
  );
}
