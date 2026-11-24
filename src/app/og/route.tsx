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

  const titleSize = title.length > 50 ? 52 : 66;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f3f5f9",
          padding: "64px 80px 56px",
          position: "relative",
          fontFamily: "sans-serif",
          color: "#0b1626",
        }}
      >
        {/* Top brand bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            display: "flex",
            background: "linear-gradient(90deg, #1f61aa, #39b9e5)",
          }}
        />

        {/* Header row: brand ..... tag */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0b1626",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              height: 2,
              margin: "14px 20px 0",
              borderBottom: "2px dashed #c3ccd9",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#1f61aa",
            }}
          >
            {tag || "quotie.au"}
          </div>
        </div>

        {/* Title + highlighter */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 800,
              color: "#0b1626",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              width: 260,
              height: 16,
              marginTop: 18,
              background: "rgba(57,185,229,0.55)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 25,
              color: "#46546a",
              lineHeight: 1.45,
              maxWidth: 860,
              marginTop: 30,
            }}
          >
            {subtitle.length > 150 ? `${subtitle.slice(0, 147)}…` : subtitle}
          </div>
        </div>

        {/* Foot of the quote */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderTop: "3px solid #0b1626",
            paddingTop: 18,
            fontSize: 18,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#66758b",
          }}
        >
          <div style={{ display: "flex" }}>Quote faster. Close more.</div>
          <div style={{ display: "flex", flex: 1 }} />
          <div style={{ display: "flex", color: "#0b1626", fontWeight: 600 }}>
            quotie.au
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
