// AdminDashboard.js
import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#8F3FA9] text-white flex-none md:h-full h-auto md:overflow-y-auto">
        <div className="p-4 text-center font-bold text-lg border-b border-gray-300">
          Admin Dashboard
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            to="users"
            className="hover:bg-gray-50 hover:text-black p-2 rounded transition"
          >
            Fetch Users
          </Link>
          <Link
            to="all-blogs"
            className="hover:bg-gray-50 hover:text-black p-2 rounded transition"
          >
            Fetch All Blogs
          </Link>
          <Link
            to="approved-blogs"
            className="hover:bg-gray-50 hover:text-black p-2 rounded transition"
          >
            Approve/Disapprove Blogs
          </Link>
          <Link
            to="publications"
            className="hover:bg-gray-50 hover:text-black p-2 rounded transition"
          >
            Fetch Publications
          </Link>
          <Link
            to="add-publication"
            className="hover:bg-gray-50 hover:text-black p-2 rounded transition"
          >
            Add Publication
          </Link>
          <Link
            to="remove-publication"
            className="hover:bg-gray-50 hover:text-black p-2 rounded transition"
          >
            Remove Publication
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-purple-100 p-4 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome to the Admin Dashboard
        </h1>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
