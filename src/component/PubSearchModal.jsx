// Modal.js
import React from "react";

const PubSearchModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold">{message}</h2>
        <button
          onClick={onClose}
          className="mt-4 bg-[#8F3FA9] text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PubSearchModal;
