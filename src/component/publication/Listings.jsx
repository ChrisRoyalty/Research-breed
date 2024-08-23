import React from "react";
import Journals from "./Journals";
import ResearchBtn from "../ResearchBtn";
import Research from "./Research";
import Conference from "./Conference";

const Listings = () => {
  return (
    <section className="bg-[#F8E8FE] w-full h-fit pt-14 flex flex-col justify-center items-center">
      <div className="w-[90%] md:w-[80%]">
        <div className="publications flex justify-between max-sm:items-center gap-2">
          <h4 className="md:text-[22px] text-[15px] font-bold">
            Publication Listings
          </h4>
          <button className="bg-[#8F3FA9] px-4 sm:px-8 h-[60px] text-white rounded-[30px]">
            Research with AI
          </button>
        </div>
        <Journals />
        <Research />
        <Conference />
        <Journals />
        <Research />
        <Conference />
      </div>
      <ResearchBtn />
    </section>
  );
};

export default Listings;
