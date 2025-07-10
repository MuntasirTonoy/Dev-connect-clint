import React, { useEffect, useState, useContext } from "react";
import PostCard from "./PostCard";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";
import axios from "axios";
import { Link } from "react-router";
import { AuthContext } from "../../Firebase/AuthContext";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/post.json");
        const data = res.data;

        const sortedByNewest = data.sort(
          (a, b) => new Date(b.timeOfPost) - new Date(a.timeOfPost)
        );

        setAllPosts(sortedByNewest);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setLoading(true);

    const delay = setTimeout(() => {
      let posts = [...allPosts];

      if (sortByPopularity) {
        posts.sort(
          (a, b) =>
            b.upvote.length -
            b.downVote.length -
            (a.upvote.length - a.downVote.length)
        );
      }

      const startIndex = currentPage * postsPerPage;
      const selectedPosts = posts.slice(startIndex, startIndex + postsPerPage);
      setDisplayedPosts(selectedPosts);
      setLoading(false);
    }, 100);

    return () => clearTimeout(delay);
  }, [allPosts, sortByPopularity, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header section remains always visible */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">All Posts</h1>
        <div className="flex gap-4">
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
      </div>

      {/* Main content area with loading state */}
      {loading ? (
        <Loading />
      ) : (
        <>
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
                <PostCard key={post.id} post={post} />
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
        </>
      )}
    </div>
  );
};

export default Posts;
