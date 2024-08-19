import React from "react";

const OurValues = () => {
  return (
    <div className="w-full md:h-[40vh] h-fit flex justify-center items-center border-[1px] border-black">
      <div className="w-[90%] md:w-[80%] grid md:grid-cols-2 grid-cols-1 gap-4 max-md:py-8 items-center">
        <div className="mission">
          <h3 className="text-[20px] font-bold">Our Values</h3>
        </div>
        <div className="details">
          <p className="text-[18px]">
            Empowerment: Supporting researchers and writers with Ai tools and
            resources. <br /> Innovation: Utilizing cutting edge technology to
            enhance academic writing. <br /> Visibility: Ensuring your work
            reaches people of the same interest. <br /> Community: Connecting
            scholars to advance knowledge and collaborations. <br /> Excellence:
            Promoting high quality research and academic success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
