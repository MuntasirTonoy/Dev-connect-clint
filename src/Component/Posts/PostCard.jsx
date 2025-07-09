import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { GoArrowDown, GoArrowUp, GoComment } from "react-icons/go";
import { Link } from "react-router";
dayjs.extend(relativeTime);

const PostCard = ({ post }) => {
  const totalVotes = post.upvote.length + post.downVote.length;
  const timeAgo = dayjs(post.timeOfPost).fromNow();

  return (
    <div to="/post/id" className=" p-7 rounded shadow-xs mb-4 bg-base-300 ">
      {/* Author Info */}
      <div className="flex items-center gap-2 mb-5">
        <img
          src={post.authorPhoto}
          alt={post.authorName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-md">{post.authorName}</p>
          <p className="text-xs">{timeAgo}</p>
        </div>
      </div>

      {/* Title and Content */}
      <div>
        <h2 className="text-2xl line-clamp-1 font-bold mb-2">
          {post.postTitle}
        </h2>
        <p className="mb-2 line-clamp-3">{post.post}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-sm mb-5">
        {post.tags.map((tag, i) => (
          <span key={i} className="bg-orange-600/10 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="text-lg font-semibold text-base-content flex gap-6  items-center ">
        {/* Comments */}
        <span className="flex items-center gap-1">
          <GoComment />
          {post.comment || 0}
        </span>

        {/* Total Votes */}
        <span className="flex items-center gap-1">
          <GoArrowDown />
          {totalVotes}
          <GoArrowUp />
        </span>
      </div>
    </div>
  );
};

export default PostCard;
