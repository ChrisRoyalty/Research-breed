import React, { useState } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa6";
import { FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
// import Publications from "../../pages/Publications";

const Publication = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const readMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="w-full h-fit py-8">
      <div className="">
        <div className="journals flex flex-col gap-2">
          <h4 className="text-[18px] font-bold">Journals</h4>
          <div className="sm:px-12 flex flex-col max-sm:gap-4 gap-2">
            <h5 className="underline">Harvard Business Reviews</h5>
            <p className="leading-7">
              Published by Elsevier from University of Nigeria Nsukka, on July
              15, 2023. Journal Subjects:
            </p>
            <p className="w-[80%] leading-7">
              &nbsp; &nbsp; &nbsp;Business, Technology in Business, Business
              goals, Business strategy, Business achievement and Business
              Organization
            </p>
          </div>
        </div>
        {/* full text display */}
        <div className={`fulldisplay ${isExpanded ? "block" : "hidden"}`}>
          <ul className="mt-2">
            <li className="">ISBN: &nbsp;&nbsp;&nbsp; 829-20832-018-930</li>
            <li className="">DOI: &nbsp;&nbsp;&nbsp; OWP9KL,NI202I</li>
            <li className="">
              Publication Date: &nbsp;&nbsp;&nbsp; 15 JULY, 2023.
            </li>
            <li className="">Authors: &nbsp;&nbsp;&nbsp; Elsevier et John,</li>
          </ul>
          <div className="keywords flex max-sm:flex-col mt-8">
            <p className="w-[30%] max-sm:w-full text-[18px]">Keyword</p>
            <div className="details w-[70%] max-sm:w-full flex flex-col gap-4">
              <ul>
                <li className="sm:text-[20px]">
                  Business, Technology in Business, Business goals, Business
                  strategy.
                </li>
                <li className="sm:text-[20px]">
                  Business achievement and Business Organization.
                </li>
              </ul>
              <ul>
                <li className="sm:text-[20px]">
                  Business, Technology in Business, Business goals, Business
                  strategy.
                </li>
                <li className="sm:text-[20px]">
                  Business achievement and Business Organization.
                </li>
              </ul>
              <ul>
                <li className="sm:text-[20px]">
                  Business, Technology in Business, Business goals, Business
                  strategy.
                </li>
                <li className="sm:text-[20px]">
                  Business achievement and Business Organization.
                </li>
              </ul>
              <ul>
                <li className="sm:text-[20px]">
                  Business, Technology in Business, Business goals, Business
                  strategy.
                </li>
                <li className="sm:text-[20px]">
                  Business achievement and Business Organization.
                </li>
              </ul>
            </div>
          </div>

          <div className="contact mt-8">
            <h2 className="text-[24px] font-bold">Contact Information</h2>
            <ul className="flex items-center">
              <li className="text-[20px] md:w-[30%] w-[50%]">
                Editor-in-chief:
              </li>
              <li className="md:w-[70%] w-[50%]">Orji Peter</li>
            </ul>
            <ul className="flex items-center">
              <li className="text-[20px] md:w-[30%] w-[50%]">
                Managing Director:
              </li>
              <li className="md:w-[70%] w-[50%]">Orji Peter</li>
            </ul>
            <ul className="flex items-center">
              <li className="text-[20px] md:w-[30%] w-[50%]">
                Publishing Team:
              </li>
              <li className="md:w-[70%] w-[50%]">Orji Peter</li>
            </ul>
          </div>
          <div className="authors-resources mt-8">
            <strong className="text-[24px]">Related Resources</strong>
            <div className="flex max-sm:flex-col  mt-2">
              <p className="w-[30%] sm:text-[20px]">Related Publications</p>
              <div className="details w-[70%] max-sm:w-full flex flex-col gap-4">
                <a href="" className="sm:text-[20px]">
                  Which recycling service providers offer the most
                  cost-effective solutions for small businesses?
                </a>
                <a href="" className="sm:text-[20px]">
                  What are the dos and don'ts of listing technical skills on a
                  resume?
                </a>
                <a href="" className="sm:text-[20px]">
                  What are the key features to look for in a self-service
                  support platform for a global customer base?
                </a>
                <a href="" className="sm:text-[20px]">
                  Which content moderation services provide real-time monitoring
                  and quick response to inappropriate content?
                </a>
                <a href="" className="sm:text-[20px]">
                  Which recycling service providers offer the most
                  cost-effective solutions for small businesses?
                </a>
                <a href="" className="sm:text-[20px]">
                  What are the key features to look for in a self-service
                  support platform for a global customer base?
                </a>
                <a href="" className="sm:text-[20px]">
                  Which content moderation services provide real-time monitoring
                  and quick response to inappropriate content?
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex max-sm:flex-col  max-sm:mt-2">
              <p className="w-[30%] sm:text-[20px]">Authors Resources</p>
              <div className="details w-[70%] max-sm:w-full flex flex-col gap-4">
                <a href="" className="sm:text-[20px]">
                  Which recycling service providers offer the most
                  cost-effective solutions for small businesses?
                </a>
                <a href="" className="sm:text-[20px]">
                  What are the dos and don'ts of listing technical skills on a
                  resume?
                </a>
                <a href="" className="sm:text-[20px]">
                  What are the key features to look for in a self-service
                  support platform for a global customer base?
                </a>
                <a href="" className="sm:text-[20px]">
                  Which content moderation services provide real-time monitoring
                  and quick response to inappropriate content?
                </a>
                <a href="" className="sm:text-[20px]">
                  Which recycling service providers offer the most
                  cost-effective solutions for small businesses?
                </a>
                <a href="" className="sm:text-[20px]">
                  What are the key features to look for in a self-service
                  support platform for a global customer base?
                </a>
              </div>
            </div>
          </div>
          {/* Reviewers Resources */}
          <div className="mt-8">
            <div className="flex max-sm:flex-col  max-sm:mt-2">
              <p className="w-[30%] sm:text-[20px]">Reviewers Resources</p>
              <div className="details w-[70%] max-sm:w-full flex flex-col gap-4">
                <a href="" className="sm:text-[20px]">
                  Tobi Ogu
                </a>
                <a href="" className="sm:text-[20px]">
                  Chionwu mnaywk
                </a>
                <a href="" className="sm:text-[20px]">
                  Ndidi peter
                </a>
                <a href="" className="sm:text-[20px]">
                  Kosi royal
                </a>
              </div>
            </div>
          </div>
          {/* Share */}
          <div className="mt-8">
            <div className="flex max-sm:flex-col  max-sm:mt-2">
              <p className="w-[30%] sm:text-[20px]">Share</p>
              <div className="details w-[70%] max-sm:w-full flex items-center gap-4">
                <a
                  href=""
                  className="sm:text-[20px] border-[1px] border-black p-2 rounded-full"
                >
                  <FaFacebook className="text-blue-700" />
                </a>
                <a
                  href=""
                  className="sm:text-[20px] border-[1px] border-black p-2 rounded-full"
                >
                  <FaLinkedin className="text-blue-700" />
                </a>
                <a
                  href=""
                  className="sm:text-[20px] border-[1px] border-black p-2 rounded-full"
                >
                  <FaTwitterSquare className="text-blue-700" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="btn flex justify-end sm:px-[15px] my-4">
          <button
            href=""
            className="bg-[#8F3FA9] px-8 h-[50px] rounded-[30px] text-white"
            onClick={readMore}
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publication;
