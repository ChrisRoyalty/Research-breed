import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileImg from "../assets/profileImg.png"; // Placeholder image

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    gender: "",
    phone: "",
    occupation: "",
    interest: "",
    publications: "",
    institution: "",
    fieldOfStudy: "",
    degree: "",
    linkedinUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    openToCollaborate: "", // For "Yes" or "No"
    profileImage: null, // For storing the image file
  });

  const [previewImage, setPreviewImage] = useState(ProfileImg); // Preview of the uploaded image
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        console.log("Auth Token:", token); // Log token for debugging

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if response status is OK
        if (response.status === 200) {
          setFormData(response.data);
          setPreviewImage(response.data.profileImage || ProfileImg);
        } else {
          console.error("Response Error:", response.status);
          setError("Failed to fetch profile data. Status: " + response.status);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error); // Log complete error object
        setError("Failed to fetch profile data: " + error.message);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });

    // Display image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = sessionStorage.getItem("authToken");

      // Create form data object for file upload
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "profileImage") {
          data.append(key, formData[key]);
        }
      });
      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage); // Append image file
      }

      const response = await axios.patch(
        "https://dev-api.researchbreed.com/api/update-profile", // Replace with your update profile API URL
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage("Profile updated successfully!");
      } else {
        setError("Update failed: " + response.data.message);
      }
    } catch (error) {
      setError("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="pt-[12vh] w-full h-fit flex justify-center items-center">
      <div className="sm:w-[80%] w-[90%]">
        <div className="intro text-center my-8 sm:my-16">
          <h1 className="text-[28px]">Profile Edit</h1>
          <p className="text-[20px]">Fill in your details</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="profileImg flex justify-center">
            <img
              src={previewImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="file"
              name="profileImage"
              required
              onChange={handleImageChange}
              accept="image/*"
              className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 py-2"
            />
          </div>
          <div className="personalInfo w-full md:w-[70%] m-auto py-8">
            <h1 className="sm:text-[28px] text-[22px]">Personal Information</h1>
            <div className="grid grid-cols-2 gap-8 mt-4">
              {Object.keys(formData).map((key) => {
                if (key === "profileImage") return null;
                return (
                  <React.Fragment key={key}>
                    <h3 className="text-[18px] sm:text-[20px] capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </h3>
                    <input
                      type="text"
                      name={key}
                      required
                      value={formData[key]}
                      onChange={handleChange}
                      className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px]"
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="personalInfo w-full md:w-[70%] m-auto py-8">
            <h1 className="text-[22px] sm:text-[28px]">Open to Collaborate</h1>
            <div className="flex gap-8 mt-4">
              <label className="flex items-center text-[18px] sm:text-[20px]">
                <input
                  type="radio"
                  name="openToCollaborate"
                  required
                  value="yes"
                  checked={formData.openToCollaborate === "yes"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center text-[18px] sm:text-[20px]">
                <input
                  type="radio"
                  name="openToCollaborate"
                  required
                  value="no"
                  checked={formData.openToCollaborate === "no"}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          <div className="personalInfo w-full md:w-[70%] m-auto py-8">
            <h1 className="text-[22px] sm:text-[28px]">
              Social Media Links Section
            </h1>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <h3 className="text-[18px] sm:text-[20px]">LinkedIn</h3>
              <input
                type="text"
                name="linkedinUrl"
                required
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px]"
              />
              <h3 className="text-[18px] sm:text-[20px]">Facebook</h3>
              <input
                type="text"
                name="facebookUrl"
                required
                value={formData.facebookUrl}
                onChange={handleChange}
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px]"
              />
              <h3 className="text-[18px] sm:text-[20px]">Twitter</h3>
              <input
                type="text"
                name="twitterUrl"
                required
                value={formData.twitterUrl}
                onChange={handleChange}
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px]"
              />
            </div>
            <div className="btns flex gap-4 pt-12 sm:pt-16 justify-center sm:justify-end">
              <button
                type="submit"
                className="bg-[#8F3FA9] max-sm:w-[50%] sm:px-16 h-[60px] text-white rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-[#8F3FA9] max-sm:w-[50%] sm:px-16 h-[60px] text-white rounded-lg"
                onClick={() => window.location.reload()} // Refresh the page or redirect as needed
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Profile;
