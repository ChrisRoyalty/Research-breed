import React from "react";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const CreateAccount = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    registerUser();
  };
  const registerUser = () => {
    fetch("http://localhost/apps_api/research-breed/public/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Parsed JSON data:", data);

          setMessage("Account created successfully!");

          setError("");
          console.log("Account created successfully!");
        } else {
          setError("Failed to create account: " + data.message);
          setMessage("");
          console.error("Error: Failed to create account - " + data.message);
        }
      })
      .catch((error) => {
        setError("Error: " + error.message);
        setMessage("");
      });
  };

  return (
    <div className="pt-[18vh] pb-[7vh] w-full h-fit flex justify-center items-center bg-purple-950">
      <div className="md:w-[45%] w-[90%] bg-white sm:p-10 p-8 relative ">
        <div className="google_facebook flex flex-col items-center justify-center gap-4">
          <div className="lockIcon  bg-[#8F3FA9] rounded-full w-fit p-4  absolute top-[-25px] items-center ">
            <FaLock className="text-white text-[30px]" />
          </div>
          <h4 className="text-[24px] font-bold">Create an Account</h4>
          <div className="socials flex gap-8">
            <FcGoogle className="text-[40px] border-[1px] border-black rounded-full p-2" />
            <FaFacebook className="text-[40px] border-[1px] border-black rounded-full p-2 text-blue-600" />
          </div>
          <Link>Or use your Email to register</Link>
        </div>
        <form className="flex flex-col gap-4 sm:gap-4 sm:mt-6 mt-4">
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
          <div className="w-full flex flex-col gap-2">
            <label className="rounded-[30px] font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-[30px] h-[60px] bg-transparent border-b-[1px] border-gray-700 outline-none text-gray-500 text-[18px]"
              placeholder="Enter your password"
            />
          </div>

          <footer className="flex flex-col justify-center items-center sm:mt-8 mt-4 gap-4">
            <button
              className="bg-[#8F3FA9] h-[65px] w-full rounded-[30px] text-white"
              onSubmit={handleSubmit}
            >
              Sign up
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
    </div>
  );
};

export default CreateAccount;
