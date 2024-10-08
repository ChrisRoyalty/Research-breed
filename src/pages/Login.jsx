import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.png";
import ClipLoader from "react-spinners/ClipLoader"; // Importing spinner

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated and navigate to profile
    const token = localStorage.getItem("authToken");

    if (token) {
      axios
        .get("https://dev-api.researchbreed.com/api/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            navigate("/profile");
          } else {
            localStorage.removeItem("authToken");
          }
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    }
  }, [navigate]);

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
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        sessionStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("authToken", response.data.data.token);
        setMessage("Login successful!");
        navigate("/profile");
      } else {
        setError("Login failed: " + response.data.message);
      }
    } catch (error) {
      setError(
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

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[90%] md:w-[45%] h-fit bg-[#F8E8FE] sm:p-16 p-8 shadow-lg">
        <div className="cancelIcon">
          <Link to="/" className="flex justify-end">
            {/* Cancel Icon */}
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
