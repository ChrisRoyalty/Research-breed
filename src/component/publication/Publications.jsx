import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import ResearchBtn from "../ResearchBtn";

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center my-4">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8F3FA9]"></div>
  </div>
);

// Modal Component for Errors
const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
      <h2 className="text-lg font-bold text-red-600 mb-4">Error</h2>
      <p className="text-sm text-gray-600 mb-4">{message}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
);

// Publication Component
const Publication = ({ publication }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-bold text-gray-800">{publication.title}</h3>
      <p className="text-sm text-gray-500">{publication.category}</p>
      <p className="text-xs text-gray-400 mb-2">
        {publication.date_of_publication}
      </p>
      <div className="text-sm text-gray-700 mb-4">
        <div
          dangerouslySetInnerHTML={{
            __html: isExpanded
              ? publication.body
              : `${publication.body.substring(0, 150)}...`,
          }}
        />
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm text-[#8F3FA9] font-bold"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Predefined filter options
  const filterOptions = [
    { label: "All", value: "" },
    { label: "Journal", value: "journal" },
    { label: "Research Project", value: "research-project" },
    { label: "Conference Paper", value: "conference-paper" },
  ];

  // Fetch publications list when the page loads
  useEffect(() => {
    fetchPublications();
  }, []);

  // Fetch default publication list
  const fetchPublications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://dev-api.researchbreed.com/api/publication-list"
      );
      setPublications(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching publications:", error);
      setError("Failed to load publications. Please try again.");
      setLoading(false);
    }
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear Search Input
  const handleClearSearch = () => {
    setSearchQuery("");
    fetchPublications(); // Fetch all publications when search is cleared
  };

  // Trigger search API when user clicks the search icon
  const handleSearchClick = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("q", searchQuery);

    try {
      const response = await axios.post(
        `https://dev-api.researchbreed.com/api/search-publication`,
        formData
      );
      setPublications(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching publications:", error);
      setError("Failed to perform search. Please try again.");
      setLoading(false);
    }
  };

  // Handle Filter Selection and trigger filter API
  const handleFilterSelect = async (filterLabel, filterValue) => {
    setSelectedFilter(filterLabel);
    setIsFilterOpen(false); // Close dropdown after selection
    setLoading(true);

    const formData = new FormData();
    formData.append("filter", filterValue);

    try {
      const response = await axios.post(
        `https://dev-api.researchbreed.com/api/filter-publication`,
        formData
      );
      if (response.data.success) {
        setPublications(response.data.data);
      } else {
        setError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error filtering publications:", error);
      setError("Failed to filter publications. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F2D4F5] w-full h-fit pt-14 flex flex-col justify-center items-center">
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
        <div className="search-filter-container flex flex-col sm:flex-row justify-between items-center sm:gap-12 gap-4 my-8">
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for publications..."
              className="w-full h-[50px] pl-4 pr-12 border-[1px] border-gray-300 rounded-2xl shadow-lg focus:outline-none focus:border-[#8F3FA9] transition duration-300 ease-in-out"
            />
            <FaSearch
              className="absolute right-4 top-3 text-gray-400 cursor-pointer"
              onClick={handleSearchClick}
            />
            {searchQuery && (
              <FaTimes
                className="absolute right-12 top-3 text-gray-400 cursor-pointer"
                onClick={handleClearSearch}
              />
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-1/3">
            <div
              className="flex justify-between items-center px-4 h-[50px] bg-white border-[1px] border-gray-300 rounded-2xl shadow-lg cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <h4>{selectedFilter || "FILTERS"}</h4>
              <IoIosArrowDown className="text-[25px]" />
            </div>

            {/* Filter Dropdown List */}
            {isFilterOpen && (
              <div className="absolute w-full bg-white border border-gray-200 mt-2 rounded-xl shadow-lg max-h-[200px] overflow-y-auto z-10">
                {filterOptions.map((option, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleFilterSelect(option.label, option.value)
                    }
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Display Publications */}
        <div>
          {loading ? (
            <Spinner />
          ) : publications.length > 0 ? (
            publications.map((publication) => (
              <Publication key={publication.slug} publication={publication} />
            ))
          ) : (
            <p className="text-center text-gray-500">No publications found</p>
          )}
        </div>

        {/* Error Modal */}
        {error && <Modal message={error} onClose={() => setError("")} />}
      </div>
    </section>
  );
};

export default Listings;
