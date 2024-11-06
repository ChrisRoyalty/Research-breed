import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa"; // Default user icon

const Reviews = () => {
  // const [isMobile, setIsMobile] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(4); // Default rating
  const [showModal, setShowModal] = useState(false);
  const [networkMessage, setNetworkMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]); // Holds reviews fetched from API

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     setIsMobile(window.innerWidth <= 640);
  //   };

  //   checkScreenSize();
  //   window.addEventListener("resize", checkScreenSize);
  //   return () => window.removeEventListener("resize", checkScreenSize);
  // }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const authToken = localStorage.getItem("authToken"); // Retrieve token from localStorage
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/reviews`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setReviews(data.data.reviews); // Store reviews in state
        } else {
          setNetworkMessage(data.message || "Failed to fetch reviews.");
        }
      } catch (error) {
        setNetworkMessage(
          "An error occurred while fetching reviews: " + error.message
        );
      }
    };

    fetchReviews();
  }, []);

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
  //   );
  // };

  const handleSubmitReview = async () => {
    // Check if the user is logged in by verifying the token in localStorage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // If the token doesn't exist, show an error message and don't submit the review
      setNetworkMessage("You must be logged in to submit a review.");
      setShowModal(true);
      return; // Stop the function execution
    }

    // Check if the rating is still the default value (e.g., 4) and prompt the user to select a rating
    if (rating === 4) {
      // Assuming 4 is the default value
      setNetworkMessage("Please select a rating to submit your review.");
      setShowModal(true);
      return; // Stop the function execution until a rating is selected
    }

    setIsSubmitting(true);
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/make-review`;
    const formData = new FormData();
    formData.append("rate", rating);
    formData.append("review", reviewText);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`, // Pass the token in the Authorization header
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setNetworkMessage(data.message); // Display success message from API
        // Reset form fields after successful submission
        setReviewText(""); // Clear the review text
        setRating(4); // Reset the rating to default (can be any value you want)
      } else {
        setNetworkMessage(
          data.message || "Failed to submit the review. Please try again."
        );
      }
    } catch (error) {
      setNetworkMessage(
        "An error occurred while submitting the review: " + error.message
      ); // Display error message
    } finally {
      setIsSubmitting(false);
      setShowModal(true); // Show the modal with the message
    }
  };

  const renderRatingStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const emptyStars = totalStars - filledStars;

    return (
      <div className="review-rating flex gap-1">
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={`filled-${index}`} className="text-yellow-400" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-gray-400" />
        ))}
      </div>
    );
  };

  const handleRatingClick = (index) => {
    setRating(index + 1); // Set the rating value when a star is clicked
  };

  return (
    <div className="bg-gradient-to-r from-[#30093D] to-[#30091A] py-8 flex justify-center items-center">
      <div className="sm:w-[80%] w-[90%]">
        {/* Reviews Header */}
        <div className="flex justify-between items-center text-white my-12">
          <div className="reviews">
            <h4 className="text-[20px]">Reviews</h4>
            <div className="flex items-center gap-2 text-white max-sm:flex-col max-sm:items-start">
              <div className="flex items-center gap-2">
                <span>{rating}</span>
                <div className="stars flex">{renderRatingStars(rating)}</div>
              </div>
              <span>Over {reviews.length} reviews</span>{" "}
              {/* Display total number of reviews */}
            </div>
          </div>
          <div className="write-reviews bg-white py-3 md:pl-4 max-sm:px-2 rounded-lg text-black flex items-center gap-4 max-sm:w-[150px] w-[50%]">
            <RiPencilFill className="text-[25px]  max-sm:hidden" />
            <input
              type="text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write a review"
              className="outline-none w-[90%] max-sm:hidden"
            />
            <button
              onClick={handleSubmitReview}
              disabled={isSubmitting || !reviewText || !rating}
              className="bg-[#8F3FA9] text-white px-4 py-2 rounded-lg mx-2"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Rating Selection Section inside Review Form */}
        <div className="rating-form mb-6">
          <p className="text-white mb-2">Please rate your experience:</p>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <div
                key={starIndex}
                onClick={() => handleRatingClick(starIndex - 1)}
                className={`cursor-pointer ${
                  starIndex <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                <FaStar size={30} />
              </div>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Provide a detailed review"
            className="w-full p-2 rounded-lg border border-gray-300"
            rows="4"
          />
        </div>

        {/* Reviews Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-card bg-white p-4 rounded-lg shadow-md mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-300">
                  {review.user_data.profile_image ? (
                    <img
                      src={review.user_data.profile_image}
                      alt={`${review.user_data.firstname} ${review.user_data.lastname}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-white text-3xl" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-black">
                    {review.user_data.firstname} {review.user_data.lastname}
                  </p>
                  <p className="text-sm text-gray-500">
                    {review.user_data.occupation}
                  </p>
                </div>
              </div>
              <div className="review-rating">
                {renderRatingStars(review.rate)}
              </div>
              <p className="text-gray-700 mt-4">{review.review}</p>
            </div>
          ))}
        </div>

        {/* Modal for Network Errors */}
        {showModal && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-content bg-white p-6 rounded-lg text-black">
              <p>{networkMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#8F3FA9] text-white px-4 py-2 rounded mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
