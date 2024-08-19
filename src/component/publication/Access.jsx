import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Access = () => {
  return (
    <div className="w-full h-fit md:py-20 flex justify-center items-center">
      <div className="md:w-[80%] w-[90%]">
        <p className="text-[22px] text-center md:text-[20px] md:w-[70%] md:m-auto">
          Access over 160 million publication pages and stay up-to-date with
          what is happening in your field.
        </p>
        <div className="grid grid-cols-2 md:gap-[150px] sm:gap-8 gap-4 h-[100px] sm:h-[150px] my-8">
          <div className="search border-[1px] border-black flex justify-between items-center px-4 sm:px-12 rounded-2xl shadow-lg gap-4 cursor-pointer">
            <input
              type="text"
              placeholder="Search for publication"
              className="w-full h-[50px] outline-none text-[18px]"
            />
            <FaSearch className="text-[30px]" />
          </div>
          <div className="filter border-[1px] border-black flex justify-between items-center px-4 sm:px-12 rounded-2xl shadow-lg gap-4 cursor-pointer">
            <h4>FILTERS</h4>
            <IoIosArrowDown className="text-[35px] font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Access;
