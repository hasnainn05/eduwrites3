import { WhatsAppLink } from "@/components/WhatsAppIcon";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-foreground/60 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-foreground/80">
              By accessing and using the EduWrites website and services, you
              agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our services. EduWrites reserves
              the right to modify these terms at any time, and your continued
              use of our services constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2. Use License
            </h2>
            <p className="text-foreground/80 mb-4">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on EduWrites' website for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>Modifying or copying the materials</li>
              <li>
                Using the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempting to decompile or reverse engineer any software
                contained on the website
              </li>
              <li>
                Removing any copyright or proprietary notations from the
                materials
              </li>
              <li>
                Transferring the materials to another person or "mirroring" the
                materials
              </li>
              <li>
                Using the materials for any illegal purpose or in violation of
                any regulations
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3. Service Description
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Our Services Include
                </h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Essay Writing</li>
                  <li>Assignment Writing</li>
                  <li>Thesis Writing</li>
                  <li>Research Paper Writing</li>
                  <li>Proofreading & Editing</li>
                  <li>Dissertation Writing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Service Guarantees
                </h3>
                <p className="text-foreground/80">
                  We guarantee original, plagiarism-free content written
                  according to your specifications. All work is subject to
                  quality checks before delivery. If you're unsatisfied with the
                  work, we offer unlimited revisions within the revision period.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4. Ordering and Payment
            </h2>
            <p className="text-foreground/80 mb-4">
              When you place an order with EduWrites:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>You must provide accurate and complete information</li>
              <li>Payment must be made before work begins</li>
              <li>
                We accept multiple payment methods as displayed on our platform
              </li>
              <li>Prices are subject to change with notice</li>
              <li>
                Orders are non-refundable except in cases of service
                non-delivery
              </li>
              <li>
                Discounts and promotional codes cannot be combined unless stated
                otherwise
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              5. Refund Policy
            </h2>
            <p className="text-foreground/80 mb-4">
              EduWrites maintains the following refund policy:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>
                <strong>Completed Orders:</strong> If your order has been
                completed and delivered, no refund will be issued. The work
                becomes your exclusive property upon delivery.
              </li>
              <li>
                <strong>Cancelled Orders:</strong> If your order is cancelled
                before completion, you are entitled to a full refund of your
                payment.
              </li>
              <li>
                <strong>Refund Processing Time:</strong> All refunds for
                cancelled orders will be processed within 3 to 7 working days
                from the cancellation date.
              </li>
              <li>
                <strong>Refund Method:</strong> Refunds will be issued to the
                original payment method used during checkout.
              </li>
              <li>
                <strong>Service Non-Delivery:</strong> In cases where EduWrites
                fails to deliver the service by the agreed deadline without
                valid reason, a full refund may be issued at our discretion or a
                deadline extension offered.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              6. Intellectual Property Rights
            </h2>
            <p className="text-foreground/80 mb-4">Upon payment in full:</p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>All custom-written work becomes your exclusive property</li>
              <li>You may use the work for personal academic purposes</li>
              <li>You assume full responsibility for how the work is used</li>
              <li>
                We retain the right to use work for quality improvement purposes
                only
              </li>
              <li>
                EduWrites content, including website design and text, is
                protected by copyright
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              7. User Responsibilities and Conduct
            </h2>
            <p className="text-foreground/80 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>Submit unlawful, offensive, or defamatory content</li>
              <li>Provide false information in your orders or account</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Harass, threaten, or abuse our staff or writers</li>
              <li>Breach any applicable laws or regulations</li>
              <li>Violate academic integrity policies of your institution</li>
              <li>Resell or redistribute our work without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              8. Academic Integrity
            </h2>
            <p className="text-foreground/80">
              EduWrites provides writing assistance for educational purposes.
              Users are responsible for ensuring their use of our services
              complies with their educational institution's academic integrity
              policies. We do not encourage academic dishonesty and recommend
              using our services to enhance your learning and understanding of
              the subject matter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              9. Delivery Timeline
            </h2>
            <p className="text-foreground/80 mb-4">Delivery timelines:</p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>Orders are completed by the specified deadline</li>
              <li>
                We provide reasonable notification if delays are anticipated
              </li>
              <li>Deadline extensions may be available at additional cost</li>
              <li>
                Force majeure events are excluded from timeline guarantees
              </li>
              <li>
                You should download your completed work promptly upon delivery
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              10. Revision Policy
            </h2>
            <p className="text-foreground/80 mb-4">
              We offer unlimited revisions:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>
                Revision requests must be submitted within 14 days of delivery
              </li>
              <li>
                Revisions should be related to the original order specifications
              </li>
              <li>Major content changes may require additional fees</li>
              <li>All revisions must be completed before final acceptance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              11. Limitation of Liability
            </h2>
            <p className="text-foreground/80">
              To the fullest extent permitted by law, EduWrites shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of or inability to use
              our services, including but not limited to loss of data, lost
              profits, or business interruption, even if we have been advised of
              the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              12. Disclaimer of Warranties
            </h2>
            <p className="text-foreground/80">
              Our services are provided on an "as is" basis. EduWrites makes no
              warranties, expressed or implied, regarding the services,
              including but not limited to warranties of merchantability,
              fitness for a particular purpose, or non-infringement. We do not
              warrant that services will be error-free or uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              13. Termination
            </h2>
            <p className="text-foreground/80">
              EduWrites may terminate or suspend your account and access to
              services immediately, without prior notice or liability, if you
              violate any provision of these Terms of Service or engage in any
              conduct we deem harmful or inappropriate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              14. Confidentiality
            </h2>
            <p className="text-foreground/80">
              All communications between you and EduWrites regarding your orders
              are confidential. We do not disclose client information or content
              to third parties except as required by law or to necessary service
              providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              15. Governing Law
            </h2>
            <p className="text-foreground/80">
              These Terms of Service and your use of our services are governed
              by and construed in accordance with applicable laws, and you
              irrevocably submit to the exclusive jurisdiction of the courts in
              that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              16. Contact Information
            </h2>
            <p className="text-foreground/80 mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
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
              17. Entire Agreement
            </h2>
            <p className="text-foreground/80">
              These Terms of Service, along with our Privacy Policy, constitute
              the entire agreement between you and EduWrites regarding your use
              of our services and supersede all prior and contemporaneous
              agreements, understandings, and representations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
