"use client";

import { useEffect, useState } from "react";
import ApplyCta from "@/components/apply/ApplyCta";

export default function ApplyStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-[#F9F9F9]/95 px-4 py-3 backdrop-blur sm:hidden">
      <ApplyCta compact />
    </div>
  );
}
