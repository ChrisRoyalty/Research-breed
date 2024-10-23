import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons from react-icons

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPublications, setTotalPublications] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedPublication, setSelectedPublication] = useState(null); // Store selected publication details
  const navigate = useNavigate();

  // Fetch dashboard data with token
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");

        if (!token) {
          throw new Error("Token is missing.");
        }

        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;
        setTotalUsers(data.users);
        setTotalBlogs(data.active_blogs);
        setTotalPublications(data.publications);
        setPendingReviews(data.pending_blogs);
        setRecentActivity(data.recent_publications);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("https://dev-api.researchbreed.com/api/logout");
      sessionStorage.removeItem("authToken"); // Clear the token
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Handle sidebar link click
  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Close the sidebar after clicking any link
  };

  // Open modal to show publication details
  const handleViewDetails = (publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true); // Open the publication modal
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPublication(null); // Reset selected publication
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="relative w-[50%] max-md:fixed top-0 max-md:h-screen md:w-64 bg-[#8F3FA9] text-white flex-none md:h-full h-auto md:overflow-y-auto backdrop-blur-md bg-opacity-70">
          <div className="p-4 text-center font-bold text-lg border-b border-[#8F3FA9]/20">
            Admin Dashboard
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105"
                  : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300"
              }
              onClick={handleLinkClick} // Close sidebar on link click
            >
              Fetch Users
            </NavLink>
            <NavLink
              to="all-blogs"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105"
                  : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300"
              }
              onClick={handleLinkClick} // Close sidebar on link click
            >
              Fetch All Blogs
            </NavLink>
            <NavLink
              to="publications"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105"
                  : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300"
              }
              onClick={handleLinkClick} // Close sidebar on link click
            >
              Fetch Publications
            </NavLink>
            <NavLink
              to="add-publication"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105"
                  : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300"
              }
              onClick={handleLinkClick} // Close sidebar on link click
            >
              Add Publication
            </NavLink>
            {/* Logout Button */}
            <NavLink
              to="/"
              onClick={() => {
                handleLogout(); // Logout functionality
                handleLinkClick(); // Close the sidebar
              }}
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105 text-center"
                  : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300 text-center border-2 border-white shadow-lg absolute bottom-4 w-[80%]"
              }
            >
              Logout
            </NavLink>

            {/* Cancel Button (using close icon) */}
            <button
              className="absolute top-4 right-4 bg-white text-[#8F3FA9] p-2 rounded-full"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FiX size={24} />
            </button>
          </nav>
        </aside>
      )}

      {/* Hamburger icon to open sidebar on small screens */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 right-4 bg-[#8F3FA9] text-white p-2 rounded-full z-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-[#F2D4F5] p-4 overflow-y-auto">
        <header className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h1 className="text-3xl font-bold text-[#8F3FA9] mb-2">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Here you can manage users, blogs, publications, and other important
            aspects of your platform.
          </p>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-4xl font-bold text-[#8F3FA9]">{totalUsers}</p>
            <p className="text-gray-500">Active Users</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
            <p className="text-4xl font-bold text-[#8F3FA9]">{totalBlogs}</p>
            <p className="text-gray-500">Published Blogs</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Total Publications</h2>
            <p className="text-4xl font-bold text-[#8F3FA9]">
              {totalPublications}
            </p>
            <p className="text-gray-500">Approved Publications</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
            <p className="text-4xl font-bold text-[#8F3FA9]">
              {pendingReviews}
            </p>
            <p className="text-gray-500">Submissions Pending</p>
          </div>
        </section>
        {/* Recent Activity */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Publications</h2>
          <ul className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-md p-4">
            {recentActivity.map((activity) => (
              <li
                key={activity.id}
                className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleViewDetails(activity)} // Open modal with details
              >
                <span>{activity.title}</span>
                <button className="text-[#8F3FA9] hover:underline">View</button>
              </li>
            ))}
          </ul>
        </section>
        {/* Modal for Publication Details */}
        {isModalOpen && selectedPublication && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-black opacity-75 absolute inset-0"
              onClick={closeModal}
            />
            <div className="bg-white rounded-lg shadow-lg z-10 p-6 w-11/12 lg:w-[70%] max-h-[80vh] overflow-y-auto flex flex-col">
              <h2 className="text-2xl font-bold mb-4">
                {selectedPublication.title}
              </h2>
              <p className="text-xl font-bold mb-4">
                Publisher: {selectedPublication.publisher}
              </p>
              <p className="text-lg text-gray-700 font-bold mb-4">
                Category: {selectedPublication.category}
              </p>
              <a
                href={`${selectedPublication.external_link}`}
                className="text-gray-600 font-bold mb-4"
              >
                Read in full
              </a>
              <div
                className="mb-4 prose"
                dangerouslySetInnerHTML={{ __html: selectedPublication.body }} // Display HTML content
              />
              <button
                className="bg-[#8F3FA9] text-white px-4 py-2 rounded hover:bg-[#7A2D8C] self-end"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
