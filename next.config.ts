import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: let the dev server be viewed via 127.0.0.1 as well as localhost
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Redirect app routes to app.quotie.au so users who
    // forget the subdomain land in the right place
    const appRoutes = [
      "/dashboard",
      "/quotes/:path*",
      "/login",
      "/contacts/:path*",
      "/calendar/:path*",
      "/follow-ups/:path*",
      "/emails/:path*",
      "/job-fulfilment/:path*",
      "/jobs/:path*",
      "/products/:path*",
      "/site-visits/:path*",
      "/settings/:path*",
      "/users/:path*",
      "/media/:path*",
      "/engines/:path*",
      "/docs/:path*",
      "/builders/:path*",
      "/request-password-reset",
    ];
    return [
      {
        source: "/opt-in/white",
        destination: "/opt-in",
        permanent: true,
      },
      {
        source: "/opt-in/white/thanks",
        destination: "/opt-in/thanks",
        permanent: true,
      },
      {
        source: "/application",
        destination: "/apply",
        permanent: true,
      },
      {
        source: "/application/thanks",
        destination: "/apply/thanks",
        permanent: true,
      },
      ...appRoutes.map((source) => ({
        source,
        destination: `https://app.quotie.au${source.replace("/:path*", "")}`,
        permanent: false,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/showcase/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/apply/thanks",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/((?!apply/thanks).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
