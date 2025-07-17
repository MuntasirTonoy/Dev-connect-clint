import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTags, searchPostsByTag } from "../../Hoocks/Api";

const Search = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: tagOptions = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const popularTags = tagOptions
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  const handleSearch = async (term = searchTerm) => {
    if (!term.trim()) return;

    try {
      const results = await searchPostsByTag(term.trim());
      setSearchResults(results);
    } catch (err) {
      console.error("Search error:", err);
      // Optionally show error to user
      // setError("Failed to search. Please try again.");
    }
  };

  const handleTagClick = (tagValue) => {
    if (!tagValue) return; // prevent undefined bug
    setSearchTerm(tagValue);
    handleSearch(tagValue);
  };

  return (
    <div className="space-y-10" data-aos="fade-down" data-aos-delay="700">
      {/* Input */}
      <div className="flex items-center bg-base-100 rounded-md shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-1 outline-none text-base-content"
        />
        <button
          onClick={() => handleSearch()}
          className="bg-base-content text-base-100 rounded-md px-4 py-2 m-2"
        >
          Search
        </button>
      </div>

      {/* Popular Tags */}
      <div>
        <p className="text-sm mb-2">Popular Right Now:</p>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag.value)}
              className="px-3 py-1 shadow-md bg-base-300 text-sm text-base-content rounded-full hover:bg-base-content hover:text-base-300 transition-all"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search; // ✅ Export here!
