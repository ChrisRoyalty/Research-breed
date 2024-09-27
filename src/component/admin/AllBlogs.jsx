import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";
import "../../css/modalAnimation.css"; // Ensure this file contains the right CSS for animations
import { TailSpin } from "react-loader-spinner";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Set modal root element
Modal.setAppElement("#root");

const FetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); // To hold the blog being viewed
  const [updating, setUpdating] = useState(false); // To handle update loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/admin/blogs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setBlogs(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Helper function to truncate content to 2-3 lines (plain text)
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleApproveDisapprove = async (post_slug, action) => {
    const url =
      "http://localhost/apps_api/research-breed/public/api/admin/update-blog"; // Use the correct endpoint

    const token = sessionStorage.getItem("authToken"); // Ensure token is available

    // Create the data payload with 'post_slug'
    const data = new URLSearchParams();
    data.append("post_slug", post_slug);
    data.append("action", action); // If the action is needed

    try {
      setUpdating(true); // Set loading state to true
      const response = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Include your authentication token
          "Content-Type": "application/x-www-form-urlencoded", // Use the correct content type
        },
      });

      if (response.data.success) {
        console.log("Operation successful", response.data);
        // Update local state if necessary
      } else {
        console.log("Operation failed", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error during API call",
        error.response ? error.response.data : error.message
      );
    } finally {
      setUpdating(false); // Reset updating state
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin type="TailSpin" color="#8F3FA9" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4 p-4 max-w-full overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-[#8F3FA9] text-white">
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Likes</th>
            <th className="px-4 py-2 border">Dislikes</th>
            <th className="px-4 py-2 border">Favorites</th>
            <th className="px-4 py-2 border">Posted By</th>
            <th className="px-4 py-2 border">Post</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.slug} className="border-b">
              <td className="px-4 py-2 border">{blog.title}</td>
              <td className="px-4 py-2 border">{blog.no_of_likes}</td>
              <td className="px-4 py-2 border">{blog.no_of_dislikes}</td>
              <td className="px-4 py-2 border">{blog.no_of_favourites}</td>
              <td className="px-4 py-2 border">
                {blog.user.firstname} {blog.user.lastname}
              </td>
              <td className="px-4 py-2 border">
                {/* Display truncated content */}
                <p>{truncateText(blog.post.replace(/<[^>]+>/g, ""), 100)}</p>
                <button
                  className="text-[#8F3FA9] font-semibold mt-2 hover:underline"
                  onClick={() => openModal(blog)}
                >
                  View Post
                </button>
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() =>
                    handleApproveDisapprove(blog.post_slug, "approve")
                  }
                  disabled={updating}
                  className={`bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-700 ${
                    updating ? "opacity-50" : ""
                  }`}
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleApproveDisapprove(blog.post_slug, "disapprove")
                  }
                  disabled={updating}
                  className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 ${
                    updating ? "opacity-50" : ""
                  }`}
                >
                  Disapprove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing full blog post */}
      <CSSTransition
        in={isModalOpen}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="View Blog Post"
          className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-0 rounded-lg shadow-lg"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-60 z-40"
        >
          <div className="modal-body w-[80vw] h-[80vh] overflow-y-auto p-6">
            {selectedBlog && (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedBlog.title}
                </h2>
                <div
                  className="mt-2 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.post }}
                />
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Posted by: {selectedBlog.user.firstname}{" "}
                    {selectedBlog.user.lastname}
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-[#8F3FA9] text-white rounded-md hover:bg-[#712a8a]"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default FetchBlogs;
