import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Retrieve the token from session storage
        const token = sessionStorage.getItem("authToken"); // Change 'authToken' to your actual token key
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/admin/blogs",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog.slug} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: blog.post }}
          />
          <div className="mt-4 flex justify-between">
            <div>
              <span className="text-gray-500">{blog.no_of_likes} Likes</span>
              <span className="text-gray-500 ml-4">
                {blog.no_of_dislikes} Dislikes
              </span>
              <span className="text-gray-500 ml-4">
                {blog.no_of_favourites} Favorites
              </span>
            </div>
            <div>
              <span className="text-gray-500">
                Posted by: {blog.user.firstname} {blog.user.lastname}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchBlogs;
