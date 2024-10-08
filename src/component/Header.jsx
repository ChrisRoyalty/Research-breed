import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const [toggleMenu, setToggleMenu] = useState("hidden");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
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

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleCollaborateClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
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
              `block py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#8F3FA9] text-white"
                  : "hover:bg-[#8F3FA9] hover:text-white"
              }`
            }
            onClick={hideMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#8F3FA9] text-white"
                  : "hover:bg-[#8F3FA9] hover:text-white"
              }`
            }
            onClick={hideMenu}
          >
            About us
          </NavLink>
          <NavLink
            to="/publications"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#8F3FA9] text-white"
                  : "hover:bg-[#8F3FA9] hover:text-white"
              }`
            }
            onClick={hideMenu}
          >
            Publications
          </NavLink>
          <button
            className="block py-2 px-4 rounded-lg transition-colors hover:bg-[#8F3FA9] hover:text-white"
            onClick={() => {
              hideMenu();
              handleCollaborateClick();
            }}
          >
            Collaborate
          </button>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#8F3FA9] text-white"
                  : "hover:bg-[#8F3FA9] hover:text-white"
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
                `block py-2 px-4 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#8F3FA9] text-white"
                    : "hover:bg-[#8F3FA9] hover:text-white"
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
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  hideMenu();
                  toggleDropdown();
                }}
              >
                Edit Profile
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
          <div className="relative">
            <div
              className="text-[16px] font-bold bg-[#8F3FA9] py-2 px-6 text-white rounded-lg cursor-pointer"
              onClick={toggleLoginDropdown}
            >
              Login
            </div>

            {showLoginDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg text-gray-800">
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    hideMenu();
                    toggleLoginDropdown();
                    navigate("/login");
                  }}
                >
                  User Login
                </button>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    hideMenu();
                    toggleLoginDropdown();
                    navigate("/admin-login");
                  }}
                >
                  Admin Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
