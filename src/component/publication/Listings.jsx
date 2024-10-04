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
      <Publications searchQuery={searchQuery} selectedFilter={selectedFilter} />
    </section>
  );
};

export default Listings;
