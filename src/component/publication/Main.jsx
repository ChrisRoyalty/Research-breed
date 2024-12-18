import React from "react";
import { motion } from "framer-motion";
import { publicationData } from "../../constants";

const Main = () => {
  // Define animation variants
  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-white py-12 w-full h-fit flex justify-center items-center">
      <div className="container w-[90%] sm:w-[80%] my-8">
        <div className="text-center my-8">
          <h4 className="font-bold text-[24px]">Call for Papers</h4>
          <p className="text-[20px]">
            Explore our latest research and call for papers
          </p>
        </div>

        <figure className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {publicationData.map((call, index) => (
            <motion.div
              key={index}
              className=""
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariant}
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

export default Main;
