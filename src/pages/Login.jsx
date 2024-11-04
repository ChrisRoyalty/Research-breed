import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.png";
import ClipLoader from "react-spinners/ClipLoader";
import {
  MdOutlineCancelPresentation,
  MdCheckCircle,
  MdError,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md"; // Importing success/error icons and visibility icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isSuccess, setIsSuccess] = useState(false); // To control which icon to show
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated and navigate to profile
    const token = localStorage.getItem("authToken");

    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/validate-token`, {
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage("");
  //   setError("");

  //   if (!validateEmail(email)) {
  //     setError("Please enter a valid email address.");
  //     return;
  //   }

  //   if (password.length < 6) {
  //     setError("Password must be at least 6 characters long.");
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_BASE_URL}/api/login`,
  //       { email, password },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       localStorage.setItem("authToken", response.data.data.token);
  //       setMessage("Login successful!");
  //       setIsSuccess(true); // Trigger success icon
  //       setShowModal(true); // Show the modal
  //       setTimeout(() => {
  //         setShowModal(false); // Hide modal after 3 seconds
  //         navigate("/");
  //       }, 3000);
  //     } else {
  //       setError("Login failed: " + response.data.message);
  //       setIsSuccess(false); // Trigger error icon
  //       setShowModal(true); // Show the modal
  //       setTimeout(() => setShowModal(false), 3000); // Hide after 3 seconds
  //     }
  //   } catch (error) {
  //     setError(
  //       error.response?.data?.message ||
  //         "An unexpected error occurred. Please try again later."
  //     );
  //     setIsSuccess(false); // Trigger error icon
  //     setShowModal(true); // Show the modal
  //     setTimeout(() => setShowModal(false), 3000); // Hide after 3 seconds
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        `${process.env.REACT_APP_API_BASE_URL}/api/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.data.token);
        setMessage(response.data.message || "Login successful!"); // Set the API message
        setIsSuccess(true); // Trigger success icon
        setShowModal(true); // Show the modal
        setTimeout(() => {
          setShowModal(false); // Hide modal after 3 seconds
          navigate("/"); // Navigate to the desired page after login
        }, 3000);
      } else {
        setError("Login failed: " + response.data.message);
        setIsSuccess(false); // Trigger error icon
        setShowModal(true); // Show the modal
        setTimeout(() => setShowModal(false), 3000); // Hide after 3 seconds
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
      setIsSuccess(false); // Trigger error icon
      setShowModal(true); // Show the modal
      setTimeout(() => setShowModal(false), 3000); // Hide after 3 seconds
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center relative">
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[60px] w-full bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
                placeholder="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-gray-500" />
                ) : (
                  <MdVisibility className="text-gray-500" />
                )}
              </div>
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

          <footer className="flex items-center sm:mt-8 mt-4">
            <div className="w-full flex max-sm:flex-col max-sm:text-center gap-2 justify-between">
              <Link to="/create-account">Don't have an Account?</Link>
              <a href="">Forgot Password?</a>
            </div>
          </footer>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[80%] md:w-[30%]">
            {isSuccess ? (
              <MdCheckCircle className="text-[#8F3FA9] text-[50px] mx-auto" />
            ) : (
              <MdError className="text-red-500 text-[50px] mx-auto" />
            )}
            <p className="text-center mt-4 text-lg">
              {isSuccess ? message : error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
