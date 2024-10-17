import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    location: "",
    gender: "Male", // Default gender
    phone: "",
    occupation: "",
    interest: "",
    number_of_publications: "",
    institution: "",
    field_of_study: "",
    degree: "",
    linkedin_url: "",
    facebook_url: "",
    twitter_url: "",
    open_to_collaborate: "0", // "1" for Yes, "0" for No
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          window.location.href = "/login";
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

        const data = response.data.data;
        setFormData({
          name: `${data.firstname || ""} ${data.lastname || ""}`.trim(),
          email: data.email || "",
          location: data.location || "",
          gender: data.gender || "Male",
          phone: data.phone || "",
          occupation: data.occupation || "",
          interest: data.interest || "",
          number_of_publications: data.number_of_publications || "",
          institution: data.institution || "",
          field_of_study: data.field_of_study || "",
          degree: data.degree || "",
          linkedin_url: data.linkedin_url || "",
          facebook_url: data.facebook_url || "",
          twitter_url: data.twitter_url || "",
          open_to_collaborate: data.open_to_collaborate ? "1" : "0",
        });
      } catch (error) {
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "open_to_collaborate") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!["Male", "Female"].includes(formData.gender)) {
      setError("Please select a valid gender.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setMessage("");
    setError("");
    setLoading(true);

    const dataToSend = {
      gender: formData.gender,
      phone: formData.phone,
      occupation: formData.occupation,
      number_of_publications: formData.number_of_publications,
      institution: formData.institution,
      field_of_study: formData.field_of_study,
      degree: formData.degree,
      linkedin_url: formData.linkedin_url,
      facebook_url: formData.facebook_url,
      twitter_url: formData.twitter_url,
      open_to_collaborate: formData.open_to_collaborate,
      location: formData.location,
      interest: formData.interest,
    };

    // Remove empty fields
    Object.keys(dataToSend).forEach((key) => {
      if (dataToSend[key] === "") {
        delete dataToSend[key];
      }
    });

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        "https://dev-api.researchbreed.com/api/update-profile",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage("Profile updated successfully!");
        navigate("/profile");
      } else {
        setError(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      setError("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-fit py-[15vh] bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="occupation" className="block text-gray-700">
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="interest" className="block text-gray-700">
              Interest
            </label>
            <input
              type="text"
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="number_of_publications"
              className="block text-gray-700"
            >
              Number of Publications
            </label>
            <input
              type="number"
              id="number_of_publications"
              name="number_of_publications"
              value={formData.number_of_publications}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="field_of_study" className="block text-gray-700">
              Field of Study
            </label>
            <input
              type="text"
              id="field_of_study"
              name="field_of_study"
              value={formData.field_of_study}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="degree" className="block text-gray-700">
              Degree
            </label>
            <select
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Degree</option>
              <option value="WAEC">WAEC</option>
              <option value="ND">ND</option>
              <option value="HND">HND</option>
              <option value="BSC">BSC</option>
              <option value="MSC">MSC</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="linkedin_url" className="block text-gray-700">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="facebook_url" className="block text-gray-700">
              Facebook URL
            </label>
            <input
              type="url"
              id="facebook_url"
              name="facebook_url"
              value={formData.facebook_url}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="twitter_url" className="block text-gray-700">
              Twitter URL
            </label>
            <input
              type="url"
              id="twitter_url"
              name="twitter_url"
              value={formData.twitter_url}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="open_to_collaborate"
              className="block text-gray-700"
            >
              Open to Collaborate
            </label>
            <select
              id="open_to_collaborate"
              name="open_to_collaborate"
              value={formData.open_to_collaborate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8F3FA9] hover:bg-[#8F3FA9]/90 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
