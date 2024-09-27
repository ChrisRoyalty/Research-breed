import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import PubSearchModal from "../PubSearchModal"; // Import the Modal component

const Publications = ({ searchQuery, selectedFilter }) => {
  const [publications, setPublications] = useState([]);
  const [expandedSlugs, setExpandedSlugs] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Fetch publications from API
  const fetchPublications = async () => {
    setLoading(true);
    try {
      let url = "https://dev-api.researchbreed.com/api/publication-list";
      let data = {};

      // Determine the request type based on input
      if (searchQuery) {
        url = "https://dev-api.researchbreed.com/api/search-publication";
        data = { q: searchQuery }; // Required field for search
      } else if (selectedFilter) {
        url = "https://dev-api.researchbreed.com/api/filter-publication";
        data = { filter: selectedFilter }; // Data for filtering
      }

      // POST request for search and filter, GET for publication list
      const response =
        searchQuery || selectedFilter
          ? await axios.post(url, data)
          : await axios.get(url);

      if (response.data.success) {
        setPublications(response.data.data);
        setShowModal(true); // Show modal on successful response
        setTimeout(() => {
          setShowModal(false); // Hide modal after 3 seconds
        }, 3000);
      } else {
        setError("Failed to retrieve publications.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [searchQuery, selectedFilter]); // Re-fetch publications when searchQuery or selectedFilter changes

  // Toggle Read More/Less for a specific publication
  const toggleReadMore = (slug) => {
    setExpandedSlugs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

  // Group publications by category
  const groupedPublications = publications.reduce((acc, publication) => {
    const category = publication.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(publication);
    return acc;
  }, {});

  return (
    <div className="w-full h-fit py-8 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Publications</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#8F3FA9]"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          Object.keys(groupedPublications).map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 border-b-2 border-[#8F3FA9] inline-block">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="grid gap-8">
                {groupedPublications[category].map((publication) => (
                  <div
                    key={publication.slug}
                    className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold underline">
                        {publication.title}
                      </h4>
                      <div className="flex space-x-3 text-xl text-[#8F3FA9]/80">
                        <FaFacebook className="cursor-pointer hover:text-[#8F3FA9]" />
                        <FaTwitter className="cursor-pointer hover:text-[#8F3FA9]" />
                        <FaLinkedin className="cursor-pointer hover:text-[#8F3FA9]" />
                      </div>
                    </div>

                    <p className="text-gray-600 mb-2">
                      Published by{" "}
                      <span className="font-semibold">
                        {publication.publisher}
                      </span>{" "}
                      on{" "}
                      {new Date(
                        publication.date_of_publication
                      ).toLocaleDateString()}
                      .
                    </p>

                    <div className="text-gray-700 leading-7 mb-4">
                      {expandedSlugs.has(publication.slug) ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: publication.body }}
                        />
                      ) : (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `${publication.body.slice(0, 150)}...`,
                          }}
                        />
                      )}
                    </div>

                    <button
                      onClick={() => toggleReadMore(publication.slug)}
                      className="bg-[#8F3FA9] text-white px-4 py-2 rounded-full hover:bg-[#8F3FA9]/80 transition-colors"
                    >
                      {expandedSlugs.has(publication.slug)
                        ? "Read Less"
                        : "Read More"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show Modal on Successful Fetch */}
      {showModal && (
        <PubSearchModal
          message="Publications retrieved successfully!"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Publications;
