import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useNavigate } from "react-router-dom";

const AdminBlogCreate = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSubscribeButton, setShowSubscribeButton] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = sessionStorage.getItem("authToken");

    if (!token) {
      setError("You are not authenticated. Please log in.");
      setIsLoading(false);
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("post", post);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/create-post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response:", response.data); // Debugging the response

      if (response.data.success) {
        setMessage("Blog created successfully!");
        setError("");
        setShowModal(true);
        setShowSubscribeButton(false); // Reset subscribe button visibility
      } else {
        setError(response.data.message);
        setMessage("");
        setShowModal(true);

        // Handle the case when the user hits the daily blog limit
        if (
          response.data.message ===
          "You can only create a blog once in a day. Subscribe to remove limit"
        ) {
          setShowSubscribeButton(true); // Show the Subscribe button
        }
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
      setMessage("");
      setShowModal(true);
    }

    setIsLoading(false);
  };

  const handlePostChange = (value) => {
    const wordArray = value.trim().split(/\s+/); // Split post into words
    const currentWordCount = wordArray.length;

    if (currentWordCount <= 750) {
      setPost(value);
      setWordCount(currentWordCount);
    }
  };

  const Modal = ({
    message,
    error,
    onClose,
    onSubscribe,
    showSubscribeButton,
  }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-fit ">
          <h2 className="text-xl font-bold mb-4">Notification</h2>
          {message && <p className="text-[#8F3FA9] mb-4">{message}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="flex gap-4">
            {showSubscribeButton && (
              <button
                onClick={onSubscribe}
                className="bg-[#8F3FA9] text-white p-2 rounded-lg"
              >
                Subscribe to Remove Limit
              </button>
            )}
            <button
              onClick={() => navigate("/blog")} // Navigate to blog page
              className="bg-[#8F3FA9] text-white p-2 rounded-lg"
            >
              Go to Blog
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-[15vh]">
      <div className="w-full max-w-[800px] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
        {message && <p className="text-[#8F3FA9]">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="post" className="block text-gray-700">
              Post (Word count: {wordCount}/750)
            </label>
            <ReactQuill
              value={post}
              onChange={handlePostChange}
              modules={AdminBlogCreate.modules}
              formats={AdminBlogCreate.formats}
              className="h-fit"
            />
            {wordCount > 750 && (
              <p className="text-red-600 mt-2">Word limit exceeded!</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#8F3FA9] text-white p-3 rounded-lg my-8"
            disabled={isLoading || wordCount > 750}
          >
            {isLoading ? "Creating Blog..." : "Create Blog"}
          </button>
        </form>
      </div>

      {showModal && (
        <Modal
          message={message}
          error={error}
          onClose={() => setShowModal(false)}
          onSubscribe={() => navigate("/subscribe")}
          showSubscribeButton={showSubscribeButton}
        />
      )}
    </div>
  );
};

// ReactQuill toolbar configuration
AdminBlogCreate.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
  ],
};

AdminBlogCreate.formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "align",
  "link",
  "image",
];

export default AdminBlogCreate;
