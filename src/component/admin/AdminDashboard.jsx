import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons from react-icons

const PublicationModal = ({ publication, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[90%] h-[90%] p-6 rounded-lg relative overflow-y-auto shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#8F3FA9] hover:bg-[#8F3FA9]/75 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>

        {/* Publication details */}
        <h2 className="text-2xl font-bold mb-4">{publication.title}</h2>
        <p className="text-sm text-gray-600 mb-2">
          {publication.category.charAt(0).toUpperCase() +
            publication.category.slice(1)}{" "}
          by {publication.publisher}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Published on:{" "}
          {new Date(publication.date_of_publication).toLocaleDateString()}
        </p>

        {/* Display body content */}
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: publication.body }}
        ></div>
      </div>
    </div>
  );
};

function AdminDashboard() {
  // const [pendingBlogs, setPendingBlogs] = useState(0);
  const [recentPublications, setRecentPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPublications, setTotalPublications] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  // const [recentActivity, setRecentActivity] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default sidebar closed on small screens
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("authToken"); // Retrieve the token from session storage (or localStorage if you prefer)

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

        const {
          active_blogs,
          pending_blogs,
          users,
          publications,
          recent_publications,
        } = response.data.data;

        setTotalBlogs(active_blogs); // Active blogs count
        setPendingReviews(pending_blogs); // Pending blogs count
        setTotalUsers(users); // Total users count
        setTotalPublications(publications); // Total publications count
        setRecentPublications(recent_publications); // Array of recent publications
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/logout`); // Adjust to your actual endpoint
      navigate("/admin-login"); // Redirect to home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Handle sidebar link click
  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Close the sidebar after clicking any link
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="relative w-[50%] max-md:fixed top-0 max-lg:right-0 max-md:h-screen md:w-64 bg-[#8F3FA9] text-white flex-none md:h-full h-auto md:overflow-y-auto backdrop-blur-md bg-opacity-70">
          <div className="p-4 text-center font-bold text-lg border-b border-[#8F3FA9]/20 mt-[55px] border">
            Admin Dashboard
          </div>
          <nav className="flex flex-col px-4 space-y-2">
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105"
                  : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300"
              }
              onClick={handleLinkClick} // Close sidebar on link click
            >
              All Users
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
              Add Call for Papers
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
              All Call for Papers
            </NavLink>

            <NavLink
              to="create-admin-blog"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105"
                  : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300"
              }
              onClick={handleLinkClick} // Close sidebar on link click
            >
              Add Blog
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
              All Blogs
            </NavLink>

            <NavLink
              to="all-review"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105"
                  : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300"
              }
              onClick={handleLinkClick} // Close sidebar on link click
            >
              All Review
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
              className="absolute top-0 right-4 bg-white text-[#8F3FA9] p-2 rounded-full"
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
        <header className="bg-white rounded-lg shadow-md p-4 my-[7vh]">
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
            <h2 className="text-xl font-semibold mb-2">Total Blogs</h2>
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

        {/* Recent Activity (Recent Publications) */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold text-[#8F3FA9] mb-4">
            Recent Publications
          </h2>
          <ul className="bg-white rounded-lg shadow-md p-6">
            {recentPublications.length > 0 ? (
              recentPublications.map((publication, index) => (
                <li
                  key={index}
                  className="border-b last:border-none p-4 flex justify-between items-center"
                >
                  {/* Render the publication title */}
                  <span className="font-semibold text-xl">
                    {publication.title}
                  </span>

                  {/* Render the publication date */}
                  <span className="font-semibold text-xl">
                    {publication.date_of_publication}
                  </span>

                  {/* View more button to trigger modal */}
                  <button
                    onClick={() => setSelectedPublication(publication)}
                    className="bg-[#8F3FA9] hover:bg-[#8F3FA9]/75 text-white px-4 py-2 rounded-lg no-underline ml-2"
                  >
                    View
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No recent publications</p>
            )}
          </ul>

          {/* Modal to display full publication details */}
          {selectedPublication && (
            <PublicationModal
              publication={selectedPublication}
              onClose={() => setSelectedPublication(null)}
            />
          )}
        </section>

        {/* Nested Outlet for different routes */}
        <div className="mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
