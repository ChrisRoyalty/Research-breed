import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const FetchPublication = () => {
  const [publications, setPublications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      const token = sessionStorage.getItem("token");
      console.log("Token:", token); // Check the token

      try {
        const response = await axios.get(
          "https://dev-api.researchbreed.com/api/admin/publications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setPublications(response.data.data);
        } else {
          console.error("Response:", response.data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch publications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center p-4 md:p-10 lg:p-16 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Publications
      </h2>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {publications.length === 0 ? (
          <p className="text-gray-600">No publications available.</p>
        ) : (
          publications.map((publication) => (
            <div key={publication.slug} className="mb-4 border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {publication.title}
              </h3>
              <p className="text-gray-600">Category: {publication.category}</p>
              <p className="text-gray-600">
                Publisher: {publication.publisher}
              </p>
              <p className="text-gray-600">
                Date of Publication: {publication.date_of_publication}
              </p>
              <div className="mt-2">
                <h4 className="font-medium">Body:</h4>
                <p className="text-gray-700">{publication.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FetchPublication;
