import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // Loader state for update button

  // Fetch the profile data from the API
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      setIsLoading(true);

      const response = await axios.get(
        "https://dev-api.researchbreed.com/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfileData(response.data.data);
      sessionStorage.setItem("profileData", JSON.stringify(response.data.data));
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch profile data.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Update the profile picture
  const updateProfilePicture = async () => {
    if (!imageFile) {
      setModalMessage("No file selected.");
      setShowModal(true);
      return;
    }

    try {
      setIsUpdating(true); // Show loader on button
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newImageUrl = response.data.data.profile_image;
      setProfileData((prevData) => ({
        ...prevData,
        profile_image: newImageUrl,
      }));

      setModalMessage("Profile Picture updated successfully.");
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setModalMessage("Failed to update profile picture.");
      setShowModal(true);
    } finally {
      setIsUpdating(false); // Hide loader after update
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  // Handle error state
  if (error) {
    return <p className="text-red-600 text-center mt-6">{error}</p>;
  }

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <ClipLoader size={50} color="#8F3FA9" />
      </div>
    );
  }

  // Handle case when profile data is not yet available
  if (!profileData) {
    return <p className="text-center mt-6">Loading profile data...</p>;
  }

  return (
    <div className="flex justify-center items-center h-auto py-[15vh] bg-gray-100">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={profileData.profile_image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          onClick={updateProfilePicture}
          className="bg-[#8F3FA9] hover:bg-[#8F3FA9]/90 text-white py-2 px-4 rounded flex items-center justify-center"
          disabled={isUpdating} // Disable button during update
        >
          {isUpdating ? (
            <ClipLoader size={20} color="#FFFFFF" />
          ) : (
            "Update Profile Picture"
          )}
        </button>

        {/* Profile Fields */}
        {[
          {
            label: "Name",
            value: `${profileData.firstname} ${profileData.lastname}`,
          },
          { label: "Email", value: profileData.email },
          { label: "Gender", value: profileData.gender || "Not provided" },
          { label: "WhatsApp No.", value: profileData.phone || "Not provided" },
          {
            label: "Occupation",
            value: profileData.occupation || "Not provided",
          },
          { label: "Interest", value: profileData.interest || "Not provided" },
          {
            label: "Number of Publications",
            value: profileData.number_of_publications || "Not provided",
          },
          {
            label: "Field of Study",
            value: profileData.field_of_study || "Not provided",
          },
          {
            label: "Institution",
            value: profileData.institution || "Not provided",
          },
          { label: "Degree", value: profileData.degree || "Not provided" },
          {
            label: "Account Status",
            value: profileData.account_status || "Not provided",
          },
          {
            label: "Date Created",
            value: new Date(profileData.date_created).toLocaleDateString(),
          },
        ].map((field, index) => (
          <div className="mb-4 flex justify-between items-center" key={index}>
            <h2 className="text-lg font-bold">{field.label}</h2>
            <p>{field.value}</p>
          </div>
        ))}

        {/* Profile Links */}
        {[
          { label: "LinkedIn", url: profileData.linked_url },
          { label: "Facebook", url: profileData.facebook_url },
          { label: "Twitter", url: profileData.twitter_url },
        ].map((link, index) => (
          <div className="mb-4 flex justify-between items-center" key={index}>
            <h2 className="text-lg font-bold">{link.label}</h2>
            <p>
              {link.url ? (
                <a
                  href={link.url}
                  className="text-[#8F3FA9]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.url}
                </a>
              ) : (
                "Not provided"
              )}
            </p>
          </div>
        ))}

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Open to Collaborate?</h2>
          <p>{profileData.is_open_to_collaborate}</p>
        </div>

        {/* Action Buttons */}
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

        {/* Modal for messages */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p>{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-[#8F3FA9] hover:bg-[#8F3FA9]/90 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
