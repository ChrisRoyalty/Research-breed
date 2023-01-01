import React from "react";
import { Carousel } from "flowbite-react";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import { BsShare } from "react-icons/bs";
import Carousel1 from "../../assets/carousel1.png";
import Carousel2 from "../../assets/man_girl.jpg";
import Carousel3 from "../../assets/team.png";
const CarouselComponent = () => {
  return (
    <div className="w-full h-fit py-0 sm:py-10 md:py-16 flex justify-center items-center">
      <div className="md:w-[80%] w-[90%]">
        <figure>
          <div className="h-64 sm:h-80 xl:h-[80vh] my-8 md:mt-[-80px]">
            <Carousel className="">
              <img src={Carousel1} alt="First Slide" />
              <img src={Carousel2} alt="Second Slide" />
              <img src={Carousel3} alt="Third Slide" />
              <img src={Carousel2} alt="Fourth Slide" />
              <img src={Carousel3} alt="Fifth Slide" />
            </Carousel>
          </div>
          <figcaption className="sm:px-8 py-4 flex flex-col gap-8">
            {/* <div className="reactions flex items-center gap-8 text-[40px]">
              <a href="" className="hover:text-purple-700">
                <AiOutlineLike />
              </a>
              <a href="" className="hover:text-purple-700">
                <BiDislike />
              </a>
              <a href="" className="hover:text-purple-700">
                <FaRegStar />
              </a>
              <a href="" className="hover:text-purple-700">
                <BsShare />
              </a>
            </div> */}
            <div className="description flex flex-col gap-8 text-[18px] md:text-[24px] font-bold">
              <p>
                Drive engagement, build trust, and earn loyalty with AI-assisted
                content creation tools Our industry-leading platform uses AI to
                suggest marketing creative that your team can use to easily
                create unique, personalized marketing content.*
              </p>
              <p>
                Drive engagement, build trust, and earn loyalty with AI-assisted
                content creation tools Our industry-leading platform uses AI to
                suggest marketing creative that your team can use to easily
                create unique, personalized marketing content.*
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default CarouselComponent;
