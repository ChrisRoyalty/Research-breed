import React, { useState, useEffect } from "react";
import ReviewCard from "../home/ReviewCard.jsx";
import { FaStar } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";

const Reviews = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const reviews = [
    {
      name: "Jane Doe",
      title: "Researcher in Biology",
      image: "image 4.png",
      review:
        "As a biologist conducting research in the field, I have found, this platform to be an invaluable resource. The AI-integrated tool has saved me countless hours by efficiently summarizing relevant papers and identifying key insights. Additionally, the collaborative space has streamlined the process of working with other researchers on research papers. I highly recommend this platform to anyone in academia looking to enhance their research workflow.",
    },
    {
      name: "Michael Brown",
      title: "Academic Librarian",
      image: "image 5.png",
      review:
        "I work as an academic librarian, and I frequently recommend this platform to researchers and students at our institution. The educational resources and workshops offered on the platform provide valuable guidance on research writing, publishing, and academic career development. I've seen firsthand how these resources have helped our students improve their research skills and succeed in their academic endeavours. This platform is an essential resource for anyone navigating the world of scholarly communication.",
    },
    {
      name: "Sarah Johnson",
      title: "Undergraduate Student in History",
      image: "image 6.png",
      review:
        "Even as an undergraduate student, I've found this platform to be incredibly helpful for my research projects. The collaborative space connected me with a mentor who provided invaluable guidance on my senior thesis project. The research collaboration forums have also allowed me to connect with other students and exchange ideas on historical topics. With its diverse range of features catering to researchers at all levels, this platform has been a valuable asset to my academic journey.",
    },
    {
      name: "David Liu",
      title: "Independent Researcher",
      image: "image 7.png",
      review:
        "As an independent researcher, I appreciate the flexibility and support offered by this platform. The research impact tracking tools have allowed me to monitor the reach and influence of my work, gain more visibility. With its customizable features and user-friendly interface, this platform has become my go-to resource for conducting research.",
    },
    {
      name: "Alex Nguyen",
      title: "PhD Candidate in Environmental Science",
      image: "image 8.png",
      review:
        "Thanks to this platform's real-time collation and updating of current journals, I can access the most recent studies and developments in my field instantly. The seamless integration of collaboration tools has also facilitated productive partnerships with peers, enhancing the quality and scope of my research. With its commitment to supporting researchers and amplifying their visibility, this platform has become an indispensable asset in my academic journey.",
    },
    {
      name: "Maria Gomez",
      title: "Early Career Scholar in Sociology",
      image: "girl.png",
      review:
        "What truly sets this platform apart is its exceptional support system. The team behind it is responsive, knowledgeable, and genuinely invested in the success of its users. Whether I need technical assistance or advice on navigating the publishing process, I can always count on",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <div className="bg-gradient-to-r from-[#30093D] to-[#30091A] py-8 flex justify-center items-center">
      <div className="sm:w-[80%] w-[90%]">
        <div className="flex justify-between items-center  text-white my-12">
          <div className="reviews">
            <h4 className="text-[20px]">Reviews</h4>
            <div className="flex items-center gap-2 text-white max-sm:flex-col max-sm:items-start">
              <div className="flex items-center gap-2">
                <span>4.9</span>
                <div className="stars flex">
                  <FaStar className="text-white" />
                  <FaStar className="text-white" />
                  <FaStar className="text-white" />
                  <FaStar className="text-white" />
                  <FaStar className="text-gray-500" />
                </div>
              </div>
              <span>Over 1000 reviews</span>
            </div>
          </div>
          <div className="w-fit write-reviews bg-white py-3 pl-4 max-sm:px-2 rounded-lg text-black flex items-center gap-4 max-sm:w-[150px]">
            <RiPencilFill className="text-[25px]" />
            <input
              type="text"
              placeholder="Write a review"
              className="outline-none w-[70%]"
            />
          </div>
        </div>
        {isMobile ? (
          <div className="relative">
            <div className="flex justify-center">
              <ReviewCard {...reviews[currentIndex]} />
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2"
            >
              &#8592;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2"
            >
              &#8594;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
