import React from "react";
import StudentImg from "../../assets/girl.png";
import { Link } from "react-router-dom";

function HeroSection({ loggedIn }) {
  return (
    <section className="hero-section bg-[#F8E8FE] py-24 mb-5 lg:h-[86vh] h-fit lg:p-0 flex justify-center items-center">
      <div className="w-[80%] grid lg:grid-cols-2 grid-cols-1 items-center gap-16">
        <div className="intro flex flex-col gap-4 ">
          <h1 className="text-4xl max-md:text-3xl font-bold text-gray-800">
            RESEARCH BREED.
          </h1>
          <h3 className="lg:text-3xl text-2xl font-bold">
            Discover, Collaborate, Publish.
          </h3>
          <p className="text-lg text-black-100 font-bold">
            {loggedIn
              ? "Welcome back to ResearchBreed! Your gateway to the latest academic opportunities awaits. Explore top journals, discover new research calls, and connect with experts in your field."
              : "Find calls for papers, connect with like-minded researchers, and share your expertise. Your source for new research opportunities."}
          </p>
          {!loggedIn && (
            <Link
              to="/create-account"
              className="lg:w-fit bg-[#8F3FA9] text-white px-16 py-4 rounded-lg shadow-lg font-bold"
            >
              Sign Up
            </Link>
          )}
        </div>
        <div>
          <img src={StudentImg} alt="Student illustration" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
