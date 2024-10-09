import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Spinner from "../../component/Spinner";
import Message from "../../component/Message"; // Import the Message component
import { CSSTransition } from "react-transition-group";
import "../../css/modalAnimation.css"; // Ensure modal animation CSS is included
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

// Set the modal root element for accessibility
Modal.setAppElement("#root");

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success messages
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState(null); // User to display in modal

  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
          setSuccessMessage("Users retrieved successfully!"); // Set success message
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Authentication failed. Please log in again.");
          setIsAuthenticated(false);
        } else {
          setError("Error fetching users");
        }
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">User List</h1>
      {successMessage && <Message type="success" text={successMessage} />}
      {error && <Message type="error" text={error} />}

      <div className="w-full max-w-6xl overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-[#8F3FA9] text-white">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Publications</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 border">
                  {user.firstname} {user.lastname}
                </td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  {user.phone || "Not provided"}
                </td>
                <td className="px-4 py-2 border">
                  {user.number_of_publications || "0"}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => openModal(user)}
                    className="text-[#8F3FA9] font-semibold hover:underline"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing full user details */}
      <CSSTransition
        in={isModalOpen}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="View User Details"
          className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-40"
        >
          <div className="modal-header border-b pb-4 mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#333]">
              {selectedUser?.firstname} {selectedUser?.lastname}
            </h2>
            <button
              onClick={closeModal}
              className="text-[#8F3FA9] hover:text-[#712a8a] font-bold text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="modal-body space-y-4">
            <div className="flex justify-between items-center text-end">
              <div className="text-start">
                <p className="text-sm text-gray-600">Email:</p>
                <p className="text-lg text-[#333] font-semibold">
                  {selectedUser?.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone:</p>
                <p className="text-lg text-[#333] font-semibold">
                  {selectedUser?.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-end">
              <div className="text-start">
                <p className="text-sm text-gray-600">Occupation:</p>
                <p className="text-lg text-[#333] font-semibold">
                  {selectedUser?.occupation || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Institution:</p>
                <p className="text-lg text-[#333] font-semibold">
                  {selectedUser?.institution || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-end">
              <div className="text-start">
                <p className="text-sm text-gray-600">Number of Publications:</p>
                <p className="text-lg text-[#333] font-semibold">
                  {selectedUser?.number_of_publications || "0"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Field of Study:</p>
                <p className="text-lg text-[#333] font-semibold">
                  {selectedUser?.field_of_study || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-end">
              <div className="text-start">
                <p className="text-sm text-gray-600">Degree:</p>
                <p className="text-lg text-[#333] font-semibold">
                  {selectedUser?.degree || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Open to Collaborate:</p>
                <p className="text-lg text-[#333] font-semibold">
                  {selectedUser?.is_open_to_collaborate ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">LinkedIn:</p>
              {selectedUser?.linked_url ? (
                <a
                  href={selectedUser.linked_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8F3FA9] hover:underline"
                >
                  {selectedUser.linked_url}
                </a>
              ) : (
                <p className="text-lg text-[#333] font-semibold">
                  Not provided
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-start">
                <p className="text-sm text-gray-600">Twitter:</p>
                {selectedUser?.twitter_url ? (
                  <a
                    href={selectedUser.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8F3FA9] hover:underline"
                  >
                    {selectedUser.twitter_url}
                  </a>
                ) : (
                  <p className="text-lg text-[#333] font-semibold">
                    Not provided
                  </p>
                )}
              </div>
              <div className="text-end">
                <p className="text-sm text-gray-600">Facebook:</p>
                {selectedUser?.facebook_url ? (
                  <a
                    href={selectedUser.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8F3FA9] hover:underline"
                  >
                    {selectedUser.facebook_url}
                  </a>
                ) : (
                  <p className="text-lg text-[#333] font-semibold">
                    Not provided
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Account Status:</p>
              <p
                className={`text-lg font-semibold flex items-center justify-center space-x-2 ${
                  selectedUser?.account_status === "Verified"
                    ? "text-[#8F3FA9]"
                    : "text-red-500"
                }`}
              >
                {selectedUser?.account_status === "Verified" ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span>Verified</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faTimesCircle} />
                    <span>Unverified</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="modal-footer mt-6 flex justify-end">
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-[#8F3FA9] text-white font-semibold rounded-lg hover:bg-[#712a8a] transition duration-200"
            >
              Close
            </button>
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default FetchUsers;
