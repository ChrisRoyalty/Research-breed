import React from "react";

const Button = () => {
  return (
    <div className="w-full h-fit py-8 flex justify-center items-center">
      <div className="w-[90%] md:w-[80%] flex justify-center">
        <button className="bg-[#8F3FA9] h-[80px] rounded-xl w-full md:w-[60%] text-white">
          See more
        </button>
      </div>
    </div>
  );
};

export default Button;
