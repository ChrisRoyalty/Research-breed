import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import show/hide icons
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Logo from "../../assets/logo.png"; // Update path accordingly

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isVerificationEmailResent, setIsVerificationEmailResent] =
    useState(false);
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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
        `${process.env.REACT_APP_API_BASE_URL}/api/admin-login`,
        { email, password }
      );

      if (response.data.success) {
        setMessage("Login successful!");
        sessionStorage.setItem("authToken", response.data.data.token);
        navigate("/admin");
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleError = (message) => {
    if (message.includes("not verified")) {
      setError(
        "Your account is not verified. Please check your email for the verification link."
      );
    } else {
      setError("Login failed: " + (message || "An unknown error occurred."));
    }
  };

  const resendVerificationEmail = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/resend-verification`,
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
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full h-fit py-[10vh] lg:h-screen bg-black flex justify-center items-center">
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
            <h3 className="text-[28px] sm:text-[35px]">Admin Login</h3>
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[60px] w-full bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </button>
            </div>

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
              {!isVerificationEmailResent &&
                error.includes("not verified") &&
                (isResending ? (
                  <div className="loader text-center mt-2 text-[#8F3FA9] font-bold">
                    <ClipLoader size={25} color="#8F3FA9" />
                  </div>
                ) : (
                  <button
                    onClick={resendVerificationEmail}
                    className="bg-[#8F3FA9] px-4 py-2 text-white rounded-xl border-none mx-4"
                  >
                    Resend Verification Email
                  </button>
                ))}
            </div>
          )}

          {message && (
            <div className="message text-center text-[#8F3FA9]">{message}</div>
          )}

          <footer className="flex items-center sm:mt-8 mt-4">
            <div className="w-full flex max-sm:flex-col max-sm:text-center gap-2 justify-between">
              <Link to="/create-account">Don't have an Account?</Link>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
