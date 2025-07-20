import React from "react";
import PostCard from "../Posts/PostCard";
import Loading from "../Loading/Loading";

const SearchResult = ({ searchResults, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error mt-10">
        Error loading search results: {error.message}
      </div>
    );
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="mt-10 text-center text-base-content/70">
        No results found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-10 max-w-3xl mx-auto p-4 overflow-hidden">
      <h2 className="md:text-4xl text-2xl md:font-bold font-semibold">
        Search Results : {searchResults.length}
      </h2>
      {searchResults.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default SearchResult;
