import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data); // Check the structure of the response

        if (response.data && Array.isArray(response.data.data)) {
          setBlogs(response.data.data); // Correctly set blogs from the response
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

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pt-[15vh] min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700">{blog.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
