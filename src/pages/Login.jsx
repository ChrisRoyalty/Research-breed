import React from "react";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancelPresentation } from "react-icons/md";

function Login() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[90%] md:w-[45%] h-fit bg-[#F8E8FE] sm:p-16 p-8 shadow-lg">
        <div className="cancelIcon">
          <Link to="/" className="flex justify-end">
            <MdOutlineCancelPresentation className="text-[50px] text-[#8F3FA9]" />
          </Link>
        </div>
        <div className="log">
          <Link to="/">
            <img
              src={Logo}
              alt="Research-breed Logo"
              className="w-[60px] h-[60px]"
            />
          </Link>
          <div className="welcomeNote mt-[15px] sm:mt-[25px]">
            <h3 className="text-[28px] sm:text-[35px]">Welcome back</h3>
            <p className="text-slate-700 text-[15px] sm:text-[18px]">
              Login now to access your account
            </p>
          </div>
          <form className="flex flex-col gap-4 sm:gap-4 sm:mt-6 mt-4">
            <input
              type="text"
              required
              className="h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your username"
            />
            <input
              type="password"
              required
              className="h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your password"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id=""
                required
                className="w-[18px] h-[18px]"
              />
              <label htmlFor="">Remember me</label>
            </div>
            <button className="bg-[#8F3FA9] h-[60px] text-white rounded-xl hover:bg-[#8F3FA9]/80 text-[20px] mt-4">
              Login
            </button>
          </form>
          <footer className="flex items-center sm:mt-8 mt-4">
            <div className="w-full flex max-sm:flex-col max-sm:text-center gap-2 justify-between">
              <Link to="/create-account">Don't have an Account?</Link>
              <a href="">Forgot Password?</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
