import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Importing a spinner for loading state

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get token from local storage
        if (!token) {
          window.location.href = "/login"; // Redirect to login if no token
          return;
        }

        setIsLoading(true); // Start loading state

        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileData(response.data.data); // Store profile data in state
        sessionStorage.setItem(
          "profileData",
          JSON.stringify(response.data.data)
        ); // Optionally store profile data in session storage
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch profile data.");
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Loading and error handling
  if (error) {
    return <p className="text-red-600 text-center mt-6">{error}</p>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <ClipLoader size={50} color="#8F3FA9" />
      </div>
    );
  }

  if (!profileData) {
    return <p className="text-center mt-6">Loading profile data...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear local storage
    sessionStorage.clear(); // Clear session storage
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <div className="flex justify-center items-center h-auto py-[15vh] bg-gray-100">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Name</h2>
          <p>
            {profileData.firstname} {profileData.lastname}
          </p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Email</h2>
          <p>{profileData.email}</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Gender</h2>
          <p>{profileData.gender || "Not provided"}</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">WhatsApp No.</h2>
          <p>{profileData.phone || "Not provided"}</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Occupation</h2>
          <p>{profileData.occupation || "Not provided"}</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Interest</h2>
          <p>{profileData.interest || "Not provided"}</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Number of Publications</h2>
          <p>{profileData.number_of_publications || "Not provided"}</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Field of Study</h2>
          <p>{profileData.field_of_study || "Not provided"}</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Degree</h2>
          <p>{profileData.degree || "Not provided"}</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">LinkedIn</h2>
          <p>
            {profileData.linkedin_url ? (
              <a
                href={profileData.linkedin_url}
                className="text-[#8F3FA9]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.linkedin_url}
              </a>
            ) : (
              "Not provided"
            )}
          </p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Facebook</h2>
          <p>
            {profileData.facebook_url ? (
              <a
                href={profileData.facebook_url}
                className="text-[#8F3FA9]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.facebook_url}
              </a>
            ) : (
              "Not provided"
            )}
          </p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Twitter</h2>
          <p>
            {profileData.twitter_url ? (
              <a
                href={profileData.twitter_url}
                className="text-[#8F3FA9]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.twitter_url}
              </a>
            ) : (
              "Not provided"
            )}
          </p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Open to Collaborate?</h2>
          <p>{profileData.open_to_collaborate ? "Yes" : "No"}</p>
        </div>

        <div className="text-center mt-6">
          <a
            href="/edit-profile"
            className="bg-[#8F3FA9] hover:bg-[#8F3FA9]/90 text-white py-2 px-4 rounded"
          >
            Edit Profile
          </a>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
