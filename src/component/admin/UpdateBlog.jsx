import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const updateBlog = async () => {
      try {
        // Retrieve the token from session storage
        const token = sessionStorage.getItem("authToken"); // Change 'authToken' to your actual token key
        const response = await axios.patch(
          "https://dev-api.researchbreed.com/api/admin/update-blog",
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

    updateBlog();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  return (
    <div>
      <h1>Update Blog</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug} className="mb-4 p-4 border rounded shadow">
            <h2 className="font-bold">{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.post }} />
            <p>Status: {blog.post_status ? "Approved" : "Disapproved"}</p>
            <p>Likes: {blog.no_of_likes}</p>
            <p>Dislikes: {blog.no_of_dislikes}</p>
            <p>Favorites: {blog.no_of_favourites}</p>
            <p>
              Author: {blog.user.firstname} {blog.user.lastname}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateBlog;
