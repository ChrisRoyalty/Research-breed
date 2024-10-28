import React from "react";
import LogoImg from "../assets/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Footer = () => {
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
                <FaSquareXTwitter />
              </a>
              <a href="" className="text-[25px] hover:text-[#8F3FA9]">
                <FaInstagramSquare />
              </a>
            </div>
          </div>
          <form className="flex md:justify-end md:mt-0 mt-8 ">
            {/* <div className="w-fit flex flex-col gap-4">
              <h3 className="font-bold">Get the Latest Update</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email here"
                  className="md:w-fit h-[60px] border-[1px] border-[#8F3FA9] max-sm:px-2 px-4 outline-none"
                />
                <button className="h-[60px] border-[1px] border-[#8F3FA9] max-sm:px-2 px-4">
                  Subscribe
                </button>
              </div>
            </div> */}
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
          <a href=""></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
