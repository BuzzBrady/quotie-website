import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";

export const metadata = createMetadata({
  title: "Privacy Policy | Quotie",
  description:
    "Quotie's privacy policy. How we collect, use, and protect your personal information in accordance with the Australian Privacy Act.",
  path: "/privacy",
});

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, including:

• **Account information**: name, email address, phone number, and company details when you register for an account or submit a lead form.
• **Usage data**: how you interact with our platform, including quotes created, templates used, and features accessed.
• **Payment information**: processed securely through our payment provider. We do not store full card details.
• **Communications**: messages you send us via contact forms, email, or in-app support chat.

We also collect certain information automatically when you use our platform, including IP addresses, browser type, device identifiers, and pages visited.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, operate, and improve the Quotie platform
• Process transactions and send related information
• Send you technical notices, updates, and support messages
• Respond to your comments and questions
• Send marketing communications (where you have opted in)
• Monitor and analyse trends and usage to improve our service
• Detect and prevent fraudulent transactions and other illegal activities`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties except:

• **Service providers**: third-party vendors who assist us in operating our platform (e.g., cloud hosting, payment processing, email delivery). These parties are contractually obligated to keep your information confidential.
• **Legal requirements**: when required by law or to protect the rights, property, or safety of Quotie, our users, or others.
• **Business transfers**: in connection with a merger, acquisition, or sale of assets, your information may be transferred as a business asset.

We will notify you before your information is transferred and becomes subject to a different privacy policy.`,
  },
  {
    title: "4. Data Storage & Security",
    content: `Your data is stored on secure servers located in Australia where possible, or in other jurisdictions with adequate data protection laws. We implement industry-standard security measures including:

• Encryption of data in transit (TLS/SSL) and at rest
• Regular security audits and penetration testing
• Strict access controls and authentication requirements
• Employee training on data handling best practices

No method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    title: "5. Your Rights",
    content: `Under the Australian Privacy Act 1988, you have the right to:

• **Access**: request a copy of the personal information we hold about you
• **Correction**: request correction of inaccurate or incomplete information
• **Deletion**: request deletion of your personal information (subject to certain exceptions)
• **Opt-out**: unsubscribe from marketing communications at any time

To exercise these rights, contact us at hello@quotie.au. We will respond within 30 days.`,
  },
  {
    title: "6. Cookies",
    content: `We use cookies and similar tracking technologies to track activity on our platform and to hold certain information. Cookies are small files placed on your device.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our platform may not function properly.

We use cookies for:
• Essential platform functionality (session management, authentication)
• Analytics (understanding how users interact with our platform)
• Marketing (measuring the effectiveness of our campaigns)`,
  },
  {
    title: "7. Third-Party Links",
    content: `Our platform may contain links to third-party websites. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites. We encourage you to review the privacy policy of every site you visit.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Quotie is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us:

**Quotie Pty Ltd**
Perth, WA, Australia
Email: hello@quotie.au`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-500 shadow-sm mb-6">
              Legal
            </div>
            <h1
              className="font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight text-slate-900 mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}
            >
              Privacy Policy
            </h1>
            <p className="text-slate-500 text-sm">
              Last updated: 1 January 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-slate-600 text-base leading-relaxed mb-10 p-5 rounded-xl bg-slate-50 border border-slate-200">
              This Privacy Policy describes how Quotie Pty Ltd (&ldquo;Quotie&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and shares information about you when you use our platform and services. By using Quotie, you agree to the collection and use of information in accordance with this policy.
            </p>

            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-jakarta)]">
                    {section.title}
                  </h2>
                  <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {section.content.split("\n").map((line, i) => {
                      if (line.startsWith("•")) {
                        return (
                          <p key={i} className="pl-4 mb-1.5">
                            {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                          </p>
                        );
                      }
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return (
                          <p key={i} className="font-semibold text-slate-800 mb-2">
                            {line.replace(/\*\*/g, "")}
                          </p>
                        );
                      }
                      if (!line.trim()) return <br key={i} />;
                      return (
                        <p key={i} className="mb-2">
                          {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
