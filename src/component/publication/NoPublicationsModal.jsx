import React from "react";
import Lottie from "lottie-react";
import emptyAnimation from "../../animations/empty.json"; // Adjust path if needed
import { motion } from "framer-motion";

const NoPublicationsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <Lottie
          animationData={emptyAnimation}
          loop={true}
          className="w-32 mx-auto"
        />
        <h2 className="text-center text-xl font-bold mt-4">
          No Publications Found
        </h2>
        <p className="text-center text-gray-600 mt-2">
          We couldn't find any publications matching your search criteria.
        </p>
        <button
          className="mt-4 bg-[#8F3FA9] text-white px-4 py-2 rounded-lg hover:bg-[#743386] transition"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default NoPublicationsModal;
