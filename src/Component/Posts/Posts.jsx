import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("/post.json");
      const data = await res.json();

      const sortedByNewest = data.sort(
        (a, b) => new Date(b.timeOfPost) - new Date(a.timeOfPost)
      );

      setAllPosts(sortedByNewest);
      setLoading(false);
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
    }, 100); // slight delay for visual loading

    return () => clearTimeout(delay);
  }, [allPosts, sortByPopularity, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">All Posts</h1>
        <button
          className="bg-base-300  shadow-xs  px-4 py-2 rounded hover:bg-base-200"
          onClick={() => {
            setSortByPopularity(!sortByPopularity);
            setCurrentPage(0);
          }}
        >
          {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
        </button>
      </div>

      {loading ? (
        <Loading />
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
            itemClass="px-3 py-1  rounded bg-base-300"
            activeClass="text-base-100 bg-base-content"
          />
        </>
      )}
    </div>
  );
};

export default Posts;
