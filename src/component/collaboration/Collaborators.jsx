import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://dev-api.researchbreed.com/api/collaborate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCollaborators(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching collaborators", error);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-purple-500 border-solid"></div>
      </div>
    );
  }

  if (collaborators.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-center">
        <div className="border-4 border-red-500 p-10 rounded-lg shadow-lg bg-white animate-bounce-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-red-500 m-auto animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 3h.01M9.75 7.5a4.5 4.5 0 014.5 4.5v.75m-6 4.5h7.5m-7.5 0A4.5 4.5 0 109.75 7.5m7.5 4.5a4.5 4.5 0 01-4.5 4.5"
            />
          </svg>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            No collaborators found.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Looks like there are no collaborators available at the moment. Try
            again later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto flex justify-center items-center py-12 bg-gray-50">
      <div className="md:w-[60%] w-[90%] grid grid-cols-1 gap-8 border-[10px] border-[#8F3FA9] rounded-xl p-6 shadow-xl bg-white">
        {collaborators.map((collaborator, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 flex flex-col items-center text-center"
          >
            <img
              src={collaborator.image}
              alt={`${collaborator.firstname} ${collaborator.lastname}`}
              className="rounded-full w-[120px] h-[120px] border-4 border-[#8F3FA9] object-cover"
            />
            <h4 className="font-bold text-2xl mt-4 text-gray-800">{`${
              collaborator.firstname || ""
            } ${collaborator.lastname || ""}`}</h4>
            {collaborator.email && (
              <p className="text-gray-600 text-sm mt-2">{collaborator.email}</p>
            )}
            {collaborator.gender && (
              <p className="text-gray-500 text-sm mt-1">
                Gender: {collaborator.gender}
              </p>
            )}
            {collaborator.institution && (
              <p className="text-gray-500 text-sm mt-1">
                {collaborator.institution}
              </p>
            )}
            {collaborator.occupation && (
              <p className="text-gray-500 text-sm mt-1">
                Occupation: {collaborator.occupation}
              </p>
            )}

            {collaborator.phone && (
              <p className="text-gray-500 text-sm mt-1">
                Phone: {collaborator.phone}
              </p>
            )}
            {collaborator.field_of_study && (
              <p className="text-gray-500 text-sm mt-1">
                Field of Study: {collaborator.field_of_study}
              </p>
            )}
            {collaborator.degree && (
              <p className="text-gray-500 text-sm mt-1">
                Degree: {collaborator.degree}
              </p>
            )}
            {collaborator.interest && (
              <p className="text-gray-500 text-sm mt-1">
                Interest: {collaborator.interest}
              </p>
            )}
            {collaborator.number_of_publications && (
              <p className="text-gray-500 text-sm mt-1">
                Num_Of_Publica..: {collaborator.number_of_publications}
              </p>
            )}
            {collaborator.date_created && (
              <p className="text-gray-500 text-sm mt-1">
                Date Created: {collaborator.date_created}
              </p>
            )}
            {collaborator.account_status && (
              <p className="text-gray-500 text-sm mt-1">
                Account Status:{" "}
                <span className="text-green-600 text-[20px]">
                  {collaborator.account_status}
                </span>
              </p>
            )}
            {/* Animated Social Media Icons */}
            <div className="flex gap-6 mt-4">
              {collaborator.facebook_url && (
                <a
                  href={collaborator.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-transform animate-bounce text-[24px]"
                >
                  <FaFacebookSquare />
                </a>
              )}
              {collaborator.linkedin_url && (
                <a
                  href={collaborator.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 transition-transform animate-bounce text-[24px]"
                >
                  <FaLinkedin />
                </a>
              )}
              {collaborator.twitter_url && (
                <a
                  href={collaborator.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 transition-transform animate-bounce text-[24px]"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborators;
