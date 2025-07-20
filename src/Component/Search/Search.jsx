import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTags, searchPostsByTag } from "../../Hoocks/Api";

const Search = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { data: tagOptions = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const popularTags = tagOptions
    .filter((tag) => tag && typeof tag.popularity === "number") // safety
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  const handleSearch = async (term = searchTerm) => {
    const trimmedTerm = term.trim().toLowerCase();

    if (!trimmedTerm) {
      setSearchResults(null);
      return;
    }

    try {
      setIsSearching(true);

      const results = await searchPostsByTag(trimmedTerm);

      setSearchResults(results);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]); // empty results
    } finally {
      setIsSearching(false);
    }
  };

  const handleTagClick = (tagValue) => {
    if (!tagValue) return;

    setSearchTerm(tagValue);
    handleSearch(tagValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-10" data-aos="fade-down" data-aos-delay="700">
      {/* Search Input */}
      <div className="flex items-center bg-base-100 rounded-md shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 outline-none text-base-content"
          disabled={isSearching}
        />
        <button
          onClick={() => handleSearch()}
          className="bg-base-content text-base-100 rounded-md px-4 py-2 m-2"
          disabled={!searchTerm.trim() || isSearching}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Popular Tags */}
      <div>
        <p className="text-sm mb-2">Popular Tags:</p>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag.value}
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

export default Search;
