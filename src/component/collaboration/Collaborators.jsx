import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const collaboratorsPerPage = 3; // Limit to 3 collaborators per page
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

        if (error.response && error.response.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleEmailClick = (email) => {
    navigator.clipboard.writeText(email);
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone) => {
    navigator.clipboard.writeText(phone);
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsappClick = (phone) => {
    const whatsappUrl = `https://wa.me/${phone}`;
    window.open(whatsappUrl, "_blank");
  };

  const totalPages = Math.ceil(collaborators.length / collaboratorsPerPage);
  const displayedCollaborators = collaborators.slice(
    currentPage * collaboratorsPerPage,
    (currentPage + 1) * collaboratorsPerPage
  );

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
    <div className="w-full flex justify-center items-center py-12 bg-gray-50">
      <div className="lg:w-[30%] w-[90%] grid grid-cols-1 gap-8 p-6">
        {displayedCollaborators.map((collaborator, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 grid text-center"
          >
            <div className="lg:rounded-l-lg max-sm:rounded-t-lg px-4 py-12 bg-[#8F3FA9] text-white flex flex-col items-center">
              <img
                src={collaborator.image}
                alt={`${collaborator.firstname} ${collaborator.lastname}`}
                className="rounded-full w-[120px] h-[120px] border-4 border-white object-cover"
              />
              <h4 className="font-bold text-2xl mt-4 text-white">{`${
                collaborator.firstname || ""
              } ${collaborator.lastname || ""}`}</h4>
            </div>
            <div className="p-12">
              {/* Collaborator details */}
              {collaborator.gender && (
                <p className="text-gray-700 text-sm mt-1 grid grid-cols-2 w-full items-center">
                  <strong className="w-[80%] text-start">Gender:</strong>{" "}
                  <span className="w-[100%] text-start ">
                    {collaborator.gender}
                  </span>
                </p>
              )}
              {collaborator.institution && (
                <p className="text-gray-700 text-sm mt-1 grid grid-cols-2 w-full items-center">
                  <strong className="w-[80%] text-start">Institution:</strong>{" "}
                  <span className="w-[100%] text-start ">
                    {collaborator.institution}
                  </span>
                </p>
              )}
              {collaborator.occupation && (
                <p className="text-gray-700 text-sm mt-1 grid grid-cols-2 w-full items-center">
                  <strong className="w-[80%] text-start">Occupation:</strong>{" "}
                  <span className="w-[100%] text-start ">
                    {collaborator.occupation}
                  </span>
                </p>
              )}
              {collaborator.field_of_study && (
                <p className="text-gray-700 text-sm mt-1 grid grid-cols-2 w-full items-center">
                  <strong className="w-[80%] text-start">
                    Field Of Study:
                  </strong>{" "}
                  <span className="w-[100%] text-start ">
                    {collaborator.field_of_study}
                  </span>
                </p>
              )}
              {collaborator.degree && (
                <p className="text-gray-700 text-sm mt-1 grid grid-cols-2 w-full items-center">
                  <strong className="w-[80%] text-start">Degree:</strong>{" "}
                  <span className="w-[100%] text-start ">
                    {collaborator.degree}
                  </span>
                </p>
              )}
              {collaborator.interest && (
                <p className="text-gray-700 text-sm mt-1 grid grid-cols-2 w-full items-center">
                  <strong className="w-[80%] text-start">Interest:</strong>{" "}
                  <span className="w-[100%] text-start ">
                    {collaborator.interest}
                  </span>
                </p>
              )}
              {collaborator.number_of_publications && (
                <p className="text-gray-700 text-sm mt-1 grid grid-cols-2 w-full items-center">
                  <strong className="w-[80%] text-start">NumOfPubli..:</strong>{" "}
                  <span className="w-[100%] text-start ">
                    {collaborator.number_of_publications}
                  </span>
                </p>
              )}
              {collaborator.account_status && (
                <p className="text-gray-500 text-sm mt-1 grid grid-cols-2 w-full items-center">
                  <strong className="w-[80%] text-start">
                    Account Status:
                  </strong>{" "}
                  <span className="w-[100%] text-start text-green-600 text-[22px]">
                    {collaborator.account_status}
                  </span>
                </p>
              )}

              <button
                onClick={() => setShowActions(!showActions)}
                className="mt-4 bg-[#8F3FA9] text-white px-4 py-2 rounded transition-colors hover:bg-[#741C9D]"
              >
                {`Collaborate with ${collaborator.firstname || "User"}`}
              </button>

              {/* Social Media Icons */}
              {showActions && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <FaFacebookSquare
                    onClick={() =>
                      window.open(
                        `https://facebook.com/${collaborator.facebook}`,
                        "_blank"
                      )
                    }
                    className="text-[#3b5998] text-[42px] border border-[#8F3FA9] p-2 hover:text-[#8F3FA9] rounded-full cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaLinkedin
                    onClick={() =>
                      window.open(
                        `https://linkedin.com/in/${collaborator.linkedIn}`,
                        "_blank"
                      )
                    }
                    className="text-[#0077b5] text-[42px] border border-[#8F3FA9] p-2 hover:text-[#8F3FA9] rounded-full cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaTwitter
                    onClick={() =>
                      window.open(
                        `https://twitter.com/${collaborator.twitter}`,
                        "_blank"
                      )
                    }
                    className="text-[#1DA1F2] text-[42px] border border-[#8F3FA9] p-2 hover:text-[#8F3FA9] rounded-full cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaEnvelope
                    onClick={() => handleEmailClick(collaborator.email)}
                    className="text-[#c71610] text-[42px] border border-[#8F3FA9] p-2 hover:text-[#8F3FA9] rounded-full cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaPhone
                    onClick={() => handlePhoneClick(collaborator.phone)}
                    className="text-[#6d4c41] text-[42px] border border-[#8F3FA9] p-2 hover:text-[#8F3FA9] rounded-full cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaWhatsapp
                    onClick={() => handleWhatsappClick(collaborator.phone)}
                    className="text-[#25D366] text-[42px] border border-[#8F3FA9] p-2 hover:text-[#8F3FA9] rounded-full cursor-pointer hover:scale-110 transition-transform"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 w-full">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
