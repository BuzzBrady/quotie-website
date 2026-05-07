import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";

export const metadata = createMetadata({
  title: "Terms of Service | Quotie",
  description:
    "Quotie's terms of service. The rules and conditions governing your use of the Quotie platform.",
  path: "/terms",
});

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Quotie platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not access the Service.

These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 18 years of age and have the legal authority to enter into these Terms.`,
  },
  {
    title: "2. Description of Service",
    content: `Quotie is a cloud-based quoting and business management platform designed for trades businesses. The Service includes features for creating and sending quotes, managing contacts, tracking follow-ups, and integrating with third-party services.

We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation.`,
  },
  {
    title: "3. User Accounts",
    content: `When you create an account, you must provide accurate, complete, and current information. You are responsible for:

• Maintaining the security and confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorised use of your account

You may not use another user's account without permission. Quotie reserves the right to terminate accounts that violate these Terms.`,
  },
  {
    title: "4. Subscription and Payment",
    content: `Access to the Service is provided on a subscription basis. By subscribing, you agree to pay the applicable fees as they become due.

• Subscriptions renew automatically unless cancelled before the renewal date
• We reserve the right to change subscription fees with 30 days' notice
• Refunds are provided at our discretion within 30 days of payment for new subscribers
• We may suspend or terminate your account for non-payment

All prices are in Australian Dollars (AUD) and include GST where applicable.`,
  },
  {
    title: "5. Acceptable Use",
    content: `You agree to use the Service only for lawful purposes. You must not:

• Violate any applicable laws or regulations
• Infringe the intellectual property rights of others
• Transmit spam, unsolicited emails, or other bulk communications
• Attempt to gain unauthorised access to the Service or its related systems
• Use the Service to harass, abuse, or harm others
• Reverse engineer or attempt to extract the source code of the Service
• Use automated tools to scrape or extract data from the Service without permission`,
  },
  {
    title: "6. Intellectual Property",
    content: `The Service and its original content (excluding user-provided content) are and will remain the exclusive property of Quotie Pty Ltd. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.

You retain ownership of any content you create using the Service (such as quotes and templates). By using the Service, you grant us a limited licence to store and process that content solely to provide the Service.`,
  },
  {
    title: "7. User Data",
    content: `You own your data. We process it only to provide the Service as described in our Privacy Policy. We do not sell your data to third parties.

We maintain regular backups of platform data. However, you are responsible for maintaining your own backups of critical business information. We are not liable for any data loss resulting from technical failures.`,
  },
  {
    title: "8. Third-Party Integrations",
    content: `The Service integrates with third-party services (such as GoHighLevel, ServiceM8, Google Drive). Your use of those integrations is subject to the respective third parties' terms and privacy policies. We are not responsible for the availability or accuracy of third-party services.`,
  },
  {
    title: "9. Disclaimers and Limitation of Liability",
    content: `The Service is provided "as is" and "as available" without warranties of any kind. We do not warrant that the Service will be uninterrupted, error-free, or completely secure.

To the fullest extent permitted by applicable law, Quotie will not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of the Service.

Our total liability in any matter arising from these Terms will not exceed the amount you paid us in the three months preceding the event giving rise to the claim.`,
  },
  {
    title: "10. Termination",
    content: `You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period.

We may terminate or suspend your account immediately if you breach these Terms. Upon termination, your right to use the Service ceases immediately. We may retain certain data as required by law or for legitimate business purposes.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms are governed by and construed in accordance with the laws of Western Australia, Australia, without regard to its conflict of law provisions. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts of Western Australia.`,
  },
  {
    title: "12. Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. We will provide at least 14 days' notice of material changes via email or a prominent notice on the Service. Your continued use of the Service after the effective date of the revised Terms constitutes your acceptance of the changes.`,
  },
  {
    title: "13. Contact",
    content: `For questions about these Terms, contact us at:

Quotie Pty Ltd
Perth, WA, Australia
Email: hello@quotie.au`,
  },
];

export default function TermsPage() {
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
              Terms of Service
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
              Please read these Terms of Service carefully before using the Quotie platform. These Terms constitute a legally binding agreement between you and Quotie Pty Ltd.
            </p>

            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-jakarta)]">
                    {section.title}
                  </h2>
                  <div className="text-slate-600 text-sm leading-relaxed">
                    {section.content.split("\n").map((line, i) => {
                      if (line.startsWith("•")) {
                        return (
                          <p key={i} className="pl-4 mb-1.5">
                            {line}
                          </p>
                        );
                      }
                      if (!line.trim()) return <br key={i} />;
                      return (
                        <p key={i} className="mb-2">
                          {line}
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
