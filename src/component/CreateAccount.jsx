import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for show/hide password
import axios from "axios";

// Modal component
const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#8F3FA9]">Success!</h2>
        <p>{message}</p>
        <button
          className="mt-4 bg-[#8F3FA9] text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CreateAccount = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    registerUser();
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/create-account`,
        {
          firstname,
          lastname,
          email,
          password,
        }
      );

      const data = response.data;

      if (data.success) {
        setMessage(data.message); // Use the exact message from the response
        setError("");
        setShowModal(true); // Show modal on success
      } else {
        setError("Failed to create account: " + data.message);
        setMessage("");
      }
    } catch (error) {
      if (error.response) {
        setError("Error: " + error.response.data.message);
      } else if (error.request) {
        setError("Error: No response from server.");
      } else {
        setError("Error: " + error.message);
      }
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[18vh] pb-[7vh] w-full h-fit flex justify-center items-center bg-purple-950">
      <div className="md:w-[45%] w-[90%] bg-white sm:p-10 p-8 relative ">
        <div className="google_facebook flex flex-col items-center justify-center gap-4">
          <div className="lockIcon bg-[#8F3FA9] rounded-full w-fit p-4 absolute top-[-25px] items-center">
            <FaLock className="text-white text-[30px]" />
          </div>
          <h4 className="text-[24px] font-bold">Create an Account</h4>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
          <div className="socials flex gap-8">
            <FcGoogle className="text-[40px] border-[1px] border-black rounded-full p-2" />
            <FaFacebook className="text-[40px] border-[1px] border-black rounded-full p-2 text-blue-600" />
          </div>
          <Link className="text-red-700">Or use your Email to register</Link>
        </div>
        <form
          className="flex flex-col gap-4 sm:gap-4 sm:mt-6 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col gap-2">
            <label className="rounded-[30px] font-bold">First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="rounded-[30px] h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your first name"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="rounded-[30px] font-bold">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="rounded-[30px] h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your last name"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="rounded-[30px] font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-[30px] h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <label className="rounded-[30px] font-bold">Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between password and text
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-[30px] h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your password"
            />
            <div
              className="absolute right-4 top-[52px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {message && (
            <div className="message text-center text-[#8F3FA9]">{message}</div>
          )}
          <footer className="flex flex-col justify-center items-center sm:mt-8 mt-4 gap-4">
            <button
              type="submit"
              className={`bg-[#8F3FA9] h-[65px] w-full rounded-[30px] text-white flex justify-center items-center ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Sign up"
              )}
            </button>
            <div className="w-full flex max-sm:flex-col max-sm:text-center gap-2 justify-between">
              <Link className="font-bold text-[18px]" to="/login">
                Already Have an Account?
              </Link>
              <Link className="font-bold text-[18px]" to="/login">
                Login
              </Link>
            </div>
          </footer>
        </form>
      </div>
      {showModal && (
        <SuccessModal message={message} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CreateAccount;
