import { WhatsAppLink } from "@/components/WhatsAppIcon";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-foreground/60 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              1. Introduction
            </h2>
            <p className="text-foreground/80 mb-4">
              EduWrites is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and otherwise
              process your personal information in connection with our website
              and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Information You Provide
                </h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>
                    Name, email address, phone number, and WhatsApp contact
                    information
                  </li>
                  <li>
                    Academic level, subject matter, and assignment details
                  </li>
                  <li>Document uploads and project files</li>
                  <li>Billing and payment information</li>
                  <li>Messages and communications with our support team</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Information Collected Automatically
                </h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>
                    Device information (IP address, browser type, operating
                    system)
                  </li>
                  <li>Log data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Usage patterns and website interaction data</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-foreground/80 mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>Providing and improving our academic writing services</li>
              <li>Processing orders and payments</li>
              <li>Communicating with you about your orders and services</li>
              <li>Responding to customer inquiries and support requests</li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Complying with legal obligations</li>
              <li>Preventing fraud and ensuring security</li>
              <li>Marketing and promotional purposes (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-foreground/80 mb-4">
              We do not sell your personal information. However, we may share
              information with:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>Academic writers assigned to your projects</li>
              <li>Payment processors and financial institutions</li>
              <li>Customer support platforms and tools</li>
              <li>Legal authorities if required by law</li>
              <li>
                Service providers who assist in operations (under
                confidentiality agreements)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              5. Data Security
            </h2>
            <p className="text-foreground/80">
              We implement reasonable technical, administrative, and
              organizational measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or electronic
              storage is completely secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              6. Your Rights and Choices
            </h2>
            <p className="text-foreground/80 mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>Right to access and receive a copy of your data</li>
              <li>Right to correct or update inaccurate information</li>
              <li>Right to request deletion of your information</li>
              <li>Right to opt-out of marketing communications</li>
              <li>Right to data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              7. Retention of Information
            </h2>
            <p className="text-foreground/80">
              We retain personal information for as long as necessary to provide
              our services and fulfill the purposes outlined in this Privacy
              Policy. You can request deletion of your account and associated
              data at any time, subject to applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-foreground/80">
              We use cookies and similar technologies to enhance your
              experience, analyze usage, and personalize content. You can
              control cookie preferences through your browser settings.
              Disabling cookies may affect some functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              9. Third-Party Links
            </h2>
            <p className="text-foreground/80">
              Our website may contain links to third-party websites and
              services. We are not responsible for the privacy practices of
              these external sites. Please review their privacy policies
              independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              10. Contact Us
            </h2>
            <p className="text-foreground/80 mb-4">
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p className="text-foreground/80">
                <strong>Email:</strong> info@eduwrites.com
              </p>
              <p className="text-foreground/80">
                <strong>WhatsApp:</strong>{" "}
                <WhatsAppLink
                  phoneNumber="13658291551"
                  className="text-[#25D366] hover:text-[#20BA5B] transition-colors"
                  displayText="+1 365 8291551"
                  iconSize={14}
                />
              </p>
              <p className="text-foreground/80">
                <strong>Contact Page:</strong>{" "}
                <a
                  href="/contact"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Visit our contact page
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              11. Policy Updates
            </h2>
            <p className="text-foreground/80">
              We may update this Privacy Policy from time to time. Changes will
              be effective upon posting to our website. We encourage you to
              review this policy periodically to stay informed about how we
              protect your information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
