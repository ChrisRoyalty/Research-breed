import React, { useState } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa6";
import { FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Conference = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const readMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="w-full h-fit py-8">
      <div className="">
        <div className="journals flex flex-col gap-2">
          <h4 className="text-[18px] font-bold">Conference Papers</h4>
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
        <div
          className={`fulldisplay ${
            isExpanded ? "block" : "hidden"
          } flex flex-col gap-8 mt-4`}
        >
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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
          <div className="journals flex flex-col gap-2">
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

export default Conference;
