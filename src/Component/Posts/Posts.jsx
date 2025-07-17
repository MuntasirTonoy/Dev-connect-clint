import React, { useState, useContext, useMemo } from "react";
import { Link } from "react-router";
import PostCard from "./PostCard";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Firebase/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../Hoocks/Api";

const Posts = () => {
  const [sortByPopularity, setSortByPopularity] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 5;
  const { user } = useContext(AuthContext);

  // ✅ Fetching posts using TanStack Query
  const {
    data: allPosts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Memoize sorted posts
  const sortedPosts = useMemo(() => {
    if (!allPosts) return [];

    const posts = [...allPosts];

    if (sortByPopularity) {
      posts.sort(
        (a, b) =>
          b.upVote.length -
          b.downVote.length -
          (a.upVote.length - a.downVote.length)
      );
    } else {
      posts.sort((a, b) => new Date(b.timeOfPost) - new Date(a.timeOfPost));
    }

    return posts;
  }, [allPosts, sortByPopularity]);

  // ✅ Memoize paginated posts
  const displayedPosts = useMemo(() => {
    const startIndex = currentPage * postsPerPage;
    return sortedPosts.slice(startIndex, startIndex + postsPerPage);
  }, [sortedPosts, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  if (isLoading || isError) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h1 className="md:text-4xl text-2xl md:font-bold font-semibold">
          All Posts
        </h1>
        <button
          className="bg-base-300 shadow-xs px-4 py-2 rounded hover:bg-base-200"
          onClick={() => {
            setSortByPopularity(!sortByPopularity);
            setCurrentPage(0); // reset to page 1 on sort toggle
          }}
        >
          {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
        </button>
      </div>

      {allPosts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">No Post Available</p>
          {user && (
            <Link
              to="/dashboard/add-post"
              className="inline-block mt-4 bg-base-content text-base-100 px-4 py-2 rounded"
            >
              Create Your First Post
            </Link>
          )}
        </div>
      ) : (
        <>
          {displayedPosts.map((post) => (
            <Link key={post._id} to={`/post/${post._id}`}>
              <PostCard post={post} />
            </Link>
          ))}

          <Pagination
            activePage={currentPage + 1}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={allPosts.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            prevPageText="Prev"
            nextPageText="Next"
            innerClass="flex flex-wrap justify-center gap-2 mt-10 px-5"
            itemClass="px-3 py-1 rounded bg-base-300"
            activeClass="text-base-100 bg-base-content"
          />
        </>
      )}
    </div>
  );
};

export default Posts;
