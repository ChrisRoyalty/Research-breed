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
  const [visibleActions, setVisibleActions] = useState(null); // Track visible actions per collaborator
  const collaboratorsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://dev-api.researchbreed.com/api/collaborate", {
        headers: { Authorization: `Bearer ${token}` },
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
      <div className="flex justify-center items-center h-screen text-center p-4">
        <div className="border-4 border-red-500 p-10 rounded-lg shadow-lg bg-white animate-bounce-in max-w-lg mx-auto">
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
    <div className="w-full flex justify-center items-center py-12 bg-gray-50 px-4">
      <div className="lg:w-[80%] w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayedCollaborators.map((collaborator, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 text-center overflow-hidden p-4"
          >
            <div className="flex flex-col items-center px-4 py-8 bg-[#8F3FA9] text-white">
              <img
                src={collaborator.image}
                alt={`${collaborator.firstname} ${collaborator.lastname}`}
                className="rounded-full w-24 h-24 lg:w-28 lg:h-28 border-4 border-white object-cover shadow-md"
              />
              <h4 className="font-bold text-lg lg:text-2xl mt-4">{`${
                collaborator.firstname || ""
              } ${collaborator.lastname || ""}`}</h4>
            </div>
            <div className="p-6 space-y-2 text-left">
              <p>
                <strong>Gender:</strong> {collaborator.gender}
              </p>
              <p>
                <strong>Email:</strong> {collaborator.email}
              </p>
              <p>
                <strong>Phone:</strong> {collaborator.phone}
              </p>
              <p>
                <strong>Occupation:</strong> {collaborator.occupation}
              </p>
              <p>
                <strong>Interest:</strong> {collaborator.interest}
              </p>
              <p>
                <strong>Publications:</strong>{" "}
                {collaborator.number_of_publications}
              </p>
              <p>
                <strong>Institution:</strong> {collaborator.institution}
              </p>
              <p>
                <strong>Field of Study:</strong> {collaborator.field_of_study}
              </p>
              <p>
                <strong>Degree:</strong> {collaborator.degree}
              </p>

              <button
                onClick={() =>
                  setVisibleActions(visibleActions === index ? null : index)
                }
                className="mt-4 bg-[#8F3FA9] text-white px-4 py-2 rounded transition-colors hover:bg-[#741C9D] w-full"
              >
                {`Collaborate with ${collaborator.firstname || "User"}`}
              </button>

              {visibleActions === index && (
                <div className="flex justify-evenly mt-4">
                  <FaFacebookSquare
                    onClick={() =>
                      window.open(
                        `https://facebook.com/${collaborator.facebook}`,
                        "_blank"
                      )
                    }
                    className="text-[#3b5998] text-2xl cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaLinkedin
                    onClick={() =>
                      window.open(
                        `https://linkedin.com/in/${collaborator.linkedIn}`,
                        "_blank"
                      )
                    }
                    className="text-[#0077b5] text-2xl cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaTwitter
                    onClick={() =>
                      window.open(
                        `https://twitter.com/${collaborator.twitter}`,
                        "_blank"
                      )
                    }
                    className="text-[#1DA1F2] text-2xl cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaEnvelope
                    onClick={() => handleEmailClick(collaborator.email)}
                    className="text-[#c71610] text-2xl cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaPhone
                    onClick={() => handlePhoneClick(collaborator.phone)}
                    className="text-[#6d4c41] text-2xl cursor-pointer hover:scale-110 transition-transform"
                  />
                  <FaWhatsapp
                    onClick={() => handleWhatsappClick(collaborator.phone)}
                    className="text-[#25D366] text-2xl cursor-pointer hover:scale-110 transition-transform"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6 col-span-full">
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
