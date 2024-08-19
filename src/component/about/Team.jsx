import React from "react";
import John from "../../assets/john.png";
import Edward from "../../assets/edward.png";
import Chinedu from "../../assets/chinedu.png";
import George from "../../assets/george.png";
import Chisom from "../../assets/chisom.png";
import Christiana from "../../assets/christiana.png";
import Favour from "../../assets/favor.png";
import Patience from "../../assets/patience.png";
const Team = () => {
  return (
    <div className="w-full h-fit py-32 flex justify-center items-center">
      <div className="w-[80%]">
        <h3 className="font-bold text-[20px] text-center">Meet Our Team</h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8 mt-16">
          <figure className="flex flex-col gap-2">
            <img
              src={John}
              alt="ProfilePhoto"
              className="border-[15px] md:border-[20px] border-[#07522D] md:rounded-tl-[108px] rounded-tl-[75px] md:rounded-br-[108px] rounded-br-[75px] h-[220px] md:h-[249px]"
            />
            <figcaption>
              <h4>Mr John Okeke</h4>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src={Edward}
              alt="ProfilePhoto"
              className="border-[15px] md:border-[20px] border-[#07522D] md:rounded-tl-[108px] rounded-tl-[75px] md:rounded-br-[108px] rounded-br-[75px] h-[220px] md:h-[249px]"
            />
            <figcaption>
              <h4>Dr Edward Peter</h4>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src={Chinedu}
              alt="ProfilePhoto"
              className="border-[15px] md:border-[20px] border-[#07522D] md:rounded-tl-[108px] rounded-tl-[75px] md:rounded-br-[108px] rounded-br-[75px] h-[220px] md:h-[249px]"
            />
            <figcaption>
              <h4>Mr Chinedu Okeke</h4>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src={George}
              alt="ProfilePhoto"
              className="border-[15px] md:border-[20px] border-[#07522D] md:rounded-tl-[108px] rounded-tl-[75px] md:rounded-br-[108px] rounded-br-[75px] h-[220px] md:h-[249px]"
            />
            <figcaption>
              <h4>Mr George Joel</h4>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src={Chisom}
              alt="ProfilePhoto"
              className="border-[15px] md:border-[20px] border-[#07522D] md:rounded-tl-[108px] rounded-tl-[75px] md:rounded-br-[108px] rounded-br-[75px] h-[220px] md:h-[249px]"
            />
            <figcaption>
              <h4>Miss Chisom Eke</h4>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src={Christiana}
              alt="ProfilePhoto"
              className="border-[15px] md:border-[20px] border-[#07522D] md:rounded-tl-[108px] rounded-tl-[75px] md:rounded-br-[108px] rounded-br-[75px] h-[220px] md:h-[249px]"
            />
            <figcaption>
              <h4>Dr Christiana Chris</h4>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src={Favour}
              alt="ProfilePhoto"
              className="border-[15px] md:border-[20px] border-[#07522D] md:rounded-tl-[108px] rounded-tl-[75px] md:rounded-br-[108px] rounded-br-[75px] h-[220px] md:h-[249px]"
            />
            <figcaption>
              <h4>Miss Favour John</h4>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src={Patience}
              alt="ProfilePhoto"
              className="border-[15px] md:border-[20px] border-[#07522D] md:rounded-tl-[108px] rounded-tl-[75px] md:rounded-br-[108px] rounded-br-[75px] h-[220px] md:h-[249px]"
            />
            <figcaption>
              <h4>Mrs Patience Uzor</h4>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Team;
