import React from "react";
import PostCard from "../Posts/PostCard";

const SearchResult = ({ results }) => {
  return (
    <div className="space-y-6 mt-10">
      <h2 className="text-lg font-bold text-base-content">Search Results:</h2>
      {results.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default SearchResult;
