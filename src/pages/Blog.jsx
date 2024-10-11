import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import Spinner from "../component/Spinner";
import Footer from "../component/Footer";

// Modal Component for Login or Sign Up Prompt
const Modal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Authentication Required
      </h2>
      <p className="text-gray-600 mb-4">
        Please log in or create an account to continue.
      </p>
      <div className="flex justify-between gap-4">
        <button
          className="w-full bg-[#8F3FA9] text-white py-2 rounded-lg"
          onClick={() => {
            onClose();
            window.location.href = "/login"; // Redirect to login page
          }}
        >
          Login
        </button>
        <button
          className="w-full bg-gray-200 text-[#8F3FA9] py-2 rounded-lg"
          onClick={() => {
            onClose();
            window.location.href = "/create-account"; // Redirect to Sign-Up page
          }}
        >
          Sign Up
        </button>
      </div>
      <button
        className="mt-4 w-full bg-gray-300 py-2 rounded-lg text-gray-700"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  </div>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState(""); // Only for errors

  // State to track which reaction is loading (like, dislike, or favorite)
  const [activeReaction, setActiveReaction] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/blog-posts"
        );
        if (response.data && Array.isArray(response.data.data)) {
          setBlogs(response.data.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Handle the reaction (like, dislike, or favorite)
  const handleReaction = async (post_slug, actionType) => {
    const token = localStorage.getItem("authToken"); // Change to localStorage

    // Check if user is authenticated
    if (!token) {
      setModalMessage("You must be logged in to perform this action.");
      return;
    }

    setActiveReaction({ slug: post_slug, type: actionType });
    let endpoint = "";

    // Determine which API endpoint to hit
    if (actionType === "like") endpoint = "like-post";
    else if (actionType === "dislike") endpoint = "dislike-post";
    else if (actionType === "favorite") endpoint = "favourite-post";

    try {
      const response = await axios.post(
        `https://dev-api.researchbreed.com/api/${endpoint}`,
        { post_slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`${actionType} successful:`, response.data);

      if (response.data.success) {
        // Update blog state based on the action type
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) => {
            if (blog.slug === post_slug) {
              // Reset other reactions to neutral
              if (actionType === "like") {
                return {
                  ...blog,
                  is_liked: true,
                  is_disliked: false,
                  is_favorited: false,
                  likes_count: blog.likes_count + 1,
                  dislikes_count: blog.is_disliked
                    ? blog.dislikes_count - 1
                    : blog.dislikes_count,
                };
              } else if (actionType === "dislike") {
                return {
                  ...blog,
                  is_liked: false,
                  is_disliked: true,
                  is_favorited: false,
                  dislikes_count: blog.dislikes_count + 1,
                  likes_count: blog.is_liked
                    ? blog.likes_count - 1
                    : blog.likes_count,
                };
              } else if (actionType === "favorite") {
                return {
                  ...blog,
                  is_favorited: !blog.is_favorited,
                  is_liked: false,
                  is_disliked: false,
                };
              }
            }
            return blog;
          })
        );
      }
    } catch (err) {
      // Set modal message only when an error occurs
      setModalMessage(
        `Error performing ${actionType}: ` +
          (err.response?.data?.message || "An error occurred")
      );
    } finally {
      setActiveReaction(null); // Reset active reaction after API call
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pt-[20vh] min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <p>No image available</p>
            )}
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.post }}
            />
            <div className="flex gap-4 items-center mt-4">
              <button
                onClick={() => handleReaction(blog.slug, "like")}
                disabled={activeReaction && activeReaction.slug === blog.slug}
              >
                {activeReaction?.slug === blog.slug &&
                activeReaction?.type === "like" ? (
                  <span>Liking...</span>
                ) : blog.is_liked ? (
                  <span className="flex items-center text-[20px] text-gray-400">
                    <AiFillLike className="text-[#8F3FA9] mr-1 text-[25px]" />
                    Liked
                  </span>
                ) : (
                  <span className="flex items-center text-[20px] text-gray-400">
                    <AiOutlineLike className="text-[#8F3FA9] mr-1 text-[25px]" />
                    Like
                  </span>
                )}
              </button>
              <button
                onClick={() => handleReaction(blog.slug, "dislike")}
                disabled={activeReaction && activeReaction.slug === blog.slug}
              >
                {activeReaction?.slug === blog.slug &&
                activeReaction?.type === "dislike" ? (
                  <span>Disliking...</span>
                ) : blog.is_disliked ? (
                  <span className="flex items-center text-[20px] text-gray-400">
                    <AiFillDislike className="text-[#F02D3C] text-[25px]" />{" "}
                    Disliked
                  </span>
                ) : (
                  <span className="flex items-center text-[20px] text-gray-400">
                    <AiOutlineDislike className="text-red-600 mr-1 text-[25px]" />
                    Dislike
                  </span>
                )}
              </button>
              <button
                onClick={() => handleReaction(blog.slug, "favorite")}
                disabled={activeReaction && activeReaction.slug === blog.slug}
              >
                {activeReaction?.slug === blog.slug &&
                activeReaction?.type === "favorite" ? (
                  <span>Favoriting...</span>
                ) : blog.is_favorited ? (
                  <span className="flex items-center text-[20px] text-gray-400">
                    <AiFillHeart className="text-[#F02D3C] text-[25px]" />
                    Favorited
                  </span>
                ) : (
                  <span className="flex items-center text-[20px] text-gray-400">
                    <AiOutlineHeart className="text-[#F02D3C] mr-1 text-[25px]" />
                    Favorite
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage("")} />
      )}
      <Footer />
    </div>
  );
};

export default Blog;
