import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { SITE_NAME } from "@/lib/constants";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get("title") || `${SITE_NAME} — Quote Faster. Close More.`;
  const subtitle =
    searchParams.get("subtitle") ||
    "Quoting software built for Australian & NZ trades businesses.";
  const tag = searchParams.get("tag") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#08080c",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 700,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #3b82f6, #39b9e5)",
          }}
        />

        {/* Logo / brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "linear-gradient(135deg, #3b82f6, #39b9e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                background: "white",
                opacity: 0.9,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "rgba(232,232,237,0.9)",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        {/* Tag badge */}
        {tag && (
          <div
            style={{
              display: "flex",
              marginBottom: 20,
              padding: "6px 16px",
              borderRadius: 100,
              border: "1px solid rgba(59,130,246,0.3)",
              background: "rgba(59,130,246,0.1)",
              color: "#60a5fa",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            {tag}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 48 : 60,
            fontWeight: 800,
            color: "#e8e8ed",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(232,232,237,0.45)",
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          {subtitle}
        </div>

        {/* Bottom right — URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 16,
            color: "rgba(232,232,237,0.2)",
            letterSpacing: "0.01em",
          }}
        >
          quotie.au
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
