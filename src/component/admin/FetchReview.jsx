import React, { useEffect, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const FetchReview = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [networkLogs, setNetworkLogs] = useState([]); // State to store network messages
  const [responseModal, setResponseModal] = useState({
    visible: false,
    message: "",
  }); // Temporary response modal

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/all-reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data.data);
        logMessage("Fetched reviews successfully."); // Log success message
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        logMessage("Failed to fetch reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Function to log network messages
  const logMessage = (message) => {
    setNetworkLogs((prevLogs) => [...prevLogs, message]);
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setModalVisible(true);
    setNetworkLogs([]); // Clear logs when opening a new review
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReview(null);
  };

  const showResponseModal = (message) => {
    setResponseModal({ visible: true, message });
    setTimeout(() => setResponseModal({ visible: false, message: "" }), 3000); // Auto-close after 3 seconds
  };

  const updateReviewStatus = async (reviewId, status) => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/api/admin/update-review`,
        new URLSearchParams({ id: reviewId, status }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? { ...review, status } : review
          )
        );
        const message = response.data.message || "Review updated successfully!";
        logMessage(message);
        showResponseModal(message); // Show success message
        closeModal();
      }
    } catch (error) {
      console.error("Failed to update review status:", error);
      const message = "Failed to update review status. Please try again.";
      logMessage(message);
      showResponseModal(message); // Show error message
    }
  };

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
        User Reviews
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <TailSpin color="#8F3FA9" height={50} width={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              onClick={() => handleReviewClick(review)}
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-700 truncate">
                {review.user_data.firstname} {review.user_data.lastname}
              </h3>
              <p className="text-sm text-gray-500">
                {review.review.slice(0, 60)}...
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-yellow-500 font-bold">
                  {review.rate} / 5
                </span>
                <button className="text-sm text-indigo-600 hover:underline">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalVisible && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-filter backdrop-blur-md">
          <div
            className="absolute inset-0 bg-black opacity-25"
            onClick={closeModal}
          />
          <div className="relative z-50 bg-white p-8 rounded-3xl shadow-lg w-full max-w-3xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-6">
              {selectedReview.user_data.profile_image ? (
                <img
                  src={selectedReview.user_data.profile_image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-gray-600 font-semibold">
                  No Image
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedReview.user_data.firstname}{" "}
                {selectedReview.user_data.lastname}
              </h3>
              <p className="text-gray-500 italic">
                {selectedReview.user_data.occupation || "Occupation not listed"}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Review:</strong> {selectedReview.review}
              </p>
              <p className="text-gray-600">
                <strong>Rating:</strong> {selectedReview.rate}/5
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(selectedReview.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              {selectedReview.status ? (
                <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow flex items-center gap-2 cursor-default">
                  <FaCheckCircle /> Approved
                </button>
              ) : (
                <button
                  onClick={() => updateReviewStatus(selectedReview.id, true)}
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-300 flex items-center gap-2"
                >
                  <FaCheckCircle /> Approve
                </button>
              )}

              {selectedReview.status === false ? (
                <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow flex items-center gap-2 cursor-default">
                  <FaTimesCircle /> Disapproved
                </button>
              ) : (
                <button
                  onClick={() => updateReviewStatus(selectedReview.id, false)}
                  className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-300 flex items-center gap-2"
                >
                  <FaTimesCircle /> Disapprove
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {responseModal.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-filter backdrop-blur-md">
          <div className="bg-white p-4 rounded-lg shadow-md text-center w-72">
            <p className="text-gray-700 font-semibold mb-2">Response</p>
            <p className="text-gray-600">{responseModal.message}</p>
            <button
              onClick={() => setResponseModal({ visible: false, message: "" })}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchReview;
