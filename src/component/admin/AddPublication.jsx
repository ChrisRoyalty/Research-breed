import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "tailwindcss/tailwind.css";

const AddPublication = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("journal");
  const [body, setBody] = useState("");
  const [publisher, setPublisher] = useState("");
  const [dateOfPublication, setDateOfPublication] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [message, setMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const [wordCount, setWordCount] = useState(0); // Track word count

  const MAX_WORD_COUNT = 750;

  // Function to count words
  const countWords = (content) => {
    const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const words = text.trim().split(/\s+/); // Split by whitespace
    return words.filter((word) => word.length > 0).length; // Only count non-empty words
  };

  // Handle body change with word count restriction
  const handleBodyChange = (content) => {
    const currentWordCount = countWords(content);
    setWordCount(currentWordCount);

    if (currentWordCount > MAX_WORD_COUNT) {
      setMessage("You have exceeded your limit for the day");
      setModalType("error");
      showModal();
    } else {
      setBody(content);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      setMessage("You are not authenticated. Please log in again.");
      setModalType("error");
      showModal();
      return;
    }

    try {
      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/admin/publication",
        {
          title,
          category,
          body,
          publisher,
          date_of_publication: dateOfPublication,
          external_link: externalLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage("Publication published successfully!");
        setModalType("success");
        // Reset the form fields
        setTitle("");
        setCategory("journal");
        setBody("");
        setPublisher("");
        setDateOfPublication("");
        setExternalLink("");
      } else {
        setMessage("Failed to publish the publication. Please try again.");
        setModalType("error");
      }
      showModal();
    } catch (error) {
      setMessage("Failed to publish the publication. Please try again.");
      setModalType("error");
      console.error(error);
      showModal();
    }
  };

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000); // Hide the modal after 3 seconds
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-10 lg:p-16 bg-gray-50 min-h-screen">
      <style>
        {`
          .ql-toolbar {
            position: sticky;
            top: 0;
            z-index: 10;
            background: white;
            border-bottom: 1px solid #e5e5e5;
          }
          .ql-toolbar .ql-formats button:hover .ql-stroke,
          .ql-toolbar .ql-formats button:hover .ql-fill,
          .ql-toolbar .ql-picker-label:hover,
          .ql-toolbar .ql-picker-item:hover,
          .ql-toolbar .ql-picker-options .ql-picker-item.ql-active,
          .ql-toolbar .ql-picker-label.ql-active {
            color: #8F3FA9 !important;
            stroke: #8F3FA9 !important;
            fill: #8F3FA9 !important;
          }
        `}
      </style>

      {/* Modal for displaying messages */}
      {isModalVisible && (
        <>
          <div className="blur-background" />
          <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50`}
          >
            <div
              className={`bg-white p-4 rounded-md shadow-md max-w-sm w-full ${
                modalType === "success"
                  ? "border-l-4 border-[#8F3FA9]"
                  : "border-l-4 border-red-500"
              }`}
            >
              <p
                className={`text-center ${
                  modalType === "success" ? "text-[#8F3FA9]" : "text-red-500"
                }`}
              >
                {message}
              </p>
            </div>
          </div>
        </>
      )}

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Call for Papers
        </h2>

        <form onSubmit={handlePublish} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-md focus:border-[#8F3FA9] focus:ring-2 focus:ring-[#8F3FA9]"
              placeholder="Enter publication title"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-md focus:border-[#8F3FA9] focus:ring-2 focus:ring-[#8F3FA9]"
            >
              <option value="journal">Journal</option>
              <option value="research-project">Research Project</option>
              <option value="conference-paper">International Conference</option>
            </select>
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Publisher
            </label>
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="w-full p-3 border rounded-md focus:border-[#8F3FA9] focus:ring-2 focus:ring-[#8F3FA9]"
              placeholder="Enter publisher's name"
              required
            />
          </div>

          {/* Date of Publication */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date of Publication
            </label>
            <input
              type="date"
              value={dateOfPublication}
              onChange={(e) => setDateOfPublication(e.target.value)}
              className="w-full p-3 border rounded-md focus:border-[#8F3FA9] focus:ring-2 focus:ring-[#8F3FA9]"
              required
            />
          </div>

          {/* External Link */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              External Link
            </label>
            <input
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full p-3 border rounded-md focus:border-[#8F3FA9] focus:ring-2 focus:ring-[#8F3FA9]"
              placeholder="Enter external link (optional)"
            />
          </div>

          {/* WYSIWYG Editor */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Body</label>
            <ReactQuill
              value={body}
              onChange={handleBodyChange} // Handle change with word count restriction
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "link",
                "image",
              ]}
              className="min-h-[200px] max-h-[500px] w-full overflow-auto resize-none border rounded-md focus:ring-2 focus:ring-[#8F3FA9]"
              placeholder="Write your publication here..."
            />
            {/* Display word count */}
            <p className="text-right text-gray-500 mt-1">
              {wordCount} / {MAX_WORD_COUNT} words
            </p>
          </div>

          {/* Publish Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-[#8F3FA9] text-white rounded-md shadow-md hover:bg-[#7A3298] transition"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPublication;
