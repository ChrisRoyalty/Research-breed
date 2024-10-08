import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken"); // Or localStorage if you store the token there

    if (!token) {
      // If no token, redirect to login
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
    <div className="w-full h-fit flex justify-center items-center py-10">
      <div className="md:w-[40%] w-[90%] grid grid-cols-1 gap-8 border-[20px] border-[#8F3FA9] rounded-xl">
        {collaborators.map((collaborator, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 p-6 flex flex-col items-center"
          >
            <img
              src={collaborator.image}
              alt={`${collaborator.firstname} ${collaborator.lastname}`}
              className="rounded-full m-auto w-[120px] h-[120px] border-4 border-[#8F3FA9]"
            />
            <h4 className="font-bold text-xl mt-4">{`${
              collaborator.firstname || ""
            } ${collaborator.lastname || ""}`}</h4>
            {collaborator.email && (
              <p className="text-gray-600">{collaborator.email}</p>
            )}
            {collaborator.institution && (
              <p className="text-gray-500">{collaborator.institution}</p>
            )}
            {collaborator.occupation && (
              <p className="text-gray-500">
                Occupation: {collaborator.occupation}
              </p>
            )}
            {collaborator.phone && (
              <p className="text-gray-500">Phone: {collaborator.phone}</p>
            )}
            {collaborator.field_of_study && (
              <p className="text-gray-500">
                Field of Study: {collaborator.field_of_study}
              </p>
            )}
            {collaborator.degree && (
              <p className="text-gray-500">Degree: {collaborator.degree}</p>
            )}
            <div className="flex gap-4 items-center justify-center mt-4">
              {collaborator.facebook_url && (
                <a
                  href={collaborator.facebook_url}
                  className="hover:text-blue-500 text-[22px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookSquare />
                </a>
              )}
              {collaborator.linkedin_url && (
                <a
                  href={collaborator.linkedin_url}
                  className="hover:text-blue-500 text-[22px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              )}
              {collaborator.twitter_url && (
                <a
                  href={collaborator.twitter_url}
                  className="hover:text-blue-500 text-[22px]"
                  target="_blank"
                  rel="noopener noreferrer"
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
