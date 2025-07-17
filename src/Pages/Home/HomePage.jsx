import React, { useState } from "react";
import Banner from "../../Component/Banner/Banner";
import Posts from "../../Component/Posts/Posts";
import LatestAnnouncement from "../../Component/Announcement/LatestAnnouncement";
import SearchResult from "../../Component/Search/SearchResults";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState(null); // null = no search yet

  return (
    <div className="space-y-20">
      <Banner setSearchResults={setSearchResults} />
      <LatestAnnouncement />

      {/* Show SearchResult if search happened */}
      {searchResults ? (
        searchResults.length > 0 ? (
          <SearchResult results={searchResults} />
        ) : (
          <p className="text-center text-red-500 text-lg">
            No posts found for your search.
          </p>
        )
      ) : (
        <Posts />
      )}
    </div>
  );
};

export default HomePage;
