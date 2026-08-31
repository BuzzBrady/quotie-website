import { Inter } from "next/font/google";
import ApplyChrome from "@/components/apply/ApplyChrome";

const inter = Inter({
  weight: ["400", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function ApplyReceived() {
  return (
    <ApplyChrome>
      <div className="flex flex-1 flex-col items-center text-center">
        <p className="mb-4 text-4xl sm:text-5xl leading-none" aria-hidden>
          👋
        </p>
        <h1
          className={`${inter.className} mb-4 uppercase`}
          style={{
            color: "#000",
            fontSize: "clamp(1.25rem, 4.2vw, 1.85rem)",
            lineHeight: 1.2,
            letterSpacing: 0,
            fontWeight: 800,
          }}
        >
          Application Received
        </h1>
        <p
          className={`${inter.className} max-w-[440px] text-[15px] sm:text-[17px] text-slate-500`}
          style={{ fontWeight: 400, lineHeight: 1.4 }}
        >
          Thanks for applying. If now isn&apos;t the right time, that&apos;s
          fine. When you&apos;re ready to fix quoting, come back and apply again
          — we&apos;ll still have your details.
        </p>
      </div>
    </ApplyChrome>
  );
}
