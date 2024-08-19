import React from "react";

const OurVision = () => {
  return (
    <div className="w-full md:h-[40vh] flex justify-center items-center">
      <div className="w-[90%] md:w-[80%] grid md:grid-cols-2 grid-cols-1 gap-4 max-md:py-8 items-center">
        <div className="vision">
          <h3 className="text-[20px] font-bold">Our Vision</h3>
        </div>
        <div className="details">
          <p className="text-[18px]">
            To be the leading platform that connects academics worldwide,
            fostering a thriving research community where innovation and
            knowledge flourish.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
