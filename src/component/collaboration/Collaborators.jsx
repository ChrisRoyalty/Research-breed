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
    return <div>Loading...</div>;
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
    <div className="w-full h-fit flex justify-center items-center">
      <div className="md:w-[80%] w-[90%]">
        {collaborators.map((call, index) => (
          <div
            key={index}
            className="text-center border-[30px] border-[#300937] rounded-[30px] py-8 max-sm:mb-10 mb-16 shadow-lg"
          >
            Hello world
            <img
              src={call.image}
              alt={call.name}
              className="profileImg rounded-full m-auto w-[180px] h-[180px]"
            />
            <div className="m-auto">
              <h4 className="font-bold">{`${call.firstname} ${call.lastname}`}</h4>
              <p>{call.email}</p>
              <p>{call.institution}</p>
              <div className="flex gap-4 items-center justify-center mt-4">
                {call.facebook_url && (
                  <a
                    href={call.facebook_url}
                    className="hover:text-blue-500 text-[22px]"
                  >
                    <FaFacebookSquare />
                  </a>
                )}
                {call.linkedin_url && (
                  <a
                    href={call.linkedin_url}
                    className="hover:text-blue-500 text-[22px]"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {call.twitter_url && (
                  <a
                    href={call.twitter_url}
                    className="hover:text-blue-500 text-[22px]"
                  >
                    <FaTwitter />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborators;
