// RemovePublication.js
import { useState } from "react";
import axios from "axios";

function RemovePublication() {
  const [publicationSlug, setPublicationSlug] = useState("");

  const handleRemovePublication = async () => {
    try {
      await axios.delete(
        `https://dev-api.researchbreed.com/api/admin/publication/${publicationSlug}`
      );
      alert("Publication removed successfully!");
    } catch (error) {
      console.error("Error removing publication:", error);
      alert("Failed to remove publication.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Remove Publication</h2>
      <input
        type="text"
        placeholder="Publication Slug"
        value={publicationSlug}
        onChange={(e) => setPublicationSlug(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={handleRemovePublication}
        className="bg-red-500 text-white p-2 rounded"
      >
        Remove Publication
      </button>
    </div>
  );
}

export default RemovePublication;
