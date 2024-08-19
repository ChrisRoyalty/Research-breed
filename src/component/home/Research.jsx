import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
// import Button from "./LongButton";
import GraduationImg from "../../assets/graduates.jpg";
import LearningImg from "../../assets/man_girl.jpg";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

function Research() {
  return (
    <section className="w-full h-fit md:py-[10vh] flex justify-center items-center">
      <div className="w-[90%] sm:w-[80%] h-fit">
        <section className="section1 grid md:grid-cols-2 grid-cols-1 items-center gap-8 sm:gap-24">
          <div className="graduationImg">
            <img
              src={GraduationImg}
              alt="Graduation Img"
              className="h-[300px] md:h-[436px]"
            />
          </div>
          <div className="details">
            <h3 className="text-[20px] sm:text-[24px] font-bold">
              New Research opportunities
            </h3>
            <p className="mt-2 text-gray-600 sm:text-[18px] text-[15px] leading-7 sm:leading-10">
              Gain access to over 160 million call for papers and stay updated
              with what is happening in your field.
            </p>
            <div className="max-sm:mt-4 inputs flex max-md:flex-col gap-8">
              <div className="flex justify-center items-center gap-4 border-2 border-gray-200 rounded-lg w-full sm:w-[50%] p-4">
                <IoSearch className="text-[30px]" />
                <input
                  type="text"
                  placeholder="Search.."
                  className="border-none outline-none w-full"
                />
              </div>
              <div className="flex justify-center items-center gap-4 border-2 border-gray-200 rounded-lg w-full sm:w-[50%] p-4">
                <h5>FILTERS</h5>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </section>
        <section className="section2 grid md:grid-cols-2 grid-cols-1 items-center gap-8 py-28">
          <div className="details flex flex-col gap-4 sm:gap-8">
            <h3 className="text-xl font-bold">
              Advance your Research and <br /> Collaborate with our community
            </h3>
            <button className="w-[90%] lg:w-[70%] rounded-lg h-[50px] bg-[#8F3FA9] text-white">
              Connect
            </button>
          </div>

          <div className="graduationImg">
            <img src={LearningImg} alt="Graduation Img" className="h-[436px]" />
          </div>
        </section>
      </div>
    </section>
  );
}

export default Research;
