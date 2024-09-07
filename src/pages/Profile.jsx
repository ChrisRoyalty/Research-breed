import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null); // To store profile information
  const [error, setError] = useState(""); // For error handling

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          window.location.href = "/login"; // Redirect to login if no token
          return;
        }

        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileData(response.data.data); // Set profile data to state
      } catch (error) {
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfileData();
  }, []);

  // Check if profileData is null, display a loading state or error message
  if (error) {
    return <p className="text-red-600 text-center mt-6">{error}</p>;
  }

  if (!profileData) {
    return <p className="text-center mt-6">Loading profile data...</p>;
  }

  return (
    <div className="flex justify-center items-center h-auto py-[15vh] bg-gray-100">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Name</h2>
          <p>
            {profileData.firstname} {profileData.lastname}
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Email</h2>
          <p>{profileData.email}</p>
        </div>
        {/* 
          <div className="mb-4">
            <h2 className="text-lg font-bold">Location</h2>
            <p>{profileData.location || "Not provided"}</p>
          </div> */}

        <div className="mb-4">
          <h2 className="text-lg font-bold">Gender</h2>
          <p>{profileData.gender}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Phone</h2>
          <p>{profileData.phone || "Not provided"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Occupation</h2>
          <p>{profileData.occupation || "Not provided"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Interest</h2>
          <p>{profileData.interest || "Not provided"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Number of Publications</h2>
          <p>{profileData.number_of_publications || "Not provided"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Institution</h2>
          <p>{profileData.institution || "Not provided"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Field of Study</h2>
          <p>{profileData.field_of_study || "Not provided"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Degree</h2>
          <p>{profileData.degree || "Not provided"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">LinkedIn</h2>
          <p>
            {profileData.linkedin_url ? (
              <a
                href={profileData.linkedin_url}
                className="text-blue-600"
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

        <div className="mb-4">
          <h2 className="text-lg font-bold">Facebook</h2>
          <p>
            {profileData.facebook_url ? (
              <a
                href={profileData.facebook_url}
                className="text-blue-600"
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

        <div className="mb-4">
          <h2 className="text-lg font-bold">Twitter</h2>
          <p>
            {profileData.twitter_url ? (
              <a
                href={profileData.twitter_url}
                className="text-blue-600"
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

        <div className="mb-4">
          <h2 className="text-lg font-bold">Open to Collaborate?</h2>
          <p>{profileData.open_to_collaborate ? "Yes" : "No"}</p>
        </div>

        <div className="text-center mt-6">
          <a
            href="/edit-profile"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
