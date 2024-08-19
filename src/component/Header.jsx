import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Publications from "../pages/Publications";
import Collabration from "../pages/Collabration";
import Blog from "../pages/Blog";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import { AiOutlineMenu } from "react-icons/ai";

function Header() {
  const [toggleMenu, setToggleMenu] = useState("hidden");
  const displayMenu = () => {
    toggleMenu === "hidden" ? setToggleMenu("flex") : setToggleMenu("hidden");
  };

  return (
    <header className="w-full h-[12vh] bg-white fixed flex justify-center items-center shadow-lg z-50">
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
            element={<Home />}
            className="lg:bg-transparent max-lg:hover:bg-[#8F3FA9] lg:w-fit w-full lg:hover:p-0 hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            element={<About />}
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
          >
            About us
          </NavLink>
          <NavLink
            to="/publications"
            element={<Publications />}
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
          >
            Publications
          </NavLink>
          <NavLink
            to="/collabration"
            element={<Collabration />}
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
          >
            Collaborate
          </NavLink>
          <NavLink
            to="/blog"
            element={<Blog />}
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
          >
            Blog
          </NavLink>
          <NavLink
            to="/profile"
            element={<Profile />}
            className="max-lg:hover:bg-[#8F3FA9] max-lg:w-full max-lg:hover:p-4 max-lg:hover:text-white max-lg:rounded-lg"
          >
            Profile
          </NavLink>
        </nav>
        <div className="text-[16px] font-bold bg-[#8F3FA9] py-2 px-6 text-white rounded-lg">
          <NavLink to="/login" element={<Login />}>
            Login
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
