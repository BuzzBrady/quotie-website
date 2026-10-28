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
    // QR code short links: printed QR codes encode https://quotie.au/q/<slug>.
    // These slugs are printed on physical marketing (car wrap, pamphlets,
    // merch, business cards) and must NEVER be removed, only repointed.
    // Temporary (permanent: false) so destinations can change without
    // browsers caching the old target. Relative destinations so they also
    // work on preview deployments. See SEO-REFERENCE.md "QR code redirects".
    const qrRedirects: Record<string, string> = {
      car: "/directory?utm_source=qr&utm_medium=car-wrap&utm_campaign=car",
      pamphlet:
        "/directory?utm_source=qr&utm_medium=pamphlet&utm_campaign=pamphlet",
      jumper: "/directory?utm_source=qr&utm_medium=merch&utm_campaign=jumper",
      shirt: "/directory?utm_source=qr&utm_medium=merch&utm_campaign=shirt",
      "card-zac":
        "/?utm_source=qr&utm_medium=business-card&utm_campaign=card-zac",
      "card-erin":
        "/?utm_source=qr&utm_medium=business-card&utm_campaign=card-erin",
      "card-buzz":
        "/?utm_source=qr&utm_medium=business-card&utm_campaign=card-buzz",
    };
    return [
      // Specific QR slugs first, then the /q fallback (order matters).
      ...Object.entries(qrRedirects).map(([slug, destination]) => ({
        source: `/q/${slug}`,
        destination,
        permanent: false,
      })),
      {
        source: "/q",
        destination: "/directory",
        permanent: false,
      },
      {
        source: "/q/:path*",
        destination: "/directory",
        permanent: false,
      },
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
      {
        source: "/sales-executive",
        destination: "/",
        permanent: true,
      },
      ...appRoutes.map((source) => ({
        source,
        destination: `https://app.quotie.au${source.replace("/:path*", "")}`,
        permanent: false,
      })),
    ];
  },
  async rewrites() {
    // Proxy /directory to the Quotie Directory app. beforeFiles so these
    // win over any page or catch-all route on this site.
    return {
      beforeFiles: [
        {
          source: "/directory",
          destination: "https://quotie-directory.vercel.app/directory",
        },
        {
          source: "/directory/:path*",
          destination: "https://quotie-directory.vercel.app/directory/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
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
