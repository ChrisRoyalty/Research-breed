import React from "react";
import Footer from "./Footer";
const CodeOfConduct = () => {
  return (
    <div className="bg-[#F8E8FE] pt-[15vh] max-sm:pt-[20vh] w-full flex flex-col justify-center">
      <div className="container mx-auto p-8 bg-white w-[80%]">
        <h1 className="text-3xl font-bold mb-4">
          ResearchBreed Code of Conduct
        </h1>
        <p className="mb-4">Effective Date: 01/10/2024</p>

        <p className="mb-4">
          At ResearchBreed, we are committed to maintaining a professional,
          respectful, and constructive community. Whether you're a student,
          researcher, academic institution, or staff member, we expect everyone
          to uphold the highest standards of behavior and interaction. This Code
          of Conduct applies to all users of our platform and anyone interacting
          with ResearchBreed's services.
        </p>

        <h2 className="text-2xl font-semibold mb-2">1. Professionalism</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Communicate Respectfully: Be respectful and polite in all
            interactions, whether with peers, collaborators, or the
            ResearchBreed team.
          </li>
          <li>
            Provide Constructive Feedback: Offer feedback that is helpful,
            relevant, and constructive when reviewing research or engaging with
            content on our platform.
          </li>
          <li>
            Follow Ethical Guidelines: Maintain honesty and integrity in your
            work, ensuring that all research submitted or shared complies with
            academic and ethical standards.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          2. Inclusivity and Respect
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Respect Differences: Treat all members with respect, regardless of
            race, ethnicity, gender, sexual orientation, religion, or
            background.
          </li>
          <li>
            Zero Tolerance for Harassment: We do not tolerate harassment,
            discrimination, bullying, or any form of intimidation. This includes
            offensive comments, uninvited advances, and any conduct that creates
            an unwelcoming environment.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">3. Academic Integrity</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Avoid Plagiarism: Submit only your original work or properly
            attribute content to its rightful source. Plagiarism, in any form,
            will not be tolerated.
          </li>
          <li>
            Cite Sources: Ensure all sources, data, and materials used in
            research are properly cited.
          </li>
          <li>
            Respect Intellectual Property: Do not copy, distribute, or use any
            research, material, or content without proper permission from its
            creator.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          4. Collaboration and Sharing
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Collaborate Responsibly: When collaborating with others, maintain
            transparency and respect the contributions of all parties involved.
          </li>
          <li>
            Privacy of Research: Respect the privacy and confidentiality of
            research projects. Do not share or disclose confidential information
            without proper authorization.
          </li>
          <li>
            Crediting Contributors: Always credit co-authors, collaborators, and
            others who contributed to a piece of research.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">5. Platform Usage</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Accurate Information: Provide accurate, truthful, and up-to-date
            information in your user profile and research submissions.
          </li>
          <li>
            No Misuse of Services: Do not misuse the platform to engage in
            spamming, phishing, or any fraudulent activities.
          </li>
          <li>
            Compliance with Laws: Follow all applicable laws and regulations
            when using ResearchBreed’s services.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">6. Reporting Violations</h2>
        <p className="mb-4">
          We take violations of our Code of Conduct seriously. If you witness or
          experience behavior that violates this Code, we encourage you to
          report it to us at{" "}
          <a href="mailto:ResearchBreed@gmail.com" className="text-blue-600">
            ResearchBreed@gmail.com
          </a>
          .
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            All reports will be treated confidentially and investigated
            promptly.
          </li>
          <li>
            We reserve the right to suspend or terminate the accounts of users
            who violate this Code of Conduct.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          7. Consequences of Violations
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Warnings: Minor or first-time infractions may result in a warning.
          </li>
          <li>
            Suspension: Repeated or serious violations may lead to temporary or
            permanent suspension from the platform.
          </li>
          <li>
            Legal Action: In cases of severe misconduct, including fraudulent
            behavior, plagiarism, or harassment, we may take appropriate legal
            action.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">8. Amendments</h2>
        <p className="mb-4">
          ResearchBreed reserves the right to modify or update this Code of
          Conduct as necessary. Users will be informed of significant changes
          via the platform.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Code of Conduct,
          please contact us at:
        </p>
        <ul className="list-none">
          <li>
            Email:{" "}
            <a href="mailto:ResearchBreed@gmail.com" className="text-blue-600">
              ResearchBreed@gmail.com
            </a>
          </li>
          <li>Phone: 09036514482</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default CodeOfConduct;
