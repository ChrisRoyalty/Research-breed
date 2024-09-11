import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = sessionStorage.getItem("authToken"); // Retrieve token from sessionStorage

    if (!token) {
      setError("You are not authenticated. Please log in.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("post", post);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/create-post", // Use your correct API URL here
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Attach the token to the request header
          },
        }
      );

      if (response.data.success) {
        setMessage("Blog created successfully!");
        setError("");
        // Optionally, reset form fields or redirect the user to another page
      } else {
        setError("Failed to create blog.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-[800px] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
        {message && <p className="text-green-600">{message}</p>}
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
              Post
            </label>
            <ReactQuill
              value={post}
              onChange={setPost}
              modules={CreateBlog.modules}
              formats={CreateBlog.formats}
              className="h-[200px]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Creating Blog..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Configure Quill modules and formats
CreateBlog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
  ],
};

CreateBlog.formats = [
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

export default CreateBlog;
