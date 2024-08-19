import React from "react";
import Logo from "../assets/logo.png";
function Login() {
  return (
    <div className="w-full h-screen bg-purple-900 flex justify-center items-center">
      <div className="md:w-[45%] h-fit bg-[#F8E8FE] p-16 shadow-lg">
        <div className="log">
          <img
            src={Logo}
            alt="Research-breed Logo"
            className="w-[60px] h-[60px]"
          />
          <div className="welcomeNote mt-[25px]">
            <h3 className="text-[35px]">Welcome back</h3>
            <p className="text-slate-700 text-[18px]">
              Login now to access your account
            </p>
          </div>
          <form className="flex flex-col gap-4 mt-6">
            <input
              type="text"
              className="h-[60px] bg-transparent border-b-[1px] border-gray-500 outline-none text-gray-500 text-[18px]"
              placeholder="Email Address"
            />
            <input
              type="text"
              className="h-[60px] bg-transparent border-b-[1px] border-gray-500 outline-none text-gray-500 text-[18px]"
              placeholder="Email Address"
            />
            <button className="bg-purple-900 h-[60px] text-white rounded-xl hover:bg-purple-800/80 text-[20px] mt-4">
              Login
            </button>
          </form>
          <footer className="flex justify-center md:justify-end items-center mt-8">
            <div className="flex gap-2 justify-center">
              <a href="">Do not have access ?</a>
              <a href="">Make payment</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
