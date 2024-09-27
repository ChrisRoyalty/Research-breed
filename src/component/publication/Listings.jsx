import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Publications from "./Publications";
import ResearchBtn from "../ResearchBtn";

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Dummy Filter Change Handler - You would replace this with actual filters
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // This could be a category or other filter criteria
  };

  return (
    <section className="bg-[#F8E8FE] w-full h-fit pt-14 flex flex-col justify-center items-center">
      <div className="w-[90%] md:w-[80%]">
        <div className="publications flex justify-between max-sm:items-center gap-2">
          <h4 className="md:text-[22px] text-[15px] font-bold">
            Publication Listings
          </h4>
          <button className="bg-[#8F3FA9] px-4 sm:px-8 h-[60px] text-white rounded-[30px]">
            Research with AI
          </button>
        </div>
        {/* Search and Filter Components */}
        <div className="search-filter-container grid grid-cols-2 md:gap-[150px] sm:gap-8 gap-4 h-[100px] sm:h-[150px] my-8">
          <div className="search border-[1px] border-black flex justify-between items-center px-4 sm:px-12 rounded-2xl shadow-lg gap-4 cursor-pointer">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for publication"
              className="w-full h-[50px] outline-none text-[18px]"
            />
            <FaSearch className="text-[30px]" />
          </div>
          <div
            className="filter border-[1px] border-black flex justify-between items-center px-4 sm:px-12 rounded-2xl shadow-lg gap-4 cursor-pointer"
            onClick={() => handleFilterChange("Your Filter Criteria")}
          >
            <h4>FILTERS</h4>
            <IoIosArrowDown className="text-[35px] font-bold" />
          </div>
        </div>

        {/* Pass searchQuery and selectedFilter to Publications */}
        <Publications
          searchQuery={searchQuery}
          selectedFilter={selectedFilter}
        />
      </div>
      <ResearchBtn />
    </section>
  );
};

export default Listings;
