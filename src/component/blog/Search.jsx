import React from "react";
import { FaPlus } from "react-icons/fa";

const Search = () => {
  return (
    <div className="w-full h-fit pt-16 pb-0 md:py-16 flex justify-center items-center">
      <div className="md:w-[80%] w-[90%]">
        <div className="flex m-auto w-full gap-8 justify-center">
          <input
            type="text"
            placeholder="Blog"
            className="px-8 w-[70%] rounded-[30px] h-[60px] outline-none border-black"
          />
          <div className="add text-purple-700 border-[1px] border-black h-[60px] flex justify-center items-center px-6 text-[24px]">
            <FaPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
