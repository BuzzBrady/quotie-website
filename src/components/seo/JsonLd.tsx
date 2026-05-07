import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

interface SoftwareApplicationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function SoftwareApplicationSchema({
  name = SITE_NAME,
  description = SITE_DESCRIPTION,
  url = SITE_URL,
}: SoftwareApplicationSchemaProps = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    audience: {
      "@type": "Audience",
      audienceType: "Trades businesses",
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "Australia and New Zealand",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema({
  name = SITE_NAME,
  url = SITE_URL,
  description = SITE_DESCRIPTION,
}: OrganizationSchemaProps = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    description,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contact`,
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
