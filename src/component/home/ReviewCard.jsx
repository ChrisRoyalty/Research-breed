import React from "react";

const ReviewCard = ({ name, title, image, review }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <img src={image} alt={name} className="h-16 w-16 rounded-full mx-auto" />
      <h3 className="text-lg font-semibold text-center mt-4">{name}</h3>
      <p className="text-gray-600 text-center text-sm">{title}</p>
      <p className="text-gray-800 mt-4">{review}</p>
    </div>
  );
};

export default ReviewCard;
