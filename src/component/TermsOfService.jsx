import React from "react";
import Footer from "./Footer";
const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#F8E8FE] pt-[15vh] max-sm:pt-[20vh] w-full">
      <div className="max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to <strong>ResearchBreed</strong>.
        </p>
        <p className="mb-4">
          By accessing or using the ResearchBreed website (the “Site”) and our
          services (the “Services”), you agree to be bound by the following
          terms and conditions (“Terms of Service” or “Agreement”). Please read
          these terms carefully before using the Site or Services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By using ResearchBreed, you agree to comply with these Terms of
          Service and all applicable laws and regulations. If you do not agree
          with any of these terms, please do not use our Site or Services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Eligibility</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Be at least 18 years old.</li>
          <li>
            Have the authority to agree to these terms on behalf of yourself or
            the entity you represent.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Account Registration
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            To access certain features of the Site, you must create an account.
          </li>
          <li>
            You agree to provide accurate and complete information when
            registering an account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account and password, and for all activities that occur under your
            account.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Use of Services</h2>
        <p className="mb-4">
          ResearchBreed provides a platform to connect writers with journals and
          research institutions. You may not use the Site for any illegal or
          unauthorized purposes. You agree not to engage in any activity that
          disrupts the performance or security of the Site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          5. AI Assistance Tools
        </h2>
        <p className="mb-4">
          ResearchBreed provides AI tools to assist in content writing and
          research development. While these tools are designed to enhance your
          work, they should be used as supplemental aids. ResearchBreed does not
          guarantee the accuracy or appropriateness of AI-generated content.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Content and Intellectual Property
        </h2>
        <p className="mb-4">
          All content provided on the Site, including text, graphics, logos, and
          software, is the property of ResearchBreed or its content suppliers
          and is protected by intellectual property laws. You retain ownership
          of any content you upload or submit through the Site but grant
          ResearchBreed a worldwide, royalty-free license to use, display, and
          distribute such content as needed for the functioning of the platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          7. Fees and Payment
        </h2>
        <p className="mb-4">
          ResearchBreed may charge fees for certain Services provided on the
          platform. Payment terms and conditions will be provided at the time of
          purchase. All fees are non-refundable, unless otherwise stated.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          8. Third-Party Services
        </h2>
        <p className="mb-4">
          ResearchBreed may provide links to third-party websites or services
          that are not under our control. We are not responsible for the
          content, privacy policies, or practices of any third-party sites or
          services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. User Conduct</h2>
        <p className="mb-4">
          You agree to use the Site and Services in a responsible manner. You
          must not engage in activities that harm other users or violate the
          intellectual property rights of others. ResearchBreed reserves the
          right to terminate or suspend your access to the Site if you violate
          these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Termination</h2>
        <p className="mb-4">
          ResearchBreed reserves the right to suspend or terminate your access
          to the Site or Services at any time, without notice, for conduct that
          violates these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Disclaimers</h2>
        <p className="mb-4">
          ResearchBreed provides its Services on an "as-is" and "as-available"
          basis. We do not guarantee that the Site will be error-free or
          uninterrupted.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          12. Limitation of Liability
        </h2>
        <p className="mb-4">
          In no event will ResearchBreed be liable for any indirect, incidental,
          special, or consequential damages arising from your use of the Site or
          Services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Privacy</h2>
        <p className="mb-4">
          Please refer to our{" "}
          <a href="/privacy-policy" className="text-[#8F3FA9] underline">
            Privacy Policy
          </a>{" "}
          for information on how we collect, use, and disclose your personal
          information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          14. Changes to the Terms of Service
        </h2>
        <p className="mb-4">
          ResearchBreed may update these Terms of Service from time to time. You
          are responsible for reviewing the most current version of these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">15. Governing Law</h2>
        <p className="mb-4">
          These Terms of Service will be governed by and construed in accordance
          with the laws of [your jurisdiction], without regard to its conflict
          of law principles.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
