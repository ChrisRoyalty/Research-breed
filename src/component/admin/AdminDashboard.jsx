import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPublications, setTotalPublications] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch total users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/fetch-users"
        );
        setTotalUsers(response.data.length); // Adjust based on actual response
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Fetch total blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/fetch-blog"
        );
        setTotalBlogs(response.data.length); // Adjust based on actual response
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    // Fetch total publications
    const fetchPublications = async () => {
      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/fetch-publications"
        ); // Adjust to your actual endpoint
        setTotalPublications(response.data.length); // Adjust based on actual response
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    // Fetch pending reviews (assuming this is a specific endpoint)
    const fetchPendingReviews = async () => {
      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/pending-reviews"
        ); // Adjust to your actual endpoint
        setPendingReviews(response.data.length); // Adjust based on actual response
      } catch (error) {
        console.error("Error fetching pending reviews:", error);
      }
    };

    // Fetch recent activity (assuming this is a specific endpoint)
    const fetchRecentActivity = async () => {
      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/recent-activity"
        ); // Adjust to your actual endpoint
        setRecentActivity(response.data); // Adjust based on actual response
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };

    fetchUsers();
    fetchBlogs();
    fetchPublications(); // Fetch total publications
    fetchPendingReviews();
    fetchRecentActivity();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("https://dev-api.researchbreed.com/api/logout"); // Adjust to your actual endpoint
      // Clear session or token if necessary
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#8F3FA9] text-white flex-none md:h-full h-auto md:overflow-y-auto">
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
          >
            Add Publication
          </NavLink>
          {/* Logout Button */}
          <NavLink
            to="/"
            onClick={handleLogout}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-[#8F3FA9] p-2 rounded transition transform scale-105 text-center"
                : "hover:bg-white hover:text-[#8F3FA9] p-2 rounded transition duration-300 text-center border-2 border-white shadow-lg"
            }
          >
            Logout
          </NavLink>
        </nav>
      </aside>

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
            <h2 className="text-xl font-semibold mb-2">Total Blogs</h2>
            <p className="text-4xl font-bold text-[#8F3FA9]">{totalBlogs}</p>
            <p className="text-gray-500">Published Blogs</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Total Publications</h2>
            <p className="text-4xl font-bold text-[#8F3FA9]">
              {totalPublications}
            </p>
            <p className="text-gray-500">Available Publications</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
            <p className="text-4xl font-bold text-[#8F3FA9]">
              {pendingReviews}
            </p>
            <p className="text-gray-500">Blogs Awaiting Approval</p>
          </div>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <ul>
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <li key={index} className="border-b py-2">
                    {activity.description}
                  </li>
                ))
              ) : (
                <li className="py-2">No recent activity available.</li>
              )}
            </ul>
          </div>
        </section>

        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
