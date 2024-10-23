import React from "react";
import Footer from "./Footer";
const PrivacyPolicy = () => {
  return (
    <div className="bg-[#F8E8FE] pt-[15vh] max-sm:pt-[20vh] w-full flex flex-col justify-center">
      <div className="container mx-auto p-6 bottom-9 bg-white w-[80%] max-sm:w-[90%]">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Effective Date: 01/10/2024</p>

        <p className="mb-4">
          At ResearchBreed, we are committed to protecting your privacy. This
          Privacy Policy outlines how we collect, use, disclose, and safeguard
          your information when you visit our website, use our services, and
          interact with our platform.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          1. Information We Collect
        </h2>

        <h3 className="text-xl font-semibold mb-1">
          1.1. Personal Information
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            Account Registration: We may collect your name, email address, phone
            number, and other necessary details for account setup.
          </li>
          <li>
            Payment Information: Payment details such as credit card information
            are collected by third-party processors. We do not store this
            information.
          </li>
          <li>
            Communication Information: We collect information when you contact
            customer support or interact with us.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-1">
          1.2. Non-Personal Information
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            Log Data: We collect your IP address, browser type, device
            information, and pages viewed when using our services.
          </li>
          <li>
            Cookies and Tracking: Cookies and similar technologies are used to
            enhance your experience and for analytics.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>Account Management and Service Delivery.</li>
          <li>AI Assistance for research paper writing and development.</li>
          <li>Payment Processing and Customer Communication.</li>
          <li>Marketing and Platform Improvement.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          3. How We Share Your Information
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            With third-party service providers like payment processors, email
            services, and customer support.
          </li>
          <li>With affiliates to facilitate platform operation.</li>
          <li>If required by law or in response to legal requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">4. Your Privacy Choices</h2>
        <p className="mb-4">
          You can update your account, opt-out of marketing communications, and
          control cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
        <p className="mb-4">
          We use technical measures to safeguard your personal information from
          unauthorized access.
        </p>

        <h2 className="text-2xl font-semibold mb-2">6. Data Retention</h2>
        <p className="mb-4">
          We retain your data as long as needed for the services or legal
          requirements.
        </p>

        <h2 className="text-2xl font-semibold mb-2">7. Children's Privacy</h2>
        <p className="mb-4">
          We do not knowingly collect information from children under 18. If
          found, we will delete it.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          8. International Data Transfers
        </h2>
        <p className="mb-4">
          If you access our services from outside Nigeria, your data may be
          processed in Nigeria.
        </p>

        <h2 className="text-2xl font-semibold mb-2">9. Third-Party Links</h2>
        <p className="mb-4">
          We are not responsible for the privacy practices of third-party
          websites.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          10. Changes to the Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this policy, and the updated version will be posted on
          this page.
        </p>

        <h2 className="text-2xl font-semibold mb-2">11. Contact Us</h2>
        <p className="mb-4">
          For any questions or concerns about this Privacy Policy:
        </p>
        <ul className="list-none">
          <li>Email: ResearchBreed@gmail.com</li>
          <li>Phone: 09036514482</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
