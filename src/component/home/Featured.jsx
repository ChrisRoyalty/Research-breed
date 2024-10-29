import { callsData } from "../../constants";
import React from "react";
import { motion } from "framer-motion";

const Featured = () => {
  // Animation variant for each call item
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-white py-12 w-full h-fit flex justify-center items-center">
      <div className="container w-[90%] sm:w-[80%] my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Featured calls for papers
        </h2>
        <figure className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {callsData.map((call, index) => (
            <motion.div
              key={index}
              className=""
              initial="hidden"
              animate="visible"
              variants={cardVariant}
              whileHover={{ scale: 1.05 }} // Optional: Add a hover effect
            >
              <div className="">
                <img
                  src={call.img}
                  alt={call.title}
                  className="w-full h-[357px] rounded-lg"
                />
                <figcaption className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {call.title}
                  </h3>
                  <p className="text-gray-600">{call.description}</p>
                </figcaption>
              </div>
            </motion.div>
          ))}
        </figure>
      </div>
    </section>
  );
};

export default Featured;
