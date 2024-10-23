import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const Modal = ({
  message,
  onClose,
  onSuccess,
  showSubscribeButton,
  onSubscribe,
}) => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    onSuccess();
    navigate("/blog"); // Navigate to blog page
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Notification</h2>
        <p className="mb-4">{message}</p>

        <div className="flex flex-col gap-4">
          {/* Conditionally render the Subscribe button */}
          {showSubscribeButton && (
            <button
              onClick={onSubscribe}
              className="bg-green-500 text-white p-2 rounded-lg"
            >
              Subscribe to Remove Limit
            </button>
          )}

          <div className="flex justify-between">
            <button
              onClick={handleSuccess}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Go to Blog
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded-lg"
            >
              Continue Creating
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
