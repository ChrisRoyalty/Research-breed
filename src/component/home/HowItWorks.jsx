import React from "react";
import { motion } from "framer-motion";

function HowItWorks() {
  // Define animation variants for the fade-in and slide-up effect
  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full h-fit flex justify-center items-center">
      <div className="w-[90%] sm:w-[80%] py-12 px-4">
        <h2 className="text-center text-2xl font-bold mb-4">
          How Researchbreed Works
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Follow our easy 4-step process to get started
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-16">
          {/* Step 1 */}
          <motion.div
            className="relative border shadow-lg rounded-lg p-8 flex flex-col gap-1"
            initial="hidden"
            whileInView="visible"
            variants={cardVariant}
          >
            <h3 className="font-bold">Create your Account</h3>
            <p className="text-[16px]">
              Create a username and password or sign up with your Google, Apple.
              Verify your account and complete your profile to get started.
            </p>
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-start">
              <h4 className="sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] rounded-full absolute top-auto left-[-15px] bg-black text-white flex justify-center items-center">
                1
              </h4>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="relative border shadow-lg rounded-lg p-8 flex flex-col gap-1"
            initial="hidden"
            whileInView="visible"
            variants={cardVariant}
          >
            <h3 className="font-bold">Access a call for papers</h3>
            <p className="text-[16px]">
              Explore the updated lists of call for papers, use the filter to
              search for papers in your field.
            </p>
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-start">
              <h4 className="sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] rounded-full absolute top-auto left-[-15px] bg-black text-white flex justify-center items-center">
                2
              </h4>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="relative border shadow-lg rounded-lg p-8 flex flex-col gap-1"
            initial="hidden"
            whileInView="visible"
            variants={cardVariant}
          >
            <h3 className="font-bold">Collaborations</h3>
            <p className="text-[16px]">
              Find and collaborate with like minds to write papers, split
              payments, write quality papers and increase your network.
            </p>
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-start">
              <h4 className="sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] rounded-full absolute top-auto left-[-15px] bg-black text-white flex justify-center items-center">
                3
              </h4>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            className="relative border shadow-lg rounded-lg p-8 flex flex-col gap-1"
            initial="hidden"
            whileInView="visible"
            variants={cardVariant}
          >
            <h3 className="font-bold">Paper visibility</h3>
            <p className="text-[16px]">
              Post contents about your papers on our blog, publish your contents
              for visibility, citations and increase your influence.
            </p>
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-start">
              <h4 className="sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] rounded-full absolute top-auto left-[-15px] bg-black text-white flex justify-center items-center">
                4
              </h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
