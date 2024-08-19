import React from "react";

const OurMission = () => {
  return (
    <div className="w-full md:h-[40vh] h-fit flex justify-center items-center border-[1px] border-black">
      <div className="w-[90%] md:w-[80%] grid md:grid-cols-2 grid-cols-1 gap-4 max-md:py-8 items-center">
        <div className="mission">
          <h3 className="text-[20px] font-bold">Our Mission</h3>
        </div>
        <div className="details">
          <p className="text-[18px]">
            To empower researchers and writers by providing access to the latest
            academic opportunities, enhancing their writing with Ai-driven
            tools, and increasing visibility for their work.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
