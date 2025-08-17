import React, { useState } from "react";
import Banner from "../../Component/Banner/Banner";
import Posts from "../../Component/Posts/Posts";
import LatestAnnouncement from "../../Component/Announcement/LatestAnnouncement";
import SearchResult from "../../Component/Search/SearchResults";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState(null); // null = no search yet

  return (
    <div className="space-y-20 mt-20">
      <Helmet>
        <title>Home | DevConnect</title>
      </Helmet>
      <Banner
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
      {searchResults && <SearchResult searchResults={searchResults} />}
      <LatestAnnouncement />
      <Posts />
    </div>
  );
};

export default HomePage;
