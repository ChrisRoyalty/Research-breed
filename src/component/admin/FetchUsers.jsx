import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve the token from session storage
        const token = sessionStorage.getItem("authToken"); // Change 'authToken' to your actual token key
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">
            {user.firstname} {user.lastname}
          </h2>
          <p>Email: {user.email}</p>
          <p>Occupation: {user.occupation}</p>
          <p>
            Profile:{" "}
            <a
              href={user.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {user.profile_url}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default FetchUsers;
