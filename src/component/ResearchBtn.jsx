import React from "react";

const ResearchBtn = () => {
  return (
    <div className="bg-white w-full flex justify-center py-40">
      <div className="btn md:w-[80%] w-[90%] flex flex-col gap-8">
        <button className="text-[40px] h-[100px] bg-[#8F3FA9] rounded-[30px] text-white w-full">
          Research with AI
        </button>
        <div className="flex justify-end">
          <button className="rounded-[30px] text-[#8F3FA9] border-[1px] border-[#8F3FA9] px-8 py-2 text-[20px] w-fit">
            $2
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchBtn;
