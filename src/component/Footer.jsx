import React, { useState } from "react";
import LogoImg from "../assets/logo.png";

import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagramSquare,
  FaRegCopyright,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState(""); // For storing email input
  const [showModal, setShowModal] = useState(false); // To toggle modal visibility
  const [networkMessage, setNetworkMessage] = useState(""); // To store the API response message
  const [isLoading, setIsLoading] = useState(false); // To track loading state

  // Handle form submission
  const handleSubscription = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/newsletter`,
        { email }
      );

      // Show success message from response
      setNetworkMessage("Subscription successful!");
      setShowModal(true);
    } catch (error) {
      // If error occurs, show error message
      setNetworkMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setShowModal(true);
    } finally {
      setIsLoading(false); // Hide loading state after request
    }
  };

  return (
    <footer className="w-full h-fit flex flex-col justify-center items-center mt-12">
      <div className="w-[90%] lg:w-[80%]">
        <div className="logo">
          <img src={LogoImg} alt="logo" className="w-[50px]" />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 mt-4 items-center">
          <div className="flex flex-col gap-8">
            <nav className="grid grid-cols-3 gap-4">
              <NavLink to={"/about"}>About</NavLink>
              <NavLink to={"/faq"}>FAQs</NavLink>
              <NavLink to={"/collaboration"}>Collaborate</NavLink>
              <NavLink to={"/contact"}>Contact Us</NavLink>
              <NavLink to={"/blog"}>Blog</NavLink>
              <NavLink to={"/publications"}>Publications</NavLink>
            </nav>
            <div className="socials flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61559852670778"
                className="text-[25px] hover:text-[#8F3FA9]"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/company/research-breed/"
                className="text-[25px] hover:text-[#8F3FA9]"
              >
                <FaLinkedin />
              </a>
              <a href="" className="text-[25px] hover:text-[#8F3FA9]">
                <FaTwitter />
              </a>
              <a href="" className="text-[25px] hover:text-[#8F3FA9]">
                <FaInstagramSquare />
              </a>
            </div>
          </div>
          <form
            className="flex md:justify-end md:mt-0 mt-8"
            onSubmit={handleSubscription}
          >
            <div className="w-fit flex flex-col gap-4">
              <h3 className="font-bold">Get the Latest Update</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email here"
                  className="md:w-fit h-[60px] border-[1px] border-[#8F3FA9] max-sm:px-2 px-4 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="h-[60px] border-[1px] border-[#8F3FA9] max-sm:px-2 px-4 disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-12 py-[40px] border-t border-black w-full flex justify-center items-center">
        <div className="w-[90%] sm:w-[80%] flex gap-4 max-md:flex-col max-md:justify-start">
          <NavLink
            to={"/terms-of-service"}
            className="md:border-r md:pr-3 border-black"
          >
            Terms & Conditions
          </NavLink>
          <NavLink
            to={"/privacy-policy"}
            className="md:border-r md:pr-3 border-black"
          >
            Privacy policy
          </NavLink>
          <NavLink
            to={"/code-of-conduct"}
            className="md:border-r md:pr-3 border-black"
          >
            Code of conduct
          </NavLink>

          <a href="" className="flex items-center gap-2 max-sm:text-[12px]">
            <FaRegCopyright /> 2024 Researchbreed, LLC. All Rights Reserved.
          </a>
          <a>Call: 09036514482</a>
          <a>Email Us: ResearchBreed@gmail.com </a>
        </div>
      </div>

      {/* Modal for network response */}
      {showModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg text-black">
            <p>{networkMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-[#8F3FA9] text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
