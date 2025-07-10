import React, { useEffect, useState, useContext } from "react";
import PostCard from "./PostCard";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";
import { Link } from "react-router";
import { AuthContext } from "../../Firebase/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../Hoocks/Api";

const Posts = () => {
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useContext(AuthContext);
  const postsPerPage = 5;

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

  // ✅ Sorting + Pagination logic
  useEffect(() => {
    let posts = [...allPosts];

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

    const startIndex = currentPage * postsPerPage;
    const selectedPosts = posts.slice(startIndex, startIndex + postsPerPage);
    setDisplayedPosts(selectedPosts);
  }, [allPosts, sortByPopularity, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  if (isLoading || isError) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="md:text-4xl text-2xl md:font-bold font-semibold">
          All Posts
        </h1>
        <button
          className="bg-base-300 shadow-xs px-4 py-2 rounded hover:bg-base-200"
          onClick={() => {
            setSortByPopularity(!sortByPopularity);
            setCurrentPage(0);
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
            <Link key={post.id} to={`/post/${post.id}`}>
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
