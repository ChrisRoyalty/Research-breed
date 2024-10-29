import React from "react";
import TeamImg from "../../assets/team.png";
import "../../css/about.css";
const AboutMain = () => {
  return (
    <main className="w-full h-fit bg-[#F8E8FE] flex justify-center py-20 sm:py-28">
      <div className="md:w-[80%] w-[90%] text-center">
        <h4 className="font-bold text-[20px]">About us</h4>
        <p className="text-[18px]">
          ResearchBreed is your gateway to the latest academic opportunities. We
          connect researchers and writers with <br /> top journal opportunities,
          research papers, and international conference.
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 items-center md:gap-48 gap-16 mt-16">
          <div className="text-start flex flex-col gap-6 text-[18px]">
            <p className="leading-10">
              At ResearchBreed, we save you time by centralising call for papers
              and providing the support you need to succeed in your academic
              journey. Join our community of scholars to advancing knowledge and
              achieving excellence. 
            </p>
          </div>
          <div>
            <img src={TeamImg} alt="TeamImg" className="w-[90%]" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutMain;
