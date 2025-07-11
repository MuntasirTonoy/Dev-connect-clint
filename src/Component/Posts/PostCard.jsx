import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { GoArrowDown, GoArrowUp, GoComment } from "react-icons/go";
import { Link } from "react-router"; // make sure this is react-router-dom
dayjs.extend(relativeTime);

const PostCard = ({ post }) => {
  // Compute votes: upvotes minus downvotes (like YouTube "net" count)
  const upCount = post.upVote?.length || 0;
  const downCount = post.downVote?.length || 0;
  const netVotes = upCount - downCount;

  // Comments count comes from your post model (if you store comments array)
  const commentCount = post.comments?.length ?? 0;

  // Time ago
  const timeAgo = dayjs(post.timeOfPost).fromNow();
  console.log(post);

  return (
    <div>
      <div
        data-aos="zoom-out"
        data-aos-duration="200"
        data-aos-delay="100"
        className="p-7 rounded shadow-xs mb-4 bg-base-300 hover:bg-base-200 transition"
      >
        {/* Author Info */}
        <div className="flex items-center gap-2 mb-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt={post.authorName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-md">{post.author}</p>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>

        {/* Title and Content */}
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl line-clamp-1 font-semibold mb-2">
            {post.title}
          </h2>
          <p className="text-base line-clamp-3">{post.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-sm mb-5">
          {post.tag?.map((t, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="text-lg font-semibold text-base-content flex gap-6 items-center">
          {/* Comments */}
          <span className="flex items-center gap-1">
            <GoComment />
            {commentCount}
          </span>

          {/* Net Votes */}
          <span className="flex items-center gap-1">
            <GoArrowDown />
            {netVotes}
            <GoArrowUp />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
