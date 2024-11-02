import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "../css/header.css";

function Header() {
  const [toggleMenu, setToggleMenu] = useState("hidden");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const displayMenu = () => {
    setToggleMenu(toggleMenu === "hidden" ? "flex" : "hidden");
  };

  const hideMenu = () => {
    setToggleMenu("hidden");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false); // Set to false on logout
    navigate("/login");
  };

  const handleCollaborateClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      navigate("/collaboration");
    }
  };

  return (
    <header
      ref={headerRef}
      className="w-full h-[12vh] max-sm:h-[15vh] bg-white fixed top-0 flex justify-center items-center shadow-lg z-50"
    >
      <div className="w-[90%] sm:w-[80%] flex justify-between items-center">
        <div
          className="menu text-[48px] lg:hidden max-sm:text-[40px]"
          onClick={displayMenu}
        >
          <AiOutlineMenu />
        </div>
        <div className="logo z-50">
          <img
            src={Logo}
            alt="Logo"
            className="w-[56px] h-[40px] max-sm:w-[40px] max-sm:h-[40px]"
          />
        </div>
        <nav
          className={`max-lg:py-10 fixed top-[13vh] lg:w-fit w-[90%] lg:h-fit h-[85vh] lg:bg-transparent bg-white lg:shadow-none shadow-lg left-0 lg:p-0 px-[10%] lg:static ${toggleMenu} lg:flex items-start lg:flex-row flex-col lg:items-center gap-8 text-[16px] font-bold`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 px-4 max-lg:rounded-lg transition-all duration-300 ease-linear ${
                isActive
                  ? "lg:border-b-4 lg:border-[#8F3FA9] bg-[#8F3FA9] text-white lg:text-black lg:bg-transparent"
                  : "hover:border-b-4 border-[#8F3FA9]"
              }`
            }
            onClick={hideMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block py-2 px-4 max-lg:rounded-lg transition-all duration-300 ease-linear ${
                isActive
                  ? "lg:border-b-4 lg:border-[#8F3FA9] bg-[#8F3FA9] text-white lg:text-black lg:bg-transparent"
                  : "hover:border-b-4 border-[#8F3FA9]"
              }`
            }
            onClick={hideMenu}
          >
            About us
          </NavLink>
          <NavLink
            to="/publications"
            className={({ isActive }) =>
              `block py-2 px-4 max-lg:rounded-lg transition-all duration-300 ease-linear ${
                isActive
                  ? "lg:border-b-4 lg:border-[#8F3FA9] bg-[#8F3FA9] text-white lg:text-black lg:bg-transparent"
                  : "hover:border-b-4 border-[#8F3FA9]"
              }`
            }
            onClick={hideMenu}
          >
            Call for Papers
          </NavLink>
          <span
            className={`block py-2 px-4 max-lg:rounded-lg transition-all duration-300 ease-linear ${
              showModal
                ? "lg:border-b-4 lg:border-[#8F3FA9] bg-[#8F3FA9] text-white lg:text-black lg:bg-transparent"
                : "hover:border-b-4 border-[#8F3FA9]"
            }`}
            onClick={() => {
              handleCollaborateClick();
              hideMenu();
            }}
          >
            Collaborate
          </span>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `block py-2 px-4 max-lg:rounded-lg transition-all duration-300 ease-linear ${
                isActive
                  ? "lg:border-b-4 lg:border-[#8F3FA9] bg-[#8F3FA9] text-white lg:text-black lg:bg-transparent"
                  : "hover:border-b-4 border-[#8F3FA9]"
              }`
            }
            onClick={hideMenu}
          >
            Blog
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block py-2 px-4 max-lg:rounded-lg transition-all duration-300 ease-linear ${
                  isActive
                    ? "lg:border-b-4 lg:border-[#8F3FA9] bg-[#8F3FA9] text-white lg:text-black lg:bg-transparent"
                    : "hover:border-b-4 border-[#8F3FA9]"
                }`
              }
              onClick={hideMenu}
            >
              Profile
            </NavLink>
          )}
        </nav>

        {isAuthenticated ? (
          <div className="relative">
            <FaUserCircle
              className="text-[42px] max-sm:text-[40px] text-[#8F3FA9] cursor-pointer"
              onClick={toggleDropdown}
            />
            <div
              className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg text-gray-800 transition-all duration-300 ease-in-out transform ${
                showDropdown
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <NavLink
                to="/edit-profile"
                className="block px-4 py-2 text-[#8F3FA9] hover:bg-gray-100"
                onClick={() => {
                  hideMenu();
                  toggleDropdown();
                }}
              >
                Update Profile
              </NavLink>
              <NavLink
                to="/create-blog"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  hideMenu();
                  toggleDropdown();
                }}
              >
                Create Blog
              </NavLink>
              <NavLink
                to="/fetch-blog"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  hideMenu();
                  toggleDropdown();
                }}
              >
                Fetch My Blog
              </NavLink>
              <button
                className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                onClick={() => {
                  toggleDropdown();
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div
            className="text-[16px] font-bold bg-[#8F3FA9] py-2 px-6 text-white rounded-lg cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        )}
      </div>

      {/* Modal for Login or Sign Up */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please log in or create an account to collaborate.
            </p>
            <div className="flex justify-between gap-4">
              <button
                className="w-full bg-[#8F3FA9] text-white py-2 rounded-lg"
                onClick={() => {
                  setShowModal(false);
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="w-full bg-gray-300 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
