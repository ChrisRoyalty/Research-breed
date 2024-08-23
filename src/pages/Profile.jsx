import React from "react";
import ProfileImg from "../assets/profileImg.png";
import SubmissionForm from "../component/SubmissionForm";
function Profile() {
  return (
    <div className="pt-[12vh] w-full h-fit flex justify-center items-center">
      <div className="sm:w-[80%] w-[90%]">
        <div className="intro text-center my-8 sm:my-16">
          <h1 className="text-[28px]">Profile Edit</h1>
          <p className="text-[20px]">Fill in your details</p>
        </div>
        <form>
          <div className="profileImg flex justify-center">
            <img src={ProfileImg} alt="Profile Image" />
          </div>
          <div className="personalInfo w-full md:w-[70%] m-auto py-8">
            <h1 className="sm:text-[28px] text-[22px]">Personal Information</h1>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <h3 className="text-[18px] sm:text-[20px]">Name</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Location</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Sex</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Phone Number</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Occupation</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Interest</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">
                Number of Publications
              </h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
            </div>
          </div>
          <div className="personalInfo w-full md:w-[70%] m-auto py-8">
            <h1 className="sm:text-[28px] text-[22px]">Education Section</h1>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <h3 className="text-[18px] sm:text-[20px]">Institution</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Field of study</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Degree</h3>

              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
            </div>
          </div>

          <div className="personalInfo w-full md:w-[70%] m-auto py-8">
            <h1 className="text-[22px] sm:text-[28px]">
              Social Media Links Section
            </h1>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <h3 className="text-[18px] sm:text-[20px]">LinkedIn</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Twitter</h3>
              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
              <h3 className="text-[18px] sm:text-[20px]">Facebook</h3>

              <input
                type="text"
                required
                className="outline-none border-[1px] border-purple-700 rounded-[30px] px-4 h-[35px] sm:h-[40px] "
              />
            </div>
            <div className="btns flex gap-4 pt-12 sm:pt-16 justify-center sm:justify-end">
              <button className="bg-[#8F3FA9] max-sm:w-[50%] sm:px-16 h-[60px] text-white rounded-lg">
                Save
              </button>
              <button className="bg-[#8F3FA9] max-sm:w-[50%] sm:px-16 h-[60px] text-white rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
