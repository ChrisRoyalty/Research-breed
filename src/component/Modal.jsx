import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const Modal = ({ message, onClose, onSuccess }) => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    onSuccess();
    navigate("/blog"); // Navigate to blog page
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Notification</h2>
        <p className="mb-4">{message}</p>
        <div className="flex gap-4">
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
    </div>,
    document.body
  );
};

export default Modal;
