import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios"; // Import axios for making API calls
import "tailwindcss/tailwind.css";

const AddPublication = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Journal");
  const [body, setBody] = useState("");
  const [publisher, setPublisher] = useState("");
  const [dateOfPublication, setDateOfPublication] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePublish = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/admin/publications",
        {
          title,
          category,
          body,
          publisher,
          date_of_publication: dateOfPublication,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Adjust if using a different method for token storage
          },
        }
      );

      if (response.data.success) {
        setSuccess("Publication published successfully!");
        // Reset the form fields
        setTitle("");
        setCategory("Journal");
        setBody("");
        setPublisher("");
        setDateOfPublication("");
      }
    } catch (error) {
      setError("Failed to publish the publication. Please try again.");
      console.error(error);
    }
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

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add New Publication
        </h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

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
              <option value="Journal">Journal</option>
              <option value="Research-project">Research Project</option>
              <option value="Conference-paper">Conference Paper</option>
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

          {/* WYSIWYG Editor */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Body</label>
            <ReactQuill
              value={body}
              onChange={setBody}
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
              className="min-h-[200px] max-h-[500px] h-[40vh] w-full overflow-auto resize-none border rounded-md focus:ring-2 focus:ring-[#8F3FA9]"
              placeholder="Write your publication here..."
              style={{ maxWidth: "100%", boxSizing: "border-box" }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#8F3FA9] text-white font-semibold rounded-md hover:bg-[#7A2D96] transition duration-300 focus:ring-2 focus:ring-[#8F3FA9] hover:scale-105"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPublication;
