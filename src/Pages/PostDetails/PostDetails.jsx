import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPostById,
  updateVote,
  fetchCommentsByPostId,
} from "../../Hoocks/Api";
import { AuthContext } from "../../Firebase/AuthContext";

import {
  FaRegCommentAlt,
  FaShareAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import ShareModal from "../../Component/Modals/ShareModal";
import Loading from "../../Component/Loading/Loading";
import Comments from "../../Component/Comments/Comments";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const shareUrl = window.location.href;

  // Fetch Post by ID
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });

  // Fetch Comments by Post ID
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchCommentsByPostId(id),
    enabled: !!id,
  });

  const upvoted = post?.upVote?.includes(user?.email);
  const downvoted = post?.downVote?.includes(user?.email);

  const handleVote = async (type) => {
    if (!user?.email) return alert("Login required to vote.");
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await updateVote(id, type);
      await refetchPost();
    } catch (err) {
      console.error("Vote failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPostLoading) return <Loading />;

  if (isPostError || !post)
    return (
      <p className="text-center py-10 text-red-500">Error loading post.</p>
    );

  return (
    <section
      data-aos="fade-up"
      data-aos-delay="100"
      className="max-w-7xl mx-auto px-4 md:py-10 py-4 grid md:grid-cols-3 gap-10"
    >
      <Helmet>
        <title>Post</title>
      </Helmet>
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
            src={post.authorPhoto || "https://shorturl.at/WUkZ2"}
            alt="author"
            className="rounded-full w-10 h-10 ring-2 ring-offset-2"
          />
          <div>
            <h2 className="font-semibold text-lg">{post.author}</h2>
            <p className="text-sm text-gray-500">
              {format(new Date(post.timeOfPost), "h:mm a, MMMM d, yyyy")}
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
              #{tag}
            </span>
          ))}
        </div>

        {/* Post Actions */}
        <div className="flex items-center gap-6 text-gray-600 text-md mb-4">
          {/* Upvote Button */}
          <button
            onClick={() => handleVote("upvote")}
            disabled={isSubmitting}
            className={`p-2 rounded-full flex items-center gap-1 ${
              upvoted
                ? "bg-base-content text-base-100"
                : "bg-base-300 text-base-content"
            }`}
          >
            {isSubmitting ? (
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <FaArrowUp /> <span>{post.upVote?.length || 0}</span>
              </>
            )}
          </button>

          {/* Downvote Button */}
          <button
            onClick={() => handleVote("downvote")}
            disabled={isSubmitting}
            className={`p-2 rounded-full flex items-center gap-1 ${
              downvoted
                ? "bg-base-content text-base-100"
                : "bg-base-300 text-base-content"
            }`}
          >
            {isSubmitting ? (
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <FaArrowDown /> <span>{post.downVote?.length || 0}</span>
              </>
            )}
          </button>

          {/* Comment Count */}
          <div className="flex items-center gap-1 text-base-content text-xl">
            <FaRegCommentAlt />{" "}
            <span className="text-sm">{comments.length}</span>
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

      {/* Right: Comment Section */}
      <div className="md:col-span-1 md:max-h-[calc(100vh-150px)] overflow-y-auto bg-base-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        {isCommentsLoading ? (
          <Loading />
        ) : isCommentsError ? (
          <p className="text-red-500">Failed to load comments.</p>
        ) : (
          <Comments
            comments={comments}
            postId={post._id}
            onCommentAdd={refetchComments}
          />
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </section>
  );
};

export default PostDetails;
