import Container from "@/components/Container";
import React from "react";

const page = () => {
  return (
    <Container>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
        Terms and Conditions
      </h1>
      <p className="text-sm text-gray-500 text-center mb-8">
        Last Updated: June 1, 2024
      </p>

      <div className="text-gray-700 space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using this application, you agree to comply with
            these Terms and Conditions. If you do not agree, you must cease
            using the application immediately.
          </p>
          <p>
            Continued use of the application after any updates to these Terms
            implies acceptance of the changes.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. User Accounts and Responsibilities
          </h2>
          <p>
            To use certain features of the application, you may need to register
            for an account. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Provide accurate, complete, and current information during
              registration.
            </li>
            <li>
              Maintain the confidentiality of your login credentials and account
              activities.
            </li>
            <li>
              Notify us immediately of unauthorized use or security breaches.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Prohibited Activities
          </h2>
          <p>
            You agree not to engage in the following activities while using our
            application:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Reverse-engineering, copying, or distributing any part of the
              application.
            </li>
            <li>Uploading malicious software, viruses, or harmful content.</li>
            <li>
              Impersonating others or misrepresenting your affiliation with a
              person or entity.
            </li>
            <li>
              Attempting to gain unauthorized access to accounts, systems, or
              data associated with the application.
            </li>
            <li>Engaging in harassment, hate speech, or illegal activities.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            4. Intellectual Property
          </h2>
          <p>
            All materials, including text, graphics, logos, software, and other
            content, are the property of our company and are protected by
            copyright, trademark, and other laws. Unauthorized use of this
            content is strictly prohibited.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Disclaimer of Warranties
          </h2>
          <p>
            This application is provided &quot;as is&quot; and &quot;as available,&quot; without
            warranties of any kind, whether express or implied, including but
            not limited to warranties of merchantability, fitness for a
            particular purpose, or non-infringement.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall we be held liable for indirect,
            incidental, or consequential damages, including but not limited to
            loss of data, revenue, or business opportunities, arising from your
            use of the application.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7. Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. Changes will be effective immediately upon posting. You are
            responsible for reviewing the Terms periodically.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of [Your Country/State]. Any disputes
            arising under these Terms will be subject to the jurisdiction of the
            courts of [Your Location].
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            9. Contact Information
          </h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 hover:underline"
            >
              support@example.com
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
};

export default page;
