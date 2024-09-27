import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaLinkedin, FaSquareXTwitter } from "react-icons/fa";
import axios from "axios";

const Collaborators = () => {
  const [collaborationData, setCollaborationData] = useState([]);

  useEffect(() => {
    const fetchCollaborationData = async () => {
      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/collaborate"
        );
        setCollaborationData(response.data.data); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching collaboration data:", error);
      }
    };

    fetchCollaborationData();
  }, []);

  return (
    <div className="w-full h-fit flex justify-center items-center">
      <div className="md:w-[80%] w-[90%]">
        {collaborationData.map((call, index) => (
          <div
            key={index}
            className="text-center border-[30px] border-[#300937] rounded-[30px] py-8 max-sm:mb-10 mb-16 shadow-lg "
          >
            <img
              src={call.image}
              alt={call.name}
              className="profileImg rounded-full m-auto w-[180px] h-[180px]"
            />
            <div className="m-auto">
              <div className="items-center w-fit m-auto max-[400px]:px-8 pl-12 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Name
                </h4>
                <p className="w-fit">{call.name}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Email
                </h4>
                <p className="max-md:w-[100px] w-fit break-words">
                  {call.email}
                </p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Location
                </h4>
                <p className="w-fit">{call.location}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Sex
                </h4>
                <p className="w-fit">{call.sex}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Phone Number
                </h4>
                <p className="w-fit">{call.phoneNumber}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Occupation
                </h4>
                <p className="w-fit">{call.occupation}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Interest
                </h4>
                <p className="w-fit">{call.interest}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Number Of Publications
                </h4>
                <p className="w-fit">{call.numOfPub}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Institution
                </h4>
                <p className="w-fit">{call.institution}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Field Of Study
                </h4>
                <p className="w-fit">{call.fieldOfStudy}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]">
                  Degree
                </h4>
                <p className="w-fit">{call.degree}</p>
              </div>
              <div className="items-center w-fit m-auto pl-12 max-[400px]:px-8 grid grid-cols-2 justify-center text-start max-[450px]:pl-8 max-[700px]:gap-[50px] gap-[200px] mt-6">
                <h4 className="font-bold px-0 max-[700px]:w-[150px] w-[200px]"></h4>
                <div className="flex max-sm:gap-2 gap-4 items-center">
                  <a href="#" className="hover:text-blue-500 text-[22px]">
                    <FaFacebookSquare />
                  </a>
                  <a href="#" className="hover:text-blue-500 text-[22px]">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="hover:text-blue-500 text-[22px]">
                    <FaSquareXTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborators;
