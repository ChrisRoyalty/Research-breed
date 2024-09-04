import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa"; // Import a user icon
import "../../src/css/header.css";
function Header() {
  const [toggleMenu, setToggleMenu] = useState("hidden");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  const displayMenu = () => {
    setToggleMenu(toggleMenu === "hidden" ? "flex" : "hidden");
  };

  const hideMenu = () => {
    setToggleMenu("hidden");
  };

  // Check for auth token in sessionStorage on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="w-full h-[12vh] bg-white fixed top-0 flex justify-center items-center shadow-lg z-50">
      <div className="w-[90%] sm:w-[80%] flex justify-between items-center">
        <div className="menu text-[48px] lg:hidden" onClick={displayMenu}>
          <AiOutlineMenu />
        </div>
        <div className="logo z-50">
          <img src={Logo} alt="Logo" className="w-[56px] h-[40px]" />
        </div>
        <nav
          className={`max-lg:py-10 fixed top-[13vh] lg:w-fit w-[90%] lg:h-fit h-[85vh] lg:bg-transparent bg-white lg:shadow-none shadow-lg left-0 lg:p-0 px-[10%] lg:static ${toggleMenu} lg:flex items-start lg:flex-row flex-col lg:items-center gap-8 text-[16px] font-bold`}
        >
          <NavLink
            to="/"
            className="lg:bg-transparent max-lg:hover:bg-[#8F3FA9] lg:w-fit w-full lg:hover:p-0 hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
            onClick={hideMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
            onClick={hideMenu}
          >
            About us
          </NavLink>
          <NavLink
            to="/publications"
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
            onClick={hideMenu}
          >
            Publications
          </NavLink>
          <NavLink
            to="/collaboration"
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
            onClick={hideMenu}
          >
            Collaborate
          </NavLink>
          <NavLink
            to="/blog"
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
            onClick={hideMenu}
          >
            Blog
          </NavLink>

          {/* Conditionally render the Profile link based on sessionStorage */}
          {isAuthenticated && (
            <NavLink
              to="/profile"
              className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
              onClick={hideMenu}
            >
              Profile
            </NavLink>
          )}
        </nav>

        {/* Conditional rendering for login button or user icon */}
        {isAuthenticated ? (
          <div className="relative">
            <FaUserCircle
              className="text-[42px] text-[#8F3FA9] cursor-pointer blinking-icon" // Added blinking-icon class
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
                Fetch Blog
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="text-[16px] font-bold bg-[#8F3FA9] py-2 px-6 text-white rounded-lg">
            <NavLink to="/login" onClick={hideMenu}>
              Login
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
