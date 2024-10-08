import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Spinner from ".././component/Spinner";
// Modal Component for Network Response Messages
const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-md">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState(""); // For displaying the modal

  // States to manage loading spinners for like, dislike, and favorite actions
  const [likeLoading, setLikeLoading] = useState(null);
  const [dislikeLoading, setDislikeLoading] = useState(null);
  const [favoriteLoading, setFavoriteLoading] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }
      console.log(blogs);

      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/blog-posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.data)) {
          setBlogs(response.data.data);
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else {
          setError("Error fetching blogs");
        }
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = async (post_slug) => {
    setLikeLoading(post_slug); // Trigger loading spinner for this post
    const token = sessionStorage.getItem("authToken");
    console.log("Payload:", { "Post slug": post_slug });
    try {
      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/like-post",
        { post_slug: post_slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Like successful:", response.data);
    } catch (err) {
      if (err.response) {
        console.error("Error response data:", err.response.data); // Detailed error response from server
        console.error("Error status:", err.response.status); // Status code (should be 422)
        console.error("Error headers:", err.response.headers); // Headers from the response
      } else {
        console.error("Error message:", err.message);
      }
    }
  };

  const handleDislike = async (post_slug) => {
    setDislikeLoading(post_slug); // Trigger loading spinner for this post
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/dislike-post",
        { post_slug: post_slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Dislike successful:", response.data);
      setModalMessage("Post disliked successfully!");

      // Update the blog state to reflect the dislike and remove the like if any
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.post_slug === post_slug
            ? {
                ...blog,
                is_liked: false,
                is_disliked: true,
                dislikes_count: blog.dislikes_count + 1,
                likes_count: blog.is_liked
                  ? blog.likes_count - 1
                  : blog.likes_count,
              }
            : blog
        )
      );
    } catch (err) {
      setModalMessage("Error disliking post: " + err.response.data.message);
    } finally {
      setDislikeLoading(null); // Stop the spinner
    }
  };

  const handleFavorite = async (post_slug) => {
    setFavoriteLoading(post_slug); // Trigger loading spinner for this post
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/favourite-post",
        { post_slug: post_slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Favorite successful:", response.data);
      setModalMessage("Post favorited successfully!");

      // Toggle the favorite state
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.post_slug === post_slug
            ? { ...blog, is_favorited: !blog.is_favorited }
            : blog
        )
      );
    } catch (err) {
      setModalMessage("Error favoriting post: " + err.response.data.message);
    } finally {
      setFavoriteLoading(null); // Stop the spinner
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

            {/* Like, Dislike, and Favorite Buttons */}
            <div className="flex justify-between mt-4">
              <button onClick={() => handleLike(blog.slug)}>
                {likeLoading === blog.slug ? (
                  <Spinner />
                ) : (
                  <FaThumbsUp
                    className={`text-blue-500 ${
                      blog.is_liked ? "text-green-500" : ""
                    }`}
                  />
                )}
                <span>{blog.likes_count}</span>
              </button>

              <button onClick={() => handleDislike(blog.slug)}>
                {dislikeLoading === blog.slug ? (
                  <Spinner />
                ) : (
                  <FaThumbsDown
                    className={`text-red-500 ${
                      blog.is_disliked ? "text-red-700" : ""
                    }`}
                  />
                )}
                <span>{blog.dislikes_count}</span>
              </button>

              <button onClick={() => handleFavorite(blog.slug)}>
                {favoriteLoading === blog.slug ? (
                  <Spinner />
                ) : (
                  <FaHeart
                    className={`text-pink-500 ${
                      blog.is_favorited ? "text-yellow-500" : ""
                    }`}
                  />
                )}
                <span>{blog.is_favorited ? "Favorited" : "Favorite"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for showing API response */}
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage("")} />
      )}
    </div>
  );
};

export default Blog;
