import React from "react";
// import Button from "./ShortButton";
import StudentImg from "../../assets/girl.png";
function HeroSection() {
  return (
    <section className="hero-section bg-[#F8E8FE] py-24 mb-5 lg:h-[86vh] h-fit lg:p-0 flex justify-center items-center">
      {/* <div className="container mx-auto flex ss:flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find, connect, write. The ResearchBreed way (Your writing Ally)
          </h1>
          <p className="text-lg text-black-100 mb-6 font-bold">
            Your source for new research opportunities
          </p>
          <button>Sign Up</button>
        </div>
        <div className="md:w-1/2 p-6">
          <img
            src="girl.png"
            alt="Research"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div> */}
      <div className="w-[80%] grid lg:grid-cols-2 grid-cols-1 items-center gap-16">
        <div className="intro">
          <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4 leading-10 md:leading-[200px]">
            Find, connect, write. The ResearchBreed way (Your writing Ally)
          </h1>
          <p className="text-lg text-black-100 mb-6 font-bold">
            Your source for new research opportunities
          </p>
          <button className="bg-[#8F3FA9] text-white w-[240px] h-[50px] rounded-lg shadow-lg font-bold">
            Sign Up
          </button>
        </div>
        <div>
          <img src={StudentImg} alt="" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
