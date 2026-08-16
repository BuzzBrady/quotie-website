import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        source: "/(.*)",
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
