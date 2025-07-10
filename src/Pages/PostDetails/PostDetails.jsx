import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById, updateVote } from "../..//Hoocks/Api";
import { AuthContext } from "../../Firebase/AuthContext";
import CommentCard from "../../Component/CommentCard/Comment";
import {
  FaRegCommentAlt,
  FaShareAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import ShareModal from "../../Component/Modals/ShareModal";
import Loading from "../../Component/Loading/Loading";

const PostDetails = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const shareUrl = window.location.href;

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });
  console.log(post);

  const upvoted = post?.upVote?.includes(user?.email);
  const downvoted = post?.downVote?.includes(user?.email);

  const handleVote = async (type) => {
    if (!user?.email) return alert("Login required to vote.");
    try {
      await updateVote(id, user.email, type);
      refetch();
    } catch (err) {
      console.error("Vote failed", err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !post) {
    return (
      <p className="text-center py-10 text-red-500">Error loading post.</p>
    );
  }

  return (
    <section
      data-aos="fade-up"
      data-aos-delay="100"
      className="max-w-7xl mx-auto px-4 md:py-10 py-4 grid md:grid-cols-3 gap-10"
    >
      {/* Left: Post Content */}
      <div className="md:col-span-2">
        <div className="text-sm flex text-base-content mb-4">
          <Link
            to="/"
            className="text-base-content items-center flex gap-1 cursor-pointer hover:bg-base-300 rounded-md p-1"
          >
            <BsArrowLeft />
            Posts
          </Link>
          <span className="p-1"> / Post Details</span>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={post.authorImage || "https://shorturl.at/WUkZ2"}
            alt="author"
            className="rounded-full w-12 h-12"
          />
          <div>
            <h2 className="font-semibold text-lg">{post.author}</h2>
            <p className="text-sm text-gray-500">
              Posted on {new Date(post.timeOfPost).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-base-content mb-4 md:pr-5">{post.description}</p>

        {/* Tags */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {post.tag?.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Post Actions */}
        <div className="flex items-center gap-6 text-gray-600 text-md mb-4">
          {/* Upvote Button */}
          <button
            onClick={() => handleVote("upvote")}
            className={`p-2 rounded-full flex items-center gap-1 ${
              upvoted ? "bg-base-content text-white" : "bg-gray-200"
            }`}
          >
            <FaArrowUp /> <span>{post.upVote?.length || 0}</span>
          </button>

          {/* Downvote Button */}
          <button
            onClick={() => handleVote("downvote")}
            className={`p-2 rounded-full flex items-center gap-1 ${
              downvoted ? "bg-base-content text-white" : "bg-gray-200"
            }`}
          >
            <FaArrowDown /> <span>{post.downVote?.length || 0}</span>
          </button>

          {/* Comment */}
          <div className="flex items-center gap-1 text-base-content text-xl">
            <FaRegCommentAlt /> <span className="text-sm">8</span>
          </div>

          {/* Share Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1 text-base-content text-xl"
          >
            <FaShareAlt />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {/* Right: Comments */}
      <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 pr-2">
        <CommentCard user={user?.displayName || "Anonymous"} />
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </section>
  );
};

export default PostDetails;
