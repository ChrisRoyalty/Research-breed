import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineCancelPresentation } from "react-icons/md";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
  const navigate = useNavigate(); // Using useNavigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationEmailResent, setIsVerificationEmailResent] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/login",
        { email, password }
      );

      console.log("Login Response:", response);

      if (response.data.success) {
        sessionStorage.setItem("authToken", response.data.data.token);
        setMessage("Login successful!");
        navigate("/profile"); // Use navigate to redirect
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      handleError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleError = (error) => {
    console.error("Error object:", error); // Log the entire error object
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response data:", error.response.data);
      setError(error.response.data.message || "Login failed.");
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Request data:", error.request);
      setError("No response from the server. Please try again later.");
    } else {
      // Something happened in setting up the request
      console.error("Error message:", error.message);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        "https://dev-api.researchbreed.com/api/resend-verification",
        { email }
      );
      if (response.data.success) {
        setIsVerificationEmailResent(true);
        setMessage("Verification email resent! Please check your inbox.");
      } else {
        setError(
          "Failed to resend verification email: " + response.data.message
        );
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setError(
        "Failed to resend verification email: " +
          (error.response?.data?.message ||
            "An unexpected error occurred. Please try again later.")
      );
    }
  };

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
          <form
            className="flex flex-col gap-4 sm:gap-4 sm:mt-6 mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your email"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#8F3FA9] h-[60px] text-white rounded-xl hover:bg-[#8F3FA9]/80 text-[20px] mt-4"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          {isLoading && (
            <div className="loader text-center mt-2 text-[#8F3FA9] font-bold">
              <ClipLoader size={50} color="#8F3FA9" />
            </div>
          )}
          {error && (
            <div className="error text-red-700 text-center mt-2 leading-[40px]">
              {error}
              {!isVerificationEmailResent && error.includes("not verified") && (
                <button
                  onClick={resendVerificationEmail}
                  className="bg-[#8F3FA9] px-4 py-2 text-white rounded-xl border-none mx-4"
                >
                  Resend Verification Email
                </button>
              )}
            </div>
          )}
          {message && (
            <div className="message text-center text-[#8F3FA9]">{message}</div>
          )}
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
