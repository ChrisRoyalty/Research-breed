import { NavLink, Outlet } from "react-router-dom";

function AdminDashboard() {
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F2D4F5] p-4 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome to the Admin Dashboard
        </h1>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
