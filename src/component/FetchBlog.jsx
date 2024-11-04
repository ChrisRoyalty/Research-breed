import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from ".././component/Spinner";

const FetchBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }
      console.log(blogs);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/posts`,
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

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pt-[20vh] min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">My Blog Posts</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>

            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.post }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchBlog;
