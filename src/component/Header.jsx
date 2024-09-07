import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "../../src/css/header.css";

function Header() {
  const [toggleMenu, setToggleMenu] = useState("hidden");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate(); // For navigation

  // Check for auth token in sessionStorage on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  // ResizeObserver logic to observe header resizing
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log("Header size changed:", entry.contentRect);
      }
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        resizeObserver.disconnect();
      }
    };
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

  // Handle user logout
  const handleLogout = () => {
    sessionStorage.removeItem("authToken"); // Clear the token from sessionStorage
    setIsAuthenticated(false); // Update state to reflect logged-out status
    navigate("/login"); // Redirect user to login page
  };

  return (
    <header
      ref={headerRef}
      className="w-full h-[12vh] bg-white fixed top-0 flex justify-center items-center shadow-lg z-50"
    >
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

        {/* Conditional rendering for login/logout button or user icon */}
        {isAuthenticated ? (
          <div className="relative">
            <FaUserCircle
              className="text-[42px] text-[#8F3FA9] cursor-pointer blinking-icon"
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
                Fetch Blog
              </NavLink>
              <button
                className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                onClick={() => {
                  toggleDropdown();
                  handleLogout(); // Trigger logout
                }}
              >
                Logout
              </button>
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
