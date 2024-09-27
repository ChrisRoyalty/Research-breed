import React, { useState } from "react";

const Message = ({ type, text }) => {
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  const messageStyles = {
    success: "bg-[#8F3FA9]/20 border-[#8F3FA9] text-[#8F3FA9]",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  const handleClose = () => {
    setIsVisible(false); // Set visibility to false when close icon is clicked
  };

  if (!isVisible) return null; // Don't render if not visible

  return (
    <div
      className={`flex items-center justify-between p-4 my-4 border-l-4 rounded-lg ${messageStyles[type]}`}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {type === "success" ? (
            <path
              fillRule="evenodd"
              d="M10 1a9 9 0 100 18 9 9 0 000-18zm3.707 7.293a1 1 0 00-1.414 0L10 10.586 8.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M10 1a9 9 0 100 18 9 9 0 000-18zm1 13a1 1 0 01-2 0V8a1 1 0 012 0v6zm-1-10a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
          )}
        </svg>
        <span className="font-medium">{text}</span>
      </div>
      <button
        type="button"
        className="ml-4 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-opacity-50"
        onClick={handleClose} // Call handleClose when the button is clicked
      >
        &times;
      </button>
    </div>
  );
};

export default Message;
