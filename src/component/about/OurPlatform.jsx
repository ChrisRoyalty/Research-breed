import React from "react";

const OurValues = () => {
  return (
    <div className="w-full md:h-[40vh] h-fit flex justify-center items-center border-[1px] border-black">
      <div className="w-[90%] md:w-[80%] grid md:grid-cols-2 grid-cols-1 gap-4 max-md:py-8 items-center">
        <div className="mission">
          <h3 className="text-[20px] font-bold">Our Platforms</h3>
        </div>
        <div className="details">
          <p className="text-[18px]">
            ResearchBreed connects you with the latest call for papers, and
            helps increase the visibility of your research. Join us to navigate
            academic opportunities effortlessly and enhance your scholarly
            impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
