import React from "react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
const Main = () => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("No file chosen");
    }
  };
  return (
    <div className="md:w-[80%] w-[90%]">
      <h1 className="text-[25px] py-8 font-bold text-center">
        Submission Form
      </h1>
      <form className="bg-[#F8E8FE] pt-32 pb-44 px-12 flex flex-col gap-16">
        <h1 className="text-center text-[20px] font-bold">
          Research paper submission Form
        </h1>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[20px]">Paper Title *</h3>
          <input
            required
            type="text"
            className="rounded-[30px] outline-none border-[1px] border-purple-700 h-[56px] px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[20px]">Author *</h3>
          <input
            required
            type="text"
            className="rounded-[30px] outline-none border-[1px] border-purple-700 h-[56px] px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[20px]">Email *</h3>
          <input
            required
            type="email"
            className="rounded-[30px] outline-none border-[1px] border-purple-700 h-[56px] px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[20px]">Phone Number *</h3>
          <input
            required
            type="number"
            className="rounded-[30px] outline-none border-[1px] border-purple-700 h-[56px] px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[20px]">Abstract *</h3>
          {/* <input
            required
              type="text"
              className="h-[270px] rounded-[30px] outline-none border-[1px] border-purple-700 px-4"
            /> */}
          <textarea
            name=""
            id=""
            className="h-[270px] rounded-[30px] outline-none border-[1px] border-purple-700 p-4"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[20px]">Research paper *</h3>
          <input
            required
            type="text"
            className="rounded-[30px] outline-none border-[1px] border-purple-700 h-[56px] px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[20px]">University *</h3>
          <input
            required
            type="text"
            className="rounded-[30px] outline-none border-[1px] border-purple-700 h-[56px] px-4"
          />
        </div>
        <div className="flex items-center">
          <div className="relative inline-block overflow-hidden">
            {/* Styled button */}
            <button className="rounded-xl border-[1px] border-purple-700 bg-white px-4 flex gap-8 text-gray-600   items-center h-[70px]">
              <FaUpload className="text-black" />
              Click to Upload File
            </button>
            {/* Hidden file input */}
            <input
              type="file"
              className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
          {/* Display the file name after selection */}
          <span className="ml-4 text-gray-700">{fileName}</span>
        </div>
      </form>
    </div>
  );
};

export default Main;
