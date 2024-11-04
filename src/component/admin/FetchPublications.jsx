import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const FetchPublications = () => {
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationModal, setNotificationModal] = useState({
    isVisible: false,
    message: "",
    isError: false,
  });
  const [isConfirmDeleteVisible, setConfirmDeleteVisible] = useState({
    isVisible: false,
    publicationSlug: null,
  });

  useEffect(() => {
    const fetchPublications = async () => {
      const token = sessionStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/publications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPublications(response.data.data);
      } catch (error) {
        showNotification("Failed to fetch publications.", true);
      }
    };

    fetchPublications();
  }, []);

  // Handle view more (opens modal)
  const handlePublicationClick = (publication) => {
    setSelectedPublication(publication);
    setModalVisible(true);
  };

  // Handle delete publication with custom confirmation modal
  const handleDelete = async () => {
    const token = sessionStorage.getItem("authToken");
    const { publicationSlug } = isConfirmDeleteVisible;

    if (!token || !publicationSlug) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/admin/publication/${publicationSlug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        showNotification(response.data.message, false);
        setPublications((prev) =>
          prev.filter((pub) => pub.slug !== publicationSlug)
        );
      } else {
        showNotification("Failed to delete publication.", true);
      }
    } catch (error) {
      showNotification("Error occurred while deleting publication.", true);
    } finally {
      closeConfirmDelete();
    }
  };

  // Show confirmation modal
  const openConfirmDelete = (publicationSlug) => {
    setConfirmDeleteVisible({
      isVisible: true,
      publicationSlug,
    });
  };

  // Close confirmation modal
  const closeConfirmDelete = () => {
    setConfirmDeleteVisible({
      isVisible: false,
      publicationSlug: null,
    });
  };

  // Show notification modal
  const showNotification = (message, isError) => {
    setNotificationModal({
      isVisible: true,
      message,
      isError,
    });
    setTimeout(() => {
      setNotificationModal({
        isVisible: false,
        message: "",
        isError: false,
      });
    }, 3000); // Hide modal after 3 seconds
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedPublication(null);
  };

  return (
    <div className="p-4 md:p-10 lg:p-16 bg-gray-50 min-h-screen rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Call for Papers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#8F3FA9] text-white uppercase text-sm">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Publisher</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {publications.map((pub) => (
              <tr
                key={pub.slug}
                className="border-b hover:bg-[#F2D4F5] cursor-pointer"
              >
                <td
                  className="py-3 px-6 truncate"
                  onClick={() => handlePublicationClick(pub)}
                >
                  {pub.title}
                </td>
                <td className="py-3 px-6 truncate">{pub.category}</td>
                <td className="py-3 px-6 truncate">{pub.publisher}</td>
                <td className="py-3 px-6 truncate">
                  {new Date(pub.date_of_publication).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handlePublicationClick(pub)}
                    className="text-[#8F3FA9] hover:underline mr-4"
                  >
                    View More
                  </button>
                  <button
                    onClick={() => openConfirmDelete(pub.slug)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Full Publication Content */}
      {isModalVisible && selectedPublication && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
          <div
            className="backdrop-filter backdrop-blur-sm fixed top-0 left-0 w-full h-full bg-black opacity-50"
            onClick={closeModal}
          />
          <div className="bg-white p-6 rounded-md shadow-md w-[80%] z-50 h-[95%] max-sm:w-[90%] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#8F3FA9]">
              {selectedPublication.title}
            </h2>
            <div
              className="mb-4 text-gray-600"
              dangerouslySetInnerHTML={{ __html: selectedPublication.body }}
            />
            <button
              onClick={closeModal}
              className="mt-4 bg-[#8F3FA9] text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteVisible.isVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="backdrop-filter backdrop-blur-sm fixed top-0 left-0 w-full h-full bg-black opacity-50"
            onClick={closeConfirmDelete}
          />
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full z-50">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete this publication?
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeConfirmDelete}
                className="mr-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {notificationModal.isVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className={`bg-white p-6 rounded-md shadow-md max-w-md w-full z-50 ${
              notificationModal.isError ? "border-red-500" : "border-green-500"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                notificationModal.isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {notificationModal.isError ? "Error" : "Success"}
            </h2>
            <p className="text-gray-600">{notificationModal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchPublications;
